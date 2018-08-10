import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';
import { User } from '../domain';

@Injectable()
export class UserService {
    private readonly domain = 'users';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config){}
    searchUsers(filter: string) : Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
                .get(uri, {params: {'email_like' : filter}})
                .map(res => res.json() as User[]);
        
    }

    getUsersByProject(projectId: string) : Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
                //projectIds: string[]in user.model for here only need to
                // pass projectId can check if user has such project
                // json server function
                .get(uri, {params: {'projectId' : projectId}})
                .map(res => res.json() as User[]);
    }

    addProjectRef (user: User, projectId: string) : Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        if (projectIds.indexOf(projectId) > -1) {
            // if exsit do not neet to update
            return Observable.of(user);
        }
        return this.http
               .patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers : this.headers})
               .map(res => res.json() as User);
    }

    removeProjectRef (user: User, projectId: string) : Observable<User> {
        const uri = `${this.config.uri}/${this.domain}/${user.id}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        const index = projectIds.indexOf(projectId);
        if (index === -1) {
            return Observable.of(user);
        }
        const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
        return this.http
               .patch(uri, JSON.stringify({projectIds: toUpdate}))
               .map(res => res.json() as User);
    }
    // handle many 
    batchUpdateProjectRef(project: Project) : Observable<User[]> {
        const projectId = project.id;
        const memberIds = project.members ? project.members : [];
        return Observable.from(memberIds)
                // if no switchMap the user will be observable user
                .switchMap(id => {
                    const uri = `${this.config.uri}/${this.domain}/${id}`;
                    return this.http.get(uri).map(res => res.json() as User);
                })
                .filter(user => user.projectIds.indexOf(projectId) === -1)
                .switchMap(u => this.addProjectRef(u, projectId))
                // because return type is user[], so here should be use reduce
                .reduce((arr, curr) => [...arr, curr], []);
    }

    
}
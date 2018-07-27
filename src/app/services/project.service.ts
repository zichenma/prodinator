import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config){}
    //POST
    add(project: Project): Observable<Project> {
        project.id = null; 
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
        .post(uri, JSON.stringify(project), {
            headers: this.headers
        })
        .map(res => res.json());
    }
    
    // PUT
    update(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http
        .patch(uri, JSON.stringify(project), {
            headers: this.headers
        })
        .map(res => res.json());
    }

    // DELETE
    del(project: Project): Observable<Project> {
       const delTasks$ = Observable.from(project.taskLists)
       // if a new tasklist id comes, we will continue to delete old tasklist
       // so here we using mergeMap and wants to delete tasklists clean
       .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
       // count number of elements in a stream
       .count();
       return delTasks$
       // after get count, we don't care about old delete, but just start a new delete
       .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
       .mapTo(project);
    }
    
    // GET
    // only get the this users's projects, not other user's, so get by userId
    get(userId: string): Observable<Project[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
        .get(uri, {params: {'memebers_like' : userId}})
        .map(res => res.json() as Project[]);
    }

    
}
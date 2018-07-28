import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {
    private readonly domain = 'taskLists';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config){}
    //POST
    add(taskList: TaskList): Observable<TaskList> {
        taskList.id = null; 
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
        .post(uri, JSON.stringify(taskList), {
            headers: this.headers
        })
        .map(res => res.json());
    }
    
    // PUT
    update(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name
          };
        return this.http
        .patch(uri, JSON.stringify(toUpdate), {
            headers: this.headers
        })
        .map(res => res.json());
    }

    // DELETE
    del(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        return this.http.delete(uri).mapTo(taskList);
    }
    
    // GET
    // only get the this users's taskLists, not other user's, so get by userId
    get(projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
        .get(uri, {params: {'projectId' : projectId}})
        .map(res => res.json() as TaskList[]);
    }
    // need to merge two streams into an array, one from souce, another from target
    swapOrder (src: TaskList, target: TaskList): Observable<TaskList[]>{
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http
            .patch(dragUri, JSON.stringify({order: target.order}),{headers: this.headers})
            .map(res => res.json());
        const drop$ = this.http
            .patch(dropUri, JSON.stringify({order: src.order}),{headers: this.headers})
            .map(res => res.json());
        return Observable
           // here using merge or (combineLatest, just do not need reduce) is the same
            .concat(drag$, drop$)
            // reduce get two inputs, arrs and list, the '[]' can be viewd as arrs=[]
            // if give arrs as array, type of arrs is an array
            .reduce((arrs, list) => [...arrs, list], []);
    }

    
}
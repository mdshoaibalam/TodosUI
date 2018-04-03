import { Injectable } from '@angular/core';
import {ITodo} from './todo';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 


@Injectable()
export class TodoServiceService {
  todos :ITodo[] = [{todoId:'1',todoName:'Test',active:'1'},
  {todoId:'3',todoName:'Test1',active:'1'},
  {todoId:'4',todoName:'Test2',active:'1'}
  ];
  constructor(private _http:Http) { }

  getTodos():Observable<ITodo[]>{
    return this._http.get('http://localhost:7770/todos/').map((response:Response)=> <ITodo[]>response.json())
  }

  getActiveInactiveTodos(status):Observable<ITodo[]>{
    return this._http.get('http://localhost:7770/todos/'+status+'').map((response:Response)=> <ITodo[]>response.json())
  }

  deleteTodo(todoId:string):void{
    let Todo={     
      id: todoId
     };
     let headers=new Headers();
     headers.append('Content-type', 'application/json');
     const options = new RequestOptions({ headers: headers });
     this._http.delete('http://localhost:7770/todos/'+todoId+'').subscribe(()=>{
       console.log('Deleted')
     });;
  }
  addTodo(todoName:string):Observable<any>{
    let Todo={     
     id:Math.floor(Math.random()*(999-100+1)+100),
     todos:todoName,
     active:"1"
    }
    let status:any;
    let headers=new Headers();
    headers.append('Content-type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this._http.post('http://localhost:7770/todos/',Todo,options).map((response:Response)=> response);   
  }

  updateTodo(todoData:ITodo,todoId:string):void{
    todoData.active="0";
    let headers=new Headers();
    headers.append('Content-type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    this._http.put('http://localhost:7770/todos/'+todoId+'',todoData,options).subscribe();

  }

}

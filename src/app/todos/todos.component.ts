import { Component, OnInit } from '@angular/core';
 
import {TodoServiceService} from '../todo-service.service';
import { NgForm } from '@angular/forms';
import { ITodo } from '../todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  
  todos :ITodo[];
  todoData:string;
  constructor(private todoServiceService:TodoServiceService) { }

  ngOnInit() {
    this.getTodo();
  }

  getTodo(){
    this.todoServiceService.getTodos()
    .subscribe((empData)=>{
      this.todos=empData;
      console.log('get called')
    });
  
    this.todoData='';
  }

  deleteTodo(todoId):void {
     this.todoServiceService.deleteTodo(todoId);
     this.todoServiceService.getTodos()
     .subscribe((empData)=>{
      this.todos=empData;
      this.ngOnInit();
    });
     
  }
  addTodo(evn):void {

    console.log(this.todoData);
    if(!this.todoData){
      return;
    };
    if(evn.keyCode===13){
     this.todoServiceService.addTodo(this.todoData)
     .subscribe((res)=>{
      this.getTodo();
     })
    
    }
    
  }

  markCompleteTodo(todo):void{
    this.todoServiceService.updateTodo(todo,todo.id);
    this.getActiveOrInactiveTodo(1);
  }

  getActiveOrInactiveTodo(status){
    this.todoServiceService.getTodos()
    .subscribe((data)=>{
      this.todos=data.filter((item)=>{
       return item.active==status;
      });
    });
    
  }
}

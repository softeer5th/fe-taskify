import { TaskModel } from '../observer/observer.js';

export function loadLocalStorage(){
  let data = JSON.parse(localStorage.getItem('tasks'));
  if(!data){
    data ={ 
      'todos': [],'progress': [],'done': []
    }
    localStorage.setItem('tasks',JSON.stringify(data));
  }
  return data;
}



const data =loadLocalStorage()
export const todoModel = new TaskModel(data.todos);
export const progressModel = new TaskModel(data.progress);
export const doneModel = new TaskModel(data.done);







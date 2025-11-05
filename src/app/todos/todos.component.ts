
import { Component, ElementRef, OnInit, ViewChild,} from "@angular/core";
import { Itodos } from "../modules/todos";

@Component({
    selector:'app-todos',
    templateUrl:'./todos.component.html',
    styleUrls:['./todos.component.scss']
})

export class TodosComponent implements OnInit{
        todosArray:Array<Itodos>=[
           {
            todoItem: 'javascript',
            todoId:'1234'
           }
        ]
     
        isInEditMode: boolean = false;
        //formMode :"ADD" | "EDIT" :

@ViewChild('todoItem') todoItemRef!:ElementRef;


constructor  () {}

ngOnInit (): void{}
    onTodoAdd (todoItemControl:HTMLInputElement){
        if(todoItemControl.value.length >0){
            let todoObj:Itodos={
               todoItem:todoItemControl.value,
               todoId:this.uuid()
            }
            todoItemControl.value =''
            this.todosArray .unshift(todoObj)
        }

         //create a new li on UI
    }
      
    onTodoRemove (todoId:string){
        //GET REMOVE ID
        let REMOVE_ID =todoId
        console.log(REMOVE_ID)

        //GET INDEX NO OF THE OBJECT
        let GET_INDEX =this.todosArray.findIndex(todo => todo.todoId === REMOVE_ID)
        console.log(GET_INDEX)
        //REMOVE OBJECT FROM ARRAY

          this.todosArray.splice(GET_INDEX,1)
    }


       onTodoEdit(todoObj :Itodos){
          //EDIT_MODE ON == true
          this.isInEditMode = true
          //FIND THE EDIT_OBJECT
          console.log(todoObj);
           
          //EDIT_ID
          let EDIT_ID = todoObj.todoId;
          localStorage.setItem("EDIT_ID",EDIT_ID)
          //PATCH DATA IN FORM
          this.todoItemRef.nativeElement.value = todoObj.todoItem
       }

       onTodoUpdate (todoItemControl: HTMLInputElement){
        //UPDATE_ID
        let UPDATE_ID =localStorage.getItem("EDIT_ID")
        localStorage.removeItem("EDIT_ID")
        //UPDATED_OBJ
               if(UPDATE_ID){
                let UPDATED_OBJ :Itodos ={
                    todoItem : todoItemControl.value,
                    todoId: UPDATE_ID
                }
                console.log(UPDATED_OBJ);
                todoItemControl.value='';
               
        //update in array

        let GET_INDEX = this.todosArray.findIndex(todo => todo.todoId === UPDATE_ID)
        
        this.todosArray[GET_INDEX] = UPDATED_OBJ
        
        this.isInEditMode = false

      }   
     }
    uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
};

    }
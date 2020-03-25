var todos = ["buy new clothes"];

var input = prompt("what would you like to do?");

while(input !== "quit"){
    if(input === "list"){
        listTodos();
     } else if(input === "new"){
        addTodo();
     } else if(input === "delete"){
        deleteToDo();
     }
    //ask again for new input
    input = prompt("what would you like to do?");
 }
console.log("OK, you quit");

function listTodos(){
    todos.forEach(function(todo,i){
        console.log(i + ":" + todo);
    });
    
}

function addTodo(){
     //ask for new todo
     var newtodo = prompt("enter new todo");
     //add to todos array
    todos.push(newtodo);
    console.log("Added todo");
}

function deleteToDo(){
     //ask for the index of todo to be deleted
     var index = prompt("enter index of todo to delete");
     //delete that todo using splice()
     todos.splice(index,1);
     console.log("deleted todo");

}
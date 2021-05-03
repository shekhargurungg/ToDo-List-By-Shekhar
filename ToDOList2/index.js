var todos=[]; //array
var addTodoForm = document.querySelector("#addTodoForm"); //form tag
var listGroup=document.querySelector(".list-group");      //List Group class from ul tag

function createListItem(todoValue, todoIndex) {
    var li = document.createElement("li");
    var iconDelete = document.createElement("i");

    li.setAttribute("class","list-group-item  d-flex justify-content-between");
    iconDelete.setAttribute("class","fas fa-trash-alt");
    
    
    var span = document.createElement("span");
    span.innerHTML=todoValue;

    li.appendChild(span);
    li.appendChild(iconDelete);

    iconDelete.addEventListener("click",function(event){
        //Remove Li from DOM
        event.stopPropagation();
        event.target.parentElement.remove();
        // console.log(event.target);
        //Remove li from Todos Array
        todos.splice(todoIndex, 1);
        //Remove li from localStorage
        localStorage.setItem("todos",JSON.stringify(todos));
    });

    //check click garda kheri dekhauna kosis
    if(todos[todoIndex].completed){
        li.classList.add("bg-secondary");
    };

    li.addEventListener("click", function (){
        if (todos[todoIndex].completed){
            //Remove bg secondary from li
            li.classList.remove("bg-secondary");
            //set completed to false
            todos[todoIndex].completed= false;
        }
        else{
            //add bg-secondary to li
            li.classList.add("bg-secondary");
            //set completed true
            todos[todoIndex].completed=true;
        }
        localStorage.setItem("todos",JSON.stringify(todos));
    });
    
    return li;
}

function renderTodos(todos) {
    todos.forEach(function (todo, index) {
        var li = createListItem(todo.value,index,todo.completed);
        listGroup.appendChild(li);  
    });
};
// Check is todo Exist in Local Storage
var storedTodos = localStorage.getItem("todos");
//if exist
if(storedTodos){
    var parsedStoredTodos = JSON.parse(storedTodos);
    todos=parsedStoredTodos;
    renderTodos(todos);
};

addTodoForm.addEventListener("submit",function(event){
    event.preventDefault(); //It doesnot let content delete after submit

    //Push into Array
    var todoValue = addTodoForm.todo.value;
    todos.push({
        value: todoValue,
        completed: false,
    });

    addTodoForm.todo.value="";//empty input tag space after pressing enter
    
    var li = createListItem(todoValue,todos.length -1);
    listGroup.appendChild(li);
    

    //Local storage
    localStorage.setItem("todos",JSON.stringify(todos)); //Add into local storage
});
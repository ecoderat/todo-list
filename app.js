const form = document.querySelector("#form");
const todoInput = document.querySelector("#inputTodo");
const todoList = document.querySelector(".todo-list");
const firstBox = document.querySelectorAll(".box")[0];
const secondBox = document.querySelectorAll(".box")[1];
const search = document.querySelector("#searchTodo");
const clear = document.querySelector("#clearButton");


eventListener();

function eventListener(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondBox.addEventListener("click",deleteTodo);
    search.addEventListener("keyup",searchTodos);
    clear.addEventListener("click",clearAllTodos);
}

function clearAllTodos(){
    if(confirm("Tümümü silmek istedeiğinize emin misiniz?")){
        // Arayüzden Todoları Kaldırma
        // todoList.innerHTML = ""; //Yavaş
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function searchTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-item"); 

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            // Bulamadı
            listItem.setAttribute("style","display: none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));
}

function deleteTodo(e){
    if(e.target.className === "delete-todo"){
        e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement.textContent);
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success","Todo başarıyla silindi..");
    }
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);

    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("error","lütfen bir todo girin..");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success","başarılı sekilde eklendi..");
    }


    e.preventDefault();
}

function showAlert(type,message){
    const mesageList = document.createElement("li");
    
    if(type === "success"){
        mesageList.style.backgroundColor = "#88E584";
    }
    else{
        mesageList.style.backgroundColor = "#FF9050";
    }

    mesageList.appendChild(document.createTextNode(message));
    form.appendChild(mesageList);

    setTimeout(function(){
        mesageList.remove();

    },1000)
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodosFromStorage(newTodo){ // Storagedan Todoları Alma
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToUI(newTodo){
    /* <li class="list-item">
            Todo 1
            <a href="#" class="delete-todo">
                <img src="close11.png">
            </a>
        </li>
                        */
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.innerHTML = "<img src='close11.png' class='delete-todo'>"
    
    listItem.className = "list-item"
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);

    todoInput.value = "";
}



console.log(secondBox);
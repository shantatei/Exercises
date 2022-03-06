const todoInput = document.getElementById('todoinput')
const todoButton = document.getElementById('todo-button')
const todoDate = document.getElementById('duedate')
const todoList = document.querySelector(".todo-list")




//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);




//Functions

function addTodo(event) {

    event.preventDefault()

    if (!(todoInput.value && todoDate.value)) return
    //Todo Div

    const todoDiv = document.createElement('div')
    todoDiv.classList.add("card")

    //Todo Body

    const todoBody = document.createElement('div')
    todoBody.classList.add("card-body")
    todoDiv.appendChild(todoBody)

    //Create Item
    const newTodo = document.createElement('h5');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('card-title')
    todoBody.appendChild(newTodo)

    //ADD TODO to Local Storage
    saveLocalTodo(todoInput.value)

    //Create Deadline

    const newTodoDeadline = document.createElement('h6');
    newTodoDeadline.innerText = todoDate.value;
    newTodoDeadline.classList.add('card-subtitle')
    todoBody.appendChild(newTodoDeadline)

    //Create Type

    const newTodoType = document.createElement('p');
    newTodoType.innerText = $('#type :selected').text();
    newTodoType.classList.add('card-text')
    todoBody.appendChild(newTodoType)

    //Checked Button

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoBody.appendChild(completedButton)

    //Delete Button

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    todoBody.appendChild(deleteButton)

    //Append to List
    todoList.appendChild(todoDiv);

    //Clear todo input value

    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;

    //Delete

    if (item.classList[0] === 'trash-btn') {
        const todo1 = item.parentElement;
        const todo = todo1.parentElement

        todo.remove();

        // //Animation
        // todo.classList.add("fall");

        // todo.addEventListener('transitionend',function(){

        //     todo.remove();

        // });

    }

    //Check Mark

    if (item.classList[0] === "complete-btn") {
        const todo1 = item.parentElement;
        const todo = todo1.parentElement
        todo.classList.toggle("completed");
    }

}

function saveLocalTodo(todo) {

    //Check 

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}


function getTodos() {

    console.log("check");


    //Check 

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.forEach(element => {

        //Todo Div

        const todoDiv = document.createElement('div')
        todoDiv.classList.add("card")

        //Todo Body

        const todoBody = document.createElement('div')
        todoBody.classList.add("card-body")
        todoDiv.appendChild(todoBody)

        //Create Item
        const newTodo = document.createElement('h5');
        newTodo.innerText = element
        newTodo.classList.add('card-title')
        todoBody.appendChild(newTodo)

        //Create Deadline

        const newTodoDeadline = document.createElement('h6');
        newTodoDeadline.innerText = element
        newTodoDeadline.classList.add('card-subtitle')
        todoBody.appendChild(newTodoDeadline)

        //Create Type

        const newTodoType = document.createElement('p');
        newTodoType.innerText = element
        newTodoType.classList.add('card-text')
        todoBody.appendChild(newTodoType)

        //Checked Button

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoBody.appendChild(completedButton)

        //Delete Button

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("trash-btn");
        todoBody.appendChild(deleteButton)

    })


}
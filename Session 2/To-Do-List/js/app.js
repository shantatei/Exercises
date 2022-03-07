const todoInput = document.getElementById('todoinput')
const todoButton = document.getElementById('todo-button')
const todoDate = document.getElementById('duedate')
const todoList = document.querySelector(".todo-list")


let data = []



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);




//Functions

function addTodo(event) {

    data = {
        todo: todoInput.value,
        deadline: todoDate.value,
        type: $('#type :selected').text()
    }

    event.preventDefault()

    if (!(todoInput.value && todoDate.value)) return
    //Todo Div

    const todoDiv = document.createElement('div')
    todoDiv.setAttribute("item", todoInput.value)
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

    //ADD TODO to Local Storage
    saveLocalTodo(data)

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
        removeLocalTodo(todo)

        todo.remove();

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


function removeLocalTodo(todo) {


    //Check 

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    var tobedeleted = todo.getAttribute("item")
    todos.splice(todos.indexOf(tobedeleted), 1)
    localStorage.setItem("todos", JSON.stringify(todos))

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

    let listoftodos = JSON.parse(localStorage.getItem('todos'))
    console.log(listoftodos);
    var todolistlength = listoftodos.length;
    for (var count = 0; count < todolistlength; count++) {
        //Todo Div

        const todoDiv = document.createElement('div')
        todoDiv.classList.add("card")
        todoDiv.setAttribute("item", listoftodos[count].todo)

        //Todo Body

        const todoBody = document.createElement('div')
        todoBody.classList.add("card-body")
        todoDiv.appendChild(todoBody)

        //Create Item
        const newTodo = document.createElement('h5');
        newTodo.innerText = listoftodos[count].todo
        newTodo.classList.add('card-title')
        todoBody.appendChild(newTodo)

        //Create Deadline

        const newTodoDeadline = document.createElement('h6');
        newTodoDeadline.innerText = listoftodos[count].deadline
        newTodoDeadline.classList.add('card-subtitle')
        todoBody.appendChild(newTodoDeadline)

        //Create Type

        const newTodoType = document.createElement('p');
        newTodoType.innerText = listoftodos[count].type
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

    }


}






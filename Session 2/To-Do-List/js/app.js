const todoInput = document.getElementById('todoinput');
const todoButton = document.getElementById('todo-button');
const todoDate = document.getElementById('duedate');
const todoList = document.querySelector('.todo-list');
const orderformbtn = document.getElementById('order-button');
const clearbtn = document.getElementById('clear-btn');

let data;

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
orderformbtn.addEventListener('click', sortbyorder);
clearbtn.addEventListener('click', () => {
    resetlist();
    displayOrginal();
});

function addTodo(event) {
    event.preventDefault();
    data = {
        _id: Math.random().toString(36).substring(7),
        todo: todoInput.value,
        deadline: todoDate.value,
        type: $('#type :selected').text()
    };
    if (!(todoInput.value && todoDate.value)) return;
    createCard(
        data._id,
        todoInput.value,
        todoDate.value,
        $('#type :selected').text(),
        todoList
    );
    saveLocalTodo(data);
    todoInput.value = '';
}

function saveLocalTodo(todo) {
    let todos = getTodosList();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('original', JSON.stringify(todos));
}

function getTodosList() {
    if (localStorage.getItem('todos') === null) return [];
    return JSON.parse(localStorage.getItem('todos'));
}


function getTodos(source = null) {
    var todos = getTodosList();
    if (source == null) localStorage.setItem('original', JSON.stringify(todos));
    for (var count = 0; count < todos.length; count++) {
        const todo = todos[count];
        createCard(todo._id, todo.todo, todo.deadline, todo.type, todoList);
    }
}

function createCard(id, todo, deadline, type, parent) {
    const card = `<div class = "card" item = "${id}">
                <div class = "card-body">
                    <h5 class = "card-title">${todo}</h5>
                    <h6 class = "card-subtitle">${deadline}</h6>
                    <p class = "card-text">${type}</p>
                    <button class = "complete-btn">
                        <i class = "fas fa-check"></i>
                    </button>
                    <button class = "trash-btn">
                        <i class = "fas fa-trash"></i>
                    </button>
                </div>
            </div>`;
    parent.insertAdjacentHTML('beforeend', card);
    const cardElement = parent.querySelector(`.card[item="${id}"]`);
    cardElement
        .querySelector(`.complete-btn`)
        .addEventListener('click', (e) => {
            const todo = e.target.parentElement.parentElement;
            todo.classList.toggle('completed');
        });
    cardElement.querySelector(`.trash-btn`).addEventListener('click', (e) => {
        const todo = e.target.parentElement.parentElement;
        let todos = getTodosList();
        var tobedeleted = todo.getAttribute('item');
        todos = todos.filter((todo) => todo._id !== tobedeleted);
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('original', JSON.stringify(todos));
        todo.remove();
    });
}

function displayOrginal() {
    let listoftodos = JSON.parse(localStorage.getItem('original'));
    for (var count = 0; count < listoftodos.length; count++) {
        const todo = listoftodos[count];
        createCard(todo._id, todo.todo, todo.deadline, todo.type, todoList);
    }
    localStorage.setItem('todos', JSON.stringify(listoftodos));
}

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    };
}

function resetlist() {
    todoList.innerHTML = '';
    let todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));
}

function sorttype(a, b) {
    const typeA = a.type.toUpperCase();
    const typeB = b.type.toUpperCase();
    let comparison = 0;
    if (typeA > typeB) {
        comparison = 1;
    } else if (typeA < typeB) {
        comparison = -1;
    }
    return comparison;
}

function sortbyorder(event) {
    // event.preventDefault();
    if ($('#order :selected').text() === 'A-Z') {
        console.log('A-Z');
        var todolist = JSON.parse(localStorage.getItem('todos'));
        todolist.sort(dynamicSort('todo'));
        resetlist();
        localStorage.setItem('todos', JSON.stringify(todolist));
        getTodos();
    } else if ($('#order :selected').text() === 'Type') {
        console.log('Type');
        var todolist = JSON.parse(localStorage.getItem('todos'));
        todolist.sort(sorttype);
        resetlist();
        localStorage.setItem('todos', JSON.stringify(todolist));
        getTodos();
    } else {
        console.log('Deadline');
        var todolist = JSON.parse(localStorage.getItem('todos'));
        todolist.sort(function (a, b) {
            var dateA = new Date(a.deadline),
                dateB = new Date(b.deadline);
            return dateA - dateB;
        });
        resetlist();
        localStorage.setItem('todos', JSON.stringify(todolist));
        getTodos();
    }
}

var searchInput = document.getElementById('search');

//Search Function
searchInput.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase().trim();
    if (value) {
        let filteredTodoList = [];
        var todolist = JSON.parse(localStorage.getItem('original'));
        for (let index = 0; index < todolist.length; index++) {
            let todotask = todolist[index].todo.toLowerCase();

            if (todotask.indexOf(value) != -1) {
                filteredTodoList.push(todolist[index]);
            }
        }
        resetlist();
        localStorage.setItem('todos', JSON.stringify(filteredTodoList));
        getTodos(true);
    } else {
        resetlist();
        displayOrginal();
    }
});



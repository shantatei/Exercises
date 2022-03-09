const todoInput = document.getElementById('todoinput')
const todoButton = document.getElementById('todo-button')
const todoDate = document.getElementById('duedate')
const todoList = document.querySelector(".todo-list")
const orderformbtn = document.getElementById('order-button')



let data = []


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
orderformbtn.addEventListener('click', sortbyorder);


//Functions

function addTodo(event) {

    data = {
        _id: Math.random().toString(36).substring(7),
        todo: todoInput.value,
        deadline: todoDate.value,
        type: $('#type :selected').text()
    }

    event.preventDefault()

    if (!(todoInput.value && todoDate.value)) return
    //Todo Div

    const todoDiv = document.createElement('div')
    todoDiv.setAttribute("item", data._id)
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
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
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
        console.log(todo);
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
    localStorage.setItem("original",JSON.stringify(todos))
    
}



function removeLocalTodo(todoitem) {

    //Check 

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    var tobedeleted = todoitem.getAttribute("item")
    todos = todos.filter(todo => todo._id !== tobedeleted)
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("original", JSON.stringify(todos))

}


function getTodos() {

    
    //Check 
    
    var todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    localStorage.setItem("original",JSON.stringify(todos))
    let listoftodos = todos
    var todolistlength = todos.length;
    for (var count = 0; count < todolistlength; count++) {
        //Todo Div

        const todoDiv = document.createElement('div')
        todoDiv.classList.add("card")
        todoDiv.setAttribute("item", listoftodos[count]._id)

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

function displayOrginal() {

    var array = JSON.parse(localStorage.getItem('original'))
    let listoftodos = array
    var todolistlength = array.length;
    for (var count = 0; count < todolistlength; count++) {
        //Todo Div

        const todoDiv = document.createElement('div')
        todoDiv.classList.add("card")
        todoDiv.setAttribute("item", listoftodos[count]._id)

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

function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

function resetlist(){
    todoList.parentNode.removeChild(todoList)
    let todos = []
    localStorage.setItem('todos', JSON.stringify(todos));
}


function sorttype(a, b) {
    // Use toUpperCase() to ignore character casing
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
    if ($('#order :selected').text() === "A-Z") {
        console.log("A-Z");
        var todolist = JSON.parse(localStorage.getItem('todos'));
        todolist.sort(dynamicSort("todo"));
        resetlist();
        localStorage.setItem("todos",JSON.stringify(todolist))
        getTodos();
    } else if ($('#order :selected').text() === "Type") {
        console.log("Type")
        var todolist = JSON.parse(localStorage.getItem('todos'))
        todolist.sort(sorttype);
        resetlist();
        localStorage.setItem("todos",JSON.stringify(todolist))
        getTodos();
    }else{
        console.log("Deadline");
        var todolist = JSON.parse(localStorage.getItem('todos'));
        todolist.sort(function (a, b) {
            var dateA = new Date(a.deadline), dateB = new Date(b.deadline)
            return dateA - dateB
        });
        resetlist();
        localStorage.setItem("todos",JSON.stringify(todolist))
        getTodos();
    }
}

function SearchTodoList() {

    const searchInput = document.getElementById('search')


    searchInput.addEventListener("input", (e) => {

        // declare and assign the value of the event's target to a variable AKA whatever is typed in the search bar
        let value = e.target.value.toLowerCase()

        console.log(value);

        if (value) {

            
            let filteredTodoList = []
            var todolist = JSON.parse(localStorage.getItem('original'))

            for (let index = 0; index < todolist.length; index++) {

                let todotask = todolist[index].todo.toLowerCase()

                if (todotask.indexOf(value) != -1) {

                    filteredTodoList.push(todolist[index])

                }

            }

            resetlist();
            localStorage.setItem("todos",JSON.stringify(filteredTodoList))
            getTodos();


        } else {

            console.log("show original")

            displayOrginal();


        }

    }

    )

}




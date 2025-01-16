const ipElem = document.getElementById('ip-val');
const dateElem = document.getElementById('date-val');
// const add1Elem = document.getElementById('add');
const opElem = document.getElementById('ip-op');
const todo = [{name: 'Breakfast', dueDate: '25-01-2025'},
    {name: 'Lunch', dueDate: '25-01-2025'},
    {name: 'Dinner', dueDate: '25-01-2025'}];

renderTodo();

function renderTodo() {
    let todohtml = '';
    for(let i=0; i<todo.length; i++) {
        const todoList = todo[i];
        const name = todoList.name;
        // {name, dueDate} = todoList; // destructuring shortcut
        const dueDate = todoList.dueDate;
        const html = `<div class="main-div"><p>${name}</p><p>${dueDate}</p><button class="delete-btn" onclick="todo.splice(${i}, 1);
        renderTodo();">Delete</button></div>`;
        todohtml += html;
    }
    console.log(todohtml);
    opElem.innerHTML = todohtml;
}
function add1() {
    const name = ipElem.value;
    const dueDate = dateElem.value;
    // todo.push(val);
     // todo.push({name: name, dueDate: dueDate});
     todo.push({name, dueDate}); //shorthand property
     console.log(todo);
     opElem.innerHTML = todo;
    
    ipElem.value = ''; // reset the text in input
    renderTodo();
}

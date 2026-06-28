// find elements in HTML
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');
const addButton = document.getElementById('add-button');

loadTasks();

addButton.addEventListener('click', function(){

  const taskText = todoInput.value;

  if(taskText === ''){
    return;
  }

  addTaskToPage(taskText, false);
  saveTask(taskText);
  todoInput.value = '';
});

function addTaskToPage(taskText, isChecked){

  const newTask = document.createElement('li');
  newTask.className = 'todo';

  newTask.innerHTML = `
    <input type="checkbox" onchange="markDone(this)" ${isChecked ? 'checked' : ''}>
    <span class="todo-text" style="${isChecked ? 'text-decoration:line-through; color:var(--secondary-color)' : ''}">${taskText}</span>
    <button class="delete-button" type="button" onclick="deleteTask(this, '${taskText}')">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
      </svg>
    </button>
  `;

  todoListUL.appendChild(newTask);
}

function saveTask(taskText){
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks(){
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach(function(task){
    addTaskToPage(task.text, task.completed);
  });
}

function markDone(checkbox){
  const taskText = checkbox.nextElementSibling;
  if(checkbox.checked){
    taskText.style.textDecoration = 'line-through';
    taskText.style.color = 'var(--secondary-color)';
  } else {
    taskText.style.textDecoration = 'none';
    taskText.style.color = 'var(--text-color)';
  }
}

function deleteTask(button, taskText){
  const task = button.parentElement;
  task.remove();
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks = tasks.filter(function(t){ return t.text !== taskText; });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
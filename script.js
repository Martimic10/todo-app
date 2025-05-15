const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');
const toggleThemeBtn = document.getElementById('toggle-theme');

let tasks = JSON.parse(localStorage.getItem('tasks')) || {};

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task;
      
      const delBtn = document.createElement('button');
      delBtn.textContent = '❌';
      delBtn.classList.add('delete-btn');
      delBtn.oneclick = () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      };
      
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }
  
  addBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task !== '') {
      tasks.push(task);
      saveTasks();
      renderTasks();
      taskInput.value = '';
    }
  });
  
  clearBtn.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    renderTasks();
  });
  
  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  
  // Restore theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  
  renderTasks();
document.addEventListener('DOMContentLoaded', () => {
  
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');

    let tasks = [];
  
    function addTask() {
        const taskText = newTaskInput.value.trim();

        if (taskText !== '') {
            const newTask = {
                id: Date.now(),
                text: taskText
            };
            tasks.push(newTask);
            renderTasks();
            newTaskInput.value = '';
        } else {
            alert('Por favor, digite uma tarefa!');
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

   function renderTasks(searchTerm = '') {
        taskList.innerHTML = '';

        const filteredTasks = tasks.filter(task =>
            task.text.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredTasks.length === 0 && searchTerm !== '') {
            const noResultsItem = document.createElement('li');
            noResultsItem.textContent = 'Nenhuma tarefa encontrada.';
            taskList.appendChild(noResultsItem);
            return;
        } else if (filteredTasks.length === 0 && searchTerm === '') {
            const noTasksItem = document.createElement('li');
            noTasksItem.textContent = 'Nenhuma tarefa adicionada ainda.';
            taskList.appendChild(noTasksItem);
            return;
        }


        filteredTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">Excluir</button>
            `;
            taskList.appendChild(listItem);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const taskId = parseInt(event.target.dataset.id);
                deleteTask(taskId);
            });
        });
    }

    addTaskButton.addEventListener('click', addTask);

    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        renderTasks(searchTerm);
    });

    renderTasks();
});

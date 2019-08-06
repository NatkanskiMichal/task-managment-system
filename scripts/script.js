const taskManagmentSystem = () => {

    //counters
    let taskAmount = 0;
    let allTaskAmount = 0;

    const taskInProgress = document.querySelector('.taskInProgress');
    const taskDone = document.querySelector('.taskAmount');
    //date
    const data = new Date().toLocaleString();

    const taskItems = document.querySelector('.taskItems');

    const addTask = () => {
        let taskTitle = document.querySelector('.taskTitle');

        let taskDescription = document.querySelector('.taskDescription');

        let taskPriority = document.querySelector('#taskPriority');
       

        let error = document.querySelector('.taskMainLabel');

         if (taskTitle.value === '') {
            error.textContent = "Podaj tytuł zadania :)";
         } else {
            error.textContent = 'Dodaj Zadanie';

            const checkPriority = (priority) => {
                let task = document.createElement('li');
                task.innerHTML = `<span class="titleStyle">${taskTitle.value}</span></br>${taskDescription.value}</br> ${data}`; 
                task.classList.add(priority);
                taskItems.appendChild(task);

                task.addEventListener('click',() => {
                    task.classList.toggle('taskFinished');
                    if (task.classList.contains('taskFinished')) {
                        taskDone.textContent = ++allTaskAmount;
                    }
                    else {
                        taskDone.textContent = --allTaskAmount;
                    }
                });

                
            }


            if (taskPriority.value === 'niski') {
                checkPriority('low-priority');
            } 
            else if (taskPriority.value == 'normalny') {
                checkPriority('medium-priority');
            }
            else {
                checkPriority('high-priority');
            }

            taskInProgress.textContent = `${++taskAmount} w toku..`;
            taskTitle.value = '';
            taskDescription.value = '';
         }    
    }

    const removeTask = () => {
        const taskElements = document.querySelectorAll('.taskFinished');
       taskElements.forEach(el => {
           el.parentNode.removeChild(el);
       });
    }

    const addBtn = document.querySelector('.btn-success').addEventListener('click', addTask);

    const removeBtn = document.querySelector('.btn-danger').addEventListener('click', removeTask);
    
}

taskManagmentSystem();

$(document).ready(function() {
    
    taskListener();
    
    //variables with tasks in progress
    
    let taskAmount = 0;
    let allTaskAmount = 0;
    
    //data
    
    let date = new Date();
    let dd = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    if(minutes < 10) {
        minutes = '0' + minutes;
    }
    
    if(hours < 10) {
        hours = '0' + hours;
    }
    
    if(dd<10) {
        dd = '0' + dd;
    }
    
    if(month<10) {
        month = '0' + month;
    }
    
    date = month + '/' + dd + '/' + year + " | " + hours + ":" + minutes;

//listener , addTask
    $('.taskAdd').click(function() {
        addTask();
    })
    
//listener clear task with taskFinished class    
    $('.taskClear').click(function() {
        removeDoneTask();
    })
    
    //function with each loop for li elements
    function removeDoneTask() {
        
        $('.taskItems li').each(function() {
        //loop each for li elements, if has class (hasClass) taskFinished then this element will be removed
        if($(this).hasClass('taskFinished')) {
            $(this).remove();
        } 
        })
        
    }
    
    //funkction for btn taskAdd 
    function addTask() {
        
        let taskTitle = $('.taskTitle').val(); //gets a value from the task
        let taskDescription = $('.taskDescription').val();  //from description task
        let taskPriority = $('#taskPriority option:selected').text();   //gets a priority
        
        
        //checks if the input is empty
        if (taskTitle === '') {
            $('.taskMainLabel').addClass('error');
            $('.taskMainLabel').html('<i class="fa fa-exclamation"></i> Zadanie musi mieć tytuł <i class="fa fa-exclamation"></i>');
        } else {  //if the input are empty then error class are removed and restores text for label
            $('.taskMainLabel').removeClass('error');
            $('.taskMainLabel').html('Dodaj Zadanie');

            //checks priority of the task and adds task to the list 
            
            if (taskPriority == "Normalny") {
                //prepend adds content to the element so we add the html code and variable with the text value from the input and description analogically to the three options
                $('.taskItems').prepend('<li class="medium-priority"><span class="titleStyle">' + taskTitle + '</span></br>' + taskDescription + '</br>' + date + '</li>');
                
            } else if (taskPriority == "Wysoki") {
                $('.taskItems').prepend('<li class="high-priority"><span class="titleStyle">' + taskTitle + '</span></br>' + taskDescription + '</br>' + date +  '</li>');
            } else {
                $('.taskItems').prepend('<li class="low-priority"><span class="titleStyle">' + taskTitle + '</span></br>' + taskDescription + '</br>' + date +  '</li>'); 
            }
            //the task counter changes the text depending on their quantity
            taskAmount = taskAmount + 1;
            if (taskAmount == 1) {
                $('.taskInProgress').text(taskAmount.toString() + ' zadanie w toku...');
            } else if (taskAmount < 5 && taskAmount != 0) {
                $('.taskInProgress').text(taskAmount.toString() + ' zadania w toku...');
            } else {
                 $('.taskInProgress').text(taskAmount.toString() + ' zadań w toku...');
            }
        }
        //clean the input field after adding the task
        $('.taskTitle').val('');
        $('.taskDescription').val('');
        
        taskListener();
    }
    
    //listens to all elements of li in .taskItems and after clicking updates the count of completed tasks
    function taskListener() {
        
        $('.taskItems li').off();
        
        $('.taskItems li').on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('taskFinished')) {
                $(this).removeClass('taskFinished');
                taskAmount = taskAmount + 1;
                allTaskAmount = allTaskAmount - 1;
                
                
                if (taskAmount == 1) {
                $('.taskInProgress').text(taskAmount.toString() + ' zadanie w toku...');
            } else if (taskAmount < 5 && taskAmount != 0) {
                $('.taskInProgress').text(taskAmount.toString() + ' zadania w toku...');
            } else {
                 $('.taskInProgress').text(taskAmount.toString() + ' zadań w toku...');
            }
                
                $('.taskAmount').text(allTaskAmount.toString());
            } 
            
            else {
                $(this).addClass('taskFinished');
                taskAmount = taskAmount - 1;
                allTaskAmount = allTaskAmount + 1;
                if (taskAmount == 1) {
                $('.taskInProgress').text(taskAmount.toString() + ' zadanie w toku...');
            } else if (taskAmount < 5 && taskAmount != 0) {
                $('.taskInProgress').text(taskAmount.toString() + ' zadania w toku...');
            } else {
                 $('.taskInProgress').text(taskAmount.toString() + ' zadań w toku...');
            }
                $('.taskAmount').text(allTaskAmount.toString());
            }
        })
        
    }
})
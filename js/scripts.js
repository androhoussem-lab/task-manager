const taskInput = document.getElementById("input-task");
const startDate = document.getElementById("start");
const endDate = document.getElementById("end");
const color = document.getElementById("color");
const statusSelect = document.getElementById("status");
const btnSubmit = document.getElementById("btn-submit");
const btnClear = document.getElementById("btn-clear");
const message = document.getElementById("message");
const todoList = document.getElementById("data-list");
const statusList = ["To do", "In progress", "To verify", "Done"];




btnSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    if (taskInput.value.length === 0) {
        showMessage("Check your input and try again","darkred");
    } else {
        let todo = {
            task: taskInput.value,
            startDate: startDate.value,
            endDate: endDate.value,
            color: color.value,
            status: statusSelect.value,
        };
        let data = JSON.parse(localStorage.getItem("tasks"));
        if (data === null) {
            data = [];
            data.push(todo);
            localStorage.setItem("tasks", JSON.stringify(data));
        } else {
            data.push(todo);
            localStorage.setItem("tasks", JSON.stringify(data));
        }
        showMessage("Task registered with success","green");
        taskInput.value = "";
        startDate.value = "2000-01-01";
        endDate.value = "2000-01-01";
        statusList.value = 0;

    }
});



btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    if (localStorage.length === 0) {
        showMessage("List is empty","darkred");
        window.scroll({
            top: 50,
            behavior: "smooth"
        });
    }
    else if (confirm("Do you want to clear all tasks?")) {
        localStorage.clear();
        showMessage("List deleted with success","green");
       
    }
});
if (localStorage.length === 0) {
    todoList.innerHTML = "<p>Empty list, enter your task and status (^_^)</p>";

} else {

    let dataFromStorage = JSON.parse(localStorage.getItem("tasks"));
    let listItem;
    for (let i = 0; i < dataFromStorage.length; i++) {
        listItem = document.createElement("li");
        let paragraph = document.createElement("p");
        let statusSpan = document.createElement("span");
        let taskText = document.createTextNode(dataFromStorage[i].task);
        paragraph.appendChild(taskText);
        let taskStatus = document.createTextNode(statusList[parseInt(dataFromStorage[i].status)]);
        statusSpan.appendChild(taskStatus);
        listItem.appendChild(paragraph);
        listItem.appendChild(statusSpan);
        listItem.style.backgroundColor = dataFromStorage[i].color;
        listItem.style.color = "white";
        listItem.addEventListener("click",function(){
                showData(dataFromStorage[i]);
        });
        todoList.appendChild(listItem);
    }

}


function showData(task) {
    taskInput.value = task.task;
    statusSelect.value = task.status; //TODO chech this line
    startDate.value = task.startDate;
    console.log( task.startDate);
    endDate.value = task.endDate;
    color.value = task.color;
   
}




function showMessage(content , color){
    window.scroll({
        top: 50,
        behavior: "smooth"
    });
    message.innerText = content;
    message.style.backgroundColor = color;
    message.style.display = "inline-block";
    let timer = setInterval(function () {
        message.style.display = "none";
        location.reload();
        clearInterval(timer);
    }, 1500);
}
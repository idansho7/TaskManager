class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
        this.id = Math.ceil(Math.random() * 1000);
    }

    get(propName) {
        return this[propName];
    }

    set(propName, value) {
        this[propName] = value;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        this.tasks.push(new Task(description));
        if (this.tasks.filter((task) => task.id == this.tasks[this.tasks.length - 1].id).length > 1) {
            this.tasks.pop();
            this.tasks.push(new Task(description));
        }
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id != id);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    updateTaskDescription(id) {
        let description = prompt("Enter new description:");
        if (description == "") {
            alert('Please input description for the task!');
        } else if (description != null){
            this.tasks.find((task) => task.id == id).description = description;
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }
    }

    completeTask(id) {
        this.tasks.find((task) => task.id == id).completed = true;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    clearTasks(type) {
        this.tasks = this.tasks.filter((task) => task.completed == type)
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    getTasks() {
        return this.tasks;
    }
}
if (!localStorage.getItem("tasks")) {
    var manager = new TaskManager();
} else {
    var manager = new TaskManager();
    manager.tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let task of JSON.parse(localStorage.getItem("tasks"))) {
        if (task.completed) {
            document.getElementById('completeTasks').innerHTML +=
        `
        <tr id="tr${task.id}" class="completedTR">
            <td id="desc${task.id}">
                ${task.description}
            </td>
            <td>
                <div class="buttons">
                    <img src="/icons/checkmark.png" alt="" class="icon">
                </div>
            </td>
        </tr>
        `;
        }
        if (!task.completed) {
            document.getElementById('incompleteTasks').innerHTML +=
            `
            <tr id="tr${task.id}">
                <td id="desc${task.id}">
                    ${task.description}
                </td>
                <td>
                    <div class="buttons">
                    <img onclick="completeTask(${task.id})" src="/icons/checkmark.png" alt="" class="icon">
                    <img onclick="updateTask(${task.id})" src="/icons/edit.png" alt="" class="icon">
                    <img onclick="deleteTask(${task.id})" src="/icons/trash.png" alt="" class="icon">
                    </div>
                </td>
            </tr>
            `;
        }
    }
}

function addTask(input) {
    if (input == "") {
        alert('Please input description for the task!');
    } else {
        manager.addTask(input);
        let newID = manager.tasks[manager.tasks.length - 1].get('id');
        document.getElementById('incompleteTasks').innerHTML +=
        `
        <tr id="tr${newID}">
            <td id="desc${newID}">
                ${input}
            </td>
            <td>
                <div class="buttons">
                    <img onclick="completeTask(${newID})" src="/icons/checkmark.png" alt="" class="icon">
                    <img onclick="updateTask(${newID})" src="/icons/edit.png" alt="" class="icon">
                    <img onclick="deleteTask(${newID})" src="/icons/trash.png" alt="" class="icon">
                </div>
            </td>
        </tr>
        `;
    }
    document.getElementById('taskDesc').value = "";
}

function completeTask(id) {
    let newDesc = document.getElementById(`desc${id}`).innerHTML;
    document.getElementById(`tr${id}`).remove();
    manager.completeTask(id);
    document.getElementById('completeTasks').innerHTML +=
        `
    <tr id="tr${id}" class="completedTR">
        <td id="desc${id}">
            ${newDesc}
        </td>
        <td>
            <div class="buttons">
                <img src="/icons/checkmark.png" alt="" class="icon">
            </div>
        </td>
        
    </tr>
    `;
}

function updateTask(id) {

    manager.updateTaskDescription(id);
    document.getElementById(`desc${id}`).innerHTML =
        `
    ${manager.tasks.find((task) => task.id == id).description}
    `;
}

function deleteTask(id) {
    manager.deleteTask(id);
    document.getElementById(`tr${id}`).remove();
}

function clearComplete() {
    manager.clearTasks(false);
    document.getElementById('completeTasks').innerHTML = ``;
}

function clearIncomplete() {
    manager.clearTasks(true);
    document.getElementById('incompleteTasks').innerHTML = ``;
}

function clearAll() {
    manager.clearTasks(null);
    document.getElementById('completeTasks').innerHTML = ``;
    document.getElementById('incompleteTasks').innerHTML = ``;
}

function displayTasksLOG() {
    console.log(manager.tasks);
}
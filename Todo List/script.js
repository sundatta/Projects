const addTaskInput = document.getElementById("add-task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const task = document.getElementById("task");
const taskList = document.getElementById("task-list");
const taskDetails = document.getElementById("task-details");
const deleteBtn = document.getElementById("delete");

// Load saved tasks on page load
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(taskText => {
        const newTask = document.createElement("div");
        newTask.classList.add("task");

        const taskDetails = document.createElement("div");
        taskDetails.classList.add("task-details");
        taskDetails.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "✕";

        deleteBtn.onclick = () => {
            newTask.remove();
            removeTaskFromStorage(taskText);
        };

        newTask.appendChild(taskDetails);
        newTask.appendChild(deleteBtn);
        taskList.appendChild(newTask);
    });
};

addTaskBtn.onclick = () => {
    const taskDetailsValue = addTaskInput.value.trim();
    if (taskDetailsValue === "") return; // prevent empty tasks

    // Create new task div
    const newTask = document.createElement("div");
    newTask.classList.add("task");

    // Create task details div
    const taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");
    taskDetails.textContent = taskDetailsValue;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "✕";

    // Delete functionality
    deleteBtn.onclick = () => {
        newTask.remove();
        removeTaskFromStorage(taskDetailsValue);
    };

    // Append details and delete button to task
    newTask.appendChild(taskDetails);
    newTask.appendChild(deleteBtn);

    // Append new task to the list
    taskList.appendChild(newTask);

    // Save to localStorage
    saveTaskToStorage(taskDetailsValue);

    // Clear input
    addTaskInput.value = "";
};

// Save task
function saveTaskToStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

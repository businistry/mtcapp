// Front-end code (script.js)
const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");

// Add a new task to the list
const addTask = (task) => {
  const newTask = document.createElement("li");
  newTask.innerHTML = `
    <span class="task-name">${task.name}</span>
    <span class="task-description">${task.description}</span>
    <span class="task-priority">${task.priority}</span>
    <button class="delete-button">X</button>
  `;

  // Add a delete button event listener
  const deleteButton = newTask.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    // Remove the task from the list
    newTask.remove();

    // Remove the task from the database
    deleteTask(task.id);
  });

  // Add the new task to the list
  taskList.appendChild(newTask);
};

// Get all tasks from the database
const getTasks = () => {
  fetch("/api/tasks")
    .then((response) => response.json())
    .then((data) => {
      // Clear the task list
      taskList.innerHTML = "";

      // Add each task to the list
      data.forEach((task) => {
        addTask(task);
      });
    });
};

// Add a new task to the database
const createTask = (task) => {
  fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => {
    if (response.ok) {
      // Get all tasks from the database
      getTasks();
    } else {
      console.error("Error creating task");
    }
  });
};

// Delete a task from the database
const deleteTask = (id) => {
  fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      // Get all tasks from the database
      getTasks();
    } else {
      console.error("Error deleting task");
    }
  });
};

// Event listener for the task form
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the task data from the form
  const taskName = event.target.querySelector("#task-name").value;
  const taskDescription = event.target.querySelector("#task-description").value;
  const taskPriority = event.target.querySelector("#task-priority").value;

  // Create a new task object
  const task = {
    name: taskName,
    description: taskDescription,
    priority: taskPriority,
  };

  // Add the task to the database
  createTask(task);
});

// Get all tasks from the database on page load
getTasks();
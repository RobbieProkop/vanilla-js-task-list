// Define UI Variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.getElementById("filter");
const taskInput = document.getElementById("task");

const loadEventListeners = () => {
  //DOm Load Event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add Task event
  form.addEventListener("submit", addTask);

  //Remove Task Event
  taskList.addEventListener("click", removeTask);

  //Clear all tasks
  clearBtn.addEventListener("click", clearTasks);

  // FIlter tasks
  filter.addEventListener("keyup", filterTasks);
};

//Get Tasks from LS
const getTasks = () => {
  let tasks = [];
  if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    //Create LI element
    const li = document.createElement("li");
    //Add Class
    li.className = "collection-item";
    //create text-node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element for X delete
    const link = document.createElement("a");
    //Add CLass
    link.className = "delete-item secondary-content";
    //Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to LI
    li.appendChild(link);
    //append LI to UL
    taskList.appendChild(li);
  });
};

//Add Task
const addTask = (e) => {
  if (taskInput.value === "") {
    alert("Please Add a Task");
  }
  e.preventDefault();
  //Create LI element
  const li = document.createElement("li");
  //Add Class
  li.className = "collection-item";
  //create text-node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element for X delete
  const link = document.createElement("a");
  //Add CLass
  link.className = "delete-item secondary-content";
  //Add Icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append link to LI
  li.appendChild(link);
  //append LI to UL
  taskList.appendChild(li);

  // store to localStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";
};

//Store to local Storage function
const storeTaskInLocalStorage = (task) => {
  let tasks = [];
  if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Remove Task
const removeTask = (e) => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

//Remove from LS
const removeTaskFromLocalStorage = (taskItem) => {
  let tasks = [];
  if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Clear Tasks
const clearTasks = () => {
  // taskList.innerHTML = "";

  //Faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
};

//Filter Tasks
const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
};

//load all event listners
loadEventListeners();

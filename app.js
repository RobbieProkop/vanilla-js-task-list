// Define UI Variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.getElementById("filter");
const taskInput = document.getElementById("task");

const loadEventListeners = () => {
  // Add Task event

  form.addEventListener("submit", addTask);

  //Remove Task Event
  taskList.addEventListener("click", removeTask);

  //Clear all tasks
  clearBtn.addEventListener("click", clearTasks);
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

  // clear input
  taskInput.value = "";
};

const removeTask = (e) => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
};

//Clear Tasks
const clearTasks = () => {
  // taskList.innerHTML = "";

  //Faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
};

//load all event listners
loadEventListeners();

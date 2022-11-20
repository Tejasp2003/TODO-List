const taskInput = document.querySelector(".task-input input");
let todos = JSON.parse(localStorage.getItem("todo-list"));
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn")

 let editId;
 let isEditedTask = false;

 filters.forEach(btn=>
  {
    btn.addEventListener("click", ()=>
    {
      document.querySelector("span.active").classList.remove("active");
      btn.classList.add("active")
      showTodos(btn.id)
    });
  });

function showTodos(filter) {
  let li = "";
  if (todos) {
    todos.forEach((todos, id) => {
      let isCompleted = todos.status == "completed" ? "checked" : "";
      if(filter==todos.status|| filter=="all")
      {
        li += `<li class="task">
        <label for="${id}">
          <input onClick="updateStatus(this)" type="checkbox"  id="${id}" ${isCompleted}>
          <p class="${isCompleted}">${todos.name}</p>
        </label>
        <div class="settings">
          <i onClick = "showMenu(this)" class="uil uil-ellipsis-h"></i>
          <ul class="task-menu">
            <li onClick="editTask(${id}, '${todos.name}')"><i class="uil uil-edit"></i>Edit</li>
            <li onClick="deleteTask(${id})"><i class="uil uil-trash-alt"></i>Delete</li>
          </ul>
        </div>
      </li>
      `;

      }
      
    });
  }

  taskBox.innerHTML = li || `<span> You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodos("all");
function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", e=>
  {
    if(e.target.tagName!= "I" || e.target!=selectedTask)
    {
      taskMenu.classList.remove("show")
    }
  });

}
clearAll.addEventListener("click", ()=>
{
  isEditedTask=false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  taskInput.value="";
  showTodos();
  
})
function deleteTask(deleteId, filter)
{ 
  isEditedTask=false;
  //splice is used to add/remove elements from array. 1st parameter shows the index and 2nd paramater shows the amount of elemnts to be add/remove
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodos(filter);
}

function editTask(taskId, taskName)
{
  editId=taskId;
  taskInput.value=taskName;
  isEditedTask=true;
  taskInput.focus();
  taskInput.classList.add("active");
}
function updateStatus(selectedTask) {
  // console.log(selectedTask);
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if(!isEditedTask)
    {
      todos = !todos ? [] : todos;
        let taskInfo = {
          name: userTask,
          status: "pending",
        };
        todos.push(taskInfo);
    }
    else{
      isEditedTask=false;
      todos[editId].name= userTask;
    }
    
    
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodos(document.querySelector("span.active").id);
  }
  
});

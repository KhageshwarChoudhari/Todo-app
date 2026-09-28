let todos = [];
let editTodoId = null;
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const totalTasks = document.querySelector("#total-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const formBtn = document.querySelector("#formBtn");
let counter = () => (totalTasks.innerHTML = todos.length);
let comcounter = () =>
  (completedTasks.textContent = todos.filter(
    (todo) => todo.iscompleted,
  ).length);

todoForm.addEventListener("submit", (e) => {
  // Prevent the form from submitting and refreshing the page
  e.preventDefault();
  const todotask = todoInput.value.trim();
  if (!todotask) {
    editTodoId = null;
    formBtn.textContent = "Add";
    todoInput.value = "";
    return;
  }
  if (editTodoId !== null) {
    todos = todos.map((todo) => {
      if (todo.id === Number(editTodoId)) {
        return {
          ...todo,
          task: todotask,
        };
      }
      return todo;
    });
    editTodoId = null;
    formBtn.textContent = "Add";
    todoInput.value = "";
  } else {
    // Get the value of the input field and trim any whitespace

    let newTodo = { id: Date.now(), task: todotask, iscompleted: false };
    todos.push(newTodo);
    todoInput.value = "";
  }
  renderTodos();
});

// Render the initial list of todos when the page loads
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className =
      "flex border border-slate-300  gap-2 mb- bg-gray-100 p-4 rounded-lg w-full";
    li.dataset.id = todo.id;
    li.innerHTML = `
   <input data-action = "toggle" ${todo.iscompleted ? "checked" : ""} type="checkbox">
  <p  class="flex-1 ${todo.iscompleted ? "line-through" : ""} ">${todo.task}</p>
   <div class = " flex gap-2" > <button data-action="edit" class="${todo.iscompleted ? " hidden " : " block "} bg-green-500 text-white px-2 rounded-lg hover:bg-green-600">Edit</button>
   <button data-action="delete" class="bg-red-500 text-white px-2 rounded-lg hover:bg-red-600">Delete</button> </div>
   `;
    todoList.appendChild(li);
  });
  counter();
  comcounter();
}
renderTodos();

todoList.addEventListener("click", (e) => {
  const li = e.target.closest("li");

  if (!li) return;

  const id = li.dataset.id;
  const action = e.target.dataset.action;

  if (action === "edit") {
    startedit(id);
  }
  if (action === "delete") {
    deleteTodo(id);
  }
  if (action === "toggle") {
    todos = todos.map((todo) => {
      if (todo.id === Number(id)) {
        return {
          ...todo,
          iscompleted: !todo.iscompleted,
        };
      }
      return todo;
    });
    renderTodos();
  }
});

function deleteTodo(id) {
  todos = todos.filter((todo) => {
    return todo.id !== Number(id);
  });

  renderTodos();
}

function startedit(id) {
  let currenttodo = todos.find((todo) => todo.id === Number(id));
  todoInput.value = currenttodo.task;
  formBtn.textContent = "Update";
  editTodoId = id;
}

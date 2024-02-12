//targeting classes of HTML using DOM methods
let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");
let todo;
let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

//creating function to get unique id
function uuid() {
  let uniqueid = crypto.randomUUID();
  return uniqueid;
}

//addEventListener will perform task whenever click on add button
addTodoButton.addEventListener("click", (e) => {
  e.preventDefault();
  todo = todoInput.value;
  //below we're basically storing values(length>0) in the form of array (todoList) from todo (passed from todoInput.value)
  if (todo.length > 0) {
    todoList.push({ id: uuid(), todo: todo, isCompleted: false });
  }
  renderTodoList(todoList);
  localStorage.setItem("todos", JSON.stringify(todoList));
  todoInput.value=""; //after adding it will make input field empty
});

//below code will perform tasks when user click checkbox 
showTodos.addEventListener("click", (e) => {
  let key = e.target.dataset.key;
  let delTodoKey = e.target.dataset.todokey;
  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  todoList = todoList.filter((todo) => todo.id !== delTodoKey); //return all the todo key which is not equal to delTodoKey id
  localStorage.setItem("todos", JSON.stringify(todoList));
  renderTodoList(todoList);
});

//below code basically will add HTMl 
function renderTodoList(todoList) {
  showTodos.innerHTML = todoList.map(
    ({ id, todo, isCompleted }) =>
 `<div class="todo relative"> 
    <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" ${isCompleted ? "checked" : ""}>
    <label data-key=${id} class="todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" for="item-${id}"> ${todo} </label>
    <button class="absolute right-0 button cursor">
      <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
    </button>
  </div>`
  );
}
renderTodoList(todoList);

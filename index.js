const secTodoMain = document.querySelector(".todo-container");
const btnElem = document.querySelector(".btn");
const inputTodo = document.getElementById("inputValue");


const getTodoListFromLocal = () => {
  try {
    return JSON.parse(localStorage.getItem("todoListInLocal"));
  } catch (error) {
    console.error("Error parsing local storage data:", error);
    return [];
  }
};
let localTodoElemList = getTodoListFromLocal() || [];

const addTodoDynamic=(curElem)=>{
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("main_todo_div");

  let mainList = document.createElement("li");
  mainList.textContent = curElem;

  let getBtn = document.createElement("button");
  getBtn.classList.add("deleteBtn");
  getBtn.innerText = "Delete"; 

  mainDiv.append(mainList);
  mainDiv.append(getBtn);

  secTodoMain.append(mainDiv);
}
const addToDoList =(e)=>{
e.preventDefault();
const todoElem = inputTodo.value.trim();
if(todoElem !== "" && !localTodoElemList.includes(todoElem)){
 localTodoElemList.push(todoElem);
 localTodoElemList = [...new Set(localTodoElemList)];
 console.log(localTodoElemList);
 localStorage.setItem("addToLocal",JSON.stringify(localTodoElemList));

 inputTodo.value = "";
 addTodoDynamic(todoElem);
}
}
const showTodoList = ()=>{
  localTodoElemList.forEach((curElem) => {
    addTodoDynamic(curElem);    
  });
}
window.onload = showTodoList();


const updateLocalStorage = () =>{
  return localStorage.setItem("addToLocal",JSON.stringify(localTodoElemList));
}


//*Event Delegation.....
const removeTodo = (e) =>{
e.preventDefault();

let removeTodo = e.target;
let eventSelectList = removeTodo.previousElementSibling.innerText;

let eventSelectParent = removeTodo.parentElement;

localTodoElemList = localTodoElemList.filter((curTodo)=>{
  return curTodo !== eventSelectList.toLowerCase();
})
updateLocalStorage(localTodoElemList);
eventSelectParent.remove();
}
secTodoMain.addEventListener('click',(e)=>{
  if(e.target.classList.contains("deleteBtn")){
    removeTodo(e);
  }
})
btnElem.addEventListener('click',(e)=>{
  addToDoList(e);
})
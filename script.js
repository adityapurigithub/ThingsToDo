//selecting all the required elements...
const inputBox=document.querySelector(".todo-input input");
const addBtn=document.querySelector(".todo-input button");
const todoList=document.querySelector(".todo-list");
const filters=document.querySelector(".filters");
const pendingNo=document.querySelector("#pending-task");
const clearAll=document.querySelector("#clear-all");

//eventListener......

addBtn.addEventListener("click",addToDO);
todoList.addEventListener("click",delDone);
filters.addEventListener("click",filtersTodo);
clearAll.addEventListener("click",clear)
document.addEventListener("DOMContentLoaded",getTodo);


//functions......

function addToDO(e){
	e.preventDefault();

	if(inputBox.value==0){
		alert("Please Enter Something in the Field !!!");
		return;
	}else{
		const todoDiv=document.createElement("div");
		todoDiv.classList.add("todo");

		const newTodo=document.createElement("li");
		newTodo.classList.add("todo-li");
		newTodo.innerText=inputBox.value;
		

		todoDiv.appendChild(newTodo);

		//here adding todos to local storage
		saveLocalTodos(inputBox.value);

		// done button...
		const doneBtn=document.createElement("button");
		doneBtn.classList.add('done-btn');
		doneBtn.innerHTML='<i class="fas fa-check"></i>';

		todoDiv.appendChild(doneBtn);

		// del button...
		const delBtn=document.createElement("button");
		delBtn.classList.add('del-btn');
		delBtn.innerHTML='<i class="fas fa-trash"></i>';
		

		todoDiv.appendChild(delBtn);


		//appending to the todo list container...
		todoList.appendChild(todoDiv);

		
		inputBox.value="";
	}

}
function delDone(e){  //
	e.preventDefault();
	const item=e.target;
	// console.log(item); //getting the target element..

	//Delete...
	if (item.classList[0]==="del-btn") {
		const todoLi=item.parentElement;
		todoLi.classList.add("del-mation"); //added class for animation
		removeLocalStorage(todoLi);
		todoLi.addEventListener("transitionend",function(){  //when transtion ends then this func exec.
			todoLi.remove();
		});
		
	}

	//Done...
	if(item.classList[0]==="done-btn"){
		const todoLi=item.parentElement;
		todoLi.classList.add("done-mation");
	}

}

function filtersTodo(e) {
	const todos=todoList.childNodes;
	// console.log(todos);

	todos.forEach(function(todo){
		console.log(todo);
		switch(e.target.value){
			case "all":
			todo.style.display="flex";
			break;
			
			case "completed":
			if(todo.classList.contains("done-mation")){
				todo.style.display="flex"; //showing the completed one...having class done-mation
			}else{
				todo.style.display="none";  //else not showing..
			}
			break;

			case "uncompleted":
			if(!todo.classList.contains("done-mation")){
				todo.style.display="flex";
			}else{
				todo.style.display="none";
			}
			break;
		}
	})
}

//saving on local storage...
function saveLocalTodos(todo){
	// console.log(todo);
	let todos;  
	if(localStorage.getItem("todos")===null){ //if local storage is null creating a empty arr
		todos=[]; 
	}else{
		todos=JSON.parse(localStorage.getItem("todos"));  //JSON string to js  object
	}
	todos.push(todo);// pushing user data to arr...

	localStorage.setItem("todos",JSON.stringify(todos));//	//setting back the local storage...js object to JSON string

	pendingNo.innerText=todos.length;
	// console.log(todos.length);

}

//getting from localStorage..
function getTodo() {
	// console.log("getTodo",todo);
	
	let todos;
	if(localStorage.getItem("todos")===null){
		todos=[];  
	}else{
		todos=JSON.parse(localStorage.getItem("todos"));  
	}
	

	todos.forEach(function(todo){
		const todoDiv=document.createElement("div");
		todoDiv.classList.add("todo");

		const newTodo=document.createElement("li");
		newTodo.classList.add("todo-li");
		newTodo.innerText=todo;
		

		todoDiv.appendChild(newTodo);


		//done button...
		const doneBtn=document.createElement("button");
		doneBtn.classList.add('done-btn');
		doneBtn.innerHTML='<i class="fas fa-check"></i>';

		todoDiv.appendChild(doneBtn);

		// del button...
		const delBtn=document.createElement("button");
		delBtn.classList.add('del-btn');
		delBtn.innerHTML='<i class="fas fa-trash"></i>';

		todoDiv.appendChild(delBtn);

		//appending to the todo list container...
		todoList.appendChild(todoDiv);
	})
	pendingNo.innerText=todos.length;

}
function removeLocalStorage(todo){ //function to remove from local storage
	let todos;
		if(localStorage.getItem("todos")===null){
			todos=[];
		}else{
			todos=JSON.parse(localStorage.getItem("todos"));
		}
	// console.log(todos.indexOf(todo.children[0].innerText));

		const index=todos.indexOf(todo.children[0].innerText);
		todos.splice(index,1);


		localStorage.setItem("todos",JSON.stringify(todos));
		pendingNo.innerText=todos.length;
}
function clear(){  //to clear all the todo items
	
	let todos=[];
	
	todoList.classList.add("del-mation");
	todoList.addEventListener("transitionend",function(){  //when transtion ends then this func exec.
		location.reload();// I used this so that page get reloads and items get cleared..
	});
	localStorage.setItem("todos",JSON.stringify(todos));
	pendingNo.textContent=todos.length;
	 
}

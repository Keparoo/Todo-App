const form = document.querySelector('form');
const todoEls = document.querySelector('#todos');
let id = localStorage.getItem('id') || 0;

//Get Todos from localStorage
let todoList = JSON.parse(localStorage.getItem('todos')) || [];
for (let todo of todoList) {
	newLi = document.createElement('li');
	newLi.innerText = todo.task;
	newLi.complete = todo.complete;
	newLi.id = todo.id;
	if (newLi.complete === 'true') {
		newLi.style.textDecoration = 'line-through';
	}
	newButton = document.createElement('button');
	newButton.innerText = 'X';
	newLi.append(newButton);
	todoEls.append(newLi);
}

// Handle input form
form.addEventListener('submit', e => {
	e.preventDefault();
	const todo = document.querySelector('#newTodo');
	const newTodo = document.createElement('li');

	if (todo.value) {
		id++;
		newTodo.innerText = todo.value + ' ';
		newTodo.id = id;
		newButton = document.createElement('button');
		newButton.innerText = 'X';
		newTodo.append(newButton);
		todoEls.append(newTodo);

		// Update object list and set to localStorage
		todoList.push({ id: id, task: todo.value, complete: 'false' });
		localStorage.setItem('id', id);
		localStorage.setItem('todos', JSON.stringify(todoList));

		todo.value = '';
		todo.focus();
	}
});

// Handle item deletion
todoEls.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON') {
		let newTodos = todoList.filter(
			todo => todo.id !== parseInt(e.target.parentElement.id)
		);
		todoList = newTodos;
		localStorage.setItem('todos', JSON.stringify(todoList));
		e.target.parentElement.remove();
	}

	// Handle complete vs not complete
	if (e.target.tagName === 'LI') {
		if (e.target.style.textDecoration === 'line-through') {
			e.target.style.textDecoration = 'none';
			e.target.complete = 'false';
		} else {
			e.target.style.textDecoration = 'line-through';
			e.target.complete = 'true';
		}
		for (let item of todoList) {
			if (item.id === parseInt(e.target.id)) {
				item.complete = item.complete === 'true' ? 'false' : 'true';
			}
		}

		localStorage.setItem('todos', JSON.stringify(todoList));
	}
});

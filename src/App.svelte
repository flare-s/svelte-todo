<script>
	import "./css/reset.css";
	import "./css/style.css";

	let todos = [
		{
			id: 1,
		title: "Finish Svelte course",
		isComplete: false,
		isEditing: false},
		{
			id: 2,
		title: "Go for a run",
		isComplete: false,
		isEditing: false},
		{
		id: 3,
		title: "Cook something to eat",
		isComplete: true,
		isEditing: false}
	]

	const createId = () => {
		return todos.length === 0 ? 1 : todos[todos.length - 1].id + 1
	}
	let todoTitle = "";
	const addNewTodo = () => {
		todos = [...todos, {
			id: createId(),
			title: todoTitle,
			isComplete: false,
			isEditing: false
		}]
		todoTitle = ""
	}

	const deleteTodo = (id) => {
		todos = todos.filter(todo => todo.id !== id)
	}

	const checkAllTodos = () => {
		todos = todos.map(todo => {
			todo.isComplete = true;
			return todo
		})
	}

  </script>
  
  <div class="todo-app-container">
	<div class="todo-app">
	  <h2>Todo App</h2>
	  <form action="#" on:submit|preventDefault={addNewTodo}>
		<input
		  type="text"
		  class="todo-input"
		  placeholder="What do you need to do?"
		  bind:value={todoTitle}
		/>
	  </form>
  
	  <ul class="todo-list">
		{#each todos as todo}
		<li class="todo-item-container {todo.id}" class:line-through={todo.isComplete}>
			<div class="todo-item">
			  <input type="checkbox" bind:checked={todo.isComplete}/>
			  <span class="todo-item-label">{todo.title}</span>
			  <!-- <input
				type="text"
				class="todo-item-input"
				value="Finish Svelte Series"
			  /> -->
			</div>
			<button class="x-button" on:click={deleteTodo(todo.id)}>
			  <svg
				class="x-button-icon"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			  >
				<path
				  strokeLinecap="round"
				  strokeLinejoin="round"
				  strokeWidth={2}
				  d="M6 18L18 6M6 6l12 12"
				/>
			  </svg>
			</button>
		  </li>
		{/each}
	  </ul>
  
	  <div class="check-all-container">
		<div>
		  <button on:click={checkAllTodos} class="button">Check All</button>
		</div>
  
		<span>3 items remaining</span>
	  </div>
  
	  <div class="other-buttons-container">
		<div>
		  <button class="button filter-button filter-button-active"> All </button>
		  <button class="button filter-button">Active</button>
		  <button class="button filter-button">Completed</button>
		</div>
		<div>
		  <button class="button">Clear completed</button>
		</div>
	  </div>
	</div>
  </div>



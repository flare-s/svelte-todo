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


	let currentFilter = "all"
	$: 
		filteredTodos = currentFilter === "all" ? todos 
		: currentFilter === "active" 
		? todos.filter(todo => !todo.isComplete) 
		: todos.filter(todo => todo.isComplete)


	const createId = () => {
		return todos.length === 0 ? 1 : todos[todos.length - 1].id + 1
	}

	$: uncompletedTodos = todos.filter(todo => !todo.isComplete).length

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

	const clearCompletedTodos = () => {
		todos = todos.filter(todo => !todo.isComplete)
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
	  {#if todos.length > 0}
		 <!-- content here -->
		 <ul class="todo-list">
			{#each filteredTodos as todo}
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
	  
			<span>{uncompletedTodos} items remaining</span>
		  </div>
	  
		  <div class="other-buttons-container">
			<div>
			  <button class="button filter-button" on:click={() => currentFilter = "all"} class:filter-button-active={currentFilter === "all"}> All </button>
			  <button class="button filter-button" on:click={() => currentFilter = "active"} class:filter-button-active={currentFilter === "active"}>Active</button>
			  <button class="button filter-button" on:click={() => currentFilter = "completed"} class:filter-button-active={currentFilter === "completed"}>Completed</button>
			</div>
			<div>
			  <button class="button" on:click={clearCompletedTodos}>Clear completed</button>
			</div>
		  </div>
	  {:else}
		 <p class="todo-list-empty">You don't have any todos at the moment</p>
	  {/if}
	  
	</div>
  </div>



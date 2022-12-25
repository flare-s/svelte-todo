<script>
    import {fade, fly} from "svelte/transition"
    import {todos} from "./store/TodoStore"

  let currentFilter = "all"
	$: 
		filteredTodos = currentFilter === "all" ? $todos 
		: currentFilter === "active" 
		? $todos.filter(todo => !todo.isComplete) 
		: $todos.filter(todo => todo.isComplete)



	$: uncompletedTodos = $todos.filter(todo => !todo.isComplete).length

	let cachedEditedTodoTitle = "";
  
  const deleteTodo = (id) => {
      todos.update(todos => todos.filter(todo => todo.id !== id)) 
  }
    const checkAllTodos = () => {
        	todos.update(todos => todos.map(todo => {
            todo.isComplete = true;
            return todo
          })) 
    }
    const clearCompletedTodos = () => {
        todos.update(todos => todos.filter(todo => !todo.isComplete))
    }
    const updateFilter = (filter) => {
        currentFilter = filter
    }

    const editTodo = (todo) => {
    cachedEditedTodoTitle = todo.title;
		todo.isEditing = true;
		todos.update(todos => todos);
	}

	const editTodoDone = (todo) => {
    todo.isEditing = false;
		if (todo.title.trim() === "") {
			todo.title = cachedEditedTodoTitle;
		}
		cachedEditedTodoTitle = ""
		todos.update(todos => todos);
	}

	const exitEditingByKeyup = (event, todo) => {
		if (event.key === "Enter") {
			editTodoDone(todo);
		}

		if (event.key === "Escape") {
			todo.isEditing = false;
			todo.title = cachedEditedTodoTitle;
			cachedEditedTodoTitle = ""
			todos.update(todos => todos);
		}
	}
</script>
<div>
    <ul class="todo-list">
        {#each filteredTodos as todo (todo.id)}
        <li class="todo-item-container {todo.id}" class:line-through={todo.isComplete} in:fade out:fly={{duration: 500, x: 30}}>
            <div class="todo-item">
              <input type="checkbox" bind:checked={todo.isComplete}/>
              {#if !todo.isEditing}
              <span class="todo-item-label" on:dblclick={editTodo(todo)}>{todo.title}</span>

              {:else}
              <input
              type="text"
              class="todo-item-input"
              bind:value={todo.title}
              on:blur={editTodoDone(todo)}
              on:keyup={(e) => exitEditingByKeyup(e, todo)}
              autofocus
            />
              {/if}
            </div>
            <button class="x-button" on:click={() => deleteTodo(todo.id)}>
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
        <p>
        {#key uncompletedTodos}
        <span in:fly={{y: -10}} style="display: inline-block">{uncompletedTodos}</span>
        {/key}
        <span>items remaining</span></p>
        
      </div>
  
      <div class="other-buttons-container">
        <div>
          <button class="button filter-button" on:click={() => updateFilter("all")} class:filter-button-active={currentFilter === "all"}> All </button>
          <button class="button filter-button" on:click={() => updateFilter("active")} class:filter-button-active={currentFilter === "active"}>Active</button>
          <button class="button filter-button" on:click={() => updateFilter("completed")} class:filter-button-active={currentFilter === "completed"}>Completed</button>
        </div>
        <div>
          <button class="button" on:click={clearCompletedTodos}>Clear completed</button>
        </div>
      </div>
</div>
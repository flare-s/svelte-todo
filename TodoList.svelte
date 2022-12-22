<script>
    import {fade, fly} from "svelte/transition"

    export let filteredTodos;
    export let currentFilter;
    export let uncompletedTodos;
    import {createEventDispatcher} from "svelte";
    const dispatcher = createEventDispatcher();
    const deleteTodo = (id) => {
        dispatcher("todoDeleted", {
            id,
        })
    }
    const checkAllTodos = () => {
        dispatcher("allTodosChecked")
    }
    const clearCompletedTodos = () => {
        dispatcher("completedTodosCleared")
    }
    const updateFilter = (filter) => {
        dispatcher("filterUpdated", {
            filter,
        })
    }

    const editTodo = (todo) => {
		dispatcher("todoEdited", {
            todo,
        })
	}

	const editTodoDone = (todo) => {
		dispatcher("todoEditingDone", {
            todo,
        })
	}

	const exitEditingByKeyup = (event, todo) => {
		dispatcher("exitedEditing", {
            todo,
            event
        })
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
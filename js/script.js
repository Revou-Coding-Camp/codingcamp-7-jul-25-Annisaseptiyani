document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const addBtn = document.getElementById("add-btn");
  const tableBody = document.getElementById("todo-table-body");
  const deleteAllBtn = document.getElementById("delete-all-btn");

  let todos = [];

  function renderTodos(data) {
    tableBody.innerHTML = "";
    if (data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">No task found</td>
        </tr>
      `;
      return;
    }

    data.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.task}</td>
        <td>${item.dueDate}</td>
        <td>${item.completed ? "Completed" : "Pending"}</td>
        <td>
          <button class="btn btn-success btn-sm me-2" data-index="${index}" data-action="toggle">
            ${item.completed ? "Undo" : "Done"}
          </button>
          <button class="btn btn-danger btn-sm" data-index="${index}" data-action="delete">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  addBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();
    const dueDate = dateInput.value;

    if (!task || !dueDate) {
      alert("Please enter a task and due date!");
      return;
    }

    todos.push({
      task,
      dueDate,
      completed: false
    });

    todoInput.value = "";
    dateInput.value = "";

    renderTodos(todos);
  });

  tableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const index = btn.dataset.index;
    const action = btn.dataset.action;

    if (action === "delete") {
      todos.splice(index, 1);
    } else if (action === "toggle") {
      todos[index].completed = !todos[index].completed;
    }

    renderTodos(todos);
  });

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Delete all todos?")) {
      todos = [];
      renderTodos(todos);
    }
  });

  renderTodos(todos);
});

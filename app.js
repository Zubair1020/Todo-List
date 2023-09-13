// Get the ul.list form element;
const listElement = document.querySelector(".list");
//Get the form.form element;
const formElement = document.querySelector(".form");
//A global array to store all the tasks
let tasks = [
  {
    taskTitle: "Add some To-Do",
    completed: false,
    id: "23456",
  },
  { taskTitle: "Be productive", completed: false, id: "13453343" },
];

//The first render call to render the element on to the page
render();
//Calling the f() to Handling the add todo form;
handleAddTodoForm();

//f() to render the elements on the ui;
function render() {
  //Mapping through all the tasks and rendering the tasks to the ui
  const liElements = tasks.map((task) => toDoElementGenerator(task));
  listElement.innerHTML = liElements.join("");

  //Calling the f() to handel the complete and delete btn click
  handelButtonClick();
}

//f() to Handling the add todo form
function handleAddTodoForm() {
  formElement.addEventListener("submit", (event) => {
    //preventing the form from it's default behavior;
    event.preventDefault();
    //Getting the input element with the value;
    const inputElement = formElement.querySelector(".form__input");
    //Creating a new task with the input value;
    const newTask = {
      taskTitle: inputElement.value,
      completed: false,
      id: `${Date.now()}`,
    };
    // alert the user if the input filed is empty and return;
    if (inputElement.value === "") {
      alert("Please write a to-do first");
      return;
    }
    // Add the new task to the tasks array
    tasks.push(newTask);
    // Clear the input field
    inputElement.value = "";
    // Render the updated list of tasks
    render();
  });
}

//f() to handel the complete and delete btn click
function handelButtonClick() {
  //getting the li element form the ul/list container;
  const liElements = listElement.querySelectorAll("li");
  //Looping through all the li's to add the listener;
  liElements.forEach((li) => {
    //Handling the complete button

    //Getting the completed button from the li
    const completedButton = li.querySelector(".btn--completed");
    //Adding an listener to the button to handle the task complete work;
    completedButton.addEventListener("click", () => {
      //Finding the task that user has clicked form the tasks array;
      const completedTask = tasks.find((task) => task.id === li.id);
      //Toggling the tasks.completed value;
      completedTask.completed = !completedTask.completed;

      if (completedTask.taskTitle.length >= 28) {
        //Toggling the line-through class on the list__item-text inside the li;
        li.querySelector(".list__item-text").classList.toggle("line-through");
      } else {
        //Toggling the completed class on li;
        li.classList.toggle("completed");
      }
    });

    //Handling the delete button

    //Getting the delete button from the li
    const deleteButton = li.querySelector(".btn--delete");
    //Adding an listener to the button to handle the task delete work;
    deleteButton.addEventListener("click", () => {
      //Filtering out the task that the user intended to delete
      const newTasks = tasks.filter((task) => task.id !== li.id);
      // Update the tasks array with the filtered out array;
      tasks = newTasks;
      // Remove the deleted task from the ui
      li.remove();
    });
  });
}

// A helper f() to generate li element
function toDoElementGenerator(task) {
  const li = `
          <li class="list__item ${
            task.completed
              ? task.taskTitle.length >= 28
                ? "line-through"
                : "completed"
              : null
          }" id="${task.id}" >
            <div class="list__item-container">
              <span class="list__item-text">&nbsp;${task.taskTitle}&nbsp;</span>
              <div class="list__item-button">
                <button class="btn btn--completed">
                  <svg
                    class="completed-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                  >
                    <path
                      d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"
                    />
                  </svg>
                </button>
                <button class="btn btn--delete">
                  <svg
                    class="delete-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                  >
                    <path
                      d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
        </li>`;
  return li;
}

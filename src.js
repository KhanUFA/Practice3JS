let tasksDB = [];
let selectedRow = document.getElementById("list-To-Do");
const setId = createId();

("use strict");
function render() {
  let targetElement = document.getElementById("list-To-Do");
  targetElement.innerText = "";

  tasksDB.forEach((row) => {
    addElement(row, targetElement);
  });
}

function createId() {
  let counter = 0;

  return function () {
    return counter++;
  };
}

function addElement(newRow, elementToAdd) {
  const rowToDo = document.createElement("li");
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  rowToDo.innerText = newRow.text;
  if (newRow?.color) {
    rowToDo.setAttribute("style", "background-color: " + newRow.color);
  }

  if (newRow.done) {
    checkBox.setAttribute("checked", "");
  } else {
    rowToDo.setAttribute("data-undone", "");
  }

  rowToDo.setAttribute("data-id", newRow.id);

  rowToDo.append(checkBox);

  if (elementToAdd.tagName == "LI") {
    elementToAdd.after(rowToDo);
  } else {
    elementToAdd.append(rowToDo);
  }
}

function highlight(target) {
  if (selectedRow) {
    selectedRow.classList.remove("highlight");
  }

  selectedRow = target;
  selectedRow.classList.add("highlight");
}

//* Handler for List ol
document.getElementById("list-To-Do").onclick = function (event) {
  if (event.target.tagName == "LI") {
    highlight(event.target);
  }
};

//* Handler for Panel of Buttons
document.getElementById("panelButtons").onclick = function (event) {
  const target = event.target;
  let tempRow, selectedPositionRow;

  for (
    selectedPositionRow = 0;
    selectedPositionRow < tasksDB.length;
    selectedPositionRow++
  ) {
    if (tasksDB[selectedPositionRow].id == selectedRow.id) {
      break;
    }
  }

  switch (target.value) {
    case "add":
      let result = prompt("Добавить задачу:");
      let row = { text: result, done: false, color: "white", id: setId() };

      if (selectedRow.tagName == "OL") {
        tasksDB.push(row);
      } else {
        tasksDB.splice(selectedPositionRow, 0, row);
      }
      addElement(row, selectedRow);
      break;

    case "delete":
      tasksDB.splice(selectedPositionRow, 1);
      selectedRow.remove();
      console.log("Element on pos " + selectedPositionRow + " delete");

      if (tasksDB.length === 0) {
        selectedRow = document.getElementById("list-To-Do");
      }
      break;

    case "up":
      idPreviousRow =
        selectedRow.previousElementSibling?.getAttribute("data-id");

      if (idPreviousRow == null) {
        alert("Задача уже первая!");
        return;
      }

      tempRow = tasksDB.splice(selectedPositionRow, 1)[0];
      debugger;
      tasksDB.splice(selectedPositionRow, 0, tempRow);
      render();
      break;

    case "down":
      let idNextRow = selectedRow.nextElementSibling?.getAttribute("data-id");

      if (idNextRow == null) {
        alert("Задача уже последняя!");
        return;
      }

      for (
        selectedPositionRow = 0;
        selectedPositionRow < tasksDB.length;
        selectedPositionRow++
      ) {
        if (tasksDB[selectedPositionRow].id == idNextRow) {
          break;
        }
      }

      tempRow = tasksDB.splice(selectedPositionRow, 1)[0];
      tasksDB.splice(selectedPositionRow + 1, 0, tempRow);
      render();
      break;
  }
};

window.onload = () => {
  tasksDB.push({
    text: "Проснуться",
    done: true,
    color: "yellow",
    id: setId(),
  });
  tasksDB.push({ text: "Улыбнуться", done: false, id: setId() });
  render();
};

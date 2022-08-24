let tasksDB = [];
let selectedRow = document.getElementById("list-To-Do");
let selectedPositionRow;
const modifyPanel = document.getElementById("panelModify");
const setId = createId();

("use strict");
function render() {
	let targetElement = document.getElementById("list-To-Do");
	targetElement.innerText = "";

	tasksDB.forEach((row) => {
		addElementInHTML(row, targetElement);
	});

	if (!(selectedPositionRow === undefined)) {
		const rowsInHTML = targetElement.getElementsByTagName("li");
		for (let row of rowsInHTML) {
			if (row.dataset.id === selectedRow.dataset.id) {
				highlight(row);
				break;
			}
		}
	}
}

function createId() {
	let counter = 0;

	return function () {
		return counter++;
	};
}

function addElementInHTML(newRow, elementToAdd) {
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

	selectedPositionRow = tasksDB.findIndex(
		(value, index, array) => value.id === Number(selectedRow.dataset.id)
	);
};

document.getElementById("list-To-Do").addEventListener("click", {
	handleEvent(event) {
		let checkBox = event.target;
		debugger;
		if (checkBox.tagName != "INPUT") {
			return;
		}

		//? Bad practice?
		tasksDB.find((task, index, array) => {
			if (task.id === Number(checkBox.parentElement.dataset.id)) {
				array[index].done = checkBox.checked;
				return true;
			}
			return false;
		});
		localStorage.setItem("tasksDB", JSON.stringify(tasksDB));
	},
});

//* Handler for Panel of Buttons
document.getElementById("panelButtons").onclick = function (event) {
	const target = event.target;

	const [colorInput, textInput] = modifyPanel.getElementsByTagName("input");
	switch (target.value) {
		case "add": //* Button add element on list and taskDB
			let result = prompt("Добавить задачу:");
			let row = { text: result, done: false, id: setId() };

			if (
				selectedRow.tagName == "OL" ||
				selectedPositionRow === tasksDB.length - 1
			) {
				tasksDB.push(row);
			} else {
				tasksDB.splice(selectedPositionRow + 1, 0, row);
			}
			addElementInHTML(row, selectedRow);
			break;

		case "modify": //* Button show modify panel
			modifyPanel.value = tasksDB[selectedPositionRow].text;
			modifyPanel.classList.toggle("hidden");
			textInput.value = tasksDB[selectedPositionRow].text;
			break;

		case "applyModify": //* Button apply modify for DB
			const [modifedElement] = tasksDB.splice(selectedPositionRow, 1);
			modifedElement.text = textInput.value;
			modifedElement.color = colorInput.value;

			tasksDB.splice(selectedPositionRow, 0, modifedElement);
			render();
			break;

		case "delete": //* Button Delete element
			tasksDB.splice(selectedPositionRow, 1);
			selectedRow.remove();
			console.log("Element on pos " + selectedPositionRow + " delete");

			if (tasksDB.length === 0) {
				selectedRow = document.getElementById("list-To-Do");
			}
			break;

		case "up": //* Button up element on taskDB
			idPreviousRow = selectedRow.previousElementSibling;

			if (idPreviousRow === null) {
				alert("Задача уже первая!");
				return;
			}

			tasksDB.splice(
				selectedPositionRow - 1,
				2,
				tasksDB[selectedPositionRow],
				tasksDB[selectedPositionRow - 1]
			);
			render();
			break;

		case "down": //* Button down element on taskDB
			let idNextRow = selectedRow.nextElementSibling;

			if (idNextRow === null) {
				alert("Задача уже последняя!");
				return;
			}

			tasksDB.splice(
				selectedPositionRow,
				2,
				tasksDB[selectedPositionRow + 1],
				tasksDB[selectedPositionRow]
			);
			render();
			break;
	}
	localStorage.setItem("tasksDB", JSON.stringify(tasksDB));
};

window.onload = () => {
	var tasksFromStorage = localStorage.getItem("tasksDB");

	if (tasksFromStorage) {
		tasksDB = JSON.parse(tasksFromStorage);
	} else {
		tasksDB.push({
			text: "Проснуться",
			done: true,
			color: "yellow",
			id: setId(),
		});
		tasksDB.push({ text: "Улыбнуться", done: false, id: setId() });
	}

	render();
};

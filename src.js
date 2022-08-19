let tasksDB=[];
let selectedRow = null;
const setId = createId();


function render(todo, targetElement = document.getElementById("list-To-Do")){
    targetElement.innerText = "";
    
    todo.forEach(row => {
        addElement(row, targetElement);
    });
};

function createId(){
    let counter = 0;

    return function(){
        return counter++;
    }
}

function addElement(row, element){
    const rowToDo = document.createElement("li");
    const checkBox = document.createElement("input")
    checkBox.setAttribute("type", "checkbox");
    rowToDo.innerText = row.text;

    if(row?.color){
        rowToDo.setAttribute("style", "background-color: " + row.color);
    }
    
    if(row.done){
        checkBox.setAttribute("checked", "");
    } else{
        rowToDo.setAttribute("data-undone", "");
    }
    
    rowToDo.setAttribute("data-id", row.id);

    rowToDo.append(checkBox);
    element.append(rowToDo);
};

function highlight(target){
    if(selectedRow){
        selectedRow.classList.remove("highlight");
    }

    selectedRow = target;
    selectedRow.classList.add("highlight");
}

document.getElementById("list-To-Do").onclick = function(event){
    if(event.target.tagName == "LI"){
        highlight(event.target);
    }
};

document.getElementById("panelButtons").onclick = function(event){
    const target = event.target;

    switch(target.value){
        case "add":
            let result = prompt("Добавить задачу:");
            let row = {text: result, done: false, color: "white", id: setId()};
            tasksDB.push(row);
            render(tasksDB);
            break;
        
        case "delete":
            let selectedIndex = selectedRow.getAttribute("data-id");
            tasksDB.splice(selectedIndex, 1);
            selectedRow.remove();
            console.log("Element on pos " + selectedIndex + " delete");
            break;
    }
};

window.onload = () => {
    const listFromHTML = document.getElementById("list-To-Do");
    tasksDB.push({text: "Проснуться", done: true, color: "green", id: setId()});
    tasksDB.push({text: "Улыбнуться", done: false, id: setId()});
    render(tasksDB, listFromHTML);
};
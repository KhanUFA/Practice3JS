let preLoadedToDo=[
    {text: "Проснуться", done: true, color: "green"},
    {text: "Уснуть", done: false},
];

function render(todo, elem){
    elem.innerText = "";
    
    todo.forEach(row => {
        addElement(row, elem);
    });
};

window.onload = () => {
    const orderedList = document.getElementById("list-To-Do");
    render(preLoadedToDo, orderedList);
};

function addElement(row, element){
    const rowToDo = document.createElement("li");
    const checkBox = document.createElement("input")
    checkBox.setAttribute("type", "checkbox");
    rowToDo.innerText = row.text;

    if(row?.color){
        rowToDo.setAttribute("data-special", "background-Color: " + row.color);
    }
 
    if(row.done){
        checkBox.setAttribute("checked", "");
    } else{
        rowToDo.setAttribute("data-undone", "");
    }
    
    rowToDo.append(checkBox);
    element.append(rowToDo);
}
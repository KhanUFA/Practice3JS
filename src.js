let preLoadedToDo=[
    {text: "Проснуться", done: true, color: "green"},
    {text: "Уснуть", done: false},
];

function render(todo, elem){
    elem.innerText = "";
    
    todo.forEach(row => {
        const rowToDo = document.createElement("li");
        const checkBox = document.createElement("input")
        checkBox.setAttribute("type", "checkbox");
        rowToDo.innerText = row.text;

        if(row.done){
            checkBox.setAttribute("checked", "true");
        }
        
        rowToDo.append(checkBox);
        elem.append(rowToDo);
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

        if(row.done){
            checkBox.setAttribute("checked", "true");
        }
        
        rowToDo.append(checkBox);
}
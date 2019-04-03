const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";


let LIST, id ;
//data from local storage
let data = localStorage.getItem("TODO");

//check if empty
if (data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

//load item s to ui
function loadlist(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear local storage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

const options = {weekday: "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


//the function added - ToDo
function addToDo(toDo, id, done, trash){
    
    if (trash) {return;}
    
    const DONE = done ? check : uncheck;
    const LINE = done ? line_through : "";    

    
    const item = `<li class="item">
<i class ="fa ${DONE} co" job="complete" id="${id}"></i>
<p class="text ${LINE} "> ${toDo}</p>
<i class ="fa fa-trash-o de" job="delete" id="${id}"></i>
</li>`;
    
 const position = "beforeend";
    list.insertAdjacentHTML(position,item);
}

//added an item for when the user hits the enter key

document.addEventListener("keyup",function(event){
       if (event.keyCode == 13){
           const toDo = input.value;
           
           if(toDo){
               addToDo(toDo, id, false, false);
               
               LIST.push({
                  name:toDo, id: id, done: false, trash: false
              });
               
               localStorage.setItem("TODO", JSON.stringify(LIST));
               id++;
           }
           input.value = "";
       }
    });

function completeToDo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove to do
function removeToDo (element){
    element.parentNode.parentNode.removeChild(element.parentNode)
   LIST[element.id].trash = true;
}
// targt items
list.addEventListener('click', function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if (elementJob == "complete"){
        completeToDo (element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
})









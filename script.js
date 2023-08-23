let inputEl = document.querySelector(".input");
let addEl = document.querySelector(".add-text");
let tasksDiv = document.querySelector(".tasks");

//Кнопки пульта
let=delFirstBtn=document.getElementById("delfirst")
let=delLastBtn=document.getElementById("dellast")
let=selChetBtn=document.getElementById("chet")
let=selNechetBtn=document.getElementById("nechet")
//состояния кнопок четных
let stateChet=false
let stateNechet=false


//Массив с задачами
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}
//Получение инфы из локального хранилища
getDataFromLocalStorage()
//Кнопка создания задачи
addEl.addEventListener("click", () => {
    if (inputEl.value !== "") {
        addTaskToArray(inputEl.value);
        inputEl.value = "";
        selChetBtn.click();
        selNechetBtn.click();
        selChetBtn.click();
        selNechetBtn.click();
    }
})

//Функция добавления задачи на страницу
function addTasksToPageFrom(arrayOfTasks) {
    arrayOfTasks=[...arrayOfTasks.filter((compl1)=>compl1.complete==false) , ...arrayOfTasks.filter((compl2)=>compl2.complete==true)]
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        // Создаем карточки задач для каждой заачи из массива задач
        let div = document.createElement("div")
        div.className = "task";
        //Проверяю выполнено ли задание
        if (task.complete){
            div.className = "task done"
        }
        if(!task.visible){
            div.style.display="none"
        }
        div.setAttribute("data-id", task.id);
        div.setAttribute("visible", task.visible);
        div.appendChild(document.createTextNode(task.title))
        //Создаем кнопку для удаления карточки
        //Создание кнопки
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        //Добавление кнопки в узел
        div.appendChild(span);
        //Создаем кнопку для выполнени карточки
        //Создание кнопки
        let compll = document.createElement("span");
        compll.className = "complete";
        compll.appendChild(document.createTextNode("Complete"));
        //Добавленик второй кнопки в узел и добавление узла задания в блок заданий
        div.appendChild(compll);
        tasksDiv.appendChild(div);
    });
}



//Функция добавление задачи в локальное хранилище
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}
//Функция получения данных из локального хранилища и их отображения
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTasksToPageFrom(tasks)
    }
}

//Функция добавления задачи к массиву
function addTaskToArray(taskText) {
    const task1 = {
        id: Date.now(),
        title: taskText,
        complete: false,
        visible:true,
    };
    const task2 = {
        id: Date.now(),
        title: taskText,
        complete: true,
        visible:false,
    };
    arrayOfTasks.push(task1);
    arrayOfTasks.push(task2);
    addTasksToPageFrom(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

//Функция удаления и выполнения элемента
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        //удаление из локального хранилища
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
        //удаление со страницы
        e.target.parentElement.remove();
        //пометка о выполнении
    }else if(e.target.classList.contains("complete")){
        arrayOfTasks.map((obj)=>{

            if (obj.id==e.target.parentElement.getAttribute("data-id")){
                obj.visible ? obj.visible=false:obj.visible=true
            }
        })
        addTasksToPageFrom(arrayOfTasks);
        addDataToLocalStorageFrom(arrayOfTasks);

    }
    selChetBtn.click();
        selNechetBtn.click();
        selChetBtn.click();
        selNechetBtn.click();
})
//Удаление задания из локального хранилища
function deleteTaskFromLocalStorage(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}


//Функционал кнопки удаления последнего элемента
delLastBtn.addEventListener("click",()=>{
    let obj2=document.querySelectorAll('[visible="true"]')
    if(obj2.length!=0) { (obj2[obj2.length-1]).children[0].click()}
    
})
//Функционал кнопки удаления первого элемента
delFirstBtn.addEventListener("click",()=>{
    let obj1=document.querySelectorAll(".del")
    if(obj1.length!=0) { obj1[0].click()}

})
//Функционал кнопки выделения чётных задач
selChetBtn.addEventListener("click",()=>{
    let obj2=document.querySelectorAll('[visible="true"]')
    if(!stateChet){
    for(let i=1;i<obj2.length;i+=2){
        obj2[i].className+=(" select");
    }
    stateChet=true
}else{
    for(let i=1;i<obj2.length;i+=2){
        obj2[i].classList.remove("select");
    }
    stateChet=false
}
})
//Функционал кнопки выделения нечётных задач
selNechetBtn.addEventListener("click",()=>{
    let obj2=document.querySelectorAll('[visible="true"]')
    if(!stateNechet){
    for(let i=0;i<obj2.length;i+=2){
        obj2[i].className+=(" select");
    }
    stateNechet=true
}else{
    for(let i=0;i<obj2.length;i+=2){
        obj2[i].classList.remove("select");
    }
    stateNechet=false
}
})
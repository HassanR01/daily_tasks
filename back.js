let lis = document.querySelectorAll('ul li')

if (window.localStorage.getItem('color')) {
    document.body.style.backgroundColor = window.localStorage.getItem('color')
    
}

lis.forEach((li) => {
    li.addEventListener('click' , function () {
        window.localStorage.setItem('color' , li.dataset.color)
        document.body.style.backgroundColor = li.dataset.color
    })
})
// +++++++++++++++++++++++++++++++++++++++++++++++

let input = document.querySelector('.input')
let submit = document.querySelector('.add')
let tasks = document.querySelector('.tasks')

let ArrayForTasks = []

if (window.localStorage.getItem('tasks')) {
    ArrayForTasks = JSON.parse(window.localStorage.getItem('tasks'))
}

GetFromLocalStorage()

submit.onclick = function () {
    if (input.value !== '' && ArrayForTasks.length < 8) {
        organizeTask(input.value)
        input.value = ''
    }
}

function organizeTask(textTask) {
    const task = {
        id : Date.now(),
        title : textTask,
        completed : false,
    }
    ArrayForTasks.push(task)
    getOnPage(ArrayForTasks)
    setOnLocalStorage(ArrayForTasks)
}


// Delete element 

tasks.addEventListener('click' , (e) => {
    if (e.target.classList.contains('del')) {
        deleteTask(e.target.parentElement.getAttribute('data-id'))
        e.target.parentElement.remove()
    }

    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done')
        
    }
})


function getOnPage(ArrayForTasks) {
    tasks.innerHTML = '';
    ArrayForTasks.forEach((task) => {
        let div = document.createElement('div')
        div.className = 'task'
        if (task.completed) {
            div.className = 'task done'
        }
        div.setAttribute('data-id' , task.id)
        div.appendChild(document.createTextNode(task.title))

        let span = document.createElement('span')
        span.appendChild(document.createTextNode('Delete'))
        span.className = 'del'
        div.appendChild(span)
        tasks.appendChild(div)
    })
}

function setOnLocalStorage(ArrayForTasks) {
    window.localStorage.setItem('tasks' , JSON.stringify(ArrayForTasks))
}

function GetFromLocalStorage(ArrayForTasks) {
    let data = window.localStorage.getItem('tasks')
    if (data) {
        let tasks = JSON.parse(data)
        getOnPage(tasks)
    }
}

function deleteTask(taskID) {
    ArrayForTasks = ArrayForTasks.filter((task) => task.id != taskID); 
    setOnLocalStorage(ArrayForTasks)
}

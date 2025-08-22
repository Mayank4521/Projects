let tasks= []


function saveTask(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function loadTask(){
    const stored = localStorage.getItem('tasks')
    tasks = stored ? JSON.parse(stored):[]
}

function renderTasks(){
    const tasklist = document.getElementById("tasklists")
    tasklist.innerHTML = ''
    
    tasks.forEach((task,index) => {
        const li = document.createElement('li')

        const btn = document.createElement("button")
        const oneTask = document.createElement("div")
        const btnContainer = document.createElement("div")
        btn.id = "checklist"
        oneTask.id = 'oneTask'
        btnContainer.id = "btnContainer"


        const h4 = document.createElement('h4')
        h4.textContent = task.text
        li.appendChild(btn)
        li.appendChild(oneTask)
        oneTask.appendChild(h4)

        const editbtn = document.createElement('button')
        editbtn.textContent = 'Edit'
        editbtn.classList = 'editbtn'

        editbtn.addEventListener("click",()=>{
            const h4 = li.querySelector("h4")

            const input = document.createElement("input")
            input.type = 'text'
            input.value = h4.textContent
            input.id = 'editInput'
            input.style.flexGrow =1
            input.style.fontsize = '1.1rem'
            input.style.padding = '5px'

            oneTask.replaceChild(input, h4)
            input.focus()

            function saveEdit(){
                const editedValue = input.value.trim()

                if(editedValue === ''){
                    alert("Task cannot be empty")
                    input.focus();
                    return;
                }
                tasks[index].text = editedValue;
                saveTask()
                renderTasks()
            }

            input.addEventListener('keydown',(e)=>{
                if(e.key ==='Enter'){
                    saveEdit()
                }
            })

            input.addEventListener('blur', () => {
            saveEdit();
            });
        })

        const delbtn = document.createElement('button')
        delbtn.textContent = 'Delete'
        delbtn.classList = 'delbtn'
        
        delbtn.addEventListener('click',function(){
            tasks.splice(index,1);
            saveTask()
            renderTasks()
        })
        
        if(task.completed){
            h4.classList.toggle("done");
            btn.classList.toggle('active');
        }
        
            btn.addEventListener("click",()=>{
            task.completed = !task.completed
            saveTask()
            renderTasks()
        })

        
        oneTask.appendChild(btnContainer)
        btnContainer.appendChild(editbtn)
        btnContainer.appendChild(delbtn)
        tasklist.appendChild(li)
    })
}

window.onload = function(){
    loadTask()
    renderTasks()
}

document.querySelector("#submit").addEventListener('click',function(){
    let taskValue = document.querySelector("#tasks").value.trim()
    if(taskValue === ''){
        alert("Please Insert something")
        return;
    }
    tasks.push({text:taskValue,completed: false})
    saveTask()
    renderTasks()
    document.querySelector("#tasks").value = ''
})
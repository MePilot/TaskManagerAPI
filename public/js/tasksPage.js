
const taskBoard = document.getElementById("taskBoard")

const template = document.getElementById("task")


showTasks()

 async function showTasks() {
  
  try {
    let tasks=await loadTasks('?sortBy=createdAt:desc')
   
    let taskCards=[]
    let counter=0
    
    
    tasks.forEach(task => {
      taskCards.push({id:`task${counter++}`,task})
    });
     
    taskCards.forEach(taskCard => {
      
     
      let clone = template.content.cloneNode(true);
      //clone.id=taskCard.id
      
      const taskText = clone.getElementById('taskText')
      const taskStatus = clone.getElementById("taskStatus")
      const deleteTask= clone.getElementById("deleteTask")
      const editTask= clone.getElementById("editTask")
      
      taskText.innerHTML=taskCard.task.name
      //taskText.id=taskCard.id
      taskStatus.innerHTML=taskCard.task.completed
      
      deleteTask.addEventListener('click', async function () {

        try {
          await fetch(`/tasks/${taskCard.task._id}`, {
            headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
            method: 'DELETE'
        })
        
          console.log(taskCard.task._id)
          
          this.parentElement.parentElement.remove()
        }
        catch(e) {
          console.log(e)
        }
        

      })
      editTask.addEventListener('click', async function () {
        let child = this.parentElement.parentElement.children[0];
        if(this.innerHTML==="Edit") {
          
          child.disabled=false
          this.innerHTML="Save"
        }
        
          
        else {
          this.innerHTML="Edit"
          child.disabled=true
          try {
            await fetch(`/tasks/${taskCard.task._id}`, {
              headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
              method: 'PATCH',
              body: JSON.stringify({
              name: taskText.value
                
            })
          })
          
            console.log(taskCard.task._id)
            
            
            taskText.disabled=true
          }
          catch(e) {
            console.log(e)
          }
        }

      })
      taskBoard.appendChild(clone);
    });

  }
  catch {

  }
  
  
}



async function loadTasks(params) {

let tasks
try {
    const response = await fetch (`/tasks${params}`, {
    headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
    method: 'GET'})
    tasks = await response.json()
  }

catch {
  document.write('Error! No data')
}
  return tasks
}


async function newTask() {
  try {
  await fetch('/tasks', {
    headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
    method: 'POST',
    body: JSON.stringify({
    name: 'Empty task'
    })
})
    location.reload()
  }
 
  catch {

  }
 
}



const taskBoard = document.getElementById("taskBoard")

const template = document.getElementById("task")
let taskCards=[]
function selectTask () {

}



showTasks()

 async function showTasks() {
  let counter=0
  try {
    let tasks=await loadTasks('?sortBy=createdAt:desc')
   
    tasks.forEach(task => {
      let clone = template.content.cloneNode(true);
      const card = {id:`task${counter++}`, task, selected:false}
      taskCards.push(card)

      clone.children[0].id=card.id
      
      const selectedTask= clone.getElementById("cardSelect2")
      const taskText = clone.getElementById('text2')
      taskText.innerHTML = task.name
      selectedTask.addEventListener('click', function (parent) {
        card.selected = selectedTask.checked
        console.log(card.selected)
      
      }

        )
      taskBoard.appendChild(clone);
     
    });
     
    taskCards.forEach(taskCard => {
     
      
     
      //let clone = template.content.cloneNode(true);
      

      










      //clone.id=taskCard.id
      /*
      //const taskText = clone.getElementById('taskText')
      //const taskStatus = clone.getElementById("taskStatus")
      //const deleteTask= clone.getElementById("deleteTask")
      //const editTask= clone.getElementById("editTask")
      
      //taskText.innerHTML=taskCard.task.name
      //taskText.id=taskCard.id
      //taskStatus.innerHTML=taskCard.task.completed
      
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
      */ 
     
     
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

 function deleteTask() {
  
  taskCards.forEach(async taskCard => {
    if(taskCard.selected) {
      try {
        await fetch(`/tasks/${taskCard.task._id}`, {
          headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
          method: 'DELETE'
      })
      
       
        let card = document.getElementById(`${taskCard.id}`)
        console.log(`${taskCard.id}`)
       card.remove()
        location.reload()
      }
      catch(e) {
        console.log(e)
      }



    }
  })
}


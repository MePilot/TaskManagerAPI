
const taskBoard = document.getElementById("taskBoard")
const board = document.getElementById("board")
const template = document.getElementById("task")

const templateBig = document.getElementById("bignotetemp")

console.log(template)
console.log(templateBig)
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
      clone.children[1].id=card.id
      const taskText = clone.querySelectorAll('[class="text"]')
     
     const selectedTask =  clone.querySelectorAll('[class="cardSelect"]')
     
     //console.log(selectedTask)
     
     taskText[0].innerHTML = task.name
     taskText[1].innerHTML = task.name

     
     clone.children[0].addEventListener('click', function (parent) {
      let clone = templateBig.content.cloneNode(true);
      let div = clone.querySelector('[id="bignote"]')
     
      div.style.left = `${parent.srcElement.style.left}px`;
      div.style.top = `${parent.srcElement.style.top}px`;
      console.log(parent)
      document.body.appendChild(clone);
    })
    clone.children[1].addEventListener('click', function (parent) {
      
      let clone = templateBig.content.cloneNode(true);
      let div = clone.querySelector('[id="bignote"]')
     
      div.style.left = `${parent.srcElement.style.left}px`;
      div.style.top = `${parent.srcElement.style.top}px`;
      console.log(parent)
      document.body.appendChild(clone);
    })

      selectedTask[0].addEventListener('click', function (parent) {
       
          card.selected = selectedTask[0].checked
         // console.log('clicked')
        
        })
        selectedTask[1].addEventListener('click', function (parent) {
          
            card.selected = selectedTask[1].checked
          
          })
          /*
          selectedTask[0].addEventListener('click', async function (parent) {
            
            // let child = this.parentElement.parentElement.children[0];
            if(parent.disabled) {
              console.log('enabled')
             parent.disabled=false
       
            }
            else {
             parent.disabled=true
             console.log('save')
               try {
                 await fetch(`/tasks/${card.task._id}`, {
                   headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
                   method: 'PATCH',
                   body: JSON.stringify({
                   name: taskText[0].value
                     
                 })
               })
               
                
                 
               }
               catch(e) {
                 console.log(e)
               }
             }
           })*/
          //selectedTask[1].addEventListener('click', edit (parent))
          
          taskBoard.appendChild(clone);
     
    });
     
    let flag=false
    //const edit = 
     
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
    console.log(`${taskCard.id}`)
    if(taskCard.selected) {
      try {
        
        await fetch(`/tasks/${taskCard.task._id}`, {
          headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
          method: 'DELETE'
      })
      
       
        let card = document.getElementById(`${taskCard.id}`)
      
       card.remove()
        location.reload()
      }
      catch(e) {
        console.log(e)
      }



    }
  })
}


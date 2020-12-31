const taskBoard = document.getElementById("taskBoard")
const board = document.getElementById("board")
let template
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  template = document.getElementById("taskMobile")
  console.log('Mobile')
 }
 else {
   template = document.getElementById("task")
   console.log('PC')
  }


class Card {
  constructor (task, selected, clone) {
    this.task=task
    this.selected=selected
    this.clone=clone
   
    this.elements=this.registerElements()
    
   
    this.registerListereners()
    this.render()

    console.log(this.task.remindDate)
  }
  render() {
    this.elements.textReadOnly.innerHTML = this.task.name
    this.elements.textEditable.value = this.task.name

    if(this.task.remindDate!=null) {
      this.elements.reminder.style.opacity='1'
     }
     else {
      this.elements.reminder.style.opacity='0'
     }
  }

  registerListereners() {

    let note=this.clone.children[0]
    
    note.addEventListener('click', ()=> {
      this.open(note)
    })
    
    this.elements.noteControls.addEventListener('click', ()=> {
      this.closeNote()
    })
    
    this.elements.btnSave.addEventListener('click', async ()=> {
     
      this.task.name=this.elements.textEditable.value
      await this.updateNote()
     
   })
  
   this.elements.btnRemove.addEventListener('click', ()=> {
    this.remove()
  })
  
  this.elements.reminder.addEventListener('click', ()=> {
   this.showCalendar()

  })


  }
  registerElements() {
   
    let clone=this.clone
    return {noteControls:clone.querySelector('[class="noteControls"]'), 
    btnSave:clone.querySelector('[id="btnSave"]'),
    btnRemove:clone.querySelector('[id="btnRemove"]'),
    textEditable: clone.querySelector('[class="textEditable"]'),
    textReadOnly: clone.querySelector('[class="textReadOnly"]'),
    reminder:clone.querySelector('[class="reminder"]'),
    selectedTask:clone.querySelector('[class="cardSelect"]'),
    calendar: clone.querySelector('[id="flatpickr"]'),
    calendarMobile: clone.querySelector('[class="flatpickr-input flatpickr-mobile"]')
    }
   
    
  }
  async updateNote() {
   
    console.log(this.task.remindDate)
    try {
      await fetch(`/tasks/${this.task._id}`, {
        headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
        method: 'PATCH',
        body: JSON.stringify({
        name: this.task.name,
        remindDate: this.task.remindDate
          
      })
    })
  }
    catch(e) {
      console.log(e)
    }
   }

   open (el) {

     let content = this.elements
     console.log(el)
    if(el.dataset.opened==='false') {
     
         el.style["-webkit-transition"] = ".4s"
         el.style["transition"] = ".4s"
         el.style["height"] = "400px"
       if(el.dataset.mobile==="false") {el.style["width"] = "400px"}
           
           setTimeout(function() {
             
             content.textReadOnly.style.display='none'
             content.textEditable.style.display='block'
             content.noteControls.style.display='inline'
             if(this.task.remindDate!=null) {content.reminder.style.opacity='1'}
   
             else {
               console.log(content.reminder.style.opacity)
               content.reminder.style.opacity='0.3'
             
             }
   
             //content.noteControls.style.top="90%"
             el.dataset.opened='true'
         }, 410);
           
       }
      }

    closeNote() {
      let content = this.elements
      let el=this.elements.noteControls
     
      content.textReadOnly.innerHTML=this.task.name

        el.parentNode.style["-webkit-transition"] = ".4s"
        el.parentNode.style["transition"] = ".4s"
        el.parentNode.style["height"] = "200px"
         if(el.parentNode.dataset.mobile==="false") {el.parentNode.style["width"] = "200px"}
             
         content.noteControls.style.display='none'
         content.textEditable.style.display='none'
             setTimeout(function() {
             
              content.textEditable.style.display='none'
              content.textReadOnly.style.display='block'
              content.reminder.style.opacity='none'
              if(this.task.remindDate!=null) {content.reminder.style.opacity='1'}
              else {content.reminder.style.opacity='0'}
               el.parentNode.dataset.opened='false'
               //location.reload()
           }, 410);
    
     }

  refresh() {

  }

  async remove() {
    let card=this.elements.noteControls.parentNode
    try {
        
      await fetch(`/tasks/${this.task._id}`, {
        headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
        method: 'DELETE'
    })
    
      setTimeout(()=> {
       card.remove()
        
     }, 420);
    }
    catch(e) {
      console.log(e)
    }

  }

  async showCalendar() {
  let content = this.elements
  content.noteControls.style.display='none'
  content.calendar.style.display='block'
  let This = this
  
  let fp = flatpickr(content.calendar, { 
    async onChange() { 
      content.reminder.style.opacity='1'
     
      if (content.calendar.style.display) content.calendar.style.display='none'
      if(content.calendarMobile) content.calendarMobile.style.display='none' 
      
      
      This.task.remindDate=new Date(fp.selectedDates)
      await This.updateNote()

      console.log(new Date(fp.selectedDates))
      This.closeNote()

    }  
  });
  }
}

let cards=[]


showTasks()

 async function showTasks() {
 
  try {
    let tasks=await loadTasks('?sortBy=createdAt:desc')
    console.log(tasks)

    tasks.forEach(task => {
     
      let card = new Card(task, false, template.content.cloneNode(true))
      console.log('append')
      cards.push(card)

      taskBoard.appendChild(card.clone);
     
    });

    /*
      const textReadOnly = card.clone.querySelectorAll('[class="textReadOnly"]')

     const TextEditable= card.clone.querySelectorAll('[class="textEditable"]')
      const btnSave= card.clone.querySelectorAll('[id="btnSave"]')
      const btnRemove= card.clone.querySelectorAll('[id="btnRemove"]')
     const selectedTask =  card.clone.querySelectorAll('[class="cardSelect"]')
     const reminder =  card.clone.querySelectorAll('[class="reminder"]')
     const noteControls= card.clone.querySelectorAll('[class="noteControls"]')
     
    
    card.elements.noteControls.addEventListener('click', function () {
      closeNote(this,card)
     })


     textReadOnly[0].innerHTML = task.name
     textReadOnly[1].innerHTML = task.name
     TextEditable[0].innerHTML=task.name
     TextEditable[1].innerHTML=task.name
     
     reminder[0].addEventListener('click', function () {
      showCalendar(this,card)
    })
 
    reminder[1].addEventListener('click', function () {
   showCalendar(this,card)
  })

     if(card.task.remindDate!=null) {
       reminder[0].style.opacity='1'
       reminder[1].style.opacity='1'
       
      }
      else {
        reminder[0].style.opacity='0'
       reminder[1].style.opacity='0'
      }

console.log(card.task.remindDate)
    
     btnSave[0].addEventListener('click', async function () {
       card.task.name=TextEditable[0].value
       updateNote(card)
     
    })
    
    btnSave[1].addEventListener('click', async function () {
      card.task.name=TextEditable[1].value
      updateNote(card)
    }
    )
    btnRemove[0].addEventListener('click', async function () {
      try {
        
        await fetch(`/tasks/${card.task._id}`, {
          headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
          method: 'DELETE'
      })
      
       
        let cardToRemove = document.getElementById(`${card.id}`)
      
        setTimeout(function() {
         
          cardToRemove.remove()
          location.reload()
       }, 420);
      }
      catch(e) {
        console.log(e)
      }



    })
    btnRemove[1].addEventListener('click', async function () {
      try {
        
        await fetch(`/tasks/${card.task._id}`, {
          headers: {"Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
          method: 'DELETE'
      })
      
       
        let cardToRemove = document.getElementById(`${card.id}`)
        setTimeout(function() {
         
          cardToRemove.remove()
          location.reload()
       }, 420);

       
      }
      catch(e) {
        console.log(e)
      }
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
    body: JSON.stringify(
      {
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
        //location.reload()
      }
      catch(e) {
        console.log(e)
      }



    }
  })
}


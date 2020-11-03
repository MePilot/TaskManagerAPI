
console.log('Working')


const registrationForm = document.querySelector('form')

const username = document.getElementById('username')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const userPic = document.getElementById('userPic')
const fileSelect = document.getElementById("fileSelect"),
fileElem = document.getElementById("fileElem");
const errorLbl = document.getElementById("error");

fileSelect.addEventListener("click", function (e) {
if (fileElem) {
  fileElem.click();
}
}, false);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
  const formData = new FormData();
  formData.append('avatar',this.files[0]);
  
  uploadAvatar(formData)

}
async function uploadAvatar(file) {

  try {
    const response = await fetch('/users/me/avatar', {
      headers: {Authorization: localStorage.getItem('jwt')},
      method: 'POST',
      body: file
    })

    const result= await response.json()

    if (result.error) {
      errorLbl.style.display="block"
      errorLbl.innerHTML=result.error
      return
    }
    location.reload()
  }
  catch(e) {
    location.reload()

  }
}

  

logIn().then((user)=>{
        
  userPic.src=`/users/${user._id}/avatar`
  username.value=user.name

}
)
registrationForm.addEventListener('submit',async (e)=> {
  e.preventDefault()
 
  if(password.value!=password2.value) {
    pass2_inv.innerHTML='Passwords do not match!'
    return password2.className='form-control is-invalid' }
  
    fetch('/users/me', {
      headers: { "Content-Type": "application/json; charset=utf-8", Authorization: localStorage.getItem('jwt')},
      method: 'PATCH',
      body: JSON.stringify({
      name: username.value,
      password:password.value
  })
}).then((response)=> {
    response.json().then((data)=>{
      password.className=password2.className='form-control is-valid'
     
        if (data.errors) {
          if(data.errors.password)  {
            pass_inv.innerHTML=data.errors.password.message
            password.className='form-control is-invalid'
          }
        }
        else {
        location.reload()

         //localStorage.setItem('jwt', data.token);

        }
        
    }).catch((e)=>{
    
    // console.log(e)
    })
})




})

async function logIn() {
  const response = await fetch ('/users/me', {
  headers: {Authorization: localStorage.getItem('jwt')},
  method: 'GET'})
  const user = await response.json()
  return user
}




console.log('Working')

const registrationForm = document.querySelector('form')

const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const pass_inv = document.getElementById('pass_inv')
const pass2_inv = document.getElementById('pass2_inv')

registrationForm.addEventListener('submit',(e)=> {
  e.preventDefault()
 

  if(password.value!=password2.value) {
    pass2_inv.innerHTML='Passwords do not match!'
    return password2.className='form-control is-invalid' }
  
    fetch('/users', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
      name: username.value,
      email: email.value,
      password:password.value
  })
}).then((response)=> {
    response.json().then((data)=>{
      password.className=password2.className=email.className='form-control'
     
        if (data.errors) {
          if(data.errors.password)  {
            pass_inv.innerHTML=data.errors.password.message
            password.className='form-control is-invalid'
          }
        }
        else {
          if(data.name) {return email.className='form-control is-invalid'}
         
         localStorage.setItem('jwt', data.token);
         window.location.href = "/tasksPage";

        }
        
    }).catch((e)=>{
    
     console.log(e)
    })
})}

)



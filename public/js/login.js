
console.log('Working')

const registrationForm = document.querySelector('form')


const email = document.getElementById('email')
const password = document.getElementById('password')

//const pass_inv = document.getElementById('pass_inv')
//const pass2_inv = document.getElementById('pass2_inv')


registrationForm.addEventListener('submit',(e)=> {
  e.preventDefault()
  console.log(JSON.stringify({
    email: email.value,
    password:password.value
}))
 
    fetch('/users/login', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
      email: email.value,
      password:password.value
  })
}).then((response)=> {
    response.json().then((data)=>{
      password.className=email.className='form-control'
     
        if (data.errors) {
         
            pass_inv.innerHTML=data
            password.className='form-control is-invalid'
          
        }
        else {
        
         console.log(data.user)
         console.log(data.token)
        
         localStorage.setItem('jwt', data.token);
         localStorage.setItem('jwtUser', data.user.name);
         window.location.href = '/';

        // fetch('/users/me', {
         // headers: { Authorization: data.token.toString()},
         // method: 'DELETE'}
        //  ).then(()=>console.log('Deleted!')).catch(console.log('failed!'))
























          //window.location.href = '/';
            //weatherInput.className='form-control is-valid'
           // weatherCardHeader.innerHTML=`Region: ${data.location.region}<br>Country: ${data.location.country}`
            //weatherCardText.innerHTML=`Temperature: ${data.current.temperature} ℃<br>Wind speed: ${data.current.wind_speed} мс<br>Humidity: ${data.current.humidity} %<br>Rain chance: ${data.current.precip} %`
            //weatherCardImg.src=data.current.weather_icons[0]
        }
        
    }).catch((e)=>{
    
     console.log(e)
    })
})}

)



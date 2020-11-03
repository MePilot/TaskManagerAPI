
const username = document.getElementById('username')
username.innerHTML=localStorage.getItem('jwtUser');
console.log('I AM HERE!!!')


function logOut() {
    console.log('Log out')
    fetch('/users/logout', {
        headers: { "Content-Type": "application/json; charset=utf-8", "Authorization": localStorage.getItem('jwt')},
        method: 'POST'
    }).then((response)=> {
    
        location.reload()}
        )
    }



  
  
  
  
  

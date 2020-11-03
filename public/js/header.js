

const navbar = document.getElementById('navbarCollapse')
const logRes = document.getElementById("logRes")
let loggedIn = document.getElementById("loggedIn");
let uName


if(localStorage.getItem('jwt')) {
    
    console.log('AAAAAAAAAAAAAAAA')
    
    let clon = loggedIn.content.cloneNode(true);
    navbar.appendChild(clon);
    





    //logRes.remove()
    //navbar.innerHTML= navbar.innerHTML+html
    //document.getElementById("logout").addEventListener("click", logOut);
    const username = document.getElementById('username')
    const img_user = document.getElementById('img_user')
    const my = document.getElementById("my")
    img_user.style.borderRadius = "50%";
    img_user.style.marginRight = "10px" 
    
    logIn().then((user)=>{
        
        
        img_user.src=`/users/${user._id}/avatar`
        my.innerHTML+=user.name
       
    }
    )
}
else {
    
    let clon = logRes.content.cloneNode(true);
    navbar.appendChild(clon);
    //navbar.append(logRes)
    //if(document.getElementById("logged")) document.getElementById("logged").remove()
}


function logOut() {
    console.log('Log out')
    fetch('/users/logout', {
        headers: { "Content-Type": "application/json; charset=utf-8", "Authorization": localStorage.getItem('jwt')},
        method: 'POST'
    }).then((response)=> {
        localStorage.removeItem('jwt')
        location.reload()}
        )
    }
    async function logIn() {
       
        const response = await fetch ('/users/me', {
          headers: {Authorization: localStorage.getItem('jwt')},
          method: 'GET'})
          
          const user = await response.json()
          return user
        
        }

          




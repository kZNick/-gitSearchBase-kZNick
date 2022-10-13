const inputMain = document.getElementById("inputUser")
const buttonMain = document.querySelector(".input-button")
const surgestaoes = document.querySelector(".surgestaoes")

function LocationUserRecente(){
    return JSON.parse(localStorage.getItem("usersRecentes")) || []
}
//funçao principal
async function Buscarusuario() {
    const ususarioIvalido = document.querySelector('.input-erro');
    try {
        buttonMain.innerHTML = `<img src="assets/lodin.gif" alt="" width="90px">`
        const data = await fetch(`https://api.github.com/users/${inputMain.value}`);
        const dataJSON = await data.json();
        if(dataJSON.message === "Not Found"){
         throw "Usuario ivalido"
        }
    let user = LocationUserRecente()
    user = [...user, dataJSON]
    if(user.length >= 4){
        user.splice(0,1)
        localStorage.setItem("usersRecentes", JSON.stringify(user))
    }
    localStorage.setItem("usersRecentes", JSON.stringify(user))
    buttonMain.innerHTML = `Ver perfil do github`
    localStorage.setItem("userLogado",inputMain.value)
    window.location.replace("../../pages/profile/index.html")
    } catch {
    ususarioIvalido.classList.add("display-on")
    buttonMain.innerHTML = `Ver perfil do github`
    console.log('Usuario Ivalido');
    }
  }
  

//form nao atulizar a pagina 
const formTag = document.querySelector('form')
formTag.addEventListener('submit',(event)=>{
    event.preventDefault()})

inputMain.addEventListener("keyup",(event)=>{
    buttonMain.classList.add("input-button-on")
    if(inputMain.value === ""){
        buttonMain.classList.remove("input-button-on")
    }
})
//botao
buttonMain.addEventListener("click",async()=>{
    if(inputMain.value === ""){
        return "sem nada no input"
    }
    Buscarusuario()
})

function recentesUsers(){   
    const localUsers = LocationUserRecente()
    
    localUsers.forEach(element => {
    const button =  document.createElement("button")
    button.classList.add("surgestaoes-button")
    surgestaoes.appendChild(button)
    button.innerHTML = `<img src=${element.avatar_url} alt="" class="user-img">
    <p>Acessar este perfil</p>`

    button.addEventListener("click",()=>{
        localStorage.setItem("userLogado",element.login)
        window.location.replace("../../pages/profile/index.html")
    })
    })
}
recentesUsers()
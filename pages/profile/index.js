const imgPerfil = document.querySelector(".perfil-img")
const namePerfil = document.querySelector(".perfil-name")
const bioPerfil = document.querySelector(".perfil-bio")
const trocarPerfil = document.querySelector(".button-trocarPerfil")
const repositorioss = document.querySelector(".repositorios")
const loading = document.querySelector(".loading")
const titlepage = document.querySelector("title")
const modalErro = document.querySelector(".modalErro")
const buttonEmail = document.querySelector(".button-email")
const modalTitulo = document.querySelector(".modal-titulo")

let userLogado = localStorage.getItem("userLogado")
if(userLogado === null){
    alert("Usuario inválido")
    localStorage.removeItem("userLogado")
    window.location.replace("../../index.html")
}
//header
async function perfilUsuario(user){
    try{   
        const data = await fetch(`https://api.github.com/users/${user}`)
        const dataJSON = await data.json()
        imgPerfil.src = dataJSON.avatar_url
        titlepage.innerText = dataJSON.login
        namePerfil.innerText = dataJSON.name
        bioPerfil.innerText = dataJSON.bio
        buttonEmail.innerText = "Email"

        imgPerfil.addEventListener("click",()=>{
            window.open(dataJSON.html_url, "_blank");
        })

        buttonEmail.addEventListener("click",()=>{
            if(dataJSON.email === null){
                modalTitulo.innerText = "E-mail do Usuário está privado"
                modalErro.classList.remove("modal-on")
                modalErro.classList.add("modal-on")
                return setTimeout(()=>{
                    modalErro.classList.remove("modal-on")
                }, 3000)
            }
            window.open(`mailto:${dataJSON.email}`);
        })

        console.log(dataJSON)
    }catch {
        console.log('Usuario Ivalido');
        localStorage.removeItem("userLogado")
        window.location.replace("../../index.html")
        }
}
perfilUsuario(userLogado)
//main
async function userRepositorios(user){
    try{   
        loading.classList.add("flex-on")
        const repositorios = await fetch(`https://api.github.com/users/${user}/repos`)
        const repositoriosJSON = await repositorios.json()
        repositoriosJSON.forEach(element => {
            const repositorio = document.createElement("li")
            repositorio.classList.add("repositorio")
            const repositorioTitulo = document.createElement("h2")
            repositorioTitulo.classList.add("repositorio-titulo")
            const repositorioDecricao = document.createElement("p")
            repositorioDecricao.classList.add("repositorio-decricao")
            const repositorioBotoes = document.createElement("div")
            repositorioBotoes.classList.add("repositorio-botoes")
            const butaoRepsitorio = document.createElement("button")
            butaoRepsitorio.classList.add("butao-repsitorio")
            const butaoDemo = document.createElement("button")
            butaoDemo.classList.add("butao-demo")

            repositorioss.appendChild(repositorio)
            repositorio.append(repositorioTitulo,repositorioDecricao,repositorioBotoes)
            repositorioBotoes.append(butaoRepsitorio,butaoDemo)
            repositorioTitulo.innerText = element.name
            repositorioDecricao.innerText = element.description
            butaoRepsitorio.innerHTML = `<a href="${element.clone_url}" target="_blank">Repositório</a>`
            butaoDemo.innerText = "Demo"
            butaoDemo.addEventListener("click",()=>{
                if(element.homepage === null){
                    modalTitulo.innerText = "Repositório não possui Demo"
                    modalErro.classList.remove("modal-on")
                    modalErro.classList.add("modal-on")
                    return setTimeout(()=>{
                        modalErro.classList.remove("modal-on")
                    }, 3000)
                }
                window.open(element.homepage, "_blank");
            })

            loading.classList.remove("flex-on")
        });

    }catch {
        console.log('erro no repositorio');
        }
}
userRepositorios(userLogado)
trocarPerfil.addEventListener("click",()=>{
    localStorage.removeItem("userLogado")
    window.location.replace("../../index.html")
})

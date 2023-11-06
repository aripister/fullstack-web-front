
let token;
let userId;
window.onload = function(){
    getTokenAndUserId();

 }

 function getTokenAndUserId(){

    token = sessionStorage.getItem('token');
    userId = sessionStorage.getItem('userId');
 }

function login() {
    window.location.href = 'login.html';
}

function irACrearPersonaje(){
    console.log(usuarioLogueado);
    if(usuarioLogueado === "El usuario logueado es: " ){
        alert("Debe iniciar sesion para crear un personaje.");
        window.location.href = 'login.html';
       
    }else{
        
        window.location.href = 'crearPj.html';
    }
}

function irAIndex(){
    window.location.href = 'index.html';
}

let personajesCreadosRecientemente ;
let usuarioLogueado = "";
document.addEventListener("DOMContentLoaded",  function() {
    userId = sessionStorage.getItem('userId');
    token = sessionStorage.getItem('token');
   const user = getUsuarioLogueado();
    console.log(user);
    getPersonajesCreados();
   
    
    
})

function getUsuarioLogueado(){
    fetch('http://localhost:5000/session')
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        usuarioLogueado = json;
        console.log("hola");
        console.log(usuarioLogueado);
        
        mostrarUsuarioLogueado(json);
    })  
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    contenedortext = document.getElementById("datosUsuario");

    function mostrarUsuarioLogueado(json){
        textoUsuario= JSON.stringify(json);   
        textoSinComillas =  textoUsuario.replace(/"/g, '');

        if(textoSinComillas ==="El usuario logueado es: "){
            textoSinComillas = "No ha iniciado sesion";
            return false;
        }
        contenedortext.textContent =  textoSinComillas;
        return true;
        
    }
}

 function getPersonajesCreados(){
   
    urlGetPjByUser= "http://localhost:5000/personajes/user/?limit=5&offset=0&userId="+ userId +"";
    fetch(urlGetPjByUser, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agrega el token a los encabezados
          },
        
    })
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        personajesCreadosRecientemente = json;
        console.log("hola");
        console.log(personajesCreadosRecientemente);
        
        mostrarPersonajesCreados(json);
    })  
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    contenedor = document.getElementById("personajes_id");


    function mostrarPersonajesCreados(json){
        json.forEach(item =>{
            div = document.createElement("div");
            div.classList.add("personaje");
            p = document.createElement("p")
            title = document.createTextNode(item.name);
            p.appendChild(title);
            p.classList.add("personaje_title");
            div.appendChild(p);
            div2 = document.createElement("div");
            div2.classList.add("contenedor-imagen");
            let img1 = new Image();
            imgSrc1 =  "./imgs/" + item.personaje.name+ ".png";
            img1.src = imgSrc1;
            img1.classList.add("personaje_img");
            div2.appendChild(img1);
            let img2 = new Image();
            imgSrc2 =  "./imgs/" + item.parteSuperior.name + ".png";
            img2.src = imgSrc2;
            img2.classList.add("personaje_img");
            div2.appendChild(img2);
            let img3 = new Image();
            imgSrc3 =  "./imgs/" + item.parteInferior.name + ".png";
            img3.src = imgSrc3;
            img3.classList.add("personaje_img");
            div2.appendChild(img3);
            let img4 = new Image();
            imgSrc4 =  "./imgs/" + item.zapato.name + ".png";
            img4.src = imgSrc4;
            img4.classList.add("personaje_img");
            div2.appendChild(img4);
            div.appendChild(div2);
            contenedor.appendChild(div);
           
        });

    }
}

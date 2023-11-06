

let token;
let userId;
let img1 = new Image();
let img2 = new Image();
let img3 = new Image();
let img4 = new Image();

window.onload = function(){
    getTokenAndUserId();

}

 function getTokenAndUserId(){


    token = sessionStorage.getItem('token');
    console.log(token);
    userId = sessionStorage.getItem('userId');
    console.log(userId);
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

let personajesdefault ;
let parteSuperior;
let parteInferior;
let zapatos;
const seleccionRopa = {
    personajeDefault: "Valentina",
    parteSuperior: "remera2",
    parteInferior: "pantalon2",
    zapatos: "zapato2",
};

document.addEventListener("DOMContentLoaded",  function() {
    token = sessionStorage.getItem('token');
    userId = sessionStorage.getItem('userId');

    getUsuarioLogueado();
    const idsImagenesSeleccionadas = [];
    contentCrear = document.getElementById('contain-crear');

    getPersonajesDefault();
    div2 = document.createElement("div");
    div2.classList.add("separar-eleccion");
    div2.id= "parteSuperior";
    contentCrear.appendChild(div2);
    getPartesSuperiores()
    div3 = document.createElement("div");
    div3.classList.add("separar-eleccion");
    div3.id= "parteInferior";
    contentCrear.appendChild(div3);
    getPartesInferiores()
    div4 = document.createElement("div");
    div4.classList.add("separar-eleccion");
    div4.id= "zapatos";
    contentCrear.appendChild(div4);
    getZapatos()
    div5 = document.createElement("div");
    div5.classList.add("separar-eleccion");
    div5.id= "pjconropa";
    contentCrear.appendChild(div5);
    pjconropa()
    


    
    function updateSelection(opcion, id) {
        seleccionRopa[opcion] = id;
        console.log(`Seleccionado en ${opcion}: ${id}`);
    }

    document.getElementById('personajesDefault').addEventListener('click', (event) => {
        if (event.target.type === 'radio') {
            updateSelection('personajeDefault', event.target.id);
            imgSrc1 =  "./imgs/" + event.target.id+ ".png";
            img1.src = imgSrc1;
        }
    });
    
    document.getElementById('parteSuperior').addEventListener('click', (event) => {
        if (event.target.type === 'radio') {
            updateSelection('parteSuperior', event.target.id);
            imgSrc2 =  "./imgs/" + event.target.id+ ".png";
            img2.src = imgSrc2;
        }
    });
    
    document.getElementById('parteInferior').addEventListener('click', (event) => {
        if (event.target.type === 'radio') {
            updateSelection('parteInferior', event.target.id);
            imgSrc3 =  "./imgs/" + event.target.id+ ".png";
            img3.src = imgSrc3;
        }
    });
    
    document.getElementById('zapatos').addEventListener('click', (event) => {
        if (event.target.type === 'radio') {
            updateSelection('zapatos', event.target.id);
            imgSrc4 =  "./imgs/" + event.target.id+ ".png";
            img4.src = imgSrc4;
            console.log(seleccionRopa);
        }
    });
    
    

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
        }
        contenedortext.textContent =  textoSinComillas;
    }
}

function getPersonajesDefault(){

    console.log(token);
    fetch('http://localhost:5000/personajesDefault?limit=4&offset=0', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agrega el token a los encabezados
          },
    })
    
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        personajesdefault = json;

        mostrarPersonajesDefault(json);
    })  
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    contenedor = document.getElementById("personajesDefault");


    function mostrarPersonajesDefault(json){
        var h2 = document.createElement("h2");
        h2.textContent = "Cabeza personaje";
        contenedor.appendChild(h2);
      
        json.forEach(item =>{
            div = document.createElement("div");
            div.classList.add("componente");
            h3 = document.createElement("h3");
            title = document.createTextNode(item.name)
            h3.appendChild(title);
            div.appendChild(h3);
            let img = new Image();
            var rutaImagen = "./imgs/" + item.name + ".png";
            img.src = rutaImagen;
            img.classList.add("img-ropa");
            img.id=item.name;
            div.appendChild(img);
            checkbox = document.createElement("input");
            checkbox.type = "radio";
            checkbox.name = "pjDefault";
            idcheck= item.name;
            console.log(idcheck);
            checkbox.id = idcheck;
            div.appendChild(checkbox);
            contenedor.appendChild(div);
           
        });
    }
}

function getPartesSuperiores(){
    fetch('http://localhost:5000/ropa?tipo=parteSuperior', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agrega el token a los encabezados
          },
    })
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        parteSuperior = json;

        mostrarParteSuperior(json);
    })  
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    contenedor2 = document.getElementById("parteSuperior");


    function mostrarParteSuperior(json){
        var h2 = document.createElement("h2");
        h2.textContent = "Partes Superiores";
        contenedor2.appendChild(h2);
      
        json.forEach(item =>{
            div = document.createElement("div");
            div.classList.add("componente");
            h3 = document.createElement("h3");
            title = document.createTextNode(item.name)
            h3.appendChild(title);
            div.appendChild(h3);
            let img = new Image();
            var rutaImagen = "./imgs/" + item.name + ".png";
            img.src = rutaImagen;
            img.classList.add("img-ropa");
            img.id=item.name;
            div.appendChild(img);
            checkbox = document.createElement("input");
            checkbox.type = "radio";
            checkbox.name = "superiores";
            idcheck= item.name;
            console.log(idcheck);
            checkbox.id = idcheck;
            div.appendChild(checkbox);
            contenedor2.appendChild(div);
           
        });
    }
}


function getPartesInferiores(){
    fetch('http://localhost:5000/ropa?tipo=parteInferior', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agrega el token a los encabezados
          },
    })
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        parteInferior = json;

        mostrarParteInferior(json);
    })  
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    contenedor3 = document.getElementById("parteInferior");


    function mostrarParteInferior(json){
        var h2 = document.createElement("h2");
        h2.textContent = "Partes inferiores";
        contenedor3.appendChild(h2);
      
        json.forEach(item =>{
            div = document.createElement("div");
            div.classList.add("componente");
            h3 = document.createElement("h3");
            title = document.createTextNode(item.name)
            h3.appendChild(title);
            div.appendChild(h3);
            let img = new Image();
            var rutaImagen = "./imgs/" + item.name + ".png";
            img.src = rutaImagen;
            img.classList.add("img-ropa");
            img.id=item.name;
            div.appendChild(img);
            checkbox = document.createElement("input");
            checkbox.type = "radio";
            checkbox.name = "inferiores";
            idcheck= item.name;
            console.log(idcheck);
            checkbox.id = idcheck;
            div.appendChild(checkbox);
            contenedor3.appendChild(div);
           
        });
    }
}

function getZapatos(){
    fetch('http://localhost:5000/ropa?tipo=zapato', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agrega el token a los encabezados
          },
    })
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        zapatos = json;

        mostrarZapatos(json);
    })  
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    contenedor4 = document.getElementById("zapatos");


    function mostrarZapatos(json){
        var h2 = document.createElement("h2");
        h2.textContent = "Zapatos";
        contenedor4.appendChild(h2);
      
        json.forEach(item =>{
            div = document.createElement("div");
            div.classList.add("componente");
            h3 = document.createElement("h3");
            title = document.createTextNode(item.name)
            h3.appendChild(title);
            div.appendChild(h3);
            let img = new Image();
            var rutaImagen = "./imgs/" + item.name + ".png";
            img.src = rutaImagen;
            img.classList.add("img-ropa");
            img.id=item.name;
            div.appendChild(img);
            checkbox = document.createElement("input");
            checkbox.type = "radio";
            checkbox.name = "zapatos";
            idcheck= item.name;
            console.log(idcheck);
            checkbox.id = idcheck;
            div.appendChild(checkbox);
            contenedor4.appendChild(div);
           
        });
    }
}


function crearPersonaje() {

    
  let nombrePersonaje = document.getElementById('namePj').value;
  console.log(nombrePersonaje);
  if(nombrePersonaje === null || nombrePersonaje === '' ){
    nombrePersonaje = "Sin Nombre";
  }

    const nuevoPersonaje =  {
        userId: userId,
        name: nombrePersonaje,
        personaje: seleccionRopa.personajeDefault,
        parteSuperior: seleccionRopa.parteSuperior,
        parteInferior: seleccionRopa.parteInferior,
        zapato: seleccionRopa.zapatos
    }

  guardarPersonaje(nuevoPersonaje);

}

function guardarPersonaje(nuevoPersonaje){
    console.log(nuevoPersonaje);
    return fetch('http://localhost:5000/createPersonajeNuevo', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agrega el token a los encabezados
          },
        body: JSON.stringify(nuevoPersonaje)
    })
    .then(response => {
        if (response.status === 201) {
            console.log("OK");
            return "OK";
        } else {
            alert("Error en la solicitud POST. Código de respuesta: " + response.status);
            return false;
        }
    })
    .then(data => {
        if (data) {
            console.log('Respuesta del servidor:', data);
            alert("Se ha creado el nuevo Personaje.");

            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });

}



function pjconropa(){
 
    contenedor5 = document.getElementById("pjconropa");

    div = document.createElement("div");
    div.classList.add("personaje");
    p = document.createElement("p")
    title = document.createTextNode("Tu personaje");
    p.appendChild(title);
    p.classList.add("personaje_title");
    div.appendChild(p);
    div2 = document.createElement("div");
    div2.classList.add("contenedor-imagen");

    imgSrc1 =  "./imgs/Valentina.png";
    img1.src = imgSrc1;
    img1.classList.add("personaje_img");
    div2.appendChild(img1);

    imgSrc2 =  "./imgs/remera2.png";
    img2.src = imgSrc2;
    img2.classList.add("personaje_img");
    div2.appendChild(img2);

    imgSrc3 =  "./imgs/pantalon2.png";
    img3.src = imgSrc3;
    img3.classList.add("personaje_img");
    div2.appendChild(img3);
    imgSrc4 =  "./imgs/zapato2.png";
    img4.src = imgSrc4;
    img4.classList.add("personaje_img");
    div2.appendChild(img4);
    div.appendChild(div2);
    contenedor5.appendChild(div);
}
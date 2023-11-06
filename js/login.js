function validarFormulario() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    if (usuario === "" || contrasena === "") {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    const datosUsuario =  {
            name:usuario,
            pin:contrasena
        }
    
    loguearUsuario(datosUsuario); 
        
    
    return false;
}



function loguearUsuario(datosUsuario){

    return fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        if (response.status === 200) {
            console.log("OK");
            return response.json();
        } else if (response.status === 401) {
            alert("Login invalido. Revise sus credenciales..");
            return false;
        } else {
            alert("Error en la solicitud POST. Código de respuesta: " + response.status);
            return false;
        }
    })
    .then(data => {
        if (data) {
            console.log('Respuesta del servidor:', data);
            urlUser= "http://localhost:5000/users/" +datosUsuario.name+"/"+ datosUsuario.pin +"";
            console.log(data);
            sessionStorage.setItem('token', data);

            fetch(urlUser)
            // Exito
            .then(response => response.json())  // convertir a json
            .then(json => {
                const userIdLogueado = json;
                sessionStorage.setItem('userId', userIdLogueado.id);
                sessionStorage.setItem('userName', userIdLogueado.name );
                window.location.href = "index.html";

            })  
            .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
           
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });



}

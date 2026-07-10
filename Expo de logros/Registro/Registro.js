document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("Registro");
    const nombre = document.getElementById("name");
    const email = document.getElementById("email");
    const contraseña = document.getElementById("password");
    const parrafo = document.getElementById("warnings");
    const terminos = document.getElementById("terms");
    

    if (sessionStorage.getItem("datosRegistro")) {
        const datosGuardados = JSON.parse(sessionStorage.getItem("datosRegistro"));
        if (datosGuardados.nombre) nombre.value = datosGuardados.nombre;
        if (datosGuardados.email) email.value = datosGuardados.email;
    }
    
    formulario.addEventListener("submit", (e) => { 
        e.preventDefault(); 
        let warnings = "";
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let entrar = false; 

        if (nombre.value.trim().length < 6) {
            warnings += 'El nombre debe tener más de 5 caracteres. <br>';
            entrar = true;
        }

        if (!regexEmail.test(email.value)) { 
            warnings += 'El email no es válido. <br>';
            entrar = true;
        }

        if (contraseña.value.length < 8) {
            warnings += 'La contraseña debe tener al menos 8 caracteres. <br>';
            entrar = true;
        }
        
        if (!terminos.checked) {
            warnings += 'Debes aceptar los Términos y Condiciones para continuar. <br>';
            entrar = true;
        }

        if (entrar) {
            parrafo.innerHTML = warnings;
            parrafo.style.color = "red"; 
        } else {

            const datosUsuario = {
                nombre: nombre.value,
                email: email.value,
                contraseña: contraseña.value 
            };

            sessionStorage.setItem("datosRegistro", JSON.stringify(datosUsuario));

            parrafo.innerHTML = "¡Paso 1 completado con éxito!";
            parrafo.style.color = "green";
            
            setTimeout(() => {
                window.location.href = "GoFlash2.html"; 
            }, 1500);
        }
        
        console.log("Formulario del Paso 1 procesado");
    });
});

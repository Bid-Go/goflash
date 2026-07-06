document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("Registro");
    const nombre = document.getElementById("name");
    const email = document.getElementById("email");
    const contraseña = document.getElementById("password");
    const parrafo = document.getElementById("warnings");
    const terminos = document.getElementById("terms");
    
    formulario.addEventListener("submit", (e) => { 
        e.preventDefault(); 
        let warnings = "";
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let entrar = false; 
        if (nombre.value.length < 6) {
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
            parrafo.innerHTML = "¡Registro exitoso!";
            parrafo.style.color = "green";
            setTimeout(() => {
                window.location.href = "GoFlash 2.html"; 
            }, 1500); // Demora algo pero funciona
        }
            
            console.log("Formulario enviado");

        }
    )});

let currentStep = 1;

// Control de flujo entre los pasos de la interfaz
function goToStep(stepNumber) {
    // Validación estructural antes de dejar avanzar del paso 1 al paso 2
    if (stepNumber === 2 && currentStep === 1) {
        if (!document.getElementById('nombre').value || !document.getElementById('correo').value || !document.getElementById('cedula').value) {
            alert("Por favor, completa los campos requeridos del Conductor antes de continuar.");
            return;
        }
    }

    // Validación estructural antes de dejar avanzar al paso de pago
    if (stepNumber === 3 && currentStep === 2) {
        if (!document.getElementById('marca').value || !document.getElementById('modelo').value || !document.getElementById('placa').value) {
            alert("Por favor, completa los campos requeridos de tu vehículo.");
            return;
        }
    }

    // Intercambio de clases CSS para alternar la sección activa
    document.getElementById(`step-section-${currentStep}`).classList.remove('active');
    document.getElementById(`step-section-${stepNumber}`).classList.add('active');

    // Actualiza la barra superior de progreso
    updateProgressIndicators(stepNumber);

    currentStep = stepNumber;
}

// Actualización estética del Stepper Superior
function updateProgressIndicators(step) {
    for (let i = 1; i <= 3; i++) {
        const indicator = document.getElementById(`step-indicator-${i}`);
        const circle = indicator.querySelector('div');
        const label = indicator.querySelector('span');

        if (i === step) {
            circle.className = "w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold step-glow border-2 border-white transition-all duration-300";
            label.className = "mt-2 text-xs font-bold text-primary";
        } else if (i < step) {
            circle.className = "w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold transition-all duration-300";
            label.className = "mt-2 text-xs font-medium text-secondary";
        } else {
            circle.className = "w-10 h-10 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center border border-outline-variant transition-all duration-300";
            label.className = "mt-2 text-xs font-medium text-on-surface-variant";
        }
    }
}

// Previsualización en vivo de la foto carnet subida
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarIcon').classList.add('hidden');
            const img = document.getElementById('chosenAvatar');
            img.src = e.target.result;
            img.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
}

// Máscaras automáticas para campos de entrada bancaria
document.getElementById('cardNumber').addEventListener('input', (e) => {
    let v = e.target.value.replace(/[^\d]/g, '');
    e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
});

document.getElementById('expiryDate').addEventListener('input', (e) => {
    let v = e.target.value.replace(/[^\d]/g, '');
    if (v.length > 2) e.target.value = v.substring(0, 2) + '/' + v.substring(2, 4);
});

// Procesamiento final del formulario (¡SIN REDIRECCIONES EXTERNAS!)
function handleFormSubmit(event) {
    event.preventDefault();

    if (!document.getElementById('aceptaTerminos').checked) {
        alert("Debes aceptar los términos y condiciones de GoFlash.");
        return;
    }

    const submitBtn = document.getElementById('finalSubmitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Guardando conductor...';
    }

    // Mapeo completo de variables consolidadas en memoria local
    const driverProfile = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        cedula: document.getElementById('cedula').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        correo: document.getElementById('correo').value.trim(),
        vehiculo: {
            tipo: document.getElementById('tipoVehiculo').value,
            marca: document.getElementById('marca').value.trim(),
            modelo: document.getElementById('modelo').value.trim(),
            placa: document.getElementById('placa').value.trim().toUpperCase(),
            anio: document.getElementById('anio').value
        },
        pago: {
            metodo: document.querySelector('input[name="payment_method"]:checked').value,
            tarjetaTerminacion: document.getElementById('cardNumber').value.slice(-4)
        }
    };

    // Guardar datos localmente para simular base de datos en la Expo
    localStorage.setItem('goflash_driver_profile', JSON.stringify(driverProfile));
    console.log("Perfil de conductor registrado en LocalStorage con éxito:", driverProfile);

    // Feedback visual inmediato sin salir de la página
    setTimeout(() => {
        alert("¡Registro de Conductor procesado exitosamente en el sistema de GoFlash!");
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Completar Registro';
        }
    }, 1000);
}
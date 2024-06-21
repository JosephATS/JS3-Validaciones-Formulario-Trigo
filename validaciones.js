document.addEventListener('DOMContentLoaded', function () {
    const showPasswordBtn = document.getElementById('showPasswordBtn');
    const showConfirmPasswordBtn = document.getElementById('showConfirmPasswordBtn');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const emailInput = document.getElementById('email');
    const form = document.getElementById('registerForm');

   
    showPasswordBtn.addEventListener('click', function () {
        togglePasswordVisibility(passwordInput, showPasswordBtn);
    });

    showConfirmPasswordBtn.addEventListener('click', function () {
        togglePasswordVisibility(confirmPasswordInput, showConfirmPasswordBtn);
    });

    
    form.addEventListener('submit', function (event) {
        let isValid = true;

       
        const requiredFields = [passwordInput, confirmPasswordInput, emailInput];
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.setCustomValidity("Este campo es obligatorio.");
                field.reportValidity();
                isValid = false;
            } else {
                field.setCustomValidity("");
            }
        });

     
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.setCustomValidity("Por favor, introduce un correo electrónico válido.");
            emailInput.reportValidity();
            isValid = false;
        } else {
            emailInput.setCustomValidity("");
        }

        
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
            isValid = false;
        } else {
            confirmPasswordInput.setCustomValidity(""); 
        }

      
        if (!isValid) {
            event.preventDefault();
            return confirm("Hay errores en el formulario. ¿Estás seguro de enviarlo?");
        }
    });

    
    confirmPasswordInput.addEventListener('input', function () {
        if (passwordInput.value === confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("");
        }
    });

    function togglePasswordVisibility(input, button) {
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = '<i class="bi bi-eye-slash"></i>';
        } else {
            input.type = 'password';
            button.innerHTML = '<i class="bi bi-eye"></i>';
        }
    }
});
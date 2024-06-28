document.addEventListener("DOMContentLoaded", function(){
    const email = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    // Variables
    const inputEmail = document.querySelector("#email")
    const inputAsunto = document.querySelector("#asunto")
    const inputMensaje = document.querySelector("#mensaje")
    const formulario = document.querySelector("#formulario")
    const btnSubmit = document.querySelector("#formulario button[type='submit']")
    const btnReset = document.querySelector("#formulario button[type='reset']")
    const spinner = document.querySelector("#spinner")

    //Eventos
    inputEmail.addEventListener("blur", validar)
    inputAsunto.addEventListener("blur",validar)
    inputMensaje.addEventListener("blur", validar)
    formulario.addEventListener("submit", enviarEmail)

    btnReset.addEventListener("click", function(e){
        e.preventDefault()
        
        email.email = ""
        email.asunto = ""
        email.mensaje = ""

        formulario.reset()
        comprobarEmail()
        console.log(email);
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add("flex")
        spinner.classList.remove("hidden")
    }


    function validar(e){

        if(e.target.value.trim() === ""){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = ""
            comprobarEmail()
            return;
        }

        if(e.target.id === "email" && !validarEmail(e.target.value)){
            mostrarAlerta("El email no es valido", e.target.parentElement)
            email[e.target.name] = ""
            comprobarEmail()
            return;
        }

        limpiarAlerta(e.target.parentElement)

        email[e.target.name] = e.target.value.trim().toLowerCase(); 

        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia)

        const error  = document.createElement("P")
        error.textContent = mensaje
        error.classList.add("text-white", "bg-red-600", "p-2", "text-center")
        
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector(".bg-red-600")

        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email) 
        console.log(resultado)
        return resultado
    }

    function comprobarEmail(){
        if(Object.values(email).includes("")){
            btnSubmit.classList.add("opacity-50")
            btnSubmit.disabled = true  
            return     
        }
        btnSubmit.classList.remove("opacity-50")
        btnSubmit.disabled = false
    }

})
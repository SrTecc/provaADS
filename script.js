const fields = document.querySelectorAll("[required]")

function ValidateField(field){
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            
            if(field.validity[error] && !field.validity.valid){
                foundError = error
            }
        }

        return foundError;
    }


    function customMessage(typeError){
        const messages = {
            text: {
                valueMissing: "Campo nome obrigatório."
            },
            email: {
                valueMissing: "Campo email obrigatório.",
                typeMismatch: "Por favor, preencha um email valido!"
            },
            textarea: {
                valueMissing: "Campo mensagem obrigatório."
            }
        }
        return messages[field.type][typeError]
    }

    function setCustomMessage(message){
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
        
        
    }

    return function(){

        const error = verifyErrors()

        
        if(verifyErrors()){
            const messages = customMessage(error)
            field.style.borderColor = "red"
            setCustomMessage(messages)
            } else {
                field.style.borderColor = "green"
                setCustomMessage()
            }

    }

    }



console.log(fields)

function customValidation(event){

    


    const field = event.target
    const validation = ValidateField(field)
    console.log(validation)
    
    validation()
}




for( field of fields ){
    field.addEventListener("invalid", event => {
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}














document.querySelector("form").addEventListener("submit", event => {
    console.log("Enviar o formulario")
    event.preventDefault()
})
export const valida = (input)=>{
    const tipoInput = input.dataset.type;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";

    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMesajeError(tipoInput, input);
    }

}

const tipoError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo nombre email no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12 debe contener una letra minuscula, una mayuscula, un numero y no debe contener caracteres especiales"
    },
    nacimiento:{
        valueMissing: "El campo nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad."
    },
    numero:{
        valueMissing: "El campo telefono no puede estar vacio",
        patternMismatch: "El formato requerido es XXX XXX XXXX"
    },
    direccion:{
        valueMissing: "El campo direccion no puede estar vacio",
        patternMismatch: "La direccion debe tener entre 10 y 40 cracteres"
    },
    ciudad:{
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La direccion debe tener entre 3 y 20 cracteres"
    }, 
    departamento:{
        valueMissing: "El campo departamento no puede estar vacio",
        patternMismatch: "La direccion debe tener entre 3 y 20 cracteres"
    }, 
    
}
const validadores = {
    nacimiento: (input)=>validarNacimiento(input)
}

const mostrarMesajeError = (tipoInput,input)=>{
    let mensaje="";
    tipoError.forEach(error =>{
        if(input.validity[error]){
            mensaje= mensajesError[tipoInput][error];
        }

    });
    return mensaje;
}

const validarNacimiento = (input)=>{
    const fechaCliente = new Date (input.value);
    let mensaje="";
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad.";
    };
    input.setCustomValidity(mensaje);
}

const mayorEdad = (fechaCliente)=>{
    const fechaActual = new Date();
    const diferenciaFechas = new Date (fechaCliente.getUTCFullYear()+18, fechaCliente.getUTCMonth(), fechaCliente.getUTCDate());
    return diferenciaFechas <= fechaActual;   
}
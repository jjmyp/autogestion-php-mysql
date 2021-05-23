$(document).ready(function () {
    const formRegistroUsuario = document.querySelector('#formRegistroUsuario')
    
    //Formulario para agregar nuevo rol
    $(formRegistroUsuario).on('submit', function(e){
        e.preventDefault()

        var strNombre = document.querySelector('#txtNombre').value
        var strApellido = document.querySelector('#txtApellido').value
        var strDocumento = document.querySelector('#txtDocumento').value
        var intTipoDocumento = document.querySelector('#txtTipoDocumento').value
        var strFecha_nacimiento = document.querySelector('#txtFechaNacimiento').value
        var strSexo = document.querySelector('#txtSexo').value
        var strDireccion = document.querySelector('#txtDireccion').value
        var intCiudad = document.querySelector('#txtCiudad').value
        var strTelefono = document.querySelector('#txtTelefono').value
        var strCelular = document.querySelector('#txtCelular').value
        var strCorreoElectronico = document.querySelector('#txtCorreoElectronico').value
        var strContrasena = document.querySelector('#txtContrasena').value
        var strConfirmarContrasena = document.querySelector('#txtConfirmarContrasena').value

        if (strContrasena == strConfirmarContrasena) {
            if (strNombre == '' || strApellido == '' || strDocumento == '' || intTipoDocumento == '' || strFecha_nacimiento == '' || strSexo == '' || strDireccion == '' || intCiudad == '' || strTelefono == '' || strCelular == '' || strCorreoElectronico == '' || strContrasena == '' || strConfirmarContrasena == '') {
                $.ajax({
                    url: 'usuarios/regisro/',
                    method: 'POST',
                    data: new FormData(formData),
                    contentType: false,
                    processData: false,
                    dataType: 'JSON',
                    success: function(objData){
                        if (objData.status == 'success') {
                            Message(objData.message, objData.status)
                        }else if(objData.status == 'warning'){
                            Message(objData.message, objData.status)
                        }else{
                            Message(objData.message, objData.status)
                        }
                    }
                })
            }
        }else{            
            alert('Las contraseñas no coinciden')
        } 
    })
})



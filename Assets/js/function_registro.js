$(document).ready(function () {
  $('#imageVerificar').hide()
  //Limpiar local storage
  localStorage.clear();

  //Entrar apuntando al input clave de registro
  $("#clave_registro").focus();
  
jQuery.validator.addMethod("lettersonly", function(value, element) {
return this.optional(element) || /^[a-z\s]+$/i.test(value);
}, "Only alphabetical characters");

  // Verificar validacion de registro
  $("#formRegistro").validate({
    event: "blur",
    highlight: function (input) {
      $(input).parents(".form-group").addClass("has-danger");
    },
    unhighlight: function (input) {
      $(input).parents(".form-group").removeClass("has-danger");
    },
    errorPlacement: function (error, element) {
      $(element).parents(".form-group").append(error);
    },
    rules: {
        
      clave_registro: {
        required: true,
        remote: {
          url: base_url + "registro/ValidarClaveRegistro/",
          type: "POST",
        },
      },
        dia_nacimiento:{
          required:true,
      },
      mes_nacimiento:{
          required:true,
      },
        anio_nacimiento:{
          required:true,
      },
      nombre: {
        required: true,
        lettersonly: true
      },
      apellido: {
        required: true,
        lettersonly: true
      },
      tipo_documento: {
        required: true,
      },
      identificacion: {
        maxlength: 10,
        minlength: 4,
        required: true,
        remote: {
          url: base_url + "registro/ValidarDocumento/",
          type: "POST",
        },
      },

      genero: {
        required: true,
      },
      direccion: {
        required: true,
      },
      ciudad: {
        required: true,
      },
      telefono: {
        maxlength: 7,
        minlength: 7,
        required: true,
      },
      celular: {
        maxlength: 10,
        minlength: 10,
        required: true,
        remote: {
          url: base_url + "registro/ValidarCelular/",
          type: "POST",
        },
      },
      contrasena: {
        maxlength: 16,
        minlength: 6,
        required: true,
      },
      correo_electronico: {
        required: true,
        remote: {
          url: base_url + "registro/ValidarEmail/",
          type: "POST",
        },
      },
      confirmar_contrasena: {
        equalTo: "#contrasena",
      },
      acepto_termino: {
        required: true,
      },
    },
    messages: {
      clave_registro: {
        required: "Digital la clave de registro",
        remote: "Clave de registro invalida",
      },
     dia_nacimiento:{
          required:"Selecciona el dia de nacimiento",
      },
      mes_nacimiento:{
          required:"Selecciona el mes de nacimiento",
      },
        anio_nacimiento:{
          required:"Selecciona el anio de nacimiento",
      },
      nombre: {
        required: "Digita tu nombre",
        lettersonly: "Solo se permiten caracteres alfabeticos"
      },
      apellido: {
        required: "Digita tu apellido",
        lettersonly: "Solo se permiten caracteres alfabeticos"
      },
      tipo_documento: {
        required: "Selecciona el tipo de documento",
      },
      identificacion: {
        required: "Digita el numero de documento",
        remote: "El numero de documento ya esta en uso.",
        maxlength: "El maximo permitido es de 10 numeros",
        minlength: "El minimo permitido es de 4 numeros",
      },
 
      genero: {
        required: "Selecciona tu sexo",
      },
      direccion: {
        required: "Digita tu dirección",
      },
      ciudad: {
        required: "Selecciona la ciudad donde vives.",
      },
      telefono: {
        required: "Digita el numero telefonico",
        maxlength: "El telefono debe contener minimo 7 digitos",
        minlength: "El telefono debe contener maximo 7 digitos",
      },
      celular: {
        required: "Digita el numero celular.",
        remote: "El numero de celular ya esta en uso.",
        maxlength: "El celular debe contener minimo 10 digitos",
        minlength: "El celular debe contener maximo 10 digitos",
      },
      contrasena: {
        required: "Digita tu contraseña",
        maxlength: "La contraseña debe tener un maximo de 16 caracteres",
        minlength: "La contraseña debe tener minimo de 6 caracteres",
      },
      correo_electronico: {
        email: "Ingresa un correo electronico valido",
        required: "Digita tu correo electronico",
        remote: "El correo electronico ya esta en uso.",
      },
      confirmar_contrasena: {
        equalTo: "Las contraseñas no coinciden",
      },
      acepto_termino: {
        required: "Para continuar debes aceptar los terminos y condiciones",
      },
    },
    // debug: true,
    errorElement: "label",
  });

  //Verificar que los datos se hayan registrado
  $("#formCodigoVerificacion").validate({
    event: "blur",
    highlight: function (input) {
      $(input).parents(".form-group").addClass("has-danger");
    },
    unhighlight: function (input) {
      $(input).parents(".form-group").removeClass("has-danger");
    },
    errorPlacement: function (error, element) {
      $(element).parents(".form-group").append(error);
    },
    rules: {
      celular_seleccionado: {
        required: true,
        remote: {
          url: base_url + "registro/ValidarCelular/",
          type: "POST",
        },
      },
    },
    messages: {
      celular_seleccionado: {
        required: "Digita el numero celular.",
        remote: "El numero de celular ya esta en uso.",
      },
    },
    errorElement: "label",
  });

  //Abrir modal y enviar validacion de mensaje de texto
  $("#btnSiguiente").on("click", function (event) {
    event.preventDefault();
    var valid = $("#formRegistro").valid();
    if (!valid) {
      return;
    }

    $("#ModalVerificarCelular").modal("show");
    setTimeout(() => {
      $("#codigo1").focus();
    }, 500);

    var account_id_local_storage = localStorage.getItem("account_id");
    var validation_id_local_storage = localStorage.getItem("validation_id");

    if (
      account_id_local_storage == "" ||
      validation_id_local_storage == "" ||
      account_id_local_storage == null ||
      validation_id_local_storage == null ||
      account_id_local_storage == undefined ||
      validation_id_local_storage == undefined
    ) {
      jQuery.ajax({
        url: base_url + "registro/CrearCuentaPhone/",
        method: "POST",
        data: {
          cuenta: "cuenta",
        },
        dataType: "JSON",
        success: function (response) {
          console.log(response);
          var account_id = response.account_id;
          var identificacion = document.getElementById("identificacion").value;
          var celular = document.getElementById("celular").value;
          jQuery.ajax({
            url: base_url + "registro/InscripcionPhone/",
            method: "POST",
            data: {
              celular: celular,
              account_id: account_id,
              identificacion: identificacion,
            },
            dataType: "JSON",
            success: function (response2) {
              console.log(response2);
              jQuery.ajax({
                url: base_url + "registro/ValidacionPhone/",
                method: "POST",
                data: {
                  account_id: account_id,
                },
                dataType: "JSON",
                success: function (response3) {
                  console.log(response3);
                  localStorage.setItem(
                    "validation_id",
                    response3.validation_id
                  );
                  localStorage.setItem("account_id", response3.account_id);
                },
                error: function(err){
                  console.log("Error "+err)
                }
              });
            },
            error: function (err) {
              console.log("Error " + err);
            },
          });
        },
        error: function(err){
          console.log("Error "+err)
        }
      });
    } else {
      localStorage.removeItem("validation_id");
      $.ajax({
        url: base_url + "registro/ValidacionPhone/",
        method: "POST",
        data: {
          account_id: account_id_local_storage,
        },
        dataType: "JSON",
        success: function (objData) {
          localStorage.setItem("validation_id", objData.validation_id);
        },
      });
    }
  });

  //Reenviar mensaje de texto
  $("#btnReenviarSMS").on("click", function () {
    localStorage.removeItem("validation_id");
    $.ajax({
      url: base_url + "registro/ValidacionPhone/",
      method: "POST",
      data: {
        account_id: localStorage.getItem("account_id"),
      },
      dataType: "JSON",
      success: function (objData) {
        localStorage.setItem("validation_id", objData.validation_id);
        document.getElementById("codigo1").value = "";
        document.getElementById("codigo2").value = "";
        document.getElementById("codigo3").value = "";
        document.getElementById("codigo4").value = "";
        document.getElementById("codigo5").value = "";
        document.getElementById("codigo6").value = "";
        document.getElementById("codigo1").focus();
      },
    });
  });

  //Cambiar numero de celular
  $("#btnCambiarCelular").on("click", function () {
    $("#celular_seleccionado").attr("type", "text");
    // $('#celular_seleccionado').prop('readonly', false);
    $("#celular_seleccionado").focus();
    $("#celular_seleccionado").val("");
    // document.getElementById("celular_seleccionado").attr("readonly", false);
    // document.getElementById("celular_seleccionado").value = ""
    // document.getElementById("celular_seleccionado").focus();
  });

  //Registrar usuario
  $("#btnRegistrarUsuario").on("click", function (event) {
    event.preventDefault();

    var valid = $("#formCodigoVerificacion").valid();
    if (!valid) {
      return;
    }

    // var formRegistro = document.querySelector('#formRegistro')
    // var formData = new FormData(formRegistro)

    // formData.append('account_id', 'SJADLSASDADSA-DASDASDS')
    // formData.append('account', 'DEFAULT')
    // formData.delete('celular');
    // formData.append('celular', $('#celular_seleccionado').val())

    // $.ajax({
    //   url: base_url + 'registro/AgregarUsuarioController/',
    //   method: 'POST',
    //   data: formData,
    //   processData: false,
    //   contentType: false,
    //   dataType: 'JSON',
    //   success: function (objData) {
    //     if (objData.status == 'success') {
    //       localStorage.clear();
    //       $('#div-vc').hide();
    //       $('#btnRegistrarUsuario').hide()
    //       var urlimg = base_url + 'Assets/images/numeroverificado.png'
    //       var img = `<img width="299px" src="${urlimg}"> `
    //       $('#logo').after(img);
    //       $('#btnFinish').show()
    //     } else {
    //       Message('Hubo un problema al registrarse', 'danger')
    //     }
    //   }
    // })

    var codigo1 = document.querySelector("#codigo1").value,
      codigo2 = document.querySelector("#codigo2").value,
      codigo3 = document.querySelector("#codigo3").value,
      codigo4 = document.querySelector("#codigo4").value,
      codigo5 = document.querySelector("#codigo5").value,
      codigo6 = document.querySelector("#codigo6").value,
      token =
        codigo1 +
        "" +
        codigo2 +
        "" +
        codigo3 +
        "" +
        codigo4 +
        "" +
        codigo5 +
        "" +
        codigo6;
    var account_id = localStorage.getItem("account_id"),
      validation_id = localStorage.getItem("validation_id");
    $.ajax({
      url: base_url + "registro/VerificarValidacionPhone/",
      method: "POST",
      data: {
        account_id: account_id,
        validation_id: validation_id,
        token: token,
        type: "phone-verification",
        question_id: "identity-questions",
      },
      dataType: "JSON",
      beforeSend: function () {
        $("#cover-spin").show(0);
      },
      success: function (objData) {
        $("#cover-spin").hide(0);
        if (objData.validation_status == undefined) {
          if (objData.http_code == 400) {
            Message(
              "La validación ya no está disponible, porfavor reenvie nuevamente el codigo.",
              "danger"
            );
          } else {
            Message("No se encontraron coincidencias", "danger");
          }
        } else {
          if (objData.validation_status == "success") {
            var formRegistro = document.querySelector("#formRegistro");
            var formData = new FormData(formRegistro);
            
            var dia_nacimiento = $('#dia_nacimiento').val(),
             mes_nacimiento = $('#mes_nacimiento').val(),
             anio_nacimiento = $('#anio_nacimiento').val(),
             fecha_nacimiento = anio_nacimiento+'-'+mes_nacimiento+'-'+dia_nacimiento
            
            
            formData.append("fecha_nacimiento", fecha_nacimiento)
            formData.append("account_id", account_id);
            formData.append("account", "DEFAULT");
            formData.delete("celular");
            formData.append("celular", $("#celular_seleccionado").val());
                
            $.ajax({
              url: base_url + "registro/AgregarUsuarioController/",
              method: "POST",
              data: formData,
              processData: false,
              contentType: false,
              dataType: "JSON",
              success: function (objData) {
                if (objData.status == "success") {
                  localStorage.clear();
                  $("#div-vc").hide();
                  $("#nextBtn").hide();
                  $("#btnRegistrarUsuario").hide()
                  $("#txtCorreoElectronico").hide();
                  var urlimg = base_url + "Assets/images/numeroverificado.png";
                  var img = `<img width="300px" src="${urlimg}"> `;
                  $("#logo").after(img);
                  $("#btnFinish").show();

                } else {
                  Message("Hubo un problema al registrarse", "danger");
                }
              },
            });
          } else {
            Message("Codigo incorrecto", "danger");
          }
        }
      },
    });
  });

  /* Inicializar la funcion btnSiguiente inicia el documento */
  fntSelects();
  $("#ciudad").select2({
    placeholder: "Ciudad",
    width: "100%",
  });

  // Funcion para eliminar los datos de los codigos
  $(document).on("keyup", "input.delete", function (e) {
    var idInput = $(this).data("id") - 1;
    if (e.keyCode == 8) {
      $("#codigo" + idInput).focus();
    }
  });

  //Pasar valor del formulario principal al modal
  /*$("#celular").keyup(function (e) {
    var value = $("input:text[name=celular]").val();
    $("#celular_seleccionado").val(value);
    $("#celular_strong").html(value);
  });*/
});


$("#celular").keyup(function () {
    var value = $(this).val();
    $("#celular_seleccionado").val(value);
    $("#celular_strong").html(value);
});

/* Consulta en selects */
function fntSelects() {
  /* Consulta de ciudades*/
  $.ajax({
    url: base_url + "ciudades/ObtenerCiudadesController/",
    type: "GET",
    dataType: "JSON",
    success: function (objData) {
      var html = `<option value="" disabled selected>Ciudad</option>`;
      objData.forEach((element) => {
        html += `
                <option value="${element.ciudad_id}">${element.ciudad} - ${element.departamento}</option>
                `;
      });
      $("#ciudad").html(html);
    },
  });
  /*Consulta de tipos documentos */
  $.ajax({
    url: base_url + "tiposdocumentos/ObtenerTiposDocumentosController/",
    type: "GET",
    dataType: "JSON",
    success: function (objData) {
      var html = `<option value="" disabled selected>Tipo documento</option>`;
      objData.forEach((element) => {
        html += `                
                <option value="${element.id}">${element.abreviacion} - ${element.descripcion}</option>
                `;
      });
      $("#tipo_documento").html(html);
    },
  });
}

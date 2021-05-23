$(document).ready(function () {

    // Verificar validacion de registro
    $("#formInvitacionRegistro").validate({
      event: "blur",
      highlight: function (input) {
        $(input).parents('.input-group').addClass('has-danger text-center');
      },
      unhighlight: function (input) {
        $(input).parents('.input-group').removeClass('has-danger text-center');
      },
      errorPlacement: function (error, element) {
        $(element).parents('.input-group').append(error);
      },
      rules: {
        nombre: {
          required: true
        },
        correo_electronico: {
          required: true,          
          remote: {
            url: base_url + 'registro/ValidarEmail/',
            type: "POST"
          }
        }
      },
      messages: {
        nombre: {
          required: "Digita el nombre completo del referidor"
        },
        correo_electronico: {
          email: 'Ingresa un correo electronico valido',
          required: 'Digita tu correo electronico',
          remote: "El correo electronico ya esta en uso."
        }
      },
      // debug: true,
      errorElement: "label"
    });


  $("#formInvitacionRegistro").on("submit", function (event) {
    event.preventDefault();
    parametros = {
      nombre: document.querySelector("#nombre").value,
      correo_electronico: document.querySelector("#correo_electronico").value,
    };
    var valid = $("#formInvitacionRegistro").valid();
    if (!valid) {return}

    $.ajax({
      url: base_url + "invitacionregistro/EnviarSolicitudRegistro/",
      method: "POST",
      data: parametros,
      dataType: "JSON",
      beforeSend: function () {
        $("#cover-spin").show(0);
      },
      success: function (objData) {
        $("#cover-spin").hide(0);
        if (!objData[0]) {
          if (objData.status == "success") {
            Reset("#formInvitacionRegistro");
            Message(objData.msg, objData.status);
          } else if (objData.status == "warning") {
            Message(objData.msg, objData.status);
          } else {
            Message(objData.msg, objData.status);
          }
        } else {
          Message(objData[0], "danger");
        }
      },
    });
  });
});


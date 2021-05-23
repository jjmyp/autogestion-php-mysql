$(document).ready(function () {

  $("#formRecuperarContrasena").validate({
    event: "blur",
    highlight: function (input) {
      $(input).parents('.form-group').addClass('has-danger');
    },
    unhighlight: function (input) {
      $(input).parents('.form-group').removeClass('has-danger');
    },
    errorPlacement: function (error, element) {
      $(element).parents('.form-group').append(error);
    },
    rules: {
      contrasena: {
        required: true
      },
      confirmar_contrasena: {
        equalTo: "#contrasena"
      }
    },
    messages: {
      contrasena: {
        required: 'Digita la nueva contraseña'
      },
      confirmar_contrasena: {
        equalTo: 'Las contraseñas no coinciden'
      }
    },
    // debug: true,
    errorElement: "label"
  });


  $('#formRecuperarContrasena').on('submit', function (e) {

    e.preventDefault();
	var spinnerLoad = `
	<div id="spinner_load" class="spinner-border text-light spinner-grow-sm" role="status" style="margin-right: 5px">
		<span class="sr-only">Loading...</span>
	</div>`;
	
    var valid = $(this).valid();

    if (!valid) {
      return
    }


    $.ajax({
      url: base_url + 'login/ActualizarContrasena',
      type: 'POST',
      dataType: 'JSON',
      processData: false,
      contentType: false,
      data: new FormData(this),
      beforeSend: function(obj){
        $('#btnSiguiente').html(spinnerLoad)
      },
      success: function (objData) {
           $('#btnSiguiente').html('Enviar')
        if (objData.status == 'success') {


          Message(objData.message, objData.status)

          setTimeout(() => {
            window.location = base_url + "login"
          }, 3000);
        } else {
          Message(objData.message, objData.status)
        }
      }
    })

  })


})
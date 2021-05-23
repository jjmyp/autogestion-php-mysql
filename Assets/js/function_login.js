//Animacion para mostrar la actualizacion de contraseè´–a
$('.login-content [data-toggle="flip"]').click(function () {
	$('.login-box').toggleClass('flipped');
	return false;
});

$(document).ready(function () {
    
    //Validacion de campos para iniciar sesion
	$("#formLogin").validate({
		event: "blur",
		highlight: function (element) {
			$(element).parent().addClass('text-info text-center')
		},
		unhighlight: function (element) {
			$(element).parent().removeClass('text-info text-center')
		},
		rules: {
			correo: {
				required: true
			},
			contrasena: {
				required: true
			}
		},
		messages: {
			correo: {
				email: 'Ingresa un correo electronico valido',
				required: 'Digita tu correo electronico'
			},
			contrasena: {
				required: 'Digita tu contrase√±a'
			}
		},
		errorElement: "label"
	});
    
    //Formulario para comparar datos del usuario
	$('#formLogin').on('submit', function (e) {
		e.preventDefault();
		valid = $('#formLogin').valid()
		if (valid) {
			$.ajax({
				url: base_url + 'login/loginUser/',
				method: 'POST',
				data: new FormData(this),
				processData: false,
				contentType: false,
				dataType: 'JSON',
				success: function (objData) {
					if (objData.status == 'success') {
						$('#contrasena').parent().find('label#contrasena-error').remove()
						window.location = base_url + "dashboard"
					} else {
					    $('#contrasena').parent().find('label#contrasena-error').remove()
						$('#contrasena').after("<label id='hola-error' class='error text-center text-danger' for='contrasena'>Credenciales invalidas.</label>")
					}
				}
			})
		}
	})
    
    //Formulario para enviar correo y restablecer la contraseè´–a
	$('#formRecuperarContrasena').on('submit', function (e) {
		e.preventDefault();
		var spinnerLoad = `
		<div id="spinner_load" class="spinner-border text-light spinner-grow-sm" role="status" style="margin-right: 5px">
			<span class="sr-only">Loading...</span>
		</div>`;
		$.ajax({
			url: base_url + 'login/correoactualizarcontrasena/',
			method: 'POST',
			data: new FormData(this),
			processData: false,
			contentType: false,
			dataType: 'JSON',
			beforeSend: function(){
				$('#btnCambiarContrasena').html(spinnerLoad)
			},
			success: function (objData) {
				$('#btnCambiarContrasena').html('Enviar')
				if (objData.status == 'danger') {
					Message(objData.message, objData.status)
				} else {
					Message(objData.message, objData.status)
					$('#formRecuperarContrasena')[0].reset();
					setTimeout(() => {
						window.location = base_url + 'login'
					}, 1000);
				}
			}
		})
	})
})
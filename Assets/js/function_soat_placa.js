function init() {
	//Paste();
	Mostrar_formularios_init();
	$("#placa").keyup();
	$("#r_placa").keyup();
}

// Convierte la Placa ingresada en Mayusculas
$("#placa").keyup(function () {
	var numPlaca = document.getElementById("placa").value;
	mayuscPlaca = numPlaca.toUpperCase();
	$("#placa").val(mayuscPlaca);
});
// Convierte la Placa ingresada en Mayusculas
$("#r_placa").keyup(function () {
	var numPlaca = document.getElementById("r_placa").value;
	mayuscPlaca = numPlaca.toUpperCase();
	$("#r_placa").val(mayuscPlaca);
});

// Evita Espacios en blanco en el numero de Placa
$(function () {
	$("#placa").on("keypress", function (e) {
		if (e.which == 32) return false;
	});
});

$(function () {
	$("#r_placa").on("keypress", function (e) {
		if (e.which == 32) return false;
	});
});


function Mostrar_formularios_init() {
	$("#f_soat_placa").show();
	$("#f_soat_sinplaca").hide();
	$("#idCotizacion").hide();
}

$("#f_soat_placa").on("submit", function (e) {
    e.preventDefault();
	let placa = document.getElementById("placa").value
	var numero_documento = document.getElementById("numero_documento").value;
	//let r_placa = document.getElementById("r_placa").value;
	//let tipo_documento = document.getElementById("tipo_documento").value;


	localStorage.clear();
	if (placa.length == 0 || numero_documento.length == 0 || /^\s+$/.test(numero_documento)) {
		Message('Los campos no pueden quedar vacios - Campos obligatorios', 'warning');
		return false;
	} else if (isNaN(numero_documento)) {
	    Message('Este campo solo permite valores numericos', 'warning');
		return false;
	}  else {
		$.ajax({
			data: {placa: placa, numero_documento: numero_documento},
			method: "POST",
			url: base_url + "polizas/cotizarsoat",
			dataType: "JSON",
			beforeSend: function () {
				$("#cover-spin").show(0);

			},
			success: function (response) {

				
			//Validamos el tiempo de respuesta.
             if(response.status == "error") {
				Message(response.message, "danger");
				$("#cover-spin").hide(0);
			 } else if (response.status == "success" && response.result.Header.FlagException != "false"){
				$("#cover-spin").hide(0);
				document.querySelector("#error").innerHTML = "Ocurrio un error en la transaccion, por favor dirijase a cualquiera de nuestras sucursales de AXA Colpatria a nivel Nacional\n\ No se encuentra una consulta Runt previa para la cotizacion. " +
					'<a target="_blank" href="https://www.axacolpatria.co/portal/Red/cid/23/Sucursales-Seguros-y-Capitalizacion-Colpatria">Listado sucursales AXAcolpatria</a>';     
				} else {
					var identificacion_xml = response.result.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona.Identificacion.Identificacion;
					var numero_documento_cotizar =  numero_documento; 
					 if (identificacion_xml == numero_documento_cotizar && response.result.Header.FlagException != "true"){
						
						Message(response.message, response.status);
						//JSON.stringfy sirve para guardar un objeto
						localStorage.setItem("cotizar_soat_placa", JSON.stringify(response.result));
						setTimeout(() => {
							window.location = base_url + "polizas/resumenplaca";
						}, 2000);
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'El número de identificación no coincide con los datos del RUNT. Por favor verificar en la tarjeta de propiedad'
						});
						$("#cover-spin").hide(0);
					}
				}
			},
		});
		return true;
	}
});

//Funcion de inicio 
$(document).ready(function () {

			$("input[type=radio]").click(function (event) {
				var valor = $(event.target).val();
				if (valor == "si") {
					$("#f_soat_placa").show();
					$("#f_soat_sinplaca").hide();
					$("#formContent").hide();
					$("#idCotizacion").hide();
				} else if (valor == "no") {
					$("#f_soat_placa").hide();
					$("#f_soat_sinplaca").show();
					$("#formContent").show();
					$("#idCotizacion").show();	
				}
			});


			$("#contenClase").change(function () {
				var vehClase = document.getElementById("idVehClase").value;
		
				$.ajax({
					type: "POST",
					url: "https://www.grupoasistencia.com/apicotizador/src/vehTpServicio.php",
					// url: "http://localhost/apicotizador/src/vehTpServicio.php",
					data: { vehClase: vehClase },
					cache: false,
					success: function (data) {
						var datos = $.parseJSON(data);
						fnVaciarContenPasaj();
		
						var tpServCombobox = "";
						tpServCombobox += "<div class='form-group input-group flex-nowrap'>";
						tpServCombobox += "<div class='input-group-prepend'>";
						tpServCombobox += "<span class='input-group-text' id='addon-wrapping'>";
						tpServCombobox += "<i class='fa fa-bus text-warning' aria-hidden='true'>";
						tpServCombobox += "</i>";
						tpServCombobox += "</span>";
						tpServCombobox += "</div>";
						tpServCombobox += "<select type='select' class='fadeIn combobox classTpServicio form-control' name='namTpServicio' id='idTpServicio' required>";
						tpServCombobox += "	<option value=''>Tipo de Servicio:</option>";
						$.each(datos, function (key, tpserv) {
							tpServCombobox += "<option value='" + tpserv.vehtpservicio + "'>" + tpserv.vehtpservicio + "</option>";
						});
						tpServCombobox += "</select>";
						tpServCombobox += "</div>";
						$('#contenTpServicio').html(tpServCombobox);
					}
				});
		
			});
		
		
			$("#contenTpServicio").change(function () {
				var vehClase = document.getElementById("idVehClase").value;
				var vehTpServicio = document.getElementById("idTpServicio").value;
		
				$.ajax({
					type: "POST",
					url: "https://www.grupoasistencia.com/apicotizador/src/vehPasajeros.php",
					// url: "http://localhost/apicotizador/src/vehPasajeros.php",
					data: { vehClase: vehClase, vehTpServicio: vehTpServicio },
					cache: false,
					success: function (data) {
						fnVaciarContenTonel();
		
						var datos = $.parseJSON(data);
						var num_rows = datos.length;
						var pasajCombobox = "";
		
						if (num_rows > 1) {
						    pasajCombobox += "<div class='form-group input-group flex-nowrap'>";
						    pasajCombobox += "<div class='input-group-prepend'>";
						    pasajCombobox += "<span class='input-group-text' id='addon-wrapping'>";
						    pasajCombobox += "<i class='fa fa-users text-warning' aria-hidden='true'>";
						    pasajCombobox += "</i>";
						    pasajCombobox += "</span>";
						    pasajCombobox += "</div>";
							pasajCombobox += "<select type='select' class='fadeIn combobox classPasajeros form-control ' name='namPasajeros' id='idPasajeros' required>";
							pasajCombobox += "	<option value=''>Numero de Pasajeros:</option>";
							$.each(datos, function (key, vehpasaj) {
								pasajCombobox += "<option value='" + vehpasaj.vehpasajeros + "'>" + vehpasaj.vehpasajeros + "</option>";
							});
							pasajCombobox += "</select>";
							pasajCombobox += "</div>";

						}
						else {
							pasajCombobox += "<input type='hidden' class='classPasajeros' name='namPasajeros' id='idPasajeros' value='" + datos[0].vehpasajeros + "'>";
						}
						pasajCombobox += "<input type='hidden' class='classNumRegPasaj' name='namNumRegPasaj' id='idNumRegPasaj' value='" + num_rows + "'>";
		
						$('#contenPasajeros').html(pasajCombobox);
						fnConsulPasajeros();
					}
				});
		
			});
		
		
			$("#contenPasajeros").change(function () {
				var vehClase = document.getElementById("idVehClase").value;
				var vehTpServicio = document.getElementById("idTpServicio").value;
				var vehPasajeros = document.getElementById("idPasajeros").value;
		
				$.ajax({
					type: "POST",
					url: "https://www.grupoasistencia.com/apicotizador/src/vehTonelada.php",
					// url: "http://localhost/apicotizador/src/vehTonelada.php",
					data: { vehClase: vehClase, vehTpServicio: vehTpServicio, vehPasajeros: vehPasajeros },
					cache: false,
					success: function (data) {
						fnVaciarContenCilin();
		
						var datos = $.parseJSON(data);
						var num_rows = datos.length;
						var tonelCombobox = "";
		
						if (num_rows > 1) {
							tonelCombobox += "<div class='form-group input-group flex-nowrap'>";
						    tonelCombobox += "<div class='input-group-prepend'>";
						    tonelCombobox += "<span class='input-group-text' id='addon-wrapping'>";
						    tonelCombobox += "<i class='fa fa-anchor text-warning' aria-hidden='true'>";
						    tonelCombobox += "</i>";
						    tonelCombobox += "</span>";
						    tonelCombobox += "</div>";
							tonelCombobox += "<select type='select' class='fadeIn combobox classTonelada form-control' name='namTonelada' id='idTonelada' required>";
							tonelCombobox += "	<option value=''>Capacidad de Carga:</option>";
							$.each(datos, function (key, vehtonel) {
								tonelCombobox += "<option value='" + vehtonel.vehtonelada + "'>" + vehtonel.vehtonelada + "</option>";
							});
							tonelCombobox += "</select>";
							tonelCombobox += "</div>";


						}
						else {
							tonelCombobox += "<input type='hidden' class='classTonelada' name='namTonelada' id='idTonelada' value='" + datos[0].vehtonelada + "'>";
						}
						$('#contenTonelada').html(tonelCombobox);
						fnConsultonelada();
					}
				});
		
			});
		
		
			$("#contenTonelada").change(function () {
				var vehClase = document.getElementById("idVehClase").value;
				var vehTpServicio = document.getElementById("idTpServicio").value;
				var vehPasajeros = document.getElementById("idPasajeros").value;
				var vehTonelada = document.getElementById("idTonelada").value;
		
				$.ajax({
					type: "POST",
					url: "https://www.grupoasistencia.com/apicotizador/src/vehCilindraje.php",
					// url: "http://localhost/apicotizador/src/vehCilindraje.php",
					data: { vehClase: vehClase, vehTpServicio: vehTpServicio, vehPasajeros: vehPasajeros, vehTonelada: vehTonelada },
					cache: false,
					success: function (data) {
						fnVaciarContenEdad();
		
						var datos = $.parseJSON(data);
						var num_rows = datos.length;
						var cilindCombobox = "";
		
						if (num_rows > 1) {

							cilindCombobox += "<div class='form-group input-group flex-nowrap'>";
						    cilindCombobox += "<div class='input-group-prepend'>";
						    cilindCombobox += "<span class='input-group-text' id='addon-wrapping'>";
						    cilindCombobox += "<i class='fa fa-car text-warning' aria-hidden='true'>";
						    cilindCombobox += "</i>";
						    cilindCombobox += "</span>";
						    cilindCombobox += "</div>";
							cilindCombobox += "<select type='select' class='fadeIn combobox classCilindraje form-control' name='namCilindraje' id='idCilindraje' required>";
							cilindCombobox += "	<option value=''>Cilindraje:</option>";
							$.each(datos, function (key, vehcilind) {
								cilindCombobox += "<option value='" + vehcilind.vehcilindraje + "'>" + vehcilind.vehcilindraje + "</option>";
							});
							cilindCombobox += "</select>";
							cilindCombobox += "</div>";

						}
						else {
							cilindCombobox += "<input type='hidden' class='classCilindraje' name='namCilindraje' id='idCilindraje' value='" + datos[0].vehcilindraje + "'>";
						}
						$('#contenCilindraje').html(cilindCombobox);
						fnConsulCilindraje();
					}
				});
		
			});
		
		
			$("#contenCilindraje").change(function () {
				var vehClase = document.getElementById("idVehClase").value;
				var vehTpServicio = document.getElementById("idTpServicio").value;
				var vehPasajeros = document.getElementById("idPasajeros").value;
				var vehTonelada = document.getElementById("idTonelada").value;
				var vehCilindraje = document.getElementById("idCilindraje").value;
		
				$.ajax({
					type: "POST",
					url: "https://www.grupoasistencia.com/apicotizador/src/vehEdad.php",
					// url: "http://localhost/apicotizador/src/vehEdad.php",
					data: { vehClase: vehClase, vehTpServicio: vehTpServicio, vehPasajeros: vehPasajeros, vehTonelada: vehTonelada, vehCilindraje: vehCilindraje },
					cache: false,
					success: function (data) {
		
						var datos = $.parseJSON(data);
						var num_rows = datos.length;
						var edadCombobox = "";
		
						if (num_rows > 1) {
							edadCombobox += "<div class='form-group input-group flex-nowrap'>";
					        edadCombobox += "<div class='input-group-prepend'>";
				            edadCombobox += "<span class='input-group-text' id='addon-wrapping'>";
					        edadCombobox += "<i class='fa fa-calendar text-warning' aria-hidden='true'>";
					        edadCombobox += "</i>";
					        edadCombobox += "</span>";
					        edadCombobox += "</div>";
							edadCombobox += "<select type='select' class='form-control fadeIn combobox classEdad' name='namEdad' id='idEdad' required>";
							edadCombobox += "	<option value=''>Edad del Vehiculo:</option>";
							$.each(datos, function (key, vehiculoedad) {
								edadCombobox += "<option value='" + vehiculoedad.vehedad + "'>" + vehiculoedad.vehedad + "</option>";
							});
							edadCombobox += "</select>";
							edadCombobox += "</div>";

						}
						else {
							edadCombobox += "<input type='hidden' class='classEdad' name='namEdad' id='idEdad' value='" + datos[0].vehedad + "'>";
						}
						$('#contenEdad').html(edadCombobox);
					}
				});
		
			});

		});

		function fnConsulClase() {

			$.ajax({
				url: "https://www.grupoasistencia.com/apicotizador/src/vehClase.php",
				// url: "http://localhost/apicotizador/src/vehClase.php",
				type: "GET",
				success: function (data) {
					var datos = $.parseJSON(data);
		
					var claseCombobox = "";
					claseCombobox += "<div class='form-group input-group flex-nowrap'>";
					claseCombobox += "<div class='input-group-prepend'>";
				    claseCombobox += "<span class='input-group-text' id='addon-wrapping'>";
					claseCombobox += "<i class='fa fa-car text-warning' aria-hidden='true'>";
					claseCombobox += "</i>";
					claseCombobox += "</span>";
					claseCombobox += "</div>";
					claseCombobox += "<select type='select' class='form-control fadeIn classVehClase' name='namVehClase' id='idVehClase' required>";
					claseCombobox += "	<option value=''>Clase Vehiculo:</option>";
					$.each(datos, function (key, clase) {
						claseCombobox += "<option value='" + clase.claseveh + "'>" + clase.claseveh + "</option>";
					});
					claseCombobox += "</select>";
					claseCombobox += "</div>";

					$('#contenClase').html(claseCombobox);
				}
			});
		}
		fnConsulClase();
		
		
		// Funcion que permite cargar los clientes existentes en la BD para visualizarlos en la Tabla Usuarios.
		function formCotizacion() {
		
			$.ajax({
				type: "POST",
				url: 'https://www.grupoasistencia.com/apicotizador/src/formCotizacion.php',
				cache: false,
				success: function (data) {
					$("#contenCotizacion").html(data);
				}
			})
		}
		formCotizacion();
		
		
		
		function fnConsulPasajeros() {
			var vehClase = document.getElementById("idVehClase").value;
			var vehTpServicio = document.getElementById("idTpServicio").value;
			var vehPasajeros = document.getElementById("idPasajeros").value;
			var numRegPasaj = document.getElementById("idNumRegPasaj").value;
		
			if (numRegPasaj <= 1) {
				if (vehPasajeros != '') {
		
					$.ajax({
						type: "POST",
						url: "https://www.grupoasistencia.com/apicotizador/src/vehTonelada.php",
						// url: "http://localhost/apicotizador/src/vehTonelada.php",
						data: { vehClase: vehClase, vehTpServicio: vehTpServicio, vehPasajeros: vehPasajeros },
						cache: false,
						success: function (data) {
							fnVaciarContenCilin();
		
							var datos = $.parseJSON(data);
							var num_rows = datos.length;
							var tonelCombobox = "";
		
							if (num_rows > 1) {
								tonelCombobox += "<div class='form-group input-group flex-nowrap'>";
						        tonelCombobox += "<div class='input-group-prepend'>";
						        tonelCombobox += "<span class='input-group-text' id='addon-wrapping'>";
						        tonelCombobox += "<i class='fa fa-anchor text-warning' aria-hidden='true'>";
						        tonelCombobox += "</i>";
						        tonelCombobox += "</span>";
						        tonelCombobox += "</div>";
								tonelCombobox += "<select type='select' class='form-control fadeIn combobox classTonelada' name='namTonelada' id='idTonelada' required>";
								tonelCombobox += "	<option value=''>Capacidad de Carga:</option>";
								$.each(datos, function (key, vehtonel) {
									tonelCombobox += "<option value='" + vehtonel.vehtonelada + "'>" + vehtonel.vehtonelada + "</option>";
								});
								tonelCombobox += "</select>";
								tonelCombobox += "</div>";

							}
							else {
								tonelCombobox += "<input type='hidden' class='classTonelada' name='namTonelada' id='idTonelada' value='" + datos[0].vehtonelada + "'>";
							}
							$('#contenTonelada').html(tonelCombobox);
							fnConsultonelada();
						}
					});
		
				}
			}
		}
		
		
		function fnConsultonelada() {
		
			var vehClase = document.getElementById("idVehClase").value;
			var vehTpServicio = document.getElementById("idTpServicio").value;
			var vehPasajeros = document.getElementById("idPasajeros").value;
			var vehTonelada = document.getElementById("idTonelada").value;
		
			if (vehTonelada == '0') {
		
				$.ajax({
					type: "POST",
					url: "https://www.grupoasistencia.com/apicotizador/src/vehCilindraje.php",
					// url: "http://localhost/apicotizador/src/vehCilindraje.php",
					data: { vehClase: vehClase, vehTpServicio: vehTpServicio, vehPasajeros: vehPasajeros, vehTonelada: vehTonelada },
					cache: false,
					success: function (data) {
		
						var datos = $.parseJSON(data);
						var num_rows = datos.length;
						var cilindCombobox = "";
		
						if (num_rows > 1) {
							cilindCombobox += "<div class='form-group input-group flex-nowrap'>";
					        cilindCombobox += "<div class='input-group-prepend'>";
				            cilindCombobox += "<span class='input-group-text' id='addon-wrapping'>";
					        cilindCombobox += "<i class='fa fa-free-code-camp text-warning' aria-hidden='true'>";
					        cilindCombobox += "</i>";
					        cilindCombobox += "</span>";
					        cilindCombobox += "</div>";
							cilindCombobox += "<select type='select' class='form-control fadeIn combobox classCilindraje' name='namCilindraje' id='idCilindraje' required>";
							cilindCombobox += "	<option value=''>Cilindraje:</option>";
							$.each(datos, function (key, vehcilind) {
								cilindCombobox += "<option value='" + vehcilind.vehcilindraje + "'>" + vehcilind.vehcilindraje + "</option>";
							});
							cilindCombobox += "</select>";
							cilindCombobox += "</div>";

						}
						else {
							cilindCombobox += "<input type='hidden' class='classCilindraje' name='namCilindraje' id='idCilindraje' value='" + datos[0].vehcilindraje + "'>";
						}
						$('#contenCilindraje').html(cilindCombobox);
						fnConsulCilindraje();
					}
				});
		
			}
		}
		
		
		function fnConsulCilindraje() {
		
			var vehClase = document.getElementById("idVehClase").value;
			var vehTpServicio = document.getElementById("idTpServicio").value;
			var vehPasajeros = document.getElementById("idPasajeros").value;
			var vehTonelada = document.getElementById("idTonelada").value;
			var vehCilindraje = document.getElementById("idCilindraje").value;
		
			if (vehCilindraje == '0') {
		
				$.ajax({
					type: "POST",
					url: "https://www.grupoasistencia.com/apicotizador/src/vehEdad.php",
					// url: "http://localhost/apicotizador/src/vehEdad.php",
		
					data: { vehClase: vehClase, vehTpServicio: vehTpServicio, vehPasajeros: vehPasajeros, vehTonelada: vehTonelada, vehCilindraje: vehCilindraje },
					cache: false,
					success: function (data) {
		
						var datos = $.parseJSON(data);
						var num_rows = datos.length;
						var edadCombobox = "";
		
						if (num_rows > 1) {
						    
							edadCombobox += "<select type='select' class=' fadeIn combobox classEdad' name='namEdad' id='idEdad' required>";
							edadCombobox += "<option value=''>Edad del Vehiculo:</option>";
							$.each(datos, function (key, vehiculoedad) {
								edadCombobox += "<option value='" + vehiculoedad.vehedad + "'>" + vehiculoedad.vehedad + "</option>";
							});
							edadCombobox += "</select>";
						}
						else {
							edadCombobox += "<input type='hidden' class='classEdad' name='namEdad' id='idEdad' value='" + datos[0].vehedad + "'>";
						}
						$('#contenEdad').html(edadCombobox);
					}
				});
		
			}
		}
		
		
		function fnBtnConsulCotiz() {
			
			var vehClase = document.forms["idCotizacion"]["namVehClase"].value;
			var vehTpServicio = document.forms["idCotizacion"]["namTpServicio"].value;
			var vehPasajeros = document.forms["idCotizacion"]["namPasajeros"].value;
			var vehTonelada = document.forms["idCotizacion"]["namTonelada"].value;
			var vehCilindraje = document.forms["idCotizacion"]["namCilindraje"].value;
			var vehEdad = document.forms["idCotizacion"]["namEdad"].value;
		
			$.ajax({
				type: "POST",
				url: "https://www.grupoasistencia.com/apicotizador/src/consulPrecio.php",
				// url: "http://localhost/apicotizador/src/consulPrecio.php",
		
				data: { vehClase: vehClase, vehTpServicio: vehTpServicio, vehPasajeros: vehPasajeros, vehTonelada: vehTonelada, vehCilindraje: vehCilindraje, vehEdad: vehEdad },
				cache: false,
				beforeSend: function (data) {
					$("#cover-spin").show(0);
					$('#btnLoader').html('<img src="img/btnLoader.gif">');
				},
				success: function (data) {
		
					var datos = $.parseJSON(data);
					var codclase = datos[0].codclase;
					var codigo = datos[0].codigo;
					var totalapagar = datos[0].totalapagar;
					resumen();
					fnBtnInsertCotiz(codclase, codigo, totalapagar);
				}
			});
			return false;
		}
		
		
		function fnBtnInsertCotiz(codclase, codigo, totalapagar) {
			var codclase;
			var codigo;
			var totalapagar;
			//var vehPlaca = document.forms["idCotizacion"]["namVehPlaca"].value;
			var vehPlaca = "ABC123"
			var vehClase = document.forms["idCotizacion"]["namVehClase"].value;
			var vehTpServicio = document.forms["idCotizacion"]["namTpServicio"].value;
			var vehPasajeros = document.forms["idCotizacion"]["namPasajeros"].value;
			var vehTonelada = document.forms["idCotizacion"]["namTonelada"].value;
			var vehCilindraje = document.forms["idCotizacion"]["namCilindraje"].value;
			var vehEdad = document.forms["idCotizacion"]["namEdad"].value;
		
			$.ajax({
				type: "POST",
				url: "https://www.grupoasistencia.com/apicotizador/src/insertCotizacion.php",
				data: { codclase: codclase, codigo: codigo, totalapagar: totalapagar, vehPlaca: vehPlaca, vehClase: vehClase, vehTpServicio: vehTpServicio, vehPasajeros: vehPasajeros, vehTonelada: vehTonelada, vehCilindraje: vehCilindraje, vehEdad: vehEdad },
				cache: false,
				success: function (data) {
					
				}
			});
		
		}
		function resumen() {
			window.location.replace(base_url + "polizas/resumensinplaca");
		  }

		function fnVaciarContenPasaj() {
			$("#contenPasajeros").html("");
			$("#contenTonelada").html("");
			$("#contenCilindraje").html("");
			$("#contenEdad").html("");
		}
		
		function fnVaciarContenTonel() {
			$("#contenTonelada").html("");
			$("#contenCilindraje").html("");
			$("#contenEdad").html("");
		}
		
		function fnVaciarContenCilin() {
			$("#contenCilindraje").html("");
			$("#contenEdad").html("");
		}
		
		function fnVaciarContenEdad() {
			$("#contenEdad").html("");
		}

		

		init()
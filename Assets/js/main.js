(function () {
	"use strict";

	var treeviewMenu = $('.app-menu');

	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function (event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function (event) {
		event.preventDefault();
		if (!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});

	// Set initial active toggle
	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

	//Activate bootstrip tooltips
	$("[data-toggle='tooltip']").tooltip();


})();

function Reload(table) {
	$(table).DataTable().ajax.reload();
}

function Reset(form) {
	$(form)[0].reset();
}

function Message(message, type) {
	var icon;
	var title;
	if (type == 'success') {
		title = 'Excelente: '
		icon = 'fa fa-check-circle'
	} else if (type == 'error') {
		title = 'Error: '
		icon = 'fa fa-times'
	} else {
		title = 'Advertencia: '
		icon = 'fa fa-info-circle'
	}
	$.notify({
		title: title,
		message: message,
		icon: icon
	}, {
		type: type,
		z_index: 2000,
	});
}

function validar_numeros(event) {
	if (event.key >= 0 && event.key <= 9 ) {
		if (event.key == 'Dead' || event.key == 'Dead') {
			return false;
		}
		return true;
	}
	return false;
}

function validar_string(event){
	if (event.charCode >= 97 && event.charCode <= 122 ) {
		return true;
	}
	return false;
}


function pasar_valor(input1, input2) {
	document.getElementById(input1).value = document.getElementById(input2).value;
}


function campo_requerido(campo, mensaje) {
	campo.addEventListener("input", function (event) {
		if (campo.validity.typeMismatch) {
			campo.setCustomValidity(mensaje);
		} else {
			campo.setCustomValidity("");
		}
	});
}

function InvalidMsg(textbox, mensaje) {
	if (textbox.value == '') {
		textbox.setCustomValidity(mensaje);
	} else if (textbox.validity.typeMismatch) {
		textbox.setCustomValidity(mensaje);
	} else {
		textbox.setCustomValidity('');
	}
	return true;
}

function ValidarExistenciaDatos(url, data) {
	return $.ajax({
		url: base_url + url,
		method: 'POST',
		data: data,
		global: false,
		async: false,
		dataType: 'JSON',
		success: function (objData) {
			return objData
		}
	}).responseJSON;
}

function icon_spinner(input, option) {
	if (option == 'show') {
		$(input).removeClass('fa-search')
		$(input).addClass('fa-circle-o-notch')
		$(input).addClass('fa-spin')
		$(input).addClass('text-info')
	} else {
		$(input).removeClass('fa-circle-o-notch')
		$(input).removeClass('fa-spin')
		$(input).removeClass('text-info')
		$(input).addClass('fa-search')
	}
}

function button_spinner(button, option){
	
	if (option == 'show') {
		$(button).removeClass('fa fa-search')
		$(button).addClass('fa fa-circle-o-notch fa-spin')
	}else{
		$(button).removeClass('fa fa-circle-o-notch fa-spin')
		$(button).addClass('fa fa-search')	
	}

}




function FetchApi(url, method, data) {
	var myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');

	var raw = JSON.stringify(data);

	var requestOptions = {
		method: method,
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	fetch(url, requestOptions)
		.then(response => response.json())
		.then(result => {
			return JSON.parse(escapeJSON(result))
		})
		.catch(error => console.log('error', error));
}

function escapeJSON(str) {
	return str.replace(/\\/g, '\\');
};


function removeDuplicates(originalArray, prop) {
	var newArray = [];
	var lookupObject  = {};

	for(var i in originalArray) {
	   lookupObject[originalArray[i][prop]] = originalArray[i];
	}

	for(i in lookupObject) {
		newArray.push(lookupObject[i]);
	}
	 return newArray;
}


// Maximiza el formulario Datos Asegurado
function masAseg() {
	document.getElementById("DatosAsegurado").style.display = "block";
	document.getElementById("menosAsegurado").style.display = "block";
	document.getElementById("masAsegurado").style.display = "none";
}
// Minimiza el formulario Datos Asegurado
function menosAseg() {
	document.getElementById("DatosAsegurado").style.display = "none";
	document.getElementById("menosAsegurado").style.display = "none";
	document.getElementById("masAsegurado").style.display = "block";
}

// Maximizar el formulario Datos Vehiculo
function masVeh() {
	document.getElementById("DatosVehiculo").style.display = "block";
	document.getElementById("menosVehiculo").style.display = "block";
	document.getElementById("masVehiculo").style.display = "none";
}
// Minimiza el formulario Datos Vehiculo
function menosVeh() {
	document.getElementById("DatosVehiculo").style.display = "none";
	document.getElementById("menosVehiculo").style.display = "none";
	document.getElementById("masVehiculo").style.display = "block";
}

// Maximiza el Formulario Agregar Oferta
function masAgr() {
	document.getElementById("DatosAgregarOferta").style.display = "block";
	document.getElementById("menosAgrOferta").style.display = "block";
	document.getElementById("masAgrOferta").style.display = "none";
}
// Minimiza el Formulario Agregar Oferta
function menosAgr() {
	document.getElementById("DatosAgregarOferta").style.display = "none";
	document.getElementById("menosAgrOferta").style.display = "none";
	document.getElementById("masAgrOferta").style.display = "block";
}

function cotizarOfertas() {

	var placa = document.getElementById("placaVeh").value;
	var esCeroKmSi = document.getElementById('txtEsCeroKmSi').checked;
	var esCeroKm = esCeroKmSi.toString();
	var esCeroKmInt = esCeroKmSi == true ? 1 : 0;

	var idClientes = document.getElementById("idClientes").value;
	var tipoDocumentoID = document.getElementById("tipoDocumentoID").value;
	var numDocumentoID = document.getElementById("numDocumentoID").value;
	var Nombre = document.getElementById("txtNombres").value;
	var Apellido1 = document.getElementById("txtApellidos").value;
	var Apellido2 = "";
	var dia = document.getElementById("dianacimiento").value;
	var mes = document.getElementById("mesnacimiento").value;
	var anio = document.getElementById("anionacimiento").value;
	var FechaNacimiento = anio + "-" + mes + "-" + dia;
	var Genero = document.getElementById("genero").value;
	var estadoCivil = document.getElementById("estadoCivil").value;
	var celularAseg = document.getElementById("celularAseg").value;
	var emailAseg = document.getElementById("emailAseg").value;
	var direccionAseg = document.getElementById("direccionAseg").value;

	var CodigoClase = document.getElementById("CodigoClase").value;
	var CodigoMarca = document.getElementById("CodigoMarca").value;
	var CodigoLinea = document.getElementById("CodigoLinea").value;
	var claseVeh = document.getElementById("txtClaseVeh").value;
	var marcaVeh = document.getElementById("txtMarcaVeh").value;
	var modeloVeh = document.getElementById("txtModeloVeh").value;
	var lineaVeh = document.getElementById("txtReferenciaVeh").value;

	var LimiteRC = document.getElementById("LimiteRC").value;
	var CoberturaEstado = document.getElementById("CoberturaEstado").value;
	var ValorAccesorios = document.getElementById("ValorAccesorios").value;
	var CodigoVerificacion = document.getElementById("CodigoVerificacion").value;
	var AniosSiniestro = document.getElementById("AniosSiniestro").value;
	var AniosAsegurados = document.getElementById("AniosAsegurados").value;
	var NivelEducativo = document.getElementById("NivelEducativo").value;
	var Estrato = document.getElementById("Estrato").value;
	
	var fasecoldaVeh = document.getElementById("txtFasecolda").value;
	var valorFasecolda = document.getElementById("txtValorFasecolda").value;
	var tipoUsoVehiculo = document.getElementById("txtTipoUsoVehiculo").value;
	var tipoServicio = document.getElementById("txtTipoServicio").value;
	var DptoCirculacion = document.getElementById("DptoCirculacion").value;
	var ciudadCirculacion = document.getElementById("ciudadCirculacion").value;
	var isBenefOneroso = $('input:radio[name=oneroso]:checked').val(); // Valida que alguno de los 2 este selecionado
	var benefOneroso = document.getElementById("benefOneroso").value;
    var idUsuario = document.getElementById("txtIdUsuario").value;
    
	if(ciudadCirculacion.length == 4){
		ciudadCirculacion = "0" + ciudadCirculacion;
	}
	else if(ciudadCirculacion.length == 3){
		ciudadCirculacion = "00" + ciudadCirculacion;
	}
	
	if (fasecoldaVeh != '' && valorFasecolda != '' && tipoUsoVehiculo != '' && tipoServicio != '' && DptoCirculacion != '' && ciudadCirculacion != '' && isBenefOneroso != undefined) {	
		if (placa != '' && tipoDocumentoID != '' && numDocumentoID != '' && Nombre != '' && Apellido1 != '' && dia != '' && mes != '' && anio != '' && Genero != '' && estadoCivil != '') {
			
			$('#loaderOferta').html(`<img src="${url_image}" width="34" height="34"><strong> Consultando Ofertas...</strong>`);
			$('#loaderRecotOferta').html(`<img src="${url_image}" width="34" height="34"><strong> Recotizando Ofertas...</strong>`);

			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = { "Placa": placa, "ceroKm": esCeroKm, "TipoIdentificacion": tipoDocumentoID, "NumeroIdentificacion": numDocumentoID, "Nombre": Nombre, 
						"Apellido": Apellido1, "Genero": Genero, "FechaNacimiento": FechaNacimiento, "EstadoCivil": estadoCivil, "NumeroTelefono": celularAseg, 
						"Direccion": direccionAseg, "Email": emailAseg, "ZonaCirculacion": DptoCirculacion, "CodigoMarca": CodigoMarca, "CodigoLinea": CodigoLinea, 
						"CodigoClase": CodigoClase, "CodigoFasecolda": fasecoldaVeh, "Modelo": modeloVeh, "ValorAsegurado": valorFasecolda, "LimiteRC": LimiteRC, 
						"Cobertura": CoberturaEstado, "ValorAccesorios": ValorAccesorios, "CiudadBolivar": ciudadCirculacion, "tipoServicio": tipoServicio, 
						"CodigoVerificacion": CodigoVerificacion, "Apellido2": Apellido2, "AniosSiniestro": AniosSiniestro, "AniosAsegurados": AniosAsegurados, 
						"NivelEducativo": NivelEducativo, "Estrato": Estrato };

			var requestOptions = { method: 'POST', headers: myHeaders, body: JSON.stringify(raw), redirect: 'follow' };

			$.ajax({
				type: "POST",
				url: url_todoriesgo + "src/insertarCotizacion.php",
				dataType: "json",
				data: {
					placa: placa, esCeroKm: esCeroKmInt, idClientes: idClientes, tipoDocumento: tipoDocumentoID, numIdentificacion: numDocumentoID, Nombre: Nombre, 
					Apellido: Apellido1, FechaNacimiento: FechaNacimiento, Genero: Genero, EstadoCivil: estadoCivil, Celular: celularAseg, Correo: emailAseg, 
					direccionAseg: direccionAseg, CodigoClase: CodigoClase, Clase: claseVeh, Marca: marcaVeh, Modelo: modeloVeh, Linea: lineaVeh, 
					Fasecolda: fasecoldaVeh, ValorAsegurado: valorFasecolda, tipoUsoVehiculo: tipoUsoVehiculo, tipoServicio: tipoServicio, 
					Departamento: DptoCirculacion, Ciudad: ciudadCirculacion, benefOneroso: benefOneroso, idCotizacion: idCotizacion, idUsuario: idUsuario
				},
				cache: false,
				success: function(data){

					idCotizacion = data.id_cotizaciones;

					fetch("https://www.grupoasistencia.com/webservice_autosv1/Cotizar", requestOptions)
						.then(function (response) {
							if (!response.ok) {
								throw Error(response.statusText);
							}
							return response.json();
						})
						.then(function (ofertas) {
							
							validarOfertas(ofertas);
						})
						.catch(function (error) {
							console.log('Parece que hubo un problema: \n', error);
							
							contErrProtocoloCotizar++;
							if(contErrProtocoloCotizar > 1){

								$('#loaderOferta').html('');
								$('#loaderRecotOferta').html('');
							}
							else{
								setTimeout(cotizarOfertas,4000);
							}

						});

					cotizarOfertaSBS(requestOptions);
				}
			});

		}
		else {
			swal({ text: '! Debe diligenciar en su totalidad los campos del Asegurado. ¡' });
			masAseg();
			menosVeh();
		}
	}

}

function cotizarOfertaSBS(requestOptions){
	
	fetch("https://www.grupoasistencia.com/webservice_autosv1/CotizarSBS", requestOptions)
	.then(function (response) {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(function (oferta) {
		if(oferta.numero_cotizacion != null && oferta.precio != "0"){
			cont2.push(registrarOferta(oferta.entidad, oferta.precio, oferta.producto, oferta.numero_cotizacion, oferta.responsabilidad_civil, oferta.cubrimiento, oferta.deducible, oferta.conductores_elegidos, oferta.servicio_grua, oferta.imagen, oferta.pdf));
		}
	})
	.catch(function (error) {
		console.log('Parece que hubo un problema: \n', error);
		
		contErrProtocoloCotizarSBS++;
		if(contErrProtocoloCotizarSBS > 1){

			$('#loaderOferta').html('');
			$('#loaderRecotOferta').html('');
		}
		else{
			setTimeout(cotizarOfertaSBS,3000);
		}

	});

}

function validarOfertas(ofertas){

	var cont = [];

	ofertas.forEach(function (oferta, i) {

		var numCotizacion = oferta.numero_cotizacion;
		var precioOferta = oferta.precio;

		if(numCotizacion != null && precioOferta != "0"){
			if(precioOferta.length > 3){

				cont.push(registrarOferta(oferta.entidad, oferta.precio, oferta.producto, oferta.numero_cotizacion, oferta.responsabilidad_civil, oferta.cubrimiento, oferta.deducible, oferta.conductores_elegidos, oferta.servicio_grua, oferta.imagen, oferta.pdf));

				Promise.all(cont).then(function(resultados) {

					$('#loaderOferta').html('');
					$('#loaderRecotOferta').html('');		
					
					
					window.location = base_url + "polizas/editartodoriesgo?idCotizacion="+idCotizacion;
					//Message('Cotizacion exitosa', 'success')
					
					/*swal({
						type: "success",
						title: "! Cotización Exitosa ¡",
						showConfirmButton: true,
						confirmButtonText: "Cerrar"
					}).then(function (result) {
						if (result.value) {
							window.location = "index.php?ruta=editar-cotizacion&idCotizacion="+idCotizacion;
						}
					});
					*/
					
				});

			}
		}

	});

	if(cont.length == 0){		
		if(cont2.length >= 1){

			$('#loaderOferta').html('');
			$('#loaderRecotOferta').html('');
			window.location = base_url + "polizas/editartodoriesgo?idCotizacion="+idCotizacion;
			/*swal({
				type: "success",
				title: "! Cotización Exitosa ¡",
				showConfirmButton: true,
				confirmButtonText: "Cerrar"
			}).then(function (result) {
				if (result.value) {
					window.location = "index.php?ruta=editar-cotizacion&idCotizacion="+idCotizacion;
				}
			});*/
		}
		else{
		    window.location = base_url + "polizas/editartodoriesgo?idCotizacion="+idCotizacion;
			//window.location = "index.php?ruta=editar-cotizacion&idCotizacion="+idCotizacion;
		}
	}

}


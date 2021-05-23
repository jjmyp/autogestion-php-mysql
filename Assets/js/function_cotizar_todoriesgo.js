	const url_todoriesgo = 'https://www.grupoasistencia.com/autogestionpdftest/';  
	const url_image  =  'https://www.grupoasistencia.com/autogestionpro/Assets/images/loader-loading.gif' 
	
$(document).ready(function () {
	   
	   
	// Valida que el dato ingresado sea numerico
	$('#numDocumentoID').numeric();
	$('#txtFasecolda').numeric();
	$('#txtValorFasecolda').numeric();
	$('#numCotizacion').numeric();
	$('#valorTotal').numeric();


	// Convierte la Placa ingresada en Mayusculas
	$('#placaVeh').keyup(function(){
		var numPlaca = document.getElementById("placaVeh").value;
		mayuscPlaca=numPlaca.toUpperCase();
		$('#placaVeh').val(mayuscPlaca);
	});

	// Evita Espacios en blanco en el numero de Placa
	$('#placaVeh').on('keypress', function (e) {
		if (e.which == 32)
			return false;
	});


	// Si conoce la Placa muestra el campo Placa y oculta el campo CeroKM.
	$("#txtConocesLaPlacaSi").click(function () {
		document.getElementById("contenPlaca").style.display = "block";
		document.getElementById("contenCeroKM").style.display = "none";
		document.getElementById("placaVeh").value = "";
		$("#txtEsCeroKmSi").prop("checked", false);
		$("#txtEsCeroKmNo").prop("checked", true);
	});

	// Si no conoce la Placa oculta el campo Placa y muestra el campo CeroKM.
	$("#txtConocesLaPlacaNo").click(function () {
		document.getElementById("contenPlaca").style.display = "none";
		document.getElementById("contenCeroKM").style.display = "block";
		document.getElementById("placaVeh").value = "KZY000";
		$("#txtEsCeroKmNo").prop("checked", false);
	});


	// Validamos que si el vehiculo No es Cero KM, debe tener Placa
	$("#txtEsCeroKmNo").click(function () {
		var conoceslaPlaca = document.getElementById('txtConocesLaPlacaNo').checked;
		var esCeroKmNo = document.getElementById('txtEsCeroKmNo').checked;
		
		if (conoceslaPlaca == true && esCeroKmNo == true) {			
		    Message('Si el vehiculo no es Cero KM debe tener Placa.', 'warning')
			//swal({ text: '! Si el Vehiculo No es Cero KM debe tener Placa. ¡' });			
			$("#txtEsCeroKmNo").prop("checked", false);
		}
	});
	
	
	// Convierte la Placa ingresada en Mayusculas
	$("#numDocumentoID").change(function () {
		consultarAsegurado();
	});


	// Carga la fecha de Nacimiento
	$("#dianacimiento, #mesnacimiento, #anionacimiento").select2({
		theme: "bootstrap fecnacimiento",
		language: "es",
		width: "100%"
	});


	// Conviete la letras iniciales del Nombre y el Apellido deL Cliente en Mayusculas
	$("#txtNombres").keyup(function(){
		var cliNombres = (document.getElementById("txtNombres").value).toLowerCase();
		$('#txtNombres').val(cliNombres.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase( ); }));
	});
	$("#txtApellidos").keyup(function(){
		var cliApellido = (document.getElementById("txtApellidos").value).toLowerCase();
		$('#txtApellidos').val(cliApellido.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase( ); }));
	});


	// Carga los Departamentos disponibles
	$("#DptoCirculacion").select2({
		theme: "bootstrap dpto",
		language: "es",
		width: "100%"
	});
	$("#DptoCirculacion").change(function () {
		consultarCiudad();
	});

	// Carga las Ciudades disponibles
	$("#ciudadCirculacion").select2({
		theme: "bootstrap ciudad",
		language: "es",
		width: "100%"
	});


	// Si es Oneroso muestra el campo N° Beneficiario.
	$("#esOnerosoSi").click(function () {
		document.getElementById("contenBenefOneroso").style.display = "block";
	});

	// Si no es Oneroso oculta el campo N° Beneficiario y lo limpia.
	$("#esOnerosoNo").click(function () {
		document.getElementById("contenBenefOneroso").style.display = "none";
		document.getElementById("benefOneroso").value = "";
	});


	// Obtiene los datos de cada campo del formulario y Valida que no esten Vacios
	$('#formResumAseg, #formVehManual, #formResumVeh, #agregarOferta').on('submit', function (e) {
		e.preventDefault(); // Evita que la pagina se recargue
	});

	
	// Ejectura la funcion Consultar Placa Vehiculo
	$('#btnConsultarPlaca').click(function () {
		consulPlaca();
	});


	// Ejecuta la funcion que trae el Codigo Fasecolda de la Guia
	$("#btnConsultarVeh").click(function () {
		consulCodFasecolda();
	});
	

	// Ejectura la funcion Cotizar Ofertas
	$('#btnCotizar').click(function () {
		cotizarOfertas();
	});

	
	// Permite visuaizar los datos del Asegurado
	$("#masA").click(function () {
		masAseg();
	});
	// Permite ocultar los datos del Asegurado
	$("#menosA").click(function () {
		menosAseg();
	});


	// Permite visuaizar los datos del Vehiculo
	$("#masVeh").click(function () {
		masVeh();
	});
	// Permite ocultar los datos del Vehiculo
	$("#menosVeh").click(function () {
		menosVeh();
	});


	// Permite visuaizar los datos de la Oferta Agregada
	$("#masAgr").click(function () {
		masAgr();
	});
	// Permite ocultar los datos de la Oferta Agregada
	$("#menosAgr").click(function () {
		menosAgr();
	});


});


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


// Permite consultar los datos del Asegurado si existe en el sistema
function consultarAsegurado(){

	var tipoDocumentoID = document.getElementById("tipoDocumentoID").value;
	var numDocumentoID = document.getElementById("numDocumentoID").value;

	$.ajax({
		type: 'POST',
		url: url_todoriesgo + 'src/consultarAsegurado.php',
		dataType: "json",
		data: { tipoDocumento: tipoDocumentoID, numDocumento: numDocumentoID },
		success: function (data) {
			// console.log(data);
			var estado = data.estado;
			var fechaNac = data.cli_fch_nacimiento;

			if(estado){
				$("#idClientes").val(data.id_clientes);
				$("#txtNombres").val(data.cli_nombre);
				$("#txtApellidos").val(data.cli_apellidos);
				$("#genero").val(data.cli_genero);
				$("#estadoCivil").val(data.cli_estado_civil);

				var fecha = fechaNac.split('-');
				var nombreMes = obtenerNombreMes(fecha[1]);
				$("#dianacimiento").append("<option value='" + fecha[2] + "' selected>" + fecha[2] + "</option>");
				$("#mesnacimiento").append("<option value='" + fecha[1] + "' selected>" + nombreMes[0].toUpperCase() + nombreMes.slice(1) + "</option>");
				$("#anionacimiento").append("<option value='" + fecha[0] + "' selected>" + fecha[0] + "</option>");
			}
			else{
				$("#idClientes").val("");
				console.log(data.mensaje);
			}
		}
	});

}

// FUNCION PARA OBTENER EL NOMBRE DEL MES
function obtenerNombreMes(numero) {

	var fecha = new Date();
	if (0 < numero && numero <= 12) {
		fecha.setMonth(numero - 1);
		return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fecha);
	}
}


var contErrMetEstado = 0;
var contErrProtocolo = 0;

// Permite consultar la informacion del vehiculo por medio de la Placa (Seguros del Estado)
function consulPlaca() {
	
	var numplaca = document.getElementById("placaVeh").value;
	var valnumplaca = numplaca.toUpperCase(); // Convierte la Placa en Mayusculas
	var tipoDocumentoID = document.getElementById("tipoDocumentoID").value;
	var numDocumentoID = document.getElementById("numDocumentoID").value;
	var dianacimiento = document.getElementById("dianacimiento").value;
	var mesnacimiento = document.getElementById("mesnacimiento").value;
	var anionacimiento = document.getElementById("anionacimiento").value;
	var nombresAseg = document.getElementById("txtNombres").value;
	var apellidosAseg = document.getElementById("txtApellidos").value;
	var generoAseg = document.getElementById("genero").value;
	var estadoCivil = document.getElementById("estadoCivil").value;

	if (numplaca != '' && tipoDocumentoID != '' && numDocumentoID != '' && dianacimiento != '' && mesnacimiento != '' && anionacimiento != '' && 
		nombresAseg != '' && apellidosAseg != '' && generoAseg != '' && estadoCivil != '') {

		// Oculta los campos de consultar Vehiculo paso a paso desde la Guia Fasecolda
		document.getElementById("formularioVehiculo").style.display = "none";
		$('#loaderPlaca').html(`<img src="${url_image}" width="34" height="34"><strong> Consultando Placa...</strong>`);
	
		//INICIO DE CABECERA PARA INGRESAR INFORMACION DEL METODO
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({ "Placa": valnumplaca });

		var requestOptions = {
			mode: 'cors',
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		// Llama la informacion del Vehiculo por medio de la Placa
		fetch('https://www.grupoasistencia.com/webserviceAutos/Vehiculo', requestOptions)
		.then(function (response) {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(function (myJson) {
			// console.log(myJson);
			var estadoConsulta = myJson.Success;
			var mensajeConsulta = myJson.Message;
			
			//VALIDA SI LA CONSULTA FUE EXITOSA
			if (estadoConsulta == true) {

				var codigoClase = myJson.Data.ClassId;
				var codigoMarca = myJson.Data.Brand;
				var modeloVehiculo = myJson.Data.Modelo;
				var codigoLinea = myJson.Data.BrandLine;
				var codigoFasecolda = myJson.Data.CodigoFasecolda;
				var valorAsegurado = myJson.Data.ValorAsegurado;
				
				var claseVehiculo = "";
				var limiteRCESTADO = "";

				if (codigoClase == 1) {
					claseVehiculo = "AUTOMOVILES";
					limiteRCESTADO = 6;
				}
				else if (codigoClase == 2) {
					claseVehiculo = "CAMPEROS";
					limiteRCESTADO = 18;
				}
				else if (codigoClase == 3) {
					claseVehiculo = "PICK UPS";
					limiteRCESTADO = 18;
				}
				else if (codigoClase == 4) {
					claseVehiculo = "UTILITARIOS DEPORTIVOS";
					limiteRCESTADO = 6;
				}
				else if (codigoClase == 12) {
					claseVehiculo = "MOTOCICLETA";
					limiteRCESTADO = 6;
				}
				else if (codigoClase == 14) {
					claseVehiculo = "PESADO";
					limiteRCESTADO = 18;
				}
				else if (codigoClase == 19) {
					claseVehiculo = "VAN";
					limiteRCESTADO = 18;
				}
				else if (codigoClase == 16) {
					claseVehiculo = "MOTOCICLETA";
					limiteRCESTADO = 6;
				}
				
				$("#CodigoClase").val(codigoClase);
				$("#txtClaseVeh").val(claseVehiculo);
				$("#LimiteRC").val(limiteRCESTADO);
				$("#CodigoMarca").val(codigoMarca);
				$("#txtModeloVeh").val(modeloVehiculo);
				$("#CodigoLinea").val(codigoLinea);
				$("#txtFasecolda").val(codigoFasecolda);
				$("#txtValorFasecolda").val(valorAsegurado);

				consulDatosFasecolda(codigoFasecolda, modeloVehiculo).then(function (resp) {

					$("#txtMarcaVeh").val(resp.marcaVeh);
					$("#txtReferenciaVeh").val(resp.lineaVeh);
				});

			} else {

				if(mensajeConsulta == "Parámetros Inválidos. Placa es requerido." || mensajeConsulta == "Favor diligenciar correctamente la placa"){
					
					swal({ text: '! Favor diligenciar correctamente la placa. ¡' });

				} else if (mensajeConsulta == "Vehículo no encontrado." || mensajeConsulta == "Unable to connect to the remote server"){

					document.getElementById("formularioVehiculo").style.display = "block";

				} else{
					contErrMetEstado++;
					if (contErrMetEstado > 1){

						document.getElementById("formularioVehiculo").style.display = "block";
						contErrMetEstado = 0;	
					} else{
						setTimeout(consulPlaca,2000);
					}
				}
				$('#loaderPlaca').html('');
			}
			
		})
		.catch(function (error) {
			console.log('Parece que hubo un problema: \n', error);
			
			contErrProtocolo++;
			if(contErrProtocolo > 1){

				$('#loaderPlaca').html('');
				document.getElementById("formularioVehiculo").style.display = "block";
				contErrProtocolo = 0;
			} else{
				setTimeout(consulPlaca,4000);
			}
		});

	}

}


// CONSULTA LA GUIA PARA OBTENER EL CODIGO FASECOLDA MANUALMENTE
function consulCodFasecolda(){

	var claseVeh = document.getElementById("clase").value;
	var marcaVeh = document.getElementById("Marca").value;
	var edadVeh = document.getElementById("edad").value;
	var refe = document.getElementById("linea").value;
	var refe2 = $(".refe1").val();
	var refe3 = $(".refe22").val();

	if(claseVeh != '' && marcaVeh != '' && edadVeh != '' && refe != '' && refe2 != '' && refe3 != ''){

		$.ajax({
			type: "POST",
			url: url_todoriesgo + "src/fasecolda/consulCodFasecolda.php",
			dataType: "json",
			data: {
				clasveh: claseVeh,
				MarcaVeh: marcaVeh,
				edadVeh: edadVeh,
				lineaVeh: refe,
				refe: refe2,
				refe2: refe3
			},
			success: function (data) {
				// console.log(data);
				var codFasecolda = data.result.codigo;				
				consulValorfasecolda(codFasecolda, edadVeh);
			}
		});

	}

}


var contErrMetEstadoFasec = 0;
var contErrProtConsulFasec = 0;

// Permite consultar la informacion del vehiculo segun la Guia Fasecolda
function consulValorfasecolda(codFasecolda, edadVeh) {
	
	$('#loaderVehiculo').html(`<img src="${url_image}" width="34" height="34"><strong> Consultando Vehículo...</strong>`);

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({ "CodigoFasecolda": codFasecolda, "brand": "", "brandline": "", "ClassId": "", "Modelo": edadVeh });

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	fetch("https://www.grupoasistencia.com/webserviceAutos/VehiculoFasecolda", requestOptions)
		.then(function (response) {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(function (myJson) {
			// console.log(myJson);
			if(myJson.Data != null){

				var codigoClase = myJson.Data.ClassId;
				var codigoMarca = myJson.Data.Brand;
				var modeloVehiculo = myJson.Data.Modelo;
				var codigoLinea = myJson.Data.BrandLine;
				var codigoFasecolda = myJson.Data.CodigoFasecolda;
				var valorAsegurado = myJson.Data.ValorAsegurado;

				var claseVehiculo = "";				
				var limiteRCESTADO = "";

				if (codigoClase == 1) {
					claseVehiculo = "AUTOMOVILES";
					limiteRCESTADO = 6;
				}
				else if (codigoClase == 2) {
					claseVehiculo = "CAMPEROS";
					limiteRCESTADO = 18;
				}
				else if (codigoClase == 3) {
					claseVehiculo = "PICK UPS";
					limiteRCESTADO = 18;
				}
				else if (codigoClase == 4) {
					claseVehiculo = "UTILITARIOS DEPORTIVOS";
					limiteRCESTADO = 6;
				}
				else if (codigoClase == 12) {
					claseVehiculo = "MOTOCICLETA";
					limiteRCESTADO = 6;
				}
				else if (codigoClase == 14) {
					claseVehiculo = "PESADO";
					limiteRCESTADO = 18;
				}
				else if (codigoClase == 19) {
					claseVehiculo = "VAN";
					limiteRCESTADO = 18;
				}
				else if (codigoClase == 16) {
					claseVehiculo = "MOTOCICLETA";
					limiteRCESTADO = 6;
				}

				$("#CodigoClase").val(codigoClase);
				$("#txtClaseVeh").val(claseVehiculo);
				$("#LimiteRC").val(limiteRCESTADO);
				$("#CodigoMarca").val(codigoMarca);
				$("#txtModeloVeh").val(modeloVehiculo);
				$("#CodigoLinea").val(codigoLinea);
				$("#txtFasecolda").val(codigoFasecolda);
				$("#txtValorFasecolda").val(valorAsegurado);

				consulDatosFasecolda(codigoFasecolda, modeloVehiculo).then(function (resp) {

					$("#txtMarcaVeh").val(resp.marcaVeh);
					$("#txtReferenciaVeh").val(resp.lineaVeh);
				});

			} else {
				
				contErrMetEstadoFasec++;
				if (contErrMetEstadoFasec > 2){

					$("#txtModeloVeh").val(edadVeh);
					$("#txtFasecolda").val(codFasecolda);

					consulDatosFasecolda(codFasecolda, edadVeh).then(function (resp) {

						var codigoClaseEstado = "";
						if (resp.claseVeh == "MOTOS") {	codigoClaseEstado = 12;	}
						$("#CodigoClase").val(codigoClaseEstado);
						$("#txtClaseVeh").val(resp.claseVeh);
						$("#txtMarcaVeh").val(resp.marcaVeh);
						$("#txtReferenciaVeh").val(resp.lineaVeh);
						$("#txtValorFasecolda").val(resp.valorVeh);
					});
					contErrMetEstadoFasec = 0;

				} else{
					setTimeout(consulCodFasecolda,2000);
				}

			}

		})
		.catch(function (error) {
			console.log('Parece que hubo un problema: \n', error);
			
			contErrProtConsulFasec++;
			if(contErrProtConsulFasec > 1){

				$("#txtModeloVeh").val(edadVeh);
				$("#txtFasecolda").val(codFasecolda);

				consulDatosFasecolda(codFasecolda, edadVeh).then(function (resp) {
					
					var codigoClaseEstado = "";
					if (resp.claseVeh == "MOTOS") {	codigoClaseEstado = 12;	}
					$("#CodigoClase").val(codigoClaseEstado);
					$("#txtClaseVeh").val(resp.claseVeh);
					$("#txtMarcaVeh").val(resp.marcaVeh);
					$("#txtReferenciaVeh").val(resp.lineaVeh);
					$("#txtValorFasecolda").val(resp.valorVeh);
				});
				contErrProtConsulFasec = 0;

			} else{
				setTimeout(consulCodFasecolda,4000);
			}

		});

}


//FUNCION PARA CONSULTAR VALORES EN FASECOLDA
function consulDatosFasecolda(codFasecolda, edadVeh) {

	return new Promise(function (resolve, reject) {

		$.ajax({
			type: 'POST',
			url: url_todoriesgo + 'src/fasecolda/consulDatosFasecolda.php',
			dataType: "json",
			data: {
				fasecolda: codFasecolda,
				modelo: edadVeh
			},
			success: function (data) {
				// console.log(data);
				var claseVeh = data.clase;
				var marcaVeh = data.marca;
				var ref1Veh = data.referencia1;
				var ref2Veh = data.referencia2;
				var ref3Veh = data.referencia3;
				var lineaVeh = ref1Veh + " " + ref2Veh + " " + ref3Veh;
				var valorFasecVeh = data[edadVeh];
				var valorVeh = Number(valorFasecVeh) * 1000;

				var placaVeh = $("#placaVeh").val();
				if(placaVeh == "KZY000"){
					$("#txtPlacaVeh").val("SIN PLACA - VEHÍCULO 0 KM").val();
				}else{
					$("#txtPlacaVeh").val(placaVeh).val();
				}
				document.getElementById("formularioVehiculo").style.display = "none";
				document.getElementById("headerAsegurado").style.display = "block";
				document.getElementById("contenSuperiorPlaca").style.display = "none";
				document.getElementById("contenBtnConsultarPlaca").style.display = "none";
				document.getElementById("resumenVehiculo").style.display = "block";
				document.getElementById("contenBtnCotizar").style.display = "block";
				$('#loaderPlaca').html('');
				menosAseg();

				resolve({ claseVeh:claseVeh, marcaVeh:marcaVeh, lineaVeh:lineaVeh, valorVeh:valorVeh });
				reject(new Error('Fallo la Consulta'));
			}
		});
		
	});

}


// FUNCION PARA CARGAR LA CIUDAD DE CIRCULACIÓN
function consultarCiudad(){
	
	var codigoDpto = document.getElementById("DptoCirculacion").value;

	if (codigoDpto == 1 || codigoDpto == 3 || codigoDpto == 10 || codigoDpto == 11 || codigoDpto == 12 || codigoDpto == 14 || codigoDpto == 17 || 
		codigoDpto == 18 || codigoDpto == 19 || codigoDpto == 25 || codigoDpto == 28 || codigoDpto == 33 || codigoDpto == 34) {
		
		swal({ text: '! El Departamento de circulación no posee cobertura. ¡' });

	} else {

		$.ajax({
			type: "POST",
			url: url_todoriesgo + "src/consultarCiudad.php",
			dataType: "json",
			data: {	data: codigoDpto },
			cache: false,
			success: function (data) {
				// console.log(data);
				var ciudadesVeh = `<option value="">Seleccionar Ciudad</option>`;

				data.forEach(function (valor, i) {

					var valorNombre = (valor.Nombre).split("-");
					var nombreMinusc = (valorNombre[0]).toLowerCase();
					var ciudad = nombreMinusc.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase(); });

					ciudadesVeh += `<option value="${valor.Codigo}">${ciudad}</option>`;
				});
				document.getElementById("ciudadCirculacion").innerHTML = ciudadesVeh;
			}
		});

	}

}


var idCotizacion = "";
var contErrProtocoloCotizar = 0;

// Captura los datos suministrados por el cliente y los envia al API para recibir la cotizacion.



var cont2 = [];
var contErrProtocoloCotizarSBS = 0;
// PERMITE COTIZAR LA OFERTA DE LA ASEGURADORA SBS
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


// VALIDA QUE LAS OFERTAS COTIZADAS HAYAN SIDO GUARDADAS EN SU TOTALIDAD
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


// REGISTRA CADA UNA DE LAS OFERTAS COTIZADAS EN LA BD
function registrarOferta(aseguradora, prima, producto, numCotizOferta, valorRC, PT, PP, CE, GR, logo, UrlPdf) {
	
	return new Promise(function (resolve, reject) {

		var idCotizOferta = idCotizacion;
		var numDocumentoID = document.getElementById("numDocumentoID").value;
		var placa = document.getElementById("placaVeh").value;
        
		$.ajax({
			type: 'POST',
			url: url_todoriesgo +  'src/insertarOferta.php',
			dataType: "json",
			data: {
				placa: placa,
				idCotizOferta: idCotizOferta,
				numIdentificacion: numDocumentoID,
				aseguradora: aseguradora,
				numCotizOferta: numCotizOferta,
				producto: producto,
				valorPrima: prima,
				valorRC: valorRC,
				PT: PT,
				PP: PP,
				CE: CE,
				GR: GR,
				logo: logo,
				UrlPdf: UrlPdf
			},
			success: function (data) {
				// var datos = data.Data;
				var message = data.Message;
				var success = data.Success;
				
				resolve({ /* value: datos, */ result: message, success: success });

				if (!success) {
					reject(new Error('Hubo un error en la inserción de las ofertas'));
				}
			}
		});
		
	});

}

// DA FORMATO A LOS VALORES ENTEROS
function formatNumber(n) {
	n = String(n).replace(/\D/g, "");
	return n === '' ? n : Number(n).toLocaleString();
}


	//FUNCION PARA CARGAR MARCA DE VEHICULOS DE ACUERDO A LA SELECCION DE CATEGORIA
	$("#clase").change(function () {

		var id = $(this).val();
		var dataString = "id=" + id;

		$.ajax({
			type: "POST",
			url: url_todoriesgo + "src/fasecolda/marca.php",
			data: dataString,
			cache: false,
			success: function (html) {
				$("#Marca").html(html);
			}
		});

	});


	//FUNCION PARA LLAMAR DATOS MAS
	$("#Marca").change(function () {

		var id = $(this).val();
		var dataString = id;
		var clasveh = $("#clase").val();

		if (dataString == "Mas") {

			$.ajax({
				type: "POST",
				url: url_todoriesgo + "src/fasecolda/marca2.php",
				data: { clasveh: clasveh },
				cache: false,
				success: function (html) {
					$("#referenciados").html("");
					$("#referenciatres").html("");
					$(".costoSoat").html("");
					$("#Marca").html(html);
				}
			});

		} else {

			$.ajax({
				type: "POST",
				url: url_todoriesgo + "src/fasecolda/edadveh.php",
				data: { dataString: dataString, clasveh: clasveh },
				cache: false,
				beforeSend: function () {
					document.getElementById("loadingModelo").innerHTML = "<span><img src='vistas/img/plantilla/loader-loading.gif' width='18' heigth='18'></span>";
				},
				success: function (html) {
					$("#referenciados").html("");
					$("#referenciatres").html("");
					$("#costoSoat").html("");
					$("#edad").html(html);
					document.getElementById("loadingModelo").innerHTML = "<span class='fa fa-check-square'></span>";
				}
			});
		}

	});

	//FUNCION PARA CARGAR LINEA DE VEHICULOS
	$("#edad").change(function () {

		var id = $(this).val();
		var dataString = id;
		var clasveh = $("#clase").val();
		var MarcaVeh = $("#Marca").val();

		$.ajax({
			type: "POST",
			url: url_todoriesgo + "src/fasecolda/referencia1.php",
			data: { dataString: dataString, clasveh: clasveh, MarcaVeh: MarcaVeh },
			cache: false,
			success: function (html) {
				$("#referenciados").html("");
				$("#referenciatres").html("");
				$("#costoSoat").html("");
				$("#linea").html(html);
			}
		});

	});

	$("#linea").change(function () {

		var id = $(this).val();
		var dataString = id;
		var clasveh = $("#clase").val();
		var MarcaVeh = $("#Marca").val();
		var edadVeh = $("#edad").val();

		$.ajax({
			type: "POST",
			url: url_todoriesgo + "src/fasecolda/referencia2.php",
			data: {
				dataString: dataString,
				clasveh: clasveh,
				MarcaVeh: MarcaVeh,
				edadVeh: edadVeh
			},
			cache: false,
			success: function (html) {
				$("#referenciados").html("");
				$("#referenciatres").html("");
				$("#costoSoat").html("");
				$("#referenciados").html(html);
				referenciados();
			}
		});

	});

	//-------------------------------------------------------------------------

	$("#referenciados").change(function () {

		var dataString = $(".refe1").val();
		var clasveh = $("#clase").val();
		var MarcaVeh = $("#Marca").val();
		var edadVeh = $("#edad").val();
		var lineaVeh = $("#linea").val();

		$.ajax({
			type: "POST",
			url: url_todoriesgo + "src/fasecolda/referencia3.php",
			data: {
				dataString: dataString,
				clasveh: clasveh,
				MarcaVeh: MarcaVeh,
				edadVeh: edadVeh,
				lineaVeh: lineaVeh
			},
			cache: false,
			success: function (html) {
				$("#costoSoat").html("");
				$("#referenciatres").html("");
				$("#referenciatres").html(html);
			}
		});

	});

	function referenciados() {

		var refe2 = $(".refe").val();

		if (refe2 != "0" || refe != "") {
			var dataString = $(".refe1").val();
			var clasveh = $("#clase").val();
			var MarcaVeh = $("#Marca").val();
			var edadVeh = $("#edad").val();
			var lineaVeh = $("#linea").val();

			$.ajax({
				type: "POST",
				url: url_todoriesgo + "src/fasecolda/referencia3.php",
				data: {
					dataString: dataString,
					clasveh: clasveh,
					MarcaVeh: MarcaVeh,
					edadVeh: edadVeh,
					lineaVeh: lineaVeh
				},
				cache: false,
				success: function (html) {
					$("#costoSoat").html("");
					$("#referenciatres").html(html);
				}
			});
		}
	}

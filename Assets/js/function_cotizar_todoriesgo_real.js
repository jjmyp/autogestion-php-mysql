let carpetaimagenes = "https://www.grupoasistencia.com/autogestionpro/Assets/images/"
let loadingurl = carpetaimagenes + "loader-loading.gif"
let loadingurlupdate = carpetaimagenes + "loader-update.gif"
let imageurlcopatria = carpetaimagenes + "colpatria.jpg"
let imageurlbolivar = carpetaimagenes + "Bolivar.jpg"
let imageurlestado = carpetaimagenes + "Estado.jpg"
let imageurlhdi = carpetaimagenes + "HDI.jpg"
let imageurlsbs = carpetaimagenes + "SBS.jpeg"
let imageurlaxa = carpetaimagenes + "AXA.png"
let imageurlerror = carpetaimagenes + "error.png"
let imageurlsuccess = carpetaimagenes + "success.png"
let loadingconsultaoferta = `<img src="${loadingurl}" width="34" height="34"/><strong> Cotizando vehiculo...</strong></div>`
let loadingurlconsultaplaca = `<img src="${loadingurl}" width="34" height="34"/><strong> Consultando placa...</strong></div>`
let loadiurlrecotizando = `<img src="${loadingurl}" width="34" height="34"/><strong> Recotizando...</strong></div>`
let loadingurlactualizando = `<img src="${loadingurl}" width="34" height="34"><strong> Actualizando Ofertas...</strong>`


$(document).ready(function () {

	//METODO QUE PERMITE CONSULTAR EL VEHICULO EN CXPER
	$("#btnCotizador").click(function () {
		consulPlaca();
	});


	cargarCategoriasSelect();
	//ConsultaCiudad();
	$("#txtCiudadCirculacVeh2").select2();

	const proxyurl = "https://cors-anywhere.herokuapp.com/";

	
	// Convierte la Placa ingresada en Mayusculas
	$('#txtValPlaca').keyup(function(){
		var numPlaca = document.getElementById("txtValPlaca").value;
		mayuscPlaca=numPlaca.toUpperCase();
		$('#txtValPlaca').val(mayuscPlaca);
	});


	// Evita Espacios en blanco en el numero de Placa
	$(function () {
		$('#idValidarPlaca, #txtValPlaca').on('keypress', function (e) {
			if (e.which == 32)
				return false;
		});
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


	//Valida si se conoce la placa del vehiculo para ocultar o desocultar campo Placa.
	$("#txtConocesLaPlacaSi").click(function () {
		document.getElementById("contenIdNumPlaca").style.display = "block";
		$(".alert").remove();
	});
	$("#txtConocesLaPlacaNo").click(function () {
		document.getElementById("contenIdNumPlaca").style.display = "none";
		document.getElementById("idNumPlaca").value = "";
	});

	//Valida si se conoce la placa del vehiculo para ocultar o desocultar campo Cero KM.
	$("#txtConocesLaPlacaSi").click(function () {
		document.getElementById("contenCeroKM").style.display = "none";
		$("#txtEsCeroKmSi").prop("checked", false);
		$("#txtEsCeroKmNo").prop("checked", true);
	});
	$("#txtConocesLaPlacaNo").click(function () {
		$("#txtEsCeroKmNo").prop("checked", false);
		document.getElementById("contenCeroKM").style.display = "block";
	});

	//Valida si el vehiculo es cero KM para ocultar o desocultar la Alert.
	$("#txtEsCeroKmSi").click(function () {
		$(".alert").remove();
	});


	/*
	$("#txtMarcaVeh").select2({
		placeholder: "Buscar...",
		language: "es",
		ajax: {
			url: 'https://www.grupoasistencia.com/autogestionpdf/src/marcaVeh.php',
			method: "POST",
			dataType: "json",
			delay: 250,
			data: function (params) {
				return {
					buscar: params.term // search term
				};
			},
			processResults: function (data) {
				return {
					results: $.map(data, function (item, i) {
						return { id: item.marcaveh, text: item.marcaveh };
					})
				};
			},
			cache: true,
			error: function (data) {
				// console.log('Error en el consumo del WebServices');
			}
		}
	});
	*/


	$("#txtCiudadCirculacVeh").select2({
		placeholder: "Buscar...",
		language: "es",
		ajax: {
			url: proxyurl + "http://app.agentemotor.com/cotizaciones/consultas/localizacion.php?ciudad_circulacion_veh=1",
			method: "GET",
			dataType: "json",
			delay: 250,
			data: function (params) {
				return {
					letters: params.term // search term
				};
			},
			processResults: function (data) {
				return {
					results: $.map(data, function (item, i) {
						return { id: item.nombre_ciudad + ', ' + item.nombre_dep, text: item.nombre_ciudad + ', ' + item.nombre_dep };
					})
				};
			},
			cache: true,
			error: function (data) {
				// console.log('Error en el consumo del WebServices');
			}
		}
	});


	$('#btnNext1').click(function () {

		//gtag_report_conversion(null,"",'misegurodigital.com/cotizadortodoriego.php?paso=1');
		history.pushState(null, "", "cotizadortodoriego.php?paso=1");

		var placaVeh = document.getElementById("txtValPlaca").value;
		var fasecoldaVeh = document.getElementById("txtFasecolda").value;
		var referenciaVeh2 = document.getElementById("txtReferenciaVeh2").value;
		var modeloVeh = document.getElementById("txtModeloVeh").value;
		var marcaVeh = document.getElementById("txtMarcaVeh").value;
		var claseVeh = document.getElementById("txtClaseVeh").value;
		var ceroKM = document.getElementById("txtValCeroKM").value;
		var tipoPlacaVeh = document.getElementById("txtTipoPlaca").value;
		//var usoVehiculo = document.getElementById("txtUsoVehiculo").value;
		var ciudadyDepartam = document.getElementById("txtCiudadCirculacVeh2").value;
		var items = ciudadyDepartam.split(", "); // Remplazamos la (,) + el Espacio y para separar Municio del Departamento.
		var ciudadCirculacVeh = items[0]; // Capturamos Municipio en la primera posicion.
		var departCirculacVeh = items[1]; // Capturamos Departamento en la Segunda Posicion.

		// Asignamos datos del Vehiculo a la Tarjeta de Resumen
		document.getElementById('resFasecolda').innerText = fasecoldaVeh;
		document.getElementById('resFasecolda2').innerText = fasecoldaVeh;
		document.getElementById('resPlaca').innerText = placaVeh;
		document.getElementById('resPlaca2').innerText = placaVeh;
		document.getElementById('resMarca').innerText = marcaVeh;
		document.getElementById('resMarca2').innerText = marcaVeh;
		document.getElementById('resModelo').innerText = modeloVeh;
		document.getElementById('resModelo2').innerText = modeloVeh;
		document.getElementById('resClase').innerText = claseVeh;
		document.getElementById('resClase2').innerText = claseVeh;
		document.getElementById('resReferencia').innerText = referenciaVeh2;
		document.getElementById('resReferencia2').innerText = referenciaVeh2;
		document.getElementById('resTipoPlaca').innerText = tipoPlacaVeh;
		document.getElementById('resTipoPlaca2').innerText = tipoPlacaVeh;
		document.getElementById('resCeroKM').innerText = ceroKM;
		//document.getElementById('KMCERO').value(ceroKM);
		$("#KMCERO").val(ceroKM);
		document.getElementById('resCeroKM2').innerText = ceroKM;
		document.getElementById('resCiudadCircul').innerText = ciudadCirculacVeh + ", " + departCirculacVeh;
		document.getElementById('resCiudadCircul2').innerText = ciudadCirculacVeh + ", " + departCirculacVeh;

		if (placaVeh == "") {
			var newplaca = document.getElementById("cerokmsi2").value;
			var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 1", bit_accion: "Completó el paso 1", placa: newplaca };
			$.ajax({
				url: "https://www.grupoasistencia.com/autogestionpdf/src/insertBitacoraTR.php",
				type: "POST",
				data: { info: infoJson }
			});

		} else {
			var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 1", bit_accion: "Completó el paso 1", placa: placaVeh };
			$.ajax({
				url: "https://www.grupoasistencia.com/autogestionpdf/src/insertBitacoraTR.php",
				type: "POST",
				data: { info: infoJson }
			});

		}



	});


	$('#btnNext2').click(function () {

		history.pushState(null, "", "cotizadortodoriego.php?paso=2");

		var numDocAsegurado = document.getElementById("txtNoDocumento").value;
		var nomAsegurado = document.getElementById("txtNombres").value;
		var apellAsegurado = document.getElementById("txtApellidos").value;
		var dia = document.getElementById("dianacimiento").value;
		var mes = document.getElementById("mesnacimiento").value;
		var anio = document.getElementById("anionacimiento").value;
		var fechaNacimiento = dia + "/" + mes + "/" + anio;




		//var fechaNacimiento = document.getElementById("txtFechaNac").value;
		var generoAsegurado = document.getElementById("genero").value;
		var genvisualizar = "";

		if (generoAsegurado == 1) {
			genvisualizar = "Hombre";
		} else {
			genvisualizar = "Mujer";
		}




		var emailAsegurado = document.getElementById("txtEmail").value;

		// Asignamos datos del Tomador a la Tarjeta de Resumen
		document.getElementById('resNumDoc').innerText = numDocAsegurado;
		document.getElementById('resNumDoc2').innerText = numDocAsegurado;
		document.getElementById('resNombres').innerText = nomAsegurado;
		document.getElementById('resNombres2').innerText = nomAsegurado;
		document.getElementById('resApellidos').innerText = apellAsegurado;
		document.getElementById('resApellidos2').innerText = apellAsegurado;
		document.getElementById('resFechaNac').innerText = fechaNacimiento;
		document.getElementById('resFechaNac2').innerText = fechaNacimiento;
		document.getElementById('resGenero').innerText = genvisualizar;
		document.getElementById('resGenero2').innerText = genvisualizar;
		document.getElementById('resEmail').innerText = emailAsegurado;
		document.getElementById('resEmail2').innerText = emailAsegurado;

		var placaVeh = document.getElementById("txtValPlaca").value;

		if (placaVeh == "") {
			var newplaca = document.getElementById("cerokmsi2").value;
			var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 2", bit_accion: "Completó el paso 2", placa: newplaca };
			$.ajax({
				url: "https://www.grupoasistencia.com/autogestionpdf/src/insertBitacoraTR.php",
				type: "POST",
				data: { info: infoJson }
			});

		} else {
			var placaVeh = document.getElementById("txtValPlaca").value;
			var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 2", bit_accion: "Completó el paso 2", placa: placaVeh };
			$.ajax({
				url: "https://www.grupoasistencia.com/autogestionpdf/src/insertBitacoraTR.php",
				type: "POST",
				data: { info: infoJson }
			});

		}

	});


	// Ejectura la funcion Cotizar desde el boton Cotizar
	$('#btnCotizar').click(function () {
		cotizarSeguroVeh();
	});

	$("#btnRecotizar").click(function () {
		$('loaderOfertaRecotizar').html(loadiurlrecotizando)
		document.getElementById("cardHorizontal").style.display = "none";
		document.getElementById("cardHorizontal2").style.display = "none";

		document.getElementById("cardVertical").style.display = "none";
		document.getElementById("cardVertical2").style.display = "none";
		
		cotizarSeguroVeh();
		
		document.getElementById("cardHorizontal2").style.display = "block";


	});

	$("#masA").click(function () {
		document.getElementById("DatosAseguradosO").style.display = "block";
		document.getElementById("menosAsegurado").style.display = "block";
		document.getElementById("masAsegurado").style.display = "none";
	});

	$("#menosA").click(function () {
		document.getElementById("DatosAseguradosO").style.display = "none";
		document.getElementById("menosAsegurado").style.display = "none";
		document.getElementById("masAsegurado").style.display = "block";


	});




	//Valida el ingreso de informacion en los campos Modelo y Marca del Vehiculo.
	$('#txtFasecolda').change(function () {
		cargarDatosVeh();
	});

	$('#txtModeloVeh').change(function () {
		cargarDatosVeh();
	});

	//Valida el ingreso de informacion en los campos Modelo y Marca del Vehiculo.
	$('#txtMarcaVeh, #txtModeloVeh').keyup(function () {

		var modeloVeh = document.getElementById("txtModeloVeh").value;
		var marcaVeh = document.getElementById("txtMarcaVeh").value;

		if (modeloVeh != '' && marcaVeh != '') {
			cargarReferencia();
		}
	});


	//Valida si da Click en el combobox de Referencias.
	$('#txtReferenciaVeh').change(function () {
		cargarDatosReferSelec();
	});

	//Valida el Tipo de Negocio para ocultar o desocultar campo Aseguradora.
	$("#txtConocesLaPlacaSi").click(function () {
		//document.getElementById("conocesLaPlaca").style.display = "block";
	});
	$("#txtConocesLaPlacaNo").click(function () {
		//document.getElementById("conocesLaPlaca").style.display = "none";

	});

	//Valida el Tipo de Negocio para ocultar o desocultar campo Aseguradora.
	$("#txtTipoNegocNuevo").click(function () {
		document.getElementById("comboboxAsegur").style.display = "none";
	});
	$("#txtTipoNegocRenovac").click(function () {
		document.getElementById("comboboxAsegur").style.display = "block";
	});

	//Valida si Posee Accesorios para ocultar o desocultar campo Valor Accesorios.
	$("#txtPoseeaccesorNo").click(function () {
		document.getElementById("comboboxValorAcces").style.display = "none";
	});
	$("#txtPoseeaccesorSi").click(function () {
		document.getElementById("comboboxValorAcces").style.display = "block";
	});

	//Valida si Posee Fecha Exacta de Inicio para ocultar o desocultar campo Fecha Poliza.
	$("#txtFechaInicioNo").click(function () {
		document.getElementById("comboboxfechaIniPoliza").style.display = "none";
	});
	$("#txtFechaInicioSi").click(function () {
		document.getElementById("comboboxfechaIniPoliza").style.display = "block";
	});

	//Valida el Beneficiario Oneroso para ocultar o desocultar campo Beneficiario.
	$("#txtBenefOnerNo").click(function () {
		document.getElementById("comboboxBenefic").style.display = "none";
	});
	$("#txtBenefOnerSi").click(function () {
		document.getElementById("comboboxBenefic").style.display = "block";
	});

	//Ocultar o desocultar la imagen de la Vista Vertical u Horizontal de las Cards.
	$("#imgVistaHoriz").click(function () {
		document.getElementById("contenVistaHoriz").style.display = "none";
		document.getElementById("contenVistaVerti").style.display = "block";
		document.getElementById("contenCardVertical").style.display = "none";
		document.getElementById("contenCardHorizontal").style.display = "block";
	});
	$("#imgVistaVerti").click(function () {
		document.getElementById("contenVistaVerti").style.display = "none";
		document.getElementById("contenVistaHoriz").style.display = "block";
		document.getElementById("contenCardHorizontal").style.display = "none";
		document.getElementById("contenCardVertical").style.display = "block";
	});

	
	// Imprimir Parrilla de Cotizaciones
	$('#btnPDF').click(function (e) {

		e.preventDefault();

		var todosOn = $('.classSelecOferta:checked').length;
		if (!todosOn) {
			alert('Por favor seleccione como minimo una oferta de la Parrilla');
		}
		else{
			var cotizacion = $(".classCotizacion").val();
			window.open("https://www.grupoasistencia.com/autogestionpdf/autogestionpdf.php?cotizacion=" + cotizacion, "_blank");
		}

	});
	

});



var contErrMetEstado = 0;
var contErrProtocolo = 0;

function consulPlaca() {

	// Para ocultar los campos de informacion del Cliente y el Boton Consultar
	document.getElementById("formulario2").style.display = "none";
	document.getElementById("botonconsultar").style.display = "none";
    $('#loaderPlaca').html(`<img src="${loadingurl}" width="34" height="34"><strong> Consultando Placa...</strong>`);


	var numplaca = document.getElementById("txtValPlaca").value;
	valnumplaca = numplaca.toUpperCase(); // Convierte la Placa en Mayusculas

	var combo = document.getElementById("TipoDocumentoAsegurado");
	var selected = combo.options[combo.selectedIndex].text;

	var combo2 = document.getElementById("genero");
	var selected2 = combo2.options[combo2.selectedIndex].text;

	var combo3 = document.getElementById("estadoCivil");
	var selected3 = combo3.options[combo3.selectedIndex].text;


	var Identificacion = document.getElementById("txtNoDocumento").value;
	var dia1 = document.getElementById("dianacimiento").value;
	var mes1 = document.getElementById("mesnacimiento").value;
	var anio1 = document.getElementById("anionacimiento").value;
	var fechaNr = dia1 + "/" + mes1 + "/" + anio1;
	var nombre1 = document.getElementById("txtNombres").value;
	var apellido1 = document.getElementById("txtApellidos").value;
	var nombreCR = nombre1 + " " + apellido1;
	var GeneroR = document.getElementById("txtNoDocumento").value;
	var EstadoR = document.getElementById("txtNoDocumento").value;


	document.getElementById("tidentificacionR").value = selected;
	document.getElementById("numidentificacionR").value = Identificacion;
	document.getElementById("fechNacimientoR").value = Identificacion;
	document.getElementById("nombresApellidosR").value = Identificacion;
	document.getElementById("fechNacimientoR").value = fechaNr;
	document.getElementById("nombresApellidosR").value = nombreCR;
	document.getElementById("GeneroR").value = selected2;
	document.getElementById("EstadoCivil").value = selected3;


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

			console.log(myJson);
			var EstadoConsulta = myJson.Success;
			var tipoMensaje = myJson.MessageType;
			
			//VALIDA SI LA CONSULTA FUE EXITOSA
			if (EstadoConsulta == true) {
				var CodigoFasecolda = myJson.Data.CodigoFasecolda;
				var Modelo = myJson.Data.Modelo;
				var ValorAsegurado = myJson.Data.ValorAsegurado;
				var ClaseVehiculo = myJson.Data.ClassId;
				var CodigoMarca = myJson.Data.Brand;
				var CodigoLinea = myJson.Data.BrandLine;
				var clase = "";
				var LimiteRCESTADO = "";

				if (ClaseVehiculo == 1) {
					clase = "AUTOMOVILES";
					LimiteRCESTADO = 6;
				} else if (ClaseVehiculo == 2) {
					clase = "CAMPEROS";
					LimiteRCESTADO = 18;
				} else if (ClaseVehiculo == 3) {
					clase = "PICK UPS";
					LimiteRCESTADO = 18;
				} else if (ClaseVehiculo == 4) {
					clase = "UTILITARIOS DEPORTIVOS";
					LimiteRCESTADO = 6;
				} else if (ClaseVehiculo == 12) {
					clase = "MOTOCICLETA";
					LimiteRCESTADO = 6;
				} else if (ClaseVehiculo == 14) {
					clase = "PESADO";
					LimiteRCESTADO = 18;
				}
				else if (ClaseVehiculo == 19) {
					clase = "VAN";
					LimiteRCESTADO = 18;
				} else if (ClaseVehiculo == 16) {
					clase = "MOTOCICLETA";
					LimiteRCESTADO = 6;
				}

				$("#txtFasecolda").val(CodigoFasecolda);
				$("#txtModeloVeh").val(Modelo);
				$("#txtValorVehFasec").val(ValorAsegurado);
				$("#txtClaseVeh").val(clase);
				$("#fasecolda_info_p").html(CodigoFasecolda);
				$("#modelo_info_p").html(Modelo);
				$("#valor_info_p").html(ValorAsegurado);
				$("#clase_info_p").html(clase);
				$("#CodigoMarca").val(CodigoMarca);
				$("#CodgigoLinea").val(CodigoLinea);
				$("#ClaseVehiculo").val(ClaseVehiculo);
				$("#LimiteRC").val(LimiteRCESTADO);

				cargarDatosVeh();
				document.getElementById("formularioResumen").style.display = "block";
				document.getElementById("FormularioFinal").style.display = "block";
				document.getElementById("primerFormulario").style.display = "none";

				$('#loaderPlaca').html('');

			} else {				
				if(tipoMensaje != 1){

					contErrMetEstado++;
					if (contErrMetEstado > 2){
	
						$('#loaderPlaca').html('');
						document.getElementById("formulario2").style.display = "block";
						document.getElementById("botonconsultar").style.display = "block";
						contErrMetEstado = 0;
	
					} else{
						setTimeout(consulPlaca,3000);
					}
				} else{
					$('#loaderPlaca').html('');
					alert("¡Por favor ingrese una Placa Valida!");
				}
			}
		})
		.catch(function (error) {
			console.log('Parece que hubo un problema: \n', error);
			
			contErrProtocolo++;
			if(contErrProtocolo < 1){

				$('#loaderPlaca').html('');
				document.getElementById("formulario2").style.display = "block";
				document.getElementById("botonconsultar").style.display = "block";
			} else{
				setTimeout(consulPlaca,3000);
			}
		});

}


function cargarReferencia() {

	var modeloVeh = document.getElementById("txtModeloVeh").value;
	var marcaVeh = document.getElementById("txtMarcaVeh").value;

	var url = 'http://app.agentemotor.com/cotizaciones/cotizaciones.php?fa_marca=' + marcaVeh + '&fa_modelo=' + modeloVeh + '&cargar=referencias';
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			let output = '<option value="">Buscar...</option>';
			data.forEach(function (referen) {
				output += `
					<option value="${referen.fa_clase}-${referen.fa_referencia1}-${referen.fa_referencia2}-${referen.fa_referencia3}">${referen.fa_referencia1} ${referen.fa_referencia2} ${referen.fa_referencia3}</option>
				`;
			});
			$('#txtReferenciaVeh').html(output);
			//$("#txtReferenciaVeh").prop("disabled", false);
		});

}


function cargarDatosReferSelec() {

	var marcaVeh = document.getElementById("txtMarcaVeh").value;
	var modeloVeh = document.getElementById("txtModeloVeh").value;
	var referencias = document.getElementById("txtReferenciaVeh").value;

	var referencia = referencias.split("-");
	var claseVeh = referencia[0];
	var referencia1 = referencia[1];
	var referencia2 = referencia[2];
	var referencia3 = referencia[3];

	var url = 'http://app.agentemotor.com/cotizaciones/cotizaciones.php?format=json&cs_fa_marca=' + marcaVeh + '&cs_fa_modelo=' + modeloVeh + '&cs_fa_referencia1=' + referencia1 +
		'&cs_fa_referencia2=' + referencia2 + '&cs_fa_referencia3=' + referencia3 + '&clase=' + claseVeh + '&cargar=valor';
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			let datos = data;
			console.log(datos);
			//Valor Fasecolda del Vehiculo
			$("#txtFasecolda").html(datos[0].fa_codigo);
			$("#txtClaseVeh").html(datos[0].fa_clase);
			$("#txtReferenciaVeh2").html(referencia[1] + ' ' + referencia[2] + ' ' + referencia[3]);
			$("#txtValorVehFasec").html(datos[0].valorFasecolda + '000');

			$("#fasecolda_info_p").html(datos[0].fa_codigo);
			$("#valor_info_p").html(datos[0].valorFasecolda + '000');
			$("#clase_info_p").html(datos[0].fa_clase);
		});

}

function cargarDatosVeh() {
	var placa = document.getElementById("txtValPlaca").value;
	var numFasecolda = document.getElementById("txtFasecolda").value;
	var modeloVeh = document.getElementById("txtModeloVeh").value;
	
	$('#placa_info_p').html(placa)
	document.getElementById("txtValPlacaResumen").value = placa;


	if (numFasecolda != '' && modeloVeh != '') {

		ConsultaFasecolda(numFasecolda, modeloVeh);

	}

}


// Captura los datos suministrados por el cliente y los envia al API para recibir la cotizacion.
function cotizarSeguroVeh() {

	$('#loaderOferta').html(`<img src="${loadingurl}" width="34" height="34"><strong> Cotizando Ofertas...</strong>`);

	var TipoIdentificacion = document.getElementById("TipoDocumentoAsegurado").value;
	var NumeroIdentificacion = document.getElementById("txtNoDocumento").value;
	var Nombre = document.getElementById("txtNombres").value;
	var Apellido1 = document.getElementById("txtApellidos").value;
	var Apellido2 = "";
	//var Apellido2 = document.getElementById("txtApellidos2").value;
	var Genero = document.getElementById("genero").value;
	var dia = document.getElementById("dianacimiento").value;
	var mes = document.getElementById("mesnacimiento").value;
	var anio = document.getElementById("anionacimiento").value;
	var FechaNacimiento = dia + "/" + mes + "/" + anio;

	//var FechaNacimiento = document.getElementById("txtFechaNac").value;


	var estadoCivil = document.getElementById("estadoCivil").value;
	var direcAsegurado = document.getElementById("DireccionResidencia").value;
	var emailAsegurado = "tecnologia@grupoasistencia.com";
	var celAsegurado = "3183551472";
	var fasecoldaVeh = document.getElementById("txtFasecolda").value;
	var modeloVeh = document.getElementById("txtModeloVeh").value;
	var tipoPlaca = document.getElementById("txtTipoPlaca").value;
	var placaVeh2 = document.getElementById("txtValPlaca").value;
	var placaVeh = ""
	var placaVeh3 = ""
	if (placaVeh2 == "" || placaVeh2 == " ") {
		placaVeh = "CAT770";
		var newplaca = document.getElementById("cerokmsi2").value;
		placaVeh3 = newplaca;
	} else {
		placaVeh = placaVeh2;
		placaVeh3 = placaVeh2;
	}

	var CodigoMarca = document.getElementById("CodigoMarca").value;
	var CodgigoLinea = document.getElementById("CodgigoLinea").value;
	var ClaseVehiculo = document.getElementById("ClaseVehiculo").value;
	var CoberturaEstado = document.getElementById("CoberturaEstado").value;
	var LimiteRC = document.getElementById("LimiteRC").value;
	var ValorAccesorios = document.getElementById("ValorAccesorios").value;
	var ValorAsegurado = document.getElementById("txtValorVehFasec").value;
	var ClaseVehiculoAXA = document.getElementById("txtClaseVeh").value;
	var DepartamentoCirculacion = document.getElementById("ciudad_circulacion").value;
	var CiudadCirculacionBolivar = document.getElementById("txtCiudadCirculacVeh2").value;
	var CiudadCirculacionBolivar2 = "";

	var Contar = CiudadCirculacionBolivar.length;

	if (Contar == 4) {
		CiudadCirculacionBolivar2 = "0" + CiudadCirculacionBolivar;
	} else if (Contar == 3) {
		CiudadCirculacionBolivar2 = "00" + CiudadCirculacionBolivar;
	} else {
		CiudadCirculacionBolivar2 = CiudadCirculacionBolivar;
	}

	//VARIABLESPARA ENVIO DE CORREO
	var marcaVeh = document.getElementById("txtMarcaVeh").value;
	var referenciaVeh2 = document.getElementById("txtReferenciaVeh2").value;

	var today = new Date();
	var year = today.getFullYear();

	var aniosAntiguedad = year - modeloVeh;

	if (NumeroIdentificacion !== '') {
		if (Nombre !== '') {
			if (Apellido1 !== '') {
				if (dia !== '') {
					if (mes !== '') {
						if (anio !== '') {
							if (emailAsegurado !== '') {
								if (celAsegurado !== '') {
									if (Genero !== '') {
										RegistroVehiculo();

										// $.ajax({
										// 	url: "https://www.grupoasistencia.com/autogestionpdf/src/emailAsesor.php",
										// 	type: "POST",
										// 	data: {
										// 		placaVeh: placaVeh3, fasecoldaVeh: fasecoldaVeh, modeloVeh: modeloVeh, marcaVeh: marcaVeh, referenciaVeh2: referenciaVeh2,
										// 		ciudadCirculacVeh: CiudadCirculacionBolivar2, departCirculacVeh: DepartamentoCirculacion, numDocAsegurado: NumeroIdentificacion,
										// 		apellAsegurado: Apellido1, nomAsegurado: Nombre, fechaNacimiento: FechaNacimiento, emailAsegurado: emailAsegurado,
										// 		celAsegurado: celAsegurado, pdfComparativo: "falta.php"
										// 	},
										// 	success: function (data) {
										// 		console.log("Correo del Asesor, enviado Exitosamente");

										// 		// Recibimos la cadena que contiene el Codigo de Cotizacion y la separamos por el (-) dejando unicamente el codigo de la oferta.
										// 		var cotizacion = data.split("-");
										// 		var codCotizacion = cotizacion[1];
										// 		document.getElementById('emailAsesorSeleccionado').value = cotizacion[2];

										// 		$.ajax({
										// 			url: "https://www.grupoasistencia.com/autogestionpdf/src/emailUsuario.php",
										// 			type: "POST",
										// 			data: {
										// 				placaVeh: placaVeh3, fasecoldaVeh: fasecoldaVeh, modeloVeh: modeloVeh, marcaVeh: marcaVeh, referenciaVeh2: referenciaVeh2,
										// 				ciudadCirculacVeh: CiudadCirculacionBolivar2, departCirculacVeh: DepartamentoCirculacion, numDocAsegurado: NumeroIdentificacion,
										// 				apellAsegurado: Apellido1, nomAsegurado: Nombre, fechaNacimiento: FechaNacimiento, emailAsegurado: emailAsegurado,
										// 				celAsegurado: celAsegurado, pdfComparativo: "falta.php", codCotizacion: codCotizacion
										// 			},
										// 			success: function (data) {
										// 				console.log("Correo del Usuario, enviado Exitosamente");



										// 			},
										// 			error: function (data) {
										// 				console.log("El envio de correo del Usuario, ha Fallado.");
										// 			}
										// 		});

										// 		// Cargamos un Input Oculto en la interfaz que contiene el Codigo de Cotizacion asignado a la cotizacion realizada. 
										// 		$('#inputCodCotizacion').html("<input type='hidden' class='form-control' name='codCotizacion' id='txtCodCotizacion' value='" + codCotizacion + "'>");

										// 	},
										// 	error: function (data) {
										// 		console.log("El envio de correo del Asesor, ha Fallado.");
										// 	}
										// });

										$('#loaderOferta').html(`<img src="${loadingurlupdate}" width="34" height="34"><strong> Consultando Ofertas...</strong>`);

										var myHeaders = new Headers();
										myHeaders.append("Content-Type", "application/json");

										var raw = JSON.stringify({ "TipoIdentificacion": TipoIdentificacion, "NumeroIdentificacion": NumeroIdentificacion, "Nombre": Nombre, "Apellido": Apellido1, "Genero": Genero, "FechaNacimiento": FechaNacimiento, "EstadoCivil": estadoCivil, "NumeroTelefono": celAsegurado, "Direccion": direcAsegurado, "Email": emailAsegurado, "ZonaCirculacion": DepartamentoCirculacion, "Placa": placaVeh, "CodigoMarca": CodigoMarca, "CodgigoLinea": CodgigoLinea, "ClaseVehiculo": ClaseVehiculo, "CodigoFasecolda": fasecoldaVeh, "Modelo": modeloVeh, "ValorAsegurado": ValorAsegurado, "Cobertura": CoberturaEstado, "LimiteRC": LimiteRC, "ValorAccesorios": ValorAccesorios, "ceroKm": "false", "CiudadBolivar": CiudadCirculacionBolivar2, "ServicioVehiculoAXA": tipoPlaca, "CodigoVerificacion": "0", "Apellido2": Apellido2, "AniosSiniestro": "0", "AniosAsegurados": "0", "NivelEducativo": "4", "Estrato": "3" });

										var requestOptions = {
											method: 'POST',
											headers: myHeaders,
											body: raw,
											redirect: 'follow'
										};

										fetch("https://www.grupoasistencia.com/webserviceAutos/Cotizar", requestOptions)
										// fetch("ofertas.json")
											.then(function (response) {
												return response.json();
											})
											.then(function (myJson) {
												var jsonComparativo = myJson;
												var cardVerti = "";
												var cardHoriz = "";
												//console.log(myJson);
												//console.log(myJson.AXA);
												//console.log(myJson.HDI);

												RegistroPaso();
												// Muestra el Boton ConsultarPDF al cargar la Parrilla de Ofertas
												document.getElementById("contenBtnPDF").style.display = "block";

												var EfectivoEstado = myJson.EStado.Success;
												var EfectivoEstado2 = myJson.EStado2.Success;

												//var EfectivoSBS = myJson.SBS.Mensaje_Validacion;

												var EfectivoBolivar1 = myJson.BOLIVAR.Bolivar1;
												var BolivarLimpi = EfectivoBolivar1.replace(/\\/g, "");
												var obj = JSON.parse(BolivarLimpi);

												var EfectivoBolivar2 = myJson.BOLIVAR.Bolivar2;
												var BolivarLimpi2 = EfectivoBolivar2.replace(/\\/g, "");
												var obj2 = JSON.parse(BolivarLimpi2);

												//console.log(obj);

												var ValidarBolivar = obj.message;
												var ValidarBolivar2 = obj2.message;

												//infomracion de bolivar
												var RCEBOLIVAR = "";
												var PTDPTRBOLIVAR = "";
												var DeducibleBOLIVAR = "";

												var RCEBOLIVAR2 = "";
												var PTDPTRBOLIVAR2 = "";
												var DeducibleBOLIVAR2 = "";

												if (aniosAntiguedad <= 5) {
													RCEBOLIVAR = "4.000.000.000";
													PTDPTRBOLIVAR = "100%";
													DeducibleBOLIVAR = "800.000";

													RCEBOLIVAR2 = "2.200.000.000";
													PTDPTRBOLIVAR2 = "100%";
													DeducibleBOLIVAR2 = "975.000";

												} else {
													RCEBOLIVAR = "4.000.000.000";
													PTDPTRBOLIVAR = "10% 1SMMLV";
													DeducibleBOLIVAR = "800.000";

													RCEBOLIVAR2 = "4.000.000.000";
													PTDPTRBOLIVAR2 = "10% 1SMMLV";
													DeducibleBOLIVAR2 = "975.000";
												}

												if (EfectivoEstado2 == true) {

													var ValorCotizacion = myJson.EStado2.Data.Attributes[1];
													var valorFinal = ValorCotizacion.Valor;
													var valor = formatNumber(valorFinal);
													var numcot = myJson.EStado2.Data.DocumentId;
													cardVerti += `
							<div class='col-sm-4'>
								<div class='card-ofertas'>
									<div class='card-body'>
										<img src='${imageurlestado}' style='width:auto;height:70px;' class='mb-2'><br/>
										<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>Seguros del Estado</h5>
										<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor} </h5>
										<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
						`;
													cardHoriz += `
						<div class='col-md-12 col-xl-12'>
							<div class='card-ofertas2'>
								<div class='row card-body'>
					
									<div class="col-xs-12 col-sm-6 col-md-2">
										<img src='${imageurlestado}' style='width:auto;height:130px;' class='mb-2'>
									</div>									  
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
										<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>Seguros del Estado</h5>
										<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valor}</h5>
										<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
									</div>
						`;

													cardVerti += `
						<div class="accordion accordion-connected mb-3" id="accordion-Estado-3">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-1">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-1" class="collapse">
													<div class="card-body accordion-info">
														<span>* $1.000.000.000</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-2">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-2" class="collapse">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-3">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-3" class="collapse">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : 10% 1 SMMLV</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-4">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-4" class="collapse">
													<div class="card-body accordion-info">
														<span>* Ilimitados por Vigencia</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-5">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-5" class="collapse">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>
										
										</div>
						
										`;

													cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-4">
										<ul class="list-group">
											<li class="list-group-item">
												<span class="badge">* $1.000.000.000</span>
												Responsabilidad Civil (RCE)
											</li>
											<li class="list-group-item">
												<span class="badge">* Cubrimiento al 100%</span>
												Pérdida Total Daños y Hurto
											</li>
											<li class="list-group-item">
												<span class="badge">* Deducible Unico : 10% 1 SMMLV</span>
												Pérdida Parcial Daños y Hurto
											</li>
											<li class="list-group-item">
												<span class="badge">* Ilimitados por Vigencia</span>
												Conductor elegido
											</li>
											<li class="list-group-item">
												<span class="badge">* Si</span>
												Servicio de Grúa
											</li>
										</ul>
									</div>

									`;


													cardVerti += `
													<label>Mostrar PDF</label><br>
						<input type="radio" onclick='RegistroProducto4("Seguros del Estado", \"${valor}\", "Estado -Automovil Familiar Full", \"${numcot}\", "$1.000.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si");'/>
							
					</div>
				</div>
			</div>
		`;

													cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaEstado" onclick='seleccionarOferta("Seguros del Estado", \"${valor}\", "Estado -Automovil Familiar Full", \"${numcot}\", "$1.000.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si", this);' />
									</div>
									
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaEstado" onclick='recomendarOferta("Seguros del Estado", \"${valor}\", "Estado -Automovil Familiar Full", \"${numcot}\", "$1.000.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si", this);' />
									</div>
								</div>
							</div>
						</div>
						`;

						RegistroProducto2("Seguros del Estado", valor, "Estado -Automovil Familiar Full", numcot, "$1.000.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si");
												
												}

												if (EfectivoEstado == true) {

													var ValorCotizacion = myJson.EStado.Data.Attributes[1];
													var valorFinal = ValorCotizacion.Valor;
													var valorE2 = formatNumber(valorFinal);
													var numcot = myJson.EStado.Data.DocumentId;

													cardVerti += `
							<div class='col-sm-4'>
								<div class='card-ofertas'>
									<div class='card-body'>
										<img src='${imageurlestado}' style='width:auto;height:70px;' class='mb-2'><br/>
										<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>Seguros del Estado</h5>
										<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valorE2} </h5>
										<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
						`;
													cardHoriz += `
							<div class='col-md-12 col-xl-12'>
								<div class='card-ofertas2'>
									<div class='row card-body'>
						
										<div class="col-xs-12 col-sm-6 col-md-2">
											<img src='${imageurlestado}' style='width:auto;height:130px;' class='mb-2'>
										</div>									  
										<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
											<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>Seguros del Estado</h5>
											<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valorE2}</h5>
											<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
										</div>
										`;

													cardVerti += `
						<div class="accordion accordion-connected mb-3" id="accordion-Estado-2">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-1">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-1" class="collapse">
													<div class="card-body accordion-info">
														<span>* $500.000.000</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-2">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-2" class="collapse">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-3">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-3" class="collapse">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : 10% 1 SMMLV</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-4">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-4" class="collapse">
													<div class="card-body accordion-info">
														<span>* Ilimitados por Vigencia</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-5">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-5" class="collapse">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>
										
										</div>
						
										`;

													cardHoriz += `
										<div class="col-xs-12 col-sm-6 col-md-4">
											<ul class="list-group">
												<li class="list-group-item">
													<span class="badge">* $500.000.000</span>
													Responsabilidad Civil (RCE)
												</li>
												<li class="list-group-item">
													<span class="badge">* Cubrimiento al 100%</span>
													Pérdida Total Daños y Hurto
												</li>
												<li class="list-group-item">
													<span class="badge">* Deducible Unico : 10% 1 SMMLV</span>
													Pérdida Parcial Daños y Hurto
												</li>
												<li class="list-group-item">
													<span class="badge">* Ilimitados por Vigencia</span>
													Conductor elegido
												</li>
												<li class="list-group-item">
													<span class="badge">* Si</span>
													Servicio de Grúa
												</li>
											</ul>
										</div>
										`;

													cardVerti += `
													<label>Mostrar PDF</label><br>
<input type="radio" onclick='RegistroProducto4("Seguros del Estado", \"${valorE2}\", "Estado -Automovil Familiar", \"${numcot}\", "$500.000.000","Cubrimiento al 100%", "Deducible Unico : 10%  - 1 SMMLV", "Ilimitados por Vigencia", "Si");'/>
					</div>
				</div>
			</div>
		`;

													cardHoriz += `
										<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
											<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
											<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaEstado2" onclick='seleccionarOferta("Seguros del Estado", \"${valorE2}\", "Estado -Automovil Familiar", \"${numcot}\", "$500.000.000","Cubrimiento al 100%", "Deducible Unico : 10%  - 1 SMMLV", "Ilimitados por Vigencia", "Si", this);' />
										</div>
										
										<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
											<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
											<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaEstado2" onclick='recomendarOferta("Seguros del Estado", \"${valorE2}\", "Estado -Automovil Familiar", \"${numcot}\", "$500.000.000","Cubrimiento al 100%", "Deducible Unico : 10%  - 1 SMMLV", "Ilimitados por Vigencia", "Si", this);' />
										</div>
									</div>
								</div>
							</div>
							`;

							RegistroProducto2("Seguros del Estado", valorE2, "Estado -Automovil Familiar", numcot, "$500.000.000", "Cubrimiento al 100%", "Deducible Unico : 10%  - 1 SMMLV", "Ilimitados por Vigencia", "Si");
												
												}

												if (ValidarBolivar == undefined) {
													if (aniosAntiguedad <= 10) {
														var EfectivoBolivar = obj.dataHeader.codRespuesta;

														if (EfectivoBolivar == 200) {
															var PrecioPrima = obj.data.responseData.totalPrima;
															var valorB1 = formatNumber(PrecioPrima);
															var Bolivarnum = obj.data.responseData.numCotizacion;

															cardVerti += `
								<div class='col-sm-4'>
									<div class='card-ofertas'>
										<div class='card-body'>
											<img src='${imageurlbolivar}' style='width:auto;height:70px;' class='mb-2'><br/>
											<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>Seguros Bolivar - Premium</h5>
											<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valorB1} </h5>
											<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
											
						`;

															cardHoriz += `
						<div class='col-md-12 col-xl-12'>
							<div class='card-ofertas2'>
								<div class='row card-body'>
				
									<div class="col-xs-12 col-sm-6 col-md-2">
										<img src='${imageurlbolivar}' style='width:auto;height:130px;' class='mb-2'>
									</div>
					
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
										<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>Seguros Bolivar - Premium</h5>
										<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valorB1}</h5>
										<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
									</div>

									`;

													cardVerti += `
					<div class="accordion accordion-connected mb-3" id="accordion-Bolivar1-2">
					
										<div class="card">
											<h6 class="card-title accordion-oferta">
												<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-1">Responsabilidad Civil (RCE)</a></strong>
											</h6>
									
											<div id="collapse-Bolivar1-2-1" class="collapse">
												<div class="card-body accordion-info">
													<span>* $ ${RCEBOLIVAR}</span>
												</div>
											</div>
										</div>
									
										<div class="card">
											<h6 class="card-title accordion-oferta">
												<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-2">Pérdida Total Daños y Hurto</a></strong>
											</h6>
									
											<div id="collapse-Bolivar1-2-2" class="collapse">
												<div class="card-body accordion-info">
													<span>* Cubrimiento  ${PTDPTRBOLIVAR}</span>
												</div>
											</div>
										</div>
									
										<div class="card">
											<h6 class="card-title accordion-oferta">
												<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-3">Pérdida Parcial Daños y Hurto</a></strong>
											</h6>
									
											<div id="collapse-Bolivar1-2-3" class="collapse">
												<div class="card-body accordion-info">
													<span>* Deducible Unico : $ ${DeducibleBOLIVAR}</span>
												</div>
											</div>
										</div>
									
										<div class="card">
											<h6 class="card-title accordion-oferta">
												<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-4">Conductor elegido</a></strong>
											</h6>
									
											<div id="collapse-Bolivar1-2-4" class="collapse">
												<div class="card-body accordion-info">
													<span>* 10 CONDUCTORES POR VIGENCIA</span>
												</div>
											</div>
										</div>
									
										<div class="card">
											<h6 class="card-title accordion-oferta">
												<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-5">Servicio de Grúa</a></strong>
											</h6>
									
											<div id="collapse-Bolivar1-2-5" class="collapse">
												<div class="card-body accordion-info">
													<span>* Si</span>
												</div>
											</div>
										</div>
									
									</div>
					
									`;

													cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-4">
										<ul class="list-group">
											<li class="list-group-item">
												<span class="badge">* $ ${RCEBOLIVAR}</span>
												Responsabilidad Civil (RCE)
											</li>
											<li class="list-group-item">
												<span class="badge">* Cubrimiento ${PTDPTRBOLIVAR}</span>
												Pérdida Total Daños y Hurto
											</li>
											<li class="list-group-item">
												<span class="badge">* Deducible Unico : $ ${DeducibleBOLIVAR}</span>
												Pérdida Parcial Daños y Hurto
											</li>
											<li class="list-group-item">
												<span class="badge">* 10 Conductores por Vigencia</span>
												Conductor elegido
											</li>
											<li class="list-group-item">
												<span class="badge">* Si</span>
												Servicio de Grúa
											</li>
										</ul>
									</div>

									`;

															cardVerti += `
							<label>Mostrar PDF</label><br>
							<input type="radio" onclick='RegistroProducto4("Seguros Bolivar", \"${valorB1}\", "Premium", \"${Bolivarnum}\", "$" + "" + \"${RCEBOLIVAR}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR}\", " 10 CONDUCTORES POR VIGENCIA", "Si");'/>
								
						</div>
					</div>
				</div>
			`;

															cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaBolivar" onclick='seleccionarOferta("Seguros Bolivar", \"${valorB1}\", "Premium", \"${Bolivarnum}\", "$" + "" + \"${RCEBOLIVAR}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR}\", " 10 CONDUCTORES POR VIGENCIA", "Si", this);' />
									</div>
					
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaBolivar" onclick='recomendarOferta("Seguros Bolivar", \"${valorB1}\", "Premium", \"${Bolivarnum}\", "$" + "" + \"${RCEBOLIVAR}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR}\", " 10 CONDUCTORES POR VIGENCIA", "Si", this);' />
									</div>
												
								</div>
							</div>
						</div>

						`;

						RegistroProducto2("Seguros Bolivar", valorB1, "Premium", Bolivarnum, "$" + "" + RCEBOLIVAR, "Cubrimiento hasta " + "" + PTDPTRBOLIVAR, "Deducible Unico : $ " + "" + DeducibleBOLIVAR, " 10 CONDUCTORES POR VIGENCIA", "Si");
														
												}
													}
												}

												if (ValidarBolivar2 == undefined) {
													if (aniosAntiguedad <= 10) {
														var EfectivoBolivar2 = obj2.dataHeader.codRespuesta;
														if (EfectivoBolivar2 == 200) {
															var PrecioPrima2 = obj2.data.responseData.totalPrima;
															var valorB2 = formatNumber(PrecioPrima2);
															var Bolivarnum2 = obj2.data.responseData.numCotizacion;
															cardVerti += `
									<div class='col-sm-4'>
										<div class='card-ofertas'>
											<div class='card-body'>
												<img src='${imageurlbolivar}' style='width:auto;height:70px;' class='mb-2'><br/>
												<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>Seguros Bolivar - Estandar</h5>
												<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valorB2} </h5>
												<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
												
								`;

															cardHoriz += `
						<div class='col-md-12 col-xl-12'>
							<div class='card-ofertas2'>
								<div class='row card-body'>
				
									<div class="col-xs-12 col-sm-6 col-md-2">
										<img src='${imageurlbolivar}' style='width:auto;height:130px;' class='mb-2'>
									</div>
					
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
										<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>Seguros Bolivar - Estandar</h5>
										<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valorB2}</h5>
										<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
									</div>

									`;

															cardVerti += `
								<div class="accordion accordion-connected mb-3" id="accordion-Bolivar2-2">
								
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-1">Responsabilidad Civil (RCE)</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-1" class="collapse">
															<div class="card-body accordion-info">
																<span>* $ ${RCEBOLIVAR2}</span>
															</div>
														</div>
													</div>
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-2">Pérdida Total Daños y Hurto</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-2" class="collapse">
															<div class="card-body accordion-info">
																<span>* Cubrimiento  ${PTDPTRBOLIVAR2}</span>
															</div>
														</div>
													</div>
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-3">Pérdida Parcial Daños y Hurto</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-3" class="collapse">
															<div class="card-body accordion-info">
																<span>* Deducible Unico : $ ${DeducibleBOLIVAR2}</span>
															</div>
														</div>
													</div>
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-4">Conductor elegido</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-4" class="collapse">
															<div class="card-body accordion-info">
																<span>* 10 Conductores por Vigencia</span>
															</div>
														</div>
													</div>
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-5">Servicio de Grúa</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-5" class="collapse">
															<div class="card-body accordion-info">
																<span>* Si</span>
															</div>
														</div>
													</div>
												
												</div>
								
									`;

															cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-4">
										<ul class="list-group">
											<li class="list-group-item">
												<span class="badge">* $ ${RCEBOLIVAR2}</span>
												Responsabilidad Civil (RCE)
											</li>
											<li class="list-group-item">
												<span class="badge">* Cubrimiento ${PTDPTRBOLIVAR2}</span>
												Pérdida Total Daños y Hurto
											</li>
											<li class="list-group-item">
												<span class="badge">* Deducible Unico : $ ${DeducibleBOLIVAR2}</span>
												Pérdida Parcial Daños y Hurto
											</li>
											<li class="list-group-item">
												<span class="badge">* 10 Conductores por Vigencia</span>
												Conductor elegido
											</li>
											<li class="list-group-item">
												<span class="badge">* Si</span>
												Servicio de Grúa
											</li>
										</ul>
									</div>
		
									`;

															cardVerti += `
								<label>Mostrar PDF</label><br>
                                <input type="radio" onclick='RegistroProducto4("Seguros Bolivar", \"${valorB2}\", "Estandar", \"${Bolivarnum2}\", "$" + "" + \"${RCEBOLIVAR2}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR2}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR2}\", " 10 CONDUCTORES POR VIGENCIA", "Si");'/>
							</div>
						</div>
					</div>
				`;

															cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaBolivar2" onclick='seleccionarOferta("Seguros Bolivar", \"${valorB2}\", "Estandar", \"${Bolivarnum2}\", "$" + "" + \"${RCEBOLIVAR2}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR2}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR2}\", " 10 CONDUCTORES POR VIGENCIA", "Si", this);' />
									</div>
					
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaBolivar2" onclick='recomendarOferta("Seguros Bolivar", \"${valorB2}\", "Estandar", \"${Bolivarnum2}\", "$" + "" + \"${RCEBOLIVAR2}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR2}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR2}\", " 10 CONDUCTORES POR VIGENCIA", "Si", this);' />
									</div>
												
								</div>
							</div>
						</div>

						`;
						
						RegistroProducto2("Seguros Bolivar", valorB2, "Estandar", Bolivarnum2, "$" + "" + RCEBOLIVAR2, "Cubrimiento hasta " + "" + PTDPTRBOLIVAR2, "Deducible Unico : $" + "" + DeducibleBOLIVAR2, "10 Conductores por Vigencia", "Si");

														}

													}

												}

												if (myJson.AXA != null) {

													var jsonAXA = myJson.AXA;
													var infoBody = jsonAXA.BODY;
													var cotizaciones = infoBody.cotizaciones.cotizacion;

													var contador = 1;

													$.each(cotizaciones, function (key, cotizaItem) {

														console.log(contador);

														if (cotizaItem.RtaCotizacion == "Cotización exitosa.") {
															// Productos
															var producto = "";

															// Asistencias
															var asistencia = "";

															var coberturaID = "";

															var NumAxa = cotizaItem.Cotizacion.cotizacionId;

															if (cotizaItem.Cotizacion.contrato.cobertura.idCobertura == 10) {
																coberturaID = 10;
																asistencia += "Estandar";
															}
															else if (cotizaItem.Cotizacion.contrato.cobertura.idCobertura == 11) {
																coberturaID = 11;
																asistencia += "Plus";
															}
															else if (cotizaItem.Cotizacion.contrato.cobertura.idCobertura == 12) {
																coberturaID = 12;
																asistencia += "Esencial";
															} else if (cotizaItem.Cotizacion.contrato.cobertura.idCobertura == 29) {
																coberturaID = 29;
																asistencia += "Esencial";
															}

															if (coberturaID == 10 || coberturaID == 11 || coberturaID == 12) {
																var monto_vehiculo = cotizaItem.Cotizacion.contrato.Vehiculo.Monto.monto;
																var valor_prima = cotizaItem.ValorPrima;
																var gasto_expedicion = cotizaItem.GastosExpedicion;
																var impuesto = cotizaItem.Impuesto;
																var precioAxa = cotizaItem.ValorTotalPrima;
																var res = precioAxa.split(".");
																var valor_total_prima = formatNumber(res[0]);


																if (aniosAntiguedad <= 15) {
																	if (ClaseVehiculoAXA == "AUTOMOVILES" || ClaseVehiculoAXA == "CAMPEROS" || ClaseVehiculoAXA == "PICK UPS" || ClaseVehiculoAXA == "UTILITARIOS DEPORTIVOS" || ClaseVehiculoAXA == "VAN") {
																		if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 923) {
																			if (coberturaID == 11) {
																				producto += "Tradicional";

																				//card
																				cardVerti += `
											<div class='col-sm-4'>
												<div class='card-ofertas'>
													<div class='card-body'>
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
														<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
														<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
														
										`;

																				cardHoriz += `
								<div class='col-md-12 col-xl-12'>
									<div class='card-ofertas2'>
										<div class='row card-body'>
						
											<div class="col-xs-12 col-sm-6 col-md-2">
												<img src='${imageurlcopatria}' style='width:auto;height:130px;' class='mb-2'>
											</div>
							
											<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
												<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
												<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valor_total_prima}</h5>
												<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
											</div>
									`;

																				cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $1.800.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 90% </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible 10% - 1 SMMLV </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 6 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																				cardHoriz += `
											<div class="col-xs-12 col-sm-6 col-md-4">
												<ul class="list-group">
													<li class="list-group-item">
														<span class="badge">* $ 1.800.000.000</span>
														Responsabilidad Civil (RCE)
													</li>
													<li class="list-group-item">
														<span class="badge">* Cubrimiento 90%</span>
														Pérdida Total Daños y Hurto
													</li>
													<li class="list-group-item">
														<span class="badge">* Deducible 10% - 1 SMMLV</span>
														Pérdida Parcial Daños y Hurto
													</li>
													<li class="list-group-item">
														<span class="badge">* 6 Conductores por Vigencia</span>
														Conductor elegido
													</li>
													<li class="list-group-item">
														<span class="badge">* Si</span>
														Servicio de Grúa
													</li>
												</ul>
											</div>
											`;

																				cardVerti += `
																				
                                            <label>Mostrar PDF</label><br>
                                            <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$1.800.000.000", "Cubrimiento 90%", "Deducible 10% - 1 SMMLV", "6 Conductores por Vigencia", "Si");'/>
											</div>
										</div>
									</div>
									`;

																				cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaAXA" onclick='seleccionarOferta("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$1.800.000.000", "Cubrimiento 90%", "Deducible 10% - 1 SMMLV", "6 Conductores por Vigencia", "Si", this);' />
									</div>
					
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaAXA" onclick='recomendarOferta("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$1.800.000.000", "Cubrimiento 90%", "Deducible 10% - 1 SMMLV", "6 Conductores por Vigencia", "Si", this);' />
									</div>
												
								</div>
							</div>
						</div>
						`;

						RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$1.800.000.000", "Cubrimiento 90%", "Deducible 10% - 1 SMMLV", "6 Conductores por Vigencia", "Si");

																			}

																		}
																		else if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 927) {
																			producto += "VIP";
																			//cards
																			cardVerti += `
										<div class='col-sm-4'>
											<div class='card-ofertas'>
												<div class='card-body'>
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
													<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													
													<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
													<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
													
									`;

																			cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
								
													<div class="col-xs-12 col-sm-6 col-md-2">
														<img src='${imageurlcopatria}' style='width:auto;height:130px;' class='mb-2'>
													</div>
									
													<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
														<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valor_total_prima}</h5>
														<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
													</div>
													`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $1.800.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
													<div class="col-xs-12 col-sm-6 col-md-4">
														<ul class="list-group">
															<li class="list-group-item">
																<span class="badge">* $ 1.800.000.000</span>
																Responsabilidad Civil (RCE)
															</li>
															<li class="list-group-item">
																<span class="badge">* Cubrimiento </span>
																Pérdida Total Daños y Hurto
															</li>
															<li class="list-group-item">
																<span class="badge">* Deducible Unico : $ </span>
																Pérdida Parcial Daños y Hurto
															</li>
															<li class="list-group-item">
																<span class="badge">* 10 Conductores por Vigencia</span>
																Conductor elegido
															</li>
															<li class="list-group-item">
																<span class="badge">* Si</span>
																Servicio de Grúa
															</li>
														</ul>
													</div>
													`;

																			cardVerti += `
												
												<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
											</div>
										</div>
									</div>
									`;

																			cardHoriz += `
													<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
														<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
														<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaAXA2" onclick='seleccionarOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\", this);' />
													</div>
									
													<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
														<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
														<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaAXA2" onclick='recomendarOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\", this);' />
													</div>
																
												</div>
											</div>
										</div>
										`;
										
										RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$1.800.000.000", "Sin Información", "Sin Información", "Sin Información", "Sin Información");
										
																		}
																		else if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 928) {

																			if (coberturaID == 11) {																				
																				producto += "PLUS";
																				//cards
																				cardVerti += `
										<div class='col-sm-4'>
											<div class='card-ofertas'>
												<div class='card-body'>
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
													<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
													<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
													
									`;
																				cardHoriz += `
									<div class='col-md-12 col-xl-12'>
										<div class='card-ofertas2'>
											<div class='row card-body'>
							
												<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlcopatria}' style='width:auto;height:130px;' class='mb-2'>
												</div>
								
												<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
													<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valor_total_prima}</h5>
													<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
												</div>
												`;

																				cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $3.000.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 100%</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ 700.000</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 6 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																				cardHoriz += `
												<div class="col-xs-12 col-sm-6 col-md-4">
													<ul class="list-group">
														<li class="list-group-item">
															<span class="badge">* $ 3.000.000.000</span>
															Responsabilidad Civil (RCE)
														</li>
														<li class="list-group-item">
															<span class="badge">* Cubrimiento 100%</span>
															Pérdida Total Daños y Hurto
														</li>
														<li class="list-group-item">
															<span class="badge">* Deducible Unico : $ 700.000</span>
															Pérdida Parcial Daños y Hurto
														</li>
														<li class="list-group-item">
															<span class="badge">* 6 Conductores por Vigencia</span>
															Conductor elegido
														</li>
														<li class="list-group-item">
															<span class="badge">* Si</span>
															Servicio de Grúa
														</li>
													</ul>
												</div>
												`;

																				cardVerti += `
												
										<label>Mostrar PDF</label><br>
										<input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$3.000.000.000", "Cubrimiento 100%", "Deducible Unico : $ 700.000", "6 Conductores por Vigencia", "Si");'/>
																					</div>
																				</div>
																			</div>
																			`;

																				cardHoriz += `
												
												<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
													<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
													<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaAXA3" onclick='seleccionarOferta("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$3.000.000.000", "Cubrimiento 100%", "Deducible Unico : $ 700.000", "6 Conductores por Vigencia", "Si", this);' />
												</div>
								
												<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
													<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
													<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaAXA3" onclick='recomendarOferta("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$3.000.000.000", "Cubrimiento 100%", "Deducible Unico : $ 700.000", "6 Conductores por Vigencia", "Si", this);' />
												</div>
															
											</div>
										</div>
									</div>
									`;

									RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$3.000.000.000", "Cubrimiento 100%", "Deducible Unico : $ 700.000", "6 Conductores por Vigencia", "Si");

																			}

																		}

																	} else if (ClaseVehiculoAXA == "PESADO") {
																		if (aniosAntiguedad <= 5) {
																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE PESADOS
																			if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 500) {
																				producto += "PESADOS";
																				cardVerti += `
											<div class='col-sm-4'>
												<div class='card-ofertas'>
													<div class='card-body'>
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
														<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
														<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
														
										`;

																				cardHoriz += `
											<div class='col-md-12 col-xl-12'>
												<div class='card-ofertas2'>
													<div class='row card-body'>
														<div class="col-xs-12 col-sm-6 col-md-2">
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
														</div>
														<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
															<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
															
															<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
															<p class='titulo-Precio'><strong>Precio</strong></p>
														</div>
														
										`;

																				cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																				cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $ </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																				cardVerti += `
													
													<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto} ${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
												</div>
											</div>
										</div>
										`;

																				cardHoriz += `
													
												<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
													<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto} ${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
												</div>
											</div>
										</div>
									</div>
									`;
																				RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$0", "Sin Información", "Sin Información", "Sin Información", "Sin Información");
																			}
																		}

																	} else if (ClaseVehiculoAXA == "MOTOCICLETA") {

																		if (aniosAntiguedad <= 3) {
																			producto += "Esencial";
																			cardVerti += `
										<div class='col-sm-4'>
											<div class='card-ofertas'>
												<div class='card-body'>
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
													<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													
													<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
													<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
													
									`;

																			cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
													<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
													</div>
													<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
														<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
														<p class='titulo-Precio'><strong>Precio</strong></p>
													</div>
													
									`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ 600.000.000</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>80% Cubrimiento </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : No Cubre </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $600.000.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No cubre </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																			cardVerti += `
												
												<button type='button' class='btn btn-elegir-oferta'>ELEGIR</button>
											</div>
										</div>
									</div>
									`;

																			cardHoriz += `
												
											<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
												<button type='button' class='btn btn-elegir-oferta'>ELEGIR</button>
											</div>
										</div>
									</div>
								</div>
								`;

																			RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$600.000.000", "80%", "No Cubre", "No Cubre", "Si");
																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE MOTO
																			if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 501) {
																				//producto += "ESENCIAL";
																				//cards
																			}
																		}
																		else if (aniosAntiguedad > 3 && aniosAntiguedad <= 5) {
																			producto += "Plus";


																			cardVerti += `
											<div class='col-sm-4'>
												<div class='card-ofertas'>
													<div class='card-body'>
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
														<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
														<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
														
										`;

																			cardHoriz += `
											<div class='col-md-12 col-xl-12'>
												<div class='card-ofertas2'>
													<div class='row card-body'>
														<div class="col-xs-12 col-sm-6 col-md-2">
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
														</div>
														<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
															<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
															
															<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
															<p class='titulo-Precio'><strong>Precio</strong></p>
														</div>
										`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $600.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $600.000.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : 15% - $36.400.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																			cardVerti += `
													<button type='button' class='btn btn-elegir-oferta'>ELEGIR</button>
												</div>
											</div>
										</div>
										`;

																			cardHoriz += `
												<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
													<button type='button' class='btn btn-elegir-oferta'>ELEGIR</button>
												</div>
											</div>
										</div>
									</div>
									`;

																			RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$600.000.000", "80%", "Deducible Unico : 15% - $36.400.000", "No Cubre", "Si");


																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE MOTO
																			if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 502) {
																				//
																				//cards
																			}
																		}
																	}

																} else if (aniosAntiguedad > 15 && aniosAntiguedad <= 25) {
																	if (ClaseVehiculoAXA == "AUTOMOVILES" || ClaseVehiculoAXA == "CAMPEROS" || ClaseVehiculoAXA == "PICK UPS" || ClaseVehiculoAXA == "UTILITARIOS DEPORTIVOS" || ClaseVehiculoAXA == "VAN") {
																		if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 929) {
																			if (coberturaID == 12) {
																				producto += "Esencial";

																				cardVerti += `
												<div class='col-sm-4'>
													<div class='card-ofertas'>
														<div class='card-body'>
															<img src='${imageurlaxa}' style='width:auto;height:70px;' class='mb-2'><br/>
															<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
															
															<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
															<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
											`;


																				cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
													<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlaxa}' style='width:auto;height:70px;' class='mb-2'>
													</div>
													<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
														<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
														<p class='titulo-Precio'><strong>Precio</strong></p>
													</div>
									`;

																				cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ 880.000.000</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 100%</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : 10% - 1SMMLV</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																				cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $ 880.000.000</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 100%</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : 10% - 1SMMLV</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																				cardVerti += `
												
												<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
											</div>
										</div>
									</div>
									`;

																				cardHoriz += `
												<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
													<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
												</div>
											</div>
										</div>
									</div>
									`;

																				RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$880.000.000", "Cubrimiento 100%", "Deducible Unico : 10% - 1SMMLV", "10 Conductores por Vigencia", "Si");

																			}

																			//CARDS

																		}
																	}
																}

															} else if (coberturaID == 29) {
																var monto_vehiculo = cotizaItem.Cotizacion.contrato.Vehiculo.Monto.monto;
																var valor_prima = cotizaItem.ValorPrima;
																var gasto_expedicion = cotizaItem.GastosExpedicion;
																var impuesto = cotizaItem.Impuesto;
																var precioAxa = cotizaItem.ValorTotalPrima;
																var res = precioAxa.split(".");
																var valor_total_prima = formatNumber(res[0]);


																if (ClaseVehiculoAXA == "MOTOCICLETA") {

																	if (aniosAntiguedad <= 3) {
																		if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 972) {
																			producto += "Esencial";
																			cardVerti += `
									<div class='col-sm-4'>
										<div class='card-ofertas'>
											<div class='card-body'>
												<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
												<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
												
												<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
												<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
												
								`;

																			cardHoriz += `
									<div class='col-md-12 col-xl-12'>
										<div class='card-ofertas2'>
											<div class='row card-body'>

											<div class="col-xs-12 col-sm-6 col-md-2">
												<img src='${imageurlcopatria}' style='width:auto;height:130px;' class='mb-2'>
											</div>

											<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
												<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
												<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valor_total_prima}</h5>
												<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
											</div>
											`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ 600.000.000</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* No Cubre </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
													<div class="col-xs-12 col-sm-6 col-md-4">
														<ul class="list-group">
															<li class="list-group-item">
																<span class="badge">* $ 600.000.000</span>
																Responsabilidad Civil (RCE)
															</li>
															<li class="list-group-item">
																<span class="badge">* 80%</span>
																Pérdida Total Daños y Hurto
															</li>
															<li class="list-group-item">
																<span class="badge">* No Cubre</span>
																Pérdida Parcial Daños y Hurto
															</li>
															<li class="list-group-item">
																<span class="badge">* No</span>
																Conductor elegido
															</li>
															<li class="list-group-item">
																<span class="badge">* Si</span>
																Servicio de Grúa
															</li>
														</ul>
													</div>
													`;

																			cardVerti += `
											
											<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
										</div>
									</div>
								</div>
								`;

																			cardHoriz += `
													<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
														<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
														<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaAXA4" onclick='seleccionarOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\", this);' />
													</div>
									
													<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
														<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
														<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaAXA4" onclick='recomendarOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\", this);' />
													</div>
													
												</div>
											</div>
										</div>
										`;

										RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$600.000.000", "80%", "No Cubre", "No Cubre", "Si");
																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE MOTO

																			//producto += "ESENCIAL";
																			//cards
																		}

																	}
																	else if (aniosAntiguedad > 3 && aniosAntiguedad <= 5) {
																		if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 997) {
																			producto += "Plus";


																			cardVerti += `
										<div class='col-sm-4'>
											<div class='card-ofertas'>
												<div class='card-body'>
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
													<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													
													<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde ${valor_total_prima} </h5>
													<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
													
									`;

																			cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>

												<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlcopatria}' style='width:auto;height:130px;' class='mb-2'>
												</div>

												<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
													<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valor_total_prima}</h5>
													<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
												</div>
												`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ 600.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 15% - $ 36.400.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
												<div class="col-xs-12 col-sm-6 col-md-4">
													<ul class="list-group">
														<li class="list-group-item">
															<span class="badge">* $ 600.000.000</span>
															Responsabilidad Civil (RCE)
														</li>
														<li class="list-group-item">
															<span class="badge">* 80%</span>
															Pérdida Total Daños y Hurto
														</li>
														<li class="list-group-item">
															<span class="badge">* 15% - $36.400.000</span>
															Pérdida Parcial Daños y Hurto
														</li>
														<li class="list-group-item">
															<span class="badge">* No</span>
															Conductor elegido
														</li>
														<li class="list-group-item">
															<span class="badge">* Si</span>
															Servicio de Grúa
														</li>
													</ul>
												</div>
												`;

																			cardVerti += `
												<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
											</div>
										</div>
									</div>
									`;

																			cardHoriz += `
												<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
													<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
													<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaAXA5" onclick='seleccionarOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\", this);' />
												</div>
								
												<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
													<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
													<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaAXA5" onclick='recomendarOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto}.${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\", this);' />
												</div>
												
											</div>
										</div>
									</div>
									`;

									RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$600.000.000", "80%", "15% - $36.400.000", "No Cubre", "Si");

																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE MOTO

																			//cards
																		}
																	}
																}

															}

														}
														contador++;
													});

												}

												if (myJson.HDI != null && myJson.HDI != '0' && myJson.HDI != 0 && myJson.HDI != '136' && myJson.HDI != 136 && myJson.HDI != '130' && myJson.HDI != 130) {

													var precioHDI = myJson.HDI;

													var res = precioHDI.split(".");

													var valorH2 = formatNumber(res[0]);


													cardVerti += `
							<div class='col-sm-4'>
								<div class='card-ofertas'>
									<div class='card-body'>
										<img src='${imageurlhdi}' style='width:auto;height:70px;' class='mb-2'><br/>
										<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>HDI Seguros</h5>
										<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valorH2} </h5>
										<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
										
						`;

													cardHoriz += `
							<div class='col-md-12 col-xl-12'>
								<div class='card-ofertas2'>
									<div class='row card-body'>

									<div class="col-xs-12 col-sm-6 col-md-2">
										<img src='${imageurlhdi}' style='width:auto;height:130px;' class='mb-2'>
									</div>

									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
										<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>HDI Seguros</h5>
										<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${valorH2}</h5>
										<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
									</div>
									`;

													cardVerti += `
						<div class="accordion accordion-connected mb-3" id="accordion-HDI-3">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-1">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-1" class="collapse">
													<div class="card-body accordion-info">
														<span>* $ 4.000.000.000</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-2">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-2" class="collapse">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-3">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-3" class="collapse">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : $ 800.000</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-4">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-4" class="collapse">
													<div class="card-body accordion-info">
														<span>* 5 Conductores por vigencia</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-5">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-5" class="collapse">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>
										
										</div>
						
										`;

													cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-4">
										<ul class="list-group">
											<li class="list-group-item">
												<span class="badge">* $ 4.000.000.000</span>
												Responsabilidad Civil (RCE)
											</li>
											<li class="list-group-item">
												<span class="badge">* Cubrimiento al 100%</span>
												Pérdida Total Daños y Hurto
											</li>
											<li class="list-group-item">
												<span class="badge">* Deducible Unico : $ 800.000</span>
												Pérdida Parcial Daños y Hurto
											</li>
											<li class="list-group-item">
												<span class="badge">* 5 Conductores por Vigencia</span>
												Conductor elegido
											</li>
											<li class="list-group-item">
												<span class="badge">* Si</span>
												Servicio de Grúa
											</li>
										</ul>
									</div>
									`;

													cardVerti += `
						<label>Mostrar PDF</label><br>
                        <input type="radio" onclick='RegistroProducto4("HDI Seguros", \"${precioHDI}\", "HDI -Automovil Familiar", "No Tiene", "$4.000.000.000","Cubrimiento al 100%", "Deducible Unico : $ 800.000", "5 Conductores por Vigencia", "Si");'/>
					</div>
				</div>
			</div>
		`;

													cardHoriz += `
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaHDI" onclick='seleccionarOferta("HDI Seguros", \"${precioHDI}\", "HDI -Automovil Familiar", "No Tiene", "$4.000.000.000","Cubrimiento al 100%", "Deducible Unico : $ 800.000", "5 Conductores por Vigencia", "Si", this);' />
									</div>
					
									<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
										<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
										<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaHDI" onclick='recomendarOferta("HDI Seguros", \"${precioHDI}\", "HDI -Automovil Familiar", "No Tiene", "$4.000.000.000","Cubrimiento al 100%", "Deducible Unico : $ 800.000", "5 Conductores por Vigencia", "Si", this);' />
									</div>
												
								</div>
							</div>
						</div>
						`;

						RegistroProducto2("HDI Seguros", precioHDI, "HDI -Automovil Familiar", "No Tiene", "$4.000.000.000", "Cubrimiento al 100%", "Deducible Unico : $ 800.000", "5 Conductores por Vigencia", "Si");

												}

												var numCollap = 1;

												//Genera un encabezado con datos generales del producto (Logo, precios , financiacion... etc)
												document.getElementById("FormularioFinal").style.display = "none";
												document.getElementById("Resumenfinalcotizaciones").style.display = "block";

												$('#cardVertical').html(cardVerti);
												$('#cardHorizontal').html(cardHoriz);

												CotizarSBS();

											});

									}
								}
							}
						}
					}
				}
			}
		}
	}



}



function cotizarSeguroVeh2() {

    $('#loaderOferta').html(`<img src="${loadingurl}" width="34" height="34"><strong> Enviando solicitud...</strong>`);

	var TipoIdentificacion = document.getElementById("TipoDocumentoAsegurado").value;
	var NumeroIdentificacion = document.getElementById("txtNoDocumento").value;
	var Nombre = document.getElementById("txtNombres").value;
	var Apellido1 = document.getElementById("txtApellidos").value;
	var Apellido2 = "";
	//var Apellido2 = document.getElementById("txtApellidos2").value;
	var Genero = document.getElementById("genero").value;
	var dia = document.getElementById("dianacimiento").value;
	var mes = document.getElementById("mesnacimiento").value;
	var anio = document.getElementById("anionacimiento").value;
	var FechaNacimiento = dia + "/" + mes + "/" + anio;

	//var FechaNacimiento = document.getElementById("txtFechaNac").value;


	var estadoCivil = document.getElementById("estadoCivil").value;
	var direcAsegurado = document.getElementById("DireccionResidencia").value;
	var emailAsegurado = "tecnologia@grupoasistencia.com";
	var celAsegurado = "3183551472";
	var fasecoldaVeh = document.getElementById("txtFasecolda").value;
	var modeloVeh = document.getElementById("txtModeloVeh").value;
	var tipoPlaca = document.getElementById("txtTipoPlaca").value;
	var placaVeh2 = document.getElementById("txtValPlaca").value;
	var placaVeh = ""
	var placaVeh3 = ""
	if (placaVeh2 == "" || placaVeh2 == " ") {
		placaVeh = "CAT770";
		var newplaca = document.getElementById("cerokmsi2").value;
		placaVeh3 = newplaca;
	} else {
		placaVeh = placaVeh2;
		placaVeh3 = placaVeh2;
	}

	var CodigoMarca = document.getElementById("CodigoMarca").value;
	var CodgigoLinea = document.getElementById("CodgigoLinea").value;
	var ClaseVehiculo = document.getElementById("ClaseVehiculo").value;
	var CoberturaEstado = document.getElementById("CoberturaEstado").value;
	var LimiteRC = document.getElementById("LimiteRC").value;
	var ValorAccesorios = document.getElementById("ValorAccesorios").value;
	var ValorAsegurado = document.getElementById("txtValorVehFasec").value;
	var ClaseVehiculoAXA = document.getElementById("txtClaseVeh").value;
	var DepartamentoCirculacion = document.getElementById("ciudad_circulacion").value;
	var CiudadCirculacionBolivar = document.getElementById("txtCiudadCirculacVeh2").value;
	var CiudadCirculacionBolivar2 = "";

	var Contar = CiudadCirculacionBolivar.length;

	if (Contar == 4) {
		CiudadCirculacionBolivar2 = "0" + CiudadCirculacionBolivar;
	} else if (Contar == 3) {
		CiudadCirculacionBolivar2 = "00" + CiudadCirculacionBolivar;
	} else {
		CiudadCirculacionBolivar2 = CiudadCirculacionBolivar;
	}



	//VARIABLESPARA ENVIO DE CORREO
	var marcaVeh = document.getElementById("txtMarcaVeh").value;
	var referenciaVeh2 = document.getElementById("txtReferenciaVeh2").value;

	var today = new Date();
	var year = today.getFullYear();

	var aniosAntiguedad = year - modeloVeh;

	if (NumeroIdentificacion !== '') {
		if (Nombre !== '') {
			if (Apellido1 !== '') {
				if (dia !== '') {
					if (mes !== '') {
						if (anio !== '') {
							if (emailAsegurado !== '') {
								if (celAsegurado !== '') {
									if (Genero !== '') {
										//RegistroVehiculo();

										/*$.ajax({
											url: "https://www.grupoasistencia.com/autogestionpdf/src/emailAsesor.php",
											type: "POST",
											data: {
												placaVeh: placaVeh3, fasecoldaVeh: fasecoldaVeh, modeloVeh: modeloVeh, marcaVeh: marcaVeh, referenciaVeh2: referenciaVeh2,
												ciudadCirculacVeh: CiudadCirculacionBolivar2, departCirculacVeh: DepartamentoCirculacion, numDocAsegurado: NumeroIdentificacion,
												apellAsegurado: Apellido1, nomAsegurado: Nombre, fechaNacimiento: FechaNacimiento, emailAsegurado: emailAsegurado,
												celAsegurado: celAsegurado, pdfComparativo: "falta.php"
											},
											success: function (data) {
												console.log("Correo del Asesor, enviado Exitosamente");

												// Recibimos la cadena que contiene el Codigo de Cotizacion y la separamos por el (-) dejando unicamente el codigo de la oferta.
												var cotizacion = data.split("-");
												var codCotizacion = cotizacion[1];
												document.getElementById('emailAsesorSeleccionado').value = cotizacion[2];

												$.ajax({
													url: "https://www.grupoasistencia.com/autogestionpdf/src/emailUsuario.php",
													type: "POST",
													data: {
														placaVeh: placaVeh3, fasecoldaVeh: fasecoldaVeh, modeloVeh: modeloVeh, marcaVeh: marcaVeh, referenciaVeh2: referenciaVeh2,
														ciudadCirculacVeh: CiudadCirculacionBolivar2, departCirculacVeh: DepartamentoCirculacion, numDocAsegurado: NumeroIdentificacion,
														apellAsegurado: Apellido1, nomAsegurado: Nombre, fechaNacimiento: FechaNacimiento, emailAsegurado: emailAsegurado,
														celAsegurado: celAsegurado, pdfComparativo: "falta.php", codCotizacion: codCotizacion
													},
													success: function (data) {
														console.log("Correo del Usuario, enviado Exitosamente");



													},
													error: function (data) {
														console.log("El envio de correo del Usuario, ha Fallado.");
													}
												});

												// Cargamos un Input Oculto en la interfaz que contiene el Codigo de Cotizacion asignado a la cotizacion realizada. 
												$('#inputCodCotizacion').html("<input type='hidden' class='form-control' name='codCotizacion' id='txtCodCotizacion' value='" + codCotizacion + "'>");

											},
											error: function (data) {
												console.log("El envio de correo del Asesor, ha Fallado.");
											}
										});*/

										$('#loaderOferta').html(`<img src="${loadingurlupdate}" width="34" height="34"><strong> Consultando Ofertas...</strong>`);

										var myHeaders = new Headers();
										myHeaders.append("Content-Type", "application/json");

										var raw = JSON.stringify({ "TipoIdentificacion": TipoIdentificacion, "NumeroIdentificacion": NumeroIdentificacion, "Nombre": Nombre, "Apellido": Apellido1, "Genero": Genero, "FechaNacimiento": FechaNacimiento, "EstadoCivil": estadoCivil, "NumeroTelefono": celAsegurado, "Direccion": direcAsegurado, "Email": emailAsegurado, "ZonaCirculacion": DepartamentoCirculacion, "Placa": placaVeh, "CodigoMarca": CodigoMarca, "CodgigoLinea": CodgigoLinea, "ClaseVehiculo": ClaseVehiculo, "CodigoFasecolda": fasecoldaVeh, "Modelo": modeloVeh, "ValorAsegurado": ValorAsegurado, "Cobertura": CoberturaEstado, "LimiteRC": LimiteRC, "ValorAccesorios": ValorAccesorios, "ceroKm": "false", "CiudadBolivar": CiudadCirculacionBolivar2, "ServicioVehiculoAXA": tipoPlaca, "CodigoVerificacion": "0", "Apellido2": Apellido2, "AniosSiniestro": "0", "AniosAsegurados": "0", "NivelEducativo": "4", "Estrato": "3" });

										var requestOptions = {
											method: 'POST',
											headers: myHeaders,
											body: raw,
											redirect: 'follow'
										};

										fetch("https://www.grupoasistencia.com/webserviceAutos/Cotizar", requestOptions)
										// fetch("ofertas.json")
											.then(function (response) {
												return response.json();
											})
											.then(function (myJson) {
												var jsonComparativo = myJson;
												var cardVerti = "";
												var cardHoriz = "";
												//console.log(myJson);
												//console.log(myJson.AXA);
												//console.log(myJson.HDI);

												RegistroPaso();


												var EfectivoEstado = myJson.EStado.Success;
												var EfectivoEstado2 = myJson.EStado2.Success;

												//var EfectivoSBS = myJson.SBS.Mensaje_Validacion;

												var EfectivoBolivar1 = myJson.BOLIVAR.Bolivar1;
												var BolivarLimpi = EfectivoBolivar1.replace(/\\/g, "");
												var obj = JSON.parse(BolivarLimpi);

												var EfectivoBolivar2 = myJson.BOLIVAR.Bolivar2;
												var BolivarLimpi2 = EfectivoBolivar2.replace(/\\/g, "");
												var obj2 = JSON.parse(BolivarLimpi2);

												//console.log(obj);

												var ValidarBolivar = obj.message;
												var ValidarBolivar2 = obj2.message;

												//infomracion de bolivar
												var RCEBOLIVAR = "";
												var PTDPTRBOLIVAR = "";
												var DeducibleBOLIVAR = "";

												var RCEBOLIVAR2 = "";
												var PTDPTRBOLIVAR2 = "";
												var DeducibleBOLIVAR2 = "";

												if (aniosAntiguedad <= 5) {
													RCEBOLIVAR = "4.000.000.000";
													PTDPTRBOLIVAR = "100%";
													DeducibleBOLIVAR = "800.000";

													RCEBOLIVAR2 = "2.200.000.000";
													PTDPTRBOLIVAR2 = "100%";
													DeducibleBOLIVAR2 = "975.000";


												} else {
													RCEBOLIVAR = "4.000.000.000";
													PTDPTRBOLIVAR = "10% 1SMMLV";
													DeducibleBOLIVAR = "800.000";

													RCEBOLIVAR2 = "4.000.000.000";
													PTDPTRBOLIVAR2 = "10% 1SMMLV";
													DeducibleBOLIVAR2 = "975.000";
												}

												if (EfectivoEstado2 == true) {

													var ValorCotizacion = myJson.EStado2.Data.Attributes[1];
													var valorFinal = ValorCotizacion.Valor;
													var valor = formatNumber(valorFinal);
													var numcot = myJson.EStado2.Data.DocumentId;
													cardVerti += `
							<div class='col-sm-4'>
								<div class='card-ofertas'>
									<div class='card-body'>
										<img src='${imageurlestado}' style='width:auto;height:70px;' class='mb-2'><br/>
										<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>Seguros del Estado</h5>
										<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor} </h5>
										<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
						`;
													cardHoriz += `
							<div class='col-md-12 col-xl-12'>
								<div class='card-ofertas2'>
									<div class='row card-body'>
										<div class="col-xs-12 col-sm-6 col-md-2">
										<img src='${imageurlestado}' style='width:auto;height:70px;' class='mb-2'>
										</div>
										<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
											<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>Seguros del Estado</h5>
											<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor}</h5>
											<p class='titulo-Precio'><strong>Precio</strong></p>
										</div>
						`;

													cardVerti += `
						<div class="accordion accordion-connected mb-3" id="accordion-Estado-3">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-1">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-1" class="collapse">
													<div class="card-body accordion-info">
														<span>* $1.000.000.0000</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-2">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-2" class="collapse">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-3">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-3" class="collapse">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : 10% 1 SMMLV</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-4">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-4" class="collapse">
													<div class="card-body accordion-info">
														<span>* Ilimitados por Vigencia</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-3" href="#collapse-Estado-3-5">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-Estado-3-5" class="collapse">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>
										
										</div>
						
										`;

													cardHoriz += `
				<div class="col-xs-12 col-sm-6 col-md-4">									
											<div class="accordion accordion-connected" id="accordion-Estado-4">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-4" href="#collapse-Estado-4-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-Estado-4-1" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* $1.000.000.000</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-4" href="#collapse-Estado-4-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-4-2" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-4" href="#collapse-Estado-4-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-4-3" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : 10% 1 SMMLV</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-4" href="#collapse-Estado-4-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-Estado-4-4" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Ilimitados por Vigencia</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-4" href="#collapse-Estado-4-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-Estado-4-5" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>									
										
												</div>
											</div>
			

										`;







													cardVerti += `
													<label>Mostrar PDF</label><br>
													<input type="radio" onclick='RegistroProducto4("Seguros del Estado", \"${valor}\", "Estado -Automovil Familiar Full", \"${numcot}\, "$1.000.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si");'/> 
					</div>
				</div>
			</div>
		`;

													cardHoriz += `
													<label>Mostrar PDF</label><br>
							<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
							<input type="radio" onclick='RegistroProducto4("Seguros del Estado", \"${valor}\", "Estado -Automovil Familiar Full", \"${numcot}\, "$1.000.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si");'/>
							</div>
						</div>
					</div>
				</div>
		`;

													RegistroProducto2("Seguros del Estado", valor, "Estado -Automovil Familiar Full", numcot, "$1.000.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si");
												}

												if (ValidarBolivar == undefined) {
													if (aniosAntiguedad <= 10) {
														var EfectivoBolivar = obj.dataHeader.codRespuesta;

														if (EfectivoBolivar == 200) {
															var PrecioPrima = obj.data.responseData.totalPrima;
															var valorB1 = formatNumber(PrecioPrima);
															var Bolivarnum = obj.data.responseData.numCotizacion;

															cardVerti += `
								<div class='col-sm-4'>
									<div class='card-ofertas'>
										<div class='card-body'>
											<img src='${imageurlbolivar}' style='width:auto;height:70px;' class='mb-2'><br/>
											<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>Seguros Bolivar - Premium</h5>
											<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valorB1} </h5>
											<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
											
							`;

															cardHoriz += `
								<div class='col-md-12 col-xl-12'>
									<div class='card-ofertas2'>
										<div class='row card-body'>
											<div class="col-xs-12 col-sm-6 col-md-2">
											<img src='${imageurlbolivar}' style='width:auto;height:70px;' class='mb-2'>
											</div>
											<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
												<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>Seguros Bolivar - Premium</h5>
												<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valorB1}</h5>
												<p class='titulo-Precio'><strong>Precio</strong></p>
											</div>
							`;

															cardVerti += `
							<div class="accordion accordion-connected mb-3" id="accordion-Bolivar1-2">
							
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-1">Responsabilidad Civil (RCE)</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-2-1" class="collapse">
														<div class="card-body accordion-info">
															<span>* $ ${RCEBOLIVAR}</span>
														</div>
													</div>
												</div>
											
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-2">Pérdida Total Daños y Hurto</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-2-2" class="collapse">
														<div class="card-body accordion-info">
															<span>* Cubrimiento  ${PTDPTRBOLIVAR}</span>
														</div>
													</div>
												</div>
											
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-3">Pérdida Parcial Daños y Hurto</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-2-3" class="collapse">
														<div class="card-body accordion-info">
															<span>* Deducible Unico : $ ${DeducibleBOLIVAR}</span>
														</div>
													</div>
												</div>
											
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-4">Conductor elegido</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-2-4" class="collapse">
														<div class="card-body accordion-info">
															<span>* 10 CONDUCTORES POR VIGENCIA</span>
														</div>
													</div>
												</div>
											
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-2" href="#collapse-Bolivar1-2-5">Servicio de Grúa</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-2-5" class="collapse">
														<div class="card-body accordion-info">
															<span>* Si</span>
														</div>
													</div>
												</div>
											
											</div>
							
											`;

															cardHoriz += `
					<div class="col-xs-12 col-sm-6 col-md-4">									
												<div class="accordion accordion-connected" id="accordion-Bolivar1-1">
							
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-1" href="#collapse-Bolivar1-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-1-1" class="collapse" style="">
														<div class="card-body accordion-info">
															<span>* $ ${RCEBOLIVAR}</span>
														</div>
													</div>
												</div>									
											
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-1" href="#collapse-Bolivar1-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-1-2" class="collapse" style="">
														<div class="card-body accordion-info">
															<span>* Cubrimiento ${PTDPTRBOLIVAR}</span>
														</div>
													</div>
												</div>									
											
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-1" href="#collapse-Bolivar1-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-1-3" class="collapse" style="">
														<div class="card-body accordion-info">
															<span>* Deducible Unico : $ ${DeducibleBOLIVAR}</span>
														</div>
													</div>
												</div>									
											
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-1" href="#collapse-Bolivar1-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-1-4" class="collapse" style="">
														<div class="card-body accordion-info">
															<span>* 10 CONDUCTORES POR VIGENCIA</span>
														</div>
													</div>
												</div>									
											
												<div class="card">
													<h6 class="card-title accordion-oferta">
														<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar1-1" href="#collapse-Bolivar1-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
													</h6>
											
													<div id="collapse-Bolivar1-1-5" class="collapse" style="">
														<div class="card-body accordion-info">
															<span>* Si</span>
														</div>
													</div>
												</div>									
											
													</div>
												</div>
				
	
											`;

															cardVerti += `
							<label>Mostrar PDF</label><br>
							<input type="radio" onclick='RegistroProducto4("Seguros Bolivar", \"${valorB1}\", "Premium", \"${Bolivarnum}\", "$" + "" + \"${RCEBOLIVAR}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR}\", " 10 CONDUCTORES POR VIGENCIA", "Si");'/>
								
						</div>
					</div>
				</div>
			`;

															cardHoriz += `
								<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
								<label>Mostrar PDF</label><br>
								<input type="radio" onclick='RegistroProducto4("Seguros Bolivar", \"${valorB1}\", "Premium", \"${Bolivarnum}\", "$" + "" + \"${RCEBOLIVAR}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR}\", " 10 CONDUCTORES POR VIGENCIA", "Si");'/>
								</div>
							</div>
						</div>
					</div>
			`;
															RegistroProducto2("Seguros Bolivar", valorB1, "Premium", Bolivarnum, "$" + "" + RCEBOLIVAR, "Cubrimiento hasta " + "" + PTDPTRBOLIVAR, "Deducible Unico : $ " + "" + DeducibleBOLIVAR, " 10 CONDUCTORES POR VIGENCIA", "Si");
														}
													}
												} else {

												}

												if (ValidarBolivar2 == undefined) {
													if (aniosAntiguedad <= 10) {
														var EfectivoBolivar2 = obj2.dataHeader.codRespuesta;
														if (EfectivoBolivar2 == 200) {
															var PrecioPrima2 = obj2.data.responseData.totalPrima;
															var valorB2 = formatNumber(PrecioPrima2);
															var Bolivarnum2 = obj2.data.responseData.numCotizacion;
															cardVerti += `
									<div class='col-sm-4'>
										<div class='card-ofertas'>
											<div class='card-body'>
												<img src='${imageurlbolivar}' style='width:auto;height:70px;' class='mb-2'><br/>
												<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>Seguros Bolivar - Estandar</h5>
												<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valorB2} </h5>
												<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
												
								`;

															cardHoriz += `
									<div class='col-md-12 col-xl-12'>
										<div class='card-ofertas2'>
											<div class='row card-body'>
												<div class="col-xs-12 col-sm-6 col-md-2">
												<img src='${imageurlbolivar}' style='width:auto;height:70px;' class='mb-2'>
												</div>
												<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
													<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>Seguros Bolivar - Estandar</h5>
													<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valorB2}</h5>
													<p class='titulo-Precio'><strong>Precio</strong></p>
												</div>
												
								`;

															cardVerti += `
								<div class="accordion accordion-connected mb-3" id="accordion-Bolivar2-2">
								
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-1">Responsabilidad Civil (RCE)</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-1" class="collapse">
															<div class="card-body accordion-info">
																<span>* $ ${RCEBOLIVAR2}</span>
															</div>
														</div>
													</div>
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-2">Pérdida Total Daños y Hurto</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-2" class="collapse">
															<div class="card-body accordion-info">
																<span>* Cubrimiento  ${PTDPTRBOLIVAR2}</span>
															</div>
														</div>
													</div>
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-3">Pérdida Parcial Daños y Hurto</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-3" class="collapse">
															<div class="card-body accordion-info">
																<span>* Deducible Unico : $ ${DeducibleBOLIVAR2}</span>
															</div>
														</div>
													</div>
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-4">Conductor elegido</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-4" class="collapse">
															<div class="card-body accordion-info">
																<span>* 10 Conductores por Vigencia</span>
															</div>
														</div>
													</div>
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-2" href="#collapse-Bolivar2-2-5">Servicio de Grúa</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-2-5" class="collapse">
															<div class="card-body accordion-info">
																<span>* Si</span>
															</div>
														</div>
													</div>
												
												</div>
								
												`;

															cardHoriz += `
						<div class="col-xs-12 col-sm-6 col-md-4">									
													<div class="accordion accordion-connected" id="accordion-Bolivar2-1">
								
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-1" href="#collapse-Bolivar2-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-1-1" class="collapse" style="">
															<div class="card-body accordion-info">
																<span>* $ ${RCEBOLIVAR2}</span>
															</div>
														</div>
													</div>									
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-1" href="#collapse-Bolivar2-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-1-2" class="collapse" style="">
															<div class="card-body accordion-info">
																<span>* Cubrimiento ${PTDPTRBOLIVAR2}</span>
															</div>
														</div>
													</div>									
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-1" href="#collapse-Bolivar2-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-1-3" class="collapse" style="">
															<div class="card-body accordion-info">
																<span>* Deducible Unico : $ ${DeducibleBOLIVAR2}</span>
															</div>
														</div>
													</div>									
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-1" href="#collapse-Bolivar2-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-1-4" class="collapse" style="">
															<div class="card-body accordion-info">
																<span>* 10 Conductores por Vigencia</span>
															</div>
														</div>
													</div>									
												
													<div class="card">
														<h6 class="card-title accordion-oferta">
															<strong><a data-toggle="collapse" data-parent="#accordion-Bolivar2-1" href="#collapse-Bolivar2-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
														</h6>
												
														<div id="collapse-Bolivar2-1-5" class="collapse" style="">
															<div class="card-body accordion-info">
																<span>* Si</span>
															</div>
														</div>
													</div>									
												
														</div>
													</div>
					
		
												`;

															cardVerti += `
															<label>Mostrar PDF</label><br>
							<input type="radio" onclick='RegistroProducto4("Seguros Bolivar", \"${valorB2}\", "Premium", \"${Bolivarnum2}\", "$" + "" + \"${RCEBOLIVAR2}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR2}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR2}\", " 10 CONDUCTORES POR VIGENCIA", "Si");'/>
							
							</div>
						</div>
					</div>
				`;

															cardHoriz += `
										
									<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
									
																		<label>Mostrar PDF</label><br>
							<input type="radio" onclick='RegistroProducto4("Seguros Bolivar", \"${valorB2}\", "Premium", \"${Bolivarnum2}\", "$" + "" + \"${RCEBOLIVAR2}\", "Cubrimiento hasta " + "" + \"${PTDPTRBOLIVAR2}\", "Deducible Unico : $ " + "" + \"${DeducibleBOLIVAR2}\", " 10 CONDUCTORES POR VIGENCIA", "Si");'/>
						
									</div>
								</div>
							</div>
						</div>
				`;
															RegistroProducto2("Seguros Bolivar", valorB2, "Estandar", Bolivarnum2, "$" + "" + RCEBOLIVAR2, "Cubrimiento hasta " + "" + PTDPTRBOLIVAR2, "Deducible Unico : $" + "" + DeducibleBOLIVAR2, "10 Conductores por Vigencia", "Si");

														}

													}

												} else {

												}

												if (myJson.AXA != null) {

													var jsonAXA = myJson.AXA;
													var infoBody = jsonAXA.BODY;
													var cotizaciones = infoBody.cotizaciones.cotizacion;

													var contador = 1;

													$.each(cotizaciones, function (key, cotizaItem) {

														console.log(contador);

														if (cotizaItem.RtaCotizacion == "Cotización exitosa.") {
															// Productos
															var producto = "";

															// Asistencias
															var asistencia = "";

															var coberturaID = "";

															var NumAxa = cotizaItem.Cotizacion.cotizacionId;

															if (cotizaItem.Cotizacion.contrato.cobertura.idCobertura == 10) {
																coberturaID = 10;
																asistencia += "Estandar";
															}
															else if (cotizaItem.Cotizacion.contrato.cobertura.idCobertura == 11) {
																coberturaID = 11;
																asistencia += "Plus";
															}
															else if (cotizaItem.Cotizacion.contrato.cobertura.idCobertura == 12) {
																coberturaID = 12;
																asistencia += "Esencial";
															} else if (cotizaItem.Cotizacion.contrato.cobertura.idCobertura == 29) {
																coberturaID = 29;
																asistencia += "Esencial";
															}

															if (coberturaID == 10 || coberturaID == 11 || coberturaID == 12) {
																var monto_vehiculo = cotizaItem.Cotizacion.contrato.Vehiculo.Monto.monto;
																var valor_prima = cotizaItem.ValorPrima;
																var gasto_expedicion = cotizaItem.GastosExpedicion;
																var impuesto = cotizaItem.Impuesto;
																var precioAxa = cotizaItem.ValorTotalPrima;
																var res = precioAxa.split(".");
																var valor_total_prima = formatNumber(res[0]);


																if (aniosAntiguedad <= 15) {
																	if (ClaseVehiculoAXA == "AUTOMOVILES" || ClaseVehiculoAXA == "CAMPEROS" || ClaseVehiculoAXA == "PICK UPS" || ClaseVehiculoAXA == "UTILITARIOS DEPORTIVOS" || ClaseVehiculoAXA == "VAN") {
																		if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 923) {
																			if (coberturaID == 11) {
																				producto += "Tradicional";

																				//card
																				cardVerti += `
											<div class='col-sm-4'>
												<div class='card-ofertas'>
													<div class='card-body'>
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
														<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
														<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
														
										`;

																				cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
													<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
													</div>
													<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
														<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
														<p class='titulo-Precio'><strong>Precio</strong></p>
													</div>
									`;

																				cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $1.800.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 90% </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible 10% - 1 SMMLV </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 6 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																				cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $ 1.800.000.000</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 90%</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible 10% - 1 SMMLV </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 6 Conductores por Vigencia</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;




                                                                    

																				cardVerti += `
																				<label>Mostrar PDF</label><br>
						<input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$1.800.000.000", "Cubrimiento 90%", "Deducible 10% - 1 SMMLV", "6 Conductores por Vigencia", "Si");'/>
					</div>
										</div>
									</div>
									`;

																				cardHoriz += `
											<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
												<label>Mostrar PDF</label><br>
						<input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$1.800.000.000", "Cubrimiento 90%", "Deducible 10% - 1 SMMLV", "6 Conductores por Vigencia", "Si");'/>
																		</div>
										</div>
									</div>
								</div>
								`;

																				RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$1.800.000.000", "Cubrimiento 90%", "Deducible 10% - 1 SMMLV", "6 Conductores por Vigencia", "Si");

																			}




																		}
																		else if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 927) {
																			producto += "VIP";
																			//cards
																			cardVerti += `
										<div class='col-sm-4'>
											<div class='card-ofertas'>
												<div class='card-body'>
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
													<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													
													<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
													<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
													
									`;

																			cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
													<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
													</div>
													<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
														<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
														<p class='titulo-Precio'><strong>Precio</strong></p>
													</div>
												
									`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $1.800.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $1.800.000.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																			cardVerti += `
																			<label>Mostrar PDF</label><br>
						<input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$1.800.000.000", "Sin Información", "Sin Información", "Sin Información", "Sin Información");'/>
						
												</div>
										</div>
									</div>
									`;

																			cardHoriz += `
												
											<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
											<label>Mostrar PDF</label><br>
						<input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$1.800.000.000", "Sin Información", "Sin Información", "Sin Información", "Sin Información");'/>
						
											</div>
										</div>
									</div>
								</div>
								`;
																			RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$1.800.000.000", "Sin Información", "Sin Información", "Sin Información", "Sin Información");
																		}
																		else if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 928) {
																			if (coberturaID == 11) {
																				producto += "PLUS";
																				//cards
																				cardVerti += `
										<div class='col-sm-4'>
											<div class='card-ofertas'>
												<div class='card-body'>
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
													<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
													<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
													
									`;
																				cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
													<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
													</div>
													<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
														<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
														<p class='titulo-Precio'><strong>Precio</strong></p>
													</div>
													
									`;

																				cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $3.000.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 100%</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ 700.000</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 6 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																				cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $ 3.000.000.000</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 100%</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ 700.000</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 6 Conductores por Vigencia</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																				cardVerti += `
												<label>Mostrar PDF</label><br>
						<input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$3.000.000.000", "Cubrimiento 100%", "Deducible Unico : $ 700.000", "6 Conductores por Vigencia", "Si");'/>
											</div>
										</div>
									</div>
									`;

																				cardHoriz += `
												
											<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
																	<label>Mostrar PDF</label><br>
						<input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$3.000.000.000", "Cubrimiento 100%", "Deducible Unico : $ 700.000", "6 Conductores por Vigencia", "Si");'/>
						
											
											</div>
										</div>
									</div>
								</div>
								`;

																				RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$3.000.000.000", "Cubrimiento 100%", "Deducible Unico : $ 700.000", "6 Conductores por Vigencia", "Si");

																			}
																		}
																	 } else if (ClaseVehiculoAXA == "PESADO") {
																		if (aniosAntiguedad <= 5) {
																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE PESADOS
																			if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 500) {
																				producto += "PESADOS";
																				cardVerti += `
											<div class='col-sm-4'>
												<div class='card-ofertas'>
													<div class='card-body'>
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
														<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
														<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
														
										`;

																				cardHoriz += `
											<div class='col-md-12 col-xl-12'>
												<div class='card-ofertas2'>
													<div class='row card-body'>
														<div class="col-xs-12 col-sm-6 col-md-2">
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
														</div>
														<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
															<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
															
															<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
															<p class='titulo-Precio'><strong>Precio</strong></p>
														</div>
														
										`;

																				cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																				cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $ </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																				cardVerti += `
													
																		<label>Mostrar PDF</label><br>
						                                                <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$0", "Sin Información", "Sin Información", "Sin Información", "Sin Información");'/>
						
												</div>
											</div>
										</div>
										`;

																				cardHoriz += `
													
												<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
												<label>Mostrar PDF</label><br>
						                                                <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$0", "Sin Información", "Sin Información", "Sin Información", "Sin Información");'/>
						
												
												</div>
											</div>
										</div>
									</div>
									`;
																				RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$0", "Sin Información", "Sin Información", "Sin Información", "Sin Información");
																			}
																		}

																	} else if (ClaseVehiculoAXA == "MOTOCICLETA") {

																		if (aniosAntiguedad <= 3) {
																			producto += "Esencial";
																			cardVerti += `
										<div class='col-sm-4'>
											<div class='card-ofertas'>
												<div class='card-body'>
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
													<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													
													<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
													<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
													
									`;

																			cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
													<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
													</div>
													<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
														<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
														<p class='titulo-Precio'><strong>Precio</strong></p>
													</div>
													
									`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ 600.000.000</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>80% Cubrimiento </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : No Cubre </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $600.000.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No cubre </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																			cardVerti += `
												<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$600.000.000", "80%", "No Cubre", "No Cubre", "Si");'/>
						
											</div>
										</div>
									</div>
									`;

																			cardHoriz += `
												
											<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
												
																		<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$600.000.000", "80%", "No Cubre", "No Cubre", "Si");'/>
						
												
											</div>
										</div>
									</div>
								</div>
								`;

																			RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$600.000.000", "80%", "No Cubre", "No Cubre", "Si");
																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE MOTO
																			if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 501) {
																				//producto += "ESENCIAL";
																				//cards
																			}
																		}
																		else if (aniosAntiguedad > 3 && aniosAntiguedad <= 5) {
																			producto += "Plus";


																			cardVerti += `
											<div class='col-sm-4'>
												<div class='card-ofertas'>
													<div class='card-body'>
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
														<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
														<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
														
										`;

																			cardHoriz += `
											<div class='col-md-12 col-xl-12'>
												<div class='card-ofertas2'>
													<div class='row card-body'>
														<div class="col-xs-12 col-sm-6 col-md-2">
														<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
														</div>
														<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
															<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
															
															<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
															<p class='titulo-Precio'><strong>Precio</strong></p>
														</div>
										`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $600.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : $ </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $600.000.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : 15% - $36.400.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																			cardVerti += `
													
																			<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$600.000.000", "80%", "Deducible Unico : 15% - $36.400.000", "No Cubre", "Si");'/>
						
												</div>
											</div>
										</div>
										`;

																			cardHoriz += `
												<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
													
																			<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$600.000.000", "80%", "Deducible Unico : 15% - $36.400.000", "No Cubre", "Si");'/>
						
												</div>
											</div>
										</div>
									</div>
									`;

																			RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$600.000.000", "80%", "Deducible Unico : 15% - $36.400.000", "No Cubre", "Si");


																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE MOTO
																			if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 502) {
																				//
																				//cards
																			}
																		}
																	}

																} else if (aniosAntiguedad > 15 && aniosAntiguedad <= 25) {
																	if (ClaseVehiculoAXA == "AUTOMOVILES" || ClaseVehiculoAXA == "CAMPEROS" || ClaseVehiculoAXA == "PICK UPS" || ClaseVehiculoAXA == "UTILITARIOS DEPORTIVOS" || ClaseVehiculoAXA == "VAN") {
																		if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 929) {
																			if (coberturaID == 12) {
																				producto += "Esencial";

																				cardVerti += `
												<div class='col-sm-4'>
													<div class='card-ofertas'>
														<div class='card-body'>
															<img src='${imageurlaxa}' style='width:auto;height:70px;' class='mb-2'><br/>
															<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
															
															<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
															<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
											`;


																				cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
													<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlaxa}' style='width:auto;height:70px;' class='mb-2'>
													</div>
													<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
														<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
														<p class='titulo-Precio'><strong>Precio</strong></p>
													</div>
									`;

																				cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ 880.000.000</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 100%</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : 10% - 1SMMLV</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																				cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $ 880.000.000</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Cubrimiento 100%</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Deducible Unico : 10% - 1SMMLV</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 10 Conductores por Vigencia</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																				cardVerti += `
												
												<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$880.000.000", "Cubrimiento 100%", "Deducible Unico : 10% - 1SMMLV", "10 Conductores por Vigencia", "Si");'/>
						
											
											</div>
										</div>
									</div>
									`;

																				cardHoriz += `
												<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
												<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$880.000.000", "Cubrimiento 100%", "Deducible Unico : 10% - 1SMMLV", "10 Conductores por Vigencia", "Si");'/>
						
												</div>
											</div>
										</div>
									</div>
									`;

																				RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$880.000.000", "Cubrimiento 100%", "Deducible Unico : 10% - 1SMMLV", "10 Conductores por Vigencia", "Si");

																			}


																			//CARDS






																		}
																	}
																}


															} else if (coberturaID == 29) {
																var monto_vehiculo = cotizaItem.Cotizacion.contrato.Vehiculo.Monto.monto;
																var valor_prima = cotizaItem.ValorPrima;
																var gasto_expedicion = cotizaItem.GastosExpedicion;
																var impuesto = cotizaItem.Impuesto;
																var precioAxa = cotizaItem.ValorTotalPrima;
																var res = precioAxa.split(".");
																var valor_total_prima = formatNumber(res[0]);


																if (ClaseVehiculoAXA == "MOTOCICLETA") {

																	if (aniosAntiguedad <= 3) {
																		if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 972) {
																			producto += "Esencial";
																			cardVerti += `
									<div class='col-sm-4'>
										<div class='card-ofertas'>
											<div class='card-body'>
												<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
												<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
												
												<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valor_total_prima} </h5>
												<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
												
								`;

																			cardHoriz += `
									<div class='col-md-12 col-xl-12'>
										<div class='card-ofertas2'>
											<div class='row card-body'>
												<div class="col-xs-12 col-sm-6 col-md-2">
												<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
												</div>
												<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
													<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													
													<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valor_total_prima}</h5>
													<p class='titulo-Precio'><strong>Precio</strong></p>
												</div>
												
								`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ 600.000.000</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* No Cubre </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $ 600.000.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No Cubre </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																			cardVerti += `
											
											<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto} ${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
										<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$600.000.000", "80%", "No Cubre", "No Cubre", "Si");'/>
						
										</div>
									</div>
								</div>
								`;

																			cardHoriz += `
											
										<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
											<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$600.000.000", "80%", "No Cubre", "No Cubre", "Si");'/>
						
											<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"Axa Colpatria\", \"${valor_total_prima}\", \"${producto} ${contador}\", \"${ValorAsegurado}\", \"15 dias\", \"Prueba final\",\"${NumAxa}\")'>ELEGIR</button>
										</div>
									</div>
								</div>
							</div>
							`;

																			RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$600.000.000", "80%", "No Cubre", "No Cubre", "Si");
																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE MOTO

																			//producto += "ESENCIAL";
																			//cards
																		}
																	}
																	else if (aniosAntiguedad > 3 && aniosAntiguedad <= 5) {
																		if (cotizaItem.Cotizacion.subProducto.producto.identificacionProducto.idProducto == 997) {
																			producto += "Plus";


																			cardVerti += `
										<div class='col-sm-4'>
											<div class='card-ofertas'>
												<div class='card-body'>
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'><br/>
													<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
													
													<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde ${valor_total_prima} </h5>
													<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
													
									`;

																			cardHoriz += `
										<div class='col-md-12 col-xl-12'>
											<div class='card-ofertas2'>
												<div class='row card-body'>
													<div class="col-xs-12 col-sm-6 col-md-2">
													<img src='${imageurlcopatria}' style='width:auto;height:70px;' class='mb-2'>
													</div>
													<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
														<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>AXA Colpatria - ${producto}</h5>
														
														<h5 class='mb-0' style='font-weight:500;'>Desde ${valor_total_prima}</h5>
														<p class='titulo-Precio'><strong>Precio</strong></p>
													</div>
									`;

																			cardVerti += `
									<div class="accordion accordion-connected mb-3" id="accordion-Colpatria${contador}-2">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-1">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-1" class="collapse">
																<div class="card-body accordion-info">
																	<span>* $ 600.000.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-2">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-2" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-3">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-3" class="collapse">
																<div class="card-body accordion-info">
																	<span>* 15% - $ 36.400.000 </span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-4">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-4" class="collapse">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-2" href="#collapse-Colpatria${contador}-2-5">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-2-5" class="collapse">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>
													
													</div>
									
													`;

																			cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-4">									
														<div class="accordion accordion-connected" id="accordion-Colpatria${contador}-1">
									
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-1" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* $ 600.000.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-2" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 80% </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-3" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* 15% - $36.400.000 </span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-4" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* No</span>
																</div>
															</div>
														</div>									
													
														<div class="card">
															<h6 class="card-title accordion-oferta">
																<strong><a data-toggle="collapse" data-parent="#accordion-Colpatria${contador}-1" href="#collapse-Colpatria${contador}-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
															</h6>
													
															<div id="collapse-Colpatria${contador}-1-5" class="collapse" style="">
																<div class="card-body accordion-info">
																	<span>* Si</span>
																</div>
															</div>
														</div>									
													
															</div>
														</div>
						
			
													`;

																			cardVerti += `
																<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$600.000.000", "80%", "15% - $36.400.000", "No Cubre", "Si");'/>
						
											</div>
										</div>
									</div>
									`;

																			cardHoriz += `
											<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
																<label>Mostrar PDF</label><br>
						                        <input type="radio" onclick='RegistroProducto4("Axa Colpatria", \"${valor_total_prima}\", \"${producto}\", \"${NumAxa}\", "$600.000.000", "80%", "15% - $36.400.000", "No Cubre", "Si");'/>
						
											</div>
										</div>
									</div>
								</div>
								`;

																			RegistroProducto2("Axa Colpatria", valor_total_prima, producto, NumAxa, "$600.000.000", "80%", "15% - $36.400.000", "No Cubre", "Si");


																			//VALIDAR CON AXA COLPATRIA LOS CODIGOS DE MOTO

																			//
																			//cards
																		}
																	}
																}


															}


														}

														contador++;
													});

												}


												if (myJson.HDI != null && myJson.HDI != '0' && myJson.HDI != 0 && myJson.HDI != '136' && myJson.HDI != 136 && myJson.HDI != '130' && myJson.HDI != 130) {

													var precioHDI = myJson.HDI;

													var res = precioHDI.split(".");

													var valorH2 = formatNumber(res[0]);


													cardVerti += `
							<div class='col-sm-4'>
								<div class='card-ofertas'>
									<div class='card-body'>
										<img src='${imageurlhdi}' style='width:auto;height:70px;' class='mb-2'><br/>
										<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>HDI Seguros</h5>
										<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valorH2} </h5>
										<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
										
						`;

													cardHoriz += `
							<div class='col-md-12 col-xl-12'>
								<div class='card-ofertas2'>
									<div class='row card-body'>
										<div class="col-xs-12 col-sm-6 col-md-2">
										<img src='${imageurlhdi}' style='width:auto;height:70px;' class='mb-2'>
										</div>
										<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
											<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>HDI Seguros</h5>
											<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valorH2}</h5>
											<p class='titulo-Precio'><strong>Precio</strong></p>
										</div>
										
						`;

													cardVerti += `
						<div class="accordion accordion-connected mb-3" id="accordion-HDI-3">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-1">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-1" class="collapse">
													<div class="card-body accordion-info">
														<span>* $ 4.000.000.000</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-2">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-2" class="collapse">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-3">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-3" class="collapse">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : $ 800.000</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-4">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-4" class="collapse">
													<div class="card-body accordion-info">
														<span>* 5 Conductores por vigencia</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-3" href="#collapse-HDI-3-5">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-HDI-3-5" class="collapse">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>
										
										</div>
						
										`;

													cardHoriz += `
				<div class="col-xs-12 col-sm-6 col-md-4">									
											<div class="accordion accordion-connected" id="accordion-HDI-20">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-20" href="#collapse-HDI-20-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-HDI-20-1" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* $ 4.000.000.000</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-20" href="#collapse-HDI-20-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-HDI-20-2" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-20" href="#collapse-HDI-20-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-HDI-20-3" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : $ 800.000</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-20" href="#collapse-HDI-20-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-HDI-20-4" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* 5 Conductores por Vigencia</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-HDI-20" href="#collapse-HDI-20-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-HDI-20-5" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>									
										
												</div>
											</div>
			

										`;

													cardVerti += `
						
												<label>Mostrar PDF</label><br>
                            <input type="radio" onclick='RegistroProducto4("HDI Seguros", \"${precioHDI}\", "HDI -Automovil Familiar", "No Tiene", "$" + "$4.000.000.000", "Cubrimiento al 100%", "Deducible Unico : $ 800.000", "5 Conductores por Vigencia", "Si");'/>

					</div>
				</div>
			</div>
		`;

													cardHoriz += `
								
							<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
							<label>Mostrar PDF</label><br>
                            <input type="radio" onclick='RegistroProducto4("HDI Seguros", \"${precioHDI}\", "HDI -Automovil Familiar", "No Tiene", "$" + "$4.000.000.000", "Cubrimiento al 100%", "Deducible Unico : $ 800.000", "5 Conductores por Vigencia", "Si");'/>
							</div>
						</div>
					</div>
				</div>
		`;

													RegistroProducto2("HDI Seguros", precioHDI, "HDI -Automovil Familiar", "No Tiene", "$4.000.000.000", "Cubrimiento al 100%", "Deducible Unico : $ 800.000", "5 Conductores por Vigencia", "Si");

												}

												if (EfectivoEstado == true) {

													var ValorCotizacion = myJson.EStado.Data.Attributes[1];
													var valorFinal = ValorCotizacion.Valor;
													var valorE2 = formatNumber(valorFinal);
													var numcot = myJson.EStado.Data.DocumentId;
													cardVerti += `
							<div class='col-sm-4'>
								<div class='card-ofertas'>
									<div class='card-body'>
										<img src='${imageurlestado}' style='width:auto;height:70px;' class='mb-2'><br/>
										<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>Seguros del Estado</h5>
										<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${valorE2} </h5>
										<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
						`;
													cardHoriz += `
							<div class='col-md-12 col-xl-12'>
								<div class='card-ofertas2'>
									<div class='row card-body'>
										<div class="col-xs-12 col-sm-6 col-md-2">
										<img src='${imageurlestado}' style='width:auto;height:70px;' class='mb-2'>
										</div>
										<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
											<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>Seguros del Estado</h5>
											<h5 class='mb-0' style='font-weight:500;'>Desde $ ${valorE2}</h5>
											<p class='titulo-Precio'><strong>Precio</strong></p>
										</div>
						`;

													cardVerti += `
						<div class="accordion accordion-connected mb-3" id="accordion-Estado-2">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-1">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-1" class="collapse">
													<div class="card-body accordion-info">
														<span>* $500.000.000</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-2">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-2" class="collapse">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-3">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-3" class="collapse">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : 10% 1 SMMLV</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-4">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-4" class="collapse">
													<div class="card-body accordion-info">
														<span>* Ilimitados por Vigencia</span>
													</div>
												</div>
											</div>
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-2" href="#collapse-Estado-2-5">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-Estado-2-5" class="collapse">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>
										
										</div>
						
										`;

													cardHoriz += `
				<div class="col-xs-12 col-sm-6 col-md-4">									
											<div class="accordion accordion-connected" id="accordion-Estado-1">
						
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-1" href="#collapse-Estado-1-1" class="collapsed" aria-expanded="false">Responsabilidad Civil (RCE)</a></strong>
												</h6>
										
												<div id="collapse-Estado-1-1" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* $500.000.000</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-1" href="#collapse-Estado-1-2" class="collapsed" aria-expanded="false">Pérdida Total Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-1-2" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Cubrimiento al 100%</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-1" href="#collapse-Estado-1-3" class="collapsed" aria-expanded="false">Pérdida Parcial Daños y Hurto</a></strong>
												</h6>
										
												<div id="collapse-Estado-1-3" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Deducible Unico : 10% 1 SMMLV</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-1" href="#collapse-Estado-1-4" class="collapsed" aria-expanded="false">Conductor elegido</a></strong>
												</h6>
										
												<div id="collapse-Estado-1-4" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Ilimitados por Vigencia</span>
													</div>
												</div>
											</div>									
										
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-Estado-1" href="#collapse-Estado-1-5" class="collapsed" aria-expanded="false">Servicio de Grúa</a></strong>
												</h6>
										
												<div id="collapse-Estado-1-5" class="collapse" style="">
													<div class="card-body accordion-info">
														<span>* Si</span>
													</div>
												</div>
											</div>									
										
												</div>
											</div>
			

										`;







													cardVerti += `
					 <input type="radio" onclick='RegistroProducto4("Seguros del Estado", \"${valorE2}\", "Estado -Automovil Familiar", \"${numcot}\, "$500.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si");'/>
					</div>
				</div>
			</div>
		`;

													cardHoriz += `
							<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
								 <input type="radio" onclick='RegistroProducto4("Seguros del Estado", \"${valorE2}\", "Estado -Automovil Familiar", \"${numcot}\, "$500.000.000", "Cubrimiento al 100%", "Deducible Unico : 10% 1 SMMLV", "Ilimitados por Vigencia", "Si");'/>
					        </div>
						</div>
					</div>
				</div>
		`;

													RegistroProducto2("Seguros del Estado", valorE2, "Estado -Automovil Familiar", numcot, "$500.000.000", "Cubrimiento al 100%", "Deducible Unico : 10%  - 1 SMMLV", "Ilimitados por Vigencia", "Si");
												}


												var numCollap = 1;

												//Genera un encabezado con datos generales del producto (Logo, precios , financiacion... etc)
												document.getElementById("FormularioFinal").style.display = "none";
												document.getElementById("Resumenfinalcotizaciones").style.display = "block";

												document.getElementById("cardHorizontal").style.display = "block";
												document.getElementById("cardHorizontal2").style.display = "block";

												document.getElementById("cardVertical").style.display = "block";
												document.getElementById("cardVertical2").style.display = "block";


												$('#cardVertical').html(cardVerti);
												$('#cardHorizontal').html(cardHoriz);


												CotizarSBS();

											});

									}
								}
							}
						}
					}
				}
			}
		}
	}

}


// Consultar y Visualizar el comparativo de Ofertas segun cotizacion.
function comparativoCard() {

	$.ajax({
		url: document.getElementById('txtUrlJsonOfertas').value,
		type: "GET",
		dataType: "json",
		success: function (data) {


			console.log(data);

			var respuesta = data;
			var products = respuesta.products; //Cotizaciones generadas		
			var attribute_groups = respuesta.attribute_groups; // Grupo de Atributos generales
			console.log(respuesta);

			var cardVerti = "";
			var cardHoriz = "";
			var numAccordVerti = 3;
			var numAccordHoriz = 20;
			var numCollap = 1;

			//Genera un encabezado con datos generales del producto (Logo, precios , financiacion... etc)
			$.each(products, function (id_product, product) {

				if (product.price != "$0") {

					if (product.manufacturer != "Sura") {

						cardVerti += `
							<div class='col-sm-4'>
								<div class='card-ofertas'>
									<div class='card-body'>
										<img src='${product.thumb}' style='width:auto;height:70px;' class='mb-2'><br/>
										<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>${product.name}</h5>
										<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde ${product.price}</h5>
										<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
										<div class="accordion accordion-connected mb-3" id="accordion-${numAccordVerti}">
						`;

						cardHoriz += `
							<div class='col-md-12 col-xl-12'>
								<div class='card-ofertas2'>
									<div class='row card-body'>
										<div class="col-xs-12 col-sm-6 col-md-2">
											<img src='${product.thumb}' class='img-logo-card mb-2'>
										</div>
										<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
											<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>${product.name}</h5>
											<h5 class='mb-0' style='font-weight:500;'>Desde ${product.price}</h5>
											<p class='titulo-Precio'><strong>Precio</strong></p>
										</div>
										<div class="col-xs-12 col-sm-6 col-md-4">									
											<div class="accordion accordion-connected" id="accordion-${numAccordHoriz}">
						`;

						// Asignamos un nuevo valor a la variable, en este caso renombramos el item del Json		
						// attribute_groups[8].attribute[20].name = "Deducible ante Pago de RC";
						attribute_groups[8].attribute[21].name = "Responsabilidad Civil (RCE)";
						// attribute_groups[8].attribute[26].name = "Asistencia Jurídica";
						attribute_groups[9].attribute[28].name = "Pérdida Total Daños y Hurto";
						attribute_groups[9].attribute[29].name = "Pérdida Parcial Daños y Hurto";
						// 	attribute_groups[13].attribute[56].name = "Conductor Elegido";
						attribute_groups[13].attribute[57].name = "Servicio de Grúa";

						$.each(attribute_groups, function (i, attribute_group) {

							if (attribute_group.name != "Garantías de Movilidad" && attribute_group.name != "Valores Agregados") {

								//i = codigo de grupo
								//compareCard += "<h4 class='card-title'>" + attribute_group.name + "</h4>"; //attribute_group.name = nombre grupo
								attributes = attribute_group.attribute; //Obtengo los descriptivos de cada grupo (atributos)

								//Recorre para obtener Categoria o atributos (grupo)
								$.each(attributes, function (id, attribute_name) {

									if (attribute_name.name != "Deducible ante pago de Responsabilidad Civil" && attribute_name.name != "Asistencia jurídica procesos penales/civiles" &&
										attribute_name.name != "Límite para daños a bienes de terceros " && attribute_name.name != "Límite para lesiones o muerte a una persona" &&
										attribute_name.name != "Límite para lesiones o muerte a dos o más personas" && attribute_name.name != "Responsabilidad civil en  exceso" &&
										attribute_name.name != "Deducible Pérdida Total Hurto" && attribute_name.name != "Deducible Pérdida Parcial Hurto" &&
										attribute_name.name != "Eventos de la naturaleza como temblor, terremoto " && attribute_name.name != "Amparo patrimonial" &&
										attribute_name.name != "Revisión antes de viaje" && attribute_name.name != "Carro-Taller para despinchada, envío gasolina, cerrajería o batería" &&
										attribute_name.name != "Transporte o Custodia del Vehículo reparado o recuperado" && attribute_name.name != "Asesoria telefónica y/o en sitio de abogado en caso de accidente") {

										//id = codigo de atributo de grupo (categoria)
										//attribute_name.name = nombre de atributo de grupo (categoria)
										cardVerti += `
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-${numAccordVerti}" href="#collapse-${numAccordVerti}-${numCollap}">${attribute_name.name}</a></strong>
												</h6>
										`;

										cardHoriz += `
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-${numAccordHoriz}" href="#collapse-${numAccordHoriz}-${numCollap}">${attribute_name.name}</a></strong>
												</h6>
										`;

										//id_product = codigo de cada cotizacion
										//product.attribute = Descripcion de cotizacion (atributos de cotizacion)
										product_attributes = product.attribute;
										descripcion = product_attributes[id];

										if (typeof (descripcion) == "undefined") {
											descripcion = "";
										}
										cardVerti += `
												<div id="collapse-${numAccordVerti}-${numCollap}" class="collapse">
													<div class="card-body accordion-info">
														<span>* ${descripcion}</span>
													</div>
												</div>
											</div>
										`;

										cardHoriz += `
												<div id="collapse-${numAccordHoriz}-${numCollap}" class="collapse">
													<div class="card-body accordion-info">
														<span>* ${descripcion}</span>
													</div>
												</div>
											</div>									
										`;

										numCollap++;
									}

								});

							}

						});
						cardVerti += `
										</div>
										 <label>Mostrar PDF</label><br>
										<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"${product.manufacturer}\", \"${product.price}\", \"${product.name}\", \"${product.valor_asegurado}\", \"${product.vigencia_cotizacion}\", \"${product.thumb}\")'>ELEGIR</button>
									</div>
								</div>
							</div>
						`;

						cardHoriz += `
												</div>
											</div>
											<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
												<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"${product.manufacturer}\", \"${product.price}\", \"${product.name}\", \"${product.valor_asegurado}\", \"${product.vigencia_cotizacion}\", \"${product.thumb}\")'>ELEGIR</button>
											</div>
										</div>
									</div>
								</div>
						`;

						numAccordVerti++;
						numAccordHoriz++;
						numCollap = 1;

					}

				}

			});
			$('#cardVertical').html(cardVerti);
			$('#cardHorizontal').html(cardHoriz);



			// Recorremos el Array oferas y creamos uno nuevo solo con los que tengan la propiedad de codigoRecotizar
			var estado = $.map(products, function (codigo) {
				if (codigo.hasOwnProperty('codigoRecotizar')) {
					return codigo;
				}
			});

			if (estado.length > 0) {

				var codRecotizar = "";
				codRecotizar += "<div class='row conten-recotizar'><div class='col-xs-12 col-sm-12 col-md-3'><h5>Recotizar:</h5></div>";
				// Se recorre el Array para obtener el Codigo de Recotizacion de las Ofertas.
				$.each(products, function (i, codigo) {
					if (codigo.hasOwnProperty('codigoRecotizar')) {
						codRecotizar += "<div class='col-xs-12 col-sm-6 col-md-3'><button type='button' class='btn btn-recotizar' id='txtRecot" + codigo.manufacturer + "' value='" + codigo.codigoRecotizar + "' onclick='recotizarOferta(" + codigo.codigoRecotizar + ")'>" + codigo.manufacturer + " Seguros</button></div>";
					}
				});
				codRecotizar += "</div>";

				$('#contenRecotizarOferta').html(codRecotizar);
			}
			else {
				$('#contenRecotizarOferta').html("");
			}




		},
		error: function (data) {
			console.log("El comparativo de Ofertas Card ha Fallado.");
		}
	});

}


//Detiene la funcion de que actuaiza el commparativo y visualiza mensaje de finalizacion. 
function detenerUpdateComparativo() {
	// Deteniendo el setInterval "comparativoCard"
	clearTimeout(updateComparativo);
	$('#loaderOferta').html('<p style="padding-top:8px; font-weight:400;">ACTUALIZACION FINALIZADA</p>');
	$('#tiempEstimCotizac').html('');
}


// Envia un correo de confirmacion que se selecciono una oferta e specifico del comparativo presentado.
function elegirOferta(aseguradora, precio, producto, valoraseg, vigencia_cotizacion, logo, numero) {

	var codCotizacion = document.getElementById("txtCodCotizacion").value;
	var placaVeh = document.getElementById("txtValPlaca").value;
	var placaVe2 = "";
	var nomAsegurado = document.getElementById("txtNombres").value;
	var apellAsegurado = document.getElementById("txtApellidos").value;
	var emailAsegurado = document.getElementById("txtEmail").value;
	var emailAsesor = document.getElementById("emailAsesorSeleccionado").value;
	var celAsegurado = document.getElementById("txtCelular").value;

	if (placaVeh == "") {
		var newplaca = document.getElementById("cerokmsi2").value;
		var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Seleccion de oferta", bit_accion: "Seleccionó una oferta", placa: newplaca };
		$.ajax({
			url: "https://www.grupoasistencia.com/autogestionpdf/src/insertBitacoraTR.php",
			type: "POST",
			data: { info: infoJson }
		});

	} else {
		var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Seleccion de oferta", bit_accion: "Seleccionó una oferta", placa: placaVeh };
		$.ajax({
			url: "https://www.grupoasistencia.com/autogestionpdf/src/insertBitacoraTR.php",
			type: "POST",
			data: { info: infoJson }
		});

	}


	if (placaVeh == "") {
		var newplaca = document.getElementById("cerokmsi2").value;
		placaVe2 = newplaca;
	} else {
		placaVe2 = placaVeh;
	}


	RegistroProducto(aseguradora, precio, producto, numero);


	document.getElementById("idImgLoader").style.display = "inherit";
	document.getElementById("idImgLoader").style.visibility = "visible";
	$("#idImgLoader").fadeIn(200);

	$.ajax({
		url: "https://www.grupoasistencia.com/autogestionpdf/src/emailOfertaElegida.php",
		type: "POST",
		data: {
			codCotizacion: codCotizacion, placaVeh: placaVe2, nomAsegurado: nomAsegurado, apellAsegurado: apellAsegurado, emailAsegurado: emailAsegurado,
			aseguradora: aseguradora, precio: precio, producto: producto, valoraseg: valoraseg, vigencia_cotizacion: vigencia_cotizacion, logo: logo, celAsegurado: celAsegurado, emailAsesor: emailAsesor
		},
		success: function (data) {
			console.log("Correo Oferta Seleccionada, enviada Exitosamente");

			$("#idFildset3").fadeOut(400, function () {
				document.getElementById("idImgFinal").src = imageurlsuccess;
				document.getElementById("idSpanTitle").innerHTML = "Tu solicitud fue enviada correctamente. <br> Pronto un asesor comercial se comunicará contigo. ";
				document.getElementById("idFildset4").style.display = "inherit";
				document.getElementById("idFildset4").style.visibility = "visible";
				$("#idFildset4").fadeIn(400);
			});
			$(".imgLoader").fadeOut("slow");
			$("html, body").animate({ scrollTop: 0 }, "slow");
			window.scrollTo(0, 0);

		},
		error: function (data) {
			console.log("El envio de correo de la Oferta Seleccionada, ha Fallado.");

			$("#idFildset3").fadeOut(400, function () {
				document.getElementById("idImgFinal").src = imageurlerror;
				document.getElementById("idSpanTitle").innerHTML = "Ocurrio un error en la ejecucion. <br> Por favor intenta de nuevo.";
				document.getElementById("idFildset4").style.display = "inherit";
				document.getElementById("idFildset4").style.visibility = "visible";
				$("#idFildset4").fadeIn(400);
			});
			$(".imgLoader").fadeOut("slow");
			$("html, body").animate({ scrollTop: 0 }, "slow");
			window.scrollTo(0, 0);
		}
	});

}


// Permite recotizar un oferta que no cargo o presento alguna falla en el proceso de cotizacion.
function recotizarOferta(codigoRecotizar) {

	/*var cabeceras = new Headers({
		"Client": "7809848",
		"Authorization": "bearer 85D2AC69187A2024646860EF80EC2CA1B4E348E2-7809848",
		"Content-Type": "application/json"
	  }); */
	var myInit = { method: 'GET', /*headers: cabeceras,*/ mode: 'cors' };
	const proxyurl = "https://cors-anywhere.herokuapp.com/";

	$('#loaderOferta').html(`<img src="${loadingurl}" width="34" height="34"/><strong> Recotizando...</strong></div>`);

	fetch(proxyurl + 'http://app.agentemotor.com/appagentemotor/AgmWebService.php?accion=recotizar&recordId=' + codigoRecotizar + '&acc_token=tpGhCUNhUPUWBQFS42UQ_ip7MFyTTGbjZp_UP0DxEBJP13kTI_nT-PPzskAMgRwEhVZ4oscXVPyPvnU7aMVtm-fEQvqjL0SQu6PaESU3x-2t4jvyVRQDMhsVfakKEr_ItYJZQM8wxzICC6MFG7E6T60XeEJ9qMe3HZjUqX0gzAOnNjtEY72FkSm9snHqxp9CSKy5zj-qCkl1LtRwibzWi2Xgh9enYh24d4CtbGu0hyQvX9rw6tt5o_HIh1STA1ofQERiVI-EZKth7HsQbAtmJvjShEmUyVvoSPpp2nKYknTEvJPkhYS6XHDRyeDGTk7ULTp_RPOSIg89YqNstnvOzpqbHiaCbilEtIklDvqgE6ipUh94cxZ5NE-BEircyuli&PHPSESSID_VTIGER=13k55gph2n83j9jqtvopvqblo4', myInit)
		.then((res) => res.json())
		.then((data) => {
			let datos = data;
			var conexion = datos.resultado;
			//Validación y cargue de información a campos de texto.
			if (conexion == "exitoso") {
				$('#loaderOferta').html(`<img src="${loadingurlupdate}" width="34" height="34"><strong> Actualizando Ofertas...</strong>`);
				updateComparativo = setInterval(comparativoCard, 10000);
				setTimeout(detenerUpdateComparativo, 480000);
			}
			else {
				alert("La Recotizacion fallo, por favor intentelo de nuevo.");
			}
		});

}


function getCheckbox() {
	checkbox = document.getElementById("txtCheckbox").checked;
	return checkbox;
}


//FUNCION PARA CONSULTAR VALORES EN FASECOLDA
function ConsultaFasecolda(fasecolda, modelo) {

	$.ajax({
		type: 'POST',
		url: 'https://www.grupoasistencia.com/autogestionpdf/src/ConsultaFasecolda.php',
		dataType: "json",
		data: {
			fasecolda: fasecolda,
			modelo: modelo
		},
		success: function (data) {
			console.log(data);

			var marca = data.result.marca;
			var linea = data.result.referencia1;
			var referencia2 = data.result.referencia2;
			var referencia3 = data.result.referencia3;

			$("#txtMarcaVeh").val(marca);
			$('#marca_info_p').html(marca);

			selectReferen = linea + ' ' + referencia2 + ' ' + referencia3;
			$('#txtReferenciaVeh').val(selectReferen);
			$('#referencia_info_p').html(selectReferen);

			//$("#txtReferenciaVeh").prop("disabled", false);

			$("#txtReferenciaVeh2").val(linea + ' ' + referencia2 + ' ' + referencia3);



		}
	});

}



function CrearTarjetas() {

	$.ajax({
		url: document.getElementById('txtUrlJsonOfertas').value,
		type: "GET",
		dataType: "json",
		success: function (data) {

			var respuesta = data;
			var products = respuesta.products; //Cotizaciones generadas		
			var attribute_groups = respuesta.attribute_groups; // Grupo de Atributos generales
			console.log(respuesta);

			var cardVerti = "";
			var cardHoriz = "";
			var numAccordVerti = 3;
			var numAccordHoriz = 20;
			var numCollap = 1;

			//Genera un encabezado con datos generales del producto (Logo, precios , financiacion... etc)
			$.each(products, function (id_product, product) {

				if (product.price != "$0") {

					if (product.manufacturer != "Sura") {

						cardVerti += `
							<div class='col-sm-4'>
								<div class='card-ofertas'>
									<div class='card-body'>
										<img src='${product.thumb}' style='width:auto;height:70px;' class='mb-2'><br/>
										<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>${product.name}</h5>
										<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde ${product.price}</h5>
										<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
										<div class="accordion accordion-connected mb-3" id="accordion-${numAccordVerti}">
						`;

						cardHoriz += `
							<div class='col-md-12 col-xl-12'>
								<div class='card-ofertas2'>
									<div class='row card-body'>
										<div class="col-xs-12 col-sm-6 col-md-2">
											<img src='${product.thumb}' class='img-logo-card mb-2'>
										</div>
										<div class="col-xs-12 col-sm-6 col-md-3 planes-precio">
											<h5 class='mb-2' style='font-weight:500; color:#24b5d6;'>${product.name}</h5>
											<h5 class='mb-0' style='font-weight:500;'>Desde ${product.price}</h5>
											<p class='titulo-Precio'><strong>Precio</strong></p>
										</div>
										<div class="col-xs-12 col-sm-6 col-md-4">									
											<div class="accordion accordion-connected" id="accordion-${numAccordHoriz}">
						`;

						// Asignamos un nuevo valor a la variable, en este caso renombramos el item del Json		
						// attribute_groups[8].attribute[20].name = "Deducible ante Pago de RC";
						attribute_groups[8].attribute[21].name = "Responsabilidad Civil (RCE)";
						// attribute_groups[8].attribute[26].name = "Asistencia Jurídica";
						attribute_groups[9].attribute[28].name = "Pérdida Total Daños y Hurto";
						attribute_groups[9].attribute[29].name = "Pérdida Parcial Daños y Hurto";
						// 	attribute_groups[13].attribute[56].name = "Conductor Elegido";
						attribute_groups[13].attribute[57].name = "Servicio de Grúa";

						$.each(attribute_groups, function (i, attribute_group) {

							if (attribute_group.name != "Garantías de Movilidad" && attribute_group.name != "Valores Agregados") {

								//i = codigo de grupo
								//compareCard += "<h4 class='card-title'>" + attribute_group.name + "</h4>"; //attribute_group.name = nombre grupo
								attributes = attribute_group.attribute; //Obtengo los descriptivos de cada grupo (atributos)

								//Recorre para obtener Categoria o atributos (grupo)
								$.each(attributes, function (id, attribute_name) {

									if (attribute_name.name != "Deducible ante pago de Responsabilidad Civil" && attribute_name.name != "Asistencia jurídica procesos penales/civiles" &&
										attribute_name.name != "Límite para daños a bienes de terceros " && attribute_name.name != "Límite para lesiones o muerte a una persona" &&
										attribute_name.name != "Límite para lesiones o muerte a dos o más personas" && attribute_name.name != "Responsabilidad civil en  exceso" &&
										attribute_name.name != "Deducible Pérdida Total Hurto" && attribute_name.name != "Deducible Pérdida Parcial Hurto" &&
										attribute_name.name != "Eventos de la naturaleza como temblor, terremoto " && attribute_name.name != "Amparo patrimonial" &&
										attribute_name.name != "Revisión antes de viaje" && attribute_name.name != "Carro-Taller para despinchada, envío gasolina, cerrajería o batería" &&
										attribute_name.name != "Transporte o Custodia del Vehículo reparado o recuperado" && attribute_name.name != "Asesoria telefónica y/o en sitio de abogado en caso de accidente") {

										//id = codigo de atributo de grupo (categoria)
										//attribute_name.name = nombre de atributo de grupo (categoria)
										cardVerti += `
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-${numAccordVerti}" href="#collapse-${numAccordVerti}-${numCollap}">${attribute_name.name}</a></strong>
												</h6>
										`;

										cardHoriz += `
											<div class="card">
												<h6 class="card-title accordion-oferta">
													<strong><a data-toggle="collapse" data-parent="#accordion-${numAccordHoriz}" href="#collapse-${numAccordHoriz}-${numCollap}">${attribute_name.name}</a></strong>
												</h6>
										`;

										//id_product = codigo de cada cotizacion
										//product.attribute = Descripcion de cotizacion (atributos de cotizacion)
										product_attributes = product.attribute;
										descripcion = product_attributes[id];

										if (typeof (descripcion) == "undefined") {
											descripcion = "";
										}
										cardVerti += `
												<div id="collapse-${numAccordVerti}-${numCollap}" class="collapse">
													<div class="card-body accordion-info">
														<span>* ${descripcion}</span>
													</div>
												</div>
											</div>
										`;

										cardHoriz += `
												<div id="collapse-${numAccordHoriz}-${numCollap}" class="collapse">
													<div class="card-body accordion-info">
														<span>* ${descripcion}</span>
													</div>
												</div>
											</div>									
										`;

										numCollap++;
									}

								});

							}

						});
						cardVerti += `
										</div>
										<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"${product.manufacturer}\", \"${product.price}\", \"${product.name}\", \"${product.valor_asegurado}\", \"${product.vigencia_cotizacion}\", \"${product.thumb}\")'>ELEGIR</button>
									</div>
								</div>
							</div>
						`;

						cardHoriz += `
												</div>
											</div>
											<div class="col-xs-12 col-sm-6 col-md-3 conten-btn-oferta">
												<button type='button' class='btn btn-elegir-oferta' onclick='elegirOferta(\"${product.manufacturer}\", \"${product.price}\", \"${product.name}\", \"${product.valor_asegurado}\", \"${product.vigencia_cotizacion}\", \"${product.thumb}\")'>ELEGIR</button>
											</div>
										</div>
									</div>
								</div>
						`;

						numAccordVerti++;
						numAccordHoriz++;
						numCollap = 1;

					}

				}

			});
			$('#cardVertical').html(cardVerti);
			$('#cardHorizontal').html(cardHoriz);




		},
		error: function (data) {
			console.log("El comparativo de Ofertas Card ha Fallado.");
		}
	});

}



/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
FUNCIONES PARA CONSULTA FASECOLDA MANUAL
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

//FUNCION PARA CARGAR CATEGORIA DE VEHICULO
function cargarCategoriasSelect() {
	$.ajax({
		type: "POST",
		url: "https://www.grupoasistencia.com/autogestionpdf/src/selectCategorias.php",
		data: {},
		success: function (html) {
			$("#clase").html(html);
		}
	});
}

//FUNCION PARA CARGAR MARCA DE VEHICULOS DE ACUERDO A LA SELECCION DE CATEGORIA
$("#clase").change(function () {
	var id = $(this).val();
	var dataString = "id=" + id;

	$.ajax({
		type: "POST",
		url: "https://www.grupoasistencia.com/autogestionpdf/src/marca.php",
		data: dataString,
		cache: false,
		success: function (html) {
			$("#MarcaVeh option:selected").text("-Seleccione Marca del vehículo-");
			$("#edadVeh option:selected").text("Seleccione el modelo del vehículo");
			$("#lineaVeh option:selected").text("Seleccione la linea del vehículo");
			$("#Marca").html(html);
		}
	});
});

//FUNCION PARA LAMAR DATOS MAS
$("#Marca").change(function () {
	var id = $(this).val();
	var dataString = id;
	var clasveh = $("#clase").val();

	if (dataString == "Mas") {
		$.ajax({
			type: "POST",
			url: "https://www.grupoasistencia.com/autogestionpdf/src/marca2.php",
			data: { clasveh: clasveh },
			cache: false,
			success: function (html) {
				$("#referenciados").html("");
				$("#referenciatres").html("");
				$(".costoSoat").html("");
				$("#Marca option:selected").text("-Seleccione Marca del vehículo-");
				$("#edad option:selected").text("Seleccione el modelo del vehículo");
				$("#linea option:selected").text("Seleccione la linea del vehículo");
				$("#Marca").html(html);
			}
		});
	} else {
		$.ajax({
			type: "POST",
			url: "https://www.grupoasistencia.com/autogestionpdf/src/edadveh.php",
			data: { dataString: dataString, clasveh: clasveh },
			cache: false,
			beforeSend: function () {
				//document.getElementById("mostrar_loading2").style.display = "block";
				//document.getElementById("mostrar_loading2").innerHTML = "<img src='loading2.gif' width='20' heigth='20'> <sub>Cargando por favor espere....</sub>";
			},
			success: function (html) {
				//document.getElementById("mostrar_loading2").style.display = "none";

				$("#referenciados").html("");
				$("#referenciatres").html("");
				$("#costoSoat").html("");
				$("#edad option:selected").text(
					"-Seleccione el modelo del vehículo-"
				);
				$("#linea option:selected").text("Seleccione la linea del vehículo");
				$("#edad").html(html);
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
		url: "https://www.grupoasistencia.com/autogestionpdf/src/referencia1.php",
		//data: dataString,
		data: { dataString: dataString, clasveh: clasveh, MarcaVeh: MarcaVeh },
		cache: false,
		success: function (html) {
			$("#referenciados").html("");
			$("#referenciatres").html("");
			$("#costoSoat").html("");
			$("#linea").html(html);
			$("#linea option:selected").text("-Seleccione la linea del vehículo-");
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
		url: "https://www.grupoasistencia.com/autogestionpdf/src/referencia2.php",
		//data: dataString,
		data: {
			dataString: dataString,
			clasveh: clasveh,
			MarcaVeh: MarcaVeh,
			edadVeh: edadVeh
		},
		cache: false,
		beforeSend: function () {
			//document.getElementById("mostrar_loading3").style.display = "block";
			//document.getElementById("mostrar_loading3").innerHTML ="<img src='loading2.gif' width='20' heigth='20'> <sub>Cargando por favor espere....</sub><br><br>";
		},
		success: function (html) {
			//document.getElementById("mostrar_loading3").style.display = "none";
			$("#referenciados").html("");
			$("#referenciatres").html("");
			$("#costoSoat").html("");
			$("#referenciados").html(html);
			referenciados();
			//referencia2();
			//$(".refe option:selected").text("-Seleccione la referencia del vehículo-");
			//$(".refe2 option:selected").text("Seleccione otra referencia del vehículo");
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
		url: "https://www.grupoasistencia.com/autogestionpdf/src/referencia3.php",
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
			//

			//boton2();
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
			url: "https://www.grupoasistencia.com/autogestionpdf/src/referencia3.php",
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
				//boton2();
			}
		});
	}
}



//CONSULTAR FASECOLDA MANUAL
$("#btnCotizar3").click(function () {

	var placa = document.getElementById("txtValPlaca").value;
	$('#placa_info_p').html(placa);
	document.getElementById("txtValPlacaResumen").value = placa;

	var clasveh = $("#clase").val();
	var MarcaVeh = $("#Marca").val();
	var edadVeh = $("#edad").val();
	var lineaVeh = $("#linea").val();
	var refe = $(".refe1").val();
	var refe2 = $(".refe22").val();

	if (clasveh == "") {
		alert("Seleccione la Clase del vehiculo");
	} else if (MarcaVeh == "") {
		alert("Seleccione la Marca del Vehiculo");
	} else if (edadVeh == "") {
		alert("Seleccione el Modelo del Vehiculo");
	} else if (lineaVeh == "") {
		alert("Seleccione la Linea del vehiculo");
	} else {
		$.ajax({
			type: "POST",
			url: "https://www.grupoasistencia.com/autogestionpdf/src/costoSoat.php",
			dataType: "json",
			data: {
				clasveh: clasveh,
				MarcaVeh: MarcaVeh,
				edadVeh: edadVeh,
				lineaVeh: lineaVeh,
				refe: refe,
				refe2: refe2
			},
			success: function (data) {
				console.log(data);

				var codFasecolda = data.result.codigo;
				var claseVeh = data.result.clase;
				var marcaVeh = data.result.marca;
				var edadVeh = $("#edad").val();
				var referencia1 = data.result.referencia1;
				var referencia2 = data.result.referencia2;
				var referencia3 = data.result.referencia3;
				var lineaVeh = referencia1 + ' ' + referencia2 + ' ' + referencia3;
				var valorFasec = data.result[edadVeh];
				var valorFasecolda = Number(valorFasec) * 1000;

				var codigoFasecolda = data.result.codigo;
				var edadVeh = $("#edad").val();
				
				consultarvehiculofasecolda(codigoFasecolda, edadVeh);

				// consultarvehiculofasecoldaManual(codFasecolda, claseVeh, marcaVeh, edadVeh, lineaVeh, valorFasecolda);
			}
			
		});
	}

});


function consultarvehiculofasecolda(codigoFasecolda, edadVeh) {

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({ "CodigoFasecolda": codigoFasecolda, "brand": "", "brandline": "", "ClassId": "", "Modelo": edadVeh });

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	fetch("https://www.grupoasistencia.com/webserviceAutos/VehiculoFasecolda", requestOptions)
		.then(function (response) {
			return response.json();
		}).then(function (myJson) {
			console.log(myJson);

			var myJSON2 = JSON.stringify(myJson);

			// jsonCapturaAuto(myJSON2.toString());

			if (myJson.Data == null) {

				alert("Error en conexion API");

			} else if (myJson.Data != null) {



				var CodigoFasecolda = myJson.Data.CodigoFasecolda;
				var CodigoMarca = myJson.Data.Brand;

				var CodigoLinea = myJson.Data.BrandLine;
				var ClaseVehiculo = myJson.Data.ClassId;
				var ModeloVehiculo = myJson.Data.Modelo;
				var ValorAsegurado = myJson.Data.ValorAsegurado;

				var Marcaveh = $("#Marca").val();
				var Lineaveh = $("#linea").val();

				if (ClaseVehiculo == 1) {
					clase = "AUTOMOVILES";
				} else if (ClaseVehiculo == 2) {
					clase = "CAMPEROS";
				} else if (ClaseVehiculo == 3) {
					clase = "PICK UPS";
				} else if (ClaseVehiculo == 4) {
					clase = "UTILITARIOS DEPORTIVOS";
				} else if (ClaseVehiculo == 12) {
					clase = "MOTOCICLETA";
				} else if (ClaseVehiculo == 14) {
					clase = "PESADO";
				}

				$("#txtFasecolda").val(CodigoFasecolda);
				$("#txtModeloVeh").val(ModeloVehiculo);
				$("#txtValorVehFasec").val(ValorAsegurado);
				$("#txtClaseVeh").val(clase);

				$("#fasecolda_info_p").html(CodigoFasecolda);
				$("#modelo_info_p").html(ModeloVehiculo);
				$("#valor_info_p").html(ValorAsegurado);
				$("#clase_info_p").html(clase);


				$("#CodigoMarca").val(CodigoMarca);
				$("#CodgigoLinea").val(CodigoLinea);
				$("#ClaseVehiculo").val(ClaseVehiculo);

				ConsultaFasecolda(CodigoFasecolda, ModeloVehiculo);

				document.getElementById("formularioResumen").style.display = "block";
				document.getElementById("FormularioFinal").style.display = "block";

				document.getElementById("primerFormulario").style.display = "none";
				document.getElementById("formulario2").style.display = "none";


			}

		});

}


function consultarvehiculofasecoldaManual(CodigoFasecolda, ClaseVehiculo, CodigoMarca, ModeloVehiculo, CodigoLinea, ValorAsegurado) {

	var Marcaveh = $("#Marca").val();
	var Lineaveh = $("#linea").val();

	if (ClaseVehiculo == "AUTOMOVIL") {
		clase = "AUTOMOVILES";
	} else if (ClaseVehiculo == 2) {
		clase = "CAMPEROS";
	} else if (ClaseVehiculo == 3) {
		clase = "PICK UPS";
	} else if (ClaseVehiculo == 4) {
		clase = "UTILITARIOS DEPORTIVOS";
	} else if (ClaseVehiculo == "MOTOS" || ClaseVehiculo == "MOTOCARRO") {
		clase = "MOTOCICLETA";
	} else if (ClaseVehiculo == 14) {
		clase = "PESADO";
	}

	$("#txtFasecolda").val(CodigoFasecolda);
	$("#txtModeloVeh").val(ModeloVehiculo);
	$("#txtValorVehFasec").val(ValorAsegurado);
	$("#txtClaseVeh").val(clase);

	$("#fasecolda_info_p").html(CodigoFasecolda);
	$("#modelo_info_p").html(ModeloVehiculo);
	$("#valor_info_p").html(ValorAsegurado);
	$("#clase_info_p").html(clase);

	$("#CodigoMarca").val(CodigoMarca);
	$("#CodgigoLinea").val(CodigoLinea);
	$("#ClaseVehiculo").val(ClaseVehiculo);

	ConsultaFasecolda(CodigoFasecolda, ModeloVehiculo);

	document.getElementById("formularioResumen").style.display = "block";
	document.getElementById("FormularioFinal").style.display = "block";

	document.getElementById("primerFormulario").style.display = "none";
	document.getElementById("formulario2").style.display = "none";

}



//FUNCION PARA CARGAR CIUDAD
function ConsultaCiudad() {

	var optionsSelectCiudades = ``;

	$.ajax({
		type: 'POST',
		url: 'https://www.grupoasistencia.com/autogestionpdf/src/ConsultaCiudad.php',
		dataType: "json",
		data: {
		},
		success: function (data) {
			console.log(data);

			data.AllUsers.forEach(function (valor, indice, array) {
				optionsSelectCiudades += `<option value="${valor.Codigo}">${valor.Nombre}</option>`;
			});

			var ciudadMovilizacion = document.getElementById("txtCiudadCirculacVeh2");
			ciudadMovilizacion.innerHTML = optionsSelectCiudades;


		}
	});

}


//FUNCION PARA MANEJAR LAS CIUDADES DE COTIZACION
$("#ciudad_circulacion").change(function () {
	
	var data = $("#ciudad_circulacion").val();

	if (data == 1 || data == 3 || data == 10 || data == 11 || data == 12 || data == 14 || data == 17 || data == 18 || data == 19 || data == 25 || data == 28 || data == 33 || data == 34) {
		var optionsSelectCiudades = ``;
		optionsSelectCiudades += `<option value="00000">--No se Encontro Registros--</option>`;
		var ciudadMovilizacion = document.getElementById("txtCiudadCirculacVeh2");
		ciudadMovilizacion.innerHTML = optionsSelectCiudades;

	} else {
		var optionsSelectCiudades = ``;
		$.ajax({
			type: "POST",
			url: "https://www.grupoasistencia.com/autogestionpdf/src/ConsultaCiudad2.php",
			dataType: "json",
			data: {
				data: data
			},
			cache: false,
			success: function (datas) {
				console.log(datas);
				optionsSelectCiudades += `<option value="">Seleccionar Ciudad</option>`;
				datas.AllUsers.forEach(function (valor, indice, array) {
					optionsSelectCiudades += `<option value="${valor.Codigo}">${valor.Nombre}</option>`;
				});

				var ciudadMovilizacion = document.getElementById("txtCiudadCirculacVeh2");
				ciudadMovilizacion.innerHTML = optionsSelectCiudades;

				//boton2();
			}
		});
	}

});


//FUNCION PAA COTIZAR SBS
function CotizarSBS() {

	var TipoIdentificacion = document.getElementById("TipoIdentificacion").value;
	var NumeroIdentificacion = document.getElementById("txtNoDocumento").value;
	var Nombre = document.getElementById("txtNombres").value;
	var Apellido1 = document.getElementById("txtApellidos").value;
	var Apellido2 = "";
	//var Apellido2 = document.getElementById("txtApellidos2").value;
	var Genero = document.getElementById("genero").value;
	var dia = document.getElementById("dianacimiento").value;
	var mes = document.getElementById("mesnacimiento").value;
	var anio = document.getElementById("anionacimiento").value;
	var FechaNacimiento = dia + "/" + mes + "/" + anio;
	//var FechaNacimiento = document.getElementById("txtFechaNac").value;
	var estadoCivil = document.getElementById("estadoCivil").value;
	var direcAsegurado = document.getElementById("DireccionResidencia").value;
	var emailAsegurado = "tecnologia@grupoasistencia.com";
	var celAsegurado = "3183551472";
	var fasecoldaVeh = document.getElementById("txtFasecolda").value;
	var modeloVeh = document.getElementById("txtModeloVeh").value;
	var placaVeh2 = document.getElementById("txtValPlaca").value;
	var placaVeh = "";
	if (placaVeh2 == "" || placaVeh2 == " ") {
		placaVeh = "CAT770";
	} else {
		placaVeh = placaVeh2;
	}

	var CodigoMarca = document.getElementById("CodigoMarca").value;
	var CodgigoLinea = document.getElementById("CodgigoLinea").value;
	var ClaseVehiculo = document.getElementById("ClaseVehiculo").value;
	var CoberturaEstado = document.getElementById("CoberturaEstado").value;
	var LimiteRC = document.getElementById("LimiteRC").value;
	var ValorAccesorios = document.getElementById("ValorAccesorios").value;
	var ValorAsegurado = document.getElementById("txtValorVehFasec").value;
	var ClaseVehiculoAXA = document.getElementById("txtClaseVeh").value;
	var DepartamentoCirculacion = document.getElementById("ciudad_circulacion").value;
	var CiudadCirculacionBolivar = document.getElementById("txtCiudadCirculacVeh2").value;
	var CiudadCirculacionBolivar2 = "";

	var Contar = CiudadCirculacionBolivar.length;

	if (Contar == 4) {
		CiudadCirculacionBolivar2 = "0" + CiudadCirculacionBolivar;
	} else if (Contar == 3) {
		CiudadCirculacionBolivar2 = "00" + CiudadCirculacionBolivar;
	} else {
		CiudadCirculacionBolivar2 = CiudadCirculacionBolivar;
	}

	//VARIABLESPARA ENVIO DE CORREO
	var marcaVeh = document.getElementById("txtMarcaVeh").value;
	var referenciaVeh2 = document.getElementById("txtReferenciaVeh2").value;

	var today = new Date();
	var year = today.getFullYear();

	var aniosAntiguedad = year - modeloVeh;

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({ "TipoIdentificacion": TipoIdentificacion, "NumeroIdentificacion": NumeroIdentificacion, "Nombre": Nombre, "Apellido": Apellido1, "Genero": Genero, "FechaNacimiento": FechaNacimiento, "EstadoCivil": estadoCivil, "NumeroTelefono": celAsegurado, "Direccion": direcAsegurado, "Email": emailAsegurado, "ZonaCirculacion": DepartamentoCirculacion, "Placa": placaVeh, "CodigoMarca": CodigoMarca, "CodgigoLinea": CodgigoLinea, "ClaseVehiculo": ClaseVehiculo, "CodigoFasecolda": fasecoldaVeh, "Modelo": modeloVeh, "ValorAsegurado": ValorAsegurado, "Cobertura": CoberturaEstado, "LimiteRC": LimiteRC, "ValorAccesorios": ValorAccesorios, "ceroKm": "false", "CiudadBolivar": CiudadCirculacionBolivar2, "ServicioVehiculoAXA": "14", "CodigoVerificacion": "0", "Apellido2": Apellido2, "AniosSiniestro": "0", "AniosAsegurados": "0", "NivelEducativo": "4", "Estrato": "3" });

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	fetch("https://www.grupoasistencia.com/webserviceAutos/CotizarSBSapi", requestOptions)
	// fetch("sbs.json")
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {

			$("#loaderOferta").hide();
			var jsonComparativo = myJson;
			var cardVerti = "";
			var cardHoriz = "";
			console.log(myJson);

			//infomracion de bolivar
			var RCEBOLIVAR = "";
			var PTDPTRBOLIVAR = "";
			var DeducibleBOLIVAR = "";

			var RCEBOLIVAR2 = "";
			var PTDPTRBOLIVAR2 = "";
			var DeducibleBOLIVAR2 = "";

			var EfectivoSBS = myJson.SBS.Mensaje_Validacion;

			if (aniosAntiguedad <= 5) {
				RCEBOLIVAR = "4.000.000.000";
				PTDPTRBOLIVAR = "100%";
				DeducibleBOLIVAR = "800.000";

				RCEBOLIVAR2 = "2.200.000.000";
				PTDPTRBOLIVAR2 = "100%";
				DeducibleBOLIVAR2 = "975.000";


			} else {
				RCEBOLIVAR = "4.000.000.000";
				PTDPTRBOLIVAR = "10% 1SMMLV";
				DeducibleBOLIVAR = "800.000";

				RCEBOLIVAR2 = "4.000.000.000";
				PTDPTRBOLIVAR2 = "10% 1SMMLV";
				DeducibleBOLIVAR2 = "975.000";
			}

			if (EfectivoSBS === 'Cotización exitosa') {

				var valor = myJson.SBS.Prima_Total;
				var PrimaSBS = formatNumber(valor);

				var PerdidasTotales = myJson.SBS.PTH;
				var Deducible = myJson.SBS.PPD;
				var datoPDT = "";
				var numcot = myJson.SBS.No_cotizacion;


				if (PerdidasTotales == "0% min 0.0 SMMLV") {
					datoPDT = "100%";
				} else if (PerdidasTotales == "10% min 1.0 SMMLV") {
					datoPDT = "90%";
				}
				else if (PerdidasTotales == "30% min 1.0 SMMLV") {
					datoPDT = "70%";
				}
				else if (PerdidasTotales == "20% min 1.0 SMMLV") {
					datoPDT = "80%";
				}

				cardVerti += `
								<div class='col-sm-4'>
									<div class='card-ofertas'>
										<div class='card-body'>
											<img src='${imageurlsbs}' style='width:auto;' class='mb-2'><br/>
											<h5 class='mb-4' style='text-align:center; font-weight:500; color:#24b5d6;'>SBS Seguros</h5>
											<h5 class='mb-0' style='text-align:center; font-weight:500;'>Desde $ ${PrimaSBS} </h5>
											<p class='mb-4' style='text-align:center'><strong>Precio</strong></p>
								`;

				cardHoriz += `
								<div class='col-md-12 col-xl-12'>
									<div class='card-ofertas2'>
										<div class='row card-body'>

										<div class="col-xs-12 col-sm-6 col-md-2">
											<img src='${imageurlsbs}' style='width:auto;height:130px;' class='mb-2'>
										</div>

										<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
											<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>SBS Seguros</h5>
											<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${PrimaSBS}</h5>
											<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
										</div>
								`;

				cardVerti += `
								<div class="accordion accordion-connected mb-3" id="accordion-3">
								
									<div class="card">
										<h6 class="card-title accordion-oferta">
											<strong><a data-toggle="collapse" data-parent="#accordion-3" href="#collapse-3-1">Responsabilidad Civil (RCE)</a></strong>
										</h6>
								
										<div id="collapse-3-1" class="collapse">
											<div class="card-body accordion-info">
												<span>* $4.000.000.000</span>
											</div>
										</div>
									</div>
								
									<div class="card">
										<h6 class="card-title accordion-oferta">
											<strong><a data-toggle="collapse" data-parent="#accordion-3" href="#collapse-3-2">Pérdida Total Daños y Hurto</a></strong>
										</h6>
								
										<div id="collapse-3-2" class="collapse">
											<div class="card-body accordion-info">
												<span>* Cubrimiento al ${PerdidasTotales}</span>
											</div>
										</div>
									</div>
								
									<div class="card">
										<h6 class="card-title accordion-oferta">
											<strong><a data-toggle="collapse" data-parent="#accordion-3" href="#collapse-3-3">Pérdida Parcial Daños y Hurto</a></strong>
										</h6>
								
										<div id="collapse-3-3" class="collapse">
											<div class="card-body accordion-info">
												<span>* Deducible Unico : ${Deducible}</span>
											</div>
										</div>
									</div>
								
									<div class="card">
										<h6 class="card-title accordion-oferta">
											<strong><a data-toggle="collapse" data-parent="#accordion-3" href="#collapse-3-4">Conductor elegido</a></strong>
										</h6>
								
										<div id="collapse-3-4" class="collapse">
											<div class="card-body accordion-info">
												<span>* ILIMITADOS POR VIGENCIA</span>
											</div>
										</div>
									</div>
								
									<div class="card">
										<h6 class="card-title accordion-oferta">
											<strong><a data-toggle="collapse" data-parent="#accordion-3" href="#collapse-3-5">Servicio de Grúa</a></strong>
										</h6>
								
										<div id="collapse-3-5" class="collapse">
											<div class="card-body accordion-info">
												<span>* Si</span>
											</div>
										</div>
									</div>
								
								</div>
				
								`;

				cardHoriz += `
								<div class="col-xs-12 col-sm-6 col-md-4">
									<ul class="list-group">
										<li class="list-group-item">
											<span class="badge">* $4.000.000.000</span>
											Responsabilidad Civil (RCE)
										</li>
										<li class="list-group-item">
											<span class="badge">* Cubrimiento al ${PerdidasTotales}</span>
											Pérdida Total Daños y Hurto
										</li>
										<li class="list-group-item">
											<span class="badge">* Deducible Unico : ${Deducible}</span>
											Pérdida Parcial Daños y Hurto
										</li>
										<li class="list-group-item">
											<span class="badge">* ILIMITADOS POR VIGENCIA</span>
											Conductor elegido
										</li>
										<li class="list-group-item">
											<span class="badge">* Si</span>
											Servicio de Grúa
										</li>
									</ul>
								</div>
							`;

				cardVerti += `
								<label>Mostrar PDF</label><br>
								<input type="radio"  onclick='RegistroProducto4("SBS Seguros", \"${PrimaSBS}\", "SBS - Todo Riesgo", \"${numcot}\", "$4.000.000.000", "Cubrimiento hasta " + "" + \"${datoPDT}\", "Deducible Unico : $ " + "" + \"${Deducible}\", "ILIMITADOS POR VIGENCIA", "Si");'/>
							</div>
						</div>
					</div>
				`;

				cardHoriz += `
								<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
									<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
									<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOfertaSBS" onclick='seleccionarOferta("SBS Seguros", \"${PrimaSBS}\", "SBS - Todo Riesgo", \"${numcot}\", "$4.000.000.000", "Cubrimiento hasta " + "" + \"${datoPDT}\", "Deducible Unico : $ " + "" + \"${Deducible}\", "ILIMITADOS POR VIGENCIA", "Si", this);' />
								</div>

								<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
									<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
									<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOfertaSBS" onclick='recomendarOferta("SBS Seguros", \"${PrimaSBS}\", "SBS - Todo Riesgo", \"${numcot}\", "$4.000.000.000", "Cubrimiento hasta " + "" + \"${datoPDT}\", "Deducible Unico : $ " + "" + \"${Deducible}\", "ILIMITADOS POR VIGENCIA", "Si", this);' />
								</div>
										
							</div>
						</div>
					</div>
				`;

			}

			var numCollap = 1;

			//Genera un encabezado con datos generales del producto (Logo, precios , financiacion... etc)
			RegistroProducto2("SBS Seguros", PrimaSBS, "SBS - Todo Riesgo", numcot, "$4.000.000.000", "Cubrimiento al " + "" + datoPDT, "Deducible Unico : " + "" + Deducible, "ILIMITADOS POR VIGENCIA", "Si");

			$('#cardVertical2').html(cardVerti);
			$('#cardHorizontal2').html(cardHoriz);

			/*
			$.ajax({
				url: "https://www.grupoasistencia.com/autogestionpdf/src/emailAsesor.php",
				type: "POST",
				data: {
					placaVeh: placaVeh, fasecoldaVeh: fasecoldaVeh, modeloVeh: modeloVeh, marcaVeh: marcaVeh, referenciaVeh2: referenciaVeh2,
					ciudadCirculacVeh: "3000", departCirculacVeh: DepartamentoCirculacion, numDocAsegurado: NumeroIdentificacion,
					apellAsegurado: Apellido1, nomAsegurado: Nombre, fechaNacimiento: FechaNacimiento, emailAsegurado: emailAsegurado,
					celAsegurado: celAsegurado, pdfComparativo: "falta.php"
				},
				success: function (data) {
					console.log("Correo del Asesor, enviado Exitosamente");

					// Recibimos la cadena que contiene el Codigo de Cotizacion y la separamos por el (-) dejando unicamente el codigo de la oferta.
					var cotizacion = data.split("-");
					var codCotizacion = cotizacion[1];
					document.getElementById('emailAsesorSeleccionado').value = cotizacion[2];

					$.ajax({
						url: "https://www.grupoasistencia.com/autogestionpdf/src/emailUsuario.php",
						type: "POST",
						data: {
							placaVeh: placaVeh, fasecoldaVeh: fasecoldaVeh, modeloVeh: modeloVeh, marcaVeh: marcaVeh, referenciaVeh2: referenciaVeh2,
							ciudadCirculacVeh: "3000", departCirculacVeh: DepartamentoCirculacion, numDocAsegurado: NumeroIdentificacion,
							apellAsegurado: Apellido1, nomAsegurado: Nombre, fechaNacimiento: FechaNacimiento, emailAsegurado: emailAsegurado,
							celAsegurado: celAsegurado, pdfComparativo: "falta.php", codCotizacion: codCotizacion
						},
						success: function (data) {
							console.log("Correo del Usuario, enviado Exitosamente");

							var placaVehs = document.getElementById("txtValPlaca").value;


						},
						error: function (data) {
							console.log("El envio de correo del Usuario, ha Fallado.");
						}
					});

					// Cargamos un Input Oculto en la interfaz que contiene el Codigo de Cotizacion asignado a la cotizacion realizada. 
					$('#inputCodCotizacion').html("<input type='hidden' class='form-control' name='codCotizacion' id='txtCodCotizacion' value='" + codCotizacion + "'>");

				},
				error: function (data) {
					console.log("El envio de correo del Asesor, ha Fallado.");
				}
			});*/

		});

}


//FUNCION PARA CARGAR CIUDAD
function RegistroVehiculo() {

	var TipoIdentificacion = document.getElementById("TipoIdentificacion").value;
	var NumeroIdentificacion = document.getElementById("txtNoDocumento").value;
	var Nombre = document.getElementById("txtNombres").value;
	var Apellido2 = "";
	var Apellido1 = document.getElementById("txtApellidos").value;
	//var Apellido2 = document.getElementById("txtApellidos2").value;
	var genero = document.getElementById("genero").value;
	var dia = document.getElementById("dianacimiento").value;
	var mes = document.getElementById("mesnacimiento").value;
	var anio = document.getElementById("anionacimiento").value;
	var FechaNacimiento = dia + "/" + mes + "/" + anio;
	//var FechaNacimiento = document.getElementById("txtFechaNac").value;
	var estadoCivil = document.getElementById("estadoCivil").value;
	var direcAsegurado = document.getElementById("DireccionResidencia").value;
	var emailAsegurado = "tecnologia@grupoasistencia.com";
	var celAsegurado = "3183551472";
	var fasecoldaVeh = document.getElementById("txtFasecolda").value;
	var modeloVeh = document.getElementById("txtModeloVeh").value;
	var placaVeh2 = document.getElementById("txtValPlaca").value;
	var placaVeh = "";

	if (placaVeh2 == "") {
		placaVeh = document.getElementById("cerokmsi2").value;
	} else {
		placaVeh = placaVeh2;
	}
	var CodigoMarca = document.getElementById("CodigoMarca").value;
	var CodgigoLinea = document.getElementById("CodgigoLinea").value;
	var ClaseVehiculo = document.getElementById("ClaseVehiculo").value;
	var CoberturaEstado = document.getElementById("CoberturaEstado").value;
	var LimiteRC = document.getElementById("LimiteRC").value;
	var ValorAccesorios = document.getElementById("ValorAccesorios").value;
	var ValorAsegurado = document.getElementById("txtValorVehFasec").value;
	var ClaseVehiculoAXA = document.getElementById("txtClaseVeh").value;
	var DepartamentoCirculacion = document.getElementById("ciudad_circulacion").value;
	var CiudadCirculacionBolivar = document.getElementById("txtCiudadCirculacVeh2").value;
	var Servicio = document.getElementById("txtTipoPlaca").value;
	var CiudadCirculacionBolivar2 = "";

	var Contar = CiudadCirculacionBolivar.length;

	if (Contar == 4) {
		CiudadCirculacionBolivar2 = "0" + CiudadCirculacionBolivar;
	} else if (Contar == 3) {
		CiudadCirculacionBolivar2 = "00" + CiudadCirculacionBolivar;
	} else {
		CiudadCirculacionBolivar2 = CiudadCirculacionBolivar;
	}

	//VARIABLESPARA ENVIO DE CORREO
	var marcaVeh = document.getElementById("txtMarcaVeh").value;
	var referenciaVeh2 = document.getElementById("txtReferenciaVeh2").value;
	var lineaAuto = document.getElementById("txtReferenciaVeh").value;

	$.ajax({
		type: 'POST',
		url: 'https://www.grupoasistencia.com/autogestionpdf/src/InsertarConsulta.php',
		dataType: "json",
		data: {
			placa: placaVeh,
			Identificacion: NumeroIdentificacion,
			Marca: marcaVeh,
			Linea: lineaAuto,
			Modelo: modeloVeh,
			Fasecolda: fasecoldaVeh,
			ValorAsegurado: ValorAsegurado,
			Nombre: Nombre,
			Apellido: Apellido1,
			FechaNacimiento: FechaNacimiento,
			Genero: genero,
			EstadoCivil: estadoCivil,
			Celular: celAsegurado,
			Correo: emailAsegurado,
			Ciudad: CiudadCirculacionBolivar,
			Departamento: DepartamentoCirculacion,
			Clase: ClaseVehiculoAXA,
			Servicio: Servicio
		},
		success: function (data) {
			console.log(data);
			console.log(data.result);
			document.getElementById("cotizacion").value = data.result;
		}

	});

}


//elegirOferta
function RegistroProducto(Aseguradora, Valor, Cotizacion, numero) {

	//alert(numero);

	var TipoIdentificacion = document.getElementById("TipoIdentificacion").value;
	var NumeroIdentificacion = document.getElementById("txtNoDocumento").value;
	var placaVeh = document.getElementById("txtValPlaca").value;


	if (placaVeh == "") {
		var newplaca = document.getElementById("cerokmsi2").value;

		$.ajax({
			type: 'POST',
			url: 'https://www.grupoasistencia.com/autogestionpdf/src/InsertarConsulta2.php',
			dataType: "json",
			data: {
				placa: newplaca,
				Identificacion: NumeroIdentificacion,
				Aseguradora: Aseguradora,
				Valor: Valor,
				Cotizacion: Cotizacion,
				numero: numero
			},
			success: function (data) {
				console.log(data);
			}

		});

	} else {
		var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 3", bit_accion: "Comparativo", placa: placaVeh };

		$.ajax({
			type: 'POST',
			url: 'https://www.grupoasistencia.com/autogestionpdf/src/InsertarConsulta2.php',
			dataType: "json",
			data: {
				placa: placaVeh,
				Identificacion: NumeroIdentificacion,
				Aseguradora: Aseguradora,
				Valor: Valor,
				Cotizacion: Cotizacion,
				numero: numero
			},
			success: function (data) {
				console.log(data);
			}

		});

	}

}



$("#AgregarCotizacion").click(function () {
	document.getElementById("FormularioFinalAsignar").style.display = "block";	
});


var numId = 1;

$("#btnAgregarCotizacion").click(function () {

	var aseguradora = document.getElementById("aseguradora").value;
	var numCotizOferta = document.getElementById("numCotizacion").value;
	var producto = document.getElementById("nomProducto").value;
	var prima = document.getElementById("valorTotal").value;
	var valorRC = document.getElementById("valorRC").value;

	var PT = document.getElementById("valorPerdidaTotal").value;
	var PP = document.getElementById("valorPerdidaParcial").value;
	var CE = document.getElementById("conductoresElegidos").value;
	var GR = document.getElementById("servicioGrua").value;

	var primaFormat = formatNumber(prima);
	var valorRCFormat = formatNumber(valorRC);
	var cardHoriz = "";

	cardHoriz += `
					<div class='col-md-12 col-xl-12'>
						<div class='card-ofertas2'>
							<div class='row card-body'>

							<div class="col-xs-12 col-sm-6 col-md-2">
								<img src='${carpetaimagenes + aseguradora}.jpg' style='width:auto;height:130px;' class='mb-2'>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 15px;">
								<h5 class='mb-2' style='font-size:16px; font-weight:600; color:#24b5d6;'>${aseguradora}</h5>
								<h5 class='mb-0' style='font-size:16px; font-weight:600;'>Desde $ ${primaFormat}</h5>
								<p class='titulo-Precio' style='font-size:12px; font-weight:700;'>Precio</p>
							</div>
					`;

	cardHoriz += `
					<div class="col-xs-12 col-sm-6 col-md-4">
						<ul class="list-group">
							<li class="list-group-item">
								<span class="badge">* $ ${valorRCFormat}</span>
								Responsabilidad Civil (RCE)
							</li>
							<li class="list-group-item">
								<span class="badge">* ${PT}</span>
								Pérdida Total Daños y Hurto
							</li>
							<li class="list-group-item">
								<span class="badge">* ${PP}</span>
								Pérdida Parcial Daños y Hurto
							</li>
							<li class="list-group-item">
								<span class="badge">* ${CE}</span>
								Conductor elegido
							</li>
							<li class="list-group-item">
								<span class="badge">* ${GR}</span>
								Servicio de Grúa
							</li>
						</ul>
					</div>
				`;

	cardHoriz += `
					<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
						<label for="seleccionar" style='font-size:16px; font-weight:600; color: #3c8dbc;'>SELECCIONAR</label>&nbsp;&nbsp;
						<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selecOferta${aseguradora}${numId}\" onclick='seleccionarOferta(\"${aseguradora}\", \"${prima}\", \"${producto}\", \"${numCotizOferta}\", \"${valorRC}\", \"${PT}\", \"${PP}\", \"${CE}\", \"${GR}\", this);' />
					</div>

					<div class="col-xs-12 col-sm-6 col-md-2" style="padding-top: 10px; text-align:center">
						<label for="recomendar" style='font-size:16px; font-weight:600; color:#3c8dbc;'>RECOMENDAR</label>&nbsp;&nbsp;
						<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recomOferta${aseguradora}${numId}\" onclick='recomendarOferta(\"${aseguradora}\", \"${prima}\", \"${producto}\", \"${numCotizOferta}\", \"${valorRC}\", \"${PT}\", \"${PP}\", \"${CE}\", \"${GR}\", this);' />
					</div>
							
				</div>
			</div>
		</div>
	`;
	
	numId ++;

	//Genera un encabezado con datos generales del producto (Logo, precios , financiacion... etc)
	RegistroProducto2(aseguradora, prima, producto, numCotizOferta, valorRC, PT, PP, CE, GR);
    //Message('Oferta registrada con éxito.', 'success')
	

	$("#cardHorizontal3").append(cardHoriz);
	
    
/*    $('#aseguradora').val('')
    $('#numCotizacion').val('')
    $('#nomProducto').val('')
    $('#valorTotal').val('')
    $('#valorRC').val('')
    $('#valorPerdidaTotal').val('')
    $('#valorPerdidaParcial').val('')
    $('#conductoresElegidos').val('')
    $('#servicioGrua').val('')*/
    
});


function RegistroProducto2(aseguradora, prima, producto, numCotizOferta, valorRC, PT, PP, CE, GR) {

	var numIdentificacion = document.getElementById("txtNoDocumento").value;
	var placaVeh = document.getElementById("txtValPlaca").value;

	if (placaVeh == "") {
		placa = document.getElementById("cerokmsi2").value;
	}
	else{
		var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 3", bit_accion: "Comparativo", placa: placaVeh };
		placa = placaVeh;
	}

	$.ajax({
		type: 'POST',
		url: 'https://www.grupoasistencia.com/autogestionpdf/src/InsertarConsulta3.php',
		dataType: "json",
		data: {
			placa: placa,
			numIdentificacion: numIdentificacion,
			aseguradora: aseguradora,
			numCotizOferta: numCotizOferta,
			producto: producto,
			valorPrima: prima,
			valorRC: valorRC,
			PT: PT,
			PP: PP,
			CE: CE,
			GR: GR
		},
		success: function (data) {
			console.log(data);
		}
	});

}


function seleccionarOferta(aseguradora, prima, producto, numCotizOferta, valorRC, PT, PP, CE, GR, valCheck) {

	var numIdentificacion = document.getElementById("txtNoDocumento").value;
	var placaVeh = document.getElementById("txtValPlaca").value;

	// Capturamos el Id del Checkbox seleccionado
	var idCheckbox = $(valCheck).attr("id");
	var PDF = "";

	if (placaVeh == "") { placa = document.getElementById("cerokmsi2").value; }
	else{
		var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 3", bit_accion: "Comparativo", placa: placaVeh };
		placa = placaVeh;	}

	if (document.getElementById(idCheckbox).checked){ PDF = "Mostrar";	}

	$.ajax({
		type: 'POST',
		url: 'https://www.grupoasistencia.com/autogestionpdf/src/seleccionarOferta.php',
		dataType: "json",
		data: {
			placa: placa,
			numIdentificacion: numIdentificacion,
			aseguradora: aseguradora,
			numCotizOferta: numCotizOferta,
			producto: producto,
			valorPrima: prima,
			valorRC: valorRC,
			PT: PT,
			PP: PP,
			CE: CE,
			GR: GR,
			PDF: PDF
		},
		success: function (data) {
			console.log(data);
		}
	});

}


function recomendarOferta(aseguradora, prima, producto, numCotizOferta, valorRC, PT, PP, CE, GR, valCheck) {

	var numIdentificacion = document.getElementById("txtNoDocumento").value;
	var placaVeh = document.getElementById("txtValPlaca").value;

	// Capturamos el Id del Checkbox seleccionado
	var idCheckbox = $(valCheck).attr("id");
	var recomendar = "";

	if (placaVeh == "") { placa = document.getElementById("cerokmsi2").value; }
	else{ placa = placaVeh;	}

	if (document.getElementById(idCheckbox).checked) { recomendar = "Si"; }

	// Valida que no se Recomiende mas de 3 Ofertas por Parrilla.
	if ($('.classRecomOferta:checked').length > 3) {
		// Permite deselecionar el Checkbox
		$("#"+idCheckbox).prop("checked", false);
		alert('No se permite recomendar mas de 3 Ofertas por Parrilla');
	}
	else{
		$.ajax({
			type: 'POST',
			url: 'https://www.grupoasistencia.com/autogestionpdf/src/recomendarOferta.php',
			dataType: "json",
			data: {
				placa: placa,
				numIdentificacion: numIdentificacion,
				aseguradora: aseguradora,
				numCotizOferta: numCotizOferta,
				producto: producto,
				valorPrima: prima,
				valorRC: valorRC,
				PT: PT,
				PP: PP,
				CE: CE,
				GR: GR,
				recomendar: recomendar
			},
			success: function (data) {
				console.log(data);
			}
		});

	}

}


function formatNumber(n) {
	n = String(n).replace(/\D/g, "");
	return n === '' ? n : Number(n).toLocaleString();
}


function RegistroPaso() {
	var placaVeh = document.getElementById("txtValPlaca").value;

	if (placaVeh == "") {
		var newplaca = document.getElementById("cerokmsi2").value;
		var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 3", bit_accion: "Comparativo", placa: newplaca };
		$.ajax({
			url: "https://www.grupoasistencia.com/autogestionpdf/src/insertBitacoraTR.php",
			type: "POST",
			data: { info: infoJson }
		});

	} else {
		var infoJson = { bit_modulo: "TodoRiesgo", bit_sub_pagina: "Cotizador", bit_paso: "Paso 3", bit_accion: "Comparativo", placa: placaVeh };
		$.ajax({
			url: "https://www.grupoasistencia.com/autogestionpdf/src/insertBitacoraTR.php",
			type: "POST",
			data: { info: infoJson }
		});

	}
}


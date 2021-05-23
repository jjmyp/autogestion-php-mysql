
/*=============================================
EDITAR COTIZACION
=============================================*/

const url_todoriesgo = 'https://www.grupoasistencia.com/autogestionpdftest/';
const url_image  =  'https://www.grupoasistencia.com/autogestionpro/Assets/images/loader-loading.gif' 
var numId = 1;

var idCotizacion = "";
var contErrProtocoloCotizar = 0;

// Captura los datos suministrados por el cliente y los envia al API para recibir la cotizacion.



var cont2 = [];
var contErrProtocoloCotizarSBS = 0;

$(document).ready(function(){
    var url_string = window.location.href //Obtener url Actual
    url = new URL(url_string);//Instanciar URL
    options = url.searchParams.getAll("idCotizacion"); //Buscar todos los parametros 
        
    var cotizacion_id = options[0];
    
    editarCotizacion(cotizacion_id) //Llamar cotizaciones 
    
})


// Imprimir Parrilla de Cotizaciones
$("#btnParrillaPDF").click(function () {
	var todosOn = $('.classSelecOferta:checked').length;
	var idCotizacionPDF = idCotizacion;
	if (!todosOn) {
		swal({ text: '! Por favor seleccione como minimo una cotización de la Parrilla. ¡' });
	}
	else{
		// window.open("comparador.php?cotizacion="+idCotizacionPDF, "_blank");
		window.open("https://www.grupoasistencia.com/autogestionpdftest/extensiones/tcpdf/pdf/comparador.php?cotizacion="+idCotizacionPDF, "_blank");
	}
});


$("#btnRecotizar").click(function () {
	document.getElementById("formularioCotizacionManual").style.display = "none";
	document.getElementById("contenParrilla").style.display = "none";
	cotizarOfertas();
});

function editarCotizacion(id) {
	    
	 console.log(id)
	    
	    
	idCotizacion = id; // Almacena el Id en la variable global de idCotización

	var datos = new FormData();
	datos.append("idCotizacion", idCotizacion);

	/*=============================================			
	INFORMACION DEL ASEGURADO Y DEL VEHICULO
	=============================================*/
	$.ajax({
		url: url_todoriesgo + "ajax/cotizaciones.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function (respuesta) {
            
            console.log(respuesta)
			/* FORMULARIO INFORMACIÓN DEL ASEGURADO */
			$("#placaVeh").val(respuesta["cot_placa"]);
			$("#idClientes").val(respuesta["id_clientes"]);
			$("#tipoDocumentoID").val(respuesta["cli_tip_documento"]);
			$("#numDocumentoID").val(respuesta["cli_num_identidad"]);
			$("#txtNombres").val(respuesta["cli_nombre"]);
			$("#txtApellidos").val(respuesta["cli_apellidos"]);
			$("#genero").val(respuesta["cli_genero"]);
			$("#estadoCivil").val(respuesta["cli_estado_civil"]);
            
			var fecha = respuesta["cli_fch_nacimiento"].split('-');
			var nombreMes = obtenerNombreMes(fecha[1]);
			$("#dianacimiento").append("<option value='" + fecha[2] + "' selected>" + fecha[2] + "</option>");
			$("#mesnacimiento").append("<option value='" + fecha[1] + "' selected>" + nombreMes[0].toUpperCase() + nombreMes.slice(1) + "</option>");
			$("#anionacimiento").append("<option value='" + fecha[0] + "' selected>" + fecha[0] + "</option>");
			

			/* FORMULARIO INFORMACIÓN DEL VEHICULO */
			if( respuesta["cot_cerokm"] == 1 ){
				document.getElementById("contenPlaca").style.display = "none";
				document.getElementById("contenCeroKM").style.display = "block";
				$("#txtConocesLaPlacaNo").prop("checked", true);
				$("#txtEsCeroKmSi").prop("checked", true);
			}

			if( respuesta["cot_placa"] == "KZY000" ){
				$("#txtPlacaVeh").val("SIN PLACA - VEHÍCULO 0 KM").val();
			}else{ $("#txtPlacaVeh").val(respuesta["cot_placa"]).val(); }

			$("#CodigoClase").val(respuesta["cot_cod_clase"]);
			$("#txtClaseVeh").val(respuesta["cot_clase"]);
			$("#txtMarcaVeh").val(respuesta["cot_marca"]);
			$("#txtModeloVeh").val(respuesta["cot_modelo"]);
			$("#txtReferenciaVeh").val(respuesta["cot_linea"]);
			$("#txtFasecolda").val(respuesta["cot_fasecolda"]);
			$("#txtValorFasecolda").val(respuesta["cot_valor_asegurado"]);
			$("#txtTipoUsoVehiculo").val(respuesta["cot_tip_uso"]);
			$("#txtTipoServicio").val(respuesta["cot_tip_servicio"]);
			$("#DptoCirculacion").append("<option value='" + respuesta["cot_departamento"] + "' selected>" + departamentoVeh(respuesta["cot_departamento"]) + "</option>");

			var posicion = (respuesta["Nombre"]).split("-");
			var ciudad = (posicion[0]).toLowerCase();
			var nomCiudad = ciudad.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase(); });
			$("#ciudadCirculacion").append("<option value='" + respuesta["cot_ciudad"] + "' selected>" + nomCiudad + "</option>");
			
			if( respuesta["cot_bnf_oneroso"] != "" ){
				$("#esOnerosoSi").prop("checked", true);
				$("#benefOneroso").val(respuesta["cot_bnf_oneroso"]);
				document.getElementById("contenBenefOneroso").style.display = "block";
			}else{
				$("#esOnerosoNo").prop("checked", true);
			}



			/*=============================================			
			// CONSULTA LAS OFERTAS DE LA COTIZACION
			=============================================*/
			var datos2 = new FormData();
			datos2.append("idCotizaOferta", idCotizacion);
            var url_logo = ''
			$.ajax({
				url: url_todoriesgo + "ajax/cotizaciones.ajax.php",
				method: "POST",
				data: datos2,
				cache: false,
				contentType: false,
				processData: false,
				dataType: "json",
				success: function (respuesta) {
					// console.log(respuesta);
					if(respuesta.length > 0){

						var cardCotizacion = "";

						respuesta.forEach(function (oferta, i) {

							var primaFormat = formatNumber(oferta.Prima);
							var valorRCFormat = formatNumber(oferta.ValorRC);

							if(oferta.Aseguradora == "SBS Seguros" && oferta.Producto == "RCE Daños"){
								oferta.PerdidaTotal = "Cubrimiento al 100% (Daños)";
								oferta.PerdidaParcial = "Deducible 10% - 1 SMMLV (Daños)";
							}
							else if(oferta.Aseguradora == "SBS Seguros" && oferta.Producto == "RCE Hurto"){
								oferta.PerdidaTotal = "Cubrimiento al 100% (Hurto)";
								oferta.PerdidaParcial = "Deducible 10% - 1 SMMLV (Hurto)";
							}

							if( oferta.seleccionar == "Si" ){ var selecChecked = "checked"; }
							if( oferta.recomendar == "Si" ){ var recomChecked = "checked"; }
                            
                            url_logo = base_url + oferta.logo
                            
							cardCotizacion += `
								<div class='col-lg-12'>
									<div class='card-ofertas'>
										<div class='row card-body'>
											<div class="col-xs-12 col-sm-6 col-md-2 oferta-logo">
												<img src='${url_logo}'>
											</div>
											<div class="col-xs-12 col-sm-6 col-md-2 oferta-header">
												<h5 class='entidad'>${oferta.Aseguradora} - ${oferta.Producto}</h5>
												<h5 class='precio'>Desde $ ${primaFormat}</h5>
												<p class='title-precio'>Precio</p>
											</div>
											<div class="col-xs-12 col-sm-6 col-md-4">
												<ul class="list-group">
													<li class="list-group-item">
														<span class="badge">* $${valorRCFormat}</span>
														Responsabilidad Civil (RCE)
													</li>
													<li class="list-group-item">
														<span class="badge">* ${oferta.PerdidaTotal}</span>
														Pérdida Total Daños y Hurto
													</li>
													<li class="list-group-item">
														<span class="badge">* ${oferta.PerdidaParcial}</span>
														Pérdida Parcial Daños y Hurto
													</li>
													<li class="list-group-item">
														<span class="badge">* ${oferta.ConductorElegido}</span>
														Conductor elegido
													</li>
													<li class="list-group-item">
														<span class="badge">* ${oferta.Grua}</span>
														Servicio de Grúa
													</li>
												</ul>
											</div>
											<div class="col-xs-12 col-sm-6 col-md-2">
											<div class="selec-oferta">
												<label for="seleccionar">SELECCIONAR</label>&nbsp;&nbsp;
												<input type="checkbox" class="classSelecOferta" name="selecOferta" id="selec${oferta.NumCotizOferta}${numId}\" onclick='seleccionarOferta(\"${oferta.Aseguradora}\", \"${oferta.Prima}\", \"${oferta.Producto}\", \"${oferta.NumCotizOferta}\", this);' ${selecChecked}/>
											</div>
											<div class="recom-oferta">
												<label for="recomendar">RECOMENDAR</label>&nbsp;&nbsp;
												<input type="checkbox" class="classRecomOferta" name="recomOferta" id="recom${oferta.NumCotizOferta}${numId}\" onclick='recomendarOferta(\"${oferta.Aseguradora}\", \"${oferta.Prima}\", \"${oferta.Producto}\", \"${oferta.NumCotizOferta}\", this);' ${recomChecked}/>
											</div>
											</div>`;
						if (oferta.Aseguradora == "Seguros Bolivar" || oferta.Aseguradora == "Axa Colpatria"){
							cardCotizacion += `
											<div class="col-xs-12 col-sm-6 col-md-2 verpdf-oferta">
											<button type="button" class="btn btn-info" id="btnAsegPDF${oferta.NumCotizOferta}${numId}\" onclick='verPdfOferta(\"${oferta.Aseguradora}\", \"${oferta.NumCotizOferta}\", \"${numId}\");'>
												<div id="verPdf${oferta.NumCotizOferta}${numId}\">VER PDF &nbsp;&nbsp;<span class="fa fa-file-text"></span></div>
											</button>
											</div>`;
						}
						else if (oferta.Aseguradora == "Seguros del Estado"){
							cardCotizacion += `
											<div class="col-xs-12 col-sm-6 col-md-2 verpdf-oferta">
											<button type="button" class="btn btn-info" id="btnAsegPDF${oferta.NumCotizOferta}${numId}\" onclick='verPdfEstado(\"${oferta.Aseguradora}\", \"${oferta.NumCotizOferta}\", \"${numId}\", \"${oferta.UrlPdf}\");'>
												<div id="verPdf${oferta.NumCotizOferta}${numId}\">VER PDF &nbsp;&nbsp;<span class="fa fa-file-text"></span></div>
											</button>
											</div>`;
						}
							cardCotizacion += `
										</div>
									</div>
								</div>
							`;

							numId++;

						});

						$('#cardCotizacion').html(cardCotizacion);

					}
					else{
						$('#loaderOferta').html('');
						
						Message('¡ No hay ofertas disponibles para tu vehiculo', 'warning');
						
						/*swal({
							type: "warning",
							title: "¡ UPS, Lo Sentimos !",
							text: '¡ No hay ofertas disponibles para tu vehículo !',
							showConfirmButton: true,
							confirmButtonText: "Cerrar"
						});*/
					}
					document.getElementById("headerAsegurado").style.display = "block";
					document.getElementById("contenSuperiorPlaca").style.display = "none";
					document.getElementById("contenBtnConsultarPlaca").style.display = "none";
					document.getElementById("resumenVehiculo").style.display = "block";
					// Oculta el Boton Cotizar Ofertas al cargar la Parrilla
					document.getElementById("contenBtnCotizar").style.display = "none";
					// Muestra los Botones Recotizar y Agregar Cotizacion
					document.getElementById("contenRecotizarYAgregar").style.display = "block";
					// Muestra el Contenido de la Parrilla de Ofertas, Cotizaciones Manuales y PDF
					document.getElementById("contenParrilla").style.display = "block";
					menosAseg();
				}
		
			});

		}

	});

}


function obtenerNombreMes(numero) {

	var fecha = new Date();
	if (0 < numero && numero <= 12) {
		fecha.setMonth(numero - 1);
		return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fecha);
	}
}

function formatNumber(n) {
	n = String(n).replace(/\D/g, "");
	return n === '' ? n : Number(n).toLocaleString();
}

/*===============================================
FUNCION PARA SELECCIONAR OFERTA DE LA ASEGURADORA
===============================================*/
function seleccionarOferta(aseguradora, prima, producto, numCotizOferta, valCheck) {

	var idSelecOferta = idCotizacion;
	var placa = document.getElementById("placaVeh").value;

	// Capturamos el Id del Checkbox seleccionado
	var idCheckbox = $(valCheck).attr("id");
	var seleccionar = "";

	if (document.getElementById(idCheckbox).checked){ seleccionar = "Si"; }

	$.ajax({
		type: 'POST',
		url: url_todoriesgo + 'src/seleccionarOferta.php',
		dataType: "json",
		data: {
			placa: placa,
			idCotizacion: idSelecOferta,
			aseguradora: aseguradora,
			numCotizOferta: numCotizOferta,
			producto: producto,
			valorPrima: prima,
			seleccionar: seleccionar
		},
		success: function (data) {
			console.log(data);
		}
	});

}


/*===============================================
FUNCION PARA RECOMENDAR OFERTA DE LA ASEGURADORA
===============================================*/
function recomendarOferta(aseguradora, prima, producto, numCotizOferta, valCheck) {

	var idRecomOferta = idCotizacion;
	var placa = document.getElementById("placaVeh").value;

	// Capturamos el Id del Checkbox seleccionado
	var idCheckbox = $(valCheck).attr("id");
	var recomendar = "";

	if (document.getElementById(idCheckbox).checked) { recomendar = "Si"; }

	// Valida que no se Recomiende mas de 3 Ofertas.
	if ($('.classRecomOferta:checked').length > 3) {
		
		$("#"+idCheckbox).prop("checked", false); // Permite deselecionar el Checkbox
		Message('¡ No se permite recomendar mas de 3 oferas por parrilla. !')
		//swal({ text: '! No se permite recomendar mas de 3 Ofertas por Parrilla. ¡' });
	}
	else{
		$.ajax({
			type: 'POST',
			url: url_todoriesgo + 'src/recomendarOferta.php',
			dataType: "json",
			data: {
				placa: placa,
				idCotizacion: idRecomOferta,
				aseguradora: aseguradora,
				numCotizOferta: numCotizOferta,
				producto: producto,
				valorPrima: prima,
				recomendar: recomendar
			},
			success: function (data) {
				console.log(data);
			}
		});

	}

}


/*==================================================
FUNCION PARA CARGAR EL PDF OFICIAL DE LA ASEGURADORA
==================================================*/
function verPdfOferta(aseguradora, numCotizOferta, numId) {
	
	$("#verPdf"+numCotizOferta+numId).html("VER PDF &nbsp;&nbsp;<img src='vistas/img/plantilla/loading.gif' width='18' height='18'>");

	var ventanaPDF = window.open('', aseguradora, 'width='+1024+', height='+768);
	// var ventanaPDF = window.open('http://example.com/waiting.html', '_blank'); // Carga otra pagina
	ventanaPDF.document.write('Cargando vista previa Pdf '+aseguradora+'...'); // Carga un mensaje de espera

	var myHeaders = new Headers(); // Cabecera del Metodo
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({ "aseguradora": aseguradora, "numero_cotizacion": numCotizOferta });
	var requestOptions = { mode: 'cors', method: 'POST', headers: myHeaders, body: raw,	redirect: 'follow' };

	// Llama la URL del PDF oficial de la oferta generada por la aseguradora
	fetch('https://www.grupoasistencia.com/webservice_autosv1/ImpresionPdf', requestOptions)
	.then(function (response) {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(function (data) {
		ventanaPDF.location.href = data;
		$("#verPdf"+numCotizOferta+numId).html('VER PDF &nbsp;&nbsp;<span class="fa fa-file-text"></span>');
	})
	.catch(function (error) {
		console.log('Parece que hubo un problema: \n', error);		
	});

}


/*======================================================
FUNCION PARA CARGAR EL PDF OFICIAL DE SEGUROS DEL ESTADO
======================================================*/
function verPdfEstado(aseguradora, numCotizOferta, numId, UrlPdf){
		
	$("#verPdf"+numCotizOferta+numId).html("VER PDF &nbsp;&nbsp;<img src='vistas/img/plantilla/loading.gif' width='18' height='18'>");
	
	var ventanaPDF = window.open('', aseguradora, 'width='+1024+', height='+768);
	ventanaPDF.document.write('Cargando vista previa Pdf '+aseguradora+'...'); // Carga un mensaje de espera
	ventanaPDF.location.href = UrlPdf;

	setTimeout(function(){ $("#verPdf"+numCotizOferta+numId).html('VER PDF &nbsp;&nbsp;<span class="fa fa-file-text"></span>'); }, 6000);

}

/*==========================================================
FUNCION PARA CONSULTAR EL NOMBRE DEL DEPARTAMENTO POR CODIGO
==========================================================*/
function departamentoVeh(codigoDpto){

	var nomDpto = "";

	if (codigoDpto == 1){
		nomDpto = "Amazonas"; }
	else if (codigoDpto == 2){
		nomDpto = "Antioquia"; }
	else if (codigoDpto == 3){
		nomDpto = "Arauca"; }
	else if (codigoDpto == 4){
		nomDpto = "Atlántico"; }
	else if (codigoDpto == 5){
		nomDpto = "Barranquilla"; }

	else if (codigoDpto == 6){
		nomDpto = "Bogotá"; }
	else if (codigoDpto == 7){
		nomDpto = "Bolívar"; }
	else if (codigoDpto == 8){
		nomDpto = "Boyacá"; }
	else if (codigoDpto == 9){
		nomDpto = "Caldas"; }
	else if (codigoDpto == 10){
		nomDpto = "Caquetá"; }

	else if (codigoDpto == 11){
		nomDpto = "Casanare"; }
	else if (codigoDpto == 12){
		nomDpto = "Cauca"; }
	else if (codigoDpto == 13){
		nomDpto = "Cesar"; }
	else if (codigoDpto == 14){
		nomDpto = "Chocó"; }
	else if (codigoDpto == 15){
		nomDpto = "Córdoba"; }

	else if (codigoDpto == 16){
		nomDpto = "Cundinamarca"; }
	else if (codigoDpto == 17){
		nomDpto = "Guainía"; }
	else if (codigoDpto == 18){
		nomDpto = "La Guajira"; }
	else if (codigoDpto == 19){
		nomDpto = "Guaviare"; }
	else if (codigoDpto == 20){
		nomDpto = "Huila"; }

	else if (codigoDpto == 21){
		nomDpto = "Magdalena"; }
	else if (codigoDpto == 22){
		nomDpto = "Meta"; }
	else if (codigoDpto == 23){
		nomDpto = "Nariño"; }
	else if (codigoDpto == 24){
		nomDpto = "Norte de Santander"; }
	else if (codigoDpto == 25){
		nomDpto = "Putumayo"; }

	else if (codigoDpto == 26){
		nomDpto = "Quindío"; }
	else if (codigoDpto == 27){
		nomDpto = "Risaralda"; }
	else if (codigoDpto == 28){
		nomDpto = "San Andrés"; }
	else if (codigoDpto == 29){
		nomDpto = "Santander"; }
	else if (codigoDpto == 30){
		nomDpto = "Sucre"; }

	else if (codigoDpto == 31){
		nomDpto = "Tolima"; }
	else if (codigoDpto == 32){
		nomDpto = "Valle del Cauca"; }
	else if (codigoDpto == 33){
		nomDpto = "Vaupés"; }
	else if (codigoDpto == 34){
		nomDpto = "Vichada"; } 
	else {
		nomDpto = "No Disponible";
	}
	return nomDpto;

}

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
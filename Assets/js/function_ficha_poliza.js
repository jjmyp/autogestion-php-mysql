//============================================================+
// Carpeta: js
// Nombre del archivo   : function_ficha_poliza.js
// Inicio       : 2021-02-04
// Ultima actualizacion : 
//
// Description : Funcionalidades que permiten ejecutar el modulo correctamente.
//
// Author: Jose Carlos Avila Perea
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer2@grupoasistencia.com
//============================================================+





$(document).ready(function () {

    cargarSelectGenericoWs("RAMOS", "ramo", "Ramo");
    cargarSelectGenericoWs("RAMOS", "ramoForm", "Ramo");
    cargarSelectGenericoWs("ASEGU", "aseguradora", "Aseguradora");
    // cargarSelectGenericoWs("ConsultarBroker", "broker");
    cargarSelectGenericoWs("CANCL", "canal", "Canal");
    cargarSelectGenericoWs("MOCAP", "motivoCancelacion", "Motivo Cancelacion");
    cargarSelectGenericoWs("FORPA", "formaPago", "Forma Pago");
    cargarSelectGenericoWs("FINAN", "financiera", "Financiera");
    cargarSelectGenericoWs("NUMCU", "cuotas", "Numero Cuotas");
    // cargarSelectGenericoWs("ESTCA", "estCartera", "Estado Cartera");
    // cargarSelectGenericoWs("DCPLZ", "tipoDocumento", "Tipo de archivo");
});




/*
    @descripcion    = cargarSelectGenericoWs() es un llamado ajax generico que solamente sirve para cargar datos a un select desde el webservice y tambien inicializará la clase select2 con su placeholder
    @parametros     = La funcion recibe los siguientes parametros:  
            -> codigo = Codigo de type del ws
            -> idDom = id del select que se le cargará la informacion consultada
            -> placeholder = placeholder que llevará el select
    @return         = Ingresará los valores al select con la clase select2 inicializada

*/
function cargarSelectGenericoWs(codigo, idDom, placeholder) {
    $.ajax({
        url: base_url + 'fichapoliza/ConsultarTypes',
        type: "POST",
        data: { codigo },
        success: function (data) {
            document.getElementById(idDom).innerHTML = data;

            $('#' + idDom).select2({
                placeholder: placeholder,
                width: '100%'
            });

        }
    });
}




/*
    @descripcion    = cargarSelectGenericoBd() es un llamado ajax generico que solamente sirve para cargar datos en un select desde la bd y tambien inicializará la clase select2 con su placeholder
    @parametros     = La funcion recibe los siguientes parametros:  
            -> funcion = funcion del controlador
            -> idDom = id del select que se le cargará la informacion consultada
            -> placeholder = placeholder que llevará el select
    @return         = Ingresará los valores al select con la clase select2 inicializada
*/
function cargarSelectGenericoBd(funcion, idDom, placeholder) {
    $.ajax({
        url: base_url + 'fichapoliza/' + funcion,
        type: "GET",
        success: function (data) {
            document.getElementById(idDom).innerHTML = data;

            $('#' + idDom).select2({
                placeholder: placeholder,
                width: '100%'
            });
        }
    });
}




/*
    @descripcion    = SeleccionOptionSelect() es una funcion que permite seleccionar un option dentro de select por medio del value del option
    @parametros     = La funcion recibe los siguientes parametros:  
        -> idSelect        = id del select que se desea seleccionar otro option
        -> idComparado     = option que se quiere seleccionar, pero debe de tener en cuenta que tiene que identificarlo por el value
    @return         = Seleccion del option dentro del select
*/
function SeleccionOptionSelect(idSelect, idComparado) {

    $("#" + idSelect).val(idComparado); // Select the option with a value of '1'
    $("#" + idSelect).trigger('change'); // Notify any JS components that the value changed
    // var selectBuscado = document.getElementById(idSelect);

    // for (let index = 0; index < selectBuscado.length; index++) {

    //     if (selectBuscado[index].value == idComparado) {

    //         selectBuscado.children[index].selected = true;

    //         break;
    //     }
    // }
}




/*
    @descripcion    = validarEstadoIcons() sirve para representar los estados por iconos
    @parametros     = La funcion recibe los siguientes parametros:  
            -> estado  = estado del cliente en texto
    @return         = retornará el estado en forma de icono
*/
function validarEstadoIcons(estado) {

    var response = "";

    switch (estado) {
        
        // Nueva
        case 42:
            response = "Vigente";
            break;

        // No Vigente
        case 50:
            response = "No vigente";
            break;

        // Cancelada
        case 43:
            response = "Cancelada";
            break;

        default:
            response = "?";
            break;
    }

    return response;

}




/*
    @descripcion    = SplitFechaWs() sirve para limpiar las fechas que vengan del ws
    @parametros     = La funcion recibe los siguientes parametros:  
            -> fechaWs  = fecha del ws en formato "1998-08-02T00:00:00.000Z"
    @return         = retornará la fecha en formato "1998-08-02"
*/
function SplitFechaWs(fechaWs) {
        
    var formatFechaWs = "";
        
    if(fechaWs == null){
        formatFechaWs = "Fecha no ingresada";
    }else{
        var splitFechaWs = (fechaWs.substr(0, 10)).split("-");
        formatFechaWs = `${splitFechaWs[0]}-${splitFechaWs[1]}-${splitFechaWs[2]}`;
    }
    

    return formatFechaWs;

}




/* Por cada tabla se debe crear una variable a la cual se le asignará el datatable seleccionado */
var tableNegocios = null;
var tableSiniestros = null;
var tableArchivos = null;

/*
    @descripcion    = settingsTable() sirve para inicializar los parametros del plugin dataTables()
    @parametros     = La funcion recibe los siguientes parametros:  
            -> idTabla  = id de la tabla en la cual se verán afectados los cambios
    @return         = retornará la inicializacion del datatable con los parametros establecidos.
*/
function settingsTable(idTabla) {
    var tableGeneral = $('#' + idTabla + '').DataTable({
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

    return tableGeneral;
}




function datatables() {
    tableNegocios = $('#tableNegocios').DataTable({
        deferRender: true,
        responsive: true,
        processing: true,
        searching: false,
        language: {
            url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
        },
        columnDefs: [{
            responsivePriority: 1,
            targets: 1
        },
        {
            responsivePriority: 2,
            targets: 2
        },
        {
            responsivePriority: 3,
            targets: 3
        },
        {
            responsivePriority: 4,
            targets: 4
        },
        {
            responsivePriority: 5,
            targets: 5
        },
        {
            responsivePriority: 6,
            targets: 6
        }
        ]
    });
}




/*
    @descripcion    = buscarNegicio() Se ejecuta cuando el usuario ingresa los valores en el input de busqueda y da click en el boton de filtrar para la busqueda
    @parametros     = La funcion trabaja con los siguientes parametros:  
            -> datoBusqueda = Es la informacion ingresada en el input de busqueda
            -> ramoBusqueda = ramo a la que puede pertenecer la poliza
    @return         = Una vez consultada la informacion se mostrará un datatable con los clientes, si no encuentra ningun cliente retornará un mensaje de warning
*/
function buscarNegicio() {

    var spinnerLoad = `<div id="spinner_load" class="spinner-border text-light spinner-grow-sm" role="status" style="margin-right: 5px"><span class="sr-only">Loading...</span></div>`;
    $("#filterinput").html(spinnerLoad);

    var datoBusqueda = $("#buscarNegicio").val();
    var ramoBusqueda = $("#ramo").val();

    // if (datoBusqueda != "") {
        $.ajax({
            url: base_url + 'fichapoliza/ConsultarNegocios',
            method: 'POST',
            data: { datoBusqueda, ramoBusqueda },
            success: function (objData) {

                var objData = JSON.parse(objData);

                if (objData.status == 'success') {

                    Message("Informacion consultada", "success")
                    llenarTableNegocios(objData);
                    $("#filterinput").html("Filtrar");

                } else {

                    Message("Informacion no encontrada", "warning");
                    $("#filterinput").html("Filtrar");

                }
            }
        })
    // } else {
    //     Message('Debes de ingresar información para consultar', 'warning');
    // }
}




/*
    @descripcion    = llenarTableNegocios() es un llamado que se realiza desde la funcion buscarNegicio(), una vez la consulta de la poliza se encuentre en success
    @parametros     = La funcion recibe los siguientes parametros:  
            -> objData = es el json de la respuesta del controlador
            -> ramoBusqueda = el ramo que selecciona el usuario, no es obligatorio para la consulta
    @return         = retornará un datatable con la informacion de las polizas que conincidan con la informacion consultada.
*/
function llenarTableNegocios(objData) {

    var tbodyTable = `
        <thead>
            <th> <b> # </b> </th>
            <th> <b> Póliza </b> </th>
            <th> <b> Nombre </b> </th>
            <th> <b> Placa </b> </th>
            <th> <b> Ramo </b> </th>
            <th> <b> Estado </b> </th>
            <th> <b> Apellidos </b> </th>
            <th> <b> Documento de identidad </b> </th>
            <th> <b> Aseguradora </b> </th>
            <th> <b> Fecha de Vigencia </b> </th>
            <th> <b> Ver más </b> </th>
        </thead>
        <tbody>
    `;

    console.log("llenarTableNegocios");
    console.log(objData);


    objData.data.forEach(function (valor, indice) {

        // if (ramoBusqueda && ramoBusqueda == valor.infoPoliza.ramo_id) {

        //     tbodyTable += armarTbodyTable(valor, indice);

        // } else if (!ramoBusqueda) {

            tbodyTable += armarTbodyTable(valor, indice);

        // }

    });

    tbodyTable += `</tbody>`;

    if (tableNegocios) tableNegocios.destroy();
    $('#tableNegocios').html(tbodyTable);
    datatables();


}




/*
    @descripcion    = armarTbodyTable() es un llamado que se realiza desde la funcion llenarTableNegocios(), la cual nos va armar el cuerpo de la tabla segun los filtros de busqueda
    @parametros     = La funcion recibe los siguientes parametros:  
            -> valor = informacion del json manipulado por el foreach de llenarTableNegocios()
            -> indice = posicion de la informacion del json enviado de llenarTableNegocios()
    @return         = retornará el cuerpo de la tabla
*/
function armarTbodyTable(valor, indice) {

    var apellidoCompleto = `${valor.infoCliente.primer_apellido} ${valor.infoCliente.segundo_apellido}`;
    apellidoCompleto = apellidoCompleto.toUpperCase().replace(/NULL/g, '');

    var nombreCompleto = `${valor.infoCliente.primer_nombre} ${valor.infoCliente.segundo_nombre}`;
    nombreCompleto = nombreCompleto.toUpperCase().replace(/NULL/g, '');

    tbodyTable = "";
    tbodyTable += `<tr>
                        <td> ${indice} </td>
                        <td> ${valor.infoPoliza.numero_poliza} </td>
                        <td> ${nombreCompleto} </td>
                        <td> ${valor.infoPoliza.riesgo} </td>
                        <td> ${valor.infoPoliza.ramo}</td>
                        <td> ${validarEstadoIcons(valor.infoPoliza.estado_id)} </td>
                        <td> ${apellidoCompleto}</td>
                        <td> ${valor.infoCliente.identificacion}</td>
                        <td> ${valor.infoPoliza.aseguradora}</td>
                        <td> ${(valor.infoPoliza.fecha_inicio_vigencia).substr(0, 10)} - ${(valor.infoPoliza.fecha_final_vigencia).substr(0, 10)} </td>
                        <td>  
                            <img onclick="showFichaPoliza(${valor.infoPoliza.poliza_id})" style="height: 24px; cursor: pointer; vertical-align: unset;" src="../Assets/images/plus-2.svg" alt="addSeg"/>
                            <div style="display:none;" class="spinner-border text-primary spinnerTable_${valor.infoPoliza.poliza_id}" role="status"><span class="sr-only">Loading...</span></div>
                        </td>
                    </tr>`;

    return tbodyTable;
}




/*
    @descripcion    = showFichaPoliza() es un llamado que se realiza desde la funcion armarTbodyTable() por medio de un onclick() el cual consultará la informacion de la ficha poliaz
    @parametros     = La funcion recibe los siguientes parametros:  
            -> idRemision = id de la remision que se requiere ver la ficha.
    @return         = retornará la informacion relacionada a la poliza y los datatables de: PAGO Y CARTERA, COMISIONES, SINIESTROS Y ARCHIVOS RELACIONADOS A LA POLIZA
*/
function showFichaPoliza(idRemision) {

    $(".spinnerTable_" + idRemision).css("display", "inline-block");
    $("#hiddenKey").val(idRemision);

    $.ajax({
        url: base_url + 'fichapoliza/ConsultaGeneralRemision',
        data: { "datoBusqueda": idRemision },
        method: 'POST',
        success: function (data) {

            var objData = JSON.parse(data);

            if (objData.status == 'success') {


                $("#page_title").html("FICHA PÓLIZA");
                $("#spinnerTable_" + idRemision).fadeToggle(200);
                $("#divTableInformacion").fadeToggle(500);
                $("#spinnerTable_" + idRemision).fadeIn(1000);
                $("#divFichaPoliza").fadeIn(1000);
                window.scrollTo({ top: 0, behavior: 'smooth' });

                $("#spinnerTable_" + idRemision).fadeToggle(200);

                console.log("ConsultaGeneralRemision");
                console.log(objData);

                llenarInformacionCliente(objData.data);
                llenarInformacionPagoCartera(objData.data.infoPoliza);
                llenarInformacionSiniestros(idRemision);
                llenarInformacionArchivos(idRemision);
            } else {

                Message("Informacion no encontrada", "warning");

            }
        }
    });

}




/*
    @descripcion    = llenarInformacionCliente() es un llamado que se realiza desde la funcion showFichaPoliza() el cual mostrará la informacion de la ficha poliza en los inputs
    @parametros     = La funcion recibe los siguientes parametros:  
            -> data = informacion que retorna el controlador
    @return         = retornará la informacion relacionada a la poliza en todos los inputs correspondientes.
*/
function llenarInformacionCliente(data) {
    console.log("uy epale");
    console.log(data);

    var nombreCompleto = `${data.infoCliente.primer_nombre} ${data.infoCliente.segundo_nombre} ${data.infoCliente.primer_apellido} ${data.infoCliente.segundo_apellido}`;
    nombreCompleto = nombreCompleto.toUpperCase().replace(/NULL/g, '');

    $("#nombre").val(nombreCompleto);
    $("#Numdocumento").val(data.infoCliente.identificacion);
    $("#valorPoliza").val(data.infoPoliza.valor_total);
    $('#fechaDesde').val(SplitFechaWs(data.infoPoliza.fecha_inicio_vigencia));
    $('#fechaHasta').val(SplitFechaWs(data.infoPoliza.fecha_final_vigencia));

    if (data.infoBroker != null) {
        $('#broker').val(`${(data.infoBroker.nombre).toUpperCase()} ${(data.infoBroker.apellido).toUpperCase()}`);
    }

    if (data.infoPoliza.fecha_cancelacion) {
        $('#fechaCancelacion').val(SplitFechaWs(data.infoPoliza.fecha_cancelacion));
    }

    SeleccionOptionSelect("ramoForm", data.infoPoliza.ramo_id);
    SeleccionOptionSelect("aseguradora", data.infoPoliza.aseguradora_id);    
    SeleccionOptionSelect("canal", data.infoPoliza.canal_poliza);
    SeleccionOptionSelect("motivoCancelacion", data.infoPoliza.motivo_cancelacion);


}




/*
    @descripcion    = llenarInformacionPagoCartera() es un llamado que se realiza desde la funcion showFichaPoliza() el cual mostrará la informacion del pago de cartera
    @parametros     = La funcion recibe los siguientes parametros:  
            -> data = informacion que retorna el controlador
    @return         = retornará la informacion relacionada a la cartera de la poliza en los inputs correspondientes
*/
function llenarInformacionPagoCartera(data) {

    SeleccionOptionSelect("formaPago", data.forma_pago_id);
    SeleccionOptionSelect("financiera", data.financiera);
    SeleccionOptionSelect("cuotas", data.numero_cuotas);
      // SeleccionOptionSelect("estCartera", data.estado_cartera);
    if (data.estado_cartera != null) {
        $("#estCartera").val((data.estado_cartera).toUpperCase());
    }

}




/*
    @descripcion    = llenarInformacionSiniestros() es un llamado que se realiza desde la funcion showFichaPoliza() el cual mostrará la informacion de los siniestros que tiene la poliza
    @parametros     = La funcion recibe los siguientes parametros:  
            -> data = informacion que retorna el controlador
    @return         = retornará la informacion relacionada a la cartera de la poliza en los inputs correspondientes
*/
function llenarInformacionSiniestros(data) {

    $.ajax({
        url: base_url + 'fichapoliza/ConsultarSiniestrosPoliza',
        data: { "datoBusqueda": data },
        method: 'POST',
        success: function (objData) {
            var objData = JSON.parse(objData);

            console.log(objData);

            if (objData.status == 'success') {

                llenarTablaSiniestros(objData);

            }
        }
    });

}




/*
    @descripcion    = llenarTablaSiniestros() es un llamado que se realiza desde la funcion llenarInformacionSiniestros() el cual armará el datatable de los siniestros para la poliza
    @parametros     = La funcion recibe los siguientes parametros:  
            -> objData = json  que retorna el controlador
    @return         = retornará la informacion relacionada a la cartera de la poliza en los inputs correspondientes
*/
function llenarTablaSiniestros(objData) {

    var tbodyTable = "";
    tbodyTable += `
        <thead>
            <th> <b> # </b> </th>
            <th> <b> Fecha Siniestros </b> </th>
            <th> <b> # Aseguradora </b> </th>
            <th> <b> Tipo siniestro </b> </th>
            <th> <b> Estado </b> </th>
        </thead>
        <tbody>
    `;



    objData.data.forEach(function (valor, indice) {

        tbodyTable += `<tr>`;
        tbodyTable += `<td> ${indice} </td>`;
        tbodyTable += `<td> ${(valor.fecha_siniestro).substr(0, 10)} </td>`;
        tbodyTable += `<td> ${valor.siniestro_aseguradora} </td>`;
        tbodyTable += `<td> ${valor.tipo_siniestro} </td>`;
        tbodyTable += `<td> ${valor.estado_siniestro} </td>`;
        tbodyTable += `</tr>`;

    });

    tbodyTable += `</tbody>`;

    if (tableSiniestros) { tableSiniestros.destroy() }

    $("#tableSiniestros").html(tbodyTable);

    tableSiniestros = settingsTable("tableSiniestros");

}




/*
    @descripcion    = llenarInformacionArchivos() es un llamado que se realiza desde la funcion showFichaPoliza() y addFilePolice(),  el cual mostrará la informacion de los archivos relacionados a la poliza.
    @parametros     = La funcion recibe los siguientes parametros:  
            -> idRemision = id de la poliza
    @return         = retornará un datatable con la informacion relacionada a los seguimientos.
*/
function llenarInformacionArchivos(idRemision) {


    $.ajax({
        url: base_url + 'fichapoliza/ConsultarArchivosPoliza',
        data: { "datoBusqueda": idRemision },
        method: 'POST',
        success: function (objData) {
            var objData = JSON.parse(objData);

            console.log(objData);

            if (objData.status == 'success') {

                llenarTablaArchivos(objData);

            }
        }
    });


}




/*
    @descripcion    = llenarTablaArchivos() es un llamado que se realiza desde la funcion llenarInformacionArchivos() el cual armará el datatable de los archivos para la poliza
    @parametros     = La funcion recibe los siguientes parametros:  
            -> objData = json  que retorna el controlador
    @return         = retornará la informacion relacionada a los archivos de la poliza.
*/
function llenarTablaArchivos(objData) {

    var tbodyTable = "";
    tbodyTable += `
        <thead>
            <th> <b> Tipo de documento </b> </th>
            <th> <b> Fecha de creación </b> </th>
            <th> <b> Tamaño del archivo </b> </th>
            <th> <b> Ver documento </b> </th>
        </thead>
        <tbody>
    `;



    objData.data.forEach(function (valor, indice) {

        tbodyTable += `<tr>`;
        tbodyTable += `<td> ${valor.tipo_documento_siniestro} </td>`;
        tbodyTable += `<td> ${SplitFechaWs(valor.fecha_creacion)} </td>`;
        tbodyTable += `<td> ${valor.tamanio_archivo}Mb </td>`;
        tbodyTable += `<td onclick="abrirDocumento('${valor.ruta_archivo}')"><i class="fa fa-search-plus fa-2x" style="color: #17a2b8;" aria-hidden="true"></i></td>`;
        tbodyTable += `</tr>`;


    });

    tbodyTable += `</tbody>`;

    if (tableArchivos) { tableArchivos.destroy() }

    $("#tableArchivos").html(tbodyTable);

    tableArchivos = settingsTable("tableArchivos");

}



/*
    @descripcion    = abrirDocumento() es un llamado que se realiza desde la funcion llenarTablaArchivos() por medio de un onclick() el cual abrirá el archivo seleccionado
    @parametros     = La funcion recibe los siguientes parametros:  
            -> fileName = nombre del archivo seleccionado
    @return         = abrirá el archivo en una pestaña nueva
*/
function abrirDocumento(fileName) {

    window.open("https://webservice.grupoasistencia.com/uploads/" + fileName, '_blank');

}





/*
    @descripcion    = addFilePolice() es una funcion que se ejecuta cuando van agregar un archivo referente a las polizas
    @parametros     = La funcion traba con los siguientes parametros:  
            -> formulario = formulario tipo multipart/form-data que trae el tipo de documento, el archivo y el id de la poliza hidden
    @return         = mensaje de success y  recargará la tabla de archivos
*/
function addFilePolice() {

    var spinnerLoad = `<div id="spinner_load" class="spinner-border text-light spinner-grow-sm" role="status" style="margin-right: 5px"><span class="sr-only">Loading...</span></div>`;
    $("#btnAddFile").html(spinnerLoad);

    $.ajax({
        url: base_url + 'fichapoliza/ConsultarTypes',
        type: "POST",
        data: { "codigo": "DCPLZ" },
        success: function (data) {

            $("#btnAddFile").html("Subir Archivo");

            var hiddenKey = $("#hiddenKey").val();

            var html = `
            <form enctype="multipart/form-data" id="formularioFile">
                <div class="row mt-3">
                    <div class="col-12 col-md-12 mt-2">
                        <label style="left: 20px;">Tipo de documento</label>
                        <select class="form-control" id="tipoDocumento" name="tipoDocumento" style="width: 100%;"> ${data} </select>
                    </div>

                    <div class="col-12 col-md-12 mt-2">
                        <label style="left: 20px;">Archivo</label>
                        <input class="form-control-file" id="file-input" type="file" name="file-input">
                        <input type="hidden" name="hiddenKey" id="hiddenKey" value="${hiddenKey}">
                    </div>
                </div>
            </form>
            `;



            Swal.fire({
                title: "Sube tu documento aquí",
                html: html,
                showCloseButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: "#FE7C21",
            }).then((result) => {


                if (result.isConfirmed) {   //Cuando el usuario le de click al boton de aceptar en la modal

                    var formulario = document.getElementById("formularioFile");
                    var formData = new FormData(formulario);
                    
                    Swal.fire({
                        title: "Subiendo archivo...",
                        html: "<div class='spinner-border text-primary' style='width: 3rem; height: 3rem;' role='status'><span class='sr-only'>Loading...</span></div>",
                        showCancelButton: false,
                        showConfirmButton: false
                    });
                    

                    $.ajax({
                        url: base_url + 'fichapoliza/AddDocument',
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {


                            var objData = JSON.parse(data);

                            if (objData.status == 'success') {

                                // Message("Documento subido correctamente", "success")
                                Swal.fire({
                                    icon: "success",
                                    html: "<h3>Documento subido correctamente</h3>",
                                    confirmButtonText: 'Aceptar'
                                });

                                var hiddenKey = $("#hiddenKey").val();
                                llenarInformacionArchivos(hiddenKey);

                            } else {

                                // Message("No se pudo subir el documento correctamente", "warning");
                                Swal.fire({
                                    icon: "error",
                                    html: "<h3>No se pudo subir el documento correctamente.</h3>",
                                    confirmButtonText: 'Aceptar'
                                });

                            }

                        }, error: function () {

                            $("#btnAddFile").html("Subir Archivo");

                            Swal.fire({
                                icon: "error",
                                html: "<h3>No se pudo subir el documento correctamente.</h3>",
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    });
                }
            })

        }, error: function () {
            $("#btnAddFile").html("Subir Archivo");
        }
    });
}

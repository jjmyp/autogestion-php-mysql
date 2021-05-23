//============================================================+
// Carpeta: js
// Nombre del archivo   : function_ficha_cliente.js
// Inicio       : 2021-02-01
// Ultima actualizacion : 
//
// Description : Funcionalidades que permiten ejecutar el modulo correctamente.
//
// Author: Jose Carlos Avila
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer2@grupoasistencia.com
//============================================================+





$(document).ready(function () {

    cargarSelectGenericoWs("DOCUM", "tipoIdentificacion", "T.I");
    cargarSelectGenericoWs("GENER", "sexo", "Sexo");
    cargarSelectGenericoWs("CANCL", "canal", "Canal");
    // cargarSelectGenericoWs("ESTCL", "estado",  "Estado");
    cargarSelectGenericoBd("ConsultarCiudad", "ciudad", "Ciudad");
    cargarSelectGenericoWs("ASUSE", "asuntoSeguimiento", "Asunto Seguimiento");
    cargarSelectGenericoWs("PROCO", "productoCampania", "Producto Compañia");
    cargarSelectGenericoBd("ConsultarHoraSeguimiento", "horaSeguimiento", "Hora Seguimiento");

});





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
        url: base_url + 'fichacliente/' + funcion,
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
    @descripcion    = cargarSelectGenericoWs() es un llamado ajax generico que solamente sirve para cargar datos a un select desde el webservice y tambien inicializará la clase select2 con su placeholder
    @parametros     = La funcion recibe los siguientes parametros:  
            -> codigo = Codigo de type del ws
            -> idDom = id del select que se le cargará la informacion consultada
            -> placeholder = placeholder que llevará el select
    @return         = Ingresará los valores al select con la clase select2 inicializada

*/
function cargarSelectGenericoWs(codigo, idDom, placeholder) {
    $.ajax({
        url: base_url + 'fichacliente/ConsultarTypes',
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
    @descripcion    = SeleccionOptionSelect() es una funcion que permite seleccionar un option dentro de select por medio del value del option
    @parametros     = La funcion recibe los siguientes parametros:  
        -> idSelect        = id del select que se desea seleccionar otro option
        -> idComparado     = option que se quiere seleccionar, pero debe de tener en cuenta que tiene que identificarlo por el value
    @return         = Seleccion del option dentro del select
*/
function SeleccionOptionSelect(idSelect, idComparado) {

    var selectBuscado = document.getElementById(idSelect);

    for (let index = 0; index < selectBuscado.length; index++) {

        if (selectBuscado[index].value == idComparado) {

            selectBuscado.children[index].selected = true;
            $("#" + idSelect).val(idComparado); // Select the option with a value of '1'
            $("#" + idSelect).trigger('change'); // Notify any JS components that the value changed

            break;
        }
    }
}





/*
    @descripcion    = calcularEdad() sirve para calcular las edades de los clientes teniendo en cuenta su fecha de nacimiento.
    @parametros     = La funcion recibe los siguientes parametros:  
            -> fecha  = fecha de nacimiento del cliente en formato "1998-08-02T00:00:00.000Z"
    @return         = retornará la edad del cliente.
*/
function calcularEdad(fecha) {
    var hoy = new Date();
    var splitFecha = fecha.split("-");
    var formatFecha = `${splitFecha[0]}-${splitFecha[1]}-${splitFecha[2]}`;
    var cumpleanos = new Date(formatFecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return (edad) ? edad : "Fecha de nacimiento incorrecta";
}





/*
    @descripcion    = calcularGenero() sirve para calcular el genero del cliente
    @parametros     = La funcion recibe los siguientes parametros:  
            -> data  = el id del genero del cliente.
    @return         = retornará el genero del cliente.
*/
function calcularGenero(data) {

    var response = "";

    switch (data) {

        case "21":
            response = "Hombre";
            break;

        case "22":
            response = "Mujer";
            break;

        case "23":
            response = "Otro";
            break;

        default:
            response = "No ingresado al sistema";
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




/* Por cada tabla se debe crear una variable a la cual se le asignará el datatable seleccionado*/

var tableUsuarios = null;
var tableVehiculos = null;
var tableSeguros = null;
var tableArchivos = null;
var tableSeguimientos = null;

function datatables() {
    tableUsuarios = $('#tableUsuarios').DataTable({
        deferRender: true,
        responsive: true,
        processing: true,
        searching: false,
        language: {
            url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
        },
        columnDefs: [{
            responsivePriority: 1,
            targets: 0
        },
        {
            responsivePriority: 2,
            targets: 1
        },
        {
            responsivePriority: 3,
            targets: 2
        },
        {
            responsivePriority: 4,
            targets: 3
        },
        {
            responsivePriority: 5,
            targets: 4
        },
        {
            responsivePriority: 6,
            targets: 5
        }
        ]
    });
}





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





/*
    @descripcion    = buscarClienteProspecto() Se ejecuta cuando el usuario ingresa los valores en el input de busqueda y da click en el boton de filtrar para la busqueda
    @parametros     = La funcion trabaja con los siguientes parametros:  
            -> datoBusqueda = Es la informacion ingresada en el input de busqueda
    @return         = Una vez consultada la informacion se mostrará un datatable con los clientes, si no encuentra ningun cliente retornará un mensaje de warning
*/
function buscarClienteProspecto() {

    var spinnerLoad = `
        <div id="spinner_load" class="spinner-border text-light spinner-grow-sm" role="status" style="margin-right: 5px">
            <span class="sr-only">Loading...</span>
        </div>`;

    $("#filterinput").html(spinnerLoad);

    var datoBusqueda = $("#buscarClienteProspecto").val();

    // if (datoBusqueda != "") {
        $.ajax({
            url: base_url + 'fichacliente/consultarClientesController',
            method: 'POST',
            data: { datoBusqueda },
            success: function (objData) {

                var objData = JSON.parse(objData);

                if (objData.status == 'success') {

                    Message("Informacion consultada", "success");
                    $("#filterinput").html("Filtrar");
                    llenarTableClientes(objData);

                } else {
                    $("#filterinput").html("Filtrar");
                    Message("Informacion no encontrada", "warning");

                }
            }
        })
    // } else {
    //     Message('Debes de ingresar información para consultar', 'warning');

    // }

}





/*
    @descripcion    = llenarTableClientes() es un llamado que se realiza desde la funcion buscarClienteProspecto() una vez la consulta del cliente se encuentre en success
    @parametros     = La funcion recibe los siguientes parametros:  
            -> objData = es el json de la respuesta del controlador
    @return         = retornará un datatable con la informacion de los clientes que conincidan con la informacion consultada.
*/
function llenarTableClientes(objData) {


    var tbodyTable = `
        <thead>
            <th> <b> # </b> </th>
            <th> <b> Nombre </b> </th>
            <th> <b> Documento </b> </th>
            <th> <b> # Póliza </b> </th>
            <th> <b> Apellidos </b> </th>
            <th> <b> electronico </b> </th>
            <th> <b> Edad </b> </th>
            <th> <b> Sexo </b> </th>
            <th> <b> nacimiento </b> </th>
            <th> <b> Ver más </b> </th>
        </thead>
        <tbody>
    `;


    console.log(objData);



    objData.data.forEach(function (valor, indice) {

        var nombreCompleto = `${valor.infoTomador.primer_nombre} ${valor.infoTomador.segundo_nombre}`;
        nombreCompleto = nombreCompleto.toUpperCase().replace(/NULL/g, '');

        var apellidoCompleto = `${valor.infoTomador.primer_apellido} ${valor.infoTomador.segundo_apellido}`;
        apellidoCompleto = apellidoCompleto.toUpperCase().replace(/NULL/g, '')


        tbodyTable += `<tr>
                            <td> ${indice} </td>
                            <td> ${nombreCompleto} </td>
                            <td> ${valor.infoTomador.identificacion} </td>
                            <td> ${valor.infoPoliza.numero_poliza} </td>
                            <td> ${apellidoCompleto} </td>
                            <td> ${valor.infoTomador.correo_electronico} </td>
                            <td> ${calcularEdad((valor.infoTomador.fecha_nacimiento).substr(0, 10))} </td>
                            <td> ${valor.infoTomador.genero} </td>
                            <td> ${(valor.infoTomador.fecha_nacimiento).substr(0, 10)} </td>
                            <td>
                                <img onclick="showFichaCliente(${valor.infoTomador.cliente_id})" style="height: 24px; cursor: pointer; vertical-align: unset;" src="${base_url}/Assets/images/plus-2.svg" alt="addSeg"/>
                                <div style="display:none;" class="spinner-border text-primary spinnerTable_${valor.infoTomador.cliente_id}" role="status"><span class="sr-only">Loading...</span></div>
                            </td>
                        </tr>`;

    });

    tbodyTable += `</tbody>`;


    if (tableUsuarios) tableUsuarios.destroy();
    $('#tableUsuarios').html(tbodyTable);
    datatables();

}





/*
    @descripcion    = showFichaCliente() es un llamado que se realiza desde la funcion llenarTableClientes() por medio de un onclick() el cual consultará la informacion de la ficha cliente
    @parametros     = La funcion recibe los siguientes parametros:  
            -> idCliente = id del cliente que se requiere ver la ficha.
    @return         = retornará la informacion relacionada al cliente y los datatables de: Seguimientos Relacionados con el cliente, Documentos Relacionados con el clienteVehiculos relacionados al cliente,  Seguros relacionados al cliente
*/
function showFichaCliente(idCliente) {

    $(".spinnerTable_" + idCliente).css("display", "inline-block");
    $("#hiddenKey").val(idCliente);
    $("#page_title").html("FICHA CLIENTE");

    $.ajax({
        url: base_url + 'fichacliente/ConsultarFichaCliente',
        method: 'POST',
        data: { idCliente },
        success: function (data) {

            var objData = JSON.parse(data);

            $("#spinnerTable_" + idCliente).fadeToggle(200);
            $("#divFomurlarioConsulta").fadeToggle(500);
            $("#divInfoCliente").fadeIn(1000);
            $("#tablesSeguimientos").fadeIn(1000);
            window.scrollTo({ top: 0, behavior: 'smooth' });


            console.log("fichacliente");
            console.log(objData);

            llenarInputsFichaCliente(objData);
            llenarTableSeguimientos(idCliente);
            llenarTableVehiculosRelacionados(objData);
            llenarTableSegurosRelacionados(objData);
            llenarTableDocumentosRelacionados(idCliente);



        }
    });




}





/*
    @descripcion    = llenarInputsFichaCliente() es un llamado que se realiza desde la funcion showFichaCliente() el cual mostrará la informacion de la ficha cliente en los inputs
    @parametros     = La funcion recibe los siguientes parametros:  
            -> data = informacion que retorna el controlador
    @return         = retornará la informacion relacionada al cliente en todos los inputs correspondientes.
*/
function llenarInputsFichaCliente(data) {

    var info = data.data.infoCliente;

    var nombreCompleto = `${info.primer_nombre} ${info.segundo_nombre} ${info.primer_apellido} ${info.segundo_apellido}`;
    nombreCompleto = nombreCompleto.toUpperCase().replace(/NULL/g, '');

    $("#nombres").val(nombreCompleto);
    $("#numDocumento").val(info.identificacion);
    $("#correo").val(info.correo_electronico);
    $("#telefono1").val(info.numero_telefonico1);
    $("#telefono2").val(info.numero_telefonico2);
    $("#direccion").val(info.direccion);
    $('#fechaNacimiento').val(SplitFechaWs(info.fecha_nacimiento));

    SeleccionOptionSelect("tipoIdentificacion", info.tipo_documento_id);
    SeleccionOptionSelect("sexo", info.genero_id);
    SeleccionOptionSelect("canal", info.canal_cliente_id);
    SeleccionOptionSelect("ciudad", info.ciudad_id);


}





/*
    @descripcion    = llenarTableSeguimientos() es un llamado que se realiza desde la funcion showFichaCliente() y addSeguimiento() el cual mostrará la informacion de los seguimientos relacionados al cliente.
    @parametros     = La funcion recibe los siguientes parametros:  
            -> hiddenKey = id del cliente consultado
    @return         = retornará un datatable con la informacion relacionada a los seguimientos.
*/
function llenarTableSeguimientos(hiddenKey) {

    $.ajax({
        url: base_url + 'fichacliente/ConsultarSeguimientos',
        method: 'POST',
        data: { hiddenKey },
        success: function (data) {

            var objData = JSON.parse(data);
            console.log("Seguimeintos");
            console.log(objData);

            if (objData.status == 'success') {


                var tbodyTable = `
                    <thead>
                        <th> <b> Asunto de Seguimiento </b> </th>
                        <th> <b> Producto campaña </b> </th>
                        <th> <b> Fecha seguimientos </b> </th>
                        <th> <b> Hora Seguimientos </b> </th>
                        <th> <b> Comentario </b> </th>
                    </thead>
                    <tbody>
                `;



                objData.data.forEach(function (valor, indice) {

                    tbodyTable += `<tr>
                                        <td> ${valor.asunto_seguimiento} </td>
                                        <td> ${valor.producto_campania} </td>
                                        <td> ${(valor.fecha_seguimiento).substr(0, 10)} </td>
                                        <td> ${valor.hora_seguimiento} </td>
                                        <td> ${valor.observacion} </td>
                                    </tr>`;

                });

                tbodyTable += `</tbody > `;

                if (tableSeguimientos) { tableSeguimientos.destroy() }

                $("#tableSeguimientos").html(tbodyTable);

                tableSeguimientos = settingsTable("tableSeguimientos", true);

            }



        }
    });

}





/*
    @descripcion    = llenarTableVehiculosRelacionados() es un llamado que se realiza desde la funcion showFichaCliente() el cual mostrará la informacion de los vehiculos relacionados al cliente.
    @parametros     = La funcion recibe los siguientes parametros:  
            -> objData = informacion que retorna el controlador
    @return         = retornará un datatable con la informacion relacionada a los seguimientos.
*/
function llenarTableVehiculosRelacionados(objData) {



    var tbodyTable = `
                <thead>
                    <th> <b> # </b> </th>
                    <th> <b> Placa </b> </th>
                    <th> <b> Clase </b> </th>
                    <th> <b> Marca </b> </th>
                </thead >
                <tbody>
            `;



    objData.data.infoAdicional.forEach(function (valor, indice) {

        tbodyTable += `<tr>
                            <td> ${indice} </td>
                            <td> ${valor.infoVehiculo.placa} </td>
                            <td> ${valor.infoVehiculo.clase_vehiculo} </td>
                            <td> ${valor.infoVehiculo.marca} </td>
                        </tr>`;

    });

    tbodyTable += `</tbody > `;

    if (tableVehiculos) { tableVehiculos.destroy() }

    $("#tableVehiculos").html(tbodyTable);

    tableVehiculos = settingsTable("tableVehiculos", true);

}





/*
    @descripcion    = llenarTableSegurosRelacionados() es un llamado que se realiza desde la funcion showFichaCliente() el cual mostrará la informacion de los seguros relacionados al cliente.
    @parametros     = La funcion recibe los siguientes parametros:  
            -> objData = informacion que retorna el controlador
    @return         = retornará un datatable con la informacion relacionada a los seguimientos.
*/
function llenarTableSegurosRelacionados(objData) {


    var tbodyTable = `
                <thead>
                    <th> <b> # </b> </th>
                    <th> <b> Poliza </b> </th>
                    <th> <b> Placa </b> </th>
                    <th> <b> Estado </b> </th>
                </thead>
                <tbody>
            `;



    objData.data.infoAdicional.forEach(function (valor, indice) {

        tbodyTable += `<tr>
                            <td> ${indice} </td>
                            <td> ${valor.infoPoliza.numero_poliza} </td>
                            <td> ${valor.infoPoliza.riesgo} </td>
                            <td> ${valor.infoPoliza.estado} </td>
                        </tr>`;

    });

    tbodyTable += `</tbody > `;

    if (tableSeguros) { tableSeguros.destroy() }

    $("#tableSeguros").html(tbodyTable);

    tableSeguros = settingsTable("tableSeguros", true);

}





/*
    @descripcion    = llenarTableDocumentosRelacionados() es un llamado que se realiza desde la funcion showFichaCliente() el cual mostrará la informacion de los archivos relacionados al cliente.
    @parametros     = La funcion recibe los siguientes parametros:  
            -> hiddenKey = id del cliente consultado
    @return         = retornará un datatable con la informacion relacionada a los seguimientos.
*/
function llenarTableDocumentosRelacionados(hiddenKey) {
    $.ajax({
        url: base_url + 'fichacliente/ConsultarArchivosRelacionadosCliente',
        method: 'POST',
        data: { hiddenKey },
        success: function (objData) {

            var objData = JSON.parse(objData);

            console.log("documentos relacionados");
            console.log(objData);

            if (objData.status == 'success') {

                var tbodyTable = `
                <thead>
                    <th> <b> Tipo de documento </b> </th>
                    <th> <b> Fecha de creación </b> </th>
                    <th> <b> Tamaño del archivo </b> </th>
                    <th> <b> Ver documento </b> </th>
                </thead>
                <tbody>
            `;

                objData.data.forEach(function (valor, indice) {


                    tbodyTable += `<tr>
                                        <td> ${(valor.tipo_documento_ficha).toUpperCase()} </td>
                                        <td> ${SplitFechaWs(valor.fecha_creacion)} </td>
                                        <td> ${valor.tamanio_archivo}Mb </td>
                                        <td onclick="abrirDocumento('${valor.ruta_archivo}')"><i class="fa fa-search-plus fa-2x" style="color: #17a2b8;" aria-hidden="true"></i></td>
                                    </tr>`;

                });

                tbodyTable += `</tbody > `;

                if (tableArchivos) { tableArchivos.destroy() }

                $("#tableArchivos").html(tbodyTable);

                tableArchivos = settingsTable("tableArchivos", true);

            }
        }
    })

}





/*
    @descripcion    = abrirDocumento() es un llamado que se realiza desde la funcion llenarTableDocumentosRelacionados() por medio de un onclick() el cual abrirá el archivo seleccionado
    @parametros     = La funcion recibe los siguientes parametros:  
            -> fileName = nombre del archivo seleccionado
    @return         = abrirá el archivo en una pestaña nueva
*/
function abrirDocumento(fileName) {

    window.open("https://webservice.grupoasistencia.com/uploads/" + fileName, '_blank');

}





/*
    @descripcion    = addSeguimiento() Se ejecuta cuando el usuario ingresa la informacion en la seccion de "Programar Seguimiento" y da click en el boton de "guardar"
    @parametros     = La funcion trabaja con los siguientes parametros:  
            -> asuntoSeguimiento = asunto para el seguimiento
            -> productoCampania = producto de la campaña del seguimiento
            -> fechaSeguimiento = fecha del seguimiento
            -> horaSeguimiento = hora del seguimiento
            -> observacionesSeguimiento = observaciones del seguimiento
            -> hiddenKey = id del cliente al que se le va a programar el seguimiento
    @return         = Una vez ingresada toda la informacion retornara un mensaje de confirmacion y la informacion ingresada se visulizará en el datatable de llenarTableSeguimientos()
*/
function addSeguimiento() {


    var asuntoSeguimiento = $("#asuntoSeguimiento").val();
    var productoCampania = $("#productoCampania").val();
    var fechaSeguimiento = $("#fechaSeguimiento").val();
    var horaSeguimiento = $("#horaSeguimiento").val();
    var observacionesSeguimiento = $("#observacionesSeguimiento").val();
    var hiddenKey = $("#hiddenKey").val();  //Id del cliente consultado

    var spinnerLoad = ` &nbsp; <div id="spinner_load" class="spinner-border text-light spinner-grow-sm" role="status" style="margin-right: 5px"><span class="sr-only">Loading...</span></div>`;
    $("#btnAddSeguimiento").append(spinnerLoad);



    if (
        asuntoSeguimiento != "" &&
        productoCampania != "" &&
        fechaSeguimiento != "" &&
        horaSeguimiento != "" &&
        observacionesSeguimiento != ""
    ) {
        $.ajax({
            url: base_url + 'fichacliente/AddSeguimientoCliente',
            method: 'POST',
            data: {
                asuntoSeguimiento,
                productoCampania,
                fechaSeguimiento,
                horaSeguimiento,
                observacionesSeguimiento,
                hiddenKey
            },
            success: function (objData) {

                var objData = JSON.parse(objData);


                if (objData.status == 'success') {

                    Message("Informacion guardada.", "success");

                    $("#spinner_load").remove();
                    $("#fechaSeguimiento").val("");
                    $("#observacionesSeguimiento").val("");
                    SeleccionOptionSelect("asuntoSeguimiento", "null");
                    SeleccionOptionSelect("productoCampania", "null");
                    SeleccionOptionSelect("horaSeguimiento", "null");

                    llenarTableSeguimientos(hiddenKey);

                } else {

                    $("#spinner_load").remove();
                    Message("Informacion no encontrada", "warning");

                }
            }
        })
    } else {

        Message('Debes de ingresar la información de seguimiento completa.', 'warning');
        $("#spinner_load").remove();

    }


}



/*
    @descripcion    = addFileCustomer() es una funcion que se ejecuta cuando van agregar un archivo referente a los clientes
    @parametros     = La funcion traba con los siguientes parametros:  
            -> formulario = formulario tipo multipart/form-data que trae el tipo de documento, el archivo y el id del cliente hidden
    @return         = mensaje de success y  recargará la tabla de archivos
*/
function addFileCustomer() {


    var spinnerLoad = `<div id="spinner_load" class="spinner-border text-light spinner-grow-sm" role="status" style="margin-right: 5px"><span class="sr-only">Loading...</span></div>`;
    $("#btnAddFile").html(spinnerLoad);

    $.ajax({
        url: base_url + 'fichapoliza/ConsultarTypes',
        type: "POST",
        data: { "codigo": "TARFC" },
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
                        confirmButtonText: 'Aceptar',
                        showCancelButton: false,
                        showConfirmButton: false
                    });

                    $.ajax({
                        url: base_url + 'fichacliente/AddDocument',
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {

                            var objData = JSON.parse(data);

                            if (objData.status == 'success') {

                                Swal.fire({
                                    icon: "success",
                                    html: "<h3>Documento subido correctamente</h3>",
                                    confirmButtonText: 'Aceptar'
                                });

                                var hiddenKey = $("#hiddenKey").val();
                                llenarTableDocumentosRelacionados(hiddenKey);

                            } else {

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

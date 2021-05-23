var table = ''
$(document).ready(function () {
    $('#bs-accordion').hide()

    $('#filter_vehiculo').click(function () {
        $('#bs-accordion').hide()
        var info = $('input[name=filter]').val()
        $.ajax({
            url: base_url + 'vehiculos/filter_vehiculo',
            type: 'GET',
            dataType: "JSON",
            data: {
                dato: info
            },
            beforeSend: function (e) {
                icon_spinner('span#icon-search', 'show')
            },
            success: function (dato) {                
                var html = ''
                var i = 1
                icon_spinner('span#icon-search', 'hide')
                if (dato.status == "success") {

                    dato.result.forEach(element => {


                        html += `<tr>
                                    <td>${i++}</td>
                                    <td>${element.placa}</td>
                                    <td>${element.marca}</td>
                                    <td>${element.linea}</td>
                                    <td>
                                        <button id="btnObtenerDatos", 'show' onClick="ObtenerDatos('${element.placa}')" class="btn btn-warning">
                                            <i id="btnOD" class="fa fa-search"></i>
                                        </button>
                                    </td>
                                </tr>`
                    });
                }


                if (table) table.destroy()
                $('#tableVehiculos tbody').html(html)
                datatables()

                icon_spinner('span#icon-search', 'hide')
            },
            error: function (e) {
                icon_spinner('span#icon-search', 'hide')
            }
        })
    })
    datatables()

    // Change the fixed ordering when the data source is updated
    table.on('rowgroup-datasrc', function (e, dt, val) {
        table.order.fixed({
            pre: [
                [val, 'asc']
            ]
        }).draw();
    });

    $('a.group-by').on('click', function (e) {
        e.preventDefault();

        table.rowGroup().dataSrc($(this).data('column'));
    });
})


var tablePolizasSoat = null;
var tablePolizasTrRespoCivil = null;
var tableOtrosVencimientos = null;

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
    table = $('#tableVehiculos').DataTable({
        order: [
            [1, 'asc']
        ],
        deferRender: true,
        responsive: true,
        processing: true,
        searching: false,
        rowGroup: {
            startRender: null,
            endRender: function (rows, group) {
                return group + ' (' + rows.count() + ')';
            },
            dataSrc: 1
        },
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
        }
        ]
    });
}




function ObtenerDatos(placa) {
    $('#bs-accordion').hide()
    $.ajax({
        url: base_url + 'vehiculos/ObtenerDatos',
        type: 'GET',
        dataType: "JSON",
        data: {
            dato: placa
        },
        beforeSend: function (e) {
            button_spinner('#btnOD', 'show')
        },
        success: function (dato) {
            button_spinner('#btnOD', 'hide')
            $('#bs-accordion').show()            
            $('#codigo_fasecolda').val(dato.fasecolda != null ? dato.fasecolda : '')
            $('#capacidad_carga').val(dato.capacidad_carga != null ? dato.capacidad_carga : '')
            $('#capacidad_pasajeros').val(dato.capacidad_pasajeros != null ? dato.capacidad_pasajeros : '')
            $('#numero_motor').val(dato.numero_motor != null ? dato.numero_motor : '')
            $('#numero_chasis').val(dato.numero_chasis != null ? dato.numero_chasis : '')
            $('#numero_vin').val(dato.numero_vin != null ? dato.numero_vin : '')
            $('#tipo_combustible').val(dato.tipo_combustible != null ? dato.tipo_combustible : '')
            $('#clase_vehiculo').val(dato.clase_vehiculo != null ? dato.clase_vehiculo : '')
            $('#marca_vehiculo').val(dato.marca != null ? dato.marca : '')
            $('#modelo_vehiculo').val(dato.modelo != null ? dato.modelo : '')
            $('#linea_vehiculo').val(dato.linea != null ? dato.linea : '')
            $('#valor_asegurado').val(dato.valor_asegurado != null ? dato.valor_asegurado : '')
            $('#tipo_servicio').val(dato.tipo_servicio != null ? dato.tipo_servicio : '')
            $('#ciudad_circulacion').val(dato.ciudad_circulacion != null ? dato.ciudad_circulacion : '')



            llenarInformacionPropietarioInteresados(dato);
            llenarInformacionPolizasSoat(dato);
            llenarInformacionPolizasTRyRespoCivil(dato);
            llenarInformacionOtrosVencimientos(dato);

        }
    })

}






function llenarInformacionPropietarioInteresados(dato) {
    // Informacion para el propietario e interesados

    var nombreCompleto = `${dato.polizas[0].asegurado.primer_nombre} ${dato.polizas[0].asegurado.segundo_nombre}`;
    nombreCompleto = nombreCompleto.toUpperCase().replace(/NULL/g, '');

    var apellidoCompleto = `${dato.polizas[0].asegurado.primer_apellido} ${dato.polizas[0].asegurado.segundo_apellido}`;
    apellidoCompleto = apellidoCompleto.toUpperCase().replace(/NULL/g, '')

    $('#nombres').val(nombreCompleto);
    $('#apellidos').val(apellidoCompleto);
    $('#identificacion').val(dato.polizas[0].asegurado.identificacion != null ? dato.polizas[0].asegurado.identificacion : '')
    $('#fecha_nacimiento').val(SplitFechaWs(dato.polizas[0].asegurado.fecha_nacimiento));
    $('#numero_telefonico').val(dato.polizas[0].asegurado.numero_telefonico1 != null ? dato.polizas[0].asegurado.numero_telefonico1 : '')
    $('#direccion').val(dato.polizas[0].asegurado.direccion != null ? dato.polizas[0].asegurado.direccion : '')
    $('#correo_electronico').val(dato.polizas[0].asegurado.correo_electronico != null ? dato.polizas[0].asegurado.correo_electronico : '')
    $('#tipDoc').val(dato.polizas[0].tomador.tipo_documento != null ? dato.polizas[0].tomador.tipo_documento : '')
    $('#genero').val(dato.polizas[0].tomador.genero != null ? dato.polizas[0].tomador.genero : '')
    $('#estadoCivil').val(dato.polizas[0].tomador.estado_civil != null ? dato.polizas[0].tomador.estado_civil : '')
}



function llenarInformacionPolizasSoat(dato) {


    var html = `
        <thead>
            <th> <b> # Póliza </b> </th>
            <th> <b> Fecha Expedicion </b> </th>
            <th> <b> Fecha inicio Vigencia </b> </th>
            <th> <b> Fecha Fin Vigencia </b> </th>
            <th> <b> Aseguradora </b> </th>
            <th> <b> Estado Poliza </b> </th>
        </thead>
        <tbody>
    `;


    dato.polizas.forEach(element => {

        if (element.ramo == "SOAT") {

            html += `<tr>
                    <td>${element.numero_poliza}</td>
                    <td>${SplitFechaWs(element.fecha_expedicion)}</td>
                    <td>${SplitFechaWs(element.fecha_inicio_vigencia)}</td>
                    <td>${SplitFechaWs(element.fecha_final_vigencia)}</td>
                    <td>${element.aseguradora}</td>
                    <td>${element.estado}</td>
                </tr>`;
        }
    });

    html += `</tbody>`;

    if (tablePolizasSoat) { tablePolizasSoat.destroy() }

    $("#tablePolizasSoat").html(html);

    tablePolizasSoat = settingsTable("tablePolizasSoat");

}



function llenarInformacionPolizasTRyRespoCivil(dato) {


    var html = `
        <thead>
            <th> <b> # Póliza </b> </th>
            <th> <b> Fecha Expedicion </b> </th>
            <th> <b> Fecha inicio Vigencia </b> </th>
            <th> <b> Fecha Fin Vigencia </b> </th>
            <th> <b> Aseguradora </b> </th>
            <th> <b> Ramo </b> </th>
            <th> <b> Estado Poliza </b> </th>
        </thead>
        <tbody>
    `;


    dato.polizas.forEach(element => {

        if (element.ramo != "SOAT") {

            html += `<tr>
                    <td>${element.numero_poliza}</td>
                    <td>${SplitFechaWs(element.fecha_expedicion)}</td>
                    <td>${SplitFechaWs(element.fecha_inicio_vigencia)}</td>
                    <td>${SplitFechaWs(element.fecha_final_vigencia)}</td>
                    <td>${element.aseguradora}</td>
                    <td>${element.ramo}</td>
                    <td>${element.estado}</td>
                </tr>`;
        }
    });

    html += `</tbody>`;

    if (tablePolizasTrRespoCivil) { tablePolizasTrRespoCivil.destroy() }

    $("#tablePolizasTrRespoCivil").html(html);

    tablePolizasTrRespoCivil = settingsTable("tablePolizasTrRespoCivil");


}




function llenarInformacionOtrosVencimientos(dato) {

    var html = `
        <thead>
            <th> <b> Tipo </b> </th>
            <th> <b> Fecha fin Vigencia </b> </th>
        </thead>
        <tbody>
    `;


    // dato.polizas.forEach(element => {

    // html += `<tr>
    //             <td>${element.numero_poliza}</td>
    //             <td>${SplitFechaWs(element.fecha_expedicion)}</td>
    //             <td>${SplitFechaWs(element.fecha_inicio_vigencia)}</td>
    //             <td>${SplitFechaWs(element.fecha_final_vigencia)}</td>
    //             <td>${element.aseguradora}</td>
    //             <td>${element.estado}</td>
    //         </tr>`;

    // });

    html += `</tbody>`;

    if (tableOtrosVencimientos) { tableOtrosVencimientos.destroy() }

    $("#tableOtrosVencimientos").html(html);

    tableOtrosVencimientos = settingsTable("tableOtrosVencimientos");

}








/*
    @descripcion    = SplitFechaWs() sirve para limpiar las fechas que vengan del ws
    @parametros     = La funcion recibe los siguientes parametros:  
            -> fechaWs  = fecha del ws en formato "1998-08-02T00:00:00.000Z"
    @return         = retornará la fecha en formato "1998-08-02"
*/
function SplitFechaWs(fechaWs) {

    var splitFechaWs = (fechaWs.substr(0, 10)).split("-");
    var formatFechaWs = `${splitFechaWs[0]}-${splitFechaWs[1]}-${splitFechaWs[2]}`;

    return formatFechaWs;

}

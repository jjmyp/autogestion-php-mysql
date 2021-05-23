var table = ''
$(document).ready(function () {

    $('#ramo').select2({
        placeholder: 'Ramo',
        width: '100%'
    });

    
    $.ajax({
        url: base_url + 'siniestros/ramos_siniestros',
        type: 'GET',
        dataType: "json",
        success: function (dato) {
            var html = '<option value="">Ramo</option>'
            dato.result.forEach(element => {
                html += `<option value="${element.tipos_id}">${element.descripcion_tipos}</option>`
            });
            $('select#ramo').html(html)
        }
    })
    
    $('#filter_siniestro').click(function () {
        var info = $('input[name=filter]').val()
        var ramo = $('select[name=ramo]').val()
        $.ajax({
            url: base_url + 'siniestros/filter_siniestro',
            type: 'GET',
            dataType: "JSON",
            data: {
                dato: info,
                ramo: ramo
            },
            beforeSend: function (e) {
                icon_spinner('span#icon-search', 'show')
            },
            success: function (dato) {
                console.log(dato)
                var html = ''
                var i = 1
                if (dato.status == "success") {
                    dato.result.forEach(element => {
                        html += `<tr>
                                    <td>${i++}</td>
                                    <td>${element.poliza.numero_poliza}</td>
                                    <td>${element.cliente.primer_nombre ? element.cliente.primer_nombre : ''} ${element.cliente.segundo_nombre ? element.cliente.segundo_nombre : ''}</td>
                                    <td>${element.cliente.primer_apellido ? element.cliente.primer_apellido : ''} ${element.cliente.segundo_apellido ? element.cliente.segundo_apellido : ''}</td>
                                    <td>${element.cliente.tipo_documento}</td>
                                    <td>${element.cliente.identificacion}</td>
                                    <td>${element.poliza.riesgo}</td>
                                    <td>${SplitFechaWs(element.poliza.fecha_inicio_vigencia)}</td>
                                    <td>${SplitFechaWs(element.poliza.fecha_final_vigencia)}</td>
                                    <td>${element.poliza.aseguradora}</td>
                                    <td>${SplitFechaWs(element.fecha_siniestro)}</td>
                                    <td>${element.amparo_afectado}</td>
                                    <td>${element.estado_siniestro}</td>
                                    <td>${element.observacion}</td>
                                    <td>${SplitFechaWs(element.fecha_pago)}</td>                                
                                </tr>`
                    });
                }
                
                if (table) table.destroy()
                $('#tableSiniestros tbody').html(html)
                datatables()

                icon_spinner('span#icon-search', 'hide')
            },
            error: function (e) {
                icon_spinner('span#icon-search', 'hide')
            }
        })
    })
    datatables()
})



function datatables() {
    table = $('#tableSiniestros').DataTable({
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
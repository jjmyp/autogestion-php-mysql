var table = ''
$(document).ready(function () {
    $.ajax({
        url: base_url+'cartera/ramos_cartera',
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

    $('#filter_cartera').click(function () {
        var info = $('input[name=filter]').val()
        var ramo = $('select[name=ramo]').val()
        $.ajax({
            url: base_url+'cartera/filter_cartera',
            type: 'GET',
            dataType: "json",
            data: { dato: info, ramo: ramo },
            beforeSend: function (e) {
                icon_spinner('span#icon-search', 'show')
            },
            success: function (dato) {
                var html = ''
                var i = 1
                if(dato.status == "success"){
                    dato.result.forEach(element => {
                        if(!element.soporte_pago){
                            var options = `<input type="file" class="file_send" data-id="${element.poliza_id}" name="file" hidden>
                                            <button type="button" class="btn btn-warning send_file">Subir soporte de pago</button>`
                        }else{
                            var options = `<a href="https://webservice.grupoasistencia.com/uploads/${element.soporte_pago}" target="_blank"><button type="button" class="btn btn-info">Ver soporte de pago</button></a>`
                        }
                        html += `<tr>
                                    <td>${i++}</td>
                                    <td>${element.numero_poliza}</td>
                                    <td>${element.info_cliente.primer_nombre ? element.info_cliente.primer_nombre : ''} ${element.info_cliente.segundo_nombre ? element.info_cliente.segundo_nombre : ''}</td>
                                    <td>${element.info_cliente.primer_apellido ? element.info_cliente.primer_apellido : ''} ${element.info_cliente.segundo_apellido ? element.info_cliente.segundo_apellido : ''}</td>
                                    <td>${element.riesgo}</td>
                                    <td>${element.dias.days}</td>
                                    <td>${element.estado_cartera}</td>
                                    <td>${element.info_cliente.tipo_documento}</td>
                                    <td>${element.info_cliente.identificacion}</td>
                                    <td>${element.ramo}</td>
                                    <td>${element.aseguradora}</td>
                                    <td>${element.fecha_inicio_vigencia}</td>
                                    <td>${element.fecha_limite}</td>
                                    <td>${element.valor_total}</td>
                                    <td>${element.forma_pago}</td>
                                    <td>${element.financiera}</td>
                                    <td>${element.numero_cuotas}</td>
                                    <td>${element.estado}</td>
                                    <td>${element.fecha_pago}</td>
                                    <td class="file">
                                        <form enctype="multipart/form-data" id="form_files">
                                            ${options}
                                        </form>
                                    </td>
                                </tr>`
                    });
                }

                if (table) table.destroy()
                $('#tableCarteras tbody').html(html)
                datatables()

                icon_spinner('span#icon-search', 'hide')
            },
            error: function (e) {
                icon_spinner('span#icon-search', 'hide')
            }
        })
    })

    $(document).on('click', '.send_file', function () {
        $(this).parent().find('input').trigger('click')
    })

    $(document).on('change', '.file_send', function () {
        var form = new FormData()
        form.append("file", $(this)[0].files[0])
        form.append('id',$(this).attr('data-id'))
        var thiss = this
        var form_send_file = $(this).parent('form')

        $.ajax({
            url: base_url+'cartera/file_cartera',
            type: 'post',
            data: form,
            processData: false,
            contentType: false,
            beforeSend: function() {
                var button = $(thiss).parent().find('button')
                var html = $(button).html()+` <i class="fa fa-circle-o-notch fa-spin"></i>`
                $(button).html(html)
            },
            success: function (dato) {
                var html = `<form enctype="multipart/form-data" id="form_files"><a href="https://webservice.grupoasistencia.com/uploads/${dato}" target="_blank"><button type="button" class="btn btn-info">Ver soporte de pago</button></a></form>`
                $(form_send_file).html(html)

                var row = $(form_send_file).closest('tr').prev('tr');
                // var oldVal = table.cell(row, 19).data();
                table.cell(row, 19).data(html).draw();
            }
        })
    })

    datatables()
})

function datatables() {
    table = $('#tableCarteras').DataTable({
        deferRender: true,
        responsive: true,
        processing: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
        },
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: 1 },
            { responsivePriority: 3, targets: 2 },
            { responsivePriority: 4, targets: 3 },
            { responsivePriority: 5, targets: 4 },
            { responsivePriority: 6, targets: 5 }
        ]
    });
}
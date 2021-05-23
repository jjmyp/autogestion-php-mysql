var table = ''
var info_id = ''
$(document).ready(function () {
    $('#filter_broker').click(function () {
        var info = $('input[name=filter]').val()
        $.ajax({
            url: base_url+'fichabroker/filter_broker',
            type: 'GET',
            dataType: "json",
            data: { data: info},
            beforeSend: function (e) {
                icon_spinner('span#icon-search', 'show')
            },
            success: function (dato) {
                var html = ''
                var i = 1
                dato.forEach(element => {
                    html += `<tr id="info-${element.id}">
                                <td>${i++}</td>
                                <td>${element.nombre} ${element.apellido}</td>
                                <td>${element.descripcion}</td>
                                <td>${element.identificacion}</td>
                                <td>${formatFecha(element.fecha_nacimiento)}</td>
                                <td>${element.genero}</td>
                                <td>${element.direccion}</td>
                                <td>${element.nombre_ciudad}</td>
                                <td>${element.telefono}</td>
                                <td>${element.celular}</td>
                                <td>${element.correo_electronico}</td>
                                <td>${element.monto_maximo ? formatNumber(element.monto_maximo) : ""}</td>
                                <td>${element.saldo ? formatNumber(element.saldo) : ""}</td>
                                <td>${element.cupo_maximo ? element.cupo_maximo : ""}</td>
                                <td>${element.estado}</td>
                                <td>${element.causal_bloqueo_desc}</td>
                                <td>${element.canal_desc}</td>
                                <td class="file">
                                    <form>
                                        <button type="button" data-id="${element.id}" class="btn btn-info button-edit">
                                            <i style="margin-right: unset; vertical-align: unset;" class="fa fa-pencil"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>`
                });

                if (table) table.destroy()
                $('#tableBrokers tbody').html(html)
                datatables()

                icon_spinner('span#icon-search', 'hide')
            },
            error: function (e) {
                icon_spinner('span#icon-search', 'hide')
            }
        })
    })

    datatables()
    $('#info').hide()
})

$(document).on('click', '.button-edit', function () {
    var id = $(this).attr('data-id')
    info_id = id
    $.ajax({
        url: base_url+'fichabroker/info_edit',
        type: 'GET',
        dataType: "json",
        data: {id},
        success: function(dato){
            $('#filtro').hide()
            $('#tabla').hide()
            $('#info').show()
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
            var tipos_documentos = '<option value="" disabled selected>Tipo Documento</option>'
            dato.tipos_documentos.forEach(e => {
                if(e.id == dato.info_cliente[0].tipos_documentos_id){
                    tipos_documentos+= `<option value="${e.id}" selected>${e.descripcion}</option>`
                }else{
                    tipos_documentos+= `<option value="${e.id}">${e.descripcion}</option>`
                }
            })
            $('select#tipo_documento').html(tipos_documentos)

            var ciudades = '<option value="" disabled selected>Ciudades</option>'
            dato.ciudades.forEach(e => {
                if(e.id == dato.info_cliente[0].ciudades_id){
                    ciudades+= `<option value="${e.id}" selected>${e.nombre_ciudad}</option>`
                }else{
                    ciudades+= `<option value="${e.id}">${e.nombre_ciudad}</option>`
                }
            })
            $('select#ciudad').html(ciudades)

            var canales = '<option value="" disabled selected>Canal</option>'
            dato.canales.result.forEach(e => {
                if(e.tipos_id == dato.info_cliente[0].canal){
                    canales+= `<option value="${e.tipos_id}" selected>${e.descripcion_tipos}</option>`
                }else{
                    canales+= `<option value="${e.tipos_id}">${e.descripcion_tipos}</option>`
                }
            })
            $('select#canal').html(canales)

            var causal_bloqueos = '<option value="" disabled selected>Causal Bloqueo</option>'
            dato.causal_bloqueos.result.forEach(e => {
                if(e.tipos_id == dato.info_cliente[0].causal_bloqueo){
                    causal_bloqueos+= `<option value="${e.tipos_id}" selected>${e.descripcion_tipos}</option>`
                }else{
                    causal_bloqueos+= `<option value="${e.tipos_id}">${e.descripcion_tipos}</option>`
                }
            })
            $('select#causal_bloqueo').html(causal_bloqueos)

            var genero = `
                        <option value="" disabled selected>Genero</option>
                        <option value="F" ${dato.info_cliente[0].genero == "F" ? "selected" : ""}>Femenino</option>
                        <option value="M" ${dato.info_cliente[0].genero == "M" ? "selected" : ""}>Masculino</option>
                        `
            $('select#genero').html(genero)

            var estado = `
                        <option value="" disabled selected>Esatdo</option>
                        <option value="ACTIVO" ${dato.info_cliente[0].estado == "ACTIVO" ? "selected" : ""}>ACTIVO</option>
                        <option value="INACTIVO" ${dato.info_cliente[0].estado == "INACTIVO" ? "selected" : ""}>INACTIVO</option>
                        `
            $('select#estado').html(estado)

            $('input#id').val(dato.info_cliente[0].id_usuario)
            $('input#nombres').val(dato.info_cliente[0].nombre)
            $('input#apellidos').val(dato.info_cliente[0].apellido)
            $('input#identificacion').val(dato.info_cliente[0].identificacion)
            $('input#fecha_nacimiento').val(dato.info_cliente[0].fecha_nacimiento)
            $('input#direccion').val(dato.info_cliente[0].direccion)
            $('input#telefono').val(dato.info_cliente[0].telefono)
            $('input#celular').val(dato.info_cliente[0].celular)
            $('input#correo_electronico').val(dato.info_cliente[0].correo_electronico)
            $('input#monto_maximo').val(dato.info_cliente[0].monto_maximo)
            $('input#cupo_maximo').val(dato.info_cliente[0].cupo_maximo)
        }
    })
})

$(document).on('submit','form#form_edit',function(e){
    e.preventDefault();
    $('#modalConfirmacion').modal('show')
})

$(document).on('click','#modalConfirmacion button#aceptar',function(){
    $.ajax({
        url: base_url+'fichabroker/edit_info_usuario',
        type: "post",
        dataType: "json",
        data: $('form#form_edit').serialize(),
        success:function(dato){
            // var row = $('td.button[data-id='+dato.id+']').parent('form').closest('tr').prev('tr')
            // var row = $('td button[data-id='+dato.id+']').parent('form').html()
            var row = $('tr#info-'+dato[0].id)
            table.cell(row, 1).data(dato[0].nombre+' '+dato[0].apellido).draw();
            table.cell(row, 2).data(dato[0].descripcion).draw();
            table.cell(row, 3).data(dato[0].identificacion).draw();
            table.cell(row, 4).data(formatFecha(dato[0].fecha_nacimiento)).draw();
            table.cell(row, 5).data(dato[0].genero).draw();
            table.cell(row, 6).data(dato[0].direccion).draw();
            table.cell(row, 7).data(dato[0].nombre_ciudad).draw();
            table.cell(row, 8).data(dato[0].telefono).draw();
            table.cell(row, 9).data(dato[0].celular).draw();
            table.cell(row, 10).data(dato[0].correo_electronico).draw();
            table.cell(row, 11).data(dato[0].monto_maximo ? formatNumber(dato[0].monto_maximo) : "").draw();
            table.cell(row, 12).data(dato[0].saldo ? formatNumber(dato[0].saldo) : "").draw();
            table.cell(row, 13).data(dato[0].cupo_maximo).draw();
            table.cell(row, 14).data(dato[0].estado).draw();
            table.cell(row, 15).data(dato[0].causal_bloqueo_desc).draw();
            table.cell(row, 16).data(dato[0].canal_desc).draw();
            $('#modalConfirmacion').modal('hide')
            Message('Registro guardado con éxito', 'success')
            $('#info').hide()
            $('#filtro').show()
            $('#tabla').show()
            // $('#filter_broker').click()
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
            // console.log(dato);
        }
    })
})

$(document).on('click','#cancelar_form_Edit',function(){
    $('#info').hide()
    $('#filtro').show()
    $('#tabla').show()
    $('html, body').animate({
        scrollTop: 0
    }, 2000);
})

function datatables() {
    table = $('#tableBrokers').DataTable({
        deferRender: true,
        responsive: true,
        processing: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
        },
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: 1 },
            { responsivePriority: 3, targets: 3 },
            { responsivePriority: 4, targets: 14 },
        ]
    });
}

function formatNumber(num) { 
    num += '';
    x = num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function formatFecha(date) {
    date = date.split('-')

    return date[2] + '-' + date[1] + '-' + date[0];
}
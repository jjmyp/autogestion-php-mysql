var table = ''
$(document).ready(function () {

    localStorage.removeItem('formulario');
    localStorage.removeItem('asegurado');
    localStorage.removeItem('vehiculo');

    $("#formConsultaCotizacion").validate({
        event: "blur",
        highlight: function (input) {
            $(input).parents('.form-group').addClass('has-danger');
        },
        unhighlight: function (input) {
            $(input).parents('.form-group').removeClass('has-danger');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        rules: {
            placa: {
                required: true
            },
            nombres: {
                required: true,
            },
            apellidos: {
                required: true
            },
            tipo_documento: {
                required: true
            },
            identificacion: {
                required: true
            },
            fecha_nacimiento: {
                required: true
            },
            genero: {
                required: true
            }
        },
        messages: {
            placa: {
                required: "Digital la placa del vehiculo"
            },
            nombres: {
                required: "Digita tu nombre"
            },
            apellidos: {
                required: "Digita tu apellido"
            },
            tipo_documento: {
                required: "Selecciona el tipo de documento"
            },
            identificacion: {
                required: 'Digita el numero de documento'
            },
            fecha_nacimiento: {
                required: 'Selecciona tu fecha de nacimiento'
            },
            genero: {
                required: 'Selecciona tu sexo'
            }
        },
        // debug: true,
        errorElement: "label"
    });


    $('#btnCotizarNuevo').click(function () {
        window.location = base_url+"polizas/cotizartodoriesgo"
    })


    var url_editar = base_url + 'polizas/editartodoriesgo?idCotizacion='

    $('#filter_cotizacion').click(function () {
        var info = $('input[name=filter]').val()
        $.ajax({
            url: base_url + 'polizas/ObtenerCotizaciones',
            type: 'GET',
            dataType: "JSON",
            data: {
                dato: info
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
                                    <td>${element.fecha_cotizacion}</td>
                                    <td>${element.placa}</td>
                                    <td>${element.vehiculo}</td>
                                    <td>${element.cliente}</td>
                                    <td>
                                        <a href="${url_editar+element.id_cotizacion}" class="btn btn-info">Seleccionar</a>
                                    </td>                       
                                </tr>`
                    });
                }

                if (table) table.destroy()
                $('#tableCotizaciones tbody').html(html)
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
    table = $('#tableCotizaciones').DataTable({
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
            }
        ]
    });
}
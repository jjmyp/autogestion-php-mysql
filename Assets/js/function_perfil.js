$(document).ready(function () {
    $("#formEditarPerfil").validate({
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
            fecha_nacimiento: {
                required: true
            },
            genero: {
                required: true
            },
            direccion: {
                required: true
            },
            ciudad: {
                required: true
            }
        },
        messages: {
            fecha_nacimiento: {
                required: 'Selecciona tu fecha de nacimiento'
            },
            genero: {
                required: 'Selecciona tu sexo'
            },
            direccion: {
                required: 'Digita tu dirección'
            },
            ciudad: {
                required: 'Selecciona la ciudad donde vives.'
            }
        },
        // debug: true,
        errorElement: "label"
    });

    $.ajax({
        url: base_url + 'ciudades/ObtenerCiudadesController/',
        type: 'GET',
        dataType: 'JSON',
        success: function (objData) {
            var html = `<option value="" disabled selected>Ciudad</option>`


            objData.forEach(element => {
                html += `
                    <option value="${element.ciudad_id}">${element.ciudad} - ${element.departamento}</option>
                    `
            });
            $('#ciudad').html(html)
            var ciudad_id = $('#ciudad_id').val()
            $(`#ciudad option[value=${ciudad_id}]`).attr('selected', 'selected');
        }
    })

    // setInterval(() => {
        // $("#ciudad").select2('val', ciudad_id);
        // $('#ciudad').val($('#ciudad_id').val());
    // }, 3000);


    // $('#ciudad').select2({
    //     placeholder: 'Ciudad',
    //     width: '100%'
    // });
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
   
    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });

})



$('#formEditarPerfil').on('submit', function (e) {
    e.preventDefault()

    var valid = $("#formEditarPerfil").valid();

    if (!valid) {return}


    $.ajax({
        url: base_url + 'perfil/EditarPerfil',
        type: 'POST',
        dataType: 'JSON',
        processData: false,
        contentType: false,
        data: new FormData(this),
        success: function (objData) {
            Message(objData.message, objData.status)
            
            setTimeout(() => {
                window.location = base_url + "perfil";
            }, 2000);
        }
    })
})
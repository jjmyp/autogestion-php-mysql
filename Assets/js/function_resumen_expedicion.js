const cotizar_soat_placa = JSON.parse(localStorage.getItem("cotizar_soat_placa"));
const datosemision = JSON.parse(localStorage.getItem("datosemision"));
$(document).ready(function () {

  $("#f_resumen_expedicion").validate({
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
      correo: {
        required: true
      },
      confirmar_correo: {
        required: true
      }
    },
    messages: {
      correo: {
        required: "Digita tu correo electronico",
        email: 'El correo electronico registrado es incorrecto'
      },
      confirmar_correo: {
        required: "Confirma tu correo electronico",
        email: 'El correo electronico registrado es incorrecto'
      }
    },
    // debug: true,
    errorElement: "label"
  });

  $(document).on('keyup', 'input.delete', function (e) {
    var idInput = $(this).data('id') - 1
    if (e.keyCode == 8) {
      $('#codigo' + idInput).focus()
    }
  });

  // if (cotizar_soat_placa === null || cotizar_soat_placa === undefined) {
  //   window.location = base_url + 'cotizarpoliza/soatplaca'
  // }

  console.log(cotizar_soat_placa);

  const marca = cotizar_soat_placa.Body.Vehiculo.Marca;
  const linea = cotizar_soat_placa.Body.Vehiculo.Linea;
  const nombres = marca + "  -  " + linea;
  $("#marca_linea").val(nombres);
  $("#placa").val(cotizar_soat_placa.Body.Vehiculo.Placa);

  $("#modelo").val(cotizar_soat_placa.Body.Vehiculo.Modelo);
  $("#cilindraje").val(cotizar_soat_placa.Body.Vehiculo.Cilindraje);

  $("#nombre").val(cotizar_soat_placa.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona.DatosBasicos.NombreCompleto);
  $("#identificacion").val(cotizar_soat_placa.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona.Identificacion.Identificacion);

  $("#direccion").val(datosemision.direccion);
  $('#celular').val(datosemision.celular);

  $('#correo').val(datosemision.correo_electronico);
  $('#confirmar_correo').val(datosemision.correo_electronico);

  console.log(localStorage.getItem("cotizar_soat_placa"));

  /*
    Tomar una fotografía y guardarla en un archivo v3
    @date 2018-10-22
    @author parzibyte
    @web parzibyte.me/blog
 */
  const tieneSoporteUserMedia = () =>
    !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
  const _getUserMedia = (...arguments) =>
    (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);

  // Declaramos elementos del DOM
  const $video = document.querySelector("#video"),
    $canvas = document.querySelector("#canvas"),
    $estado = document.querySelector("#estado"),
    $informacion = document.querySelector("#informacion"),
    $boton = document.querySelector("#boton"),
    $botonsiguiente = document.querySelector('#botonsiguiente')
  $listaDeDispositivos = document.querySelector("#listaDeDispositivos");

  const limpiarSelect = () => {
    for (let x = $listaDeDispositivos.options.length - 1; x >= 0; x--)
      $listaDeDispositivos.remove(x);
  };
  const obtenerDispositivos = () => navigator
    .mediaDevices
    .enumerateDevices();

  // La función que es llamada después de que ya se dieron los permisos
  // Lo que hace es llenar el select con los dispositivos obtenidos
  const llenarSelectConDispositivosDisponibles = () => {

    limpiarSelect();
    obtenerDispositivos()
      .then(dispositivos => {
        const dispositivosDeVideo = [];
        dispositivos.forEach(dispositivo => {
          const tipo = dispositivo.kind;
          if (tipo === "videoinput") {
            dispositivosDeVideo.push(dispositivo);
          }
        });

        // Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
        if (dispositivosDeVideo.length > 0) {
          // Llenar el select
          dispositivosDeVideo.forEach(dispositivo => {
            const option = document.createElement('option');
            option.value = dispositivo.deviceId;
            option.text = dispositivo.label;
            $listaDeDispositivos.appendChild(option);
          });
        }
      });
  }

  (function () {
    // Comenzamos viendo si tiene soporte, si no, nos detenemos
    if (!tieneSoporteUserMedia()) {
      alert("Lo siento. Tu navegador no soporta esta característica");
      $estado.innerHTML = "Parece que tu navegador no soporta esta característica. Intenta actualizarlo.";
      return;
    }
    //Aquí guardaremos el stream globalmente
    let stream;

    // Comenzamos pidiendo los dispositivos
    obtenerDispositivos()
      .then(dispositivos => {
        // Vamos a filtrarlos y guardar aquí los de vídeo
        const dispositivosDeVideo = [];

        // Recorrer y filtrar
        dispositivos.forEach(function (dispositivo) {
          const tipo = dispositivo.kind;
          if (tipo === "videoinput") {
            dispositivosDeVideo.push(dispositivo);
          }
        });

        // Vemos si encontramos algún dispositivo, y en caso de que si, entonces llamamos a la función
        // y le pasamos el id de dispositivo
        if (dispositivosDeVideo.length > 0) {
          // Mostrar stream con el ID del primer dispositivo, luego el usuario puede cambiar
          mostrarStream(dispositivosDeVideo[0].deviceId);
        }
      });

    const mostrarStream = idDeDispositivo => {
      _getUserMedia({
        video: {
          // Justo aquí indicamos cuál dispositivo usar
          deviceId: idDeDispositivo,
          width: { min: 200, ideal: 300, max: 1920 },
          height: { min: 200, ideal: 300, max: 1080 },
        }
      },
        (streamObtenido) => {
          // Aquí ya tenemos permisos, ahora sí llenamos el select,
          // pues si no, no nos daría el nombre de los dispositivos
          llenarSelectConDispositivosDisponibles();

          // Escuchar cuando seleccionen otra opción y entonces llamar a esta función
          $listaDeDispositivos.onchange = () => {
            // Detener el stream
            if (stream) {
              stream.getTracks().forEach(function (track) {
                track.stop();
              });
            }
            // Mostrar el nuevo stream con el dispositivo seleccionado
            mostrarStream($listaDeDispositivos.value);
          }

          // Simple asignación
          stream = streamObtenido;

          // Mandamos el stream de la cámara al elemento de vídeo
          $video.srcObject = stream;
          $video.play();

          //Escuchar el click del botón para tomar la foto
          $boton.addEventListener("click", function () {

            //Pausar reproducción
            $video.pause();

            //Obtener contexto del canvas y dibujar sobre él
            let contexto = $canvas.getContext("2d");
            $canvas.width = $video.videoWidth;
            $canvas.height = $video.videoHeight;
            contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);

            let foto = $canvas.toDataURL(); //Esta es la foto, en base 64
            console.log(foto);
            $("#response").val(foto);
            $("#prueba").click(function name(params) {
              document.getElementById('ver').setAttribute('src', $("#response").val());
              var img = {

                imagen: document.getElementById('ver').value,
              }
              console.log(img)
              $("#ver").show();
            })

            $estado.innerHTML = "enviando ";

            // fetch("https://www.grupoasistencia.com/fotosa/Assets/img/Documentos/guardar_foto.php",  api para subir las fotos 
            fetch("https://www.grupoasistencia.com/autogestionpro/Assets/images/Documentos/guardar_foto.php", {
              method: "POST",
              body: encodeURIComponent(foto),
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
              }
            })
              .then(resultado => {
                console.log(resultado);
                // A los datos los decodificamos como texto plano
                return resultado.text()
              })
              .then(nombreDeLaFoto => {
                console.log(nombreDeLaFoto);
                // nombreDeLaFoto trae el nombre de la imagen que le dio PHP
                console.log("La foto fue enviada correctamente");
                $estado.innerHTML = `Foto guardada con éxito. Puedes verla <a target='_blank' href='https://www.grupoasistencia.com/autogestionpro/Assets/images/Documentos/${nombreDeLaFoto}'> aquí</a>`;
              })

            //Reanudar reproducción
            $video.play();

          });

          $botonsiguiente.addEventListener("click", function () {

            //Pausar reproducción
            $video.pause();

            //Obtener contexto del canvas y dibujar sobre él
            let contexto = $canvas.getContext("2d");
            $canvas.width = $video.videoWidth;
            $canvas.height = $video.videoHeight;
            contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);

            let foto = $canvas.toDataURL(); //Esta es la foto, en base 64
            $estado.innerHTML = "Enviando foto. Por favor, espera...";
            // fetch("https://www.grupoasistencia.com/fotosa/Assets/img/Documentos/guardar_foto.php",  api para subir las fotos 
            fetch("https://www.grupoasistencia.com/autogestionpro/Assets/images/Documentos/guardar_foto.php", {
              method: "POST",
              body: encodeURIComponent(foto),
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
              }
            })
              .then(resultado => {
                // A los datos los decodificamos como texto plano
                return resultado.text()
              })
              .then(nombreDeLaFoto => {

                // nombreDeLaFoto trae el nombre de la imagen que le dio PHP
                console.log("La foto fue enviada correctamente");
                $estado.innerHTML = `Foto guardada con éxito. Puedes verla <a target='_blank' href='../images/Documentos/${nombreDeLaFoto}'> aquí</a>`;
                $informacion.innerHTML = `Foto guardada con éxito. Puedes verla <a target='_blank' href='../images/Documentos/${nombreDeLaFoto}'> aquí</a>`;

              })

            //Reanudar reproducción
            $video.play();
          });

        }, (error) => {
          console.log("Permiso denegado o error: ", error);
          $estado.innerHTML = "No se puede acceder a la cámara, o no diste permiso.";
        });
    }
  })();

  //funcion jhon albear.
  var fechasugerida = JSON.parse(localStorage.getItem('fechasugerida'))

  console.log(fechasugerida);

  if (fechasugerida.soat_vencido) {
    document.getElementById('cont1').innerHTML = '<p class="textoDAP" align="justify">Tu <strong>SOAT</strong> se encuentra vencido y esta para renovar en la siguiente <strong>fecha:</strong> ' + fechasugerida.fechanueva + ' desde las 00:00 Horas. <strong style="padding-top: 10px !important;"> <br> ¿Deseas cambiar la fecha de renovación? </strong> <input type="radio" id="yesFechaTomadorSOAT" name="PolizaSOATVIGENCIA"  value="Si" onclick="mostrarCambioFecha()" checked> Sí - <input type="radio" id="NotFechaTomadorSOAT" name="PolizaSOATVIGENCIA" value="No" onclick="ocultarCambioFecha()">  No </p>';
    document.getElementById("con2").style.display = 'block';
    $("#txtFechaNac").val(fechasugerida.fechanueva);

  } else {
    document.getElementById('cont1').innerHTML = '<p class="textoDAP" align="justify">Tu <strong>SOAT</strong> esta aun vigente, y esta para renovar en la siguiente <strong>fecha:</strong> ' + fechasugerida.fechanueva + ' desde las 00:00 Horas. <strong style="padding-top: 10px !important;">¿Deseas cambiar la fecha de renovación?</strong> <input type="radio" id="yesFechaTomadorSOAT" name="PolizaSOATVIGENCIA" value="Si" onclick="mostrarCambioFecha()" checked> Sí <input type="radio" id="NotFechaTomadorSOAT" name="PolizaSOATVIGENCIA" value="No" onclick="ocultarCambioFecha()"> No </p>';
    document.getElementById("con2").style.display = 'block';
    $("#txtFechaNac").val(fechasugerida.fechanueva);

  }

  var fecha = fechasugerida.fechanueva.split('/')
  var date = new Date(parseInt(fecha[2]) - 1, parseInt(fecha[1]), parseInt(fecha[0]) + 1)
  console.log(date);

  if (date.getTime() > Date.now()) {
    Swal.fire({
      icon: "warning",
      title: "Tu SOAT aún se encuentra vigente",
      confirmButtonColor: '#d39e00'
    });
    var html = `<button type="button" id="volver-inicio" class="btn btn-warning btn-responsive form-group">Cotizar o Expedir otro SOAT</button>`
    $('#buttons-oprions').html(html)
  }
});

$(document).on('click', '#volver-inicio', function () {
  window.location.replace(base_url + "polizas/soatplaca");
})

function mostrarCambioFecha() {
  document.getElementById("con2").style.display = 'block';
}

function ocultarCambioFecha() {
  document.getElementById("con2").style.display = 'none';
}

$('#NotFechaTomador').click(function () {
  document.getElementById("MostrarFechaNacimientoTomador").style.display = 'none';
});

$('#yesFechaTomador').click(function () {
  document.getElementById("MostrarFechaNacimientoTomador").style.display = 'block';
});

function expedirAP(presupuesto) {

  // const datos_nombre_completo = cotizar_soat_placa.Body.Cliente.Cliente_TYPE.PersonaDetalle.
  // Persona.DatosBasicos.NombreCompleto.split(" ");
  // const countSplit = datos_nombre_completo.length;

  // var primer_nombre = "";
  // var primer_apellido = "";
  // var segundo_apellido = "";
  // var segundo_nombre = "";

  // if (countSplit == 2) {
  //   primer_nombre = datos_nombre_completo[0];
  //   primer_apellido = datos_nombre_completo[1];
  //   segundo_apellido = "";
  //   segundo_nombre = "";
  // } else if (countSplit == 3) {
  //   primer_nombre = datos_nombre_completo[0];
  //   primer_apellido = datos_nombre_completo[1];
  //   segundo_apellido = datos_nombre_completo[2];
  //   segundo_nombre = "";
  // } else {
  //   primer_nombre = datos_nombre_completo[0];
  //   segundo_nombre = datos_nombre_completo[1];
  //   primer_apellido = datos_nombre_completo[2];
  //   segundo_apellido = datos_nombre_completo[3];
  // }

  // const primer_nombres = primer_nombre ;
  // const segundo_nombres = segundo_nombre;
  // const primer_apellidos = primer_apellido ;
  // const segundo_apellidos = segundo_apellido;

  var estado = "Efectiva";
  var mensaje = "Autogestion"
  // var nom_tomador_1SinFormato = primer_nombres;
  // var nom_tomador_1SinFormato2 = getCleanedString(nom_tomador_1SinFormato);
  // var nom_tomador_1 = removeSpecial(nom_tomador_1SinFormato2.trim());

  // var nom_tomaror_2 = segundo_nombres;
  // alert(nom_tomaror_2);
  // var ape_tomador_1SinFormato = primer_apellidos;
  // var ape_tomador_1SinFormato2 = getCleanedString(ape_tomador_1SinFormato);
  // var ape_tomador_1 = removeSpecial(ape_tomador_1SinFormato2.trim());

  // var ape_tomador_2 = segundo_apellidos;

  // var nombre_completo = nom_tomador_1 + " " + nom_tomaror_2 + " " + ape_tomador_1 + " " + ape_tomador_2;
  var nombre_completo = "CARLOS JULIO BARBOSA ZEA SIN INFORM"

  var identificacion_tomadorSinFormato = $('#identificacion').val();
  var identificacion_tomador = identificacion_tomadorSinFormato.trim();
  //var fechaNacimiento = $('#fechaNacimientoTomador').val();
  var email = $('#confirmar_correo').val();

  var placa = $('#placa').val();

  var fecha_inicio_vigencia_SOAT = document.getElementById("txtFechaNac").value;
  alert(fecha_inicio_vigencia_SOAT);
  //var values = fechaNacimiento.split("/");

  // var value = fecha_inicio_vigencia_SOAT.split("/");
  // var dia2 = value[0];
  // var mes2 = value[1];
  // var ano2 = value[2];
  var fechaformatsal2 = fecha_inicio_vigencia_SOAT;
  // ano2 + "-" + mes2 + "-" + dia2;

  var ruta = "https://www.misegurodigital.com/src/resgistroAP.php";

  $.ajax({
    type: "POST",
    url: ruta,
    data: {
      estado: estado,
      nombre_completo: nombre_completo,
      identificacion_tomador: identificacion_tomador,
      // fechaformatsal: fechaformatsal,
      presupuesto: presupuesto,
      placa: placa,
      fechaformatsal2: fechaformatsal2,
      email: email,
      mensaje: mensaje
    },
    cache: false,
      success: function (html) {
    }
  });
}

function pasar_emitir() {

  var storecorreo = {
    nofechatomador: document.getElementById('NotFechaTomador').value,
    fechacobertura: document.getElementById('txtFechaNac').value,

    correo_electronico: document.getElementById('confirmar_correo').value,
    correo: document.getElementById('correo').value,
  }

  if (storecorreo.correo_electronico.length == 0 || storecorreo.correo.length == 0) {
    Message('Por favor digita los campos vacio', 'warning');

  }
  else if (storecorreo.correo_electronico.length !== storecorreo.correo.length) {
    Message('Los correos deben de ser iguales', 'warning');
  }
  else {
    localStorage.setItem("storecorreo", JSON.stringify(storecorreo))
    console.log(localStorage.getItem("storecorreo"));

    window.location.replace(base_url + "polizas/emitir");
    //valdar cuando  la fecha este coompleta;

    // $("#ModalVerificarDocumento").modal("show");
  }
}

// funcion que  llama al modal para validar el sms .
$('#expedir').on('click', function () {
  //$('#ModalVerificarCelular').modal('show');
})
//funcion que llama al modal para validar la foto 
$("#expedir").on('click', function () {
  pasar_emitir();

})
//   function siguiente() {
//     window.location.replace(base_url + "polizas/soatexpedicion");
// //window.location.href=base_url + "cotizarpoliza/expedirsoat";
// }
function init() {  }


$(document).ready(function () {
  var cotizacion = JSON.parse(localStorage.getItem("cotizar_soat_placa"));

  $.ajax({
    url: base_url + "ciudades/ObtenerCiudadesController/",
    type: "GET",
    dataType: "JSON",
    success: function (objData) {
      var html = `<option value="" disabled selected>Ciudad de residencia</option>`;
      objData.forEach((element) => {
        html +=`<option value="${element.ciudad_id}">${element.ciudad} - ${element.departamento}</option>`;
      });
      $("#ciudad").html(html);
      $("#ciudad").form-control();
    },
  });


  //
  // if(cotizacion === null || cotizacion === undefined){
  //   window.location = base_url+ 'cotizarpoliza/soatplaca'
  // }

  //
  const nombre_completo = cotizacion.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona.DatosBasicos.NombreCompleto.split(" ");
  const countSplit = nombre_completo.length;

  var primer_nombre = "";
  var primer_apellido = "";
  var segundo_apellido = "";
  var segundo_nombre = "";

  if (countSplit == 2) {
    primer_nombre = nombre_completo[0];
    primer_apellido = nombre_completo[1];
    segundo_apellido = "";
    segundo_nombre = "";
  } else if (countSplit == 3) {
    primer_nombre = nombre_completo[0];
    primer_apellido = nombre_completo[1];
    segundo_apellido = nombre_completo[2];
    segundo_nombre = "";
  } else {
    primer_nombre = nombre_completo[0];
    segundo_nombre = nombre_completo[1];
    primer_apellido = nombre_completo[2];
    segundo_apellido = nombre_completo[3];
  }

  const nombres = primer_nombre + " " + segundo_nombre;
  const apellidos = primer_apellido + " " + segundo_apellido;

  $("#tipo_documento").val(cotizacion.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona.Identificacion.TipoIdentificacion);
  $("#identificacion").val(cotizacion.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona.Identificacion.Identificacion);
  $("#nombre").val(nombres);
  $("#apellido").val(apellidos);
});

$('#f_soat_expedicion').on('submit', function (e) {

  e.preventDefault()
  var datosemision = {
    celular: document.getElementById('celular').value,
    correo_electronico: document.getElementById('correo_electronico').value,
    direccion: document.getElementById('direccion').value,
    ciudad: document.getElementById('ciudad').value,
    tipo_documento: $("#tipo_documento").val(),
    identificacion: $("#identificacion").val(),
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val()
  }


  if (datosemision.celular !== '' && datosemision.correo_electronico !== '' && datosemision.direccion !== '' && datosemision.ciudad !== '') {

    localStorage.setItem("datosemision", JSON.stringify(datosemision));
    polizas_resumenexpedicion();

  } else {
    Message('Por favor digita los datos solicitados', 'warning');
  }
})

try {
  function polizas_resumenexpedicion() {
    window.location = base_url + "polizas/resumenexpedicion";
  }
  
} catch (error) {
  alert(error+''+"error");
}

function pasar_atras() {

  window.location = base_url + "polizas/resumenplaca";
  //window.location.href=base_url + "cotizarpoliza/expedirsoat";
}


// function pasar_siguiente() {

//   window.location.replace(base_url + "cotizarpoliza/resumenexpedicion");
// //window.location.href=base_url + "cotizarpoliza/expedirsoat";
// }





//FUNCION PARA CALCULAR LA FECHA DE VENCIMIENTO DE SOAT
function calcularFechaVigencia() {
  var cotizacion = JSON.parse(localStorage.getItem("cotizar_soat_placa"));
  var placaSoat = cotizacion.Body.Vehiculo.Placa;

  var NumMotor = cotizacion.Body.Vehiculo.NumeroMotor;
  //alert(NumMotor);
  var NumChasis = cotizacion.Body.Vehiculo.NumeroChasis;
  //alert(NumChasis);
  var NumVin = "";
  var ServicioVehiculoR = cotizacion.Body.Vehiculo.TipoServicio;
  //alert(ServicioVehiculoR);
  var Rservicio = ServicioVehiculo(ServicioVehiculoR);

  var diaNuevo = new Date();

  fechanuevavalidacion = new Date(diaNuevo.setDate(diaNuevo.getDate() + 1));
  var ddvalidacion = fechanuevavalidacion.getDate();
  var mmvalidacion = fechanuevavalidacion.getMonth() + 1;
  var yyyyvalidacion = fechanuevavalidacion.getFullYear();

  if (ddvalidacion < 10) {
    ddvalidacion = '0' + ddvalidacion;
  }

  if (mmvalidacion < 10) {
    mmvalidacion = '0' + mmvalidacion;
  }

  datovalidacion = yyyyvalidacion + "/" + mmvalidacion + "/" + ddvalidacion;

  //fecha de fin de vigencia
  var diaNuevo2 = new Date();

  fechanuevavalidacion2 = new Date(diaNuevo2.setDate(diaNuevo2.getDate() + 365));
  var ddvalidacion2 = fechanuevavalidacion2.getDate();
  var mmvalidacion2 = fechanuevavalidacion2.getMonth() + 1;
  var yyyyvalidacion2 = fechanuevavalidacion2.getFullYear();

  if (ddvalidacion2 < 10) {
    ddvalidacion2 = '0' + ddvalidacion2;
  }

  if (mmvalidacion2 < 10) {
    mmvalidacion2 = '0' + mmvalidacion2;
  }

  datovalidacion2 = yyyyvalidacion2 + "/" + mmvalidacion2 + "/" + ddvalidacion2;

  var misCabeceras = new Headers({
    "Client": "133474910",
    "Authorization": "bearer 72060C353824F243AAE56BBB45D9392E2BCA4E58-8016058",
    "Content-Type": "application/json"
  });
  var myInit = {
    method: 'GET',
    headers: misCabeceras,
    mode: 'cors'
  };
  fetch('https://www.esbus.transfiriendo.com/SOATNETSEAPI/api/InsurancePolicy/CalculateExistInsurancePolicy?NumberPlate=' + placaSoat + '&MotorNumber=' + NumMotor + '&ChasisNumber=' + NumChasis + '&Vin=' + NumVin + '&CountryId=57&FromValidateDate= ' + datovalidacion + '&DueValidateDate= ' + datovalidacion2 + '&ServiceTypeId= ' + Rservicio + '&Operation=1&Locked=False ', myInit)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      var res = myJson.replace(/\\/g, "");
      var res2 = res.replace("", "");
      var res3 = res2.replace(" ", "");
      var res4 = res3.replace('{"Data":"', '{"Data":');
      var res5 = res4.replace('","Success":', ',"Success":');
      var res6 = res5.replace('T00:00:00', '');
      var obj = JSON.parse(res6);
      console.log(obj);
      var efectivo = obj.Success;
      var mensaje = obj.Message;
      var mensaje2 = obj.Data.Message;

      if (efectivo == true) {
        var fechaVieja = obj.Data.FromValidateDate;
        var info = fechaVieja.split('-');
        var fechanueva = info[2] + '/' + info[1] + '/' + info[0];


        var f = new Date();
        var dd = f.getDate();
        var mm = f.getMonth() + 1;
        var yyyy = f.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }

        if (mm < 10) {
          mm = '0' + mm;
        }

        var fechaorganizada = dd + "/" + mm + "/" + yyyy;
        //fecha arrojada por el sistema
        var fechaini = new Date(fechaVieja);

        //fecha actual capturada por el sistema
        var fechafin = new Date(yyyy + "-" + mm + "-" + dd);

        if (fechaini > fechafin) {
          if(mensaje2 != ""){

            var fechasugerida ={fechanueva: fechanueva, soat_vencido: false}
           
            localStorage.setItem("fechasugerida", JSON.stringify(fechasugerida));
          }else {

            var fechasugerida ={fechanueva: fechanueva, soat_vencido: true}
           
            localStorage.setItem("fechasugerida", JSON.stringify(fechasugerida));

          }
         
           

          // document.getElementById("NotFechaTomadorSOAT").click();

        } else if (fechaini < fechafin) {
          
          var fecha = calcularFechaSugerencia();
          localStorage.setItem('fechasugerida', JSON.stringify(
            {fecha: fecha, fecha_organizada: fechaorganizada, soat_vencido: false}))

        }

      } else if (efectivo == false && mensaje != null) {

        var arrayResponse = mensaje.split('.');
        // console.log(arrayResponse);
        var vigencias = arrayResponse[arrayResponse.length - 1];
        var arrayVigencias = vigencias.split(' ');
        var contador = 0;


        function validarFechaMenorActual(date) {
          var x = new Date();
          var fecha = date.split("/");
          x.setFullYear(fecha[2], fecha[1] - 1, fecha[0]);
          var today = new Date();

          if (x >= today)
            return false;
          else
            return true;
        }

        var jsonFechas = {};

        for (let index = 0; index < arrayVigencias.length; index++) {
          if (validarFechaMenorActual(arrayVigencias[index])) {
            console.log("Noi es una fecha - " + arrayVigencias[index]);
          } else {
            console.log("Es una fecha - " + arrayVigencias[index]);
            contador++;

            jsonFechas['fecha' + contador] = arrayVigencias[index];
          }

        }

        if (contador == 1) {

          var TuFecha = jsonFechas.fecha1;

          console.log(TuFecha.length);
          TuFecha = TuFecha.split("/");

          //transformacion de fecha a formato MM/DD/YYYY
          let hoy = new Date(TuFecha[1] + '/' + TuFecha[0] + '/' + TuFecha[2]);

          // let hoy = new Date('06/08/2020');
          let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 1;
          let suma = hoy.getTime() + semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
          let fechaDentroDeUnaSemana = new Date(suma);
          console.log(fechaDentroDeUnaSemana);

          var pruebadd = fechaDentroDeUnaSemana.getDate();
          var pruebamm = fechaDentroDeUnaSemana.getMonth() + 1;
          var pruebayyyy = fechaDentroDeUnaSemana.getFullYear();

          if (pruebadd < 10) {
            pruebadd = '0' + pruebadd;
          }

          if (pruebamm < 10) {
            pruebamm = '0' + pruebamm;
          }

          var fechaNuevaFormateadaEstado = pruebadd + "/" + pruebamm + "/" + pruebayyyy;

          $("#txtFechaNac").val(fechaNuevaFormateadaEstado);



          document.getElementById('cont1').innerHTML = '<p class="textoDAP" align="justify">Tu <strong>SOAT</strong> esta aun vigente, y esta para renovar en la siguiente <strong>fecha:</strong> ' + fechaNuevaFormateadaEstado + ' desde las 00:00 Horas. <strong style="padding-top: 10px !important;">¿Deseas cambiar la fecha de renovación?</strong> <input type="radio" id="yesFechaTomadorSOAT" name="PolizaSOATVIGENCIA" value="Si" onclick="mostrarCambioFecha()" checked> Sí <input type="radio" id="NotFechaTomadorSOAT" name="PolizaSOATVIGENCIA" value="No" onclick="ocultarCambioFecha()"> No </p>';
          document.getElementById("con2").style.display = 'block';
        } else if (contador == 2) {
          var TuFecha = jsonFechas.fecha1;

          console.log(TuFecha.length);
          TuFecha = TuFecha.split("/");

          //transformacion de fecha a formato MM/DD/YYYY
          let hoy = new Date(TuFecha[1] + '/' + TuFecha[0] + '/' + TuFecha[2]);

          // let hoy = new Date('06/08/2020');
          let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 1;
          let suma = hoy.getTime() + semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
          let fechaDentroDeUnaSemana = new Date(suma);
          console.log(fechaDentroDeUnaSemana);

          var pruebadd = fechaDentroDeUnaSemana.getDate();
          var pruebamm = fechaDentroDeUnaSemana.getMonth() + 1;
          var pruebayyyy = fechaDentroDeUnaSemana.getFullYear();

          if (pruebadd < 10) {
            pruebadd = '0' + pruebadd;
          }

          if (pruebamm < 10) {
            pruebamm = '0' + pruebamm;
          }

          var fechaNuevaFormateadaEstado = pruebadd + "/" + pruebamm + "/" + pruebayyyy;

          $("#txtFechaNac").val(fechaNuevaFormateadaEstado);



          document.getElementById('cont1').innerHTML = '<p class="textoDAP" align="justify">Tu <strong>SOAT</strong> esta aun vigente, y esta para renovar en la siguiente <strong>fecha:</strong> ' + fechaNuevaFormateadaEstado + ' desde las 00:00 Horas. <strong style="padding-top: 10px !important;">¿Deseas cambiar la fecha de renovación?</strong> <input type="radio" id="yesFechaTomadorSOAT" name="PolizaSOATVIGENCIA" value="Si" onclick="mostrarCambioFecha()" checked> Sí <input type="radio" id="NotFechaTomadorSOAT" name="PolizaSOATVIGENCIA" value="No" onclick="ocultarCambioFecha()"> No </p>';
          document.getElementById("con2").style.display = 'block';

        }
        console.log(jsonFechas);


        document.getElementById("NotFechaTomadorSOAT").click();


        // document.getElementById('cont1').innerHTML = '<p align="justify"><strong>'+resultadoMensaje+'</strong></p>';
      }

      // var preciooficial = document.getElementById("Mostrar_valor_vehiculo_SOAT").value;
      // var preciooficialDescuento = document.getElementById("Mostrar_valor_descuento_SOAT").value;
      // var preciooficialfinal = document.getElementById("Mostrar_valor_pagar_SOAT").value;


      // document.getElementById('preciooficial').innerHTML = preciooficial;

      // document.getElementById('valordescuentooficial').innerHTML = '5% de descuento (' + preciooficialDescuento + ' Pesos)';
      // document.getElementById('valortotaloficial').innerHTML = preciooficialfinal + ' Pesos.';



    });
}
calcularFechaVigencia();



function ServicioVehiculo(dato) {

  var respuesta;

  if (dato = 'Particular') {
    respuesta = 1;
  } else if (dato = 'Publico') {
    respuesta = 2;
  } else if (dato = 'Intermunicipal') {
    respuesta = 3;
  } else if (dato = 'Especial') {
    respuesta = 4;
  } else if (dato = 'Ofical') {
    respuesta = 5;
  } else if (dato = 'Publico Urbano') {
    respuesta = 6;
  } else if (dato = 'Publico Intermunicipal') {
    respuesta = 7;
  } else if (dato = 'Diplomatico') {
    respuesta = 8;
  } else if (dato = 'Especial RNMA') {
    respuesta = 9;
  }


  return respuesta;
}

function calcularFechaSugerencia() {

  var d = new Date();

  fechanueva = new Date(d.setDate(d.getDate() + 1));
  var dd = fechanueva.getDate();
  var mm = fechanueva.getMonth() + 1;
  var yyyy = fechanueva.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  dato = dd + "/" + mm + "/" + yyyy;

  return dato;

}//Metodo paca calcular fecha sugerida al cliente cuando el soat ya este vencido



init();
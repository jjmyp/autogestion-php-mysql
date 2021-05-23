let proxyurl = "https://cors-anywhere.herokuapp.com/";
let datos = {
  TipoIdentificacion: "1",
  NumeroIdentificacion: "1151943903",
  Nombre: "Jhon",
  Apellido: "Albear",
  Genero: "1",
  FechaNacimiento: "24/12/1991",
  EstadoCivil: "1",
  NumeroTelefono: "3106542283",
  Direccion: "Carrera 6n 51n 76",
  Email: "jhon17523@gmail.com",
  ZonaCirculacion: "32",
  Placa: "MJN715",
  CodigoMarca: "19",
  CodgigoLinea: "2224",
  ClaseVehiculo: "1",
  CodigoFasecolda: "01601146",
  Modelo: "2013",
  ValorAsegurado: "20600000",
  Cobertura: "1",
  LimiteRC: "5",
  ValorAccesorios: "0",
  ceroKm: "false",
  CiudadBolivar: "30000",
  ServicioVehiculoAXA: "14",
  CodigoVerificacion: "0",
  Apellido2: "Prado",
  AniosSiniestro: "0",
  AniosAsegurados: "0",
  NivelEducativo: "4",
  Estrato: "3",
};

//Init

$(document).ready(function () {});

$("#btnCotizarProductos").on("click", function () {
  RequestTodoRiesgo(
    "https://www.grupoasistencia.com/webservice_prueba12/CotizarAxaColpatria",
    datos
  );
});

function CotizarTodoRiesgo(datos) {
  // var Hdi = RequestTodoRiesgo(
  //   "https://www.grupoasistencia.com/webservice_prueba12/CotizarHdi",
  //   datos
  // );

  console.log(Hdi);
  // CardVertical(Hdi, '#viewProductos')
  // var Axacolpatria = RequestTodoRiesgo('https://www.grupoasistencia.com/webservice_prueba12/CotizarAxaColpatria', datos)
  // var SegurosEstado1 = RequestTodoRiesgo('https://www.grupoasistencia.com/webservice_prueba12/CotizarSegurosEstado1', datos)
  // var SegurosEstado2 = RequestTodoRiesgo('https://www.grupoasistencia.com/webservice_prueba12/CotizarSegurosEstado2', datos)
  // var Bolivar = RequestTodoRiesgo('https://www.grupoasistencia.com/webservice_prueba12/CotizarBolivar', datos)
}

function RequestTodoRiesgo(url, datos) {
  $.ajax({
    url: url,
    method: "POST",
    data: JSON.stringify(datos),
    dataType: "JSON",
    success: function (objData) {
      objData.forEach((data) => {
        var icon_check = "✓",
          text_color = "info";
        if (
          data.servicio_grua != "Si" ||
          data.conductores_elegidos == "No cubre"
        ) {
          icon_check = "X";
          text_color = "danger";
        }

        var html = `
      <div class="card shadow p-3 mb-5 bg-white rounded" >
        <div class="row">
          <div class="col-md-6">
            <div class="mt-2 d-flex justify-content-center">
              <img class="card-img-top shadow-sm p-3 mb-3 bg-white rounded"  src="<?= media() ?>images/Aseguradoras/${data.imagen}" alt="Imagen aseguradora">
            </div>
          </div>
          <div class="col-md-6">
            <div class="mt-2 card-body">
              <h5 class="card-title text-center"><strong class="text-dark">${data.entidad}</strong> - Automovil Familiar</h5>
              <p class="card-title text-center">Prima <strong class="text-info">$ ${data.precio}</strong> </p>
            </div>
          </div>
        </div>
        <span class="border-bottom"></span>
        <div class="mt-2"></div>
        <div class="row">
          <div class="col-md-2">
            <div class=" ml-3 mb-2">
              <p class="text-left">
                <strong class="text-info ">✓ </strong>
                Daños a terceros (RC): hasta $ ${data.responsabilidad_civil}  millones
                <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="RC: Reponsabilidad civil. Valor minimo que la aseguradora otorga a un tercero afectado por un accidente de transito.">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </strong>
              </p>
            </div>
          </div>
          <div class="col-md-2">
            <div class="ml-3 mb-2">
              <p class="text-left">
                <strong class="text-info">✓ </strong>
                Perdida total: Deducible 10% mín. 1 SMMLV
                <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Aplica cuando roban tu vehiculo o no puede ser reparado y la aseguradora decide indemnizar.">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </strong>
              </p>
            </div>
          </div>
          <div class="col-md-2">
            <div class="ml-3 mb-2">
              <p class="text-left">
                <strong class="text-info">✓ </strong>
                Perdida parcial: Deducible $1.200.000
                <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Aplica cuando la aseguradora reemplaza y repara las piezas dañadas o robadas.">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </strong>
              </p>
            </div>
          </div>
          <div class="col-md-2">
            <div class="ml-3 mb-2">
              <p class="text-left">
                <strong class="text-${text_color}">${icon_check} </strong>
                Grua: ${data.servicio_grua}
                <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Servicio de remolque para trasladar tu vehiculo al taller, en caso de varada o de accidente.">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </strong>
              </p>
            </div>
          </div>
          <div class="col-md-2">
            <div class="ml-3 mb-2">
              <p class="text-left">
                <strong class="text-${text_color}">${icon_check} </strong>
                Conductor elegido: ${data.conductores_elegidos}
                <strong style="color: #082c75" data-toggle="tooltip" data-placement="bottom" title="Conductor que maneja tu carro y te lleva a casa cuando consumas bebidas alcoholicas.">
                  <i class="fa fa-info-circle" aria-hidden="true"></i>
                </strong>
              </p>
            </div>
          </div>
        </div>
        <div class="mt-3 mb-4 d-flex justify-content-center">
          <div class="animated-checkbox">
            <label>
              <input type="checkbox" name="seleccionar" id="seleccionar"><span class="label-text">Seleccionar</span>
            </label>
            <label>
              <input type="checkbox" name="comparar" id="comparar"><span class="label-text">Comparar</span>
            </label>
          </div>
        </div>                        
      </div>
      `;

        $("#viewProductos").html(html);
        // CardVertical(element, '#viewProductos')
      });
    },
  });
  // return result;
}

function CardVertical(data, element) {}

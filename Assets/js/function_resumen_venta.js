// Funcion que se ejecuta automaticamente.
$(document).ready(function () {
  var emision = JSON.parse(localStorage.getItem("emitir_soat_placa"));
  // Si no trae nada o igual a null, lo direcciona al principio.
  if (emision === null || emision === undefined) {
    window.location = base_url + "polizas/soatplaca";
  }

  // Mustra los datos del XML.

  Vehiculo(emision);
    Variables_Contribuciones(emision);
    Body_Propietario(emision);
    Body_Vigencia(emision);
    Body_DatoSoat(emision)

    var FechaCreacion = moment(emision.Body.SOAT.DatosSoat.DatoSoat.Vigencia.FechaCreacion).format('L');
    console.log(FechaCreacion)
            FechaInicio = moment(emision.Body.SOAT.DatosSoat.DatoSoat.Vigencia.FechaInicio).format('L');
            console.log(FechaInicio)
            FechaFinal = moment(emision.Body.SOAT.DatosSoat.DatoSoat.Vigencia.FechaFinal).format('L');
            console.log(FechaFinal)
 
   window.location.href = base_url + `Models/ReportModel.php?
    fecha_fc=${FechaCreacion}
    &fecha_fi=${FechaInicio}
    &fecha_ff=${FechaFinal}
    &num_poli=${emision.Body.SOAT.DatosSoat.DatoSoat.NumeroPoliza}
    &imprima=${emision.Body.SOAT.DatosSoat.DatoSoat.ImpPrimaTotal}
    &contribucion=${emision.Body.SOAT.ContribucionesTransferencias.ValorContribucionFOSYGA}
    &t_runt=${emision.Body.SOAT.DatosSoat.DatoSoat.TasaRunt}
    &valor_pagar=${emision.Body.SOAT.DatosSoat.DatoSoat.ValorPagarDescuento} 
    &nombre_c=${emision.Body.SOAT.DatosSoat.DatoSoat.Propietario.Persona.DatosBasicos.NombreCompleto}
    &t_iden=${emision.Body.SOAT.DatosSoat.DatoSoat.Propietario.Persona.Identificacion.TipoIdentificacion}
    &indenti=${emision.Body.SOAT.DatosSoat.DatoSoat.Propietario.Persona.Identificacion.Identificacion}
    &servicio=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Servicio}
    &cilindraje=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Cilindraje}
    &modelo=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Modelo}
    &placa=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Placa}
    &marca=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Marca}
    &linea=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Linea}
    &c_carga=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.CapacidadCarga}
    &ct_pasa=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.CapacidadTotalPasajeros}
    &clase=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Clase}
    &num_motor=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.NumeroMotor}
    &num_chasis=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.NumeroChasis}
    &num_vin=${emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.NumeroVin}`

   


  // localStorage.clear()
  console.log(localStorage.getItem("emitir_soat_placa"));
});

function Vehiculo(emision) {
  $("#placa").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Placa);
  $("#Placalista").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Placa);
  $("#numeromotor").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.NumeroMotor);
  $("#numerochasis").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.NumeroChasis);
  $("#marca").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Marca);
  $("#marcalista").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Marca);
  $("#linea").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Linea);
  $("#linealista").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Linea);
  $("#modelo").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Modelo);
  $("#cilindraje").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Cilindraje);
  $("#servicio").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Servicio);
  $("#fasecoldacode").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.FasecoldaCode);
  $("#clase").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.Clase);
  $("#capacidadcarga").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.CapacidadCarga);
  $("#capacidadtotalpasajeros").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.CapacidadTotalPasajeros);
  $("#numerovin").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.NumeroVin);
  $("#tipocarroceria").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.TipoCarroceria);
  $("#tipocombustible").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.TipoCombustible);
  $("#lis_tipoCombustible").val(emision.Body.SOAT.DatosSoat.DatoSoat.Vehiculo.TipoCombustible);
}

function Variables_Contribuciones(emision) {
  $("#CodigoEntidad").val(emision.Body.SOAT.VariablesSOAT.CodigoEntidad);
  $("#ValorContribucionFOSYGA").val(emision.Body.SOAT.ContribucionesTransferencias.ValorContribucionFOSYGA);
}

function Body_Propietario(emision) {
  $("#celular").val(emision.Body.SOAT.DatosSoat.DatoSoat.Propietario.ContactoPrincipal.CelularPersonal.Numero);
  $("#email").val(emision.Body.SOAT.DatosSoat.DatoSoat.Propietario.ContactoPrincipal.Email.Email);
  $("#nombre").val(emision.Body.SOAT.DatosSoat.DatoSoat.Propietario.Persona.DatosBasicos.NombreCompleto);
  $("#Identificacion").val(emision.Body.SOAT.DatosSoat.DatoSoat.Propietario.Persona.Identificacion.Identificacion);
  $("#TipoIdentificacion").val(emision.Body.SOAT.DatosSoat.DatoSoat.Propietario.Persona.Identificacion.TipoIdentificacion);
}

function Body_Vigencia(emision) {
    var fechacreacion = (emision.Body.SOAT.DatosSoat.DatoSoat.Vigencia.FechaCreacion);
  $("#fechacreacion").val(fechacreacion);

  var  fechainicio = (emision.Body.SOAT.DatosSoat.DatoSoat.Vigencia.FechaInicio);
  $("#fechainicio").val(fechainicio);

  var fechafinal = (emision.Body.SOAT.DatosSoat.DatoSoat.Vigencia.FechaFinal);
  $("#fechafinal").val(fechafinal);
  
}

function Body_DatoSoat(emision) {
  $("#CodigoSucursal").val(emision.Body.SOAT.DatosSoat.DatoSoat.CodigoSucursal);
  $("#Productor").val(emision.Body.SOAT.DatosSoat.DatoSoat.Productor);
  $("#NumeroFormulario").val(emision.Body.SOAT.DatosSoat.DatoSoat.NumeroFormulario);
  $("#IdTarifa").val(emision.Body.SOAT.DatosSoat.DatoSoat.IdTarifa);
  $("#ImpPrima").val(emision.Body.SOAT.DatosSoat.DatoSoat.ImpPrima);
  $("#ImpPrimaTotal").val(emision.Body.SOAT.DatosSoat.DatoSoat.ImpPrimaTotal);
  $("#numero_Poliza").val(emision.Body.SOAT.DatosSoat.DatoSoat.NumeroPoliza);
  $("#CiudadExpedicion").val(emision.Body.SOAT.DatosSoat.DatoSoat.CiudadExpedicion);
  $("#tasarunt").val(emision.Body.SOAT.DatosSoat.DatoSoat.TasaRunt);
  $("#ValorDescuento").val(emision.Body.SOAT.DatosSoat.DatoSoat.ValorDescuento);
  $("#ValorDescuentoLey").val(emision.Body.SOAT.DatosSoat.DatoSoat.ValorDescuentoLey);
  $("#ValorDescuentoTotal").val(emision.Body.SOAT.DatosSoat.DatoSoat.ValorDescuentoTotal);
  $("#ValorPagarDescuento").val(emision.Body.SOAT.DatosSoat.DatoSoat.ValorPagarDescuento);
}

// Validamos el boton Mostrar mas o Ocultar
let i = 0;
let button = document
  .querySelector("#DatosVehiculo")
  .addEventListener("click", function () {
    if (!i) {
      document.getElementById("multiCollapseExample1").style.display = "inline";
      document.getElementById("DatosVehiculo").innerHTML = "Ocultar";
      i = 1;
    } else {
      document.getElementById("multiCollapseExample1").style.display = "none";
      document.getElementById("DatosVehiculo").innerHTML = "Ver mas.";
      i = 0;
    }
  });

function CotizarOtro() {
  window.location.replace(base_url + "polizas/soatplaca");
  //window.location.href=base_url + "cotizarpoliza/expedirsoat";
}
function menuprincipal() {
  window.location.replace(base_url + "polizas/soatplaca");
  //window.location.href=base_url + "cotizarpoliza/expedirsoat";
}

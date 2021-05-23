// Funcion que se ejecuta automaticamente.
$(document).ready(function () {

 // traemos el localStorage.setItem("cotizar_soat_placa", para pintarlo en  la vista. 
  var cotizacion = JSON.parse(localStorage.getItem("cotizar_soat_placa"));

  // Si no trae nada o igual a null, lo direcciona al principio.
  if(cotizacion === null || cotizacion === undefined){
    window.location = base_url+ 'polizas/soatplaca'
  }

   // Mustra los datos del XML.
   $("#valor_total").html(new Intl.NumberFormat().format(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.ValorToltal));
   $("#placa").val(cotizacion.Body.Vehiculo.Placa);
   $("#linea").val(cotizacion.Body.Vehiculo.Linea);
   $("#marca").val(cotizacion.Body.Vehiculo.Marca);
   $("#modelo").val(cotizacion.Body.Vehiculo.Modelo);
   $("#cilindraje").val(cotizacion.Body.Vehiculo.Cilindraje);
   $("#clase_vehiculo").val(cotizacion.Body.Vehiculo.Clase);
   $("#tipo_carroceria").val(cotizacion.Body.Vehiculo.TipoCarroceria);
   $("#servicio").val(cotizacion.Body.Vehiculo.TipoServicio);
   $("#pasajero").val(cotizacion.Body.Vehiculo.CapacidadTotalPasajeros);
   $("#carga").val(cotizacion.Body.Vehiculo.CapacidadCarga);
   $("#numero_motor").val(cotizacion.Body.Vehiculo.NumeroMotor);
   $("#numero_chasis").val(cotizacion.Body.Vehiculo.NumeroChasis);
   $("#tipo_combustible").val(cotizacion.Body.Vehiculo.TipoCombustible);
   $("#numero_vin").val("NO ENCONTRADO");
   $("#tipo_documento").val(cotizacion.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona.Identificacion.TipoIdentificacion.toUpperCase());
 
   $("#lis_FechaInicio").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.Vigencia.FechaInicio);
   $("#lis_FechaFinal").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.Vigencia.FechaFinal);
   $("#lis_FechaExpedicion").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.Vigencia.FechaExpedicion);
   $("#lis_ValorDescuento").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.ValorDescuento);
   $("#lis_ImpPrima").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.ImpPrima);
   $("#lis_TasaRUNT").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.TasaRUNT);
   $("#lis_Contribuciones").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.Contribuciones);
   $("#lis_ValorDescuentoLey").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.ValorDescuentoLey);
   $("#lis_ValorDescuentoTotal").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.ValorDescuentoTotal);
   $("#lis_ValorPagarDescuento").val(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.ValorPagarDescuento);
   // localStorage.clear()
   console.log(localStorage.getItem("cotizar_poliza"));

  

  // Mustra los datos del XML.
  // $("#valor_total").html(new Intl.NumberFormat().format(cotizacion.Body.Cliente.CotizacionesAsociadas.Cotizacion.ValorToltal));
  // $("#placa").val(cotizacion.Body.Vehiculo.Placa);
  // $("#linea").val(cotizacion.Body.Vehiculo.Linea);
  // $("#marca").val(cotizacion.Body.Vehiculo.Marca);
  // $("#modelo").val(cotizacion.Body.Vehiculo.Modelo);
  // $("#cilindraje").val(cotizacion.Body.Vehiculo.Cilindraje);
  // $("#clase_vehiculo").val(cotizacion.Body.Vehiculo.Clase);
  // $("#tipo_carroceria").val(cotizacion.Body.Vehiculo.TipoCarroceria);
  // $("#servicio").val(cotizacion.Body.Vehiculo.TipoServicio);
  // $("#pasajero").val(cotizacion.Body.Vehiculo.CapacidadTotalPasajeros);
  // $("#carga").val(cotizacion.Body.Vehiculo.CapacidadCarga);
  // $("#numero_motor").val(cotizacion.Body.Vehiculo.NumeroMotor);
  // $("#numero_chasis").val(cotizacion.Body.Vehiculo.NumeroChasis);
  // $("#tipo_combustible").val(cotizacion.Body.Vehiculo.TipoCombustible);
  // $("#numero_vin").val("NO ENCONTRADO");
  // $("#tipo_documento").val(cotizacion.Body.Cliente.Cliente_TYPE.PersonaDetalle.Persona.Identificacion.TipoIdentificacion.toUpperCase());

  // localStorage.clear()
  console.log(localStorage.getItem("cotizar_soat_placa"));
});

function siguiente() {
    window.location.replace(base_url + "polizas/soatexpedicion");
//window.location.href=base_url + "cotizarpoliza/expedirsoat";
}
// function atras() {
//   window.location.replace(base_url + "polizas/soatplaca");
// //window.location.href=base_url + "cotizarpoliza/expedirsoat";
// }




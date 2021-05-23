<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : RolesModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Gestion con la base de datos
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class VehiculosModel extends MySQL
{
    public function __construct()
    {
        parent::__construct();
    }

    public function ObtenerVehiculos($dato)
    {
        $vehiculosparams = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640
        );
        if ($dato) {
            $vehiculosparams['placa'] = $dato;
        }
        $vehiculos = json_decode(peticion_sga('vehicles/params', 'GET', $vehiculosparams));
        if ($vehiculos->status == 'success') {
            return $vehiculos;
        }
    }

    public function ObtenerDatos($placa){

        $vehiculosparams = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640,
            "placa" => $placa
        );

        $vehiculos = json_decode(peticion_sga('vehicles/params', 'GET', $vehiculosparams))->result[0];

        $polizasparams = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640,
            "placa" => $placa
        );

        $vehiculos->polizas = json_decode(peticion_sga('policies/params', 'GET', $polizasparams))->result;
        foreach ($vehiculos->polizas as $key => $poliza) {
            
            $tomadorparams = array(
                "funcionario" => $_SESSION['userData']['id'],
                "aplicacion" => 640,
                "id" => $poliza->cliente_id
            ); 
            $responsablepagoparams = array(
                "funcionario" => $_SESSION['userData']['id'],
                "aplicacion" => 640,
                "id" => $poliza->responsable_pago_id
            ); 
            $aseguradoparams = array(
                "funcionario" => $_SESSION['userData']['id'],
                "aplicacion" => 640,
                "id" => $poliza->asegurado_id
            ); 

            $vehiculos->polizas[$key]->tomador = json_decode(peticion_sga('customers/params', 'GET', $tomadorparams))->result[0];
            $vehiculos->polizas[$key]->responsablepago = json_decode(peticion_sga('customers/params', 'GET', $responsablepagoparams))->result[0];
            $vehiculos->polizas[$key]->asegurado = json_decode(peticion_sga('customers/params', 'GET', $aseguradoparams))->result[0];
        }
        
        return $vehiculos;
    }


}

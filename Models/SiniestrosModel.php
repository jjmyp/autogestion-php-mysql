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
class SiniestrosModel extends MySQL
{
    public function __construct()
    {
        parent::__construct();
    }

    public function ObtenerSiniestrosModel($dato, $ramo)
    {
        $params = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640
        );
        if ($dato) {
            $params['placa'] = $dato;
            $params['identificacion'] = $dato;
            $params['numero_poliza'] = $dato;
        }
        if ($ramo) {
            $params['ramo'] = $ramo;
        }
        //Informacion del siniestro
        $siniestros = json_decode(peticion_sga('insuranceclaims/params', 'GET', $params));

        if ($siniestros->status == 'success') {
            foreach ($siniestros->result as $siniestro) {

                //Informacion de la poliza
                $paramspoliza = array(
                    "funcionario" => $_SESSION['userData']['id'],
                    "aplicacion" => 640,
                    'id' => $siniestro->poliza_id
                );
                $siniestro->poliza = json_decode(peticion_sga('policies/params', 'GET', $paramspoliza))->result[0];

                //Informacion del cliente
                $paramscliente = array(
                    "funcionario" => $_SESSION['userData']['id'],
                    "aplicacion" => 640,
                    'id' => $siniestro->poliza->cliente_id
                );
                $siniestro->cliente = json_decode(peticion_sga('customers/params', 'GET', $paramscliente))->result[0];
            }
        }
        return $siniestros;
    }
}

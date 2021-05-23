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
class PolizasModel extends MySQL
{
    public function __construct()
    {
        parent::__construct();
    }

    public function ObtenerCotizacionesModel($dato)
    {

        $params = array(
            'aplicacion' => 640,
            'funcionario' => $_SESSION['userData']['id']
        );

        if ($dato) {
            $params['placa'] = $dato;
            $params['identificacion'] = $dato;
        }

        $cotizaciones = json_decode(peticion_sga('quotes/params', 'GET', $params));

        $cotizaciones_decoded['status'] = $cotizaciones->status;
        $cotizaciones_decoded['http_code'] = $cotizaciones->http_code;
        foreach ($cotizaciones->result as $cotizacion) {
            $cotizaciones_decoded['result'][] = array(
                'fecha_cotizacion' => date("Y-m-d", strtotime($cotizacion->fecha_cotizacion)),
                'placa' => $cotizacion->placa,
                'vehiculo' => $cotizacion->vehiculo,
                'cliente' => $cotizacion->cliente
            );
        }

        return $cotizaciones_decoded;
    }


    public function ObtenerCotizacionesModelTest($dato, $id_usuario)
    {       

        if (empty($dato)) {
            $where = 'WHERE id_usuario = '.$id_usuario;    
        }else{
            $where = "WHERE id_usuario = '$id_usuario' cot_placa = '$dato' OR cli.cli_num_identidad = '$dato'";
        }
        $consulta = "SELECT MAX(CAST(cot_fch_cotizacion AS CHAR)) AS fecha_cotizacion, id_cotizaciones AS id_cotizacion, cot_placa AS placa, cot_marca as vehiculo, CONCAT(cli.cli_nombre, ' ', cli.cli_apellidos) AS cliente FROM `cotizaciones` AS cot INNER JOIN clientes AS cli ON (cot.id_clientes = cli.id_clientes) $where GROUP BY  placa ORDER BY `cot_fch_cotizacion` DESC";
        $peticion = $this->SelectAll($consulta);
        return $peticion;
    }



    public function UpdateExpedicionUsuarioModel($id_usuario){
        $arrInformacion = array($id_usuario);
        $consulta = "UPDATE usuarios SET contador_expedicion = 1 WHERE id = ?";
        $peticion = $this->Update($consulta, $arrInformacion);
        return $peticion;
    }
}

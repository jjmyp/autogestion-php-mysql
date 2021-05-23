<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : roles.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo para el acceso a las diferentes areas de la plataforma. 
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class Siniestros extends Controllers
{
    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['login'])) {
            header('Location: ' . base_url());
        }
        getPermisos(9);
        parent::__construct();
    }

    public function Siniestros()
    {
        $data['page_id'] = 5;
        $data['page_tag'] = 'Consulta de siniestros';
        $data['page_title'] = '  Consulta de siniestros';
        $data['page_functions_js'] = 'function_siniestros.js';
        //$data['page_icon'] = 'fa fa-users';
        $data['page_header'] = 1;
        $this->views->getView($this, "siniestro", $data);
    }

    public function ramos_siniestros()
    {
        $params = array(
            'codigo' => 'RAMOS'
        );
        $ramos = json_decode(peticion_sga('types/params', 'GET', $params));
        echo json_encode($ramos);
    }

    public function filter_siniestro()
    {   
        $dato = $_GET['dato'];
        $ramo = $_GET['ramo'];

        $siniestros = $this->model->ObtenerSiniestrosModel($dato, $ramo);
        echo json_encode($siniestros, JSON_UNESCAPED_UNICODE);
    }
}

<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : roles.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo para consultar la ficha de algun vehiculo en especifico. 
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class Vehiculos extends Controllers
{
    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['login'])) {
            header('Location: ' . base_url());
        }
        getPermisos(10);
        parent::__construct();
    }

    public function Vehiculos()
    {
        $data['page_id'] = 5;
        $data['page_tag'] = 'Consulta de vehiculos';
        $data['page_title'] = '  Consulta de vehiculos';
        $data['page_functions_js'] = 'function_vehiculo.js';
        //$data['page_icon'] = 'fa fa-users';
        $data['page_header'] = 1;
        $this->views->getView($this, "vehiculo", $data);
    }

    public function filter_vehiculo(){
        $dato = $_GET['dato'];
        $vehiculos = $this->model->ObtenerVehiculos($dato);
        // dep($vehiculos);
        echo json_encode($vehiculos, JSON_UNESCAPED_UNICODE);
    }

    public function ObtenerDatos(){
        $dato = $_GET['dato'];
        $datos = $this->model->ObtenerDatos($dato);   
        // dep($datos);die();
        echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    }

}

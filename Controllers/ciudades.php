<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : ciudades.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo de gestion de usuarios
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class Ciudades extends Controllers
{

    //Metodo constructor
    public function __construct()
    {
        parent::__construct();
    }

    public function AgregarCiudadController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $ciudad = limpiar_cadena($_POST['txtCiudad']);
            $departamento = limpiar_cadena($_POST['txtDepartamento']);
            $codigo_dane = limpiar_cadena($_POST['txtCodigoDane']);
            $peticion = $this->model->AgregarCiudadModel($ciudad, $departamento, $codigo_dane);
            if ($peticion > 0) {
                $arrRespuesta = array('status' => 'success', 'msg' => 'Te has registrado satisfactoriamente');
            } else if ($peticion == 'exist') {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'El usuario que esta intentado registrar, ya cuenta con esa identificacion o correo electronico');
            } else {
                $arrRespuesta = array('status' => 'error', 'msg' => 'No se ha podido registrar');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }

    public function ActualizarCiudadController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $ciudad = limpiar_cadena($_POST['txtCiudad']);
            $departamento = limpiar_cadena($_POST['txtDepartamento']);
            $codigo_dane = limpiar_cadena($_POST['txtCodigoDane']);
            $ciudad_id = limpiar_cadena($_POST['intCiudadId']);            
            $peticion = $this->model->ActualizarCiudadModel($ciudad, $departamento, $codigo_dane, $ciudad_id);
            if ($peticion > 0) {
                $arrRespuesta = array('status' => 'success', 'msg' => 'Usuario actualizado satisfactoriamente');
            } else if ($peticion == 'exist') {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'El usuario que esta intentado registrar, ya cuenta con esa identificacion o correo electronico');
            } else {
                $arrRespuesta = array('status' => 'error', 'msg' => 'No se ha podido registrar');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }

    public function ObtenerCiudadesController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $arrData = $this->model->ObtenerCiudadesModel();
            if ($arrData > 0) {
                $arrRespuesta = $arrData;
            } else {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'No se encontro ninguna ciudad');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }


    public function ObtenerCiudadController($idUsuario)
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $arrData = $this->model->ObtenerCiudadModel($idUsuario);
            if ($arrData > 0) {
                $arrRespuesta = $arrData;
            } else {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'No se encontro ninguna ciudad');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }
}

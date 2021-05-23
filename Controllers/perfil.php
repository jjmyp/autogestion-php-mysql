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
class Perfil extends Controllers
{
    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['login'])) {
            header('Location: ' . base_url());
        }
        parent::__construct();
    }

    public function Perfil()
    {

        $data['page_id'] = 5;
        $data['page_tag'] = 'Perfil usuario';
        $data['page_title'] = '  Perfil usuario';
        $data['page_functions_js'] = 'function_perfil.js';
        $data['page_icon'] = 'fa fa-users';
        $data['page_header'] = 1;
        $this->views->getView($this, "perfil", $data);
    }

    public function EditarPerfil()
    {

        $fecha_nacimiento = $_POST['fecha_nacimiento'];
        $genero = $_POST['genero'];
        $direccion = $_POST['direccion'];
        $ciudad = $_POST['ciudad'];
        $idPerfil = $_SESSION['userData']['id'];
       
        if ($_FILES['file-upload']['name'] == null) {
            
            $nombre_imagen = $_SESSION['userData']['imagen_perfil'];
            
        }else{
            $punto = '.';
            $mimetype = $_FILES['file-upload']['type'];
            $extension = strstr($mimetype, '/');
            $extension = str_replace("/", "", $extension);
            $nombre_imagen = token() . $punto . $extension;
            
            subir_imagen($_FILES['file-upload'], $nombre_imagen,  $_SERVER['DOCUMENT_ROOT'] .'/autogestionpro/Assets/images/');  
        }        

        $ActualizarPerfil = $this->model->ActualizarPerfil($idPerfil, $fecha_nacimiento, $genero, $direccion, $ciudad, $nombre_imagen);

        if ($ActualizarPerfil) {
            $arrResponse = array('status' => 'success', 'message' => 'Tu perfil se actualizo correctamente');
            $_SESSION['userData']['fecha_nacimiento'] = $fecha_nacimiento;
            $_SESSION['userData']['genero'] = $genero;
            $_SESSION['userData']['direccion'] = $direccion;
            $_SESSION['userData']['ciudades_id'] = $ciudad;
            $_SESSION['userData']['imagen_perfil'] = $nombre_imagen;
        } else {
            $arrResponse = array('status' => 'danger', 'message' => 'No se puedo actualizar el perfil');
        }

        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
    }
}

<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : usuarios.php
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
class Usuarios extends Controllers
{
    //Metodo constructor
    public function __construct()
    {
        parent::__construct();
    }

    //Metodo para obtener la vista de usuarios

    //Metodo para agregar un usuario
    public function AgregarUsuarioController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nombre = limpiar_cadena($_POST['txtNombre']);
            $apellido = limpiar_cadena($_POST['txtApellido']);
            $documento = limpiar_cadena($_POST['txtDocumento']);
            $tipo_documento = limpiar_cadena(intval($_POST['txtTipoDocumento']));
            $fecha_nacimiento = limpiar_cadena($_POST['txtFechaNacimiento']);
            $genero = limpiar_cadena($_POST['txtGenero']);
            $ciudad = limpiar_cadena(intval($_POST['txtCiudad']));
            $rol = limpiar_cadena(intval($_POST['txtRol']));
            $direccion = limpiar_cadena($_POST['txtDireccion']);
            $telefono = limpiar_cadena($_POST['txtTelefono']);
            $celular = limpiar_cadena($_POST['txtCelular']);
            $correo_electronico = limpiar_cadena($_POST['txtCorreoElectronico']);
            $contrasena = limpiar_cadena($_POST['txtContrasena']);
            $confirmar_contrasena = limpiar_cadena($_POST['txtConfirmarContrasena']);
            if ($contrasena == $confirmar_contrasena) {
                $peticion = $this->model->AgregarUsuarioModel($documento, $nombre, $apellido, $fecha_nacimiento, $genero, $direccion, $telefono, $celular, $correo_electronico, $contrasena, $ciudad, $tipo_documento, $rol);
                if ($peticion > 0) {
                    $arrRespuesta = array('status' => 'success', 'msg' => 'Te has registrado satisfactoriamente');
                } else if ($peticion == 'exist') {
                    $arrRespuesta = array('status' => 'warning', 'msg' => 'El usuario que esta intentado registrar, ya cuenta con esa identificacion o correo electronico');
                } else {
                    $arrRespuesta = array('status' => 'error', 'msg' => 'No se ha podido registrar');
                }
            } else {
                $arrRespuesta = array('status' => 'error', 'msg' => 'Las contraseñas no coinciden');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }

    //Metodo para actualizar un usuario
    public function ActualizarUsuarioController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nombre = limpiar_cadena($_POST['txtNombre']);
            $apellido = limpiar_cadena($_POST['txtApellido']);
            $documento = limpiar_cadena($_POST['txtDocumento']);
            $tipo_documento = limpiar_cadena(intval($_POST['txtTipoDocumento']));
            $fecha_nacimiento = limpiar_cadena($_POST['txtFechaNacimiento']);
            $genero = limpiar_cadena($_POST['txtGenero']);
            $ciudad = limpiar_cadena(intval($_POST['txtCiudad']));
            $usuario_id = limpiar_cadena(intval($_POST['intUsuarioid']));
            $rol = limpiar_cadena(intval($_POST['txtRol']));
            $direccion = limpiar_cadena($_POST['txtDireccion']);
            $telefono = limpiar_cadena($_POST['txtTelefono']);
            $celular = limpiar_cadena($_POST['txtCelular']);
            $estado = limpiar_cadena($_POST['txtEstado']);
            $correo_electronico = limpiar_cadena($_POST['txtCorreoElectronico']);
            $contrasena = limpiar_cadena($_POST['txtContrasena']);
            $confirmar_contrasena = limpiar_cadena($_POST['txtConfirmarContrasena']);
            if ($contrasena == $confirmar_contrasena) {
                $peticion = $this->model->ActualizarUsuarioModel($documento, $nombre, $apellido, $fecha_nacimiento, $genero, $direccion, $telefono, $celular, $correo_electronico, $estado, $ciudad, $tipo_documento, $rol, $usuario_id);
                if ($peticion > 0) {
                    $arrRespuesta = array('status' => 'success', 'msg' => 'Usuario actualizado satisfactoriamente');
                } else if ($peticion == 'exist') {
                    $arrRespuesta = array('status' => 'warning', 'msg' => 'El usuario que esta intentado registrar, ya cuenta con esa identificacion o correo electronico');
                } else {
                    $arrRespuesta = array('status' => 'error', 'msg' => 'No se ha podido registrar');
                }
            } else {
                $arrRespuesta = array('status' => 'error', 'msg' => 'Las contraseñas no coinciden');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }


    //Metodo para obtener todos los usuarios
    public function ObtenerUsuariosController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $arrData = $this->model->ObtenerUsuariosModel();
            $arrRespuesta = $arrData;
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function ObtenerUsuarioController($idUsuario)
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $arrData = $this->model->ObtenerUsuarioModel($idUsuario);
            if ($arrData > 0) {
                $arrRespuesta = $arrData;
            } else {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'No se encontro ningun usuario');
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }



    public function CodigoVerificacion()
    {
        $data['page_id'] = 1;
        $data['page_tag'] = 'Codigo de verificacion';
        $data['page_title'] = 'Codigo de verificacion';
        $data['page_functions_js'] = 'function_codigo_verificacion.js';
        $data['page_header'] = 0;
        $this->views->getView($this, "codigoverificacion", $data);
    }

    public function NumeroVerificado()
    {
        $data['page_id'] = 1;
        $data['page_tag'] = 'Numero verificado';
        $data['page_title'] = 'Numero verificado';
        $data['page_functions_js'] = 'function_numero_verificado.js';
        $data['page_header'] = 0;
        $this->views->getView($this, "numeroverificado", $data);
    }
}

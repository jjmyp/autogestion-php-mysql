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
class Roles extends Controllers
{
    public function __construct()
    {
        session_start();
		if (!isset($_SESSION['login'])) {
			header('Location: ' . base_url());
        }
        getPermisos(1);
        parent::__construct();
    }

    public function Roles()
    {
        if(empty($_SESSION['permisosMod']['r'])){
            header("Location:".base_url().'dashboard');
        }
        $data['page_id'] = 5;
        $data['page_tag'] = 'Roles usuario';
        $data['page_title'] = '  Roles usuario';
        $data['page_functions_js'] = 'function_roles.js';
        $data['page_icon'] = 'fa fa-users';
        $data['page_header'] = 1;
        $this->views->getView($this, "roles", $data);
    }

    public function AgregarRolController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = intval($_POST['idRol']);
            $rol = limpiar_cadena($_POST['txtRol']);
            $observacion = limpiar_cadena($_POST['txtObservacion']);
            if ($id > 0) {
                $estado = limpiar_cadena($_POST['txtEstado']);
                if (empty($rol) || empty($observacion) || empty($estado)) {
                    $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que algunos campos son requeridos');
                } else {
                    $peticion = $this->model->ActualizarRolModel($id, $rol, $observacion, $estado);
                    if ($peticion > 0) {
                        $arrRespuesta = array('status' => 'success', 'msg' => 'Datos actualizados exitosamente');
                    } elseif ($peticion == 'exist') {
                        $arrRespuesta = array('status' => 'warning', 'msg' => '¡Atencion! El rol ya existe');
                    } else {
                        $arrRespuesta = array('status' => 'error', 'msg' => 'No es posible actualizar los datos');
                    }
                }
            } else {
                if (empty($rol) || empty($observacion)) {
                    $arrRespuesta = array('status' => 'success', 'msg' => 'Recuerda que algunos campos son requeridos');
                } else {
                    $peticion = $this->model->AgregarRolModel($rol, $observacion);

                    if ($peticion > 0) {
                        $arrRespuesta = array('status' => 'success', 'msg' => 'Datos guardados exitosamente');
                    } elseif ($peticion == 'exist') {
                        $arrRespuesta = array('status' => 'warning', 'msg' => '¡Atencion! El rol ya existe');
                    } else {
                        $arrRespuesta = array('status' => 'error', 'msg' => 'No es posible almacenar los datos');
                    }
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }

    function EliminarRolController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = intval(limpiar_cadena($_POST['idRol']));
            $peticion = $this->model->EliminarRolModel($id);
            if ($peticion == 'success') {
                $arrRespuesta = array('status' => 'success', 'msg' => 'Rol eliminado con exito');
            } else if ($peticion == 'exist') {
                $arrRespuesta = array('status' => 'warning', 'msg' => 'El rol se encuentra asociado a algun usuario!');
            } else {
                $arrRespuesta = array('status' => 'danger', 'msg' => 'Ocurrio un error');
            }
        } else {
            $arrRespuesta = array('status' => 'danger', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }

    function ObtenerRolController($idrol)
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $intIdrol = intval(limpiar_cadena($idrol));
            if ($intIdrol > 0) {
                $arrInformacion = $this->model->ObtenerRolModel($intIdrol);
                if (empty($arrInformacion)) {
                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Datos no encontrados');
                } else {
                    $arrRespuesta = array('status' => 'success', 'data' => $arrInformacion);
                }
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function ObtenerRolesController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $arrInformacion = $this->model->ObtenerRolesModel();
            $consecutivo = 0;
            for ($i = 0; $i < count($arrInformacion); $i++) {
                if ($arrInformacion[$i]['estado'] == 'ACTIVO') {
                    $arrInformacion[$i]['estado'] = '<span class="badge badge-success">Activo</span>';
                } else {
                    $arrInformacion[$i]['estado'] = '<span class="badge badge-danger">Inactivo</span>';
                }
                $arrInformacion[$i]['opciones'] = "<div class='text-center'>
                                                    <button type='button' onClick='fntPermisos(" . $arrInformacion[$i]['id'] . ")' class='btn btn-primary btn-sm' title='Permisos'><i class='fa fa-key'></i></button>
                                                    <button type='button' onclick='fntEditarRol(" . $arrInformacion[$i]['id'] . ")' class='btn btn-info btn-sm' title='Editar'><i class='fa fa-pencil'></i></button>
                                                    <button type='button' onclick='fntEliminarRol(" . $arrInformacion[$i]['id'] . ")' class='btn btn-danger btn-sm' title='Eliminar'><i class='fa fa-trash'></i></button>
                                                </div>";
                $consecutivo++;
                $arrInformacion[$i]['consecutivo'] = $consecutivo;
            }
            $arrRespuesta = $arrInformacion;
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }
}

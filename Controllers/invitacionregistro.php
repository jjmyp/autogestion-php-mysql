<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : tareas.php
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
class InvitacionRegistro extends Controllers
{
    public function __construct()
    {
        session_start();
		if (!isset($_SESSION['login'])) {
			header('Location: ' . base_url());
        }
        getPermisos(16);
        parent::__construct();
    }
    public function InvitacionRegistro()
    {
        if(empty($_SESSION['permisosMod']['r'])){
            header("Location:".base_url().'dashboard');
        }
        $data['page_id'] = 1;
        $data['page_tag'] = 'Registro';
        $data['page_title'] = 'Registro';
        $data['page_name'] = 'Pagina principal';
        $data['page_functions_js'] = 'function_invitacionregistro.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "invitacionregistro", $data);
    }

    public function EnviarSolicitudRegistro(){
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {                  
            $datos = VerificarDatos($_POST);
            extract($datos);
            if (!isset($error)) {
                if (!isset($datos[0])) {
                    $token = token();
                    $clave_registro = generar_contrasena();
                    $this->model->EstablecerToken($token, $clave_registro);
                    $link = base_url().'registro';
                    $data = array(
                        'correo_electronico' => $correo_electronico,
                        'asunto' => 'Registrate en Mi Seguro Digital',
                        'nombre' => $nombre,
                        'template' => 'registro',
                        'mensaje' => 'Esta es una prueba de correo',
                        'link' => $link,
                        'clave_registro' => $clave_registro
                    );          
                    $enviar = enviar_correo_electronico2($data);
                    if ($enviar) {
                        $arrRespuesta = array('status' => 'success', 'msg' => 'Se ha enviado el correo exitosamente');            
                    }else{
                        $arrRespuesta = array('status' => 'danger', 'msg' => 'No se pudo enviar el correo electronico, porfavor consulte el correo electronico');
                    }
                }else{
                    $arrRespuesta = $datos;
                }
            }else{
                $arrRespuesta = $error;
            }
        }else{
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');            
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }
}

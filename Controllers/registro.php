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
class Registro extends Controllers
{
    //Metodo constructor
    public function __construct()
    {
        if (!session_id()) {
            session_start();
        }
        if (isset($_SESSION['login'])) {
            header('Location: ' . base_url() . 'dashboard');
        }

        parent::__construct();
    }

    //Metodo para obtener vista del registro
    public function Registro()
    {
        // $data['helper'] = FacebookClient()['helper'];
        // $data['errors'] = FacebookClient()['user_profile'];
        $data['facebook'] = FacebookClient();
        $data['google'] = GoogleClient(GOOGLE_REDIRECT_URL1);
        $data['page_id'] = 1;
        $data['page_tag'] = 'Registro';
        $data['page_title'] = 'Registro';
        $data['page_name'] = 'Pagina principal';
        $data['page_functions_js'] = 'function_registro.js';
        $data['page_header'] = 0;
        $this->views->getView($this, "registro", $data);
    }

    //Metodo para agregar un usuario
    public function AgregarUsuarioController()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $datos = VerificarDatos($_POST);
            extract($datos);
            if (!isset($error)) {
                if (!isset($datos[0])) {
                    $verificar_token = verificar_token($clave_registro);
                    if ($verificar_token) {
                        if ($account === 'GOOGLE') {
                                $peticion = $this->model->AgregarUsuarioModel($datos);
                                if ($peticion > 0) {
                                    $usuario = $this->model->ObtenerUsuarioModel('identificacion',$_POST['identificacion']);
                                    $registrar_cupo = $this->model->RegistrarCupo($usuario['id']);
                                    actualizar_token($clave_registro);
                                    $arrRespuesta = array('status' => 'success', 'msg' => 'Te has registrado satisfactoriamente');
                                } else if ($peticion == 'exist') {
                                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Estimado usuario ya existe una cuenta con esa identificacion o correo electronico');
                                } else {
                                    $arrRespuesta = array('status' => 'error', 'msg' => 'No se ha podido registrar');
                                }
                        } else {
                            if ($contrasena == $confirmar_contrasena) {
                 
                                $peticion = $this->model->AgregarUsuarioModel($datos);
                                if ($peticion > 0) {
                                    $usuario = $this->model->ObtenerUsuarioModel('identificacion',$_POST['identificacion']);
                                    $registrar_cupo = $this->model->RegistrarCupo($usuario['id']);
                                    actualizar_token($clave_registro);
                                    $arrRespuesta = array('status' => 'success', 'msg' => 'Te has registrado satisfactoriamente');
                                } else if ($peticion == 'exist') {
                                    $arrRespuesta = array('status' => 'warning', 'msg' => 'Estimado usuario ya existe una cuenta con esa identificacion o correo electronico');
                                } else {
                                    $arrRespuesta = array('status' => 'error', 'msg' => 'No se ha podido registrar');
                                }
                            } else {
                                $arrRespuesta = array('status' => 'error', 'msg' => 'Las contrase���as no coinciden');
                            }
                        }
                    } else {
                        $arrRespuesta = array('status' => 'error', 'msg' => 'Clave de registro invalido o expirado.');
                    }
                } else {
                    $arrRespuesta = $datos;
                }
            } else {
                $arrRespuesta = $error;
            }
        } else {
            $arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }

    public function ValidarEmail()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $arrData = $this->model->ObtenerUsuarioModel('correo_electronico', $_POST['correo_electronico']);
            if ($arrData > 0) {
                $arrRespuesta = false;
            } else {
                $arrRespuesta = true;
            }
        } else {
            $arrRespuesta = false;
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function ValidarCelular()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (!empty($_POST['celular'])) {
                $arrData = $this->model->ObtenerUsuarioModel('celular', $_POST['celular']);
                if ($arrData > 0) {
                    $arrRespuesta = false;
                } else {
                    $arrRespuesta = true;
                }
            }else{
                $arrData = $this->model->ObtenerUsuarioModel('celular', $_POST['celular_seleccionado']);
                if ($arrData > 0) {
                    $arrRespuesta = false;
                } else {
                    $arrRespuesta = true;
                }
            }
        } else {
            $arrRespuesta = false;
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function ValidarDocumento()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $arrData = $this->model->ObtenerUsuarioModel('identificacion',$_POST['identificacion']);
            if ($arrData > 0) {
                $arrRespuesta = false;
            } else {
                $arrRespuesta = true;
            }
        } else {
            $arrRespuesta = false;
        }
        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
        die();
    }


    public function CrearCuentaPhone()
    {
        $data = $_POST['cuenta'];
        $url_account = TRUORA_URL . '/accounts';
        $CreateAccountValidate = json_decode(PeticionTruora($url_account, true, 'ctfd'), true);
        echo json_encode($CreateAccountValidate);
    }

    public function ValidarClaveRegistro()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $verificar_clave_registro = verificar_token($_POST['clave_registro']);
            if ($verificar_clave_registro) {
                $arrRespuesta =true;
            } else {
                $arrRespuesta = false;
            }
        } else {
            $arrRespuesta = false;
        }

        echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
    }


    public function InscripcionPhone()
    {
        $url_enrollment = TRUORA_URL . '/enrollments?account_id=' . $_POST['account_id'];
        $data_enrollment =  array(
            'type' => 'phone-verification',
            'phone_number' => '+57' . $_POST['celular'],
            'phone_type' => 'home',
            'user_authorized' => true,
            'document_number' => $_POST['identificacion']
        );
        $Enrollment = json_decode(PeticionTruora($url_enrollment, $data_enrollment, 'ctfd'));
        echo json_encode($Enrollment, JSON_UNESCAPED_UNICODE);
    }

    public function ValidacionPhone()
    {
        $url_validation = TRUORA_URL . '/validations?account_id=' . $_POST['account_id'];;
        $data_validation = array(
            'type' => 'phone-verification',
            'verify_channel' => 'sms',
            'phone_locale' => 'es',
            'phone_type' => 'home'
        );
        $Validation = json_decode(PeticionTruora($url_validation, $data_validation, 'ctfd'));
        echo json_encode($Validation, JSON_UNESCAPED_UNICODE);
    }

    public function VerificarValidacionPhone()
    {
        $url_token = TRUORA_URL . '/validations/' . $_POST['validation_id'] . '?account_id' . $_POST['account_id'];
        $data_verificar = array('type' => $_POST['type'], 'question_id' => $_POST['question_id'], 'token' => $_POST['token'], 'account_id' => $_POST['account_id']);
        $token = json_decode(PeticionTruora($url_token, $data_verificar, 'ctfd'), true);
        echo json_encode($token, JSON_UNESCAPED_UNICODE);
    }

    public function GoogleRegister()
    {
        $data['google'] = GoogleClient(GOOGLE_REDIRECT_URL1);
        $data['page_functions_js'] = 'function_registro_google.js';
        $data['page_header'] = 0;
        $this->views->getView($this, "google", $data);
    }

    public function FacebookRegister()
    {
        $data['facebook'] = FacebookClient();
        // $data['facebook'] = FacebookClient()['user_profile'];
        $data['page_functions_js'] = 'function_registro_facebook.js';
        $data['page_header'] = 0;
        $this->views->getView($this, "facebook", $data);
    }
}

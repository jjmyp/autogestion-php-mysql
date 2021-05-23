<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : login.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo que permite el acceso a la plataforma, mediante una autenticación. 
//
// Author: Luis Jair Medina
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer3@grupoasistencia.com
//============================================================+

class Login extends Controllers
{
	public function __construct()
	{
		session_start();
		if (isset($_SESSION['login'])) {
			header('Location: ' . base_url() . 'dashboard');
		}
		parent::__construct();
	}

	public function login()
	{
		$data['google'] = GoogleClient(GOOGLE_REDIRECT_URL2);
		$data['page_id'] = 1;
		$data['page_tag'] = 'Login';
		$data['page_title'] = 'Login';
		$data['page_name'] = 'Pagina principal';
		$data['page_functions_js'] = 'function_login.js';
		$data['page_header'] = 0;
		$this->views->getView($this, "login", $data);
	}

	public function cambiarcontrasena($params)
	{
		if (empty($params)) {
			header('Location: ' . base_url());
		} else {
			$arrParams = explode(',', $params);
			$strEmail = limpiar_cadena($arrParams[0]);
			$strToken = limpiar_cadena($arrParams[1]);
			$arrResponse = $this->model->GetUsuario($strEmail, $strToken);
			if (empty($arrResponse)) {
				header("Location: " . base_url());
			} else {
				$data['page_id'] = 1;
				$data['page_functions_js'] = 'function_cambiar_contasena.js';
				$data['email'] = $strEmail;
				$data['token'] = $strToken;
				$data['id'] = $arrResponse['id'];
				$data['page_header'] = 0;
				$this->views->getView($this, "cambiarcontrasena", $data);			
			}
		}
		die();
	}


	public function loginUser()
	{
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			if (!empty($_POST['correo']) || !empty($_POST['contrasena'])) {

				$ObtenerUsuario = $this->model->LoginUsuarioModel($_POST['correo'], $_POST['contrasena']);
				if ($ObtenerUsuario['status'] == 'success') {

					if ($ObtenerUsuario['result']['estado'] != 'INACTIVO') {
						$_SESSION['idUsuario'] = $ObtenerUsuario['result']['id'];
						$_SESSION['login'] = true;
						sessionUser($_SESSION['idUsuario']);
						$arrRespuesta = array('status' => 'success', 'msg' => 'Inicio de sesión exitoso');
					}
				} else {
					$arrRespuesta = array('status' => 'error', 'msg' => 'El usuario o la contraseña es incorrecto.');
				}

			} else {
				$arrRespuesta = array('status' => 'error', 'msg' => 'Los datos estan vacios');
			}
		} else {
			$arrRespuesta = array('status' => 'error', 'msg' => 'La peticion HTTP, no corresponde al metodo');
		}
		echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
	}

	public function correoactualizarcontrasena(){
		$Email  =  strtolower(limpiar_cadena($_POST['correo_electronico']));
		$usuario  = $this->model->ObtenerEmailUsuario($Email);
		$token = token();
		if (!empty($usuario)) {
			$requestUpdate = $this->model->setTokenUser($usuario['id'], $token);
			$url_recovery = base_url() . 'login/cambiarcontrasena/' . $Email . '/' . $token;

			if ($requestUpdate) {
				$data = array(
					'correo_electronico' => $_POST['correo_electronico'],
					'asunto' => 'Restablecer clave de ingreso MSD!',
					'template' => 'actualizar_correo',
					'mensaje' => 'Restablece tu contraseña',
					'link' => $url_recovery,
					'nombre' => $usuario['nombre']. ' '. $usuario['apellido']
				);

				enviar_correo_electronico2($data);

				$arrRespuesta = array('status' => 'success', 'message' => 'Se ha enviado el correo exitosamente');            
			}else{
				$arrRespuesta = array('status' => 'danger', 'message' => 'No se pudo enviar el correo electronico, porfavor consulte el correo electronico');
			}
		}else{
			$arrRespuesta = array('status' => 'danger', 'message' => 'El correo electronico no existe.');
		}
		echo json_encode($arrRespuesta, JSON_UNESCAPED_UNICODE);
	}

	public function Google(){
		$data['google'] = GoogleClient(GOOGLE_REDIRECT_URL2);
		if (isset($_GET['code'])) {
			$token = $data['google']->fetchAccessTokenWithAuthCode($_GET["code"]);
			if (!isset($token['error'])) {
				$data['google']->setAccessToken($token['access_token']);
				$google_oauth = GoogleService($data['google']);
				$google_account_info = $google_oauth->userinfo->get();
				$request = $this->model->GetUsuarioOne($google_account_info->email);
				if($request['estado'] == 'ACTIVO'){
    				if ($request['account'] == 'GOOGLE') {
    					sessionUser($request['id']);
    					$_SESSION['userData']['google']['id'] = $google_account_info->id;
    					$_SESSION['userData']['google']['hd'] = $google_account_info->hd;
    					$_SESSION['userData']['google']['link'] = $google_account_info->link;
    					$_SESSION['userData']['google']['locale'] = $google_account_info->locale;
    					$_SESSION['userData']['google']['familyName'] = $google_account_info->familyName;
    					$_SESSION['userData']['google']['givenName'] = $google_account_info->givenName;
    					$_SESSION['userData']['google']['verifiedEmail'] = $google_account_info->verifiedEmail;
    					$_SESSION['userData']['google']['picture'] = $google_account_info->picture;
    					$_SESSION['login'] = true;
    					header('Location: '.base_url().'dashboard');
    				}else{
    					header('Location: '.base_url().'login');
    				}
				}else{
				    header('Location: '.base_url().'login');
				}
			} else {
				$register_url = $data['google']->createAuthUrl();
				header('Location: ' . filter_var($register_url, FILTER_SANITIZE_URL));
			}
		} else {
			header('Location: ' . base_url());
		}
	}

	public function ActualizarContrasena()
	{
		if (empty($_POST['id']) || empty($_POST['email']) || empty($_POST['token']) || empty($_POST['contrasena']) || empty($_POST['confirmar_contrasena'])) {
			$arrResponse = array('status' => false, 'msg' => 'Error de datos');
		} else {
			$intIdpersona = intval($_POST['id']);
			$strPassword = $_POST['contrasena'];
			$strPasswordConfirm = $_POST['confirmar_contrasena'];
			$strEmail = limpiar_cadena($_POST['email']);
			$strToken = limpiar_cadena($_POST['token']);

			if ($strPassword != $strPasswordConfirm) {
				$arrResponse = array(
					'status' => false,
					'message' => 'Las contraseñas no son iguales.'
				);
			} else {
				$arrResponseUser = $this->model->GetUsuario($strEmail, $strToken);
				if (empty($arrResponseUser)) {
					$arrResponse = array(
						'status' => false,
						'message' => 'Erro de datos.'
					);
				} else {
					
					$strPassword = password_hash($strPassword, PASSWORD_DEFAULT);
					$requestPass = $this->model->CambiarContrasena($intIdpersona, $strPassword);

					if ($requestPass) {
						$arrResponse = array(
							'status' => 'success',
							'message' => 'Contraseña actualizada con éxito.'
						);
					} else {
						$arrResponse = array(
							'status' => 'danger',
							'message' => 'No es posible realizar el proceso, intente más tarde.'
						);
					}
				}
			}
		}
		echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
		die();
	}
}

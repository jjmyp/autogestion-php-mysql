<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : LoginModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Consulta información en la base de datos para iniciar sesión
//
// Author: Luis Jair Medina
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer3@grupoasistencia.com
//============================================================+
class LoginModel extends MySQL
{
	private $intIdUsuario;
	private $strUsuario;
	private $strPassword;
	private $strToken;

	public function __construct()
	{
		parent::__construct();
	}

	public function LoginUsuarioModel(string $usuario, string $password)
	{
		$this->strUsuario = $usuario;
		$this->strPassword = $password;

		$hash = $this->GetUsuarioOne($this->strUsuario);
		if (password_verify($this->strPassword, $hash['contrasena'])) {
			$sql = "SELECT usu.id, usu.estado 
				FROM `usuarios` AS usu 
				WHERE usu.correo_electronico = '$this->strUsuario'
				AND usu.estado IN('ACTIVO')";
			$response = $this->Select($sql);

			$response = array('status' => 'success', 'result' => $response);
		} else {
			$response = array('status' => 'error', 'message' => 'Credenciales invalidas');
		}
		return $response;
	}

	public function SesionLoginModel(int $iduser)
	{
		$this->intIdUsuario = $iduser;
		//BUSCAR ROLE 
		$sql = "SELECT tip.abreviacion AS tipo_documento, usu.ciudades_id, usu.id AS id, usu.nombre, usu.apellido, usu.identificacion, usu.fecha_nacimiento, usu.genero, usu.direccion, usu.telefono, usu.celular, usu.correo_electronico, usu.estado, usu.account_id, usu.imagen_perfil, rol.rol, rol.id AS rol_id, usu.imagen_perfil 
					FROM `usuarios` AS usu 
					INNER JOIN roles AS rol on (usu.roles_id = rol.id)
					INNER JOIN tipos_documentos AS tip ON (usu.tipos_documentos_id = tip.id)
					WHERE usu.id = $this->intIdUsuario";
		$request = $this->Select($sql);
		$_SESSION['userData'] = $request;
		return $request;
	}

	public function ObtenerEmailUsuario(string $strEmail)
	{
		$this->strUsuario = $strEmail;
		$sql = "SELECT id,nombre, apellido,estado FROM usuarios WHERE 
					correo_electronico = '$this->strUsuario' and  
					estado IN ('ACTIVO') ";
		$request = $this->Select($sql);
		return $request;
	}

	public function SetTokenUser(int $idusuario, string $token)
	{
		$this->intIdUsuario = $idusuario;
		$this->strToken = $token;
		$sql = "UPDATE usuarios SET token = ? WHERE id = ?";
		$arrData = array($this->strToken, $this->intIdUsuario);
		$request = $this->Update($sql, $arrData);
		return $request;
	}

	public function GetUsuario(string $email, string $token)
	{
		$this->strUsuario = $email;
		$this->strToken = $token;
		$sql = "SELECT id FROM usuarios WHERE 
					correo_electronico = '$this->strUsuario' AND 
					token = '$this->strToken' AND 					
					estado = 'ACTIVO'";
		$request = $this->Select($sql);
		return $request;
	}

	public function GetUsuarioOne(string $email)
	{
		$this->strUsuario  = $email;
		$sql = "SELECT usu.id AS id, usu.correo_electronico AS correo_electronico, usu.contrasena AS contrasena, usu.account, usu.estado AS estado FROM usuarios AS usu WHERE usu.correo_electronico = '$this->strUsuario' AND estado = 'ACTIVO' ";
		$request = $this->Select($sql);
		return $request;
	}

	public function CambiarContrasena(int $idPersona, string $password)
	{
		$this->intIdUsuario = $idPersona;
		$this->strPassword = $password;
		$sql = "UPDATE usuarios SET contrasena = ?, token = ? WHERE id = $this->intIdUsuario ";
		$arrData = array($this->strPassword, "");
		$request = $this->Update($sql, $arrData);
		return $request;
	}
}

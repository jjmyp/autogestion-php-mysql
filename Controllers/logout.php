<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : logout.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo para cerrar la sesión.
//
// Author: Luis Jair Medina
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer3@grupoasistencia.com
//============================================================+
class Logout
{
	public function __construct()
	{
		session_start();
		session_unset();
		session_destroy();
		header('location: ' . base_url() . 'login');
	}
}

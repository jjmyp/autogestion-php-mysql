<?php
//============================================================+
// Carpeta: Controllers
// Nombre del archivo   : error.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Modulo para obtener la vista de error, en caso tal que no se encuentra la pagiana solitada. 
//
// Author: Jairo Alberto Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class Errors extends Controllers
{
    public function __construct()
    {
        parent::__construct();
    }
    public function notFound()
    {
        $this->views->getView($this, "error");
    }

    public function registered(){
        $this->views->getView($this, "registrado");
    }
}
$notFound = new Errors();
$notFound->notFound();

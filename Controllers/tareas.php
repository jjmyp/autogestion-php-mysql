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
class Tareas extends Controllers
{
    public function __construct()
    {
        parent::__construct();
    }
    public function Tareas()
    {
        $data['page_id'] = 4;
        $data['page_tag'] = 'home';
        $data['page_title'] = 'Home';
        $data['page_name'] = 'Pagina principal';
        $data['page_header'] = 1;

        $this->views->getView($this, "tareas", $data);
    }
}

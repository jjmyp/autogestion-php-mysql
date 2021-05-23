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
class Start extends Controllers
{
    public function __construct()
    {
        parent::__construct();
    }

    public function Start()
    {
        $data['page_id'] = 5;
        $data['page_tag'] = 'Consulta de siniestros';
        $data['page_title'] = '  Consulta de siniestros';
        $data['page_functions_js'] = 'function_siniestros.js';
        $data['page_icon'] = 'fa fa-users';
        $data['page_header'] = 1;
        $this->views->getView($this, "start", $data);
    }


}

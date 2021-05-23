<?php

class Dashboard extends Controllers
{
    public function __construct()
    {        
        session_start();
		if (!isset($_SESSION['login'])) {
			header('Location: ' . base_url());
        }
        getPermisos(15);
        parent::__construct();
    }
    public function dashboard()
    {
        if(empty($_SESSION['permisosMod']['r'])){
            header("Location:".base_url().'error');
        }
        $data['page_id'] = 2;
        $data['page_tag'] = 'Inicio';
        $data['page_title'] = ' Inicio';
        $data['page_name'] = 'dashboard';
        //$data['page_icon'] = 'fa fa-dashboard';
        $data['page_functions_js'] = 'function_dashboard.js';
        $data['page_header'] = 1;
        $this->views->getView($this, "dashboard", $data);
    }
}

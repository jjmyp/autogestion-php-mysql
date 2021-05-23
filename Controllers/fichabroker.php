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
class FichaBroker extends Controllers
{
    public function __construct()
    {
        session_start();
		if (!isset($_SESSION['login'])) {
			header('Location: ' . base_url());
        }
        getPermisos(19);
        parent::__construct();
    }

    public function FichaBroker()
    {
        if(empty($_SESSION['permisosMod']['r'])){
            header("Location:".base_url().'dashboard');
        }
        $data['page_id'] = 5;
        $data['page_tag'] = 'Consulta broker';
        $data['page_title'] = '  Consulta broker';
        $data['page_functions_js'] = 'function_ficha_broker.js';
        $data['page_icon'] = '';
        $data['page_header'] = 1;
        $this->views->getView($this, "fichabroker", $data);
    }

    public function filter_broker()
    {
        $data = $_GET['data'];
        $usuarios = $this->model->filter_broker_model($data);
        // $usuarios = json_decode($usuarios);

        foreach ($usuarios as $key => $val) {
            if($val['causal_bloqueo']){
                $params = array(
                    "codigo" => "CAUBL",
                    "id" => $val['causal_bloqueo']
                );
                $data = json_decode(peticion_sga('types/params', 'GET', $params));
                
                if($data->status == "success"){
                    $usuarios[$key]['causal_bloqueo_desc'] = $data->result[0]->descripcion_tipos;
                }else{
                    $usuarios[$key]['causal_bloqueo_desc'] = '';
                }
            }else{
                $usuarios[$key]['causal_bloqueo_desc'] = '';
            }

            if($val['canal']){
                $param = array(
                    "codigo" => "CANCL",
                    "id" => $val['canal']
                );
                $dato = json_decode(peticion_sga('types/params', 'GET', $param));

                if($dato->status == "success"){
                    $usuarios[$key]['canal_desc'] = $dato->result[0]->descripcion_tipos;
                }else{
                    $usuarios[$key]['canal_desc'] = '';
                }
            }else{
                $usuarios[$key]['canal_desc'] = '';
            }
        }

        echo json_encode($usuarios, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function info_edit()
    {
        $id = $_GET['id'];

        $data = array(
            'info_cliente' => $this->model->info_edit_model($id),
            'tipos_documentos' => $this->model->tabla_tipo_documento(),
            'ciudades' => $this->model->tabla_ciudades(),
            'canales' => $this->model->tabla_canal(),
            'causal_bloqueos' => $this->model->tabla_causal_bloqueo()
        );

        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function edit_info_usuario()
    {
        $data = $_POST;

        $update = $this->model->edit_info_usuario_model($data);
        echo json_encode($update, JSON_UNESCAPED_UNICODE);
        die();
    }
}

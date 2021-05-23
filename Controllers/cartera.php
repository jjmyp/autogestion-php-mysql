<?php

class Cartera extends Controllers
{
    public function __construct()
    {
        session_start();
        if (!isset($_SESSION['login'])) {
            header('Location: ' . base_url());
        }
        getPermisos(17);
        parent::__construct();
    }

    public function Cartera()
    {
        if(empty($_SESSION['permisosMod']['r'])){
            header("Location:".base_url().'dashboard');
        }
        $data['page_tag'] = 'Cartera de tus negocios';
        $data['page_title'] = '  Cartera de tus negocios';
        $data['page_functions_js'] = 'function_cartera.js';
        //$data['page_icon'] = 'fa fa-users';
        $data['page_header'] = 1;
        $this->views->getView($this, "cartera", $data);
    }

    public function ramos_cartera()
    {
        $params = array(
            "codigo" => "RAMOS"
        );
        $data = json_decode(peticion_sga('types/params', 'GET', $params));

        echo json_encode($data);
    }

    public function filter_cartera()
    {
        $dato = $_GET['dato'];
        $ramo = $_GET['ramo'];

        $params = array(
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640
        );

        if($dato){
            $params['placa'] = $dato;
            $params['numero_poliza'] = $dato;
            $params['identificacion'] = $dato;
        }
        if($ramo){
            $params['ramo'] = $ramo;
        }

        $data = json_decode(peticion_sga('policies/params', 'GET', $params));

        if($data->status == "success"){
            foreach ($data->result as $key => $val) {
                $val = self::info_null($val);
                $parames = array(
                    'id' => $val->cliente_id,
                    "funcionario" => $_SESSION['userData']['id'],
                    "aplicacion" => 640
                );
                $datos = json_decode(peticion_sga('customers/params', 'GET', $parames));
                $val->info_cliente = $datos->result[0];
                $paramestro = array(
                    'poliza_id' => $val->poliza_id,
                    "funcionario" => $_SESSION['userData']['id']
                );
                $datos = json_decode(peticion_sga('portfoliofeelog/params', 'GET', $paramestro));
                if($datos->http_code == 422){
                    $val->estado_cartera = $val->estado_cartera;
                    $val->fecha_pago = "";
                }else{
                    $val->estado_cartera = "Pendiente de pago";
                    $val->fecha_pago = "";
                    foreach ($datos->result as $key => $value) {
                        if($value->estado_cartera){
                            $val->estado_cartera = $value->estado_cartera;
                        }
                        if($value->fecha_pago){
                            $val->fecha_pago = date("d-m-Y",strtotime($value->fecha_pago));
                        }
                    }
                }
                $val->fecha_inicio_vigencia = date('d-m-Y',strtotime($val->fecha_inicio_vigencia));
                if($val->aseguradora_id == 159 || $val->aseguradora_id == 164){
                    $val->fecha_limite = date('d-m-Y',strtotime($val->fecha_inicio_vigencia.' 1 months 15 days'));
                }else{
                    $val->fecha_limite = date('d-m-Y',strtotime($val->fecha_inicio_vigencia.' 1 months'));
                }
                $fecha = new DateTime($val->fecha_inicio_vigencia);
                $hoy = new DateTime(date('Y-m-d'));
                $val->dias = $fecha->diff($hoy);
                $val->valor_total = '$' . number_format($val->valor_total);
            }
        }

        echo json_encode($data);
    }

    function file_cartera() 
    {
        $file = $_FILES['file'];
        $id = $_POST['id'];

        $params = array(
            'image' => new CurlFile($file['tmp_name'], $file['type'], $file['name'])
        );

        $datos = json_decode(peticion_sga('uploads', 'POST', $params));


        $param = array(
            'id' => $id,
            "funcionario" => $_SESSION['userData']['id'],
            "aplicacion" => 640
        );

        $info = json_decode(peticion_sga('policies/params','GET',$param));

        $parametro = array(
            'soporte_pago' => $datos->filename,
            "numero_poliza" => $info->result[0]->numero_poliza, 
            "aseguradora" => $info->result[0]->aseguradora_id, 
            "asegurado" => $info->result[0]->asegurado_id, 
            "ramo" => $info->result[0]->ramo_id, 
            "fecha_expedicion" => date("Y-m-d",strtotime($info->result[0]->fecha_expedicion)), 
            "fecha_inicio_vigencia" => date("Y-m-d",strtotime($info->result[0]->fecha_inicio_vigencia)), 
            "fecha_final_vigencia" => date("Y-m-d",strtotime($info->result[0]->fecha_final_vigencia)), 
            "riesgo" => $info->result[0]->riesgo_id, 
            "tomador" => $info->result[0]->tomador, 
            "responsable_pago" => $info->result[0]->responsable_pago_id, 
            "sede" => $info->result[0]->sede_id, 
            "procedencia" => $info->result[0]->procedencia_id, 
            "estado" => $info->result[0]->estado_id, 
            "tipo_estado" => 1, 
            "punto_venta" => $info->result[0]->punto_venta_id, 
            "forma_pago" => $info->result[0]->forma_pago_id, 
            "aplicacion" => $info->result[0]->aplicacion_id, 
            "usuario_expedicion" => $info->result[0]->usuario_expedicion, 
            "observacion" => $info->result[0]->observacion, 
            "valor_prima" => $info->result[0]->valor_prima, 
            "valor_otros"=> $info->result[0]->valor_otros, 
            "subtotal" => $info->result[0]->subtotal, 
            "valor_iva" => $info->result[0]->valor_iva, 
            "valor_neto" => $info->result[0]->valor_neto, 
            "valor_runt" => $info->result[0]->valor_runt, 
            "valor_total" => $info->result[0]->valor_total, 
            "renovable" => 1, 
            "certificado_anexo" => "", 
            "numero_contrato" => "", 
            "numero_pagare" => "s",
            "fecha_cancelacion" => date("Y-m-d",strtotime($info->result[0]->fecha_cancelacion)),
            "motivo_cancelacion" => $info->result[0]->motivo_cancelacion,
            "valor_reversado" => $info->result[0]->valor_reversado,
            "financiera" => $info->result[0]->financiera,
            "numero_cuotas" => $info->result[0]->numero_cuotas,
            "estado_cartera" => $info->result[0]->estado_cartera,
            "broker" => $info->result[0]->broker
        );

        $data = json_decode(peticion_sga('policies/'.$id, 'PUT', $parametro));


        echo $datos->filename;
    }
    public static function info_null($data)
    {
        $data->numero_poliza = is_null($data->numero_poliza) ? '' : $data->numero_poliza;
        $data->aseguradora = is_null($data->aseguradora) ? '' : $data->aseguradora;
        $data->ramo = is_null($data->ramo) ? '' : $data->ramo;
        $data->fecha_expedicion = is_null($data->fecha_expedicion) ? '' : $data->fecha_expedicion;
        $data->fecha_inicio_vigencia = is_null($data->fecha_inicio_vigencia) ? '' : $data->fecha_inicio_vigencia;
        $data->fecha_final_vigencia = is_null($data->fecha_final_vigencia) ? '' : $data->fecha_final_vigencia;
        $data->riesgo = is_null($data->riesgo) ? '' : $data->riesgo;
        $data->tomador = is_null($data->tomador) ? '' : $data->tomador;
        $data->responsable_pago = is_null($data->responsable_pago) ? '' : $data->responsable_pago;
        $data->sede = is_null($data->sede) ? '' : $data->sede;
        $data->procedencia = is_null($data->procedencia) ? '' : $data->procedencia;
        $data->estado = is_null($data->estado) ? '' : $data->estado;
        $data->tipo_estado = is_null($data->tipo_estado) ? '' : $data->tipo_estado;
        $data->punto_venta = is_null($data->punto_venta) ? '' : $data->punto_venta;
        $data->forma_pago = is_null($data->forma_pago) ? '' : $data->forma_pago;
        $data->aplicacion = is_null($data->aplicacion) ? '' : $data->aplicacion;
        $data->usuario_expedicion = is_null($data->usuario_expedicion) ? '' : $data->usuario_expedicion;
        $data->observacion = is_null($data->observacion) ? '' : $data->observacion;
        $data->valor_prima = is_null($data->valor_prima) ? '' : $data->valor_prima;
        $data->valor_otros = is_null($data->valor_otros) ? '' : $data->valor_otros;
        $data->subtotal = is_null($data->subtotal) ? '' : $data->subtotal;
        $data->valor_iva = is_null($data->valor_iva) ? '' : $data->valor_iva;
        $data->valor_neto = is_null($data->valor_neto) ? '' : $data->valor_neto;
        $data->valor_runt = is_null($data->valor_runt) ? '' : $data->valor_runt;
        $data->valor_total = is_null($data->valor_total) ? '' : $data->valor_total;
        $data->renovable = is_null($data->renovable) ? '' : $data->renovable;
        $data->certificado_anexo = is_null($data->certificado_anexo) ? '' : $data->certificado_anexo;
        $data->numero_contrato = is_null($data->numero_contrato) ? '' : $data->numero_contrato;
        $data->numero_pagare = is_null($data->numero_pagare) ? '' : $data->numero_pagare;
        $data->fecha_cancelacion = is_null($data->fecha_cancelacion) ? '' : $data->fecha_cancelacion;
        $data->motivo_cancelacion = is_null($data->motivo_cancelacion) ? '' : $data->motivo_cancelacion;
        $data->valor_reversado = is_null($data->valor_reversado) ? '' : $data->valor_reversado;
        $data->financiera = is_null($data->financiera) ? '' : $data->financiera;
        $data->numero_cuotas = is_null($data->numero_cuotas) ? '' : $data->numero_cuotas;
        $data->estado_cartera = is_null($data->estado_cartera) ? '' : $data->estado_cartera;
        $data->broker = is_null($data->broker) ? '' : $data->broker;

        return $data;
    }
}

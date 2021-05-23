<?php

class FichaBrokerModel extends MySQL
{
    public function __construct(){
        parent::__construct();
    }

    public function filter_broker_model($data)
    {
        $option = "";
        if($data){
            $option = " where concat_ws(' ',nombre,apellido) like '%$data%' or identificacion = '$data' or celular = '$data'";
        }

        $sql = "SELECT usuarios.id, usuarios.nombre, usuarios.apellido, tipos_documentos.descripcion, usuarios.identificacion, usuarios.fecha_nacimiento, usuarios.genero, usuarios.direccion, ciudades.nombre_ciudad, usuarios.telefono, usuarios.celular, usuarios.correo_electronico, cupos.monto_maximo, cupos.saldo, cupos.cupo_maximo, usuarios.estado, cupos.causal_bloqueo, cupos.canal FROM usuarios 
                LEFT JOIN cupos ON cupos.usuario = usuarios.id
                LEFT JOIN tipos_documentos ON tipos_documentos.id = usuarios.tipos_documentos_id
                LEFT JOIN ciudades ON ciudades.id = usuarios.ciudades_id".
                $option;
        $res = $this->SelectAll($sql);

        return $res;
    }

    public function info_edit_model($id)
    {
        $sql = "SELECT usuarios.id AS id_usuario, usuarios.*, cupos.* FROM usuarios LEFT JOIN cupos ON cupos.usuario = usuarios.id WHERE usuarios.id = $id";
        $res = $this->SelectAll($sql);

        return $res;
    }

    public function tabla_tipo_documento()
    {
        $sql = "SELECT * FROM tipos_documentos";
        $res = $this->SelectAll($sql);

        return $res;
    }

    public function tabla_ciudades()
    {
        $sql = "SELECT * FROM ciudades";
        $res = $this->SelectAll($sql);

        return $res;
    }

    public function tabla_canal()
    {
        $param = array(
            "codigo" => "CANCL"
        );
        $dato = json_decode(peticion_sga('types/params', 'GET', $param));

        return $dato;
    }

    public function tabla_causal_bloqueo()
    {
        $param = array(
            "codigo" => "CAUBL"
        );
        $dato = json_decode(peticion_sga('types/params', 'GET', $param));

        return $dato;
    }

    public function edit_info_usuario_model($data)
    {
        $consulta_usuario = "UPDATE usuarios SET nombre = ?, apellido = ?, identificacion = ?, fecha_nacimiento = ?, genero = ?, direccion = ?, telefono = ?, celular = ?, correo_electronico = ?, estado = ?, ciudades_id = ?, tipos_documentos_id = ? WHERE id = ".$data['id'];
        $arrInformacion_usuario = array($data['nombres'], $data['apellidos'], $data['identificacion'], $data['fecha_nacimiento'], $data['genero'], $data['direccion'], $data['telefono'], $data['celular'], $data['correo_electronico'], $data['estado'], $data['ciudad'], $data['tipo_documento']);
        $peticion = $this->Update($consulta_usuario, $arrInformacion_usuario);

        $cupo = "SELECT * FROM cupos WHERE usuario = ".$data['id'];
        $res = $this->SelectAll($cupo);

        if(!isset($res[0])){
            $consulta_cupo = "INSERT INTO cupos(usuario, cupo_maximo, monto_maximo, canal, causal_bloqueo) VALUES (?, ?, ?, ?, ?) ";
            $arrInformacion_cupo = array($data['id'], $data['cupo_maximo'], $data['monto_maximo'], $data['canal'], $data['causal_bloqueo']);
            $peticion = $this->Insert($consulta_cupo, $arrInformacion_cupo);
        }else{
            $consulta_cupo = "UPDATE cupos SET cupo_maximo = ?, monto_maximo = ?, canal = ?, causal_bloqueo = ? WHERE usuario = ".$data['id'];
            $arrInformacion_cupo = array($data['cupo_maximo'], $data['monto_maximo'], $data['canal'], $data['causal_bloqueo']);
            $peticion = $this->Update($consulta_cupo, $arrInformacion_cupo);
        }

        $sql = "SELECT usuarios.id, usuarios.nombre, usuarios.apellido, tipos_documentos.descripcion, usuarios.identificacion, usuarios.fecha_nacimiento, usuarios.genero, usuarios.direccion, ciudades.nombre_ciudad, usuarios.telefono, usuarios.celular, usuarios.correo_electronico, cupos.monto_maximo, cupos.saldo, cupos.cupo_maximo, usuarios.estado, cupos.causal_bloqueo, cupos.canal FROM usuarios 
                LEFT JOIN cupos ON cupos.usuario = usuarios.id
                LEFT JOIN tipos_documentos ON tipos_documentos.id = usuarios.tipos_documentos_id
                LEFT JOIN ciudades ON ciudades.id = usuarios.ciudades_id
                WHERE usuarios.id = ".$data['id'];
        $data = $this->SelectAll($sql);
        if($data[0]['causal_bloqueo']){
            $params = array(
                "codigo" => "CAUBL",
                "id" => $data[0]['causal_bloqueo']
            );
            $datas = json_decode(peticion_sga('types/params', 'GET', $params));
            
            if($datas->status == "success"){
                $data[0]['causal_bloqueo_desc'] = $datas->result[0]->descripcion_tipos;
            }else{
                $data[0]['causal_bloqueo_desc'] = '';
            }
        }else{
            $data[0]['causal_bloqueo_desc'] = '';
        }

        if($data[0]['canal']){
            $param = array(
                "codigo" => "CANCL",
                "id" => $data[0]['canal']
            );
            $dato = json_decode(peticion_sga('types/params', 'GET', $param));

            if($dato->status == "success"){
                $data[0]['canal_desc'] = $dato->result[0]->descripcion_tipos;
            }else{
                $data[0]['canal_desc'] = '';
            }
        }else{
            $data[0]['canal_desc'] = '';
        }

        return $data;
    }
}
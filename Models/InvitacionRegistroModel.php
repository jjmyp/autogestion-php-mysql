<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : RegistroModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Registro de plataforma para los referidores
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class InvitacionRegistroModel extends MySQL
{

    private $strToken;
    private $strClaveRegistro;
    private $intEstado;
    private $intTokenId;

    public function __construct(){
        parent::__construct();
    }

    public function EstablecerToken(string $token, string $clave_registro){
        $this->strToken = $token;
        $this->strClaveRegistro = $clave_registro;
        
        $consulta = "INSERT INTO expiraciones(token, clave_registro) VALUES(?, ?)";
        $arrInformacion = array($this->strToken, $this->strClaveRegistro);
        $peticion = $this->Insert($consulta, $arrInformacion);        
        
        return $peticion;
    }

    public function ActualizarToken(string $clave_registro){
        
        $this->strToken = $clave_registro;
        $this->strEstado = 0;

        $tokenId = $this->SelectAll("SELECT * FROM expiraciones WHERE clave_registro = '$clave_registro'");

        $this->intTokenId =  $tokenId[0]['id'];
        
        $consulta = "UPDATE expiraciones SET token = ?, estado = ? WHERE id = ?";
        $arrInformacion = array($this->strToken, 0, $this->intTokenId);
        $peticion = $this->Update($consulta, $arrInformacion);
        return $peticion;
    }

    public function ObtenerToken($token){
        $consulta = "SELECT * FROM expiraciones WHERE clave_registro = '$token' AND estado = 1";
        $peticion = $this->SelectAll($consulta);
        $respuesta = empty($peticion) ? false : true;        
        return $respuesta;
    }
}
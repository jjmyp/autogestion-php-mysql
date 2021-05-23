<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : PerfilModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Perfil del usuario
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class PerfilModel extends MySQL
{
    private $intIdPerfil;
    private $strFechaNacimiento;
    private $strGenero;
    private $strDireccion;
    private $strCiudad;
    private $strImagen;

    public function __construct(){
        parent::__construct();
    }

    public function ActualizarPerfil(int $idPerfil, string $FechaNacimiento, string $Genero, string $Direccion, string $Ciudad, string $Imagen){
        $this->intIdPerfil = $idPerfil;
        $this->strFechaNacimiento = $FechaNacimiento;
        $this->strGenero = $Genero;
        $this->strDireccion = $Direccion;
        $this->strCiudad = $Ciudad;
        $this->strImagen = $Imagen;
         
        $consulta = "UPDATE usuarios SET fecha_nacimiento = ?, genero = ?, direccion = ?, ciudades_id = ?, imagen_perfil = ?  WHERE id = ?";
        $arrInformacion = array($this->strFechaNacimiento, $this->strGenero, $this->strDireccion, $this->strCiudad, $this->strImagen, $this->intIdPerfil);
        $peticion = $this->Update($consulta, $arrInformacion);
        $respuesta = $peticion;

        return $respuesta;
    }
}

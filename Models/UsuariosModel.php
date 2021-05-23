<?php
//============================================================+
// Carpeta: Models
// Nombre del archivo   : UsuarioModel.php
// Inicio       : 2020-11-01
// Ultima actualizacion : 2020-11-19
//
// Description : Gestionar los usuarios en la base de datos
//
// Author: Jairo Rivera Ordoñez
//
// (c) Copyright:
//               Seguros Grupo Asisencia ltda
//               developer5@grupoasistencia.com
//============================================================+
class UsuariosModel extends MySQL
{
    public $strIdentificacion;
    public $strNombre;
    public $strApellido;
    public $strFechaNacimiento;
    public $strGenero;
    public $strDireccion;
    public $strTelefono;
    public $strCelular;
    public $strCorreoElectronico;
    public $strEstado;
    public $strContrasena;
    public $intCiudadesId;
    public $intTiposDocumentosId;
    public $intRolesId;
    public $intUsuarioId;

    public function __construct(){
        parent::__construct();
    }

    public function AgregarUsuarioModel(array $datos){
        extract($datos);
        $this->strIdentificacion = $documento;
        $this->strNombre = $nombre;
        $this->strApellido = $apellido;
        $this->strFechaNacimiento = $fecha_nacimiento;
        $this->strGenero = $genero;
        $this->strDireccion = $direccion;
        $this->strTelefono = $telefono;
        $this->strCelular = $celular;
        $this->strCorreoElectronico = $correo_electronico;
        $this->intCiudadesId = $ciudad;
        $this->intTiposDocumentosId = $tipo_documento;
        $this->intRolesId = $rol;
        $this->strContrasena = password_hash($contrasena, PASSWORD_DEFAULT);
        $ExisteUsuario = $this->SelectAll("SELECT * FROM usuarios WHERE identificacion = '$this->strIdentificacion' OR correo_electronico = '$this->strCorreoElectronico'");
        if (empty($ExisteUsuario)) {
            $consulta = "INSERT INTO usuarios(identificacion, nombre, apellido, fecha_nacimiento, genero, direccion, telefono, celular, correo_electronico, contrasena, ciudades_id, tipos_documentos_id, roles_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $arrInformacion = array($this->strIdentificacion, $this->strNombre, $this->strApellido, $this->strFechaNacimiento, $this->strGenero, $this->strDireccion, $this->strTelefono, $this->strCelular,$this->strCorreoElectronico, $this->strContrasena, $this->intCiudadesId,$this->intTiposDocumentosId, $this->intRolesId);
            $peticion = $this->Insert($consulta, $arrInformacion);
            $respuesta = $peticion;
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }

    public function ObtenerUsuarioModel(string $id){
        $consulta = "SELECT * FROM usuarios WHERE id = $id";
        $peticion = $this->Select($consulta);
        return $peticion;
    }

    public function ObtenerUsuariosModel(){
        $consulta = "SELECT * FROM usuarios";
        $peticion = $this->SelectAll($consulta);
        return $peticion;
    }

    public function ActualizarUsuarioModel(string $identificacion, string $nombre, string $apellido, string $fecha_nacimiento, string $genero, string $direccion, string $telefono, string $celular, string $correo_electronico, $estado, int $idCiudad, int $idTipodocumento, int $idRol, int $idUsuario){
        $this->strIdentificacion = $identificacion;
        $this->strNombre = $nombre;
        $this->strApellido = $apellido;
        $this->strFechaNacimiento = $fecha_nacimiento;
        $this->strGenero = $genero;
        $this->strDireccion = $direccion;
        $this->strTelefono = $telefono;
        $this->strCelular = $celular;
        $this->strCorreoElectronico = $correo_electronico;
        $this->estado = $estado;
        $this->intCiudadesId = $idCiudad;
        $this->intTiposDocumentosId = $idTipodocumento;
        $this->intRolesId = $idRol;
        $this->intUsuarioId = $idUsuario;
        $ExisteUsuario = $this->SelectAll("SELECT * FROM usuarios WHERE identificacion = '$this->strIdentificacion' AND id NOT IN('$this->intUsuarioId') ");
        if (empty($ExisteUsuario)) {
            $consulta = "UPDATE usuarios SET nombre = ?, apellido = ?, identificacion = ?, fecha_nacimiento = ?, genero = ?, direccion = ?, telefono = ?, celular = ?, correo_electronico = ?,estado = ?, ciudades_id = ?, tipos_documentos_id = ?, roles_id = ? WHERE id = $this->intUsuarioId";
            $arrInformacion = array($this->strNombre, $this->strApellido,$this->strIdentificacion,$this->strFechaNacimiento,$this->strGenero,$this->strDireccion,$this->strTelefono,$this->strCelular,$this->strCorreoElectronico, $this->estado , $this->intCiudadesId, $this->intTiposDocumentosId, $this->intRolesId);
            $peticion = $this->Update($consulta, $arrInformacion);
            $respuesta = $peticion;
        }else{
            $respuesta = 'exist';
        }
        return $respuesta;
    }

    public function EliminarUsuarioModel(int $id){
        $this->intUsuarioId = $id;
        $consulta = "DELETE FROM usuarios WHERE id = $this->intUsuarioId";
        $peticion = $this->Delete($consulta);
        return $peticion;
    }
}

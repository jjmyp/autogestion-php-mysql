<?php

$template = '
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>

    .button {            
        border: none;
        background: #ff9933;
        color: #fff !important;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        margin: 4px 2px;
        cursor: pointer;
        font-size: 20px;
    }
    .black{
        color: #000;
    }
    .h1-name{
        margin-top: 280px;
        margin-left: 28px;
        font-size: 36px;
        color: #e78238;
    }
    .h4-name{
        margin-left: 28px;
        font-size: 15px;
        color: #e78238;
    }
    .container {
        margin-bottom: 2%;
    }

    .td-style{
        vertical-align: unset;
    }

    p{
        margin-left: 28px;
        font-size: 20px;
        color: black;
    }
    @media screen and (max-width:600px) {
        .h1-name{
            margin-top: 320px;
            margin-left: 28px;
            font-size: 20px;
            color: #e78238;
        }
        .h4-name{

            margin-left: 28px;
            font-size: 10px;
            color: #e78238;
        }
        p{
            margin-left: 28px;
            font-size: 13px;
            color: black;
        }
        .button {            
            border: none;
            background: #ff9933;
            color: #fff !important;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            margin: 4px 2px;
            cursor: pointer;
            font-size: 15px;
        }
        
    }
    </style>
</head>

<body>
    <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" src="'.media().'images/iregistro1.jpg" color="#7bceeb"/>
        </v:background>
    <![endif]-->
    <div class="container" background="'.media().'images/iregistro1.jpg">
        <table style="background-size:100% 100%;height:800px;width:600px" border="0" cellspacing="0" cellpadding="20" background="'.media().'images/iregistro1.jpg">
            <tr>
                <td>
                    <h1 class="h1-name">Hola ' . $data["nombre"] . ',</h1>
                    <p>Estas a un paso de <b>ser parte de nuestro equipo</b> y dar un paso importante como empresario. Solo debes dar clic en el enlace para registrarte.</p>
                    <h4 class="h4-name">Clave de registro: ' . $data["clave_registro"] . '</h4>
                </td>
            </tr>
            <tr>
                <td class="td-style">
                    <center><a href="' . $data["link"] . '" class="button">REGISTRATE AQUI</a><center>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>';

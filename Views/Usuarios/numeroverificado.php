<?php headerAdmin($data); ?>

<body>
    <style>
        .btn-enviar {
            border-radius: 20px 20px 20px 20px;
            width: 250px;
        }

        .btn-inputs {
            width: 39px;
            border-radius: 50%;
            margin-right: 15px;
            background-color: #67b5fb;
            vertical-align: middle;
            text-justify: auto;
        }

        .fa-4x {
            font-size: 25px;
            color: white;
            padding-top: 6px;
        }

        .form-control {
            border-radius: 8px 8px 8px 8px;
            border-bottom-left-radius: 8px !important;
            border-top-left-radius: 8px !important;
        }
    </style>
    <form id="regForm">
        <div class="logo">
            <center><img src="<?= media(); ?>/images/logo.png" alt="" srcset=""></center>
        </div>
        <div class="tab mt-4"></div>
        <div class="tab">
            <p class="text-center text-info">TU NUMERO HA SIDO</p>
            <h4 class="text-center text-info">VERIFICADO</h4>
            <p class="text-center text-dark">Fecha de verificacion</p>
            <p class="text-center text-dark">Octubre 20 2020</p>
        </div>
        <div class="mt-3" style="overflow:auto;">
            <div style="float:center;" class="text-center">
                <button type="submit" id="btnSiguiente" class="btn btn-enviar btn-warning">SIGUIENTE</button>
            </div>
        </div>
    </form>
    <?php footerAdmin($data); ?>
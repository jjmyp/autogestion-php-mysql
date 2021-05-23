<?php
headerAdmin($data);
getModal('modalAgregarOfertaManual', $data);

?>

<style>
    body {
        line-height: 18px;
    }

    #li_soat {
        background-color: white;
        margin-bottom: 20px;
    }

    .cardInfo {
        text-align: left !important;
    }

    .conten-ayuda {
        height: auto;
        padding-top: 5%;
        padding-bottom: 5%;
        border-radius: 0.5em;
        background-color: #fff;
    }




    #li_soat2 {
        background-color: white;
        border: 1px solid #67B5FB;
        margin-bottom: 20px;
    }


    .clasModeloVeh {
        font-weight: 400;
    }

    ::placeholder {
        color: black !important;
    }



    .segga-solicitar {
        background-color: #fff;
        border: 1px solid #B785F8;
        border-radius: 1.3em 1.3em 1.3em 1.3em;
    }

    .img_slider_derecho_header {
        width: 280px;
        margin-top: 32px;
        margin-bottom: 32px;
    }

    .img_cotizador {
        border-radius: 1.3em 1.3em 0em 0em;
    }

    .form_cotizador {
        margin-left: 0px;
        margin-right: 0px;
        background-color: #fff;
        padding: 20px;
        border-radius: 0em 0em 1.3em 1.3em;
    }

    .btn_cotizador {
        width: 30%;
        border-radius: 2.5em;
        font-weight: 600;
        height: 50px;
        background-color: #B785F8;
        color: white;
        height: 37px;
    }

    .inputVacio {
        border: 3px solid rgb(94, 219, 241) !important;
    }

    .div_conocesPlaca {
        text-align: right !important;
    }

    .classNumPlaca {
        width: 65%;
    }

    .div_esCeroKM {
        text-align: left !important;
    }

    .sin-placa {
        font-size: 17px;
        color: #B785F8;
        font-weight: 500;
    }

    .btn-circle-cotizador {
        width: 28px;
        height: 28px;
        padding: 2px 0px 0px 3px;
        border-radius: 15px;
        text-align: center;
        font-size: 14px;
        line-height: 1.42857;
        background-color: #B785F8;
        color: white;
    }

    .img-slide {
        height: 270px;
    }

    .contenido-slide {
        margin-left: 0px;
        margin-right: 0px;
        padding: 40px 20px 0px 20px;
    }

    .btn-solicitar-slide {
        height: 40px;
        font-weight: 800;
        border-radius: 2.5em;
        color: #5967BF;
        border-color: #5967BF;
        background-color: white;
    }

    .sombreado_span {
        color: #B785F8;
    }

    .div_terminosycondiciones {
        text-align: center;
        padding-top: 4px;
    }

    .a_direccion {
        text-decoration: none;
    }

    .div_terminosycondiciones {
        text-align: center;
        /* padding-right: 0; */
        padding-top: 4px;
    }

    .custom-control-indicator {
        border: 2px solid rgb(146, 142, 141);
    }

    .conten_resumen {
        padding-top: 135px !important;
    }

    .card_resumen {
        height: auto;
        padding: 0;
        -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        border-radius: 0.5em;
    }

    .card_resumen_movil {
        height: auto;
        padding: 0;
        -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        border-radius: 0.5em;
    }

    .card-viajes,
    .card-soat {
        height: auto;
    }

    .img_segga_form {
        padding: 0;
        background-image: url("../img/TODORIESGO/COTIZADOR/Banner-Cotizador-Todo-Riesgo.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 1.3em 1.3em 0em 0em;
        height: 450px !important;
    }

    .div_footer_asesor_segga {
        font-size: 16px;
        height: auto;
        padding-top: 5%;
        padding-bottom: 5%;
    }

    .btn_solicitar2 {
        width: 45%;
        border-radius: 2.5em;
        font-weight: 400;
        height: 29px;
        background-color: #B785F8;
        color: white;
        /* margin: 4% 5% 5% 32%; */
        padding: 1%;
    }

    .card-ofertas {
        margin: 7% 0% 7% 0%;
        background-color: #fff;
        -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        border-radius: 0.5em;
    }

    .card-ofertas2 {
        margin: 1% 0% 1% 0%;
        background-color: #fff;
        -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.44);
        border-radius: 0.5em;
    }

    .card-text {
        font-size: 13px;
        font-weight: 400;
        line-height: 1em;
    }

    .card_form {
        height: auto;
        padding: 0% 0% 0% 2%;
        background-color: transparent;
    }

    .row.gap-y>.col,
    .row.gap-y>[class*="col-"] {
        padding-top: 0px;
    }

    .card_txt {
        margin-top: 0%;
    }

    .div_izq_info_produc {
        padding-top: 3%;
    }

    .btn_cotizar {
        width: 100% !important;
    }

    .div_boton_producto {
        text-align: left;
    }



    /* ESTILOS COTIZADOR TODO RIESGO */

    .btn_cotizador-form {
        width: 40%;
        border-radius: 2.5em;
        font-weight: 600;
        height: 37px;
        background-color: #00ADEF;
        color: white;
        margin: 5% 0% 5% 0%;
    }

    .img_card_producto {
        height: 184.66px;
    }

    /* Css para modificar la tabla del cotizador */
    .table tbody th {
        border-top: unset;
    }

    .table td,
    .table th {
        padding: 0.55rem;
    }

    /* Para los terminos y condiciones */
    .terminos {
        font-size: 10px;
        -webkit-box-flex: 0;
        flex-grow: 0;
        line-height: normal;
        letter-spacing: 0;
        text-align: justify;
    }

    .titulo_terminos,
    .titulo_table {
        font-weight: 500;
    }

    .img-resumen-compra {
        background-image: url(../../assets/img/TODORIESGO/COTIZADOR/BannerpcotizadorTR.jpg) !important;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 0.5em 0.5em 0em 0em;
        height: 108px !important;
    }

    .btn_solicitar {
        width: 80%;
        height: 35px;
        padding: 3%;
        font-weight: 500;
        margin: 5% 5% 5% 32%;
        border-radius: 2.5em;
        color: #B785F8;
        border-color: #B785F8;
        background-color: white;
    }

    .btn-solicitar-resumen {
        width: 100%;
        height: 40px;
        font-weight: 800;
        border-radius: 2.5em;
        color: #B785F8;
        border-color: #B785F8;
        background-color: white;
    }

    .div_promo {
        padding: 0;
        margin: 3% 0% 1% 0%;
        text-align: left;
        font-size: 14px;
        font-weight: 400;
        color: #B1B1B1;
    }

    .space label {
        margin-bottom: 0rem;
    }

    .btn-next,
    .btn-previous {
        width: 23%;
        border-radius: 2.5em;
        font-weight: 500;
        height: 40px;
        background-color: #B785F8;
        color: white;
        margin: 0% 0% 0% 1%
    }

    .btn-cotizar {
        width: 100%;
        height: 40px;
        font-weight: 500;
        margin: 3% 0% 3% 2%;
        border-radius: 2.5em;
        border-radius: 2.5em;
        color: white;
        background-color: #B785F8;
    }

    .btn-previous2 {
        width: 100%;
        height: 38px;
        font-weight: 500;
        margin: 3% 0% 3% 2%;
        color: #B785F8;
        border-color: #B785F8;
        background-color: #F6F6F6;
    }

    .planes-precio {
        padding-top: 10px;
    }

    .img-logo-card {
        padding-top: 0px;
        margin-bottom: 0rem !important;
    }

    .titulo-Precio {
        margin-bottom: 0rem !important;
    }

    .conten-btn-oferta {
        padding-top: 30px;
        margin-bottom: 0rem !important;
    }

    .accordion .accordion-oferta {
        font-size: 12px !important;
        letter-spacing: 0px !important;
        padding: 0px 0px !important;
        letter-spacing: 0px !important;
    }

    .accordion .card-title a {
        letter-spacing: 0.5px !important;
    }

    .accordion .accordion-oferta a {
        padding-left: 0px !important;
    }

    .accordion .accordion-oferta a::before {
        margin-left: 0px !important;
    }

    .accordion-info {
        padding: 2px 0px 10px 30px !important;
    }

    .btn-recotizar {
        font-size: 12px;
        font-weight: 400;
        color: white;
        height: 30px;
        margin: 0px 2px 0px 2px;
        border-radius: 2.5em;
        background-color: rgb(218, 51, 51);
    }

    .conten-recotizar {
        padding: 10px 0px 8px 0px;
        -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.44);
        -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.44);
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.44);
        border-radius: 0.5em;
    }

    .btn-elegir-oferta {
        width: 100%;
        border-radius: 2.5em;
        font-weight: 500;
        height: 35px;
        background-color: #B785F8;
        color: white;
        padding-top: 9px;
    }

    .fieldset4 {
        display: none;
        visibility: hidden;
    }

    .conten-img {
        text-align: center;
        margin-bottom: 15px;
    }

    .imgFinal {
        width: 80px;
    }

    .conten-texto {
        text-align: center;
    }

    .spanTitle {
        display: flex;
        flex-shrink: 0;
        flex-grow: 0;
        line-height: normal;
        letter-spacing: 0;
        font-weight: 400;
        flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        font-size: 15px;
        -webkit-box-flex: 0;
    }

    .btn-newCotizador {
        /* width: 40%; */
        height: 37px;
        margin-top: 20px;
        font-weight: 600;
        color: white;
        border-radius: 2.5em;
        border-color: #B785F8;
        background-color: #B785F8;
    }

    .imgLoader {
        display: none;
        visibility: hidden;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 9999;
        opacity: .8;
        background-size: 100px 100px !important;
        background: url(../../assets/img/TODORIESGO/COTIZADOR/loader-update.gif) 50% 50% no-repeat rgba(249, 249, 249, 0.822);

    }



    @media only screen and (min-width: 768px) {

        .muneca_segga_movil,
        .card_resumen_movil {
            display: none !important;
        }

    }


    @media only screen and (min-width: 320px) and (max-width: 736px) {

        .muneca_segga,
        .card_resumen {
            display: none !important;
        }

        .conten_resumen {
            display: none;
            padding-top: 0px !important;
        }

        .btn-next,
        .btn-previous {
            width: 100%;
            margin: 2% 0% 2% 0%;
        }

        .slide-segga {
            height: 220px;
        }

        .div_izq_info_produc {
            padding-top: 9%;
        }

        .planes-precio {
            text-align: center;
            padding-top: 0px;
        }

        .conten-btn-oferta {
            padding-top: 20px;
            margin-bottom: 0.5rem !important;
        }

        .img-logo-card {
            padding-top: 0px;
            margin-bottom: 0.5rem !important;
        }

        .titulo-Precio {
            margin-bottom: 1.5rem !important;
        }

        .card-ofertas2 {
            margin: 7% 0% 7% 0%;
        }

        .div_conocesPlaca,
        .div_esCeroKM {
            text-align: center !important;
        }

        .classNumPlaca {
            width: 100%;
        }

        .terminos_movil {
            font-size: 10.6px !important;
        }

        .btn_cotizador {
            width: 100% !important;
        }

        .div_vista {
            display: none;
        }

        .card_form {
            margin-bottom: 3rem;
        }

        .f1-step p {
            font-size: 11px !important;
        }

    }


    /* Estilos de la lista de Deducibles - Card Ofertas*/
    .list-group {
        padding-left: 0;
        margin: 15px 0px;
    }

    .list-group-item {
        padding: 5px 5px;
        margin-bottom: -5px;
        border: 0px solid #ddd;
    }

    .badge {
        display: inline-block;
        min-width: 10px;
        padding: 3px 7px;
        font-size: 13px;
        font-weight: 600;
        line-height: 1;
        color: #000000;
        text-align: left !important;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
    }


    .tile {
        padding: 20px 30px 10px 14px !important;
    }

    .app-title {
        display: block !important;
    }

    .btn-radius {
        border-radius: 20px;
    }

    .main {
        width: 50%;
        margin: 50px auto;
    }

    .dataTables_filter {
        display: none;
    }

    .has-search .form-control {
        padding-left: 2.375rem;
    }

    .has-search .form-control-feedback {
        position: absolute;
        z-index: 2;
        display: block;
        width: 2.375rem;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        pointer-events: none;
        color: #aaa;
    }

    .unir-pri .form-control {
        border-radius: 35px 0px 0px 35px;
        border-right: 0px;
    }

    .unir-med .form-control {
        border-radius: 0px;
        border-right: 0px;
    }

    .unir-ult .btn {
        border-radius: 0px 35px 35px 0px;
    }
</style>
<div id="cover-spin"></div>
<div id="contentAjax"></div>
<main class="app-content">
    <div class="app-title">
        <h5 class="text-info text-center">
            <i class="<?php echo $data['page_icon']; ?>"></i><?php echo $data['page_title']; ?>
        </h5>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body mt-3 ml-3">
                    <div class="box-body">
                        <div id="primerFormulario">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-3 mb-2">
                                        <label for="idNumPlaca">Placa</label>
                                        <input type="text" class="form-control" id="txtValPlaca">
                                    </div>
                                    <div class="col-md-3 mb-2">
                                        <label for="TipoDocumentoAsegurado">Tipo de Identificacion</label>
                                        <select id="TipoDocumentoAsegurado" class="form-control">
                                            <option value="" hidden="1">Tipo de identificación</option>
                                            <option value="1">
                                                Cedula de ciudadania
                                            </option>
                                            <option value="2">
                                                NIT
                                            </option>
                                            <option value="3">
                                                Cédula de extranjería
                                            </option>
                                            <option value="4">
                                                Tarjeta de identidad
                                            </option>
                                            <option value="5">
                                                Pasaporte
                                            </option>
                                            <option value="6">
                                                Carné diplomático
                                            </option>
                                            <option value="7">
                                                Sociedad extranjera sin NIT en Colombia
                                            </option>
                                            <option value="8">
                                                Fideicomiso
                                            </option>
                                            <option value="9">
                                                Registro civil de nacimiento
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-md-3 mb-2">
                                        <label for="txtNoDocumento">No. Documento</label>
                                        <input type="text" class="form-control" id="txtNoDocumento">
                                    </div>

                                </div>

                                <label>Fecha Nacimiento</label>
                                <div class="row">
                                    <div class="form-group col-3 col-md-1 mb-3">
                                        <select class="form-control" name="dianacimiento" id="dianacimiento">
                                            <option value="" hidden="1">Dia</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-5 col-md-2 mb-3">
                                        <select class="form-control" name="mesnacimiento" id="mesnacimiento">
                                            <option value="" hidden="1">Mes</option>
                                            <option value="01">Enero</option>
                                            <option value="02">Febrero</option>
                                            <option value="03">Marzo</option>
                                            <option value="04">Abril</option>
                                            <option value="05">Mayo</option>
                                            <option value="06">Junio</option>
                                            <option value="07">Julio</option>
                                            <option value="08">Agosto</option>
                                            <option value="09">Septiembre</option>
                                            <option value="10">Octubre</option>
                                            <option value="11">Noviembre</option>
                                            <option value="12">Diciembre</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-4 col-md-2 mb-3">
                                        <select class="form-control" name="anionacimiento" id="anionacimiento">
                                            <option value="" hidden="1">Año</option>
                                            <option value="1956">1920</option>
                                            <option value="1956">1921</option>
                                            <option value="1956">1922</option>
                                            <option value="1956">1923</option>
                                            <option value="1956">1924</option>
                                            <option value="1956">1925</option>
                                            <option value="1956">1926</option>
                                            <option value="1956">1927</option>
                                            <option value="1956">1928</option>
                                            <option value="1956">1929</option>
                                            <option value="1956">1930</option>
                                            <option value="1956">1931</option>
                                            <option value="1956">1932</option>
                                            <option value="1956">1933</option>
                                            <option value="1956">1934</option>
                                            <option value="1956">1935</option>
                                            <option value="1956">1936</option>
                                            <option value="1956">1937</option>
                                            <option value="1956">1938</option>
                                            <option value="1956">1939</option>
                                            <option value="1956">1940</option>
                                            <option value="1956">1941</option>
                                            <option value="1956">1942</option>
                                            <option value="1956">1943</option>
                                            <option value="1956">1944</option>
                                            <option value="1956">1945</option>
                                            <option value="1956">1946</option>
                                            <option value="1956">1947</option>
                                            <option value="1956">1948</option>
                                            <option value="1956">1949</option>
                                            <option value="1956">1950</option>
                                            <option value="1956">1951</option>
                                            <option value="1956">1952</option>
                                            <option value="1956">1953</option>
                                            <option value="1956">1954</option>
                                            <option value="1956">1955</option>
                                            <option value="1956">1956</option>
                                            <option value="1957">1957</option>
                                            <option value="1958">1958</option>
                                            <option value="1959">1959</option>
                                            <option value="1960">1960</option>
                                            <option value="1961">1961</option>
                                            <option value="1962">1962</option>
                                            <option value="1963">1963</option>
                                            <option value="1964">1964</option>
                                            <option value="1965">1965</option>
                                            <option value="1966">1966</option>
                                            <option value="1967">1967</option>
                                            <option value="1968">1968</option>
                                            <option value="1969">1969</option>
                                            <option value="1970">1970</option>
                                            <option value="1971">1971</option>
                                            <option value="1972">1972</option>
                                            <option value="1973">1973</option>
                                            <option value="1974">1974</option>
                                            <option value="1975">1975</option>
                                            <option value="1976">1976</option>
                                            <option value="1977">1977</option>
                                            <option value="1978">1978</option>
                                            <option value="1979">1979</option>
                                            <option value="1980">1980</option>
                                            <option value="1981">1981</option>
                                            <option value="1982">1982</option>
                                            <option value="1983">1983</option>
                                            <option value="1984">1984</option>
                                            <option value="1985">1985</option>
                                            <option value="1986">1986</option>
                                            <option value="1987">1987</option>
                                            <option value="1988">1988</option>
                                            <option value="1989">1989</option>
                                            <option value="1990">1990</option>
                                            <option value="1991">1991</option>
                                            <option value="1992">1992</option>
                                            <option value="1993">1993</option>
                                            <option value="1994">1994</option>
                                            <option value="1995">1995</option>
                                            <option value="1996">1996</option>
                                            <option value="1997">1997</option>
                                            <option value="1998">1998</option>
                                            <option value="1999">1999</option>
                                            <option value="2000">2000</option>
                                            <option value="2001">2001</option>
                                            <option value="2002">2002</option>
                                            <option value="2003">2003</option>
                                            <option value="2004">2004</option>
                                            <option value="2005">2005</option>
                                            <option value="2006">2006</option>
                                            <option value="2007">2007</option>
                                            <option value="2008">2008</option>
                                            <option value="2009">2009</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2014">2014</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2020">2021</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-3 mb-2">
                                        <label for="txtNombres">Nombres</label>
                                        <input type="text" class="form-control" name="nombres" id="txtNombres" placeholder="">
                                    </div>
                                    <div class="col-md-3 mb-2">
                                        <label for="txtApellidos">Apellidos</label>
                                        <input type="text" class="form-control" name="txtApellidos" id="txtApellidos" placeholder="">
                                    </div>
                                    <div class="col-md-3 mb-2">
                                        <label for="genero">Genero</label>
                                        <select class="form-control" id="genero">
                                            <option value="" hidden="1">Genero</option>
                                            <option value="1">Masculino</option>
                                            <option value="2">Femenino</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 mb-2">
                                        <label for="estadoCivil">Estado Civil</label>
                                        <select class="form-control" id="estadoCivil">

                                            <option value="" hidden="1">Estado civil
                                            </option>
                                            <option value="1">
                                                Soltero (a)
                                            </option>
                                            <option value="2">
                                                Casado (a)
                                            </option>
                                            <option value="3">
                                                Viudo (a)
                                            </option>
                                            <option value="4">
                                                Divorciado (a)
                                            </option>
                                            <option value="5">
                                                Unión Libre
                                            </option>
                                            <option value="6">
                                                Separado (a)
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-md-3">
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <div id="loaderPlaca"></div>
                                    </div>
                                    <div class="col-md-3">
                                        <button style="width: 100%;" class="btn btn-info" id="btnCotizador">Consultar</button>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div id="formulario2" style="display:none; width: 100%;">
                            <div class="row" style="width: 100%; margin-right: 0px !important; margin-left: 0px !important;">

                                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>Clase Vehículo:</label>
                                        <select type="select" name="clase" id="clase" class="form-control">
                                        </select>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>Marca Vehículo:</label>
                                        <select type="select" name="Marca" id="Marca" class="form-control">
                                            <option value="">MARCA DEL VEHÍCULO</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>Modelo Vehículo:</label>
                                        <select type="select" name="edad" id="edad" class="form-control">
                                            <option value="">MODELO DEL VEHÍCULO</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label>Linea Vehículo:</label>
                                        <select type="select" name="linea" id="linea" class="form-control">
                                            <option value="">LINEA DEL VEHÍCULO</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <div id="referenciados"></div>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-2">
                                    <div class="form-group">
                                        <div id="referenciatres"></div>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <div id="botonconsultar">
                                            <button style="width: 100%;" class="btn btn-info" id="btnCotizar3">Cotizar Ofertas</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <br>
                        <br>

                        <div style="display: none;" id="formularioResumen">

                            <div class="col-md-12">
                                <div style="border-bottom: solid #dedede;" class="row">
                                    <div class="col-md-3">
                                        <h4 class="text-info">Datos del tomador </h4>
                                    </div>
                                    <div class="col-md-3">

                                    </div>
                                    <div class="col-md-3">

                                    </div>
                                    <div class="col-md-3">
                                        <div id="masAsegurado" style="text-align: right;">
                                            <p id="masA">Ver mas <i class="fa fa-plus-square-o"></i></p>
                                        </div>
                                        <div style="display: none; text-align: right;" id="menosAsegurado">
                                            <p id="menosA">Ver menos <i class="fa fa-minus-square-o"></i></p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div style="display: none;" id="DatosAseguradosO">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="MostrarPlaca">Tipo de Identificación</label>
                                            <input type="text" class="form-control" id="tidentificacionR">
                                        </div>

                                        <div class="col-md-3">
                                            <label for="MostrarPlaca">No Documento</label>
                                            <input type="text" class="form-control" id="numidentificacionR">
                                        </div>

                                        <div class="col-md-3">
                                            <label>Fecha de Nacimiento</label>
                                            <input type="text" class="form-control" id="fechNacimientoR">
                                        </div>

                                        <div class="col-md-3">
                                            <label for="Fasecolda">Nombres y Apellidos</label>
                                            <input type="text" class="form-control" id="nombresApellidosR">
                                        </div>

                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="MostrarPlaca">Genero</label>
                                            <input type="text" class="form-control" id="GeneroR">
                                        </div>

                                        <div class="col-md-3">
                                            <label for="MostrarPlaca">Estado Civil</label>
                                            <input type="text" class="form-control" id="EstadoCivil">
                                        </div>

                                    </div>
                                </div>

                            </div>


                            <div style="padding-top: 20px;" class="col-md-12">
                                <div style="border-bottom: solid #dedede;" class="row" class="row">
                                    <div class="col-md-3">
                                        <h4 for="" class="text-info">Datos del Vehículo</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="row text-center">
                                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="display:inline-block; border-right: 1px solid gray;">
                                        <h1 style="font-size: 13px"><strong>Placa</strong></h1>
                                        <p style="font-size: 10px" id="placa_info_p"></p>
                                        <input type="hidden" name="txtValPlacaResumen" id="txtValPlacaResumen">
                                    </div>
                                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="display:inline-block; border-right: 1px solid gray;">
                                        <h1 style="font-size: 13px"><strong>Fasecolda</strong></h1>
                                        <p style="font-size: 10px" id="fasecolda_info_p"></p>
                                        <input type="hidden" name="txtFasecolda" id="txtFasecolda">

                                    </div>
                                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="display:inline-block; border-right: 1px solid gray;">
                                        <h1 style="font-size: 13px"><strong>Marca</strong></h1>
                                        <p style="font-size: 10px" id="marca_info_p"></p>
                                        <input type="hidden" name="txtMarcaVeh" id="txtMarcaVeh">

                                    </div>
                                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="display:inline-block; ">
                                        <h1 style="font-size: 13px"><strong>Clase</strong></h1>
                                        <p style="font-size: 10px" id="clase_info_p"></p>
                                        <input type="hidden" name="txtClaseVeh" id="txtClaseVeh">
                                        
                                    </div>
                                </div>
                                <div class="row text-center">
                                    <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5" style="display:inline-block; border-right: 1px solid gray;">
                                        <h1 style="font-size: 13px"><strong>Referencia</strong></h1>
                                        <p style="font-size: 10px" id="referencia_info_p"></p>
                                        <input type="hidden" name="txtReferenciaVeh" id="txtReferenciaVeh">

                                    </div>
                                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="display:inline-block; border-right: 1px solid gray;">
                                        <h1 style="font-size: 13px"><strong>Modelo</strong></h1>
                                        <p style="font-size: 10px" id="modelo_info_p"></p>
                                        <input type="hidden" name="txtModeloVeh" id="txtModeloVeh">

                                    </div>
                                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3" style="display:inline-block; border-right: 1px solid gray;">
                                        <h1 style="font-size: 13px"><strong>Valor asegurado</strong></h1>
                                        <p style="font-size: 10px" id="valor_info_p"></p>
                                        <input type="hidden" name="txtValorVehFasec" id="txtValorVehFasec">
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div style="display: none;" id="FormularioFinal">
                            <div class="col-md-12">
                                <div class="row">

                                    <div class="col-md-3">
                                        <label for="Modelo">Tipo de Uso</label>
                                        <select type="select" class="form-control" name="usoVehiculo" id="txtUsoVehiculo">
                                            <option value="">Uso Vehicular?</option>
                                            <option value="Particular" selected>Particular</option>
                                            <option value="Trabajo">Trabajo</option>
                                        </select>
                                    </div>

                                    <div class="col-md-3">
                                        <label>Tipo de Servicio</label>
                                        <select type="select" class="form-control classTipoPlaca" name="tipoPlaca" id="txtTipoPlaca" style="width:100% !important;">
                                            <option value="">Buscar...</option>
                                            <option value="14" selected>PARTICULAR</option>
                                            <option value="11">PUBLICO MUNICIPAL</option>
                                            <option value="12">PUBLICO INTERMUNICIPAL</option>
                                        </select>
                                    </div>

                                    <div class="col-md-3">
                                        <label>Departamento de Circulación</label>
                                        <select class="form-control" id="ciudad_circulacion">
                                            <option value=""></option>
                                            <option value="1">AMAZONAS</option>
                                            <option value="2">ANTIOQUIA</option>
                                            <option value="3">ARAUCA</option>
                                            <option value="4">ATLANTICO</option>
                                            <option value="5">BARRANQUILLA</option>

                                            <option value="6">BOGOTA</option>
                                            <option value="7">BOLIVAR</option>
                                            <option value="8">BOYACA</option>
                                            <option value="9">CALDAS</option>
                                            <option value="10">CAQUETA</option>

                                            <option value="11">CASANARE</option>
                                            <option value="12">CAUCA</option>
                                            <option value="13">CESAR</option>
                                            <option value="14">CHOCO</option>
                                            <option value="15">CORDOBA</option>

                                            <option value="16">CUNDINAMARCA</option>
                                            <option value="17">GUAINIA</option>
                                            <option value="18">GUAJIRA</option>
                                            <option value="19">GUAVIARE</option>
                                            <option value="20">HUILA</option>

                                            <option value="21">MAGDALENA</option>
                                            <option value="22">META</option>
                                            <option value="23">NARIÑO</option>
                                            <option value="24">NORTE DE SANTANDER</option>
                                            <option value="25">PUTUMAYO</option>

                                            <option value="26">QUINDIO</option>
                                            <option value="27">RISARALDA</option>
                                            <option value="28">SAN ANDRES</option>
                                            <option value="29">SANTANDER</option>
                                            <option value="30">SUCRE</option>

                                            <option value="31">TOLIMA</option>
                                            <option value="32">VALLE DEL CAUCA</option>
                                            <option value="33">VAUPES</option>
                                            <option value="34">VICHADA</option>

                                        </select>
                                    </div>

                                    <div class="col-md-3">
                                        <label>Ciudad de Circulación</label>
                                        <select type="select" class="form-control classCiudadCirculacVeh" name="ciudadCirculacVeh2" id="txtCiudadCirculacVeh2" style="width:100% !important;">
                                            <option value="">Buscar...</option>
                                        </select>
                                        <div id="listaCiudades"></div>
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="row">

                                    <div class="col-md-3">
                                        <label for="male">Beneficiario Oneroso?</label><br>
                                        <label for="male">Si</label>
                                        <input type="radio" id="male" name="gender" value="male">
                                        <label for="female">No</label>
                                        <input type="radio" id="female" name="gender" value="female">
                                    </div>

                                    <div class="col-md-3">

                                    </div>

                                    <div class="col-md-3">
                                        <div id="loaderOferta"></div>
                                    </div>

                                    <div class="col-md-3">
                                        <button style="width: 100%;" class="btn btn-info" id="btnCotizar">Cotizar Ofertas</button>
                                    </div>

                                </div>
                            </div>

                        </div>


                        <!-- CAMPOS OCULTOS PARA OPTENER LA INFORMACION-->
                        <div style="display: none;">
                            <label>MarcaVehiculo</label>
                            <input type="text" id="CodigoMarca" name="CodigoMarca">
                            <label>LineaVehiculo</label>
                            <input type="text" id="CodgigoLinea" name="CodgigoLinea">
                            <label>ClaseVehiculo</label>
                            <input type="text" id="ClaseVehiculo" name="ClaseVehiculo">
                            <label>CoberturaEstado</label>
                            <input type="text" id="CoberturaEstado" name="CoberturaEstado" value="1">
                            <label>LimiteRCESTADO</label>
                            <input type="text" id="LimiteRC" name="LimiteRC" value="6">
                            <label>ValorAccesorios</label>
                            <input type="text" id="ValorAccesorios" name="ValorAccesorios" value="0">
                            <label>CeroKilometro</label>
                            <input type="text" id="KMCERO" name="KMCERO">
                            <label>TipoIdentificacion</label>
                            <input type="text" id="TipoIdentificacion" name="TipoIdentificacion" value="1">
                            <label>Direccion</label>
                            <input type="text" id="DireccionResidencia" name="DireccionResidencia" value="CALLE 70 7T2 16">
                            <label>CodigoVerificacion</label>
                            <input type="text" id="CodigoVerificacion" name="CodigoVerificacion" value="0">
                            <label>AniosSiniestro</label>
                            <input type="text" id="AniosSiniestro" name="AniosSiniestro" value="0">
                            <label>AniosAsegurados</label>
                            <input type="text" id="AniosAsegurados" name="AniosAsegurados" value="0">
                            <label>NivelEducativo</label>
                            <input type="text" id="NivelEducativo" name="NivelEducativo" value="4">
                            <label>Estrato</label>
                            <input type="text" id="Estrato" name="Estrato" value="3">
                            <label>Sin Placa</label>
                            <input type="text" id="cerokmsi2" name="cerokmsi2">
                            <input type="text" class="form-control" name="referenciaVeh2" id="txtReferenciaVeh2" placeholder="Referencia Vehiculo" readonly>
                            <input type="hidden" id="emailAsesorSeleccionado" style="display: none;">
                        </div>

                        <br><br>
                        <div style="display: none; padding-top: 20px;" id="Resumenfinalcotizaciones">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-3">
                                    
                                    </div>
                                    <div class="col-md-3 mb-4">
                                        <div id="loaderOfertaRecotizar"></div>
                                        <button style="width: 100%;" class="btn btn-info" id="btnRecotizar">Recotizar Ofertas</button>
                                    </div>
                                    <div class="col-md-3 mb-4">
                                        <button style="width: 100%;" class="btn btn-warning" id="AgregarCotizacion">Agregar Cotización</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="display: none;" id="FormularioFinalAsignar">
                            <div class="col-md-12">
                                <div class="row">

                                    <div class="col-md-3">
                                        <label>Aseguradora</label>
                                        <select class="form-control" id="aseguradora">
                                            <option value="" hidden="1">Aseguradora</option>
                                            <option value="Seguros del Estado">Seguros del Estado</option>
                                            <option value="Seguros Bolivar">Seguros Bolivar</option>
                                            <option value="Axa Colpatria">Axa Colpatria</option>
                                            <option value="HDI Seguros">HDI Seguros</option>
                                            <option value="SBS Seguros">SBS Seguros</option>
                                            <option value="Allianz">Allianz Seguros</option>
                                            <option value="Equidad">Equidad Seguros</option>
                                            <option value="Mapfre">Seguros Mapfre</option>
                                            <option value="Liberty">Liberty Seguros</option>
                                            <option value="Previsora">Previsora Seguros</option>
                                            <option value="Solidaria">Solidaria</option>
                                            <option value="Sura">Seguros Sura</option>
                                        </select>
                                    </div>

                                    <div class="col-md-3">
                                        <label>Valor prima</label>
                                        <input type="text" id="valorTotal" class="form-control">
                                    </div>

                                    <div class="col-md-3">
                                        <label>Producto</label>
                                        <input type="text" id="nomProducto" class="form-control">
                                    </div>

                                    <div class="col-md-3">
                                        <label>Numero Cotización</label>
                                        <input type="text" id="numCotizacion" class="form-control">
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="row">

                                    <div class="col-md-3">
                                        <label>Valor RC ($100.000.000)</label>
                                        <input type="text" id="valorRC" class="form-control">
                                    </div>

                                    <div class="col-md-3">
                                        <label>Cubrimiento Perdidas Total </label>
                                        <input type="text" id="valorPerdidaTotal" class="form-control">
                                    </div>

                                    <div class="col-md-3">
                                        <label>Cubrimiento Perdidas Parcial</label>
                                        <input type="text" id="valorPerdidaParcial" class="form-control">
                                    </div>

                                    <div class="col-md-3">
                                        <label>Conductores Elegidos</label>
                                        <input type="text" id="conductoresElegidos" class="form-control">
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="row">

                                    <div class="col-md-3">
                                        <label>Servicio de Grua</label>
                                        <select class="form-control" id="servicioGrua">
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
                                        </select>

                                    </div>

                                    <div class="col-md-3">

                                    </div>

                                    <div class="col-md-3 mb-3">

                                    </div>

                                    <div class="col-md-3 mb-3">
                                        <button type="button" style="width: 100%;" class="btn btn-success" id="btnAgregarCotizacion">Agregar</button>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div id="contenCardVertical" style="display:none">
                            <div class="row" id="cardVertical"></div>
                            <div class="row" id="cardVertical2"></div>
                        </div>

                        <div id="contenCardHorizontal">
                            <div class="col-md-12">
                                <div class="row" id="cardHorizontal"></div>
                            </div>
                            <div class="col-md-12">
                                <div class="row" id="cardHorizontal2"></div>
                            </div>
                            <div class="col-md-12">
                                <div class="row" id="cardHorizontal3"></div>
                            </div>
                            <div class="col-md-3" id="contenBtnPDF" style="display:none">
                                <form name="form2">
                                    <input type="hidden" class="classCotizacion" name="cotizacion" id="cotizacion">
                                    <button style="width: 100%;" class="btn btn-danger" id="btnPDF" type="submit"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> GENERAR PDF</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
</main>
<?php footerAdmin($data); ?>
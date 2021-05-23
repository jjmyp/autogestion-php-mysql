<?php headerAdmin($data); ?>
<style>
  .btn {
    border-radius: 20px 20px 20px 20px;
    width: 250px;
  }
h2{
  text-align:center;
  padding: 20px;
}
/* Slider */

.slick-slide {
    margin: 0px 20px;
}

.slick-slide img {
    width: 100%;
}

.slick-slider
{
    position: relative;
    display: block;
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
            user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
        touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
}

.slick-list
{
    position: relative;
    display: block;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
.slick-list:focus
{
    outline: none;
}
.slick-list.dragging
{
    cursor: pointer;
    cursor: hand;
}

.slick-slider .slick-track,
.slick-slider .slick-list
{
    -webkit-transform: translate3d(0, 0, 0);
       -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
         -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
}

.slick-track
{
    position: relative;
    top: 0;
    left: 0;
    display: block;
}
.slick-track:before,
.slick-track:after
{
    display: table;
    content: '';
}
.slick-track:after
{
    clear: both;
}
.slick-loading .slick-track
{
    visibility: hidden;
}

.slick-slide
{
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
}
[dir='rtl'] .slick-slide
{
    float: right;
}
.slick-slide img
{
    display: block;
}
.slick-slide.slick-loading img
{
    display: none;
}
.slick-slide.dragging img
{
    pointer-events: none;
}
.slick-initialized .slick-slide
{
    display: block;
}
.slick-loading .slick-slide
{
    visibility: hidden;
}
.slick-vertical .slick-slide
{
    display: block;
    height: auto;
    border: 1px solid transparent;
}
.slick-arrow.slick-hidden {
    display: none;
}
</style>
<main class="app-content">
  <div class="app-title">
    <div>
      <h5 class="text-info"><i class="<?php echo $data['page_icon']; ?>"></i><?php echo $data['page_title']; ?></h5>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
             <h3 class="text-left text-info mb-3">Hola <?= $_SESSION['userData']['nombre']; ?>,</h3>            
            
             
            
             <h5 class="text-center " style="color: #757575">
                 <strong><b>Ya eres parte de nuestro equipo</b> </strong>
             </h5>
             <h5 class="text-center">Ahora puedes disfrutar de todos nuestros servicios que te estregarán nuestras herramientas para realizar tus trámites de forma autónoma y desde cualquier lugar</h5>

           <h5 class="text-info text-center">Somos un aliado estratégico para ti.</h5>
           
           <h5 class="text-center mb-3">Tus negocios están en manos de las mejores compañías de seguros a nivel mundial</h5>
            <section class="customer-logos slider">
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/allianz.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/assist.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/bolivar.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/chubb.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/colmena.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/axa.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/equidad.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/estado.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/hdi.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/liberty.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/mapfre.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/mundial.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/qbe.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/sbs.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/solidaria.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/sura.jpg"></div>
              <div class="slide"><img src="<?= media(); ?>/images/Aseguradoras/travel.jpg"></div>
            </section>
                
            <h5 class="text-center mt-3"  style="color: #757575">Gana más ventas ofreciendo a tus clientes <strong>un servicio y portafolio más amplio</strong>. Aquí puedes contar con todos los ramos para cotizar.</h5>
            
            <div class="justify-content-center d-flex">
                <img src="<?= media() ?>/images/Aseguradoras/Seguros.png" width="340px">
            </div>
            
            <div class="justify-content-center d-flex mb-3"> 
                <a href="<?= base_url() ?>polizas/soatplaca" class="btn btn-warning">Cotizar soat</a>
            </div>
            <div class="justify-content-center d-flex"> 
                <a href="<?= base_url() ?>polizas/cotizartodoriesgo" class="btn btn-warning">Cotizar todo riesgo</a>
            </div>
                
        </div>
      </div>
    </div>
  </div>
</main>
<?php footerAdmin($data);?>
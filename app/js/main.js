$(function () {
  
  if($(".js-range-slider").length) {
    $(".js-range-slider").ionRangeSlider({
      min: 0,
      max: 1000,
      from: 0,
      to: 600,
      prefix: "$"        
    }); 
  }


  if($(".trending-products__slider").length) {
    $('.trending-products__slider').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      adaptiveHeight: false,
      dots: true,
      arrows: false,
    });
  }
});

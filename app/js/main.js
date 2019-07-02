$(function () {

  if ($(".js-range-slider").length) {
    $(".js-range-slider").ionRangeSlider({
      min: 0,
      max: 1000,
      from: 0,
      to: 600,
      prefix: "$"        
    }); 
  };

  if ($(".trending-products__slider").length) {
    $('.trending-products__slider').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      adaptiveHeight: false,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 996,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 1240,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        }
      ]
    });
  };

  if($("#tabs").length) {
    $( "#tabs" ).tabs();
  };
});

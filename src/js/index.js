import $ from 'jquery';
window.$ = window.jQuery = $;
import bootstrap from 'bootstrap';
import 'slick-carousel';
import AOS from 'aos';




$(function () {
    $('a[href$="#callbackForm"]').on( "click", function() {
        $('#callbackForm').modal('show');
    });


    AOS.init({
        disable: 'tablet'
    });

    $('.slick-carousel').slick({
        centerPadding: '30px',
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        prevArrow: $('.left'),
        nextArrow: $('.right'),
        responsive: [
            {
                breakpoint: 1140,
                settings: {
                    infinite: true,
                    autoplay: true,
                    arrows: false,
                    dots: true,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 720,
                settings: {
                    infinite: true,
                    autoplay: true,
                    arrows: false,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
});

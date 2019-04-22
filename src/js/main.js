(function($, window, document) {
    'use strict';

    var $window = $(window);

    $(document).on('click', '.open-search', function(event) {
        event.preventDefault();
        if(! $(this).parent().hasClass('active')) {
            $(this).parent().addClass('active');
            $(this).parent().find('form').addClass('active');
            $(this).parent().find('form input[type="text"]:first').focus();
            return;
        }
        if($(this).parent().find('form .input-search').val() === '') {
            $('.open-search').parent().removeClass('active');
            $('.open-search').parent().find('form').removeClass('active');
        } else {
            $(this).parent().find('form').submit();
        }
    });

    $(document).on('click', '.header__main--search-box-btn-close-search', function(event) {
        event.preventDefault();
        $('.open-search').parent().removeClass('active');
        $('.open-search').parent().find('form').removeClass('active');
    });

    $('.example').owlCarousel({
        nav: true,
        dots: false,
        pagination: true,
        margin: 10,
        responsive: {
            0: {
                items: 1,
                dotsEach: 1,
                slideBy: 1,
                stagePadding: 25
            },
            768: {
                items: 3,
                dotsEach: 1,
                slideBy: 1,
                stagePadding: 25
            },
            1150: {
                items: 4,
                dotsEach: 1,
                slideBy: 1
            }

        }
    });
    $('.gallery').owlCarousel({
        nav: true,
        dots: true,
        pagination: true,
        responsive: {
            0: {
                items: 1,
                dotsEach: 1,
                slideBy: 1
            }
        }
    });
    var i = 1;
    $('.example .owl-dot').each(function(){
        $(this).find('span').append('0'+i);
        i++;
    });

    if(typeof $.fancybox === 'function') {
        $('[data-fancybox]').fancybox();
    }

    $('a.scroll-gently').on('click touchstart', function() {
        var $href = $(this).attr('href');
        if ($href !== '#' && $href.search('#') >= 0) {
            $('html, body').animate({
                scrollTop: $($href).offset().top + 10
            }, 2000);
            return false;
        }
        return true;
    });
    $(document).on('click', '.open-mobile-menu', function(event) {
        event.preventDefault();
        var menu = $(this).parents('.header__main');
        if(menu.hasClass('open')) {
            menu.removeClass('open');
            $('.blackout').removeClass('active');
            $('html,body').removeClass('no-scroll');
            return;
        }
        menu.addClass('open');
        $('.blackout').addClass('active');
        $('html,body').addClass('no-scroll');
    });
    (function() {
        var $header = $('.header__main'),
            lastScrollTop = 0,
            $body   = $('body');
        $window.scroll(function(event) {
            var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            if($window.scrollTop() >= 40) {
                if(lastScrollTop > scrollPosition) {
                    $header.addClass('header__main--fixed');
                    $body.addClass('header-fixed');
                } else {
                    $header.removeClass('header__main--fixed');
                    $body.removeClass('header-fixed');
                }
            } else {
                $header.removeClass('header__main--fixed');
                $body.removeClass('header-fixed');
            }
            lastScrollTop = scrollPosition;

        });
    })();

    if($('.sidebar-fixed').length && $window.width() > 1247) {
        var $stick_bar = $('.sidebar-fixed');
        $stick_bar.stick_in_parent({
            offset_top: 120,
            offset_left: 20,
            offset_bottom: 30,
            inner_scrolling: true,
            no_recalc: true
        }).on("sticky_kit:bottom", function(e) {
            $(this).addClass('at_bottom').removeClass('is_stuck');
        }).on("sticky_kit:unbottom", function(e) {
            $(this).removeClass("at_bottom").addClass("is_stuck");
        });
    }

    $(document).on('click', '.press', function(event) {
        event.preventDefault();
        window.print();
    });


})(jQuery, window, document);

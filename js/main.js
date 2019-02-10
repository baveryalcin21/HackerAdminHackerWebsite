function main() {

    (function() {
        'use strict';

        // PRE LOADER
        $(window).load(function() {
            $('.preloader').fadeOut(1000); // set duration in brackets    
        });


        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top - 50)
            }, 1250, 'easeInOutExpo');
            event.preventDefault();
        });

        // affix the navbar after scroll below header
        $('#nav').affix({
            offset: {
                top: $('header').height()
            }
        });

        // Highlight the top nav as scrolling occurs
        $('body').scrollspy({
            target: '#nav',
            offset: 51
        });

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function() {
            $('.navbar-toggle:visible').click();
        });

        //Circle Progressbar
        $('.pie_progress').each(function() {
            var $pie = $(this);

            $pie.asPieProgress({
                namespace: 'pie_progress',
                speed: 30,
                easing: 'linear',
                barsize: 5
            });

            $pie.waypoint(function(direction) {
                $pie.asPieProgress('start');
            }, {
                triggerOnce: true,
                offset: '90%'
            });

        });

        //Skill Progress
        $(".progress-element").each(function() {
            $(this).waypoint(function() {
                var progressBar = $(".progress-bar");
                progressBar.each(function(indx) {
                    $(this).css("width", $(this).attr("aria-valuenow") + "%");
                });
            }, {
                triggerOnce: true,
                offset: 'bottom-in-view'
            });
        });

        // Portfolio isotope filter
        $(window).load(function() {
            var $container = $('.portfolio-items');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            $('.cat a').click(function() {
                $('.cat .active').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });

        });


        // CounterUp
        $(document).ready(function($) {
            if ($("span.count").length > 0) {
                $('span.count').counterUp({
                    delay: 10, // the delay time in ms
                    time: 1500 // the speed time in ms
                });
            }
        });

    }());


}
main();

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

// 헤더부드럽게
$(function () {
    $('.nav').mouseenter(function () {
        $('.sub').stop().slideDown();
        $('.sub_bg').stop().slideDown();
    });
    $('.nav').mouseleave(function () {
        $('.sub').stop().slideUp();
        $('.sub_bg').stop().slideUp();
    });
});

$('.top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
    return false;
});

// 베스트 메뉴 갤러리
$(function () {
    var swiper = new Swiper('.gallery .gallery_inner ', {
        slidesPerView: 5,//보여지는 갤러리 수
        spaceBetween: 0,//갤러리 사이 간격
        speed: 1500,//버튼을 슬라이드가 넘어가는 시간
        autoplay: {
            delay: 2500,//자동으로 넘어가기 전 머무르는 시간
            disableOnInteraction: false,
        },
        loop: true,//슬라이드 무한반복
        navigation: {//화살표 버튼
            nextEl: '.gallery .swiper-button-next',
            prevEl: '.gallery .swiper-button-prev',
        },
        pagination: {//블릿 버튼
            el: '.gallery .swiper-pagination',
            clickable: true,
        },
    });
});

// AOS효과
AOS.init({
    duration: 1200 //aos 나타나는 속도
});

$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('.top').fadeIn();
    } else {
        $('.top').fadeOut();
    }
});

// 스크롤 시 헤더변경
$(function () {
    $(document).ready(function () {

        var scrollOffset = $('header').offset();

        $(window).scroll(function () {
            if ($(document).scrollTop() > scrollOffset.top) {
                $('header').addClass('scroll-fixed');
            }
            else {
                $('header').removeClass('scroll-fixed');
            }
        });
    });
});



$(function () {
    $('event_btn_down').click(function () {
        $('.e_5, .e_6').show();
        $('.e_1, .e_2').hide();
    });


    $('event_btn_up').click(function () {
        $('.e_1, .e_2').show();
        $('.e_5, .e_6').hide();
    });
});


$(function () {
    var swiper = new Swiper('.slide2 ', {
        direction: "vertical",//세로 방향
        speed: 2000,//버튼을 슬라이드가 넘어가는 시간
        autoplay: {
            delay: 2700,//자동으로 넘어가기 전 머무르는 시간
            disableOnInteraction: false,
        },
        loop: true,//슬라이드 무한반복
        navigation: {//화살표 버튼
            nextEl: '.slide2-next',
            prevEl: '.slide2-prev',
        },
    });
});

// 마우스 따라다니는 선
$(function () {
    var polyline = document.querySelector('.drawing_line_polyline');
    var polyPoints = polyline.getAttribute('points');
    var circle = document.querySelector('.drawing_line_circle');
    var circleX = circle.getAttribute('cx');
    var circleY = circle.getAttribute('cy');
    var circleR = circle.getAttribute('r');

    var total = 12;
    var gap = 30;
    var ease = 0.5;
    var debounce_removeLine;
    var debounce_counter = 0;

    var pointer = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        tx: 0,
        ty: 0,
        dist: 0,
        scale: 1,
        speed: 2,
        circRadius: 8,
        updateCrds: function () {
            if (this.x != 0) {
                this.dist = Math.abs((this.x - this.tx) + (this.y - this.ty));
                this.scale = Math.max(this.scale + ((100 - this.dist * 8) * 0.01 - this.scale) * 0.1, 0.25); // gt 0.25 = 4px
                this.tx += (this.x - this.tx) / this.speed;
                this.ty += (this.y - this.ty) / this.speed;
            }
        }
    };

    var points = [];

    $(window).on('mousemove', function (e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        debounce_counter = 0;
        drawLine();

        // debounce
        clearTimeout(debounce_removeLine);
        debounce_removeLine = setTimeout(() => {
            //console.log('debounce_removeLine', new Date().getTime());
            debounce_counter = 12;
            drawLine();
        }, 80);
    })

    $(window).on('mousedown', function (e) {
        pointer.circRadius = 6;
        drawLine();
    });

    $(window).on('mouseup', function (e) {
        pointer.circRadius = 8;
        drawLine();
    });

    function drawLine() {
        pointer.updateCrds();

        points.push({
            x: pointer.tx,
            y: pointer.ty
        });
        while (points.length > total) {
            points.shift();
            if (points.length > gap) {
                for (var i = 0; i < 5; i++) {
                    points.shift();
                }
            }
        }
        var pointsArr = points.map(point => `${point.x},${point.y}`);
        polyPoints = pointsArr.join(' ');
        polyline.setAttribute('points', polyPoints);

        // circle
        circleX = pointer.x;
        circleY = pointer.y;
        circleR = pointer.scale * pointer.circRadius;

        circle.setAttribute('cx', circleX);
        circle.setAttribute('cy', circleY);
        circle.setAttribute('r', circleR);

        if (debounce_counter > 0) {
            debounce_counter--;
            requestAnimationFrame(drawLine);
        }
    };
});
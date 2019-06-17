// JavaScript Document

$(document).ready(
    function() {
        //menu
        $("#mmb").click(function() {
            $(this).toggleClass("active");
            $("#header").toggleClass("active");
            if($(this).hasClass("active")){
                $("body").addClass("noscroll");
            }else{
                $("body").removeClass("noscroll");
            }
            
        })

        //search
        $("#msb").click(function() {
            $(this).toggleClass("active");
            $(".search-nav").toggleClass("active");
            
        })

        //filter
        if ($(".filter").length >= 1) {
            $(".filter").find("a").click(function( index ) {
                $(this).addClass("selected").siblings(".selected").removeClass("selected");
                //js換內容
            }).eq(0).click();
        }

        //gallery
        if ($(".gallery").length >= 1) {
            $(".gallery").each(function( index ) {
                gallerize($( this ));
            });
        }
        
        //scroll to top
        $("#gotop").click(function() {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        })

        //multi layer nav
        $("ul > li").each(function( index ) {
            if($(this).children("ul").length > 0){
                $(this).addClass("has-children");
            }
            $(this).click(function(e) {
                e.stopPropagation();
                $(this).toggleClass("active");
            })
        });


        if ($(".datepick").length > 0) {
            $(".datepick").pickadate({
                format: 'yyyy/mm/dd',
                formatSubmit: 'yyyy/mm/dd',
                today: false,
                clear: false,
                onOpen: function() {
                    //scrollPageTo( this.$node )
                }
            })
        }


        //scroll
        $(window).scroll(function() {
            scrollFn();
        });


        //resize trigger
        $(window).resize(function() {
            resizeScreen();
        });


        //fixed jump bg
        if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
            $('body').on("mousewheel", function () {
                // remove default behavior
                event.preventDefault(); 

                //scroll without smoothing
                var wheelDelta = event.wheelDelta;
                var currentScrollPosition = window.pageYOffset;
                window.scrollTo(0, currentScrollPosition - wheelDelta);
            });
        }


        //initialize swiper when document ready
        if ($(".swiper-container-banner").length > 0) {
            var bannerSwiper = new Swiper('.swiper-container-banner', {
                // Optional parameters
                loop: true,
                //effect:'fade',
                autoHeight:true,
                spaceBetween: 0,
                slidesPerGroup:1,
                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true,
                },
                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }

        //initialize swiper when document ready
        if ($(".swiper-container-life").length > 0) {
            var bannerSwiper = new Swiper('.swiper-container-life', {
                // Optional parameters
                //direction: 'vertical',
                loop: true,
                effect:'fade',
                autoHeight:true,
                //slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup:1,
                //centeredSlides: true,
                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }

        if ($(".swiper-container-books").length > 0) {
            var bookSwiper = new Swiper('.swiper-container-books', {
                // Optional parameters
                //direction: 'vertical',
                //loop: true,
                //effect:'fade',
                autoHeight:true,
                slidesPerView: 5,
                spaceBetween: 0,
                slidesPerGroup:5,
                //centeredSlides: true,
                breakpoints: {
                    400: {
                      slidesPerView: 1,
                      slidesPerGroup:1,
                    },
                    600: {
                      slidesPerView: 2,
                      slidesPerGroup:2,
                    },
                    800: {
                      slidesPerView: 3,
                      slidesPerGroup:3,
                    },
                    1000: {
                      slidesPerView: 4,
                      slidesPerGroup:4,
                    },
                },
                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }

        //init
        bgImg();
        resizeScreen();
        scrollFn();
        Wow.init();

    }
);

function is_iPhone_or_iPad(){
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)
    );
}

        
function scrollFn() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $("#gotop").fadeIn();
      } else {
        $("#gotop").fadeOut();
      }
}


function resizeScreen() {
    
}

// Wow
var Wow = function() {
    "use strict";

    // Handle Wow
    var handleWow = function() {
        var wow = new WOW({
            boxClass:     'wow',      // animated element css class (default is wow)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       false,      // trigger animations on mobile devices (true is default)
            tablet:       false,       // trigger animations on tablet devices (true is default)
            live:         true
        });
        wow.init();
    }

    return {
        init: function() {
            handleWow(); // initial setup for counter
        }
    }
}();

//gallery
function gallerize(tar){
    var next = tar.find(".next").eq(0);
    var prev = tar.find(".prev").eq(0);
    var cap = tar.find(".cap").eq(0);
    var pager = tar.find(".slides_btns").eq(0);
    var slider = tar.find(".slides").eq(0);
    var banners = slider.find(">*");
    var amount = banners.length;

    var seq = 0;
    var interval;

    if(banners.length<2){
        next.hide();
        prev.hide();
        pager.hide();
    }

    if (pager.length >= 1 && amount>0 && !(pager.find(">*").length>0)) {
        for(var k=0; k<amount;k++){
            pager.append("<li></li>");
        }
    }

    function goNext(){
        seq +=1;
        if(seq >= amount){
            seq = 0;
        }
        banners.eq(seq).addClass("active").siblings(".active").removeClass("active");
        pager.find(">*").eq(seq).addClass("active").siblings(".active").removeClass("active");
        cap.hide().text(banners.eq(seq).attr("val")).fadeIn();
        clearInterval(interval);
    }

    function goPrev(){
        seq -=1;
        if(seq < 0){
            seq = amount-1;
        }
        banners.eq(seq).addClass("active").siblings(".active").removeClass("active");
        pager.find(">*").eq(seq).addClass("active").siblings(".active").removeClass("active");
        cap.hide().text(banners.eq(seq).attr("val")).fadeIn();
        clearInterval(interval);
    }

    //arrow
    next.click(function() {
        goNext();
    })
    prev.click(function() {
        goPrev();
    });

    //pager
    pager.find(">*").each(function( index ) {
        $(this).click(function() {
            seq = index;
            banners.eq(seq).addClass("active").siblings(".active").removeClass("active");
            $(this).addClass("active").siblings(".active").removeClass("active");
            if(banners.eq(seq).attr("link")!=""){
                cap.attr("href",banners.eq(seq).attr("link")).addClass("linked");
            }else{
                cap.attr("href","#").removeClass("linked");
            }
            if(banners.eq(seq).attr("tar")!=""){
                cap.attr("target","_blank");
            }else{
                cap.attr("target","");
            }
            cap.hide().text(banners.eq(seq).attr("val")).fadeIn();
            clearInterval(interval);
        })
    });

    //init
    banners.eq(seq).addClass("active");
    pager.find(">*").eq(seq).addClass("active");
    if(banners.eq(seq).attr("link")!=""){
        cap.attr("href",banners.eq(seq).attr("link")).addClass("linked");
    }else{
        cap.attr("href","#").removeClass("linked");
    }
    if(banners.eq(seq).attr("tar")!=""){
        cap.attr("target","_blank");
    }else{
        cap.attr("target","");
    }
    
    cap.hide().text(banners.eq(seq).attr("val")).fadeIn();

    //auto
    if(tar.hasClass("autoplay")){
        interval = setInterval(function(){
            seq +=1;
            if(seq >= amount){
                seq = 0;
            }
            banners.eq(seq).addClass("active").siblings(".active").removeClass("active");
            pager.find(">*").eq(seq).addClass("active").siblings(".active").removeClass("active");
            if(banners.eq(seq).attr("link")!=""){
                cap.attr("href",banners.eq(seq).attr("link")).addClass("linked");
            }else{
                cap.attr("href","#").removeClass("linked");
            }
            if(banners.eq(seq).attr("tar")!=""){
                cap.attr("target","_blank");
            }else{
                cap.attr("target","");
            }
            cap.hide().text(banners.eq(seq).attr("val")).fadeIn();
        }, 3500);
    }

    //hammer
    var swiper = new Hammer(tar[0]);
    swiper.on("swipeleft swiperight", function(ev) {
        //myElement.textContent = ev.type +" gesture detected.";
        //console.log(ev.type);
        if (ev.type == 'swipeleft') {
            goNext();
        } else if (ev.type == 'swiperight') {
            goPrev();
        }
    });
    
}

//bgImg
function bgImg(){
    $(".bgImg").each(function(index) {
        //$(this).children("img").hide();
        var imgURL = $(this).children("img").attr("src");
        $(this).css("background", "url(" + imgURL + ") no-repeat center center");
        if($(this).hasClass("contain")){
            $(this).css("background-size", "contain");
        }else{
            $(this).css("background-size", "cover");
        }
        if($(this).hasClass("fixed")){
            if(!is_iPhone_or_iPad()){
                $(this).css("background-attachment", "fixed");
            }
        }
    });
}



window.onload = function(){
    bgImg();
};

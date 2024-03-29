// JavaScript Document

$(document).ready(
    function() {
        //menu
        $("#mmb").click(function() {
            if($("#msb").hasClass("active")){
                $("#msb").click();
            }
            $(this).toggleClass("active");
            $( ".aside" ).toggleClass("back");
            $("#header").toggleClass("active");            
        })

        //search
        $("#msb").click(function() {
            if($("#mmb").hasClass("active")){
                $("#mmb").click();
            }
            $(this).toggleClass("active");
            $(".search-nav").toggleClass("active");
        })

        //filter
        if ($(".group-filter").length >= 1) {
            $(".group-filter").find("a").click(function( index ) {
                $(this).addClass("selected").siblings(".selected").removeClass("selected");
                //js換內容
            }).eq(0).click();
        }

        if ($(".view-filter").length >= 1) {
            $(".view-filter").find(">span").click(function( index ) {
                $(".view-target").removeClass("list grid").addClass($(this).attr('class'));
                $(this).addClass("selected").siblings(".selected").removeClass("selected");
                //js換內容
            }).eq(0).click();
        }

        //quantity
        if ($(".quantity").length >= 1) {
            $(".quantity").find("span.decrease").click(function( index ) {
                var tempQ = parseInt($(this).parent().find("input").val());
                var min = $(this).parent().attr("min")?parseInt($(this).parent().attr("min")) : 1;
                if(tempQ>min){
                    $(this).parent().find("input").val(tempQ - 1);
                }
            });
            $(".quantity").find("span.add").click(function( index ) {
                var tempQ = parseInt($(this).parent().find("input").val());
                var max = $(this).parent().attr("max")?parseInt($(this).parent().attr("max")) : 99;
                if(tempQ<max){
                    $(this).parent().find("input").val(tempQ + 1);
                }
            });
        }

        //expand editor
        
        if ($(".editor").length >= 1) {
            $(".editor").append('<div class="expand"></div>');
            $(".editor .expand").click(function( index ) {
                $(this).parent().toggleClass("active");
                triviaContent.updateAutoHeight(600);
            });
        }

        //category
        if ($(".category").length >= 1) {
            $(".category").find("li").click(function( index ) {
                $(this).addClass("selected").siblings(".selected").removeClass("selected");
                //js換內容
            }).eq(0).click();
        }

        //datepicker
        if ($(".datepicker").length > 0) {
            $( ".datepicker" ).datepicker({
              dateFormat: 'yy-mm',
              changeYear: true,
              changeMonth: true,
              showButtonPanel: true,
                onClose: function(dateText, inst) { 
                    $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
                }
            });
        }

        //aside
        if ($(".aside").length > 0) {
            $( ".aside" ).find("h3").click(function( index ) {
                $(this).parent().addClass("active");
            });
            $( ".aside" ).find(".close").click(function( index ) {
                $(this).parent().removeClass("active");
            });

            $( ".aside" ).find(".has-children").click(function( index ) {
                $(this).toggleClass("active");
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

        if ($(".qna").length > 0) {
            $(this).find(".ques").click(function( index ) {
                $(this).siblings(".ans").slideToggle("fast").parent().toggleClass("active");
            }).eq(0).click();
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
        if ($(".swiper-container-trivia2").length > 0) {
            var triviaTabs = new Swiper('.swiper-container-trivia.trivia-tabs', {
                // Optional parameters
                spaceBetween: 0,
                slidesPerView: 'auto',
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                breakpoints: {
                    700: {
                        allowTouchMove: false,
                    },
                },
                // Navigation arrows
                navigation: {
                    nextEl: '.trivia .swiper-button-next',
                    prevEl: '.trivia .swiper-button-prev',
                },
            })
            var triviaContent = new Swiper('.swiper-container-trivia.trivia-content', {
                // Optional parameters
                slidesPerView: 1,
                //zoom: true,
                //grabCursor: true,
                effect:'fade',
                allowTouchMove: false,
                autoHeight: true, //enable auto height
                thumbs: {
                  swiper: triviaTabs,
                },
            })
        }

        if ($(".swiper-container-gallery").length > 0) {
            var galleryThumbs = new Swiper('.swiper-container-gallery.gallerythumbs', {
                // Optional parameters
                spaceBetween: 15,
                slidesPerView: 'auto',
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            })
            var galleryTop = new Swiper('.swiper-container-gallery.gallerytop', {
                // Optional parameters
                //slidesPerView: 1,
                effect:'flip',
                //zoom: true,
                //grabCursor: true,
                autoHeight: true, //enable auto height
                thumbs: {
                  swiper: galleryThumbs,
                },
            })
        }

        if($('[data-fancybox="gallery"]').length>0){

            $('[data-fancybox="gallery"]').fancybox({
                buttons: [
                    //"zoom",
                    //"share",
                    //"slideShow",
                    //"fullScreen",
                    //"download",
                    //"thumbs",
                    "close"
                  ],
            });
        }


        //initialize swiper when document ready
        if ($(".swiper-container-banner").length > 0) {
            var bannerSwiper = new Swiper('.swiper-container-banner', {
                // Optional parameters
                loop: true,
                //effect:'fade',
                //autoHeight:true,
                spaceBetween: 0,
                slidesPerGroup:1,
                autoplay: {
                    delay: 3000,
                },
                // If we need pagination
                pagination: {
                    el: '.swiper-container-banner .swiper-pagination',
                    clickable:true,
                },
                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-container-banner .swiper-button-next',
                    prevEl: '.swiper-container-banner .swiper-button-prev',
                },
            })
        }

        //initialize swiper when document ready
        if ($(".swiper-container-life").length > 0) {
            var lifeSwiper = new Swiper('.swiper-container-life', {
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
                    el: '.swiper-container-life .swiper-pagination',
                    clickable:true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-container-life .swiper-button-next',
                    prevEl: '.swiper-container-life .swiper-button-prev',
                },
            })
        }

        if ($(".swiper-container-books5").length > 0) {
            var bookSwiper = new Swiper('.swiper-container-books5', {
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
                    600: {
                      slidesPerView: 1,
                      slidesPerGroup:1,
                    },
                    800: {
                      slidesPerView: 2,
                      slidesPerGroup:2,
                    },
                    1000: {
                      slidesPerView: 4,
                      slidesPerGroup:4,
                    },
                },
                // If we need pagination
                pagination: {
                    el: '.swiper-container-books5 .swiper-pagination',
                    clickable:true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-container-books5 .swiper-button-next',
                    prevEl: '.swiper-container-books5 .swiper-button-prev',
                },
            })
        }

        if ($(".swiper-container-books4").length > 0) {
            var bookInsideSwiper = new Swiper('.swiper-container-books4', {
                // Optional parameters
                //direction: 'vertical',
                //loop: true,
                //effect:'fade',
                autoHeight:true,
                slidesPerView: 4,
                spaceBetween: 0,
                slidesPerGroup:4,
                //centeredSlides: true,
                breakpoints: {
                    600: {
                      slidesPerView: 1,
                      slidesPerGroup:1,
                    },
                    800: {
                      slidesPerView: 2,
                      slidesPerGroup:2,
                    },
                    1000: {
                      slidesPerView: 3,
                      slidesPerGroup:3,
                    },
                },
                // If we need pagination
                pagination: {
                    el: '.swiper-container-books4 .swiper-pagination',
                    clickable:true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-container-books4 .swiper-button-next',
                    prevEl: '.swiper-container-books4 .swiper-button-prev',
                },
            })
        }

        if ($(".swiper-container-article3").length > 0) {
            var bookInsideSwiper = new Swiper('.swiper-container-article3', {
                // Optional parameters
                //direction: 'vertical',
                //loop: true,
                //effect:'fade',
                autoHeight:true,
                slidesPerView: 3,
                spaceBetween: 0,
                slidesPerGroup:3,
                //centeredSlides: true,
                breakpoints: {
                    600: {
                      slidesPerView: 1,
                      slidesPerGroup:1,
                    },
                    800: {
                      slidesPerView: 2,
                      slidesPerGroup:2,
                    },
                    1000: {
                      slidesPerView: 3,
                      slidesPerGroup:3,
                    },
                },
                // If we need pagination
                pagination: {
                    el: '.swiper-container-article3 .swiper-pagination',
                    clickable:true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-container-article3 .swiper-button-next',
                    prevEl: '.swiper-container-article3 .swiper-button-prev',
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


//validations

var isEmail = function(email){
    if (email=="") return true;
    reEmail=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    return reEmail.test(email);
}

var validateNewsletter = function(){
    console.log("callback:"+grecaptcha.getResponse());
    $('input').removeClass("wrong");

    if(!$('input[name="email"]').val()){
        $('input[name="email"]').addClass("wrong");
        var notice="請輸入您的Email";
        alert(notice);
        return false;

    }

    if(!isEmail($('input[name="email"]').val())){
        $('input[name="email"]').addClass("wrong");
        var notice="您的Email格式錯誤";
        alert(notice);
        return false;
    }
}

var validateLogin = function(){
    console.log("callback:"+grecaptcha.getResponse());
    $('input').removeClass("wrong");

    if(!$('input[name="userid"]').val()){
        $('input[name="userid"]').addClass("wrong");
        var notice="請輸入您的帳號";
        alert(notice);
        return false;

    }

    if(!$('input[name="password"]').val()){
        $('input[name="password"]').addClass("wrong");
        var notice="請輸入密碼";
        alert(notice);
        return false;

    }
}

var validateLogin = function(){
    console.log("callback:"+grecaptcha.getResponse());
    $('input').removeClass("wrong");

    if(!$('input[name="userid"]').val()){
        $('input[name="userid"]').addClass("wrong");
        var notice="請輸入您的帳號";
        alert(notice);
        return false;

    }

    if(!$('input[name="password"]').val()){
        $('input[name="password"]').addClass("wrong");
        var notice="請輸入密碼";
        alert(notice);
        return false;

    }
}

var validateForget = function(){
    console.log("callback:"+grecaptcha.getResponse());
    $('input').removeClass("wrong");

    if(!$('input[name="name"]').val()){
        $('input[name="name"]').addClass("wrong");
        var notice="請輸入您的姓名";
        alert(notice);
        return false;

    }

    if(!$('input[name="email"]').val()){
        $('input[name="email"]').addClass("wrong");
        var notice="請輸入您的Email";
        alert(notice);
        return false;

    }

    if(!isEmail($('input[name="email"]').val())){
        $('input[name="email"]').addClass("wrong");
        var notice="您的Email格式錯誤";
        alert(notice);
        return false;
    }
}

var validateProfile = function(){
    $('input').removeClass("wrong");
    $('select').removeClass("wrong");
    

    if(!$('input[name="userid"]').val()){
        $('input[name="userid"]').addClass("wrong");
        var notice="請輸入您的帳號";
        alert(notice);
        return false;

    }

    if(!$('input[name="password"]').val()){
        $('input[name="password"]').addClass("wrong");
        var notice="請輸入密碼";
        alert(notice);
        return false;

    }

    if(!$('input[name="confirmPW"]').val() || $('input[name="password"]').val() != $('input[name="confirmPW"]').val()){
        $('input[name="confirmPW"]').addClass("wrong");
        var notice="密碼確認錯誤";
        alert(notice);
        return false;

    }

    if(!$('input[name="name"]').val()){
        $('input[name="name"]').addClass("wrong");
        var notice="請輸入您的姓名";
        alert(notice);
        return false;

    }

    if(!$('input[name="email"]').val()){
        $('input[name="email"]').addClass("wrong");
        var notice="請輸入您的Email";
        alert(notice);
        return false;

    }

    if(!isEmail($('input[name="email"]').val())){
        $('input[name="email"]').addClass("wrong");
        var notice="您的Email格式錯誤";
        alert(notice);
        return false;
    }



    if(!$('input[name="gender"]:checked').val()){
        $('input[name="gender"]').addClass("wrong");
        var notice="請輸入您的性別";
        alert(notice);
        return false;

    }

    if($("#byear").length>0){
        var byearVal = $("#byear > option:selected").val();
        if(byearVal==0){
            $('#byear').addClass("wrong");
            var notice="請選擇出生年份";
            alert(notice);
            return false;
        }
    }
    if($("#bmonth").length>0){
        var bmonthVal = $("#bmonth > option:selected").val();
        if(bmonthVal==0){
            $('#bmonth').addClass("wrong");
            var notice="請選擇出生月份";
            alert(notice);
            return false;
        }
    }
    if($("#bday").length>0){
        var bdayVal = $("#bday > option:selected").val();
        if(bdayVal==0){
            $('#bday').addClass("wrong");
            var notice="請選擇出生日";
            alert(notice);
            return false;
        }
    }


    if(!$('input[name="mobile"]').val()){
        $('input[name="mobile"]').addClass("wrong");
        var notice="請輸入您的行動電話";
        alert(notice);
        return false;

    }
    if($("#country").length>0){
        var countryVal = $("#country > option:selected").val();
        if(countryVal==0){
            $('#country').addClass("wrong");
            var notice="請選擇國家(地區)別";
            alert(notice);
            return false;
        }
    }
    if($("#postal").length>0){
        var postalVal = $("#postal > option:selected").val();
        if(postalVal==0){
            $('#postal').addClass("wrong");
            var notice="請選擇郵遞區號";
            alert(notice);
            return false;
        }
    }
    

    if(!$('input[name="address"]').val()){
        $('input[name="address"]').addClass("wrong");
        var notice="請輸入完整地址";
        alert(notice);
        return false;

    }

    if($("input[name='agreement']").length>0){
        var agreement=$("input[name='agreement']:checked").length;
        if(agreement == 0){
            $('input[name="agreement"]').addClass("wrong");
            var notice="請勾選已詳細閱讀並同意會員服務條款與隱私權政策";
            alert(notice);
            return false;

        }
    }
}

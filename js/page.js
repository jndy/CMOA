var defaultTitle = '关于印发《中国移动一级客服系统对外提供数据工作管理办法》的通知';
var mySwiper = new Swiper ('.swiper-container',{
    mousewheelControl : false,
    pagination : '.swiper-pagination',
    paginationClickable: true,
    onSlideChangeEnd:function(swiper){
        if(swiper.activeIndex != 2){
            $('#section1 .magnify3').removeClass('openoffice');
            $('#section1 .point3').show();
            //重置弹出框的文本和样式
            $('#section1 ul li.inputlist').parent().find('.opendown').addClass('hide');
            $('#section1 ul li.inputlist input').val(defaultTitle);
            //重置保存框
            $('#section1 .listpage').removeClass('send-down');
            $('#section1 .officedialog').html(defaultTitle);
        }
    },
    speed:1000,
    simulateTouch: false
});
var mySwiper2 = new Swiper ('.swiper-container2',{
    mousewheelControl : false,
    pagination : '.swiper-pagination',
    paginationClickable: true,
    onSlideChangeEnd:function(swiper){
        switch (swiper.activeIndex) {
            case  0:
                $('#section2 .showbox .title').html('<h2>普通查找</h2>');
                $('#section2 .dialog1 .head img').attr('src','images/section2/2007.png');
                $('#section2 .dialog1').removeClass('active');
                break;
            case  1:
                $('#section2 .showbox .title').html('<h2>对象查找</h2>');
                $('#section2 .dialog1').removeClass('active');

                $('#section2 .page2 .cursor').removeAttr('style');
                $('#section2 .page2 .content').removeClass('hide');
                $('#section2 .page2').removeClass('active');
                $('#section2 .page2 .content2').removeClass('active');
                break;
            case  2:
                $('#section2 .showbox .title').html('<h2>找到文件</h2>');
                $('#section2 .dialog1 .head img').attr('src','images/section2/2023.png');
                $('#section2 .dialog1').addClass('active');
                break;
            case  3:
                $('#section2 .showbox .title').html('<h2>共享文件</h2>');
                $('#section2 .dialog1').removeClass('active');
                break;
            default :
                break;
        }
    },
    speed:1000,
    simulateTouch: false
});

var mySwiper4 = new Swiper ('.swiper-container4',{
    mousewheelControl : false,
    pagination : '.swiper-pagination',
    paginationClickable: true,
    onSlideChangeEnd:function(swiper){
        if(swiper.activeIndex != 2){
            $('#section4 .send').removeClass('sendbox');
        }
        if(swiper.activeIndex ==1 || swiper.activeIndex==2){
            $('#section4 .section4_page2 .send').removeClass('sendbox2');
            $('#section4 .section4_page2').removeClass('gonext');
            $('.section4_page2').removeClass('openoffice');
        }


        var arr = ['查收<br>邮件','保存到<br>办公空间','发送<br>会议通知'];
        $('#title>h2').html(arr[swiper.activeIndex]);
        $('#section4 .point2,#section4 .point1').show();

    },
    speed:1000,
    simulateTouch: false
});
$(function() {
    $('#fullpage').fullpage({
        verticalCentered: false,
        anchors: ['page1', 'page2', 'page3', 'page4',"page5"],
        afterLoad:function(anchorLink ,index){
            //判断index是因为之前的第4版本提前到了版本1
            if(index == 2 && window['continueAnimate'+index]){
                window['continueAnimate'+4]();
            }else if(index>2 && index < 5){
                window['continueAnimate'+(index-1)]();
            }else{
                if(window['continueAnimate'+index]){
                    window['continueAnimate'+index]();
                }
            }


        },
        navigation: true
    });


    init();
    function init(){
        var floorHeight = 250;
        var oBottom = 111;
        var lrHeight = 655;

        var windowHeight = $(window).height();

        if(windowHeight <= lrHeight+oBottom && windowHeight > lrHeight){
            var oH = windowHeight-lrHeight;
            $('.samebg .floor').css('height',111+oH);
            $('.samebg .officebg').css('bottom',oH);
        }else if(windowHeight < lrHeight){
            $('.samebg .floor').css('height',111);
            $('.samebg .officebg').css('bottom',0);
        }
    }
});

function continueAnimate1(){
    $('.section1 .clock').removeClass('animated swing').show(100,function(){
        $('.section1 .clock').addClass('animated swing');
    });

    if(mySwiper.activeIndex != 0){
        mySwiper.slideTo(0);
    }

    $('#section1 .nextstep').off().on('click',function(){
        $('#section1 .point3').show();
        mySwiper.slideNext();
    });

    $('#section1 .openofficebox').off().on('click',function(){
        $('.magnify3').addClass('openoffice');
        //重置弹出框的文本和样式
        $('#section1 ul li.inputlist').parent().find('.opendown').addClass('hide');
        $('#section1 ul li.inputlist input').val(defaultTitle);
        $('#section1 .point3').hide();
    });

    $('#section1 .saveOffice').off().on('click',function(){
        var title = $('#section1 ul li.inputlist input').val();
        $('#section1 .officedialog').html(title);
        $('.listpage').addClass('send-down');
        $('.send-okay').fadeIn(2000).fadeOut(1500);
    });

    $('#section1 .closeOffice').off().on('click',function(){
        $('#section1 .magnify3').removeClass('openoffice');
        $('#section1 .point3').show();
        //重置弹出框的文本和样式
        $('#section1 ul li.inputlist').parent().find('.opendown').addClass('hide');
        $('#section1 ul li.inputlist input').val(defaultTitle);
        //重置保存框
        $('#section1 .listpage').removeClass('send-down');
        $('#section1 .officedialog').html(defaultTitle);
    });

    $('#section1 ul li.inputlist').off().on('click',function(e){
        e.stopPropagation();
        var dom = $(this);
        var index = dom.index();
        dom.parent().find('.opendown').addClass('hide');
        if(index<2){
            dom.find('.opendown').removeClass('hide');
        }
    });

    $('#section1 .magnify3').off().on('click',function(e){
        $('#section1 ul li.inputlist').parent().find('.opendown').addClass('hide');
    });

    $('#section1 ul li .opendown').off().on('click',function(e){
        e.stopPropagation();
        $(this).addClass('hide');
    });
}

function continueAnimate2(){
    if(mySwiper2.activeIndex != 0) {
        mySwiper2.slideTo(0);
    }

    //普通查找
    $('#section2 .page1 .search2').click(function(){
        var keyword = $('#txt_page1').val().trim();
        if(keyword == '安全'){
            $('#section2 .page1 .content img').attr('src', 'images/section2/2005_1.png');
        }else if(keyword == '中国移动'){
            $('#section2 .page1 .content img').attr('src', 'images/section2/2005_2.png');
        }else{
            $('#section2 .page1 .content img').attr('src', 'images/section2/2005.png');
        }
        $('#section2 .page1,#section2 .dialog1').addClass('active');
        $('#section2 .page1 .cursor').animate({
            left:570
        });
    });
    $('#txt_page1').bind('keyup', function(event) {
        if (event.keyCode == "13") {
            //回车执行查询
            $('#section2 .page1 .search2').click();
        }
    });
    $('#txt_page1').bind('click', function(event) {
        $('#section2 .dialog1').removeClass('active');
        $('#section2 .page1 .cursor').animate({
            left:470
        });
    });

    //对象查找
    $('#section2 .page1 .btnsearch').click(function(){
        mySwiper2.slideTo(1);
        $('#section2 .showbox .title').html('<h2>对象查找</h2>');
        $('#section2 .dialog1').removeClass('active');

        $('#section2 .page2 .cursor').removeAttr('style');
        $('#section2 .page2 .content').removeClass('hide');
        $('#section2 .page2').removeClass('active');
        $('#section2 .page2 .content2').removeClass('active');
    });

    $('#section2 .page2 .content').click(function(){
        $(this).addClass('hide');
        $('#section2 .page2').addClass('active');
        $('#section2 .page2 .content2').addClass('active');
        $('#section2 .page2 .cursor').animate({
            left:175,
            top:210
        });
    });
    $('#section2 .page2 .content2').click(function(){
        mySwiper2.slideTo(2);
        $('#section2 .showbox .title').html('<h2>找到文件</h2>');
        $('#section2 .dialog1 .head img').attr('src','images/section2/2023.png');
        $('#section2 .dialog1').addClass('active');
        $('#section2 .page2 .content2').removeClass('active');
    });

    $('#section2 .page3 ul li').bind('click', function(){
        $('#section2 .page3').removeClass(function(index, css){
            return (css.match (/\bbk-\S+/g) || []).join(' ');
        }).addClass('bk-'+$(this).index());
    });

    $('#section2 .page3 .content').click(function(){
        mySwiper2.slideTo(3);
        $('#section2 .showbox .title').html('<h2>共享文件</h2>');
        $('#section2 .dialog1').removeClass('active');
    });

    $('#section2 .page4 .content').click(function(event){
        $('#section2 .page1,#section2 .page2,#section2 .page3,#section2 .page4').removeAttr("style");
        $('#section2 .showbox .title').html('<h2>普通查找</h2>');
        $('#section2 .dialog1 .head img').attr('src','images/section2/2007.png');
        $.fn.fullpage.moveSectionDown();
        event.stopPropagation();
    });
}

function continueAnimate4(){
    if(mySwiper4.activeIndex != 0){
        mySwiper4.slideTo(0);
    }

    $('#section4 .nextstep').off().on('click',function(){
        $('#section4 .point').show();
        mySwiper4.slideNext();
    });

    $('#section4 .sendbtn').off().on('click',function(){
        $('#section4 .section4_page3 .send').addClass('sendbox');
        $('#section4 .point').hide();
    });

    $('#section4 .openofficebtn').off().on('click',function(){
        $('.section4_page2').addClass('openoffice');
        $('#section4 .point2').hide();
        setTimeout(function(){
            $('#section4 .point2').show();
        },2000);
    });

    $('#section4 .saveOffice').off().on('click',function(){
        $('#section4 .section4_page2 .send').addClass('sendbox2');
        $('#section4 .section4_page2').addClass('gonext');
        $('#section4 .point2').hide();
        setTimeout(function(){
            $('#section4 .point2').show();
        },1000);
    });

    $('#section4 .closeOffice').off().on('click',function(){
        $('#section4 .section4_page2').removeClass('openoffice');
        $('#section4 .point2').show();
    });
}

//第三屏动画事件处理
function continueAnimate3(){
    clearInterval(timer);
    var timer = setInterval(function(){
        var hash = window.location.hash;
        if(hash.indexOf("page4") < 0){
            clearInterval(timer);
            if($(".section3 .wrap").eq(0).hasClass('hide')){
                setTimeout(function(){
                    $(".section3 .wrap").eq(1).addClass("hide");
                    $(".section3 .wrap").eq(0).removeClass("hide");
                    $("#section3 .floor").removeClass("hide");
                },1000);
            }
        }
    },30);


    //恢复第二页,默认第1
    $(".section3 .space-l li").removeClass('current');
    $(".section3 .space-l li:eq(0)").addClass('current');
    $(".section3 .space-r img").addClass('hide');
    $(".section3 .space-r img:eq(1)").removeClass('hide');
    $(".section3 .space5-show").removeClass("hide");

    $(".section3 .next").off("click").on("click",function(e){
        $(".section3 .wrap").eq(0).addClass("hide");
        $(".section3 .wrap").eq(1).removeClass("hide");
        $("#section3 .floor").addClass("hide");
    });

    //第二页交互
    $(".section3 .space-l li").off("click").on("click",function(){
        var _this = $(this);

        $(".section3 .space-l li").removeClass('current');
        _this.addClass('current');

        var index = $(".section3 .space-l li").index(_this);
        $(".section3 .space-r img").addClass('hide');
        $(".section3 .space-r img:eq("+index+")").removeClass('hide');

        if(index == 0){
            $(".section3 .space5-show").removeClass("hide");
        }else{
            $(".section3 .space5-show").addClass("hide");
        }

    });

    $(".section3 .space-r .next").click(function(event){
        $.fn.fullpage.moveSectionDown();
        event.stopPropagation();
    })
}

//第五屏交互
function continueAnimate5(){
    //还原
    clearInterval(timer);
    var timer = setInterval(function(){
        var hash = window.location.hash;
        if(hash.indexOf("page5") < 0){
            clearInterval(timer);
            if($(".section5 .phone img:eq(0)").hasClass("hide")){
                $(".section5 .switch img, .section5 .switch a").addClass("hide");
                $(".section5 .phone img:eq(0), .section5 .txt img:eq(0), .section5 .switch a:eq(0)").removeClass("hide");
                $(".section5 .hand1,.section5 .hand2,.section5 .hand3").addClass("hide");
            }
        }
    },30);

    $(".section5 .switch a").off("click").on("click",function(){
        var index = $(".section5 .switch a").index($(this));
        var next = index + 1;
        $(".section5 .phone img:eq("+index+"), .section5 .txt img:eq("+index+"), .section5 .switch a:eq("+index+")").addClass("hide");
        $(".section5 .phone img:eq("+next+"), .section5 .txt img:eq("+next+"), .section5 .switch a:eq("+next+")").removeClass("hide");
        if(next==4){
            $(".section5 .txt img:eq("+index+")").removeClass("hide");
        }

        $(".section5 .hand1,.section5 .hand2,.section5 .hand3").addClass("hide");

        if(next == 1 || next == 2 || next == 3){
            var timer = setTimeout(function(){
                clearTimeout(timer);
                $(".section5 .hand"+next).removeClass("hide");
            },1000);
        }
    })
}

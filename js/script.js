

let bgSlide=true;

$('.nav-list>ul>li>a').click(function(){
    if(bgSlide==true){
        $(this).siblings('.two-container').stop().slideDown(500);
        bgSlide=false
    }else{
        $(this).siblings('.two-container').stop().slideUp(500);
        bgSlide=true
    
    }/* 클릭메서드 사용시 하위속성을 찾으면안되고 클릭대상인a의 형제속싱을 찾아야한다  */
});

let bgSlide2=true;
 $('.nav-list ul li').click(function(){
    if(bgSlide2==true){
        $(this).find('.memu-wrap1-1').stop().slideDown(500)
        bgSlide2=false
    }else{
        $('.nav-list ul li').find('.memu-wrap1-1').stop().slideUp(500)
        bgSlide2=true

    }    
});

let one7=$('.line7')
let one8=$('.line8')
let one9=$('.line9')
let threeBoxs1=true;
let winW=$(window).width();
console.log(winW)
$('.threebox>button').click(function(){
    if(threeBoxs1==true){
        one7.stop().css({transform: "rotate(-45deg)", top: "3rem"})
        one8.stop().css({display: "none"})
        one9.stop().css({transform: "rotate(45deg)", top: "3rem"})
        $('.three-wrap').stop().slideDown(500);
        $('.three-inner').stop().slideDown(500);
        if(winw <= 1024){
            $('.three-wrap').stop().slideUp(500);
            $('.three-inner').stop().slideUp(500);
        }
        threeBoxs1=false
    }else{
        one7.stop().css({transform: "rotate(0deg)", top: "2.2rem"})
        one8.stop().css({display: "block" , top: "3rem",right:"3.2rem"})
        one9.stop().css({transform: "rotate(0deg)", top: "2.2rem"})
        $('.three-wrap').stop().slideUp(500)
        threeBoxs1=true
    }
    
});
$('.three-x>button').click(function(){
        one7.stop().css({transform: "rotate(0deg)", top: "2.2rem"})
        one8.stop().css({display: "block" , top: "3.2rem",right:"3.2rem"})
        one9.stop().css({transform: "rotate(0deg)", top: "4.2rem"})
        $('.three-wrap').stop().slideUp(500)
        threeBoxs1=true
    
});





let one=$('.line4')
let two=$('.line5')
let three=$('.line6')
let threeBoxs=true;
$('.threebox1>button>a').click(function(){
    console.log('클릭')
    if(threeBoxs==true){
        one.stop().css({transform: "rotate(-45deg)", top: "3rem"})
        two.stop().css({display: "none"})
        three.stop().css({transform: "rotate(45deg)", top: "3rem"})
        $('.bg-two').stop().slideDown(300);
        threeBoxs=false
    }else{
        one.stop().css({transform: "rotate(0deg)", top: "2.2rem"})
        two.stop().css({display: "block" , top: "3rem",right:"3.3rem"})
        three.stop().css({transform: "rotate(0deg)", top: "3.8rem"})
        $('.bg-two').stop().slideUp(300);
        threeBoxs=true
    }
    
});



$('.modelClick').click(function(){
    $('.menu-three').stop().css({left:0 });
});
$('.back>a').click(function(){
    $('.menu-three').stop().css({left:'100%'});

});
$('.buyClick').click(function(){
    $('.menu-three1').stop().css({left:0 });
});
$('.back1>a>h2').click(function(){
    $('.menu-three1').stop().css({left:'100%'});

});

let apple=true;
$('.sedan').click(function(e){
    e.preventDefault();
    if(apple==true){
        $(this).next('.sedan-content').slideDown();
        apple=false
    }else{
        $(this).next('.sedan-content').slideUp();
        apple=true
    }
});

let orange=true;
$('.menu-three1>ul>li>a').click(function(e){
    e.preventDefault();
    if(orange==true){
        $(this).next('.menu-three1-depth2').slideDown();
        orange=false
    }else{
        $(this).next('.menu-three1-depth2').slideUp();
        orange=true
    }
});

let olive=true;
$('.four-tab>li>a').click(function(e){
    e.preventDefault();
    if(olive==true){
        $(this).next('.four-tab-list').slideDown();
        olive=false
    }else{
        $(this).next('.four-tab-list').slideUp();
        olive=true
    }
});



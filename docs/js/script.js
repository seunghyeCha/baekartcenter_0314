$(document).ready(function() {
  // 새로고침 시 맨 위로 이동
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  let currentIndex = 0;
  const slides = $("#slides .sld");
  const indicators = $("#indicator_wrap .indicator");
  const slideCount = slides.length;
  const slide = $("#slides");

  function changeSlide() {
    currentIndex++;
    if (currentIndex >= slideCount) {
        currentIndex = 0;
    }

    slide.css("transform", "translateX(" + (-100 * currentIndex) + "vw)");
    
    indicators.removeClass("active");
    $(indicators[currentIndex]).addClass("active");
  }

  indicators.first().addClass("active").addClass("first");
  let slideInterval = setInterval(changeSlide, 5000);

  // 2. 메뉴 글자 색상 변경 (로그인 아이콘 변경 필요)
  const head = $("#head");
  const nav = $("#nav");
  const hambg = $("#hamburger div");
  const loginImg = $("#login img");


  function headChange () {
    const scrollY = window.scrollY;
    const rectTop = $("#ctt1").offset().top;

    const color = scrollY > rectTop ? "#333" : "#fcfdfd";
    const loginSrc = scrollY > rectTop ? "images/login(black).png" : "images/login(white).png";
    const bgColor = scrollY > rectTop ? "rgba(211, 211, 211, 0.8)" : "transparent" ;
    
    head.css("background-color", bgColor);
    nav.css({"color" : color});
    hambg.css({"background-color" : color});
    loginImg.attr("src", loginSrc);
  }

  $(window).on("scroll", headChange);

  $("#nav > li").hover(
    function() {
      $(this).find(".sub_nav").stop(true, true).slideDown(200);
    },
    function() {
      $(this).find(".sub_nav").stop(true, true).slideUp(200);
    }
  );


  // 모바일메뉴
  function toggleMenu () {
    $("#mob_nav").toggleClass("active");
    $("#hamburger").toggleClass("open");
  }
  $("#hamburger").on("click", toggleMenu);

  // 모바일메뉴 토글 
  function subMenuToggle() {
    $("#mob_nav > li > a").off("click").on("click", function(e) {
      let subMenu = $(this).next(".sub_mob");
      if(subMenu.length > 0) {
        e.preventDefault();
        $("#mob_nav .sub_mob").not(subMenu).css("max-height", "0").removeClass("active");
        $("#mob_nav > li > a").not(this).removeClass("open");
  
        if(subMenu.hasClass("active")) {
          subMenu.removeClass("active").css("max-height", "0");
          $(this).removeClass("open");
        } else {
          subMenu.addClass("active").css("max-height", subMenu[0].scrollHeight + "px");
          $(this).addClass("open");
        }
      }
    });
  }

  // 3. #exhibit부분 가로스크롤
  const exhibit = $("#exhibit");
  const indicator = $("#scroll-indicator span");
  let maxScrollLeft = exhibit[0].scrollWidth - exhibit.outerWidth();

  function plusIndicator() {
    let scrollLeft = exhibit.scrollLeft();    
    let scrollPercent = Math.min((scrollLeft / maxScrollLeft) * 100, 100);
    indicator.css("width", scrollPercent + "%");
  }

  exhibit.on("wheel", function (event) {
    if ($(this).is(":hover")) {
      event.preventDefault();
      requestAnimationFrame(() => {
        let scrollAmount = maxScrollLeft;
        $(this).scrollLeft($(this).scrollLeft() + (event.originalEvent.deltaY > 0 ? scrollAmount : -scrollAmount));
        plusIndicator();
      });
    }
  });

  // 배너 변경
  function bannerChange () {
    $("#banner img").attr("src", "images/banner_2.jpg");
  }
  function resetBanner () {
    $("#banner img").attr("src", "images/banner_1.jpg");
  }

  // 반응형 스크립트
  const mobile = window.matchMedia("(max-width: 480px)");
  const tablet = window.matchMedia("(min-width: 481px) and (max-width:768px)");
  const ntbook = window.matchMedia("(min-width: 769px) and (max-width: 1024px)");

  function responsiveScript() {
    if (mobile.matches) {
      console.log("모바일");
      $("#hamburger").off("click").on("click", toggleMenu);
      subMenuToggle();
      bannerChange();
      headChange();
    } else if (tablet.matches) {
      console.log("태블릿");
      $("#hamburger").off("click").on("click", toggleMenu);
      subMenuToggle();
      headChange();
      resetBanner();
    } else if (ntbook.matches) {
      console.log("노트북");
      headChange();
      resetBanner();
    } else {
      console.log("데스크탑");
      headChange();
      resetBanner();
    }

    headChange();
  }

  $(window).on("resize", function () {
    clearTimeout(this.resizeTimeout);
    resizeTimeout = setTimeout(() => {
      responsiveScript();
      ScrollTrigger?.refresh(); 
    }, 200);
  });

  responsiveScript();
});

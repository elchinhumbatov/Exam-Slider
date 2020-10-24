$().ready(() => {
  let n = 0;
  let percent = 0;
  let circle = document.getElementById('circle');
  let radius = circle.r.baseVal.value;
  let dlina = 2 * Math.PI * radius;
  let timer, loader;
  let obj;

  circle.style.strokeDasharray = dlina + ' ' + dlina;
  circle.style.strokeDashoffset = dlina;

  function progress() {
    if (percent == 100) percent = 0;
    let offset = dlina - percent / 100 * dlina;
    circle.style.strokeDashoffset = offset;
  }
  start();

  function show() {
    if (n == obj.slider.length) n = 0;
    if (n < 0) n = obj.slider.length - 1;

    $(".slide").fadeOut(100, function () {
      $(this).css('background-image', 'url("img/' + obj.slider[n].image + '")');
      $(this).fadeIn(700);
    });
    $('.title h1').html(obj.slider[n].text.h1);
    $('.title p').html(obj.slider[n].text.p);
    $('.title a').attr('href', obj.slider[n].url);
    $('.dots>div').css('background-color', '#999');
    $('.dots>div').eq(n).css('background-color', '#fff');
  }

  // ------------------ Navigation ------------------ //
  //------Arrows click------//
  $('.right').click(() => { n++; start(); });

  $('.left').click(() => { n--; start(); });
  //------Swipe------//
  $('.slider').on({
    "swiperight": function (event) { n--; start(); },
    "swipeleft": function (event) { n++; start(); },
  });
  //------NAV dots------//
  $('.dots>div').click(function () { n = this.innerHTML - 1; start(); });
  //------On keydown------//
  document.onkeydown = keyNav;
  function keyNav(e) {
    if (e.keyCode == '37') { n--; start(); }
    else if (e.keyCode == '39') { n++; start(); }
  }
  // ------------------ END Navigation ------------------ //

  function start() {
    percent = 0;
    stop();
    loadSlide();
    timer = setInterval(() => { n++; loadSlide(); show(); }, 4000);
    loader = setInterval(() => { percent++; progress(); }, 40);
  }

  function stop() {
    clearInterval(timer);
    clearInterval(loader);
  }

  async function loadSlide() {
    let ajax = await fetch('slider.json');
    if (ajax.ok) {
      obj = await ajax.json();
      show();
    }
  }

});
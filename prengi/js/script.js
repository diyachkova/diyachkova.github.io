/* Humburger */
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
})


$(document).ready(function(){

    //Smooth scroll and pageup
    
    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
        $('.pageup').fadeIn();
        } else {
        $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
    });

    // Modal

    $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn('slow');
      $('#thanks').fadeOut();
    });
    $('.modal_close').on('click', function(){
      $('.overlay, #consultation, #thanks').fadeOut('slow');
    });
    
    //masked input

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //validation

    function valideForms(form) {
      $(form).validate({
        rules: {
          name: {
              required: true,
              minlength: 2
          },
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите своё имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
          },
          phone: 'Пожалуйста, введите свой номер телефона',
          email: {
            required: "Пожалуйста, введите свой почтовый адрес",
            email: "Не правильно введён адрес почты"
          }
        }
      });
    };

      valideForms ('#consultation form');
  
      //php настройки

    $('form').submit(function(e){
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: "mailer/smart.php",
        data: $(this).serialize()

      }).done(function(){
        $(this).find('input').val("");
        $('#consultation').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger("reset");
      });
      return false;
    });
});

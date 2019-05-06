var numFormat = wNumb({
  thousand: ' '
});

$(window).on("scroll touchmove", function () {

  var scrollPos = $(window).scrollTop();

  if (scrollPos > 50) {

    if (!$("header").hasClass("header-fixed")) {

      $("header").addClass("header-fixed");
    }


  } else {

    if ($("header").hasClass("header-fixed")) {

      $("header").removeClass("header-fixed");

    }

  }

});

$(window).resize(function () {

  makeUp();

  slickResponsive();

});

$(window).on("load", function () {



});

var baseUrl = ""

$(document).ready(function () {

  makeUp();

  // Sliders

  $(".main-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    fade: true,
    adaptiveHeight: true
  });

  $(".services-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".partners-slider").slick({
    slidesToShow: 6,
    slidesToScroll: 6,
    speed: 500,
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  // Sliders END

  // Contacts map

  ymaps.ready(function () {

    if ($("#contactsMap").length) {

      var myMap = new ymaps.Map('contactsMap', {
          center: [55.713018, 37.641454],
          zoom: 16,
          controls: ['zoomControl']
        }, {}),

        myPlacemark = new ymaps.Placemark([55.713018, 37.644454], {
          hintContent: '',
          balloonContent: ''
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'images/map-pin.png',
          // Размеры метки.
          iconImageSize: [43, 60],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-21, -60]
        });

      myMap.behaviors.disable('scrollZoom');

      myMap.geoObjects
        .add(myPlacemark);

    }

    if ($("#mobile-indicator").css("display") != "block") {

      myMap.setCenter([55.713018, 37.641454]);

    } else {

      myMap.setCenter([55.713018, 37.644454]);

    }

    $(window).resize(function () {

      if ($("#mobile-indicator").css("display") != "block") {

        myMap.setCenter([55.713018, 37.641454]);

      } else {

        myMap.setCenter([55.713018, 37.644454]);

      }

    });

  });

  // Contacts map END

  slickResponsive();


  var scrollPos = $(window).scrollTop();

  if (scrollPos > 50) {

    if (!$("header").hasClass("header-fixed")) {

      $("header").addClass("header-fixed");
    }


  } else {

    if ($("header").hasClass("header-fixed")) {

      $("header").removeClass("header-fixed");

    }

  }

  // Main menu

  $(".navbar-trigger").click(function () {

    $(this).toggleClass("active");

    $(".navbar-wrapper").fadeToggle(150);
    $("body").toggleClass("menu-open");

  });

  $(".navbar-wrapper .close").click(function () {

    $(".navbar-wrapper").fadeOut(150);
    $("body").removeClass("menu-open");
    $(".navbar-trigger").removeClass("active");

  });

  $(".navbar-wrapper").click(function (e) {

    if (!$(e.target).hasClass("navbar-wrapper-inner") && !$(e.target).parents().hasClass("navbar-wrapper-inner")) {

      $(".navbar-wrapper").fadeOut(150);
      $("body").removeClass("menu-open");
      $(".navbar-trigger").removeClass("active");

    }

  });


  // Numeric input

  $(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
  });


  // Fancybox

  $("a.fancybox").fancybox();

  $(".fancybox[data-type=iframe]").fancybox({
    helpers : {
      media : {}
    },
    type: "iframe"
  });

  // Forms

  $("body").on("mouseup", "li.dropdown-header", function () {
    $(this).toggleClass("active");
    $(this).nextAll("li[data-optgroup='" + $(this).data("optgroup") + "']").fadeToggle(150);
    return false;
  });

  $("select").not(".picker__select--month, .picker__select--year").each(function () {
    if ($(this).attr("multiple")) {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор",
        selectedTextFormat: "count",
        countSelectedText: function(count) {
          return count + " " + declOfNum(count, ['элемент', 'элемента', 'элементов']);
        }
      });
    } else {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор"
      });
    }
  });

  $("select[multiple]").not(".simple-multi").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-footer").length) {
      dropdownFooter = '\
      <div class="dropdown-footer">\
      <div class="btn btn-1 btn-ico btn-save">Выбрать</div>\
      <div class="btn btn-cancel">Очистить</div>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").append(dropdownFooter);
    }
  });



  $("body").on("click",".bootstrap-select .btn-save", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker("toggle");
    return false;
  });

  $("body").on("click",".bootstrap-select .btn-cancel", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker('deselectAll');
    return false;
  });





  $('.input-numeric').bind('keyup paste', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  if ($("input:text").length) {
    $("input:text").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  if ($("textarea").length) {
    $("textarea").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  $("body").on("focus","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      placeholder.hide();

    }

  });

  $("body").on("blur","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
        placeholder.show();
      }

    }

  });

  $("body").on("click",".placeholder",function(e) {
    if ($(this).parent().find("input").length) {
      $(this).parent().find("input").trigger("focus");
    }
    if ($(this).parent().find("textarea").length) {
      $(this).parent().find("textarea").trigger("focus");
    }
  });

  $("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").addClass("focus");
  });

  $("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").removeClass("focus")
  });

  validateForms();

});

function validateForms() {

  $("input.input-phone").mask("+7 (999) 999-99-99");

  jQuery.validator.addClassRules('phone-email-group', {
    require_from_group: [1, ".phone-email-group"]
  });

  $("select").on("change", function () {
    if (!$(this).closest(".picker").length) {
      $(this).valid();
    }
  });

  $("body").on("click", ".form-item", function (e) {
    if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
      $(e.target).closest(".form-item").find("select").selectpicker('toggle');
    }
  });

  $("form").each(function() {

    form = $(this);

    $(this).validate({
      focusInvalid: true,
      sendForm : false,
      errorPlacement: function(error, element) {
        if (element[0].tagName == "SELECT") {
          element.closest(".form-item").addClass("error");
          element.closest(".btn-group").addClass("btn-group-error");
          if (element.closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
          } else {
            error.insertAfter(element.closest(".btn-group"));
          }
        } else {
          if (element.attr("type") == "checkbox") {
            element.siblings("label").addClass("checkbox-label-error")
          } else {
            error.insertAfter(element);
          }
        }

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
        $(element).closest(".form-item").removeClass("error").addClass("valid");

        if ($(element)[0].tagName == "SELECT") {
          $(element).closest(".form-item").removeClass("error");
          $(element).closest(".btn-group").removeClass("btn-group-error");
          if ($(element).closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
            $(element).closest(".form-item").next("label.error").remove();
          } else {
            $(element).closest(".btn-group").next("label.error").remove();
          }
        } else {
          $(element).next(".error").remove();
          if ($(element).attr("type") == "checkbox") {
            $(element).siblings("label").removeClass("checkbox-label-error")
          }
        }
      },
      invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
          validatorcalc.errorList[0].element.focus();
        }
      }
    });

    if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
      $(this).find("input.password-repeat").rules('add', {
        equalTo: "#"+form.find("input.password").attr("id")
      });
    }

  });

}

jQuery.extend(jQuery.validator.messages, {
  required: "Не заполнено поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function readURL(input, img) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      img.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}




function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function formSuccess(form) {

  form.find(".form-group input, .form-group textarea").val("");
  form.find(".placeholder").show();
  $("#successModal").modal("show");
  form.closest(".modal").modal("hide");
}

function slickResponsive() {

  if ($("#mobile-indicator").css("display") == "block") {

    if (!$(".unblock-list .row").hasClass("slick-initialized")) {

      $(".unblock-list .row").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
      });

    }

  } else {

    if ($(".unblock-list .row").hasClass("slick-initialized")) {
      $(".unblock-list .row").slick("unslick");
    }

  }

}

function makeUp() {

  if (!$("header").hasClass("header-fixed")) {

    $(".main").css({
      paddingTop: $("header").outerHeight()
    })


  }

}
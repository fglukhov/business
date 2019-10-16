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

  calcFields();

  // Calc form

  if ($(".calc-form").length) {

    $(".calc-form select").on("change", function () {

      calcFields();

      calcPrice($(this).closest(".calc-realty-form"));

    });

    $(".realty-radio input").on("change", function () {

      $(".calc-realty-form").hide().removeClass("active");
      $(".calc-realty-form[data-index='" + $(".realty-radio input:checked").val() + "']").fadeIn(200).addClass("active");

      calcFields();

    });

    $(".calc-nav-item").click(function () {

      if (!$(this).hasClass("disabled")) {

        var curIndex = $(this).data("index");

        $(".calc-nav-item").removeClass("active");
        $(this).addClass("active");

        $(".calc-step.active").removeClass("active").hide();
        $(".calc-step[data-index='" + curIndex + "']").fadeIn(200, function () {

          $(".calc-step[data-index='" + curIndex + "']").addClass("active");

        });

        if (curIndex == 3) {

          $(".calc-confirm-list").html("");

          $(".calc-realty-form.active .form-group").each(function () {

            if (!$(this).find(":disabled").not(".always-disabled").not("option").length) {

              var calcConfirmItem = $('<div class="calc-confirm-item"></div>');

              calcConfirmItem.append('<div class="calc-confirm-name">' + $(this).children("label").html() + ':&nbsp;</div>');

              if ($(this).find("select").length) {

                var itemVal = $(this).find("select option:selected").html();

              } else if ($(this).find("input[type='text']").length) {

                var itemVal = $(this).find("input[type='text']").val();

              } else if ($(this).find("input[type='radio']").length) {

                var itemVal = $(this).find("input[type='radio']:checked").next("label").html();

              }

              calcConfirmItem.append('<div class="calc-confirm-val">' + itemVal + '</div>');

              $(".calc-confirm-list").append(calcConfirmItem);

            }

          });

        }

      }

    });

    $(".calc-step .btn-forward").click(function () {

      $(".calc-step.active input, .calc-step.active select, .calc-step.active textarea").each(function () {

        if ($(this).closest(".calc-realty-form").hasClass("active") || !$(this).closest(".calc-realty-form").length) {

          $(this).valid();

        }

      });

      errorsCustom();

      if (!$(".calc-step.active [aria-invalid='true']").not(".always-disabled").not(":disabled").not(".disabled").length) {

        var nextIndex = $(".calc-step.active").next(".calc-step").data("index");

        $(".calc-nav-item[data-index='" + nextIndex + "']").removeClass("disabled").click();


      } else {



      }

    });

    $(".calc-realty-form.active select").on("change", function () {

      $(this).valid();
      errorsCustom();

    });

  }

  // Calc form END

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

  $(".input-date").each(function () {

    var datepickerObj = $(this);

    datepickerObj.datetimepicker({
      format: 'DD.MM.YYYY',
      locale: 'ru-RU',
      allowInputToggle: true,
      minDate: new Date()
    });

  });

  validateForms();

});

function validateForms() {

  $("input.input-phone").mask("+7 (999) 999-99-99");

  jQuery.validator.addClassRules('phone-email-group', {
    require_from_group: [1, ".phone-email-group"]
  });

  $("select").not(".calc-form select").on("change", function () {
    if (!$(this).closest(".picker").length) {
      $(this).valid();
    }
  });

  $("body").on("click", ".form-item", function (e) {
    if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
      $(e.target).closest(".form-item").find("select").selectpicker('toggle');
    }
  });

  $("form").not(".calc-form").each(function() {

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

function calcFields() {

  if ($(".calc-form").length) {

    $(".calc-realty-form input, .calc-realty-form select, .calc-realty-form textarea").each(function () {

      if (!$(this).closest(".calc-realty-form").hasClass("active")) {

        $(this).prop("disabled",true);

        if ($(this).prop("tagName") == "SELECT") {

          $(this).selectpicker("refresh");

        }

      } else {

        if (!$(this).hasClass("always-disabled")) {

          $(this).prop("disabled",false);

          if ($(this).prop("tagName") == "SELECT") {

            $(this).selectpicker("refresh");

          }

        }

      }

    });

    $(".calc-form [data-parent]").each(function () {

      if (!$($(this).data("parent")).find("[data-child='#" + $(this).attr("id") + "']").is(":selected")) {

        $(this).prop("disabled",true);
        $(this).closest(".form-group").hide();

        if ($(this).prop("tagName") == "SELECT") {

          $(this).selectpicker("refresh");

        }

      } else {

        $(this).prop("disabled",false);
        $(this).closest(".form-group").show();

        if ($(this).prop("tagName") == "SELECT") {

          $(this).selectpicker("refresh");

        }

      }


    });



  }

}

function calcPrice(activeForm) {


  if (activeForm.data("index") == 1) {

    if ($("#calc_1_location").val() && $("#calc_1_area").val() && $("#calc_1_term").val()) {

      if ($("#calc_1_location").val() == "1") {

        if ($("#calc_1_area").val() == "1") {

          var totalPrice = 4500;

        } else if ($("#calc_1_area").val() == "2") {

          var totalPrice = 5000;

        }

      } else if ($("#calc_1_location").val() == "2") {

        if ($("#calc_1_area").val() == "1") {

          var totalPrice = 5000;

        } else if ($("#calc_1_area").val() == "2") {

          var totalPrice = 5500;

        }

      }

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));

      activeForm.find(".calc-result-term").html($("#calc_1_term").val());
      activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_1_term").val(), ['день', 'дня', 'дней']));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .95)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_1_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_1_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }


  if (activeForm.data("index") == 2) {

    if ($("#calc_2_location").val() && $("#calc_2_term").val()) {

      if ($("#calc_2_location").val() == "1") {

        var totalPrice = 4275;

      } else if ($("#calc_2_location").val() == "2") {

        var totalPrice = 4750;

      }

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));

      activeForm.find(".calc-result-term").html($("#calc_2_term").val());
      activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_2_term").val(), ['день', 'дня', 'дней']));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .95)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_2_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_2_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 3) {

    if ($("#calc_3_area").val() && $("#calc_3_term").val()) {

      if ($("#calc_3_area").val() == "1") {

        if ($("#calc_3_term").val() == "1") {

          var totalPrice = 18000;

        } else if ($("#calc_3_term").val() == "3") {

          var totalPrice = 16000;

        }

      } else if ($("#calc_3_area").val() == "2") {

        var totalPrice = 0;

        var totalPriceButton = '<a href="#" class="btn btn-1" data-toggle="modal" data-target="#callbackModal">Узнать стоимость</a>';

      }


      if (totalPrice != 0) {

        activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));

        activeForm.find(".calc-result-term").html($("#calc_3_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_3_term").val(), ['день', 'дня', 'дней']));

        activeForm.find(".calc-form-result").slideDown(250);

        $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
        $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .95)));

        $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_3_term").val());
        $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_3_term").val(), ['день', 'дня', 'дней']));

        $(".item-discount, .calc-result-price-units").show();

      } else {

        activeForm.find(".calc-result-price").html(totalPriceButton);

        activeForm.find(".calc-result-term").html($("#calc_3_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_3_term").val(), ['день', 'дня', 'дней']));

        activeForm.find(".calc-form-result").slideDown(250);

        $(".calc-form-result-vis").find(".calc-result-price").html(totalPriceButton);

        $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_3_term").val());
        $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_3_term").val(), ['день', 'дня', 'дней']));

        $(".item-discount, .calc-result-price-units").hide();

      }


    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 4) {

    if ($("#calc_4_area").val() && $("#calc_4_term").val()) {

      if ($("#calc_4_area").val() == "1") {

        var totalPrice = 10000;

      } else if ($("#calc_4_area").val() == "2") {

        var totalPrice = 14000;

      }

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));

      activeForm.find(".calc-result-term").html($("#calc_4_term").val());
      activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_4_term").val(), ['день', 'дня', 'дней']));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .95)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_4_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_4_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 5) {

    if ($("#calc_5_location").val() && $("#calc_5_term").val()) {

      if ($("#calc_5_location").val() == "1") {

        var totalPrice = 5700;

      } else if ($("#calc_5_location").val() == "2") {

        var totalPrice = 6175;

      }

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));

      activeForm.find(".calc-result-term").html($("#calc_5_term").val());
      activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_5_term").val(), ['день', 'дня', 'дней']));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .95)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_5_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_5_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 6) {

    if ($("#calc_6_location").val() && $("#calc_6_term").val()) {

      if ($("#calc_6_location").val() == "1") {

        var totalPrice = 5700;

      } else if ($("#calc_6_location").val() == "2") {

        var totalPrice = 6175;

      }

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));

      activeForm.find(".calc-result-term").html($("#calc_6_term").val());
      activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_6_term").val(), ['день', 'дня', 'дней']));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .95)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_6_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_6_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }


}

function errorsCustom() {

  $("select").each(function () {

    if ($(this).hasClass("error")) {

      $(this).closest(".btn-group").find(".dropdown-toggle").addClass("error");

    } else {

      $(this).closest(".btn-group").find(".dropdown-toggle").removeClass("error");

    }

  });

}
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

  Inputmask("datetime", {
    inputFormat: "HH:MM",
    placeholder: "__:__",
    min: "08:00",
    max: "21:00",
  }).mask(".time-mask");

  calcFields();

  // Calc form

  if ($(".calc-form").length) {

    $(".calc-form .time-radio input[type=radio]").on("change", function () {

      if ($(this).val() == 'time_other') {

        $(this).closest(".time-radios").find(".other-time").show();
        $(this).closest(".time-radios").find(".other-time input").focus();
        $(this).closest(".time-radio").children("input, label").hide();

      } else {

        $(this).closest(".time-radios").find(".other-time").hide();
        $(this).closest(".time-radios").find(".time-radio > input, .time-radio > label").show();


      }

    });

    $(".calc-form select, .calc-form input[type='text']").on("change blur input", function () {

      calcFields();

      calcPrice($(this).closest(".calc-realty-form"));

    });

    $("#step3type").html($(".realty-radio input:checked").next("label").find(".realty-radio-descr").text());

    $(".realty-radio input").on("change", function () {

      $(".calc-realty-form").hide().removeClass("active");
      $(".calc-realty-form[data-index='" + $(".realty-radio input:checked").val() + "']").fadeIn(200).addClass("active");

      $("#step3type").html($(".realty-radio input:checked").next("label").find(".realty-radio-descr").text());

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

              } else if ($(this).find("input[type='text']").length && !$(this).find(".time-radios").length) {

                var itemVal = $(this).find("input[type='text']").val();

              } else if ($(this).find(".time-radios").length) {

                if ($(this).find("input[type='radio']:checked").val() == "time_other") {

                  var itemVal = $(this).find("input[type='text']").val();

                } else {

                  var itemVal = $(this).find("input[type='radio']:checked").next("label").html();

                }

              } else if ($(this).find("textarea").length) {

                var itemVal = $(this).find("textarea").val();

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

  $(document).on("blur", ".numeric", function() {

    var max = parseInt($(this).attr('max'));
    var min = parseInt($(this).attr('min'));
    if ($(this).val() > max)
    {
      $(this).val(max);
    }
    else if ($(this).val() < min)
    {
      $(this).val(min);
    }

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

  $('.textarea-autogrow').autogrow();

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

    // Court

    // $("[data-child='purpose_court']").each(function () {
    //
    //   if ($(this).is(":selected")) {
    //
    //     $(this).closest(".calc-realty-form option[data-rel='purpose_court']").attr("disabled", false);
    //     $(this).closest(".calc-realty-form option[data-rel='purpose_court']").closest("select").selectpicker("refresh");
    //
    //   } else {
    //
    //     $(this).closest(".calc-realty-form option[data-rel='purpose_court']").attr("disabled", true);
    //     $(this).closest(".calc-realty-form option[data-rel='purpose_court']").closest("select").selectpicker("refresh");
    //
    //   }
    //
    // });

    // Court END

    if ($(".calc-realty-form.active option[data-other=true]").is(":selected") || $("#calc_realty_8").is(":checked")) {

      $(".calc-nav").hide();
      $(".other-form").show();

      $(".calc-realty-form.active .form-group, .calc-realty-form.active .calc-form-footer, .calc-realty-form.active .calc-result").addClass("hidden-important");

      $(".calc-realty-form.active option[data-other=true]:selected").closest(".form-group").removeClass("hidden-important");

    } else {

      $(".calc-nav").show();
      $(".other-form").hide();

      $(".calc-realty-form.active .calc-form-footer, .calc-realty-form.active .calc-result").show();
      $(".calc-realty-form.active .form-group").removeClass("hidden-important");

    }

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

    var totalPrice = 0;

    if ($("#calc_1_area").val() &&
      $("#calc_1_location").val() &&
      (($("#calc_1_purpose").val() && $("#calc_1_purpose option:selected").data("prices")) ||
        ($("#calc_1_purpose").val() && $("#calc_1_bank").val() && !$("#calc_1_bank").is("disabled"))) &&
      $("#calc_1_term").val() &&
      $("#calc_1_report").val() &&
      $("#calc_1_copies").val()) {

      var timeArr = $("#calc_1_other_time").val().split(":");

      if (parseInt(timeArr[0]) < 10 || parseInt(timeArr[0]) > 18) {

        totalPrice += 1000;

      }

      if ($("#calc_1_purpose option:selected").data("prices")) {

        var purposePriceArr = $("#calc_1_purpose option:selected").data("prices");

        totalPrice += parseInt(purposePriceArr[$("#calc_1_location").val() - 1]);

      } else {

        var banksPriceArr = $("#calc_1_bank option:selected").data("prices");

        totalPrice += parseInt(banksPriceArr[$("#calc_1_location").val() - 1]);

      }

      if ($("#calc_1_area").val() == 2) {

        totalPrice += 1000;

      }

      totalPrice += (parseInt($("#calc_1_copies").val()) - 2)*500;
      totalPrice += parseInt($("#calc_1_report option:selected").data("price"));

      if ($("#calc_1_term option:selected").data("factor")) {

        totalPrice *= 2;

        activeForm.find(".calc-result-term").html("Быстрая оценка в течение");
        activeForm.find(".calc-result-term-units").html("дня");
      } else {
        activeForm.find(".calc-result-term").html($("#calc_1_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_1_term").val(), ['день', 'дня', 'дней']));
      }

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));
      activeForm.find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_1_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_1_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }


  if (activeForm.data("index") == 7) {

    var totalPrice = 0;

    if ($("#calc_7_area").val() &&
      $("#calc_7_location").val() &&
      (($("#calc_7_purpose").val() && $("#calc_7_purpose option:selected").data("prices")) ||
        ($("#calc_7_purpose").val() && $("#calc_7_bank").val() && !$("#calc_7_bank").is("disabled"))) &&
      $("#calc_7_term").val() &&
      $("#calc_7_report").val() &&
      $("#calc_7_copies").val()) {

      var timeArr = $("#calc_7_other_time").val().split(":");

      if (parseInt(timeArr[0]) < 10 || parseInt(timeArr[0]) > 18) {

        totalPrice += 1000;

      }

      if ($("#calc_7_purpose option:selected").data("prices")) {

        var purposePriceArr = $("#calc_7_purpose option:selected").data("prices");

        totalPrice += parseInt(purposePriceArr[$("#calc_7_location").val() - 1]);

      } else {

        var banksPriceArr = $("#calc_7_bank option:selected").data("prices");

        totalPrice += parseInt(banksPriceArr[$("#calc_7_location").val() - 1]);

      }

      if ($("#calc_7_area").val() == 2) {

        totalPrice += 1000;

      }

      totalPrice += (parseInt($("#calc_7_copies").val()) - 2)*500;
      totalPrice += parseInt($("#calc_7_report option:selected").data("price"));

      if ($("#calc_7_term option:selected").data("factor")) {

        totalPrice *= 2;

        activeForm.find(".calc-result-term").html("Быстрая оценка в течение");
        activeForm.find(".calc-result-term-units").html("дня");
      } else {
        activeForm.find(".calc-result-term").html($("#calc_7_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_7_term").val(), ['день', 'дня', 'дней']));
      }

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));
      activeForm.find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_7_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_7_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 8) {

    var totalPrice = 0;



  }

  if (activeForm.data("index") == 9) {

    var totalPrice = 0;

    if ($("#calc_9_area").val() &&
      $("#calc_9_location").val() &&
      (($("#calc_9_purpose").val() && $("#calc_9_purpose option:selected").data("prices")) ||
        ($("#calc_9_purpose").val() && $("#calc_9_bank").val() && !$("#calc_9_bank").is("disabled"))) &&
      $("#calc_9_term").val() &&
      $("#calc_9_report").val() &&
      $("#calc_9_copies").val()) {

      var timeArr = $("#calc_9_other_time").val().split(":");

      if (parseInt(timeArr[0]) < 10 || parseInt(timeArr[0]) > 18) {

        totalPrice += 1000;

      }

      if ($("#calc_9_purpose option:selected").data("prices")) {

        var purposePriceArr = $("#calc_9_purpose option:selected").data("prices");

        totalPrice += parseInt(purposePriceArr[$("#calc_9_location").val() - 1]);

      } else {

        var banksPriceArr = $("#calc_9_bank option:selected").data("prices");

        totalPrice += parseInt(banksPriceArr[$("#calc_9_location").val() - 1]);

      }

      if ($("#calc_9_area").val() == 2) {

        totalPrice += 1000;

      }

      totalPrice += (parseInt($("#calc_9_copies").val()) - 2)*500;
      totalPrice += parseInt($("#calc_9_report option:selected").data("price"));

      if ($("#calc_9_term option:selected").data("factor")) {

        totalPrice *= 2;

        activeForm.find(".calc-result-term").html("Быстрая оценка в течение");
        activeForm.find(".calc-result-term-units").html("дня");
      } else {
        activeForm.find(".calc-result-term").html($("#calc_9_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_9_term").val(), ['день', 'дня', 'дней']));
      }

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice))
      activeForm.find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_9_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_9_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 2) {

    var totalPrice = 0;

    if ($("#calc_2_location").val() &&
      (($("#calc_2_purpose").val() && $("#calc_2_purpose option:selected").data("prices")) ||
        ($("#calc_2_purpose").val() && $("#calc_2_bank").val() && !$("#calc_2_bank").is("disabled"))) &&
      $("#calc_2_term").val() &&
      $("#calc_2_report").val() &&
      $("#calc_2_copies").val()) {

      var timeArr = $("#calc_2_other_time").val().split(":");

      if (parseInt(timeArr[0]) < 10 || parseInt(timeArr[0]) > 18) {

        totalPrice += 1000;

      }

      if ($("#calc_2_purpose option:selected").data("prices")) {

        var purposePriceArr = $("#calc_2_purpose option:selected").data("prices");

        totalPrice += parseInt(purposePriceArr[$("#calc_2_location").val() - 1]);

      } else {

        var banksPriceArr = $("#calc_2_bank option:selected").data("prices");

        totalPrice += parseInt(banksPriceArr[$("#calc_2_location").val() - 1]);

      }

      totalPrice += parseInt($("#calc_2_report option:selected").data("price"));

      if ($("#calc_2_term option:selected").data("factor")) {

        totalPrice *= 2;

        activeForm.find(".calc-result-term").html("Быстрая оценка в течение");
        activeForm.find(".calc-result-term-units").html("дня");
      } else {
        activeForm.find(".calc-result-term").html($("#calc_2_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_2_term").val(), ['день', 'дня', 'дней']));
      }

      totalPrice += (parseInt($("#calc_2_copies").val()) - 2)*500;

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));
      activeForm.find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_2_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_2_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 3) {

    var totalPrice = 0;

    if ($("#calc_3_location").val() &&
      $("#calc_3_area").val() &&
      (($("#calc_3_purpose").val() && $("#calc_3_purpose option:selected").data("prices")) ||
        ($("#calc_3_purpose").val() && $("#calc_3_bank").val() && !$("#calc_3_bank").is("disabled"))) &&
      $("#calc_3_term").val() &&
      $("#calc_3_report").val() &&
      $("#calc_3_copies").val()) {

      var timeArr = $("#calc_3_other_time").val().split(":");

      if (parseInt(timeArr[0]) < 10 || parseInt(timeArr[0]) > 18) {

        totalPrice += 1000;

      }

      // if ($("#calc_3_purpose option:selected").data("prices")) {
      //
      //   var purposePriceArr = $("#calc_3_purpose option:selected").data("prices");
      //
      //   totalPrice += parseInt(purposePriceArr[$("#calc_3_location").val() - 1]);
      //
      // } else {
      //
      //   var banksPriceArr = $("#calc_3_bank option:selected").data("prices");
      //
      //   totalPrice += parseInt(banksPriceArr[$("#calc_3_location").val() - 1]);
      //
      // }

      totalPrice += parseInt($("#calc_3_report option:selected").data("price"));

      if ($("#calc_3_area").val() == "1") {

        if ($("#calc_3_term").val() == "1") {

          if ($("#calc_3_location").val() == "1") {
            totalPrice += 16000;
          } else if ($("#calc_3_location").val() == "2") {
            totalPrice += 16000;
          } else if ($("#calc_3_location").val() == "3") {
            totalPrice += 18000;
          } else if ($("#calc_3_location").val() == "4") {
            totalPrice += 24000;
          }

        } else if ($("#calc_3_term").val() == "3") {

          if ($("#calc_3_location").val() == "1") {
            totalPrice += 14000;
          } else if ($("#calc_3_location").val() == "2") {
            totalPrice += 14000;
          } else if ($("#calc_3_location").val() == "3") {
            totalPrice += 16000;
          } else if ($("#calc_3_location").val() == "4") {
            totalPrice += 20000;
          }

        }

      } else if ($("#calc_3_area").val() == "2") {

        if ($("#calc_3_term").val() == "1") {

          if ($("#calc_3_location").val() == "1") {
            totalPrice += 20000;
          } else if ($("#calc_3_location").val() == "2") {
            totalPrice += 20000;
          } else if ($("#calc_3_location").val() == "3") {
            totalPrice += 22000;
          } else if ($("#calc_3_location").val() == "4") {
            totalPrice += 26000;
          }

        } else if ($("#calc_3_term").val() == "3") {

          if ($("#calc_3_location").val() == "1") {
            totalPrice += 18000;
          } else if ($("#calc_3_location").val() == "2") {
            totalPrice += 18000;
          } else if ($("#calc_3_location").val() == "3") {
            totalPrice += 20000;
          } else if ($("#calc_3_location").val() == "4") {
            totalPrice += 22000;
          }

        }

      }

      if ($("#calc_3_term option:selected").data("factor")) {

        totalPrice *= 2;

        activeForm.find(".calc-result-term").html("Быстрая оценка в течение");
        activeForm.find(".calc-result-term-units").html("дня");
      } else {
        activeForm.find(".calc-result-term").html($("#calc_3_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_3_term").val(), ['день', 'дня', 'дней']));
      }

      totalPrice += (parseInt($("#calc_3_copies").val()) - 2)*500;

      if ($("#calc_3_area").val() == "2") {
        //totalPrice = 0;
      }

      if (totalPrice != 0) {

        activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));

        activeForm.find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      } else {
        var totalPriceButton = '<a href="#" class="btn btn-1" data-toggle="modal" data-target="#callbackModal">Узнать стоимость</a>';
        activeForm.find(".calc-result-price").html(totalPriceButton);
      }

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_3_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_3_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }


  }

  if (activeForm.data("index") == 4) {

    var totalPrice = 0;

    if ($("#calc_4_location").val() &&
      $("#calc_4_area").val() &&
      (($("#calc_4_purpose").val() && $("#calc_4_purpose option:selected").data("prices")) ||
        ($("#calc_4_purpose").val() && $("#calc_4_bank").val() && !$("#calc_4_bank").is("disabled"))) &&
      $("#calc_4_term").val() &&
      $("#calc_4_report").val() &&
      $("#calc_4_copies").val()) {

      var timeArr = $("#calc_4_other_time").val().split(":");

      if (parseInt(timeArr[0]) < 10 || parseInt(timeArr[0]) > 18) {

        totalPrice += 1000;

      }

      // if ($("#calc_4_purpose option:selected").data("prices")) {
      //
      //   var purposePriceArr = $("#calc_4_purpose option:selected").data("prices");
      //
      //   totalPrice += parseInt(purposePriceArr[$("#calc_4_location").val() - 1]);
      //
      // } else {
      //
      //   var banksPriceArr = $("#calc_4_bank option:selected").data("prices");
      //
      //   totalPrice += parseInt(banksPriceArr[$("#calc_4_location").val() - 1]);
      //
      // }


      totalPrice += parseInt($("#calc_4_report option:selected").data("price"));

      if ($("#calc_4_term").val() == "1") {

        if ($("#calc_4_location").val() == "1") {
          totalPrice += 10000;
        } else if ($("#calc_4_location").val() == "2") {
          totalPrice += 10000;
        } else if ($("#calc_4_location").val() == "3") {
          totalPrice += 12000;
        } else if ($("#calc_4_location").val() == "4") {
          totalPrice += 14000;
        }

      } else if ($("#calc_4_term").val() == "3") {

        if ($("#calc_4_location").val() == "1") {
          totalPrice += 8000;
        } else if ($("#calc_4_location").val() == "2") {
          totalPrice += 8000;
        } else if ($("#calc_4_location").val() == "3") {
          totalPrice += 10000;
        } else if ($("#calc_4_location").val() == "4") {
          totalPrice += 12000;
        }

      }

      if ($("#calc_4_term option:selected").data("factor")) {

        totalPrice *= 2;

        activeForm.find(".calc-result-term").html("Быстрая оценка в течение");
        activeForm.find(".calc-result-term-units").html("дня");
      } else {
        activeForm.find(".calc-result-term").html($("#calc_4_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_4_term").val(), ['день', 'дня', 'дней']));
      }

      totalPrice += (parseInt($("#calc_4_copies").val()) - 2)*500;

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));
      activeForm.find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_4_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_4_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 5) {

    var totalPrice = 0;

    if ($("#calc_5_location").val() &&
      (($("#calc_5_purpose").val() && $("#calc_5_purpose option:selected").data("prices")) ||
        ($("#calc_5_purpose").val() && $("#calc_5_bank").val() && !$("#calc_5_bank").is("disabled"))) &&
      $("#calc_5_term").val() &&
      $("#calc_5_report").val() &&
      $("#calc_5_copies").val()) {

      var timeArr = $("#calc_5_other_time").val().split(":");

      if (parseInt(timeArr[0]) < 10 || parseInt(timeArr[0]) > 18) {

        totalPrice += 1000;

      }

      if ($("#calc_5_purpose option:selected").data("prices")) {

        var purposePriceArr = $("#calc_5_purpose option:selected").data("prices");

        totalPrice += parseInt(purposePriceArr[$("#calc_5_location").val() - 1]);

      } else {

        var banksPriceArr = $("#calc_5_bank option:selected").data("prices");

        totalPrice += parseInt(banksPriceArr[$("#calc_5_location").val() - 1]);

      }


      totalPrice += parseInt($("#calc_5_report option:selected").data("price"));

      if ($("#calc_5_term").val() == "1") {

        if ($("#calc_5_location").val() == "1") {
          totalPrice += 5000;
        } else if ($("#calc_5_location").val() == "2") {
          totalPrice += 5500;
        } else if ($("#calc_5_location").val() == "3") {
          totalPrice += 6000;
        } else if ($("#calc_5_location").val() == "4") {
          totalPrice += 8000;
        }

      } else if ($("#calc_5_term").val() == "3") {

        if ($("#calc_5_location").val() == "1") {
          totalPrice += 4500;
        } else if ($("#calc_5_location").val() == "2") {
          totalPrice += 5000;
        } else if ($("#calc_5_location").val() == "3") {
          totalPrice += 5500;
        } else if ($("#calc_5_location").val() == "4") {
          totalPrice += 7000;
        }

      }

      if ($("#calc_5_term option:selected").data("factor")) {

        totalPrice *= 2;

        activeForm.find(".calc-result-term").html("Быстрая оценка в течение");
        activeForm.find(".calc-result-term-units").html("дня");
      } else {
        activeForm.find(".calc-result-term").html($("#calc_5_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_5_term").val(), ['день', 'дня', 'дней']));
      }

      totalPrice += (parseInt($("#calc_5_copies").val()) - 2)*500;

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));
      activeForm.find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      $(".calc-form-result-vis").find(".calc-result-term").html($("#calc_5_term").val());
      $(".calc-form-result-vis").find(".calc-result-term-units").html(declOfNum($("#calc_5_term").val(), ['день', 'дня', 'дней']));

    } else {

      activeForm.find(".calc-form-result").slideUp(250);

    }

  }

  if (activeForm.data("index") == 6) {

    var totalPrice = 0;

    if ($("#calc_6_location").val() &&
      (($("#calc_6_purpose").val() && $("#calc_6_purpose option:selected").data("prices")) ||
        ($("#calc_6_purpose").val() && $("#calc_6_bank").val() && !$("#calc_6_bank").is("disabled"))) &&
      $("#calc_6_term").val() &&
      $("#calc_6_report").val() &&
      $("#calc_6_copies").val()) {

      var timeArr = $("#calc_6_other_time").val().split(":");

      if (parseInt(timeArr[0]) < 10 || parseInt(timeArr[0]) > 18) {

        totalPrice += 1000;

      }

      // if ($("#calc_6_purpose option:selected").data("prices")) {
      //
      //   var purposePriceArr = $("#calc_6_purpose option:selected").data("prices");
      //
      //   totalPrice += parseInt(purposePriceArr[$("#calc_6_location").val() - 1]);
      //
      // } else {
      //
      //   var banksPriceArr = $("#calc_6_bank option:selected").data("prices");
      //
      //   totalPrice += parseInt(banksPriceArr[$("#calc_6_location").val() - 1]);
      //
      // }


      totalPrice += parseInt($("#calc_6_report option:selected").data("price"));

      if ($("#calc_6_term").val() == "1") {

        if ($("#calc_6_location").val() == "1") {
          totalPrice += 5000;
        } else if ($("#calc_6_location").val() == "2") {
          totalPrice += 5500;
        } else if ($("#calc_6_location").val() == "3") {
          totalPrice += 6000;
        } else if ($("#calc_6_location").val() == "4") {
          totalPrice += 8000;
        }

      } else if ($("#calc_6_term").val() == "3") {

        if ($("#calc_6_location").val() == "1") {
          totalPrice += 4500;
        } else if ($("#calc_6_location").val() == "2") {
          totalPrice += 5000;
        } else if ($("#calc_6_location").val() == "3") {
          totalPrice += 5500;
        } else if ($("#calc_6_location").val() == "4") {
          totalPrice += 7000;
        }

      }

      if ($("#calc_6_term option:selected").data("factor")) {

        totalPrice *= 2;

        activeForm.find(".calc-result-term").html("Быстрая оценка в течение");
        activeForm.find(".calc-result-term-units").html("дня");
      } else {
        activeForm.find(".calc-result-term").html($("#calc_6_term").val());
        activeForm.find(".calc-result-term-units").html(declOfNum($("#calc_6_term").val(), ['день', 'дня', 'дней']));
      }

      totalPrice += (parseInt($("#calc_6_copies").val()) - 2)*500;

      activeForm.find(".calc-result-price").html(numFormat.to(totalPrice));
      activeForm.find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

      activeForm.find(".calc-form-result").slideDown(250);

      $(".calc-form-result-vis").find(".calc-result-price").html(numFormat.to(totalPrice));
      $(".calc-form-result-vis").find(".calc-result-price-with-discount").html(numFormat.to(Math.floor(parseInt(totalPrice) * .9)));

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

(function($) {
  $.fn.autogrow = function() {
    return this.each(function() {
      var textarea = this;
      $.fn.autogrow.resize(textarea);
      $(textarea).focus(function() {
        textarea.interval = setInterval(function() {
          $.fn.autogrow.resize(textarea);
        }, 500);
      }).blur(function() {
        clearInterval(textarea.interval);
      });
    });
  };
  $.fn.autogrow.resize = function(textarea) {
    var lineHeight = parseInt($(textarea).css('line-height'), 10);
    var lines = textarea.value.split('\n');
    var columns = textarea.cols;
    var lineCount = 0;
    $.each(lines, function() {
      lineCount += Math.ceil(this.length / columns) || 1;
    });
    var height = lineHeight * (lineCount) + 24;
    $(textarea).css('height', height);
  };
})(jQuery);
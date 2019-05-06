document.addEventListener("DOMContentLoaded", function (event) {
  ymaps.ready(function () {

    var myMap = new ymaps.Map('contactsMap', {
        center: [55.720357, 37.631003],
        zoom: 16,
        controls: ['zoomControl']
      }, {}),

      myPlacemark = new ymaps.Placemark([55.720357, 37.634003], {
        hintContent: '',
        balloonContent: ''
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/map-pin.png',
        // Размеры метки.
        iconImageSize: [116, 116],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-58, -58]
      });

    myMap.behaviors.disable('scrollZoom');

    myMap.geoObjects
      .add(myPlacemark);

    $(".contacts-map-btn, .contacts-map-wrapper .close").click(function () {

      setTimeout(function () {
        myMap.container.fitToViewport()
      },100);

    });

    $(window).on("load resize",function () {

      if ($("#mobile-indicator").css("display") == "block") {
        myMap.setCenter([55.718057, 37.634003]);
      } else {
        myMap.setCenter([55.722657, 37.631003]);
      }

    });

  });
});
                      
// Подключение функционала "Чертоги Фрилансера"
import { isMobile, removeClasses, _slideUp, _slideDown, _slideToggle, bodyUnlock, bodyLock, bodyLockStatus } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener('click', function (e) {
  const targetElement = e.target;

  // Показываем выпадающее меню при клике на стрелку
  if (window.innerWidth > 767.98) {
    if (targetElement.classList.contains('menu__arrow') || targetElement.closest('.menu__arrow')) {
      const parent = targetElement.closest('ul');
      removeClasses(parent.querySelectorAll('.menu__item._hover'), "_hover");
      targetElement.closest('.menu__item').classList.add('_hover');
    }
    if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
      removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
    }

    if (targetElement.classList.contains('header-contacts__more') || targetElement.closest('.header-contacts__more')) {
      const parent = targetElement.closest('.header-contacts__item');
      parent.classList.add('_active');
    }
    if (!targetElement.closest('.header-contacts__item') && document.querySelector('.header-contacts__item._active')) {
      document.querySelector('.header-contacts__item._active').classList.remove('_active');
    }
  }

  if (window.innerWidth < 767.98) {
    if (targetElement.closest('.menu__button')) {
      e.preventDefault();
      const arrowParent = targetElement.closest('.menu__item');
      arrowParent.classList.add('_hover');
    }
    if (targetElement.closest('.menu__close')) {
      const arrowParent = targetElement.closest('.menu__item');
      arrowParent.classList.remove('_hover');
    }

    if (targetElement.classList.contains('menu__arrow') || targetElement.closest('.menu__arrow')) {
      const parent = targetElement.closest('.menu__item');
      const list = parent.querySelector('.menu__sub-list');

      parent.classList.toggle('_hover');
      _slideToggle(list);
    }
  }

  if (targetElement.classList.contains('location__button') || targetElement.closest('.location__button')) {
    e.preventDefault();
    targetElement.closest('body').classList.add('_location-active');
  }
  if (document.body.classList.contains('_location-active') && !targetElement.closest('.location')) {
    console.log('qwe');
    targetElement.closest('body').classList.remove('_location-active');
  }
  if ((targetElement.classList.contains('location__close') || targetElement.closest('.location__close'))) {
    document.querySelector('body').classList.remove('_location-active');
  }

  if (targetElement.classList.contains('header-catalog__button') || targetElement.closest('.header-catalog__button')) {
    const parent = targetElement.closest('.header-catalog');
    parent.classList.toggle('_catalog-show');
  }
  if (!targetElement.closest('.header-catalog') && document.querySelector('.header-catalog._catalog-show')) {
    document.querySelector('.header-catalog._catalog-show').classList.remove('_catalog-show');
  }
  if (targetElement.closest('.header-catalog__category')) {
    const parent = targetElement.closest('.header-catalog__card');

    if (window.innerWidth >= 767.98) {
      removeClasses(document.querySelectorAll('.header-catalog__card._active'), "_active");
      parent.classList.add('_active');
    } else {
      parent.classList.add('_card-show');
    }
  }
  if (targetElement.closest('.header-catalog__close')) {
    const parent = targetElement.closest('.header-catalog');
    parent.classList.remove('_catalog-show');
  }
  if (targetElement.closest('.header-catalog__back')) {
    const parent = targetElement.closest('.header-catalog__card');
    parent.classList.remove('_card-show');
  }

  if (targetElement.classList.contains('catalog-tags__button') || targetElement.closest('.catalog-tags__button')) {
    const parent = targetElement.closest('.catalog-tags__more');
    parent.classList.add('_active');
  }
  if (!targetElement.closest('.catalog-tags__more') && document.querySelector('.catalog-tags__more._active')) {
    document.querySelector('.catalog-tags__more._active').classList.remove('_active');
  }

  if (targetElement.classList.contains('catalog__filter-button') || targetElement.closest('.catalog__filter-button') && bodyLockStatus) {
    e.preventDefault();
    document.querySelector('body').classList.add('_filter-show');
    bodyLock();
  }
  if (document.querySelector('body').classList.contains('_filter-show') && !targetElement.closest('.catalog-filter__wrapper') && bodyLockStatus || targetElement.closest('.catalog-filter__close')) {
    document.querySelector('body').classList.remove('_filter-show');
    bodyUnlock();
  }

  if (targetElement.classList.contains('product-item__action') || targetElement.closest('.product-item__action')) {
    e.preventDefault();
  }
})

if (window.innerWidth < 767.98) {
  const menuList = document.querySelectorAll('.menu__sub-list');
  if (menuList.length > 0) {
    menuList.forEach(element => {
      _slideUp(element);
    });

    setTimeout(() => {
      console.log(document.querySelector('#dropdown-menu'));
      _slideDown(document.querySelector('#dropdown-menu'));
    }, 500);
  }
}

const headerBottomRow = document.querySelector('.header-bottom__row');

function calcHeaderLeftIndent(headerBottomRow) {
  const headerBottomRowRect = headerBottomRow.getBoundingClientRect();
  const pixelsFromLeft = headerBottomRowRect.left;
  document.querySelector('.header-catalog__wrapper').style.setProperty('--distance-header-to-left', pixelsFromLeft + 'px');
}

if (headerBottomRow) {
  document.addEventListener('DOMContentLoaded', function () {
    calcHeaderLeftIndent(headerBottomRow);
  })
  window.addEventListener('resize', function () {
    calcHeaderLeftIndent(headerBottomRow);
  })
}
// Работа с noUiSlider
function noUiSliderInit() {
  var sliders = document.querySelectorAll('.range-slider__range');
  var minInputs = document.querySelectorAll('.range-slider__min');
  var maxInputs = document.querySelectorAll('.range-slider__max');

  if (sliders.length > 0) {
    sliders.forEach(function (slider, index) {
      var min = parseInt(slider.getAttribute('data-min'));
      var max = parseInt(slider.getAttribute('data-max'));
      var start = slider.getAttribute('data-start').split(',').map(Number);
      var prefix = slider.getAttribute('data-prefix');

      var rangeSlider = noUiSlider.create(slider, {
        start: start,
        connect: true,
        range: {
          'min': min,
          'max': max
        },
      });

      function formatValue(value, prefix) {
        return Math.round(value) + prefix;
      }

      rangeSlider.on('update', function (values, handle) {
        var value = values[handle];
        if (handle === 0) {
          minInputs[index].value = formatValue(value, prefix);
        } else {
          maxInputs[index].value = formatValue(value, prefix);
        }
      });

      minInputs[index].addEventListener('change', function () {
        rangeSlider.set([this.value.replace(prefix, ''), null]);
      });

      maxInputs[index].addEventListener('change', function () {
        rangeSlider.set([null, this.value.replace(prefix, '')]);
      });
    });
  }
}

window.addEventListener("load", function (e) {
  // Запуск инициализации noUiSlider
  noUiSliderInit();
});
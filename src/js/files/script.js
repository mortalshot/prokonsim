// Подключение функционала "Чертоги Фрилансера"
import { isMobile, removeClasses, _slideUp, _slideDown, _slideToggle, bodyUnlock, bodyLock, bodyLockStatus, bodyLockToggle } from "./functions.js";
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
      if (document.querySelector('.header-contacts__item._active'))
        parent.classList.remove('_active');
      else
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
      arrowParent.classList.toggle('_hover');
      const list = arrowParent.querySelector('.menu__sub-list');
      _slideToggle(list);
    }

    if (targetElement.closest('.menu__close')) {
      const arrowParent = targetElement.closest('.menu__item');
      arrowParent.classList.remove('_hover');
    }

    if (targetElement.classList.contains('header-contacts__more') || targetElement.closest('.header-contacts__more')) {
      const parent = targetElement.closest('.header-contacts__item');
      if (document.querySelector('.header-contacts__item._active'))
        parent.classList.remove('_active');
      else
        parent.classList.add('_active');
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

    if (window.innerWidth <= 767.98) {
      bodyLockToggle();
    }
  }
  if (!targetElement.closest('.header-catalog') && document.querySelector('.header-catalog._catalog-show')) {
    document.querySelector('.header-catalog._catalog-show').classList.remove('_catalog-show');
    bodyUnlock();
  }

  if (targetElement.closest('.header-catalog__close')) {
    const parent = targetElement.closest('.header-catalog');
    parent.classList.remove('_catalog-show');
    bodyUnlock();

    if (window.innerWidth <= 797.98) {
      console.log('qweqwe');
      removeClasses(document.querySelectorAll('.header-catalog__scheme._active'), "_active");
    }
  }
  if (targetElement.closest('.header-catalog__back')) {
    const parent = targetElement.closest('.header-catalog__scheme');
    parent.classList.remove('_active');
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

  if (targetElement.classList.contains('catalog-menu__item') || targetElement.closest('.catalog-menu__item')) {
    const parent = targetElement.closest('.catalog-menu__item');
    removeClasses(document.querySelectorAll('.catalog-menu__item._active'), "_active");
    parent.classList.add('_active');
  } else {
    removeClasses(document.querySelectorAll('.catalog-menu__item._active'), "_active");
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

// Работаем с каталогом в шапке
// Функция, которая обрабатывает клик по кнопке
const headerButtons = document.querySelectorAll('.header-catalog__category');
const headerTabs = document.querySelectorAll('.header-catalog__scheme');

if (headerButtons.length > 0) {
  headerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Скрываем все содержимые элементы
      headerTabs.forEach(body => body.classList.remove('_active'));

      // Убираем классы .active у всех кнопок
      headerButtons.forEach(btn => btn.classList.remove('_active'));

      // Показываем соответствующее содержимое по индексу
      headerTabs[index].classList.add('_active');
      button.classList.add('_active');
    });
  });

  // Обработчик события resize
  function handleResize() {
    if (window.innerWidth < 767.98) {
      headerButtons.forEach(t => t.classList.remove('_active'));
      headerTabs.forEach(b => b.classList.remove('_active'));
    }
  }

  handleResize();
  window.addEventListener('resize', handleResize);
}

const headerBottomRow = document.querySelector('.header-bottom__row');
function calcHeaderLeftIndent(headerBottomRow) {
  const headerBottomRowRect = headerBottomRow.getBoundingClientRect();
  const pixelsFromLeft = headerBottomRowRect.left;
  if (document.querySelector('.header-catalog__wrapper')) {
    document.querySelector('.header-catalog__wrapper').style.setProperty('--distance-header-to-left', pixelsFromLeft + 'px');
  }
}
if (headerBottomRow) {
  document.addEventListener('DOMContentLoaded', calcHeaderLeftIndent(headerBottomRow))
  window.addEventListener('resize', calcHeaderLeftIndent(headerBottomRow))
}

// Вычисляем отступ .header-catalog__wrapper
const header = document.querySelector('.header');
const headerCatalogWrapper = document.querySelector('.header-catalog__wrapper');

function calculateVisibleOffsetAndHeight() {
  const rect = header.getBoundingClientRect();

  let distanceToTop = rect.top;
  const headerHeight = header.offsetHeight;

  const totalDistance = distanceToTop + headerHeight;

  headerCatalogWrapper.style.setProperty('--distance-header-to-top', totalDistance + 'px');
}

if (headerCatalogWrapper) {
  window.addEventListener('scroll', calculateVisibleOffsetAndHeight);
  calculateVisibleOffsetAndHeight();
}

if (document.querySelector('.personal__text .table')) {
  const tableItems = document.querySelectorAll('[data-id]');
  if (tableItems.length > 0) {
    tableItems.forEach(element => {
      _slideUp(element, 0);
    });
  }

  const tableButtons = document.querySelectorAll('[data-link]');
  if (tableButtons.length > 0) {
    tableButtons.forEach(button => {
      button.addEventListener('click', function () {
        button.classList.toggle('_active');
        const dataLinkValue = button.getAttribute('data-link');
        const matchedElements = document.querySelectorAll(`[data-id="${dataLinkValue}"]`);
        matchedElements.forEach(matchedElement => {
          _slideToggle(matchedElement, 0);
        });
      })
    });
  }
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
      rangeSlider.on('change', function (values, handle) {
        var event = new Event("change");
        if (handle === 0) {
          minInputs[index].dispatchEvent(event);
        } else {
          maxInputs[index].dispatchEvent(event);
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
window.noUiSliderInit = noUiSliderInit;

window.addEventListener("load", function (e) {
  // Запуск инициализации noUiSlider
  noUiSliderInit();

  const productSearch = this.document.querySelector('.single-product__search');
  if (productSearch) {
    setTimeout(() => {
      productSearch.classList.add('_show');
    }, 1000);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const productLists = document.querySelectorAll('.product-item__vars');

  if (productLists.length > 0) {
    productLists.forEach(list => {
      const maxVisible = parseInt(list.dataset.items, 10);
      const items = Array.from(list.querySelectorAll('.product-item__var'));
      const showMoreBtn = list.querySelector('.product-item__more');

      if (!showMoreBtn || items.length <= maxVisible) {
        // если элементов меньше или равно — ничего не прячем и кнопку удаляем
        showMoreBtn?.remove();
        return;
      }

      // Скрываем лишние
      for (let i = maxVisible; i < items.length; i++) {
        items[i].hidden = true;
      }

      showMoreBtn.addEventListener('click', () => {
        // Показываем скрытые элементы с анимацией
        for (let i = maxVisible; i < items.length; i++) {
          items[i].hidden = false;
          _slideDown(items[i], 500);
        }
        // Удаляем кнопку
        showMoreBtn.remove();
      });
    });
  }
});

// Пункты выдачи
(function initPickup() {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof ymaps3 === 'undefined') {
      console.error('Yandex Maps 3.0 не подключён');
      return;
    }

    ymaps3.ready.then(() => {
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

      const mapEl = document.getElementById('pickup-map');
      const list = document.querySelector('.pickup__list');
      if (!mapEl || !list) return;

      const points = Array.from(list.querySelectorAll('.point'));
      if (!points.length) return;

      const active = list.querySelector('.point--active') || points[0];

      // Внимание: в ymaps3 координаты в формате [lng, lat] (долгота, широта)!
      const parseCoords = (el) => {
        const raw = (el?.getAttribute('data-coords') || '').trim();
        if (!raw) return null;
        const [lng, lat] = raw.split(',').map(Number);
        return (isFinite(lng) && isFinite(lat)) ? [lng, lat] : null;
      };

      const startCoords = parseCoords(active) || [37.620393, 55.75396]; // центр Мск — фолбэк
      const startZoom = parseFloat(active?.getAttribute('data-zoom') || '14');

      // Инициализация карты
      const map = new YMap(
        mapEl,
        { location: { center: startCoords, zoom: startZoom } },
        [
          new YMapDefaultSchemeLayer({ theme: 'light' }),
          new YMapDefaultFeaturesLayer()
        ]
      );

      // Выбор пункта (из списка или по клику на маркер)
      function selectPoint(li) {
        if (!li) return;

        // Смена активного элемента списка
        points.forEach(p => p.classList.toggle('point--active', p === li));
        // Смена активного маркера
        points.forEach(p => p._markerEl?.classList.toggle('marker--active', p === li));

        // Перелёт/центрирование к координатам
        const coords = parseCoords(li);
        if (coords) {
          const z = parseFloat(li.getAttribute('data-zoom') || startZoom);
          map.update({ location: { center: coords, zoom: z } });
        }

        // Обновляем текст в .cart-delivery__place
        const addressText = li.querySelector('.point__address')?.textContent?.trim() || '';
        const placeEl = document.querySelector('.cart-delivery__place');
        placeEl.style.display = "block";
        if (placeEl && addressText) {
          placeEl.textContent = addressText;
        }
      }

      // Создание маркеров для всех точек
      points.forEach((el) => {
        const coords = parseCoords(el);
        if (!coords) return;

        const pin = document.createElement('div');
        pin.className = 'marker'; // стилизуешь в CSS (.marker и .marker--active)

        // Клик по маркеру — выбираем соответствующий пункт
        pin.addEventListener('click', (ev) => {
          ev.stopPropagation();
          selectPoint(el);
        });

        const marker = new YMapMarker({ coordinates: coords }, pin);
        el._marker = marker;  // ссылка на объект маркера (если пригодится)
        el._markerEl = pin;     // DOM-элемент маркера — для переключения класса
        map.addChild(marker);
      });

      // Активное состояние на старте
      points.forEach(p => p._markerEl?.classList.toggle('marker--active', p === active));

      // Клики по списку — выбирают точку
      list.addEventListener('click', (e) => {
        const li = e.target.closest('.point');
        if (!li) return;
        selectPoint(li);
      });
    });
  });
})();

// Выбираем доставку
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.cart-delivery__item');

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); // чтобы не было лишних триггеров, если внутри label/ссылки

      // снимаем checked у всех
      items.forEach(it => {
        const input = it.querySelector('.cart-delivery__option input[type="radio"], .cart-delivery__option input[type="checkbox"]');
        if (input) input.checked = false;
      });

      // ставим checked у текущего
      const currentInput = item.querySelector('.cart-delivery__option input[type="radio"], .cart-delivery__option input[type="checkbox"]');
      if (currentInput) currentInput.checked = true;
    });
  });
});

// Показываем на мобилках cart-total
(function () {
  const cartTotal = document.querySelector('.cart-total');
  const sidebarMain = document.querySelector('.cart-sidebar__main');

  if (!cartTotal || !sidebarMain) return;

  function toggleCartTotal() {
    if (window.innerWidth >= 1024) {
      cartTotal.classList.remove('_active', 'cart-total--top');
      return;
    }

    const sidebarRect = sidebarMain.getBoundingClientRect();
    const middleY = window.innerHeight / 2;

    // состояние 4: блок полностью ушёл вверх
    if (sidebarRect.bottom <= 0) {
      cartTotal.classList.add('_active', 'cart-total--top');
    }
    // состояние 3: блок виден, но середина экрана уже прошла его верх
    else if (sidebarRect.top <= middleY && sidebarRect.bottom > 0) {
      cartTotal.classList.add('cart-total--top');
      cartTotal.classList.remove('_active');
    }
    // состояние 2: блок в нижней части экрана (мы только начали входить в него)
    else if (sidebarRect.top < window.innerHeight && sidebarRect.top > middleY) {
      cartTotal.classList.remove('_active', 'cart-total--top');
    }
    // состояние 1: ещё не дошли до блока
    else {
      cartTotal.classList.add('_active');
      cartTotal.classList.remove('cart-total--top');
    }
  }

  window.addEventListener('scroll', toggleCartTotal, { passive: true });
  window.addEventListener('resize', toggleCartTotal);
  document.addEventListener('DOMContentLoaded', toggleCartTotal);

  toggleCartTotal();
})();

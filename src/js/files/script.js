// Подключение функционала "Чертоги Фрилансера"
import { isMobile, removeClasses, _slideUp, _slideDown, _slideToggle } from "./functions.js";
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

    if (targetElement.classList.contains('header-catalog__button') || targetElement.closest('.header-catalog__button')) {
      const parent = targetElement.closest('.header-catalog');
      parent.classList.add('_active');
    }
    if (!targetElement.closest('.header-catalog') && document.querySelector('.header-catalog._active')) {
      document.querySelector('.header-catalog._active').classList.remove('_active');
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
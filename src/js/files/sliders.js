/*
Документация по работе в шаблоне:
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

//Подключаем слайдер Swiper с node_modules
//При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
//Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

//Стили Swiper
//Базовые стили
import "../../scss/base/swiper.scss";
//Полный набор стилей с scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
//Полный набор стилей с node_modules
// import 'swiper/css';

//Инициализация слайдеров
function initSliders() {
	//Список слайдеров
	//Проверяем, есть ли слайдер на странице
	if (document.querySelector('.main-slider__slider')) {
		new Swiper('.main-slider__slider', {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация

			pagination: {
				el: '.main-slider__slider .swiper-pagination',
				clickable: true,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.main-slider__slider .swiper-arrow_prev',
				nextEl: '.main-slider__slider .swiper-arrow_next',
			},
			/*
			// Брейкпоинты
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {

			}
		});
	}

	if (document.querySelector('.widget-products__slider')) {
		const widgetSlider = document.querySelectorAll('.widget-products__slider');
		if (widgetSlider.length > 0) {
			widgetSlider.forEach(widgetSlider => {
				const slider = new Swiper(widgetSlider, {
					modules: [Navigation],
					observer: true,
					observeParents: true,
					slidesPerView: 1.2,
					spaceBetween: 20,
					speed: 800,
					watchOverflow: true,

					// Кнопки "влево/вправо"
					navigation: {
						prevEl: widgetSlider.querySelector('.swiper-arrow_prev'),
						nextEl: widgetSlider.querySelector('.swiper-arrow_next'),
					},


					// Брейкпоинты
					breakpoints: {
						480: {
							slidesPerView: 1.5,
							spaceBetween: 20,
						},
						575: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 2.7,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 3.40,
							spaceBetween: 20,
						},
						1280: {
							slidesPerView: 4,
							spaceBetween: 20,
						},
						1480: {
							slidesPerView: 5,
							spaceBetween: 20,
						},
						1640: {
							slidesPerView: 6,
							spaceBetween: 20,
						},
					},

					// События
					on: {

					}
				});
			});
		}
	}

	if (document.querySelector('.widget-events__slider')) {
		new Swiper('.widget-events__slider', {
			modules: [],
			observer: true,
			observeParents: true,
			slidesPerView: 1.14,
			spaceBetween: 20,
			speed: 800,
			watchOverflow: true,

			// Брейкпоинты
			breakpoints: {
				768: {
					slidesPerView: 2.25,
					spaceBetween: 20,
				},
				1280: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},

			// События
			on: {

			}
		});
	}
}
//Скролл на базе слайдера (по классу swiper scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	//Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});
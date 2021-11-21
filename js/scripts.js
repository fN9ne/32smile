function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else{
		document.querySelector('body').classList.add('no-webp');
	}
});;
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');
//Слушаем изменение размера экрана
window.addEventListener('resize', move);
//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}
//Вызываем функцию
move();
*/;
$(document).ready(function(){
	let input = $('.input');
	let textarea = $('.textarea');
	for (let i = 0; i < textarea.length; i++) {
		let curr = textarea.eq(i);
		let field = curr.find('textarea');
		let label = curr.find('label');
		let max = field.attr('maxlength');
		let field_length;
		let remained = $('#remained');
		field.on('input', function() {
			field_length = field.val().length;
			remained.html(max - field_length);
			if (field_length !== 0) {
				label.addClass('_active');
			} else {
				label.removeClass('_active');
			}
		});
	}
	for (let i = 0; i < input.length; i++) {
		let curr = input.eq(i);
		let field = curr.find('input');
		let label = curr.find('label');
		field.on('blur focus input', function() {
			if ($(this).is(':focus')) {
				curr.addClass('_active');
			} else {
				if ($(this).val().length == 0) {
					curr.removeClass('_active');
				}
			}
		});
	}
	/* header */
	let burger = $('.header__burger');
	burger.click(function() {
		$(this).toggleClass('_active');
		$('.burger-content').toggleClass('_active');
		$('body').toggleClass('_lock');
		if ($('.cart').hasClass('_active')) $('body').addClass('_lock');
		$('.cart').removeClass('_active');
		$('.header__cart').removeClass('_active');
	});
	/* dropdown */
	let dropdown = $('.burger-content__dropdown');
	dropdown.click(function() {
		if (!$(this).hasClass('_active')) {
			dropdown.removeClass('_active');
			$(this).addClass('_active');
		} else {
			$(this).removeClass('_active');
		}
	});
	$(document).click(function(e) {
		if (!e.target.closest('.burger-content__dropdown')) {
			dropdown.removeClass('_active');
		}
	});
	$('#year').html(new Date().getFullYear());
	// home page
	if ($('.stocks').length > 0) {
		let arrow = $('.stocks-arrow');
		let viewport = $('.stocks__wrapper');
		let slide = $('.stocks__column');
		let width;
		let currentSlide = 0;
		let slidesQty = slide.length;
		let slidesToView;
		calcSlidesView();
		$(window).resize(calcSlidesView);
		function calcSlidesView() {
			width = slide.css('width')
			width = parseFloat(width);
			viewport.css('transform', `translate(-${width * currentSlide}px, 0)`)
			if ($(window).width() > 992) {
				currentSlide = 0;
				viewport.removeAttr('style');
			}
			if ($(window).width() > 768) {
				slidesToView = 3;
				viewport.css('transform', `translate(-${width * currentSlide}px, 0)`)
			} else {
				slidesToView = 2;
				viewport.css('transform', `translate(-${width * currentSlide}px, 0)`)
			}
		}
		width = parseFloat(width);
		arrow.click(function() {
			if ($(this).hasClass('stocks-prev')) {
				/* назад */
				if (currentSlide !== 0) currentSlide--;
			} else {
				/* вперёд */
				if (currentSlide < slidesQty - slidesToView) currentSlide++;
			}
			viewport.css('transform', `translate(-${width * currentSlide}px, 0)`)
		});
	}
	for (let i = 0; i < $('.stars').length; i++) {
		let stars = $('.stars').eq(i);
		let star = stars.find('.star');
		star.on('click', function() {
			let this_rating = $(this).attr('data-rating');
			$('.star').not('_active').removeClass('_active')
			if ($(this).hasClass('_active')) {
			} else if (!$(this).hasClass('_active')) {
				$('.star').removeClass('_active')
				$(this).addClass('_active');
			}
			stars.attr('data-rating', this_rating);
			if ($('.star._active').length == 0) {
				stars.attr('data-rating', 0);
			}
		});
	}
	if ($('.popup').length > 0) {
		$('.popup__close, .popup__continue').on('click', function() {
			$(this).closest('.popup').removeClass('_active');
			$('body').removeClass('_lock');
		});
	}
	/* cart */
	$('.header__cart').on('click', function() {
		$('html, body').animate({scrollTop: 0}, 500, 'swing');
		$(this).toggleClass('_active');
		$('.cart').toggleClass('_active');
		$('body').toggleClass('_lock');
		if ($('.header__burger').hasClass('_active')) $('body').addClass('_lock');
		$('.header__burger').removeClass('_active');
		$('.burger-content').removeClass('_active');
	});
	/* следующая часть кода написана по пролетарски и требует корректировки */
	/* catalog sorting */
	if ($('.catalog-sort').length > 0) {
		let btn = $('.catalog-sort__btn');
		let list_item = $('.catalog-sort__list').find('li');
		list_item.on('click', function() {
			let sort_btn = $('.catalog-mobile__sort');
			let sort_cnt = $('.catalog-sort');
			let area = $('.catalog__area');
			let filters = $('.catalog-mobile__filter-btns');
			let actions = $('.catalog-mobile__actions');
			filters.toggleClass('_hide');
			actions.toggleClass('_hide');
			btn.parent().removeClass('_active');
			sort_btn.removeClass('_active');
			sort_cnt.removeClass('_active');
			area.removeClass('_active');
		});
		btn.on('click', function() {
			btn.parent().toggleClass('_active');
		});
		emptyClickSort();
		$(window).on('resize', function() {
			emptyClickSort();
		});
		function emptyClickSort() {
			if ($(window).width() > 768) {
				$(document).on('click', function(e) {
					if (!e.target.closest('.catalog-sort')) $('.catalog-sort').removeClass('_active');
				});
			} else {
				$(document).unbind('click');
			}
		}
	}
	/* catalog filters */
	if ($('.catalog-mobile').length > 0 && $(window).width() <= 768) {
		let filter_btn = $('.catalog-mobile__filter');
		let sort_btn = $('.catalog-mobile__sort');
		let filter_cnt = $('.catalog-filter');
		let sort_cnt = $('.catalog-sort');
		let filters = $('.catalog-mobile__filter-btns');
		let actions = $('.catalog-mobile__actions');
		let submit = $('.catalog-mobile__submit');
		let cancel = $('.catalog-mobile__cancel');
		let area = $('.catalog__area');
		filter_btn.on('click', function() {
			filter_btn.addClass('_active');
			filter_cnt.addClass('_active');
			area.toggleClass('_active');
			filters.toggleClass('_hide');
			actions.toggleClass('_hide');
		});
		sort_btn.on('click', function() {
			sort_btn.addClass('_active');
			sort_cnt.addClass('_active');
			filters.toggleClass('_hide');
			actions.toggleClass('_hide');
			area.toggleClass('_active');
		})
		submit.on('click', function() {
			filters.toggleClass('_hide');
			actions.toggleClass('_hide');
			if (filter_btn.hasClass('_active')) filterSubmit();
			else if (sort_btn.hasClass('_active')) sortSubmit();
			sortClose();
			filterClose();
		});
		cancel.on('click', function() {
			filters.toggleClass('_hide');
			actions.toggleClass('_hide');
			sortClose();
			filterClose();
		});
		function sortClose() {
			sort_btn.removeClass('_active');
			sort_cnt.removeClass('_active');
			area.removeClass('_active');
		}
		function filterClose() {
			filter_btn.removeClass('_active');
			filter_cnt.removeClass('_active');
			area.removeClass('_active');
		}
		function filterSubmit() {
			console.log('filter');
		}
		function sortSubmit() {
			console.log('sort');
		}
	}
	/* product card slider */
	if ($('.product').length > 0) {
		new Swiper('.product__slider', {
			navigation: {
				nextEl: '.product__slider-next',
				prevEl: '.product__slider-prev',
			},
			pagination: {
				el: '.product__pagination',
				clickable: true,
			},
		});
	}
	function popupActive(btn, popup) {
		if (btn.length > 0) {
			btn.on('click', function() {
				popup.addClass('_active');
			});
		}
	}
	popupActive($('.link-bb1c'), $('.popup__bb1c'))
	popupActive($('.link-feedback'), $('.popup__review'))
	if ($('.product-tabs').length > 0) {
		let tab = $('.product-tabs__tab');
		let slide = $('.product-tabs__slide');
		tab.on('click', function() {
			tab.removeClass('_current');
			$(this).addClass('_current');
			slide.removeClass('_current');
			slide.eq($(this).index()).addClass('_current');
		});
	}
});
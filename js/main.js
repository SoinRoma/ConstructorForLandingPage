/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})
*/

// Функция для создания елементов
const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}
	return element;
}

// Функция для создания шапки страницы
const createHeader = (param) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (param.header.logo) {
		const logo = getElement('img', ['logo'], {
			src: param.header.logo,
			alt: 'Логотип' + param.title,
		});
		wrapper.append(logo);
	}

	if (param.header.menu) {
		const menuWrapper = getElement('nav', ['menu-list']);
		const allMenuLinks = param.header.menu.map(item => {
			const menuLink = getElement('a', ['menu-link']);
			menuLink.href = item.link;
			menuLink.textContent = item.title;
			return menuLink;
		});
		menuWrapper.append(...allMenuLinks);
		wrapper.append(menuWrapper);
	}

	if (param.header.social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = param.header.social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));
			socialLink.href = item.link;
			return socialLink;
		})
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);
	return header;

};

// Главная функция для создания конструктора сайта
// Передаём ей selector - то во что будем вставлять елементы
// и options - сами элементы
const сonstructor = (selector, options) => {

	document.title = options.title;
	const app = document.querySelector(selector);
	app.classList.add('body-app')
	
	if (options.header) {
		app.append(createHeader(options));
	}


};


// Вызов главной функции. Здесь пользователь сам прописывает что нужно и как.
сonstructor('.app', {
	title: 'Ведьмак - главная страница',
	header: {
		logo: 'witcher/logo.png',
		menu: [
			{
				link: '#',
				title: 'Описание',
			},
			{
				link: '#',
				title: 'Трейлер',
			},
			{
				link: '#',
				title: 'Отзывы',
			},
		],
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com',
				image: 'witcher/social/twitter.svg'
			},
			{
				title: 'Instagram',
				link: 'https://instagram.com',
				image: 'witcher/social/instagram.svg'
			},
			{
				title: 'Facebook',
				link: 'https://facebook.com',
				image: 'witcher/social/facebook.svg'
			}
		]
	}

});
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
const createHeader = ({ title, header: { logo, menu, social } }) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	header.append(container);
	const wrapper = getElement('div', ['header']);
	container.append(wrapper);

	if (logo) {
		const logotip = getElement('img', ['logo'], {
			src: logo,
			alt: 'Логотип' + title,
		});
		wrapper.append(logotip);
	}

	if (menu) {
		const menuWrapper = getElement('nav', ['menu-list']);
		const allMenuLinks = menu.map(item => {
			const menuLink = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title,
			});
			return menuLink;
		});
		menuWrapper.append(...allMenuLinks);
		wrapper.append(menuWrapper);

		const button = getElement('button', ['menu-button']);
		button.addEventListener('click', () => {
			button.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});
		container.append(button);
	}

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
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
	return header;
};

// Функция для создания главной части страницы
const createMain = ({title, main: {genre, rating, mainTitle, description, trailer, slider}}) => {
	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	const series = getElement('div', ['series']);
	container.append(wrapper, series);
	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {
			textContent: genre,
		});
		content.append(genreSpan);
	}

	if (rating) {
		const ratingDiv = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);

		for (let i = 0; i < 10; i++){
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg',
			});

			ratingStars.append(star);
		}
		const ratingNumber = getElement('div', ['rating-number'], {
			textContent: `${rating}/10`,
		});
		ratingDiv.append(ratingStars, ratingNumber);
		content.append(ratingDiv);
	}

	if (mainTitle) {
		const titleMain = getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
			textContent: mainTitle,
		});
		content.append(titleMain);
	}
	
	if (description) {
		const descr = getElement('p', ['main-description', 'animated', 'fadeInRight'], {
			textContent: description,
		});
		content.append(descr);
	}

	if (trailer) {
		const trailerLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], {
			textContent: 'Смотреть трейлер',
			href: trailer,
		});

		const mainLink = getElement('a', ['play', 'youtube-modal'], {
			href: trailer,
		});

		const icon = getElement('img', ['play-img'], {
			alt: 'play',
			src: 'img/play.svg',
		});

		mainLink.append(icon);
		wrapper.append(mainLink);
		content.append(trailerLink);
	}

	if (slider) {
		const container = getElement('div', ['swiper-container']);
		const buttonArrow = getElement('button', ['arrow']);
		const wrapper = getElement('div', ['swiper-wrapper']);
		
		const slides = slider.map(item => {
			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: item.subtitle,
			});
			const cardDescription = getElement('figcaption', ['card-description']);
			const cardSubtitle = getElement('p', ['card-subtitle'], {
				textContent: item.subtitle,
			});
			const cardTitle = getElement('p', ['card-title'], {
				textContent: item.title,
			});

			cardDescription.append(cardSubtitle, cardTitle);
			card.append(cardImage, cardDescription);
			swiperSlide.append(card);
			return swiperSlide;
		})

		wrapper.append(...slides);
		container.append(wrapper);
		series.append(container, buttonArrow);

		// Функция для работы слайдера
		new Swiper(container, {
			loop: true,
			navigation: {
				nextEl: buttonArrow,
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




	}
	
	return main;
};

// Функция для создания подвала сайта
const createFooter = ({title, footer: {copyright, footerLink}}) => {
	const footer = getElement('footer', ['footer']);
	const container = getElement('div', ['container']);
	footer.append(container);
	const content = getElement('div', ['footer-content']);
	container.append(content);
	const left = getElement('div', ['left']);
	const right = getElement('div', ['right']);
	content.append(left, right);

	if (copyright) {
		const copyrightSpan = getElement('span', ['copyright'], {
			textContent: copyright,
		});
		left.append(copyrightSpan);
	}

	if (footerLink) {
		const nav = getElement('nav', ['footer-menu']);
		const footerLinks = footerLink.map(item => {
			const link = getElement('a', ['footer-link'], {
				href: '#',
				textContent: item.link,
			});
			return link;
		});
		nav.append(...footerLinks);
		right.append(nav);

	}
	return footer;
};

// Главная функция для создания конструктора сайта
// Передаём ей selector - то во что будем вставлять елементы
// и options - сами элементы
const сonstructor = (selector, options) => {

	const app = document.querySelector(selector);
	app.classList.add('body-app')
	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : '';
	
	document.title = options.title;

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const icon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
		});
		document.head.append(icon);
	}
	
	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}

	if (options.footer) {
		app.append(createFooter(options));
	}

};


// Вызов главной функции. Здесь пользователь сам прописывает что нужно и как.
сonstructor('.app', {
	title: 'Ведьмак - главная страница',
	background: 'witcher/background.jpg',
	favicon: 'witcher/logo.png',
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
	},
	main: {
		genre: '2019, фэнтези',
		rating: '8',
		mainTitle: 'Ведьмак',
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		slider: [
			{
				img: 'witcher/series/series-1.jpg',
				title: 'Начало конца',
				subtitle: 'Серия №1',

			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Четыре марки',
				subtitle: 'Серия №2',

			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Предательская луна',
				subtitle: 'Серия №3',

			},
			{
				img: 'witcher/series/series-4.jpg',
				title: 'Банкеты, ублюдки и похороны',
				subtitle: 'Серия №4',

			},
		]
	},
	footer: {
		copyright: '© 2020 The Witcher. All right reserved.',
		footerLink: [
			{link: 'Privacy Policy',},
			{link: 'Terms of Service',},
			{link: 'Legal',},
		]

	},

});
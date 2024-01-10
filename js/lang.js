import data from '../data/data.js'

const allLangs = ['en', 'hi', 'es']
let currentLang = 'en'

const urlParametr = new URLSearchParams(window.location.search)
const urlLang = urlParametr.get('lang')

if (urlLang && allLangs.includes(urlLang)) {
	localStorage.setItem('lang', urlLang)
	document.cookie = `lang=${urlLang}`
	currentLang = urlLang
} else if (localStorage.getItem('lang')) {
	currentLang = localStorage.getItem('lang')
} else if (document.cookie.includes('lang=')) {
	const cookies = document.cookie.split(';')
	for (const cookie of cookies) {
		const [name, value] = cookie.trim().split('=')
		if (name === 'lang') {
			currentLang = value
			break
		}
	}
} else {
	currentLang = 'en'
}

// const enButton = document.querySelector('.en')
// const hiButton = document.querySelector('.hi')

// function changeLang(lang) {
//   // Remove "active" class from all language buttons
//   document.querySelectorAll('.langbar__item').forEach((item) => {
//     item.classList.remove('active')
//   })

//   // Set "active" class to the clicked language button
//   currentLang = lang
//   enButton.classList.toggle('active', lang === 'en')
//   hiButton.classList.toggle('active', lang === 'hi')

//   render()
// }

// enButton.addEventListener('click', () => changeLang('en'))
// hiButton.addEventListener('click', () => changeLang('hi'))

const enButton = document.querySelector('.en')
const hiButton = document.querySelector('.hi')
const esButton = document.querySelector('.es')

function changeLang(lang) {
	// Remove "active" class from all language buttons
	document.querySelectorAll('.langbar__item').forEach(item => {
		item.classList.remove('active')
	})

	// Set "active" class to the clicked language button
	currentLang = lang
	enButton.classList.toggle('active', lang === 'en')
	hiButton.classList.toggle('active', lang === 'hi')
	esButton.classList.toggle('active', lang === 'es')

	// Store the selected language in localStorage
	localStorage.setItem('lang', lang)

	// Store the selected language in cookies
	document.cookie = `lang=${lang}`

	render()
}

enButton.addEventListener('click', () => changeLang('en'))
hiButton.addEventListener('click', () => changeLang('hi'))
esButton.addEventListener('click', () => changeLang('es'))

const htmlElement = document.querySelector('html')
const page = document.querySelector('meta[name="page"]').content

function render() {
	htmlElement.setAttribute('lang', data.lang[currentLang])
	switch (page) {
		case 'index':
			// document.title = data.title[currentLang]
			document.querySelector('[data-lang="header"]').innerHTML = data.header[currentLang]
			document.querySelector('[data-lang="description"]').innerHTML = data.description[currentLang]

			document.querySelector('[data-lang="name"]').setAttribute('placeholder', data.name[currentLang])
			document.querySelector('[data-lang="account"]').setAttribute('placeholder', data.account[currentLang])
			document.querySelector('[data-lang="emailTelegram"]').setAttribute('placeholder', data.emailTelegram[currentLang])
			document.querySelector('[data-lang="contact"]').setAttribute('placeholder', data.contact[currentLang])

			document.querySelector('[data-lang="name"]').setAttribute('title', data.name[currentLang])
			document.querySelector('[data-lang="account"]').setAttribute('title', data.account[currentLang])
			document.querySelector('[data-lang="emailTelegram"]').setAttribute('title', data.emailTelegram[currentLang])
			document.querySelector('[data-lang="contact"]').setAttribute('title', data.contact[currentLang])

			document.querySelector('[data-lang="success"]').innerHTML = data.success[currentLang]
			document.querySelector('[data-lang="error"]').innerHTML = data.error[currentLang]

			document.querySelector('[data-lang="button"]').innerHTML = data.button[currentLang]
			break
		case 'accepted':
			document.querySelector('[data-lang="header-accepted"]').innerHTML = data.headerAccepted[currentLang]
			document.querySelector('[data-lang="description-accepted"]').innerHTML = data.descriptionAccepted[currentLang]
			document.querySelector('[data-lang="button-accepted"]').innerHTML = data.buttonAccepted[currentLang]
			break
	}
	// switch (currentLang) {
	// 	case 'en':
	// 		enButton.classList.add('active')
	// 		hiButton.classList.remove('active')
	// 		esButton.classList.remove('active')
	// 		break
	// 	case 'hi':
	// 		hiButton.classList.add('active')
	// 		enButton.classList.remove('active')
	// 		esButton.classList.remove('active')
	// 		break
	// 	case 'es':
	// 		esButton.classList.add('active')
	// 		enButton.classList.remove('active')
	// 		hiButton.classList.remove('active')
	// 		break
	// }
	const languageButtons = {
		en: enButton,
		hi: hiButton,
		es: esButton,
	}

	for (const lang in languageButtons) {
		const button = languageButtons[lang]
		button.classList.toggle('active', lang === currentLang)
	}
}

render()

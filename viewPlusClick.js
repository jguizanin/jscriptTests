function isInViewport(el) {
    let rect = el.querySelector('span').getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )}

const itemList = Array.from(document.querySelectorAll('.prod_link'))
const alreadyShown = []
let newPrint = []

let pageType = window.location.href
if (pageType.includes('home')) pageType = 'home'
else if (pageType.includes('category')) pageType = 'category'
else if (pageType.includes('search')) pageType = 'search'
else pageType = 'unknown page'

document.addEventListener('scroll', function() {	
	for (let i = 0; i < itemList.length; i++) {
		if ((isInViewport(itemList[i])) && !(alreadyShown.includes(itemList[i].getAttribute('href')))) {
			alreadyShown.push(itemList[i].getAttribute('href'))
			newPrint.push(itemList[i])
		}
	}
	setTimeout(function() { 
		if (newPrint.length != 0) {
			console.group('View')
			console.log(pageType, newPrint)
			console.groupEnd()
		}
		newPrint = []
	}, 500)
})

for (let j = 0; j < itemList.length; j++) {
	itemList[j].querySelector('span').addEventListener('click', function() {
		console.group('Click')
		console.log(pageType, [{
			URL_prod: itemList[j].getAttribute('href'),
			URL_img: itemList[j].querySelector('img').src,
			ID: itemList[j].getAttribute('href').split('=')[1],
			Nome: itemList[j].querySelector('h2').textContent,
			Preço: itemList[j].querySelector('h3').textContent.split('R$ ')[1].replaceAll('.', '').replace(',', '.'),
		}])
		console.groupEnd()
	})
}

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

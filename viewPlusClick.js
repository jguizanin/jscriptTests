function isInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )}

const itemList = document.querySelectorAll('.prod_link')
const alreadyShown = []
const newPrint = []

document.addEventListener('scroll', function() {
	let pageType = window.location.href
	switch (pageType) {
		case pageType.includes(home):
			pageType = home
			break
		case pageType.includes(category):
			pageType = category
			break
		case pageType.includes(search):
			pageType = search
			break
	}
	
	for (let i = 0; i <= itemList.length; i++) {
		if ((isInViewport(itemList[i])) && !(alreadyShown.includes(itemList[i].getAttribute('href')))) {
			alreadyShown.append(itemList[i].getAttribute('href'))
			newPrint.append(itemList[i])
		}
	}
	
	console.group('View')
	console.log(pageType, newPrint)
	console.groupEnd()
})

if (document.readyState == 'complete') activateTracker()
else window.addEventListener('load', activateTracker)

function activateTracker() {
	let newPrint = []
	const alreadyShown = []	
	const pageType = whichPage()
	const itemList = document.querySelectorAll('.prod_link')

	for (let i = 0; i < itemList.length; i++) {
		if ((isInViewport(itemList[i])) && !(alreadyShown.includes(itemList[i].getAttribute('href')))) {
			alreadyShown.push(itemList[i].getAttribute('href'))
			newPrint.push(itemList[i])
		}
	}

	if (newPrint.length != 0)
        showResults(newPrint, pageType, 'LoadView')
	newPrint = []
	
	document.addEventListener('scroll', function() {	
		for (let i = 0; i < itemList.length; i++) {
			if ((isInViewport(itemList[i])) && !(alreadyShown.includes(itemList[i].getAttribute('href')))) {
				alreadyShown.push(itemList[i].getAttribute('href'))
				newPrint.push(itemList[i])
			}
		}
		setTimeout(function() { 
			if (newPrint.length != 0)
                showResults(newPrint, pageType, 'ScrollView')
			newPrint = []
		}, 500)
	})
	
    for (let j = 0; j < itemList.length; j++) {
		itemList[j].addEventListener('click', function() {
		showResults([itemList[j]], pageType, 'Click') })
	}
}

function isInViewport(element) {
	let rect = element.querySelector('span').getBoundingClientRect()
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	)}

function whichPage() {
	let pageURL = window.location.href
	const pageIdentifier = ['home', 'category', 'search']
	for (let i = 0; i < pageIdentifier.length; i++)
	    if (pageURL.includes(pageIdentifier[i])) return pageIdentifier[i]
	return 'unknown page'
}

function showResults(toPrint, pageType, eventType) {
	console.group(eventType)
	console.log(pageType)
	for (let i = 0; i < toPrint.length; i++) {
		console.log([{
			URL_prod: toPrint[i].getAttribute('href'),
			URL_img: toPrint[i].querySelector('img').src,
			ID: toPrint[i].getAttribute('href').split('=')[1],
			Nome: toPrint[i].querySelector('h2').textContent,
			Preço: toPrint[i].querySelector('h3').textContent.split('R$ ')[1].replaceAll('.', '').replace(',', '.'),
		}])
	}
	console.groupEnd()
}

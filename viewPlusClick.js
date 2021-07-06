window.addEventListener('load', function() {
	let newPrint = []
	const alreadyShown = []
	const itemList = Array.from(document.querySelectorAll('.prod_link'))
		
	let pageType = window.location.href
	if (pageType.includes('home')) pageType = 'home'
	else if (pageType.includes('category')) pageType = 'category'
	else if (pageType.includes('search')) pageType = 'search'
	else pageType = 'unknown page'
		
	for (let i = 0; i < itemList.length; i++) {
		if ((isInViewport(itemList[i])) && !(alreadyShown.includes(itemList[i].getAttribute('href')))) {
			alreadyShown.push(itemList[i].getAttribute('href'))
			newPrint.push(itemList[i])
		}
	}
	if (newPrint.length != 0) {
		console.group('View')
		console.log(pageType)
		for (let k = 0; k < newPrint.length; k++) {
			console.log([{
				URL_prod: newPrint[k].getAttribute('href'),
				URL_img: newPrint[k].querySelector('img').src,
				ID: newPrint[k].getAttribute('href').split('=')[1],
				Nome: newPrint[k].querySelector('h2').textContent,
				Preço: newPrint[k].querySelector('h3').textContent.split('R$ ')[1].replaceAll('.', '').replace(',', '.'),
			}])
		}
		console.groupEnd()
	}
	newPrint = []
	
	function isInViewport(el) {
	    let rect = el.querySelector('span').getBoundingClientRect()
	    return (
	        rect.top >= 0 &&
	        rect.left >= 0 &&
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	    )}
	
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
				console.log(pageType)
				for (let k = 0; k < newPrint.length; k++) {
					console.log([{
						URL_prod: newPrint[k].getAttribute('href'),
						URL_img: newPrint[k].querySelector('img').src,
						ID: newPrint[k].getAttribute('href').split('=')[1],
						Nome: newPrint[k].querySelector('h2').textContent,
						Preço: newPrint[k].querySelector('h3').textContent.split('R$ ')[1].replaceAll('.', '').replace(',', '.'),
					}])
				}
				console.groupEnd()
			}
			newPrint = []
		}, 500)
	})
	
	for (let j = 0; j < itemList.length; j++) {
		itemList[j].querySelector('span').addEventListener('click', function(item) {
			console.group('Click')
			console.log(pageType, [{
				URL_prod: this.parentElement.getAttribute('href'),
				URL_img: this.parentElement.querySelector('img').src,
				ID: this.parentElement.getAttribute('href').split('=')[1],
				Nome: this.parentElement.querySelector('h2').textContent,
				Preço: this.parentElement.querySelector('h3').textContent.split('R$ ')[1].replaceAll('.', '').replace(',', '.'),
			}])
			console.groupEnd()
		})
	}
})

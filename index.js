// Published on https://cloudflare-internship-2020.nitzmistry.workers.dev


/**
 * handleRequest sends a POST request with JSON data and
 * and reads in the response body.
 * @param {Request} request the incoming request
 */
const url = 'https://cfw-takehome.developers.workers.dev/api/variants'
var variants =''
const NAME = 'cloudflare-internship-2020'
async function handleRequest(request) {
	const init = {
	  headers: {
		'content-type': 'application/json;charset=UTF-8',
	  },
	}
	// 1. Request the URLs from the API (Requirements)
	const response = await fetch(url, init)
	const results = await gatherResponse(response)
	var json = JSON.parse(results);
	variants = json.variants
	
	
	const VARIANT0 = new Response(variants[0])
	const VARIANT1 = new Response(variants[1])
	
	const cookie = request.headers.get('cookie')
	
	// 2. Request a (random: see #3) variant (Requirements)
	var resp ='' ;
	var variant_type = ''; 
	if (cookie && cookie.includes(`${NAME}=variant1`)) {
		let res = await fetch(variants[0])
		variant_type = 'variant1'
		return new HTMLRewriter()
		.on('title', new ElementHandler(variant_type))
		.on('h1',new ElementHandler(variant_type))
		.on('p',new ElementHandler(variant_type))
		.on('a',new ElementHandler(variant_type))
		.on('a',new ElementHandler(variant_type))
		.transform(res)

	} else if (cookie && cookie.includes(`${NAME}=variant2`)) {
		let res = await fetch(variants[1])
		variant_type = 'variant2'
		return new HTMLRewriter()
		.on('title', new ElementHandler(variant_type))
		.on('h1',new ElementHandler(variant_type))
		.on('p',new ElementHandler(variant_type))
		.on('a',new ElementHandler(variant_type))
		.on('a',new ElementHandler(variant_type))
		.transform(res)
		
	} else{
		// 3. Distribute requests between variants (Requirements)
		let variant_type = Math.random() < 0.5 ? 'variant1' : 'variant2'
		let response1 = variant_type === 'variant1' ? variants[0] : variants[1]
		let res = await fetchHTML(response1,variant_type)
		return new HTMLRewriter()
		.on('title', new ElementHandler(variant_type))
		.on('h1',new ElementHandler(variant_type))
		.on('p',new ElementHandler(variant_type))
		.on('a',new ElementHandler(variant_type))
		.on('a',new ElementHandler(variant_type))
		.transform(res)
	}
  }

  async function fetchHTML(url,type){
	// 2. Persisting variants (Extra Credit)
	const init = {
		headers: {
		  'content-type': 'text/html;charset=UTF-8',
		  'Set-Cookie': `${NAME}= ${type}; path=/`,
		},
	  }
	  const response = await fetch(url, init)
	  const results = await gatherResponse(response)
	  return new Response(results, init)
  }
  addEventListener('fetch', event => {
	return event.respondWith(handleRequest(event.request))
  })

  // 1. Changing copy/URLs (Extra Credit)
  class ElementHandler {
	  
	constructor(elementName){
		this.elementName = elementName
	}
	element(element) {
		if(this.elementName === 'variant1' ){
			if(element.tagName=='title'){
				element.setInnerContent('LinkedIn : Nitesh Mistry')
			}
			else if(element.tagName=='h1'){
				element.setInnerContent('My LinkedIn Profile')
			}
			else if(element.tagName=='p'){
				element.setInnerContent('Get to know more about me through my LinkedIn profile!')
			}
			else if(element.tagName=='a'){
				const attribute = element.getAttribute('href')
				const OLD_URL = 'https://cloudflare.com'
				const NEW_URL = 'https://www.linkedin.com/in/nitesh-mistry/'
				 if(attribute){
					element.setAttribute('href', attribute.replace(OLD_URL, NEW_URL))
				}
				element.setInnerContent('Visit my LinkedIn Profile')
			}
			else{
				  element.setInnerContent('Nitesh')
			}

		}else{
			if(element.tagName=='title'){
				element.setInnerContent('GitHub : Nitesh Mistry')
			}
			else if(element.tagName=='h1'){
				element.setInnerContent('My GitHub Profile')
			}
			else if(element.tagName=='p'){
				element.setInnerContent('Get to know more about my coding side through my GitHub profile!')
			}
			else if(element.tagName=='a'){
				const attribute = element.getAttribute('href')
				const OLD_URL = 'https://cloudflare.com'
				const NEW_URL = 'https://github.com/NiteshMistry/'
				 if(attribute){
					element.setAttribute('href', attribute.replace(OLD_URL, NEW_URL))
				}
				element.setInnerContent('Visit my GitHub Profile')
			}
			else{
				  element.setInnerContent('Mistry')
			}
		}
			
	}
	
  }
  
  
  /**
   * gatherResponse awaits and returns a response body as a string.
   * Use await gatherResponse(..) in an async function to get the response body
   * @param {Response} response
   */
  async function gatherResponse(response) {
	const { headers } = response
	const contentType = headers.get('content-type')
	if (contentType.includes('application/json')) {
	  return JSON.stringify(await response.json())
	} else if (contentType.includes('application/text')) {
	  return await response.text()
	} else if (contentType.includes('text/html')) {
	  return await response.text()
	} else {
	  return await response.text()
	}
  }
  
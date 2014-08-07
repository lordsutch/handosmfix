var shieldID = 0

if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
	value: function (searchString, position) {
	    var subjectString = this.toString();
	    if (position === undefined || position > subjectString.length) {
		position = subjectString.length;
	    }
	    position -= searchString.length;
	    var lastIndex = subjectString.indexOf(searchString, position);
	    return lastIndex !== -1 && lastIndex === position;
	}
    });
}

var abbreviations = {
    'Alternate' : 'ALT',
    'Business' : 'BUS',
    'Connector' : 'CONN',
    'Loop' : 'LOOP',
    'Truck' : 'TRUCK',
    'Bypass' : 'BYP',
    'Temporary' : 'TEMP',
    'Toll' : 'TOLL',
    'Spur' : 'SPUR'
}
var abbrlist = Object.keys(abbreviations)

function makeBusinessInterstateShield(tags) {
    var digits = tags.ref.toString().length
    var boxwidth = (digits > 2 ? 60 : 48)
    var textpos = boxwidth/2

    var font = (digits > 2 ? "Roboto Condensed" : "Roboto")
    var weight = (digits > 2 ? "400" : "500")

    var shield = (digits > 2 ? wideIShieldShape : narrowIShieldShape)

    // Recolor
    shield = shield.replace(/fill:#(003f87|af1e2d)/ig, 'fill:#006b54')

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 '+boxwidth+' 48">'+shield+'<text x="'+textpos+'px" y="34px" text-anchor="middle" font-size="28px" font-family="'+font+'" font-weight="'+weight+'" fill="white">'+encodeXML(tags.ref)+'</text></svg>'
}

function makeQuebecAutorouteShield(tags) {
    var digits = tags.ref.toString().length

    var font = (digits > 2 ? "Roboto Condensed" : "Roboto")
    var weight = (digits > 2 ? "400" : "500")

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 48 48">'+quebecAutorouteShieldShape+'<text x="24px" y="34px" text-anchor="middle" font-size="28px" font-family="'+font+'" font-weight="'+weight+'" fill="white">'+encodeXML(tags.ref)+'</text></svg>'
}

function makeInterstateShield(tags) {
    var digits = tags.ref.toString().length
    var boxwidth = (digits > 2 ? 60 : 48)
    var textpos = boxwidth/2

    var font = (digits > 2 ? "Roboto Condensed" : "Roboto")
    var weight = (digits > 2 ? "400" : "500")

    var shield = (digits > 2 ? wideIShieldShape : narrowIShieldShape)

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 '+boxwidth+' 48">'+shield+'<text x="'+textpos+'px" y="34px" text-anchor="middle" font-size="28px" font-family="'+font+'" font-weight="'+weight+'" fill="white">'+encodeXML(tags.ref)+'</text></svg>'
}

function makeBanneredUSShield(tags, bannerText) {
    var digits = tags.ref.toString().length
    var boxwidth = (digits > 2 ? 60 : 48)
    var textpos = boxwidth/2

    var font = (digits > 2 ? "Roboto Condensed" : "Roboto")
    var weight = (digits > 2 ? "400" : "500")

    var shield = (digits > 2 ? wideUSShieldShape : narrowUSShieldShape)

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 '+boxwidth+' 48">'+shield+'<text x="'+textpos+'px" y="16px" text-anchor="middle" font-size="13px" font-family="Roboto Condensed" font-weight="'+weight+'">'+encodeXML(bannerText)+'</text><text x="'+textpos+'px" y="39px" text-anchor="middle" font-size="28px" font-family="'+font+'" font-weight="'+weight+'">'+encodeXML(tags.ref)+'</text></svg>'
}

function makeUSShield(tags) {
    var digits = tags.ref.toString().length
    var boxwidth = (digits > 2 ? 60 : 48)
    var textpos = boxwidth/2

    var font = (digits > 2 ? "Roboto Condensed" : "Roboto")
    var weight = (digits > 2 ? "400" : "500")

    var shield = (digits > 2 ? wideUSShieldShape : narrowUSShieldShape)

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 '+boxwidth+' 48">'+shield+'<text x="'+textpos+'px" y="35px" text-anchor="middle" font-size="32px" font-family="'+font+'" font-weight="'+weight+'">'+encodeXML(tags.ref)+'</text></svg>'
}

function makeBanneredMexicoShield(tags, bannerText) {
    var digits = tags.ref.toString().length

    var font = (digits > 2 ? "Roboto Condensed" : "Roboto")
    var weight = (digits > 2 ? "400" : "500")

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 48 48">'+mexicoShieldShape+'<text x="24px" y="35px" text-anchor="middle" font-size="32px" font-family="'+font+'" font-weight="'+weight+'">'+encodeXML(tags.ref)+'</text><text x="24px" y="45px" text-anchor="middle" font-size="13px" font-family="Roboto Condensed" font-weight="400">'+encodeXML(bannerText)+'</svg>'
}

function makeMexicoShield(tags) {
    return makeBanneredMexicoShield(tags, "")
}

function makeBanneredRectangleShield(tags, bannerText, cr) {
    cr = cr !== undefined ? cr : 3

    var digits = tags.ref.toString().length
    var boxwidth = (digits > 2 ? 48+(digits-2)*12 : 48)
    var textpos = boxwidth / 2

    var font = (digits > 3 ? "Roboto Condensed" : "Roboto")
    var weight = (digits > 3 ? "400" : "500")

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 '+boxwidth+' 48"><rect x="1px" y="1px" width="'+(boxwidth-2)+'px" height="46px" rx="'+cr+'px" fill="white" stroke="black" strokewidth="2px"></rect><text x="'+textpos+'px" y="16px" text-anchor="middle" font-size="13px" font-family="Roboto Condensed" font-weight="400">'+encodeXML(bannerText)+'</text><text x="'+textpos+'px" y="40px" text-anchor="middle" font-size="28px" font-family="'+font+'" font-weight="'+weight+'">'+encodeXML(tags.ref)+'</text></svg>'
}

function makeRectangleShield(tags, cr) {
    cr = cr !== undefined ? cr : 3

    var digits = tags.ref.toString().length
    var boxwidth = (digits > 2 ? 48+(digits-2)*12 : 48)
    var textpos = boxwidth / 2

    var font = (digits > 2 ? "Roboto Condensed" : "Roboto")
    var weight = (digits > 2 ? "400" : "500")

    return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 '+boxwidth+' 48"><rect x="1px" y="1px" width="'+(boxwidth-2)+'px" height="46px" rx="'+cr+'px" fill="white" stroke="black" strokewidth="2px"></rect><text x="'+textpos+'px" y="36px" text-anchor="middle" font-size="32px" font-family="'+font+'" font-weight="'+weight+'">'+encodeXML(tags.ref)+'</text></svg>'
}

function makeTexasShield(tags) {
    var m = tags.network.match(/^US:TX:([A-Za-z]+)/)
    console.log(tags.network)
    if(m) {
	var type = m[1]

	return makeBanneredRectangleShield(tags, type.toUpperCase())
    }
    return makeBanneredRectangleShield(tags, 'TEXAS')
}

function makeBanneredCircleShield(tags, bannerText) {
    return makeBanneredRectangleShield(tags, bannerText, 23)
}

function makeCircleShield(tags) {
    return makeRectangleShield(tags, 23)
}

var dispatchMap = {
    rectangle : makeRectangleShield,
    rectangleB : makeBanneredRectangleShield,
    circle : makeCircleShield,
    circleB : makeBanneredCircleShield,
    texas : makeTexasShield,
    texasB : makeBanneredRectangleShield,
    us : makeUSShield,
    usB : makeBanneredUSShield,
    interstate : makeInterstateShield,
    businessInterstate : makeBusinessInterstateShield,
    mexico : makeMexicoShield,
    mexicoB : makeBanneredMexicoShield,
    qc_autoroute : makeQuebecAutorouteShield
}

var shieldCache = {}

function cacheID(tags) {
    var id = []

    if(tags.network)
	id.push("net_"+tags.network)
    if(tags.modifier)
	id.push("mod_"+tags.modifier)
    if(tags.ref)
	id.push("ref_"+tags.ref)

    return id.join(".")
}

function makeShieldFromTags(tags) {
    var shieldLabel = 'shield-'+shieldID
    shieldID++

    if(!tags.ref || !tags.network) // XXX Special cases...
	return ''

    var id = cacheID(tags)
    var svgData = shieldCache[id]

    if(!svgData) {
	svgData = generateShield(tags)
	shieldCache[id] = svgData
    }

    if(svgData)
	return '<span id="'+shieldLabel+'" class="route-shield">'+svgData+'</span>'
}

function generateShield(tags) {
    var modifier = tags.modifier || ''
    var network = tags.network || ''
    var template = ''
    var svgData

    if(network == 'US:I' || network == 'US:I:Future')
	template = 'interstate'
    else if (network == 'US:US')
	template = 'us'
    else if (network.match('^US:TX'))
	template = 'texas'
    else if (network == 'ca_qc_primary' ||
	     (network == 'CA:QC' && tags.ref >= 1 && tags.ref <= 99))
	template = 'qc_autoroute'
    else if (network == 'ca_transcanada')
	template = 'transcanada'
    else if (network == 'MX:MX')
	template = 'mexico'
    else if (network.match(/^(CA|US|MX):[A-Z][A-Z]$/) ||
	     network.match(/^(CA|US|MX):MB:TCH$/) ||
	     network.match(/^ca_[a-z][a-z](_primary)?$/))
	template = "circle"
    else if (network.match(/^(CA|US):[A-Z][A-Z]:secondary$/) ||
	     network.match(/^(CA|US):[A-Z][A-Z]:county/) ||
	     network.match(/^(CA|US):[A-Z][A-Z]:CR/) ||
	     network.match(/^ca_[a-z][a-z](_secondary|_county)?$/))
	template = 'rectangle'

    if(modifier || !template) {
	if(modifier && network.endsWith(':'+modifier))
	    network = network.slice(0, -(modifier.length+1))
	else if(!modifier) {
	    for(var i=0; i<abbrlist.length; i++) {
		var banner = abbrlist[i]
		if(network.endsWith(':'+banner)) {
		    network = network.slice(0, -(banner.length+1))
		    modifier = banner
		    break;
		}
	    }
	}
	if(modifier) {
	    if(abbreviations[modifier])
		modifier = abbreviations[modifier]
	    
	    if(network == 'US:I' || network == 'US:I:Future')
		template = 'interstateB'
	    else if (network.match(/^US:I:Business/))
		template = 'businessInterstate'
	    else if (network == 'US:US')
		template = 'usB'
	    else if (network == 'ca_qc_primary'  ||
		     (network == 'CA:QC' && tags.ref >= 1 && tags.ref <= 99))
		template = 'qc_autorouteB'
	    else if (network == 'ca_transcanada')
		template = 'transcanadaB'
	    else if (network == 'MX:MX')
		template = 'mexicoB'
	    else if (network.match('^US:TX'))
		template = 'texasB'
	    else if (network.match(/^(CA|US|MX):[A-Z][A-Z]$/) ||
		     network.match(/^(CA|US|MX):MB:TCH$/) ||
		     network.match(/^ca_[a-z][a-z](_primary(_etr?))?$/))
		template = "circleB"
	    else if (network.match(/^(CA|US):[A-Z][A-Z]:secondary$/) ||
		     network.match(/^(CA|US):[A-Z][A-Z]:county$/) ||
		     network.match(/^(CA|US):[A-Z][A-Z]:CR/) ||
		     network.match(/^ca_[a-z][a-z](_secondary|_county)?$/))
		template = 'rectangleB'
	}
    }

    var func = dispatchMap[template]
    if(func) {
	if(template.endsWith('B'))
	    svgData = func(tags, modifier.toUpperCase())
	else
	    svgData = func(tags)
	return svgData
    } else {
	console.log('No dispatch function for '+template)
	console.log(tags)
    }
    return ''
}

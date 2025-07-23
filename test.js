async function test(){
const url = 'https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=Country%3A%20zzz&destination=City%3Azzz&currency=eur&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=true&allowReturnFromDifferentCity=true&allowChangeInboundDestination=true&allowChangeInboundSource=true&allowDifferentStationConnection=true&enableSelfTransfer=true&allowOvernightStopover=true&enableTrueHiddenCity=true&enableThrowAwayTicketing=true&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '7bec869ebcmsh6281117749bd219p103834jsncdd4bd9be293',
		'x-rapidapi-host': 'kiwi-com-cheap-flights.p.rapidapi.com'
	}
}

	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);


}test()
async function test(){
const url = 'https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=Country%3AFR&destination=Country%3Aanywhere&currency=eur&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=false&allowReturnFromDifferentCity=false&allowChangeInboundDestination=false&allowChangeInboundSource=false&allowDifferentStationConnection=false&enableSelfTransfer=false&allowOvernightStopover=false&enableTrueHiddenCity=false&enableThrowAwayTicketing=false&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20&inboundDepartureDateStart=2025-12-01T00%3A00%3A00&inboundDepartureDateEnd=2026-01-01T00%3A00%3A00&outboundDepartmentDateStart=2025-08-01T00%3A00%3A00&outboundDepartmentDateEnd=2025-08-30T00%3A00%3A00';

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '4395428547msh5fa9f72b2b488b7p1d3f25jsn79eebc5765a5',
		'x-rapidapi-host': 'kiwi-com-cheap-flights.p.rapidapi.com'
	}
}

	const response = await fetch(url, options);
	const result = await response.json();
	console.log("Itinéraires trouvés :", result.itineraries);
	// console.log("test Josephine" , result.source.name)
	// console.log("test Nasra" , result.sectorSegments)
	// console.log("test Vincent" , result.sectorSegments.segment)
// Imaginons que ta réponse JSON est stockée dans une variable appelée `result`
const iti = result.itineraries;

iti.forEach((itinerary) => {
  console.log("➡️ Itinéraire :");
  
  const outboundSegments = itinerary.outbound.sectorSegments;
  const inboundSegments = itinerary.inbound.sectorSegments ;

  outboundSegments.forEach((segmentWrapper, i) => {
    const segment = segmentWrapper.segment;
    const from = segment.source.station.name;
    const to = segment.destination.station.name;
    console.log(`  🛫 Segment aller ${i + 1} : ${from} → ${to}`);
  });

  inboundSegments.forEach((segmentWrapper, i) => {   // que represent le I a demande a GPT
    const segment = segmentWrapper.segment;
    const from = segment.source.station.name;
    const to = segment.destination.station.name;
    console.log(`  🛬 Segment retour ${i + 1} : ${from} → ${to}`);
});

console.log("Prix :", itinerary.price.amount + "€");
console.log("-------------");
console.log("MAXITEST" ,iti)
});
}
test()
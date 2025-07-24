let cout = document.getElementById("cout")
let testeuh = document.getElementById("testeuh")

async function test(){
const url = 'https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=Country%3AFR&destination=Country%3Aanywhere&currency=eur&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=false&allowReturnFromDifferentCity=false&allowChangeInboundDestination=false&allowChangeInboundSource=false&allowDifferentStationConnection=false&enableSelfTransfer=false&allowOvernightStopover=false&enableTrueHiddenCity=false&enableThrowAwayTicketing=false&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20&inboundDepartureDateStart=2025-12-01T00%3A00%3A00&inboundDepartureDateEnd=2026-01-01T00%3A00%3A00&outboundDepartmentDateStart=2025-08-01T00%3A00%3A00&outboundDepartmentDateEnd=2025-08-30T00%3A00%3A00';

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '7bec869ebcmsh6281117749bd219p103834jsncdd4bd9be29',
		'x-rapidapi-host': 'kiwi-com-cheap-flights.p.rapidapi.com'
	}
}

	const response = await fetch(url, options);
	const result = await response.json();
	console.log("Itinéraires trouvés :", result.itineraries);

 const printTickets = result.itineraries;

printTickets.forEach((itinerary) => {
  console.log("➡️ Itinéraire :");
  const outboundSegments = itinerary.outbound.sectorSegments;
  const inboundSegments = itinerary.inbound.sectorSegments ;
  const flightTime = itinerary.outbound.duration;
  const price = itinerary.price.amount

  const container = document.createElement("div")


  // Arrival

  outboundSegments.forEach((segmentWrapper, i) => {
    const segment = segmentWrapper.segment;

    const from = segment.source.station.name;
    const to = segment.destination.station.name;
    const departureDate = segment.source.localTime
    const arrivalDate = segment.destination.localTime
    const departureCode = segment.source.station.code
    const arrivalCode = segment.destination.station.code

    const title = document.createElement("p");
    title.textContent = `  🛫 Segment aller ${i + 1} : ${from} (${departureCode}) → ${to} (${arrivalCode})`;
    container.appendChild(title);

    const dep = document.createElement("p");
    dep.textContent = `Départ : ${departureDate}`;
    container.appendChild(dep);

    const arr = document.createElement("p")
    arr.textContent = `Arrivée : ${arrivalDate}`;
    container.appendChild(arr);

  });

  // Departure

  inboundSegments.forEach((segmentWrapper, i) => { 
    const segment = segmentWrapper.segment;


    const from = segment.source.station.name;
    const to = segment.destination.station.name;
    const departureDate = segment.source.localTime
    const arrivalDate = segment.destination.localTime
    const departureCode = segment.source.station.code
    const arrivalCode = segment.destination.station.code

    const title = document.createElement("p");
    title.textContent = `  🛬 Segment retour ${i + 1} : ${from} (${departureCode}) → ${to} (${arrivalCode})`;
    container.appendChild(title)

    const dep = document.createElement("p");
    dep.textContent = `Départ : ${departureDate}`;
    container.appendChild(dep);

    const arr = document.createElement("p")
    arr.textContent = `Arrivée : ${arrivalDate}`;
    container.appendChild(arr);

});

// Flight Time

const duration = document.createElement("p")
duration.textContent = `Durée de vol aller : ${flightTime} minutes`;
container.appendChild(duration);

// Price

const priceTag = document.createElement("p")
priceTag.textContent = `Prix ${price} €`
container.appendChild(priceTag)

// Ligne de séparation

  const hr = document.createElement("hr");
  container.appendChild(hr)

  cout.appendChild(container);

})
}



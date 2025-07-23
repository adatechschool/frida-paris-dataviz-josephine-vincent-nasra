let cout = document.getElementById("cout")
let testeuh = document.getElementById("testeuh")

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
let prix = itinerary.price.amount
affichagePrix(prix)
console.log("Prix :", prix + "€");
console.log("-------------");
console.log("MAXITEST" ,iti)

})
}
test()
function affichagePrix(prix) {
  let prices = document.createElement("p")
  prices.innerHTML = prix
  cout.appendChild(prices)
} 




// // On récupère tous les itinéraires
// const itineraires = result.itineraries;

// // On parcourt chaque itinéraire un par un
// itineraires.forEach((itineraire) => {
//   console.log("✈️ Nouvel itinéraire :");
//    // --- VOLS ALLER ---
//   console.log("🛫 Vols aller :");

//   const volsAller = itineraire.outbound.sectorSegments;
  
//   // On regarde chaque vol aller
//   volsAller.forEach((vol) => {
//     const depart = vol.segment.source.station.name;
//     const arrivee = vol.segment.destination.station.name;
//     console.log(`   De ${depart} vers ${arrivee}`);
//   });
//   // --- VOLS RETOUR ---
//   console.log("🛬 Vols retour :");
  
//   const volsRetour = itineraire.inbound.sectorSegments;
  
//   // On regarde chaque vol retour
//   volsRetour.forEach((vol) => {
//     const depart = vol.segment.source.station.name;
//     const arrivee = vol.segment.destination.station.name;
//     console.log(`   De ${depart} vers ${arrivee}`);
//   });

//   // On affiche le prix
//   const prix = itineraire.price.amount;

//   console.log(`💰 Prix : ${prix}€`);
//   console.log("------------------------");
// });
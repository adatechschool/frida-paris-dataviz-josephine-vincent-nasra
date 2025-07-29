const cout = document.getElementById("cout")
const btnSearch = document.getElementById("btnSearchFlights")
const selectOutbound = document.getElementById("outbound")
const selectInbound = document.getElementById("inbound")

const departureOutbound = document.getElementById("outboundDeparture")
const arrivalOutbound = document.getElementById("outboundArrival")
const departureInbound = document.getElementById("inboundDeparture")
const arrivalInbound = document.getElementById("inboundArrival")

let firstFlightTakeOff;
let firstFlightLanding;
let secondFlightTakeOff;
let secondFlightLanding;

btnSearch.addEventListener("click", () => {
  console.log("Recherche de vols...");
  console.log("🛫 Départ aller :", departureOutbound.value);
  console.log("🛬 Arrivée aller :", arrivalOutbound.value);
  console.log("🛫 Départ retour :", departureInbound.value);
  console.log("🛬 Arrivée retour :", arrivalInbound.value);
});

departureOutbound.addEventListener("change", () => {
  firstFlightTakeOff = departureOutbound.value
  console.log("Départ aller :", firstFlightTakeOff)
})

arrivalOutbound.addEventListener("change", () => {
  firstFlightLanding = arrivalOutbound.value
  console.log("Arrivée aller :", firstFlightLanding)
})
departureInbound.addEventListener("change", () => {
  secondFlightTakeOff = departureInbound.value
  console.log("Départ retour :", secondFlightTakeOff)
})

arrivalInbound.addEventListener("change", () => {
  secondFlightLanding = arrivalInbound.value
  console.log("Arrivée retour :", secondFlightLanding)
})

console.log("en dehors du listener :", firstFlightTakeOff)
console.log("en dehors du listener :", firstFlightLanding)
console.log("en dehors du listener :", secondFlightTakeOff)
console.log("en dehors du listener :", secondFlightLanding)

// selectOutbound.addEventListener("change")

// Fonction pour créer un segment de vol (élimine la duplication)
function createFlightSegment(segment, index ) {
  const from = segment.source.station.name;
  const to = segment.destination.station.name;
  const departureDate = segment.source.localTime;
  const arrivalDate = segment.destination.localTime;
  const departureCode = segment.source.station.code;
  const arrivalCode = segment.destination.station.code

  const title = document.createElement("p");
      title.textContent = `  🛬 Segment retour ${index + 1} : ${from} (${departureCode}) → ${to} (${arrivalCode})`;

  // départ
  const dep = document.createElement("p");
      dep.textContent = `Départ : ${departureDate}`
  
  // arrivée
  const arr = document.createElement("p")
      arr.textContent = `Arrivée : ${arrivalDate}`;

return {title, dep, arr}
}

async function getFlights() {
  
  
  try {
    cout.innerHTML = ""

  let outboundValue = selectOutbound.value
  let inboundValue = selectInbound.value

const url = `https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=City%3A${outboundValue}&destination=City%3A${inboundValue}&currency=eur&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=true&allowReturnFromDifferentCity=true&allowChangeInboundDestination=true&allowChangeInboundSource=true&allowDifferentStationConnection=true&enableSelfTransfer=true&allowOvernightStopover=true&enableTrueHiddenCity=true&enableThrowAwayTicketing=true&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20&inboundDepartureDateStart=${firstFlightTakeOff}T00%3A00%3A00&inboundDepartureDateEnd=${firstFlightLanding}T00%3A00%3A00&&outboundDepartmentDateStart=${secondFlightTakeOff}T00%3A00%3A00&outboundDepartmentDateEnd=${secondFlightLanding}T00%3A00%3A00`;

console.log("valeur outbound : " ,outboundValue)
console.log("valeur inbound : " ,inboundValue)
; //Depart atterissage = arrival outbound
  console.log("c'est la date du debut de la recherche du billet aller" , firstFlightTakeOff)
  console.log("c'est la date de fin de la recherche du billet aller" , firstFlightLanding)
  console.log("c'est la date de debut de la recherche du billet retour" , secondFlightTakeOff)
  console.log("c'est la date de fin de la recherche du billet retour" , secondFlightLanding)

  console.log("C'EST L'URL :", url)

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'a9f33f4830msh17854c7e78b4bedp1fa568jsnbd2ca1166df0',
      'x-rapidapi-host': 'kiwi-com-cheap-flights.p.rapidapi.com'
    }
  }
  const response = await fetch(url, options);
  console.log("status", response.status)
  if (!response.ok) throw new Error (`Erreur lors de la récuperation", ${response.status}`)
  const result = await response.json();
  console.log("Itinéraires trouvés :", result.itineraries);
  
  const printTickets = result.itineraries;

  printTickets.forEach((itinerary) => {
    console.log("➡️ Itinéraire :");

    const outboundSegments = itinerary.outbound.sectorSegments;
    const inboundSegments = itinerary.inbound.sectorSegments;
    const flightTime = itinerary.outbound.duration;
    const price = itinerary.price.amount

    const container = document.createElement("div")

    // FlightTime

    const duration = document.createElement("p")
    duration.textContent = `Durée de vol aller : ${flightTime} minutes`;
    container.appendChild(duration);
    // cout.innerHTML = ""

    // Price

    const priceTag = document.createElement("p")
    priceTag.textContent = `Prix ${price} €`
    container.appendChild(priceTag)

    // Departure

    outboundSegments.forEach((segmentWrapper, i) => {
      const segmentOutbound = segmentWrapper.segment;
      const segmentElement = createFlightSegment(segmentOutbound, i, 'outbound')

      container.appendChild(segmentElement.title)
      container.appendChild(segmentElement.dep);
      container.appendChild(segmentElement.arr)

      console.log("VALEUR outbound", outboundValue)
    })

    // Arrival

    inboundSegments.forEach((segmentWrapper, i) => {
      const segmentInbound = segmentWrapper.segment;
      const segmentElement = createFlightSegment(segmentInbound, i, 'inbound')
      
      container.appendChild(segmentElement.title)
      container.appendChild(segmentElement.dep);
      container.appendChild(segmentElement.arr);

      console.log("VALEUR inbound", inboundValue)
    })
      //Ligne de separation
      const hr = document.createElement("hr");
      container.appendChild(hr)

      cout.appendChild(container);

    });

}
  catch(error){
    console.error("erreur pendant le fetch :" , error.message)
    cout.innerHTML = `<p style="color:red;">Erreur : ${error.message}</p>`
    
  }

  
};

const cout = document.getElementById("cout")
const testeuh = document.getElementById("testeuh")
const selectOutbound = document.getElementById("outbound")
const selectInbound = document.getElementById("inbound")
const departureOutbound = document.getElementById("outboundDeparture")
const departureInbound = document.getElementById("inboundDeparture")

let depart;
let arrivee;


departureOutbound.addEventListener("change", () => {
  depart = departureOutbound.value
  console.log("dans le listener :", depart)
})

departureInbound.addEventListener("change", () => {
  arrivee = departureInbound.value
  console.log("dans le listener :", arrivee)
})

console.log("en dehors du listener :", depart)
console.log("en dehors du listener :", arrivee)

// selectOutbound.addEventListener("change")


async function test() {
  cout.innerHTML = ""
  let outboundValue = selectOutbound.value
  let inboundValue = selectInbound.value
  let departDate = depart; // valeur par défaut si pas de sélection
  let returnDate = arrivee; // valeur par défaut si pas de sélection

// let url = `https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=Country%3A${outboundValue}&destination=Country%3A${inboundValue}&currency=eur&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=false&allowReturnFromDifferentCity=false&allowChangeInboundDestination=false&allowChangeInboundSource=false&allowDifferentStationConnection=false&enableSelfTransfer=false&allowOvernightStopover=false&enableTrueHiddenCity=false&enableThrowAwayTicketing=false&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&inboundDepartureDateStart=${returnDate}T00%3A00%3A00&outboundDepartureDateStart=${departDate}T00%3A00%3A00`;

const url = 'https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=Country%3AGB&destination=City%3Adubrovnik_hr&currency=usd&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=true&allowReturnFromDifferentCity=true&allowChangeInboundDestination=true&allowChangeInboundSource=true&allowDifferentStationConnection=true&enableSelfTransfer=true&allowOvernightStopover=true&enableTrueHiddenCity=true&enableThrowAwayTicketing=true&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20&inboundDepartureDateStart=2025-11-01T00%3A00%3A00&inboundDepartureDateEnd=2025-11-10T00%3A00%3A00&outboundDepartmentDateStart=2025-12-20T00%3A00%3A00&outboundDepartmentDateEnd=2025-12-30T00%3A00%3A00'
; //Depart atterissage = arrival outbound
  console.log("c'est la date de depart" , departDate)
  console.log("c'est la date de retour" , returnDate)
  console.log("C'EST L'URL :", url)

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
    const inboundSegments = itinerary.inbound.sectorSegments;
    const flightTime = itinerary.outbound.duration;
    const price = itinerary.price.amount

    // FlightTime

    const container = document.createElement("div")
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

      console.log("VALEUR", outboundValue)
    })

    // Arrival

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

      //Ligne de separation
      const hr = document.createElement("hr");
      container.appendChild(hr)

      cout.appendChild(container);

      console.log("VALEUR", inboundValue)
    })


  });
};
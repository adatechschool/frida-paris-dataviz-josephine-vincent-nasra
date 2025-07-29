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

// selectOutbound.addEventListener("change")


async function getFlights() {
  cout.innerHTML = ""
  let outboundValue = selectOutbound.value
  let inboundValue = selectInbound.value

const url = `https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=City%3A${outboundValue}&destination=City%3A${inboundValue}&currency=eur&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=true&allowReturnFromDifferentCity=true&allowChangeInboundDestination=true&allowChangeInboundSource=true&allowDifferentStationConnection=true&enableSelfTransfer=true&allowOvernightStopover=true&enableTrueHiddenCity=true&enableThrowAwayTicketing=true&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20&inboundDepartureDateStart=${firstFlightTakeOff}T00%3A00%3A00&inboundDepartureDateEnd=${firstFlightLanding}T00%3A00%3A00&&outboundDepartmentDateStart=${secondFlightTakeOff}T00%3A00%3A00&outboundDepartmentDateEnd=${secondFlightLanding}T00%3A00%3A00`
; //Depart atterissage = arrival outbound
  // console.log("c'est la date de depart" , departDate)
  // console.log("c'est la date de retour" , returnDate)
  console.log("C'EST L'URL :", url)

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'a9f33f4830msh17854c7e78b4bedp1fa568jsnbd2ca1166df0',
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
      title.textContent = `  🛬 Segment retour ${i + 2} : ${from} (${departureCode}) → ${to} (${arrivalCode})`;
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

import { setupDateInputs, createTextLine, displaySegment } from './function.js';

// Sélection des éléments HTML
const cout = document.getElementById("cout");
const btnSearch = document.getElementById("btnSearchFlights");
const selectOutbound = document.getElementById("outbound");
const selectInbound = document.getElementById("inbound");

const departureOutbound = document.getElementById("outboundDeparture");
const arrivalOutbound = document.getElementById("outboundArrival");
const departureInbound = document.getElementById("inboundDeparture");
const arrivalInbound = document.getElementById("inboundArrival");

// Variables de dates
let firstFlightTakeOff;
let firstFlightLanding;
let secondFlightTakeOff;
let secondFlightLanding;

// Fonction pour mettre à jour les valeurs de dates
function setFlightValue(key, value) {
  if (key === 'firstFlightTakeOff') firstFlightTakeOff = value;
  if (key === 'firstFlightLanding') firstFlightLanding = value;
  if (key === 'secondFlightTakeOff') secondFlightTakeOff = value;
  if (key === 'secondFlightLanding') secondFlightLanding = value;
}

// Initialisation des écouteurs de dates (fonction importée)
setupDateInputs(
  departureOutbound,
  arrivalOutbound,
  departureInbound,
  arrivalInbound,
  setFlightValue
);

// Fonction principale pour récupérer les vols
async function getFlights() {
  cout.innerHTML = ""; // On vide le contenu précédent

  const outboundValue = selectOutbound.value;
  const inboundValue = selectInbound.value;

  const url = "https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=City%3A" +
    outboundValue +
    "&destination=City%3A" +
    inboundValue +
    "&currency=eur&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=true&allowReturnFromDifferentCity=true&allowChangeInboundDestination=true&allowChangeInboundSource=true&allowDifferentStationConnection=true&enableSelfTransfer=true&allowOvernightStopover=true&enableTrueHiddenCity=true&enableThrowAwayTicketing=true&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20&inboundDepartureDateStart=" +
    firstFlightTakeOff +
    "T00%3A00%3A00&inboundDepartureDateEnd=" +
    firstFlightLanding +
    "T00%3A00%3A00&&outboundDepartmentDateStart=" +
    secondFlightTakeOff +
    "T00%3A00%3A00&outboundDepartmentDateEnd=" +
    secondFlightLanding +
    "T00%3A00%3A00";

  console.log("C'EST L'URL :", url);

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a9f33f4830msh17854c7e78b4bedp1fa568jsnbd2ca1166df0",
      "x-rapidapi-host": "kiwi-com-cheap-flights.p.rapidapi.com"
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const itineraries = result.itineraries;

    console.log("Itinéraires trouvés :", itineraries);

    itineraries.forEach(function (itinerary) {
      const container = document.createElement("div");

      const duration = itinerary.outbound.duration;
      const price = itinerary.price.amount;

      container.appendChild(createTextLine("Durée de vol aller : " + duration + " minutes"));
      container.appendChild(createTextLine("Prix " + price + " €"));

      itinerary.outbound.sectorSegments.forEach(function (segmentWrapper, index) {
        const segment = segmentWrapper.segment;
        displaySegment(container, segment, index, "outbound");
        console.log("VALEUR", outboundValue);
      });

      itinerary.inbound.sectorSegments.forEach(function (segmentWrapper, index) {
        const segment = segmentWrapper.segment;
        displaySegment(container, segment, index, "inbound");

        const hr = document.createElement("hr");
        container.appendChild(hr);
        console.log("VALEUR", inboundValue);
      });

      cout.appendChild(container);
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des vols :", error);
  }
}

btnSearch.addEventListener("click", getFlights);

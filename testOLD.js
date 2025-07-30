const cout = document.getElementById("cout");
const btnSearch = document.getElementById("btnSearchFlights");
const selectOutbound = document.getElementById("outbound");
const selectInbound = document.getElementById("inbound");

const departureOutbound = document.getElementById("outboundDeparture");
const arrivalOutbound = document.getElementById("outboundArrival");
const departureInbound = document.getElementById("inboundDeparture");
const arrivalInbound = document.getElementById("inboundArrival");

// Récupère les modèles HTML
const flightCardTemplate = document.getElementById("flightCardTemplate");
const flightSegmentTemplate = document.getElementById("flightSegmentTemplate");
const bookingButtonTemplate = document.getElementById("bookingButtonTemplate");

// Variables de dates
let firstFlightTakeOff;
let firstFlightLanding;
let secondFlightTakeOff;
let secondFlightLanding;

// Fonction pour configurer les écouteursy  de changements de dates
function setupDateInputs() {
  departureOutbound.addEventListener("change",() => {
    firstFlightTakeOff = departureOutbound.value;
    console.log("Départ aller :", firstFlightTakeOff);
  });

  arrivalOutbound.addEventListener("change",() => {
    firstFlightLanding = arrivalOutbound.value;
    console.log("Arrivée aller :", firstFlightLanding);
  });

  departureInbound.addEventListener("change", () => {
    secondFlightTakeOff = departureInbound.value;
    console.log("Départ retour :", secondFlightTakeOff);
  });

  arrivalInbound.addEventListener("change",() => {
    secondFlightLanding = arrivalInbound.value;
    console.log("Arrivée retour :", secondFlightLanding);
  });
}

// Fonction pour formater la date (ex: "30 juil.")
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
                  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  return date.getDate() + ' ' + months[date.getMonth()];
}

// Fonction pour formater l'heure (ex: "14:30")
function formatTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// La fonction createPlaneIcon (qui générait le SVG de l'avion) a été supprimée.

// Fonction pour afficher un seul segment de vol (aller ou retour)
function displaySegment(segmentsContainer, segment, type) {
  // Clone le contenu du modèle
  const segmentClone = flightSegmentTemplate.content.cloneNode(true);
  const segmentDiv = segmentClone.querySelector(".flight-segment");

  const fromCode = segment.source.station.code;
  const toCode = segment.destination.station.code;
  const departureDateTime = segment.source.localTime;
  const arrivalDateTime = segment.destination.localTime;

  // Remplit les données dans les éléments clonés
  segmentDiv.querySelector(".segment-badge").textContent = type === "outbound" ? "Aller" : "Retour";
  segmentDiv.querySelector(".segment-badge").classList.add(type); // Ajoute une classe pour le style

  segmentDiv.querySelector(".flight-route .airport-info:first-of-type .airport-code").textContent = fromCode;
  segmentDiv.querySelector(".flight-route .airport-info:first-of-type .airport-date").textContent = formatDate(departureDateTime);

  segmentDiv.querySelector(".flight-route .airport-info:last-of-type .airport-code").textContent = toCode;
  segmentDiv.querySelector(".flight-route .airport-info:last-of-type .airport-date").textContent = formatDate(arrivalDateTime);

  segmentDiv.querySelector(".flight-times .time-info:first-of-type .time-value").textContent = formatTime(departureDateTime);
  segmentDiv.querySelector(".flight-times .time-info:last-of-type .time-value").textContent = formatTime(arrivalDateTime);

  segmentsContainer.appendChild(segmentDiv);
}

// Fonction principale pour récupérer les vols
async function getFlights() {
  cout.innerHTML = ""; // Efface les résultats précédents

  const outboundValue = selectOutbound.value;
  const inboundValue = selectInbound.value;

  // Construit l'URL (identique à avant)
  const url = `https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=City%3A${outboundValue}&destination=City%3A${inboundValue}&currency=eur&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=false&allowReturnFromDifferentCity=false&allowChangeInboundDestination=false&allowChangeInboundSource=false&allowDifferentStationConnection=false&enableSelfTransfer=false&allowOvernightStopover=false&enableTrueHiddenCity=false&enableThrowAwayTicketing=false&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20&inboundDepartureDateStart=${firstFlightTakeOff}T00%3A00%3A00&inboundDepartureDateEnd=${firstFlightLanding}T00%3A00%3A00&&outboundDepartmentDateStart=${secondFlightTakeOff}T00%3A00%3A00&outboundDepartmentDateEnd=${secondFlightLanding}T00%3A00%3A00`;

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
      // Clone le modèle de la carte de vol
      const cardClone = flightCardTemplate.content.cloneNode(true);
      const flightCardDiv = cardClone.querySelector(".flight-card");

      const duration = Math.round(itinerary.outbound.duration / 60);
      const price = Math.round(itinerary.price.amount);

      // Remplit les données d'en-tête
      flightCardDiv.querySelector(".flight-duration").textContent = `${duration}minutes de vol`;
      flightCardDiv.querySelector(".flight-price").textContent = `${price} €`;

      const segmentsContainer = flightCardDiv.querySelector(".flight-segments-container");
      // Remplit les segments
      itinerary.outbound.sectorSegments.forEach((segmentWrapper) => {
        displaySegment(segmentsContainer, segmentWrapper.segment, "outbound");
      });
      itinerary.inbound.sectorSegments.forEach((segmentWrapper) => {
        displaySegment(segmentsContainer, segmentWrapper.segment, "inbound");
      });

      // Remplit les options de réservation
      const bookingSection = flightCardDiv.querySelector(".booking-section");
      const bookingOptions = itinerary.bookingOptions;
      const edges = bookingOptions.edges;

      edges.forEach(function (option) {
        const node = option.node;
        const bookingUrl = node.bookingUrl;
        const providerName = node.itineraryProvider.name;

        const fullUrl = `https://www.${providerName}${bookingUrl}`;

        const buttonClone = bookingButtonTemplate.content.cloneNode(true);
        const linkButton = buttonClone.querySelector(".booking-button");

        linkButton.href = fullUrl;
        linkButton.querySelector(".booking-provider-name").textContent = `Réserver avec ${providerName}`;

        bookingSection.appendChild(linkButton);
      });

      cout.appendChild(flightCardDiv);
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des vols :", error);
  }
}

// Démarrage : on met les écouteurs
setupDateInputs();
btnSearch.addEventListener("click", getFlights);
export function setupDateInputs(
  departureOutbound,
  arrivalOutbound,
  departureInbound,
  arrivalInbound,
  setValues
) {
  departureOutbound.addEventListener("change", function () {
    setValues('firstFlightTakeOff', departureOutbound.value);
    console.log("Départ aller :", departureOutbound.value);
  });

  arrivalOutbound.addEventListener("change", function () {
    setValues('firstFlightLanding', arrivalOutbound.value);
    console.log("Arrivée aller :", arrivalOutbound.value);
  });

  departureInbound.addEventListener("change", function () {
    setValues('secondFlightTakeOff', departureInbound.value);
    console.log("Départ retour :", departureInbound.value);
  });

  arrivalInbound.addEventListener("change", function () {
    setValues('secondFlightLanding', arrivalInbound.value);
    console.log("Arrivée retour :", arrivalInbound.value);
  });
}

export function createTextLine(text) {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

export function displaySegment(container, segment, index, type) {
  const from = segment.source.station.name;
  const to = segment.destination.station.name;
  const fromCode = segment.source.station.code;
  const toCode = segment.destination.station.code;
  const departureDate = segment.source.localTime;
  const arrivalDate = segment.destination.localTime;

  const title = type === "outbound"
    ? "🛫 Segment aller " + (index + 1) + " : " + from + " (" + fromCode + ") → " + to + " (" + toCode + ")"
    : "🛬 Segment retour " + (index + 2) + " : " + from + " (" + fromCode + ") → " + to + " (" + toCode + ")";

  container.appendChild(createTextLine(title));
  container.appendChild(createTextLine("Départ : " + departureDate));
  container.appendChild(createTextLine("Arrivée : " + arrivalDate));
}

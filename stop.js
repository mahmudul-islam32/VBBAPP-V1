// stop.js
const stopId = new URLSearchParams(window.location.search).get("id");
const stopNameDiv = document.getElementById("stop-name");
const departuresDiv = document.getElementById("departures");

async function getStopDetail() {
  const response = await fetch(
    `https://v5.vbb.transport.rest/stops/${stopId}`
  );
  const stop = await response.json();
  stopNameDiv.innerHTML = stop.name;
  for (const departure of stop.departures) {
    const departureDiv = document.createElement("div");
    departureDiv.innerHTML = `
      <p>Line: ${departure.line.name}</p>
      <p>Destination: ${departure.direction}

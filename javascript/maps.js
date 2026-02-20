// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 44.38065000664867, lng: 26.134781669316077 }; 
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "ba9fa81a82ae3ad4",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Dentist",
  });
}

initMap();
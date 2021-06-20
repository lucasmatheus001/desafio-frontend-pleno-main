$( document ).ready(async function() {
  console.log('⚡ CustomJS Started');
  
  // You Code Javascript
  
    let result = await getAllTracksAndArtist()
    let tracks = result.tracks
    tracks.data.map(track => renderTrack(track))
});

async function searchForTracks() {
  
  let queryTracksInput = document.querySelector('#inputSearch').value
  if(queryTracksInput == '') return goBackInitialTracks()
  let response = await searchQuery(queryTracksInput)
  let track_list = document.querySelector('#track_list');
  track_list.innerHTML = ``
  response.data.map(track => renderTrack(track))

}

async function goBackInitialTracks(event) {
  if (event.target.value === '') {
    let result = await getAllTracksAndArtist()
    let tracks = result.tracks
    let track_list = document.querySelector('#track_list');
    track_list.innerHTML = ``
    tracks.data.map(track => renderTrack(track))
  }
}

//utils
function convertDurationToTimeString(duration) {
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const timeString = [minutes, seconds]
      .map(unit => String(unit).padStart(2, '0'))
      .join(':')
  
  return timeString;
}

const searchQuery = async (search) => await (await fetch(`http://localhost:3333/search?q=${search}`)).json();
const getAllTracksAndArtist = async () => await (await fetch('http://localhost:3333/chart/tracks')).json();
const renderTrack = (track) =>{ 
  let track_list = document.querySelector('#track_list');
  track_list.innerHTML += `<div class=" py-2 col-md-1">
      <image class="w-100 rounded" src="${track.album.cover_big}" />
    </div>
    <div class="col-md-10 fs-6 align-self-center">
      <b> ${track.title}</b>
      <br />${track.artist.name}
    </div>
    <div class="col-md-1"> <b>${convertDurationToTimeString(track.duration)}</b> </div>`
}
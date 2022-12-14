let input = document.querySelector("#searchbar");
let form = document.querySelector("#music");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let jam = input.value;
  const URL = `https://proxy-itunes-api.glitch.me/search?term=${jam}&entity=song&limit=12
  `;
  newsearch(URL);
  input.value = "";
});

function newsearch(URL) {
  //   console.log("test");
  fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    // fetch gives us a response in json format when it is ready.
    .then(function (response) {
      return response.json();
    })
    .then(function (artistData) {
      makeResults(artistData.results);
      if (artistData.results.length === 0) {
        alert("Nah Cuh");
      }
    });
}

let searchResults = document.querySelector("#searchResults");

function makeResults(musicArray) {
  searchResults.innerHTML = "";
  for (let music of musicArray) {
    let resultsDiv = document.createElement("div");
    let albumcover = document.createElement("img");
    let background = document.createElement("img");
    let songTitle = document.createElement("p");
    let ArtName = document.createElement("h1");
    let playButton = document.createElement("audio");

    resultsDiv.classList.add("test");
    background.classList.add("backgroundimg");
    albumcover.classList.add("coverAlbum");
    ArtName.classList.add("ArtName");
    songTitle.classList.add("songTitle");

    albumcover.src = `${music.artworkUrl100}`;
    background.src = `${music.artworkUrl100}`;
    ArtName.innerText = `${music.artistName}`;
    songTitle.innerText = `${music.trackName}`;
    playButton.src = `${music.previewUrl}`;
    playButton.controls = true;

    resultsDiv.appendChild(albumcover);
    resultsDiv.appendChild(background);
    resultsDiv.appendChild(ArtName);
    resultsDiv.appendChild(songTitle);
    resultsDiv.appendChild(playButton);
    searchResults.appendChild(resultsDiv);
  }
}

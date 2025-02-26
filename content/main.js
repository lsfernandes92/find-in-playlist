const main = () => {
  addSearchInput();
};

const addSearchInput = () => {
  const form = document.createElement("form");
  const searchInput = document.createElement("input");
  const magifyingGlassImage = document.createElement("img");
  const actionButtons = document.querySelector(".action-buttons");

  form.classList.add("search-form");

  searchInput.classList.add("search-input");
  searchInput.type = "text";
  searchInput.placeholder = "Search for musics...";
  
  magifyingGlassImage.classList.add("magnifying-glass");
  magifyingGlassImage.alt = "Magifying glass icon";
  magifyingGlassImage.src = chrome.runtime.getURL("images/magnifying-glass.png");

  form.appendChild(searchInput);
  form.appendChild(magifyingGlassImage);

  if (actionButtons) {
    actionButtons.after(form);
  }

  searchInput.addEventListener("input", filterTrackNames);
};

const filterTrackNames = () => {  
  const tracks = document.querySelectorAll(
    "ytmusic-playlist-shelf-renderer > #contents.ytmusic-playlist-shelf-renderer ytmusic-responsive-list-item-renderer"
  );
  const searchInput = document.querySelector(".search-input");
  const textToSearch = searchInput.value.toLowerCase();

  tracks.forEach((track) => {
    const trackTitle = track.querySelector(
      ".title-column.style-scope.ytmusic-responsive-list-item-renderer > yt-formatted-string"
    ).title.toLowerCase();

    if (!track.dataset.originalDisplay) {
      track.dataset.originalDisplay = window.getComputedStyle(track).display;
    }

    track.style.display = textToSearch 
                          ? (trackTitle.includes(textToSearch) ? track.dataset.originalDisplay : 'none') 
                          : track.dataset.originalDisplay;
  });
};

main();
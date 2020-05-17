const presence = new Presence({
  clientId: "630542731701387276"
});

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "dilogo"
  };
  if (
    document.getElementById("webplayer-region").getAttribute("data-state") ===
    "playing"
  ) {
    const tracka = document
      .getElementsByClassName("artist-name")[0]
      .innerHTML.replace("-", "");
    const trackt = document.getElementsByClassName("track-name")[0].innerHTML;
    presenceData.details = tracka;
    presenceData.state = trackt;
    presenceData.smallImageKey = "play";
  } else {
    presenceData.state = "Browsing...";
    presenceData.smallImageKey = "pause";
  }

  presence.setActivity(presenceData);
});

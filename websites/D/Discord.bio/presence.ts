const presence = new Presence({
  clientId: "642728621596999690"
});

let browsingStamp = Math.floor(Date.now() / 1000),
  lastPlaybackState,
  playback;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  if (lastPlaybackState != playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    presenceData.details = "Browsing in mainpage...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/profiles") {
    presenceData.details = "Browsing through";
    presenceData.state = "top upvoted profiles...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/plans") {
    presenceData.details = "Browsing through";
    presenceData.state = "Premium plans";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/customise") {
    presenceData.details = "Edit profile";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/p/")) {
    const nameofprofile = document.location.pathname.split("/");
    presenceData.details = "Viewing profile";
    presenceData.state = "dsc.bio/" + nameofprofile[2];
    presence.setActivity(presenceData);
  }
  presence.setActivity(presenceData);
});

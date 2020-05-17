const presence = new Presence({
  clientId: "662715886662057994"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "enthix.net") {
    presenceData.details = "Viewing Home Page";
    presenceData.state =
      document.querySelector(
        "body > div.container > div.playercount > p > span.sip"
      ).textContent + " Players Online";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

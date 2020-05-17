const presence = new Presence({
  clientId: "648255892361445431"
});

let sartist, strack, slisteners, sduration, selapsed, timestamps;

function newStats(): void {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (): void {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      strack = data.now_playing.song.title;
      sartist = data.now_playing.song.artist;
      slisteners = data.listeners.total;
      sduration = data.now_playing.duration;
      selapsed = data.now_playing.elapsed;
    }
  };
  xhttp.open("GET", "https://r.gravityradio.pw/api/nowplaying/1", true);
  xhttp.send();
}

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

setInterval(newStats, 1000);
newStats();

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "gravity"
  };
  timestamps = getTimestamps(Math.floor(selapsed), Math.floor(sduration));
  presenceData.smallImageKey = "play";
  presenceData.details = sartist + " - " + strack;
  presenceData.state = slisteners + " Listeners";
  presenceData.smallImageText = "Playing";
  presenceData.startTimestamp = timestamps[0];
  presenceData.endTimestamp = timestamps[1];
  presence.setActivity(presenceData);
});

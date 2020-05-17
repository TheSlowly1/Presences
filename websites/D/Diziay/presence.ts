const presence = new Presence({
    clientId: "664350968585912350"
  }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

const startTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;

presence.on("iFrameData", async (msg) => {
  if (!msg) return;
  video = msg;
});

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "diziay"
  };

  const seriesBool = document.querySelector(
    "body > section > div > div > div.content__inner.movie__page.d-flex.justify-content-between > div.content__sidebar > div.card.card__bg1.mb-4.mb-hidden > div.card__title.title__no-icon.d-flex.justify-content-between > h2"
  )
    ? true
    : false;
  const movieBool = document.querySelector(
    "body > section > div > div.content > div > div.content__sidebar > div.card.card__bg1.mb-4 > div.card__title.title__1 > h2 > strong"
  )
    ? true
    : false;

  if (!seriesBool && !movieBool) {
    video = null;
  }

  // Series

  if (seriesBool) {
    const seriesTitle = document.querySelector(
      "body > section > div > div > div.content__inner.movie__page.d-flex.justify-content-between > div.content__container > div > div.card__content.pb-md-1.pb-0 > div > div.watch__title > div.watch__title__name > div > h2"
    ).textContent;

    presenceData.details = seriesTitle.split("-")[0];
    presenceData.state = seriesTitle.split("-")[1].replace("n", "n |");
  }

  // Movies
  else if (movieBool) {
    const movieTitle = document.querySelector(
      "body > section > div > div.content > div > div.content__container > div:nth-child(1) > div > div > div.watch__title > div.watch__title__name > div > h2"
    ).textContent;
    const movieTitle2 = document.querySelector(
      "body > section > div > div.content > div > div.content__container > div:nth-child(1) > div > div > div.watch__title > div.watch__title__name > div > span"
    ).textContent;

    presenceData.details = movieTitle;
    presenceData.state = movieTitle2;
  }

  // Browsing
  else {
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = startTimestamp;
  }

  if (video) {
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      const timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    }
  }

  presence.setActivity(presenceData);
});

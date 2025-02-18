const presence = new Presence({
		clientId: "641394369651277834",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, title: HTMLElement | string, search: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "globo",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "globoplay.globo.com") {
		if (document.location.pathname === "/")
			presenceData.details = "Página inicial";
		else if (document.location.pathname.includes("/categorias/")) {
			if (document.querySelector("div.highlight__header > p")) {
				user = document.querySelector("div.highlight__header > p");
				presenceData.details = "Vendo a categoria:";
				presenceData.state = user.textContent;
				presenceData.smallImageKey = "reading";
			} else if (
				document.querySelector(
					"div.application-controller__view > span > div > div > div > h1"
				)
			) {
				presenceData.details = "Vendo a categoria:";
				user = document.querySelector(
					"div.application-controller__view > span > div > div > div > h1"
				);
				presenceData.state = user.textContent;
				presenceData.smallImageKey = "reading";
			} else presenceData.details = "Categorias";
		} else if (document.location.pathname.includes("/busca")) {
			presenceData.details = "Se preparando para";
			presenceData.state = "pesquisar algo...";
			search = document.querySelector("#search-bar-input");
			if (search.textContent.length > 2) {
				presenceData.details = "Pesquisando por:";
				presenceData.state = search.value;
				presenceData.smallImageKey = "search";
			}
		} else if (document.location.pathname.includes("/programacao"))
			presenceData.details = "Programação";
		else if (document.location.pathname.includes("/programas-locais"))
			presenceData.details = "Programas Locais";
		else if (document.location.pathname.includes("/regiao/")) {
			user = document.querySelector("h1.view-title");
			presenceData.details = `Vendo programas locais de ${user.textContent}`;
		} else if (document.location.pathname.includes("/configuracoes"))
			presenceData.details = "Configurações";
		else if (document.location.pathname.includes("/minha-lista"))
			presenceData.details = "Minha Lista";
		else if (document.location.pathname.includes("/t/")) {
			user = document.querySelector(".playkit-media-cover__header-text");
			presenceData.details = "Vendo o programa/filme:";
			presenceData.state = user.textContent;
			presenceData.smallImageKey = "reading";
		} else if (document.location.pathname.includes("/v/")) {
			const video = document.querySelector<HTMLVideoElement>(
				".id-playback > video"
			);

			if (document.location.pathname.includes("/programa/")) {
				(title as string) = document.querySelector(
					".video-info__data-program, .playkit-video-info__link-text"
				).textContent;
				presenceData.state = document.querySelector(
					".video-info__data-title"
				).textContent;
			} else {
				title = document.querySelector(
					".playkit-video-info__ep-title"
				).textContent;
			}

			if (!isNaN(video.duration)) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(video.currentTime),
						Math.floor(video.duration)
					);
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;

				presenceData.details = title as string;

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else if (isNaN(video.duration)) {
				presenceData.details = "Olhando para:";
				presenceData.state = title as string;
			}
		} else if (document.location.pathname.includes("/agora-na-tv/")) {
			presenceData.details = document.querySelector(
				".playkit-channels-navigation__program-name"
			).textContent;
			presenceData.state = document.querySelector(
				".playkit-channels-navigation__program-time"
			).textContent;
			presenceData.smallImageKey = "live";
			presenceData.largeImageKey = "tvglobo";
		} else if (document.location.pathname.includes("/ao-vivo/")) {
			const programTitle = document.querySelector(
					"span.playkit-channels-navigation__program-name"
				),
				programMetadata = document.querySelector(
					"span.playkit-channels-navigation__program-metadata"
				);
			if (document.location.pathname.includes("/7339131/")) {
				presenceData.details = `Multishow - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "multishow";
			} else if (document.location.pathname.includes("/7339101/")) {
				presenceData.details = `GloboNews - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "globonews";
			} else if (document.location.pathname.includes("/7339108/")) {
				presenceData.details = `SporTV - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "sportv";
			} else if (document.location.pathname.includes("/7339117/")) {
				presenceData.details = `SporTV 2 - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "sportv2";
			} else if (document.location.pathname.includes("/7339123/")) {
				presenceData.details = `SporTV 3 - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "sportv3";
			} else if (document.location.pathname.includes("/7339128/")) {
				presenceData.details = `GNT - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "gnt";
			} else if (document.location.pathname.includes("/7339091/")) {
				presenceData.details = `Viva - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "viva";
			} else if (document.location.pathname.includes("/7339146/")) {
				presenceData.details = `Gloob - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "gloob";
			} else if (document.location.pathname.includes("/7339323/")) {
				presenceData.details = `Gloobinho - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "gloobinho";
			} else if (document.location.pathname.includes("/7339152/")) {
				presenceData.details = `Megapix - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "megapix";
			} else if (document.location.pathname.includes("/7339279/")) {
				presenceData.details = `Universal TV - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "universaltv";
			} else if (document.location.pathname.includes("/7339326/")) {
				presenceData.details = `Studio Universal - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "studiouniversal";
			} else if (document.location.pathname.includes("/7339224/")) {
				presenceData.details = `SYFY - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "syfy";
			} else if (document.location.pathname.includes("/7339060/")) {
				presenceData.details = `Canal Brasil - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "canalbrasil";
			} else if (document.location.pathname.includes("/7339078/")) {
				presenceData.details = `Canal OFF - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "canaloff";
			} else if (document.location.pathname.includes("/7339140/")) {
				presenceData.details = `BIS - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bis";
			} else if (document.location.pathname.includes("/7339135/")) {
				presenceData.details = `Mais na Tela - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "maisnatela";
			} else if (document.location.pathname.includes("/7420604/")) {
				presenceData.details = `Futura - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "futura";
			} else if (document.location.pathname.includes("/8223631/")) {
				presenceData.details = `Premiere - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "premiere";
			} else if (document.location.pathname.includes("/8310612/")) {
				presenceData.details = `Combate - ${programTitle.textContent}`;
				presenceData.state = programMetadata.textContent;
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "combate";
			} else if (document.location.pathname.includes("/9182156/")) {
				presenceData.details = "CBN São Paulo";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "cbn";
			} else if (document.location.pathname.includes("/9182126/")) {
				presenceData.details = "CBN Rio de Janeiro";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "cbn";
			} else if (document.location.pathname.includes("/244881/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Acompanhe a Casa";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/772202/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Acompanhe a Casa 2";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/2255000/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Acompanhe a Casa Extra";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/244890/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Cozinha VIP/Xepa";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/6349747/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Quarto Cordel";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/2254997/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Quarto Colorido";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/244889/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Sala de Estar";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/244887/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Sala da Casa Extra";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/2254996/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Piscina";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/2254993/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Jardim";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			} else if (document.location.pathname.includes("/772205/")) {
				presenceData.details = "Big Brother Brasil";
				presenceData.state = "Confessionário";
				presenceData.smallImageKey = "live";
				presenceData.largeImageKey = "bbb";
			}
		} else if (document.location.pathname.includes("/canais/")) {
			if (document.location.pathname.includes("/globo/")) {
				presenceData.details = "TV Globo";
				presenceData.largeImageKey = "tvglobo";
			} else if (document.location.pathname.includes("/multishow/")) {
				presenceData.details = "Multishow";
				presenceData.largeImageKey = "multishow";
			} else if (document.location.pathname.includes("/globonews/")) {
				presenceData.details = "GloboNews";
				presenceData.largeImageKey = "globonews";
			} else if (document.location.pathname.includes("/sportv/")) {
				presenceData.details = "SporTV";
				presenceData.largeImageKey = "sportv";
			} else if (document.location.pathname.includes("/gnt/")) {
				presenceData.details = "GNT";
				presenceData.largeImageKey = "gnt";
			} else if (document.location.pathname.includes("/viva/")) {
				presenceData.details = "Viva";
				presenceData.largeImageKey = "viva";
			} else if (document.location.pathname.includes("/gloob/")) {
				presenceData.details = "Gloob";
				presenceData.largeImageKey = "gloob";
			} else if (document.location.pathname.includes("/gloobinho/")) {
				presenceData.details = "Gloobinho";
				presenceData.largeImageKey = "gloobinho";
			} else if (document.location.pathname.includes("/megapix/")) {
				presenceData.details = "Megapix";
				presenceData.largeImageKey = "megapix";
			} else if (document.location.pathname.includes("/universal/")) {
				presenceData.details = "Universal+";
				presenceData.largeImageKey = "universalplus";
			} else if (document.location.pathname.includes("/canal-brasil/")) {
				presenceData.details = "Canal Brasil";
				presenceData.largeImageKey = "canalbrasil";
			} else if (document.location.pathname.includes("/canal-off/")) {
				presenceData.details = "Canal OFF";
				presenceData.largeImageKey = "canaloff";
			} else if (document.location.pathname.includes("/bis/")) {
				presenceData.details = "BIS";
				presenceData.largeImageKey = "bis";
			} else if (document.location.pathname.includes("/mais-na-tela/")) {
				presenceData.details = "Mais na Tela";
				presenceData.largeImageKey = "maisnatela";
			} else if (document.location.pathname.includes("/futura/")) {
				presenceData.details = "Futura";
				presenceData.largeImageKey = "futura";
			} else if (document.location.pathname.includes("/premiere/")) {
				presenceData.details = "Premiere";
				presenceData.largeImageKey = "premiere";
			} else if (document.location.pathname.includes("/combate/")) {
				presenceData.details = "Combate";
				presenceData.largeImageKey = "combate";
			} else presenceData.details = "Canais";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

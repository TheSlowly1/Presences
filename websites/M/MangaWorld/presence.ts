const presence = new Presence({
		clientId: "860298084512038964",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "mangaworld_logo_dark",
		},
		/* Query dell'URI - URI query */
		searchParams = new URLSearchParams(
			decodeURIComponent(document.location.search)
				.replace("?", "")
				.replaceAll("-", " ")
		);

	/* Homepage */
	if (document.location.pathname === "/") {
		presenceData.smallImageKey = "home";
		presenceData.smallImageText = "Homepage";
		presenceData.details = "Nella homepage";
	} else if (document.location.href.includes("/bookmarks/")) {
		/* Preferiti - Bookmarks*/
		presenceData.smallImageKey = "bookmark";
		presenceData.smallImageText = "Preferiti";
		presenceData.details = "Sfogliando i preferiti";

		const categories: { [page: string]: string } = {
				"RE-READING": "In rilettura",
				COMPLETED: "Completati",
				ON_HOLD: "In pausa",
				PLAN_TO_READ: "Da leggere",
				DROPPED: "Droppati",
				READING: "In lettura",
			},
			category = document.location.pathname.split("/")[3];
		if (category in categories) presenceData.state = categories[category];
	} else if (document.location.href.includes("keyword=")) {
		/* ----- ARCHIVIO - ARCHIVE ----- */
		/* Ricerca per nome - Search by name */
		presenceData.smallImageKey = "search";
		presenceData.smallImageText = "Ricerca per nome";
		presenceData.details = "Cercando:";
		presenceData.state = `"${searchParams.get("keyword")}"`;
	} else if (document.location.href.includes("author=")) {
		/* Ricerca per autore - Search by author */
		presenceData.smallImageKey = "pen";
		presenceData.smallImageText = "Ricerca per autore";
		presenceData.details = "Sfogliando i contenuti dell'autore:";
		presenceData.state = searchParams.get("author");
	} else if (document.location.href.includes("artist=")) {
		/* Ricerca per artista - Search by artist */
		presenceData.smallImageKey = "brush";
		presenceData.smallImageText = "Ricerca per artista";
		presenceData.details = "Sfogliando i contenuti dell'artista:";
		presenceData.state = searchParams.get("artist");
	} else if (document.location.href.includes("genre=")) {
		/* Ricerca per genere - Search by genre */
		const genre = searchParams.get("genre").split(" ");
		for (let i = 0; i < genre.length; i++)
			genre[i] = genre[i][0].toUpperCase() + genre[i].substr(1);
		presenceData.smallImageKey = "tags";
		presenceData.smallImageText = "Ricerca per genere";
		presenceData.details = "Sfogliando i contenuti del genere:";
		presenceData.state = genre.join(" ");
	} else if (document.location.href.includes("year=")) {
		/* Ricerca per anno - Search by year of release */
		presenceData.smallImageKey = "calendar2";
		presenceData.smallImageText = "Ricerca per anno";
		presenceData.details = "Sfogliando i contenuti dell'anno:";
		presenceData.state = searchParams.get("year");
	} else if (document.location.href.includes("status=")) {
		/* Ricerca per stato - Search by status */
		presenceData.smallImageKey = "slash";
		presenceData.smallImageText = "Ricerca per stato";
		presenceData.details = "Sfogliando i contenuti:";

		const statuses: { [value: string]: string } = {
				dropped: "Droppati",
				ongoing: "In corso d'opera",
				completed: "Finiti",
				paused: "In pausa",
				canceled: "Cancellati",
			},
			status = searchParams.get("status");
		if (status in statuses) presenceData.state = statuses[status];
	} else if (document.location.href.includes("type=")) {
		/* Ricerca per formato - Search by format */
		const rawtype = searchParams.get("type");
		presenceData.smallImageKey = "file3";
		presenceData.smallImageText = "Ricerca per formato";
		presenceData.details = "Sfogliando i contenuti in formato:";
		presenceData.state = rawtype[0].toUpperCase() + rawtype.substring(1);
	} else if (document.location.href.includes("sort=")) {
		/* Ricerca per ordinamento - Order by */
		presenceData.smallImageKey = "sort";
		presenceData.smallImageText = "Ricerca per ordinamento";
		presenceData.details = "Sfogliando i contenuti:";

		const sorts: { [page: string]: string } = {
				"a z": "Ordinati dalla A alla Z",
				"z a": "Ordinati dalla Z alla A",
				// eslint-disable-next-line camelcase
				most_read: "Più letti",
				// eslint-disable-next-line camelcase
				less_read: "Meno letti",
				newest: "Più recenti",
				oldest: "Meno recenti",
			},
			sort = searchParams.get("sort");
		if (sort in sorts) presenceData.state = sorts[sort];
	} else if (document.location.href.includes("archive")) {
		/* Pagina principale - Main page */
		presenceData.smallImageKey = "archive";
		presenceData.smallImageText = "Archivio";
		presenceData.details = "Nell'archivio";
		presenceData.state = "Sfogliando...";
	} else if (document.location.href.includes("/manga/")) {
		/* ----- LETTURA - READING ----- */
		/* Nell'e-reader - In the e-reader */
		if (document.location.href.includes("/read/")) {
			const [mangaName] = document.title
					.replace(" Scan ITA - MangaWorld", "")
					.replace(" Oneshot", "")
					.split("Capitolo"),
				[, chapter0n] = document.title
					.replace(" Scan ITA - MangaWorld", "")
					.split("Capitolo");
			let chapter = chapter0n;
			if (parseInt(chapter0n, 10) < 10) chapter = chapter0n.replace("0", "");
			let chapterString = "Capitolo";
			if (typeof chapter0n === "undefined")
				(chapterString = "Oneshot"), (chapter = "");

			presenceData.smallImageKey = "book3";
			presenceData.smallImageText = mangaName;
			presenceData.details = `Leggendo: ${mangaName}`;
			presenceData.state = `${chapterString + chapter} | Pagina ${
				document.location.pathname.split("/")[6]
			}`;
			presenceData.buttons = [
				{
					label: "Leggilo anche tu!",
					url: document.location.href.replace(/.$/, "1"),
				},
				{
					label: "Vai alla pagina del manga!",
					url: document.location.href.replace(/read\/.*/g, ""),
				},
			];
		} else {
			/* Nella pagina principale del manga - In the manga's main page */
			const pageName = document.title.replace(" Scan ITA - MangaWorld", "");
			presenceData.smallImageKey = "eye";
			presenceData.smallImageText = pageName;
			presenceData.details = "Visualizzando la pagina di:";
			presenceData.state = pageName;
			presenceData.buttons = [
				{
					label: "Vai alla pagina del manga!",
					url: document.location.href,
				},
			];
		}
	} else {
		/* In qualunque altra pagina - In any other page */
		const pageName = document.title.replace("MangaWorld - ", "");
		presenceData.smallImageKey = "eye";
		presenceData.smallImageText = `"${pageName}"`;
		presenceData.details = "Visualizzando la pagina:";
		presenceData.state = `"${pageName}"`;
	}
	if (presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presence.setActivity(presenceData);
	}
});
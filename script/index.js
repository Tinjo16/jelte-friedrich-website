'use strict';

// code bereitgestellt von ChatGPT
// Letzte bearbeitung der Website, automatische Meta Tag erstellung für das derzeitige Datum

        function setLastModifiedMeta() {
            const now = new Date();

            // Datum formatiert als YYYY-MM-DD HH:mm:ss
            const formattedDate = now.toISOString().replace("T", " ").split(".")[0];

            let metaTag = document.querySelector('meta[name="last-modified"]');

            if (!metaTag) {
                metaTag = document.createElement("meta");
                metaTag.setAttribute("name", "last-modified");

                // Füge es am Ende aller vorhandenen <meta>-Tags hinzu
                const allMetaTags = document.head.querySelectorAll("meta");
                if (allMetaTags.length > 0) {
                    allMetaTags[allMetaTags.length - 1].after(metaTag);
                } else {
                    document.head.prepend(metaTag);
                }
            }

            metaTag.setAttribute("content", formattedDate);

            console.log("Meta-Tag 'last-modified' wurde gesetzt:", formattedDate);
        }

        // Automatisch ausführen
        setLastModifiedMeta();




/////////////////erstellen der video-elementen/////////////////////

// Erstellen der Dom-Video-Elemente
const domMapping = () => {

    const url = '../script/json/video_data.json';

    const render = data => {
        console.log(data);
        const container = document.getElementById('content');

        
        Object.keys(data).forEach(key => {
            data[key].forEach(el => {

                //article Container
                const articleContainer = document.createElement('article');
                container.append(articleContainer);

                //titel Container
                const titleContainer = document.createElement('div');
                articleContainer.append(titleContainer);

                //Titel
                const title_h2 = document.createElement('h2');
                title_h2.innerHTML = el.title;
                titleContainer.append(title_h2);

                //Span in h2
                const span_h2 = document.createElement('span');
                span_h2.innerHTML = ` ${el.type.toUpperCase()}`;
                title_h2.append(span_h2);

                //video Container
                const videoContainer = document.createElement('div');
                videoContainer.className = 'v-container';
                articleContainer.append(videoContainer);

                //Video
                const video = document.createElement('video');
                video.src = el.videoPath;
                video.controls = true;
                video.preload = 'none';
                video.volume = 0.5;
                video.crossOrigin = 'anonymous';
                video.poster = el.poster;
                videoContainer.append(video);

                //Date
                const date_h3 = document.createElement('h3');
                date_h3.innerHTML = `Date: ${el.date}`;
                videoContainer.append(date_h3);

                //Text 
                const txt_p = document.createElement('p');
                txt_p.innerHTML = el.text;
                txt_p.className = 'beschreibung';
                videoContainer.append(txt_p);

                //yt_url 
                const yt_url_a = document.createElement('a');
                yt_url_a.href = el.ytPath;
                yt_url_a.target = '_blank';
                yt_url_a.className = 'yt_link';
                txt_p.append(yt_url_a);

                //Img in a Element
                const yt_img = document.createElement('img');
                yt_img.src = '../assets/image/icon/yt.svg';
                yt_img.title = 'Das Video auf Youtube schauen';
                yt_img.className = 'yt_img';
                yt_url_a.append(yt_img);

                //song
                const song_p = document.createElement('p');
                song_p.innerHTML = el.song;
                song_p.className = 'song';
                videoContainer.append(song_p);
            });
        });

        selecEl();
        initObserver();

    };

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('err');
            }
            return response.json();
        })
        .then(render)
        .catch(error => {
            console.error('err', error);
        });
}

const init = () => {
    domMapping();
}

// INIT
init();
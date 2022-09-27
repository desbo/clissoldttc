const apiURL = 'https://clissold-ttc-1518990911806.ew.r.appspot.com';
const league = 'CentralLondon';
const season = 'Winter_2022-23';
const clubId = 5123;

const url = `${apiURL}/${league}/${season}?club_id=${clubId}`

function init() {
  fetch(url)
    .then(res => res.json())
    .then(fixtures => {
      const upcoming = fixtures.filter(f => new Date(f.time) > new Date()).sort((a, b) => new Date(a.time) - new Date(b.time));
      const matchesHtml = upcoming.map(match => {
        const time = new Date(match.time);
        const dateString = time.toUTCString().replace(' GMT', '')

        return `
          <div class="match">
            <p>
              <div class="time">${dateString}</div>
              <div class="teams">
                <h2 class="title is-4">
                  <span class="team">${match.home.name}</span> vs <span class="team">${match.away.name}</span>
                </h2>
              </div>
              <div class="location">
                at <span class="location__name">${match.venue}</span>
              </div>
            </p>
          </div>
          `
      });

      const html = matchesHtml.length > 0 ? matchesHtml.join('\n') : '<p>No matches scheduled at the moment.</p>'

      document.getElementById('fixtures').insertAdjacentHTML('afterbegin', html);
    });
}

init();

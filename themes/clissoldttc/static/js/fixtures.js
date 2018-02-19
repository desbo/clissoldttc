const apiURL = 'https://tt365-fixtures.appspot.com';
const league = 'CentralLondon';
const season = 'Winter_2017-18';
const clubId = 5123;

const url = `${apiURL}/${league}/${season}?club_id=${clubId}`

function init() {
  fetch(url)
    .then(res => res.json())
    .then(fixtures => {
      const upcoming = fixtures.filter(f => new Date(f.time) > new Date());
      const html = upcoming.map(match => {
        const time = new Date(match.time);

        return `
          <div class="match">
            <p>
              <div class="time">
                ${time.toLocaleDateString()} ${time.toLocaleTimeString()}
              </div>

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

      document.getElementById('fixtures').insertAdjacentHTML('afterbegin', html.join('\n'));
    });
}

init();
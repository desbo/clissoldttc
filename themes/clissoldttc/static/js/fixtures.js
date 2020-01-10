const divisionIDs = [
  1134, 1135, 1136, 1137, 1138, 1139, 1140
]

function upcomingMatchesURL(division, from) {
  return `https://centrallondon.ttleagues.com/v1/api/divisions/${division}/matches/upcoming?_=${from}`
}

function matches(url) {
  return fetch(url)
    .then(r => r.json())
    .then(json => json.matches)
}

function testTeams(f, match) {
  return f(match.home) || f(match.away)
}

function involvesTeam(match, teamName) {
  return testTeams(t => t.name.toLowerCase().includes(teamName), match)
}

function time(match) {
  return new Date(Date.parse(match.time || match.date))
}

function init() {
  const now = Date.now()
  const matchData = divisionIDs.map(id => matches(upcomingMatchesURL(id, now)))
  
  Promise.all(matchData)
    .then(matches => {
      const matchesHtml = matches.flat()
        .filter(m => involvesTeam(m, "clissold") && !involvesTeam(m, "bye") && !!time(m).getDate() && time(m) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(match => {
          const dateString = time(match).toDateString().replace(' GMT', '')

          return `
            <div class="match">
              <p>
                <div class="time">${dateString} – <em>${match.name}</em></div>

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
        })

      const html = matchesHtml.length > 0 ? matchesHtml.join('\n') : '<p>No matches scheduled at the moment.</p>'
      document.getElementById('fixtures').insertAdjacentHTML('afterbegin', html);
    });
}

init();

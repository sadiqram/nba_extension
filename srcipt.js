const config = require('./config.js')
async function fetchData() {
    const url = 'https://api-nba-v1.p.rapidapi.com/games?season=2023';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.apiKey,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    game_list_today = document.getElementById("game-list-today");
    game_list_upcoming = document.getElementById("game-list-upcoming");

    // const res = await fetch(url, options);
    // const result = await res.text();
    // console.log(result);
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        //console.log(result);

        const games = data.response;
        //get current date
        let currentDate = new Date('2023-10-07');
        currentDate = currentDate.toISOString().split('T')[0];

        for (const game of games) {
            const gameDate = game.date.start.split('T')[0];//new Date(game.date.start);
            //console.log(game.date.start.slice(0, 10));

            if (gameDate == currentDate) {
                const homeTeam = game.teams.home.nickname;
                const awayTeam = game.teams.visitors.nickname;
                const listItem = document.createElement('li');
                const gameDateTime = new Date(game.date.start).toLocaleString();

                listItem.textContent = `${homeTeam} vs ${awayTeam} - ${gameDateTime}`;
                game_list_today.appendChild(listItem);
                //console.log(`${homeTeam} vs ${awayTeam}`);
            }
            else {
                const homeTeam = game.teams.home.nickname;
                const awayTeam = game.teams.visitors.nickname;
                const listItem = document.createElement('li');
                const gameDateTime = new Date(game.date.start).toLocaleString();
                listItem.textContent = `${homeTeam} vs ${awayTeam} - ${gameDateTime}`;
                game_list_upcoming.appendChild(listItem);

            }

        }
    } catch (error) {
        console.error(error);
    }

}
fetchData();


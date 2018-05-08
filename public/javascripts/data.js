$(document).ready(function() {
  
  axios({
    type: 'GET',
    url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=QB&sort=stats.Yds.D",
    dataType: 'json',
    async: false,
    headers: {
      "Authorization": "Basic " + btoa('diegolealb:3478561a')
    }
  })
  .then(response => {
    const topFivePass = [];
    for (let i = 0; i < 5; i++){
      let playerStats = response.data.cumulativeplayerstats;
      topFivePass.push(playerStats.playerstatsentry[i].player.FirstName + " " + playerStats.playerstatsentry[i].player.LastName)
      
      $('.top-five-by-pass-yds').append(` <li>${topFivePass[i]}</li> `)}
    })
  .catch(err => {console.log(err)})

  axios({
    type: 'GET',
    url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=RB&sort=stats.Yds.D",
    dataType: 'json',
    async: false,
    headers: {
      "Authorization": "Basic " + btoa('diegolealb:3478561a')
    }
  })
  .then(response => {
    const topFiveRush = [];
    for (let i = 0; i < 5; i++){
      let playerStats = response.data.cumulativeplayerstats;
      topFiveRush.push(playerStats.playerstatsentry[i].player.FirstName + " " + playerStats.playerstatsentry[i].player.LastName)
      
      $('.top-five-by-rush-yds').append(` <li>${topFiveRush[i]}</li> `)}
    })
  .catch(err => {console.log(err)})



}) //End of document ready function
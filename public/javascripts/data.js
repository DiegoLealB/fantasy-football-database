$(document).ready(function() {
  function topPassYards () {
    axios({
      type: 'GET',
      url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=QB&sort=stats.Yds.D&limit=5",
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa('diegolealb:3478561a')
      }
    })
    .then(response => {
      const topFivePass = [];
      for (let i = 0; i < 5; i++){
        var playerStats = response.data.cumulativeplayerstats;
        topFivePass.push(playerStats.playerstatsentry[i].player.FirstName + " " + playerStats.playerstatsentry[i].player.LastName)
        
        $('.top-five-by-pass-yds').append(` <li>${topFivePass[i]}</li> `)}
        console.log(playerStats)
      })
    .catch(err => {console.log(err)})
  }

  function topRushYards () {
    axios({
      type: 'GET',
      url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=RB&playerstats=rushing.yds&sort=stats.rushing-yds.d&limit=5",
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
  }
  
  function topReceivingYards() {
    axios({
      type: 'GET',
      url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=WR&playerstats=receiving.yds&sort=stats.receiving-yds.d&limit=5",
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa('diegolealb:3478561a')
      }
    })
    .then(response => {
      const topFiveReceiving = [];
      for (let i = 0; i < 5; i++){
        
        let playerStats = response.data.cumulativeplayerstats;
        topFiveReceiving.push(playerStats.playerstatsentry[i].player.FirstName + " " + playerStats.playerstatsentry[i].player.LastName)
        
        $('.top-five-by-receiving-yds').append(` <li>${topFiveReceiving[i]}</li> `)}
      })
    .catch(err => {console.log(err)})
    }


    setTimeout(topPassYards, 1000)
    setTimeout(topRushYards, 1500)
    setTimeout(topReceivingYards, 2000)
    





  
  
  
  }) //End of document ready function
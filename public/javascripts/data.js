$(document).ready(function() {
  
  function allPlayers () {
    axios({
      type: 'GET',
      url: `https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=QB,RB,WR,TE&playerstats=Yds,Avg,TD,Lost,2PTMade`, //&offset=${page}
      //try to only use this api call to display all pages
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa('diegolealb:3478561a')
      }
    })
    .then(response => {
      const twentyPlayersArr = [];
      let playerStats = response.data.cumulativeplayerstats;

      for (let i = 0; i < 20; i++) {
        twentyPlayersArr.push(playerStats.playerstatsentry[i].player.FirstName + " " + playerStats.playerstatsentry[i].player.LastName)
        $('.all-players').append(`<li><a href='/player/${playerStats.playerstatsentry[i].player.ID}'>${twentyPlayersArr[i]}</a></li>`)
      }
    })
    .catch(err => {console.log(err)})
  }

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
      const topFivePassArr = [];
      let passingStats = response.data.cumulativeplayerstats;

      for (let i = 0; i < 5; i++){
        topFivePassArr.push(passingStats.playerstatsentry[i].player.FirstName + " " + passingStats.playerstatsentry[i].player.LastName)
        $('.top-five-by-pass-yds').append(` <li><a href='/player/${passingStats.playerstatsentry[i].player.ID}'>${topFivePassArr[i]}</a></li> `
      )}
      console.log("Passing yards:", passingStats.playerstatsentry)
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
      const topFiveRushArr = [];
      for (let i = 0; i < 5; i++){
        let rushingStats = response.data.cumulativeplayerstats;
        topFiveRushArr.push(rushingStats.playerstatsentry[i].player.FirstName + " " + rushingStats.playerstatsentry[i].player.LastName)
        
        $('.top-five-by-rush-yds').append(` <li><a href='/player/${rushingStats.playerstatsentry[i].player.ID}'>${topFiveRushArr[i]}</a></li> `)}
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
      const topFiveReceivingArr = [];
      let receivingStats = response.data.cumulativeplayerstats;

      for (let i = 0; i < 5; i++){
        topFiveReceivingArr.push(receivingStats.playerstatsentry[i].player.FirstName + " " + receivingStats.playerstatsentry[i].player.LastName)
        $('.top-five-by-receiving-yds').append(` <li><a href='/player/${receivingStats.playerstatsentry[i].player.ID}'>${topFiveReceivingArr[i]}</a></li> `)}
      })
    .catch(err => {console.log(err)})
    }

  allPlayers();
  topPassYards();
  topRushYards();
  topReceivingYards();
  
  }) //End of document ready function

  // move pages
  // ('.left-page').click(function() {
  //   if (page > 0) {
  //     page-=20;
  //   }
  // })

  // ('.right-page').click(function() {
  //   if (page < 620) {
  //     page+=20;
  //     console.log("click")
  //   }
  // })
$(document).ready(function() {
  const playersArr = [];
  const topFivePassArr = [];
  const topFiveRushArr = [];
  const topFiveReceivingArr = [];

  function allPlayers (number) {
    axios({
      type: 'GET',
      url: `https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=QB,RB,WR,TE&playerstats=Yds,Avg,TD,Lost,2PTMade`, //&offset=${page}
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa('diegolealb:3478561a')
      }
    })
    .then(response => {
      let playerStats = response.data.cumulativeplayerstats;
      $('.all-players').empty();
      for (var i = number; i < number + 60; i++) {
        playersArr.push(playerStats.playerstatsentry[i].player.FirstName + " " + playerStats.playerstatsentry[i].player.LastName);

        $('.all-players').append(`<li><a href='/player/${playerStats.playerstatsentry[i].player.ID}'>${playersArr[i]}</a></li>`)
      }
    })
    .catch(err => {console.log(err)})
  }
  
  function topPassYards (number) {
    axios({
      type: 'GET',
      url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=QB&sort=stats.Yds.d",
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa('diegolealb:3478561a')
      }
    })
    .then(response => {
      let passingStats = response.data.cumulativeplayerstats;
      $('.top-five-by-pass-yds').empty();

      for (let i = number; i < number + 5; i++){
        topFivePassArr.push(passingStats.playerstatsentry[i].player.FirstName + " " + passingStats.playerstatsentry[i].player.LastName)
        $('.top-five-by-pass-yds').append(` <li><a href='/player/${passingStats.playerstatsentry[i].player.ID}'>${topFivePassArr[i]}</a></li> `
      )}
      // console.log("Passing yards:", passingStats.playerstatsentry)
    })
    .catch(err => {console.log(err)})
  }

  function topRushYards (number) {
    axios({
      type: 'GET',
      url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=RB&playerstats=rushing.yds&sort=stats.rushing-yds.d",
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa('diegolealb:3478561a')
      }
    })
    .then(response => {
      $('.top-five-by-rush-yds').empty();
      for (let i = number; i < number + 5; i++){
        let rushingStats = response.data.cumulativeplayerstats;
        topFiveRushArr.push(rushingStats.playerstatsentry[i].player.FirstName + " " + rushingStats.playerstatsentry[i].player.LastName)
        
        $('.top-five-by-rush-yds').append(` <li><a href='/player/${rushingStats.playerstatsentry[i].player.ID}'>${topFiveRushArr[i]}</a></li> `)}
      })
    .catch(err => {console.log(err)})
  }
  
  function topReceivingYards(number) {
    axios({
      type: 'GET',
      url: "https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?position=WR&playerstats=receiving.yds&sort=stats.receiving-yds.d",
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa('diegolealb:3478561a')
      }
    })
    .then(response => {
      $('.top-five-by-receiving-yds').empty();
      let receivingStats = response.data.cumulativeplayerstats;
      $('.top-five-by-receiving-yds').empty();

      for (let i = number; i < number + 5; i++){
        topFiveReceivingArr.push(receivingStats.playerstatsentry[i].player.FirstName + " " + receivingStats.playerstatsentry[i].player.LastName)
        $('.top-five-by-receiving-yds').append(` <li><a href='/player/${receivingStats.playerstatsentry[i].player.ID}'>${topFiveReceivingArr[i]}</a></li> `)}
      })
    .catch(err => {console.log(err)})
    } //End of top receiving yards function

    
    var x = 0;
    if ( x === 0 ) {
      allPlayers(x);
    } 
    $('.prev-twenty-btn').click(function() {
      if (x > 0) {
        x -= 60;
        allPlayers(x);
      }
    })
    $('.next-twenty-btn').click(function() {
      x += 60;
      allPlayers(x);
    })
    //all-players buttons

    var p = 0;
    if ( p === 0 ) {
      topPassYards(p);
    } 
    $('.prev-five-pass-btn').click(function() {
      if (p > 0) {
        p -= 5;
        topPassYards(p);
      }
    })
    $('.next-five-pass-btn').click(function() {
      p += 5;
      topPassYards(p);
    })
    //top-five-pass buttons

    var r = 0;
    if ( r === 0 ) {
      topRushYards(r);
    } 
    $('.prev-five-rush-btn').click(function() {
      if (r > 0) {
        r -= 5;
        topRushYards(r);
      }
    })
    $('.next-five-rush-btn').click(function() {
      r += 5;
      topRushYards(r);
    })
    //top-five-rush buttons

    var c = 0;
    if ( c === 0 ) {
      topReceivingYards(c);
    } 
    $('.prev-five-receiving-btn').click(function() {
      if (c > 0) {
        c -= 5;
        topReceivingYards(c);
      }
    })
    $('.next-five-receiving-btn').click(function() {
      c += 5;
      topReceivingYards(c);
    })
    //top-five-receiving buttons

    $('.heart').click(function() {
      $('.heart').toggleClass("clicked-heart")
    })

    

  }) //End of document ready function
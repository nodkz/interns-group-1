const fetch = require('node-fetch').default;

function parseLink(link) {
  return fetch(link);
}

function getPeopleDataViaPromiseSyntax(userid) {
  return parseLink(`https://swapi.co/api/people/${userid}/`)
    .then(userResponse => userResponse.json())
    .then(userData => {
      return parseLink(userData.homeworld)
        .then(worldResp => worldResp.json())
        .then(worldData => {
          userData.homeworld = worldData;
          return userData;
          // console.log(userData);
        });
    })
    .then(userData => {
      // console.log(userData);
      userData.films.forEach((film, index) => {
        parseLink(film)
          .then(filmResponse => filmResponse.json())
          .then(filmData => {
            userData.films[index] = filmData;
          });
      });
      console.log(userData);
      return userData;
    })
    .then(userData => {
      // console.log(userData);
      userData.species.forEach((species, index) => {
        parseLink(species)
          .then(speciesResponse => speciesResponse.json())
          .then(speciesData => {
            userData.species[index] = speciesData;
          });
      });
      // console.log(userData);
      return userData;
    })
    .then(userData => {
      // console.log(userData);
      userData.vehicles.forEach((vehicle, index) => {
        parseLink(vehicle)
          .then(vehicleResponse => vehicleResponse.json())
          .then(vehicleData => {
            userData.vehicles[index] = vehicleData;
          });
      });
      // console.log(userData);
      return userData;
    })
    .then(userData => {
      // console.log(userData);
      userData.starships.forEach((starship, index) => {
        parseLink(starship)
          .then(starshipResponse => starshipResponse.json())
          .then(starshipData => {
            userData.starships[index] = starshipData;
          });
      });
      // console.log('==asyncDone==', userData);
      return userData;
    });
}

getPeopleDataViaPromiseSyntax(1).then(data => console.log(data));

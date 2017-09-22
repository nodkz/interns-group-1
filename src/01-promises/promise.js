const fetch = require('node-fetch').default;

const peopleUrl = 'https://swapi.co/api/people/1/';

function loadData(url) {
  console.log('Get', url);
  return fetch(url)
    .then(res => res.json())
    .then(rrr => {
      console.log('Recieved', url);
      return rrr;
    });
}

function getJsonViaPromise(url) {
  return loadData(url)
    .then(res => {
      const people = res;
      const { films, homeworld: homeworldUrl, species, starships, vehicles } = res;
      return Promise.all([
        Promise.all(films.map(u => loadData(u))).then(r => {
          people.films = r;
        }),
        Promise.all(starships.map(u => loadData(u))).then(r => {
          people.starships = r;
        }),
        Promise.all(vehicles.map(u => loadData(u))).then(r => {
          people.vehicles = r;
        }),
        Promise.all(species.map(u => loadData(u))).then(r => {
          people.species = r;
        }),
        loadData(homeworldUrl).then(homeworld => {
          people.homeworld = homeworld;
        }),
      ]).then(() => people);
    })
    .then(people => console.log(people))
    .catch(err => console.error(err))
    .then(() => console.log('DONE!'));
}

console.log(getJsonViaPromise(peopleUrl));
console.log('END_TICK');

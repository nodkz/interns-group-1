const fetch = require('node-fetch').default;

const peopleUrl = 'https://swapi.co/api/people/1/';

async function loadData(url) {
  const res = await fetch(url);
  return res.json();
}

console.log(loadData(peopleUrl));

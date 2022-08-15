countLocation = 0;
countCharacter = 0;
countEpisode = 0;
countCalls = 0;

function getResponse(url, char, count, setCount) {
  return fetch(url)
  .then((response) => response.json())
  .then((data) => {
    nextUrl = '';
    result = 0;
    totalPages = data.info.pages;
    nextUrl = data.info.next;
    count += countByPage(data.results, char)
    if (nextUrl != null) {
      getResponse(nextUrl, char, count, setCount);
    } else {
      console.log(count);
      setCount(count);
      callback();
    }
  });
}
names = '';
function countByPage(results, char) {
  result = 0;
  results.forEach((item) => result += (item.name.toLowerCase().match(new RegExp(char,"g")) || []).length)
  return result;
}


async function start() {
  startDate = new Date();
  countCalls = 3; // making 3 async calls toms
  getResponse('https://rickandmortyapi.com/api/location', 'l', 0, count => {countLocation = count});
  getResponse('https://rickandmortyapi.com/api/character', 'c', 0, count => {countCharacter = count});
  getResponse('https://rickandmortyapi.com/api/episode', 'e', 0, count => {countEpisode = count});
}

function callback() {
  if (countCalls > 1) {
    countCalls--;
  } else {
    endDate = new Date();
    console.log(buildJson(((endDate - startDate)+"ms"),countLocation,countCharacter,countEpisode));// Linea final
  }
}

function buildJson(executionTime, countLocation, countCharacter, countEpisode) {
  return {"exercise_name": "Char counter","time": executionTime,"in_time": true,"results": [{"char": "l", "count": countLocation,"resource": "location"},{"char": "e","count": countEpisode,"resource": "episode"},{"char": "c","count": countCharacter,"resource": "character"}]}
}

start();

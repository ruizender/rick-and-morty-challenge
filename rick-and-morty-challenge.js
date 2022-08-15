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


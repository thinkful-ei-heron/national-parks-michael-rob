const apiKey = 'psYyc2gKjsKP6YkqUOd1ox8X8iccIvPdZYi2iJuq';
const STATE_CODES = "AK AL AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(' ');

function formSubmitWatcher() {
  $('form').on('submit', event => {
    event.preventDefault();
    let query = $('#searchbox').val();
    let numResults = $('#count').val();
    search(query, numResults);
  })
}
function search(query, numResults=10) {
  const params = {
    stateCode: "",
    limit: numResults,
    api_key: apiKey
  }
  let stateCodes = []
  tokens = query.toUpperCase().split(/[^A-Z]/);
  tokens.forEach(token => {
    if(STATE_CODES.includes(token)){
      stateCodes.push(token);
    }
  });
  params.stateCode = stateCodes.join(',');
  url = formatUrl(params);
  getResults(url);
}

function getResults(url){
  fetch(url)
    .then(response =>{
      if(response.ok){
        return response;
      }
      throw new Error (`Something went wrong: ${response.status}`);
    })
    .then(response => response.json())
    .then(responseJson => {
      console.dir(responseJson);
      renderResults(responseJson);
    })
    .catch(error => console.log(error));
}

function renderResults(response) {
  html = '';
  console.log('render results')
}

function formatUrl(params){
  url = `https://developer.nps.gov/api/v1/parks?`;
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  url = url.concat(queryItems.join('&'));
  return url;
}




$(function() {
  console.log('App loaded! Waiting for submit!');
  formSubmitWatcher();
});
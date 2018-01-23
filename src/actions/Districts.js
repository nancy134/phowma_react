/* eslint-disable no-undef */

function search(address,city,state,zip,cb) {
  var url = 'http://dev.phowma.com/api/v1/districts/find?address='+address+"&city="+city+"&state="+state;
  return fetch(url, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response){
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
}

function parseJSON(response){
  return response.json();
}

const Districts = {search};
export default Districts;


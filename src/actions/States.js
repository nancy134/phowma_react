/* eslint-disable no-undef */

function search(cb) {
  var url = 'http://dev.phowma.com/api/v1/states?type=min';
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
  console.log(error)
  throw error;
}

function parseJSON(response){
  return response.json();
}

const States = {search};
export default States;


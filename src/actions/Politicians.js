/* eslint-disable no-undef */

function search(props, page, cb) {

  var query = "";
  if (props.democratSelected) query = query.concat("q[party_in][]=0&");
  if (props.republicanSelected) query = query.concat("q[party_in][]=1&");
  if (props.independentSelected) query = query.concat("q[party_in][]=2&");
  if (props.senateSelected) query = query.concat("q[position_in][]=0&");
  if (props.houseSelected) query = query.concat("q[position_in][]=1&");
  if (props.governorSelected) query = query.concat("q[position_in][]=2&");
  if (props.stateSelected && props.stateSelected !== '0') query = query.concat("q[state_id_eq]="+props.stateSelected+"&");
  if (props.district_id) query = "district="+props.district_id+"&state_id="+props.state_id;
  console.log("query: "+query);
  var url = 'http://dev.phowma.com/api/v1/politicians?per_page=10&page='+page+"&"+query;
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

const Politicians = {search};
export default Politicians;


import axios from "axios";

export async function fetchStartRoulette() {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  axios.post(serverEndpoint + '/start',
    {},
    {
      withCredentials : true,
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }
  ).then((response) => alert(response.status))
    .catch((error) => alert("error"));
}

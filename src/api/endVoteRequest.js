import axios from "axios";

export async function fetchEndRoulette() {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  axios.post(serverEndpoint + '/end',
    {},
    {
      withCredentials : true,
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }
  ).then((response) => alert(response.status))
    .catch((error) => console.error('Error making request:', error));
}

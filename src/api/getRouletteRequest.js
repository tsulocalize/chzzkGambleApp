import axios from "axios";

export async function fetchGetRoulette() {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  return await axios.get(serverEndpoint + '/roulette',
    {
      withCredentials : true,
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }
  ).then((response) => {
    return response.data;
  })
    .catch((error) => console.error('Error making request:', error));
}

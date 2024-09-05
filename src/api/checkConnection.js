import axios from "axios";

export async function fetchCheckConnection() {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  return (await axios.get(serverEndpoint + '/check',
    {
      withCredentials : true,
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }
  )).status === 200;
}

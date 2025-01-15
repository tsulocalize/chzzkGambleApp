import axios from "axios";

export async function fetchGetVideoDonation(channelName) {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  return await axios.get(serverEndpoint + `/video-donations/v1?channelName=${channelName}`,
    {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
    }
  ).then((response) => {
    return response.data;
  })
    .catch((error) => console.error('Error making request:', error));
}

import axios from "axios";

export async function fetchConnection(channelName) {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  return await axios.post(serverEndpoint + '/connect',
    {
      "channelName": channelName,
      },
    {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }
  ).then((response) => {
    return response.data
  }).catch((error) => console.error('연결에 실패했습니다.', error))
}

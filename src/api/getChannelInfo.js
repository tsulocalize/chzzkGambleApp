import axios from "axios";

export async function fetchChannelInfo(channelName) {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  return await axios.get(serverEndpoint + `/channel-info?channelName=${channelName}`,
    {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }
  ).then((response) => {
    return response.data
  }).catch((error) => {
    if (error.response && error.response.data) {
      alert(`에러 코드 : ${error.response.data.code} \n원인: ${error.response.data.message}`);
    } else {
      alert('알 수 없는 에러가 발생했습니다.');
    }
  });
}

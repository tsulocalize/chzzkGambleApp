import axios from "axios";

export async function fetchGetVideoUnitPrice(channelId) {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  return await axios.get(serverEndpoint + `/video-setting?channelId=${channelId}`,
    {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
    }
  ).then((response) => {
    return response.data.payAmountPerSecond;
  })
    .catch((error) => {
      alert('error : 1초당 치즈 값을 가져오는데 실패했습니다.');
    });
}

import axios from "axios";

export async function fetchCreateRoulette(streamUri) {
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;

  axios.post(serverEndpoint + '/create',
    {
      streamUri: streamUri
    },
    {
      withCredentials : true,
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }
  ).then((response) => {
    if (response.status === 200) {
      alert("룰렛이 생성되었습니다.")
    }
  })
    .catch((error) => {
      alert('룰렛 생성에 문제가 발생했습니다.');
      console.error('Error making request:', error);
    });
}

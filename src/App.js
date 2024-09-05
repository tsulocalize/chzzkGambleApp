import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {fetchCreateRoulette} from './api/createRouletteRequest';
import {fetchStartRoulette} from "./api/startVoteRequest";
import {fetchCheckConnection} from "./api/checkConnection";
import {fetchEndRoulette} from "./api/endVoteRequest";
import {fetchGetRoulette} from "./api/getRouletteRequest";
import WheelComponent from './component/WheelComponent';
import useInterval from './api/useInterval';
import useAxios from "./api/useAxios";

function App() {

  useEffect(() => {
    document.title = 'ChzzkGamble';
  }, []);

  // Function to make the API call
  const [channelUri, setChannelUri] = useState('');
  const [props, setProps] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [voteButtonName, setVotebuttonName] = useState("투표 시작");


  // Function to handle input change
  const handleInputChange = (event) => {
    setChannelUri(event.target.value);
  };

  const handleFetchGet = async () => {
    try {
      const result = await fetchGetRoulette();
      setProps(result);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleVote = async () => {
    const res = await fetchStartRoulette()
    if (res.status === 200) {
      setIsStarted(true);
    }
  }

  // if (true) {
  //   useInterval(() => {
  //     fetchCheckConnection().then(res => setConnected(res))
  //   }, 1000);
  // }
  // //

  return (
    <div className="App">
      <h1>치지직 룰렛!</h1>
      <span>
        { connected ? "연결됨" : "연결 안됨" }
      </span>
      <span className="Wheel">
        <WheelComponent props={props}/>
      </span>
      <div className="input-container">
        방송 주소 :
        <input
          className="styled-input"
          type="text"
          value={channelUri}
          onChange={handleInputChange}
          placeholder="https://chzzk.naver.com/live/4d812b586ff63f8a2946e64fa860bbf5"
        />
      </div>
      <span className="button-container">
        <button className="action-button" onClick={() => fetchCreateRoulette(channelUri)}>룰렛 생성</button>
      </span>
      <span className="button-container">
        <button className="action-button" onClick={() => fetchStartRoulette()}>{voteButtonName}</button>
      </span>
      <span className="button-container">
        <button className="action-button" onClick={() => fetchEndRoulette()}>투표 종료</button>
      </span>
      <span className="button-container">
        <button className="action-button" onClick={() => handleFetchGet()}>투표 결과 확인</button>
      </span>
    </div>
  );
}

export default App;

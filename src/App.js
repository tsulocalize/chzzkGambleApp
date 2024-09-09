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
  const [channelImageUrl, setChannelImageUrl] = useState(process.env.PUBLIC_URL + '/user.png');
  const [channelName, setChannelName] = useState("채널명");
  const [props, setProps] = useState(null);
  const [voteButtonName, setVotebuttonName] = useState("투표 시작");


  // Function to handle input change
  const handleInputChange = (event) => {
    setChannelUri(event.target.value);
  };

  const handleCreateRoulette = async () => {
    const result = await fetchCreateRoulette(channelUri);
    setChannelImageUrl(result?.channelImageUrl);
    setChannelName(result?.channelName);
  }

  const handleFetchGet = async () => {
    try {
      const result = await fetchGetRoulette();
      setProps(result);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <span className="gamble">
          치지직 룰렛
        </span>
        <div className="input-container header_right">
          <input
            className="styled-input"
            type="text"
            value={channelUri}
            onChange={handleInputChange}
            placeholder="https://chzzk.naver.com/live/4d812b586ff63f8a2946e64fa860bbf5"
          />
          <button className="create-button" onClick={() => handleCreateRoulette()}>룰렛 생성</button>
        </div>
        <div className="header_right">
          <img className="face" src={channelImageUrl} alt="이미지"/>
          <span className="name">
            {channelName}
          </span>
        </div>
      </div>
      <div>
        <span className="Wheel">
          {/*<WheelComponent props={props}/>*/}
        </span>
      </div>


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

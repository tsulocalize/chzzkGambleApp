import "./App.css";
import React, { useState } from "react";
import { fetchCreateRoulette } from "./api/createRouletteRequest";
import { fetchGetRoulette } from "./api/getRouletteRequest";
import Roulette from "./component/Roulette";
import Button from "./component/Button";
import {fetchStartRoulette} from "./api/startVoteRequest";

function App() {
  const [channelUri, setChannelUri] = useState("");
  const [channelImageUrl, setChannelImageUrl] = useState(
    process.env.PUBLIC_URL + "/user.png"
  );
  const [channelName, setChannelName] = useState("채널명");
  const [options, setsOptions] = useState(null);

  const OPTIONS = [{text : '우주', value: 3}, {text: '리안', value: 2}, {text: '카피', value: 2}, {text: '헤일리', value: 1}];
  const handleInputChange = (event) => {
    setChannelUri(event.target.value);
  };

  const handleCreateRoulette = async () => {
    const result = await fetchCreateRoulette(channelUri);
    setChannelImageUrl(result?.channelImageUrl);
    setChannelName(result?.channelName);
  };

  const handleGetOptions = async () => {
    try {
      const result = await fetchGetRoulette();
      setsOptions(result.elements);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <span className="gamble">치지직 룰렛</span>
        <div className="input-container header_right">
          <input
            className="styled-input"
            type="text"
            value={channelUri}
            onChange={handleInputChange}
            placeholder="치지직 링크를 입력하세요."
          />
          <Button
            className="create-button"
            onClick={handleCreateRoulette}
            label={"룰렛 생성"}
          />
          <Button
            className="create-button"
            onClick={fetchStartRoulette}
            label={"투표 시작"}
          />
        </div>
        <div className="header_right">
          <img className="face" src={channelImageUrl} alt="이미지"/>
          <span className="name">{channelName}</span>
        </div>
      </div>
      <div className="content-container">
        {OPTIONS?.length && (
          <Roulette handleGetOptions={handleGetOptions} options={OPTIONS}/>
        )}
      </div>

      {/* 

      <span className="button-container">
        <button className="action-button" onClick={() => fetchEndRoulette()}>
          투표 종료
        </button>
      </span>
      <span className="button-container">
        <button className="action-button" onClick={() => handleFetchGet()}>
          투표 결과 확인
        </button>
      </span> */}
    </div>
  );
}

export default App;

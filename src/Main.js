import React, {useState} from "react";
import "./Main.css";
import {fetchCreateRoulette} from "./api/createRouletteRequest";
import {fetchConnection} from "./api/connectRequest";
import {fetchGetRoulette} from "./api/getRouletteRequest";
import Button from "./component/Button";
import {fetchStartRoulette} from "./api/startVoteRequest";
import Roulette from "./component/Roulette";
import Table from "./component/table";

function Main() {
  const [inputChannelName, setInputChannelName] = useState("");
  const [channelImageUrl, setChannelImageUrl] = useState(
    process.env.PUBLIC_URL + "/user.png"
  );
  const [channelName, setChannelName] = useState("");
  const [options, setsOptions] = useState([
    {name : '우주', vote: 1, percentage: '25%'}, // 코어
    {name : '켬미', vote: 1, percentage: '25%'}, // 코어
    {name : '땡이', vote: 1, percentage: '25%'}, // 코어
    {name : '미아', vote: 1, percentage: '25%'}, // 코어
  ]);

  const handleInputChange = (event) => {
    setInputChannelName(event.target.value);
  };

  const handleCreateRoulette = async () => {
    await fetchCreateRoulette(channelName);
  };

  const handleConnect = async () => {
    try {
      const result = await fetchConnection(inputChannelName);
      setChannelImageUrl(result?.channelImageUrl);
      setChannelName(result?.channelName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetOptions = async () => {
    try {
      const result = await fetchGetRoulette();
      if (result.length > 0) {
        setsOptions(result);
      } else {
        alert("투표 내역이 없습니다.")
      }
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
            value={inputChannelName}
            onChange={handleInputChange}
            placeholder="스트리머 이름를 입력하세요."
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
          <Button
            className="create-button"
            onClick={handleConnect}
            label={"연결"}
          />
        </div>
        <div className="header_right">
          <img className="face" src={channelImageUrl} alt="이미지"/>
          <span className="name">{channelName}</span>
        </div>
      </div>
      <div className="content-container">
        {options?.length && (
          <Roulette handleGetOptions={handleGetOptions} options={options}/>
        )}
        <Table data={options} />
      </div>
    </div>
  );
}

export default Main;
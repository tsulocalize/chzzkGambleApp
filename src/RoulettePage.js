import React, {useEffect, useState} from "react";
import "./RoulettePage.css";
import {fetchGetRoulette} from "./api/getRouletteRequest";
import Roulette from "./component/Roulette";
import {Header} from "./component/Header";
import TipComponent from "./component/TipComponent";
import Flag from "./component/Flag";
import RouletteTable from "./component/roulette-table";
import ToggleButton from 'react-toggle-button';
import {fetchCreateRoulette} from "./api/createRouletteRequest";
import {fetchStartRoulette} from "./api/startVoteRequest";
import {fetchStopRoulette} from "./api/endVoteRequest";

function RoulettePage() {
  const [channelName, setChannelName] = useState("");
  const [options, setsOptions] = useState([
    {name : '밤새도록', vote: 1, percentage: '33.33%'},
    {name : '돌아가는', vote: 1, percentage: '33.33%'},
    {name : '룰렛', vote: 1, percentage: '33.33%'}
  ]);
  const [selected, setSelected] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isOnVoting, setIsOnVoting] = useState(false);
  const [isVotingChanged, setIsVotingChanged] = useState(false);

  const [tips, setTips] = useState([
    'Tip. 투표 "ON" 일 때 도네이션이 집계됩니다',
    'Tip. 도네이션을 <내용> 형식으로 보내보세요',
    'Tip. 투표를 "OFF" 하고 돌려야 정확한 결과가 나옵니다'
  ]);

  const handleGetOptions = async () => {
    try {
      const result = await fetchGetRoulette();
      if (result.length > 0) {
        setsOptions(result);
      }
      return true;
    } catch (error) {
      console.log(`Error: ${error.message}`);
      return false;
    }
  };

  useEffect(() => {
    // Start the interval when the component mounts
    if (!isOnVoting || channelName === "") {
      return;
    }
    const intervalId = setInterval(async () => {
      const available = await handleGetOptions();
      if (!available) {
        clearInterval(intervalId);
      }
    }, 5000); // Run every second (5s)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [channelName, isOnVoting]);

  useEffect(() => {
    if (channelName === "") {
      return;
    }
    fetchCreateRoulette(channelName, 1000)
      .then();
  }, [channelName]);

  useEffect(() => {
    if (channelName === "" || !isVotingChanged) {
      return;
    }
    if (isOnVoting) {
      fetchStartRoulette().then();
    } else {
      fetchStopRoulette().then();
    }
  }, [isOnVoting, channelName, isVotingChanged]);

  return (
    <div className="App">
      <Header title="도네이션 룰렛" channelName={channelName} setChannelName={setChannelName} fetchUnitPrice={() => {
      }} />
      <div className="content-container">
        <Flag trigger={trigger} text={selected}></Flag>
        {options?.length && (
          <Roulette options={options} setSelected={setSelected} setTrigger={setTrigger}/>
        )}

        <div className="right-content">
          <div className="toggleContainer">
            투표
            <ToggleButton
              value={isOnVoting}
              onToggle={(value) => {
                setIsOnVoting(!value);
                setIsVotingChanged(true);
              }}/>
          </div>
          <RouletteTable data={options}/>
        </div>
      </div>
      <div className="footer">
        <TipComponent tips={tips}/>
        <a className="discord"
           href="https://discord.gg/48J5u2NVwK"
           target="_blank"
           rel="noreferrer"
        >
          <img
            className="discordImg"
            src={"/small_logo_blurple_RGB.svg"}
            alt={""}

          />
        </a>
      </div>
    </div>
  );
}

export default RoulettePage;
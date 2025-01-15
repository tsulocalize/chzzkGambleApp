import React, {useEffect, useState} from "react";
import "./RoulettePage.css";
import {fetchGetRoulette} from "./api/getRouletteRequest";
import Roulette from "./component/Roulette";
import Table from "./component/table";
import {Header} from "./component/Header";
import TipComponent from "./component/TipComponent";
import Flag from "./component/Flag";

function RoulettePage() {
  const [channelName, setChannelName] = useState("");
  const [options, setsOptions] = useState([
    {name : '밤새도록', vote: 1, percentage: '33%'},
    {name : '돌아가는', vote: 1, percentage: '33%'},
    {name : '룰렛', vote: 1, percentage: '33%'},
    {name : '정말 맛있고 짜고 싱싱한 새우를 한접시 드셔보세요', vote: 1, percentage: '33%'},
    {name : '정말 맛있고', vote: 1, percentage: '33%'},
    {name : '정말 맛있고', vote: 1, percentage: '33%'},
    {name : '정말 맛있고', vote: 1, percentage: '33%'},
    {name : '정말 맛있고', vote: 1, percentage: '33%'}
  ]);
  const [selected, setSelected] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isOnVoting, setIsOnVoting] = useState(false);

  const [tips, setTips] = useState([
    'Tip. 투표 "ON" 일 때 도네이션이 집계됩니다',
    'Tip. 도네이션을 <내용> 형식으로 보내보세요',
    'Tip. 투표를 "OFF" 하고 룰렛을 돌려야 정확한 결과가 나옵니다'
  ]);

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

  useEffect(() => {
    // Start the interval when the component mounts
    if (!isOnVoting) {
      return;
    }
    const intervalId = setInterval(async () => {
      if (channelName !== "") {
        const available = await handleGetOptions();
        if (!available) {
          clearInterval(intervalId);
        }
      }
    }, 5000); // Run every second (5s)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [channelName, isOnVoting]); // Empty dependency array ensures the effect runs only once (when the component mounts)


  return (
    <div className="App">
      <Header title="도네이션 룰렛" channelName={channelName} setChannelName={setChannelName} fetchUnitPrice={() => {
      }} />
      <div className="content-container">
        <Flag trigger={trigger} text={selected}></Flag>
        {options?.length && (
          <Roulette options={options} setSelected={setSelected} setTrigger={setTrigger} />
        )}

        <Table data={options}/>
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
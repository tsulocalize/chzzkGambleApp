import React, {useEffect, useState} from "react";
import "./Video.css";
import {fetchGetVideoDonation} from "./api/getVideoDonation";
import VideoTable from "./component/video-table";
import TipComponent from "./component/TipComponent";
import ToggleButton from 'react-toggle-button';
import {Header} from "./component/Header";
import {fetchGetVideoUnitPrice} from "./api/getVideoSetting";

function Video() {
  const [videoId, setVideoId] = useState("");
  const [videos, setVideos] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [unitPrice, setUnitPrice] = useState(null);
  const [isHighlighter, setIsHighlighter] = useState(false);
  const [tips, setTips] = useState([
    'Tip. 미리 연결해두면 영도를 빠짐없이 기록할 수 있습니다',
    'Tip. 좌측 상단 아이콘을 클릭해 영도 랭킹을 볼 수 있습니다',
    'Tip. 형광팬 도네이션은 우선적으로 노출됩니다',
    'Tip. 선택된 영도를 기준으로 남은 시간이 표시됩니다',
    'Tip. \'Ctrl + F\' 로 영도를 빠르게 찾아보세요'
  ]);

  const handleGetVideo = async () => {
    const result = await fetchGetVideoDonation(channelName);
    if (typeof result === 'undefined') return false;
    setVideos(result);
    return true;
  }

  const fetchUnitPrice = (channelId) => {
    fetchGetVideoUnitPrice(channelId)
      .then(unitPrice => {
        setUnitPrice(unitPrice);
      });
  }

  useEffect(() => {
    // Start the interval when the component mounts
    const intervalId = setInterval(async () => {
      if (channelName !== "") {
        const available = await handleGetVideo();
        if (!available) {
          clearInterval(intervalId);
        }
      }
    }, 5000); // Run every second (5s)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [channelName]); // Empty dependency array ensures the effect runs only once (when the component mounts)


  return (
    <div className="Video">
      <Header title="영상 도네이션" channelName={channelName} setChannelName={setChannelName} fetchUnitPrice={fetchUnitPrice}/>
      <a href="/ranking" target="_blank" rel="noopener noreferrer">
        <img className="ranking" src="/ranking.png" alt="이미지"/>
      </a>
      <div className="content">
        <iframe title="main-content"
                src={`https://www.youtube.com/embed/${videoId}`}>
        </iframe>
        <div className="right-content">
          <div className="toggleContainer">
            형광팬
            <ToggleButton
              value= {isHighlighter}
              onToggle={(value) => {
                setIsHighlighter(!value);
              }} />
          </div>
          <VideoTable data={videos} setVideoId={setVideoId} unitPrice={unitPrice} isHighlighter={isHighlighter}/>
        </div>
      </div>
      <div className="footer">
        <TipComponent tips={tips} />
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

export default Video;
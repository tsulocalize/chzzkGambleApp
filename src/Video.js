import React, {useEffect, useState} from "react";
import "./Video.css";
import {fetchConnection} from "./api/connectRequest";
import Button from "./component/Button";
import {fetchGetVideoDonation} from "./api/getVideoDonation";
import VideoTable from "./component/video-table";
import InfoIcon from "./InfoIcon";
import {fetchGetVideoUnitPrice} from "./api/getVideoSetting";

function Video() {
  const [videoId, setVideoId] = useState("");
  const [videos, setVideos] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [inputChannelName, setInputChannelName] = useState("");
  const [channelImageUrl, setChannelImageUrl] = useState(
    process.env.PUBLIC_URL + "/user.png"
  );
  const [channelId, setChannelId] = useState("");
  const [unitPrice, setUnitPrice] = useState(null);


  const handleInputChange = (event) => {
    setInputChannelName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConnect()
        .then();
    }
  }

  const handleGetVideo = async () => {
    const result = await fetchGetVideoDonation(channelName);
    if (typeof result === 'undefined') return false;
    setVideos(result);
    return true;
  }

  const handleConnect = async () => {
    try {
      const result = await fetchConnection(inputChannelName);
      setChannelName(result?.channelName);
      setChannelImageUrl(result?.channelImageUrl);
      setChannelId(result?.channelId);
      setUnitPrice(await fetchGetVideoUnitPrice(channelId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Start the interval when the component mounts
    const intervalId = setInterval(async () => {
      if (channelName !== '') {
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
      <div className="header">
        <span className="gamble">영상 도네이션</span>
        <div className="input-container header_right">
          <input
            className="styled-input"
            type="text"
            value={inputChannelName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="채널명을 입력하세요"
          />
          <Button
            className="create-button"
            onClick={handleConnect}
            label={"연결"}
          />
          <InfoIcon/>
        </div>
        <div className="header_right_right">
          <img className="face" src={channelImageUrl} alt="이미지"/>
          <span className="name">{channelName}</span>
        </div>
      </div>
      <a href="/ranking" target="_blank" rel="noopener noreferrer">
        <img className="ranking" src="/ranking.png" alt="이미지"/>
      </a>
      <div className="content">
        <iframe title="main-content"
                src={`https://www.youtube.com/embed/${videoId}`}>
        </iframe>
        <VideoTable data={videos} setVideoId={setVideoId} unitPrice={unitPrice}/>
      </div>
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
  );
}

export default Video;
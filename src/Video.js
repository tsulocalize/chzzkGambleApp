import React, {useEffect, useState} from "react";
import "./Video.css";
import {fetchConnection} from "./api/connectRequest";
import Button from "./component/Button";
import {fetchGetVideoDonation} from "./api/getVideoDonation";
import VideoTable from "./component/video-table";
import InfoIcon from "./InfoIcon";

function Video() {
  const [videoId, setVideoId] = useState("");
  const [videos, setVideos] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [inputChannelName, setInputChannelName] = useState("");
  const [channelImageUrl, setChannelImageUrl] = useState(
    process.env.PUBLIC_URL + "/user.png"
  );

  const handleInputChange = (event) => {
    setInputChannelName(event.target.value);
  };

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
      잠시 수리중...
      {/*<div className="header">*/}
      {/*  <span className="gamble">영상 도네이션</span>*/}
      {/*  <div className="input-container header_right">*/}
      {/*    <input*/}
      {/*      className="styled-input"*/}
      {/*      type="text"*/}
      {/*      value={inputChannelName}*/}
      {/*      onChange={handleInputChange}*/}
      {/*      placeholder="채널명을 입력하세요"*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      className="create-button"*/}
      {/*      onClick={handleConnect}*/}
      {/*      label={"연결"}*/}
      {/*    />*/}
      {/*    <InfoIcon />*/}
      {/*  </div>*/}
      {/*  <div className="header_right">*/}
      {/*    <img className="face" src={channelImageUrl} alt="이미지"/>*/}
      {/*    <span className="name">{channelName}</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="content">*/}
      {/*  <iframe title="main-content"*/}
      {/*          src={`https://www.youtube.com/embed/${videoId}`}>*/}
      {/*  </iframe>*/}
      {/*  <VideoTable data={videos} setVideoId={setVideoId}/>*/}
      {/*</div>*/}
    </div>
  );
}

export default Video;
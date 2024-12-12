import React, {useState} from "react";
import "./Video.css";
import {fetchConnection} from "./api/connectRequest";
import Button from "./component/Button";
import {fetchGetVideoDonation} from "./api/getVideoDonation";
import VideoTable from "./component/video-table";

function Video() {
  const [videoId, setVideoId] = useState("");
  const [videos, setVideos] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [inputChannelName, setInputChannelName] = useState("");

  const handleInputChange = (event) => {
    setInputChannelName(event.target.value);
  };

  const handleGetVideo = async () => {
    const result = await fetchGetVideoDonation(channelName);
    setVideos(result);
  }

  const handleConnect = async () => {
    try {
      const result = await fetchConnection(inputChannelName);
      setChannelName(result?.channelName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Video">
      <div className="header">
        <span className="gamble">Videos</span>
        <div className="input-container header_right">
          <input
            className="styled-input"
            type="text"
            value={inputChannelName}
            onChange={handleInputChange}
            placeholder="Enter streamer name"
          />
          <Button
            className="create-button"
            onClick={handleGetVideo}
            label={"Get-Video"}
          />
          <Button
            className="create-button"
            onClick={handleConnect}
            label={"Connect"}
          />
        </div>
        <div className="header_right">
          <span className="name">{channelName}</span>
        </div>
      </div>
      <div className="content">
        <iframe width="420" height="315" title="main-content"
                src={`https://www.youtube.com/embed/${videoId}`}>
        </iframe>
        <VideoTable data={videos} videoId={videoId} setVideoId={setVideoId}/>
      </div>
    </div>
  );
}

export default Video;
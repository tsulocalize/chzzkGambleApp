import Button from "./Button";
import React, {useEffect, useState} from "react";
import {fetchConnection} from "../api/connectRequest";
import styles from "./Header.module.css";

export function Header({ title, channelName, setChannelName, setChannelId, fetchUnitPrice, clickedChannel }) {
  const [inputChannelName, setInputChannelName] = useState("");
  const [channelImageUrl, setChannelImageUrl] = useState(
    process.env.PUBLIC_URL + "/user.png"
  );

  const handleInputChange = (event) => {
    setInputChannelName(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      event.target.blur();
      handleConnect()
        .then();
    }
  }

  const handleConnect = async () => {
    fetchConnection(inputChannelName)
      .then(result => {
        setChannelId(result.channelId);
        setChannelName(result.channelName);
        setChannelImageUrl(result.channelImageUrl);
        fetchUnitPrice(result.channelId);
      }).catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    if (!clickedChannel || clickedChannel === "" || channelName === clickedChannel) {
      return;
    }
    fetchConnection(clickedChannel)
      .then(result => {
        setChannelId(result.channelId);
        setChannelName(result.channelName);
        setChannelImageUrl(result.channelImageUrl);
        fetchUnitPrice(result.channelId);
      }).catch((error) => {
      console.error(error);
    });

  }, [clickedChannel]);

  return (
    <div className= {styles.header}>
      <span className= {styles.gamble}>{title}</span>
      <div className={`input-container ${styles.header_right}`}>
        <input
          className= {styles.styledInput}
          type="text"
          value={inputChannelName}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          placeholder="채널명을 입력하세요"
        />
        <Button
          className="create-button"
          onClick={handleConnect}
          label={"연결"}
        />
      </div>
      <div className= {styles.header_right_right}>
        <img className= {styles.face} src={channelImageUrl} alt="이미지"/>
        <span className= {styles.name}>{channelName}</span>
      </div>
    </div>
  )
}


import React, { useState } from 'react';
import "./InfoIcon.css"

const InfoIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Message with line breaks (newlines)
  const message = `현재 배타 버전으로 운영되고 있으며, 언제든 서비스 중단될 수 있습니다.
    [사용법]
    1. 원하는 채널명을 입력하고 연결 버튼을 누른다.
    2. 정상적으로 연결되면 우측 상단에 채널 정보가 표시된다.
    3. 영상 도네이션 목록을 확인하고 선택하면 해당 영상을 볼 수 있다.`;

  // Split the message into an array of lines, and join with <br /> for rendering
  const messageLines = message.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div
      className="info-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="info">i</span>
      {isHovered && <div className="info-box"> {messageLines} </div>}
    </div>
  );
};

export default InfoIcon
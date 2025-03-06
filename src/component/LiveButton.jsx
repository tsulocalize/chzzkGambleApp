import {useEffect, useState} from "react";
import {fetchVideoDonating} from "../api/getVideoDonating";

const LiveButton = ({setClickedChannel}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const handleGetVideoDonating = async () => {
    const result = await fetchVideoDonating();
    if (typeof result === 'undefined') return false;
    setMenuItems(result);
    return true;
  }

  useEffect(() => {
    if (isOpen) {
      const currentTime = new Date().getTime();

      if (lastFetched === null || currentTime - lastFetched > 60000) {
        handleGetVideoDonating().then();
        setLastFetched(currentTime);
      }
    }
  }, [isOpen]);

  const handleMenuClick = (item) => {
    setIsOpen(false);
    setClickedChannel(item);
  };

  return (
    <div className="relative">
      {/* 원형 버튼 */}
      <div
        className="w-10 h-10 mr-1.5 mt-2.5 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
        style={{
          backgroundImage: "url('/youtube-live.png')",
          backgroundSize: "75%", // 이미지 크기를 75%로 줄여서 여백을 둠
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "10%", // 주변에 패딩을 추가하여 이미지 크기 조정
        }}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* 목록 (버튼의 오른쪽 정렬) */}
      <div
        className={`absolute top-14 right-0 bg-white shadow-lg rounded-lg p-2 w-40 transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{
          zIndex: 1000, // z-index를 높여서 다른 요소들 위에 표시
        }}
      >
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="p-2 rounded cursor-pointer hover:bg-gray-200"
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveButton;

import React, {useRef, useState} from "react";


export function Advertisement() {
  const [imageUrl, setImageUrl] = useState(null);
  const redirectUrl = useRef(null);

  const handleClick = () => {
    if (!redirectUrl) return;
    window.open(redirectUrl.current, "_blank");
  }

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gray-500 rounded-lg shadow-lg overflow-hidden">
      <img src={imageUrl} alt="" onClick={handleClick} className="w-full h-full object-cover"></img>
    </div>
  )
}
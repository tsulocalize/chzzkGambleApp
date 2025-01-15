import {useEffect, useState} from "react";
import "./Flag.css";

const Flag = ({ trigger, text }) => {
  const [visible, setVisible] = useState(false);
  const [moveDown, setMoveDown] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      setMoveDown(true);

      const animationTimeout = setTimeout(() => setMoveDown(false), 1000);
      const hideTimeout = setTimeout(() => setVisible(false), 5000);

      return () => {
        clearTimeout(animationTimeout);
        clearTimeout(hideTimeout);
      }
    }
  }, [trigger]);

  return (
    <div className={`flag ${visible ? "visible" : ""} ${moveDown ? "move-down" : ""}`}>
      {text}
    </div>
  )
}

export default Flag;

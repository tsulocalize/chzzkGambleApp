// WheelComponent.js
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const colors = ['#EF404A', '#F2728C', '#FFD400', '#80B463', '#27AAE1', '#4EB8B9', '#9E7EB9', '#A7A9AC', '#F79552', '#F9C0C7', '#FFCC4E', '#D5E05B', '#81D3EB', '#B0DFDB', '#BBB8DC']
let data = [
  { option: '1번'}, { option: '2번' }
];

// const data = [];

const WheelComponent = ( {props} ) => {

  if (props !== null) {
    data = [];
    let colorIndex = 0;

    for (const [key, value] of Object.entries(props.elements)) {
      data.push( {option: value.name, optionSize: value.count, style: { backgroundColor : colors[colorIndex++ % colors.length]} });
    }
  }

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor={['black']}
        outerBorderWidth={[3]}
        radiusLineColor={'white'}
        radiusLineWidth={[1]}
        spinDuration={ 1.0 }
        fontSize={[30]}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button className="button-container" onClick={handleSpinClick}>SPIN</button>
    </>
  );
};

export default WheelComponent;

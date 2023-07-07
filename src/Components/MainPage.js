import React, { useEffect, useState } from 'react';
import {  Input, Button, notification } from 'antd';
import { CopyOutlined } from '@ant-design/icons'
import './css/MainPage.css'

function MainPage() {
const [inchesAmount, setInchesAmount] = useState();
const [millimetersAmount, setMillimetersAmount] = useState('');

const toDecimal = (fraction) => {
    fraction = fraction.toString().trim();
    var result,wholeNum=0, frac, deci=0;
    if(fraction.search('/') >=0){
        if(fraction.search(' ') >=0){
            wholeNum = fraction.split(' ');
            frac = wholeNum[1];
            wholeNum = parseInt(wholeNum,10);
        }else{
            frac = fraction;
        }
        if(fraction.search('/') >=0){
            frac =  frac.split('/');
            deci = parseInt(frac[0], 10) / parseInt(frac[1], 10);
        }
        result = wholeNum+deci;
    }else{
        result = fraction
    }

    console.log(result);
    if (result !== '' && !isNaN(result)) {
        setMillimetersAmount(result * 25.4)
    }
}

let errorMessage = 'isntVisible';
if (inchesAmount ) {
    if (!!inchesAmount.match("[a-zA-Z]")) errorMessage = 'isVisible'
}

const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.info({
        message: `Measurement Copied to Clipboard!`,
        placement,
        className: "notification",
        duration: 1,
        });
  };

useEffect(() => {
    if(inchesAmount) toDecimal(inchesAmount)
}, [inchesAmount]);

  return (
    <div id="main-container">
        {contextHolder}
        <h1>Aarons Super Cool Converter or Something</h1>
        <Input id="main-input" size="large" placeholder="Amount in Inches" value={inchesAmount} onChange={(e) => setInchesAmount(e.target.value)} />
        <p id={errorMessage}>Please make sure to only type numbers.</p>
        { millimetersAmount && (<h2 id="result">{millimetersAmount} Millimeters</h2>)}
        {millimetersAmount && <Button id="copyButton" onClick={() => {
            navigator.clipboard.writeText(millimetersAmount) 
            openNotification('top')
            }}><CopyOutlined /></Button>}
        <br />
    </div>
  )
}

export default MainPage

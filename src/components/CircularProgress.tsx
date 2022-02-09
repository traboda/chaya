import React from 'react';
import styled from '@emotion/styled';

const CircularProgressContainer = styled.div`
  .progress {
    width: 150px;
    height: 150px !important;
    float: left;
    line-height: 150px;
    background: none;
    margin: 20px;
    box-shadow: none;
    position: relative
  }

  .progress:after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-width: 75px;
    border-color: ${({progressBgColor})=> progressBgColor || '#fff'};
    position: absolute;
    top: 0;
    left: 0
  }

  .progress>span {
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1
  }

  .progress .progress-left {
    left: 0
  }

  .progress .progress-bar {
    width: 100%;
    height: 100%;
    background: none;
    border-width: 40px;
    border-style: solid;
    position: absolute;
    top: 0
  }

  .progress .progress-left .progress-bar {
    left: 100%;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 80px;
    border-left: 0;
    -webkit-transform-origin: center left;
    transform-origin: center left
  }

  .progress .progress-right {
    right: 0
  }

  .progress .progress-right .progress-bar {
    left: -100%;
    border-top-left-radius: 80px;
    border-bottom-left-radius: 80px;
    border-right: 0;
    -webkit-transform-origin: center right;
    transform-origin: center right;
  }

  .progress .progress-value {
    width: ${({pbwidth})=>`${pbwidth}%`};
    height: ${({pbwidth})=>`${pbwidth}%`};
    border-radius: 50%;
    background: #000;
    font-size: 24px;
    color: #fff;
    line-height: 135px;
    text-align: center;
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .progress .progress-bar {
    border-color: #1923AE;
  }

  .animate-l-bar{
    animation: loading-2 1.5s linear forwards 1.5s
  }

  .animate-r-bar{
    animation: loading-1 1.5s linear forwards
  }

  .transform-l-bar{
    transform: rotate(${({ percent }) => percent[1]}deg)
  }

  .transform-r-bar{
    transform: rotate(${({ percent }) => percent[0]}deg)
  }

  @keyframes loading-1 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg)
    }

    100% {
      -webkit-transform: rotate(${({ percent }) => percent[0]}deg);
      transform: rotate(${({ percent }) => percent[0]}deg)
    }
  }

  @keyframes loading-2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg)
    }

    100% {
      -webkit-transform: rotate(${({ percent }) => percent[1]}deg);
      transform: rotate(${({ percent }) => percent[1]}deg)
    }
  }
`;

type CircularProgressProps = {
    progressBarWidth?: ( 2 | 3 | 4 | 5 | 6 )
    label?: string,
    animate?: boolean,
    progressBarColor?: string,
    progressBackgroundColor?: string,
    innerCircleColor?: string,
    labelClassName?: string,
    percent: number
};

const CircularProgress = ({ label, animate = false, progressBarColor, progressBackgroundColor, innerCircleColor, labelClassName, progressBarWidth = 6, percent}:CircularProgressProps) => {
    const progressBarSize = [40,50,60,70,80,90];
    const convertTo180 = (val) => Math.floor(val * 18 / 5);
    const calcPercent = () => (percent < 50) ? [convertTo180(percent), 0] : [180, convertTo180(percent - 50)];
    return(
        <CircularProgressContainer  progressBgColor={progressBackgroundColor} percent={calcPercent()} pbwidth={progressBarSize[progressBarWidth-1]}>
            <div className="progress">
                <span className="progress-left">
                    <span className={`progress-bar ${animate?'animate-l-bar':'transform-l-bar'}`} style={{borderColor: progressBarColor}}/>
                </span>
                <span className="progress-right">
                    <span className={`progress-bar ${animate?'animate-r-bar':'transform-r-bar'}`} style={{borderColor: progressBarColor}}/>
                </span>
                <div className={`progress-value z-100 ${labelClassName}`} style={{background: innerCircleColor}}>
                    <div className='h-full w-full items-center flex justify-center'>
                        {label}
                    </div>
                </div>
            </div>
        </CircularProgressContainer>
    )
}

export default CircularProgress;
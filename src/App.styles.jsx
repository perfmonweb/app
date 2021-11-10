import styled, { keyframes } from 'styled-components';

export const AppContainer = styled.div``;
export const MetricContainer = styled.div`
  display: flex;
`;
export const SubContainer = styled.div`
  width: 70%;
`;

const slideText = keyframes`
  from { width: 0; } 
`;

const blinkCaret = keyframes`
  50% { border-color: transparent; }
`;

export const AnimatedPet = styled.div`
  position: fixed;
  width: 200px;
  height: 50px;
  bottom: 60px;
  left: 4px;
  .pet {
    .icon {
      position: absolute;
      bottom: -20px;
      left: 0;
      width: 20px;
      height: 20px;
      border: 1px solid black;
      border-radius: 20px;
    }
    label {
      color: black;
      display: block;
      border-right: 0.1em solid black;
      box-shadow: inset 1px 1px 4px 2px black;
      padding: 10px;
      width: ${(props) => `calc(0.40em * ${props.length})`};
      width: ${(props) => `${props.length}ch`};
      white-space: nowrap;
      overflow: hidden;
      animation: ${slideText} 2s steps(200, end),
        ${blinkCaret} 0.5s step-end infinite alternate;

      ::before {
        content: '';
        width: 15px;
        height: 10px;
        border: 1px solid black;
        background: black;
        bottom: 2px;
        left: 1px;
        position: absolute;
        clip-path: polygon(100% 0, 0 0, 50% 100%);
      }
    }
  }
`;

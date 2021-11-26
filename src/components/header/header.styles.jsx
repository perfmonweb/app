import { Link } from 'react-router-dom';
import styled from 'styled-components';

const blue = 'white';
const red = '#FF3E30';
const yellow = '#F7B529';
const green = '#black';

export const MainContainer = styled.div`
  display: flex;
  position: relative;
  height: 16vh;
  width: 100vw;
  background: #2d5073;
  padding-bottom: 5%;
`;

export const Logo = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  font-size: 2em;
  flex-grow: 1;
  .centered {
    transform: translate(10px, 10px);
    height: 100%;

    span {
      &:nth-child(6n + 1) {
        color: ${blue};
      }
      &:nth-child(6n + 2) {
        color: ${red};
      }
      &:nth-child(6n + 3) {
        color: ${yellow};
      }
      &:nth-child(6n + 4) {
        color: ${blue};
      }
      &:nth-child(6n + 5) {
        color: ${green};
      }
      &:nth-child(6n + 6) {
        color: ${red};
      }
    }
  }
`;

export const Status = styled.div`
  display: flex;
  position: relative;
  flex-grow: 3;
  justify-content: center;
  .perimeter {
    padding: 8px 10px;
    display: flex;
    border-bottom: 1px solid
      ${(props) => (props.light === 'device' ? 'green' : 'red')};
    /* color: ${(props) => (props.light === 'device' ? 'green' : 'red')}; */
    color: white;
    border-radius: 10px;
    align-self: center;
    .st {
    }
    .light {
      border: 1px solid
        ${(props) => (props.light === 'device' ? 'green' : 'red')};
      border-radius: 50%;
      background: ${(props) => (props.light === 'device' ? 'green' : red)};
      margin: 0 5px;
      height: 10px;
      width: 10px;
      box-shadow: 0px 0px 10px 4px
        ${(props) => (props.light === 'device' ? 'green' : red)};
      align-self: center;
    }

    .press {
      /* border: 0.5px solid black; */
      border-radius: 5px;
      margin: 0 5px;
      box-shadow: -1px 1px 1px 1px #888888;

      :hover {
        cursor: pointer;
        transform: translateY(-1px);
        box-shadow: -1px 2px 1px 1px #888888;
      }

      :active {
        cursor: pointer;
        transform: translateY(1px);
        box-shadow: -1px 0px 1px 0px #888888;
      }
    }
  }
`;

export const Item = styled(Link)`
  position: relative;
  height: 100%;
  flex-grow: 1;
  width: auto;
  font-size: 2em;
  text-decoration: none;
  display: flex;
  justify-content: center;
  .centered {
    transform: translate(10px, 10px);
    height: 100%;
    span {
      &:nth-child(6n + 1) {
        color: ${blue};
      }
      &:nth-child(6n + 2) {
        color: ${red};
      }
      &:nth-child(6n + 3) {
        color: ${yellow};
      }
      &:nth-child(6n + 4) {
        color: ${blue};
      }
      &:nth-child(6n + 5) {
        color: black;
      }
      &:nth-child(6n + 6) {
        color: ${red};
      }
      &:nth-child(6n + 7) {
        color: ${blue};
      }
    }
  }
`;

export const SessionTab = styled.div`
  position: relative;
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  .perimeter {
    align-self: center;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    height: 70%;
    width: 80%;
    transition: all 0.3s;
    .perimeter-input {
      border-radius: 20px;
      -webkit-appearance: none;
      width: 90%;
      height: 70%;
      margin: 0;
      border: 0;
      outline: 0;
      padding: 2px 10px;
      transition: all 0.5s;
    }
    .submit-session {
      position: absolute;
      transition: all 0.5s;
      top: 15px;
      right: 60px;
      height: 25px;
      width: 30px;
      i {
        position: absolute;
        top: 0;
        left: 0;
        :hover {
          cursor: pointer;
        }
      }
    }

    :focus-within {
      border: 0;
      outline: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      .perimeter-input {
        box-shadow: inset 1px 1px 10px green;
      }
      .submit-session {
        top: 12px;
        right: 20px;
      }
    }
  }
`;

export const ToolTip = styled.div`
  position: relative;
  background: none;
  i {
    position: absolute;
    width: 100%;
    height: 20px;
    left: 0;
    top: 0;
  }
  :hover {
    cursor: pointer;
    .tooltip {
      visibility: visible;
    }
  }

  :active {
    cursor: pointer;
  }
  .tooltip {
    visibility: hidden;
    width: 140px;
    background-color: #0006;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    font-size: smaller;
    position: absolute;
    z-index: 7;

    ::after {
      content: ' ';
      position: absolute;
      top: 50%;
      right: 100%; /* To the left of the tooltip */
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent black transparent transparent;
    }
  }
`;

export const AllSessions = styled(Link)`
  display: flex;
  position: relative;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid pink;
  flex-grow: 1;
  border-radius: 10px;
  font-size: medium;
  font-weight: bold;
  letter-spacing: 1.1px;
  color: whitesmoke;
  text-decoration: none;
  label {
    align-self: center;
    :hover {
      cursor: pointer;
    }
  }
  :hover {
    background: #2d5073;
    color: white;
    cursor: pointer;
    box-shadow: inset -1px -1px 2px 2px black;
    box-shadow: 1px 1px 2px 2px black;
    top: 18%;
  }

  :active {
    transform: scaleY(1.5px);
    top: 30%;
  }
`;

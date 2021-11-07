import { Link } from 'react-router-dom';
import styled from 'styled-components';

const blue = 'white';
const red = '#FF3E30';
const yellow = '#F7B529';
const green = '#black';

export const MainContainer = styled.div`
  display: flex;
  position: relative;
  height: 40px;
  background: #3b7aee;
  padding-bottom: 5%;
`;

export const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: auto;
  font-size: 2em;
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
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
  border: 1px solid ${(props) => (props.light === 'device' ? 'green' : 'red')};
  color: ${(props) => (props.light === 'device' ? 'green' : 'red')};
  border-radius: 10px;
  padding: 2px 4px;
  align-items: center;
  justify-content: center;
  background: white;
  .st {
  }
  .light {
    border: 1px solid ${(props) => (props.light === 'device' ? 'green' : 'red')};
    border-radius: 50%;
    background: ${(props) => (props.light === 'device' ? 'green' : red)};
    margin: 0 5px;
    height: 10px;
    width: 10px;
    box-shadow: 0px 0px 10px 4px
      ${(props) => (props.light === 'device' ? 'green' : red)};
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
`;

export const Item = styled(Link)`
  position: absolute;
  top: 0;
  right: 15px;
  height: 100%;
  width: auto;
  font-size: 2em;
  text-decoration: none;
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
  position: absolute;
  top: 30%;
  left: 70%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 10px;
  padding: 2px 4px;
  align-items: center;
  justify-content: center;
  background: white;
  form > input {
    -webkit-appearance: none;
    border: 0;
    :focus {
      border: 0;
      outline: 0;
    }
  }

  form {
    display: flex;
    .button {
    }
  }
`;

export const ToolTip = styled.div`
  background: none;
  padding: 0 3px;
  :hover {
    cursor: pointer;
    transform: translateY(-1px);
    .tooltip {
      visibility: visible;
    }
  }

  :active {
    cursor: pointer;
    transform: translateY(1px);
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

    /* Position the tooltip text - see examples below! */
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
  display: block;
  position: absolute;
  top: 28%;
  right: 5%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 4px 5px;
  font-size: medium;
  font-weight: bold;
  letter-spacing: 1.1px;
  color: whitesmoke;
  text-decoration: none;
  label {
    :hover {
      cursor: pointer;
    }
  }
  :hover {
    background: #163c83;
    color: white;
    cursor: pointer;
    box-shadow: inset -1px -1px 2px 2px black;
    box-shadow: 1px 1px 2px 2px black;
    top: 28%;
  }

  :active {
    transform: scaleY(1.5px);
    top: 30%;
  }
`;

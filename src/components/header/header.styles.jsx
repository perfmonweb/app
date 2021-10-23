import styled, { keyframes } from 'styled-components';

const blue = '#176BEF';
const red = '#FF3E30';
const yellow = '#F7B529';
const green = '#179C52';

export const MainContainer = styled.div`
  display: flex;
  position: relative;
  height: 40px;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${(props) => (props.light === 'device' ? green : 'red')};
  color: ${(props) => (props.light === 'device' ? green : 'red')};
  border-radius: 10px;
  padding: 2px 4px;
  align-items: center;
  justify-content: center;
  .st {
  }
  .light {
    border: 1px solid ${(props) => (props.light === 'device' ? green : 'red')};
    border-radius: 50%;
    background: ${(props) => (props.light === 'device' ? green : red)};
    margin: 0 5px;
    height: 10px;
    width: 10px;
    box-shadow: 0px 0px 10px 4px
      ${(props) => (props.light === 'device' ? green : red)};
  }
`;

export const Item = styled.div`
  position: absolute;
  top: 0;
  right: 15px;
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
      &:nth-child(6n + 6) {
        color: ${blue};
      }
    }
  }
`;

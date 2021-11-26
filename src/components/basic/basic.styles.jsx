import styled, { keyframes } from 'styled-components';

export const MainContainer = styled.div`
  background: #2d5073;
  width: 100vw;
  height: 18vh;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .details {
    display: flex;
    width: 100%;
  }
  .buttons {
    position: relative;
    display: flex;
    width: 100%;
    height: 40%;
    justify-content: flex-end;
    .button {
      position: relative;
      margin: 10px;
      .minutes {
        font-size: 1.1em;
        color: white;
      }
      .seconds {
        font-size: 1.1em;
        margin: 0 5px;
      }
      .ms {
        font-size: 0.7em;
      }
    }
  }
`;

export const StyledInputContainer = styled.div`
  display: flex;
  position: relative;
  width: 80%;
  height: 40px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid black;
  background: #eff5ff;
  :hover {
    background: white;
  }
  .dropdown {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .search {
    position: absolute;
    top: 25%;
    left: 10px;
  }
`;

export const StyledInput = styled.input`
  position: absolute;
  width: 85%;
  left: 3%;
  border: 0;
  height: 100%;
  -webkit-appearance: none;
  background: #eff5ff;
  :hover {
    background: white;
  }
  :focus {
    border: 0;
    outline: 0;
  }
`;

export const StyledDropDownElements = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  transform-style: preserve-3d;
  width: 80%;
  margin: auto;
  color: white;
  .element {
    margin: 1px 0;
    padding: 5px 40px;

    :hover {
      cursor: pointer;
      background: #d6d2d0;
      border-radius: 10px;
      color: black;
    }
  }
`;

export const engine = keyframes`
  0%{
    transform: translateY(0px);
  }

  50%{
    transform: translateY(-2px);
  }

  100%{
    transform: translateY(0px);
  }
`;

export const Details = styled.div`
  display: flex;
  position: relative;
  margin: 10px auto;
  flex-grow: 1;
  justify-content: space-evenly;
  .labels {
    display: flex;
    justify-content: center;
    width: 100%;
    transition: all 1s;
    .label {
      :nth-child(1) {
        animation: ${engine} 1s infinite ease-in-out;
      }
      :nth-child(2) {
        animation: ${engine} 1s infinite reverse;
      }
      :nth-child(3) {
        animation: ${engine} 1s infinite ease-in-out;
      }
      :nth-child(4) {
        animation: ${engine} 1s infinite reverse;
      }
    }
  }
`;

export const DebugSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 2;
  animation: ${engine} 1s infinite ease-in-out;
  .debug {
    width: 80%;
    margin-left: 10px;
    margin: 10px;
    font-style: italic;
    font-size: small;
    color: #ea4345;
    border-radius: 250px 10px 250px 10px/300px 1px 300px 1px;
    padding: 3px;
    background: white;
  }
`;

export const ModuleSelection = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  padding: 0.5em;

  .warn {
    border-radius: 20px;
    background: #fbbc05;
    padding: 0 5px;
  }
`;

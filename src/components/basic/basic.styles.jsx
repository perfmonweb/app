import styled from 'styled-components';

export const StyledInputContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  i {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 10%;
    background-color: grey;
    color: white;
    text-align: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    .centered {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
    }
  }
`;

export const StyledInput = styled.input`
  position: absolute;
  width: 85%;
  left: 11%;
  border: 0;
  height: 100%;
  -webkit-appearance: none;

  :focus {
    border: 0;
    outline: 0;
  }
`;

export const StyledDropDownElements = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  transform-style: preserve-3d;
  .element {
    margin: 1px 0;
    padding: 5px 40px;

    :hover {
      cursor: pointer;
      background: #d6d2d0;
      border-radius: 10px;
    }
  }
`;

export const Details = styled.div`
  display: flex;
  flex-flow: row wrap;
  border: 1px solid black;
  border-radius: 20px;
  padding: 10px 20px;
  margin-top: 10px;
  flex-direction: column;
  width: 100%;
  .row {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
  .col {
    width: 100%;
    display: flex;
    .subCol {
      width: 100%;
    }
  }
`;

export const DebugSection = styled.div`
  display: flex;
  justify-content: space-between;
  .debug {
    width: 70%;
    margin-left: 10px;
    font-style: italic;
    font-size: small;
    border: 1px solid #ea4345;
    color: #ea4345;
    border-radius: 10px;
    padding: 3px;
  }
  .buttons {
    .button {
      .minutes {
        font-size: 1.1em;
        color: white;
      }
      .seconds {
        font-size: 1.1em;
      }
      .ms {
        font-size: 0.7em;
      }
    }
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

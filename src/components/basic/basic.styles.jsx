import styled from 'styled-components';

export const MainContainer = styled.div`
  background: #3b7aee;
  width: 100vw;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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

export const Details = styled.div`
  display: flex;
  position: relative;
  margin: 10px auto;
  justify-content: space-evenly;
  .labels {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
  }
  /* display: flex;
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
  } */
`;

export const DebugSection = styled.div`
  display: flex;
  justify-content: space-between;
  .debug {
    width: 70%;
    margin-left: 10px;
    margin-bottom: 5px;
    font-style: italic;
    font-size: small;
    color: #ea4345;
    border-radius: 10px;
    padding: 3px;
    background: white;
  }
  .buttons {
    .button {
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

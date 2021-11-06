import styled from 'styled-components';

export const SidePanelContainer = styled.div`
  width: 30%;
  background: #122365;

  .heading {
    color: white;
    margin: 15px 0;
    text-align: center;
    display: flex;
    justify-content: center;
    .head {
      font-size: 2em;
    }

    .stopWatch {
      display: block;
      position: relative;
      height: 25px;
      width: 25px;
      border: 1px solid white;
      border-radius: 50%;
      background: white;
      margin-right: 5px;
      .push {
        position: absolute;
        height: 5px;
        width: 3px;
        background: white;
        left: 10px;
        top: -5px;
        ::before {
          content: '';
          display: block;
          background: white;
          height: 2px;
          width: 10px;
          transform: translateX(-3px);
        }
      }
      .side {
        position: absolute;
        height: 5px;
        width: 3px;
        background: white;
        left: 20px;
        top: 0px;
        transform: rotateZ(45deg);
      }
      .full-tick {
        transform: ${(props) => `rotateZ(${props.time * 6}deg)`};
        position: absolute;
        top: 0px;
        left: 10.5px;
        width: 2px;
        height: 97.5%;
        background: linear-gradient(
          to bottom,
          white 10%,
          black 12%,
          black 50%,
          white 50%,
          white 100%
        );
      }
    }
  }

  ::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0px;
    height: 50%;
    width: 40%;
    z-index: 0;
    background: linear-gradient(#12236511, #9198e511);
    clip-path: polygon(0 0, 100% 100%, 0% 100%);
  }
  ::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 1px;
    height: 100%;
    width: 100%;
    z-index: 0;
    background: linear-gradient(#12236511, #9198e511);
    clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin: 2rem 0px;
`;

export const Pane = styled.div`
  border-bottom: 1px solid grey;
  z-index: 1;
  :first-child {
    border-top: 1px solid grey;
  }
  .cloud {
    color: white;
    margin: 1em;
    text-align: center;
    :hover {
      cursor: pointer;
    }
    * {
      :hover {
        cursor: pointer;
      }
    }
  }
  .parent {
    display: flex;
    padding: 20px 0px;
    .labels {
      display: flex;
      flex-direction: column;
      width: 90%;
    }
    .checkbox {
      z-index: 99;
    }
    .head {
      padding: 0px 20px;
      font-weight: bolder;
      color: white;
      :hover {
        cursor: pointer;
      }
    }
    .sub {
      padding: 0px 20px;
      color: grey;
      :hover {
        cursor: pointer;
      }
    }
  }

  .info {
    height: 20em;
    width: 100%;
    background: #44579f77;
    margin-bottom: 0;
    border-top: 1px solid grey;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .row {
      display: flex;
      justify-content: space-between;
      width: 60%;
      margin: 0 10%;
      .col {
        width: 100%;
        text-align: right;
      }
    }
    :hover {
      background: #44579f77;
    }
  }

  :hover {
    cursor: pointer;
    background: #9198e511;
  }
`;

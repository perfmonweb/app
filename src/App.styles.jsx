import styled from 'styled-components';

export const AppContainer = styled.div``;
export const MetricContainer = styled.div`
  display: flex;
`;
export const SubContainer = styled.div`
  width: 70%;
`;

export const SidePanel = styled.div`
  width: 30%;
  background: #122365;
  .heading {
    color: white;
    font-size: 2em;
    text-align: center;
    margin: 15px 0;
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
  .parent {
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
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
    :hover {
      background: #44579f77;
    }
  }

  :hover {
    cursor: pointer;
    background: #9198e511;
  }
`;

import styled from 'styled-components';

export const FolderIcon = styled.div`
  .icon {
    height: 200px;
    width: 200px;
    border-radius: 10px;
    box-shadow: inset 0px 0px 4px black;
    position: relative;
    .folder {
      position: absolute;
      top: 70px;
      left: 60px;
      width: 60px;
      height: 40px;
      background: grey;
      border-radius: 5px;
    }
    .folder-top {
      position: absolute;
      top: 75px;
      left: 70px;
      width: 30px;
      height: 30px;
      background: grey;
      border-radius: 5px;
      clip-path: polygon(50% 0%, 100% 50%, 100% 100%, 0 100%, 0 0);
    }
    .footer {
      position: absolute;
      border-top: 1px solid grey;
      top: 170px;
      left: 0px;
      width: 200px;
      height: 30px;
      text-align: center;
      label {
        position: relative;
        font-size: 0.9em;
      }
    }
  }
  * {
    :hover {
      cursor: pointer;
      background: #00000012;
    }
  }
`;

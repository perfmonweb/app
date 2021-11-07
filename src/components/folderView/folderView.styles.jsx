import styled from 'styled-components';

export const HeadingBar = styled.div`
  margin: 20px 30px;
  label {
    font-size: 2em;
    margin: 50px 10px;
  }

  border-bottom: 1px solid grey;
`;

export const Directory = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 30px;
  .folder {
    flex: 0 0 10%;
    margin: 10px;
  }
`;

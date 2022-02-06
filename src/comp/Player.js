import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 80%;
  border-radius: 4px;
  padding: 1% 5%;

  background-color: rgba(255, 192, 203, 0.6);
  margin-bottom: 3px;
`;

const Player = ({ children }) => <Container>{children}</Container>;

export default Player;

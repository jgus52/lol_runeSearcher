import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  height: 80%;
  width: 80%;
  padding: 3px;
`;

const ChampContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ChampContainer;

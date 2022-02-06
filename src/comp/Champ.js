import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  margin-bottom: 5px;
  padding: 10px;
`;

const Champ = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Champ;

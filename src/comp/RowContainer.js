import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  width: ${(props) => props.width};
`;

const RowContainer = ({ children, justifyContent, width }) => (
  <Container justifyContent={justifyContent} width={width}>
    {children}
  </Container>
);

export default RowContainer;

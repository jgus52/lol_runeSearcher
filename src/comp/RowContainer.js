import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  width: ${(props) => props.width};
`;

const RowContainer = ({ children, justifyContent, width, style }) => (
  <Container justifyContent={justifyContent} width={width} style={style}>
    {children}
  </Container>
);

export default RowContainer;

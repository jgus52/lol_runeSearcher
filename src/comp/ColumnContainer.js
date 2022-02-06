import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${(props) => props.justifyContent};
`;

const ColumnContainer = ({ children, justifyContent, alignItems }) => {
  return (
    <Container justifyContent={justifyContent} alignItems={alignItems}>
      {children}
    </Container>
  );
};

export default ColumnContainer;

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
`;

const ColumnContainer = ({ children, justifyContent }) => {
  return <Container justifyContent={justifyContent}>{children}</Container>;
};

export default ColumnContainer;

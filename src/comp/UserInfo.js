import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 10px;
  width: 100%;
  margin-top: 6px;
`;

const UserInfo = ({ children }) => <Container>{children}</Container>;

export default UserInfo;

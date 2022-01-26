import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const LeagueInfo = ({ children }) => <Container>{children}</Container>;

export default LeagueInfo;

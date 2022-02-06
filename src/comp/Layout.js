import styled from "styled-components";

const Layer = styled.div`
  display: flex;
  padding-top: 130px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Layout({ children }) {
  return <Layer>{children}</Layer>;
}

export default Layout;

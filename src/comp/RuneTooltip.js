import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;

  &:hover > .tooltip,
  &:active > .tooltip {
    transform: translate(30px, 20px);
    display: block;
  }
`;

const Content = styled.div`
  display: none;
  position: absolute;
  font-size: 7px;
  z-index: 200;
  background-color: grey;
  width: 300px;
  padding: 2px;
  border-radius: 3px;
  opacity: 0.95;
`;

const RuneTooltip = ({ children, message1, message2 }) => {
  return (
    <Container>
      {children}
      <Content className="tooltip">
        {message1}
        <br></br>
        {message2}
      </Content>
    </Container>
  );
};

export default RuneTooltip;

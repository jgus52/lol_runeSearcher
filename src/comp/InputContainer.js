import styled from "styled-components";

const InputCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  margin: 10px;
  margin-top: 0px;
  position: fixed;
  top: 0px;
  background-color: lightgrey;
  form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
`;

const InputContainer = ({ children }) => {
  return <InputCont>{children}</InputCont>;
};

export default InputContainer;

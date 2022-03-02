import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 70%;
  margin: 3px 0;
  padding: 7px 10px;
  background-color: #fafafa;
  border: 0.5px solid;
  border-radius: 3px;
  box-sizing: border-box;
  margin-right: 10px;
`;

const Search = styled.input`
  border: none;
  background-color: rgba(255, 192, 203, 0.7);
  height: 90%;
  width: 15%;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: ${(props) => (props.loading ? "wait" : "pointer")};
  &:hover {
  }
`;

const HeaderInput = ({ setState, loading, placeholder }) => {
  //value for Input
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setState(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        position: "fixed",
        top: 80,
        backgroundColor: "lightgrey",
        paddingBottom: 5,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 960,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        ></Input>
        {loading ? (
          <Search type="submit" value="loading" loading="true" disabled />
        ) : (
          <Search type="submit" value="search" />
        )}
      </form>
    </div>
  );
};

export default HeaderInput;

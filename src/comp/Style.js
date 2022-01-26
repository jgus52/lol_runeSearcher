import { createGlobalStyle } from "styled-components";
import Roboto from "../fonts/Roboto-Regular.ttf";

export const GlobalStyles = createGlobalStyle`
    @font-face {
      font-family: 'Roboto';
      src: url(${Roboto}) format("truetype");
    }
    body {
      font-family: 'Roboto',sans-serif;
    }
`;

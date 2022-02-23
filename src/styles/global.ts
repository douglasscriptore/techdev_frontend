import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
// import "react-perfect-scrollbar/dist/css/styles.css";
// import "react-loading-skeleton/dist/skeleton.css";
import { device } from './devices';

export const GlobalStyle = createGlobalStyle`
  :root{

    --background: #061831;
    --background-secondary: #071E3D;
    //09254c 25% mais claro
    --card: #0F082C;
    --card-secondary: #0c1f38;
    --text-primary: #f2f2f2;
    --text-secondary: #919299;

    --primary: #1F4287;
    --secondary: #278Ea5;
    --accent: #21E6C1;

    --red: #FF0000;
    --red-secondary: #950101;
    --orange: #E2703A;

    --toastify-icon-color-error:  #950101;
    --toastify-color-progress-error: #950101;
  }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
      @media (max-width: 1080px) {
        font-size: 93.75%;
      }

      @media (max-width: 720px) {
        font-size: 87.5%;
      }
    }

    body {
      background: var(--background);
      -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
    }

    h2,h3,h4,h5,h6, strong {
      font-weight: 600;
    }

    h1 {
      font-weight: 400;
      color: var(--red);
      font-size: 2rem;
    }

    p{
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    a {
      color: var(--text-primary);
      font-size: 0.875rem;

    }


    button {
      cursor: pointer;
    }

    [disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }


    // UPDATE ZOOM BACKGROUND

    .zoom-chat{
      background: var(--background-secondary) !important;
      .self-msg{
        background: var(--blue) !important;
      }
    }

    .zoom-h-95{
      height: 100%;
      max-height:93%;
    }

    @media ${device.laptop}{
      .zoom-h-95{
      height: 90%;
    }

    .chat-height {
    height: min(72vh - 178px , 484px) !important;
    }


  }
    .zoom-h-90{
      height: 90%;
    }
`;

export const Content = styled.main`
  max-width: 1100px;
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
`;

export const Right = styled.aside`
  width: 24rem;
  display: flex;
  flex-direction: column;
`;

export const Left = styled.div`
  flex: 1;
  margin-right: 7rem;

  h1 {
    font-family: 'Roboto Slab', serif;
    color: var(--text-primary);
    font-size: 2.2rem;
  }

  p {
    margin-top: 0.5rem;
    color: var(--accent);
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: var(--accent);
      margin: 0 0.5rem;
    }
  }
`;

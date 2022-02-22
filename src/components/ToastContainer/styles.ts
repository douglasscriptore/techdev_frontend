import styled from 'styled-components';
import { ToastContainer as ToastContainerBase } from 'react-toastify';

interface IThemeProps {
  info: string;
  error: string;
  warn: string;
  success: string;
}

interface IContainerProps {
  theme: IThemeProps;
}

export const ToastContainer = styled(ToastContainerBase).attrs({
  // custom props
})<IContainerProps>`
  .Toastify__toast-container {
  }

  .Toastify__toast {
    background-color: var(--primary);
  }
  .Toastify__toast--error {
    background-color: #f5365c;
  }
  .Toastify__toast--warning {
    background-color: var(--orange);
  }
  .Toastify__toast--success {
    background-color: var(--accent);
  }
  .Toastify__toast-body {
    font-size: 1.02rem;
    font-weight: 600;
    color: #fff;
    opacity: 0.8;
  }

  .Toastify__progress-bar {
  }
`;

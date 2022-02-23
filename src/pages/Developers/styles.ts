import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`;

export const Content = styled.main`
  max-width: 880px;
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
`;

export const SubHeader = styled.div`
  margin: 1rem 0;
  padding: 0 0.8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
`;
export const ListHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  input {
    min-width: 220px;
  }
`;

export const Developer = styled.li`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  background-color: var(--background);
  border-radius: 0.65rem;
  margin-top: 0.4rem;
  cursor: pointer;

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateX(5px);
  }

  section {
    width: 100%;
    margin-left: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      span {
        color: var(--text-primary);
        text-transform: capitalize;
        font-size: 1rem;
      }

      span.flag {
        font-size: 0.8rem;
        font-weight: bold;
        background-color: var(--primary);
        color: #f2f2f2;
        padding: 0.2rem 0.6rem;
        border-radius: 0.625rem;
        opacity: 0.9;
      }

      &.actions {
        display: flex;
        flex-direction: row;
        button {
          border: 0;
          background: ${darken(0.07, '#071E3D')};
          margin: 0;
          padding: 0.6rem 0.6rem;
          border-radius: 0.625rem;
          display: flex;
          align-items: center;
          transition: background 0.2s ease-in-out;

          svg {
            color: var(--text-secondary);
            width: 1rem;
            height: 1rem;
          }

          &:first-of-type {
            margin-right: 0.5rem;
          }

          &:hover {
            background: ${lighten(0.1, '#071E3D')};
          }
        }
      }

      &:nth-child(1) {
        width: 300px;
      }
      strong {
        display: flex;
        align-items: center;
        color: var(--text-secondary);
        font-weight: 400;
        font-size: 0.8rem;
        p {
          display: flex;
          align-items: center;
          color: var(--text-secondary);
          font-weight: 400;
          font-size: 0.8rem;

          &:before {
            content: '';
            width: 0.3rem;
            height: 0.3rem;
            border-radius: 50%;
            margin: 0 0.3rem;
            background: var(--text-secondary);
            opacity: 0.7;
          }
        }
      }
    }
  }
`;

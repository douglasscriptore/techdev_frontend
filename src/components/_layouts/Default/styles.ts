import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  background-color: var(--card-secondary);
`;

export const Header = styled.header`
  color: #fff;
  background-color: var(--background);
  padding: 1rem 0.5rem;
  height: 6rem;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);
`;

export const HeaderContent = styled.div`
  max-width: 1100px;
  margin: 0 0.5rem;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  img {
    height: 4rem;
  }

  button {
    border: 0;
    background-color: var(--red-secondary);
    padding: 0.4rem 0.8rem;
    border-radius: 1.25rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color);
    display: flex;
    align-items: center;
    transition: background-color 0.2s ease-in-out;
    svg {
      margin-left: 0.5rem;
    }

    &:hover {
      background-color: var(--red);
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 0.5rem;
  margin: 0 auto;
`;

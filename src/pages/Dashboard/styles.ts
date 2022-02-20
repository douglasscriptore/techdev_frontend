import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
`;

export const Content = styled.main`
  max-width: 1100px;
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
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
export const Right = styled.aside`
  width: 24rem;
  display: flex;
  flex-direction: column;
`;

export const ChartsContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 3rem;
`;

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
`;

export const ChartsContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 3rem;
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

  section {
    header {
      margin: 2rem 0 1rem;
      letter-spacing: 0.03rem;
      h2 {
        font-size: 1.4rem;
        font-weight: 500;
        font-family: 'Roboto Slab', serif;
        color: var(--text-primary);
      }
    }
  }

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
export const WidgetContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem 1rem;
`;
export const Widget = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  paddin: 2rem;
  color: var(--text-primary);
  width: 12rem;
  height: 9rem;
  background-color: var(--background);
  span {
    font-size: 4rem;
    line-height: 5rem;
  }

  strong {
    font-weight: 400;
    opacity: 0.8;
  }

  &:first-of-type {
    margin-right: 1rem;
  }
`;

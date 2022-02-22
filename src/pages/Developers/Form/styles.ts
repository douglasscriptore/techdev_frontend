import styled from 'styled-components';
import { Wrapped as Input } from '../../../components/Input/styles';
import { Wrapped as DatePicker } from '../../../components/DatePicker/styles';
import { Wrapped as AsyncSelectCreatable } from '../../../components/AsyncSelectCreatable/styles';
import { Wrapped as RadioBadge } from '../../../components/RadioBadge/styles';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`;

export const Content = styled.main`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto 2rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;

  form {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;

    ${Input},${DatePicker}, ${AsyncSelectCreatable},${RadioBadge} {
      margin-top: 1rem;

      &:first-of-type {
        margin-top: 0;
      }
    }
    button {
      margin: 1rem 0 0 auto;
    }
  }
`;

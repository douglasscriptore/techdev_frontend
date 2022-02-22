/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { lighten, darken, desaturate } from 'polished';
import Select from 'react-select/async-creatable';
import { Styles, OptionTypeBase, GroupTypeBase } from 'react-select';
import Tooltip from '../Tooltip';

interface IContainerProps {
  error?: string;
}

export const Container = styled.div<IContainerProps>`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  flex: 1;

  /* width: 40vw;
  min-width: 250px !important; */

  ${props =>
    props.error &&
    css`
      height: 59px;
      max-height: 59px;
    `}
  &:last-of-type {
    margin: 0px;
  }

  /* ICON ERROR */
  i {
    text-decoration: none;
    font-style: normal;

    position: absolute;
    align-self: flex-end;
    padding: 0.4rem 0.6rem 0rem 0.6rem;

    svg {
      font-size: 0.875rem;
      stroke-width: 3px;
      /* opacity: 0.9; */
      color: var(--text-primary);

      -webkit-transition: all 0.15s ease 0s;
      transition: all 0.15s ease 0s;

      &:hover {
        opacity: 1;
      }
    }
  }

  .react-select2 {
    height: 60px;
  }
`;

interface ISelectComponent {
  name: string;
  placeholder: string;
  searchable?: boolean;
  disabled?: boolean;
  errorField?: string;
  isLoading?: boolean;
  error?: string;
}

export const SelectComponent = styled(Select)<ISelectComponent>`
  min-width: 200px !important;
  height: 38px;
  color: var(--text-primary)
  z-index: 102;
  .react-select2__value-container{
    padding: 2px 16px !important;
  }
  > div {
    border: 2px solid ${lighten(0.1, '#061831')};
    border-radius: 10px;
    ${({ error }) =>
      error === 'true' &&
      css`
        border: 2px solid #ac3030;
      `}

    &:focus,&:hover {
      border: 2px solid var(--accent);
    }

    ${({ error }) =>
      error &&
      css`
        border: 2px solid #ac3030;

        &:focus,
        &:hover {
          border: 2px solid #ac3030;
        }
      `}

    &:nth-child(1) {
      div {
        /* opacity: 0.9; */
        color: var(--text-primary);
      }

      &:focus-within {
        color: red;
      }
    }

    /* MENEU OPENED*/
    &:nth-child(3) {
      background-color: #fff;
      color: #1d253b;
      background-color: #fff;
      border-radius:10px;

      background-clip: padding-box;
      border-width: 0 solid rgba(34, 42, 66, 0.15);
      box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
        0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);

      display: block;
      z-index: 9999 !important;
      &:hover {
        border: 0;
      }

      &::before {
        display: inline-block;
        position: absolute;
        width: 0;
        height: 0;
        vertical-align: middle;
        content: '';
        top: -5px;
        left: auto;
        right: 10px;
        color: #fff;
        border-bottom: 0.4em solid;
        border-right: 0.4em solid transparent;
        border-left: 0.4em solid transparent;
      }

      > div {
        > div {
          -webkit-transition: all 0.15s linear;
          transition: all 0.15s linear;
          &:hover {
            /* background-color: hsla(0, 0%, 87.1%, 0.3); */
          }
        }
      }
    }
  }

  svg {
    /* opacity: 0.8; */
    color: var(--text-primary);
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  margin-right: 10px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &:before {
      border-color: #c53030 transparent;
    }
  }
`;

type IStyles = Styles<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>;

export const customStyles = (): IStyles => {
  return {
    container: provided => ({
      ...provided,
      borderRadius: '10px',
      height: '60px',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: '0.9rem',
      color: 'var(--text-secondary)',
      width: 'max-content !important',
    }),

    option: (provided, state) => ({
      ...provided,
      zIndex: 105,
      backgroundColor: state.isDisabled
        ? null
        : state.isSelected
        ? null
        : state.isFocused
        ? 'hsla(0, 0%, 87.1%, 0.3)'
        : null,
      color: state.isDisabled
        ? 'hsla(0, 0%, 0%, 0.3)'
        : state.isSelected
        ? '#3358f4'
        : '#1d253b',
      // fontWeight: state.isSelected ? 600 : 400,
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    }),
    singleValue: (base, state) => ({
      ...base,
      padding: '0 8px',
      borderRadius: 5,
      background: '#3358f4',
      color: 'white',
      display: 'flex',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      opacity: state.isDisabled ? '0.6' : '1',
    }),

    control: (base, state) => ({
      ...base,
      height: '60px',
      background: ' var(--background)',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      opacity: state.isDisabled ? '0.6' : '1',
    }),
    input: (base, state) => ({
      ...base,
      color: 'var(--text-primary)',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    }),
    indicatorSeparator: base => ({
      backgroundColor: 'transparent',
    }),
    loadingIndicator: base => ({
      display: 'flex',
      padding: 4,
      span: {
        height: '0.5em',
        width: '0.5em',
        marginRight: -5,
      },
    }),
  } as IStyles;
};

export const ErrorMessage = styled.span`
  margin-top: 1.5px;
  align-self: flex-start;
  display: flex;
  flex: 1 1;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: #ac3030;
`;

export const OptionContent = styled.div`
  display: flex;
  padding: 2px 16px 2px 16px;
`;

// type IOptionThree = typeof Option;

// export const OptionThree = styled(components.Option)``;
export const OptionThree = styled.div`
  cursor: pointer;
  height: 48px;
  padding: 5px 8px;
  display: flex;
  align-items: center;

  p {
    font-size: 16px;
    color: #2b3245;
  }
  span {
    margin-left: 5px;
    color: #808080;
    font-size: 12px;
    font-style: italic;
  }

  &:hover {
    background: ${darken(0.05, '#fff')};
  }
`;

export const Wrapped = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  label {
    margin-bottom: 0.3rem;
    margin-left: 0.3rem;
  }
`;

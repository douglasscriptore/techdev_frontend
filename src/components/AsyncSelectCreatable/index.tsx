import React, { useRef, useEffect } from 'react';
import { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';
import Select, { components, IndicatorProps } from 'react-select';

import {
  FiAlertCircle,
  FiArrowDown,
  FiChevronDown,
  FiChevronsDown,
} from 'react-icons/fi';
import {
  Container,
  SelectComponent,
  customStyles,
  ErrorMessage,
  Error,
  Wrapped,
} from './styles';

interface Props
  extends Omit<SelectProps<OptionTypeBase>, 'theme' | 'isLoading'> {
  name: string;
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  errorField?: string;
}

const AsyncSelect: React.FC<Props> = ({
  name,
  searchable,
  label,
  disabled,
  errorField,
  ...rest
}: Props) => {
  const selectAsyncRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectAsyncRef.current,

      // eslint-disable-next-line consistent-return
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
        } else {
          if (!ref.select.state.value) {
            return '';
          }
          return ref.select.state.value.value;
        }
      },
      setValue: (ref, value) => {
        ref.select.select.setValue(value || null);
      },
      clearValue(ref: any) {
        ref.select.select.setValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <FiChevronDown />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </components.DropdownIndicator>
    );
  };

  return (
    <Wrapped>
      {!!label && <label>{label}</label>}
      <Container error={errorField}>
        <SelectComponent
          error={error}
          styles={customStyles()}
          isSearchable={searchable}
          ref={selectAsyncRef}
          isClearable
          classNamePrefix="react-select2"
          cacheOptions
          // menuPlacement={menuPlacement}
          defaultOptions
          isDisabled={disabled}
          components={{ DropdownIndicator }}
          defaultValue={defaultValue}
          noOptionsMessage={() => 'Sem opções'}
          loadingMessage={() => 'Carregando...'}
          formatCreateLabel={(inputValue: string) =>
            `Criar novo " ${inputValue} "`
          }
          {...rest}
        />
      </Container>
    </Wrapped>
  );
};

export default AsyncSelect;

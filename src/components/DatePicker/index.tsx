import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { useField } from '@unform/core';

import 'react-datepicker/dist/react-datepicker.css';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error, Wrapped } from './styles';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
}

const DatePicker: React.FC<Props> = ({ name, label, ...rest }: Props) => {
  const datepickerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      setValue(ref: any, value: any) {
        if (value) setDate(new Date(value));
        return value;
      },
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // setIsFilled(!!datepickerRef.current?.value);
  }, []);

  return (
    <Wrapped>
      {!!label && <label>{label}</label>}
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        <ReactDatePicker
          className="date-picker"
          showYearDropdown
          ref={datepickerRef}
          selected={date}
          onChange={setDate}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          customInput={<input />}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </Wrapped>
  );
};

export default DatePicker;

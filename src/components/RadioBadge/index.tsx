import { useField } from '@unform/core';
import React, {
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error, Wrapped } from './styles';

interface OptionItem {
  label: string;
  value: string | number;
}

interface RadioBadgeProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  options: OptionItem[];
}

type RefInputEl = RefObject<HTMLInputElement[]>;

const RadioBadge: React.FC<RadioBadgeProps> = ({
  options,
  name,
  label,
  ...rest
}: RadioBadgeProps) => {
  const [selected, setSelected] = useState(1);

  const inputRefs = useRef<HTMLInputElement[]>([] as HTMLInputElement[]);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs: RefInputEl) => {
        return refs.current?.find(input => input?.checked)?.value || '';
      },
      setValue: (refs: RefInputEl, value: string) => {
        const inputRef = refs.current?.find(ref => ref.value === value);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: RefInputEl) => {
        const inputRef = refs.current?.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Wrapped>
      {!!label && <label>{label}</label>}
      <Container checkedItem={1}>
        {!!options &&
          options.map((option, index) => (
            <div key={index} onClick={() => setSelected(index + 1)}>
              <input
                type="radio"
                ref={ref => {
                  if (!!inputRefs && !!ref) {
                    inputRefs.current[index] = ref;
                  }
                }}
                name={name}
                id={`option-${index}`}
                // checked={index + 1 === selected}
                defaultChecked={
                  defaultValue.includes(option.value) ||
                  options[0].value === option.value
                }
                value={option.value}
                {...rest}
              />
              <label htmlFor={`option-${index}`} key={index}>
                <span>{option.label}</span>
              </label>
            </div>
          ))}

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </Wrapped>
  );
};

export default RadioBadge;

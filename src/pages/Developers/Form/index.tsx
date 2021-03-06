/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { differenceInYears } from 'date-fns';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import * as Yup from 'yup';
import AsyncSelect from '../../../components/AsyncSelectCreatable';
import Button from '../../../components/Button';

import ButtonBack from '../../../components/ButtonBack';
import DatePicker from '../../../components/DatePicker';
import Input from '../../../components/Input';
import RadioBadge from '../../../components/RadioBadge';
import api from '../../../services/api';
import { LevelItem } from '../../Levels/@types';

import { Container, SubHeader } from '../styles';
import { FormContent } from './styles';

import { DeveloperItem } from '../@types';
import getValidationErrors from '../../../utils/getValidationErrors';
import TextArea from '../../../components/TextArea';

interface DevelopersFormData extends Omit<DeveloperItem, 'level'> {
  level_id: any;
}

interface OptionProps {
  label: string;
  value: string;
  __isNew__?: boolean;
}

interface ParamsProps {
  id: string;
}

interface locationsProps {
  originPage?: string;
}

const FormData: React.FC = () => {
  // states
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [initialData, setItnitialData] = useState<DevelopersFormData>(
    {} as DevelopersFormData,
  );
  const [levels, setLevels] = useState<OptionProps[]>([] as OptionProps[]);

  // hooks
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation<locationsProps>();
  const { id } = useParams<ParamsProps>();

  const gendersOptions = [
    {
      value: 'masculino',
      label: 'Masculino',
    },
    {
      value: 'feminino',
      label: 'Feminino',
    },
    {
      value: 'outro',
      label: 'Outro',
    },
  ];

  /**
   * USE CALLBACK
   */
  const handleCalculateAge = useCallback((date: Date) => {
    const age = differenceInYears(new Date(), date);
    formRef.current?.setFieldValue('age', age);
  }, []);

  const loadNiveis = useCallback(async (filter: string) => {
    setAsyncLoading(true);
    try {
      if (filter.length > 2) {
        const response = await api.get('/levels', { params: { filter } });

        return response.data.data.map(
          (nivel: LevelItem) =>
            ({
              value: nivel.id,
              label: nivel.levelname,
              __isNew__: false,
            } as unknown as OptionProps),
        );
      }
    } catch (error) {
      toast.error('Erro inesperado');
    } finally {
      setAsyncLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: DevelopersFormData) => {
      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          fullname: Yup.string().required('Campo obrigat??rio'),
          dateofborn: Yup.date()
            .max(new Date(), 'Forne??a uma data de nascimento v??lida')
            .required('Campo obrigat??rio')

            .nullable()
            .default(undefined),
          level_id: Yup.string().required('Campo obrigat??rio'),
          gender: Yup.string().required('Campo obrigat??rio'),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post(`/developers`, data);
        toast.success('Desenvolvedor cadastrado');
        history.push('/developers');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
        if (error instanceof Error) toast.error(error.message);
        else toast.error('Erro Inesperado');
      } finally {
        setLoadingSubmit(false);
      }
    },
    [history],
  );

  const handleSubmitEdit = useCallback(
    async (data: DevelopersFormData) => {
      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          fullname: Yup.string().required('Campo obrigat??rio'),
          dateofborn: Yup.date()
            .max(new Date(), 'Forne??a uma data de nascimento v??lida')
            .required('Campo obrigat??rio')

            .nullable()
            .default(undefined),
          level_id: Yup.string().required('Campo obrigat??rio'),
          gender: Yup.string().required('Campo obrigat??rio'),
        });

        await api.put(`/developers/${id}`, {
          ...data,
          level_id: Number(data.level_id),
        });
        toast.success('Desenvolvedor Editado');
        history.push('/developers');
        await schema.validate(data, { abortEarly: false });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
        if (error instanceof Error) toast.error(error.message);
        else toast.error('Erro Inesperado');
      } finally {
        setLoadingSubmit(false);
      }
    },
    [history, id],
  );

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const checkIfLevelIsNew = (inputValue: string) => {
    if (inputValue.length > 2) {
      return true;
    }
  };

  const handleCreateLevel = useCallback(async (newLevel: OptionProps) => {
    // eslint-disable-next-line no-underscore-dangle
    if (!!newLevel && newLevel.__isNew__) {
      try {
        const response = await api.post('/levels', {
          levelname: newLevel.label,
        });
        formRef.current?.setFieldValue('level_id', {
          value: response.data.id,
          label: response.data.levelname,
        });
        toast.success(`N??vel ${newLevel.label} criado`);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        else toast.error('Erro Inesperado');
      }
    }
  }, []);

  /**
   * USE EFFECT
   */

  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get<DeveloperItem>(`developers/${id}`)
        .then(response => {
          formRef.current?.setFieldValue('fullname', response.data.fullname);
          formRef.current?.setFieldValue(
            'dateofborn',
            response.data.dateofborn as Date,
          );
          formRef.current?.setFieldValue('age', response.data.age);
          formRef.current?.setFieldValue('gender', response.data.gender);
          if (response.data.level) {
            setItnitialData({
              ...response.data,
              level_id: {
                value: response.data.level.id,
                label: response.data.level.levelname,
              },
            });
          }
        })
        .catch(error => {
          if (error instanceof Error) toast.error(error.message);
          else toast.error('Erro Inesperado');
        })
        .finally(() => setLoading(false));
    }
  }, [id, loadNiveis]);

  useEffect(() => {
    api
      .get('levels', { params: { skip: 0, take: 10 } })
      .then(response =>
        setLevels(
          response.data.data.map((level: LevelItem) => ({
            value: level.id,
            label: level.levelname,
          })),
        ),
      )
      .catch(error => console.log(error));
  }, []);

  return (
    <Container>
      <SubHeader>
        <ButtonBack
          goTo={
            location.state?.originPage
              ? location.state.originPage
              : '/developers'
          }
          title={`${id ? 'Editar Desenvolvedor' : 'Novo Desenvolvedor'}`}
        />
      </SubHeader>

      <FormContent>
        <Form
          ref={formRef}
          onSubmit={(data: DevelopersFormData) =>
            id ? handleSubmitEdit(data) : handleSubmit(data)
          }
          initialData={initialData}
        >
          <Input
            name="fullname"
            placeholder="Ex: Jos?? da Silva"
            label="Nome Completo:"
            isLoading={loadingSubmit}
          />
          <DatePicker
            label="Data de nascimento:"
            name="dateofborn"
            placeholderText="Ex: 12/04/1991"
            onSelect={(date: Date) => handleCalculateAge(date)}
            disabled={loadingSubmit}
          />
          <Input
            name="age"
            disabled={true}
            label="Idade:"
            placeholder="Preenchido automaticamente"
            isLoading={loadingSubmit}
          />
          {!loading && (
            <AsyncSelect
              name="level_id"
              label="N??vel:"
              searchable
              clearable
              placeholder="Selecione..."
              isValidNewOption={(inputValue: string) =>
                checkIfLevelIsNew(inputValue)
              }
              defaultOptions={levels}
              onChange={(value: OptionProps) => handleCreateLevel(value)}
              createOptionPosition="last"
              loadOptions={loadNiveis}
              isLoading={asyncLoading}
              disabled={loadingSubmit}
            />
          )}

          <RadioBadge
            name="gender"
            options={gendersOptions}
            label="Sexo:"
            disabled={loadingSubmit}
          />

          <TextArea
            label="Hobby:"
            name="hobby"
            placeholder="Ex: Jogar futebol"
          />

          <Button
            type="submit"
            color="accent"
            loading={loadingSubmit}
            disabled={loadingSubmit}
          >
            <FiSave /> SALVAR
          </Button>
        </Form>
      </FormContent>
    </Container>
  );
};

export default FormData;

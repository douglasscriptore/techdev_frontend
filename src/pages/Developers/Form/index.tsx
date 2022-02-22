/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { differenceInYears, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import * as Yup from 'yup';
import AsyncSelect from '../../../components/AsyncSelectCreatable';
import Button from '../../../components/Button';

import ButtonBack from '../../../components/ButtonBack';
import DatePicker from '../../../components/DatePicker';
import Input from '../../../components/Input';
import RadioBadge from '../../../components/RadioBadge';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import { LevelItem } from '../../Levels/@types';

import { Container, SubHeader } from '../styles';
import { Content } from './styles';
import { DeveloperItem } from '../@types';
import getValidationErrors from '../../../utils/getValidationErrors';

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

const FormData: React.FC = () => {
  // states
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [initialData, setItnitialData] = useState<DevelopersFormData>(
    {} as DevelopersFormData,
  );
  // hooks
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
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
      console.log(error);
      toast.error('Erro inesperado43');
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
          fullname: Yup.string().required('Campo obrigatório'),
          dateofborn: Yup.date()
            .max(new Date(), 'Forneça uma data de nascimento válida')
            .required('Campo obrigatório')

            .nullable()
            .default(undefined),
          level: Yup.string().required('Campo obrigatório'),
          gender: Yup.string().required('Campo obrigatório'),
        });

        await api.post(`/developers`, data);
        toast.success('Desenvolvedor cadastrado');
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
    [history],
  );

  const handleSubmitEdit = useCallback(
    async (data: DevelopersFormData) => {
      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          fullname: Yup.string().required('Campo obrigatório'),
          dateofborn: Yup.date()
            .max(new Date(), 'Forneça uma data de nascimento válida')
            .required('Campo obrigatório')

            .nullable()
            .default(undefined),
          level: Yup.string().required('Campo obrigatório'),
          gender: Yup.string().required('Campo obrigatório'),
        });
        console.log(data.level_id);
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
        await api.post('/levels', { levelname: newLevel.label });
        toast.success(`Nível ${newLevel.label} criado`);
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

  return (
    <Container>
      <SubHeader>
        <ButtonBack
          goTo="/developers"
          title={`${id ? 'Editar Desenvolvedor' : 'Novo Desenvolvedor'}`}
        />
      </SubHeader>

      <Content>
        <Form
          ref={formRef}
          onSubmit={(data: DevelopersFormData) =>
            id ? handleSubmitEdit(data) : handleSubmit(data)
          }
          initialData={initialData}
        >
          <Input
            name="fullname"
            placeholder="Ex: José da Silva"
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
              label="Nível:"
              searchable
              clearable
              placeholder="Selecione..."
              isValidNewOption={(inputValue: string) =>
                checkIfLevelIsNew(inputValue)
              }
              // defaultOptions={[{ value: 1, label: 'lala' }]}
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

          <Button
            type="submit"
            color="accent"
            loading={loadingSubmit}
            disabled={loadingSubmit}
          >
            <FiSave /> SALVAR
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default FormData;

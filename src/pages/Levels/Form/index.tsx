/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import * as Yup from 'yup';

import Button from '../../../components/Button';

import ButtonBack from '../../../components/ButtonBack';

import Input from '../../../components/Input';
import api from '../../../services/api';
import { LevelItem } from '../@types';

import { Container, SubHeader } from '../styles';
import { FormContent } from './styles';

import getValidationErrors from '../../../utils/getValidationErrors';

interface LevelsFormData {
  levelname: string;
}

interface ParamsProps {
  id: string;
}

const FormData: React.FC = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [initialData, setItnitialData] = useState<LevelsFormData>(
    {} as LevelsFormData,
  );

  // hooks
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { id } = useParams<ParamsProps>();

  /**
   * USE CALLBACK
   */

  const handleSubmit = useCallback(
    async (data: LevelsFormData) => {
      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          levelname: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post(`/levels`, data);
        toast.success('Nível cadastrado');
        history.push('/levels');
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
    async (data: LevelsFormData) => {
      setLoadingSubmit(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          levelname: Yup.string().required('Campo obrigatório'),
        });
        await api.put(`/levels/${id}`, {
          ...data,
        });
        toast.success('Nível Editado');
        history.push('/levels');
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

  /**
   * USE EFFECT
   */

  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get<LevelItem>(`levels/${id}`)
        .then(response => {
          formRef.current?.setFieldValue('levelname', response.data.levelname);
        })
        .catch(error => {
          if (error instanceof Error) toast.error(error.message);
          else toast.error('Erro Inesperado');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Container>
      <SubHeader>
        <ButtonBack
          goTo="/levels"
          title={`${id ? 'Editar Nível' : 'Novo Nível'}`}
        />
      </SubHeader>

      <FormContent>
        <Form
          ref={formRef}
          onSubmit={(data: LevelsFormData) =>
            id ? handleSubmitEdit(data) : handleSubmit(data)
          }
          initialData={initialData}
        >
          <Input
            name="levelname"
            placeholder="Ex: Engenheiro de Software Senior"
            label="Descrição do Nível:"
            isLoading={loadingSubmit}
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

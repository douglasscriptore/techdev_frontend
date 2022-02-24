import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiEdit, FiPlus, FiSearch, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import Avatar from 'react-avatar';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import { Container, Content, SubHeader, ListHeader, Developer } from './styles';

import Pagination from '../../components/Pagination';
import { DeveloperItem } from './@types';
import api from '../../services/api';
import Input from '../../components/Input';
import { useModal } from '../../hooks/modal';
import DevelopersTableLoader from '../../components/Loaders/DevelopersTableLoader';
import NoDataMessage from '../../components/NoDataMessage';

const Developers: React.FC = () => {
  const TAKE = 10;
  /**
   * USE STATE
   */
  const [searchDeveloperTerm, setSearchDeveloperTerm] = useState('');
  const [developers, setDevelopers] = useState<DeveloperItem[]>(
    {} as DeveloperItem[],
  );
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  /**
   * Hooks
   */
  const { push } = useHistory();
  const { showModal, hideModal, updateModal, modalData } = useModal();

  /*
   * USE REF
   */
  const formSearchRef = useRef<FormHandles>(null);

  /**
   * USE CALLBACK
   */
  const handleNewDeveloper = useCallback(() => {
    push('/developers/new');
  }, [push]);

  const handleEdit = useCallback(
    (developer_id: number) => {
      push(`/developers/${developer_id}/edit`);
    },
    [push],
  );

  const handleDelete = useCallback(
    (event, developer: DeveloperItem) => {
      event.preventDefault();
      showModal({
        title: `ATENÇÃO`,
        component: (
          <p>
            Você está prestes a remover <b>{developer.fullname}</b> deseja
            prosseguir?
          </p>
        ),
        callback: async () => {
          updateModal({ ...modalData, loading: true });
          try {
            await api.delete(`developers/${developer.id}`);
            setDevelopers(developers.filter(dev => dev.id !== developer.id));
            toast.success(`Desenvolvedor removido`);
            hideModal();
          } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error('Erro Inesperado');
          } finally {
            updateModal({ ...modalData, loading: false });
          }
        },
      });
    },
    [developers, hideModal, modalData, showModal, updateModal],
  );

  const findDevelopers = useCallback(
    (name?: string) => {
      api
        .get('developers', {
          params: { name, skip: TAKE * page - TAKE, take: TAKE },
        })
        .then(response => {
          setDevelopers(
            response.data.data.map((developer: DeveloperItem) => ({
              ...developer,
              dateofborn: format(
                parseISO(developer.dateofborn.toString()),
                'dd/MM/yyyy',
              ),
            })),
          );
          setPages(Math.ceil(response.data.count / 10));
        })
        .catch(error => {
          if (error instanceof Error) toast.error(error.message);
          else toast.error('Erro Inesperado');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [page],
  );
  /**
   * USE EFFECT
   */

  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(() => {
      findDevelopers(searchDeveloperTerm);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [findDevelopers, searchDeveloperTerm]);

  return (
    <Container>
      <SubHeader>
        <ButtonBack goTo="/dashboard" title="Desenvolvedores" />
        <Button onClick={handleNewDeveloper}>
          <FiPlus />
          Novo Desenvolvedor
        </Button>
      </SubHeader>
      <Content>
        <ListHeader>
          <Form ref={formSearchRef} onSubmit={() => console.log('ae')}>
            <Input
              icon={FiSearch}
              name="search"
              placeholder="Buscar por nome"
              onChange={event => setSearchDeveloperTerm(event.target.value)}
            />
          </Form>
          <Pagination
            total={pages}
            activePage={page}
            onClick={pageClicked => setPage(pageClicked)}
          />
        </ListHeader>
        {loading && <DevelopersTableLoader />}
        {!loading && (
          <ul>
            {developers && developers.length > 0 ? (
              developers.map(developer => (
                <Developer
                  key={developer.id}
                  // onClick={() => handleEdit(developer.id)}
                >
                  <Avatar name={developer.fullname} round size="48" />
                  <section>
                    <div>
                      <span>{developer.fullname}</span>
                      <strong>
                        {developer.dateofborn}
                        <p>{developer.age} anos</p>
                      </strong>
                    </div>
                    <div>
                      <span className="flag">{developer.level?.levelname}</span>
                    </div>
                    <div className="actions">
                      <button onClick={() => handleEdit(developer.id)}>
                        <FiEdit />
                      </button>
                      <button onClick={event => handleDelete(event, developer)}>
                        <FiTrash />
                      </button>
                    </div>
                  </section>
                </Developer>
              ))
            ) : (
              <NoDataMessage message="Nenhum desenvolvedor localizado" />
            )}
          </ul>
        )}
      </Content>
    </Container>
  );
};

export default Developers;

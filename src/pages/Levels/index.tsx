import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiEdit, FiPlus, FiSearch, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import format from 'date-fns/format';
import { parse, parseISO } from 'date-fns';
import Avatar from 'react-avatar';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import { Container, Content, SubHeader, ListHeader, Level } from './styles';

import Pagination from '../../components/Pagination';
import { LevelItem } from './@types';
import api from '../../services/api';
import Input from '../../components/Input';
import { useModal } from '../../hooks/modal';

const Levels: React.FC = () => {
  const TAKE = 10;
  /**
   * USE STATE
   */
  const [searchDeveloperTerm, setSearchDeveloperTerm] = useState('');
  const [levels, setLevels] = useState<LevelItem[]>({} as LevelItem[]);

  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

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
  const handleNewLevel = useCallback(() => {
    push('/levels/new');
  }, [push]);

  const handleEdit = useCallback(
    (developer_id: number) => {
      push(`/levels/${developer_id}/edit`);
    },
    [push],
  );

  const handleDelete = useCallback(
    (event, level: LevelItem) => {
      event.preventDefault();
      showModal({
        title: `ATENÇÃO`,
        component: (
          <p>
            Você está prestes a remover <b>{level.levelname}</b> deseja
            prosseguir?
          </p>
        ),
        callback: async () => {
          updateModal({ ...modalData, loading: true });
          try {
            await api.delete(`levels/${level.id}`);
            setLevels(levels.filter(lvl => lvl.id !== level.id));
            toast.success(`Nível removido`);
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
    [hideModal, levels, modalData, showModal, updateModal],
  );

  const findLevels = useCallback(
    (filter?: string) => {
      api
        .get('levels', {
          params: { filter, skip: TAKE * page - TAKE, take: TAKE },
        })
        .then(response => {
          setLevels(response.data.data);
          setPages(Math.ceil(response.data.count / TAKE));
        })
        .catch(error => {
          if (error instanceof Error) toast.error(error.message);
          else toast.error('Erro Inesperado');
        });
    },
    [page],
  );
  /**
   * USE EFFECT
   */

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      findLevels(searchDeveloperTerm);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [findLevels, searchDeveloperTerm]);

  return (
    <Container>
      <SubHeader>
        <ButtonBack goTo="/dashboard" title="Níveis" />
        <Button onClick={handleNewLevel}>
          <FiPlus />
          Novo Nível
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

        <ul>
          {levels &&
            levels.length > 0 &&
            levels.map(level => (
              <Level
                key={level.id}
                // onClick={() => handleEdit(developer.id)}
              >
                <section>
                  <div>
                    <span>{level.levelname}</span>
                  </div>
                  <div>
                    <span className="flag">
                      {level.developersCount} Desenvolvedores
                    </span>
                  </div>
                  <div className="actions">
                    <button onClick={() => handleEdit(level.id)}>
                      <FiEdit />
                    </button>
                    <button onClick={event => handleDelete(event, level)}>
                      <FiTrash />
                    </button>
                  </div>
                </section>
              </Level>
            ))}
        </ul>
      </Content>
    </Container>
  );
};

export default Levels;

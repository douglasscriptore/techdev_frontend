import { format, formatDistance, isToday, parseISO } from 'date-fns';
import { pt, ptBR } from 'date-fns/locale';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import Avatar from 'react-avatar';

import ButtonMenu from '../../components/ButtonMenu';
import {
  Container,
  Content,
  Left,
  Right,
  Widget,
  WidgetContent,
} from './styles';

import { DeveloperItem } from '../Developers/@types';
import api from '../../services/api';
import { Developer } from '../Developers/styles';
import NoDataMessage from '../../components/NoDataMessage';

interface LastestDevItem {
  id: number;
  fullname: string;
  age: number;
  dateofborn: string;
  level: {
    levelname: string;
  };
  created_at: string;
  formattedDate: string;
}

const Dashboard: React.FC = () => {
  /*
   ** USE STATE
   */
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalDevs, setTotalDevs] = useState(0);
  const [totalLevels, setTotalLevels] = useState(0);
  const [loadingDevs, setLoadingDevs] = useState(true);
  const [latestDevelopers, setLatestDevelopers] = useState<LastestDevItem[]>(
    [] as LastestDevItem[],
  );

  /**
   * Hooks
   */
  const { push } = useHistory();

  /*
   ** USE MEMO
   */

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(
    () => format(selectedDate, 'cccc', { locale: ptBR }),
    [selectedDate],
  );

  /**
   * FIND LASTEST DEVS
   */

  useEffect(() => {
    setLoadingDevs(true);
    api
      .get('/developers', { params: { take: 3 } })
      .then(response => {
        setLatestDevelopers(
          response.data.data.map((dev: DeveloperItem) => ({
            ...dev,
            dateofborn: format(
              parseISO(dev.dateofborn.toString()),
              'dd/MM/yyyy',
            ),
            formattedDate: formatDistance(
              parseISO(dev.created_at),
              new Date(),
              {
                addSuffix: true,
                locale: pt,
              },
            ),
          })),
        );
        setTotalDevs(response.data.count);
      })
      .catch(error => {
        if (error instanceof Error) toast.error(error.message);
        else toast.error('Erro inesperado');
      })
      .finally(() => setLoadingDevs(false));
  }, []);

  useEffect(() => {
    api
      .get('levels', { params: { take: 1 } })
      .then(response => {
        setTotalLevels(response.data.count);
      })
      .catch(error => console.log(error));
  }, []);

  const handleGoTo = useCallback(
    (page: string) => {
      push(page, {
        originPage: '/dashboard',
      });
    },
    [push],
  );

  return (
    <Container>
      <Content>
        <Left>
          <h1>DASHBOARD</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText || ''}</span>
            <span>{selectedWeekDay || ''}</span>
          </p>
          <WidgetContent>
            <Widget>
              <CountUp duration={2} end={totalDevs} />
              <strong>Desenvolvedores</strong>
            </Widget>
            <Widget>
              <CountUp duration={2} end={totalLevels} />
              <strong>Níveis</strong>
            </Widget>
          </WidgetContent>
          <section>
            <header>
              <h2>Ultimos desenvolvedores cadastrados</h2>
            </header>
            <article>
              <ul>
                {!loadingDevs &&
                !!latestDevelopers &&
                latestDevelopers.length > 0 ? (
                  latestDevelopers.map(developer => (
                    <Developer
                      key={developer.id}
                      onClick={() =>
                        handleGoTo(`/developers/${developer.id}/edit`)
                      }
                    >
                      <Avatar name={developer.fullname} round size="48" />

                      <section>
                        <div>
                          <span>{developer.fullname}</span>
                          <strong>{developer.formattedDate}</strong>
                        </div>
                        <div>
                          <span className="flag">
                            {developer.level?.levelname}
                          </span>
                        </div>
                      </section>
                    </Developer>
                  ))
                ) : (
                  <NoDataMessage message=" ">
                    Nenhum desenvolvedor cadastrado
                    <a
                      href=""
                      onClick={() => {
                        handleGoTo('/developers/new');
                      }}
                    >
                      clique aqui
                    </a>
                    para cadastrar
                  </NoDataMessage>
                )}
              </ul>
            </article>
          </section>
        </Left>
        <Right>
          <ButtonMenu goTo="/developers">Gerenciar Desenvolvedores</ButtonMenu>
          <ButtonMenu goTo="/levels">Gerenciar Níveis</ButtonMenu>
        </Right>
      </Content>
    </Container>
  );
};

export default Dashboard;

import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useMemo, useState } from 'react';
import DonutChart from 'react-donut-chart';

import ButtonMenu from '../../components/ButtonMenu';
import { ChartsContent, Container } from './styles';
import { Content, Left, Right } from '../../styles/global';

const Dashboard: React.FC = () => {
  /*
   ** USE STATE
   */
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMOnth] = useState(new Date());

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

          <ChartsContent>
            <DonutChart
              width={250}
              height={250}
              legend={false}
              colors={[
                '#21E6C1',
                '#1F4287',
                '#278Ea5',
                '#B030B0',
                '#8FD6E1',
                '#E2703A',
              ]}
              data={[
                {
                  label: 'Senior Software Enginer',
                  value: 100,
                },
              ]}
            />

            <DonutChart
              width={250}
              height={250}
              legend={false}
              colors={[
                '#21E6C1',
                '#1F4287',
                '#278Ea5',
                '#B030B0',
                '#8FD6E1',
                '#E2703A',
              ]}
              data={[
                {
                  label: 'Give you up',
                  value: 100,
                },
              ]}
            />
          </ChartsContent>
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

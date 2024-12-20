import React from 'react';
import championImages from '../../assets/images/images';
import styled from 'styled-components';

interface ChampionCardProps {
  name: string;
}

const CardContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const ChampImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const ChampionCard: React.FC<ChampionCardProps> = ({ name }) => {
  return (
    <CardContainer>
      <ChampImage src={championImages[name]} alt={name} />
    </CardContainer>
  );
};

export default ChampionCard;

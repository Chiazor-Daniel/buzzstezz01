import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import styled from 'styled-components';
import Poster from '../../assets/poster.webp';

const UnavailableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  color: #2501F3;
`;

const UnavailableIcon = styled(FaExclamationCircle)`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const UnavailableText = styled.h2`
  font-size: 2rem;
  text-align: center;
`;

export function Anime() {
  return (
       
      <UnavailableContainer>
        <UnavailableIcon />
        <UnavailableText>Currently Unavailable</UnavailableText>
      </UnavailableContainer>
  );
}
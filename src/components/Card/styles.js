import styled, { keyframes } from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
transform: perspective(500px) rotateY(25deg) scale(0.9) rotateX(10deg);
  transition: 0.4s ease all;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.8rem;
  cursor: pointer;
  width: 300px;
  height: 260px;
  border: 1px solid #444;
  border-radius: 20px;

  &:hover {
     transform: scale(1);
    filter: blur(0px);
    opacity: 1;
    padding: '20px';
    z-index: 15;
    text-align: center;
  }

  img {
    height: 18.75rem;
  }
`

export const CardContent = styled.div`
  position: absolute;
  padding: 0 1rem 1rem 1rem;
  bottom: 0;
  height: 18.125rem;
  width: 100%;
  display: flex;
  align-items-center;
  flex-direction: column;
  justify-content: center;

  background-image: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 1));
  opacity: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  h2 {
    font-weight: 900;
    font-size: 1.3rem;
  }

  article {
    display: flex;
    margin-bottom: 100px;
    justify-content: space-between;
    align-items: center;

    color: #fef501;

    font-size: 0.95rem;
    font-weight: 800;
    margin-bottom: 0.4rem;

    span {
      display: inline-flex;
      align-items: center;
      gap: 0.2rem;
    }
  }

  p {
    font-style: italic;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
`;

export const loading = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 6px solid #444;
  border-radius: 50%;
  border-top-color: var(--logo-color);

  height: 3rem;
  width: 3rem;
  animation: ${loading} 1s infinite;
`;

export const ButtonFav = styled.button`
  position: relative;
  top: 0;
  right: 0;
  padding: 0.5rem 1rem;
  border: 2px solid var(--logo-color);
  border-radius: 5px;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    background-color: var(--logo-color);
    color: #fef501;
  }

  &.active {
    color: #555550;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 0.6rem;
`;

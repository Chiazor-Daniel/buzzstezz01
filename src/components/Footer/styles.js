import styled from "styled-components"

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
  width: 100%;
  height: 6rem;
  background: #02040C;
  margin-top: 5rem;
  font-size: 0.9rem;

  @media(min-width: 768px) {
  }

  p {
    @media(min-width: 768px) {
    }
  }

  a {
    color: #2662d9;
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
      color: #00f7df;
    }
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(min-width: 768px) {
      flex-direction: row;
      gap: 1rem;
    }
  }

  svg {
    margin-right: 0.5rem;
  }
`
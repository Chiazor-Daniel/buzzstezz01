import { APIkey } from '../../config/key'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CustomPagination } from '../../components/Pagination'

import { Banner } from '../Movies/styles'
import Poster from '../../assets/persons.jpg'
import styled from 'styled-components'

export function Persons() {
  const [persons, setPersons] = useState([])
  const [numOfPages, setNumOfPages] = useState(0)
  const [page, setPage] = useState(1)

  const fetchPersons = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${APIkey}&language=en-US&page=${page}`)
    setPersons(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchPersons()
  }, [page])

  return (
    <Container>
      <Banner>
        <img src={Poster} alt="Poster" lazy/>
        <h3>People</h3>
      </Banner>
      <ContainerPerson>
        {persons &&
          persons.map(person => (
            <Link key={person.id} to={`/person/${person.id}`}>
              <PersonContent>
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    person.profile_path ? person.profile_path : ''
                  }`}
                  alt={person.name}
                />
                <div className="name">
                  <h2>{person.name}</h2>
                </div>
              </PersonContent>
            </Link>
          ))}
      </ContainerPerson>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </Container>
  )
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ContainerPerson = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 468px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const PersonContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  transform: perspective(800px) rotateY(15deg) scale(0.9) rotateX(10deg);
  transition: 0.4s all;

   &:hover {
     transform: scale(1);
    filter: blur(0px);
    opacity: 1;
    padding: '20px';
    z-index: 15;
    text-align: center;
  }

  img {
    border: none;
    width: 10rem;
    height: auto;
    border-radius: 1rem;

    @media (min-width: 994px) {
      width: 16rem;
    }
  }

  .name {
    position: absolute;
    bottom: 0;
    padding: 0 1rem 1rem 1rem;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(8, 10, 10, 10));
    opacity: 0;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    h2 {
      position: absolute;
      bottom: 4rem;
      font-weight: 900;
      font-size: 1.5rem;
    }

    p {
      position: absolute;
      bottom: 2rem;
      font-style: italic;
      font-weight: 600;
      font-size: 1rem;
      color: #b2b2b2;
    }
  }
`

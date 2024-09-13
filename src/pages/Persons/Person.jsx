import { APIkey } from '../../config/key'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Cards } from '../../components/Card'

import {
  ContainerPerson,
  Description,
  Info,
  Bio,
  PersonMovies,
  PersonDetail
} from './styles'

export function Person() {
  const [person, setPerson] = useState()
  const { id, type } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${APIkey}&language=en-US&append_to_response=combined_credits`
    )
      .then(response => response.json())
      .then(data => setPerson(data))
  }, [id])

  return (
    <ContainerPerson>
      <Description>
        <img
        lazy
          src={`https://image.tmdb.org/t/p/original${
            person ? person.profile_path : ''
          }`}
          alt="Person"
        />

        <Info>
          <h3>Personal Information</h3>

          <article>
            <h4>Known For</h4>
            <p>{person ? person.known_for_department : ''}</p>
          </article>

          <article>
            <h4>Gender</h4>
            <p>
              {person ? (person.gender === 1 ? 'Female' : 'Male') : ''}
            </p>
          </article>

          {person && person.birthday && (
            <article>
              <h4>Birthday</h4>
              <p>
                {moment(person.birthday).format('MM/DD/YYYY')}{' '}
                {person.deathday == null && (
                  <span>({`${moment().diff(person.birthday, 'years')} years old`})</span>
                )}
              </p>
            </article>
          )}

          {person && person.deathday && (
            <article>
              <h4>Death</h4>
              <p>
                {moment(person.deathday).format('MM/DD/YYYY')}{' '}
                ({`${moment().diff(person.birthday, 'years')} years old`})
              </p>
            </article>
          )}

          {person && person.also_known_as.length > 0 && (
            <article>
              <h4>Also Known As</h4>
              {person.also_known_as.map((name, index) => (
                <p key={index}>{name}</p>
              ))}
            </article>
          )}
        </Info>
      </Description>

      <Bio>
        <h2 className="title">{person ? person.name : ''}</h2>
        <p className="description">{person ? person.biography : ''}</p>

        <PersonDetail>
          <h3>Known For</h3>
          <PersonMovies>
            <div className="cards">
              {person && person.combined_credits.cast.length > 0 &&
                person.combined_credits.cast.map(movie => (
                  <Link
                    key={movie.id}
                    to={`/detail/${movie.media_type}/${movie.id}`}
                  >
                    <Cards movie={movie} />
                  </Link>
                ))}
            </div>
          </PersonMovies>
        </PersonDetail>
      </Bio>
    </ContainerPerson>
  )
}

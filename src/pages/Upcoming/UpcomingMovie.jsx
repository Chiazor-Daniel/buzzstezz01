import axios from 'axios'
import { APIkey } from '../../config/key'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cards } from '../../components/Card'
import { Section, CardContainer } from '../Home/styles'
import { CustomPagination } from '../../components/Pagination'
import { Title } from '../Movies/styles'

export function UpcomingMovie() {
  const [movies, setMovies] = useState([])
  const [numOfPages, setNumOfPages] = useState(0)
  const [page, setPage] = useState(1)

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIkey}&language=en-US&page=${page}`
    )
    setMovies(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchMovies()
  }, [page])

  return (
    <Section>
      <Title style={{ color: '#2501F3' }}>
        <h2>Upcoming Movies</h2>
      </Title>
      
      <CardContainer>
        {movies.length > 0 &&
          movies.map(movie => (
            <Link key={movie.id} to={`/detail/movie/${movie.id}`}>
              <Cards movie={movie} search={true}/>
            </Link>
          ))}
      </CardContainer>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </Section>
  )
}

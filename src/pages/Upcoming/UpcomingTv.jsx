import axios from 'axios'
import { APIkey } from '../../config/key'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cards } from '../../components/Card'
import { Section, CardContainer } from '../Home/styles'
import { CustomPagination } from '../../components/Pagination'
import { Title } from '../Movies/styles'

export function UpcomingTv() {
  const [series, setSeries] = useState([])
  const [numOfPages, setNumOfPages] = useState(0)
  const [page, setPage] = useState(1)

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIkey}&language=en-US&page=${page}`
    )
    setSeries(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchSeries()
  }, [page])

  return (
    <Section>
      <Title style={{ color: '#9C27B0'}}>
        <h2>Upcoming Episodes</h2>
      </Title>
      
      <CardContainer>
        {series.length > 0 &&
          series.map(serie => (
            <Link key={serie.id} to={`/detail/tv/${serie.id}`}>
              <Cards movie={serie} series={true}/>
            </Link>
          ))}
      </CardContainer>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </Section>
  )
}

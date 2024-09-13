import axios from 'axios'
import { useEffect, useState } from 'react'
import { APIkey } from '../../config/key'
import { CustomPagination } from '../../components/Pagination'
import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider
} from '@mui/material'
import { ContainerSearch, ContentSearch } from './styles'
import { FaSearch } from 'react-icons/fa'
import { CardContainer } from '../Home/styles'
import { Link } from 'react-router-dom'
import { Cards } from '../../components/Card'
import { Banner } from '../Movies/styles'
import Poster from '../../assets/persons.jpg'

export function Search() {
  const [type, setType] = useState(0)
  const [content, setContent] = useState([])
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState(0)

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? 'tv' : 'movie'
      }?api_key=${APIkey}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    )
    setContent(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchSearch()
  }, [page, type])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2501f3'
      }
    }
  })

  return (
    <ContainerSearch>
      <Banner>
        <img src={Poster} alt="Poster" lazy />
        <h3>Search</h3>
      </Banner>
      <ThemeProvider theme={theme}>
        <ContentSearch>
          <TextField
            style={{ flex: 1, marginTop: '3rem' }}
            className="search-box"
            label="Search: Movies - Series"
            variant="filled"
            onChange={e => setSearchText(e.target.value)}
          />

          <Button
            variant="contained"
            className="btn-search"
            onClick={fetchSearch}
          >
            <FaSearch />
          </Button>
        </ContentSearch>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue)
            setPage(1)
          }}
          style={{ paddingBottom: 5, marginBottom: '3rem' }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: '50%' }} label="Movies" />
          <Tab style={{ width: '50%' }} label="Series" />
          {/* <Tab style={{ width: '30%' }} label="Search Persons" /> */}
        </Tabs>
      </ThemeProvider>

      <CardContainer>
        {content.length > 0 &&
          content.map(item => (
            <Link key={item.id} to={`/detail/${type ? 'tv' : 'movie'}/${item.id}`}>
              <Cards movie={item} search={true}/>
            </Link>
          ))}
      </CardContainer>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </ContainerSearch>
  )
}

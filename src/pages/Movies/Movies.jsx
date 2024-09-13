import axios from 'axios';
import { useEffect, useState } from 'react';
import { APIkey } from '../../config/key';
import { CustomPagination } from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { Cards } from '../../components/Card';
import {
  createTheme,
  Tab,
  Tabs,
  ThemeProvider
} from '@mui/material';

import { ContainerSearch } from '../Search/styles';
import { CardContainer, Section } from '../Home/styles';
import { Banner, Title } from './styles';
import Poster from '../../assets/poster.webp';

export function Movies() {
  const [type, setType] = useState(0);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2501f3'
      }
    }
  });

  useEffect(() => {
    window.scroll(0, 0);
    const cacheKey = `movies-${type}-${page}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    const cachedTimestamp = sessionStorage.getItem(`${cacheKey}-timestamp`);
    const currentTime = new Date().getTime();

    if (cachedData && cachedTimestamp) {
      if (currentTime - parseInt(cachedTimestamp) < 3600000) { // 1 hour = 3600000 ms
        setContent(JSON.parse(cachedData));
        setNumOfPages(JSON.parse(sessionStorage.getItem(`${cacheKey}-numOfPages`)));
      } else {
        fetchMovies();
      }
    } else {
      fetchMovies();
    }
  }, [page, type]);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${type ? 'top_rated' : 'popular'}?api_key=${APIkey}&language=en-US&page=${page}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    const cacheKey = `movies-${type}-${page}`;
    sessionStorage.setItem(cacheKey, JSON.stringify(data.results));
    sessionStorage.setItem(`${cacheKey}-numOfPages`, JSON.stringify(data.total_pages));
    sessionStorage.setItem(`${cacheKey}-timestamp`, new Date().getTime());
  };

  return (
    <Section>
      <Banner>
        <img lazy src={Poster} alt="Poster" />
        <h3>Movies</h3>
      </Banner>
      <ContainerSearch>
        <ThemeProvider theme={theme}>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="inherit"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5, marginBottom: '3rem', width: '20rem' }}
            aria-label="tabs example"
          >
            <Tab style={{ width: '50%' }} label="Popular" />
            <Tab style={{ width: '50%' }} label="Top-Rated" />
          </Tabs>
        </ThemeProvider>

        <Title style={{ color: '#2501F3'}}>
          <h2>
            {type ? 'Top-Rated Movies' : 'Popular Movies'}
          </h2>
        </Title>

        <CardContainer>
          {content.length > 0 &&
            content.map(movie => (
              <Link to={`/detail/movie/${movie.id}`} key={movie.id}>
                <Cards movie={movie} search={true}/>
              </Link>
            ))}
        </CardContainer>

        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </ContainerSearch>
    </Section>
  );
}

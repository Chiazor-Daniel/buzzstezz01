import { APIkey } from "../../config/key";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Slider } from "../../components/Slider";
import { Cards } from "../../components/Card";
import { Section, Title, CardContainer } from "./styles";
import { CustomPagination } from "../../components/Pagination";

export function Home() {
  const [page, setPage] = useState(1);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [sliderLoaded, setSliderLoaded] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    const cachedData = sessionStorage.getItem('trendingMovies');
    const cachedPage = sessionStorage.getItem('page');
    const cachedTimestamp = sessionStorage.getItem('timestamp');
    const currentTime = new Date().getTime();

    if (cachedData && cachedPage && cachedTimestamp && parseInt(cachedPage) === page) {
      if (currentTime - parseInt(cachedTimestamp) < 3600000) { // 1 hour = 3600000 ms
        setTrendingMovies(JSON.parse(cachedData));
      } else {
        getFetch();
      }
    } else {
      getFetch();
    }

    AOS.init({ duration: 1000 });
  }, [page]);

  const getFetch = () => {
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIkey}&language=en-US&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setTrendingMovies(data.results);
        sessionStorage.setItem('trendingMovies', JSON.stringify(data.results));
        sessionStorage.setItem('page', page);
        sessionStorage.setItem('timestamp', new Date().getTime());
      });
  };

  const handleSliderLoad = () => {
    setSliderLoaded(true);
  };

  return (
    <>
     
      <Slider onLoad={handleSliderLoad} />
      {sliderLoaded && (
        <Section>
          <Title data-aos="fade-up">
            <span>Movies and Series</span> trending this week
          </Title>
          <CardContainer>
            {trendingMovies.length > 0 &&
              trendingMovies.map((movie, index) => (
                <div key={movie.id}>
                  <Cards movie={movie} index={index} />
                </div>
              ))}
          </CardContainer>

          <CustomPagination setPage={setPage} />
        </Section>
      )}
    </>
  );
}

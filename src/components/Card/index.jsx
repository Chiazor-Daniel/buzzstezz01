import { useEffect, useState } from "react";
import { Card, CardContent, Loading, ButtonFav, Main } from "./styles";
import { useFavorites } from "../../hooks/FavoriteContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import moment from "moment";
import "moment/locale/en-gb";
moment.locale("en-gb");

export function Cards({ movie, series, search }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [imgLoaded, setImgLoaded] = useState(false); // Track if image is loaded

  useEffect(() => {
    setFavorite(isFavorite(movie));
  }, [movie, isFavorite]);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(movie);
      setFavorite(false);
    } else {
      addFavorite(movie);
      setFavorite(true);
    }
  };

  function type(movie) {
    if (movie.media_type === "movie") {
      return "Movie";
    } else if (movie.media_type === "tv") {
      return "TV Series";
    }
    return "";
  }

  function formatDate(movie) {
    if (movie.release_date) {
      return moment(movie.release_date).format("YYYY");
    } else if (movie.first_air_date) {
      return moment(movie.first_air_date).format("YYYY");
    }
    return "";
  }

  // Manage loading state
  const handleImageLoad = () => {
    setIsLoading(false);
    setImgLoaded(true);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImgLoaded(false);
  };

  useEffect(() => {
    (movie || series) ? setIsLoading(false) : setIsLoading(true);
  }, [movie, series]);

  return (
    <Main>
      {isLoading ? (
        <Card style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}>
          <Loading />
        </Card>
      ) : (
        <>
          {!search && (
            <Link
              key={movie.id}
              to={!series ? `/detail/${movie.media_type}/${movie.id}` : `/detail/tv/${movie.id}`}
            >
              <Card style={{ marginLeft: '1rem', padding: '0px', border: 'none' }}>
                {!imgLoaded && <Loading />} {/* Show loading spinner while image is not loaded */}
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.name || movie.title}
                  style={{ width: '100%', display: imgLoaded ? 'block' : 'none' }}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                {imgLoaded && (
                  <>
                    <span style={{position: 'absolute', top: 10, right: 10, color: 'yellow', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: "7px", background: '#C7253E', padding: '4px', borderRadius: '10px' }}>
                      <FaStar />
                      <span>
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </span>
                    <span style={{position: 'absolute', bottom: 10, left: 10, color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: "7px", background: '#C7253E', padding: '5px', borderRadius: '10px' }}>
                      <span>
                        {movie.media_type ? type(movie) : formatDate(movie)}
                      </span>
                    </span>
                  </>
                )}
                {imgLoaded && (
                  <CardContent>
                    <div style={{ padding: '10px' }}>
                      <h2>{movie.title || movie.name}</h2>
                    </div>
                    <p>{movie.overview.slice(0, 100) + '...'}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          )}
          {search && (
            <Card style={{ marginLeft: '1rem', padding: '0px', border: 'none' }}>
              {!imgLoaded && <Loading />} {/* Show loading spinner while image is not loaded */}
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.name || movie.title}
                lazy
                style={{ width: '100%', display: imgLoaded ? 'block' : 'none' }}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              {imgLoaded && (
                <CardContent>
                  <div style={{ padding: '10px' }}>
                    <h2>{movie.title || movie.name}</h2>
                  </div>
                  <article>
                    {movie.media_type ? type(movie) : formatDate(movie)}
                    <span>
                      <FaStar />
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </article>
                  <p>{movie.overview.slice(0, 100) + '...'}</p>
                </CardContent>
              )}
            </Card>
          )}
        </>
      )}
      <ButtonFav onClick={handleFavorite}>
        {favorite ? "Remove from favorites" : "Add to Watchlist"}
      </ButtonFav>
    </Main>
  );
}

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent } from '../../components/Card/styles';
import Modal from 'react-modal';
import axios from 'axios';
import { APIkey } from '../../config/key';

const SeasonMapContainer = styled.div`
  margin: 2rem 0;
  padding: 0 2rem;
`;

const SeasonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 1fr));
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets */
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column for mobile */
  }
`;

const SeasonCard = styled(Card)`
  margin-left: 1rem;
  position: relative;
  padding: 0px;
  border: none;
  cursor: pointer;
`;

const SeasonPoster = styled.img`
  width: 100%;
  height: auto;
`;

const EpisodeButton = styled.button`
  margin: 0.5rem;
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
`;

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(5px)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    padding: '0',
    border: 'none',
    background: 'none',
    position: 'relative'
  },
};

Modal.setAppElement('#root');

export const SeasonMap = ({ seasons, showId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState('');

  // Fetch episodes when the modal is opened for a season
  useEffect(() => {
    if (selectedSeason) {
      const fetchEpisodes = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${showId}/season/${selectedSeason.season_number}?api_key=${APIkey}`
          );
          setEpisodes(response.data.episodes);
        } catch (error) {
          console.error("Error fetching episodes:", error);
        }
      };

      fetchEpisodes();
    }
  }, [selectedSeason, showId]);

  const openModal = (season) => {
    setSelectedSeason(season);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSeason('');
    setSelectedEpisode('');
    setEpisodes([]); // Clear the episodes when the modal is closed
  };

  const handleEpisodeClick = (episodeNumber) => {
    setSelectedEpisode(episodeNumber);
  };

  return (
    <SeasonMapContainer>
      <SeasonGrid>
        {seasons.map((season) => (
          <SeasonCard key={season.id} onClick={() => openModal(season)}>
            <SeasonPoster
              src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
              alt={season.name}
              loading="lazy"
            />
            <CardContent>
              <div style={{ padding: '10px' }}></div>
              <h2>{season.name}</h2>
            </CardContent>
          </SeasonCard>
        ))}
      </SeasonGrid>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Season Details"
      >
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 999,
          }}
        >
          <img src="/cross.png" style={{ width: '30px' }} />
        </button>

        {selectedSeason && !selectedEpisode && (
          <div>
            <h2>{selectedSeason.name}</h2>
            <div style={{
              display: 'grid',
              gap: '10px',
              gridTemplateColumns: '1fr 1fr', // Two columns of equal size
              padding: '20px' // Optional padding for spacing
            }}>
              {/* Display episodes as buttons */}
              {episodes.map((episode) => (
                <EpisodeButton
                  key={episode.episode_number}
                  onClick={() => handleEpisodeClick(episode.episode_number)}
                  style={{ padding: '10px' }} // Optional styling
                >
                  <p>{episode.episode_number}</p>
                  <p>{episode.name || `Episode ${episode.episode_number}`}</p>
                </EpisodeButton>
              ))}
            </div>
          </div>
        )}

        {/* Show the episode iframe when an episode is selected */}
        {selectedEpisode && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
            <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 999,
          }}
        >
          <img src="/cross.png" style={{ width: '30px' }} />
        </button>
            <iframe
              src={`https://vidsrc.rip/embed/tv/${showId}/${selectedSeason.season_number}/${selectedEpisode}`}
              width="100%"
              height="100%"
              style={{
                border: 'none',
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 9999,
              }}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </Modal>
    </SeasonMapContainer>
  );
};

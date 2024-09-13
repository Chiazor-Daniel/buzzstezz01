import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import moment from "moment";
import { animateScroll as scroll, scroller } from "react-scroll";
import { BsPeopleFill, BsFillStarFill } from "react-icons/bs";
import styled from 'styled-components';

import { ContainerDescription, ContentDescription, ContentDetail, ContainerVideo, Video, CastContent } from "./styles";
import { Cast } from "../../components/Cast";
import { Recommendations } from "../../components/Recommendations";
import { APIkey } from "../../config/key";
import { SeasonMap } from "./season";

moment.locale("en");

Modal.setAppElement('#root'); // Bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

const ActionButton = styled.button`
  background-color: #2501f3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  margin: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1a00d1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`;

export function Detail() {
  const [detail, setDetail] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const { id, type } = useParams();

  function formatDate(detail) {
    let date = "";
    if (detail.release_date !== undefined) {
      date = moment(detail.release_date).format("MM/DD/YYYY");
    } else if (detail.first_air_date !== undefined) {
      date = moment(detail.first_air_date).format("MM/DD/YYYY");
    }
    return date;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    console.log(detail)
  }, [type, id]);

  const getData = () => {
    console.log(type)
    fetch(`https://api.themoviedb.org/3/${type ? type : "Error"}/${id}?api_key=${APIkey}&language=en-US&append_to_response=videos`)
      .then((res) => res.json())
      .then((data) => setDetail(data));
  };

  const scrollToTrailer = () => {
    scroller.scrollTo('trailer', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <ContainerDescription>
        <div className="banner">
          <img loading="lazy" src={`https://image.tmdb.org/t/p/original${detail ? detail.backdrop_path : ""}`} alt="Backdrop" />
        </div>
        <ContentDetail>
          <div className="poster">
            <img loading="lazy" src={`https://image.tmdb.org/t/p/original${detail ? detail.poster_path : ""}`} alt="Poster" />
          </div>

          <ContentDescription>
            <div>
              <h2>{detail ? detail.title : ""}</h2>
              <h2>{detail ? detail.name : ""}</h2>

              <div className="tagline">
                <b>{detail ? detail.tagline : ""}</b>
              </div>
              <article>
                <span>
                  <BsFillStarFill /> {detail ? detail.vote_average : ""}
                </span>
                <span>
                  <BsPeopleFill /> {detail ? detail.vote_count : ""}
                </span>
              </article>

              <div className="status">
                {/* ... (status content remains unchanged) ... */}
              </div>

              <div className="genres">
                {detail && detail.genres
                  ? detail.genres.map((genre) => (
                      <span key={genre.id}>{genre.name}</span>
                    ))
                  : ""}
              </div>

              <div className="action-buttons">
                <ActionButton onClick={scrollToTrailer}>Watch Trailer</ActionButton>
                {
                  type !== 'tv' && (
                    <ActionButton onClick={openModal}>Watch Movie</ActionButton>
                  ) 
                }
              </div>
            </div>

            <div className="description">
              <h3>Synopsis</h3>
              <p>{detail ? detail.overview : ""}</p>
            </div>
          </ContentDescription>
        </ContentDetail>
        {detail?.seasons && <SeasonMap seasons={detail.seasons} showId={id}/>}
        <CastContent>
          <h3 style={{ textAlign: 'center' }}>Main Casts</h3>
          <div className="cast" style={{ display: 'flex', paddingLeft: '100px', width: '100%' }}>
            <Cast id={id} type={type} />
          </div>
        </CastContent>
      </ContainerDescription>

      <ContainerVideo>
        <div className="imageVideo">
          <img loading="lazy" src={`https://image.tmdb.org/t/p/original${detail ? detail.backdrop_path : ""}`} alt="Video Backdrop" />
        </div>

        <Video id="trailer">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${detail?.videos.results[0]?.key}`}
            width="100%"
            height="100%"
            pip
            config={{ file: { forceHLS: true } }}
          />
        </Video>
      </ContainerVideo>

      <div>
        <Recommendations id={id} type={type} />
      </div>

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  shouldCloseOnOverlayClick={false} // Prevent closing on outside click
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 2000, // Ensure modal overlay is above other content
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      border: 'none',
      padding: '0',
      bottom: 'auto',
      marginRight: '-50%',
      overflow: 'hidden',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '60%',
      zIndex: 2000, // Ensure modal content is above other content
      position: 'relative', // Ensure modal content is positioned relative
    }
  }}
  contentLabel="Watch Movie"
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
        zIndex: 999 // Ensure button is above iframe
      }}
    >
      <img src="/cross.png"  style={{width: '30px'}}/>
    </button>
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
   
    <iframe
      src={`https://vidsrc.rip/embed/movie/${id}`}
      width="100%"
      height="100%"
      style={{
        border: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: 'black'
      }}
      allowFullScreen
    />
  </div>
</Modal>


      <style>
        {`
          @media (max-width: 768px) {
            .ReactModal__Content {
              width: 90% !important;
              height: 300px !important;
            }
          }
        `}
      </style>
    </>
  );
}

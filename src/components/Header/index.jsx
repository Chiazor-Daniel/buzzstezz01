import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo, Nav, NavMenu, MobileIcon, NavContent } from './styles';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import PeopleIcon from '@mui/icons-material/People';
import UpdateIcon from '@mui/icons-material/Update';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { Button, ButtonWrapper } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

export function Header() {
  const [click, setClick] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alertClosed = sessionStorage.getItem('alertClosed');
    if (alertClosed) {
      setShowAlert(false);
    }
  }, []);

  const handleOpen = () => {
    setClick(!click);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    sessionStorage.setItem('alertClosed', 'true');
  };

  const navLinks = [
    { to: "/", icon: HomeIcon, label: "Home" },
    { to: "/movies", icon: MovieIcon, label: "Movies" },
    { to: "/series", icon: TvIcon, label: "TV Series" },
    { to: "/persons", icon: PeopleIcon, label: "People" },
    { to: "/upcoming", icon: UpdateIcon, label: "Upcoming" },
    { to: "/favorites", icon: FavoriteIcon, label: "Favorites" },
    { to: "/anime", icon: TheaterComedyIcon, label: "Anime" }, 
    { to: "/search", icon: SearchIcon, label: "Search" },
  ];
  

  return (
    <>
      <Nav>
        {showAlert && (
          <InfoAlert>
            TV series streaming isn't available for now
            <CloseIconWrapper onClick={handleCloseAlert}>
              <CloseIcon fontSize="small" />
            </CloseIconWrapper>
          </InfoAlert>
        )}
        <NavContent>
          <Logo>
            <img src={'glass.png'} alt="Logo" loading="lazy"/>
            <h2>
              Buzz<span>Stezz</span>
            </h2>
          </Logo>

          <MobileIcon onClick={handleOpen}>
            {click ? <CloseIcon /> : <MenuIcon />}
          </MobileIcon>

          <NavMenu onClick={handleOpen} click={click}>
            <NavList>
              {navLinks.map((link, index) => (
                <NavItem key={index}>
                  <NavLink to={link.to}>
                    <link.icon fontSize="small" />
                    <NavLinkText>{link.label}</NavLinkText>
                  </NavLink>
                </NavItem>
              ))}
               {/* <ButtonWrapper>
                <Button to="/login">Get An Acccount</Button>
              </ButtonWrapper> */}
            </NavList>
          </NavMenu>
        </NavContent>
      </Nav>
    </>
  );
}

const InfoAlert = styled.div`
  background-color: #ffa500;
  color: white;
  text-align: center;
  width: 100%;
  padding: 10px;
  font-weight: bold;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CloseIconWrapper = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const NavItem = styled.li`
  margin: 10px 0;

  @media (min-width: 768px) {
    margin: 0 15px;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #ffa500;
  }
`;

const NavLinkText = styled.span`
  margin-left: 8px;
`;
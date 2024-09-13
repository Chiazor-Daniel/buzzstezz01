import React from 'react'
import { FooterContainer } from './styles'
import { FaGithub, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

export function Footer() {
  return (
    <footer style={{fontSize: '0.9rem'}}>
      <FooterContainer>
        <div className="copyright" style={{display: 'flex'}}>
          <p>
            &copy; 2024 {' '}
            <a href="" target="_blank" rel="noopener noreferrer">
              BuzzStezz
            </a>
          </p>
        </div>
        <div className="contact-info">
         
        
        </div>
        <div className="social-links" style={{display: 'flex', gap: '20px', }}>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://wa.me/2347081540990" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp /> +2347081540990
          </a>
          <a href="mailto:chiazordaniel317@gmail.com">
            <FaEnvelope /> chiazordaniel317@gmail.com
          </a>
        </div>
      </FooterContainer>
    </footer>
  )
}
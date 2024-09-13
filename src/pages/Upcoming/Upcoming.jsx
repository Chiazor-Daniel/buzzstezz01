import { useState } from 'react'
import { createTheme, Tab, Tabs, ThemeProvider } from '@mui/material'
import { UpcomingTv } from './UpcomingTv'
import { UpcomingMovie } from './UpcomingMovie'

import { ContainerSearch } from '../Search/styles'
import { Section } from '../Home/styles'
import { Banner } from '../Movies/styles'
import Poster from '../../assets/poster.webp'

export function Upcoming() {
  const [content, setContent] = useState(0)
  const [page, setPage] = useState(1)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2501f3'
      }
    }
  })

  return (
    <Section>
      <Banner>
        <img src={Poster} alt="Poster" lazy/>
        <h3>Upcoming</h3>
      </Banner>
      <ContainerSearch>
        <ThemeProvider theme={theme}>
          <Tabs
            value={content}
            indicatorColor="primary"
            textColor="secondary"
            onChange={(event, newValue) => {
              setContent(newValue)
              setPage(1)
            }}
            style={{ paddingBottom: 5, marginBottom: '3rem', width: '20rem' }}
            aria-label="tabs example"
          >
            <Tab style={{ width: '50%' }} label="Series" />
            <Tab style={{ width: '50%' }} label="Movies" />
          </Tabs>
        </ThemeProvider>

        {content === 0 ? <UpcomingTv /> : <UpcomingMovie />}
      </ContainerSearch>
    </Section>
  )
}

import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div className='Banner'>
      <Container className='bannerContent'  
     >
      <div className='tagline'>
      <Typography
        variant='h2'
        sx={{
          fontWeight: "bold",
          marginBottom:"15px",
          fontFamily: "Monstserrat",
        }}
        >
        Crypto Tracker
      </Typography>
      <Typography
      variant='subtitle2'
      sx={{
        color: "darkgray",
        textTransform: "capitalize",
        fontFamily: "Montserrat",
      }}>
        Get the latest news and updates of the crypto market.
      </Typography>
      </div>
      <Carousel/>
      </Container>
    </div>
  )
}

export default Banner;
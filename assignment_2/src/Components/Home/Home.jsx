import React from 'react'
import { Helmet } from 'react-helmet'
import CategorySlider from '../CategorySlider'
import FeaturedProducts from '../FeaturedProducts'
import MainSlider from '../MainSlider'

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
      </Helmet>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <FeaturedProducts/>
    </>
  )
}

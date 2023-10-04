import React from 'react'
import styled from 'styled-components'
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
export const Images = (props) => {
  return (
   <Img src={props.url} alt='image not available'/>
  )
}

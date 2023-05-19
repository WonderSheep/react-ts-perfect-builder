import React from 'react'

function Test() {
  enum Color {
    Red,
    Green = 'Green',
    Blue = 'Blue'
  }
  const c: Color = Color.Red

  return <div>{c}</div>
}

export default Test

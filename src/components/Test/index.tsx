import React from 'react'

function Test() {
  enum Color {
    Red,
    Green,
    Blue
  }
  const c: Color = Color.Green

  return <div>{c}</div>
}

export default Test

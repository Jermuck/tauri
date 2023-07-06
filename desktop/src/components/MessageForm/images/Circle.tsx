import { Component, JSX } from "solid-js"

export const Circle: Component<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <svg onClick={onClick} style={{ position: 'absolute', left: '97%', cursor: 'pointer' }} width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <circle cx="1.5" cy="2" r="1.5" fill="#E2E2E4" />
      <circle cx="1.5" cy="8" r="1.5" fill="#E2E2E4" />
      <circle cx="1.5" cy="14" r="1.5" fill="#E2E2E4" />
    </svg >

  )
}

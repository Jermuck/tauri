import { Component, createEffect, JSX } from "solid-js"

export const App: Component<any> = (props) => {
  createEffect(() => { console.log('Update token') })
  return <div>{props}</div>
}

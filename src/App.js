import {useEffect, useState} from "react";
import { Bar } from 'react-chartjs-2';

import data2 from "./data.json";
import './App.css'

function Blocks(props) {
  return (
    <div className="Blocks" style={props.style}> 
      {props.children}
    </div>
  )
}

function Section() {
  const[gridSpan, setGridSpan] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setGridSpan(window.innerWidth)

    window.addEventListener("resize", handleResize)
  })

  return(
    <section>
      <Blocks style={{
        gridColumn: gridSpan > 600 ? "auto / span 2" : "auto / span 1",
        gridRow: gridSpan > 600 ? "auto / span 1" : "auto / span 2"
      }}>
        <text className="Blocks-Header">{data2.a[0].header}</text>
        <text className="Blocks-BodyText">{data2.a[0].bodyText}</text>
      </Blocks>
      <Blocks style={{gridColumn: "auto / span 1"}}>
        <text className="Blocks-Header">{data2.a[1].header}</text>
        <text className="Blocks-BodyText">{data2.a[1].bodyText}</text>
      </Blocks>
      <Blocks style={{gridColumn: "auto / span 1"}}>
        <Bar 
          data={data2.b[0].data} 
          options={{devicePixelRatio: window.devicePixelRatio * 2, ...data2.b[0].options}} 
          width="100%" 
          height="100%" 
        />
      </Blocks>
    </section>
  )
}

function Banner() {
  return(
    <div className="Banner">
      <text className="Banner-Header">Alles</text>
      <text className="Banner-Subheader">
        O estado proto-fenomenal move as sensações da realidade percebida.
      </text>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Banner/>
      <Section/>
    </div>
  )
}

export default App

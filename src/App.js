import {Fragment, useEffect, useState} from "react";
import { Bar } from 'react-chartjs-2';

import data from "./data.json";
import './App.css'

function Blocks(props) {
  return (
    <div 
      className="Blocks" 
      onClick={() => {
        props.setActive()
        props.setBlock({block: props.children, style: props.style})
        props.setScroll(window.scrollY)
      }} 
      style={props.style}
    > 
      {props.children}
    </div>
  )
}

function Section(props) {
  const[gridSpan, setGridSpan] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setGridSpan(window.innerWidth)

    window.addEventListener("resize", handleResize)
  })

  return(
    <section>
      {
        data.a.map((data, key) => (
          <Blocks 
            key={`a_${key}`}
            active={props.active}

            setActive={props.setActive}
            setBlock={props.setBlock}
            setScroll={props.setScroll}
            
            style={{
              gridColumn:  
                gridSpan > 600 ? 
                `auto / span ${data.blockType.x}` : 
                "auto / span 1",
              gridRow: 
                gridSpan > 600 ? 
                `auto / span ${data.blockType.y}` : 
                `auto / span ${data.blockType.x + data.blockType.y - 1}`
            }}
          >
            <p className="Blocks-Header">{data.header}</p>
            {
              data.isItList ?
              data.bodyText.map((text, key) => (
                <p key={key} className="Blocks-ListText">{text}</p>
              )) :
              <p className="Blocks-BodyText">{data.bodyText}</p>
            }
          </Blocks>
        ))
      }
      {
        data.b.map((data, key) => (
          <Blocks 
          key={`b_${key}`}
            active={props.active}
            
            setActive={props.setActive}
            setBlock={props.setBlock}
            setScroll={props.setScroll}
            
            style={{
              gridColumn:  
                gridSpan > 600 ? 
                `auto / span ${data.blockType.x}` : 
                "auto / span 1",
              gridRow: 
                gridSpan > 600 ? 
                `auto / span ${data.blockType.y}` : 
                `auto / span ${data.blockType.x + data.blockType.y - 1}`
            }}
          >
            <Bar 
              data={data.data} 
              options={{devicePixelRatio: window.devicePixelRatio * 2, ...data.options}} 
              width="100%" 
              height="100%" 
            />
          </Blocks>
        ))
      }
    </section>
  )
}

function Banner() {
  return(
    <div className="Banner">
      <p className="Banner-Header">Alles</p>
      <p className="Banner-Subheader">
        O estado proto-fenomenal move as sensações da realidade percebida.
      </p>
    </div>
  )
}

function App() {
  const[active, setActive] = useState(false)
  const[block, setBlock] = useState(null)
  const[scroll, setScroll] = useState(null)

  useEffect(() => {
    if(!active){
      window.scrollTo({top: scroll})
    }
  },[active, scroll])

  return (
    <div className="App">
      {
        !active ?
        <Fragment>
          <Banner/>
          <Section
            active={active}

            setActive={() => setActive(!active)}
            setBlock={block => setBlock(block)}
            setScroll={scroll => setScroll(scroll)}
          />
        </Fragment> :
        <div 
          className="Blocks-active"  
          style={block.style}
        > 
          {block.block}
          <div
            className="Button"
            onClick={() => setActive(!active)}
          >
            <svg
              className="Button-Icon"
              viewBox="0 0 300 300"
            >
              <path 
                d="M71.9 1438l46.8-47c6.5-6.4 17.1-6.4 23.6 0 0 0 0 0 0 0 
                6.5 6.6 6.5 17.1 0 23.6l-18.6 18.6h93a16.7 16.7 0 0116.6 
                16.7h0a16.7 16.7 0 01-16.6 16.6h-93l18.6 18.7c6.5 6.5 6.5 
                17 0 23.5 0 0 0 0 0 0-6.5 6.6-17 6.6-23.6 0l-47-47a16.6 
                16.6 0 01-1.2-22.2h0l1.4-1.5z"
                transform="matrix(1 0 0 1 0 -1375)"
              />
            </svg>
          </div>
        </div>
      }
    </div>
  )
}

export default App

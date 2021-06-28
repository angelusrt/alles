import {Fragment, useEffect, useState} from "react";
import { Bar } from 'react-chartjs-2';

import data from "./data.json";
import './App.css'

function Blocks(props) {
  return (
    <div 
      className="blocks blocks-inactive" 
      onClick={() => {
        props.setActive()
        props.setBlock({block: props.children, style: props.style, isItGraph: props.isItGraph})
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
        data.a
        .filter(data => props.tag !== "" ? data.tag === props.tag : data.tag)
        .map((data, key) => (
          <Blocks 
            key={`a_${key}`}
            active={props.active}
            isItGraph={false}

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
            <p className="blocks--content--header">{data.header}</p>
            {
              data.isItList ?
              data.bodyText.map((text, key) => (
                <p key={key} className="blocks--content--listtext">{text}</p>
              )) :
              <p className="blocks--content--bodytext">{data.bodyText}</p>
            }
          </Blocks>
        ))
      }
      {
        data.b
        .filter(data => props.tag !== "" ? data.tag === props.tag : data.tag)
        .map((data, key) => (
          <Blocks 
            key={`b_${key}`}
            active={props.active}
            isItGraph={true}
            
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
              className="blocks--content--graph"
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

function Banner(props) {
  return(
    <div className="banner">
      <p className="banner--header">Alles</p>
      <p className="banner--subheader">
        O estado proto-fenomenal move as sensações da realidade percebida.
      </p>
      <div className="banner--buttons">
        <div
          className={props.tag === "Mat" ? "button button-active" : "button button-inactive"}
          onClick={() => props.setTag(props.tag !== "Mat" ? "Mat" : "")}
        >
          <p className="button--text">Matemática</p>
        </div>
        <div
          className={props.tag === "Lit" ? "button button-active" : "button button-inactive"}
          onClick={() => props.setTag(props.tag !== "Lit" ? "Lit" : "")}
        >
          <p className="button--text">Literatura</p>
        </div>
        <div
          className={props.tag === "Filo" ? "button button-active" : "button button-inactive"}
          onClick={() => props.setTag(props.tag !== "Filo" ? "Filo" : "")}
        >
          <p className="button--text">Filosofia</p>
        </div>
        <div
          className={props.tag === "Socio" ? "button button-active" : "button button-inactive"}
          onClick={() => props.setTag(props.tag !== "Socio" ? "Socio" : "")}
        >
          <p className="button--text">Sociologia</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const[active, setActive] = useState(false)
  const[block, setBlock] = useState(null)
  const[scroll, setScroll] = useState(null)
  const[tag, setTag] = useState("")

  useEffect(() => {
    if(!active){
      window.scrollTo({top: scroll})
    }
  },[active, scroll])

  //console.log(tag)
  return (
    <div className="App">
      {
        !active ?
        <Fragment>
          <Banner
            tag={tag}

            setTag={tag => setTag(tag)}
          />

          <Section
            active={active}
            tag={tag}

            setActive={() => setActive(!active)}
            setBlock={block => setBlock(block)}
            setScroll={scroll => setScroll(scroll)}
          />
        </Fragment> :
        <div 
          className="page"
          style={block.style}
        > 
          <div className="blocks blocks-active">
            <div className={
              block.isItGraph ? 
              "blocks--content blocks--content-graph" : 
              "blocks--content"
            }>
              {block.block}
            </div>
          </div>

          <div
            className="button"
            onClick={() => setActive(!active)}
          >
            <svg
              className="button--icon"
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

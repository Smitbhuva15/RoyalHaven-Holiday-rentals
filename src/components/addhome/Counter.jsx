"use client"
import React, { useEffect, useState } from 'react'
import AnimatedNumbers from "react-animated-numbers";
export default function Counter() {

  const [run,setRun]=useState(false);
  const [num,setNum]=useState(15742)
  const genraterandom=()=>{
    const minimum=5000
    const maximum=25000
    setNum(Math.floor(Math.random()*maximum+minimum))
   
  }
  useEffect(()=>{
    setRun(true)
    genraterandom();
  },[])

 return(
    run && (<div>
         <AnimatedNumbers
          includeComma
          animateToNumber={num}
          fontStyle={{ fontSize: 40, fontWeight: "bold" }}
          locale="en-US"
          configs={[
            { key: 1, mass: 1, tension: 220, friction: 100 },
            { key: 2, mass: 1, tension: 180, friction: 130 },
            { key: 3, mass: 1, tension: 280, friction: 90 },
            { key: 4, mass: 1, tension: 180, friction: 135 },
            { key: 5, mass: 1, tension: 260, friction: 100 },
            { key: 6, mass: 1, tension: 210, friction: 180 },
          ]}
        ></AnimatedNumbers>
    </div>
 )
 )
}

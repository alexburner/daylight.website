import React from 'react'

const Links = (): JSX.Element => (
  <div
    style={{
      fontSize: '10px',
      margin: '532px auto 72px',
      textAlign: 'center',
    }}
  >
    <div>
      <a
        href="https://github.com/mourner/suncalc"
        title="SunCalc – A tiny JavaScript library for calculating sun/moon positions and phases"
        target="_blank"
        rel="noreferrer"
      >
        SunCalc
      </a>
      &nbsp; &nbsp; &#9682; &nbsp; &nbsp;
      <a
        href="https://en.wikipedia.org/wiki/Twilight"
        title="Twilight – Wikipedia, the free encyclopedia"
        target="_blank"
        rel="noreferrer"
      >
        Twilight
      </a>
    </div>
    <div style={{ marginTop: '9px' }}>
      <a
        href="https://github.com/alexburner/daylight.website"
        title="Daylight – GitHub"
        target="_blank"
        rel="noreferrer"
      >
        Source Code
      </a>
    </div>
  </div>
)

export default Links

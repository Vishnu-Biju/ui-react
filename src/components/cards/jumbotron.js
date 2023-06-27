/* import React from "react";
import Typewriter from 'typewriter-effect';

const Jumbotron = ({ text }) => (

  <Typewriter options={{
    strings: text,
    autoStart: true,
    loop: true,
  }}
  />
);

export default Jumbotron; */

import React from "react";
import Typewriter from "typewriter-effect";

const Jumbotron = ({ text }) => (
  <div className="jumbotron">
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  </div>
);

export default Jumbotron;

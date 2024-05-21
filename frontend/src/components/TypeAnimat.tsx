import React from 'react'
import { TypeAnimation } from 'react-type-animation';

function TypeAnimat() {
  return (
    <div>
  <TypeAnimation
    preRenderFirstString={true}
    sequence={[
      500,
      '',
      'Chat with your own AI 🤖 ', // initially rendered starting point
      2000,
      'Built with OpenAI',
      2000,
      'Your own customized ChatGPT 🔧 ',
      500
    ]}
    speed={30}
    style={{ fontSize: '60px', color: "white"}}
    repeat={Infinity}
  />
</div>
  )
}

export default TypeAnimat;

import React from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

class Section extends React.Component {
  render() {
    const { sections } = this.props;

    return (
      <div style={{ height: '100vh' }}>
        <Canvas>
          <mesh visible userData={{ test: 'hello' }} position={[1, 1, 1]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[1, 16, 16]} />
            <meshStandardMaterial attach="material" color="hotpink" transparent />
          </mesh>
        </Canvas>
      </div>
    );
  }
}

Section.defaultProps = {
  sections: [
    {
      title: 'Heineken F1 AR',
      image: "http://giglifeasia.com/wp-content/uploads/2019/08/heineken-pre-race-party-2019.jpg"
    },
    {
      title: "Adidas Streetball AR",
      image: "https://ssl.ulximg.com/public/userfiles/2019/08/Sneakers%20-%20Don't%20Delete/eUXl1j3g.jpeg"
    },
    {
      title: "VNC Gala",
      image: "http://www.briteliteimmersive.com/wp-content/uploads/VNC_Creative6WEB.jpg"
    }
  ]
}

export default Section;
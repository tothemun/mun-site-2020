import React from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import ImagePlane from './imagePlane';

class Section extends React.Component {
  render() {
    const { sections } = this.props;
    const height = window.innerHeight;
    const width = window.innerWidth;

    const aspect = width / height;

    return (
      <div style={{ height: '100vh' }}>
        <Canvas
          camera={{
            aspect,
            fov: 70,
            near: 0.001,
            far: 1000,
            position: [0, 0, 2]
          }}
        >
          <ImagePlane
            aspect={aspect}
            images={[sections[0].image, sections[1].image, sections[2].image]}
            height={height}
            width={width}
          />
        </Canvas>
      </div>
    );
  }
}

Section.defaultProps = {
  sections: [
    {
      title: 'Heineken F1 AR',
      image: "https://images.unsplash.com/photo-1562887085-d0aa7ff20b95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80"
    },
    {
      title: "Adidas Streetball AR",
      image: "https://images.unsplash.com/photo-1452933006409-19b87dc327b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
    },
    {
      title: "VNC Gala",
      image: "https://images.unsplash.com/photo-1521794414102-37606728dd9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
    }
  ]
}

export default Section;
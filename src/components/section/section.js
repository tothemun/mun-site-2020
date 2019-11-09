import React from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { Headline1, Headline3 } from '~components/typography';
import Button from '~components/button';
import ImagePlane from './imagePlane';
import styles from './section.module.scss';

class Section extends React.Component {
  state = { currentImage: 0 };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll = (e) => {
    const { currentImage } = this.state;
    const { sections } = this.props;

    const height = window.innerHeight;

    if (window.scrollY > height / 2) {
      if (this.state.currentImage < sections.length - 1) {
        this.setState({ currentImage: currentImage + 1 });
      } else {
        this.setState({ currentImage: 0 });
      }
    }
  }

  render() {
    const { cameraPosition, sections } = this.props;
    const { currentImage } = this.state;

    const height = window.innerHeight;
    const width = window.innerWidth;

    const aspect = width / height;

    const dist  = cameraPosition.z;
    const sectionHeight = 1;
    const fov = 2 * (180 / Math.PI) * Math.atan(sectionHeight / (2 * dist));
//sections.map(item => item.heroImage.fluid.src)

    return (
      <div className={styles.container}>
        <div className={styles.canvas}>
          <Canvas
            camera={{
              aspect,
              fov,
              near: 0.001,
              far: 1000,
              position: cameraPosition
            }}
          >
            <ImagePlane
              aspect={aspect}
              images={[
                'https://images.unsplash.com/photo-1521794414102-37606728dd9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80',
                'https://images.unsplash.com/photo-1573169128228-31137c599d3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'
              ]}
              currentImage={currentImage}
              height={height}
              width={width}
            />
          </Canvas>
        </div>
        {sections.map(({ title, slug, description }) => (
            <div className={styles.section}>
              <Headline1 
                reverse 
                bold
                dangerouslySetInnerHTML={{
                  __html: description.childMarkdownRemark.html,
                }}
              />
              <Headline3 className='mb2'>{title}</Headline3>
              <Button to={`/work/${slug}`}>Read More</Button>
            </div>
        ))}
      </div>
    );
  }
}

Section.defaultProps = {
  cameraPosition: new THREE.Vector3(0, 0, 2)
}

export default Section;
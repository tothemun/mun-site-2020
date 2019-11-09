import React, { Component, createRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { TimelineMax, Power2 } from 'gsap';
import frag from '~shaders/planeShift/frag.glsl';
import vert from '~shaders/planeShift/vert.glsl';
import disp from '~shaders/planeShift/disp4.jpg';

class ImagePlane extends Component {
  textures = [];
  imageAspect = 0;
  $material = createRef();
  $geometry = createRef();
  $mesh = createRef();
  isRunning = false;
  current = 0;
  gui = null;
  state = { currentImage: 0 };

  componentDidMount() {
    const { images } = this.props;
    const promises = [];

    images.map((url, i) => {
      promises.push(new Promise(resolve => {
        this.textures[i] = new THREE.TextureLoader().load(url, resolve);
      }));
    });

    Promise.all(promises).then(() => {

      const { uniforms } = this.$material.current;

      uniforms.texture1.value = this.textures[0];
      uniforms.texture2.value = this.textures[1];
      this.resize();

      window.addEventListener("resize", this.resize);
      window.addEventListener('keydown', this.next);
    });
  }

  resize = () => {
    const { aspect, height, width } = this.props;
    const imageAspect = this.textures[0].image.height/this.textures[0].image.width;
    let a1; 
    let a2;

    if (height / width > imageAspect) {
      a1 = (width / height) * imageAspect ;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (height / width) / imageAspect;
    }

    const material = this.$material.current;
    const mesh = this.$mesh.current;

    if (!material) return;

    material.uniforms.resolution.value.x = width;
    material.uniforms.resolution.value.y = height;
    material.uniforms.resolution.value.z = a1;
    material.uniforms.resolution.value.w = a2;

    mesh.scale.x = aspect;
    mesh.scale.y = 1;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentImage !== this.props.currentImage) {
      this.next();
    }
  }

  next = () => {
    console.log(this.$material.current.uniforms.texture1.value)

    if (this.isRunning) return;

    const { duration, ease } = this.props;
    const { uniforms } = this.$material.current;
    this.isRunning = true;

    let nextTexture = this.textures[(this.current + 1) % this.textures.length];
    uniforms.texture2.value = nextTexture;

    let tl = new TimelineMax();
    tl.to(uniforms.progress, duration, {
      value: 1,
      ease,
      onComplete: () => {
        this.current = (this.current + 1) % this.textures.length;
        uniforms.texture1.value = nextTexture;
        uniforms.progress.value = 0;
        this.isRunning = false;
      }
    })
  }

  render() {

    return (
      <mesh visible position={[0, 0, 0]} ref={this.$mesh} rotation={[0, 0, 0]}>
        <planeGeometry 
          attach="geometry" 
          args={[1, 1, 2, 2]} 
          ref={this.$geometry} 
        />
        <shaderMaterial
          attach="material"
          extensions={{ derivatives: "#extension GL_OES_standard_derivatives : enable" }}
          ref={this.$material}
          side={THREE.DoubleSide}
          uniforms={{
            time: { type: "f", value: 0 },
            progress: { type: "f", value: 1 },
            border: { type: "f", value: 0 },
            intensity: { type: "f", value: 0.3 },
            scaleX: { type: "f", value: 40 },
            scaleY: { type: "f", value: 40 },
            transition: { type: "f", value: 40 },
            swipe: { type: "f", value: 0 },
            width: { type: "f", value: 0 },
            radius: { type: "f", value: 0 },
            texture1: { type: "f", value: this.textures[0] },
            texture2: { type: "f", value: this.textures[1] },
            displacement: { type: "f", value: new THREE.TextureLoader().load(disp) },
            resolution: { type: "v4", value: new THREE.Vector4() },
          }}
          fragmentShader={frag}
          vertexShader={vert}
        />
    </mesh>
    )
  }
}

ImagePlane.defaultProps = {
  duration: 1,
  ease: Power2['easeInOut'],
  uniforms: {
    intensity: {value: 0.3, type: 'f', min: 0.0 , max: 2 }
  }
};

export default ImagePlane;
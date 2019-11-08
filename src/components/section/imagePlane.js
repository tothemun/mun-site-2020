import React, { Component, createRef } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';

class ImagePlane extends Component {
  textures = [];
  imageAspect = 0;
  $material = createRef();

  componentDidMount() {
    const { images } = this.props;
    const promises = [];

    images.map((url, i) => {
      promises.push(new Promise(resolve => {
        this.textures[i] = new THREE.TextureLoader().load(url, resolve);
      }));
    });

    Promise.all(promises).then(() => {
      // On Complete
      window.addEventListener("resize", this.resize);
    });
  }

  resize = () => {
    const { aspect, height, width } = this.props;
    this.imageAspect = this.textures[0].image.height/this.textures[0].image.width;
    let a1; let a2;

    if(height / width > this.imageAspect) {
      a1 = (width / height) * this.imageAspect ;
      a2 = 1;
    } else{
      a1 = 1;
      a2 = (height / width) / this.imageAspect;
    }

    const material = this.$material.current;
    console.log(this)
    // material.uniforms.resolution.value.x = width;
    // material.uniforms.resolution.value.y = height;
    // material.uniforms.resolution.value.z = a1;
    // material.uniforms.resolution.value.w = a2;

    this.plane.scale.x = aspect;
    this.plane.scale.y = 1;
  }

  settings = () => {
    const { debug } = this.props;
    if(debug) this.gui = new dat.GUI();

    this.settings = {progress:0.5};
    // if(this.debug) this.gui.add(this.settings, "progress", 0, 1, 0.01);

    Object.keys(this.uniforms).forEach((item)=> {
      this.settings[item] = this.uniforms[item].value;
      if(this.debug) this.gui.add(this.settings, item, this.uniforms[item].min, this.uniforms[item].max, 0.01);
    })
  }

  render() {
    return (
      <mesh visible userData={{ test: 'hello' }} position={[1, 1, 2, 2]} rotation={[0, 0, 0]}>
      <planeGeometry attach="geometry" args={[1, 1, 16]} />
      {/* <shaderMaterial
        attach="material"
        ref={this.$material}
        uniforms={{
          time: { type: "f", value: 0 },
          progress: { type: "f", value: 0 },
          border: { type: "f", value: 0 },
          intensity: { type: "f", value: 0 },
          scaleX: { type: "f", value: 40 },
          scaleY: { type: "f", value: 40 },
          transition: { type: "f", value: 40 },
          swipe: { type: "f", value: 0 },
          width: { type: "f", value: 0 },
          radius: { type: "f", value: 0 },
          texture1: { type: "f", value: this.textures[0] },
          texture2: { type: "f", value: this.textures[1] },
          displacement: { type: "f", value: new THREE.TextureLoader().load(sections[0].image) },
          resolution: { type: "v4", value: new THREE.Vector4() },
        }}
        fragmentShader={frag}
        vertexShader={vert}
      /> */}
    </mesh>
    )
  }
}

export default ImagePlane;
import cn from 'classnames';
import React, { Component, createRef } from 'react';
import * as paper from 'paper';
import * as SimplexNoise from 'simplex-noise';
import { lerp } from '~utils';
import styles from './cursor.module.scss';

class Cursor extends Component {
  clientX = -100;
  clientY = -100;
  lastX = -100;
  lastY = -100;
  $cursor = createRef();
  $canvas = createRef();

  state = {
    isNoisey: false
  };

  componentDidMount() {
    const { segments, radius, strokeColor, strokeWidth } = this.props;
    document.addEventListener("mousemove", this.onMouseMove);

    paper.setup(this.$canvas.current);

    // the base shape for the noisy circle
    const polygon = new paper.Path.RegularPolygon(
      new paper.Point(0, 0),
      segments,
      radius
    );
    polygon.strokeColor = strokeColor;
    polygon.strokeWidth = strokeWidth;
    polygon.smooth();
    this.group = new paper.Group([polygon]);
    this.group.applyMatrix = false;

    paper.view.onFrame = this.draw;

    requestAnimationFrame(this.update);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    this.clientX = e.clientX;
    this.clientY = e.clientY;
  }

  draw = (event) => {
    if (!this.$canvas.current) return;
    // using linear interpolation, the circle will move 0.2 (20%)
    // of the distance between its current position and the mouse
    // coordinates per Frame
    this.lastX = lerp(this.lastX, this.clientX, 0.2);
    this.lastY = lerp(this.lastY, this.clientY, 0.2);
    this.group.position = new paper.Point(this.lastX, this.lastY);
  }

  update = () => {
    if (!this.$cursor.current) return;

    const { clientX, clientY} = this;
    this.$cursor.current.style.transform = `translate(${clientX}px, ${clientY}px)`;

    requestAnimationFrame(this.update);
  }

  render() {
    return (
      <>
        <div className={cn(styles.cursor, styles.small)} ref={this.$cursor} />
        <canvas className={styles.canvas} resize='true' ref={this.$canvas} />
      </>
    )
  }
}

Cursor.defaultProps = {
  noiseScale: 150,
  noiseRange: 4,
  segments: 8,
  radius: 15,
  strokeWidth: 2,
  strokeColor: 'rgba(3, 38, 47, 0.5)',
  shapeBounds: { width: 75, height: 75 }
};

export default Cursor;
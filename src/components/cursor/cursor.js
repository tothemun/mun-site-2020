import cn from 'classnames';
import React, { Component, createRef } from 'react';
import * as paper from 'paper';
import * as SimplexNoise from 'simplex-noise';
import { lerp, map } from '~utils';
import styles from './cursor.module.scss';

class Cursor extends Component {
  clientX = -100;
  clientY = -100;
  lastX = -100;
  lastY = -100;
  $cursor = createRef();
  $canvas = createRef();
  stuckX = 0;
  stuckY = 0;
  isStuck = false;
  isNoisy = false;
  polygon = null;
  bigCoordinates = [];

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
    const group = new paper.Group([polygon]);
    group.applyMatrix = false;
    this.noiseObjects = polygon.segments.map(() => new SimplexNoise());

    this.polygon = polygon;
    this.group = group;

    paper.view.onFrame = this.draw;
    this.initHovers();
    requestAnimationFrame(this.update);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    this.clientX = e.clientX;
    this.clientY = e.clientY;
  }

  handleMouseEnter = e => {
    const navItem = e.currentTarget;
    const navItemBox = navItem.getBoundingClientRect();
    this.stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    this.stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    this.isStuck = true;
  };

  handleMouseLeave = () => {
    this.isStuck = false;
  };

  initHovers = () => {
    // find all anchor tags
    const allAnchorTags = document.getElementsByTagName('a');

    for (let item of allAnchorTags) {
      item.addEventListener("mouseenter", this.handleMouseEnter);
      item.addEventListener("mouseleave", this.handleMouseLeave);
    }
  }

  draw = (event) => {
    if (!this.$canvas.current) return;

    const { isStuck } = this;
    const { shapeBounds, speed, noiseScale, noiseRange } = this.props;

    if (!isStuck) {
      this.lastX = lerp(this.lastX, this.clientX, speed);
      this.lastY = lerp(this.lastY, this.clientY, speed);
    } else {
      this.lastX = lerp(this.lastX, this.stuckX, speed);
      this.lastY = lerp(this.lastY, this.stuckY, speed);
    }

    this.group.position = new paper.Point(this.lastX, this.lastY);
    const polyBoundWidth = this.polygon.bounds.width;

    if (isStuck && polyBoundWidth < shapeBounds.width) {
      this.polygon.scale(1.08);
    } else if (!isStuck && polyBoundWidth > 30) {
      this.polygon.scale(0.92);

      if (this.isNoisy) {
        this.polygon.segments.forEach((segment, i) => {
          segment.point.set(this.bigCoordinates[i][0], this.bigCoordinates[i][1]);
        });
        this.isNoisy = false;
        this.bigCoordinates = [];
      }
    } 
    
    // while stuck and big, apply the noise
    if (isStuck && polyBoundWidth > shapeBounds.width) {
      this.isNoisy = true;

      // get coordinates of large circle
      if (this.bigCoordinates.length === 0) {
        this.polygon.segments.forEach(({ point: { x, y } }, i) => {
          this.bigCoordinates[i] = [x, y];
        });
      }

      // loop over all points of the polygon
      this.polygon.segments.forEach((segment, i) => {
        // get new noise value
        // we divide event.count by noiseScale to get a very smooth value
        const noiseX = this.noiseObjects[i].noise2D(event.count / noiseScale, 0);
        const noiseY = this.noiseObjects[i].noise2D(event.count / noiseScale, 1);
        
        // map the noise value to our defined range
        const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
        const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);
        
        // apply distortion to coordinates
        const newX = this.bigCoordinates[i][0] + distortionX;
        const newY = this.bigCoordinates[i][1] + distortionY;
        
        // set new (noisy) coodrindate of point
        segment.point.set(newX, newY);
      })
    }
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
  speed: .15,
  strokeWidth: 2,
  strokeColor: 'rgba(3, 38, 47, 0.5)',
  shapeBounds: { width: 75, height: 75 }
};

export default Cursor;
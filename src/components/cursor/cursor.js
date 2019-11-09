import cn from 'classnames';
import React, { Component, createRef } from 'react';
import * as paper from 'paper';
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
  polygon = null;

  componentDidMount() {
    const { segments, radius, strokeColor, strokeWidth } = this.props;
    document.addEventListener("mousemove", this.onMouseMove);

    paper.setup(this.$canvas.current);

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
    const allAnchorTags = document.getElementsByTagName('a');

    for (let item of allAnchorTags) {
      item.addEventListener("mouseenter", this.handleMouseEnter);
      item.addEventListener("mouseleave", this.handleMouseLeave);
    }
  }

  draw = (event) => {
    if (!this.$canvas.current) return;

    const { isStuck } = this;
    const { shapeBounds, speed } = this.props;

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
  segments: 8,
  radius: 15,
  speed: .15,
  strokeWidth: 2,
  strokeColor: 'rgba(3, 38, 47, 0.5)',
  shapeBounds: { width: 75, height: 75 }
};

export default Cursor;
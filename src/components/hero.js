import React from 'react'
import { Col, Row } from 'react-grid-system'
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default ({ data }) => (
  <Row>
    <Col xs={12}>
      <div className={styles.hero}>
        <div className={styles.heroDetails}>
          <h3 className={styles.heroHeadline}>{data.headerCopy}</h3>
        </div>
      </div>
    </Col>
  </Row>
)

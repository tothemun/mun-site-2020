import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Container from '~components/container'
import styles from './navigation.module.scss'

export default ({ logo }) => (
  <Container>
    <nav role="navigation">
      <div className={styles.container}>
        <Link className={styles.logo} to='/'>
          <Img alt='logo' fluid={logo.fluid} />
        </Link>
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/work/">Work</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/blog/">Blog</Link>
          </li>
          <li className={styles.buttonItem}>
            <Link to="/contact/">Contact</Link>
          </li>
        </ul>
      </div>   
    </nav>
  </Container>
)

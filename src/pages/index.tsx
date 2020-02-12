import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { Canvas } from 'react-three-fiber'
import Layout from "~/components/layout"
import Image from "~/components/image"
import SEO from "~/components/seo"
import * as Styled from './index.styled';

interface Props {
  pages: number
};

const IndexPage = ({ pages = 2 }: Props) =>  {
  const top = useRef({ top: 0 });
  const scrollArea = useRef(null);
  const onScroll = (e: any) => top.current = e.target.scrollTop;

  useEffect(() => {
    void onScroll({ target: scrollArea.current })
  }, []);

  return (
    <Layout title="Index">
      <SEO title="Home" />
      <Canvas orthographic>{/* Contents ... */}</Canvas>
      <Styled.Container ref={scrollArea} onScroll={onScroll}>
        <Styled.Contents pages={pages}>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <Image />
          </div>
          <Link to="/page-2/">Go to page 2</Link>
        </Styled.Contents>
      </Styled.Container>
    </Layout>
  )
};

export default IndexPage;

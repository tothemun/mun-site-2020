import styled from 'styled-components';

export const Canvas = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Contents = styled.div`
  height: ${({ pages }: { pages: number }) => pages * 100}vh;
`;

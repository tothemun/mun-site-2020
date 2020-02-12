import { useContext } from 'react';
import { useThree } from 'react-three-fiber';

const useBlock = (offsetContext: any) => {
  const { viewport } = useThree();
  const offset = useContext(offsetContext);
  const cw = viewport.width / zoom;
};

export default useBlock;

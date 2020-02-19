import React from 'react';
import styled from 'styled-components';

import A from '../A';
import NormalImg from '../Img';

const Img = styled(NormalImg)`
  width: 200px;
  height: 100px;
`;

const Thumb = ({ onClick, src }) => (
  <A onClick={onClick}>
    <Img src={src} alt="Preview thumbnail image (scaled down dimensions)" />
  </A>
);

export default Thumb;

import { Link } from 'react-router-dom';
import styled from 'styled-components';

// this is the buttons at the top of the page
export default styled(Link)`
  display: inline-flex;
  padding: 0.25em 2em;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  background: #f50057;
  color: white;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;

import React from 'react';
import { animated, useSpring } from '@react-spring/web';

interface Position {
  x: number;
  y: number;
}

interface LineProps {
  from: Position;
  to: Position;
}

const Line: React.FC<LineProps> = ({ from, to }) => {
  const [lineProps, setLineProps] = useSpring(() => ({
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
    config: { tension: 280, friction: 60 }
  }));

  // Update the line properties whenever `from` or `to` changes
  React.useEffect(() => {
    setLineProps({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
  }, [from, to, setLineProps]);

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, height: 1000  }}>
      <animated.line
        x1={lineProps.x1}
        y1={lineProps.y1}
        x2={lineProps.x2}
        y2={lineProps.y2}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Line;

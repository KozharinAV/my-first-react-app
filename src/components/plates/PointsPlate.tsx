import styled from '@emotion/styled';
import { useEffect } from 'react';

interface PropType {
  penaltyLimit: number;
  leftPoints: number;
  rightPoints: number;
}

//This component is made with @emotion/styled only for trying such method

const headerBackground = '#febd27';

const Plate = styled('div')`
  position: absolute;
  left: calc(50vw - 100px);
  top: 8vh;
  width: 200px;
  height: 110px;
  border-radius: 20px;
  padding: 5px;
  background-color: ${headerBackground};
  box-shadow: 0 0 10px 2px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  animation: appearing 1s;

  @keyframes appearing {
    from {
      scale: 0.2;
    }
    50% {
      scale: 1.2;
    }
    to {
      scale: 1;
    }
  }
`;

const Points = styled('div', { shouldForwardProp: (prop) => !['red'].includes(prop) })<{
  red?: boolean;
}>`
  color: ${(props) => (props.red ? 'red' : 'black')};
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 70px;
  line-height: 75px;
  font-weight: var(--font-weight);

  & .dash {
    padding-bottom: 10px;
  }
`;

const animateElement = (id: string) => {
  const element = document.getElementById(id);
  if (element)
    element!.animate(
      [
        { scale: 1, color: 'black' },
        { scale: 1.2, color: 'red' },
        { scale: 1, color: 'black' },
      ],
      500
    );
};

export default function PointsPlate({ penaltyLimit, leftPoints, rightPoints }: PropType) {
  useEffect(() => {
    if (leftPoints || rightPoints) animateElement('points');
  }, [leftPoints, rightPoints]);

  return (
    <Plate>
      <span>ИГРА ДО {penaltyLimit} ОЧКОВ</span>
      <Points id="points">
        <span>{leftPoints}</span>
        <span className="dash">-</span>
        <span>{rightPoints}</span>
      </Points>
    </Plate>
  );
}

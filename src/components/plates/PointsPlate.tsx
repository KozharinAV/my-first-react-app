import styled from '@emotion/styled';

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
  height: 12vh;
  border-radius: 20px;
  padding: 5px;
  background-color: ${headerBackground};
  box-shadow: 0 0 10px 2px $dark;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
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
  font-weight: 600;

  & .dash {
    padding-bottom: 10px;
  }
`;

export default function PointsPlate({ penaltyLimit, leftPoints, rightPoints }: PropType) {
  return (
    <Plate>
      <span>ИГРА ДО {penaltyLimit} ОЧКОВ</span>
      <Points>
        <span>{leftPoints}</span>
        <span className="dash">-</span>
        <span>{rightPoints}</span>
      </Points>
    </Plate>
  );
}

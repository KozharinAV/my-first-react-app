import classes from './TextPlate.module.scss';

interface PropType {
  text: string;
  visible: boolean;
  size: 'fixed' | 'flexible';
}

export default function TextPlate({ text, visible, size }: PropType) {
  const plateClass = size === 'fixed' ? `${classes.plate}` : `${classes.plate} ${classes.flexible}`;

  const visibility = visible ? 'visible' : 'hidden';

  return (
    <div
      className={plateClass}
      style={{ visibility: visibility }}
    >
      {text}
    </div>
  );
}

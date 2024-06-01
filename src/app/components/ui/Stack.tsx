import React, { ReactNode, CSSProperties } from 'react';
import styles from './Stack.module.scss';

interface StackProps {
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: string;
  children: ReactNode;
}

const Stack: React.FC<StackProps> = ({
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  gap = '0',
  children,
}) => {
  const stackStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: gap,
    height: '100%',
  };

  return <div className={styles.stack} style={stackStyle}>{children}</div>;
};

export default Stack;

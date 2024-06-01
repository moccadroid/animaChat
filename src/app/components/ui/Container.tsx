import React, { CSSProperties, ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  maxWidth?: string;
  width?: string;
  maxHeight?: string;
  height?: string;
  center?: boolean;
  padding?: string;
  grow?: boolean;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  maxWidth = '100%',
  width = '100%',
  maxHeight = '100%',
  height = '100%',
  center = false,
  padding = 0,
  grow = false,
  children,
}) => {
  const containerStyle: CSSProperties = {
    maxWidth: maxWidth,
    width: width,
    maxHeight,
    height,
    padding,
    flexGrow: grow ? 1 : 0 ,
    margin: center ? '0 auto' : undefined,
    display: center ? 'flex' : undefined,
    justifyContent: center ? 'center' : undefined,
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {children}
    </div>
  );
};

export default Container;

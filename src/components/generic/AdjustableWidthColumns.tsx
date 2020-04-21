import React, { useState, useRef, useEffect } from 'react';

import './AdjustableWidthColumns.css';

export type AdjustableWidthColumnsProps = {
  className?: string,
  left: any,
  right: any,
};

export function AdjustableWidthColumns({ className, left, right }: AdjustableWidthColumnsProps) {
  const xPos = useRef(null);
  const [ width, setWidth ] = useState(300);

  useEffect(() => {
    function onMouseUp() {
      xPos.current = null;
    }
  
    function onMouseMove(e: MouseEvent) {
      if (xPos.current !== null) {
        setWidth(width + e.clientX - xPos.current);
        xPos.current = e.clientX;
      }
    }
  
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    return function() {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  
  function onMouseDown(e: React.MouseEvent) {
    xPos.current = e.clientX;
    e.preventDefault();
  }

  return <div className={`awc-container ${className}`}>
    <div className="awc-left" style={{ width }}>
      {left}
    </div>
    <div className="awc-bar">
      <div className="awc-grab" onMouseDown={onMouseDown} />
    </div>
    <div className="awc-right">
      {right}
    </div>
  </div>;
}
'use client';

import useCanvasCursor from '@/hooks/useCanvasCursor';

interface CanvasCursorProps {
  visible: boolean;
}

const CanvasCursor = ({ visible }: CanvasCursorProps) => {
  useCanvasCursor(visible);

  return (
    <canvas
      className='pointer-events-none fixed inset-0 z-[9999]'
      id='canvas'
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};

export default CanvasCursor;

import React from 'react';
import '../css/Game.css';

/**
 * Creats a line which is a canvas.
 * @param holder
 * @returns
 */
const Canvas = function canvas(holder: { className: string, position: string }) {
  return (
    <div>
      <canvas className={holder.className} style={{ right: holder.position }} />
    </div>
  );
};

export default Canvas;

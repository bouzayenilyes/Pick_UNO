import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useCanvasStore } from '../stores/canvasStore';
import { useLiveblocks } from '../lib/liveblocks';

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, setCanvas } = useCanvasStore();
  const { room } = useLiveblocks();

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#ffffff',
    });

    setCanvas(fabricCanvas);

    const handleResize = () => {
      fabricCanvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      fabricCanvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!canvas || !room) return;

    const handleCanvasChange = () => {
      const json = canvas.toJSON();
      room.broadcastEvent({ type: 'canvas-update', json });
    };

    canvas.on('object:modified', handleCanvasChange);
    canvas.on('object:added', handleCanvasChange);
    canvas.on('object:removed', handleCanvasChange);

    room.subscribe('canvas-update', (event) => {
      if (event.json) {
        canvas.loadFromJSON(event.json, canvas.renderAll.bind(canvas));
      }
    });

    return () => {
      canvas.off('object:modified', handleCanvasChange);
      canvas.off('object:added', handleCanvasChange);
      canvas.off('object:removed', handleCanvasChange);
    };
  }, [canvas, room]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};
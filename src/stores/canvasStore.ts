import { create } from 'zustand';
import { fabric } from 'fabric';

interface CanvasStore {
  canvas: fabric.Canvas | null;
  currentTool: string;
  setCanvas: (canvas: fabric.Canvas) => void;
  setTool: (tool: string) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  canvas: null,
  currentTool: 'select',
  setCanvas: (canvas) => set({ canvas }),
  setTool: (tool) => set({ currentTool: tool }),
}));
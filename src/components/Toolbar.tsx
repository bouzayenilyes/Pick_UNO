import React, { useRef } from 'react';
import { useCanvasStore } from '../stores/canvasStore';
import { 
  Square, 
  Circle, 
  Type, 
  Pencil, 
  Image as ImageIcon,
  Hand,
  Eraser
} from 'lucide-react';

export const Toolbar = () => {
  const { setTool, currentTool } = useCanvasStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools = [
    { icon: Hand, name: 'select' },
    { icon: Square, name: 'rectangle' },
    { icon: Circle, name: 'circle' },
    { icon: Type, name: 'text' },
    { icon: Pencil, name: 'draw' },
    { icon: ImageIcon, name: 'image' },
    { icon: Eraser, name: 'eraser' }
  ];

  const handleToolClick = (toolName: string) => {
    setTool(toolName);
    if (toolName === 'image' && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
      {tools.map((tool) => (
        <button
          key={tool.name}
          onClick={() => handleToolClick(tool.name)}
          className={`p-2 rounded hover:bg-gray-100 ${
            currentTool === tool.name ? 'bg-gray-100' : ''
          }`}
        >
          <tool.icon className="w-6 h-6" />
        </button>
      ))}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
};
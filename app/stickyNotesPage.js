"use client";

import { useState, useCallback, useEffect, useRef } from 'react';

const StickyNotesPage = () => {
  const [notes, setNotes] = useState([
    { id: 1, content: 'Note 1: Remember to check emails.', color: 'bg-yellow-300', x: 100, y: 100 },
    { id: 2, content: 'Note 2: Meeting at 3 PM.', color: 'bg-green-300', x: 200, y: 150 },
    { id: 3, content: 'Note 3: Finish the project report.', color: 'bg-blue-300', x: 300, y: 200 },
    { id: 4, content: 'Note 4: Call the client.', color: 'bg-red-300', x: 400, y: 250 },
    { id: 5, content: 'Note 5: Prepare for the presentation.', color: 'bg-purple-300', x: 500, y: 300 }
  ]);

  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = useCallback((e, id) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setDragging(id);
      setOffset({
        x: e.clientX - note.x,
        y: e.clientY - note.y
      });
      e.preventDefault();
    }
  }, [notes]);

  const handleMouseMove = useCallback((e) => {
    if (dragging !== null && containerRef.current) {
      requestAnimationFrame(() => {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const note = notes.find(n => n.id === dragging);
        if (note) {
          const newX = e.clientX - offset.x;
          const newY = e.clientY - offset.y;
          const noteElement = document.getElementById(`note-${dragging}`);

          // Boundary checks
          const maxX = containerRect.width - noteElement.offsetWidth;
          const maxY = containerRect.height - noteElement.offsetHeight;

          setNotes(prevNotes =>
            prevNotes.map(n =>
              n.id === dragging
                ? {
                    ...n,
                    x: Math.max(0, Math.min(newX, maxX)),
                    y: Math.max(0, Math.min(newY, maxY))
                  }
                : n
            )
          );
        }
      });
    }
  }, [dragging, offset, notes]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    const handleMouseMoveWrapper = (e) => handleMouseMove(e);
    const handleMouseUpWrapper = () => handleMouseUp();
    
    window.addEventListener('mousemove', handleMouseMoveWrapper, { passive: true });
    window.addEventListener('mouseup', handleMouseUpWrapper);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWrapper);
      window.removeEventListener('mouseup', handleMouseUpWrapper);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleTouchStart = useCallback((e, id) => {
    const touch = e.touches[0];
    const note = notes.find(n => n.id === id);
    if (note) {
      setDragging(id);
      setOffset({
        x: touch.clientX - note.x,
        y: touch.clientY - note.y
      });
      e.preventDefault();
    }
  }, [notes]);

  const handleTouchMove = useCallback((e) => {
    if (dragging !== null && containerRef.current) {
      const touch = e.touches[0];
      requestAnimationFrame(() => {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const note = notes.find(n => n.id === dragging);
        if (note) {
          const newX = touch.clientX - offset.x;
          const newY = touch.clientY - offset.y;
          const noteElement = document.getElementById(`note-${dragging}`);

          // Boundary checks
          const maxX = containerRect.width - noteElement.offsetWidth;
          const maxY = containerRect.height - noteElement.offsetHeight;

          setNotes(prevNotes =>
            prevNotes.map(n =>
              n.id === dragging
                ? {
                    ...n,
                    x: Math.max(0, Math.min(newX, maxX)),
                    y: Math.max(0, Math.min(newY, maxY))
                  }
                : n
            )
          );
        }
      });
    }
  }, [dragging, offset, notes]);

  const handleTouchEnd = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    const handleTouchMoveWrapper = (e) => handleTouchMove(e);
    const handleTouchEndWrapper = () => handleTouchEnd();
    
    window.addEventListener('touchmove', handleTouchMoveWrapper, { passive: true });
    window.addEventListener('touchend', handleTouchEndWrapper);

    return () => {
      window.removeEventListener('touchmove', handleTouchMoveWrapper);
      window.removeEventListener('touchend', handleTouchEndWrapper);
    };
  }, [handleTouchMove, handleTouchEnd]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden bg-orange-500">
      <h1 className="text-3xl text-white mb-4 pt-8">Sticky Notes</h1>
      <div className="relative w-full h-full" ref={containerRef}>
        {notes.map(note => (
          <div
            id={`note-${note.id}`} // Add id to the sticky note
            key={note.id}
            className={`absolute p-4 border border-gray-400 rounded-lg shadow-lg ${note.color}`}
            style={{
              width: '150px', // Adjust the width
              height: '150px', // Adjust the height
              transform: `translate(${note.x}px, ${note.y}px) rotate(${Math.random() * 15 - 7.5}deg)`,
              cursor: 'grab',
              touchAction: 'none', // Prevent default touch actions to handle dragging
              willChange: 'transform' // Optimize rendering performance
            }}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
            onTouchStart={(e) => handleTouchStart(e, note.id)}
          >
            <p className="text-sm">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNotesPage;

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type CursorState =
  | 'default'
  | 'link'
  | 'button'
  | 'image'
  | 'text'
  | 'drag'
  | 'expand'
  | 'casestudy'
  | 'hidden';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorInner = cursorInnerRef.current;
    if (!cursor || !cursorInner) return;

    const xSet = gsap.quickSetter(cursor, 'x', 'px');
    const ySet = gsap.quickSetter(cursor, 'y', 'px');

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tickerCallback = () => {
      xSet(mouseX);
      ySet(mouseY);
    };
    gsap.ticker.add(tickerCallback);

    const updateCursorState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const invertedSection = target.closest('[data-cursor-invert]');
      setIsInverted(!!invertedSection);

      const customCursor = target.closest('[data-cursor]');
      if (customCursor) {
        const cursorType = customCursor.getAttribute('data-cursor') as CursorState;
        const cursorLabel = customCursor.getAttribute('data-cursor-text') || '';
        setCursorState(cursorType);
        setCursorText(cursorLabel);
        return;
      }

      if (target.closest('a, button, [role="button"]')) {
        const isButton = target.closest('button, [role="button"]');
        setCursorState(isButton ? 'button' : 'link');
        setCursorText('');
      } else if (target.closest('img, video, canvas, .canvas-card')) {
        setCursorState('image');
        setCursorText('');
      } else if (target.closest('input, textarea, [contenteditable="true"]')) {
        setCursorState('text');
        setCursorText('');
      } else if (target.closest('[draggable="true"], .draggable')) {
        setCursorState('drag');
        setCursorText('');
      } else {
        setCursorState('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', updateCursorState);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    gsap.to(cursor, { opacity: 1, duration: 0.3 });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', updateCursorState);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-container ${isInverted ? 'inverted' : ''}`}
      style={{ opacity: 0 }}
    >
      <div
        ref={cursorInnerRef}
        className={`custom-cursor-inner ${cursorState}`}
        data-cursor-state={cursorState}
      >
        {cursorText && (
          <span className="cursor-text">{cursorText}</span>
        )}
      </div>
    </div>
  );
}

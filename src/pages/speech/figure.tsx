import { useRef } from 'react';

import { IFigureShape, FIGURE_MAP, FIGURE_COLOR_MAP } from '@/app-constants';

export function Figure({ word }: { word: string | undefined }) {
  const figureShape = useRef<IFigureShape>(IFigureShape.circle);
  const fugureColor = useRef<string>('white');

  if (word) {
    const fig = FIGURE_MAP.get(word);
    if (fig) {
      figureShape.current = fig;
    }

    const col = FIGURE_COLOR_MAP.get(word);
    if (col) {
      fugureColor.current = col;
    }
  }

  return (
    <div style={{ marginLeft: 40 }}>
      {figureShape.current === IFigureShape.square && (
        <div style={{ width: '100px', height: '100px', backgroundColor: fugureColor.current }} />
      )}
      {figureShape.current === IFigureShape.circle && (
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: fugureColor.current,
            borderRadius: '50%',
          }}
        />
      )}
      {figureShape.current === IFigureShape.triangle && (
        <svg
          fill={fugureColor.current}
          width="125px"
          height="125px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21,21H3L12,3Z" />
        </svg>
      )}
    </div>
  );
}

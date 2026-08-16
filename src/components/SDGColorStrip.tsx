import React from 'react';
import { sdgData } from '@/lib/sdg-data';

export const SDGColorStrip: React.FC = () => {
  return (
    <div className="flex w-full h-2">
      {sdgData.map((sdg) => (
        <div
          key={sdg.number}
          className="flex-1"
          style={{ backgroundColor: sdg.hex }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

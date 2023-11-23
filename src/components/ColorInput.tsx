import { useEffect, useState } from 'react';

export const ColorInput: React.FC<{ label: string; value: string; onChange?: (v: string) => void }> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900'>{label}:</label>
      <div className='relative flex items-center mb-2 max-w-xs border border-gray-300 rounded-lg'>
        <input className='h-11 block w-full' style={{ background: value }} type='color' value={value} onChange={(v) => onChange?.(v.target.value)} />
      </div>
    </div>
  );
};

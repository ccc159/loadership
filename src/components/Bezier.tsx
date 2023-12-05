import { useEffect, useState } from 'react';
import { BezierCurveEditor } from 'react-bezier-curve-editor';
type BezierEditorValue = [number, number, number, number];

export const Bezier: React.FC<{ value: string; onChange?: (v: string) => void }> = ({ value, onChange }) => {
  const [numbers, setNumbers] = useState<BezierEditorValue>([0.42, 0, 0.58, 1]);

  const isBezier = value.startsWith('cubic-bezier(');

  useEffect(() => {
    if (!isBezier) return;
    // example of value is "cubic-bezier(0.42, 0, 0.58, 1)"
    const numbers = value
      // remove "cubic-bezier(" and ")"
      .replace('cubic-bezier(', '')
      .replace(')', '')
      // split into array of strings
      .split(',')
      // convert to array of numbers
      .map((v) => parseFloat(v.trim())) as BezierEditorValue;
    setNumbers(numbers);
  }, [isBezier, value]);

  function onBezierChange(value: BezierEditorValue) {
    const newValue = `cubic-bezier(${value.map((v) => v.toFixed(2)).join(', ')})`;
    onChange?.(newValue);
  }

  function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange?.(e.target.value);
  }

  return (
    <>
      <select onChange={onSelect} value={value} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm  max-w-sm rounded-lg block w-full p-2'>
        <option value='linear'>linear</option>
        <option value='ease-in-out'>ease-in-out</option>
        <option value={isBezier ? value : `cubic-bezier(${numbers.map((v) => v.toFixed(2)).join(', ')})`}>cubic-bezier</option>
      </select>
      {isBezier && (
        <div className='relative flex flex-col items-center max-w-sm mt-2 p-2 gap-1'>
          <div style={{ touchAction: 'none' }}>
            <BezierCurveEditor size={150} outerAreaSize={0} value={numbers} onChange={onBezierChange} />
          </div>
          <label className='whitespace-nowrap bg-gray-200 px-3 rounded-sm flex items-center text-xs text-gray-400 font-medium'>{value}</label>
        </div>
      )}
    </>
  );
};

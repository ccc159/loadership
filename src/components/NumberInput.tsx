import { useEffect, useState } from 'react';

export const NumberInput: React.FC<{ label: string; value: number; onChange?: (v: number) => void; placeholder?: string; min?: number; max?: number }> = ({
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
}) => {
  const [temp, setTemp] = useState<number | undefined>(value);

  useEffect(() => {
    setTemp(value);
  }, [value]);

  function onInput(input: string) {
    const parsed = parseInt(input);
    if (parsed === undefined || isNaN(parsed)) setTemp(undefined);
    else if (min && parsed < min) onChange?.(min);
    else if (max && parsed > max) onChange?.(max);
    else onChange?.(parsed);
  }

  function onBlur() {
    setTemp(value);
  }

  function increment() {
    if (value === undefined) return;
    if (max && value >= max) return;
    onChange?.(value + 1);
  }

  function decrement() {
    if (value === undefined) return;
    if (min && value <= min) return;
    onChange?.(value - 1);
  }

  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900'>{label}:</label>
      <div className='relative flex items-center mb-2 max-w-xs'>
        <button onClick={decrement} type='button' className='bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'>
          <svg className='w-3 h-3 text-gray-900' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 2'>
            <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M1 1h16' />
          </svg>
        </button>
        <input
          type='text'
          className='bg-gray-50 border-x-0 border border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6'
          placeholder={placeholder}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onBlur()}
          onBlur={onBlur}
          value={temp}
          required
        />
        <div className='absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse'>
          {min && <span>{min} &le;</span>}
          <span>{label}</span>
          {max && <span>&le; {max}</span>}
        </div>
        <button type='button' onClick={increment} className='bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'>
          <svg className='w-3 h-3 text-gray-900 ' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
            <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 1v16M1 9h16' />
          </svg>
        </button>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';

export const NumberInput: React.FC<{
  label: string;
  value: number;
  onChange?: (v: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  unit?: string;
  step?: number;
  disabled?: boolean;
}> = ({ label, value, onChange, placeholder, min, max, unit, step = 1, disabled = false }) => {
  const [temp, setTemp] = useState<string>('');

  useEffect(() => {
    updateTemp(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function updateTemp(newValue?: number) {
    // if value is undefined, set temp to empty string
    if (newValue === undefined) setTemp('');
    // if newValue has more than 2 decimal places, round it to 2 decimal places
    else if (newValue.toString().split('.')[1]?.length > 2) setTemp(newValue.toFixed(2));
    else setTemp(newValue.toString());
  }

  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    // allow only numbers and one decimal point
    const val = e.target.value;
    if (val.match(/^[0-9]*\.?[0-9]*$/)) setTemp(val);
  }

  function onSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseFloat(e.target.value);
    onChange?.(val);
    updateTemp(val);
  }

  function onBlur() {
    commit();
  }

  function commit() {
    // parse temp to number
    const tempNum = parseFloat(temp);
    // if temp is NaN, set it to value
    if (isNaN(tempNum)) updateTemp(value);
    else if (min && tempNum < min) {
      onChange?.(min);
      updateTemp(min);
    } else if (max && tempNum > max) {
      onChange?.(max);
      updateTemp(max);
    } else {
      const newValue = tempNum - (tempNum % step);
      onChange?.(newValue);
      updateTemp(newValue);
    }
  }

  function increment() {
    if (disabled) return;
    if (value === undefined) return;
    if (max && value >= max) return;
    onChange?.(value + step);
  }

  function decrement() {
    if (disabled) return;
    if (value === undefined) return;
    if (min && value <= min) return;
    onChange?.(value - step);
  }

  const hasSlider = min !== undefined && max !== undefined;
  const totalHeight = hasSlider ? 'h-[52px]' : 'h-11';
  const pb = hasSlider ? 'pb-7' : 'pb-6';

  return (
    <div className='relative flex items-center mb-2 w-full md:max-w-sm'>
      <button
        disabled={disabled}
        onClick={decrement}
        type='button'
        className={`bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 ${totalHeight} focus:ring-gray-100 focus:ring-2 focus:outline-none disabled:bg-gray-300`}
      >
        <svg className='w-3 h-3 text-gray-900' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 2'>
          <path stroke='#827398' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h16' />
        </svg>
      </button>
      <div style={{ touchAction: 'none' }} className='relative w-full max-w-sm'>
        <input
          disabled={disabled}
          type='text'
          step={step}
          className={`bg-gray-50 border-x-0 border border-gray-300 ${totalHeight} font-medium text-center text-gray-900 text-sm focus:ring-gray-500 focus:border-gray-500 block w-full ${pb} disabled:bg-gray-200`}
          placeholder={placeholder}
          onChange={onInput}
          onKeyDown={(e) => e.key === 'Enter' && onBlur()}
          onBlur={onBlur}
          value={temp}
          required
        />
        <div className='absolute bottom-1 w-full px-4 flex items-center text-xs text-gray-400 space-x-1'>
          {hasSlider ? (
            <span className='flex w-full flex-col relative top-[3px]'>
              <span className='flex gap-1 relative top-[2px]'>
                {min}
                <input
                  onChange={onSliderChange}
                  disabled={disabled}
                  type='range'
                  value={temp}
                  min={min}
                  max={max}
                  step={step}
                  className='w-full h-1 translate-y-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:bg-gray-300'
                ></input>
                {max}
              </span>
              <span className='self-center whitespace-nowrap'>
                {label}
                {unit && ` (${unit})`}
              </span>
            </span>
          ) : (
            <span className='pr-1 w-full text-center whitespace-nowrap'>
              {label}
              {unit && ` (${unit})`}
              {min !== undefined && <span>&ge; {min}</span>}
              {max !== undefined && <span>&le; {max}</span>}
            </span>
          )}
        </div>
      </div>

      <button
        disabled={disabled}
        type='button'
        onClick={increment}
        className={`bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 ${totalHeight} focus:ring-gray-100 focus:ring-2 focus:outline-none disabled:bg-gray-300`}
      >
        <svg className='w-3 h-3 text-gray-900 ' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
          <path stroke='#827398' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 1v16M1 9h16' />
        </svg>
      </button>
    </div>
  );
};

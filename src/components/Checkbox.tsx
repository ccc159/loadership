export const Checkbox: React.FC<{ label: string; value: boolean; onCheck?: (v: boolean) => void; minimal?: boolean }> = ({ label, value, onCheck, minimal = false }) => {
  if (minimal)
    return (
      <div className='flex items-center'>
        <label onClick={() => onCheck?.(!value)} className='block text-xs font-medium text-gray-900 select-none mr-2'>
          {label}:
        </label>
        <input type='checkbox' checked={value} onChange={(v) => onCheck?.(v.target.checked)} className='w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500' />
      </div>
    );

  return (
    <div className='relative flex items-center justify-center mb-2 w-full md:max-w-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none'>
      <input
        type='checkbox'
        checked={value}
        onChange={(v) => onCheck?.(v.target.checked)}
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
      />
      <label onClick={() => onCheck?.(!value)} className='py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
        {label}
      </label>
    </div>
  );
};

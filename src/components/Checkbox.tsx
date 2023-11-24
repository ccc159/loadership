export const Checkbox: React.FC<{ label: string; value: boolean; onCheck?: (v: boolean) => void }> = ({ label, value, onCheck }) => {
  return (
    <div className='flex items-center'>
      <input type='checkbox' checked={value} onChange={(v) => onCheck?.(v.target.checked)} className='w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500' />
      <label onClick={() => onCheck?.(!value)} className='ms-2 text-xs font-medium text-gray-900select-none'>
        {label}
      </label>
    </div>
  );
};

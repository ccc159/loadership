export const ColorInput: React.FC<{ label: string; value: string; onChange?: (v: string) => void; minimal?: boolean }> = ({ label, value, onChange, minimal = false }) => {
  if (minimal) {
    return (
      <div className='flex gap-2 items-center'>
        <label className='block text-xs font-medium text-gray-900 select-none'>{label}:</label>
        <div className='relative flex items-center max-w-xs border border-gray-300 rounded-lg'>
          <input className='h-5 block w-8' style={{ background: value }} type='color' value={value} onChange={(v) => onChange?.(v.target.value)} />
        </div>
      </div>
    );
  }
  return (
    <div className='relative flex items-center max-w-sm border border-gray-300 rounded-lg'>
      <input className='h-11 block w-full' style={{ background: value }} type='color' value={value} onChange={(v) => onChange?.(v.target.value)} />
      <label className='absolute bottom-1 start-1/2 -translate-x-1/2 bg-gray-200 px-3 rounded-sm flex items-center text-xs text-gray-400 font-medium select-none'>{label}</label>
    </div>
  );
};

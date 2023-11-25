export const Field: React.FC<{ label: React.ReactNode; children: React.ReactNode }> = ({ label, children }) => {
  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
      {children}
    </div>
  );
};

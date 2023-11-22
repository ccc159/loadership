import { ReactNode } from 'react';

export const LoaderPreview: React.FC<{ loader: ReactNode; name: string }> = ({ loader, name }) => {
  return (
    <div className='relative group'>
      <div className='overflow-hidden aspect-w-1 aspect-h-1 bg-zinc-200'>
        <div className='object-cover w-full aspect-square transition-all duration-300 group-hover:scale-150 flex items-center justify-center content-center loader-preview'>{loader}</div>
      </div>
      <div className='absolute left-3 top-3'>
        <p className='sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full'>New</p>
      </div>
      <div className='flex items-start justify-between mt-4 space-x-4'>
        <div>
          <h3 className='text-xs font-bold text-gray-900 sm:text-sm md:text-base'>
            <a href='#' title=''>
              {name}
              <span className='absolute inset-0' aria-hidden='true'></span>
            </a>
          </h3>
        </div>

        <div className='text-right'>
          <p className='text-xs font-bold text-gray-900 sm:text-sm md:text-base'></p>
        </div>
      </div>
    </div>
  );
};

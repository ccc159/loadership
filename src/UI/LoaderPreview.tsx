import { Link } from 'react-router-dom';

export const LoaderPreview: React.FC<{ loader: ILoader; isNew?: boolean }> = ({ loader, isNew = false }) => {
  return (
    <Link to={`/${loader.slug}`}>
      <div className='relative group cursor-pointer'>
        <div className='overflow-hidden aspect-w-1 aspect-h-1 bg-zinc-200 rounded-xl'>
          <div className='object-cover w-full aspect-square transition-all duration-300 group-hover:scale-150 flex items-center justify-center content-center'>{loader.component}</div>
        </div>
        {isNew && (
          <div className='absolute left-3 top-3'>
            <p className='sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full'>New</p>
          </div>
        )}
        <div className='flex items-start justify-between mt-4 space-x-4'>
          <div>
            <h3 className='text-xs font-bold text-gray-900 sm:text-sm md:text-base transition-all duration-300 group-hover:indent-2'>{loader.name}</h3>
          </div>

          <div className='text-right'>
            <p className='text-xs font-bold text-gray-900 sm:text-sm md:text-base'></p>
          </div>
        </div>
      </div>
    </Link>
  );
};

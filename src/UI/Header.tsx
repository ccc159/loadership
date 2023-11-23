import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <header className='relative py-4 md:py-6'>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between'>
          <div className='flex-shrink-0'>
            <Link to='/' className='flex rounded outline-none'>
              <img className='w-auto h-8' src='/logo.svg' alt='' /> Loadership
            </Link>
          </div>

          <div className='flex lg:hidden'>
            <button type='button' className='text-gray-900'>
              <svg className='w-7 h-7' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M4 6h16M4 12h16M4 18h16'></path>
              </svg>
            </button>
          </div>

          <div className='hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2'>
            <a
              href='#'
              title=''
              className='text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2'
            >
              {' '}
              Experts{' '}
            </a>

            <a
              href='#'
              title=''
              className='text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2'
            >
              {' '}
              Community Groups{' '}
            </a>

            <Link
              className='text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2'
              to={`license`}
            >
              License
            </Link>
          </div>

          <div className='hidden lg:flex lg:items-center lg:justify-center lg:space-x-10'>
            <a
              href='#'
              title=''
              className='text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2'
            >
              {' '}
              Login{' '}
            </a>

            <a
              href='#'
              title=''
              className='px-5 py-2 text-base font-semibold leading-7 text-gray-900 transition-all duration-200 bg-transparent border border-gray-900 rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white'
              role='button'
            >
              Join community
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

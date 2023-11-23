import React from 'react';
import { Header } from './UI/Header';
import { LoaderGrid } from './UI/LoaderGrid';
import { NumberInput } from './components/NumberInput';
import { ColorInput } from './components/ColorInput';

function App() {
  const [value, setValue] = React.useState<number>(2);
  const [color, setColor] = React.useState<string>('#FF44EC');
  return (
    <div className='overflow-x-hidden'>
      <Header />
      <section className='relative py-12 sm:py-16 lg:pt-20 xl:pb-0'>
        <div className='relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
          <div className='max-w-3xl mx-auto text-center'>
            <p className='inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj'>Made by Developers, for Developers</p>
            <h1 className='mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj'>CSS-only loader configurators</h1>
            <p className='max-w-xl mx-auto mt-6 text-base leading-7 text-gray-600 font-inter'>
              LoaderShip is the ultimate CSS-only loader configuration tool that allows you to effortlessly customize and generate stunning loaders for your website. Simply Copy & Paste without any
              installation or dependency hassle.
            </p>

            <div className='relative inline-flex mt-10 group'>
              <div className='absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt'></div>

              <a
                href='#'
                title=''
                className='relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                role='button'
              >
                Get started with 4,958 configurators
              </a>
            </div>
          </div>
        </div>

        <div className='mt-16 md:mt-20'>
          <LoaderGrid />
        </div>
      </section>
      <NumberInput label='Dot size' value={value} onChange={setValue} min={1} max={12} />
      <ColorInput label='color' value={color} onChange={setColor} />
    </div>
  );
}

export default App;

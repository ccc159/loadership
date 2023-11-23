import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { NumberInput } from '../components/NumberInput';
import { CodeDisplay } from '../components/CodeDispay';

export const LoaderCircularDot = () => {
  const [numDots, setNumDots] = useState(4);
  const [size, setSize] = useState(100);
  const [dotSize, setDotSize] = useState(13);
  const [dotDistance, setDotDistance] = useState(24);
  const [loaderVersion, setLoaderVersion] = useState(1);

  useEffect(() => {
    setLoaderVersion(loaderVersion + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numDots]);

  const tempStyles = Array(numDots - 1)
    .fill(0)
    .map(
      (_, i) =>
        `.loader_${loaderVersion} div:nth-child(${i + 2}) {
            left: ${8 + i * dotDistance}px;
            animation: loader_${loaderVersion}_translate 0.6s infinite;
        }`
    )
    .join('\n');

  const styles = `
  .loader_${loaderVersion} {
      display: inline-block;
      position: relative;
      width: ${size}px;
      height: ${size}px;
      }
      .loader_${loaderVersion} div {
      position: absolute;
      top: ${Math.floor(size - dotSize) / 2}px;
      width: ${dotSize}px;
      height: ${dotSize}px;
      border-radius: 50%;
      background: white;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .loader_${loaderVersion} div:nth-child(1) {
        left: 8px;
        animation: loader_${loaderVersion}_scale_up 0.6s infinite;
      }
      ${tempStyles}
      .loader_${loaderVersion} div:nth-child(${numDots + 1}) {
        left: ${8 + (numDots - 1) * dotDistance}px;
        animation: loader_${loaderVersion}_scale_down 0.6s infinite;
      }
      @keyframes loader_${loaderVersion}_scale_up {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
      }
      @keyframes loader_${loaderVersion}_scale_down {
      0% {
          transform: scale(1);
      }
      100% {
          transform: scale(0);
      }
      }
      @keyframes loader_${loaderVersion}_translate {
      0% {
          transform: translate(0, 0);
      }
      100% {
          transform: translate(${dotDistance}px, 0);
      }
  }
  `;

  return (
    <section className='px-6 py-12 bg-white md:px-12 lg:px-24 w-full flex flex-col gap-6 md:gap-12 md:flex-row justify-center items-center'>
      <section className='flex flex-col gap-6 max-w-lg w-full'>
        <h2 className='text-2xl font-bold'>Parameters</h2>
        <NumberInput label='Loader size' value={size} onChange={setSize} />
        <NumberInput label='Number of dots' value={numDots} onChange={setNumDots} />
        <NumberInput label='Dot size' value={dotSize} onChange={setDotSize} />
        <NumberInput label='Dot distance' value={dotDistance} onChange={setDotDistance} />
      </section>
      <section className='flex flex-col max-w-lg w-full'>
        <div className='w-full p-4 border border-gray-200 bg-gray-100 rounded-t-xl'></div>
        <div className='flex justify-center items-center h-60 p-0 bg-gray-50 border-gray-200 bg-gradient-to-r border-x'>
          <div className={`loader_${loaderVersion}`}>
            <style>{styles}</style>
            {Array(numDots + 1)
              .fill(0)
              .map((_, i) => (
                <div key={i}></div>
              ))}
          </div>
        </div>
        <div className='relative border-gray-200 border-y border-x bg-gray-50'>
          <div className='grid w-full grid-cols-2 border-b border-gray-200 bg-gray-50 rounded-t-md dark:bg-gray-700 dark:border-gray-600'>
            <ul className='flex text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
              <li>
                <span className='inline-block w-full p-2 px-3 text-gray-800 bg-gray-100 border-r border-gray-200'>HTML</span>
              </li>
              <li>
                <span className='inline-block w-full p-2 px-3 text-gray-800 bg-gray-100 border-r border-gray-200'>CSS</span>
              </li>
            </ul>
          </div>
          <div className='p-4 max-h-[400px] overflow-y-auto'>
            <CodeDisplay code={styles} language='css' />
          </div>
        </div>
        <div className='w-full p-4 border border-gray-200 bg-gray-100 rounded-b-xl'></div>
      </section>
    </section>
  );
};

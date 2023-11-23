import { useEffect, useState } from 'react';
import { NumberInput } from '../components/NumberInput';
import { CodeDisplay } from '../components/CodeDisplay';
import ReactDOMServer from 'react-dom/server';

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

  const html = (
    <div className={`loader_${loaderVersion}`}>
      <style>{styles}</style>
      {Array(numDots + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}></div>
        ))}
    </div>
  );

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
        <div className='flex justify-center items-center h-60 p-0 bg-gray-50 border-gray-200 bg-gradient-to-r border-x'>{html}</div>
        <CodeDisplay css={styles} html={ReactDOMServer.renderToString(html)} />
        <div className='w-full p-1 border border-gray-200 border-t-0 bg-gray-100 rounded-b-xl'></div>
      </section>
    </section>
  );
};

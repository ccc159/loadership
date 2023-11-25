import { useEffect, useState } from 'react';
import { NumberInput } from '../components/NumberInput';
import { CodeDisplay } from '../components/CodeDisplay';
import ReactDOMServer from 'react-dom/server';
import { ColorInput } from '../components/ColorInput';
import { Checkbox } from '../components/Checkbox';
import { generateShortID, getReverseColor } from '../utils';
import { Field } from '../components/Field';

export const LoaderCircularDot = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#d1d5db');
  const [showFrame, setShowFrame] = useState<boolean>(false);

  const [numDots, setNumDots] = useState(3);
  const [autoLoaderSize, setAutoLoaderSize] = useState(true);
  const [loaderWidth, setLoaderWidth] = useState(100);
  const [loaderHeight, setLoaderHeight] = useState(100);
  const [dotSize, setDotSize] = useState(13);
  const [dotDistance, setDotDistance] = useState(24);
  const [speed, setSpeed] = useState(0.6);

  const [loaderVersion, setLoaderVersion] = useState('');

  const perfectLoaderWidth = dotDistance * (numDots - 1) + dotSize;
  const perfectLoaderHeight = dotSize;

  useEffect(() => {
    setLoaderVersion(generateShortID());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numDots]);

  useEffect(() => {
    if (autoLoaderSize) {
      setLoaderWidth(perfectLoaderWidth);
      setLoaderHeight(perfectLoaderHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numDots, dotSize, dotDistance, autoLoaderSize]);

  const tempStyles = Array(numDots - 1)
    .fill(0)
    .map(
      (_, i) =>
        `.loadership_${loaderVersion} div:nth-child(${i + 2}) {
            left: ${(loaderWidth - perfectLoaderWidth) / 2 + i * dotDistance}px;
            animation: loadership_${loaderVersion}_translate ${speed}s infinite;
        }`
    )
    .join('\n');

  const styles = `
  .loadership_${loaderVersion} {
      display: flex;
      position: relative;
      width: ${loaderWidth}px;
      height: ${loaderHeight}px;
      }
      .loadership_${loaderVersion} div {
      position: absolute;
      top: ${(loaderHeight - perfectLoaderHeight) / 2}px;
      width: ${dotSize}px;
      height: ${dotSize}px;
      border-radius: 50%;
      background: white;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .loadership_${loaderVersion} div:nth-child(1) {
        left: ${(loaderWidth - perfectLoaderWidth) / 2}px;
        animation: loadership_${loaderVersion}_scale_up ${speed}s infinite;
      }
      ${tempStyles}
      .loadership_${loaderVersion} div:nth-child(${numDots + 1}) {
        left: ${(loaderWidth - perfectLoaderWidth) / 2 + (numDots - 1) * dotDistance}px;
        animation: loadership_${loaderVersion}_scale_down ${speed}s infinite;
      }
      @keyframes loadership_${loaderVersion}_scale_up {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
      }
      @keyframes loadership_${loaderVersion}_scale_down {
      0% {
          transform: scale(1);
      }
      100% {
          transform: scale(0);
      }
      }
      @keyframes loadership_${loaderVersion}_translate {
      0% {
          transform: translate(0, 0);
      }
      100% {
          transform: translate(${dotDistance}px, 0);
      }
  }
  `;

  const html = (
    <div className={`loadership_${loaderVersion}`}>
      {Array(numDots + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}></div>
        ))}
    </div>
  );

  return (
    <section className='px-6 py-12 bg-white md:px-12 lg:px-24 w-full flex flex-col gap-6 md:gap-12 md:flex-row justify-center items-center'>
      <style>{styles}</style>
      <section className='flex flex-col gap-6 max-w-lg w-full'>
        <h2 className='text-2xl font-bold'>Parameters</h2>
        <Field label={'Loader'}>
          <Checkbox label='Auto size' value={autoLoaderSize} onCheck={setAutoLoaderSize} />
          <NumberInput disabled={autoLoaderSize} label='Loader width' value={loaderWidth} onChange={setLoaderWidth} unit='px' />
          <NumberInput disabled={autoLoaderSize} label='Loader height' value={loaderHeight} onChange={setLoaderHeight} unit='px' />
        </Field>
        <Field label={'Dot'}>
          <NumberInput label='Number of dots' value={numDots} onChange={setNumDots} />
          <NumberInput label='Dot size' value={dotSize} onChange={setDotSize} unit='px' />
          <NumberInput label='Dot distance' value={dotDistance} onChange={setDotDistance} unit='px' />
        </Field>
        <Field label={'Speed'}>
          <NumberInput step={0.05} label='Speed' value={speed} onChange={setSpeed} min={0} max={2} unit='s' />
        </Field>
      </section>
      <section className='flex flex-col max-w-lg w-full'>
        <div className='w-full px-4 py-1 border border-gray-200 bg-gray-100 rounded-t-xl flex items-center gap-3 justify-end'>
          <Checkbox label='Show frame' value={showFrame} onCheck={setShowFrame} minimal />
          <ColorInput minimal label='Background color' value={backgroundColor} onChange={setBackgroundColor} />
        </div>
        <div style={{ backgroundColor }} className='flex justify-center items-center min-h-[300px] p-4 border-gray-200 bg-gradient-to-r border-x'>
          <div style={{ border: showFrame ? `solid 1px ${getReverseColor(backgroundColor)}` : 'none' }}>{html}</div>
        </div>
        <CodeDisplay css={styles} html={ReactDOMServer.renderToString(html)} />
        <div className='w-full p-1 border border-gray-200 border-t-0 bg-gray-100 rounded-b-xl'></div>
      </section>
    </section>
  );
};

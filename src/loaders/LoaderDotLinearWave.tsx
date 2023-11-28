import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotLinearWaveClass extends LoaderClass {
  public params: {
    autoLoaderSize: boolean;
    loaderWidth: number;
    loaderHeight: number;
    loaderVersion: string;
    dotNum: number;
    dotSize: number;
    dotDistance: number;
    dotColor: string;
    bounceHeight: number;
    speed: number;
  };

  constructor() {
    super();
    this.params = {
      autoLoaderSize: true,
      loaderWidth: 0,
      loaderHeight: 0,
      loaderVersion: generateShortID(),
      dotNum: 8,
      dotSize: 9,
      dotDistance: 11,
      dotColor: '#ffffff',
      bounceHeight: 36,
      speed: 1.2,
    };
    this.controls = {
      ...this.controls,
      dotNum: {
        name: 'Number of dots',
        type: 'number',
        group: 'Dot',
        forceUpdate: true,
        affectLoaderSize: true,
      },
      dotSize: {
        name: 'Dot size',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      dotDistance: {
        name: 'Dot distance',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      dotColor: {
        name: 'Dot color',
        type: 'color',
        group: 'Dot',
      },
      bounceHeight: {
        name: 'Wave height',
        type: 'number',
        group: 'Dot',
        unit: 'px',
      },
      speed: {
        name: 'Speed',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 3,
        step: 0.01,
        unit: 's',
      },
    };
  }

  public override get PerfectWidth(): number {
    return this.params.dotDistance * (this.params.dotNum - 1) + this.params.dotSize;
  }

  public override get PerfectHeight(): number {
    return this.params.dotSize + this.params.bounceHeight;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(this.params.dotNum)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    const tempStyles = Array(this.params.dotNum)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 1}) {
              animation-delay: ${((this.params.speed / this.params.dotNum) * i).toFixed(2)}s;
              left: ${(this.params.loaderWidth - this.PerfectWidth) / 2 + i * this.params.dotDistance}px;
          }`
      )
      .join('\n');

    const styles = `
        .loadership_${this.params.loaderVersion} {
          display: flex;
          position: relative;
          width: ${this.params.loaderWidth}px;
          height: ${this.params.loaderHeight}px;
        }

        .loadership_${this.params.loaderVersion} div {
          position: absolute;
          top: ${(this.params.loaderHeight - this.PerfectHeight) / 2}px;
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
          animation: loadership_${this.params.loaderVersion}_wave alternate ${this.params.speed}s infinite;
          animation-timing-function: cubic-bezier(.56,-0.01,.48,1);
        }

        ${tempStyles}


        @keyframes loadership_${this.params.loaderVersion}_wave {
          0%, 100% { 
            transform: translatey(0px);
          }
          50% { 
            transform: translatey(${this.params.bounceHeight}px);
          }
        }
    `;
    return styles;
  }
}

const loader = new LoaderDotLinearWaveClass();
const name = 'Loader Dot Linear Wave';

export const LoaderDotLinearWave: ILoader = {
  name,
  slug: 'loader_dot_linear_wave',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};
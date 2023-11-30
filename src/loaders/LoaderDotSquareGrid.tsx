import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderDotSquareGridClass extends LoaderClass {
  public params: {
    autoLoaderSize: boolean;
    loaderWidth: number;
    loaderHeight: number;
    loaderVersion: string;
    dotNum: number;
    dotSize: number;
    dotScale: number;
    dotOpacity: number;
    dotDistance: number;
    dotColor: string;
    speed: number;
  };

  constructor() {
    super();
    this.params = {
      autoLoaderSize: true,
      loaderWidth: 0,
      loaderHeight: 0,
      loaderVersion: generateShortID(),
      dotNum: 3,
      dotSize: 13,
      dotScale: 0.7,
      dotOpacity: 0.5,
      dotDistance: 20,
      dotColor: '#ffffff',
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
        min: 1,
        max: 10,
      },
      dotSize: {
        name: 'Dot size',
        type: 'number',
        group: 'Dot',
        unit: 'px',
        affectLoaderSize: true,
      },
      dotScale: {
        name: 'Dot minimal scale',
        type: 'number',
        group: 'Dot',
        min: 0,
        max: 1,
        step: 0.01,
        affectLoaderSize: true,
      },
      dotOpacity: {
        name: 'Dot minimal opacity',
        type: 'number',
        group: 'Dot',
        min: 0,
        max: 1,
        step: 0.01,
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
      speed: {
        name: 'Speed',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 2,
        step: 0.01,
        unit: 's',
      },
    };
  }

  public override get PerfectWidth(): number {
    return (this.params.dotNum - 1) * this.params.dotDistance + this.params.dotSize;
  }

  public override get PerfectHeight(): number {
    return (this.params.dotNum - 1) * this.params.dotDistance + this.params.dotSize;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(this.params.dotNum * this.params.dotNum)
          .fill(0)
          .map((_, i) => (
            <div key={i}></div>
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    const tempStyles = Array(this.params.dotNum * this.params.dotNum)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 1}) {
              animation-delay: ${(-this.params.speed * Math.random()).toFixed(2)}s;
              top: ${(i % this.params.dotNum) * this.params.dotDistance}px;
              left: ${((i - (i % this.params.dotNum)) / this.params.dotNum) * this.params.dotDistance}px;
            }`
      )
      .join('\n');

    const fadeAnimation = `
      @keyframes loadership_${this.params.loaderVersion}_fade {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: ${this.params.dotOpacity};
        }
      }    
      @keyframes loadership_${this.params.loaderVersion}_scale {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(${this.params.dotScale.toFixed(2)});
        }
      }    
    `;

    const styles = `
        .loadership_${this.params.loaderVersion} {
          display: flex;
          position: relative;
          width: ${this.params.loaderWidth}px;
          height: ${this.params.loaderHeight}px;
        }
        .loadership_${this.params.loaderVersion} div {
          position: absolute;
          width: ${this.params.dotSize}px;
          height: ${this.params.dotSize}px;
          border-radius: 50%;
          background: ${this.params.dotColor};
          animation: loadership_${this.params.loaderVersion}_fade ${this.params.speed}s linear infinite, loadership_${this.params.loaderVersion}_scale ${this.params.speed}s linear infinite;
        }
        
        ${tempStyles}
     
        ${fadeAnimation}
    
    `;
    return styles;
  }
}

const loader = new LoaderDotSquareGridClass();
const name = 'Loader Dot Square Grid';

export const LoaderDotSquareGrid: ILoader = {
  name,
  slug: 'loader_dot_square_grid',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};

import { Configurator } from '../UI/Configurator';
import { generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderStripeLinearBounceClass extends LoaderClass {
  public params: {
    autoLoaderSize: boolean;
    loaderWidth: number;
    loaderHeight: number;
    loaderVersion: string;
    stripeWidth: number;
    stripeLength: number;
    stripeRadius: number;
    totalLength: number;
    stripeColor: string;
    stripeOpacity: number;
    speed: number;
  };

  constructor() {
    super();
    this.params = {
      autoLoaderSize: true,
      loaderWidth: 0,
      loaderHeight: 0,
      loaderVersion: generateShortID(),
      stripeWidth: 8,
      stripeLength: 40,
      stripeRadius: 4,
      totalLength: 90,
      stripeColor: '#ffffff',
      stripeOpacity: 0.3,
      speed: 1,
    };
    this.controls = {
      ...this.controls,
      stripeWidth: {
        name: 'Stripe width',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        affectLoaderSize: true,
      },
      stripeLength: {
        name: 'Stripe length',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        affectLoaderSize: true,
      },
      stripeRadius: {
        name: 'Corner radius',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        affectLoaderSize: true,
      },
      totalLength: {
        name: 'Total length',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        affectLoaderSize: true,
      },
      stripeOpacity: {
        name: 'Stripe opacity',
        type: 'number',
        group: 'Stripe',
        min: 0,
        max: 1,
        step: 0.01,
      },
      stripeColor: {
        name: 'Stripe color',
        type: 'color',
        group: 'Stripe',
      },
      speed: {
        name: 'Speed',
        type: 'number',
        group: 'Speed',
        min: 0,
        max: 5,
        step: 0.01,
      },
    };
  }

  public override get PerfectWidth(): number {
    return this.params.totalLength;
  }

  public override get PerfectHeight(): number {
    return this.params.stripeWidth;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        <div></div>
        <div></div>
      </div>
    );
  }

  public override get CSS(): string {
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
          height: ${this.params.stripeWidth}px;
          border-radius: ${this.params.stripeRadius}px;
          background: ${this.params.stripeColor};
        }

        .loadership_${this.params.loaderVersion} div:nth-child(1) {
          width: ${this.params.totalLength}px;
          opacity: ${this.params.stripeOpacity};
        }

        .loadership_${this.params.loaderVersion} div:nth-child(2) {
          width: ${this.params.stripeLength}px;
          animation: loadership_${this.params.loaderVersion}_move alternate ${this.params.speed}s infinite;
          animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
        }

        @keyframes loadership_${this.params.loaderVersion}_move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(${this.params.totalLength - this.params.stripeLength}px);
          }
        }
    `;
    return styles;
  }
}

const loader = new LoaderStripeLinearBounceClass();
const name = 'Loader Stripe Linear Bounce';

export const LoaderStripeLinearBounce: ILoader = {
  name,
  slug: 'loader_stripe_linear_bounce',
  date: new Date('2023/11/22'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};

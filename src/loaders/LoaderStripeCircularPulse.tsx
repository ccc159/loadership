import { Configurator } from '../UI/Configurator';
import { convertOpacityToHex, generateShortID } from '../utils';
import { LoaderClass } from './Loader';

export class LoaderStripeCircularPulseClass extends LoaderClass {
  public params: {
    paddingX: number;
    paddingY: number;
    loaderVersion: string;
    loaderRadius: number;
    stripeWidth: number;
    stripePercentage: number;
    stripeBackgroundOpacity: number;
    stripeColor: string;
    speed: number;
  };

  constructor() {
    super();
    this.params = {
      paddingX: 0,
      paddingY: 0,
      loaderVersion: generateShortID(),
      loaderRadius: 30,
      stripeWidth: 10,
      stripePercentage: 0.2,
      stripeBackgroundOpacity: 0.2,
      stripeColor: '#ffffff',
      speed: 1.4,
    };
    this.controls = {
      ...this.controls,
      loaderRadius: {
        name: 'Loader radius',
        type: 'number',
        group: 'Loader',
        unit: 'px',
        min: 1,
        max: 100,
        step: 1,
      },
      stripeWidth: {
        name: 'Stripe width',
        type: 'number',
        group: 'Stripe',
        unit: 'px',
        min: 1,
        max: 50,
        step: 1,
      },
      stripePercentage: {
        name: 'Stripe dominance',
        type: 'number',
        group: 'Stripe',
        min: 0.1,
        max: 0.74,
        step: 0.01,
      },
      stripeBackgroundOpacity: {
        name: 'Opacity',
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
        unit: 's',
      },
    };
  }

  public override get width(): number {
    return this.params.loaderRadius * 2 + this.params.stripeWidth + this.params.paddingX * 2;
  }

  public override get height(): number {
    return this.params.loaderRadius * 2 + this.params.stripeWidth + this.params.paddingY * 2;
  }

  public override get HTML(): JSX.Element {
    return (
      <div className={`loadership_${this.params.loaderVersion}`}>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} />
          ))}
      </div>
    );
  }

  public override get CSS(): string {
    let clipPath = '';
    if (this.params.stripePercentage < 0.25) {
      clipPath = `polygon(50% 50%, 0 0, ${(this.params.stripePercentage * 4 * 100).toFixed(2)}% 0)`;
    } else if (this.params.stripePercentage < 0.5) {
      clipPath = `polygon(50% 50%, 0 0, 100% 0, 100% ${((this.params.stripePercentage - 0.25) * 4 * 100).toFixed(2)}%)`;
    } else if (this.params.stripePercentage < 0.75) {
      clipPath = `polygon(50% 50%, 0 0, 100% 0, 100% 100%, ${((1 - this.params.stripePercentage) * 4 * 100).toFixed(2)}% 100%)`;
    } else {
      clipPath = `polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 ${((1 - this.params.stripePercentage) * 4 * 100).toFixed(2)}%)`;
    }

    const itemStyles = Array(5)
      .fill(0)
      .map(
        (_, i) =>
          `.loadership_${this.params.loaderVersion} div:nth-child(${i + 2}) {
              animation-delay: ${((-this.params.speed / 25) * i).toFixed(2)}s;
            }
            `
      )
      .join('\n');

    const styles = `
        .loadership_${this.params.loaderVersion} {
          display: flex;
          position: relative;
          width: ${this.width}px;
          height: ${this.height}px;          
        }

        .loadership_${this.params.loaderVersion} div {
          position: absolute;
          top: ${this.params.paddingY}px;
          left: ${this.params.paddingX}px;
          width: ${this.params.loaderRadius * 2 + this.params.stripeWidth}px;
          height: ${this.params.loaderRadius * 2 + this.params.stripeWidth}px;
          border: ${this.params.stripeWidth}px solid ${this.params.stripeColor}${convertOpacityToHex(this.params.stripeBackgroundOpacity)};
          border-radius: 50%;
        }

        .loadership_${this.params.loaderVersion} div:not(:nth-child(1)) {
          clip-path: ${clipPath};
          border: ${this.params.stripeWidth}px solid ${this.params.stripeColor};
          animation: loadership_${this.params.loaderVersion}_spin ${this.params.speed}s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        ${itemStyles}

        @keyframes loadership_${this.params.loaderVersion}_spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
    
    `;
    return styles;
  }
}

const loader = new LoaderStripeCircularPulseClass();
const name = 'Loader Stripe Circular Pulse';

export const LoaderStripeCircularPulse: ILoader = {
  name,
  slug: 'loader_stripe_circular_pulse',
  date: new Date('2023/11/29'),
  component: <Configurator loader={loader} name={name} />,
  preview: <Configurator loader={loader} preview />,
};

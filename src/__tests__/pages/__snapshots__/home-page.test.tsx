import Home from '@/pages/index';
import { render, screen } from '@/utils/test';

describe('it renders', () => {
  test('home', async () => {
    render(<Home />);

    const main = await screen.getByRole('main');

    expect(main).toMatchInlineSnapshot(`
      .emotion-0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        min-height: 100vh;
        background-image: linear-gradient(to bottom, #2e026d, #15162c);
      }

      .emotion-1 {
        text-align: center;
      }

      .emotion-2 {
        color: var(--chakra-colors-white);
      }

      .emotion-4 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        gap: 0.5rem;
      }

      .emotion-5 {
        color: var(--chakra-colors-white);
        font-size: var(--chakra-fontSizes-2xl);
      }

      .emotion-6 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        gap: var(--chakra-space-4);
      }

      .emotion-8 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: relative;
        white-space: nowrap;
        vertical-align: middle;
        outline: 2px solid transparent;
        outline-offset: 2px;
        line-height: 1.2;
        border-radius: var(--chakra-radii-full);
        font-weight: var(--chakra-fontWeights-medium);
        transition-property: var(--chakra-transition-property-common);
        transition-duration: var(--chakra-transition-duration-normal);
        height: var(--chakra-sizes-10);
        min-width: var(--chakra-sizes-10);
        font-size: var(--chakra-fontSizes-md);
        -webkit-padding-start: var(--chakra-space-4);
        padding-inline-start: var(--chakra-space-4);
        -webkit-padding-end: var(--chakra-space-4);
        padding-inline-end: var(--chakra-space-4);
        color: var(--chakra-colors-white);
        background: rgba(255, 255, 255, 0.1);
        padding: 0.75rem 2.5rem;
      }

      .emotion-8:focus-visible,
      .emotion-8[data-focus-visible] {
        box-shadow: var(--chakra-shadows-outline);
      }

      .emotion-8:disabled,
      .emotion-8[disabled],
      .emotion-8[aria-disabled=true],
      .emotion-8[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-8:hover,
      .emotion-8[data-hover] {
        background: rgba(255, 255, 255, 0.2);
      }

      .emotion-8:focus:not(:focus-visible) {
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-8[aria-checked=true],
      .emotion-8[data-checked] {
        background: var(--chakra-colors-gray-100);
      }

      .emotion-8:active,
      .emotion-8[data-active] {
        background: var(--chakra-colors-gray-100);
      }

      <main
        class="emotion-0"
      >
        <div
          class="emotion-1"
        >
          <h1
            class="emotion-2"
          >
            Create 
            <span
              class="emotion-2"
            >
              T3
            </span>
             App
          </h1>
          <div
            class="emotion-4"
          >
            <p
              class="emotion-5"
            >
              Loading tRPC query...
            </p>
            <div
              class="emotion-6"
            >
              <p
                class="emotion-5"
              />
              <button
                class="chakra-button emotion-8"
                type="button"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </main>
    `);
  });
});

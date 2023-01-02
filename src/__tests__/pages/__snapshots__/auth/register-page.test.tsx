import SignupPage from '@/pages/auth/register';
import { mockCsrf, render, screen } from '@/utils/test';

describe('it renders', () => {
  test('home', async () => {
    render(<SignupPage csrf={mockCsrf} />);

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
        width: 100%;
        -webkit-margin-start: auto;
        margin-inline-start: auto;
        -webkit-margin-end: auto;
        margin-inline-end: auto;
        max-width: var(--chakra-sizes-lg);
        -webkit-padding-start: 0px;
        padding-inline-start: 0px;
        -webkit-padding-end: 0px;
        padding-inline-end: 0px;
        padding-top: var(--chakra-space-12);
        padding-bottom: var(--chakra-space-12);
      }

      @media screen and (min-width: 30em) {
        .emotion-1 {
          -webkit-padding-start: var(--chakra-space-8);
          padding-inline-start: var(--chakra-space-8);
          -webkit-padding-end: var(--chakra-space-8);
          padding-inline-end: var(--chakra-space-8);
        }
      }

      @media screen and (min-width: 48em) {
        .emotion-1 {
          padding-top: var(--chakra-space-24);
          padding-bottom: var(--chakra-space-24);
        }
      }

      .emotion-2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .emotion-2>*:not(style)~*:not(style) {
        margin-top: var(--chakra-space-8);
        -webkit-margin-end: 0px;
        margin-inline-end: 0px;
        margin-bottom: 0px;
        -webkit-margin-start: 0px;
        margin-inline-start: 0px;
      }

      .emotion-3 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .emotion-3>*:not(style)~*:not(style) {
        margin-top: var(--chakra-space-6);
        -webkit-margin-end: 0px;
        margin-inline-end: 0px;
        margin-bottom: 0px;
        -webkit-margin-start: 0px;
        margin-inline-start: 0px;
      }

      .emotion-4 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        text-align: center;
        color: var(--chakra-colors-inverted);
      }

      .emotion-4>*:not(style)~*:not(style) {
        margin-top: var(--chakra-space-2);
        -webkit-margin-end: 0px;
        margin-inline-end: 0px;
        margin-bottom: 0px;
        -webkit-margin-start: 0px;
        margin-inline-start: 0px;
      }

      @media screen and (min-width: 48em) {
        .emotion-4>*:not(style)~*:not(style) {
          margin-top: var(--chakra-space-3);
        }
      }

      .emotion-5 {
        font-family: var(--chakra-fonts-heading);
        font-weight: var(--chakra-fontWeights-semibold);
      }

      @media screen and (min-width: 0em) and (max-width: 47.9375em) {
        .emotion-5 {
          font-size: var(--chakra-fontSizes-2xl);
          line-height: 2rem;
        }
      }

      @media screen and (min-width: 48em) {
        .emotion-5 {
          font-size: var(--chakra-fontSizes-3xl);
          line-height: 2.375rem;
        }
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
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .emotion-6>*:not(style)~*:not(style) {
        margin-top: 0px;
        -webkit-margin-end: 0px;
        margin-inline-end: 0px;
        margin-bottom: 0px;
        -webkit-margin-start: var(--chakra-space-1);
        margin-inline-start: var(--chakra-space-1);
      }

      .emotion-8 {
        color: var(--chakra-colors-link);
      }

      .emotion-9 {
        padding-top: 0px;
        padding-bottom: 0px;
        -webkit-padding-start: var(--chakra-space-4);
        padding-inline-start: var(--chakra-space-4);
        -webkit-padding-end: var(--chakra-space-4);
        padding-inline-end: var(--chakra-space-4);
        background: var(--chakra-colors-transparent);
        box-shadow: var(--chakra-shadows-none);
        border-radius: var(--chakra-radii-none);
      }

      @media screen and (min-width: 30em) {
        .emotion-9 {
          padding-top: var(--chakra-space-8);
          padding-bottom: var(--chakra-space-8);
          -webkit-padding-start: var(--chakra-space-10);
          padding-inline-start: var(--chakra-space-10);
          -webkit-padding-end: var(--chakra-space-10);
          padding-inline-end: var(--chakra-space-10);
          background: var(--chakra-colors-bg-surface);
          box-shadow: var(--chakra-shadows-md);
          border-radius: var(--chakra-radii-xl);
        }
      }

      .emotion-11 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .emotion-11>*:not(style)~*:not(style) {
        margin-top: var(--chakra-space-5);
        -webkit-margin-end: 0px;
        margin-inline-end: 0px;
        margin-bottom: 0px;
        -webkit-margin-start: 0px;
        margin-inline-start: 0px;
      }

      .emotion-12 {
        border: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0px;
        overflow: hidden;
        white-space: nowrap;
        position: absolute;
      }

      .emotion-13 {
        display: block;
        text-align: start;
        font-size: var(--chakra-fontSizes-sm);
        -webkit-margin-end: var(--chakra-space-3);
        margin-inline-end: var(--chakra-space-3);
        margin-bottom: var(--chakra-space-1-5);
        font-weight: var(--chakra-fontWeights-medium);
        transition-property: var(--chakra-transition-property-common);
        transition-duration: var(--chakra-transition-duration-normal);
        opacity: 1;
        color: var(--chakra-colors-emphasized);
      }

      .emotion-13:disabled,
      .emotion-13[disabled],
      .emotion-13[aria-disabled=true],
      .emotion-13[data-disabled] {
        opacity: 0.4;
      }

      [data-peer]:placeholder-shown~.emotion-13,
      .peer:placeholder-shown~.emotion-13 {
        font-size: var(--chakra-fontSizes-md);
        top: var(--chakra-space-2);
        left: var(--chakra-space-4);
      }

      .emotion-15 {
        width: 100%;
        position: relative;
      }

      .emotion-17 {
        width: 100%;
        min-width: 0px;
        outline: 2px solid transparent;
        outline-offset: 2px;
        position: relative;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        transition-property: var(--chakra-transition-property-common);
        transition-duration: var(--chakra-transition-duration-normal);
        font-size: var(--chakra-fontSizes-md);
        -webkit-padding-start: var(--chakra-space-4);
        padding-inline-start: var(--chakra-space-4);
        -webkit-padding-end: var(--chakra-space-4);
        padding-inline-end: var(--chakra-space-4);
        height: var(--chakra-sizes-10);
        border-radius: var(--chakra-radii-lg);
        border: 1px solid;
        border-color: inherit;
        background: var(--chakra-colors-white);
      }

      .emotion-17:disabled,
      .emotion-17[disabled],
      .emotion-17[aria-disabled=true],
      .emotion-17[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .emotion-17:hover,
      .emotion-17[data-hover] {
        border-color: var(--chakra-colors-gray-300);
      }

      .emotion-17[aria-readonly=true],
      .emotion-17[readonly],
      .emotion-17[data-readonly] {
        box-shadow: var(--chakra-shadows-none)!important;
        -webkit-user-select: all;
        -moz-user-select: all;
        -ms-user-select: all;
        user-select: all;
      }

      .emotion-17[aria-invalid=true],
      .emotion-17[data-invalid] {
        border-color: #E53E3E;
        box-shadow: 0 0 0 1px #E53E3E;
      }

      .emotion-17:focus-visible,
      .emotion-17[data-focus-visible] {
        z-index: 1;
        border-color: #3182ce;
        box-shadow: 0 0 0 1px #3182ce;
      }

      .emotion-17:focus,
      .emotion-17[data-focus] {
        border-color: var(--chakra-colors-brand-500);
        box-shadow: 0px 0px 0px 1px rgba(49, 130, 206, 1);
      }

      .emotion-23 {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        position: relative;
      }

      .emotion-24 {
        right: 0;
        width: var(--chakra-sizes-10);
        height: var(--chakra-sizes-10);
        font-size: var(--chakra-fontSizes-md);
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
        position: absolute;
        top: 0px;
        z-index: 2;
      }

      .emotion-25 {
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
        vertical-align: baseline;
        outline: 2px solid transparent;
        outline-offset: 2px;
        line-height: var(--chakra-lineHeights-normal);
        border-radius: var(--chakra-radii-lg);
        font-weight: var(--chakra-fontWeights-medium);
        transition-property: var(--chakra-transition-property-common);
        transition-duration: var(--chakra-transition-duration-normal);
        height: auto;
        min-width: var(--chakra-sizes-10);
        font-size: var(--chakra-fontSizes-md);
        -webkit-padding-start: var(--chakra-space-4);
        padding-inline-start: var(--chakra-space-4);
        -webkit-padding-end: var(--chakra-space-4);
        padding-inline-end: var(--chakra-space-4);
        padding: 0px;
        color: var(--chakra-colors-muted);
      }

      .emotion-25:focus-visible,
      .emotion-25[data-focus-visible] {
        box-shadow: var(--chakra-shadows-outline);
      }

      .emotion-25:disabled,
      .emotion-25[disabled],
      .emotion-25[aria-disabled=true],
      .emotion-25[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-25:hover,
      .emotion-25[data-hover] {
        -webkit-text-decoration: none;
        text-decoration: none;
        color: var(--chakra-colors-default);
      }

      .emotion-25:hover:disabled,
      .emotion-25[data-hover]:disabled,
      .emotion-25:hover[disabled],
      .emotion-25[data-hover][disabled],
      .emotion-25:hover[aria-disabled=true],
      .emotion-25[data-hover][aria-disabled=true],
      .emotion-25:hover[data-disabled],
      .emotion-25[data-hover][data-disabled] {
        background: initial;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .emotion-25:focus:not(:focus-visible) {
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-25:active,
      .emotion-25[data-active] {
        color: var(--chakra-colors-default);
      }

      .emotion-26 {
        width: 100%;
        min-width: 0px;
        outline: 2px solid transparent;
        outline-offset: 2px;
        position: relative;
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        transition-property: var(--chakra-transition-property-common);
        transition-duration: var(--chakra-transition-duration-normal);
        font-size: var(--chakra-fontSizes-md);
        -webkit-padding-start: var(--chakra-space-4);
        padding-inline-start: var(--chakra-space-4);
        -webkit-padding-end: var(--chakra-space-10);
        padding-inline-end: var(--chakra-space-10);
        height: var(--chakra-sizes-10);
        border-radius: var(--chakra-radii-lg);
        border: 1px solid;
        border-color: inherit;
        background: var(--chakra-colors-white);
      }

      .emotion-26:disabled,
      .emotion-26[disabled],
      .emotion-26[aria-disabled=true],
      .emotion-26[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .emotion-26:hover,
      .emotion-26[data-hover] {
        border-color: var(--chakra-colors-gray-300);
      }

      .emotion-26[aria-readonly=true],
      .emotion-26[readonly],
      .emotion-26[data-readonly] {
        box-shadow: var(--chakra-shadows-none)!important;
        -webkit-user-select: all;
        -moz-user-select: all;
        -ms-user-select: all;
        user-select: all;
      }

      .emotion-26[aria-invalid=true],
      .emotion-26[data-invalid] {
        border-color: #E53E3E;
        box-shadow: 0 0 0 1px #E53E3E;
      }

      .emotion-26:focus-visible,
      .emotion-26[data-focus-visible] {
        z-index: 1;
        border-color: #3182ce;
        box-shadow: 0 0 0 1px #3182ce;
      }

      .emotion-26:focus,
      .emotion-26[data-focus] {
        border-color: var(--chakra-colors-brand-500);
        box-shadow: 0px 0px 0px 1px rgba(49, 130, 206, 1);
      }

      .emotion-34 {
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
        border-radius: var(--chakra-radii-lg);
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
        background: var(--chakra-colors-brand-500);
        color: var(--chakra-colors-white);
      }

      .emotion-34:focus-visible,
      .emotion-34[data-focus-visible] {
        box-shadow: var(--chakra-shadows-outline);
      }

      .emotion-34:disabled,
      .emotion-34[disabled],
      .emotion-34[aria-disabled=true],
      .emotion-34[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-34:hover,
      .emotion-34[data-hover] {
        background: var(--chakra-colors-brand-600);
      }

      .emotion-34:hover:disabled,
      .emotion-34[data-hover]:disabled,
      .emotion-34:hover[disabled],
      .emotion-34[data-hover][disabled],
      .emotion-34:hover[aria-disabled=true],
      .emotion-34[data-hover][aria-disabled=true],
      .emotion-34:hover[data-disabled],
      .emotion-34[data-hover][data-disabled] {
        background: var(--chakra-colors-brand-500);
      }

      .emotion-34:focus:not(:focus-visible) {
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-34:active,
      .emotion-34[data-active] {
        background: var(--chakra-colors-brand-700);
      }

      <main
        class="emotion-0"
      >
        <div
          class="chakra-container emotion-1"
        >
          <div
            class="chakra-stack emotion-2"
          >
            <div
              class="chakra-stack emotion-3"
            >
              <header
                class="chakra-stack emotion-4"
              >
                <h2
                  class="chakra-heading emotion-5"
                >
                  Register a new account
                </h2>
                <div
                  class="chakra-stack emotion-6"
                >
                  <p
                    class="chakra-text emotion-7"
                  >
                    Already have an account?
                  </p>
                  <a
                    class="emotion-8"
                    href="/auth/signin"
                  >
                    Sign in
                  </a>
                </div>
              </header>
            </div>
            <div
              class="emotion-9"
            >
              <form
                class="chakra-stack emotion-3"
              >
                <div
                  class="chakra-stack emotion-11"
                >
                  <span
                    class="emotion-12"
                  >
                    <label
                      class="chakra-form__label emotion-13"
                      for="csrfToken"
                    >
                      csrfToken
                    </label>
                    <input
                      class="emotion-12"
                      name="csrfToken"
                      value="bd7939faf92607b83464e234a233121011659849469dd6c5c314f326511fca8e"
                    />
                  </span>
                  <div
                    class="chakra-form-control emotion-15"
                    role="group"
                  >
                    <label
                      class="chakra-form__label emotion-13"
                      for="name"
                      id="field-:r5:-label"
                    >
                      Name
                    </label>
                    <input
                      class="chakra-input emotion-17"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      type="text"
                    />
                  </div>
                  <div
                    class="chakra-form-control emotion-15"
                    role="group"
                  >
                    <label
                      class="chakra-form__label emotion-13"
                      for="email"
                      id="field-:r6:-label"
                    >
                      Email
                    </label>
                    <input
                      class="chakra-input emotion-17"
                      id="email"
                      name="email"
                      placeholder="you@youremail.com"
                      type="email"
                    />
                  </div>
                  <div
                    class="chakra-form-control emotion-15"
                    role="group"
                  >
                    <label
                      class="chakra-form__label emotion-13"
                      for="password"
                      id="field-:r8:-label"
                    >
                      Password
                    </label>
                    <div
                      class="chakra-input__group emotion-23"
                    >
                      <div
                        class="chakra-input__right-element emotion-24"
                      >
                        <button
                          aria-label="Reveal password"
                          class="chakra-button emotion-25"
                          type="button"
                        >
                          🟢
                        </button>
                      </div>
                      <input
                        aria-required="true"
                        class="chakra-input emotion-26"
                        id="password"
                        name="password"
                        placeholder="***********"
                        required=""
                        type="password"
                      />
                    </div>
                  </div>
                  <div
                    class="chakra-form-control emotion-15"
                    role="group"
                  >
                    <label
                      class="chakra-form__label emotion-13"
                      for="passwordConfirm"
                      id="field-:ra:-label"
                    >
                      Password
                    </label>
                    <div
                      class="chakra-input__group emotion-23"
                    >
                      <div
                        class="chakra-input__right-element emotion-24"
                      >
                        <button
                          aria-label="Reveal password"
                          class="chakra-button emotion-25"
                          type="button"
                        >
                          🟢
                        </button>
                      </div>
                      <input
                        aria-required="true"
                        class="chakra-input emotion-26"
                        id="password-confirm"
                        name="passwordConfirm"
                        placeholder="***********"
                        required=""
                        type="password"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="chakra-stack emotion-3"
                >
                  <button
                    class="chakra-button emotion-34"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    `);
  });
});

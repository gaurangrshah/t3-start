import SigninPage from '@/pages/auth/signin';
import { mockCsrf, mockProviders, render, screen } from '@/utils/test';

describe('it renders', () => {
  test('home', async () => {
    render(<SigninPage csrf={mockCsrf} providers={mockProviders} />);

    const main = await screen.getByRole('main');

    expect(main).toMatchInlineSnapshot(`
      @keyframes animation-0 {
        from {
          opacity: 0;
          stroke-dashoffset: 16;
          -webkit-transform: scale(0.95);
          -moz-transform: scale(0.95);
          -ms-transform: scale(0.95);
          transform: scale(0.95);
        }

        to {
          opacity: 1;
          stroke-dashoffset: 0;
          -webkit-transform: scale(1);
          -moz-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
        }
      }

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

      .emotion-20 {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        position: relative;
      }

      .emotion-21 {
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

      .emotion-22 {
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

      .emotion-22:focus-visible,
      .emotion-22[data-focus-visible] {
        box-shadow: var(--chakra-shadows-outline);
      }

      .emotion-22:disabled,
      .emotion-22[disabled],
      .emotion-22[aria-disabled=true],
      .emotion-22[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-22:hover,
      .emotion-22[data-hover] {
        -webkit-text-decoration: none;
        text-decoration: none;
        color: var(--chakra-colors-default);
      }

      .emotion-22:hover:disabled,
      .emotion-22[data-hover]:disabled,
      .emotion-22:hover[disabled],
      .emotion-22[data-hover][disabled],
      .emotion-22:hover[aria-disabled=true],
      .emotion-22[data-hover][aria-disabled=true],
      .emotion-22:hover[data-disabled],
      .emotion-22[data-hover][data-disabled] {
        background: initial;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .emotion-22:focus:not(:focus-visible) {
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-22:active,
      .emotion-22[data-active] {
        color: var(--chakra-colors-default);
      }

      .emotion-23 {
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

      .emotion-23:disabled,
      .emotion-23[disabled],
      .emotion-23[aria-disabled=true],
      .emotion-23[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .emotion-23:hover,
      .emotion-23[data-hover] {
        border-color: var(--chakra-colors-gray-300);
      }

      .emotion-23[aria-readonly=true],
      .emotion-23[readonly],
      .emotion-23[data-readonly] {
        box-shadow: var(--chakra-shadows-none)!important;
        -webkit-user-select: all;
        -moz-user-select: all;
        -ms-user-select: all;
        user-select: all;
      }

      .emotion-23[aria-invalid=true],
      .emotion-23[data-invalid] {
        border-color: #E53E3E;
        box-shadow: 0 0 0 1px #E53E3E;
      }

      .emotion-23:focus-visible,
      .emotion-23[data-focus-visible] {
        z-index: 1;
        border-color: #3182ce;
        box-shadow: 0 0 0 1px #3182ce;
      }

      .emotion-23:focus,
      .emotion-23[data-focus] {
        border-color: var(--chakra-colors-brand-500);
        box-shadow: 0px 0px 0px 1px rgba(49, 130, 206, 1);
      }

      .emotion-24 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .emotion-24>*:not(style)~*:not(style) {
        margin-top: 0px;
        -webkit-margin-end: 0px;
        margin-inline-end: 0px;
        margin-bottom: 0px;
        -webkit-margin-start: 0.5rem;
        margin-inline-start: 0.5rem;
      }

      .emotion-25 {
        cursor: pointer;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        vertical-align: top;
        position: relative;
      }

      .emotion-25:disabled,
      .emotion-25[disabled],
      .emotion-25[aria-disabled=true],
      .emotion-25[data-disabled] {
        cursor: not-allowed;
      }

      .emotion-26 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        vertical-align: top;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        width: var(--checkbox-size);
        height: var(--checkbox-size);
        transition-property: box-shadow;
        transition-duration: var(--chakra-transition-duration-normal);
        border: 2px solid;
        border-radius: var(--chakra-radii-base);
        border-color: inherit;
        color: var(--chakra-colors-white);
        background: var(--chakra-colors-white);
        --checkbox-size: var(--chakra-sizes-4);
      }

      .emotion-26[aria-checked=true],
      .emotion-26[data-checked] {
        background: var(--chakra-colors-brand-500);
        border-color: var(--chakra-colors-brand-500);
        color: var(--chakra-colors-white);
      }

      .emotion-26[aria-checked=true]:hover,
      .emotion-26[data-checked]:hover,
      .emotion-26[aria-checked=true][data-hover],
      .emotion-26[data-checked][data-hover] {
        background: var(--chakra-colors-brand-600);
        border-color: var(--chakra-colors-brand-600);
      }

      .emotion-26[aria-checked=true]:disabled,
      .emotion-26[data-checked]:disabled,
      .emotion-26[aria-checked=true][disabled],
      .emotion-26[data-checked][disabled],
      .emotion-26[aria-checked=true][aria-disabled=true],
      .emotion-26[data-checked][aria-disabled=true],
      .emotion-26[aria-checked=true][data-disabled],
      .emotion-26[data-checked][data-disabled] {
        border-color: var(--chakra-colors-gray-200);
        background: var(--chakra-colors-gray-200);
        color: var(--chakra-colors-gray-500);
      }

      .emotion-26:indeterminate,
      .emotion-26[aria-checked=mixed],
      .emotion-26[data-indeterminate] {
        background: var(--chakra-colors-brand-500);
        border-color: var(--chakra-colors-brand-500);
        color: var(--chakra-colors-white);
      }

      .emotion-26:disabled,
      .emotion-26[disabled],
      .emotion-26[aria-disabled=true],
      .emotion-26[data-disabled] {
        background: var(--chakra-colors-gray-100);
        border-color: var(--chakra-colors-gray-100);
      }

      .emotion-26:focus-visible,
      .emotion-26[data-focus-visible] {
        box-shadow: var(--chakra-shadows-outline);
      }

      .emotion-26[aria-invalid=true],
      .emotion-26[data-invalid] {
        border-color: var(--chakra-colors-red-500);
      }

      .emotion-28 {
        -webkit-animation: animation-0 200ms linear;
        animation: animation-0 200ms linear;
        font-size: var(--chakra-fontSizes-2xs);
        transition-property: transform;
        transition-duration: var(--chakra-transition-duration-normal);
        width: 1.2em;
      }

      .emotion-29 {
        -webkit-margin-start: 0.5rem;
        margin-inline-start: 0.5rem;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: var(--chakra-colors-muted);
        font-weight: var(--chakra-fontWeights-medium);
        font-size: var(--chakra-fontSizes-sm);
      }

      .emotion-29:disabled,
      .emotion-29[disabled],
      .emotion-29[aria-disabled=true],
      .emotion-29[data-disabled] {
        opacity: 0.4;
      }

      .emotion-30 {
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
        min-width: var(--chakra-sizes-8);
        font-size: var(--chakra-fontSizes-sm);
        -webkit-padding-start: var(--chakra-space-3);
        padding-inline-start: var(--chakra-space-3);
        -webkit-padding-end: var(--chakra-space-3);
        padding-inline-end: var(--chakra-space-3);
        padding: 0px;
        color: var(--chakra-colors-blue-600);
      }

      .emotion-30:focus-visible,
      .emotion-30[data-focus-visible] {
        box-shadow: var(--chakra-shadows-outline);
      }

      .emotion-30:disabled,
      .emotion-30[disabled],
      .emotion-30[aria-disabled=true],
      .emotion-30[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-30:hover,
      .emotion-30[data-hover] {
        -webkit-text-decoration: none;
        text-decoration: none;
        color: var(--chakra-colors-blue-700);
      }

      .emotion-30:hover:disabled,
      .emotion-30[data-hover]:disabled,
      .emotion-30:hover[disabled],
      .emotion-30[data-hover][disabled],
      .emotion-30:hover[aria-disabled=true],
      .emotion-30[data-hover][aria-disabled=true],
      .emotion-30:hover[data-disabled],
      .emotion-30[data-hover][data-disabled] {
        background: initial;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .emotion-30:focus:not(:focus-visible) {
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-30:active,
      .emotion-30[data-active] {
        color: var(--chakra-colors-blue-700);
      }

      .emotion-32 {
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

      .emotion-32:focus-visible,
      .emotion-32[data-focus-visible] {
        box-shadow: var(--chakra-shadows-outline);
      }

      .emotion-32:disabled,
      .emotion-32[disabled],
      .emotion-32[aria-disabled=true],
      .emotion-32[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-32:hover,
      .emotion-32[data-hover] {
        background: var(--chakra-colors-brand-600);
      }

      .emotion-32:hover:disabled,
      .emotion-32[data-hover]:disabled,
      .emotion-32:hover[disabled],
      .emotion-32[data-hover][disabled],
      .emotion-32:hover[aria-disabled=true],
      .emotion-32[data-hover][aria-disabled=true],
      .emotion-32:hover[data-disabled],
      .emotion-32[data-hover][data-disabled] {
        background: var(--chakra-colors-brand-500);
      }

      .emotion-32:focus:not(:focus-visible) {
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-32:active,
      .emotion-32[data-active] {
        background: var(--chakra-colors-brand-700);
      }

      .emotion-33 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
      }

      .emotion-33>*:not(style)~*:not(style) {
        margin-top: 0px;
        -webkit-margin-end: 0px;
        margin-inline-end: 0px;
        margin-bottom: 0px;
        -webkit-margin-start: 0.5rem;
        margin-inline-start: 0.5rem;
      }

      .emotion-34 {
        opacity: 1;
        border: 0;
        border-color: inherit;
        border-style: solid;
        border-bottom-width: 1px;
        width: 100%;
      }

      .emotion-35 {
        font-size: var(--chakra-fontSizes-sm);
        white-space: nowrap;
        color: var(--chakra-colors-muted);
      }

      .emotion-37 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        width: var(--chakra-sizes-full);
        margin-top: var(--chakra-space-4);
      }

      .emotion-37>*:not(style)~*:not(style) {
        -webkit-margin-start: var(--chakra-space-4);
        margin-inline-start: var(--chakra-space-4);
      }

      .emotion-38 {
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
        border: 1px solid;
        border-color: var(--chakra-colors-gray-200);
        color: var(--chakra-colors-emphasized);
        background: var(--chakra-colors-white);
        width: var(--chakra-sizes-full);
      }

      .emotion-38:focus-visible,
      .emotion-38[data-focus-visible] {
        box-shadow: var(--chakra-shadows-outline);
      }

      .emotion-38:disabled,
      .emotion-38[disabled],
      .emotion-38[aria-disabled=true],
      .emotion-38[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: var(--chakra-shadows-none);
      }

      .emotion-38:hover,
      .emotion-38[data-hover] {
        background: #000000;
      }

      .emotion-38:hover:disabled,
      .emotion-38[data-hover]:disabled,
      .emotion-38:hover[disabled],
      .emotion-38[data-hover][disabled],
      .emotion-38:hover[aria-disabled=true],
      .emotion-38[data-hover][aria-disabled=true],
      .emotion-38:hover[data-disabled],
      .emotion-38[data-hover][data-disabled] {
        background: initial;
      }

      .emotion-38:focus:not(:focus-visible) {
        box-shadow: var(--chakra-shadows-none);
      }

      .chakra-button__group[data-attached][data-orientation=horizontal]>.emotion-38:not(:last-of-type) {
        -webkit-margin-end: -1px;
        margin-inline-end: -1px;
      }

      .chakra-button__group[data-attached][data-orientation=vertical]>.emotion-38:not(:last-of-type) {
        margin-bottom: -1px;
      }

      .emotion-38:active,
      .emotion-38[data-active] {
        background: var(--chakra-colors-gray-100);
      }

      .emotion-38[aria-checked=true],
      .emotion-38[data-checked] {
        background: var(--chakra-colors-gray-100);
      }

      .emotion-38:focus,
      .emotion-38[data-focus] {
        z-index: 1;
      }

      .emotion-39 {
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
        width: var(--chakra-sizes-full);
        gap: var(--chakra-space-3);
      }

      .emotion-39>*:not(style)~*:not(style) {
        margin-top: 0px;
        -webkit-margin-end: 0px;
        margin-inline-end: 0px;
        margin-bottom: 0px;
        -webkit-margin-start: 0.5rem;
        margin-inline-start: 0.5rem;
      }

      .emotion-40 {
        width: 1em;
        height: 1em;
        display: inline-block;
        line-height: 1em;
        -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        color: currentColor;
        vertical-align: middle;
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
                  Log in to your account
                </h2>
                <div
                  class="chakra-stack emotion-6"
                >
                  <p
                    class="chakra-text emotion-7"
                  >
                    Don't have an account?
                  </p>
                  <a
                    class="emotion-8"
                    href="/auth/register"
                  >
                    Sign up
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
                      for="email"
                      id="field-:r5:-label"
                    >
                      Email
                    </label>
                    <input
                      class="chakra-input emotion-17"
                      id="email"
                      name="email"
                      placeholder="you@youremail.com"
                      type="email"
                      value="e2e@e2e.test"
                    />
                  </div>
                  <div
                    class="chakra-form-control emotion-15"
                    role="group"
                  >
                    <label
                      class="chakra-form__label emotion-13"
                      for="password"
                      id="field-:r7:-label"
                    >
                      Password
                    </label>
                    <div
                      class="chakra-input__group emotion-20"
                    >
                      <div
                        class="chakra-input__right-element emotion-21"
                      >
                        <button
                          aria-label="Reveal password"
                          class="chakra-button emotion-22"
                          type="button"
                        >
                          🟢
                        </button>
                      </div>
                      <input
                        aria-required="true"
                        autocomplete="current-password"
                        class="chakra-input emotion-23"
                        id="password"
                        name="password"
                        placeholder="***********"
                        required=""
                        type="password"
                        value="test"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="chakra-stack emotion-24"
                >
                  <label
                    class="chakra-checkbox emotion-25"
                    data-checked=""
                  >
                    <input
                      checked=""
                      class="chakra-checkbox__input"
                      style="border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; width: 1px; margin: -1px; padding: 0px; overflow: hidden; white-space: nowrap; position: absolute;"
                      type="checkbox"
                      value=""
                    />
                    <span
                      aria-hidden="true"
                      class="chakra-checkbox__control emotion-26"
                      data-checked=""
                    >
                      <div
                        class="emotion-7"
                        style="display: flex; align-items: center; justify-content: center; height: 100%;"
                      >
                        <svg
                          class="emotion-28"
                          style="fill: none; stroke-width: 2; stroke: currentColor; stroke-dasharray: 16;"
                          viewBox="0 0 12 10"
                        >
                          <polyline
                            points="1.5 6 4.5 9 10.5 1"
                          />
                        </svg>
                      </div>
                    </span>
                    <span
                      class="chakra-checkbox__label emotion-29"
                      data-checked=""
                    >
                      Remember me
                    </span>
                  </label>
                  <button
                    class="chakra-button emotion-30"
                    type="button"
                  >
                    Forgot password?
                  </button>
                </div>
                <div
                  class="chakra-stack emotion-3"
                >
                  <button
                    class="chakra-button emotion-32"
                    type="submit"
                  >
                    Sign in Now
                  </button>
                </div>
              </form>
              <div
                class="chakra-stack emotion-33"
              >
                <hr
                  aria-orientation="horizontal"
                  class="chakra-divider emotion-34"
                />
                <p
                  class="chakra-text emotion-35"
                >
                  or continue with
                </p>
                <hr
                  aria-orientation="horizontal"
                  class="chakra-divider emotion-34"
                />
              </div>
              <div
                class="chakra-button__group emotion-37"
                data-orientation="horizontal"
                role="group"
              >
                <button
                  class="chakra-button emotion-38"
                  type="button"
                >
                  <div
                    class="chakra-stack emotion-39"
                  >
                    <svg
                      class="chakra-icon emotion-40"
                      focusable="false"
                      viewBox="0 0 24 24"
                    >
                      <g
                        transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"
                      >
                        <path
                          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                          fill="#34A853"
                        />
                        <path
                          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                          fill="#EA4335"
                        />
                      </g>
                    </svg>
                    <p
                      class="chakra-text emotion-7"
                    >
                      Sign in with Google
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    `);
  });
});

# Create T3 App

- [x] add .nvmrc

  ```shell
  node -v > .npmrc
  ```

- [x] add .npmrc

- [ ] add + configure: jest + testing library + cypress

- [x] add + configure prettier

- [x] add types for react, node and typescript

- [x] add + configure [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)

- [x] add + configure [next-seo](https://github.com/garmeeh/next-seo) 

- [x] configure [next-auth](https://next-auth.js.org/getting-started/example)

  - [x] setup protected routes (pages + api)
  - [x] setup auth-middleware
  - [ ] (*<u>optional</u>*) add [nodemailer](https://next-auth.js.org/getting-started/upgrade-v4#nodemailer)

- [ ] (<u>*optional*</u>) add + configure [next-share](https://github.com/Bunlong/next-share)

- [x] [implement chakra-ui](https://chakra-ui.com/getting-started/nextjs-guide)

  > ```shell
  > yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6 @chakra-ui/icons @chakra-ui/theme-tools
  > ```

  - [ ] [add fonts](https://chakra-ui.com/community/recipes/using-fonts)

    ```shell
    yarn add @fontsource/open-sans @fontsource/raleway
    ```

  - [x] [configure chakra theme](https://chakra-ui.com/docs/styled-system/customize-theme)

    - [x] add base components

    - [ ] add layout

    - [x] add chakra-skip-nav
    - [ ] (<u>*optional*</u>) add color2k

- [ ] implement custom event-bus

- [ ] add [analytics](https://github.com/DavidWells/analytics) handling

     - [ ] @analytics/cookie-utils
     - [ ] @analytics/mixpanel
     - [ ] @vercel/analytics
     - [ ] add consent handling
     - [ ] configure consent handling

     

- [ ] add react-hook-form + @hook-form/resolvers
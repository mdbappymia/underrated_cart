# MyShop

A React Native e-commerce app built with Expo, Expo Router, and NativeWind.

## Overview

This project is a mobile shopping app with:

- Expo Router-based file routing
- NativeWind for utility-first styling
- tab-based navigation for Home, Cart, Notifications, and Profile
- authentication context and product/cart state management
- product browsing, search, filter, and cart flows

## Tech Stack

- React Native
- Expo SDK 57
- Expo Router
- NativeWind v4
- TypeScript
- React Native Reanimated
- Expo Secure Store
- @react-native-community/slider

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (optional, the project can run via npx expo)
- Android Studio / Xcode for device simulators (optional)

## Installation

```bash
npm install
```

## Run the app

Start the development server:

```bash
npx expo start
```

Run on a platform:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

## Scripts

```bash
npm start
npm run android
npm run ios
npm run web
```

## NativeWind setup

This project uses NativeWind with Expo Router and a src-based app structure.

Key files:

- `babel.config.js`
- `metro.config.js`
- `tailwind.config.js`
- `src/global.css`
- `src/app/_layout.tsx`

## App flow

- Starter screen launches the app
- Login screen is the default auth entry
- Home, Cart, Notifications, and Profile are tab screens
- Product detail, search, and filter screens are also routed from the app

## Notes

- The app uses file-based routing from Expo Router.
- The cart and filter states are managed through the shared auth/product context.
- Web bundle validation is supported with:

```bash
npx expo export --platform web
```

## License

This project is licensed under the MIT License.

import Store from 'electron-store';

const config = {
  onBoardingScreenSeen: false,
};

export const store = new Store({ defaults: config });

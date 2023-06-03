const getOnboardingScreenConfigValue = async () => {
  let onBoardingScreenSeen: any;

  const onBoardingPromise = new Promise((resolve) => {
    window.electron.ipcRenderer.once('get-storage', (args) => {
      onBoardingScreenSeen = args;
      resolve(onBoardingScreenSeen);
    });
  });

  window.electron.ipcRenderer.sendMessage(
    'get-storage',
    'onBoardingScreenSeen'
  );

  const result = await onBoardingPromise;
  return result;
};

export default getOnboardingScreenConfigValue;

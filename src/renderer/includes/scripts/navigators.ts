export const navigateTo = (url: string) => {
  location.href = url;
};

export const navigateToConverter = () => {
  navigateTo('/convert');
};


export const navigateToDownloader = () => {
  navigateTo('/search');
};

export const navigateToSupport = () => {
  navigateTo('/support');
};

export const navigateToSettings = () => {
  navigateTo('/settings');
};


export const navigateToRemover = () => {
  navigateTo('/remover');
};


export const navigateToGenerator = () => {
  navigateTo('/generate');
};


export const navigateToShrinker = () => {
  navigateTo('/shrink');
};


export const navigateToHome = () => {
  navigateTo('/');
};



export const navigateToResizer = () => {
  navigateTo('/resize');
};


export const navigateToGithubProfile = (): void =>{
  window.open("https://github.com/Adedoyin-Emmanuel");
}

export const navigateToGithubProject = (): void => {
  window.open('https://github.com/Adedoyin-Emmanuel/FotoGraph');
};





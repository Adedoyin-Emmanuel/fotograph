import React from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppWelcome from 'renderer/components/common/Welcome';
import registerOnboardingScreen from 'renderer/utils/registers';

const Home: React.FC = (): JSX.Element => {
  registerOnboardingScreen();
  return (
    <React.Fragment>
      <AppLayout className="">
        <AppWelcome />
      </AppLayout>
    </React.Fragment>
  );
};

export default Home;

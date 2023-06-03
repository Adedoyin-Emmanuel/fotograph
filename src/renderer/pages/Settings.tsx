import React from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';

const Settings = (): JSX.Element => {
  return (
    <React.Fragment>
      <AppLayout
        className="app-content-scroll app-content-flex flex-column app-scroll-not-horizontal"
        onSettingsPage={true}
      >
        <section className="settings-container d-flex align-items-start justify-content-start flex-column mx-4 w-100">
          <AppHeader className="text-capitalize my-3">Settings</AppHeader>
          <p className="text-muted text-capitalize">change application settings</p>
        </section>
        <section className="all-settings d-flex align-items-start justify-content-start flex-column mx-3  w-100 my-4">
          <AppButton className="brand-button-outline width-toggle-1">
            restore factory settings
          </AppButton>
        </section>
      </AppLayout>
    </React.Fragment>
  );
};

export default Settings;

import React from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import Swal from 'sweetalert2';
import { Form } from 'react-bootstrap';
const Settings = (): JSX.Element => {
  const handleRestoreFactorySettingClick = () => {};
  const handleMaxPictureToDownload = () =>{

  };

  const handleSafeSearchToggle = () =>{

  };
  return (
    <React.Fragment>
      <AppLayout
        className="app-content-scroll app-content-flex flex-column app-scroll-not-horizontal"
        onSettingsPage={true}
      >
        <section className="settings-container d-flex align-items-start justify-content-start flex-column mx-4 w-100">
          <AppHeader className="text-capitalize my-3">Settings</AppHeader>
        </section>
        <section className="all-settings d-flex align-items-start justify-content-start flex-column mx-3  w-100 my-4">
          <p className="text-capitalize text-muted brand-small-text-2 text-break width-toggle">
            clear the data stored by{' '}
            <span className="brand-primary-text fw-bold">Fotograph</span>
          </p>
          <AppButton className="brand-button-outline width-toggle-1">
            restore factory settings
          </AppButton>

          <section className="max-downlaod-files my-5">
            <h5 className="text-capitalize fw-bold brand-white-text my-3">
              max number of downloads
            </h5>
            <p className="text-capitalize text-muted brand-small-text-2">
              select the max amount of files to download for bulk downloads
            </p>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="max amount"
                className="brand-small-text-2 width-input brand-white-text p-3"
                defaultValue={'30'}
              ></Form.Control>
            </Form.Group>
          </section>
          <AppButton className="brand-button-outline width-toggle-1">
            restore factory settings
          </AppButton>
          <section className="spacer my-3 py-2"></section>
          <section className="safe-searching">
            <h5 className="text-capitalize fw-bold brand-white-text my-3">
              Safe search
            </h5>
            <Form.Label className="text-capitalize text-muted brand-small-text-2">
              turn on safe search to ensure images suitable for all ages should
              be returned
            </Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              className="fs-4"
              checked={true}
            ></Form.Check>
          </section>
        </section>
      </AppLayout>
    </React.Fragment>
  );
};

export default Settings;

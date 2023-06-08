import React, { useRef } from 'react';
import AppLayout from 'renderer/components/layouts/AppLayout';
import AppHeader from 'renderer/components/common/Header';
import AppButton from 'renderer/components/common/Button';
import Swal from 'sweetalert2';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import db from 'renderer/backend/local-storage/db';
import { setData } from 'renderer/backend/apis/electron-storage/db';

const Settings = (): JSX.Element => {
  const navigateTo = useNavigate();
  let safeSearchValue = db.get('FOTOGRAPH_SAFE_SEARCH_VALUE');
  let safeSearchValueCheck = safeSearchValue == 'true' ? true : false;
  const safeSearchToggleRef = useRef<any>();
  const inputRef = useRef<any>();

  const handleRestoreFactorySettingClick = () => {
    window.electron.ipcRenderer.sendMessage('clear-storage', {});
    db.destroy();
    window.electron.ipcRenderer.on(
      'storage-cleared-succesfully',
      (event, args) => {
        window.electron.ipcRenderer.sendMessage('show-notification', {
          title: 'Storage Cleared',
          text: 'Storage has been successfully cleared!',
        });

        setTimeout(() => {
          navigateTo('/');
        }, 1000);
      }
    );
  };
  const handleMaxPictureToDownload = () => {
    let maxPictures = inputRef.current.value;
    db.create('FOTOGRAPH_MAX_DOWNLOAD_PICTURES', maxPictures);
    setData({
      FOTOGRAPH_MAX_DOWNLOAD_PICTURES: parseInt(maxPictures),
    });
    window.electron.ipcRenderer.sendMessage('show-notification', {
      title: 'Settings',
      text: 'Settings updated successfully!',
    });

    setTimeout(() => {
      location.reload();
    }, 1500);
  };
  const turnOnSafeSearch = () => {
    if (safeSearchToggleRef.current.checked) {
      //check if the value is in the database, then update it
      if (db.get('FOTOGRAPH_SAFE_SEARCH_VALUE')) {
        db.update('FOTOGRAPH_SAFE_SEARCH_VALUE', 'true');

        window.electron.ipcRenderer.sendMessage('show-notification', {
          title: 'Safe Search',
          text: 'Save search settings updated!',
        });
      } else {
        db.create('FOTOGRAPH_SAFE_SEARCH_VALUE', 'true');

        window.electron.ipcRenderer.sendMessage('show-notification', {
          title: 'Safe Search',
          text: 'Safe search turned on!',
        });
      }
    } else {
      if (db.get('FOTOGRAPH_SAFE_SEARCH_VALUE')) {
        db.update('FOTOGRAPH_SAFE_SEARCH_VALUE', 'false');

        window.electron.ipcRenderer.sendMessage('show-notification', {
          title: 'Safe Search',
          text: 'Save search not turned on!',
        });
      }
    }
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
          <AppButton
            className="brand-button-outline width-toggle-1"
            onClick={handleRestoreFactorySettingClick}
          >
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
                defaultValue={
                  parseInt(db.get('FOTOGRAPH_MAX_DOWNLOAD_PICTURES')) || '30'
                }
                ref={inputRef}
              ></Form.Control>
            </Form.Group>
          </section>
          <AppButton
            className="brand-button-outline width-toggle-1"
            onClick={handleMaxPictureToDownload}
          >
            update
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
              onChange={turnOnSafeSearch}
              defaultChecked={safeSearchValueCheck}
              ref={safeSearchToggleRef}
            ></Form.Check>
          </section>
        </section>
      </AppLayout>
    </React.Fragment>
  );
};

export default Settings;

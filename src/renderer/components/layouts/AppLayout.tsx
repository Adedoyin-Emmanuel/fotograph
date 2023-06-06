import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRecycle,
  faEraser,
  faMagnifyingGlass,
  faGear,
  faGift,
  faMinimize,
  faCompress,
  faBoltLightning,
} from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface AppLayout {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
  others?: any;
  onConverterPage?: boolean;
  onDownloadPage?: boolean;
  onGeneratorPage?: boolean;
  onRemoverPage?: boolean;
  onResizerPage?: boolean;
  onSettingsPage?: boolean;
  onShrinkerPage?: boolean;
  onSupportPage?: boolean;
}

const AppLayout = ({
  children,
  className,
  others,
  onConverterPage,
  onDownloadPage,
  onGeneratorPage,
  onRemoverPage,
  onResizerPage,
  onSettingsPage,
  onShrinkerPage,
  onSupportPage,
}: AppLayout): JSX.Element => {
  return (
    <React.Fragment>
      <section
        className={`sidenav-container d-flex align-items-center justify-content-around`}
        {...others}
      >
        <section className="icons-container d-flex flex-column justify-content-around shadow p-3 h-100 ">
          <OverlayTrigger
            key="convert-right"
            placement="right"
            trigger={['hover', 'focus']}
            overlay={
              <Tooltip
                className="brand-tooltip text-capitalize"
                id={`tooltip-top`}
              >
                Convert images
              </Tooltip>
            }
          >
            <Link to="/convert">
              <FontAwesomeIcon
                icon={faRecycle}
                className={`${
                  onConverterPage ? 'brand-primary-text' : 'text-muted-layout'
                } icons`}
                size="xl"
              />
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            key="remove-right"
            placement="right"
            trigger={['hover', 'focus']}
            overlay={
              <Tooltip
                className="brand-tooltip text-capitalize"
                id={`tooltip-top`}
              >
                Remove background
              </Tooltip>
            }
          >
            <Link to="/remove">
              <FontAwesomeIcon
                icon={faEraser}
                className={`${
                  onRemoverPage ? 'brand-primary-text' : 'text-muted-layout'
                } icons`}
                size="xl"
              />
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            key="search-right"
            placement="right"
            trigger={['hover', 'focus']}
            overlay={
              <Tooltip
                className="brand-tooltip text-capitalize"
                id={`tooltip-top`}
              >
                Search images
              </Tooltip>
            }
          >
            <Link to="/download">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`${
                  onDownloadPage ? 'brand-primary-text' : 'text-muted-layout'
                } icons`}
                size="xl"
              />
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            key="scale-right"
            placement="right"
            trigger={['hover', 'focus']}
            overlay={
              <Tooltip
                className="brand-tooltip text-capitalize"
                id={`tooltip-top`}
              >
                scale images
              </Tooltip>
            }
          >
            <Link to="/resize">
              <FontAwesomeIcon
                icon={faMinimize}
                className={`${
                  onResizerPage ? 'brand-primary-text' : 'text-muted-layout'
                } icons`}
                size="xl"
              />
            </Link>
          </OverlayTrigger>

          <OverlayTrigger
            key="compress-right"
            placement="right"
            trigger={['hover', 'focus']}
            overlay={
              <Tooltip
                className="brand-tooltip text-capitalize"
                id={`tooltip-top`}
              >
                compress images
              </Tooltip>
            }
          >
            <Link to="/compress">
              <FontAwesomeIcon
                icon={faCompress}
                className={`${
                  onShrinkerPage ? 'brand-primary-text' : 'text-muted-layout'
                } icons`}
                size="xl"
              />
            </Link>
          </OverlayTrigger>

          <OverlayTrigger
            key="generate-right"
            placement="right"
            trigger={['hover', 'focus']}
            overlay={
              <Tooltip
                className="brand-tooltip text-capitalize"
                id={`tooltip-top`}
              >
                generate images
              </Tooltip>
            }
          >
            <Link to="/generate">
              <FontAwesomeIcon
                icon={faBoltLightning}
                className={`${
                  onGeneratorPage ? 'brand-primary-text' : 'text-muted-layout'
                } icons`}
                size="xl"
              />
            </Link>
          </OverlayTrigger>

          <OverlayTrigger
            key="settings-right"
            placement="right"
            trigger={['hover', 'focus']}
            overlay={
              <Tooltip
                className="brand-tooltip text-capitalize"
                id={`tooltip-top`}
              >
                settings
              </Tooltip>
            }
          >
            <Link to="/settings">
              <FontAwesomeIcon
                icon={faGear}
                className={`${
                  onSettingsPage ? 'brand-primary-text' : 'text-muted-layout'
                } icons`}
                size="xl"
              />
            </Link>
          </OverlayTrigger>

          <OverlayTrigger
            key="support-right"
            placement="right"
            trigger={['hover', 'focus', 'click']}
            overlay={
              <Tooltip
                className="brand-tooltip text-capitalize"
                id={`tooltip-top`}
              >
                support
              </Tooltip>
            }
          >
            <Link to="/support">
              <FontAwesomeIcon
                icon={faGift}
                className={`${
                  onSupportPage ? 'brand-primary-text' : 'text-muted-layout'
                } icons`}
                size="xl"
              />
            </Link>
          </OverlayTrigger>
        </section>

        <section
          className={`app-content-container d-flex align-items-center justify-content-center ${className}`}
        >
          {children && children}
        </section>
      </section>
    </React.Fragment>
  );
};

export default AppLayout;

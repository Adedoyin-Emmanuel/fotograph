import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faFolder,
  faArrowRight,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  checkStringLength,
  convertBytesToKb,
} from 'renderer/includes/scripts/customScript';

interface AppFileCollectionProps {
  className?: string;
  fileName: string;
  fileSize: number;
  conversionStatus?: number;
  others?: any;
  onCancel: (index: any) => MouseEvent;
  compressionDetails?: any;
}

const AppFileCollection = ({
  className,
  others,
  fileSize,
  fileName,
  conversionStatus,
  onCancel,
  compressionDetails,
}: AppFileCollectionProps): JSX.Element => {
  let fileConversionStatus;

  /*checking file conversion status */
  switch (conversionStatus) {
    case 200:
      fileConversionStatus = 'brand-outline-success';
      break;

    case 500:
      fileConversionStatus = 'brand-outline-fail';
      break;

    default:
      fileConversionStatus = '';
  }

  return (
    <React.Fragment>
      <section
        className={`file-collection w-100 brand-tooltip-color ${fileConversionStatus} rounded-3 shadow-sm d-flex align-items-start justify-content-center flex-column ${className} p-2`}
        {...others}
      >
        <section className="file-header row w-100 my-1 align-items-center">
          <section className="file-icon col-1">
            <FontAwesomeIcon icon={faFolder} size="lg" className="text-muted" />
          </section>
          <section className="file-body col-10">
            <p className="file-name brand-small-text text-capitalize brand-white-text m-0 py-1">
              {fileName && checkStringLength(fileName, 30)}
            </p>
            <p className="file-size m-0 brand-white-text brand-small-text-2">
              {fileSize && convertBytesToKb(fileSize)} {'KB'}{' '}
              {compressionDetails && (
                <>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="px-1 text-info"
                  />
                  <span className="text-white brand-small-text-2 fw-bold">
                    {compressionDetails.size}{' '}
                    <span className="text-info">KB</span>
                  </span>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="px-2 text-danger"
                  />
                  <span className="text-success brand-small-text-2 fw-bold">
                    {compressionDetails.percentage}%
                  </span>
                </>
              )}
              <span className="brand-white-text brand-small-text-2"></span>
            </p>
          </section>

          <section
            className="remove-file col-1 d-flex align-items-center justify-content-center
          p-1"
            onClick={onCancel}
          >
            <FontAwesomeIcon icon={faXmark} size="lg" className="text-danger" />
          </section>
        </section>

        <section className="converting-to"></section>
      </section>
    </React.Fragment>
  );
};

export default AppFileCollection;

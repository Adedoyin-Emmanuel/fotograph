import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal, { SweetAlertResult } from 'sweetalert2';
import {
  faRotateRight,
  faRotateLeft,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ReactCrop, { type Crop } from 'react-image-crop';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DemoImage from './../../../../assets/Emmanuel.png';
import db from 'renderer/backend/local-storage/db';
interface AppImageResizerProps {}

const AppImageResizer: React.FC = (): JSX.Element => {
  const [crop, setCrop] = useState<Crop | any>();
  const imgRef = useRef<any>(null);
  const [imageURL, setImageURL] = useState<any>();
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);

  const [imageLoaded, setImageLoaded] = useState(false);

  const renderTooltip = (tooltipText: string) => (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );
  useEffect(() => {
    const handleImageLoad = () => {
      setImageLoaded(true);
      setImageHeight(imgRef.current.height);
      setImageWidth(imgRef.current.width);
    };

    const imageElement = imgRef.current;
    if (imageElement && !imageLoaded) {
      imageElement.addEventListener('load', handleImageLoad);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener('load', handleImageLoad);
        // try {
        //   console.log(imageElement.current.height);
        //   console.log(imageElement.current.width);
        // } catch (error: any) {}
      }
    };

    console.log(imgRef);
  }, [imageLoaded]);

  const handleImageBrightnessChange = async (
    e: FormEvent<HTMLInputElement> | any
  ) => {
    const fileReader = new FileReader();
    const canvas = getCroppedCanvas();
    const croppedFile = await canvasToFile(canvas, 'cropped-image.png');

    const blob = croppedFile as Blob;
    const file = blob;

    fileReader.onload = (event: any) => {
      const fileData = event.target.result;
      const values = {
        file: fileData,
        brightnessValue: e.target.value,
      };
      window.electron.ipcRenderer.sendMessage('adjust-brightness', values);
    };

    fileReader.readAsArrayBuffer(file);

    window.electron.ipcRenderer.on('brightness-adjust-error', (event, data) => {
      Swal.fire({
        toast: true,
        text: `Couldn't adjust image brightness`,
        position: 'top-right',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
      });
    });
    window.electron.ipcRenderer.on('image-brightned', (event: any, data) => {
      const imageBlob = new Blob([event], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageURL(imageUrl);
    });
  };

  /*we reset the image to normal and remove all operations */
  const handleCancelClick = () => {
    setImageURL(db.get('FOTOGRAPH_TEMP_BLOB'));
  };

  const handleImageRotationAngleChange = async (
    e: FormEvent<HTMLInputElement> | any
  ) => {
    const fileReader = new FileReader();
    const canvas = getCroppedCanvas();
    const croppedFile = await canvasToFile(canvas, 'cropped-image.png');

    const blob = croppedFile as Blob;
    const file = blob;

    fileReader.onload = (event: any) => {
      const fileData = event.target.result;
      const values = {
        file: fileData,
        rotationAngle: e.target.value,
      };

      window.electron.ipcRenderer.sendMessage('rotate-image', values);
    };

    fileReader.readAsArrayBuffer(file);

    window.electron.ipcRenderer.on('image-rotated', (event: any, data) => {
      const imageBlob = new Blob([event], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageURL(imageUrl);
    });

    window.electron.ipcRenderer.on('rotate-image-error', (event: any, data) => {
      Swal.fire({
        toast: true,
        text: event || `Couldn't adjust image brightness`,
        position: 'top-right',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
      });
    });
  };

  const handleClick = () => {
    handleCropComplete();
  };

  const handleCropComplete = async () => {
    const canvas = getCroppedCanvas();
    const croppedFile = await canvasToFile(canvas, 'cropped-image.png');
    const blob = croppedFile as Blob;

    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'cropped-image.png';
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  };

  const getCroppedCanvas = () => {
    const imageElement = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = imageElement.naturalWidth / imageElement.width;
    const scaleY = imageElement.naturalHeight / imageElement.height;
    const customImage = {
      width: imgRef.current.width,
      height: imgRef.current.height,
      x: 0,
      y: 0,
    };
    const { width, height, x, y } = crop || customImage;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      imageElement,
      x * scaleX,
      y * scaleY,
      width * scaleX,
      height * scaleY,
      0,
      0,
      width,
      height
    );

    return canvas;
  };

  const canvasToFile = (canvas: HTMLCanvasElement, fileName: string) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob: Blob | any) => {
          const file = new File([blob], fileName, { type: 'image/png' });
          resolve(file);
        },
        'image/png',
        1
      );
    });
  };

  const handleFlip = async (direction: string) => {
    const fileReader = new FileReader();
    const canvas = getCroppedCanvas();
    const croppedFile = await canvasToFile(canvas, 'cropped-image.png');
    const blob = croppedFile as Blob;
    const file = blob;

    fileReader.onload = (event: any) => {
      const fileData = event.target.result;
      const values = {
        file: fileData,
        direction: direction,
      };
      const flipEvent =
        direction === 'right' ? 'flip-right-success' : 'flip-left-success';
      window.electron.ipcRenderer.sendMessage('flip-image', values);
      window.electron.ipcRenderer.on(flipEvent, (event: any, data) => {
        const imageBlob = new Blob([event], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageURL(imageUrl);
      });
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleFlipRight = () => {
    handleFlip('right');
  };

  const handleFlipLeft = () => {
    handleFlip('left');
  };
  const handleResizeButtonClick = () => {
    handleImageResize(imageWidth, imageHeight);
  };
  const handleImageHeightChange = (
    event: FormEvent<HTMLInputElement> | any
  ) => {
    const inputValue = event.target.value;
    setImageHeight(inputValue);
  };

  const handleImageWidthChange = (event: FormEvent<HTMLInputElement> | any) => {
    const inputValue = event.target.value;

    setImageWidth(inputValue);
  };

  const arrayBufferToDataURL = (arrayBuffer: any) => {
    const uint8Array = new Uint8Array(arrayBuffer);
    let binaryString = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binaryString += String.fromCharCode(uint8Array[i]);
    }
    const base64String = btoa(binaryString);
    const dataURL = `data:image/png;base64,${base64String}`;
    return dataURL;
  };
  const handleImageResize = async (
    width: number = imageWidth,
    height: number = imageHeight
  ) => {
    const fileReader = new FileReader();
    const canvas = getCroppedCanvas();
    const croppedFile = await canvasToFile(canvas, 'cropped-image.png');
    const blob = croppedFile as Blob;
    const file = blob;

    fileReader.onload = (event: any) => {
      const fileData = event.target.result;
      const values = {
        file: fileData,
        width: width,
        height: height,
      };
      window.electron.ipcRenderer.sendMessage('resize-image', values);
    };

    fileReader.readAsArrayBuffer(file);

    const handleImageResized = (event: any) => {
      const imageBlob = new Blob([event], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageURL(imageUrl);
    };

    const handleResizeImageError = (event: any, data: any) => {
      console.log(event);
      const errorMessage =
        event === '0-arguments'
          ? 'Width or Height cannot be 0'
          : 'Resize Error';
      Swal.fire({
        toast: true,
        text: errorMessage,
        position: 'top-right',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
      });
    };

    window.electron.ipcRenderer.on('image-resized', handleImageResized);
    window.electron.ipcRenderer.on(
      'resize-image-error',
      handleResizeImageError
    );
  };

  const handleFileUpload = (e: any) => {
    e.preventDefault();

    const file = e?.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event: any) => {
      const fileData = event.target.result;
      const blob = arrayBufferToDataURL(fileData);
      setImageURL(blob);
      db.create('FOTOGRAPH_TEMP_BLOB', blob);
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <React.Fragment>
      <form className="app-image-resizer w-100 row">
        {imageURL && (
          <section className="app-image-resizer-control-panel col-3">
            <section className="resize-section mx-4">
              <section className="image-height-width row my-3">
                <Form.Group controlId="image-height" className="col-6">
                  <Form.Control
                    type="number"
                    defaultValue={imageLoaded && imgRef.current.height}
                    placeholder="height"
                    className="brand-small-text-2 height-input brand-white-text"
                    onChange={handleImageHeightChange}
                  />
                </Form.Group>

                <Form.Group controlId="image-width" className="col-6">
                  <Form.Control
                    type="number"
                    defaultValue={imageLoaded && imgRef.current.width}
                    name="image-width"
                    placeholder="width"
                    className="brand-small-text-2 width-input brand-white-text"
                    onChange={handleImageWidthChange}
                  ></Form.Control>
                </Form.Group>
              </section>

              <section className="image-aspect-ratio w-100">
                <Button
                  className="text-capitalize brand-small-text-2 btn-lg brand-primary-color border-0 my-3"
                  onClick={handleResizeButtonClick}
                >
                  scale images
                </Button>
              </section>
            </section>

            <section className="rotate-flip mx-4 my-5 d-flex  justify-content-around flex-column">
              <section className="rotate-and-flip d-flex align-items-start justify-content-start">
                <p className="text-start brand-white-text brand-small-text">
                  Rotate and Flip
                </p>
              </section>
              <section className="rotate-flip-icons d-flex align-items-center justify-content-between w-100 my-3">
                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip('Flip image left')}
                >
                  <section
                    className="rotate-icon-left brand-tooltip-color p-1 rounded shadow-sm rotate-icons d-flex align-items-center justify-content-center"
                    onClick={handleFlipLeft}
                  >
                    <FontAwesomeIcon
                      icon={faRotateLeft}
                      size="1x"
                      className="text-light"
                    />
                  </section>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip('Reset ')}
                >
                  <section
                    className="cancel-icon brand-tooltip-color p-1 rounded shadow-sm rotate-icons d-flex align-items-center justify-content-center"
                    onClick={handleCancelClick}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      size="1x"
                      className="text-danger"
                    />
                  </section>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={renderTooltip('Flip image right')}
                >
                  <section
                    className="rotate-icon-right brand-tooltip-color p-1 rounded shadow-sm rotate-icons d-flex align-items-center justify-content-center"
                    onClick={handleFlipRight}
                  >
                    <FontAwesomeIcon
                      icon={faRotateRight}
                      size="1x"
                      className="text-light"
                    />
                  </section>
                </OverlayTrigger>
              </section>

              <section className="rotate-flip-straightening my-3">
                <Form.Group>
                  <Form.Label className="text-capitalize brand-small-text-2 text-muted">
                    Rotation
                  </Form.Label>
                  <Form.Range
                    className="custom-range"
                    onChange={(e) => {
                      handleImageRotationAngleChange(e);
                    }}
                    defaultValue={0}
                    min={-360}
                    max={360}
                    step={90}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-capitalize brand-small-text-2 text-muted">
                    brightness
                  </Form.Label>
                  <Form.Range
                    className="custom-range"
                    onChange={(e) => {
                      handleImageBrightnessChange(e);
                    }}
                    min={0}
                    defaultValue={1}
                    step={0.01}
                    max={5}
                  />
                </Form.Group>

                <section className="app-image-resizer-action-buttons d-flex align-items-center justify-content-start my-4">
                  <Button
                    className="text-capitalize brand-small-text-2 btn-lg brand-primary-color border-0"
                    onClick={handleClick}
                  >
                    save changes
                  </Button>
                </section>
              </section>
            </section>
          </section>
        )}

        <section className="app-image-resizer-image col-7 d-flex align-items-center justify-content-center photo-editor rounded-3 mx-5">
          {!imageURL && (
            <section className="file-zone-text my-3">
              <label className="brand-primary-color btn text-light border-0 btn-lg text-center brand-small-text click-to-upload text-capitalize">
                <input
                  type="file"
                  id="file_uploaded"
                  name="files"
                  className=""
                  hidden
                  onChange={(e: FormEvent) => {
                    handleFileUpload(e);
                  }}
                />
                Upload image
              </label>{' '}
            </section>
          )}
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            {imageURL ? (
              <img src={imageURL} className="img-fluid" ref={imgRef} />
            ) : (
              <></>
            )}
          </ReactCrop>
        </section>
        <section className="col-1"></section>

        <section className="spacer my-5 py-4"></section>
      </form>
    </React.Fragment>
  );
};

export default AppImageResizer;

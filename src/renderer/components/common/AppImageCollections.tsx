import React from 'react';
import AppCollectionPack from './AppCollectionPack';
import { handleImageDownload } from 'renderer/backend/apis/search-images/search-images';

export interface AppCollectionPackProps {
  title?: string;
  total?: number;
  previewPhotoOne?: string;
  previewPhotoTwo?: string;
  previewPhotoThree?: string;
  user?: string;
  id?: number | string;
  altDescription?: string;
  results?: any;
}

export const handleFileDownload = (
  id: number | string,
  total: number,
  perPage: number | string,
  title: string,
  user: string,
  source: number
) => {
  handleImageDownload(id, total, perPage, title, user, source);
};

/* This image collection is for the unsplash API */
export const ImageCollection: React.FC<{
  results: AppCollectionPackProps[];
}> = ({ results }) => {
  return (
    <>
      {results.map((data: any) => {
        const { id, title, total_photos, preview_photos, user, cover_photo } =
          data;

        return (
          <AppCollectionPack
            key={id}
            title={title}
            total={total_photos}
            previewPhotoOne={preview_photos[0]?.urls.small}
            previewPhotoTwo={preview_photos[1]?.urls.small}
            previewPhotoThree={preview_photos[2]?.urls.small}
            user={user.username}
            id={id}
            altDescription={cover_photo.alt_description}
            coverPhotoId={cover_photo.id}
            onDownloadButtonClick={() => {
              handleFileDownload(id, total_photos, 30, title, user.username, 0);
            }}
          />
        );
      })}
    </>
  );
};

/*This image collection is for the pixabay API*/
export const ImageCollection2 = ({ results }: AppCollectionPackProps) => {
  const { total, hits = [] } = results || {};
  return (
    <>
      {hits.map((data: any) => {
        const { id, tags, webformatURL, user } = data;
        return (
          <AppCollectionPack
            key={id}
            title={tags}
            total={total}
            previewPhotoOne={webformatURL}
            previewPhotoTwo={webformatURL}
            previewPhotoThree={webformatURL}
            user={user}
            id={id}
            altDescription={tags}
            coverPhotoId={id}
            onDownloadButtonClick={() => {
              handleFileDownload(id, total, 30, tags, user, 1);
            }}
          />
        );
      })}
    </>
  );
};

/*This image collection is for the pexels API*/
export const ImageCollection3 = ({ results }: AppCollectionPackProps) => {
  const { total_results, photos = [] } = results || {};
  return (
    <>
      {photos.map((data: any) => {
        const { id, alt, src, photographer } = data;
        return (
          <AppCollectionPack
            key={id}
            title={alt}
            total={total_results}
            previewPhotoOne={src.medium}
            previewPhotoTwo={src.medium}
            previewPhotoThree={src.medium}
            user={photographer}
            id={id}
            altDescription={alt}
            coverPhotoId={id}
            onDownloadButtonClick={() => {
              handleFileDownload(id, total_results, 30, alt, photographer, 2);
            }}
          />
        );
      })}
    </>
  );
};

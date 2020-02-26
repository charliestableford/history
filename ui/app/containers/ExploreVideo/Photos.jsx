import React from 'react';
import PhotoListItem from './PhotoListItem';

export default function PhotoList(props) {
  const {
    onPhotoSelect,
    photos,
  } = props;
  // map through the youtube videos and pass the props to the child component. Many youtube videos then we pass one video at a time.
  const photoItems = photos.map((photo, index) => <PhotoListItem index={index} onPhotoSelect={onPhotoSelect} photo={photo} />);

  return (
    <nav id="photo-list">
      {photoItems}
    </nav>
  );
}

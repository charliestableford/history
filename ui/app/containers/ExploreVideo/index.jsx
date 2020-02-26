/* global fetch */
import React, { useState } from 'react';
import _ from 'lodash';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import Photos from './Photos';
import VideoDetail from './VideoDetail';
import PhotoList from './PhotoList';

const API_KEY = process.env.HISTORY_YOUTUBE_API_KEY;
//const flickrAPI_KEY = process.env.HISTORY_FLICKR_API_KEY;
// ExploreVideo
// both pics and videos
export default function ExploreVideo() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, selectVideo] = useState(null);

  const fetchVideos = async (searchValue, options = {}) => {
    if (!searchValue) {
      return undefined;
    }

    const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    const geoAddress = `https://content.googleapis.com/youtube/v3/search?location=${searchValue}&locationRadius=1km&maxResults=5${order}`
     + `&part=id,snippet&type=video&videoEmbeddable=true&key=${API_KEY}&videoLiscense=any`;
    const keywordAddress = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${searchValue}&type=video${order}`;

    const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;

    //change from promise to async await. Fetch is a promise
    try {
      const response = await fetch(address);
      const payload = await response.json();
      setVideos(payload.items);
      selectVideo(payload.items[0]);
    }
    catch (error) {
      return console.debug(error.message);
    }
  };

  const videoSearch = _.debounce((searchValue, options) => fetchVideos(searchValue, options), 400);


// START

  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async (searchValue = {}) => {
    if (!searchValue) {
      return undefined;
    }

    const location = {
      latitude: 49.37885,
      longitude: 10.18711,
    };

    // const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    const method = 'flickr.photos.search';
    const params = `&lat=${location.latitude}&lon=${location.longitude}&radius=1`;
    // const method = 'flickr.photos.geo.setLocation';
    // hard code these params first... then change to geoLocation call through flickr.
    //const params = `&lat=49.2&lon=-123.3&radius=1`;
    // const params = `${photo.id}`;

    // const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;
    const flickrgeoAddress = `https://www.flickr.com/services/rest/?${params}&method=${method}&api_key=54e3566e2843b8541e36ae78ef4d2ac8&per_page=5&page=1&format=json&nojsoncallback=1`;
    const flickrkeywordAddress = `https://www.flickr.com/services/rest/?method=${method}&api_key=54e3566e2843b8541e36ae78ef4d2ac8&tags=${searchValue}&per_page=5&page=1&format=json&nojsoncallback=1`;

    // const flickrServiceUrl = `https://www.flickr.com/services/rest/?${params}&method=${method}&api_key=54e3566e2843b8541e36ae78ef4d2ac8&format=json&nojsoncallback=1`;

    // const address = (Number(searchValue.split(',')[0])) ? geoAddress : flickrServiceUrl;

    const address = (Number(searchValue.split(',')[0])) ? flickrgeoAddress : flickrkeywordAddress;


    const dimensions = 't'; // Flickr docs b is large, t is thumbnail

    try {
      const response = await fetch(address);
      const payload = await response.json();
      console.log('hi', payload);
      const formatImage = (photo_1) => ({ src: `https://farm${photo_1.farm}.staticflickr.com/${photo_1.server}/${photo_1.id}_${photo_1.secret}_${dimensions}.jpg` });
      const photosrc = payload.photos.photo.map(formatImage);
      console.log('stop one', payload);
      console.log(photosrc);
      setPhotos(photosrc);
    }
    catch (error) {
      return console.debug(error.message);
    }
}
const photoSearch = _.debounce((searchValue, options) => fetchPhotos(searchValue, options), 400);

// I want to join these two searches.
//{/* <SearchBar onSearchChange={photoSearch}/> */}
  return (
    <section id="media-component">
      <SearchBar onSearchChange={videoSearch}/>
     <SearchBar onSearchChange={photoSearch}/>
      <VideoDetail video={selectedVideo} />
      <VideoList onVideoSelect={selectVideo} videos={videos} />
      <PhotoList photos={photos} />
    </section>
  );
}

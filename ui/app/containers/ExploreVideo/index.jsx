/* global fetch */
import React from 'react';
import _ from 'lodash';

import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const API_KEY = process.env.HISTORY_YOUTUBE_API_KEY;
const flickrAPI_KEY = process.env.HISTORY_FLICKR_API_KEY;

export default class ExploreVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };
  }

  // photoSearch(searchValue, options = {}) {
  //   if (!searchValue) {
  //     return undefined;
  //   }

    // const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    // const flickrServiceUrl = `https://www.flickr.com/services/rest/?${params}&method=flickr.photos.search&api_key=54e3566e2843b8541e36ae78ef4d2ac8&format=json&nojsoncallback=1`;

    // try {
    //   const response = await fetch(flickrServiceUrl);
    //   const result = await response.json();

    //   const formatImage = (photo) => ({
    //     src: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
    //   });
    //   const sources = result.photos.photo.map(formatImage);
    //   return { photos: sources };
    // } catch (error) {
    //   error: true,
    //   message: 'failed to get Flickr photos',
    // legit};

    // const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;

  videoSearch(searchValue, options = {}) {
    if (!searchValue) {
      return undefined;
    }

    const order = (options.searchOrder) ? `&order=${options.searchOrder}` : '';

    const geoAddress = `https://content.googleapis.com/youtube/v3/search?location=${searchValue}&locationRadius=1km&maxResults=5${order}`
    + `&part=id,snippet&type=video&videoEmbeddable=true&key=${API_KEY}&videoLiscense=any`;
    const keywordAddress = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${searchValue}&type=video${order}`;

    const address = (Number(searchValue.split(',')[0])) ? geoAddress : keywordAddress;

    // most views
    // https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&publishedAfter=
    // 2014-10-29T00%3A00%3A00Z&publishedBefore=2014-10-31T00%3A00%3A00Z&key=AIzaSyC8rNZ8fkVAjK_B4UfmNQNISPar6D-TjI4
    async function logFetch(url) {
    try {
      const response = await fetch(address);
      console.log(await response.text());
    }
    catch(err) {
      console.elog('fetch failed', err);
    }
  }

    //change from promise to async await. Fetch is a promise
    return fetch(address)
      .then(response => response.json())
      .then((payload) => {
        this.setState({
          videos: payload.items,
          selectedVideo: payload.items[0],
        });
      })
      .catch(error => console.debug(error.message));
  }

  render() {
    const {
      selectedVideo,
      videos,
    } = this.state;

    const videoSearch = _.debounce((searchValue, options) => this.videoSearch(searchValue, options), 400);

    return (
      // <section id="photos"><Photos /></section>
      <section id="video-component">
        <SearchBar onSearchChange={videoSearch} />
        <VideoDetail video={selectedVideo} />
        <VideoList onVideoSelect={currentVideo => this.setState({ selectedVideo: currentVideo })} videos={videos} />
      </section>
    );
  }
}

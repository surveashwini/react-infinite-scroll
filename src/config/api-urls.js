export const PHOTOS_URL = (pageNumber) =>
  `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=d14b15f702437ce2852ed0e637ceb9a2&per_page=10&page=${pageNumber}&format=json&nojsoncallback=1`;

export const PHOTO_DETAILS_URL = (photoId) =>
  `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=d14b15f702437ce2852ed0e637ceb9a2&photo_id=${photoId}&format=json&nojsoncallback=1`;

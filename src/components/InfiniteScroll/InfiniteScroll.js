import { useReducer, useRef } from "react";
import React from "react";
import Photo from "./../Photo/Photo";
import "./InfiniteScroll.scss";

import { imgReducer } from "../../reducers/imgReducer";
import { pageReducer } from "../../reducers/pageReducer";
import { useFetch } from "../../hooks/useFetch";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useLazyLoading } from "../../hooks/useLazyLoading";

/**
 * The below method will set the photo as favourite by its id
 * It will also store it in local storage to persist even on page refresh
 * @param photoId unique identifier of the photo
 */
const setFavourite = (photoId) => {
  let favouritesFromLocalStorage =
    JSON.parse(localStorage.getItem("favourites")) || [];
  favouritesFromLocalStorage.push(photoId);
  localStorage.setItem(
    `favourites`,
    JSON.stringify(favouritesFromLocalStorage)
  );
};

const InfiniteScroll = () => {
  // initialize imgData and pager with initial values
  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });

  // hold the reference of the bottom div for infinite scroll logic
  let bottomBoundaryRef = useRef(null);

  // retrieve data from server
  useFetch(pager, imgDispatch);
  // apply lazy loading to photos
  useLazyLoading(".photo", imgData.images);
  // identify whether the scroll is at bottom using bottomBoundaryRef and request for new data
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="infinite-scroll-container">
      <div className="photos">
        {imgData?.images?.map((photoDetails, index) => {
          return (
            <Photo
              key={index}
              favourite={JSON.parse(localStorage.getItem("favourites"))?.find(
                (photo) => photo === photoDetails.id
              )}
              photoTitle={photoDetails.title._content}
              photoOwner={photoDetails.owner.realname}
              photoId={photoDetails.id}
              photoServer={photoDetails.server}
              photoSecret={photoDetails.secret}
              setFavourite={setFavourite}
            />
          );
        })}
      </div>
      {imgData.fetching && (
        <div className="fetch-images-indicator">
          <img
            style={{ height: 30, width: 30, padding: 10 }}
            src="../../assets/loader.gif"
          />
        </div>
      )}
      <div
        id="page-bottom-boundary"
        style={{ border: "1px solid transparent" }}
        ref={bottomBoundaryRef}
      ></div>
    </div>
  );
};

export default InfiniteScroll;

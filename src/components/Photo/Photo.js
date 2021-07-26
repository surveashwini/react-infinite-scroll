import { useState } from "react";
import React from "react";
import "./Photo.scss";

const Photo = ({
  photoTitle,
  photoOwner,
  photoId,
  photoServer,
  photoSecret,
  favourite,
  setFavourite,
}) => {
  const [favouritePhoto, setFavouritePhoto] = useState(false);

  // retrieve only first two words for photo title and owner.
  // initialize with dummy values if no values received from server
  let updatedTitle = photoTitle?.split(" ");
  updatedTitle =
    (updatedTitle &&
      (updatedTitle[0] && updatedTitle[1]
        ? `${updatedTitle[0]} ${updatedTitle[1]}`
        : updatedTitle[0]
        ? `${updatedTitle[0]}`
        : "Name missing")) ||
    "Name missing";

  let updatedOwner = photoOwner?.split(" ");
  updatedOwner =
    (updatedOwner &&
      (updatedOwner[0] && updatedOwner[1]
        ? `${updatedOwner[0]} ${updatedOwner[1]}`
        : updatedOwner[0]
        ? `${updatedOwner[0]}`
        : "Author missing")) ||
    "Author missing";

  let backgroundImageUrl = `url("https://live.staticflickr.com/${photoServer}/${photoId}_${photoSecret}.jpg")`;

  return (
    <span
      style={{
        backgroundImage: backgroundImageUrl,
      }}
      onError={(error) => console.log("comes", error)}
      className="photo"
    >
      <span className="photo-details">
        <span className="name">{updatedTitle}</span>
        <hr className="divider" />
        <span className="author"> {updatedOwner} </span>
      </span>
      {!(favouritePhoto || favourite) && (
        <button
          className="fav"
          onClick={() => {
            setFavouritePhoto(true);
            setFavourite(photoId);
          }}
        >
          {" "}
          Favourite
        </button>
      )}
    </span>
  );
};

export default Photo;

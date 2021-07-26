import { useEffect } from "react";
import { PHOTOS_URL, PHOTO_DETAILS_URL } from "../config/api-urls";

export const useFetch = (pager, imgDispatch) => {
  const fetchPhotoDetailsFromServer = async (allPhotosIds) => {
    let finalResult = allPhotosIds.map(async (fetchPhoto) => {
      let result = await (await fetchPhoto).json();
      return result;
    });
    return await finalResult;
  };

  const getPhotoIds = async (serverResponse) => {
    return await serverResponse?.photos?.photo?.map(async (photo) => {
      return await fetch(PHOTO_DETAILS_URL(photo.id));
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    const fetchDataFromServer = async () => {
      try {
        // on page load, firstly show fetching on screen
        imgDispatch({ type: "FETCH_IMAGES_FROM_SERVER", fetching: true });

        // fetch all photo ids from server
        const res = fetch(PHOTOS_URL(pager.page));
        let serverResponse = await (await res).json();

        // once photo ids are received, create fetch request to get additional photo information of the photos.
        // we will need additional information to show photo author
        let allPhotosIds = await getPhotoIds(serverResponse);

        // retrieve additional photo information from server
        let finalResult = await fetchPhotoDetailsFromServer(allPhotosIds);

        // when we finally get all the photo promises, we wait till all are settled
        Promise.allSettled([...finalResult]).then(async (value) => {
          // just take the photo information, discard other information.
          let updatedValue = value.map((val) => val.value.photo);
          updatedValue = [...updatedValue];

          // once received, dispatch the action SAVE_IMAGES to store the images.
          imgDispatch({
            type: "SAVE_IMAGES",
            images: updatedValue,
          });
          // dispatch FETCH_IMAGES_FROM_SERVER indicating that server interaction is complete
          imgDispatch({ type: "FETCH_IMAGES_FROM_SERVER", fetching: false });
        });
      } catch (error) {
        // dispatch FETCH_IMAGES_FROM_SERVER indicating that server interaction is complete
        imgDispatch({ type: "FETCH_IMAGES_FROM_SERVER", fetching: false });
      }
    };

    fetchDataFromServer();
    return () => ac.abort();
  }, [imgDispatch, pager.page]);
};

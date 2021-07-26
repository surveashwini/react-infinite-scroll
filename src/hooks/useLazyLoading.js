import { useEffect, useCallback, useRef } from "react";

export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const currentImg = en.target;
          // as image source is used as a background image, take its value
          const newImgSrc = currentImg?.style?.backgroundImage;

          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error("Image source is invalid");
          } else {
            currentImg.style.backgroundImage = newImgSrc;
          }

          // detach the observer when done
          intObs.unobserve(node);
        }
      });
    });
    intObs.observe(node);
  }, []);

  const imagesRef = useRef(null);

  useEffect(() => {
    // select all photos by .photo class selector
    imagesRef.current = document.querySelectorAll(imgSelector);

    if (imagesRef.current) {
      // attach imgObserver to each photo to replace the url
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items]);
};

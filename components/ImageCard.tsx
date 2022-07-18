import { Picture } from "interfaces";
import React from "react";

import { TrashIcon } from "@heroicons/react/solid";
import { getImageUrl } from "utils/fetchApi";
interface IProps {
  image: Picture;
  onRemove?: (id: number) => void;
  isEditting?: boolean;
}
const ImageCard = ({ image, onRemove, isEditting }: IProps) => {
  return (
    <div className=" m-1 border rounded-md shadow-md relative">
      <img
        src={
          getImageUrl(image.url)
          // onRemove
          //   ? isEditting
          //     ? getImageUrl(image.url)
          //     : image.url
          //   : getImageUrl(image.url)
        }
        className="object-contain w-10 h-10 md:w-30 md:h-30 lg:w-60 lg:h-60 2xl:w-96 2xl:h-96"
      />
      {onRemove && (
        <TrashIcon
          className="h-6 w-6 md:absolute md:bottom-2 md:left-1/2 md:-translate-x-1/2 text-red-500 transition cursor-pointer hover:scale-105 active:scale-90"
          onClick={() => onRemove && onRemove(image.id)}
        ></TrashIcon>
      )}
    </div>
  );
};

export default ImageCard;

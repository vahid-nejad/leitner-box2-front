import { Picture } from "interfaces";
import React from "react";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/solid";
import { getImageUrl } from "utils/fetchApi";
interface IProps {
  image: Picture;
  onRemove?: (id: number) => void;
  isEditting?: boolean;
}
const ImageCard = ({ image, onRemove, isEditting }: IProps) => {
  return (
    <div className="border rounded-md shadow-md relative">
      <Image
        src={
          getImageUrl(image.url)
          // onRemove
          //   ? isEditting
          //     ? getImageUrl(image.url)
          //     : image.url
          //   : getImageUrl(image.url)
        }
        width={400}
        height={400}
        className="object-contain"
      />
      {onRemove && (
        <TrashIcon
          className="h-6 w-6 absolute bottom-2 left-1/2 -translate-x-1/2 text-red-500 transition cursor-pointer hover:scale-105 active:scale-90"
          onClick={() => onRemove && onRemove(image.id)}
        ></TrashIcon>
      )}
    </div>
  );
};

export default ImageCard;

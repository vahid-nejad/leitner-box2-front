import { Picture } from "interfaces";
import React from "react";
import ImageCard from "./ImageCard";

interface IProps {
  images: Picture[];
  onRemove?: (id: number) => void;
  isEditting?: boolean;
}

const ImageSet = ({ images, onRemove, isEditting }: IProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {images.map((img) => (
        <ImageCard
          onRemove={onRemove ? (id) => onRemove(id) : undefined}
          key={img.id}
          isEditting={isEditting}
          image={img}
        ></ImageCard>
      ))}
    </div>
  );
};

export default ImageSet;

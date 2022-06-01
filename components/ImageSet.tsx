import { Picture } from "interfaces";
import React from "react";
import ImageCard from "./ImageCard";

interface IProps {
  images: Picture[];
  onRemove?: (id: number) => void;
}

const ImageSet = ({ images, onRemove }: IProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {images.map((img) => (
        <ImageCard
          onRemove={onRemove ? (id) => onRemove(id) : undefined}
          key={img.id}
          image={img}
        ></ImageCard>
      ))}
    </div>
  );
};

export default ImageSet;

"use client";

import React, { useState, useEffect } from "react";

interface DropzoneProps {
  handleImageClick: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: any;
  name: string;
  type: string;
}

const Dropzone: React.FC<DropzoneProps> = ({
  handleImageClick,
  handleImageChange,
  inputRef,
  name,
  type,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      handleImageChange(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-[223px] h-[163px] border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer ">
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />

      <div onClick={handleImageClick} className="text-center">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-40 object-cover rounded-md mb-2"
          />
        ) : (
          <p className="text-gray-500">Click to upload an image</p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;

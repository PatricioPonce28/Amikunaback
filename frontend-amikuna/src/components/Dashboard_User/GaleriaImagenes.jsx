import React from 'react';

const GaleriaImagenes = ({ imagenes, onAgregarImagenes }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {imagenes.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Imagen ${index + 1}`}
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>
      <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        + Añadir fotos
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onAgregarImagenes}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default GaleriaImagenes;

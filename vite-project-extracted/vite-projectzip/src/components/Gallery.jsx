import React, { useState } from 'react';
import './Gallery.css';

/**
 * Gallery
 * Shows a main image with a thumbnail strip below.
 * @param {string[]} images - array of image URLs
 * @param {string}   alt    - alt text prefix
 */
export default function Gallery({ images = [], alt = 'Pattern image' }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images.length) return null;

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img
          src={images[activeIdx]}
          alt={`${alt} — image ${activeIdx + 1}`}
          className="gallery__main-img"
        />
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`gallery__thumb${i === activeIdx ? ' gallery__thumb--active' : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

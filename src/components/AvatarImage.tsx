/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { riteshAvatarBase64 } from '../avatarData';

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  alt?: string;
}

export default function AvatarImage({ className, alt = "Ritesh Kumar", ...props }: AvatarImageProps) {
  const [attempt, setAttempt] = useState<number>(0);

  const paths = [
    '/rk.png',
    '/avatar.jpg',
    '/avatar.png',
    '/avatar.jpeg',
    '/avatar.webp',
    riteshAvatarBase64 // Hand-crafted vector fallback
  ];

  const handleError = () => {
    if (attempt < paths.length - 1) {
      setAttempt(prev => prev + 1);
    }
  };

  return (
    <img
      src={paths[attempt]}
      onError={handleError}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}

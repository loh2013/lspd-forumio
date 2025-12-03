import React from 'react';
import { Rank } from '../types';
import { RANK_IMAGES } from '../constants';

interface RankIconProps {
  rank: Rank;
  className?: string;
}

export const RankIcon: React.FC<RankIconProps> = ({ rank, className = "w-32" }) => {
  const imageUrl = RANK_IMAGES[rank];

  return (
    <div className={`${className} select-none`}>
       {/* 
         Renders the rank image directly, filling the width of the container.
         All text/backgrounds are expected to be part of the image itself.
       */}
       <img 
         src={imageUrl} 
         alt={rank} 
         className="w-full h-auto block drop-shadow-md"
       />
    </div>
  );
};
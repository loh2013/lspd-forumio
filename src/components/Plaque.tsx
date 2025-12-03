
import React from 'react';
import { PlaqueType } from '../types';

interface PlaqueProps {
  type: PlaqueType;
  onRemove?: () => void;
  showRemove?: boolean;
}

export const Plaque: React.FC<PlaqueProps> = ({ type, onRemove, showRemove }) => {
  const getStyle = () => {
    // Faction Management (Red)
    if (type === PlaqueType.FACTION_MANAGEMENT) {
        return { bg: 'from-red-900 via-red-600 to-red-950', icon: '👑' };
    }
    
    // Civilian (Light Gray)
    if (type === PlaqueType.CIVILIAN) {
        return { bg: 'from-gray-300 via-gray-100 to-gray-400', icon: '🧍' };
    }

    // Metro Division Header & Platoons (Purple)
    // Matches "OO-CTSOB: Metropolitain Division" and "MD: ..."
    if (type.startsWith('MD:') || type.startsWith('OO-CTSOB')) {
        return { bg: 'from-purple-900 via-purple-700 to-purple-950', icon: '⚡' };
    }

    // Detectives (Orange/Gold)
    // Matches "DB: ..."
    if (type.startsWith('DB:')) {
        return { bg: 'from-orange-800 via-orange-600 to-orange-900', icon: '🕵️' };
    }

    // Operations / Patrol (Blue)
    // Matches "OO-CB: ..." (Foothill/North East)
    if (type.startsWith('OO-CB:')) {
        return { bg: 'from-sky-900 via-blue-800 to-slate-900', icon: '👮' };
    }
    
    // DB-FS (GED) - Dark/Black/Greenish tint
    if (type.startsWith('DB-FS:')) {
        return { bg: 'from-gray-900 via-emerald-900 to-black', icon: '🔦' };
    }

    // PD General (Training etc) - Slate/Blue
    if (type.startsWith('PD:')) {
        return { bg: 'from-slate-700 via-slate-600 to-slate-800', icon: '🎓' };
    }

    // Default
    return { bg: 'from-gray-600 to-gray-800', icon: '🛡️' };
  };

  const style = getStyle();
  const isLight = type === PlaqueType.CIVILIAN;

  return (
    <div className={`
      relative overflow-hidden
      h-6 w-full max-w-[220px] my-1
      border border-black rounded-sm
      bg-gradient-to-b ${style.bg}
      flex items-center justify-between px-2
      shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]
      group
    `}>
        {/* Scanline effect overlay */}
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBg+P///38AAwECAwc47OAAAAAASUVORK5CYII=')] opacity-20 pointer-events-none"></div>
        
        <span className={`text-[9px] font-bold ${isLight ? 'text-gray-800' : 'text-white'} tracking-tight uppercase drop-shadow-md z-10 font-sans truncate pr-1`}>
            {type}
        </span>
        
        <div className="z-10 flex items-center gap-1 flex-shrink-0">
            <span className="text-[10px] opacity-90">{style.icon}</span>
            {showRemove && onRemove && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    className="ml-1 text-[8px] bg-red-600 hover:bg-red-500 text-white px-1 rounded border border-black shadow-sm cursor-pointer"
                    title="Remove Plaque"
                >
                    X
                </button>
            )}
        </div>
    </div>
  );
};

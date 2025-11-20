import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Trophy } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (id: number) => void;
  onRiggedAttempt: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onVote, onRiggedAttempt }) => {
  // State for the rigged button position and rotation
  const [riggedPos, setRiggedPos] = useState({ x: 0, y: 0, rotate: 0 });

  const handleVoteClick = () => {
    if (candidate.isRigged) {
      // If they somehow managed to click it
      onRiggedAttempt();
    } else {
      onVote(candidate.id);
    }
  };

  const handleHoverRigged = () => {
    if (!candidate.isRigged) return;

    // Constrain movement logic to keep the button visible
    // Previous logic allowed button to exit the overflow-hidden card
    
    // X Axis: Limit to +/- 65px to prevent clipping on sides (card width ~300px, button ~150px)
    const randomX = (Math.random() - 0.5) * 130; 
    
    // Y Axis: Move mostly upwards (negative values) because the button starts at the bottom
    // Range: -120px (upwards near avatar) to 0px (original position)
    // Avoiding positive values which push it out of the bottom of the card
    const randomY = -Math.random() * 120;

    // Add random rotation for extra "glitch" effect
    const randomRotate = (Math.random() - 0.5) * 20; // +/- 10 degrees

    setRiggedPos({ x: randomX, y: randomY, rotate: randomRotate });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col relative">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <img 
            src={candidate.avatarUrl} 
            alt={candidate.nameEn} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-gray-200"
          />
        </div>
      </div>

      <div className="pt-16 pb-6 px-6 flex flex-col items-center text-center flex-grow">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">{candidate.nameAr}</h2>
        <p className="text-slate-500 text-sm mb-6 font-medium">{candidate.nameEn}</p>

        <div className="flex items-center gap-2 mb-6 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-bold text-slate-700 font-mono">
            {candidate.votes.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400">أصوات</span>
        </div>

        <div className="mt-auto w-full h-16 relative flex items-center justify-center">
          {candidate.isRigged ? (
            <motion.button
              animate={{ 
                x: riggedPos.x, 
                y: riggedPos.y,
                rotate: riggedPos.rotate 
              }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              onMouseEnter={handleHoverRigged}
              onClick={handleVoteClick}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg flex items-center gap-2 absolute z-10"
            >
              <ThumbsUp className="w-5 h-5" />
              <span>صوّت الآن</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoteClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg flex items-center gap-2 w-full justify-center"
            >
              <ThumbsUp className="w-5 h-5" />
              <span>صوّت الآن</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
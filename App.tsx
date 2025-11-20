import React, { useState } from 'react';
import { Candidate } from './types';
import CandidateCard from './components/CandidateCard';
import Toast from './components/Toast';
import { Vote } from 'lucide-react';

const App: React.FC = () => {
  // Initial Data
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      nameAr: 'احمد الغامدي',
      nameEn: 'Ahmed Al-Ghamdi',
      votes: 142,
      isRigged: false,
      avatarUrl: 'https://picsum.photos/seed/ahmed/200/200'
    },
    {
      id: 2,
      nameAr: 'عبدالعزيز الغامدي',
      nameEn: 'Abdulaziz Al-Ghamdi',
      votes: 138,
      isRigged: false,
      avatarUrl: 'https://picsum.photos/seed/aziz/200/200'
    },
    {
      id: 3,
      nameAr: 'خالد الزهراني',
      nameEn: 'Khalid Al-Zahrani',
      votes: 12, // Deliberately lower starting count for effect
      isRigged: true,
      avatarUrl: 'https://picsum.photos/seed/khalid/200/200'
    }
  ]);

  const [showError, setShowError] = useState(false);

  const handleVote = (id: number) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, votes: c.votes + 1 };
      }
      return c;
    }));
  };

  const handleRiggedAttempt = () => {
    setShowError(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Vote size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 leading-tight">صوّت للأفضل</h1>
              <p className="text-sm text-slate-500 font-serif tracking-wide">Vote for the Best Friend</p>
            </div>
          </div>
          <div className="text-sm font-medium text-slate-400 hidden sm:block">
            انتخابات ٢٠٢٤
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">اختر صديقك المفضل</h2>
          <p className="text-slate-600 text-lg">صوتك أمانة.. اختر من يمثلك بصدق!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {candidates.map(candidate => (
            <CandidateCard 
              key={candidate.id} 
              candidate={candidate} 
              onVote={handleVote}
              onRiggedAttempt={handleRiggedAttempt}
            />
          ))}
        </div>

        <div className="mt-16 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center max-w-2xl mx-auto">
          <p className="text-blue-800 font-medium">
            ملاحظة: هذا النظام محمي بأحدث تقنيات الذكاء الاصطناعي لضمان نزاهة التصويت.
          </p>
          <p className="text-blue-600/70 text-sm mt-1" dir="ltr">
            Powered by SecureVote™ AI
          </p>
        </div>
      </main>

      {/* Toast Notification */}
      <Toast 
        message="عفواً، حدث خطأ في النظام - System Malfunction" 
        isVisible={showError} 
        onClose={() => setShowError(false)} 
      />
    </div>
  );
};

export default App;

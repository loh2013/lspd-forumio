import React, { useState } from 'react';
import { useApp } from '../context';

export const Auth = () => {
  const { login, register } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Visual only for mock

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(username);
    } else {
      register(username);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-forum-row1 border border-black shadow-2xl p-1 w-full max-w-md">
        <div className="glossy-header p-2 border-b border-black mb-4">
            <h2 className="text-white font-bold text-center">
                {isLogin ? 'LAPD NETWORK LOGIN' : 'PERSONNEL REGISTRATION'}
            </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white border border-gray-400 m-2">
            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">NAME SURNAME (NO RANK):</label>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-500 bg-gray-100 p-2 text-sm text-black focus:bg-white focus:border-lapd-blue outline-none transition-colors"
                    placeholder="Ex: Timothy Bradford"
                    required
                    autoComplete="off"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">PASSWORD:</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-500 bg-gray-100 p-2 text-sm text-black focus:bg-white focus:border-lapd-blue outline-none transition-colors"
                    placeholder="********"
                    required
                />
            </div>

            <button type="submit" className="w-full glossy-btn text-white font-bold py-2 mt-4 border border-black text-sm hover:brightness-110 active:translate-y-px">
                {isLogin ? 'SECURE LOGIN' : 'CREATE RECORD'}
            </button>

            <div className="text-center mt-4 border-t border-gray-300 pt-2">
                <button 
                    type="button" 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-xs text-lapd-blue hover:underline font-bold"
                >
                    {isLogin ? "Don't have an account? Register" : "Already have a badge? Login"}
                </button>
            </div>
            
            {!isLogin && (
                <div className="bg-yellow-100 border border-yellow-400 p-2 text-[10px] text-yellow-800 text-center">
                    Note: New registrations are automatically assigned Civilian clearance.
                </div>
            )}
        </form>
      </div>
    </div>
  );
};
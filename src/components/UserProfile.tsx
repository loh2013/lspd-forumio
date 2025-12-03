
import React, { useState, useEffect } from 'react';
import { User, PlaqueType, Rank } from '../types';
import { RankIcon } from './RankIcon';
import { useApp } from '../context';
import { useNavigate, Link } from 'react-router-dom';
import { Plaque } from './Plaque';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { currentUser, assignPlaque, removePlaque, updateUser, posts, threads } = useApp();
  const navigate = useNavigate();
  
  const [selectedPlaqueToAdd, setSelectedPlaqueToAdd] = useState<PlaqueType>(PlaqueType.CIVILIAN);
  const [selectedPlaqueToRemove, setSelectedPlaqueToRemove] = useState<string>('');
  const [selectedRank, setSelectedRank] = useState<Rank>(user.rank);
  
  // View Group State
  const [selectedGroupToView, setSelectedGroupToView] = useState<string>('');

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
      username: user.username,
      oocName: user.oocName || '',
      discord: user.discord || '',
      signature: user.signature || ''
  });

  // Sync state when user changes
  useEffect(() => {
    setSelectedRank(user.rank);
    setEditFormData({
        username: user.username,
        oocName: user.oocName || '',
        discord: user.discord || '',
        signature: user.signature || ''
    });
    
    // Reset remove selection
    if (user.badges.length > 0) {
        setSelectedPlaqueToRemove(user.badges[0]);
        setSelectedGroupToView(user.badges[0]);
    } else {
        setSelectedPlaqueToRemove('');
        setSelectedGroupToView('Civilian');
    }
  }, [user]);

  // Update remove selection if badges change
  useEffect(() => {
     if (user.badges.length > 0 && !user.badges.includes(selectedPlaqueToRemove as PlaqueType)) {
         setSelectedPlaqueToRemove(user.badges[0]);
     }
  }, [user.badges, selectedPlaqueToRemove]);

  // Check if current user has Faction Management permissions
  const isFactionManagement = currentUser && currentUser.badges.includes(PlaqueType.FACTION_MANAGEMENT);
  
  // Check if viewing own profile (to allow editing)
  const isOwnProfile = currentUser && currentUser.id === user.id;

  // --- STATS CALCULATION ---
  const userPosts = posts.filter(p => p.authorId === user.id);
  const realPostCount = userPosts.length;
  
  // Calculate most active thread
  const threadCounts: Record<string, number> = {};
  userPosts.forEach(p => {
      threadCounts[p.threadId] = (threadCounts[p.threadId] || 0) + 1;
  });
  
  let mostActiveThreadId: string | null = null;
  let maxThreadPosts = 0;
  
  Object.entries(threadCounts).forEach(([tid, count]) => {
      if (count > maxThreadPosts) {
          maxThreadPosts = count;
          mostActiveThreadId = tid;
      }
  });

  const mostActiveThread = threads.find(t => t.id === mostActiveThreadId);
  const mostActivePercent = realPostCount > 0 ? ((maxThreadPosts / realPostCount) * 100).toFixed(2) : 0;
  const postsPerDay = 0.16; 

  // --- HANDLERS ---

  const handleAddPlaque = () => {
    assignPlaque(user.id, selectedPlaqueToAdd);
  };

  const handleRemovePlaque = () => {
      if (selectedPlaqueToRemove) {
          removePlaque(user.id, selectedPlaqueToRemove as PlaqueType);
      }
  };

  const handleSetRank = () => {
    updateUser(user.id, { rank: selectedRank });
    alert(`Rank updated to ${selectedRank}`);
  };

  const handleSaveProfile = () => {
      updateUser(user.id, {
          username: editFormData.username,
          oocName: editFormData.oocName,
          discord: editFormData.discord,
          signature: editFormData.signature
      });
      setIsEditing(false);
  };

  const handleViewGroup = () => {
      if (selectedGroupToView) {
          navigate(`/group/${encodeURIComponent(selectedGroupToView)}`);
      }
  };

  return (
    <div className="w-full bg-white font-sans text-sm">
      <h2 className="text-xl text-black font-normal mb-2">Профиль пользователя {user.username}</h2>
      
      {/* Top Main Box */}
      <div className="bg-[#F0F3F7] border border-[#d6d9e0] p-4 flex flex-col md:flex-row gap-6 mb-4 rounded-sm">
        
        {/* Left: Rank & Avatar Area */}
        <div className="flex-shrink-0 flex flex-col items-center justify-start w-48">
             <RankIcon rank={user.rank} className="w-40 shadow-lg" />
             <div className="mt-2 font-bold text-xs text-black uppercase tracking-wide w-full text-center py-1 mb-2">
                {user.rank}
             </div>
             
             {/* Render Plaques only in profile view (left column) per updated design */}
             <div className="flex flex-col w-full items-center">
                 {user.badges.map(plaque => (
                     <div key={plaque} className="w-full flex justify-center">
                        <Plaque type={plaque} />
                     </div>
                 ))}
             </div>
        </div>
        
        {/* Right: User Info Fields */}
        <div className="flex-grow flex flex-col gap-2">
            
            {/* Username Row */}
            <div className="flex items-center text-xs h-7">
                <span className="text-gray-600 w-32 text-right mr-3">Имя пользователя:</span>
                {isEditing ? (
                    <input 
                        className="border border-gray-400 px-1 py-0.5"
                        value={editFormData.username}
                        onChange={(e) => setEditFormData({...editFormData, username: e.target.value})}
                    />
                ) : (
                    <>
                        <span className="font-bold text-[#2c4b7c]">{user.username}</span>
                        {isOwnProfile && (
                            <span 
                                onClick={() => setIsEditing(true)}
                                className="text-gray-500 ml-2 cursor-pointer hover:underline"
                            >
                                [ Редактировать профиль ]
                            </span>
                        )}
                    </>
                )}
            </div>

            {/* Groups Row - The "Scrollable" Dropdown */}
            <div className="flex items-center text-xs h-7">
                <span className="text-gray-600 w-32 text-right mr-3">Группы:</span>
                <div className="flex gap-1">
                    <select 
                        className="border border-gray-400 p-0.5 bg-white text-gray-700 w-48 cursor-pointer"
                        value={selectedGroupToView}
                        onChange={(e) => setSelectedGroupToView(e.target.value)}
                    >
                        {user.badges.length > 0 ? (
                            user.badges.map(b => <option key={b} value={b}>{b}</option>)
                        ) : (
                            <option value="Civilian">Civilian</option>
                        )}
                    </select>
                    <button 
                        onClick={handleViewGroup}
                        className="bg-[#e4e4e4] border border-gray-400 px-2 hover:bg-gray-200 text-[10px]"
                    >
                        Перейти
                    </button>
                </div>
            </div>

            {/* OOC Nick Row */}
            <div className="flex items-center text-xs h-7">
                <span className="text-gray-600 w-32 text-right mr-3">ООС ник:</span>
                {isEditing ? (
                    <input 
                        className="border border-gray-400 px-1 py-0.5"
                        value={editFormData.oocName}
                        onChange={(e) => setEditFormData({...editFormData, oocName: e.target.value})}
                    />
                ) : (
                    <span className="text-black">{user.oocName || 'Не указан'}</span>
                )}
            </div>

            {/* Discord Row */}
            <div className="flex items-center text-xs h-7">
                <span className="text-gray-600 w-32 text-right mr-3">Discord:</span>
                {isEditing ? (
                    <input 
                        className="border border-gray-400 px-1 py-0.5"
                        value={editFormData.discord}
                        onChange={(e) => setEditFormData({...editFormData, discord: e.target.value})}
                    />
                ) : (
                     <span className="text-black">{user.discord || 'Не указан'}</span>
                )}
            </div>

            {/* Edit Actions */}
            {isEditing && (
                <div className="ml-36 mt-2 flex gap-2">
                    <button onClick={handleSaveProfile} className="bg-green-600 text-white px-3 py-1 font-bold">Сохранить</button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 font-bold">Отмена</button>
                </div>
            )}

        </div>
      </div>

      {/* Bottom Layout: Contact & Stats */}
      <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Col: Contact Info */}
          <div className="w-full md:w-1/2">
              <h3 className="text-sm font-normal text-black border-b border-[#d6d9e0] pb-1 mb-2">
                  Контактная информация пользователя {user.username.split(' ')[0]}
              </h3>
              <div className="pl-4 text-xs">
                  <div className="flex items-center py-1">
                      <span className="text-gray-600 w-32 text-right mr-3">Личное сообщение:</span>
                      <button className="text-[#2c4b7c] hover:underline">Отправить личное сообщение</button>
                  </div>
              </div>
          </div>

          {/* Right Col: Statistics */}
          <div className="w-full md:w-1/2">
               <h3 className="text-sm font-normal text-black border-b border-[#d6d9e0] pb-1 mb-2">
                  Статистика пользователя
               </h3>
               <div className="pl-4 text-xs space-y-1">
                   <div className="flex">
                       <span className="text-gray-600 w-40 text-right mr-3">Врученные Награды:</span>
                       <span>0</span>
                   </div>
                   <div className="flex">
                       <span className="text-gray-600 w-40 text-right mr-3">Зарегистрирован:</span>
                       <span>{user.joinDate}</span>
                   </div>
                   <div className="flex">
                       <span className="text-gray-600 w-40 text-right mr-3">Последнее посещение:</span>
                       <span>Сейчас</span>
                   </div>
                   <div className="flex">
                       <span className="text-gray-600 w-40 text-right mr-3">Всего сообщений:</span>
                       <div>
                           <span className="font-bold">{realPostCount}</span>
                           <span className="mx-1 text-gray-400">|</span>
                           <Link to={`/user-posts/${user.id}`} className="font-bold text-[#2c4b7c] hover:underline">Найти сообщения пользователя</Link>
                           <div className="text-gray-500 text-[10px]">(0.12% всех сообщений / {postsPerDay} сообщений в день)</div>
                       </div>
                   </div>
                   <div className="flex mt-2">
                        <span className="text-gray-600 w-40 text-right mr-3">Наиболее активен в теме:</span>
                        <div>
                            {mostActiveThread ? (
                                <>
                                    <Link to={`/thread/${mostActiveThread.id}`} className="font-bold text-[#2c4b7c] underline cursor-pointer uppercase block">
                                        {mostActiveThread.title}
                                    </Link>
                                    <div className="text-gray-500 text-[10px]">
                                        ({maxThreadPosts} сообщение / {mostActivePercent}% ваших сообщений)
                                    </div>
                                </>
                            ) : (
                                <span className="text-gray-500">Нет сообщений</span>
                            )}
                        </div>
                   </div>
               </div>
          </div>
      </div>

      {/* Signature Area */}
      <div className="mt-8 border-t border-[#d6d9e0] pt-4">
            <h3 className="text-xs font-bold text-gray-500 mb-2">Signature</h3>
            {isEditing ? (
                 <textarea 
                    className="w-full border border-gray-400 p-2 text-xs font-serif h-24"
                    value={editFormData.signature}
                    onChange={(e) => setEditFormData({...editFormData, signature: e.target.value})}
                    placeholder="BBCode signature here..."
                 />
            ) : (
                <div className="text-xs text-gray-700 whitespace-pre-wrap font-serif">
                    {user.signature || <span className="italic text-gray-400">Нет подписи</span>}
                </div>
            )}
      </div>

      {/* Admin Panel */}
      {isFactionManagement && (
          <div className="mt-8 border-2 border-red-800 bg-red-50 p-4">
               <h3 className="text-red-900 font-bold border-b border-red-200 mb-2 flex justify-between">
                   <span>FACTION MANAGEMENT CONTROL PANEL</span>
                   <span className="text-[10px] bg-red-800 text-white px-1">ADMIN ONLY</span>
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {/* Add Plaque */}
                   <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-red-900">ASSIGN PLAQUE:</label>
                        <div className="flex gap-1">
                            <select 
                                className="text-xs border border-gray-400 p-1 flex-grow font-sans"
                                value={selectedPlaqueToAdd}
                                onChange={(e) => setSelectedPlaqueToAdd(e.target.value as PlaqueType)}
                            >
                                {Object.values(PlaqueType).map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <button 
                                onClick={handleAddPlaque}
                                className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-sm"
                            >
                                ADD
                            </button>
                        </div>
                   </div>

                   {/* Remove Plaque */}
                   <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-red-900">REMOVE PLAQUE:</label>
                        <div className="flex gap-1">
                            <select 
                                className="text-xs border border-gray-400 p-1 flex-grow font-sans"
                                value={selectedPlaqueToRemove}
                                onChange={(e) => setSelectedPlaqueToRemove(e.target.value)}
                            >
                                <option value="" disabled>Select group...</option>
                                {user.badges.map((badge) => (
                                    <option key={badge} value={badge}>{badge}</option>
                                ))}
                            </select>
                            <button 
                                onClick={handleRemovePlaque}
                                className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-sm disabled:opacity-50"
                                disabled={!selectedPlaqueToRemove}
                            >
                                REMOVE
                            </button>
                        </div>
                   </div>

                   {/* Set Rank */}
                   <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-red-900">SET RANK:</label>
                        <div className="flex gap-1">
                            <select 
                                className="text-xs border border-gray-400 p-1 flex-grow font-sans"
                                value={selectedRank}
                                onChange={(e) => setSelectedRank(e.target.value as Rank)}
                            >
                                {Object.values(Rank).map((rank) => (
                                    <option key={rank} value={rank}>{rank}</option>
                                ))}
                            </select>
                            <button 
                                onClick={handleSetRank}
                                className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-sm"
                            >
                                SET
                            </button>
                        </div>
                   </div>
               </div>
          </div>
      )}

    </div>
  );
};

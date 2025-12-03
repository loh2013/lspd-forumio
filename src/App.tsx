
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES, THEME_IMAGES } from './constants';
import { UserProfile } from './components/UserProfile';
import { RankIcon } from './components/RankIcon';
import { Plaque } from './components/Plaque';
import { Auth } from './components/Auth';
import { PostEditor } from './components/PostEditor';
import { AppProvider, useApp } from './context';
import { PlaqueType, User, Rank, Category } from './types';

// --- Helper Components ---

const Header = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/');
  }

  const bannerUrl = THEME_IMAGES.headerBanner;
  const backgroundUrl = THEME_IMAGES.headerBackground;

  // Priority: Banner (Custom Design) -> Background (Photo) -> Default Gradient
  const activeBg = bannerUrl || backgroundUrl;
  const bgSize = bannerUrl ? '100% 100%' : 'cover';

  return (
    <header className="mb-4">
      <div 
         className={`w-full h-32 md:h-40 flex items-center px-6 border-b-4 border-black shadow-lg relative overflow-hidden ${!activeBg ? 'glossy-header' : ''}`}
         style={activeBg ? { backgroundImage: `url('${activeBg}')`, backgroundSize: bgSize, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' } : {}}
      >
        {!bannerUrl && backgroundUrl && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent pointer-events-none"></div>
        )}
        
        <div className="mr-6 z-10">
           <img 
              src={THEME_IMAGES.logo}
              alt="LAPD Seal" 
              className="w-20 h-20 drop-shadow-lg filter brightness-110"
           />
        </div>
        <div className="z-10 flex flex-col justify-center">
          <h1 className="text-white text-3xl font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-tight font-sans italic">
              LOS SANTOS
              <span className="text-lapd-gold block text-4xl mt-[-5px]">POLICE DEPT.</span>
          </h1>
        </div>
      </div>
      
      <nav className="bg-lapd-dark border-y border-gray-600 flex text-xs text-white">
        <Link to="/" className="px-4 py-2 hover:bg-lapd-blue border-r border-gray-700 flex items-center gap-2">
          🏠 Home
        </Link>
        {currentUser && (
            <>
                <Link to={`/profile/${currentUser.id}`} className="px-4 py-2 hover:bg-lapd-blue border-r border-gray-700 flex items-center gap-2">
                👤 My Profile
                </Link>
                <Link to="/search" className="px-4 py-2 hover:bg-lapd-blue border-r border-gray-700 flex items-center gap-2">
                🔍 Search
                </Link>
                <Link to="/members" className="px-4 py-2 hover:bg-lapd-blue border-r border-gray-700 flex items-center gap-2">
                👥 Member List
                </Link>
            </>
        )}
        <div className="flex-grow"></div>
        {currentUser ? (
             <div className="flex items-center">
                <div className="px-4 py-2 text-gray-400 border-r border-gray-600">
                    Logged in as: <span className="font-bold text-white">{currentUser.username}</span>
                </div>
                <button onClick={handleLogout} className="px-4 py-2 hover:bg-red-800 text-red-200 font-bold">
                    Logout [X]
                </button>
            </div>
        ) : (
            <div className="px-4 py-2 text-yellow-500 font-bold animate-pulse">
                GUEST ACCESS - RESTRICTED
            </div>
        )}
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="mt-8 py-4 text-center text-[10px] text-gray-400 border-t border-gray-700 bg-lapd-dark">
    <p>Powered by ReactForum v1.0.2 (PD-Edition)</p>
    <p>&copy; 2025 Los Santos Police Department. All rights reserved.</p>
    <p className="mt-1">Skin designed by Internal Affairs.</p>
  </footer>
);

const Breadcrumbs = () => {
    return (
        <div className="text-[10px] text-gray-300 mb-2 font-verdana">
            <span className="font-bold">LAPD Portal</span> &gt; Index
        </div>
    )
}

const CategoryList = () => {
  const { currentUser, threads, posts, users } = useApp();

  const sections = [
      'ОБЩЕСТВЕННАЯ СЕКЦИЯ',
      'ВНУТРЕННЯЯ СЕКЦИЯ',
      'СЛУЖЕБНЫЕ ОТЧЕТЫ',
      'ОФИС ОПЕРАЦИЙ'
  ];

  const canViewCategory = (cat: Category): boolean => {
      // 1. If not restricted, everyone sees it
      if (!cat.isRestricted) return true;

      // 2. Guests/Civilians cannot see restricted
      if (!currentUser || currentUser.rank === Rank.CIVILIAN) return false;

      // 3. Faction Management sees everything
      if (currentUser.badges.includes(PlaqueType.FACTION_MANAGEMENT)) return true;

      // 4. If category has specific allowed plaques
      if (cat.allowedPlaques && cat.allowedPlaques.length > 0) {
          // User must have AT LEAST ONE of the allowed plaques
          const hasAccess = cat.allowedPlaques.some(p => currentUser.badges.includes(p));
          return hasAccess;
      }

      // 5. Default restricted (Internal/Reports) - Any cop sees it
      return true;
  };

  const allUsers = Object.values(users) as User[];
  const onlineUsers = allUsers.filter(u => u.status === 'Online' || u.status === 'Patrolling');
  const onlineCount = onlineUsers.length;
  const guestCount = currentUser ? 0 : 1; 

  return (
    <div className="space-y-4">
      
      {sections.map(sectionName => {
          const categories = CATEGORIES.filter(c => c.section === sectionName);
          const visibleCategories = categories.filter(c => canViewCategory(c));

          if (visibleCategories.length === 0) return null;

          return (
            <div key={sectionName} className="border border-black bg-forum-bg shadow-md">
                <div className="bg-[#183050] border-b border-black text-white text-xs font-bold px-2 py-1 flex justify-between">
                    <span className="uppercase">{sectionName}</span>
                    <div className="hidden md:flex gap-16 mr-8">
                        <span>СТАТИСТИКА</span>
                        <span>ПОСЛЕДНЕЕ СООБЩЕНИЕ</span>
                    </div>
                </div>
                
                {visibleCategories.map(cat => {
                    const catThreads = threads.filter(t => t.categoryId === cat.id);
                    const threadCount = catThreads.length;
                    const catPostsCount = posts.filter(p => catThreads.some(t => t.id === p.threadId)).length;
                    
                    const lastActiveThread = catThreads.length > 0 ? catThreads[0] : null; 
                    const lastPostAuthor = lastActiveThread ? users[lastActiveThread.lastPostAuthorId] : null;

                    return (
                        <div key={cat.id} className="bg-[#f0f3f7] border-b border-gray-300 flex flex-col md:flex-row hover:bg-white group">
                            <div className="p-3 w-16 flex-shrink-0 flex items-center justify-center">
                                {cat.isRestricted ? (
                                    <div className="w-10 h-10 rounded-full border-2 border-pink-200 bg-white flex items-center justify-center text-pink-400">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full border-2 border-red-200 bg-white flex items-center justify-center text-red-400">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                                    </div>
                                )}
                            </div>

                            <div className="p-2 flex-grow border-r border-gray-200">
                                <Link to={`/forum/${cat.id}`} className="font-bold text-[#183050] hover:underline text-sm block mb-1">
                                    {cat.name}
                                </Link>
                                
                                {cat.image && (
                                    <div className="my-1 relative w-full h-24 bg-gray-200 border border-gray-400 overflow-hidden">
                                        <div className="absolute bottom-2 right-2 text-white font-bold text-xl drop-shadow-md z-10 uppercase tracking-widest">{cat.name.split('(')[0]}</div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${cat.image})` }}></div>
                                    </div>
                                )}

                                {cat.description && <div className="text-[11px] text-gray-700 mb-2">{cat.description}</div>}

                                {/* Subforums Link List - Also checked for permissions */}
                                {cat.subforums && cat.subforums.length > 0 && (
                                    <div className="text-[10px] text-gray-600 mt-1">
                                        <span className="font-bold text-gray-800">Подфорумы: </span>
                                        {cat.subforums.map((sub, i) => {
                                            // Check access for the specific subforum category object
                                            const subCat = CATEGORIES.find(c => c.id === sub.id);
                                            if (subCat && !canViewCategory(subCat)) return null;

                                            return (
                                                <span key={i} className="mr-1">
                                                    <span className="text-gray-400 mr-1">📄</span>
                                                    <Link to={`/forum/${sub.id}`} className="hover:underline cursor-pointer text-[#183050]">{sub.name}</Link>
                                                    {i < (cat.subforums?.length || 0) - 1 ? ',' : ''}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="hidden md:flex flex-col justify-center items-center w-32 border-r border-gray-200 bg-[#f8f9fa] text-[11px] text-gray-500">
                                <div>Темы: <span className="font-bold text-black">{threadCount}</span></div>
                                <div>Сообщения: <span className="font-bold text-black">{catPostsCount}</span></div>
                            </div>

                            <div className="p-2 w-full md:w-64 flex flex-col justify-center text-[10px] bg-[#f8f9fa] md:bg-transparent">
                                {lastActiveThread ? (
                                    <>
                                        <div className="truncate w-48 font-bold text-[#183050] hover:underline cursor-pointer">
                                            <Link to={`/thread/${lastActiveThread.id}`}>{lastActiveThread.title}</Link>
                                        </div>
                                        <div className="text-gray-500">
                                            <Link to={`/profile/${lastActiveThread.lastPostAuthorId}`} className="font-bold text-[#a03030] hover:underline">
                                                {lastPostAuthor?.username || 'Unknown'}
                                            </Link> 
                                            <Link to={`/thread/${lastActiveThread.id}`} className="ml-1 px-1 bg-blue-100 border border-blue-200 rounded text-[9px] cursor-pointer inline-block">➡</Link>
                                        </div>
                                        <div className="text-gray-400">{lastActiveThread.lastPostDate}</div>
                                    </>
                                ) : (
                                    <div className="text-gray-400 italic">No posts yet</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
          );
      })}
      
       <div className="border border-black bg-white p-2 text-xs shadow-inner mt-4">
            <h3 className="font-bold text-[#183050] border-b border-gray-300 pb-1 mb-1">КТО СЕЙЧАС НА КОНФЕРЕНЦИИ</h3>
            <div className="text-gray-500 text-[11px]">
                Всего {onlineCount + guestCount} посетителей :: {onlineCount} зарегистрированных, 0 скрытых и {guestCount} гостей
                <br/>
                Больше всего посетителей (1757) здесь было 10 дек 2024, 19:38
            </div>
            <div className="mt-2 text-[11px]">
                <span className="font-bold">Зарегистрированные пользователи: </span>
                {onlineUsers.length > 0 ? onlineUsers.map((u, i) => (
                    <span key={u.id}>
                        <Link to={`/profile/${u.id}`} className={`${u.badges.includes(PlaqueType.FACTION_MANAGEMENT) ? 'text-[#a03030]' : 'text-blue-800'} font-bold hover:underline`}>
                            {u.username}
                        </Link>
                        {i < onlineUsers.length - 1 ? ', ' : ''}
                    </span>
                )) : (
                    <span className="italic text-gray-400">Нет пользователей онлайн</span>
                )}
            </div>
       </div>
    </div>
  );
};

const ThreadView = () => {
  const { threadId } = useParams();
  const { threads, posts, users, currentUser, replyToThread, editPost, deletePost } = useApp();
  const [replyContent, setReplyContent] = useState('');
  
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  const thread = threads.find(t => t.id === threadId);
  
  if (!thread) return <div>Topic not found</div>;

  const threadPosts = posts.filter(p => p.threadId === thread.id);
  
  const handleReply = (e: React.FormEvent) => {
      e.preventDefault();
      if (!replyContent.trim()) return;
      replyToThread(thread.id, replyContent);
      setReplyContent('');
  }

  const startEditing = (postId: string, currentContent: string) => {
      setEditingPostId(postId);
      setEditContent(currentContent);
  }

  const saveEdit = (postId: string) => {
      editPost(postId, editContent);
      setEditingPostId(null);
      setEditContent('');
  }

  const confirmDelete = (postId: string) => {
      if(window.confirm("Are you sure you want to delete this post?")) {
          deletePost(postId);
      }
  }

  return (
    <div className="space-y-2">
        <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl text-white font-bold bg-black/50 px-2 py-1 inline-block border border-gray-500">{thread.title}</h2>
            <button 
                className="glossy-btn text-white px-3 py-1 text-xs font-bold rounded shadow border border-black"
                onClick={() => document.getElementById('fast-reply')?.scrollIntoView({ behavior: 'smooth' })}
            >
                REPLY TO TOPIC
            </button>
        </div>

        {threadPosts.map((post, idx) => {
            const author = users[post.authorId];
            const isEditing = editingPostId === post.id;
            const canManage = currentUser && (
                currentUser.id === post.authorId || 
                currentUser.badges.includes(PlaqueType.FACTION_MANAGEMENT)
            );

            return (
                <div key={post.id} className="border border-black shadow-lg">
                    <div className="bg-[#5c7091] text-white text-[10px] p-1 flex justify-between border-b border-black">
                        <span className="font-bold">#{idx + 1}</span>
                        <span>Posted {post.createdAt}</span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row bg-forum-row1 min-h-[200px]">
                        <div className="w-full md:w-48 bg-[#f0f0f5] border-r border-gray-400 p-3 flex flex-col items-center text-center space-y-2">
                             {author ? (
                                <>
                                    <Link to={`/profile/${author.id}`} className="font-bold text-lapd-blue hover:underline text-sm">{author.username}</Link>
                                    <RankIcon rank={author.rank} className="w-32 my-1" />
                                    <div className="font-bold text-[10px] text-gray-700 uppercase">{author.rank}</div>
                                    <div className="text-[10px] text-gray-500 mt-4 text-left w-full pl-2">
                                        <div>Posts: {author.posts}</div>
                                        <div>Joined: {author.joinDate.split(',')[1] || 2008}</div>
                                        <div>Loc: LS</div>
                                    </div>
                                </>
                             ) : (
                                <div className="text-gray-500 italic">User Deleted</div>
                             )}
                        </div>

                        <div className="flex-1 p-4 flex flex-col justify-between">
                            {isEditing ? (
                                <div className="flex flex-col gap-2">
                                    <textarea 
                                        className="w-full h-32 border border-gray-400 p-2 text-sm font-sans"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={() => saveEdit(post.id)} className="bg-green-600 text-white px-2 py-1 text-xs font-bold">SAVE</button>
                                        <button onClick={() => setEditingPostId(null)} className="bg-gray-400 text-white px-2 py-1 text-xs font-bold">CANCEL</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm font-sans text-gray-900 leading-relaxed whitespace-pre-wrap">
                                    {post.content}
                                </div>
                            )}
                            
                            {author?.signature && !isEditing && (
                                <div className="mt-8 border-t border-gray-400 pt-2 text-xs text-gray-600 font-serif">
                                    {author.signature.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                                    <div className="w-full h-8 bg-gradient-to-r from-gray-300 to-transparent mt-2 opacity-50"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="bg-[#dae1ec] p-1 border-t border-gray-400 flex justify-end gap-2 text-[10px]">
                         {canManage && !isEditing && (
                             <>
                                <button onClick={() => startEditing(post.id, post.content)} className="font-bold text-gray-700 hover:text-black mr-2">EDIT</button>
                                <button onClick={() => confirmDelete(post.id)} className="font-bold text-red-700 hover:text-red-900 mr-2">DELETE</button>
                             </>
                         )}
                         <button className="font-bold text-gray-700 hover:text-black">REPORT</button>
                         <button className="font-bold text-gray-700 hover:text-black">QUOTE</button>
                    </div>
                </div>
            )
        })}

        {currentUser && (
            <div id="fast-reply" className="bg-forum-row1 border border-black p-1 mt-4">
                <div className="glossy-header px-2 py-1 text-white text-xs font-bold border-b border-black mb-2">
                    Fast Reply
                </div>
                <form onSubmit={handleReply} className="p-4">
                    <textarea 
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full border border-gray-500 p-2 text-sm h-32 font-sans mb-2"
                        placeholder="Write your reply here..."
                        required
                    />
                    <div className="flex justify-end">
                        <button type="submit" className="glossy-btn text-white px-4 py-1 text-xs font-bold rounded shadow border border-black">
                            POST REPLY
                        </button>
                    </div>
                </form>
            </div>
        )}
    </div>
  )
}

const ForumList = () => {
    const { id } = useParams();
    const { threads, users, currentUser } = useApp();
    const categoryId = id;

    const category = CATEGORIES.find(c => c.id === categoryId);
    
    // Access Check Function
    const canView = (cat: Category) => {
        if (!cat.isRestricted) return true;
        if (!currentUser || currentUser.rank === Rank.CIVILIAN) return false;
        if (currentUser.badges.includes(PlaqueType.FACTION_MANAGEMENT)) return true;
        if (cat.allowedPlaques && cat.allowedPlaques.length > 0) {
            return cat.allowedPlaques.some(p => currentUser.badges.includes(p));
        }
        return true;
    };

    if (!category || !canView(category)) return <div>Forum not found or Access Denied</div>;

    const categoryName = category.name;

    const catThreads = threads.filter(t => t.categoryId === categoryId);
    const childCategories = CATEGORIES.filter(c => c.parentId === categoryId);
    
    const visibleSubforums = childCategories.filter(canView);

    return (
        <div>
            {visibleSubforums.length > 0 && (
                <div className="border border-black bg-forum-bg shadow-md mb-4">
                    <div className="bg-[#183050] border-b border-black text-white text-xs font-bold px-2 py-1">
                        SUBFORUMS
                    </div>
                    {visibleSubforums.map(sub => (
                         <div key={sub.id} className="bg-[#f0f3f7] border-b border-gray-300 p-2 flex gap-4 items-center hover:bg-white">
                            <div className="w-8 h-8 rounded-full border border-red-200 bg-white flex items-center justify-center text-red-400">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                            </div>
                            <div>
                                <Link to={`/forum/${sub.id}`} className="font-bold text-[#183050] hover:underline text-sm">{sub.name}</Link>
                                <div className="text-[10px] text-gray-600">{sub.description}</div>
                            </div>
                         </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center mb-2">
                <div className="text-white text-xs font-bold">Viewing: {categoryName}</div>
                <Link to={`/new-topic/${categoryId}`} className="glossy-btn text-white px-3 py-1 text-xs font-bold rounded shadow border border-black flex items-center">
                    NEW TOPIC
                </Link>
            </div>
            
            <table className="w-full text-xs border border-black shadow-lg bg-white">
                <thead>
                    <tr className="glossy-header text-white">
                        <th className="p-2 text-left w-1/2">Topic Title</th>
                        <th className="p-2 w-1/6">Starter</th>
                        <th className="p-2 w-1/6">Replies</th>
                        <th className="p-2 w-1/4">Last Action</th>
                    </tr>
                </thead>
                <tbody>
                    {catThreads.length > 0 ? catThreads.map((t, i) => (
                        <tr key={t.id} className={`${i % 2 === 0 ? 'bg-forum-row1' : 'bg-forum-row2'} hover:bg-blue-50 border-b border-gray-300`}>
                            <td className="p-2">
                                {t.isPinned && <span className="text-red-700 font-bold mr-1 text-[10px]">[PINNED]</span>}
                                <Link to={`/thread/${t.id}`} className="font-bold text-lapd-blue hover:underline text-sm">
                                    {t.title}
                                </Link>
                            </td>
                            <td className="p-2 text-center text-lapd-blue font-bold">
                                {users[t.authorId]?.username || 'Unknown'}
                            </td>
                            <td className="p-2 text-center">{t.replies}</td>
                            <td className="p-2 text-[10px] text-gray-600">
                                {t.lastPostDate}<br/>
                                by <b>{users[t.lastPostAuthorId]?.username || 'Unknown'}</b>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={4} className="p-4 text-center text-gray-500 italic bg-gray-100">
                                No topics in this forum yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

const GroupView = () => {
    const { groupName } = useParams();
    const { users } = useApp();
    const decodedGroupName = decodeURIComponent(groupName || '');
    
    const groupMembers = (Object.values(users) as User[]).filter(u => {
        if (!decodedGroupName) return false;
        if (decodedGroupName === 'Civilian' && u.badges.includes(PlaqueType.CIVILIAN)) return true;
        return u.badges.includes(decodedGroupName as PlaqueType);
    });

    return (
        <div>
            <div className="glossy-header px-2 py-2 text-white text-xs font-bold border border-black mb-2">
                Viewing Group: {decodedGroupName}
            </div>
            
            <div className="bg-white border border-black p-2">
                <table className="w-full text-xs text-left">
                    <thead className="bg-[#dae1ec] border-b border-black">
                        <tr>
                            <th className="p-2">Rank Identity</th>
                            <th className="p-2">Officer Name</th>
                            <th className="p-2">Rank Title</th>
                            <th className="p-2">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupMembers.length > 0 ? groupMembers.map((member) => (
                            <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="p-2 w-48">
                                    <RankIcon rank={member.rank} className="w-32 shadow-sm" />
                                </td>
                                <td className="p-2 align-middle">
                                    <Link to={`/profile/${member.id}`} className="font-bold text-lapd-blue text-sm hover:underline">
                                        {member.username}
                                    </Link>
                                    <div className="text-gray-500 text-[10px]">{member.oocName}</div>
                                </td>
                                <td className="p-2 align-middle font-bold text-gray-700 uppercase">
                                    {member.rank}
                                </td>
                                <td className="p-2 align-middle">
                                    {member.joinDate}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No members found in this group.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const { posts, threads, users } = useApp();

    const filteredPosts = query ? posts.filter(p => p.content.toLowerCase().includes(query.toLowerCase())) : [];
    const filteredThreads = query ? threads.filter(t => t.title.toLowerCase().includes(query.toLowerCase())) : [];

    return (
        <div className="bg-forum-row1 border border-black p-1">
             <div className="glossy-header px-2 py-1 text-white text-xs font-bold border-b border-black mb-2">
                Search Forum
            </div>
            
            <div className="p-4 space-y-4">
                <div>
                     <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border border-gray-500 p-2 text-sm" 
                        placeholder="Search for keywords..."
                    />
                </div>

                {query && (
                    <div className="bg-white border border-gray-300 p-2">
                        <h3 className="font-bold text-xs border-b border-gray-200 mb-2">Results</h3>
                        
                        {filteredThreads.length === 0 && filteredPosts.length === 0 && (
                            <div className="text-gray-500 text-xs italic">No results found.</div>
                        )}

                        {filteredThreads.map(t => (
                            <div key={t.id} className="mb-2 text-xs">
                                <span className="bg-blue-100 text-blue-800 px-1 rounded mr-1">TOPIC</span>
                                <Link to={`/thread/${t.id}`} className="font-bold text-lapd-blue hover:underline">
                                    {t.title}
                                </Link>
                            </div>
                        ))}

                        {filteredPosts.map(p => {
                            const thread = threads.find(t => t.id === p.threadId);
                            const author = users[p.authorId];
                            if(!thread) return null;
                            return (
                                <div key={p.id} className="mb-2 text-xs border-b border-gray-100 pb-1">
                                    <span className="bg-gray-200 text-gray-800 px-1 rounded mr-1">POST</span>
                                    <Link to={`/thread/${thread.id}`} className="font-bold text-lapd-blue hover:underline">
                                        Re: {thread.title}
                                    </Link>
                                    <div className="text-gray-500 truncate ml-8">"{p.content.substring(0, 60)}..." by {author?.username}</div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

const UserPostsPage = () => {
    const { userId } = useParams();
    const { posts, threads, users } = useApp();
    
    const user = users[userId || ''];
    if (!user) return <div>User not found</div>;

    const userPosts = posts.filter(p => p.authorId === userId);

    return (
        <div>
            <div className="glossy-header px-2 py-2 text-white text-xs font-bold border border-black mb-2">
                Search Results: Posts by {user.username}
            </div>
            
            <div className="bg-white border border-black p-2 space-y-2">
                {userPosts.length > 0 ? userPosts.map(p => {
                    const thread = threads.find(t => t.id === p.threadId);
                    if (!thread) return null;
                    return (
                        <div key={p.id} className="bg-forum-row1 border border-gray-300 p-2 text-xs">
                            <div className="bg-[#dae1ec] p-1 border-b border-gray-400 font-bold flex justify-between">
                                <Link to={`/thread/${thread.id}`} className="text-lapd-blue hover:underline">
                                    Topic: {thread.title}
                                </Link>
                                <span className="text-gray-600">{p.createdAt}</span>
                            </div>
                            <div className="p-2 text-gray-800 italic">
                                {p.content.length > 200 ? p.content.substring(0, 200) + '...' : p.content}
                            </div>
                        </div>
                    )
                }) : (
                     <div className="p-4 text-center text-gray-500">No posts found for this user.</div>
                )}
            </div>
        </div>
    )
}

const UserProfileWrapper = () => {
    const { userId } = useParams();
    const { users } = useApp();
    const user = users[userId || ''] || Object.values(users)[0];
    
    if (!user) return <div>User not found</div>;
    return <UserProfile user={user} />;
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useApp();

  return (
    <div className="min-h-screen font-sans text-sm selection:bg-lapd-gold selection:text-black">
      <div className="max-w-5xl mx-auto bg-[#363636] shadow-2xl min-h-screen border-x-2 border-black flex flex-col">
        <div className="bg-[#e4e4e4] flex-grow">
            <Header />
            <main className="p-3 md:p-6">
               {currentUser ? (
                    <>
                        <Breadcrumbs />
                        {children}
                    </>
               ) : (
                    <Routes>
                        <Route path="/" element={<CategoryList />} />
                        <Route path="*" element={<Auth />} />
                    </Routes>
               )}
            </main>
            <Footer />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path="/forum/:id" element={<ForumList />} />
              <Route path="/new-topic/:categoryId" element={<PostEditor />} />
              <Route path="/thread/:threadId" element={<ThreadView />} />
              <Route path="/profile/:userId" element={<UserProfileWrapper />} />
              <Route path="/group/:groupName" element={<GroupView />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/user-posts/:userId" element={<UserPostsPage />} />
              <Route path="/members" element={<div className="p-4 font-bold text-center">Member List Under Maintenance</div>} />
            </Routes>
          </Layout>
        </HashRouter>
    </AppProvider>
  );
};

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, PlaqueType, Thread, Post, Rank } from './types';
import { MOCK_USERS, THREADS as MOCK_THREADS, POSTS as MOCK_POSTS } from './constants';

interface AppContextType {
  users: Record<string, User>;
  currentUser: User | null;
  threads: Thread[];
  posts: Post[];
  login: (username: string) => void;
  register: (username: string) => void;
  logout: () => void;
  updateUser: (userId: string, data: Partial<User>) => void;
  assignPlaque: (userId: string, plaque: PlaqueType) => void;
  removePlaque: (userId: string, plaque: PlaqueType) => void;
  createThread: (categoryId: string, title: string, content: string) => void;
  replyToThread: (threadId: string, content: string) => void;
  editPost: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<Record<string, User>>(MOCK_USERS);
  const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (inputName: string) => {
    // Case insensitive match for Username OR OOC Name
    const user = (Object.values(users) as User[]).find(u => 
        u.username.toLowerCase() === inputName.toLowerCase() || 
        (u.oocName && u.oocName.toLowerCase() === inputName.toLowerCase())
    );
    
    if (user) {
      setCurrentUser(user);
    } else {
      alert("User not found!");
    }
  };

  const register = (username: string) => {
    const existing = (Object.values(users) as User[]).find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existing) {
      alert("Username taken!");
      return;
    }

    const newId = `u${Date.now()}`;
    const newUser: User = {
      id: newId,
      username: username,
      // Default to Civilian per request
      rank: Rank.CIVILIAN,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      posts: 0,
      avatarUrl: '',
      // Default to Civilian plaque, no Faction Management
      badges: [PlaqueType.CIVILIAN],
      status: 'Online',
      signature: '',
      password: 'password'
    };

    setUsers(prev => ({ ...prev, [newId]: newUser }));
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUser = (userId: string, data: Partial<User>) => {
    setUsers(prev => ({
      ...prev,
      [userId]: { ...prev[userId], ...data }
    }));
  };

  const assignPlaque = (userId: string, plaque: PlaqueType) => {
    setUsers(prev => {
      const user = prev[userId];
      if (user.badges.includes(plaque)) return prev;
      return {
        ...prev,
        [userId]: { ...user, badges: [...user.badges, plaque] }
      };
    });
  };

  const removePlaque = (userId: string, plaque: PlaqueType) => {
    setUsers(prev => {
      const user = prev[userId];
      return {
        ...prev,
        [userId]: { ...user, badges: user.badges.filter(b => b !== plaque) }
      };
    });
  };

  const createThread = (categoryId: string, title: string, content: string) => {
    if (!currentUser) return;

    const threadId = `t${Date.now()}`;
    const postId = `p${Date.now()}`;
    const now = 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateStr = new Date().toISOString().split('T')[0];

    const newThread: Thread = {
      id: threadId,
      categoryId,
      title,
      authorId: currentUser.id,
      createdAt: dateStr,
      views: 0,
      replies: 0,
      lastPostDate: now,
      lastPostAuthorId: currentUser.id,
      isPinned: false
    };

    const newPost: Post = {
      id: postId,
      threadId,
      authorId: currentUser.id,
      content,
      createdAt: now
    };

    setThreads(prev => [newThread, ...prev]);
    setPosts(prev => [...prev, newPost]);
    
    // Update user post count
    updateUser(currentUser.id, { posts: currentUser.posts + 1 });
  };

  const replyToThread = (threadId: string, content: string) => {
      if (!currentUser) return;
      
      const postId = `p${Date.now()}`;
      const now = 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      const newPost: Post = {
          id: postId,
          threadId,
          authorId: currentUser.id,
          content,
          createdAt: now
      };

      setPosts(prev => [...prev, newPost]);
      
      // Update thread stats
      setThreads(prev => prev.map(t => 
          t.id === threadId 
              ? { ...t, replies: t.replies + 1, lastPostDate: now, lastPostAuthorId: currentUser.id }
              : t
      ));

      // Update user stats
      updateUser(currentUser.id, { posts: currentUser.posts + 1 });
  };

  const editPost = (postId: string, content: string) => {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, content } : p));
  };

  const deletePost = (postId: string) => {
      // Find post to get thread ID if needed, but for now just delete
      // Note: If deleting the first post, this prototype keeps the thread but it's empty.
      setPosts(prev => prev.filter(p => p.id !== postId));
  };

  return (
    <AppContext.Provider value={{ 
      users, currentUser, threads, posts, 
      login, register, logout, updateUser, 
      assignPlaque, removePlaque, createThread,
      replyToThread, editPost, deletePost
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
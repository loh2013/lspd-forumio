import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context';
import { CATEGORIES } from '../constants';

export const PostEditor = () => {
    const { categoryId } = useParams();
    const { createThread } = useApp();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const category = CATEGORIES.find(c => c.id === categoryId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryId && title && content) {
            createThread(categoryId, title, content);
            navigate(`/forum/${categoryId}`);
        }
    };

    if (!category) return <div>Invalid Category</div>;

    return (
        <div className="bg-forum-row1 border border-black p-1">
             <div className="glossy-header px-2 py-1 text-white text-xs font-bold border-b border-black mb-2">
                Posting New Topic in: {category.name}
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                    <label className="block text-xs font-bold mb-1">Topic Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-500 p-1 text-sm" 
                        placeholder="Enter subject..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold mb-1">Message Body</label>
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-gray-500 p-1 text-sm h-64 font-sans"
                        placeholder="Write your report here..."
                        required
                    />
                    <div className="text-[10px] text-gray-500 mt-1">
                        BBCode is OFF. Smilies are ON.
                    </div>
                </div>

                <div className="flex gap-2 justify-end border-t border-gray-400 pt-2">
                    <button 
                        type="button" 
                        onClick={() => navigate(`/forum/${categoryId}`)}
                        className="bg-gray-300 border border-black px-3 py-1 text-xs font-bold"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="glossy-btn text-white border border-black px-4 py-1 text-xs font-bold"
                    >
                        Post New Topic
                    </button>
                </div>
            </form>
        </div>
    );
};
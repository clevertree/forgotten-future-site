'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { X, Github, Send, Loader2 } from 'lucide-react';

interface CommentPopupProps {
    path: string;
    anchorId: string;
    onClose: () => void;
    onSuccess: (prUrl: string) => void;
}

export const CommentPopup: React.FC<CommentPopupProps> = ({
    path,
    anchorId,
    onClose,
    onSuccess
}) => {
    const { data: session, status } = useSession();
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isStatic = process.env.NEXT_PUBLIC_IS_STATIC === 'true';
    const allowAnonymous = process.env.NEXT_PUBLIC_ALLOW_ANONYMOUS_COMMENTS !== 'false' && !isStatic;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/comments/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path,
                    anchorId,
                    comment,
                    author: session?.user?.name || name,
                    email: session?.user?.email || email,
                    isAnonymous: !session,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to submit comment');
            }

            const { prUrl } = await response.json();
            onSuccess(prUrl);
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
                    <h3 className="text-lg font-bold text-cyan-400">Add Feedback</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                        Commenting on: <span className="text-gray-300">{path}#{anchorId}</span>
                    </div>

                    {!session && (
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-sm text-blue-300 mb-3 text-center">
                                Sign in with GitHub for verified contribution and credits.
                            </p>
                            <button
                                type="button"
                                onClick={() => signIn('github')}
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors"
                            >
                                <Github size={18} /> Login with GitHub
                            </button>

                            {allowAnonymous ? (
                                <>
                                    <div className="relative my-4">
                                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-900 px-2 text-gray-500">Or stay anonymous</span></div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm focus:border-cyan-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1 uppercase">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm focus:border-cyan-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="mt-4 text-xs text-center text-zinc-500 uppercase tracking-widest">
                                    Anonymous comments are currently disabled.
                                </p>
                            )}
                        </div>
                    )}

                    {session && (
                        <div className="flex items-center gap-3 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                            <div className="relative w-8 h-8 rounded-full border border-cyan-500/30 overflow-hidden">
                                <Image
                                    src={session.user?.image || ''}
                                    alt="Avatar"
                                    fill
                                    className="object-cover"
                                    sizes="32px"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{session.user?.name}</p>
                                <p className="text-xs text-gray-500">Verified Contributor</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs text-gray-400 mb-1 uppercase">Your Comment (Markdown enabled)</label>
                        <textarea
                            required
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm focus:border-cyan-500 outline-none resize-none font-mono"
                            placeholder="What can we improve? (Use @ to tag characters if relevant)"
                        />
                    </div>

                    {error && <p className="text-red-400 text-xs">{error}</p>}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || (!session && !allowAnonymous)}
                            className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                            ) : (
                                <><Send size={16} /> Submit PR</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp, ChevronLeft, ChevronRight, ArrowUp, Plus, Minus } from 'lucide-react';

export default function ScrollNavigation() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [currentChapter, setCurrentChapter] = useState<number | null>(null);
    const [maxChapter, setMaxChapter] = useState(78);
    const isFullText = pathname?.includes('/manuscript/full-text');

    // Lock logic to prevent "echoing" during manual scrolls
    const isLockedRef = useRef(false);
    const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const currentChapterRef = useRef(currentChapter);
    useEffect(() => {
        currentChapterRef.current = currentChapter;
    }, [currentChapter]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Bottom of page detection for final chapter
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            if (isAtBottom && isFullText && maxChapter > 0 && !isLockedRef.current) {
                if (currentChapterRef.current !== maxChapter) {
                    setCurrentChapter(maxChapter);
                }
            }

            // If user manually scrolls/interacts while locked, eventually unlock
            if (isLockedRef.current) {
                if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
                lockTimeoutRef.current = setTimeout(() => {
                    isLockedRef.current = false;
                }, 150); // Short debounce to ensure smooth scroll finished
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isFullText, maxChapter]);

    useEffect(() => {
        if (!isFullText) {
            setCurrentChapter(null);
            return;
        }

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            // Ignore observer if we are currently mid-manual-scroll
            if (isLockedRef.current) return;

            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (id?.startsWith('chapter-')) {
                        const num = parseInt(id.replace('chapter-', ''));
                        if (!isNaN(num)) {
                            if (currentChapterRef.current !== num) {
                                setCurrentChapter(num);
                            }
                        }
                    }
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0,
            rootMargin: '-15% 0px -85% 0px'
        });

        // Use a small delay to ensure DOM is ready on route changes
        const timeoutId = setTimeout(() => {
            const chapterElements = document.querySelectorAll('[id^="chapter-"]');
            if (chapterElements.length > 0) {
                // Extract highest chapter ID safely
                const ids = Array.from(chapterElements)
                    .map(el => parseInt(el.id.replace('chapter-', '')))
                    .filter(n => !isNaN(n));
                if (ids.length > 0) {
                    setMaxChapter(Math.max(...ids));
                }
            }
            chapterElements.forEach((chapter) => observer.observe(chapter));
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [isFullText, pathname]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToChapter = (chapterId: number) => {
        const element = document.getElementById(`chapter-${chapterId}`);
        
        if (element) {
            // 1. Cancel any pending unlock timeouts
            if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);

            // 2. Lock the observer to prevent "echoing" during the transition
            isLockedRef.current = true;

            // 3. Update state immediately
            setCurrentChapter(chapterId);

            // 4. Update URL hash (syncs TOC sidebar)
            if (window.history.pushState) {
                window.history.pushState(null, '', `#chapter-${chapterId}`);
            }

            // 5. Perform the scroll after a tiny delay to ensure state update doesn't clobber it
            setTimeout(() => {
                const rect = element.getBoundingClientRect();
                const absoluteTop = rect.top + window.pageYOffset;
                const style = window.getComputedStyle(element);
                const marginTop = parseInt(style.scrollMarginTop) || 0;
                const targetY = absoluteTop - marginTop;

                window.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                });

                // 6. Safety timeout to release lock
                lockTimeoutRef.current = setTimeout(() => {
                    isLockedRef.current = false;
                }, 1500);
            }, 10);
        }
    };

    return (
        <div
            className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-center gap-3 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
                } max-md:left-1/2 max-md:-translate-x-1/2 max-md:right-auto max-md:flex-row max-md:bottom-8`}
        >
            {isFullText && currentChapter !== null && (
                <div className="flex items-center gap-1 bg-black/90 backdrop-blur-xl border border-cyan-500/20 p-1 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all">
                    <button
                        onClick={() => scrollToChapter(Math.max(1, currentChapter - 1))}
                        className="p-2 hover:bg-cyan-500/20 text-cyan-400 rounded-full transition-colors active:scale-90 disabled:opacity-30"
                        title="Previous Chapter (-)"
                        disabled={currentChapter <= 1}
                    >
                        <Minus size={18} />
                    </button>
                    <button
                        onClick={() => scrollToChapter(currentChapter)}
                        className="px-2 min-w-[40px] text-[10px] font-black text-cyan-400 hover:text-white transition-colors text-center"
                        title={`Top of Chapter ${currentChapter}`}
                    >
                        {currentChapter}/{maxChapter}
                    </button>
                    <button
                        onClick={() => scrollToChapter(Math.min(maxChapter, currentChapter + 1))}
                        className="p-2 hover:bg-cyan-500/20 text-cyan-400 rounded-full transition-colors active:scale-90 disabled:opacity-30"
                        title="Next Chapter (+)"
                        disabled={currentChapter >= maxChapter}
                    >
                        <Plus size={18} />
                    </button>
                </div>
            )}

            <button
                onClick={scrollToTop}
                className="p-3.5 bg-cyan-500 text-black rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 hover:scale-110 active:scale-90 transition-all"
                title="Return to Top"
            >
                <ArrowUp size={24} strokeWidth={3} />
            </button>
        </div>
    );
}

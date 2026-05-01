'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { getNewsStore } from '@/lib/store';

const GRADIENTS = [
  'from-[#0a2e1a] via-[#0d4a2a] to-[#1a6b3c]',
  'from-[#0a2233] via-[#0d3a4a] to-[#1a5b6b]',
  'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
  'from-[#2d1b00] via-[#4a2e00] to-[#6b4400]',
  'from-[#1a0a2e] via-[#2d1b4a] to-[#3d2b6b]',
  'from-[#0a2e2e] via-[#0d4a4a] to-[#1a6b6b]',
];

export default function NewsCarousel() {
  const news = getNewsStore().slice(0, 6);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 400);
  }, [animating]);

  const prev = useCallback(() => goTo((current - 1 + news.length) % news.length), [current, news.length, goTo]);
  const next = useCallback(() => goTo((current + 1) % news.length), [current, news.length, goTo]);

  useEffect(() => {
    if (paused || news.length === 0) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next, news.length]);

  if (news.length === 0) return null;

  const item = news[current];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '480px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {news.map((n, i) => (
        <div key={n._id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          {n.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={n.image} alt={n.titleAr}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </>
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
        </div>
      ))}

      {/* Thin top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 z-30" />

      {/* Content */}
      <div className={`absolute inset-0 z-20 flex flex-col justify-end pb-14 px-8 md:px-16 transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <div className="max-w-2xl">
          {/* Category + date */}
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {item.category}
            </span>
            <span className="text-white/60 text-xs flex items-center gap-1.5">
              <Calendar size={11} />
              {new Date(item.createdAt).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-3xl font-bold text-white mb-3 leading-snug drop-shadow">
            {item.titleAr}
          </h2>

          {/* Excerpt */}
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-5 max-w-xl">
            {item.contentAr}
          </p>

          {/* CTA */}
          <Link href={`/news/${item._id}`}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg">
            اقرأ المزيد <ArrowLeft size={14} />
          </Link>
        </div>
      </div>

      {/* Side arrows */}
      <button onClick={prev}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
        <ChevronRight size={20} className="text-white" />
      </button>
      <button onClick={next}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
        <ChevronLeft size={20} className="text-white" />
      </button>

      {/* Bottom bar: dots + progress */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-20 py-4 bg-gradient-to-t from-black/40 to-transparent">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {news.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-8 h-2.5 bg-green-400'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="text-white/50 text-xs font-mono tracking-widest">
          {String(current + 1).padStart(2, '0')} / {String(news.length).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 z-30 h-0.5 bg-green-400"
          style={{ animation: 'progress 6s linear infinite', width: '100%', transformOrigin: 'left' }}
        />
      )}

      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

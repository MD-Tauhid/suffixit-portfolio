'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';

export interface ProjectItem {
  title: string;
  desc?: string;
}

export interface ProjectData {
  title: string;
  subtitle?: string;
  description: string;
  link: string;
  color: string;
  accentColor?: string;
  items?: (string | ProjectItem)[];
  deliverable?: string;
  stepNumber?: string;
}

interface CardProps {
  i: number;
  title: string;
  subtitle?: string;
  description: string;
  url: string;
  color: string;
  accentColor?: string;
  items?: (string | ProjectItem)[];
  deliverable?: string;
  stepNumber?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  subtitle,
  description,
  url,
  color,
  accentColor,
  items,
  deliverable,
  stepNumber,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const activeAccent = accentColor || '#0072bc';

  return (
    <div
      ref={container}
      className='min-h-screen flex items-start justify-center sticky'
      style={{
        top: `calc(70px + ${i * 18}px)`,
      }}
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
        }}
        className='flex flex-col relative w-[95%] max-w-[1360px] 2xl:max-w-[1440px] h-auto min-h-[580px] md:h-[calc(100vh-96px)] md:max-h-[700px] md:min-h-[540px] rounded-3xl p-6 md:p-10 origin-top border border-white/90 shadow-[0_24px_60px_-15px_rgba(0,60,140,0.08),0_4px_16px_rgba(0,0,0,0.02)] backdrop-blur-xl overflow-hidden'
      >
        {/* Top brand gradient accent bar matching step accent */}
        <div
          className='absolute top-0 left-0 right-0 h-[4px]'
          style={{
            background: `linear-gradient(90deg, ${activeAccent}, #3cb4f0, #5b8def)`,
          }}
        />

        {/* Subtle ambient lighting inside card */}
        <div
          className='absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl pointer-events-none'
          style={{ backgroundColor: `${activeAccent}14` }}
        />
        <div
          className='absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none'
          style={{ backgroundColor: `${color}40` }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/20 pointer-events-none' />

        <div className='relative z-10 flex items-center justify-between border-b border-white/80 pb-4 mb-5'>
          <div className='flex items-center gap-3'>
            <span
              className='text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-sm'
              style={{
                color: activeAccent,
                backgroundColor: `${activeAccent}15`,
                border: `1px solid ${activeAccent}30`,
              }}
            >
              {stepNumber || `STEP 0${i + 1}`}
            </span>
            {subtitle && (
              <span className='text-xs md:text-sm font-semibold text-[#515978] hidden sm:inline-block'>
                {subtitle}
              </span>
            )}
          </div>
          <h2 className='text-2xl md:text-3xl font-extrabold tracking-tight text-[#17162a]'>{title}</h2>
        </div>

        <div className='relative z-10 flex flex-col md:flex-row h-full gap-8 md:gap-12 items-center'>
          <div className='w-full md:w-[46%] flex flex-col justify-between h-full py-1'>
            <div>
              <p className='text-[#515978] text-sm md:text-base leading-relaxed mb-5 font-normal'>
                {description}
              </p>
              {items && items.length > 0 && (
                <ul className='space-y-2.5 mb-5'>
                  {items.map((item, idx) => {
                    const isObj = typeof item === 'object' && item !== null;
                    const itemTitle = isObj ? item.title : item;
                    const itemDesc = isObj ? item.desc : null;
                    return (
                      <li
                        key={idx}
                        className='flex items-start gap-3 text-sm text-[#17162a] bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/90 shadow-[0_2px_8px_rgba(0,40,90,0.04)] transition-all duration-200 hover:bg-white hover:translate-x-1'
                      >
                        <span
                          className='w-5 h-5 mt-0.5 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 font-bold shadow-sm'
                          style={{
                            color: activeAccent,
                            backgroundColor: `${activeAccent}18`,
                            border: `1px solid ${activeAccent}30`,
                          }}
                        >
                          ✓
                        </span>
                        <div className='flex flex-col'>
                          <span className='font-bold text-[#17162a] text-sm leading-tight'>
                            {itemTitle}
                          </span>
                          {itemDesc && (
                            <span className='text-xs text-[#6a6980] font-normal leading-relaxed mt-1'>
                              {itemDesc}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {deliverable && (
                <div className='mb-4 py-2 px-3.5 rounded-xl bg-white/60 border border-white/80 flex items-center gap-2 text-xs text-[#515978] shadow-sm'>
                  <span className='font-bold uppercase tracking-wider text-[10px]' style={{ color: activeAccent }}>
                    Output:
                  </span>
                  <span className='font-medium text-[#17162a] truncate'>{deliverable}</span>
                </div>
              )}
            </div>

            <div className='pt-1'>
              <a
                href='#contact'
                className='inline-flex items-center gap-2.5 text-sm md:text-base font-bold text-white bg-[#0072bc] hover:bg-[#005c99] px-6 py-3.5 rounded-xl shadow-md shadow-[#0072bc]/25 transition-all group'
              >
                <span>Start with this step</span>
                <svg
                  width='18'
                  height='10'
                  viewBox='0 0 22 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='transform transition-transform group-hover:translate-x-1.5'
                >
                  <path
                    d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                    fill='currentColor'
                  />
                </svg>
              </a>
            </div>
          </div>

          <div
            className='relative w-full md:w-[54%] h-[300px] sm:h-[380px] md:h-full rounded-2xl md:rounded-3xl overflow-hidden'
            style={{ backgroundColor: color }}
          >
            {/* 1. Zooming Image Layer (Clean, no internal overlays or hover scales) */}
            <motion.div className='w-full h-full' style={{ scale: imageScale }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={title}
                className='absolute inset-0 w-full h-full object-cover'
              />
            </motion.div>

            {/* 2. Fixed Stationary Overlay - Stays fixed regardless of image zoom */}
            <div
              className='absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl z-20'
              style={{
                border: `3px solid ${color}`,
                boxShadow: `inset 0 0 30px 18px ${color}`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(({ projects }, _ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <div ref={container} className='relative w-full'>
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project.link}
              title={project.title}
              subtitle={project.subtitle}
              color={project.color}
              accentColor={project.accentColor}
              description={project.description}
              items={project.items}
              deliverable={project.deliverable}
              stepNumber={project.stepNumber}
              progress={scrollYProgress}
              range={[i * (1 / projects.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </ReactLenis>
  );
});

Component.displayName = 'StackingCardComponent';

export default Component;

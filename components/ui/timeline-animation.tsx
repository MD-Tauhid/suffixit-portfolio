'use client';

import React, { ElementType, RefObject } from 'react';
import { motion, Variants } from 'motion/react';

interface TimelineContentProps {
  as?: ElementType;
  animationNum?: number;
  timelineRef?: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children: React.ReactNode;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  as = 'div',
  animationNum = 0,
  customVariants,
  className,
  children,
}) => {
  const Component = motion.create(as);

  const defaultVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: 20,
      opacity: 0,
    },
  };

  return (
    <Component
      variants={customVariants || defaultVariants}
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default TimelineContent;


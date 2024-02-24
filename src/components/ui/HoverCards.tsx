"use client";

import { cn } from "@/utils/cn";
import { Badge } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string[];
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Badge
          key={item.link}
          content={idx + 1}
          className="h-12 w-12 text-zinc-100 font-bold text-lg absolute z-20 bg-gradient-to-tl from-primary-700 to-secondary-500"
          placement="top-left"
        >
          <Link
            href={item?.link}
            key={item?.link}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-400 block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.25 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.25, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>{item.title}</CardTitle>
              {item.description.map((d) => (
                <CardDescription key={d}>{d}</CardDescription>
              ))}
            </Card>
          </Link>
        </Badge>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-gradient-to-br from-primary-700/[0.9] to-secondary-600/[0.9] border border-transparent  group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 font-bold tracking-wide mt-4 mb-8",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "my-4 text-zinc-100 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

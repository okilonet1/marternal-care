import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  title: string;
  benefits: string;
  content: string;
  highlights?: string[];
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-sky-100 px-1 py-0.5 font-bold text-sky-700 dark:bg-emerald-700/[0.2] dark:text-sky-500",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
  }, []);

  const startFlipping = () => {
    const interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 10000);

    return () => clearInterval(interval);
  };

  return (
    <div className="relative h-60 w-full md:h-60 md:w-96">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute flex flex-col gap-2 rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] dark:border-white/[0.1] dark:bg-black dark:shadow-white/[0.05] md:h-60 md:w-96"
          style={{
            transformOrigin: "top center",
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
            zIndex: cards.length - index, //  decrease z-index for the cards that are behind
          }}
        >
          <div>
            <p className="font-medium text-neutral-500 dark:text-white">
              {card.title}
            </p>
            <p className="font-light text-neutral-500 dark:text-neutral-300">
              {card.benefits}
            </p>
          </div>
          <div className="font-normal text-neutral-700 dark:text-neutral-200">
            {typeof card.content === "string"
              ? card.content.split(" ").map((word, index) => {
                  if (
                    card.highlights &&
                    card.highlights.includes(word.toLowerCase())
                  ) {
                    return <Highlight key={index}>{word}</Highlight>;
                  } else {
                    return word + " ";
                  }
                })
              : card.content}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

"use client";

import { FC } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { validateRequest } from "@/lib/auth";

const Chat: FC = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="relative z-40 bg-white shadow"
    >
      <AccordionItem value="item-1">
        <div className="fixed bottom-2 right-2 w-80 overflow-hidden rounded-md border border-gray-200 bg-white">
          <div className="flex h-full w-full flex-col">
            <AccordionTrigger className="border-b border-zinc-300 px-6">
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex h-80 flex-col">
                <ChatMessages className="flex-1 px-2 py-3" />
                <ChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Chat;

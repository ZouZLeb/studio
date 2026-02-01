"use client";

import { leadQualifyingChatbot } from "@/ai/flows/lead-qualifying-chatbot";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageSquare, Send, X, User, Loader } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
  isQualified?: boolean;
  nextStep?: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I can help you determine if our custom automation solutions are a good fit for you. What industry are you in, and what kind of project are you considering?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await leadQualifyingChatbot({ message: input });
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.response,
        isQualified: response.isQualified,
        nextStep: response.nextStep,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const isLastMessage = (index: number) => index === messages.length - 1;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50"
          >
            <Card className="w-[calc(100vw-32px)] sm:w-96 shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">Lead Qualifier</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96 pr-4" ref={scrollAreaRef}>
                  <div className="p-4 space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={cn("flex items-end gap-2", {
                          "justify-end": message.sender === "user",
                        })}
                      >
                        {message.sender === "bot" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <Bot className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                            {
                              "bg-primary text-primary-foreground":
                                message.sender === "user",
                              "bg-muted": message.sender === "bot",
                            }
                          )}
                        >
                          <p>{message.text}</p>
                          {isLastMessage(index) && message.isQualified && message.nextStep && (
                             <Button
                               size="sm"
                               className="mt-2 w-full"
                               onClick={() => {
                                 // This could open the calendly modal
                                 // For now, we will just log it
                                 console.log("Schedule consultation clicked");
                                 // In a real app, you would have state management to open the CTASection's modal
                               }}
                             >
                               Schedule a consultation
                             </Button>
                          )}
                        </div>
                        {message.sender === "user" && (
                           <Avatar className="h-8 w-8">
                             <AvatarFallback className="bg-muted text-muted-foreground">
                               <User className="h-5 w-5" />
                             </AvatarFallback>
                           </Avatar>
                        )}
                      </motion.div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                <Bot className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-muted flex items-center">
                                <Loader className="w-4 h-4 animate-spin mr-2"/>
                                Thinking...
                            </div>
                        </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="pt-4">
                <form
                  onSubmit={handleSendMessage}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    id="message"
                    placeholder="Type your message..."
                    className="flex-1"
                    autoComplete="off"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
        className="fixed bottom-4 right-4 sm:right-6 z-40"
      >
        <Button
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Chatbot"
        >
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </Button>
      </motion.div>
    </>
  );
}

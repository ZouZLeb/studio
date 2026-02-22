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
import { generateSignature, getDeviceFingerprint } from "@/lib/security";

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
      text: "Hello! I'm the AImatic assistant. I can help you find out if custom automation is right for your business. What kind of tasks take up most of your time lately?",
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
      // SECURITY LAYER: Generate verification metadata
      const nonce = Math.random().toString(36).substring(7);
      const timestamp = Date.now();
      const signature = await generateSignature(input, nonce, timestamp);
      const fingerprint = getDeviceFingerprint();

      const response = await leadQualifyingChatbot({ 
        message: input,
        nonce,
        timestamp,
        signature,
        fingerprint
      });

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.response,
        isQualified: response.isQualified,
        nextStep: response.nextStep,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Client Error:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "I'm having a little trouble connecting. Please try again or email us at hello@aimatic.com!",
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
            <Card className="w-[calc(100vw-32px)] sm:w-96 shadow-2xl border-border/50 bg-background/95 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/30">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-headline">AImatic Helper</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
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
                        transition={{ delay: 0.05 }}
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
                            "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                            {
                              "bg-primary text-primary-foreground rounded-br-none":
                                message.sender === "user",
                              "bg-muted text-foreground rounded-bl-none": message.sender === "bot",
                            }
                          )}
                        >
                          <p className="leading-relaxed">{message.text}</p>
                          {isLastMessage(index) && message.isQualified && (
                             <Button
                               size="sm"
                               variant="outline"
                               className="mt-3 w-full bg-background/50"
                               onClick={() => {
                                 const contactSection = document.getElementById('contact');
                                 if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                                 setIsOpen(false);
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
                            <div className="max-w-[80%] rounded-2xl rounded-bl-none px-4 py-2 text-sm bg-muted flex items-center">
                                <Loader className="w-4 h-4 animate-spin mr-2"/>
                                Typing...
                            </div>
                        </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/30">
                <form
                  onSubmit={handleSendMessage}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    id="message"
                    placeholder="Type your message..."
                    className="flex-1 rounded-full bg-muted/50 border-none"
                    autoComplete="off"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" className="rounded-full h-10 w-10" disabled={isLoading || !input.trim()}>
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
          className="rounded-full w-14 h-14 shadow-2xl border-4 border-background"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Chatbot"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </Button>
      </motion.div>
    </>
  );
}

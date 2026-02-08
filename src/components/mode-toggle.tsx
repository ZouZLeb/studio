"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-border/50 bg-background/20 backdrop-blur-sm flex-shrink-0" />
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-10 w-10 rounded-full relative overflow-hidden group transition-all duration-300 border backdrop-blur-md shadow-sm",
        "bg-primary/5 border-primary/20 dark:bg-black/20 dark:border-white/10",
        "hover:bg-primary/10 dark:hover:bg-black/30",
        "flex-shrink-0 aspect-square p-0"
      )}
      onClick={toggleTheme}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="flex items-center justify-center w-full h-full absolute inset-0"
        >
          {resolvedTheme === "dark" ? (
            <Moon className="h-5 w-5 text-white" />
          ) : (
            <Sun className="h-5 w-5 text-primary" />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Background hover fill effect */}
      <motion.div 
        className="absolute inset-0 bg-primary/5 dark:bg-white/5 -z-10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 2, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

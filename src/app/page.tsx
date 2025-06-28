"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { User, Stethoscope, Shield, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

// --- HolographicBody Component ---
const bodyParts = {
  brain: { name: "Brain", id: "brain" },
  heart: { name: "Heart", id: "heart" },
  spine: { name: "Spine", id: "spine" },
};

function HolographicBody() {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const pathVariants = {
    initial: {
      stroke: "hsl(var(--accent) / 0.6)",
      filter: "drop-shadow(0 0 2px hsl(var(--accent)))",
    },
    hover: {
      stroke: "hsl(var(--primary))",
      filter: "drop-shadow(0 0 5px hsl(var(--primary))) drop-shadow(0 0 10px hsl(var(--primary)))",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative w-48 h-96 md:w-64 md:h-[420px]">
      <motion.svg
        viewBox="0 0 150 300"
        className="w-full h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <g id="body-outline" strokeWidth="2" fill="none">
          {/* Head */}
          <motion.path
            d="M75,50 A25,25 0 1,1 75,0 A25,25 0 1,1 75,50"
            variants={pathVariants}
            initial="initial"
            animate={hoveredPart === "brain" ? "hover" : "initial"}
            onHoverStart={() => setHoveredPart("brain")}
            onHoverEnd={() => setHoveredPart(null)}
          />
          {/* Torso */}
          <motion.path
            d="M50,55 L40,150 Q75,180 110,150 L100,55 Z"
            variants={pathVariants}
            initial="initial"
            animate={hoveredPart === "heart" ? "hover" : "initial"}
            onHoverStart={() => setHoveredPart("heart")}
            onHoverEnd={() => setHoveredPart(null)}
          />
          {/* Spine */}
          <motion.path
            d="M75,50 L75,160"
            variants={pathVariants}
            initial="initial"
            animate={hoveredPart === "spine" ? "hover" : "initial"}
            onHoverStart={() => setHoveredPart("spine")}
            onHoverEnd={() => setHoveredPart(null)}
          />
           {/* Legs */}
          <motion.path d="M40,150 L30,280 M110,150 L120,280" variants={pathVariants} initial="initial" />
           {/* Arms */}
          <motion.path d="M50,65 L20,130 M100,65 L130,130" variants={pathVariants} initial="initial" />
        </g>
      </motion.svg>
      <AnimatePresence>
        {hoveredPart && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/20 text-foreground text-sm rounded-full border border-primary backdrop-blur-sm"
          >
            {bodyParts[hoveredPart as keyof typeof bodyParts]?.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Role Icons Config ---
const roleIcons = [
  { icon: User, label: "Patient", position: { angle: 45, distance: 150 }},
  { icon: Stethoscope, label: "Doctor", position: { angle: 165, distance: 150 }},
  { icon: Shield, label: "Admin", position: { angle: 285, distance: 150 }},
];

// --- Splash Page Component ---
export default function SplashPage() {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    setMousePosition({ x, y });
  };
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const sequence = async () => {
      await new Promise(res => setTimeout(res, 500));
      controls.start({
        transform: ['translate(0)', 'translate(-2px, 2px)', 'translate(2px, -2px)', 'translate(-2px, -2px)', 'translate(2px, 2px)', 'translate(0)'],
        transition: { duration: 0.2, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
      });
    }
    sequence();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [controls]);
  
  const bodyParallaxStrength = 15;
  const iconParallaxStrength = 30;

  return (
    <TooltipProvider>
      <div 
        className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1c] to-[#112033] text-foreground overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 constellation-grid opacity-50" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 p-4 w-full"
        >
          <motion.h1
            animate={controls}
            className="text-5xl md:text-7xl font-headline font-bold text-primary tracking-tighter animate-pulse-glow"
          >
            Zizo Specialty Core
          </motion.h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-body">
            “Where Precision Meets Expertise.”
          </p>

          <div className="relative flex items-center justify-center my-4 md:my-8 h-[360px] md:h-96 w-full max-w-sm">
            <motion.div
              animate={{
                x: mousePosition.x * bodyParallaxStrength,
                y: mousePosition.y * bodyParallaxStrength,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            >
              <HolographicBody />
            </motion.div>
            {roleIcons.map(({ icon: Icon, label, position }, index) => {
              const distance = isMobile ? 120 : position.distance;
              const initialX = distance * Math.cos(position.angle * (Math.PI / 180));
              const initialY = distance * Math.sin(position.angle * (Math.PI / 180));
              
              return (
                <motion.div
                  key={label}
                  className="absolute"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    x: initialX + mousePosition.x * iconParallaxStrength,
                    y: initialY + mousePosition.y * iconParallaxStrength,
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    opacity: { delay: 1.2 + index * 0.2, duration: 0.5 },
                    scale: { delay: 1.2 + index * 0.2, type: "spring", stiffness: 50 },
                    x: { type: "spring", stiffness: 80, damping: 15 },
                    y: { type: "spring", stiffness: 80, damping: 15 },
                  }}
                >
                  <Tooltip>
                      <TooltipTrigger asChild>
                          <motion.div 
                              className="p-3 bg-card/50 border border-border rounded-full shadow-lg backdrop-blur-sm"
                              whileHover={{ scale: 1.2, boxShadow: '0 0 20px hsl(var(--primary))' }}
                              style={{ animation: `float 8s ease-in-out infinite ${index * 2}s`}}
                          >
                              <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                          </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                          <p>{label}</p>
                      </TooltipContent>
                  </Tooltip>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <Button asChild size="lg" className="font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-transform transform hover:scale-105 bg-primary/90 text-primary-foreground hover:bg-primary hover:shadow-[0_0_20px_hsl(var(--primary))]">
              <Link href="/auth">
                <Rocket className="mr-2" />
                Launch System
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.footer 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 2.5}}
          className="absolute bottom-4 text-center text-sm text-muted-foreground z-10"
        >
          © {new Date().getFullYear()} Zizo Specialty Core. All rights reserved.
        </motion.footer>
      </div>
    </TooltipProvider>
  );
}

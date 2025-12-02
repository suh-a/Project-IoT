import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Move } from "lucide-react";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  animation: "blink-left" | "blink-right" | "move-head" | "double-blink" | "select-action" | "double-left";
}

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TutorialStep[] = [
    {
      id: 1,
      title: "Clique Esquerdo",
      description: "Pisque o olho esquerdo uma vez para clicar com o botão esquerdo do mouse.",
      animation: "blink-left"
    },
    {
      id: 2,
      title: "Clique Direito",
      description: "Pisque o olho direito uma vez para clicar com o botão direito do mouse.",
      animation: "blink-right"
    },
    {
      id: 3,
      title: "Mover o Mouse",
      description: "Balance a cabeça para mover o cursor do mouse na tela.",
      animation: "move-head"
    },
    {
      id: 4,
      title: "Duplo Clique",
      description: "Para duplo clique, pisque um dos olhos 2 vezes rapidamente.",
      animation: "double-blink"
    },
    {
      id: 5,
      title: "Selecionar Arquivos",
      description: "Para clicar e selecionar com o botão direito, feche o olho direito 1 vez e mova a cabeça para baixo, após isso pisque o olho sobre o arquivo que deseja selecionar.",
      animation: "select-action"
    },
    {
      id: 6,
      title: "Abrir Arquivos",
      description: "Para abrir arquivos, pisque o olho esquerdo 2 vezes.",
      animation: "double-left"
    }
  ];

  const currentTutorial = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Layout>
      <section className="py-24 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Como usar o <span className="text-gradient">Colibrino</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Aprenda os comandos básicos para controlar o computador com movimentos da cabeça
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index === currentStep
                      ? "bg-primary text-primary-foreground"
                      : index < currentStep
                      ? "bg-primary/30 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step.id}
                </button>
              ))}
            </div>
            <div className="h-1 bg-secondary rounded-full">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Tutorial Content */}
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12">
              {/* Robot Head Animation */}
              <div className="flex justify-center mb-8">
                <RobotHead animation={currentTutorial.animation} key={currentStep} />
              </div>

              {/* Step Info */}
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                  Passo {currentTutorial.id} de {steps.length}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {currentTutorial.title}
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  {currentTutorial.description}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>

                <Button
                  variant="hero"
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                >
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center">
              Referência Rápida
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`glass-card p-4 cursor-pointer transition-all ${
                    currentStep === step.id - 1 ? "border-primary" : ""
                  }`}
                  onClick={() => setCurrentStep(step.id - 1)}
                >
                  <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Robot Head Component with animations
const RobotHead = ({ animation }: { animation: string }) => {
  const [leftEyeOpen, setLeftEyeOpen] = useState(true);
  const [rightEyeOpen, setRightEyeOpen] = useState(true);
  const [headPosition, setHeadPosition] = useState({ x: 0, y: 0 });
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Reset state when animation changes
    setLeftEyeOpen(true);
    setRightEyeOpen(true);
    setHeadPosition({ x: 0, y: 0 });
    setAnimationPhase(0);

    let interval: NodeJS.Timeout;

    switch (animation) {
      case "blink-left":
        // Pisca o olho esquerdo uma vez
        interval = setInterval(() => {
          setAnimationPhase(prev => {
            const newPhase = (prev + 1) % 4;
            setLeftEyeOpen(newPhase !== 1); // Fecha no fase 1
            setRightEyeOpen(true);
            return newPhase;
          });
        }, 400);
        break;

      case "blink-right":
        // Pisca o olho direito uma vez
        interval = setInterval(() => {
          setAnimationPhase(prev => {
            const newPhase = (prev + 1) % 4;
            setRightEyeOpen(newPhase !== 1); // Fecha no fase 1
            setLeftEyeOpen(true);
            return newPhase;
          });
        }, 400);
        break;

      case "move-head":
        // Balance a cabeça
        interval = setInterval(() => {
          setAnimationPhase(prev => {
            const newPhase = (prev + 1) % 6;
            const positions = [
              { x: 0, y: 0 },
              { x: 15, y: 0 },
              { x: 0, y: 0 },
              { x: -15, y: 0 },
              { x: 0, y: -10 },
              { x: 0, y: 10 },
            ];
            setHeadPosition(positions[newPhase]);
            return newPhase;
          });
        }, 500);
        break;

      case "double-blink":
        // Pisca 2 vezes rápido
        interval = setInterval(() => {
          setAnimationPhase(prev => {
            const newPhase = (prev + 1) % 8;
            // Pisca nas fases 1 e 3
            const eyesClosed = newPhase === 1 || newPhase === 3;
            setLeftEyeOpen(!eyesClosed);
            setRightEyeOpen(!eyesClosed);
            return newPhase;
          });
        }, 200);
        break;

      case "select-action":
        // Fecha olho direito, move cabeça para baixo, pisca
        interval = setInterval(() => {
          setAnimationPhase(prev => {
            const newPhase = (prev + 1) % 10;
            if (newPhase < 3) {
              // Fase 1: Fecha olho direito
              setRightEyeOpen(false);
              setLeftEyeOpen(true);
              setHeadPosition({ x: 0, y: 0 });
            } else if (newPhase < 6) {
              // Fase 2: Move cabeça para baixo
              setRightEyeOpen(true);
              setLeftEyeOpen(true);
              setHeadPosition({ x: 0, y: 15 });
            } else if (newPhase < 8) {
              // Fase 3: Pisca o olho
              setRightEyeOpen(newPhase !== 6);
              setLeftEyeOpen(true);
              setHeadPosition({ x: 0, y: 15 });
            } else {
              // Reset
              setRightEyeOpen(true);
              setLeftEyeOpen(true);
              setHeadPosition({ x: 0, y: 0 });
            }
            return newPhase;
          });
        }, 300);
        break;

      case "double-left":
        // Pisca o olho esquerdo 2 vezes
        interval = setInterval(() => {
          setAnimationPhase(prev => {
            const newPhase = (prev + 1) % 8;
            // Pisca nas fases 1 e 3
            const leftClosed = newPhase === 1 || newPhase === 3;
            setLeftEyeOpen(!leftClosed);
            setRightEyeOpen(true);
            return newPhase;
          });
        }, 200);
        break;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [animation]);

  return (
    <div className="relative">
      <div 
        className="relative w-48 h-56 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${headPosition.x}px, ${headPosition.y}px)` }}
      >
        {/* Head Shape */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary to-card rounded-3xl border-2 border-primary/30 shadow-lg">
          {/* Tech Pattern */}
          <div className="absolute inset-2 border border-primary/20 rounded-2xl" />
          
          {/* Top Light */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-primary/50 rounded-full animate-pulse" />
          
          {/* Eyes Container */}
          <div className="absolute top-16 left-0 right-0 flex justify-center gap-6">
            {/* Left Eye */}
            <div className="relative">
              <div 
                className={`w-14 bg-card rounded-lg border-2 border-primary/50 flex items-center justify-center overflow-hidden transition-all duration-150 ${
                  leftEyeOpen ? 'h-10' : 'h-1'
                }`}
              >
                {leftEyeOpen && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  </div>
                )}
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">ESQ</span>
            </div>
            
            {/* Right Eye */}
            <div className="relative">
              <div 
                className={`w-14 bg-card rounded-lg border-2 border-accent/50 flex items-center justify-center overflow-hidden transition-all duration-150 ${
                  rightEyeOpen ? 'h-10' : 'h-1'
                }`}
              >
                {rightEyeOpen && (
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-accent-foreground rounded-full" />
                  </div>
                )}
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">DIR</span>
            </div>
          </div>

          {/* Mouth / Status Bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-3 bg-card rounded-full border border-primary/30 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent w-1/2 animate-pulse" />
          </div>

          {/* Side Indicators */}
          <div className="absolute top-1/2 -left-1 w-2 h-8 bg-primary/30 rounded-r-full" />
          <div className="absolute top-1/2 -right-1 w-2 h-8 bg-accent/30 rounded-l-full" />
        </div>
      </div>

      {/* Movement Indicator */}
      {animation === "move-head" && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <ChevronLeft className="w-4 h-4 text-primary animate-pulse" />
          <Move className="w-5 h-5 text-muted-foreground" />
          <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
        </div>
      )}

      {/* Action Label */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
        <span className="text-xs text-primary font-medium">
          {animation === "blink-left" && "Piscando olho esquerdo"}
          {animation === "blink-right" && "Piscando olho direito"}
          {animation === "move-head" && "Movendo a cabeça"}
          {animation === "double-blink" && "Duplo clique"}
          {animation === "select-action" && "Selecionando arquivo"}
          {animation === "double-left" && "Abrindo arquivo"}
        </span>
      </div>
    </div>
  );
};

export default Tutorial;

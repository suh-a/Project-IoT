import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Gamepad2, MousePointer, Move, Settings } from "lucide-react";

interface Ball {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface Square {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  completed: boolean;
}

const Desafios = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [sensitivity, setSensitivity] = useState(5);
  
  // Challenge 1 state
  const [balls, setBalls] = useState<Ball[]>([]);
  const [score1, setScore1] = useState(0);
  
  // Challenge 2 state
  const [squares, setSquares] = useState<Square[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [score2, setScore2] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Challenge 1: Generate balls
  const startChallenge1 = () => {
    setActiveChallenge(1);
    setScore1(0);
    generateBalls();
  };

  const generateBalls = useCallback(() => {
    const newBalls: Ball[] = [];
    for (let i = 0; i < 5; i++) {
      newBalls.push({
        id: Date.now() + i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: 40 + sensitivity * 5
      });
    }
    setBalls(newBalls);
  }, [sensitivity]);

  const handleBallClick = (id: number, e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setBalls(prev => prev.filter(ball => ball.id !== id));
      setScore1(prev => prev + 1);
      
      if (balls.length === 1) {
        setTimeout(() => generateBalls(), 500);
      }
    }
  };

  // Challenge 2: Drag squares
  const startChallenge2 = () => {
    setActiveChallenge(2);
    setScore2(0);
    generateSquares();
  };

  const generateSquares = useCallback(() => {
    const newSquares: Square[] = [];
    for (let i = 0; i < 3; i++) {
      newSquares.push({
        id: Date.now() + i,
        x: 10 + i * 25,
        y: 20,
        targetX: 60 + Math.random() * 30,
        targetY: 60 + Math.random() * 20,
        completed: false
      });
    }
    setSquares(newSquares);
  }, []);

  const handleSquareMouseDown = (id: number, e: React.MouseEvent) => {
    if (e.button === 2) { // Right click
      e.preventDefault();
      setDragging(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setSquares(prev => prev.map(sq => 
        sq.id === dragging 
          ? { ...sq, x: Math.max(0, Math.min(90, x)), y: Math.max(0, Math.min(85, y)) }
          : sq
      ));
    }
  };

  const handleMouseUp = () => {
    if (dragging !== null) {
      setSquares(prev => prev.map(sq => {
        if (sq.id === dragging) {
          const distance = Math.sqrt(
            Math.pow(sq.x - sq.targetX, 2) + Math.pow(sq.y - sq.targetY, 2)
          );
          if (distance < 10 * sensitivity) {
            setScore2(s => s + 1);
            return { ...sq, completed: true, x: sq.targetX, y: sq.targetY };
          }
        }
        return sq;
      }));
      setDragging(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <section className="py-24 min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Carregando...</div>
        </section>
      </Layout>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <section className="py-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              <Gamepad2 className="inline-block w-10 h-10 mr-3 text-primary" />
              Desafios Colibrino
            </h1>
            <p className="text-muted-foreground">
              Pratique o controle do mouse com os olhos
            </p>
          </div>

          {/* Sensitivity Control */}
          <div className="max-w-md mx-auto mb-8 glass-card p-4">
            <div className="flex items-center gap-4">
              <Settings className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">Sensibilidade:</span>
              <input
                type="range"
                min="1"
                max="10"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm text-primary font-bold">{sensitivity}</span>
            </div>
          </div>

          {activeChallenge === null ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Challenge 1 Card */}
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <MousePointer className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  Desafio 1: Clique nas Bolas
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Use o olho esquerdo (clique esquerdo) para estourar as bolas
                </p>
                <Button variant="hero" onClick={startChallenge1}>
                  Iniciar Desafio
                </Button>
              </div>

              {/* Challenge 2 Card */}
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4">
                  <Move className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  Desafio 2: Arraste os Quadrados
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Use o olho direito (clique direito) para arrastar até o alvo
                </p>
                <Button variant="hero" onClick={startChallenge2}>
                  Iniciar Desafio
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <Button variant="outline" onClick={() => setActiveChallenge(null)}>
                  ← Voltar
                </Button>
                <div className="text-xl font-bold text-primary">
                  Pontuação: {activeChallenge === 1 ? score1 : score2}
                </div>
              </div>

              {activeChallenge === 1 && (
                <div 
                  className="glass-card relative h-[500px] overflow-hidden cursor-crosshair"
                  style={{ userSelect: 'none' }}
                >
                  {balls.map(ball => (
                    <div
                      key={ball.id}
                      onClick={(e) => handleBallClick(ball.id, e)}
                      className="absolute rounded-full bg-gradient-to-br from-primary to-accent cursor-pointer hover:scale-110 transition-transform shadow-lg"
                      style={{
                        left: `${ball.x}%`,
                        top: `${ball.y}%`,
                        width: ball.size,
                        height: ball.size,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                  <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                    Clique com o botão esquerdo nas bolas
                  </div>
                </div>
              )}

              {activeChallenge === 2 && (
                <div 
                  className="glass-card relative h-[500px] overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ userSelect: 'none' }}
                >
                  {/* Target zones */}
                  {squares.map(sq => (
                    <div
                      key={`target-${sq.id}`}
                      className="absolute border-2 border-dashed border-primary/50 rounded-lg"
                      style={{
                        left: `${sq.targetX}%`,
                        top: `${sq.targetY}%`,
                        width: 60,
                        height: 60,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                  
                  {/* Draggable squares */}
                  {squares.map(sq => (
                    <div
                      key={sq.id}
                      onMouseDown={(e) => handleSquareMouseDown(sq.id, e)}
                      className={`absolute rounded-lg cursor-grab transition-colors ${
                        sq.completed 
                          ? 'bg-green-500' 
                          : dragging === sq.id 
                            ? 'bg-accent cursor-grabbing' 
                            : 'bg-gradient-to-br from-primary to-accent'
                      }`}
                      style={{
                        left: `${sq.x}%`,
                        top: `${sq.y}%`,
                        width: 50,
                        height: 50,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                  <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                    Clique com o botão direito e arraste até o alvo
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Desafios;

import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ReadingProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-background">
      <div 
        className="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_10px_rgba(201,168,76,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

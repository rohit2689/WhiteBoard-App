import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconsButton } from "./IconsButton";
import { Circle, Pencil, RectangleHorizontal } from "lucide-react";
import { Game } from "@/draw/Game";


export type Tool = "circle" | "pencil" | "rect"

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle")

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool])

    useEffect(() => {

        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy()
            }
        }

    }, [canvasRef])

    return <div style={{
        height: "100vh",
        overflow: "hidden",
    }}>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <TopBar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
    </div>
}

function TopBar({ selectedTool, setSelectedTool }: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return <div style={{
        position: "fixed",
        top: 10,
        left: 10
    }}>
        <div className="flex gap-4">
            <IconsButton onClick={() => {
                setSelectedTool("pencil")
            }} activated={selectedTool === "pencil"} icon={<Pencil />} />
            <IconsButton onClick={() => {
                setSelectedTool("rect")
            }} activated={selectedTool === "rect"} icon={<RectangleHorizontal />} />
            <IconsButton onClick={() => {
                setSelectedTool("circle")
            }} activated={selectedTool === "circle"} icon={<Circle />} />
        </div>
    </div>
}
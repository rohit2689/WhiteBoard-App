"use client"
import { WS_BACKEND } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket| null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_BACKEND}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkY2EwMGRjYS0yZGZlLTQ5ZGYtYThmNi01MGVlNTUxYTU5YWEiLCJpYXQiOjE3NTg0MzE4NzB9.b9vGyFB1gNZZDUih5XyL3OTUHtmmbVdM8jKtYKaVFq0`)

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }

    },[]) 

    if(!socket) {
        return <div>
            Connecting to Server.........
        </div>
    }
     
    return <div>
       <Canvas roomId={roomId} socket={socket}/>
    </div>
}
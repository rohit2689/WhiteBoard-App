const express = require("express");
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req: any, res: any) => {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            messeage: "Incorrect Inputs"
        })
        return;
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                password: await bcrypt.hash(parsedData.data?.password, 10),
                name: parsedData.data.name,
            }
        })
        res.json({
            userId: user.id
        })

    } catch (e) {
        res.status(411).json({
            messeage: "User Already Exists"
        })
    }
})

app.post("/signin", async (req: any, res: any) => {

    const parsedData = SigninSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    const { username, password } = parsedData.data;

    const user = await prismaClient.user.findFirst({
        where: {
            email: username
        },
        select: {
            id: true,
            password: true
        }
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const userId = user.id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        token
    })
})

app.post("/room", middleware, async (req: any, res: any) => {
    //dbcall
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            messeage: "Incorrect Inputs"
        })
        return;
    }

    const userId = req.userId;
    const room = await prismaClient.room.create({
        data: {
            slug: parsedData.data?.name,
            adminId: userId,
        }
    })

    res.json({
        roomId: room.id
    })

})


app.get("/chats/:roomId", async function (req: any, res: any) {
   
        const roomId = Number(req.params.roomId);
        const message = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000 
        })
        res.json({
            message
        });
})

app.get("/room/:slug", async function (req: any, res: any) {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }

    })
    res.json({
        room
    });
})




const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

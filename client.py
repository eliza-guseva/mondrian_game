import asyncio
import websockets

async def hello():
    async with websockets.connect("ws://localhost:8001") as websocket:
        await websocket.send("Hello world!")
        print('said hello')
        variable = await websocket.recv()
        print(variable)

asyncio.run(hello())

import asyncio
import websockets
import json
from game import Game


games = {}


def init_game():
    return

def process_init(init_event: dict):
    game_name = init_event['game_name']
    if not game_name in games:
        games[game_name] = Game(game_name, init_event['timeout'])
    return games[game_name]
        

async def begin_game(websocket):
    async for message in websocket:
        event = json.loads(message)
        if event['type'] == 'init':
            process_init(event)
        print(message)


async def main():
    async with websockets.serve(begin_game, "", 8001):
        await asyncio.Future()  # run forever

asyncio.run(main())


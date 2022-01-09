function getMousePos(canvas: HTMLCanvasElement, event: MouseEvent) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function colorRectDefault(ctx: CanvasRenderingContext2D, rectangles: number[][], rectNum: number){
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(
            rectangles[rectNum][0],
            rectangles[rectNum][1],
            rectangles[rectNum][2],
            rectangles[rectNum][3]
        );
    ctx.strokeRect(
        rectangles[rectNum][0],
        rectangles[rectNum][1],
        rectangles[rectNum][2],
        rectangles[rectNum][3]
        )
}

function colorRectMondrian(ctx: CanvasRenderingContext2D, mondrianColors: string[], rectangles: number[][], rectNum: number){
    ctx.fillStyle = mondrianColors[rectNum];
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.fillRect(
            rectangles[rectNum][0],
            rectangles[rectNum][1],
            rectangles[rectNum][2],
            rectangles[rectNum][3]
        );
    ctx.strokeRect(
        rectangles[rectNum][0],
        rectangles[rectNum][1],
        rectangles[rectNum][2],
        rectangles[rectNum][3]
        )
}

let game =  {
    rectangles: [
        [0, 0, 200, 300], 
        [0, 300, 200, 200],
        [0, 500, 200, 100],
        [200, 0, 400, 500],
        [200, 500, 300, 100],
        [500, 500, 100, 100]
    ]
}

let mondrianColors = [
    "yellow", "white", "blue", "red", "white", "white"
]

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d');

for (let i = 0; i < game.rectangles.length; i++) {
    colorRectDefault(ctx, game.rectangles, i)
}


canvas.addEventListener('click', function(evt) {
    
    let mousePos = getMousePos(canvas, evt);
    for (let i = 0; i < game.rectangles.length; i++)
    {
        let rect = {
            x: game.rectangles[i][0],
            y: game.rectangles[i][1],
            width: game.rectangles[i][2],
            height: game.rectangles[i][3]
        }
    
        if (isInside(mousePos,rect)) {
            let divMouseDown = setTimeout(function() {
                colorRectDefault(ctx, game.rectangles, i)
             }, 2700);

            colorRectMondrian(ctx, mondrianColors, game.rectangles, i)
        }
        }  
}, false);

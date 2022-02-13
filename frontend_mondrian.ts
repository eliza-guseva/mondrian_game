

function getMousePos(canvas: HTMLCanvasElement, event: MouseEvent): {x: number, y: number} {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


function generateGame(): {}{
    return 
}


class Rectangle {
    x: number;
    y: number;
    height: number;
    width: number;
    isPressed: boolean;
    timeout: number;
    mondrianColor: string;
    ctx: CanvasRenderingContext2D;

    constructor(x: number, y: number, width: number, height: number, mondrianColor: string, ctx: CanvasRenderingContext2D) {
      this.height = height;
      this.width = width;
      this.x = x;
      this.y = y;
      this.isPressed = false;
      this.mondrianColor = mondrianColor;
      this.ctx = ctx;
    }

  draw(): void{
        this.ctx.fillStyle = this.isPressed ? this.mondrianColor: 'green';
        this.ctx.lineWidth = this.isPressed ? 10: 1;
        this.ctx.strokeStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    ifInside(pos: {x: number; y: number}): boolean{
        return pos.x > this.x && pos.x < this.x + this.width && pos.y < this.y + this.height && pos.y > this.y
    }

    processClick(mousePos: {x: number, y: number}, timeout: number){
        if (this.ifInside(mousePos)) {
            this.isPressed = true;
            this.draw();
            this.timeout = setTimeout(() => {
                this.isPressed = false;
                this.draw();
             }, timeout);
        }
    }

    cancelTimeout(){
        clearTimeout(this.timeout);
    }
}

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');

let rectangles = <Rectangle[]> [
        new Rectangle(0, 0, 200, 300, 'yellow', ctx), 
        new Rectangle(0, 300, 200, 200, 'white', ctx),
        new Rectangle(0, 500, 200, 100, 'blue', ctx),
        new Rectangle(200, 0, 400, 500, 'red', ctx),
        new Rectangle(200, 500, 300, 100, 'white', ctx),
        new Rectangle(500, 500, 100, 100, 'white', ctx),
    ]



// TODO make into a function handle reading from server
let challengeLevel = parseInt(prompt('Set your timeout in ms', '3000'))


document.getElementById('title').innerHTML = `Your challenge level is ${challengeLevel} milliseconds`;
const timeout = <number> challengeLevel;

for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].draw()
}


canvas.addEventListener('click', function(evt) {
    let mousePos = getMousePos(canvas, evt);
    for (let i = 0; i < rectangles.length; i++){
        let rect = rectangles[i]
        rect.processClick(mousePos, timeout);
        
    }
    if (rectangles.reduce(function(pv, cv) { return pv && cv.isPressed; }, true))
    {
        for (let i = 0; i < rectangles.length; i++){
            rectangles[i].cancelTimeout();
        }
        document.getElementById('title').innerHTML = `Ty krasavcheg!!`;
        setTimeout( () => {
            for (let i = 0; i < rectangles.length; i++){
                rectangles[i].isPressed = false;
                rectangles[i].draw();
                document.getElementById('title').innerHTML = `Your challenge level is ${challengeLevel} milliseconds`;
            } 
            },
            5000
        )
}
    }
    
)

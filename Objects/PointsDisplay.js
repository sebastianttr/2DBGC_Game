import GameObject from "./GameObject.js";

class PointsDisplay extends GameObject {

    constructor(context, x, y, width, height, CONFIG,onCanvas){
        super(context, x, y, width, height,"./images/background.jpg", CONFIG);

        this.currentPoints = 0;
        this.onCanvas = onCanvas;

        this.init();
    }

    init(){
        document.getElementById("wrapper").style.display = (this.onCanvas)?"none":"flex";
    }

    render(){
        if(this.onCanvas){
            //move it to the desired position
            this.context.translate(this.x,this.y);
            
            //set the style
            this.context.fillStyle = "green";

            // draw the rect to the canvas
            this.context.fillRect(
                -this.width/2, 
                -this.height/2, 
                this.width,
                this.height
            );
            

            // fill draw a new text
            this.context.fillStyle = "black";
            this.context.textAlign = "center";

            
            this.context.font = '15px Arial';
            this.context.fillText(
                "Your score",
                0, 
                -5  
            )

            this.context.font = '60px Arial';
            this.context.fillText(
                this.currentPoints,
                0, 
                45
            )

        
            
            //Reset transform
            this.context.resetTransform();
        }
        else {
            document.getElementById("score").innerHTML = this.currentPoints;
        }
        
    }

    increase() {
        this.currentPoints += 1;
    }

}

export default PointsDisplay;










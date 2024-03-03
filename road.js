class Road{
    constructor(x,width,lanecount=3){
        this.x=x;
        this.width;
        this.lanecount=lanecount;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;

    }
    draw(ctx){
        ctx.linewidth=5;
        ctx.strokeStyle="white";

        for(let i=0;i<=this.lanecount;i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.lanecount
            );
            ctx.beginpath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            cyx.stocke();

        
        }
    }       
}   

function lerp(A,B,t){
    return A+(B-A)*t;
}
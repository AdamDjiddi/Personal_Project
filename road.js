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
    getLaneCenter(laneIndex){
        const lanewidth=this.width/this.lanecount;
        return this.left+lanewidth/2+Math.min(laneIndex,this.lanecount-1)*lanewidth;

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
            if(i>0 && i<this.lanecount){
                ctx.setLineDash([20,20]);
            }else{
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();

        
        }
    }       
}   


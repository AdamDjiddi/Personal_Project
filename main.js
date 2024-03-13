const carcanvas=document.getElementById("carcanvas");
carcanvas.width=200;
const networkcanvas=document.getElementById("networkcanvas");
networkcanvas.width=300;

const carctx = carcanvas.getContext("2d");
const networkctx = carcanvas.getContext("2d");

const road=new Road(carcanvas.width/2,carcanvas.width*0.9);

const N=100;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }

    }
    
}

const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2)


];

console.log(road.getLaneCenter(1))

animate();

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));

}
function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1)100,30,50,"AI"));
    }
    return cars;

}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);

    }
    for(let ii=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );

    carcanvas.height=window.innerHeight;
    networkcanvas.height=window.innerHeight;

    carctx.save();
    carctx.translate(0,-bestCar.y+carcanvas.height*0.7);

    road.draw(carctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carctx,"red");
    }
    carctx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carctx,"blue");
    }
    carctx.globalAlpha=1;
    bestCar.draw(carctx,"blue",true);

    carctx.restore();
    
    networkctx.lineDashOffset=-time/50;
    visualizer.drawNetwork(networkctx,bestCar.brain);
    requestAnimationFrame(animate);
}
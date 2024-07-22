//플레이어 클래스 구현
class Player extends Unit
{
    constructor(_x,_y)
    {
        super(_x,_y); 
        this.gImage=new GameImage("images/11.png");
        this.gImage.pos.x = _x;
        this.gImage.pos.y = _y;

        this.collisionRadius = 30;

        //플레이어 스탯 정의
        this.moveSpeed=100;
        this.hp=100;
        this.armPoint=0;

        this.getExp=0;
        
        this.magneticRadius = 100;

        
    }
    
}

class PlayerManager
{
    constructor()
    {
        this.player = new Player(mainCanvas.width/2, mainCanvas.height/2);

    }

    init()
    {

    }

    update()
    {
        
    }

    render()
    {
       this.player.gImage.render();
    }
}
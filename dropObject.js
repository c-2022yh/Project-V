class DropObject extends Unit
{
    constructor(_x,_y)
    {
        super(_x,_y);
    }
}

class ExpObject extends DropObject
{
    constructor(_x,_y,_r)
    {
        super(_x,_y); 
        this.rank = _r;

        
        this.moveSpeed=200;

        this.gImage;
        this.exp=1;

        this.isGrabbed=false;
        this.collisionRadius = 5;
        if(this.rank==1)
        {
            this.gImage=new GameImage("images/exp2.png");
            this.exp = 2;
        }
        else if(this.rank==2)
        {
            this.gImage=new GameImage("images/exp3.png");
            this.exp = 50;
        }
        else 
        {
            this.gImage=new GameImage("images/exp1.png");
        }


        this.gImage.pos.x = _x;
        this.gImage.pos.y = _y;

    }


    grabbed()
    {
        if(this.isGrabbed)
        {
            let x = mainCanvas.width/2 - this.gImage.pos.x;
            let y = mainCanvas.height/2 - this.gImage.pos.y;
    
            let distance = Math.sqrt(x*x + y*y);
    
            this.gImage.pos.x += (x/distance) * this.moveSpeed * deltaTime;
            this.gImage.pos.y += (y/distance) * this.moveSpeed * deltaTime;
        }
    }



}

class ExpObjectManager
{
    constructor()
    {
        this.expObjectList = [];
    }
    init()
    {

    }

    update(player)
    {
        this.checkInMagneticRadius(player);

        this.expObjectList.forEach(e => e.grabbed());

        this.deleteExpObject(player);

    }

    render()
    {
        this.expObjectList.forEach(e => e.gImage.render());
    }

    makeExpObject(_x,_y,_r)
    { 
        this.expObjectList.push(new ExpObject(_x,_y,_r));

    }
    deleteExpObject(player)
    {
        let playerX = player.gImage.pos.x;
        let playerY = player.gImage.pos.y;
        let playerCollisionRadius = player.collisionRadius;
        for(let i in this.expObjectList)
        {
            let expX = this.expObjectList[i].gImage.pos.x;
            let expY = this.expObjectList[i].gImage.pos.y;
            let expRadius = this.expObjectList[i].collisionRadius;

            let dx = playerX - expX;
            let dy = playerY - expY;

            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance <= playerCollisionRadius + expRadius)
            {
                player.getExp+=this.expObjectList[i].exp;
                this.expObjectList.splice(i,1);
                break;
            }
        }
    }

    checkInMagneticRadius(player)
    {
        let playerX = player.gImage.pos.x;
        let playerY = player.gImage.pos.y;
        let playerRadius = player.magneticRadius;
        for(let i in this.expObjectList)
        {
            let expX = this.expObjectList[i].gImage.pos.x;
            let expY = this.expObjectList[i].gImage.pos.y;
            let expRadius = this.expObjectList[i].collisionRadius;

            let dx = playerX - expX;
            let dy = playerY - expY;

            let distance = Math.sqrt(dx*dx + dy*dy);

            if(distance <= playerRadius+expRadius)
            {
                this.expObjectList[i].isGrabbed = true;
            }
        }
    }


}
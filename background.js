//배경 클래스 구성

class Background extends Unit
{
    constructor(_x,_y,_r)
    {
        super(_x,_y);

        this.gImage;
        this.r = _r%2;
        if(this.r==0) this.gImage=new GameImage("images/b1.png");
        else this.gImage=new GameImage("images/b2.png");

        this.gImage.anchor.x = 0;
        this.gImage.anchor.y = 0;

        this.gImage.pos.x= this.x;
        this.gImage.pos.y= this.y;
    }
}


class BackgroundManager
{
    constructor()
    {
        this.backgroundList = [];

    }
    init()
    {
        this.makeBackground();
    }

    update()
    {
        this.backgroundManager();
    }

    render()
    {
        this.backgroundList.forEach(e => e.gImage.render());
    }

    makeBackground()
    {
        let backGroundWidth = 100;
        let backGroundHeight = 100;

        for(let i=0;i<mainCanvas.width/backGroundWidth+1;i++)
        {
            for(let j=0;j<mainCanvas.height/backGroundHeight+1;j++)
            {
                this.backgroundList.push(new Background(i*backGroundWidth, j*backGroundHeight, i+j));
            }
        }
    }

    backgroundManager()
    {
        let x = 100;
        let y = 100;

        for(let i in this.backgroundList)
        {
            let newX = this.backgroundList[i].gImage.pos.x; 
            let newY = this.backgroundList[i].gImage.pos.y;
            let newR = this.backgroundList[i].r+1;
            if(this.backgroundList[i].gImage.pos.x > mainCanvas.width) //left
            {
                this.backgroundList[i] = new Background(newX-700, newY, newR);
            }
            else if(this.backgroundList[i].gImage.pos.x + x < 0) //right
            {
                this.backgroundList[i] = new Background(newX+700, newY, newR);
            }
            else if(this.backgroundList[i].gImage.pos.y > mainCanvas.height) //up
            {
                this.backgroundList[i] = new Background(newX, newY-700, newR);
            }
            else if(this.backgroundList[i].gImage.pos.y + y < 0) //down
            {
                this.backgroundList[i] = new Background(newX, newY+700, newR);
            }
        }
    }
}
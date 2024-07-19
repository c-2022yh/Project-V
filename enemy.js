//적 클래스 구현

class Enemy extends Unit
{
    constructor(_x,_y) //생성자
    {
        super(_x, _y); //부모 생성자 호출

        this.hp=1; //체력

        this.moveSpeed = 50;

        this.dx=1;
        this.dy=1;

        this.gImage = undefined;
        let r = Math.floor(Math.random()*5);
        if(r==0) this.gImage=new GameImage("images/11.png");
        else if(r==1) this.gImage=new GameImage("images/21.png");
        else if(r==2) this.gImage=new GameImage("images/31.png");
        else if(r==3) this.gImage=new GameImage("images/41.png");
        else if(r==4) this.gImage=new GameImage("images/51.png");


        
        this.gImage.pos.x = _x;
        this.gImage.pos.y = _y;
        this.collisionRadius = this.gImage.image.width/2;
        if(this.collisionRadius == 0) this.collisionRadius = 28;
    }

    move()
    {
        let x = mainCanvas.width/2 - this.gImage.pos.x - this.gImage.image.width/2;
        let y = mainCanvas.height/2 - this.gImage.pos.y - this.gImage.image.height/2;

        let distance = Math.sqrt(x*x + y*y);

        this.dx = (x/distance) * this.moveSpeed;
        this.dy = (y/distance) * this.moveSpeed;

        if(this.dx > 0) this.gImage.scale.x = -1;
        else if(this.dx < 0) this.gImage.scale.x = 1;


        
        this.gImage.pos.x += this.dx * deltaTime;
        this.gImage.pos.y += this.dy * deltaTime;
    }
  
    dead() //죽을 때 실행되는 함수
    {

    }
}

class EnemyManager
{
    constructor()
    {
        this.enemyList = [];
        this.makeEnemyDelay = 300;
    }
    init()
    {
        for(let i=0;i<10;i++)
        {
            this.makeEnemy();
        };
    }

    update()
    {
        this.makeEnemyDelay--;
        if(this.makeEnemyDelay <= 0)
        {
            this.makeEnemyDelay = 300;

            this.makeEnemy();
        }

        this.enemyList.forEach(e => e.move());

        this.checkCollision();
        this.deleteEnemy();
    }

    render()
    {
        this.enemyList.forEach(e => e.gImage.render());
    }

    makeEnemy()
    {
        let x = -100;
        let y = -100;
        let randomPoint = Math.floor(Math.random()*mainCanvas.width-200) + 100;
        let r = Math.floor(Math.random()*4);
        if(r==0) //top
        {
            x = randomPoint;
        }
        else if(r==1) //down
        {
            x = randomPoint;
            y = mainCanvas.height+100;
        }
        else if(r==2) //left
        {
            y = randomPoint;
        }
        else if(r==3) //right
        {
            x = mainCanvas.width+100;
            y = randomPoint;
        }
        this.enemyList.push(new Enemy(x,y));
    }
    
    deleteEnemy()
    {
        for(let i in this.enemyList)
        {
            if(this.enemyList[i].hp <= 0)
            {
                this.enemyList[i].dead();
                this.enemyList.splice(i,1);
                break;
            }
        }

    }


    checkCollision()
    {
        //서로 충돌 방지
        for(let i in this.enemyList)
        {
            for(let j in this.enemyList)
            {
                if(i!=j)
                {
                    let dx = this.enemyList[i].gImage.pos.x - this.enemyList[j].gImage.pos.x;
                    let dy = this.enemyList[i].gImage.pos.y - this.enemyList[j].gImage.pos.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);

                    let s = this.enemyList[i].collisionRadius * 2; //수정해야함
                    if(distance < s)
                    {
                        let angle = Math.atan2(dy,dx);
                        let moveX = Math.cos(angle) * (s - distance) / 2;
                        let moveY = Math.sin(angle) * (s - distance) / 2;
                        this.enemyList[i].gImage.pos.x += moveX;
                        this.enemyList[i].gImage.pos.y += moveY;
                        this.enemyList[j].gImage.pos.x -= moveX;
                        this.enemyList[j].gImage.pos.y -= moveY;

                    }
                }

            }
        }
    }


}
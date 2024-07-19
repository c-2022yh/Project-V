//총알 클래스 구현

class Bullet extends Unit
{
    constructor(_x,_y,_a) //생성자
    {
        super(_x,_y,);
        this.angle = _a;
        this.moveSpeed=500; //이동 속도
        
        //이미지 및 좌표 설정
        this.gImage=new GameImage("images/bullet.png");
        this.gImage.pos.x=_x;
        this.gImage.pos.y=_y;

        this.collisionRadius = this.gImage.image.width/2;
        if(this.collisionRadius==0) this.collisionRadius = 5;
    }
    move() //이동 구현 함수
    {
        this.gImage.pos.x += this.moveSpeed * deltaTime * Math.cos(this.angle);
        this.gImage.pos.y += this.moveSpeed * deltaTime * Math.sin(this.angle);
    }
}

class BulletManager
{
    constructor()
    {
        this.bulletList = []; //총알들을 저장할 리스트
        this.shootDelay = 300; //총알 발사 딜레이
    }
    init()
    {

    }

    update(enemyList)
    {
        this.shootDelay--;
        if(this.shootDelay <= 0)
        {
            this.shootDelay=300;

            this.makeBullet(enemyList);
        }
        this.bulletList.forEach(e => e.move());
        this.hit(enemyList);
        this.deleteBullet();
    }

    render()
    {
        this.bulletList.forEach(e => e.gImage.render());
    }

    makeBullet(enemyList)
    {
        let angle;
        let nearestDistance = Infinity;
        let nearestEnemy = {x:0, y:0};
        for(let i in enemyList)
        {
            let x = enemyList[i].gImage.pos.x - mainCanvas.width/2;
            let y = enemyList[i].gImage.pos.y - mainCanvas.height/2;
            let distance = Math.sqrt(x * x + y * y);
            if(nearestDistance > distance)
            {
                nearestDistance = distance;
                nearestEnemy.x = enemyList[i].gImage.pos.x;
                nearestEnemy.y = enemyList[i].gImage.pos.y;
            }
        }
        angle = Math.atan2(nearestEnemy.y - mainCanvas.height/2, nearestEnemy.x - mainCanvas.width/2);
        let b = new Bullet(mainCanvas.width/2, mainCanvas.height/2, angle);
        this.bulletList.push(b);
    }

    deleteBullet()
    {
        for(let i in this.bulletList)
        {
            if(this.bulletList[i].gImage.pos.x <= -10 ||
                this.bulletList[i].gImage.pos.y <= -10 ||
                this.bulletList[i].gImage.pos.x >= mainCanvas.width + 10 ||
                this.bulletList[i].gImage.pos.y >= mainCanvas.height + 10)
            {
                this.bulletList.splice(i,1);
                break;
            }
        }

    }


    hit(enemyList)
    {
        for(let i in this.bulletList)
        {
            let bulletPoint = {x:this.bulletList[i].gImage.pos.x, y:this.bulletList[i].gImage.pos.y};

            for(let j in enemyList)
            {
                let enemyPoint = {x:enemyList[j].gImage.pos.x, y:enemyList[j].gImage.pos.y};
                let dx = bulletPoint.x - enemyPoint.x;
                let dy = bulletPoint.y - enemyPoint.y;

                let distance = Math.sqrt(dx*dx + dy*dy);

                if(distance <= this.bulletList[i].collisionRadius + enemyList[j].collisionRadius)
                {
                    this.bulletList.splice(i,1); //총알 삭제
                    enemyList[j].hp-=1; //체력 감소
                    break;
                }

            }
        }

    }


}
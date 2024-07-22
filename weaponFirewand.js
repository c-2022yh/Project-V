//완드 가장 가까운 적에게 에너지볼트 발사

class WeaponFireWand extends BasicWeapon
{
    constructor()
    {
        super();

        this.bulletList = []; //총알들을 저장할 리스트
        this.SKILLDELAY = 1000;
        this.skillDelay = this.SKILLDELAY; //총알 발사 딜레이

        this.projectileList = this.bulletList; //투사체

    }
    
    init()
    {

    }

    update(enemyList)
    {
        this.skillDelay--;
        if(this.skillDelay <= 0)
        {
            this.skillDelay=this.SKILLDELAY;

            this.makeBullet();
        }
        this.bulletList.forEach(e => e.move());
        this.hit(enemyList);
        this.deleteBullet();
    }

    render()
    {
        this.bulletList.forEach(e => e.gImage.render());
    }

    makeBullet()
    {
        let r = Math.floor(Math.random()*360);
        for(let i=0;i<3;i++)
        {
             // * (Math.PI / 180);
            let angle = r*Math.PI/180;
            let b = new FirewandBullet(mainCanvas.width/2, mainCanvas.height/2, angle);
            this.bulletList.push(b);
            r+=5;
        }
        
    }

    deleteBullet()
    {
        for(let i in this.bulletList)
        {
            if(this.bulletList[i].gImage.pos.x <= -50 ||
                this.bulletList[i].gImage.pos.y <= -50 ||
                this.bulletList[i].gImage.pos.x >= mainCanvas.width + 50 ||
                this.bulletList[i].gImage.pos.y >= mainCanvas.height + 50)
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
            let point = {x:this.bulletList[i].gImage.pos.x, y:this.bulletList[i].gImage.pos.y};

            for(let j in enemyList)
            {
                let enemyPoint = {x:enemyList[j].gImage.pos.x, y:enemyList[j].gImage.pos.y};
                let dx = point.x - enemyPoint.x;
                let dy = point.y - enemyPoint.y;

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


class FirewandBullet extends Unit
{
    constructor(_x,_y,_a) //생성자
    {
        super(_x,_y,);
        this.angle = _a;
        this.moveSpeed=500; //이동 속도
        
        //이미지 및 좌표 설정
        this.gImage=new GameImage("images/firewand_bullet.png");
        this.gImage.pos.x=_x;
        this.gImage.pos.y=_y;

        this.collisionRadius = this.gImage.image.width/2;
        if(this.collisionRadius==0) this.collisionRadius = 20;
    }
    move() //이동 구현 함수
    {
        this.gImage.pos.x += this.moveSpeed * deltaTime * Math.cos(this.angle);
        this.gImage.pos.y += this.moveSpeed * deltaTime * Math.sin(this.angle);
    }
}

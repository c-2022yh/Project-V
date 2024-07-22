//완드 가장 가까운 적에게 에너지볼트 발사

class WeaponBook extends BasicWeapon
{
    constructor()
    {
        super();

        this.bulletList = []; //총알들을 저장할 리스트

        this.SKILLDELAY = 300;
        this.skillDelay = this.SKILLDELAY; //총알 발사 딜레이

    }
    
    init()
    {
        this.makeObject();
    }

    update(enemyList)
    {
        this.bulletList.forEach(e => e.move());

        this.hit(enemyList);
        
        //this.deleteBullet();
    }

    render()
    {
        this.bulletList.forEach(e => e.gImage.render());
    }

    makeObject()
    {
        let num = 1;

        for(let i=0;i<num;i++)
        {
            let angle = (i*2*Math.PI)/num;
            this.bulletList.push(new BookObject(mainCanvas.width/2, mainCanvas.height/2, angle));
        }
        //let angle=360;
        //for(let i=0;i<3;i++)
    }

    /*
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
    */


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
                    /*
                    if(this.bulletList[i].hittedObject == null || this.bulletList[i].hittedObject != enemyList[j])
                    {
                        enemyList[j].hp-=1; //체력 감소
                        this.bulletList[i].hittedObject = enemyList[j];
                        break;
                    }
                    else
                    {
                        for(let k in this.bulletList[i].hittedObject)// 공전 주기마다 한번만 적중하도록 함 미완
                        {
                            if(this.bulletList[i].hittedObject[k] != enemyList[j])
                            {
                                //enemyList[j].hp-=1; //체력 감소
                                //this.bulletList[i].hittedObject.push(enemyList[j]);
                                break;
                            }
                        }
                    }
                    */
                    
                    

                }

            }
        }

    }
}


class BookObject extends Unit
{
    constructor(_x,_y,_a) //생성자
    {
        super(_x,_y);

        this.moveSpeed = 5; //공전 속도
        this.angle=_a;

        this.orbitRadius = 120; // 얼마나 플레이어와 떨어져 있는 지

        this.hittedObject = null;


        this.gImage=new GameImage("images/book_object.png");
        this.gImage.pos.x=_x;
        this.gImage.pos.y=_y;

        this.collisionRadius = this.gImage.image.width/2;
        if(this.collisionRadius==0) this.collisionRadius = 30;
    }
    move() //이동 구현 함수
    {
        this.angle -= this.moveSpeed * deltaTime;
        this.gImage.pos.x = mainCanvas.width/2 + this.orbitRadius * Math.cos(this.angle);
        this.gImage.pos.y = mainCanvas.height/2 + this.orbitRadius * Math.sin(this.angle);

        if(this.angle <= -6) //한바퀴 돌았으면 몹 재적중 가능
        {
            this.angle+=6;
            console.log(this.hittedObject);
            this.hittedObject = null;
        }
    }
}

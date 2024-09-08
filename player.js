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
        this.maxHealth=100;     //최대 체력
        this.recovery=20;      //체력 재생력
        this.armPoint=0;        //방어력
        this.moveSpeed=100;     //이동 속도(%)

        this.might=100;         //피해량(%)
        this.bulletSpeed=100;   //탄속(%)
        this.weaponDuration=100;//지속시간(%)
        this.weaponArea=100;    //범위(%)
        this.weaponCooldown=100;//쿨타임(%)
        this.bulletAmount=0;    //추가 투사체

        this.revival=0;         //부활
        this.magneticRadius=100;//자석 범위
        this.luck=100;          //행운(%)
        this.growth=100;        //성장, 경험치 획득량(%)
        this.greed=100;         //탐욕, 골드 획득략(%)
        this.curse=100;         //저주(%)

        this.itemReroll=0;      //새로고침 횟수
        this.itemSkip=0;        //건너뛰기 횟수
        this.itemBanish=0;      //지우기 횟수


        this.hp = this.maxHealth;
        this.getExp=0;



        this.HITDLEAY = 30;
        this.hitdelay = this.HITDLEAY;

        this.recoveryAction=0;

    }

    recoveryHP()
    {
        if(this.hp < this.maxHealth)
        {
            let hp = this.hp * 10;
            let recovery = this.recovery * 10;
            hp+=recovery;
            hp/=10;
            
            if(Number.isInteger(hp))
            {
                mainScene.playerManager.makePlayerHpUnit(hp);
            }
            //this.hp = hp/10;

            if(hp > this.maxHealth) this.hp = this.maxHealth;
            
            

            //for(let i=0;i<this.recovery;)
        }
        
    }

}

class PlayerHpBar extends Unit
{
    constructor(_x, _y)
    {
        super(_x, _y);
        this.gImage = new GameImage("images/player_hp_bar.png");
        this.gImage.pos.x = _x;
        this.gImage.pos.y = _y;    
        
    }
}

class PlayerHpUnit extends Unit
{
    constructor(_x, _y, _n)
    {
        super(_x,_y);
        this.gImage = new GameImage("images/player_hp_unit.png");
        this.gImage.pos.x = _x;
        this.gImage.pos.y = _y;
        
    }
}

class PlayerManager
{
    constructor()
    {
        this.player = new Player(mainCanvas.width/2, mainCanvas.height/2);
        this.playerHpBar = new PlayerHpBar(mainCanvas.width/2, mainCanvas.height/2 + 45);
        this.playerHpUnitList = [];

        this.recoveryDelay=(1/deltaTime);

    }

    init()
    {
        this.makePlayerHpUnit(0);
    }

    update()
    {
        this.recoveryDelay--;
        if(this.recoveryDelay<=0)
        {
            this.recoveryDelay=(1/deltaTime);
            this.player.recoveryHP();
        }

        this.player.hitdelay--;
        this.damaged();
        
        console.log(this.player.hp, this.playerHpUnitList.length);

    }

    render()
    {
       this.player.gImage.render();
       this.playerHpBar.gImage.render();
       this.playerHpUnitList.forEach(e => e.gImage.render());

    }

    makePlayerHpUnit(n)
    {
        if(n == 0) //초기 설정
        {
            for(let i=0; i<this.player.maxHealth; i++)
            {
                let x = mainCanvas.width/2 -27.5;
                let y = mainCanvas.height/2 + 45;

                this.playerHpUnitList.push(new PlayerHpUnit(x + i/this.player.maxHealth*56 , y));
            }

        }
        else
        {
            for(let i=0;i<n;i++)
            {
                let x = mainCanvas.width/2 -27.5;
                let y = mainCanvas.height/2 + 45;
                let index = i + this.playerHpUnitList.length -1 ;
                if(this.playerHpUnitList.length < 100)
                    this.playerHpUnitList.push(new PlayerHpUnit(x + index/this.player.maxHealth*56 , y));
                else break;
                
            }
        }
        

    }

    
    damaged()
    {
        let enemyList = mainScene.enemyManager.enemyList;
        for(let i in enemyList)
        {
            let dx = enemyList[i].gImage.pos.x - this.player.gImage.pos.x;
            let dy = enemyList[i].gImage.pos.y - this.player.gImage.pos.y;
            let distance = Math.sqrt(dx*dx + dy*dy);

            let collisionDistance = this.player.collisionRadius + enemyList[i].collisionRadius;
            if(distance < collisionDistance)
            {
                let angle = Math.atan2(dy,dx);
                let moveX = Math.cos(angle) * (collisionDistance - distance);
                let moveY = Math.sin(angle) * (collisionDistance - distance);
                enemyList[i].gImage.pos.x += moveX;
                enemyList[i].gImage.pos.y += moveY;

                if(this.player.hitdelay <=0)
                {
                    this.player.hitdelay=this.player.HITDLEAY;
                    this.player.hp -= enemyList[i].attackPoint;
                    this.playerHpUnitList.pop();
                }
                

            }
        }

    }

    playerHpUnitListManager()
    {
        let point = Math.floor(this.player.hp);
        //if(point > this.playerHpUnitList.length)
    }
}
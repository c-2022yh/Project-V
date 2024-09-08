//메인화면 구성
class MainScene extends Scene
{
    constructor() //생성자
    {
        super();

        this.backgroundManager = new BackgroundManager();
        this.playerManager = new PlayerManager();
        this.enemyManager = new EnemyManager();
        this.expObjectManager = new ExpObjectManager();
        this.damageUnitManager = new DamageUnitManager();

        this.weaponManager = new WeaponManager();



        this.projectileList = []; //투사체

        this.managerList = [];
        this.managerList.push(this.backgroundManager);
        this.managerList.push(this.playerManager);
        this.managerList.push(this.enemyManager);
        this.managerList.push(this.expObjectManager);
        this.managerList.push(this.damageUnitManager);

        this.managerList.push(this.weaponManager);


    }

    init() 
    {
        this.managerList.forEach(e => e.init());

        this.setProjectileList();
    }

    update() 
    {
        this.managerList.forEach(e => e.update());
        
        this.move();

    }

    render() //렌더링
    {
        this.managerList.forEach(e => e.render());
    }

    setProjectileList()
    {
        for(let i in this.weaponManager.weaponList)
        {
            this.projectileList.push(this.weaponManager.weaponList[i].projectileList);
        }
    }

    move() //플레이어가 움직일 때, 화면과 같이 움직일 것들(플레이어에 귀속되지 않는 물체들)
    {
        let moveX=0;
        let moveY=0;
        let moveSpeed = this.playerManager.player.moveSpeed;

        let backgroundList = this.backgroundManager.backgroundList;
        let enemyList = this.enemyManager.enemyList;
        let expObjectList = this.expObjectManager.expObjectList;
        let damageUnitLineList = this.damageUnitManager.damageUnitLineList;


        if(mouseClickState) //마우스 클릭 이동
        {
            let x = mainCanvas.width/2 - mouseX;
            let y = mainCanvas.height/2 - mouseY;
    
            let distance = Math.sqrt(x*x + y*y);
    
            moveX = (x/distance) * moveSpeed * deltaTime;
            moveY = (y/distance) * moveSpeed * deltaTime;
    
            if(moveX > 0) this.playerManager.player.gImage.scale.x = 1;
            else if(moveX < 0) this.playerManager.player.gImage.scale.x = -1;

        }
        else //키보드 입력 이동
        {
            if((keys["KeyW"] || keys["ArrowUp"]))
            {
                moveY += moveSpeed*deltaTime;
            }
            else if((keys["KeyS"] || keys["ArrowDown"]))
            {
                moveY -= moveSpeed*deltaTime;
            }
            if((keys["KeyA"] || keys["ArrowLeft"]))
            {
                moveX += moveSpeed*deltaTime;
                this.playerManager.player.gImage.scale.x = 1;
            }
            else if((keys["KeyD"] || keys["ArrowRight"]))
            {
                moveX -= moveSpeed*deltaTime;
                this.playerManager.player.gImage.scale.x = -1;
            }
        }
    


        //이동
        for(let i in backgroundList)
        {
            backgroundList[i].gImage.pos.x += moveX;
            backgroundList[i].gImage.pos.y += moveY;
        }
        for(let i in enemyList)
        {
            enemyList[i].gImage.pos.x += moveX;
            enemyList[i].gImage.pos.y += moveY;
        }
        for(let i in expObjectList)
        {
            expObjectList[i].gImage.pos.x += moveX;
            expObjectList[i].gImage.pos.y += moveY;
        }
        for(let i in damageUnitLineList)
        {
            for(let j in damageUnitLineList[i].damageUnitList)
            {
                damageUnitLineList[i].damageUnitList[j].gImage.pos.x += moveX;
                damageUnitLineList[i].damageUnitList[j].gImage.pos.y += moveY;
            
            }
        }
        for(let i in this.projectileList)
        {
            for(let j in this.projectileList[i])
            {
                this.projectileList[i][j].gImage.pos.x += moveX;
                this.projectileList[i][j].gImage.pos.y += moveY;
            }
            
        }
    }
    
    
    



  
}


var mainScene = new MainScene(); //메인 씬 클래스 선언
mainScene.start(); //시작


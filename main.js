//메인화면 구성
class MainScene extends Scene
{
    constructor() //생성자
    {
        super();

        this.backgroundManager = new BackgroundManager();
        this.playerManager = new PlayerManager();
        this.enemyManager = new EnemyManager();
        this.bulletManager = new BulletManager();

        this.managerList = [];
        this.managerList.push(this.backgroundManager);
        this.managerList.push(this.playerManager);
        this.managerList.push(this.enemyManager);
        this.managerList.push(this.bulletManager);


    }

    init() //처음 시작하는 함수
    {
        this.managerList.forEach(e => e.init());
    }

    update() //업데이트 함수, 프레임마다 1번 실행
    {
        this.backgroundManager.update();
        this.playerManager.update();
        this.enemyManager.update();
        this.bulletManager.update(this.enemyManager.enemyList);

        this.move();

    }

    render() //렌더링
    {
        this.managerList.forEach(e => e.render());
    }

    

    move() 
    {
        let moveX=0;
        let moveY=0;
        let moveSpeed = this.playerManager.player.moveSpeed;

        let backgroundList = this.backgroundManager.backgroundList;
        let enemyList = this.enemyManager.enemyList;
        let bulletList = this.bulletManager.bulletList;


        if((keys["KeyW"] || keys["ArrowUp"]))
        {
            moveY = moveSpeed*deltaTime;
        }
        if((keys["KeyA"] || keys["ArrowLeft"]))
        {
            moveX = moveSpeed*deltaTime;
            this.playerManager.player.gImage.scale.x = 1;
        }
        if((keys["KeyS"] || keys["ArrowDown"]))
        {
            moveY = -moveSpeed*deltaTime;
        }
        if((keys["KeyD"] || keys["ArrowRight"]))
        {
            moveX = -moveSpeed*deltaTime;
            this.playerManager.player.gImage.scale.x = -1;

        }

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
        for(let i in bulletList)
        {
            bulletList[i].gImage.pos.x += moveX;
            bulletList[i].gImage.pos.y += moveY;
        }
    }
    
    
    



  
}


var mainScene = new MainScene(); //메인 씬 클래스 선언
mainScene.start(); //시작


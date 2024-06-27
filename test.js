//유닛 클래스
//모든 개체는 유닛 클래스를 상속받음
class Unit
{
    constructor(_x,_y) //생성자
    {
        this.x=_x;
        this.y=_y;
        this.gImage = undefined;
    }

}

//플레이어 클래스
class Player extends Unit
{
    constructor(_x,_y) //생성자
    {
        super(_x,_y); //부모 생성자 호출
        this.v=300; //이동 속도
        
        //이미지 및 좌표 설정
        this.gImage=new GameImage("images/21.png");
        this.gImage.pos.x=_x;
        this.gImage.pos.y=_y;
    }
    move() //이동 구현 함수
    {
        //키가 입력되면 좌표값을 이동
        if((keys["KeyW"]>0 || keys["ArrowUp"]) && this.gImage.pos.y >= 800)
            this.gImage.pos.y-=this.v*deltaTime;
        
        if((keys["KeyA"]>0 || keys["ArrowLeft"]) && this.gImage.pos.x >= 0)
            this.gImage.pos.x-=this.v*deltaTime;
        
        if((keys["KeyS"]>0 || keys["ArrowDown"]) && this.gImage.pos.y <= myCanvas.height - this.gImage.image.height)
            this.gImage.pos.y+=this.v*deltaTime;

        if((keys["KeyD"]>0 || keys["ArrowRight"]) && this.gImage.pos.x <= myCanvas.width - this.gImage.image.width)
            this.gImage.pos.x+=this.v*deltaTime;

    }
    
}

//불릿 클래스
class Bullet extends Unit
{
    constructor(_x,_y) //생성자
    {
        super(_x,_y); //부모 생성자 호출
        this.v=1000; //이동 속도
        
        //이미지 및 좌표 설정
        this.gImage=new GameImage("images/bullet.png");
        this.gImage.pos.x=_x;
        this.gImage.pos.y=_y;
    }
    move() //이동 구현 함수
    {
        //총알은 상관없이 계속 전진함
        this.gImage.pos.y-= this.v * deltaTime;
    }
}

//이너미 클래스
class Enemy extends Unit
{
    constructor(_x,_y) //생성자
    {
        super(_x, _y); //부모 생성자 호출

        this.hp=1; //체력

        this.dx=1; //x축 이동 방향
        this.v= Math.floor(Math.random()*300)+100; //이동속도 랜덤 설정
 
        this.gImage=new GameImage("images/11.png");
        this.gImage.pos.x=_x;
        this.gImage.pos.y=_y;
    }
    move() //이동 구현 함수
    {
        //벽에 닿으면 방향을 바꿈
        if(this.gImage.pos.x <= 0)
            this.dx=1;
        else if(this.gImage.pos.x + this.gImage.image.width >= myCanvas.width)
            this.dx=-1;
        
        this.gImage.pos.x+=this.dx * this.v * deltaTime;
    }
    dead() //죽을 때 실행되는 함수
    {
        console.log("DEAD");
    }
}



//메인 씬 클래스 구현
class MainScene extends Scene
{
    constructor() //생성자
    {
        super();
        this.enemyList = []; //적들을 저장할 리스트
        this.bulletList = []; //총알들을 저장할 리스트

        this.shootDelay = 0; //총알 발사 딜레이

    }

    init() //처음 시작하는 함수
    {
        //이번 씬에서 사용할 이미지를 미리 불러옴
        preloadImage("images/11.png"); 
        preloadImage("images/21.png");
        preloadImage("images/bullet.png");

        //플레이어 생성
        this.player = new Player(myCanvas.width/2, 900);

        //적들 생성
        for(let i=0;i<5;i++)
        {
            this.enemyList.push(new Enemy(30+100*i, 20));
            this.enemyList.push(new Enemy(30+100*i, 90));
            this.enemyList.push(new Enemy(30+100*i, 160));
        }

       
    }

    update() //업데이트 함수, 프레임마다 1번 실행
    {
        this.playerManeger();
        this.enemyManeger();
        this.bulletManeger();
        this.collisionManeger();
    }
    render()
    {
        //각 변수별로 렌더링 실행
        this.player.gImage.render();
        this.enemyList.forEach(e => e.gImage.render());
        this.bulletList.forEach(e => e.gImage.render());

    }

    playerManeger() //플레이어 관련 함수 실행
    {
        this.player.move(); //키보드 입력에 따라 움직이는 함수

        //딜레이 계산 후 총알 발사
        if(keys["Space"]>0 && this.shootDelay <= 0)
        {
            this.shootDelay=200;
            this.bulletList.push(new Bullet(this.player.gImage.pos.x + this.player.gImage.image.width/2 -5, this.player.gImage.pos.y+10));
        }
        this.shootDelay--;

    }

    bulletManeger() //총알 관련 함수 실행
    {
        this.bulletList.forEach(e => e.move()); //움직이는 함수

        //화면을 벗어나면 삭제
        for(let i in this.bulletList)
        {
            if(this.bulletList[i].gImage.pos.y <= -10)
            {
                this.bulletList.splice(i,1);
                break;
            }
        }
    }

    enemyManeger()
    {
        this.enemyList.forEach(e => e.move()); //움직이는 함수

        //체력이 0인 적들을 삭제
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
    
    collisionManeger() //충돌 관련 처리 함수
    {
        for(let i=0;i<this.bulletList.length;i++)
        {
            //총알의 x좌표 y좌표의 중심 계산
            let bulletX = this.bulletList[i].gImage.pos.x + this.bulletList[i].gImage.image.width/2;
            let bulletY = this.bulletList[i].gImage.pos.y + this.bulletList[i].gImage.image.height/2;
            
            for(let j=0;j<this.enemyList.length;j++)
            {
                //적의 좌표값을 받아옴
                let enemyLeftX = this.enemyList[j].gImage.pos.x;
                let enemyRightX = enemyLeftX + this.enemyList[j].gImage.image.width;
                let enemyTopY = this.enemyList[j].gImage.pos.y;
                let enemyBottomY = enemyTopY + this.enemyList[j].gImage.image.height;

                //콜라이더 연산
                //요약하자면 총알과 적의 x,y좌표가 일치하면 실행
                if(bulletX > enemyLeftX && bulletX < enemyRightX &&
                    bulletY > enemyTopY && bulletY < enemyBottomY)
                {
                    this.bulletList.splice(i,1); //총알 삭제
                    this.enemyList[j].hp-=1; //체력 감소
                    break;

                }
            

            }
        }

    }
    



  
}








//화살표 키로 스크롤 방지
const ARROWKEYS = {
    'ArrowLeft':37,
    'ArrowUp':38,
    'ArrowRight':39,
    'ArrowDown':40
};
window.addEventListener('keydown', function(e) {
    if (ARROWKEYS[e.key]) {
        e.preventDefault(); // 기본 동작 방지
    }
});

var mainScene = new MainScene(); //메인 씬 클래스 선언
mainScene.start(); //시작


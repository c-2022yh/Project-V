//캔버스 사용을 위한 변수 설정
const mainCanvas = document.getElementById("mainCanvas");
const ctx = mainCanvas.getContext("2d");

//델타타임 관련 프레임대비 게임 속도를 조절하는 변수
var LTime = Date.now();
var RTime =0;
var deltaTime = 0;

//프레임워크에서 사용할 이미지값을 저장할 변수
var imageList = {};

//현재 키 눌림 상태를 알기 위한 이전 프레임 키값 저장
var Lkeys = {};
//현재 프레임까지 눌린 키값을 저장
var keys = {};
//키보드 입력 함수
var keyDownFunc =function(e)
{
    Lkeys[e.code]=1;
    if(!keys.hasOwnProperty(e.code))
        keys[e.code]=0;
}
//키를 떼면 -1
var keyUpFunc =function(e)
{
    Lkeys[e.code]=-1;
}
//키보드 입력에 따른 키 누름 상태 변환
//아무것도 안눌림 = 0
//키다운= 1
//키업 = -1
//키홀드= 2
var updateKeys =function()
{
    for(code in keys)
    {
        if(Lkeys[code]==1 && keys[code]==0)
        {
            keys[code]=1;
        }
        else if(Lkeys[code]==1 && keys[code]==1)
        {
            keys[code]=2;
        }
        else if(Lkeys[code]==-1 && keys[code]==-1)
        {
            keys[code]=0;
            Lkeys[code]=0;
        }
        else if(Lkeys[code]==-1)
        {
            keys[code]=-1;
        }
         
    }
}

//마우스 좌표
var mouseX=0;
var mouseY=0;

var LmouseClick = 0;
var RmouseClick = 0;

var mouseClickState = 0;
//마우스 클릭 상태에 따른 마우스 상태 변수
//아무것도 안눌림 = 0
//클릭= 1
//업 = -1
//홀드= 2

//마우스리스너 함수
var mouseMoveFunc = function(e)
{
    //현재 마우스좌표를 갱신;
    mouseX = e.clientX-mainCanvas.offsetLeft;
    mouseY = e.clientY-mainCanvas.offsetLeft;
    
}
var mouseClickFunc = function(e)
{
    RmouseClick = 1;
}
var mouseUpFunc = function(e)
{
    RmouseClick = 0;
}
//마우스 상태 업데이트 함수
var updateMouseClick = function(e)
{
    if(LmouseClick == 0 && RmouseClick == 0)
    {
        mouseClickState = 0;
    }
    else if(LmouseClick == 0 && RmouseClick == 1)
    {
        mouseClickState = 1;
    }
    else if(LmouseClick == 1 && RmouseClick == 0)
    {
        mouseClickState = -1;
    }
    else if(LmouseClick == 1 && RmouseClick == 1)
    {
        mouseClickState = 2;
    }
    LmouseClick = RmouseClick;
}

//자바스크립트 리스너 추가
document.addEventListener("keydown",keyDownFunc,false);
document.addEventListener("keyup",keyUpFunc,false);
mainCanvas.addEventListener("mousemove",mouseMoveFunc,false);
mainCanvas.addEventListener("mousedown",mouseClickFunc,false);
mainCanvas.addEventListener("mouseup",mouseUpFunc,false);


//이미지파일을 미리 불러오는 함수
var preloadImage =function(path)
{
    let _image = new Image();
    _image.src=path;
    imageList[path]={image:_image, isLoaded:false};

    _image.addEventListener('load',function(){
    imageList[path].isLoaded=true;
    },false);

}

//실제 게임에서 컨트롤하는 이미지 클래스
class GameImage
{
    //생성자
    constructor(path)
    {
        this.path=path; //이미지파일 경로
        this.pos={x:0,y:0}; //포지션 
        this.scale={x:1,y:1}; //크기 1배, 1배
        this.rot=0; //회전정도
        this.z=0; //z인덱스
        this.anchor = {x:0.5 , y:0.5}; //앵커, 이미지 중심 위치
        this.rand=0;

        if(imageList[path]==undefined)
        {
            this.image = new Image();
            this.image.src = path;
            imageList[path]={image:this.image, isLoaded:false};

            this.image.addEventListener('load',function(){
            imageList[path].isLoaded=true;
            },false);
        }
        else
        {
            this.image=imageList[path].image;
        }
    }
    render() //랜더링
    {
        if(!imageList[this.path].isLoaded)
            return;
        let dx= this.image.width * this.anchor.x;
        let dy= this.image.height * this.anchor.y;
        ctx.resetTransform();
        ctx.translate(this.pos.x,this.pos.y);
        ctx.rotate(this.rot);
        ctx.transform(this.scale.x, 0, 0, this.scale.y, -dx * this.scale.x, -dy * this.scale.y);
    
        ctx.drawImage(this.image,0,0);
    }
   
}


//씬 클래스 선언
class Scene
{
    //오버라이딩 해줘야 함
    constructor() { } //생성자
    init() { } //씬을 처음 실행할 때 한번만 실행함
    update() { } //프레임마다 계속 실행되는 함수
    render() { } //프레임마다 계속 실행되는 렌더링 함수
    
    
    start()//현재 씬을 설정 
    {
        nowScene = this; 
        this.init();
    }
}


var nowScene=new Scene();

var nullScene=new Scene();

//업데이트 함수
var update =function()
{
    nowScene.update();
}
//렌더링 함수
var render=function()
{
    nowScene.render();
}
//게임 실행 루프문
var gameloop=function()
{
    //델타타임 연산
    RTime=Date.now();
    deltaTime=(RTime-LTime)/1000;
    LTime=RTime;

    //키보드 및 마우스 상태 업데이트
    updateKeys();
    updateMouseClick();

    //업데이트 함수 실행
    update();
    //매 프레임마다 전체 캔버스를 지우고 다시 렌더링함
    ctx.resetTransform();
    ctx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
    render();
}

//실제 동작하는 함수
setInterval(gameloop,deltaTime);
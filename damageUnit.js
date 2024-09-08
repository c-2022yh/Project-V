
class DamageUnit extends Unit
{
    constructor(_x,_y,_n)
    {
        super(_x,_y);
        this.gImage;
        this.num=_n;
        if(this.num == 1) this.gImage=new GameImage("images/damage_number_1.png");
        else if(this.num == 2) this.gImage=new GameImage("images/damage_number_2.png");
        else if(this.num == 3) this.gImage=new GameImage("images/damage_number_3.png");
        else if(this.num == 4) this.gImage=new GameImage("images/damage_number_4.png");
        else if(this.num == 5) this.gImage=new GameImage("images/damage_number_5.png");
        else if(this.num == 6) this.gImage=new GameImage("images/damage_number_6.png");
        else if(this.num == 7) this.gImage=new GameImage("images/damage_number_7.png");
        else if(this.num == 8) this.gImage=new GameImage("images/damage_number_8.png");
        else if(this.num == 9) this.gImage=new GameImage("images/damage_number_9.png");
        else this.gImage=new GameImage("images/damage_number_0.png");

        this.gImage.pos.x = _x;
        this.gImage.pos.y = _y;    
        
    }
    
}
//max damage 999
class DamageUnitLine
{
    constructor(_x,_y,_n)
    {
        this.damageUnitList = [];
        if(_n>999) n = 999;
        this.number = _n;
        
        if(Math.floor(this.number/100) > 0) //3자리
        {
            this.damageUnitList.push(new DamageUnit(_x-14, _y, Math.floor(this.number/100)));
            this.damageUnitList.push(new DamageUnit(_x, _y, Math.floor((this.number&100)/10)));
            this.damageUnitList.push(new DamageUnit(_x+14, _y, this.number&10));
        }
        else if(Math.floor(this.number/10) > 0) //2자리
        {
            this.damageUnitList.push(new DamageUnit(_x-7, _y, Math.floor(this.number/10)));
            this.damageUnitList.push(new DamageUnit(_x+7, _y, this.number&10));
        }
        else //1자리
        {
            
            this.damageUnitList.push(new DamageUnit(_x,_y,this.number));
        }

        this.animationDelay=(0.3/deltaTime);
    }

    render()
    {
        this.damageUnitList.forEach(e => e.gImage.render());
    }
    
}


class DamageUnitManager
{
    constructor()
    {
        this.damageUnitLineList = [];

    }

    init()
    {

    }

    update()
    {
        for(let i in this.damageUnitLineList)
        {


            this.damageUnitLineList[i].animationDelay--;
            
            if(this.damageUnitLineList[i].animationDelay<=0)
            {
                this.damageUnitLineList.splice(i,1);
                break;
            }
                
        }
    }

    render()
    {
        this.damageUnitLineList.forEach(e => e.render());

    }
}
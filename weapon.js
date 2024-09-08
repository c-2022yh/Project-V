class Weapon 
{
    constructor()
    {
        this.name;
        this.weaponLevel = 1;
        this.weaponMaxLevel = 8;

        this.attackPoint = 1;


        this.projectileList = [];

    }
}

class BasicWeapon extends Weapon
{
    constructor()
    {
        super();
    }
}

class AdvancedWeapon extends Weapon
{
    constructor()
    {
        super();
    }
}


class WeaponManager
{
    constructor()
    {
        this.weapon = { //보유 무기
            wand : 1,
            firewand : 1,
            book : 1

        };
        this.weaponList = [];
    }
    init()
    {
        this.setWeaponList();
        this.weaponList.forEach(e => e.init());
    }

    update()
    {
        this.weaponList.forEach(e => e.update(mainScene.enemyManager.enemyList));
    }

    render()
    {
        this.weaponList.forEach(e => e.render());
    }

    setWeaponList()
    {
        if(this.weapon.wand)
        {
            this.weaponList.push(new WeaponWand());
        }
        if(this.weapon.firewand)
        {
            this.weaponList.push(new WeaponFireWand());
        }
        if(this.weapon.book)
        {
            this.weaponList.push(new WeaponBook());
        }
        

    }

}
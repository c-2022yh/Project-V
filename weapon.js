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
            wand : 0,
            firewand : 0,
            book : 1

        };
        this.weaponList = [];
    }
    init()
    {
        this.setWeaponList();
        this.weaponList.forEach(e => e.init());
    }

    update(enemyList)
    {
        this.weaponList.forEach(e => e.update(enemyList));
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
class HpUi {
    constructor(scene, heartGroup) {
        this.originX = 40;
        this.originY = 680;
        this.offset = 50;
        this.MAX_HP = 5;
        this.curHP = this.MAX_HP;
        this.isDead = false;
        
        this.heart1 = new HpUnit(scene, this.originX, this.originY);
        this.heart2 = new HpUnit(scene, this.originX + this.offset, this.originY);
        this.heart3 = new HpUnit(scene, this.originX + (this.offset * 2), this.originY);
        this.heart4 = new HpUnit(scene, this.originX + (this.offset * 3), this.originY);
        this.heart5 = new HpUnit(scene, this.originX + (this.offset * 4), this.originY);
        this.hearts = new Array(this.heart1, this.heart2, this.heart3, this.heart4, this.heart5);
    }  
 
    lowerHP(num) {
        let newHealth = this.curHP - num;
        for (let i = this.curHP; i > newHealth; i--) {
            this.hearts[i - 1].removeHeart();
        }

        this.curHP = newHealth;
        if (this.curHP <= 0) {
            this.isDead = true;
        }
    }

    gainHP(num) {
        let newHealth = this.curHP + num;
        if (newHealth > this.MAX_HP) {return;}
        for (let i = this.curHP; i < newHealth; i++) {
            this.hearts[i].gainHeart();
        }

        this.curHP = newHealth;
    }

    getDead() {
        return this.isDead;
    }

    // Get Function that returns the current hp
    getHP() {
        return this.value;
    }
}
new Vue({
    el: '#app',
    data: {
        player: {
            hp: 100,
            power: 1.5
        },
        monster: {
            hp: 100,
            power: 2
        },
        logs : [],
        gameIsOn: false,
    },
    methods: {
        startGame() {
            this.player.hp = 100;
            this.monster.hp = 100;
            this.logs = [];
            this.gameIsOn = true;
        },

        playerAttack() {
            const damage = this.generateDamage(this.player.power);
            this.monster.hp -= damage;
            this.log(`Jogador atingiu monstro com ${damage} de dano`, 'playerLog');
            this.monsterAttack();
        },

        playerSpecialAttack () {
            const damage = this.generateDamage(this.player.power * 2);
            this.monster.hp -= damage;
            this.log(`Jogador atingiu monstro com ${damage} de dano`, 'playerLog');
            this.monsterAttack();
        },

        monsterAttack() {
            const damage = this.generateDamage(this.monster.power);
            this.player.hp -= damage;
            this.log(`Monstro atingiu jogador com ${damage} de dano`, 'enemyLog');
        },

        healPlayer () {
            const healingPoints = this.generateDamage(this.player.power);

            if (this.player.hp < 100) {   
                this.player.hp += healingPoints;
                this.log(`Jogador se curou com ${healingPoints} pontos de vida`, 'playerLog');
                this.monsterAttack();
            }
        },

        generateDamage(power) {
            const min = Math.ceil(1);
            const max = Math.floor(6);
            const damage = Math.floor(Math.random() * (max - min)) + min;
            const finalDamage = damage * power;

            return Math.round(finalDamage);
        },

        log(message, className) {
            this.logs.unshift({message: message, className: className});
        }
        
    },
    computed: {
        result () {
            if (this.player.hp <= 0) {
                this.gameIsOn = false;
                return "Você perdeu :(";
            }

            if (this.monster.hp <= 0) {
                this.gameIsOn = false;
                return "Você ganhou :D";
            }
        },

        playerLifeBarStyle() {
            return `
                width: ${this.player.hp}%;
                backgroundColor: ${this.player.hp <= 30 ? "red" : "green"}
            `;
        },

        monsterLifeBarStyle() {
            return `
                width: ${this.monster.hp}%;
                backgroundColor: ${this.monster.hp <= 30 ? "red" : "green"}
            `;
        },

        resultStyle() {
            return `
                color: ${this.monster.hp < this.player.hp ? "#3db85c" : "#a30404"}
            `;
        }
    },
    watch: {
        player: {
            deep: true,
            handler() {
                if (this.player.hp < 0)
                this.player.hp = 0;
            }
        },

        monster: {
            deep: true,
            handler() {
                if (this.monster.hp < 0)
                this.monster.hp = 0;
            }
        }
    }
})
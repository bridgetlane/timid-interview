window.onload = function() {    
    "use strict";
    var game = new Phaser.Game(
                                800, 600,
                                Phaser.AUTO,
                                'game',     
                                { preload: preload,
                                  create: create,
                                  update: update }
                               );
    
    var characters;
    var one;
    var two;
    var three;
    var four;
    var five;
    var six;
    var seven;
    var eight;
    var nine;
    var ten;
    var eleven;
    var chars = [one, two, three, four, five, six, seven, eight, nine, ten, eleven];
    var bools = [true, false];
    var timer;
    var img_timer;
    var chosenChar;
    var score;
    var interviewed = 0;
    var hintButton;
    var bgmusic;
    var failmusic;
    var findmusic;
    
    function preload() {
        game.load.image('0', 'assets/img/characters/1.png');
        game.load.image('1', 'assets/img/characters/2.png');
        game.load.image('2', 'assets/img/characters/3.png');
        game.load.image('3', 'assets/img/characters/4.png');
        game.load.image('4', 'assets/img/characters/5.png');
        game.load.image('5', 'assets/img/characters/6.png');
        game.load.image('6', 'assets/img/characters/7.png');
        game.load.image('7', 'assets/img/characters/8.png');
        game.load.image('8', 'assets/img/characters/9.png');
        game.load.image('9', 'assets/img/characters/10.png');
        game.load.image('10', 'assets/img/characters/11.png');
        game.load.image('0_1', 'assets/img/find/1_1.png');
        game.load.image('0_2', 'assets/img/find/1_2.png');
        game.load.image('0_3', 'assets/img/find/1_3.png');
        game.load.image('1_1', 'assets/img/find/2_1.png');
        game.load.image('1_2', 'assets/img/find/2_2.png');
        game.load.image('1_3', 'assets/img/find/2_3.png');
        game.load.image('2_1', 'assets/img/find/3_1.png');
        game.load.image('2_2', 'assets/img/find/3_2.png');
        game.load.image('2_3', 'assets/img/find/3_3.png');
        game.load.image('3_1', 'assets/img/find/4_1.png');
        game.load.image('3_2', 'assets/img/find/4_2.png');
        game.load.image('3_3', 'assets/img/find/4_3.png');
        game.load.image('4_1', 'assets/img/find/5_1.png');
        game.load.image('4_2', 'assets/img/find/5_2.png');
        game.load.image('4_3', 'assets/img/find/5_3.png');
        game.load.image('5_1', 'assets/img/find/6_1.png');
        game.load.image('5_2', 'assets/img/find/6_2.png');
        game.load.image('5_3', 'assets/img/find/6_3.png');
        game.load.image('6_1', 'assets/img/find/7_1.png');
        game.load.image('6_2', 'assets/img/find/7_2.png');
        game.load.image('6_3', 'assets/img/find/7_3.png');
        game.load.image('7_1', 'assets/img/find/8_1.png');
        game.load.image('7_2', 'assets/img/find/8_2.png');
        game.load.image('7_3', 'assets/img/find/8_3.png');
        game.load.image('8_1', 'assets/img/find/9_1.png');
        game.load.image('8_2', 'assets/img/find/9_2.png');
        game.load.image('8_3', 'assets/img/find/9_3.png');
        game.load.image('9_1', 'assets/img/find/10_1.png');
        game.load.image('9_2', 'assets/img/find/10_2.png');
        game.load.image('9_3', 'assets/img/find/10_3.png');
        game.load.image('10_1', 'assets/img/find/11_1.png');
        game.load.image('10_2', 'assets/img/find/11_2.png');
        game.load.image('10_3', 'assets/img/find/11_3.png');
        game.load.image('hint', 'assets/img/hint.png');
        game.load.audio('background', ['assets/audio/background.mp3'], ['assets/audio/background.ogg']);
        game.load.audio('fail', ['assets/audio/failure.mp3', 'assets/audio/failure.ogg']);
        game.load.audio('find', ['assets/audio/win.mp3', 'assets/audio/win.ogg']);
    }
    
    function audioStartUp() {
        bgmusic = game.add.audio('background', 1, true);
        bgmusic.play('', 0, 1, true);
        
        failmusic = game.add.audio('fail');
        findmusic = game.add.audio('find');
    }
    
    function updateScoreText() {
        if (interviewed >= 14) {
            score.text = "YOU WIN!";
        }
        if (interviewed < 0) {
            score.text = "YOU LOSE!";
        }
        if (interviewed < 14 && interviewed >= 0) {
            score.text = 'patients interviewed: ' + String(interviewed) + '/15';
        }
    }
    
    function spriteSet() {
        characters = game.add.group();
        characters.enableBody = true;
        
        var i;
        for (i = 0; i < chars.length; i++)
        {
            chars[i] = characters.create(game.rnd.integerInRange(0, 700), game.rnd.integerInRange(60, 500), String(i));
            chars[i].body.immovable = true;
            chars[i].body.collideWorldBounds = true;
            chars[i].body.bounce.x = 0.7 + Math.random()*0.2;
            chars[i].body.bounce.y = 0.7 + Math.random()*0.2;
            chars[i].body.velocity.x = game.rnd.integerInRange(-100, 100);
            chars[i].body.velocity.y = game.rnd.integerInRange(-100, 100);
            chars[i].visible = bools[game.rnd.integerInRange(0, 1)];
            chars[i].alive = false;
            chars[i].inputEnabled = true;
            chars[i].events.onInputDown.add(check, this);
        }
        
        timer = game.time.now;
    }
    
    function move() {
        var i;
        for (i = 0; i < chars.length; i++)
        {
            chars[i].body.bounce.x = 0.7 + Math.random()*0.2;
            chars[i].body.bounce.y = 0.7 + Math.random()*0.2;
            chars[i].body.velocity.x = game.rnd.integerInRange(-100, 100);
            chars[i].body.velocity.y = game.rnd.integerInRange(-100, 100);
            chars[i].visible = bools[game.rnd.integerInRange(0, 1)];
        }
    }

    function check(character) {
        if (character.alive) {
            findmusic.play();
            interviewed = interviewed + 1;
            updateScoreText();
            character.alive = false;
            flashCharacter();
        }
        else {
            failmusic.play();
            interviewed = interviewed - 1;
            updateScoreText();
        }
    }
    
    function flashCharacter() {
        var chosenIndx = game.rnd.integerInRange(0, 10);
        chars[chosenIndx].alive = true;
        
        var chosenImg = game.rnd.integerInRange(1, 3);
        chosenChar = game.add.sprite(0, 0, String(chosenIndx) + '_' + String(chosenImg));
        
        img_timer = game.time.now;
    }

    function setHint() {
        hintButton = game.add.sprite(670, 530, 'hint');
        hintButton.inputEnabled = true;
        hintButton.events.onInputDown.add(hint, this);
    }
    
    function hint() {
        interviewed = interviewed - 2;
        updateScoreText();
    
        chosenChar.alive = true;
        chosenChar.exists = true;
        chosenChar.visible = true;
        img_timer = game.time.now;
    }
    
    function create() {
        audioStartUp();
        game.stage.backgroundColor = '#AEEEEE';
        
        score = game.add.text(0, 550, 'patients interviewed: 0/15');
        score.font = "Trebuchet MS", "Helvetica", "sans-serif";
        
        spriteSet();
        setHint();
        flashCharacter();
    }

    function update() {
        if (game.time.now > (timer + 1000)) {
            move();
            timer = game.time.now
        }
        
        if (game.time.now > (img_timer + 800)) {
            chosenChar.kill();
        }
    }
};

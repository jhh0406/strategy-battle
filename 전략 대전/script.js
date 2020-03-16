let focus = 1;
let myHp = 3;
let enemyHp = 3;
let btn1, btn2, btn3, btn4, btn5, btn6;
let main = document.getElementById('main');
let game = document.getElementById('inGame');
let dice;
let gameEnd = false;
let score = 0;

function tutorial() {
  window.open('tutorial.html', '_blank', 'toolbar = no, menubar = no, scrollbars = auto, resizable = no, directories = no, width = 750, height = 500, top = 50, left = 50');
}
function drawTier() {
  if (score >= 16) {
    alert(`당신은 ${score}점입니다.`);
  } else if (score >= 11) {
    tierChange("gold");
  } else if (score >= 6) {
    tierChange("silver");
  } else if (score >= 1) {
    tierChange("bronze");
  } else if (score <= 0) {
    tierChange("unknown");
    tierScoreChange(0);
    score = 0;
  }
  if (score == 1 || score == 6 || score == 11) {
    tierScoreChange(1);
  } else if (score == 2 || score == 7 || score == 12) {
    tierScoreChange(2);
  } else if (score == 3 || score == 8 || score == 13) {
    tierScoreChange(3);
  } else if (score == 4 || score == 9 || score == 14) {
    tierScoreChange(4);
  } else if (score == 5 || score == 10 || score == 15) {
    tierScoreChange(5);
  }
}
function gameStart() {
  main.style.display = "none";
  game.style.display = "block";
}
function gameFinish() {
  main.style.display = "block";
  game.style.display = "none";
  focus = 1;
  myHp = 3;
  enemyHp = 3;
  hpCheck();
  reset();
  textChange("대전 중");
  change(enemyBtn1, "unknown");
  change(enemyBtn2, "unknown");
  change(enemyBtn3, "unknown");
  select.style.display = "inline";
  gameEnd = false;
  drawTier();
}
function drawHp(player, hp){
  if (myHp <= 0) {
    myHp = 0;
  } else if (enemyHp <= 0) {
    enemyHp = 0;
  }
  if (myHp >= 5) {
    myHp = 5;
  } else if (enemyHp >= 5) {
    enemyHp = 5;
  }
  if ( hp = 0 ) {
    player.src = "images/hp/hp0.PNG";
  } else if ( hp == 1 ) {
    player.src = "images/hp/hp1.PNG";
  } else if ( hp == 2 ) {
    player.src = "images/hp/hp2.PNG";
  } else if ( hp == 3 ) {
    player.src = "images/hp/hp3.PNG";
  } else if ( hp == 4 ) {
    player.src = "images/hp/hp4.PNG";
  } else if ( hp = 5 ) {
    player.src = "images/hp/hp5.PNG";
  }
}
function hpCheck() {
  drawHp(player1Hp, myHp);
  drawHp(player2Hp, enemyHp);
  if ( focus == 7 ) {
    if(myHp > enemyHp) {
      textChange("승리~");
      score += 2;
    } else if (myHp < enemyHp) {
      textChange("패배~");
      score--;
    } else if (myHp == enemyHp) {
      textChange("무승부~");
    }
  }
  if (myHp == 0) {
    textChange("패배");
    score--;
  } else if (enemyHp == 0) {
    textChange("승리");
    score += 2;
  } else if (myHp == 0 && enemyHp == 0) {
    textChange("무승부");
  }
}
function check(btnA, btnB) {
  if (btnA == "atk") {
    if (btnB == "atk") {
      myHp -= 2;
      enemyHp -= 2;
    } else if (btnB == "dfc") {
      myHp -= 1;
    } else if (btnB == "rcv") {
      enemyHp -= 2;
    }
  } else if (btnA == "dfc") {
    if (btnB == "atk") {
      enemyHp -= 1;
    } else if (btnB == "dfc") {
    } else if (btnB == "rcv") {
      enemyHp += 2;
    }
  } else if (btnA == "rcv") {
    if (btnB == "atk") {
      myHp -= 2;
    } else if (btnB == "dfc") {
      myHp += 2;
    } else if (btnB == "rcv") {
      myHp += 2;
      enemyHp += 2;
    }
  }
}
function battle() {
  if ( focus == 5 ) {
    check(btn1, btn4);
    hpCheck();
  } else if ( focus == 6 ) {
    check(btn2, btn5);
    hpCheck();
  } else if ( focus == 7 ) {
    check(btn3, btn6);
    hpCheck();
  }
}
function btnOpen() {
  if ( focus == 5 ) {
    dice = random();
    change(enemyBtn1, dice);
    btn4 = dice;
    battle();
  } else if ( focus == 6 ) {
    dice = random();
    change(enemyBtn2, dice);
    btn5 = dice;
    battle();
  } else if ( focus == 7 ) {
    dice = random();
    change(enemyBtn3, dice);
    btn6 = dice;
    battle();
  }
}
function random() {
  dice = Math.floor(Math.random() * 3);
  if ( dice == 0 ) {
    return "atk";
  } else if ( dice == 1 ) {
    return "dfc";
  } else if ( dice == 2 ) {
    return "rcv";
  }
}
function atk() {
  click("atk");
}
function dfc() {
  click("dfc");
}
function rcv() {
  click("rcv");
}
function reset() {
  change(myBtn1, "unknown");
  change(myBtn2, "unknown");
  change(myBtn3, "unknown");
  focus = 1;
}
function ok() {
  if ( gameEnd == true ) {
    gameFinish();
  }
  if ( focus == 4 ) {
    select.style.display = "none";
    focus++;
  } else if ( focus > 4 ) {
    btnOpen();
    focus++;
  }
}
function change(name, shape) {
  name.src = `images/btn/${shape}.PNG`
}
function textChange(text) {
  outcome.innerText = text;
  gameEnd = true;
}
function tierChange(shape) {
  tier.src = `images/tier/${shape}.PNG`;
}
function tierScoreChange(point) {
  tierScore.src = `images/hp/hp${point}.PNG`;
}
function click(shape) {
  if ( focus == 1 ) {
    change(myBtn1, `${shape}`);
    btn1 = `${shape}`;
    focus++;
  } else if ( focus == 2 ) {
    change(myBtn2, `${shape}`);
    btn2 = `${shape}`;
    focus++;
  } else if ( focus == 3 ) {
    change(myBtn3, `${shape}`);
    btn3 = `${shape}`;
    focus++;
  }
}

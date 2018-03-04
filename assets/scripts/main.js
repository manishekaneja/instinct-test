//Array of Questions
var array = [{
    name: 'Right', ans: 'right'
}, {
    name: 'Left', ans: 'left'
}];
//Main Code
window.addEventListener('load', function () {
    var actualstring = $('#string').text();
    var count = -1;
    var block;
    var newgame = true;
    var played = false;

    //Setting the Timer
    function getTimer() {
        let span = document.createElement('span');
        span.classList = 'full';
        span.style.backgroundColor = 'black'
        let span2 = document.createElement('span');
        span2.classList = 'full';
        span2.style.backgroundColor = 'white'
        span.appendChild(span2);
        return span;
    }
    $('#timer').append(getTimer());
    //Init the Game
    $('#start').click(() => {
        list = array;
        count++;
        $('#cont').slideUp(800);
        $('#cont .ul2').animate({ 'margin-top': '100%' }, 300, 'linear', () => {
            // $('#cont').clearQueue();
            // $('#cont .ul2').clearQueue();
        });
        played = true;
        $('#body').css('transition', '0s');
        $('#body').css('background-color', getRandomColor());
        if (count >= 0) next();
        else return;
    });
    var list = array;
    function getBlock() {
        if (list.length == 0) {
            list = array;
        }
        let x = parseInt(Math.random() * list.length);
        let block = list[x];
        list = list.slice(0, x).concat(list.slice(x + 1));
        return block;
    }

    //Starting Game
    function next() {
        block = getBlock();
        $('#name').html(actualstring);
        $('#name').html(block.name);
        $('#timer span span').stop();
        $('#timer span span').css({ 'width': '100%' });
        $('#timer span span').animate({ width: '0%' }, (5000 - (count * 100)), () => {
            endGame();
            $('#timer span span').css({ 'width': '100%' });
        });
    }

    //For checking the Ans
    function checkAns(res) {
        if (res == block.ans) {
            count++;
            next();
        }
        else {
            endGame();
        }
    }
    function endGame(notvisi) {

        newgame = true;
        $('#ques').html(count);
        $('#cont').slideDown(800);
        $('#cont .ul2').animate({ 'margin-top': '0px' }, 1000, 'linear');
        $('#body').css('background-color', 'red');
        $('#body').css('transition', '0s');
        $('#timer>span>span').stop();
        if (played == true) {
            if (notvisi == true) {
                $('#score').html("<span>You abandoned me :(</span>");
            }
            else {
                $('#score').html("<span>Your score is " + count + "</span>");
            }
            played = false;
        } count = -1;
    }
    function getRandomColor(type) {
        var letters;
        if (type == 'dark')
            letters = '0123456';
        else if (type == 'light')
            letters = '9ABCDEF';
        else
            letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * (16 - i))];
        }
        return color;
    }
    //Funtionality on key Press
    setInterval(() => {
        $('#instructions').css('background-color', getRandomColor());
        $('#instructions').css('transition', '6s');
        $('#body').css('background-color', getRandomColor());
        $('#body').css('transition', '6s');


    }, 3000);
    document.addEventListener('keydown', (e) => {
        if (newgame == false) {
            if (e.key == 'ArrowRight') {
                $('#ans2').trigger('click');
            } else if (e.key == 'ArrowLeft') {
                $('#ans1').trigger('click');
            }
        } else if (e.key == ' ' && newgame == true) {
            newgame = false;
            $('#start').trigger('click');
        }
    });
    $('#ans1').click(() => {
        checkAns('left')
    });
    $('#ans2').click(() => {
        checkAns('right')
    });



    function getPrefix() {
        var prefix = null;
        if (document.hidden !== undefined)
            prefix = "";
        else {
            var browserPrefixes = ["webkit", "moz", "ms", "o"];
            for (var i = 0; i < browserPrefixes.length; i++) {
                if (document[browserPrefixes[i] + "Hidden"] != undefined) {
                    prefix = browserPrefixes[i];
                    break;
                }
            }
        }
        return prefix;
    }

    function testPageVisibilityApi() {
        if (prefix === null) {
            document.getElementById("score").innerHTML = "Your browser does not support Page Visibility API";
        } else {
            document.addEventListener(prefix + "visibilitychange", () => {
                endGame(true);
            });
        }
    }

    var views = 0;
    var prefix = getPrefix();
    testPageVisibilityApi();


    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () { console.log('Service Worker Registered'); }).catch(()=>{
                console.log('failed');
            });
    }


})

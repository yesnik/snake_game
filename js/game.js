var Game = (function ($) {
    'use strict';
    var init = function (options) {
        config = $.extend({
            board: {
                id: 'board'
            },
            chainClass: 'chain',
            targetClass: 'target',
            snakeChains: [[0, 5], [0, 6], [0, 7], [0, 8]]
        }, options);
        snakeChains = $.extend(true, [], config.snakeChains);
        createBoard();
        initElements();
        initListeners();
        placeTarget();
        renderSnake(snakeChains);
    },
    restart = function () {
        //TODO: Сделать перезапуск змейки без перезагрузки страницы
        location.href = location.href;
    },
    placeTarget = function () {
        //Генерируем координаты цели, пока не получим корректное значение
        while (true) {
            target = getRandomCoords();
            if (!hasCollisionWithSnake(target[0], target[1])) {
                break;
            }
        }
        renderCell(target[0], target[1], config.targetClass);
    },
    getRandomCoords = function () {
        var randX = parseInt(Math.random() * board.colsNum, 10),
            randY = parseInt(Math.random() * board.colsNum, 10);
        return [randX, randY];
    },
    hasCollisionWithSnake = function (x, y) {
        var i, len = snakeChains.length;
        for (i = 0; i < len; i += 1) {
            if (snakeChains[i][0] === x &&
                    snakeChains[i][1] === y) {
                return true;
            }
        }
        return false;
    },
    createBoard = function () {
        board = new Board(config.board.id);
        board.create();
    },
    timer,
    start = function () {
        timer = setInterval(function () {
            clearBoard();
            var coordsArr = updateSnakeCoords(true);
            
            snakeChains = coordsArr;
            
            detectCollisions();
            
            renderSnake(coordsArr);
        }, 600);
    },
    stop = function () {
        clearInterval(timer);
    },
    clearBoard = function () {
        $('#board').find('div.' + config.chainClass).removeClass(config.chainClass);
    },
    updateSnakeCoords = function (doUpdate) {
        var snakeChainsCopy,
            i, moveToDirection, 
            len;
        
        //Делаем независимую копию элементов змейки
        snakeChainsCopy = $.extend(true, [], snakeChains);
        
        len = snakeChainsCopy.length;
        
        //Второе звено передвигаем на место первого, третье - на место второго...
        for (i = 1; i < len; i += 1) {
            snakeChains[i][0] = snakeChainsCopy[i - 1][0];
            snakeChains[i][1] = snakeChainsCopy[i - 1][1];
        }
        
        //Меняем координаты головы змейки
        if (doUpdate) {
            moveSnakeHead();
        }
        return snakeChains;
    },
    moveSnakeHead = function () {
        switch (direction) {
            case 'r':
                snakeChains[0][0] += 1;
                break;
            case 'l':
                snakeChains[0][0] -= 1;
                break;
            case 't':
                snakeChains[0][1] -= 1;
                break;
            case 'b':
                snakeChains[0][1] += 1;
                break;
        }
    },
    initElements = function () {
        $board = $('#' + config.board.id);
    },
    initListeners = function () {
        $(document).on('keyup', onKeyUp);
    },
    onKeyUp = function (e) {
        var keyCode = e.keyCode;
        
        if ( $.inArray(keyCode, [37, 38, 39, 40]) === -1 ) {
            return false;
        }
        
        clearBoard();

        direction = getDirectionByKeyCode(keyCode);

        updateSnakeCoords(true);
        
        if (detectCollisions()) {
            renderSnake(snakeChains);
        }
    },
    detectCollisions = function () {
        if (isTargetCollision()) {
            appendChainToSnake();
            targetRemove();
            placeTarget();
            return true;
        }
        
        if (hasSnakeSelfCollision()) {
            alert('Game Over - Self Collision');
            restart();
            return false;
        } else if (hasBorderCollision()) {
            alert('Game Over - Collision with border');
            restart();
            return false;
        }
        return true;
    },
    hasBorderCollision = function() {
        var headX = snakeChains[0][0],
            headY = snakeChains[0][1];

        if (( headX >= 0 && headX <= board.colsNum - 1) && 
            ( headY >= 0 && headY <= board.rowsNum - 1)) {
            return false;
        } else {
            return true;
        }
    },
    appendChainToSnake = function () {
        var len = snakeChains.length;
        //Вставляем в массив змейки дубляж последнего звена
        snakeChains.push([snakeChains[len - 1][0], snakeChains[len - 1][1]]);
    },
    hasSnakeSelfCollision = function () {
        var i, j, link, len = snakeChains.length;
        for (i = 0; i < len; i += 1) {
            link = snakeChains[i].toString();
            for (j = i + 1; j < len; j += 1) {
                if (link === snakeChains[j].toString()) {
                    return true;
                }
            }
        }
        return false;
    },
    getDirectionByKeyCode = function (keyCode) {
        var direct;
        switch (keyCode) {
            case 37:
                direct = 'l';
                break;
            case 38:
                direct = 't';
                break;
            case 39:
                direct = 'r';
                break;
            case 40:
                direct = 'b';
                break;
        }
        return direct;
    },
    isTargetCollision = function () {
        var i, len = snakeChains.length;
        for (i = 0; i < len; i += 1) {
            if (snakeChains[i][0] === target[0] && 
                snakeChains[i][1] === target[1]) {
                
                return true;
                break;
            }
        }
        return false;
    },
    targetRemove = function () {
        var target_elem = $board.find('li:eq(' + target[1] + ')').find('div:eq(' + target[0] + ')');
        target_elem.removeClass(config.targetClass);
    },

    renderSnake = function (snakeChainsArr) {
        var i, len = snakeChainsArr.length;
        for (i = 0; i < len; i += 1) {
            renderCell(snakeChainsArr[i][0], snakeChainsArr[i][1], config.chainClass);
        }
    },
    renderCell = function (x, y, css_class) {
        var chain_elem = $board.find('li:eq(' + y + ')').find('div:eq(' + x + ')');
        chain_elem.addClass(css_class);
    },
    board,
    $board,
    pointsChangeArr = [],
    direction = 't', //'r', 'l', 't', 'b'
    snakeChains,
    target = [5,5],
    config;
    
    return {
        init: init,
        start: start,
        stop: stop
    };
}(jQuery));

$(document).ready(function(){
    try {
        Game.init();
        Game.start();
    } catch (e) {
        alert(e.message);
    }
});

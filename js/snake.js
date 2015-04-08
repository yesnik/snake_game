//TODO: Закончить вынос логики змейки в этот файл
var Snake = function (boardId, options) {
    'use strict';
    var config = $.extend({
        snakeChains: [[0, 5], [0, 6], [0, 7], [0, 8]],
        chainClass: 'chain'
    }, options);

    alert('Создали змейку');

    //if (boardId === undefined) {
    //    throw ({message: "board_id is required in Board class constructor"});
    //}

    this.snakeChains = config.snakeChains;
    this.chainClass = config.chainClass;
};
Snake.prototype = {
    create: function () {
        'use strict';
        //var boardHtml = this.getBoardHtml(),
        //    board_el = $('#' + this.boardId);
        //if (board_el.length === 0) {
        //    throw ({message: 'Element with id #' + this.boardId + ' was not found on page.'});
        //}
        //board_el.html(boardHtml);
    },
    moveSnakeHead: function (direction) {
        switch (direction) {
            case 'r':
                this.snakeChains[0][0] += 1;
                break;
            case 'l':
                this.snakeChains[0][0] -= 1;
                break;
            case 't':
                this.snakeChains[0][1] -= 1;
                break;
            case 'b':
                this.snakeChains[0][1] += 1;
                break;
        }
    }
};

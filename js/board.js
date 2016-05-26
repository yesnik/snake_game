/**
 * Class for game board
 * @param boardId - id attribute of html element to contain board
 * @param config  - object with settings
 */
var Board = function (boardId, config) {
    var config = $.extend({
        rowsNum: 10,
        colsNum: 10
    }, config);

    if (boardId === undefined) {
        throw ({message: "boardId is required in Board class constructor"});
    }

    this.rowsNum = config.rowsNum;
    this.colsNum = config.colsNum;
    this.boardId = boardId;
};

Board.prototype = {
    create: function () {
        var boardHtml = this.getBoardHtml(),
            board_el = $('#' + this.boardId);
        if (board_el.length === 0) {
            throw ({message: 'Element with id #' + this.boardId + ' was not found on page.'});
        }
        board_el.html(boardHtml);
    },
    getBoardHtml: function () {
        var i, html = '';
        for (i = 0; i < this.rowsNum; i += 1) {
            html += '<li>';
            html += this.getRowHtml();
            html += '</li>';
        }
        return html;
    },
    getRowHtml: function () {
        var i, html = '';
        for (i = 0; i < this.colsNum; i += 1) {
            html += '<div></div>';
        }
        return html;
    }
};

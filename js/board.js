var Board = function (boardId, options) {
    'use strict';
    var config = $.extend({
        rowsNum: 10,
        colsNum: 10
    }, options);
    if (boardId === undefined) {
        throw ({message: "board_id is required in Board class constructor"});
    }

    this.rowsNum = config.rowsNum;
    this.colsNum = config.colsNum;
    this.boardId = boardId;
};
Board.prototype = {
    create: function () {
        'use strict';
        var boardHtml = this.getBoardHtml(),
            board_el = $('#' + this.boardId);
        if (board_el.length === 0) {
            throw ({message: 'Element with id #' + this.boardId + ' was not found on page.'});
        }
        board_el.html(boardHtml);
    },
    getBoardHtml: function () {
        'use strict';
        var i, html = '';
        for (i = 0; i < this.rowsNum; i += 1) {
            html += '<li>';
            html += this.getRowHtml();
            html += '</li>';
        }
        return html;
    },
    getRowHtml: function () {
        'use strict';
        var i, html = '';
        for (i = 0; i < this.colsNum; i += 1) {
            html += '<div></div>';
        }
        return html;
    }
};

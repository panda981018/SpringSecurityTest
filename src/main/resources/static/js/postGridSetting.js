let bbsCategoryId = 0; // category 아이디(1번부터~)
let pagination; // grid의 pagination 객체
let dataSource; // grid datasource
let grid; // tui grid
let sortType = $('#sortStandard option:selected').val();

function getCategoryId(categoryId) {
    bbsCategoryId = categoryId;
}

function createGrid(dataSource) {
    grid = new tui.Grid({
        el: $('#grid')[0],
        minBodyHeight: 40,
        scrollX: false,
        scrollY: false,
        data: dataSource,
        pageOptions: {
            perPage: 10,
            visiblePages: 5,
            centerAlign: true
        },
        columns: [
            {
                header: '번호',
                name: 'id',
                width: "auto",
                align: "center"
            },
            {
                header: '제목',
                name: 'bbsTitle',
                resizable: true,
                align: "left"
            },
            {
                header: '작성자',
                name: 'bbsWriter',
                width: 100,
                align: "center"
            },
            {
                header: '작성날짜',
                name: 'bbsDate',
                width: 135,
                resizable: true,
                align: "center"
            },
            {
                header: '조회수',
                name: 'bbsViews',
                width: "auto",
                align: "center"
            },
            {
                header: '추천수',
                name: 'likeCnt',
                width: "auto",
                align: "center"
            }
        ]
    }); // grid 객체
}

function setDatasource() {
    dataSource = {
        api: {
            readData: {
                url: '/api/bbs/get', method: 'GET',
                initParams: {category: bbsCategoryId, column: sortType}
            }
        }
    }
    createGrid(dataSource);
}

function gridClickEvent() {
    // 클릭된 rowkey를 가져오고 해당 row의 id column 값을 가져와서 이동시키기
    grid.on('click', ev => {
        if (ev.rowKey > -1) {
            const id = grid.getFormattedValue(ev.rowKey, 'id'); // (rowKey, columnName)
            location.href = '/post/bbs/view?id=' + id;
        }
    });
}

function postResponseHandler() {
    grid.on('response', ev => { // readData의 결과를 받는 콜백함수
        console.log(ev);
        const bbsData = JSON.parse(ev.xhr.response).data.contents;
        const resultCnt = JSON.parse(ev.xhr.response).data.pagination.totalCount;
        if (resultCnt > 0) {
            $('#tableInfo').addClass("mb-3 d-flex flex-row justify-content-between align-items-center")
                .css('display', 'block');
            $('#grid').css('display', 'block');
            grid.resetData(bbsData);
        } else { // 0이거나 그 이하면
            alert('찾으시는 결과가 없습니다.');
        }
    });
}
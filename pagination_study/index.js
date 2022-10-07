const rowsPerPage = 10;
const rows = document.querySelectorAll('#my-table tbody tr'); // 전체 데이터
const rowsCount = rows.length;
// console.log(rowsCount); //100
const pageCount = Math.ceil(rowsCount / rowsPerPage);
const numbers = document.querySelector('#numbers');

const prevBtn = document.querySelector('.fa-arrow-left');
const nextBtn = document.querySelector('.fa-arrow-right');

let pageActiveIdx = 0; //현재 보고 있는 페이지 그룹 번호 
let currentPageNum = 0 ; //현재 보고 잇는 페이지네이션 번호
let maxPageNum = 3; // 페이지 번호 개수 




// 페이지네이션 생성 
// 대상.innerHTML = <li><a href="">1</a></li>
// for 반복문 사용하기 

for(let i = 1; i <= pageCount; i++) {
    numbers.innerHTML += `<li><a href="">${i}</a></li>` ;
}


const numberBtn = numbers.querySelectorAll('a'); 
// //페이지네이션 번호 감추기
// for (nb of numberBtn) {
//     nb.style.display = 'none';
// }


// a태그를 누르면
// forEach

numberBtn.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        // for(nb of numberBtn) {
        //     nb.classList.remove('active')
        // }
        // e.target.classList.add('active');
        // console.log(idx)

        //테이블 출력 함수
        displayRow(idx);
    })
})


// let rowsArray = [...rows];    
// // 일단 누르면 다 지워
// for(ra of rowsArray) {
//     ra.style.display = 'none';
// }
function displayRow(idx) {
    // idx가 1번이면, 100개 목록 중 인덱스 번호 0부터 9까지 나타나야함 
    // slice(start, end) 
    // slice(0, 10) 0부터 9까지
    
    // rows는 노드리스트이기 때문에 순수 배열로 먼저 바꿔줘야 함
    // nodeList -> array: Array.from(대상)/ [...대상]
    
    // let rowsArray = Array.from(rows);
    let rowsArray = [...rows];    //tr 노드리스트
    // 일단 누르면 다 지워
    for(ra of rowsArray) {
        ra.style.display = 'none';
    }
    

    /* 
    idx 0 
    slice(0, 10)

    inx 1 
    slice(10, 20) ...
    */
    let start = idx * rowsPerPage; //계속 10배
    let end = start + rowsPerPage;
    let newRows = rowsArray.slice(start, end)
    for(nr of newRows) {
        nr.style.display = '';
    }

    for(nb of numberBtn) {
        nb.classList.remove('active')
    }
    numberBtn[idx].classList.add('active');

}//displayRow
displayRow(0);

//페이지 네이션 그룹 표시 함수
function displayPage(num) {
    //페이지네이션 번호 감추기
    for(nb of numberBtn) {
        nb.style.display = 'none';
    }
    let pageArr = [...numberBtn]
    let totalPageCount = Math.ceil(pageCount/maxPageNum);
    let start = num * maxPageNum;
    let end = start + maxPageNum;
    let pageListArr = pageArr.slice(start, end); 

    for(let item of pageListArr) {
        item.style.display = 'block'
    }

    if(pageActiveIdx === 0) {
        prevBtn.style.display = 'none';
    }else {
        prevBtn.style.display = 'block';
    }

    if(pageActiveIdx === totalPageCount - 1) {
        nextBtn.style.display = 'none';
    }else {
        nextBtn.style.display = 'block';
    }
}
displayPage(0)

nextBtn.addEventListener('click', () => {
    let nextPageNum = pageActiveIdx * maxPageNum + maxPageNum;
    displayRow(nextPageNum);
    ++pageActiveIdx;
    displayPage(pageActiveIdx);
})

prevBtn.addEventListener('click', () => {
    let nextPageNum = pageActiveIdx * maxPageNum - maxPageNum;
    displayRow(nextPageNum);
    --pageActiveIdx;
    displayPage(pageActiveIdx);
})



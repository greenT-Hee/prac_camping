// 창업/컨설팅 문의 테이블
const btnLeft = document.querySelector('#btnLeft'); 
const btnRight = document.querySelector('#btnRight'); 
const row  = document.querySelector('#row');

let consultingDataArray = [];
let page = 0;
let count = 0;

function nextPage (consultingData) {
    const lastPage = Math.ceil(consultingData.length / 5); //3
    console.log((lastPage *5 ) - 5)

    btnRight.addEventListener('click', () => {     
        if(page < (lastPage * 5 ) - 5) {
            page == consultingData.length -5 ? (page = 0) : (page += 5) 
            row.innerHTML = "";
            consultingList(consultingData ,page, count);
        }
    })
}

function prevPage (consultingData) {
    btnLeft.addEventListener('click', () => {        
            if(page !== 0) {
            page -= 5; 
            row.innerHTML = "";
            for(let i = page; i < consultingData.length ; i++ ) {          
                count--;
                console.log(count, "count");
            }
            consultingList(consultingData ,page, count);
        }
    })
}

function consultingList(consultingData) {
    console.log(page, "page");
    const lastPage = Math.ceil(consultingData.length / 5); //3
    let currentPage = page + 5;
    const lastItems = consultingData.length % 5; // 1
    // console.log(currentPage, "currentPage"); 
    // console.log(lastPage, 'lastPage');

    if(currentPage === lastPage * 5) {
        currentPage = parseInt(page + lastItems);
    }

    for(let i = page; i < currentPage ; i++) {
        count++;
        const ul = document.createElement('ul'),
        numLi = document.createElement('li'),
        CategoryLi = document.createElement('li'),
        nameLi = document.createElement('li'),
        telLi = document.createElement('li'),
        memoLi = document.createElement('li'),
        dateLi = document.createElement('li')

        row.append(ul);
        ul.append(numLi, CategoryLi, nameLi, telLi, memoLi, dateLi);
        ul.setAttribute('class', 'wrapTableTxt tableStyle');
        ul.setAttribute('id', 'row');

        numLi.textContent = count;
        if(consultingData[i].category === '1') {
            CategoryLi.textContent = "캠핑장 창업";
        }else if(consultingData[i].category === '2') {
            CategoryLi.textContent = "캠핑장 인테리어"
        } else {
            CategoryLi.textContent = "기타"
        }
        nameLi.textContent = consultingData[i].name;
        telLi.textContent = consultingData[i].tel;
        memoLi.textContent = consultingData[i].memo;
        dateLi.textContent = consultingData[i].date;
    }
}


function consultingInquery(consultingData) {
    const open = document.querySelector("#open");
    const interior = document.querySelector("#interior");
    const ect = document.querySelector("#ect");
    
    let openCount = 0;
    let interiorCount = 0;
    let etcCount = 0;
    for(let i = 0; i < consultingData.length; i++) {
        if(consultingData[i].category === '1') {
            openCount++;
        } else if(consultingData[i].category === '2') {
            interiorCount++;
        } else {
            etcCount ++;
        }
    }
    open.textContent = openCount + "건";
    interior.textContent = interiorCount + "건";
    ect.textContent =  etcCount + "건"; 
    ;

}

$.ajax({
    type:"GET",
    dataType: "json",
    url: publicURL + '/consulting.do',
    success: function(res) {
            const consultingData = res.data;
            consultingList(consultingData);
            consultingInquery(consultingData);
            nextPage(consultingData);
            prevPage(consultingData);
            // return consultingData;
        },
    error: function(err) {
        console.error(err);
    }
});


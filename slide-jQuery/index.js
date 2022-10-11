const container = $('.slideshow');
const slideGroup = container.find('.slides_slides');
const slides = slideGroup.find('a');
const nav = container.find('.slideshow_nav');
const indicator = container.find('.indicator');
let slideCount = slides.length;
let indicatorHTML = '';
let currentIndex = 0;
let duration = 500;
let easing = 'easeInOutExpo';
let interval = 3500;
let timer = '';

// 슬라이드를 가로로 배열
// slides마다 할일, 0%, 100%, 200%, 300%

let slidesArr = [...slides] 
console.log(slidesArr)
slidesArr.forEach((item, index) => {
    let newLeft = index * 100 + '%';
    item.style = `left : ${newLeft}`;

    // 아래 코드를 합쳐서 써버림@!
    const indicators = document.createElement('a');
    indicator.append(indicators);
    indicators.textContent = '🤍';
}); 

// 인디케이터 슬라이드 갯수만큼 만들기
// for(let i = 0; i < slideCount; i++) {
//     const indicators = document.createElement('a');
//     indicator.append(indicators);
//     indicators.textContent = '🤍';
// }


// -----------------------------------------------------

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorItem = document.querySelectorAll('.indicator a');

// 슬라이드 이동 함수
// .animate : ({css property, duration, easing})
function goToSlide(index) {
    // i 0 left:0% i 1 left: -100%
    slideGroup.animate({left: -100 * index + '%', duration, easing});
    currentIndex = index; 
    displayBtns();    
}

// 인디케이터로 이동하기 

indicatorItem.forEach((item, index) => {
    // for(let i = 0; i < item.length; i++) {
    // }
    item.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(index);
    })
})

// 좌우 버튼으로 이동하기 
// 다음 버튼 클릭 currentIndex + 1 
// 이전 버튼 클릭 currentIndex -1

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();

    currentIndex += 1;
    goToSlide(currentIndex);
})

prevBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    currentIndex -= 1;

    goToSlide(currentIndex);
})

function displayBtns() {
    if( currentIndex === 0) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    if( currentIndex == slideCount - 1) {
        nextBtn.classList.add('disabled');
    }else {
        nextBtn.classList.remove('disabled');
    }

    //특정요소에만 효과를 주고 싶을 떄 쓰는 유용한 공식
    indicator.find('a').eq(currentIndex).addClass('active').siblings().removeClass('active');

    // indicatorItem.forEach((item, index) => {
    //     item.classList.add('active');
    // })
}
displayBtns();


// 자동슬라이드 함수
function startTimer() {
    // 일정시간마다 할일 
    //setInterval(할일 함수, 시간), clearInterval(이름)
    
    timer = setInterval(() => {
        //c0 n1, c1 n2,...,c3 n0
        // (0+1)%4 = 1, ..., (3+1)%4 = 0
        // 슬라이드 처음으로 가게 하는 공식!!! 
        let nextIndex = ( currentIndex + 1 ) % slideCount;
        goToSlide(nextIndex)
    },interval);
}
startTimer();

function stopTimer() {
    clearInterval(timer);
}

container.mouseenter(() => {
    stopTimer();
})

container.mouseleave(() => {
    startTimer()
})

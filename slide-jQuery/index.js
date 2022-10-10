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



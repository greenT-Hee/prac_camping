// 홈페이지 유입
const allpersonnel = document.querySelector('#allpersonnel');
const daypersonnel = document.querySelector('#daypersonnel');
function txtInqeury(personnelData) {
    allpersonnel.textContent = personnelData.AllPersonnelCount + "명";
    daypersonnel.textContent = personnelData.DayPersonnelCount + "명";
}

$.ajax({
    type:"GET",
    dataType: "json",
    url: publicURL + '/personnel.do',
    success: function(res) {
        // console.log(res.data);
        const personnelData = res.data; 
        txtInqeury(personnelData)
        
    },
    error: function(err) {
        console.error(err)
    }
});


// 구매문의
function buyProduct(buyProductData) {
    const caravan = document.querySelector('#caravan');
    const trailer = document.querySelector('#trailer');
    const mobileHome = document.querySelector('#mobileHome');
    
    if(buyProductData.length === 0) {
        caravan.textContent = "0 건";
        trailer.textContent = "0 건";
        mobileHome.textContent = "0 건";
    }
}


$.ajax({
    type:"GET",
    dataType: "json",
    url: publicURL + '/buy_product.do',
    success: function(res) {
            console.log(res);
            const buyProductData = res.data;
            buyProduct(buyProductData)
            
        },
    error: function(err) {
        console.error(err)
    }
});
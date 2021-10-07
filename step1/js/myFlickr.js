/*
https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value


일정기간 가장 인기있는 사진들 출력
https://www.flickr.com/services/rest/?method=flickr.interestingness.getList

원하는 이미지 출력
https://www.flickr.com/services/rest/?method=flickr.photos.search

e4dac3c336f1aa366b20a39011946539


*/

$.ajax({
    url : "https://www.flickr.com/services/rest/?method=flickr.photos.search",
    // url : "address"
    // url:"https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
    dataType : "json",
    data:{
        api_key:"e4dac3c336f1aa366b20a39011946539",
        per_page:5,
        format:"json",
        nojsoncallback:1,
        privacy_filter : 5,
        tags : "landscapes"//검색할 이미지 키워드 입력 - method가 photos.search일 때 (interestingness일때는 주석처리)

    }
})
.success(function(data){
    console.log(data);
})
.error(function(err){
    console.err("데이터를 호출하는데 실패했습니다.")
})
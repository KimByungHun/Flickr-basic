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
        nojsoncallback:1, //json 객체를 감싸고 있는 wrapping 함수를 걷어냄
        privacy_filter : 5,
        tags : "perfume"//검색할 이미지 키워드 입력 - method가 photos.search일 때 (interestingness일때는 주석처리)

    }
})
.success(function(data){
    console.log(data.photos.photo);
    let items = data.photos.photo;

    //#gallery프레임 안에 ul 태그 생성
    $("#gallery").append("<ul>");  

    //이미지 데이터 갯수만큼 안쪽 코드 반복
    $(items).each(function(index,data){
        //변수 text에 이미지 데이터의 title을 담음
        let text = data.title;

        //만약 해당 이미지 데이터에 제목 텍스트가 없으면
        if(!data.title){
            //변수 text에 임의의 텍스트를 저장하여 추후 발생할 수있는 오류 방지
            text = "No description in this photo"
        }


        //#gallery ul 프레임에 이미지 데이터 갯수만큼 반복을 돌면서 li 생성
        $("#gallery ul")
            .append(
                $("<li>")
                    //다시 자식으로 p태그 생성해서 이미지 제목 출력
                    .append(
                        //a태그를 만들어서 큰 이미지의 주소를 href속성에 대입
                        $("<a>").attr({
                            href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                        })
                        .append(
                            //다시 a태그안쪽에 img태그를 만들어서 작은 이미지 주소값을 대입하여 썸네일 생성 
                            $("<img>").attr({
                                src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_m.jpg"
                            })
                        )
                    )  
                    .append(
                        $("<p>").text(text)
                    )
                    //이미지를 올린 사용자 프로필 이미지와 이름 출력
                    .append(
                        $("<div class='profile'>")
                            .append(
                                $("<img>").attr({
                                    src:"https://www.flickr.com/buddyicons/"+data.owner+".jpg"
                                }),
                                $("<span>").text(data.owner)
                            )
                    )
            )
    })
})
.error(function(err){
    console.err("데이터를 호출하는데 실패했습니다.")
})

//리스트 버튼을 클릭했을때 레이어 팝업으로 큰 이미지 출력하기
$("body").on("click", "#gallery ul li", function(e){
    e.preventDefault(); 

    let imgSrc = $(this).children("a").attr("href"); 

    $("body").append(
        $("<div class='pop'>")
            .append(
                $("<img>").attr({ src : imgSrc}),
                $("<span>").text("close")
            )
    )
});

$("body").on("click", ".pop span", function(){
    $(".pop").remove(); 
});
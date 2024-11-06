$(document).ready(function () {
  $(".mainlogo img").on("click", function () {
    // 비디오와 로고를 서서히 사라지게 함
    $(".splash video, .splash .mainlogo").fadeOut(500, function () {
      // 메인 콘텐츠를 서서히 보여줌
      $(".main-content").fadeIn(500, function () {
        // 콘텐츠의 각 요소를 순차적으로 보여줌
        $(".main-content > div").each(function (index) {
          $(this)
            .delay(300 * index)
            .fadeIn(500); // 300ms 간격으로 애니메이션
        });

        // 모든 플레이어를 초기 상태로 설정
        let players = [
          $(".player1"),
          $(".player2"),
          $(".player3"),
          $(".player4"),
        ];
        let currentIndex = 0;

        function showNextPlayer() {
          // 현재 이미지를 숨김
          players[currentIndex].removeClass("active");

          // 인덱스 증가 후 범위를 초과하면 처음으로 돌아감
          currentIndex = (currentIndex + 1) % players.length;

          // 다음 이미지를 보이게 함
          players[currentIndex].addClass("active");
        }

        // 초기 상태로 첫 번째 플레이어를 보이게 함
        players[currentIndex].addClass("active");

        // 3초마다 showNextPlayer 함수를 호출
        setInterval(showNextPlayer, 3000); // 3000ms = 3초
      });
    });
  });

  // 스크롤 시 나타나는 효과
  $(window).on("scroll", function () {
    $(".main-content > div").each(function () {
      const elementTop = $(this).offset().top; // 요소의 상단 위치
      const windowScroll = $(window).scrollTop() + $(window).height(); // 현재 스크롤 위치

      // 요소가 화면에 들어올 경우
      if (elementTop < windowScroll) {
        $(this).fadeIn(500); // 요소를 서서히 나타나게 함
      }
    });
  });

  // Highcharts 그래프 생성
  const chart = Highcharts.chart("container", {
    chart: {
      type: "spline",
    },
    title: {
      text: "2024년 KBO 순위 변화",
    },
    subtitle: {
      text: 'Source:<a href="https://www.mdpi.com/2072-6643/14/3/489" target="_blank">MDPI</a>',
    },
    xAxis: {
      categories: ["4월", "5월", "6월", "7월", "8월", "9월", "10월"],
      title: {
        text: "월",
      },
    },
    yAxis: {
      title: {
        text: "순위",
      },
      reversed: true,
      min: 1,
      max: 10,
    },
    tooltip: {
      formatter: function () {
        return `팀: ${this.series.name}<br>순위: ${this.y}`;
      },
    },
    plotOptions: {
      spline: {
        dataLabels: {
          enabled: true,
        },
        marker: {
          enabled: true,
        },
      },
    },
    colors: [
      "#EA0029",
      "#0066B3",
      "#C00C3F",
      "#131230",
      "#000000",
      "#CF0022",
      "#1E3A58",
      "#FF6600",
      "#345587",
      "#7D0521",
    ],
    series: [
      { name: "KIA", data: [3, 1, 1, 1, 1, 1, 1] },
      { name: "삼성", data: [8, 3, 3, 2, 3, 2, 2] },
      { name: "LG", data: [5, 5, 2, 2, 2, 3, 3] },
      { name: "두산", data: [6, 7, 4, 4, 1, 4, 4] },
      { name: "KT", data: [10, 9, 7, 9, 6, 5, 5] },
      { name: "SSG", data: [4, 6, 5, 5, 5, 8, 6] },
      { name: "롯데", data: [8, 10, 10, 7, 9, 7, 7] },
      { name: "한화", data: [1, 8, 8, 8, 8, 6, 8] },
      { name: "NC", data: [2, 2, 5, 6, 7, 9, 9] },
      { name: "키움", data: [7, 6, 9, 10, 10, 10, 10] },
    ],
  });

  // nextbutton 클릭 이벤트 추가
  $(".nextbutton").on("click", function () {
    $("#container").css("opacity", 1); // 그래프를 서서히 보이게 함
  });
});

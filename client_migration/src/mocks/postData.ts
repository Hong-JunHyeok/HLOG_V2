import { PostType } from '@/types/Post';

export const postsMock: PostType[] = [
  {
    id: 1,
    createdAt: new Date(),
    isLiked: false,
    like: [],
    likeNumber: 0,
    postContent: `세 번째 기능 - NEW Suspense SSR Architecture (⭐️⭐️이번 업데이트의 핵심⭐️⭐️)
    리액트에서 SSR을 지원하기 위해서 구조적으로 개편을 하였다.
    
    Suspense를 이제 공식적인 기능으로 지원함으로써 리액트 앱을 더욱 작은 단위들로 분리하고 서버에서 필요한 자원을 받아서 렌더링 하는 과정이 컴포넌트 단위별로 독립적으로 동작하게 됨으로써 앱 전체를 무너뜨리지 않게 해 준다.
    
     
    
    그러면 기존에 SSR에 어떤 문제점이 있었기에 이 기능이 나오게 되었는지 알아보도록 하자.
    
    서버에서 모든 데이터를 불러와야 했기 때문에 그 데이터를 Fetching 하는 기간 동안 리액트는 Hydrating을 하지 못한 때 서버의 데이터를 기다려야 했다.
    
     
    
    Hydrating이란 무엇일까?
    
    기본적으로 리액트 SSR 애플리케이션 플로우는 다음과 같다.
    
    서버가 UI를 그리기 위해 필요한 데이터를 패칭 한다.
    서버가 전체 앱을 HTML으로 렌더링을 하고, 클라이언트에 응답을 보낸다.
    클라이언트는 자바스크립트 번들을 다운로드한다.(HTML과 별개)
    마지막으로, 클라이언트는 자바스크립트 로직을 HTML으로 연결한다.
    이때 마지막 4번째 단계인 (마지막으로, 클라이언트는 자바스크립트 로직을 HTML으로 연결한다.)가 Hydrating 하는 작업이라고 보면 될 것 같다. `,
    postThumnail: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbdWfeI%2Fbtrrqbac3yW%2FatUgYrp5RN4OWSL2ezH3r0%2Fimg.png',
    postTitle: '새로나온 React 18 빠르게 살펴보기',
    updatedAt: new Date(),
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      selfIntroduction: '',
      updatedAt: new Date(),
      username: '홍준혁'
    }
  },
  {
    id: 2,
    createdAt: new Date(),
    isLiked: false,
    like: [],
    likeNumber: 0,
    postContent: `
    신용카드 결제 시 최대 12개월 할부 적용 가능. 2 더 알아보기(새 창에서 열림)
    스토어. 좋아하는 Apple 제품을 구입하는 가장 좋은 방법.
    
    쇼핑 지원이 필요하다면?
    스페셜리스트에게 문의하세요(새 창에서 열림)
    Apple Store를 방문하세요
    가까운 매장 찾기(새 창에서 열림)
    
    Mac
    
    iPhone
    
    iPad
    
    Apple Watch
    
    AirPods
    
    AirTag
    
    Apple TV
    
    액세서리
    이전 - 제품Next(다음) - 제품
    최신 제품. 따끈따끈한 신제품 이야기.
    
    IPHONE 13 PRO
    iPhone 13 Pro
    이게 바로 프로.
    이제 알파인 그린 컬러로 만나보세요. ₩1,350,000부터
    
    IPAD AIR
    가뿐하게. 색다르게. 강력하게.
    ₩779,000부터
    
    MAC STUDIO
    창조의 원동력.
    ₩2,690,000부터
    STUDIO DISPLAY
    대담한 비전을 위한 캔버스.
    ₩2,090,000부터
    IPHONE SE
    iPhone SE
    거침없는 파워. 실속 있는 선택.
    ₩590,000부터
    IPHONE 13
    iPhone 13
    일상을 위한 비상한 능력.
    이제 그린 컬러로 만나보세요. ₩950,000부터
    APPLE WATCH 밴드
    손목에 새롭게 핀 봄.
    다양한 스타일과 색상의 최신 밴드 쇼핑하기.
    이전 - 최신 제품.Next(다음) - 최신 제품.
    도움의 손길. 언제든, 당신에게 맞는 방식으로.
    
    스페셜리스트와 함께하는 일대일 쇼핑. 온라인으로, 또는 매장에서.
    
    무료 개인 맞춤 세션으로 새 기기와 더 친숙해지세요.
    
    Genius Bar에서 전문가의 서비스와 지원을 받아보세요.
    이전 - 도움의 손길.Next(다음) - 도움의 손길.
    남다른 Apple. 이곳에서 쇼핑해야 하는 더욱더 많은 이유.
    온라인으로 주문하고, 매장에서 픽업.
    
    무료 익일 배송 또는 표준 배송.
    
    자신만의 것이라는 증표. 무료로 조합해서 새기는 이모티콘, 이름, 숫자.
    
    Mac을 맞춤 구성하고, Apple Watch를 당신만의 스타일로.
    
    쓰던 기기를 보상 판매하고 새 기기를 더 저렴하게.1
    
    기분 좋은 결제 옵션.2
   
    대한민국
    Copyright © 2022 Apple Inc. 모든 권리 보유.개인정보 처리방침약관판매 및 환불법적 고지사이트 맵`,
    postThumnail: '',
    postTitle: 'Apple WWDC',
    updatedAt: new Date(),
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      selfIntroduction: '',
      updatedAt: new Date(),
      username: '홍준혁'
    }
  },
  {
    id: 3,
    createdAt: new Date(),
    isLiked: false,
    like: [],
    likeNumber: 0,
    postContent: `본 글은 기존의 자바스크립트 개발자의 시점으로 타입스크립트를 소개하는 글임을 알립니다.

 

    자바스크립트와 타입스크립트의 관계는 매우 독특하다. TypeScript은 JavaScript 위에 레이어로서 자리잡고 있는데, JavaScript의 기능들을 제공하면서 그 위에 자체 레이어를 추가한다. 바로 이 레이어가 타입스크립트의 타입 시스템이다.
    
     
    
    JavaScript는 number, object, undefined등의 원시 타입을 가지고 있지만 코드 베이스에서 일관되게 작성되었는지 확인해주지는 않는다. TypeScript는 여기서 레이어도 동작한다.
    
     
    
    타입 추론
     변수를 생성하면서 동시에 특정 값에 할당하는 경우, TypeScript는 그 값을 해당 변수의 타입으로 사용할 것이다.
    
    let helloWorld = "Hello World!";
     TypeScript는 JavaScript 코드를 받아들이면서 타입을 가지는 타입 시스템을 구축할 수 있다.
    
     
    
    이것이 가능한 이유는 TypeScript는 JavaScript의 SuperSet이기 때문이다.
    
    
    따라서 위의 코드는 helloWorld변수가 string타입으로 추론한다.
    
    타입 정의하기
    JavaScript는 동적 타입 프로그래밍이 가능하므로 몇몇 디자인 패턴은 자동으로 타입을 제공하기 힘든 경우가 있다.
    
    따라서 TypeScript에서 타입을 직접 정의해줄 수 있다
    
     
    
    다음 코드를 보도록하자.
    
    const user = {
      name: "Hayes",
      id: 0,
    };
    위 코드는 name : string 과 id : number를 포함하는 추론 타입을 가지는 객체를 생성한다.
    
    이 객체의 형태를 명시적으로 타나내기 위해서는 interface 키워드를 사용한다.
    
    interface User {
        name: string;
        id: number;
    }
    이제  : TypeName키워드를 사용해서 JavaScript객체가 다음과 같은 타입을 따르는 객체임을 명시한다.
    
    const user: User = {
      name: "Hayes",
      id: 0,
    };
    이때, 정의한 인터페이스와 다른 객체를 생성하면 TypeScript는 에러를 줍니다.
    
    // @errors: 2322
    interface User {
      name: string;
      id: number;
    }
    
    const user: User = {
      username: "Hayes",
      id: 0,
    };`,
    postThumnail: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrztKP%2FbtrfMN0brqn%2FAa4oErXpXaIYG1fO1D2E90%2Fimg.png',
    postTitle: 'TypeScript 핸드북',
    updatedAt: new Date(),
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: '',
      selfIntroduction: '',
      updatedAt: new Date(),
      username: '홍준혁'
    }
  },
  {
    id: 4,
    createdAt: new Date(),
    isLiked: false,
    like: [],
    likeNumber: 0,
    postContent: 'Hello',
    postThumnail: '',
    postTitle: 'Lorem',
    updatedAt: new Date(),
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      selfIntroduction: '',
      updatedAt: new Date(),
      username: '홍준혁'
    }
  },
  {
    id: 5,
    createdAt: new Date(),
    isLiked: false,
    like: [],
    likeNumber: 0,
    postContent: 'Hello',
    postThumnail: '',
    postTitle: 'Lorem',
    updatedAt: new Date(),
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: '',
      selfIntroduction: '',
      updatedAt: new Date(),
      username: '홍준혁'
    }
  },
  {
    id: 6,
    createdAt: new Date(),
    isLiked: false,
    like: [],
    likeNumber: 0,
    postContent: 'Hello',
    postThumnail: '',
    postTitle: 'Lorem',
    updatedAt: new Date(),
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: '',
      selfIntroduction: '',
      updatedAt: new Date(),
      username: '홍준혁'
    }
  },
  {
    id: 6,
    createdAt: new Date(),
    isLiked: false,
    like: [],
    likeNumber: 0,
    postContent: 'Hello',
    postThumnail: '',
    postTitle: 'Lorem',
    updatedAt: new Date(),
    user: {
      email: 'edb1631@naver.com',
      createdAt: new Date(),
      id: 1,
      profileUrl: '',
      selfIntroduction: '',
      updatedAt: new Date(),
      username: '홍준혁'
    }
  }
];

export const postMock: PostType = {
  id: 1,
  createdAt: new Date(),
  isLiked: false,
  like: [],
  likeNumber: 0,
  postContent: 'Hello',
  postThumnail: '',
  postTitle: 'Lorem',
  updatedAt: new Date(),
  user: {
    email: 'edb1631@naver.com',
    createdAt: new Date(),
    id: 1,
    profileUrl: '',
    selfIntroduction: '',
    updatedAt: new Date(),
    username: '홍준혁'
  }
};

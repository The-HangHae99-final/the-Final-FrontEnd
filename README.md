## 기술 스택/라이브러리와 선정 이유

**Redux toolkit**

선정이유
💡 로그인 여부에 따라 헤더에서 보여져야 하는 UI를 다르게 만드려고 여러개의 props들을 헤더 내부의 컴포넌트들로 전해주는 과정에서 불편함을 느꼈습니다.
로그인 여부, 유저정보 관련 데이터들을 툴킷으로 전역에서 관리하니 depth가 깊어질 수록 코드를 짜기가 복잡해지는 props 방식보다 훨씬 간편해졌습니다.

redux말고 툴킷 쓴 이유

- redux는 깔아야할게 너무 많다(redux-thunk, immer 등 ..)
- 스토어 설정 복잡하다
- 요구되는 boiler plate가 너무 많다(action, action creator 등 ..)

**Portal**

선정이유
💡 처음엔 컴포넌트 안에서 Modal이라는 div를 따로 만들고, z-index를 높여서 현재 페이지의 화면을 덮도록 만들었습니다.

그런데 이번 프로젝트에서 새로운 페이지를 여는 것 대신 모달을 많이 쓰게 될 것 같아 사용성이 높고 조금 더 쓰기 편한 방식으로 모달을 쓸 순 없을까 고민해보다가, portal은 z-index 같은 부모-자식 간의 제약을 넘어서 dom노드에서 실제론 부모-자식관계이지만 자식이 부모로부터 독립적인 위치에 있을 수 있게 한다는 글을 보고 portal로 모달을 구현해보았습니다.

**socket.io-client**

선정이유:
💡 개인 채팅, 단체 채팅 기능을 구현하기 위해서 실시간 양방향 통신을 돕는 socket.io가 필요했습니다.웹 소켓이 아닌 socket.io를 사용한 이유는 socket.io 웹소켓 기술을 활용하여 더 많은 기능을 사용할 수 있게 해주기 때문입니다. 같은 양방향 소통을 한다는 의미에선 같지만 socket.io에는 ‘방’이라는 개념이 있기때문에 일부 클라이언트들에게만 데이터를 전송하는 송전탑같은 역할을 할 수 있는 브로드캐스팅 기능이 있기 때문에 이를 선택습니다.

**React-Datepicker**

선정이유:
💡 teamnote 프로젝트에는 같은 워크스페이스 내에서 사람들과 일정(시작일-마감일)을 확인하고 추가할 수 있는 캘린더 기능이 있다. 달력은 메인페이지 1개, 달력페이지 2개 총 3개가 들어갈 예정인데, 각각 화면에 보여줄 수 있는 데이터나 기능이 조금씩 다르다. 이를 위해 reacte-datepicker 라이브러리를 썼다.

## 구현 기능

### 로그인, 회원가입

- 카카오톡, 네이버로 소셜로그인
- 일반 로그인

### 실시간 채팅

- 개인 채팅방
- 팀 채팅방
- 팀 공지방

### 보드 기능

- 작업 상태를 진행 할 일, 진행 중, 완료 3가지로 나누어 보여줍니다

### 캘린더 기능

- 이번달의 일정을 한 눈에 확인 할 수 있습니다

<br>

## 커밋 메시지 규칙

## 배운 점 & 아쉬운 점

## 라이센스

MIT &copy; [NoHack](mailto:lbjp114@gmail.com)

<!-- Stack Icon Refernces -->

[js]: /images/stack/javascript.svg
[ts]: /images/stack/typescript.svg
[react]: /images/stack/react.svg
[node]: /images/stack/node.svg

# 💻 TEAM NOTE - FrontEnd

## 🏠 [Home Page Link]()

## 소개 영상 []

<hr>
<br>

## 🗂️ 목차

### 1. [프로젝트 소개](#-프로젝트-소개)

실용적이고, 매력적인 UI로 협업에서 받는 스트레스를 줄여 드립니다!

함께 프로젝트를 하는 사람들과 일정을 공유하고, 정리하고, 대화를 나눠보세요!

Share your task ~!

### 2. [팀 구성](#-팀-구성)

### 3. [기술 스텍](#-기술스택-why)

### 4. [라이브러리](#-라이브러리-why)

### 5. [주요 기능](#️-주요-기능)

### 6. [아키텍쳐](#-백엔드-아키텍처)

### 7. [최종 성과](#최종-성과)

### 8. [트러블 슈팅](#트러블-슈팅)

<hr>
<br>

## 📈 프로젝트 소개

#### -----

<br>

## 🗓 프로젝트 기간

<br>

## 🧑‍💻 팀 구성

[팀 소개 페이지]()

<br>

## 🛠 기술스택 ([WHY?](https://spark-stove-6bf.notion.site/cf6de263fec844ba8c989b4c9a6dd32e))

| 기술스택      |           설명           |
| ------------- | :----------------------: |
| React         | 자바스크립트 라이브러리  |
| Redux toolkit | 전역 상태관리 라이브러리 |
| S3            |        서버 배포         |

<br>

## 📖 라이브러리 ([WHY?]())

<!-- | 라이브러리                                                                            |          설명          |
| ------------------------------------------------------------------------------------- | :--------------------: |
| <img src='https://img.shields.io/badge/artillery-1.7.9-lightgrey'>                    |    서버 부하 테스트    |
| <img src='https://img.shields.io/badge/bcrypt-5.0.1-lightgrey'>                       |    비밀번호 암호화     |
| <img src='https://img.shields.io/badge/compression-1.7.4-lightgrey'>                  |      데이터 압축       |
| <img src='https://img.shields.io/badge/cors-2.8.5-lightgrey'>                         |    교차 리소스 공유    |
| <img src='https://img.shields.io/badge/dotenv-10.0.0-lightgrey'>                      |     환경변수 관리      |
| <img src='https://img.shields.io/badge/express-4.17.1-lightgrey'>                     |          서버          |
| <img src='https://img.shields.io/badge/express--rate--limit-5.5.1-lightgrey'>         |     요청 횟수 제한     |
| <img src='https://img.shields.io/badge/helmet-4.6.0-lightgrey'>                       |     HTTP 헤더 보안     |
| <img src='https://img.shields.io/badge/ioredis-17.4.1-lightgrey'>                     |       redis 연결       |
| <img src='https://img.shields.io/badge/joi-17.4.1-lightgrey'>                         |    입력데이터 검출     |
| <img src='https://img.shields.io/badge/jest-27.3.1-lightgrey'>                        |      테스트 코드       |
| <img src='https://img.shields.io/badge/jsonwebtoken-8.5.1-lightgrey'>                 |      서명 암호화       |
| <img src='https://img.shields.io/badge/moment-2.29.1-lightgrey'>                      |    날짜 라이브러리     |
| <img src='https://img.shields.io/badge/morgan-1.10.0-lightgrey'>                      |     Http Log 기록      |
| <img src='https://img.shields.io/badge/mysql-2.3.2-lightgrey'>                        |         MySQL          |
| <img src='https://img.shields.io/badge/node--schedule-2.0.0-lightgrey'>               |   스케쥴 업무 자동화   |
| <img src='https://img.shields.io/badge/request--ip-2.1.3-lightgrey'>                  |     client ip 요청     |
| <img src='https://img.shields.io/badge/sequelize-6.7.0-lightgrey'>                    |       MySQL ORM        |
| <img src='https://img.shields.io/badge/sequelize--cli-6.2.0-lightgrey'>               |   MySQL ORM Console    |
| <img src='https://img.shields.io/badge/swagger--ui--express-4.1.6-lightgrey'>         |       API 문서화       |
| <img src='https://img.shields.io/badge/ts--node-10.4.0-lightgrey'>                    |    TypeScript 실행     |
| <img src='https://img.shields.io/badge/tsc--watch-10.4.0-lightgrey'>                  | TypeScript 실행(watch) |
| <img src='https://img.shields.io/badge/typescript-4.4.4-lightgrey'>                   |       TypeScript       |
| <img src='https://img.shields.io/badge/winston-3.3.3-lightgrey'>                      |     Log 파일 생성      |
| <img src='https://img.shields.io/badge/winston--daily--rotate--file-4.5.5-lightgrey'> |     Log 파일 관리      |

<br> -->

## 🕹️ 주요 기능

### 소셜 로그인

- 더 이상 귀찮은 회원가입, 로그인은 naver
- 네이버와 카카오를 이용한 간편한 로그인 시스템

### 메시지: 동료들과 실시간으로 소통할 수 있는 메시지

- 개인 메시지 / 그룹 메시지 / 공지방
- 공지방에서 업무 내용 및 자료 공유, 일정 관리

### 캘린더: 한 눈에 일정 관리

- 개인/팀 별 구성원의 일정을 구분하여 관리
- 팀의 일정을 한눈에 파악하는 구성원 일정 보기

### 보드: 팀원들과 꼼꼼하고 체계적인 업무 관리

- 작업 상태를 to do, proceeding, done 으로 나누어 할 일 관리
- 작업을 맡을 담당자 할당 가능

### 대시보드: 프로젝트의 중요 정보들을 확인

- 공지방에 올리온 최신글 확인
- 유저 접속 시간
- 접속 중인 유저와 채팅
- 간편한 메모장 기능
- 이번 주의 일정을 확인 할 수 있는 미니 캘린더

<hr>

## ✍ Code Convention

<br>

## 🐱 Git Rule

- Fix: 올바르지 않은 동작을 고친 경우
- Add: 코드나 테스트, 예제, 문서 등의 추가
- Remove: 코드의 삭제 ( ‘unnecessary’, ‘useless’, ‘unneeded’, ‘unused’, ‘duplicated’ 등 주로 사용 예정)
- Refactor: 전면 수정
- Simplify: Refactor보다 작은 부분적인 수정 시
- Update: 개정, 버전 업데이트
- Improve: 성능, 접근성 등 향상의 목적
- Correct: 문법의 오류, 타입의 변경, 이름 변경
- Ensure: 확실한 기능 구현 시
- Issue: 해결하지 못 한 문제가 생겼을 떄

<br>

## 최종 성과

<img src="https://user-images.githubusercontent.com/86486778/144451851-c3a4a905-f7ab-4003-8028-6ccf611ae58e.png" width="300px">
<img src ="https://user-images.githubusercontent.com/86486778/144452071-7ad6e083-e561-4eeb-8647-89ede8ac650e.png" width="300px" height="200px">

<img src="https://user-images.githubusercontent.com/86486778/144451657-7d34f9fa-27b1-4b5d-8a96-a541c363e9ad.png" width="300px">

- redis hyperloglog를 이용한 일일 방문자 집계
- 광고 게시 5일간 방문자 수 총 1197명, 투표참여 수 1214회
- 121개의 게시글 작성
- 설문조사시 높은 만족도

#### 시간적 여유가 부족한 개인투자자들이 의견을 나눌 수 있는 쉽고 간편한 투표 커뮤니티라는 기획이 적중하여 만들어낸 결과라고 생각

<br>

## ❗트러블 슈팅

### 1. 채팅페이지에서 유저프로필을 클릭했을 때 state값을 업데이트 시켜주고, 바로 다음 줄에 그 값을 인자로 쓰는 함수를 호출했지만 콘솔로 인자를 찍어보니 빈 문자열이 출력되었다.

- **어떤 문제점을 겪었는가?**

  채팅 페이지에서 상대와 대화를 시작하기 위해 필요한 상대방의 이름과
  워크스페이스 이름 state값을 업데이트 시키고, 바로 다음 줄에서 업데이트 된 state값을 인자로 받는 joinRoom 함수를 호출했는데 앞서 업데이트 시킨 인자값이 빈 문자열로 뜨는 이슈.

- **왜 이런 문제가 발생했는가?**

  setState는 비동기로 작동한다.
  그렇기 때문에 state가 비동기적으로 실행되어, joinRoom 함수에는 업데이트 되기 전 값인 초깃값 빈 문자열이 들어갔기 때문이다.

- **어떻게 해결했는가?**

  setState는 상태값을 업데이트시킨다

  근데 문제는 setState는()같은 state 변경함수는 전부 비동기적으로 처리된다.

  다시말해서 setState는()이 오래 시간이 걸리면 이걸 제껴두고 다른 코드부터 실행한다는 것이다.

  이런 경우 setstate가 동기적으로 처리가 되게끔 해주어야한다.

  이때 useEffect 의존성 배열을 활용하면 된다.

  의존성 배열 안에 업데이트 할 데이터를 넣어주면 useEffect 안의 콜백함수는 그 데이터에 변경이 이루어질 경우에만 실행이 된다.

  > 참고문헌:https://velog.io/@dosilv/TIL-React-setState-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0-648sv7je

### 2. 로그인 후 새로고침하면 로그인 유지상태가 풀리는 이슈.

- **어떤 문제점을 겪었는가?**

  로그인을 하고 난 뒤 새로고침을 하면 로그인 상태가 풀려버려서 로그인을 해야만 보이는 페이지들을 볼 수 없게 되었다.

- **왜 이런 문제가 발생했는가?**

  성공적으로 로그인을 하게 되면 isLoggedIn이라는 초깃값으로 지정해둔 false에서 true로 바꾸면서 그 상태에 맞게 삼항연산자로 페이지별 라우팅을 시켰다. 새로고침을 하게되면 변경된 state가 다시 초기화 되기 때문이다.

  - **어떻게 해결했는가?**

    state값처럼 새로고침 시 변하는 상태가 아니라 불변하는 상태를 만들면 될 것 같았다.
    고민하던 중 localStorage에 저장해놓은 엑세스토큰 값이 생각났다. ls에 저장 시 로그아웃 버튼을 누르거나 개발자도구애서 직접 지워주지 않는 이상 데이터가 사라지지 않는다.
    로그인되어 있지 않다면 isLoggedIn이라는 키값을 false로 ls에 저장하고, 로그인되어 있다면 true로 바꾸어 페이지별 라우팅을 시켜서 해결했다.

### 3. 워크스페이스 리스트를 불러오는데 무한 요청

- **어떤 문제점을 겪었는가?**

  워크스페이스 리스트에 데이터를 추가하는 요청을 보내고, 새로 업데이트된리스트를 가져오는 GET요청을 보내는 과정에서 무한루프 현상이 발생했다.

- **왜 이런 문제가 발생했는가?**

  문제는 데이터가 생성 될 때(POST 요청 시) 업데이트되는 state값을useEffect의 두번째 인자값으로 넣었다.
  그런데 useEffect 콜백함수 내에도 데이터 set함수를 썼기때문에 무한루프가발생했다.
  POST요청 -> setState() -> GET 요청(useEffect 내) -> setStat() -> GET 요청(useEffect 내) -> setState() ..

- **어떻게 해결했는가?**

  post 요청이 성공하면 서버로부터 data가 담긴 response 값을 받아state값으로 append해준다.

  로그인 한 뒤 처음 렌더링 할 때도 워크스페이스 리스트를 가져와야 하므로 빈배열을 두 번째 인자로 담은 useEffect에 get요청을 하는 코드를 담는다.

  화면에서 워크스페이스 리스트를 map으로 뿌려준다.

> 참고문헌: https://velog.io/@khy226useEffect-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC9A%94%EC%95%BD

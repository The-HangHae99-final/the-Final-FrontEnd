# TeamNote

<p align="center">
  <br>
  <img src="./images/common/logo-sample.jpeg">
  <br>
</p>

목차

## 프로젝트 소개

<p align="justify">
프로젝트 개요/동기
</p>

<p align="center">
GIF Images
</p>

<br>

## 팀원 소개

Front-end

- 이형섭

Back-end

- 김하연
- 전영준
- 정연욱

Designer

- 김규림

## 기술 스택

language

- Javascript

Framework / Library

- React
- Redux toolkit

Tool

- react-datePicker
- react-big-calendar

<!--
| JavaScript | TypeScript |  React   |  Node   |
| :--------: | :--------: | :------: | :-----: |
|   ![js]    |   ![ts]    | ![react] | ![node] | -->

<br>

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

Fix: 올바르지 않은 동작을 고친 경우
Add: 코드나 테스트, 예제, 문서 등의 추가
Remove: 코드의 삭제 ( ‘unnecessary’, ‘useless’, ‘unneeded’, ‘unused’, ‘duplicated’ 등 주로 사용 예정)
Refactor: 전면 수정
Simplify: Refactor보다 작은 부분적인 수정 시
Update: 개정, 버전 업데이트
Improve: 성능, 접근성 등 향상의 목적
Correct: 문법의 오류, 타입의 변경, 이름 변경
Ensure: 확실한 기능 구현 시

## 배운 점 & 아쉬운 점

<p align="justify">

</p>

<br>

## 라이센스

MIT &copy; [NoHack](mailto:lbjp114@gmail.com)

<!-- Stack Icon Refernces -->

[js]: /images/stack/javascript.svg
[ts]: /images/stack/typescript.svg
[react]: /images/stack/react.svg
[node]: /images/stack/node.svg

Footer
© 2022 GitHub, Inc.
Footer navigation
Terms

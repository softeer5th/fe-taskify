## 주요 작업
> ### 과제 분석 및 설계
> **태스키파이**라는 주어진 과제를 분석하고 설계했다.

## 학습 키워드
- **VanliaJS에서의 상태관리**
- **DOM API** `document.querySelector` `innerHTML` `appendChild`
- **addEventListener**
- **ES Modules**
- React를 사용하지 않을 때 HTML 요소를 동적으로 생성 및 참조하는 법 `document.createElement('count')`
`document.getElementById('count')`
- 폴더 구조를 어떻게 해야하는가? helper와 service의 차이

## 고민과 해결과정
> ### 설계에 관한 고민
> VanliaJS로 설계한다는 것 자체가 고민이자 어려움이었다. 생성형 AI에게 도움을 받아 상태를 관리하고 DOM을 업데이트 하는 방법 등을 학습했다. 아키텍쳐 등은 컴포넌트 기반 개발을 지향하며, UI와 비즈니스 로직 간의 `느슨한 결합`을 지향하도록 설계했다.

> ### 그래서 어떻게 느슨한 결합으로 DOM을 업데이트 할 것인가 (with 예시)
> 1. eventListner를 함수 파라미터로 받는 콜백 함수를 달아서 만든다.
> 2. 상태를 생성하는 메서드를 만든다.
> 3. 상태를 변경하는 메서드(비즈니스 로직)을 만든다.
> 4. [2]를 활용하여 app.js또는 특정 컴포넌트 파일에서 상태를 생성하거나, 전역으로 생성할 수 있다. 컴포넌트를 생성할 때 상태 변경 콜백[3]을 넘긴다.
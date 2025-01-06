# fe-taskify

## 강사님 말한 목표
css 로드 없어도 웹 이해가 가능하게
시맨틱 태그를 적극 활용하는 것이 중요함 (1차 목표라 함. 시맨틱 태그는 기본적인 css가 브라우저에 있음?)

## 내 목표
바닐라 JS를 통해 나만의 유사 리액트를 개발하여, 리액트와 유사한 방식으로 바닐라 JS 웹을 개발

## 문제
1. 어떻게 초기 렌더링?
   - 루트 시작점을 지정. App()
   - App에서 부터 시작해서 Fiber Node 트리를 만듬
   - Fiber Node 트리가 다 생성되었으면 다시 App부터 시작해서 DOM 업데이트 시작
2. JSX 문법을 어떻게?
    - < > 을 직접 파싱하는건 복잡할 것 같기에, React.Component(FunctionComponent, Children, props) 로 Fiber Node를 생성할 계획
    - 
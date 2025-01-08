# 소프티어 FE 태스키파이 과제
소프티어 5기 프론트엔드 직군에서 진행하는 과제이다.
**오직 VanliaJS 환경에서 구현해야 하며, 라이브러리 사용 금지**한다.

## 프로그래밍 요구사항
### 설계
- HTML,CSS,JavaScript 모든 개발 전에는 분석/설계 과정을 거친다.
- 시각적으로 자유롭게 표현하고, PR에 포함해야 한다.

### HTML,CSS 개발
- 의미에 맞는 태그를 사용한다. 단순히 wrapping하는 역할은 div를 사용해도 좋다.
- 디자인 가이드에 맞게 스타일을 한다. 하지만 엄격하게 스타일을 맞추지 않아도 상관없다.
- 화면 배치(layout)는 일정하게 한다.

### DOM 조작
- DOM 조작과정에서 template literal 문법을 반드시 사용한다.

### Events
- addEventListener 를 사용한 이벤트 처리를 한다.

### ESM
- ES Modules 방식으로 개발한다. (import, export)
- 별도의 빌드 도구는 갖추지 않아도 된다.

### 함수 활용
- 가급적 Class 보다는 함수 단위로만 개발한다.
- 함수는 하나의 역할을 한다.
- 함수의 이름은 동사+명사로 짓는다.
- 객체는 필요한 부분에서 만들어도 좋다.

### 데이터 사용
- 데이터는 mock 데이터를 임의로 만들어서 노출할 수 있다.
- 데이터 내용자체가 중요하지 않음.

### 데이터통신
- 1주차에는 데이터 통신을 하지 않는다.

## 프로젝트 분석 및 설계

### 1. 분석
주어진 요구사항을 토대로 과제 전체에서 철저하게 고려되어야 하는 사항을 정리함.
- VanliaJS로 과제가 진행되어야 함
- 외부 라이브러리 사용 금지
- 함수 단위로 개발하며, 한가지 역할만 수행하도록 해야 함
- 함수의 이름은 `동사 + 명사`로 지어야 함 ex) setState
### 2. 설계
- React를 사용하지 못하는 환경이기 때문에, DOM 업데이트 방식을 직접 설계해야 함. -> React의 `useState`와 비슷한 상태 관리 패턴을 도입. 하단엔 예시
```js
// state.js
// 상태를 생성하는 코드

export default function createState(initialState) {
    let state = initialState;
    const listeners = [];

    const getState = () => state;

    const setState = (newState) => {
        state = typeof newState === 'function' ? newState(state) : newState;
        listeners.forEach((listener) => listener(state));
    };

    const subscribe = (listener) => {
        listeners.push(listener);
    };

    return { getState, setState, subscribe };
}

// 상태를 사용하는 코드
// 이 부분은 비즈니스 로직이므로 UI와 분리되는게 좋을듯
import createState from './state.js';

const appState = createState({ count: 0 });

const countElement = document.getElementById('count');
const incrementButton = document.getElementById('increment');

// 상태 변경 시 DOM 업데이트
appState.subscribe((state) => {
	// 아래 코드는 render 함수로 분리될 여지가 있음
    countElement.innerText = state.count;
});

// 이벤트 리스너
incrementButton.addEventListener('click', () => {
    appState.setState((prev) => ({ count: prev.count + 1 }));
});
```

- UI와 비즈니스로직 간의 결합을 되도록 느슨하게 하는 것을 목표로 컴포넌트 단위 개발을 한다. 하단엔 예시
```js
// counter.js
// 앞서 서술한 상태 관리 패턴을 사용한다고 가정한다면, Counter라는 UI와 클릭시 1을 더해주는 비즈니스로직을 분리할 것임. Counter 컴포넌트 생성할 때 콜백을 넘겨줄 것임

function Counter(onIncrement) {
  const template = document.createElement('template');
  template.innerHTML = `
    <div>
      <p>Count: <span id="count">0</span></p>
      <button id="increment">+</button>
    </div>
  `;

  // `cloneNode`는 DOM 노드를 복제하는 메서드입니다.
  // `true`: 하위 요소와 그 내용까지 모두 복제합니다.
  // `false`: 하위 요소는 복제하지 않고 노드 자체만 복제합니다.
  const content = template.content.cloneNode(true);
  const incrementButton = content.querySelector('#increment');
  incrementButton.addEventListener('click', onIncrement);
  
  return content;
}


// render.js
// Counter DOM이 업데이트
function renderCounter(state, rootElement) {
  const countElement = rootElement.querySelector('#count');
  countElement.innerText = state.count;
}


// services.js
export function incrementCount(state) {
	return { count: state.count + 1 };
}

// app.js
import createState from './state.js';
import Counter from './counter.js'; import { incrementCount } from './services.js';

const appState = createState({ count: 0 }); // 이는 전역으로 사용될수도 있음

const root = document.getElementById('app');
const counterComponent = Counter(() => {
    appState.setState((prev) => incrementCount(prev));
});

root.appendChild(counterComponent);

appState.subscribe((state) => {
    renderCounter(state, root);
});

``` 

### 3. 폴더 구조
```
project-root/
│
├── index.html      # 메인 HTML 파일
├── styles/         # CSS 파일
│   ├── base.css    # 기본 스타일 (reset, 공통 스타일)
│   ├── layout.css  # 레이아웃 관련 스타일
│   └── components/ # 개별 컴포넌트 스타일
│       └── button.css
│
├── scripts/        # JavaScript 파일
│   ├── main.js     # 진입점 스크립트
│   ├── router.js   # 라우팅 관련 스크립트 (본 과제의 경우 필요 없을 수 있음)
│   ├── api/        # API 호출 모듈 (본 과제의 경우 http 통신 대신 내부 통신)
│   │   └── fileApi.js
│   ├── components/ # 재사용 가능한 컴포넌트
│   │   ├── header.js
│   │   ├── footer.js
│   │   └── modal.js
│   ├── utils/      # 유틸리티 함수
│   │   ├── helpers
│   │   │   ├── cardsHelper.js
│   │   │   └── validator.js
│   │   └── services
│   │       └── sectionService.js
│   └── store/      # 상태 관리 관련 함수
│       ├── createState.js
│       └── globalStates.js # 전역 상태들
│
├── assets/         # 아이콘, 폰트 등 정적 리소스
│   ├── fonts/
│   └── icons/
│
└── README.md       # 프로젝트 설명서

```
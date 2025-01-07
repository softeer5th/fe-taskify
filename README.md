## 기능 구현 사항

- header
    - 헤더에는 로고와 활동기록 이미지가 보여집니다.
    - 활동기록
        - 활동기록 이미지를 클릭시 활동기록 모달이 나타납니다.
        - 활동기록모달에는 닫기, 전체기록 삭제, 활동기록 card들이 보여집니다.
        - 활동기록 닫기를 누를시 모달이 사라집니다.
        - 활동기록 card
            - 활동기록 card에는 이름, 사진, 활동내용, 기록된 시간이 보여집니다.
        - 활동기록 삭제 버튼
            - 활동기록 삭제 버튼을 누를 시 한번더 물어보는 모달이 보여집니다.
            - 한번더 물어보는 모달에서 삭제 버튼을 누를시 활동내역이 삭제 됩니다.
- section
    - section에는 해야할일,하고있는일,완료한일의 칼럼들이 보여집니다.
    - 칼럼의 헤더에는 title,하위 카드의 개수, 카드 등록 및 삭제 버튼이 보여집니다.
    - 카드 등록 버튼에 마우스를 올리면 색상이 바뀌고 버튼을 클릭하면 등록하는 박스가 나타납니다.
    - 칼럼 타이틀의 삭제 버튼은 hover시 빨간색으로 변경되고 실제 삭제되지는 않습니다.
    - card에는 제목, 내용, 작성자, 삭제버튼,수정버튼이 있습니다.
    - card 등록
        - 카드등록 박스에는 제목 및 내용을 입력할 수 있으며 취소와 등록 버튼이 있습니다.
        - 카드등록 박스에 제목 및 내용을 입력하면 등록버튼이 활성화됩니다.
        - 내용 입력 후 등록 버튼을 누르면 박스는 사라지고 새로운 카드가 등록됩니다.
    - card 이동
        - 카드는 같은 칼럼 내에서 위아래로 이동하는것 뿐만 아니라 다른 칼럼에도 드래그앤드롭으로 이동할 수 있습니다.
        - 드래그앤드롭시, 원래 카드가 있던 자리에 잔상이 생깁니다. 
        이동경로의 절반정도가 되면 카드의 예정 목적지로 카드의 잔상이 먼저 이동합니다.
        드래그를 중단하면 카드의 잔상이 있던 위치로 이동하며 잔상은 사라집니다.
    - card 삭제
        - 카드의 삭제 버튼에 마우스를 올리면 카드가 빨갛게 변하고 버튼을 누르게 되면 한번더 물어보는 모달창이 보여집니다.
        - 한번더 물어보는 모달창에서 유지버튼을 누르면 모달창만 닫히고, 삭제버튼을 누르면 해당 카드가 삭제됩니다.
    - card 수정
        - 카드의 수정버튼을 누르면 등록박스로 바뀌고 수정이 가능해집니다.
        - 수정상태에서 취소를 누르면 변경사항이 반영되지 않고 저장버튼을 누르게되면 반영됩니다.
    - card 정렬
        - 상단 로고옆에 위치하며 기본은 생성순이며 버튼을 누르게되면 최신순으로 전환되도록 합니다.
        - 순서가 전환이 될때 할일 카드들이 정렬 되면서 움직이는 애니메이션을 적용합니다.
        

## 추가로 구현해야할 사항

- 칼럼 수정
- 칼럼 추가 및 삭제
- 실행 취소와 다시실행

## 폴더구조

```
── src
│   ├── assets
│   │    ├── icons
│   │    ├── css
│   ├── components
│   │    ├── Header
│   │    ├── Badge
│   │    ├── Chip
│   │    ├── Card
│   │    ├── Modal
│   │    ├── Button
│   ├── utils
│   ├── index.js
│   └── app.js
└── index.html
```


## 구현계획

### 1. 프로젝트 세팅

- [x] global.css 및 App.js세팅
- [x] icons 세팅

### 2. 레이아웃 UI 구현

- header
    - [ ] layout 설정 및 헤더에는 로고와 활동기록 UI
- column layout
    - [ ] layout 설정 

### 3. 컴포넌트 UI 구현

- Button
    - [ ] 인자값에 따라 크기 다르게 구현
- Badge
    - [ ] 뱃지의 숫자가 2자리수 이상이 되면 +옵션
- chip
    - [ ] chip 컴포넌트 
- 컬럼 title
    - [ ] 제목 및 추가,삭제 버튼  UI
- card
    - 활동기록 card
        - [ ] 사용자 이름, 제목, 시간, 컬럼 이동전, 컬럼이동후  UI
    - todo card
        - [ ] 기본, (수정,추가) , 드래그 , 잔상 을 상태에 따라 구현
- modal
    - [ ] 안내문구 및 삭제 버튼
- 활동기록
    - [ ] 닫기 및 기록 전체 삭제 버튼


### 4. 기능 구현

- card
    - [ ] 카드 리스트
    - [ ] 카드 추가
    - [ ] 카드 수정
    - [ ] 카드 삭제
    - [ ] 카드 드래그 앤 드롭
    - [ ] 카드 정렬
- 히스토리
    - [ ] 히스토리 리스트
    - [ ] 히스토리 전체 삭제
    - [ ] 히스토리 on/off
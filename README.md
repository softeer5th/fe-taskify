# 리드미 수정

## 전체 기능 목록 정리

- [x] 등록 기능 ( 해야할 일, 하고 있는 일, 완료한 일 3가지 컬럼 )
- 버튼 토글 기능
- x 버튼 카드 사라짐 기능
- 카드 생성
  - 제목 라벨
  - 내용라벨
  - 취소 버튼 > 카드 사라짐 기능
  - 등록 버튼 > 제목과 내용에 값이 생기면 버튼 색 활성화
- [ ] **제한 사항**
- 500자 제한, 글자수에 따라 유연하게 박스가 늘거나 줄어듦

- [x] 삭제기능
- 칼럼 타이틀 X 버튼은 아무 반응 없도록
- 카드의 X버튼 클릭 > 카드를 삭제여부 모달 창 생김. - 모달의 삭제 버튼 클릭시, 카드 삭제.
- [x] 수정기능
- 수정 아이콘 클릭 > 취소 와 저장 버튼 보임 (편집 가능해짐) - 취소 클릭 > 수정 이전 상태로 돌아감 - 변경 후 저장 클릭 > 반영된 카드로 바뀜. - 단, 내용 모두 삭제시 > 저장 버튼 비활성화.

- [x] 이동기능 ( drag & drop )
- 같은 칼럼 내에서 위 아래로 드래그앤드롭 가능
- 다른 칼럼 끼리 드래그앤드롭 가능 - 원래 카드가 있던 자리에 잔상 생김 - 이동 경로 절반 이상되면 카드의 잔상이 먼저 이동 - 드래그 중단시, 잔상 사라지며 카드는 원래 위치로 이동.
- [ ] 활동 기록 기능 ( History )
- 등록, 삭제, 변경, 이동 ⇒ 4가지 기능이 사용되었을 때, 활동 변경 기록하여 보여주는 기능.
- history 버튼 누르면 > 왼쪽으로 애니메이션 보이며 생김.
- 최신순으로 표시
  <예시> - title 을 todo 에서 done로 이동 - title을 todo에 등록 - title를 변경 - title를 doing에서 삭제.
- 기록 전체 삭제 기능
  - 버튼 누르면 > 삭제 여부 모달 창 생김
- 닫기 버튼 누르면 > 창이 오른쪽으로 애니메이션으로 숨음.
- [ ] 정렬기능
- 생성순(기본으로 선택됨) > date created oldest
  - 생성순을 누르면 최신순으로 표시가 뜸.
- 최신순( > date created newest)
  - 최신순일 때 누르면 생성순 표시로 뜸.

## 1주차

### 목표

<aside>
💡

- [x] 헤더 영역, 칼럼 영역 레이아웃을 잡는다.
- [x] 카드 등록 기능 구현
- [x] 카드 삭제 기능 구현
- [x] 카드 수정 기능 구현
</aside>

## 2주차

### 목표

<aside>
💡

- [ ] 이동 기능
- [ ] 서버 통신 활용(비동기) + ES class 활용
- [ ] 활동 기록 기능
- [ ] 정렬 기능

위의 기능들 중 애니메이션 기능 구현, css 마무리.

</aside>

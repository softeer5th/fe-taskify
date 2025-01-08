## localStorage Functions (Column, Task)

+ task 추가 - addTask (1 : functionIndex for historyManager)
+ task 삭제 - removeTask (2)
+ task 수정 - editTask (3)
+ task 이동 - moveTask (4)
+ column 추가 - addColumn (5)
+ column 삭제 - removeColumn (6)
+ column 수정 - editColumn (7)
+ 차순위 추가 구현사항 + column 이동? - moveColumn (8)

! 디버깅시 localStorage 에 문자를 주었는지, 숫자를 주었는지 확인 및 column1 인지 1 인지 확인

## historyManager.js

+ 인자 : function 수행 시간, function 종류, task 객체 , edit 한 task 객체 , column 번호, move 한 column 번호
+ 해당되지 않는 인자는 -1 로 전달
export const sortCard = (sortFlag) => {
  const cols = document.querySelectorAll(".column");

  cols.forEach((col) => {
    const colKey = col.getAttribute("data-column-key");
    const tasks = JSON.parse(localStorage.getItem(colKey));

    if (!tasks) return;

    if (sortFlag === "1") {
      tasks.sort((a, b) => b.timestamp - a.timestamp);
      document.querySelector(".sort-btn").setAttribute("card-sort", "0");
      document.querySelector(".asc").textContent = "최신 순";
    } else {
      tasks.sort((a, b) => a.timestamp - b.timestamp);
      document.querySelector(".sort-btn").setAttribute("card-sort", "1");
      document.querySelector(".asc").textContent = "생성 순";
    }

    const taskElements = Array.from(col.querySelectorAll(".task"));

    const initialPositions = taskElements.map((task) =>
      task.getBoundingClientRect()
    );

    tasks.forEach((task, index) => {
      const taskElement = col.querySelector(
        `.task[data-timestamp="${task.timestamp}"]`
      );
      if (taskElement) {
        taskElement.style.order = index + 1;
      }
    });

    // 각 요소의 목표 위치 계산
    const finalPositions = taskElements.map((task) =>
      task.getBoundingClientRect()
    );

    console.log(initialPositions);
    console.log(finalPositions);

    // 애니메이션 적용
    taskElements.forEach((taskElement, index) => {
      const initialPosition = initialPositions[index];
      const finalPosition = finalPositions[index];

      const deltaY = -finalPosition.top + initialPosition.top;
      console.log(deltaY);

      taskElement.style.transition = "none";
      taskElement.style.transform = `translateY(${deltaY}px)`;

      // 리플로우 강제 실행
      taskElement.clientHeight;

      taskElement.style.transition = "transform 0.8s ease";
      taskElement.style.transform = "";
    });

    // 애니메이션 종료 => 실제 DOM 업데이트
    setTimeout(() => {
      taskElements.forEach((taskElement) => {
        taskElement.style.transition = "";
        taskElement.style.transform = "";
      });

      // DOM 순서를 최종 정렬 상태로 유지
      tasks.forEach((task) => {
        const taskElement = col.querySelector(
          `.task[data-timestamp="${task.timestamp}"]`
        );
        if (taskElement) {
          col.appendChild(taskElement);
        }
      });
    }, 800);
  });
};

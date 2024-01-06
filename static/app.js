// --- 메모를 수정하는 함수 ---
async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요.");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    // PUT: 값을 수정하는 메소드
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
}

// --- 메모를 삭제하는 함수 ---
async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

// --- 서버에서 불러온 메모를 html에 추가하는 함수 ---
function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  // -- "수정하기" 버튼 생성하기 --
  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;
  // edit.Btn에 data-id 속성을 memo의 id로 설정

  // --- "삭제하기" 버튼 생성하기 ---
  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제하기";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
}

// --- 메모를 서버에서 받아오는 함수 ---
async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  // jsonRes = [{id:123, content:'블라블라}]
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  // 불러온 이전 메모를 삭제
  jsonRes.forEach(displayMemo);
  // jsonRes 배열의 각각의 요소에 함수 적용
}

// --- 메모를 서버에 게시하는 함수 ---
async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  // submit를 눌러도 새로 실행되지 않게 함
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  // 메모 함수 실행
  input.value = "";
  // input 값을 비워줌
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
readMemo();

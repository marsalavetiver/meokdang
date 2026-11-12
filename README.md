# 먹어도 댕?

"이거 우리 강아지한테 줘도 돼?"에 우리 아이 기준으로 답하는 반려견 음식 판정 웹 (1차 MVP).

- 음식 91종 113개 상태(부위·조리 상태)별 판정: 괜찮아요 / 이렇게 주면 돼요 / 안 주는 게 좋아요 / 절대 안 돼요
- 몸무게 구간(소·중·대)별 하루 최대량, 조리 방법, 근거 출처와 검토일
- 신장·췌장·갑상선 질환을 고르면 해당 음식 판정을 한 단계 낮춰 보여줌
- 로그인 없음: 아이 이름·몸무게·질환은 이 기기(localStorage)에만 저장
- "이미 먹은 게 있어요"는 입력 없이 바로 대처 화면으로

## 구조

정적 사이트라 빌드 과정이 없다. Vercel·GitHub Pages에 그대로 올리면 된다.

| 파일 | 내용 |
| --- | --- |
| `index.html` | 화면 틀 |
| `styles.css` | 디자인 토큰(오렌지 브랜드, TDS 타이포그래피)과 화면 스타일 |
| `app.js` | 화면 9개, 검색, 판정 규칙, 아이 정보 저장 |
| `data/foods.js` | 음식 데이터 (자동 생성) |
| `tools/build_data.py` | 데이터 시트(`tools/datasheet.md`)를 `data/foods.js`로 변환 |

## 데이터 고치기

1. `tools/datasheet.md`의 표를 고친다.
2. `python3 tools/build_data.py tools/datasheet.md`
3. `app.js`의 검토일(`reviewedAt`)은 `build_data.py`에서 바꾼다.

## 로컬에서 보기

```
python3 -m http.server 8000
```

이 서비스는 일반 정보이며 수의사 진료를 대신하지 않는다.

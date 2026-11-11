// tools/build_data.py로 만든 파일이다. 직접 고치지 말고 데이터 시트를 고친 뒤 다시 만든다.
window.MEOKDANG_DATA = {
 "reviewedAt": "2026-11-11",
 "rows": 113,
 "foods": [
  {
   "id": "f001",
   "name": "고구마",
   "aliases": [
    "군고구마",
    "찐고구마",
    "생고구마"
   ],
   "category": "veg",
   "verdict": "mixed",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "no",
     "amount": null,
     "prep": "생으로 주지 않기",
     "caution": "AKC는 생고구마를 절대 주지 말라고 안내, 소화가 어렵고 장폐색 위험",
     "sources": [
      "AKC-고구마"
     ]
    },
    {
     "state": "과육, 찐 것",
     "verdict": "ok",
     "amount": {
      "s": "20g",
      "m": "45g",
      "l": "80g",
      "note": null
     },
     "prep": "껍질 벗겨 푹 찐 뒤 식혀서 잘게",
     "caution": "당이 높아 비만·당뇨견은 양 줄이기",
     "sources": [
      "AKC-고구마"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f002",
   "name": "단호박",
   "aliases": [
    "호박",
    "늙은호박"
   ],
   "category": "veg",
   "verdict": "mixed",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "warn",
     "amount": null,
     "prep": "생으로 주지 않기",
     "caution": "딱딱해 소화가 어려움",
     "sources": [
      "AKC-과채"
     ]
    },
    {
     "state": "과육, 찐 것",
     "verdict": "ok",
     "amount": {
      "s": "40g",
      "m": "100g",
      "l": "170g",
      "note": null
     },
     "prep": "껍질·씨 빼고 쪄서 으깨기",
     "caution": "설사·변비 완화에도 쓰임",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f003",
   "name": "당근",
   "aliases": [],
   "category": "veg",
   "verdict": "ok",
   "states": [
    {
     "state": "뿌리, 생",
     "verdict": "ok",
     "amount": {
      "s": "40g",
      "m": "100g",
      "l": "170g",
      "note": null
     },
     "prep": "한입 크기로 썰기, 익혀도 됨",
     "caution": "큰 조각은 질식 위험",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f004",
   "name": "브로콜리",
   "aliases": [],
   "category": "veg",
   "verdict": "cond",
   "states": [
    {
     "state": "꽃·줄기, 데친 것",
     "verdict": "cond",
     "amount": {
      "s": "20g",
      "m": "50g",
      "l": "80g",
      "note": null
     },
     "prep": "송이만 데쳐서 잘게",
     "caution": "많이 먹으면 위 자극, 굵은 줄기는 식도에 걸릴 수 있음",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f005",
   "name": "양배추",
   "aliases": [],
   "category": "veg",
   "verdict": "cond",
   "states": [
    {
     "state": "잎, 생 / 데친 것",
     "verdict": "cond",
     "amount": {
      "s": "20g",
      "m": "50g",
      "l": "80g",
      "note": null
     },
     "prep": "데쳐서 잘게",
     "caution": "가스·묽은 변 유발 가능",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f006",
   "name": "배추",
   "aliases": [],
   "category": "veg",
   "verdict": "cond",
   "states": [
    {
     "state": "잎, 생 / 데친 것",
     "verdict": "cond",
     "amount": {
      "s": "20g",
      "m": "50g",
      "l": "80g",
      "note": null
     },
     "prep": "데쳐서 잘게",
     "caution": "김치·겉절이는 양념 때문에 금지",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f007",
   "name": "오이",
   "aliases": [],
   "category": "veg",
   "verdict": "ok",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "ok",
     "amount": {
      "s": "50g",
      "m": "120g",
      "l": "200g",
      "note": null
     },
     "prep": "껍질째 한입 크기로",
     "caution": "칼로리가 낮아 비만견 간식으로 좋음",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f008",
   "name": "감자",
   "aliases": [
    "찐감자",
    "생감자"
   ],
   "category": "veg",
   "verdict": "mixed",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "솔라닌 함유, 생으로 주지 않기",
     "sources": [
      "AKC-감자"
     ]
    },
    {
     "state": "과육, 찐 것",
     "verdict": "cond",
     "amount": {
      "s": "20g",
      "m": "50g",
      "l": "90g",
      "note": null
     },
     "prep": "껍질 벗겨 무염으로 찌기",
     "caution": "싹·초록 부분 완전히 제거",
     "sources": [
      "AKC-감자"
     ]
    },
    {
     "state": "싹·초록 껍질",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "솔라닌 중독 위험, 많이 먹었으면 동물병원",
     "sources": [
      "AKC-감자"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f009",
   "name": "토마토",
   "aliases": [
    "방울토마토"
   ],
   "category": "veg",
   "verdict": "mixed",
   "states": [
    {
     "state": "잘 익은 과육, 생",
     "verdict": "cond",
     "amount": {
      "s": "10g",
      "m": "25g",
      "l": "40g",
      "note": null
     },
     "prep": "빨갛게 익은 과육만",
     "caution": "AKC는 안전하게 아예 피하길 권장",
     "sources": [
      "AKC-과채"
     ]
    },
    {
     "state": "덜 익은 것·줄기·잎",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "초록 부분에 솔라닌, 텃밭 접근 막기",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f010",
   "name": "옥수수",
   "aliases": [
    "팝콘",
    "옥수수심"
   ],
   "category": "veg",
   "verdict": "mixed",
   "states": [
    {
     "state": "알, 익힘",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "40g",
      "l": "70g",
      "note": null
     },
     "prep": "버터·소금 없이 알만",
     "caution": "팝콘은 무염·무버터만",
     "sources": [
      "AKC-음식"
     ]
    },
    {
     "state": "심",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "삼키면 장폐색, 즉시 동물병원",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f011",
   "name": "버섯",
   "aliases": [],
   "category": "veg",
   "verdict": "mixed",
   "states": [
    {
     "state": "마트 식용 버섯, 익힘",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "40g",
      "l": "70g",
      "note": null
     },
     "prep": "씻어서 양념 없이 익히기",
     "caution": "양파·마늘 들어간 버섯 요리는 금지",
     "sources": [
      "AKC-과채"
     ]
    },
    {
     "state": "야생 버섯",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "독버섯 구분 불가, 먹었으면 즉시 동물병원",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f012",
   "name": "양파",
   "aliases": [],
   "category": "veg",
   "verdict": "no",
   "states": [
    {
     "state": "생 / 익힘",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "적혈구 파괴로 빈혈, 익혀도·가루도 위험, 증상이 늦게 나타나 먹었으면 바로 병원",
     "sources": [
      "AKC-음식",
      "ASPCA"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f013",
   "name": "마늘",
   "aliases": [],
   "category": "veg",
   "verdict": "no",
   "states": [
    {
     "state": "생 / 익힘",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "양파보다 3~5배 독성, 마늘빵·양념도 포함",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f014",
   "name": "대파",
   "aliases": [
    "파",
    "쪽파"
   ],
   "category": "veg",
   "verdict": "no",
   "states": [
    {
     "state": "생 / 익힘",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "양파와 같은 파속 식물, 국물에 우러난 것도 주의",
     "sources": [
      "AKC-음식",
      "ASPCA"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f015",
   "name": "부추",
   "aliases": [],
   "category": "veg",
   "verdict": "no",
   "states": [
    {
     "state": "생 / 익힘",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "양파와 같은 파속 식물",
     "sources": [
      "AKC-음식",
      "ASPCA"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f016",
   "name": "아보카도",
   "aliases": [],
   "category": "veg",
   "verdict": "warn",
   "states": [
    {
     "state": "과육 / 씨·껍질",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "과육 한 입은 대개 괜찮지만 지방이 많음, 씨는 장폐색 위험이라 삼켰으면 병원",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f017",
   "name": "수박",
   "aliases": [],
   "category": "fruit",
   "verdict": "mixed",
   "states": [
    {
     "state": "과육 (씨 제거), 생",
     "verdict": "ok",
     "amount": {
      "s": "55g",
      "m": "130g",
      "l": "230g",
      "note": null
     },
     "prep": "씨·껍질 빼고 깍둑썰기, 얼려도 됨",
     "caution": "수분이 92%라 여름 간식으로 좋음",
     "sources": [
      "AKC-과채"
     ]
    },
    {
     "state": "껍질",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "씨와 껍질은 장폐색 위험",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f018",
   "name": "사과",
   "aliases": [],
   "category": "fruit",
   "verdict": "mixed",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "ok",
     "amount": {
      "s": "30g",
      "m": "75g",
      "l": "130g",
      "note": null
     },
     "prep": "씨·심 빼고 얇게",
     "caution": "지방이 적어 노령견 간식으로 좋음",
     "sources": [
      "AKC-과채"
     ]
    },
    {
     "state": "씨·심",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "씨에 미량 시안화물, 심은 질식 위험",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f019",
   "name": "바나나",
   "aliases": [],
   "category": "fruit",
   "verdict": "cond",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "cond",
     "amount": {
      "s": "20g",
      "m": "45g",
      "l": "80g",
      "note": null
     },
     "prep": "껍질 벗겨 동그랗게",
     "caution": "당이 높아 가끔만",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f020",
   "name": "블루베리",
   "aliases": [],
   "category": "fruit",
   "verdict": "ok",
   "states": [
    {
     "state": "전체, 생",
     "verdict": "ok",
     "amount": {
      "s": "30g",
      "m": "70g",
      "l": "120g",
      "note": null
     },
     "prep": "씻어서 그대로, 소형견은 반으로",
     "caution": "훈련 간식으로 좋음",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f021",
   "name": "딸기",
   "aliases": [],
   "category": "fruit",
   "verdict": "ok",
   "states": [
    {
     "state": "전체, 생",
     "verdict": "ok",
     "amount": {
      "s": "50g",
      "m": "120g",
      "l": "220g",
      "note": null
     },
     "prep": "꼭지 떼고 잘라서",
     "caution": "천연 당이 있어 적당히",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f022",
   "name": "귤",
   "aliases": [
    "감귤",
    "밀감",
    "한라봉",
    "오렌지"
   ],
   "category": "fruit",
   "verdict": "cond",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "cond",
     "amount": {
      "s": "30g",
      "m": "80g",
      "l": "150g",
      "note": null
     },
     "prep": "껍질·씨 빼고 과육만",
     "caution": "껍질이나 많은 양은 배탈",
     "sources": [
      "AKC-과채",
      "ASPCA"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f023",
   "name": "키위",
   "aliases": [],
   "category": "fruit",
   "verdict": "cond",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "cond",
     "amount": {
      "s": "25g",
      "m": "65g",
      "l": "115g",
      "note": null
     },
     "prep": "껍질 벗겨 잘게",
     "caution": "처음엔 소량으로 반응 확인",
     "sources": [
      "AKC-키위"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f024",
   "name": "참외",
   "aliases": [],
   "category": "fruit",
   "verdict": "cond",
   "states": [
    {
     "state": "과육 / 씨, 생",
     "verdict": "cond",
     "amount": {
      "s": "55g",
      "m": "130g",
      "l": "225g",
      "note": null
     },
     "prep": "씨·껍질 빼고 과육만",
     "caution": "당이 높아 당뇨견 주의",
     "sources": [
      "AKC-과채 (멜론류 기준)"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f025",
   "name": "멜론",
   "aliases": [],
   "category": "fruit",
   "verdict": "cond",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "cond",
     "amount": {
      "s": "50g",
      "m": "120g",
      "l": "200g",
      "note": null
     },
     "prep": "씨·껍질 빼고 깍둑썰기",
     "caution": "당이 높아 비만·당뇨견은 피하기",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f026",
   "name": "파인애플",
   "aliases": [],
   "category": "fruit",
   "verdict": "ok",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "ok",
     "amount": {
      "s": "35g",
      "m": "80g",
      "l": "140g",
      "note": null
     },
     "prep": "껍질·심·꼭지 제거, 생과만",
     "caution": "시럽 통조림 금지",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f027",
   "name": "배",
   "aliases": [],
   "category": "fruit",
   "verdict": "ok",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "ok",
     "amount": {
      "s": "30g",
      "m": "70g",
      "l": "120g",
      "note": null
     },
     "prep": "씨·심 빼고 한입 크기",
     "caution": "씨에 미량 시안화물, 통조림 금지",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f028",
   "name": "레몬·자몽",
   "aliases": [
    "레몬",
    "자몽"
   ],
   "category": "fruit",
   "verdict": "warn",
   "states": [
    {
     "state": "과육 / 껍질, 생",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "산과 껍질 정유 성분으로 배탈, 과육 조금은 큰 문제 없음",
     "sources": [
      "ASPCA"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f029",
   "name": "복숭아",
   "aliases": [],
   "category": "fruit",
   "verdict": "mixed",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "ok",
     "amount": {
      "s": "45g",
      "m": "100g",
      "l": "180g",
      "note": null
     },
     "prep": "씨에서 과육을 완전히 떼어 잘게",
     "caution": "통조림 금지",
     "sources": [
      "AKC-과채"
     ]
    },
    {
     "state": "씨",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "시안화물 함유에 장폐색 위험, 삼켰으면 병원",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f030",
   "name": "체리",
   "aliases": [],
   "category": "fruit",
   "verdict": "mixed",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "과육 자체는 괜찮지만 씨 분리가 어려워 권장 안 함",
     "sources": [
      "AKC-과채"
     ]
    },
    {
     "state": "씨·줄기",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "시안화물, 동공 확장·호흡 곤란·붉은 잇몸이면 응급",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f031",
   "name": "망고",
   "aliases": [],
   "category": "fruit",
   "verdict": "mixed",
   "states": [
    {
     "state": "과육, 생",
     "verdict": "cond",
     "amount": {
      "s": "30g",
      "m": "65g",
      "l": "115g",
      "note": null
     },
     "prep": "씨·껍질 빼고 잘게",
     "caution": "당이 높아 가끔만",
     "sources": [
      "AKC-과채"
     ]
    },
    {
     "state": "씨·껍질",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "씨는 질식·시안화물, 껍질은 소화 어려움",
     "sources": [
      "AKC-과채"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f032",
   "name": "감",
   "aliases": [
    "홍시",
    "단감",
    "곶감"
   ],
   "category": "fruit",
   "verdict": "cond",
   "states": [
    {
     "state": "과육 / 씨, 생 / 곶감",
     "verdict": "cond",
     "amount": {
      "s": "25g",
      "m": "55g",
      "l": "100g",
      "note": "생감"
     },
     "prep": "껍질·씨·꼭지 빼고 생감 과육만",
     "caution": "씨는 장폐색, 곶감은 당이 높아 아주 조금만",
     "sources": [
      "Kinship-감"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f033",
   "name": "포도",
   "aliases": [
    "청포도",
    "거봉",
    "적포도"
   ],
   "category": "fruit",
   "verdict": "no",
   "states": [
    {
     "state": "전체, 생",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "1~2알로도 급성 신부전 가능, 증상이 없어도 바로 병원",
     "sources": [
      "AKC-과채",
      "PPH"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f034",
   "name": "건포도",
   "aliases": [],
   "category": "fruit",
   "verdict": "no",
   "states": [
    {
     "state": "전체, 건조",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "포도와 같음, 시리얼·쿠키·빵 속 건포도도 포함",
     "sources": [
      "PPH",
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f035",
   "name": "샤인머스캣",
   "aliases": [
    "샤인머스켓",
    "샤인"
   ],
   "category": "fruit",
   "verdict": "no",
   "states": [
    {
     "state": "전체, 생",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "포도 품종이라 같은 위험, 씨가 없어도 해당",
     "sources": [
      "AKC-음식 (포도 기준)"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f036",
   "name": "닭가슴살",
   "aliases": [
    "닭고기",
    "닭",
    "삶은닭"
   ],
   "category": "meat",
   "verdict": "mixed",
   "states": [
    {
     "state": "살코기, 익힘",
     "verdict": "ok",
     "amount": {
      "s": "10g",
      "m": "25g",
      "l": "40g",
      "note": null
     },
     "prep": "껍질·뼈 없이 무염으로 삶기",
     "caution": "지방이 적은 대표 단백질",
     "sources": [
      "AKC-음식"
     ]
    },
    {
     "state": "살코기, 생",
     "verdict": "warn",
     "amount": null,
     "prep": "익혀서 주기",
     "caution": "살모넬라·대장균 위험",
     "sources": [
      "ASPCA"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": false
  },
  {
   "id": "f037",
   "name": "닭발",
   "aliases": [],
   "category": "meat",
   "verdict": "warn",
   "states": [
    {
     "state": "뼈 포함, 건조 / 익힘",
     "verdict": "warn",
     "amount": null,
     "prep": "반려견 전용 건조 제품만, 먹는 동안 지켜보기",
     "caution": "집에서 익힌 닭발은 뼈가 쪼개질 수 있음",
     "sources": [
      "ASPCA",
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f038",
   "name": "소고기",
   "aliases": [
    "쇠고기",
    "소",
    "우둔살",
    "차돌박이",
    "한우"
   ],
   "category": "meat",
   "verdict": "mixed",
   "states": [
    {
     "state": "우둔살, 익힘",
     "verdict": "ok",
     "amount": {
      "s": "10g",
      "m": "25g",
      "l": "40g",
      "note": null
     },
     "prep": "기름 떼고 무염으로 삶거나 굽기",
     "caution": "완전히 익히기",
     "sources": [
      "AKC-음식 (살코기 기준)"
     ]
    },
    {
     "state": "차돌박이, 익힘",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "지방이 많아 구토·설사, 췌장염 위험",
     "sources": [
      "ASPCA",
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f039",
   "name": "돼지고기",
   "aliases": [
    "돼지",
    "앞다리살",
    "삼겹살",
    "목살"
   ],
   "category": "meat",
   "verdict": "mixed",
   "states": [
    {
     "state": "앞다리살, 익힘",
     "verdict": "cond",
     "amount": {
      "s": "8g",
      "m": "20g",
      "l": "35g",
      "note": null
     },
     "prep": "비계 떼고 완전히 익히기, 뼈 제거",
     "caution": "덜 익힌 돼지고기 금지",
     "sources": [
      "AKC-음식"
     ]
    },
    {
     "state": "삼겹살, 익힘",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "지방이 많아 췌장염 위험",
     "sources": [
      "AKC-음식"
     ]
    },
    {
     "state": "살코기, 생",
     "verdict": "warn",
     "amount": null,
     "prep": "완전히 익혀서만",
     "caution": "생고기 세균 위험",
     "sources": [
      "ASPCA"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f040",
   "name": "오리고기",
   "aliases": [
    "오리"
   ],
   "category": "meat",
   "verdict": "cond",
   "states": [
    {
     "state": "살코기, 익힘",
     "verdict": "cond",
     "amount": {
      "s": "8g",
      "m": "20g",
      "l": "35g",
      "note": null
     },
     "prep": "껍질·기름·뼈 빼고 익히기",
     "caution": "껍질은 소량도 금지(췌장염 예방)",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": true
  },
  {
   "id": "f041",
   "name": "닭뼈",
   "aliases": [
    "치킨뼈",
    "닭다리뼈"
   ],
   "category": "meat",
   "verdict": "no",
   "states": [
    {
     "state": "뼈, 익힘",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "쪼개져 입·장을 다치게 함, 삼켰으면 병원에 연락",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f042",
   "name": "햄·소시지",
   "aliases": [
    "햄",
    "소시지",
    "스팸",
    "베이컨"
   ],
   "category": "meat",
   "verdict": "no",
   "states": [
    {
     "state": "가공육",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "지방·나트륨이 많고 양파·마늘이 든 제품도 있음",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f043",
   "name": "족발",
   "aliases": [],
   "category": "meat",
   "verdict": "no",
   "states": [
    {
     "state": "살·껍질, 양념 조리",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "양념·소금·지방이 많음",
     "sources": [
      "확인 필요"
     ]
    },
    {
     "state": "뼈, 익힘",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "익힌 돼지뼈는 쪼개져 위험",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": true
  },
  {
   "id": "f044",
   "name": "보쌈",
   "aliases": [
    "수육"
   ],
   "category": "meat",
   "verdict": "cond",
   "states": [
    {
     "state": "수육 살코기 / 비계, 삶은 것",
     "verdict": "cond",
     "amount": {
      "s": "8g",
      "m": "20g",
      "l": "35g",
      "note": "살코기"
     },
     "prep": "양념 없이 삶은 살코기만, 비계 떼기",
     "caution": "된장·마늘 넣고 삶은 고기는 피하기, 비계는 소량도 금지(췌장염 예방)",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": true
  },
  {
   "id": "f045",
   "name": "도가니",
   "aliases": [],
   "category": "meat",
   "verdict": "no",
   "states": [
    {
     "state": "연골·힘줄, 삶은 것",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "지방·콜라겐이 많고 도가니탕은 소금이 많음",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": true
  },
  {
   "id": "f046",
   "name": "순대",
   "aliases": [],
   "category": "meat",
   "verdict": "warn",
   "states": [
    {
     "state": "당면·선지 속, 찐 것",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "간이 되어 있고 제품에 따라 파·마늘이 들어감",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": true
  },
  {
   "id": "f047",
   "name": "돼지 간",
   "aliases": [
    "간",
    "순대간"
   ],
   "category": "meat",
   "verdict": "cond",
   "states": [
    {
     "state": "순대 내장, 삶은 것",
     "verdict": "cond",
     "amount": {
      "s": "5g",
      "m": "12g",
      "l": "20g",
      "note": "주 1~2회"
     },
     "prep": "양념·소금 없이 완전히 익히기",
     "caution": "비타민 A가 많아 자주 주면 과잉",
     "sources": [
      "Kinship-간"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": false
  },
  {
   "id": "f048",
   "name": "허파",
   "aliases": [],
   "category": "meat",
   "verdict": "cond",
   "states": [
    {
     "state": "순대 내장, 삶은 것",
     "verdict": "cond",
     "amount": {
      "s": "10g",
      "m": "25g",
      "l": "40g",
      "note": null
     },
     "prep": "양념 없이 잘게",
     "caution": "순대집 내장은 소금 찍기 전 것만",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": true
  },
  {
   "id": "f049",
   "name": "염통",
   "aliases": [],
   "category": "meat",
   "verdict": "cond",
   "states": [
    {
     "state": "순대 내장, 삶은 것",
     "verdict": "cond",
     "amount": {
      "s": "13g",
      "m": "30g",
      "l": "55g",
      "note": null
     },
     "prep": "양념 없이 잘게",
     "caution": "근육 부위라 단백질이 많음",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": true
  },
  {
   "id": "f050",
   "name": "오소리감투(위)",
   "aliases": [
    "오소리감투",
    "위"
   ],
   "category": "meat",
   "verdict": "cond",
   "states": [
    {
     "state": "순대 내장, 삶은 것",
     "verdict": "cond",
     "amount": {
      "s": "10g",
      "m": "25g",
      "l": "40g",
      "note": null
     },
     "prep": "양념 없이 아주 잘게",
     "caution": "질겨서 통째로 삼키면 걸릴 수 있음",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": true
  },
  {
   "id": "f051",
   "name": "연어",
   "aliases": [
    "연어구이"
   ],
   "category": "sea",
   "verdict": "ok",
   "states": [
    {
     "state": "살, 익힘",
     "verdict": "ok",
     "amount": {
      "s": "8g",
      "m": "20g",
      "l": "35g",
      "note": null
     },
     "prep": "뼈 빼고 무염으로 찌거나 굽기",
     "caution": "훈제연어는 소금이 많아 금지",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": false
  },
  {
   "id": "f052",
   "name": "연어회",
   "aliases": [
    "연어",
    "회"
   ],
   "category": "sea",
   "verdict": "no",
   "states": [
    {
     "state": "살, 생",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "기생충·세균으로 심하면 사망까지, 반드시 익혀서",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f053",
   "name": "광어회",
   "aliases": [
    "광어",
    "회"
   ],
   "category": "sea",
   "verdict": "warn",
   "states": [
    {
     "state": "살, 생",
     "verdict": "warn",
     "amount": null,
     "prep": "익혀서 주기",
     "caution": "생선은 완전히 익혀야 기생충·세균 위험이 줄어듦",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": false
  },
  {
   "id": "f054",
   "name": "방어회",
   "aliases": [
    "방어",
    "회"
   ],
   "category": "sea",
   "verdict": "no",
   "states": [
    {
     "state": "살, 생",
     "verdict": "no",
     "amount": null,
     "prep": "익혀서 주기",
     "caution": "생선 위험에 지방까지 많음",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f055",
   "name": "고등어",
   "aliases": [
    "자반고등어",
    "고등어구이"
   ],
   "category": "sea",
   "verdict": "cond",
   "states": [
    {
     "state": "살, 익힘",
     "verdict": "cond",
     "amount": {
      "s": "6g",
      "m": "15g",
      "l": "25g",
      "note": null
     },
     "prep": "뼈 완전히 빼고 무염으로 굽거나 찌기",
     "caution": "자반고등어는 소금 때문에 금지, 기름져 소량만",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f056",
   "name": "황태",
   "aliases": [
    "황태채",
    "명태"
   ],
   "category": "sea",
   "verdict": "cond",
   "states": [
    {
     "state": "무염 황태채, 건조",
     "verdict": "cond",
     "amount": {
      "s": "5g",
      "m": "12g",
      "l": "20g",
      "note": null
     },
     "prep": "찬물에 6시간쯤 불려 짠기를 빼고, 익혀서 잘게",
     "caution": "지방이 적고 단백질이 많아 간식으로 많이 쓰임, 남은 가시 확인, 반려견 전용 간식은 무염인지 확인",
     "sources": [
      "코메디닷컴"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": false
  },
  {
   "id": "f057",
   "name": "북어",
   "aliases": [
    "북어채",
    "명태"
   ],
   "category": "sea",
   "verdict": "cond",
   "states": [
    {
     "state": "무염 북어채, 건조",
     "verdict": "cond",
     "amount": {
      "s": "5g",
      "m": "12g",
      "l": "20g",
      "note": null
     },
     "prep": "황태와 같이 찬물에 불려 짠기를 빼고, 익혀서 잘게",
     "caution": "황태와 같은 명태를 다른 방식으로 말린 것이라 기준도 같음, 남은 가시 확인",
     "sources": [
      "코메디닷컴 (황태 기준)",
      "KFSI 웹진 (명태 가공)"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": false
  },
  {
   "id": "f058",
   "name": "북어·황태 (조미)",
   "aliases": [
    "조미황태",
    "조미북어",
    "양념황태"
   ],
   "category": "sea",
   "verdict": "no",
   "states": [
    {
     "state": "양념·조미된 북어채·황태채",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "설탕·소금·조미료가 발라져 있어 불려도 양념이 남음, 무염 제품과 구분",
     "sources": [
      "ASPCA (소금)",
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f059",
   "name": "새우",
   "aliases": [
    "새우튀김"
   ],
   "category": "sea",
   "verdict": "mixed",
   "states": [
    {
     "state": "살 (껍질 제거), 익힘",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "40g",
      "l": "70g",
      "note": null
     },
     "prep": "껍질·머리·다리·꼬리 빼고 익히기",
     "caution": "튀김·버터·마늘 새우 금지",
     "sources": [
      "AKC-음식"
     ]
    },
    {
     "state": "껍질 포함, 생",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "생은 세균, 껍질은 소화가 안 됨",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": false
  },
  {
   "id": "f060",
   "name": "멸치",
   "aliases": [
    "잔멸치",
    "멸치볶음"
   ],
   "category": "sea",
   "verdict": "cond",
   "states": [
    {
     "state": "무염 / 일반, 건조",
     "verdict": "cond",
     "amount": {
      "s": "5g",
      "m": "12g",
      "l": "20g",
      "note": "무염"
     },
     "prep": "무염 멸치만, 물에 한 번 헹구기",
     "caution": "볶음·국물용 일반 멸치는 소금이 많음",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": true
  },
  {
   "id": "f061",
   "name": "김",
   "aliases": [
    "맨김",
    "무조미김",
    "구운김"
   ],
   "category": "sea",
   "verdict": "cond",
   "states": [
    {
     "state": "무조미김 (맨김), 건조",
     "verdict": "cond",
     "amount": {
      "s": "반 장",
      "m": "1장",
      "l": "2장",
      "note": null
     },
     "prep": "아무것도 바르지 않은 맨김만 잘게",
     "caution": "요오드가 많아 자주 주지 않기, 갑상선 질환견은 피하기",
     "sources": [
      "AKC-해조류"
     ]
    }
   ],
   "flags": [
    "kidney",
    "thyroid"
   ],
   "needsCheck": false
  },
  {
   "id": "f062",
   "name": "조미김",
   "aliases": [
    "도시락김",
    "김",
    "재래김"
   ],
   "category": "sea",
   "verdict": "no",
   "states": [
    {
     "state": "기름·소금 바른 김 (도시락김 등)",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "소금과 기름이 발라져 있어 소량도 주지 않기, 맨김과 헷갈리지 않게 포장 확인",
     "sources": [
      "AKC-해조류 (무염·무마늘만 허용)",
      "ASPCA (소금)"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f063",
   "name": "미역",
   "aliases": [],
   "category": "sea",
   "verdict": "cond",
   "states": [
    {
     "state": "불린 것",
     "verdict": "cond",
     "amount": {
      "s": "10g",
      "m": "20g",
      "l": "40g",
      "note": null
     },
     "prep": "불려서 잘게, 무염",
     "caution": "요오드가 많아 자주 주지 않기, 갑상선 질환견은 피하기, 마른 미역은 위에서 불어남",
     "sources": [
      "AKC-해조류",
      "코메디닷컴"
     ]
    }
   ],
   "flags": [
    "thyroid"
   ],
   "needsCheck": false
  },
  {
   "id": "f064",
   "name": "달걀",
   "aliases": [
    "계란",
    "삶은계란",
    "삶은달걀",
    "노른자",
    "흰자"
   ],
   "category": "dairy",
   "verdict": "mixed",
   "states": [
    {
     "state": "노른자, 익힘",
     "verdict": "ok",
     "amount": {
      "s": "1/3개",
      "m": "2/3개",
      "l": "1개",
      "note": null
     },
     "prep": "완전히 익히기",
     "caution": "지방이 많아 비만견은 양 줄이기",
     "sources": [
      "AKC-음식"
     ]
    },
    {
     "state": "흰자, 생",
     "verdict": "warn",
     "amount": null,
     "prep": "익혀서 주기",
     "caution": "생흰자만 먹으면 비오틴 결핍",
     "sources": [
      "AKC-음식",
      "ASPCA"
     ]
    },
    {
     "state": "전체, 삶은 것",
     "verdict": "ok",
     "amount": {
      "s": "1/4개",
      "m": "1/2개",
      "l": "1개",
      "note": null
     },
     "prep": "소금·버터 없이 완숙",
     "caution": null,
     "sources": [
      "AKC-음식"
     ]
    },
    {
     "state": "전체, 생",
     "verdict": "warn",
     "amount": null,
     "prep": "익혀서 주기",
     "caution": "살모넬라 위험",
     "sources": [
      "ASPCA"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f065",
   "name": "메추리알",
   "aliases": [
    "메추리알장조림",
    "장조림"
   ],
   "category": "dairy",
   "verdict": "mixed",
   "states": [
    {
     "state": "껍질 깐 것, 삶은 것",
     "verdict": "ok",
     "amount": {
      "s": "1개",
      "m": "3개",
      "l": "5개",
      "note": null
     },
     "prep": "완숙, 소형견은 반으로",
     "caution": "통째로 삼키면 걸릴 수 있음",
     "sources": [
      "확인 필요 (달걀 기준 AKC)"
     ]
    },
    {
     "state": "장조림",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "간장 양념으로 나트륨이 많음",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": true
  },
  {
   "id": "f066",
   "name": "우유",
   "aliases": [
    "락토프리우유"
   ],
   "category": "dairy",
   "verdict": "warn",
   "states": [
    {
     "state": "일반 우유",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "유당을 잘 분해하지 못해 설사",
     "sources": [
      "ASPCA",
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f067",
   "name": "치즈",
   "aliases": [
    "슬라이스치즈",
    "코티지치즈"
   ],
   "category": "dairy",
   "verdict": "cond",
   "states": [
    {
     "state": "슬라이스 / 무염",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "40g",
      "l": "70g",
      "note": "무염 코티지"
     },
     "prep": "저지방·무염 치즈만 작게",
     "caution": "슬라이스 치즈는 짜서 주의, 설사하면 중단",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f068",
   "name": "요거트",
   "aliases": [
    "요구르트",
    "플레인요거트"
   ],
   "category": "dairy",
   "verdict": "cond",
   "states": [
    {
     "state": "무가당 / 가당",
     "verdict": "cond",
     "amount": {
      "s": "30g",
      "m": "65g",
      "l": "115g",
      "note": "무가당 플레인"
     },
     "prep": "무가당 플레인만",
     "caution": "가당·초코·자일리톨이 든 제품 금지",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f069",
   "name": "흰쌀밥",
   "aliases": [
    "밥",
    "쌀밥",
    "쌀"
   ],
   "category": "grain",
   "verdict": "ok",
   "states": [
    {
     "state": "익힘",
     "verdict": "ok",
     "amount": {
      "s": "13g",
      "m": "30g",
      "l": "55g",
      "note": null
     },
     "prep": "무염으로 무르게",
     "caution": "탄수화물이라 사료 양과 같이 조절",
     "sources": [
      "AKC-쌀"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f070",
   "name": "현미밥",
   "aliases": [
    "현미"
   ],
   "category": "grain",
   "verdict": "cond",
   "states": [
    {
     "state": "익힘",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "35g",
      "l": "60g",
      "note": null
     },
     "prep": "푹 무르게 익히기",
     "caution": "섬유가 많아 소화가 느림",
     "sources": [
      "AKC-쌀"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f071",
   "name": "보리밥",
   "aliases": [
    "보리"
   ],
   "category": "grain",
   "verdict": "cond",
   "states": [
    {
     "state": "익힘",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "30g",
      "l": "55g",
      "note": null
     },
     "prep": "푹 익히기",
     "caution": "처음엔 소량으로 변 상태 확인",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f072",
   "name": "귀리밥",
   "aliases": [
    "귀리",
    "오트밀"
   ],
   "category": "grain",
   "verdict": "cond",
   "states": [
    {
     "state": "익힘",
     "verdict": "cond",
     "amount": {
      "s": "8g",
      "m": "25g",
      "l": "50g",
      "note": null
     },
     "prep": "물로만 끓인 플레인 오트밀, 식혀서",
     "caution": "가향·인스턴트 오트밀 금지, 섬유가 많아 과하면 설사",
     "sources": [
      "AKC-오트밀"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f073",
   "name": "흑미밥",
   "aliases": [
    "흑미"
   ],
   "category": "grain",
   "verdict": "cond",
   "states": [
    {
     "state": "익힘",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "30g",
      "l": "55g",
      "note": null
     },
     "prep": "푹 익히기",
     "caution": "처음엔 소량",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f074",
   "name": "콩밥",
   "aliases": [
    "콩",
    "서리태",
    "완두콩"
   ],
   "category": "grain",
   "verdict": "cond",
   "states": [
    {
     "state": "서리태·완두 등, 익힘",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "30g",
      "l": "55g",
      "note": null
     },
     "prep": "콩까지 푹 익히기",
     "caution": "콩은 가스 유발, 생콩 금지",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f075",
   "name": "팥밥·수수밥",
   "aliases": [
    "팥",
    "수수",
    "팥밥",
    "수수밥"
   ],
   "category": "grain",
   "verdict": "cond",
   "states": [
    {
     "state": "익힘",
     "verdict": "cond",
     "amount": {
      "s": "15g",
      "m": "30g",
      "l": "55g",
      "note": null
     },
     "prep": "무가당으로 푹 익히기",
     "caution": "설탕 넣은 단팥은 금지",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f076",
   "name": "식빵",
   "aliases": [
    "빵"
   ],
   "category": "grain",
   "verdict": "cond",
   "states": [
    {
     "state": "흰 식빵 / 통밀 식빵",
     "verdict": "cond",
     "amount": {
      "s": "6g",
      "m": "15g",
      "l": "25g",
      "note": null
     },
     "prep": "아무것도 바르지 않은 것 조금",
     "caution": "영양 이점이 없고 칼로리가 높음",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney"
   ],
   "needsCheck": false
  },
  {
   "id": "f077",
   "name": "바게트·모닝빵",
   "aliases": [
    "바게트",
    "모닝빵",
    "빵"
   ],
   "category": "grain",
   "verdict": "cond",
   "states": [
    {
     "state": "전체",
     "verdict": "cond",
     "amount": {
      "s": "6g",
      "m": "15g",
      "l": "25g",
      "note": "바게트"
     },
     "prep": "플레인만 조금",
     "caution": "모닝빵은 버터·설탕이 많아 주의",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "kidney",
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f078",
   "name": "단팥빵·크림빵",
   "aliases": [
    "단팥빵",
    "크림빵",
    "빵"
   ],
   "category": "grain",
   "verdict": "warn",
   "states": [
    {
     "state": "속 포함",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "설탕·지방이 많음",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": true
  },
  {
   "id": "f079",
   "name": "건포도빵",
   "aliases": [
    "빵"
   ],
   "category": "grain",
   "verdict": "no",
   "states": [
    {
     "state": "전체",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "건포도 독성, 먹었으면 바로 병원",
     "sources": [
      "AKC-음식",
      "PPH"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f080",
   "name": "마늘빵",
   "aliases": [
    "빵"
   ],
   "category": "grain",
   "verdict": "no",
   "states": [
    {
     "state": "전체",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "마늘 독성",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f081",
   "name": "초코빵·생지 반죽",
   "aliases": [
    "초코빵",
    "생지",
    "빵반죽",
    "빵"
   ],
   "category": "grain",
   "verdict": "no",
   "states": [
    {
     "state": "전체 / 생반죽",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "초콜릿 독성, 생반죽은 위에서 부풀고 알코올이 생겨 바로 병원",
     "sources": [
      "ASPCA",
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f082",
   "name": "두부",
   "aliases": [],
   "category": "etc",
   "verdict": "cond",
   "states": [
    {
     "state": "생 / 데친 것",
     "verdict": "cond",
     "amount": {
      "s": "20g",
      "m": "50g",
      "l": "90g",
      "note": null
     },
     "prep": "데쳐서 무염으로 잘게",
     "caution": "콩 알레르기가 있으면 피하기",
     "sources": [
      "AKC-두부"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f083",
   "name": "떡",
   "aliases": [
    "꿀떡",
    "인절미",
    "가래떡",
    "떡국떡",
    "떡볶이"
   ],
   "category": "etc",
   "verdict": "no",
   "states": [
    {
     "state": "전체",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "끈적여 목·장에 걸릴 위험, 꿀떡·인절미는 당까지. 소량도 주지 않고, 목에 걸려 숨쉬기 힘들어하면 즉시 병원",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f084",
   "name": "꿀",
   "aliases": [],
   "category": "etc",
   "verdict": "cond",
   "states": [
    {
     "state": "전체",
     "verdict": "cond",
     "amount": {
      "s": "1/2티스푼",
      "m": "1티스푼",
      "l": "2티스푼",
      "note": null
     },
     "prep": "가끔만",
     "caution": "대부분 당이라 자주 주지 않기",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f085",
   "name": "고구마 말랭이",
   "aliases": [
    "고구마말랭이",
    "말랭이"
   ],
   "category": "etc",
   "verdict": "cond",
   "states": [
    {
     "state": "시판 / 무첨가, 건조",
     "verdict": "cond",
     "amount": {
      "s": "5g",
      "m": "12g",
      "l": "20g",
      "note": "무첨가"
     },
     "prep": "무첨가 제품만, 딱딱하면 잘게",
     "caution": "설탕 코팅 제품은 주의",
     "sources": [
      "확인 필요"
     ]
    }
   ],
   "flags": [],
   "needsCheck": true
  },
  {
   "id": "f086",
   "name": "땅콩",
   "aliases": [
    "땅콩버터"
   ],
   "category": "etc",
   "verdict": "cond",
   "states": [
    {
     "state": "무염 / 땅콩버터, 볶음",
     "verdict": "cond",
     "amount": {
      "s": "3g",
      "m": "7g",
      "l": "12g",
      "note": "무염 땅콩"
     },
     "prep": "껍질 벗긴 무염·무코팅만, 땅콩버터는 1티스푼 이하",
     "caution": "땅콩버터는 자일리톨 여부 반드시 확인",
     "sources": [
      "AKC-음식"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f087",
   "name": "아몬드",
   "aliases": [],
   "category": "etc",
   "verdict": "warn",
   "states": [
    {
     "state": "볶음",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "지방이 많아 구토·설사·췌장염, 통째로 삼키면 걸림",
     "sources": [
      "ASPCA"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f088",
   "name": "호두",
   "aliases": [],
   "category": "etc",
   "verdict": "warn",
   "states": [
    {
     "state": "볶음",
     "verdict": "warn",
     "amount": null,
     "prep": null,
     "caution": "지방이 많아 구토·설사·췌장염",
     "sources": [
      "ASPCA"
     ]
    }
   ],
   "flags": [
    "pancreas"
   ],
   "needsCheck": false
  },
  {
   "id": "f089",
   "name": "마카다미아",
   "aliases": [],
   "category": "etc",
   "verdict": "no",
   "states": [
    {
     "state": "볶음",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "쇠약·떨림·발열, 보통 12시간 안에 증상, 먹었으면 병원",
     "sources": [
      "ASPCA",
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f090",
   "name": "초콜릿",
   "aliases": [
    "초코",
    "초코렛",
    "초콜렛",
    "카카오"
   ],
   "category": "etc",
   "verdict": "no",
   "states": [
    {
     "state": "다크 / 밀크",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "진할수록 위험하고 화이트도 안 됨, 먹은 양·종류를 메모해 병원",
     "sources": [
      "ASPCA",
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  },
  {
   "id": "f091",
   "name": "자일리톨 껌·간식",
   "aliases": [
    "자일리톨",
    "껌"
   ],
   "category": "etc",
   "verdict": "no",
   "states": [
    {
     "state": "전체",
     "verdict": "no",
     "amount": null,
     "prep": null,
     "caution": "급격한 저혈당과 간 손상, 15분 안에 증상 가능해 응급",
     "sources": [
      "PPH",
      "AKC-음식"
     ]
    }
   ],
   "flags": [],
   "needsCheck": false
  }
 ],
 "popular": [
  "포도",
  "고구마",
  "닭가슴살",
  "황태",
  "수박",
  "김",
  "사과",
  "달걀",
  "바나나",
  "우유",
  "양파",
  "치즈",
  "귤",
  "떡",
  "블루베리",
  "초콜릿"
 ],
 "season": {
  "title": "11월에 많이 찾는 음식",
  "items": [
   "귤",
   "감",
   "고구마",
   "배",
   "단호박"
  ]
 }
};

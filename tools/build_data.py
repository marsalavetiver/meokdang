"""데이터 시트(markdown)의 음식 표를 사이트용 data/foods.js로 바꾼다.

사용법: python3 tools/build_data.py <datasheet.md>
"""
import json
import re
import sys
from pathlib import Path

CATEGORIES = {
    "채소": "veg",
    "과일": "fruit",
    "고기·내장": "meat",
    "해산물": "sea",
    "달걀·유제품": "dairy",
    "밥·빵": "grain",
    "견과·간식·기타 사람 음식": "etc",
}
VERDICT = {"가능": "ok", "조건부 가능": "cond", "주의": "warn", "금지": "no"}

# 검색에서 같이 찾아질 다른 이름
ALIASES = {
    "고구마": ["군고구마", "찐고구마", "생고구마"],
    "단호박": ["호박", "늙은호박"],
    "브로콜리": [],
    "감자": ["찐감자", "생감자"],
    "토마토": ["방울토마토"],
    "옥수수": ["팝콘", "옥수수심"],
    "대파": ["파", "쪽파"],
    "수박": [],
    "귤": ["감귤", "밀감", "한라봉", "오렌지"],
    "참외": [],
    "감": ["홍시", "단감", "곶감"],
    "포도": ["청포도", "거봉", "적포도"],
    "샤인머스캣": ["샤인머스켓", "샤인"],
    "건포도": [],
    "닭가슴살": ["닭고기", "닭", "삶은닭"],
    "소고기": ["쇠고기", "소", "우둔살", "차돌박이", "한우"],
    "돼지고기": ["돼지", "앞다리살", "삼겹살", "목살"],
    "오리고기": ["오리"],
    "닭뼈": ["치킨뼈", "닭다리뼈"],
    "햄·소시지": ["햄", "소시지", "스팸", "베이컨"],
    "보쌈": ["수육"],
    "돼지 간": ["간", "순대간"],
    "오소리감투(위)": ["오소리감투", "위"],
    "연어": ["연어구이"],
    "연어회": ["연어", "회"],
    "광어회": ["광어", "회"],
    "방어회": ["방어", "회"],
    "고등어": ["자반고등어", "고등어구이"],
    "황태": ["황태채", "명태"],
    "북어": ["북어채", "명태"],
    "북어·황태 (조미)": ["조미황태", "조미북어", "양념황태"],
    "새우": ["새우튀김"],
    "멸치": ["잔멸치", "멸치볶음"],
    "김": ["맨김", "무조미김", "구운김"],
    "조미김": ["도시락김", "김", "재래김"],
    "달걀": ["계란", "삶은계란", "삶은달걀", "노른자", "흰자"],
    "메추리알": ["메추리알장조림", "장조림"],
    "우유": ["락토프리우유"],
    "치즈": ["슬라이스치즈", "코티지치즈"],
    "요거트": ["요구르트", "플레인요거트"],
    "흰쌀밥": ["밥", "쌀밥", "쌀"],
    "현미밥": ["현미"],
    "보리밥": ["보리"],
    "귀리밥": ["귀리", "오트밀"],
    "흑미밥": ["흑미"],
    "콩밥": ["콩", "서리태", "완두콩"],
    "팥밥·수수밥": ["팥", "수수", "팥밥", "수수밥"],
    "식빵": ["빵"],
    "바게트·모닝빵": ["바게트", "모닝빵", "빵"],
    "단팥빵·크림빵": ["단팥빵", "크림빵", "빵"],
    "건포도빵": ["빵"],
    "마늘빵": ["빵"],
    "초코빵·생지 반죽": ["초코빵", "생지", "빵반죽", "빵"],
    "떡": ["꿀떡", "인절미", "가래떡", "떡국떡", "떡볶이"],
    "꿀": [],
    "고구마 말랭이": ["고구마말랭이", "말랭이"],
    "땅콩": ["땅콩버터"],
    "초콜릿": ["초코", "초코렛", "초콜렛", "카카오"],
    "자일리톨 껌·간식": ["자일리톨", "껌"],
    "레몬·자몽": ["레몬", "자몽"],
}

# 질환별로 피할 음식(데이터 시트의 '질환견 주의 기준' 표를 음식 이름에 맞춘 것)
KIDNEY = {
    "닭가슴살", "소고기", "돼지고기", "오리고기", "돼지 간", "허파", "염통", "오소리감투(위)",
    "연어", "고등어", "새우", "치즈", "식빵", "바게트·모닝빵", "햄·소시지", "순대",
    "황태", "북어", "멸치", "김", "메추리알", "보쌈", "광어회",
}
PANCREAS = {
    "소고기", "돼지고기", "족발", "보쌈", "도가니", "햄·소시지", "순대", "방어회", "고등어",
    "오리고기", "치즈", "달걀", "땅콩", "아몬드", "호두", "아보카도", "바게트·모닝빵", "단팥빵·크림빵",
}
THYROID = {"김", "미역"}

# 많이 묻는 순 (홈 칩 순서)
POPULAR = [
    "포도", "고구마", "닭가슴살", "황태", "수박", "김", "사과", "달걀",
    "바나나", "우유", "양파", "치즈", "귤", "떡", "블루베리", "초콜릿",
]
# 이달의 음식 (11월)
SEASON = {"title": "11월에 많이 찾는 음식", "items": ["귤", "감", "고구마", "배", "단호박"]}


def slug(i):
    return f"f{i:03d}"


def parse_amount(text):
    text = text.strip()
    if not text:
        return None
    note = None
    m = re.search(r"\(([^)]*)\)\s*$", text)
    if m:
        note = m.group(1)
        text = text[: m.start()].strip()
    parts = [p.strip() for p in re.split(r"\s+/\s+", text)]
    if len(parts) != 3:
        return {"raw": text, "note": note}
    return {"s": parts[0], "m": parts[1], "l": parts[2], "note": note}


def clean(cell):
    return cell.replace("\\~", "~").strip()


def main(path):
    md = Path(path).read_text(encoding="utf-8")
    section = md.split("## 음식 목록", 1)[1].split("## 근거 출처", 1)[0]
    foods = {}
    order = []
    category = None
    rows = 0
    for line in section.splitlines():
        if line.startswith("### "):
            category = CATEGORIES[line[4:].strip()]
            continue
        if not line.startswith("| ") or line.startswith("| 음식") or line.startswith("| ---"):
            continue
        cells = [clean(c) for c in line.strip().strip("|").split("|")]
        name, state, verdict, amount, prep, caution, source = cells
        rows += 1
        if name not in foods:
            foods[name] = {"name": name, "category": category, "states": []}
            order.append(name)
        foods[name]["states"].append({
            "state": state,
            "verdict": VERDICT[verdict],
            "amount": parse_amount(amount),
            "prep": prep or None,
            "caution": caution or None,
            "sources": [s.strip() for s in source.split(",") if s.strip()],
        })

    out = []
    for i, name in enumerate(order, 1):
        f = foods[name]
        verdicts = {s["verdict"] for s in f["states"]}
        flags = []
        if name in KIDNEY:
            flags.append("kidney")
        if name in PANCREAS:
            flags.append("pancreas")
        if name in THYROID:
            flags.append("thyroid")
        out.append({
            "id": slug(i),
            "name": name,
            "aliases": ALIASES.get(name, []),
            "category": f["category"],
            "verdict": verdicts.pop() if len(verdicts) == 1 else "mixed",
            "states": f["states"],
            "flags": flags,
            "needsCheck": any("확인 필요" in s for st in f["states"] for s in st["sources"]),
        })

    names = {f["name"] for f in out}
    for n in POPULAR + SEASON["items"]:
        assert n in names, n
    for n in KIDNEY | PANCREAS | THYROID:
        assert n in names, n

    data = {
        "reviewedAt": "2026-11-11",
        "rows": rows,
        "foods": out,
        "popular": POPULAR,
        "season": SEASON,
    }
    js = "// tools/build_data.py로 만든 파일이다. 직접 고치지 말고 데이터 시트를 고친 뒤 다시 만든다.\n"
    js += "window.MEOKDANG_DATA = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
    Path(__file__).resolve().parent.parent.joinpath("data", "foods.js").write_text(js, encoding="utf-8")
    print(f"{rows} rows -> {len(out)} foods")


if __name__ == "__main__":
    main(sys.argv[1])

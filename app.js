/* 먹어도 댕? — 1차 MVP. 서버 없이 이 기기에만 아이 정보를 저장하는 정적 웹앱. */
(function () {
  "use strict";

  var DATA = window.MEOKDANG_DATA;
  var FOODS = DATA.foods;
  var BY_NAME = {};
  var BY_ID = {};
  FOODS.forEach(function (f) { BY_NAME[f.name] = f; BY_ID[f.id] = f; });

  // 문제 신고는 GitHub 이슈로 받는다. 나중에 구글 폼 주소로 바꿔도 된다.
  var REPORT_URL = "https://github.com/marsalavetiver/meokdang/issues/new";
  var REQUEST_URL = REPORT_URL;
  var VET_SEARCH_URL = "https://map.naver.com/p/search/" + encodeURIComponent("24시 동물병원");

  var VERDICT = {
    ok:    { label: "괜찮아요",          lead: "간식으로 좋아요" },
    cond:  { label: "이렇게 주면 돼요",  lead: "이렇게만 주세요" },
    warn:  { label: "안 주는 게 좋아요", lead: "일부러 주진 마세요" },
    no:    { label: "절대 안 돼요",      lead: "조금만 먹어도 위험해요" },
    mixed: { label: "상태별로 달라요",  lead: "" }
  };
  var RANK = { no: 0, warn: 1, mixed: 2, cond: 3, ok: 4 };
  var CATEGORY = { veg: "채소", fruit: "과일", meat: "고기·내장", sea: "해산물", dairy: "달걀·유제품", grain: "밥·빵", etc: "간식·기타" };
  var CONDITIONS = {
    kidney:   { label: "신장", subject: "신장이 약한", reason: "인·단백질·나트륨을 줄여야 해서" },
    pancreas: { label: "췌장", subject: "췌장이 약한", reason: "기름진 음식 한 번으로도 다시 아플 수 있어서" },
    thyroid:  { label: "갑상선", subject: "갑상선이 약한", reason: "요오드가 많은 음식은 피하는 게 좋아서" }
  };
  var BANDS = {
    s: { label: "소형견", range: "10kg 미만" },
    m: { label: "중형견", range: "10~25kg" },
    l: { label: "대형견", range: "25kg 이상" }
  };
  var SOURCES = {
    "AKC-과채": "https://www.akc.org/expert-advice/nutrition/fruits-vegetables-dogs-can-and-cant-eat/",
    "AKC-음식": "https://www.akc.org/expert-advice/nutrition/human-foods-dogs-can-and-cant-eat/",
    "AKC-고구마": "https://www.akc.org/expert-advice/advice/can-my-dog/can-dogs-eat-sweet-potatoes/",
    "AKC-감자": "https://www.akc.org/expert-advice/nutrition/can-dogs-eat-potatoes/",
    "AKC-쌀": "https://www.akc.org/expert-advice/advice/can-dogs-eat-rice/",
    "AKC-오트밀": "https://www.akc.org/expert-advice/nutrition/natural-foods/can-dogs-eat-oatmeal/",
    "AKC-두부": "https://www.akc.org/expert-advice/nutrition/can-dogs-eat-tofu/",
    "AKC-해조류": "https://www.akc.org/expert-advice/nutrition/can-dogs-eat-seaweed/",
    "AKC-키위": "https://www.akc.org/expert-advice/advice/can-dogs-eat-kiwi/",
    "ASPCA": "https://www.aspca.org/pet-care/aspca-poison-control/people-foods-avoid-feeding-your-pets",
    "PPH": "https://www.petpoisonhelpline.com/covid-19/kids-health-and-safety-risks-to-pets",
    "Kinship-감": "https://kinship.com/dog-nutrition/can-dogs-eat-persimmons",
    "Kinship-간": "https://www.kinship.com/uk/dog-health/can-dogs-eat-liver-vitamin-a-toxicity",
    "코메디닷컴": "https://kormedi.com/1405525/",
    "KFSI 웹진": "https://www.kfsi.or.kr/contents/webzine/201712/sub04-01.html"
  };

  /* ---------- 저장 (이 기기에만) ---------- */
  var KEY = "meokdang.profile.v1";
  var memProfile = null;
  var confirmedThisVisit = false;

  function loadProfile() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* 저장소를 못 쓰는 환경 */ }
    return memProfile;
  }
  function saveProfile(p) {
    memProfile = p;
    try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* 무시 */ }
  }
  function clearProfile() {
    memProfile = null;
    try { window.localStorage.removeItem(KEY); } catch (e) { /* 무시 */ }
  }
  function activeProfile() { return confirmedThisVisit ? loadProfile() : null; }

  function bandOf(p) {
    if (!p) return null;
    if (p.weight) return p.weight < 10 ? "s" : p.weight < 25 ? "m" : "l";
    return p.size || null;
  }
  function dogName(p) { return (p && p.name) ? p.name : "아이"; }
  function josa(word, a, b) {
    var c = word.charCodeAt(word.length - 1);
    if (c < 0xac00 || c > 0xd7a3) return word + b;
    return word + ((c - 0xac00) % 28 ? a : b);
  }
  function profileSummary(p) {
    var bits = [];
    if (p.weight) bits.push(p.weight + "kg");
    else if (p.size) bits.push(BANDS[p.size].label);
    var cs = (p.conditions || []).map(function (c) { return CONDITIONS[c].label; });
    bits.push(cs.length ? cs.join("·") + " 주의" : "아픈 곳 없음");
    return bits.join(" · ");
  }

  /* ---------- 판정 ---------- */
  // 아이의 질환을 반영한 판정. 질환견이 피할 음식이면 '안 주는 게 좋아요'로 낮춘다.
  function personalize(food, state, p) {
    var hit = (p && p.conditions || []).filter(function (c) { return food.flags.indexOf(c) >= 0; });
    var v = state.verdict;
    if (hit.length && (v === "ok" || v === "cond")) return { verdict: "warn", by: hit };
    return { verdict: v, by: hit };
  }
  function foodVerdict(food, p) {
    var vs = food.states.map(function (s) { return personalize(food, s, p).verdict; });
    var uniq = vs.filter(function (v, i) { return vs.indexOf(v) === i; });
    return uniq.length === 1 ? uniq[0] : "mixed";
  }
  function bestState(food, p) {
    // 보호자가 줄 수 있는 상태를 먼저 보여준다(가장 안전한 판정 순).
    var sorted = food.states.slice().sort(function (a, b) {
      return RANK[personalize(food, b, p).verdict] - RANK[personalize(food, a, p).verdict];
    });
    return sorted[0];
  }
  // 홈 미리보기에 쓰는 다정한 한 줄 (말투 가이드 기준). 없으면 데이터 문구를 쓴다.
  var SUMMARY = {
    "포도": "한두 알만 먹어도 신장이 크게 아플 수 있어요. 샤인머스캣과 건포도도 똑같아요.",
    "고구마": "푹 찐 고구마는 괜찮다고 알려져 있어요. 생고구마는 소화가 어려워 주지 말아 주세요.",
    "닭가슴살": "껍질·뼈 없이 소금 없이 삶은 살코기는 괜찮다고 알려져 있어요. 생으로는 주지 말아 주세요.",
    "황태": "아무 양념 없는 황태채를 찬물에 불려 짠기를 빼면 괜찮다고 알려져 있어요.",
    "수박": "씨와 껍질만 빼면 괜찮은 과일로 알려져 있어요. 여름 수분 간식으로 좋아요.",
    "김": "아무것도 바르지 않은 맨김만 조금 괜찮아요. 조미김은 짜서 주지 말아 주세요.",
    "사과": "씨와 심만 빼면 괜찮은 과일로 알려져 있어요.",
    "달걀": "완전히 익힌 달걀은 괜찮다고 알려져 있어요. 날달걀은 피해 주세요.",
    "바나나": "괜찮지만 당이 높아서 가끔만 조금 주세요.",
    "우유": "대부분의 아이가 우유를 잘 소화하지 못해 설사할 수 있어요.",
    "양파": "익혀도, 가루나 국물이어도 위험해요. 증상이 늦게 나타날 수 있어요.",
    "치즈": "짜지 않은 저지방 치즈를 아주 조금만 괜찮아요. 슬라이스 치즈는 짜요.",
    "귤": "껍질과 씨를 빼고 과육만 조금은 괜찮다고 알려져 있어요.",
    "떡": "끈적여서 목이나 장에 걸릴 수 있어요. 조금이라도 주지 말아 주세요.",
    "블루베리": "씻어서 그대로 줘도 괜찮은 과일로 알려져 있어요. 작은 아이는 반으로 잘라 주세요.",
    "초콜릿": "진할수록 더 위험하고, 화이트 초콜릿도 안 돼요.",
    "감": "껍질·씨·꼭지를 뺀 생감 과육만 조금 괜찮아요. 곶감은 당이 높아요.",
    "배": "씨와 심만 빼면 괜찮은 과일로 알려져 있어요.",
    "단호박": "껍질과 씨를 빼고 푹 찌면 괜찮다고 알려져 있어요. 생으로는 주지 말아 주세요."
  };

  function shortReason(food, p) {
    var hit = (p && p.conditions || []).filter(function (c) { return food.flags.indexOf(c) >= 0; });
    if (hit.length && foodVerdict(food, p) !== "no") return CONDITIONS[hit[0]].subject + " " + josa(dogName(p), "이에게는", "에게는") + " 권하지 않아요. " + CONDITIONS[hit[0]].reason + " 피하는 게 좋다고 알려져 있어요.";
    if (SUMMARY[food.name]) return SUMMARY[food.name];
    var s = bestState(food, p);
    var v = foodVerdict(food, p);
    if (v === "mixed") {
      var good = food.states.filter(function (x) { var pv = personalize(food, x, p).verdict; return pv === "ok" || pv === "cond"; });
      if (good.length) return good.map(function (x) { return x.state; }).join(", ") + "만 괜찮아요";
    }
    return s.caution || s.prep || VERDICT[v].lead;
  }

  /* ---------- 검색 ---------- */
  function norm(s) { return String(s || "").toLowerCase().replace(/[\s·()\/,]/g, ""); }
  function search(q) {
    var n = norm(q);
    if (!n) return [];
    var scored = [];
    FOODS.forEach(function (f) {
      var name = norm(f.name);
      var score = -1;
      if (name === n) score = 100;
      else if (f.aliases.some(function (a) { return norm(a) === n; })) score = 90;
      else if (name.indexOf(n) === 0) score = 80;
      else if (name.indexOf(n) >= 0) score = 70;
      else if (f.aliases.some(function (a) { return norm(a).indexOf(n) >= 0; })) score = 60;
      else if (n.length >= 2 && f.states.some(function (s) { return norm(s.state).indexOf(n) >= 0; })) score = 40;
      if (score >= 0) scored.push({ f: f, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score || a.f.name.length - b.f.name.length; });
    return scored.map(function (x) { return x.f; });
  }

  /* ---------- 그리기 도우미 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // 문장마다 줄을 바꿔 읽기 쉽게 한다
  function lines(text) {
    return esc(text).split(/(?<=[.!?,])\s+(?=\S)/).map(function (t) { return t.replace(/,$/, ""); }).join("<br>");
  }
  function badge(v, text) { return '<span class="badge ' + v + '">' + esc(text || VERDICT[v].label) + "</span>"; }
  function chev() { return '<svg class="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  function celine(cls) { return '<img class="celine ' + (cls || "") + '" src="assets/celine.png" alt="" width="218" height="280">'; }
  function dogSVG(cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle cx="60" cy="64" r="52" fill="#fff1e6"/>' +
      '<path d="M26 44c-6-14 2-28 14-28 8 0 12 7 12 15l-1 24c-12 2-21-2-25-11z" fill="#c2410c"/>' +
      '<path d="M94 44c6-14-2-28-14-28-8 0-12 7-12 15l1 24c12 2 21-2 25-11z" fill="#c2410c"/>' +
      '<ellipse cx="60" cy="66" rx="31" ry="30" fill="#ff6b00"/>' +
      '<ellipse cx="60" cy="80" rx="19" ry="15" fill="#fff"/>' +
      '<circle cx="48" cy="60" r="4" fill="#191f28"/><circle cx="72" cy="60" r="4" fill="#191f28"/>' +
      '<circle cx="49.3" cy="58.6" r="1.3" fill="#fff"/><circle cx="73.3" cy="58.6" r="1.3" fill="#fff"/>' +
      '<ellipse cx="60" cy="72" rx="6" ry="4.4" fill="#191f28"/>' +
      '<path d="M60 76v5m0 0c-2 3-6 3-8 1m8-1c2 3 6 3 8 1" fill="none" stroke="#191f28" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M56 85c0 6 8 6 8 0" fill="#f2777a"/>' +
      '</svg>';
  }
  function pawSVG() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="#ff6b00"><ellipse cx="12" cy="15.5" rx="5" ry="4.2"/><circle cx="6" cy="10" r="2.2"/><circle cx="18" cy="10" r="2.2"/><circle cx="9.3" cy="6.3" r="2.1"/><circle cx="14.7" cy="6.3" r="2.1"/></g></svg>';
  }
  function searchIcon() { return '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="6" fill="none" stroke="#6b7684" stroke-width="2"/><path d="m13.5 13.5 4 4" stroke="#6b7684" stroke-width="2" stroke-linecap="round"/></svg>'; }
  function backIcon() { return '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="#191f28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }

  function urgentLink() {
    return '<a class="ate-row" href="#/ate"><span class="ico" aria-hidden="true">!</span><b>먹으면 안 되는 걸 먹었나요?</b>' + chev() + "</a>";
  }

  function header(opts) {
    opts = opts || {};
    var p = activeProfile();
    var left = opts.back
      ? '<button class="icon-btn" data-act="back" aria-label="뒤로">' + backIcon() + "</button>"
      : "";
    var logo = '<a class="logo" href="#/home" aria-label="먹어도 댕? 홈">먹어도 댕?</a>';
    var chip = p
      ? '<button class="profile-chip" data-act="profile" aria-label="아이 정보 바꾸기: ' + esc(dogName(p)) + '"><img class="face" src="assets/celine-face.png" alt="">' + esc(dogName(p)) + (p.weight ? " · " + p.weight + "kg" : "") + "</button>"
      : '<button class="profile-chip empty" data-act="profile">아이 정보 넣기</button>';
    document.getElementById("top").innerHTML = opts.hidden ? "" : left + logo + '<span class="spacer"></span>' + chip;
  }

  function render(html, opts) {
    header(opts);
    var view = document.getElementById("view");
    view.innerHTML = html;
    window.scrollTo(0, 0);
    if (opts && opts.title) document.title = opts.title + " · 먹어도 댕?";
    else document.title = "먹어도 댕? · 우리 아이 기준 음식 판정";
  }

  /* ---------- 화면: 시작 ---------- */
  var draft = null;

  function viewStart(mode) {
    var saved = loadProfile();
    if (mode !== "edit" && mode !== "new" && saved) return viewWelcomeBack(saved);
    draft = mode === "edit" && saved
      ? { name: saved.name || "", weight: saved.weight || "", size: saved.size || null, conditions: (saved.conditions || []).slice(), unknown: !saved.weight && !!saved.size }
      : { name: "", weight: "", size: null, conditions: [], unknown: false };
    drawStartForm(mode === "edit");
  }

  function drawStartForm(editing) {
    var d = draft;
    var weightField = d.unknown
      ? '<div class="size-row" role="group" aria-label="아이 크기">' +
        ["s", "m", "l"].map(function (k) {
          return '<button type="button" class="chip" data-size="' + k + '" aria-pressed="' + (d.size === k) + '">' + BANDS[k].label + "<small>" + BANDS[k].range + "</small></button>";
        }).join("") + "</div>" +
        '<button type="button" class="toggle-link" data-act="weight-known">몸무게를 알아요</button>'
      : '<label class="input"><input id="f-weight" inputmode="decimal" autocomplete="off" placeholder="예: 4.2" value="' + esc(d.weight) + '" aria-label="몸무게"><span class="unit">kg</span></label>' +
        '<button type="button" class="toggle-link" data-act="weight-unknown">몸무게를 잘 몰라요</button>';
    var condChips = ["kidney", "pancreas", "thyroid"].map(function (c) {
      return '<button type="button" class="chip" data-cond="' + c + '" aria-pressed="' + (d.conditions.indexOf(c) >= 0) + '">' + CONDITIONS[c].label + "</button>";
    }).join("") + '<button type="button" class="chip" data-cond="none" aria-pressed="' + (d.conditions.length === 0 && d.touchedCond ? "true" : "false") + '">없어요</button>';

    render(
      '<section class="start-hero hero-center">' +
        celine("mark") +
        '<h1 class="st5 b">' + (editing ? "아이 정보를 바꿀게요" : "오늘 누구의 음식을<br>확인할까요?") + "</h1>" +
        '<p class="t6 muted">몸무게에 맞춰 하루 최대량을 알려드려요. 정보는 이 기기에만 저장돼요.</p>' +
      "</section>" + urgentLink() +
      '<form id="start-form" novalidate>' +
        '<div class="field"><label class="label" for="f-name">아이 이름</label>' +
          '<div class="input"><input id="f-name" maxlength="10" autocomplete="off" placeholder="예: 셀린" value="' + esc(d.name) + '"></div></div>' +
        '<div class="field"><span class="label">몸무게</span>' + weightField + "</div>" +
        '<div class="field"><span class="label">아픈 곳이 있나요?</span><span class="hint">여러 개 고를 수 있어요. 고르면 그 아이에게 맞춰 더 조심스럽게 알려드려요.</span>' +
          '<div class="chips" role="group" aria-label="아픈 곳">' + condChips + "</div></div>" +
        '<div class="actions">' +
          '<button class="btn btn-primary" type="submit" id="start-go">' + (editing ? "저장하기" : "확인하러 가기") + "</button>" +
          (editing
            ? '<button class="btn btn-ghost" type="button" data-act="forget">이 기기에서 정보 지우기</button>'
            : '<button class="btn btn-ghost" type="button" data-act="browse">입력 없이 둘러볼게요</button>') +
        "</div>" +
      "</form>",
      { hidden: !editing, back: editing, title: "시작" }
    );
    validateStart();
  }

  function readWeight() {
    var el = document.getElementById("f-weight");
    if (!el) return null;
    var v = parseFloat(String(el.value).replace(",", "."));
    return v > 0 && v < 100 ? Math.round(v * 10) / 10 : null;
  }
  function validateStart() {
    var btn = document.getElementById("start-go");
    if (!btn) return;
    var ok = draft.unknown ? !!draft.size : !!readWeight();
    btn.disabled = !ok;
  }

  function viewWelcomeBack(p) {
    render(
      '<section class="start-hero hero-center">' + celine("mark") +
        '<h1 class="st5 b">다시 오셨네요, 보호자님</h1>' +
        '<p class="t6 muted">오늘도 ' + esc(josa(dogName(p), "이", "")) + "의 음식을 확인할까요?</p>" +
      "</section>" +
      '<div class="card saved" style="margin-top:24px"><div class="avatar"><img src="assets/celine-face.png" alt=""></div>' +
        "<dl><dt>" + esc(dogName(p)) + "</dt><dd>" + esc(profileSummary(p)) + "</dd></dl></div>" +
      '<p class="t7 muted" style="margin:12px 4px 0">몸무게가 바뀌었다면 정보를 고쳐 주세요. 양이 달라져요.</p>' +
      '<div class="actions">' +
        '<button class="btn btn-primary" data-act="confirm">' + esc(josa(dogName(p), "이", "")) + " 맞아요</button>" +
        '<button class="btn btn-secondary" data-act="edit">정보 바꾸기</button>' +
        '<button class="btn btn-ghost" data-act="new">다른 아이예요</button>' +
      "</div>",
      { hidden: true, title: "시작" }
    );
  }

  /* ---------- 셀린이 표정 ---------- */
  // 표정 그림이 생기면 파일 이름만 바꾼다. null이면 셀린이 대신 금지 아이콘을 쓴다.
  var MOOD = { ok: "assets/celine-ok.png", cond: "assets/celine-cond.png", warn: "assets/celine-warn.png", mixed: "assets/celine-cond.png", no: "assets/celine-no.png", ate: "assets/celine-warn.png" };
  function stageArt(v) {
    if (MOOD[v]) return '<img class="stage-art mood-' + v + '" src="' + MOOD[v] + '" alt="">';
    return '<span class="stop-icon" aria-hidden="true"><svg width="64" height="64" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="24" stroke="#fff" stroke-width="7"/><path d="M19 19 53 53" stroke="#fff" stroke-width="7" stroke-linecap="round"/></svg></span>';
  }
  function labelFor(food, state, p) {
    var pv = personalize(food, state, p);
    return pv.verdict !== state.verdict ? josa(dogName(p), "이는", "는") + " 피하기" : VERDICT[pv.verdict].label;
  }

  /* ---------- 화면: 홈 ---------- */
  var selectedChip = null;

  function viewHome() {
    var p = activeProfile();
    var who = p ? esc(josa(dogName(p), "이에게", "에게")) : "우리 아이에게";
    var tiles = DATA.popular.slice(0, 9).map(function (n) {
      var f = BY_NAME[n];
      var v = foodVerdict(f, p);
      var label = v === "mixed" ? VERDICT.mixed.label : labelFor(f, bestState(f, p), p);
      return '<button class="tile t-' + v + '" data-chip="' + f.id + '" aria-pressed="' + (selectedChip === f.id) + '"><b>' + esc(n) + "</b><span>" + esc(label) + "</span></button>";
    }).join("");
    var season = DATA.season.items.map(function (n) {
      var f = BY_NAME[n];
      var v = foodVerdict(f, p);
      var label = v === "mixed" ? VERDICT.mixed.label : labelFor(f, bestState(f, p), p);
      return '<a class="g-row link" href="#/food/' + f.id + '"><span class="bar ' + v + '"></span><span class="g-name">' + esc(n) + '</span><span class="g-val">' + esc(label) + "</span>" + chev() + "</a>";
    }).join("");

    render(
      '<section class="hero-center">' + celine("hero-celine") +
        '<h1 class="st5 b">' + who + " 주고 싶은<br>음식이 있나요?</h1></section>" +
      '<form class="search pill-search" id="search-form" role="search">' +
        '<label class="input">' + searchIcon() + '<input id="q" type="search" enterkeyhint="search" autocomplete="off" placeholder="음식 이름을 써 주세요 (예: 황태)" aria-label="음식 검색"></label>' +
      "</form>" + urgentLink() +
      '<section class="section"><h2 class="section-title">많이 물어본 음식</h2>' +
        '<div class="tiles" role="group" aria-label="많이 물어본 음식">' + tiles + "</div>" +
        '<div class="preview" id="preview" aria-live="polite">' + previewHTML(selectedChip) + "</div>" +
      "</section>" +
      '<section class="section"><h2 class="section-title">' + esc(DATA.season.title) + "</h2>" +
        '<div class="group">' + season + "</div></section>",
      { title: "홈" }
    );
  }

  function previewHTML(id) {
    if (!id) return '<p class="t7 muted" style="margin:2px 2px 0">음식을 누르면 여기에서 바로 알려드려요.</p>';
    var f = BY_ID[id];
    var p = activeProfile();
    var v = foodVerdict(f, p);
    return '<a class="card preview-card" href="#/food/' + f.id + '">' +
      '<div class="row"><span class="name">' + esc(f.name) + "</span>" + badge(v, v === "mixed" ? null : labelFor(f, bestState(f, p), p)) + "</div>" +
      "<p>" + lines(shortReason(f, p)) + "</p>" +
      '<span class="more">자세히 보기 ›</span></a>';
  }

  /* ---------- 화면: 검색 결과 ---------- */
  function viewSearch(q) {
    var p = activeProfile();
    var list = search(q);
    var body;
    if (!list.length) {
      body = '<div class="empty-state">' + celine("mark") +
        '<h2 class="t5 b" style="margin:12px 0 0">찾는 음식이 아직 없나요?</h2>' +
        "<p>알려주시면 빨리 챙겨둘게요.<br>급하다면 수의사 선생님께 먼저 물어봐 주세요.</p>" +
        '<a class="btn btn-secondary" href="' + REQUEST_URL + '?title=' + encodeURIComponent("음식 추가 요청: " + q) + '" target="_blank" rel="noopener">이 음식 알려주기</a>' +
        urgentLink() + "</div>";
    } else {
      body = '<p class="t7 muted" style="margin:12px 4px 8px">' + list.length + "개를 찾았어요</p>" +
        '<div class="group">' + list.map(function (f) {
          var v = foodVerdict(f, p);
          return '<a class="g-row link tall" href="#/food/' + f.id + '"><span class="bar ' + v + '"></span><span class="g-name">' + esc(f.name) +
            '<small>' + esc(f.states.map(function (s) { return s.state; }).join(" · ")) + "</small></span>" +
            badge(v, v === "mixed" ? null : labelFor(f, bestState(f, p), p)) + chev() + "</a>";
        }).join("") + "</div>";
    }
    render(
      '<form class="search pill-search" id="search-form" role="search" style="margin-top:8px">' +
        '<label class="input">' + searchIcon() + '<input id="q" type="search" enterkeyhint="search" autocomplete="off" value="' + esc(q) + '" aria-label="음식 검색"></label></form>' +
      body,
      { back: true, title: "‘" + q + "’ 검색" }
    );
  }

  /* ---------- 화면: 판정 카드 ---------- */
  function row(k, v) { return '<div class="g-row"><span class="g-k">' + k + '</span><span class="g-big">' + v + "</span></div>"; }
  function textRow(k, t) { return '<div class="g-row text"><div><small>' + k + "</small>" + t + "</div></div>"; }

  function detailRows(food, state, p, pv) {
    var v = pv.verdict, out = "";
    var downgraded = pv.verdict !== state.verdict;
    if (downgraded) {
      out += textRow("건강한 아이라면", esc(VERDICT[state.verdict].label) + (state.prep ? " · " + esc(state.prep) : ""));
      return out;
    }
    if (v === "ok" || v === "cond") {
      var a = state.amount, band = bandOf(p);
      if (a && a.s && band) {
        out += row(esc(josa(dogName(p), "이", "")) + " 하루 최대<small>" + esc(p.weight ? p.weight + "kg" : BANDS[band].label) + " 기준" + (a.note ? " · " + esc(a.note) : "") + "</small>", esc(a[band]));
      } else if (a && a.s) {
        ["s", "m", "l"].forEach(function (k) { out += row(BANDS[k].label + " 하루 최대<small>" + BANDS[k].range + "</small>", esc(a[k])); });
      } else if (a) {
        out += row("하루 최대", esc(a.raw));
      }
      if (state.prep) out += textRow("이렇게 주세요", esc(state.prep));
      out += textRow("처음이라면", "절반만 주고, 다음 날 응가 상태를 살펴봐 주세요.<br>이상하면 바로 멈춰 주세요.");
    } else if (v === "warn" && state.prep) {
      out += textRow("꼭 줘야 한다면", esc(state.prep));
    }
    return out;
  }

  function viewFood(id, si) {
    var food = BY_ID[id];
    if (!food) return viewNotFound();
    var p = activeProfile();
    var hits = (p && p.conditions || []).filter(function (c) { return food.flags.indexOf(c) >= 0; });
    var order = food.states.slice().sort(function (a, b) {
      return RANK[personalize(food, b, p).verdict] - RANK[personalize(food, a, p).verdict];
    });
    var state = (si != null && food.states[si]) ? food.states[si] : order[0];
    var pv = personalize(food, state, p);
    var v = pv.verdict;
    var downgraded = pv.verdict !== state.verdict;
    var title = downgraded ? josa(dogName(p), "이는", "는") + " 피해 주세요" : VERDICT[v].label;
    var why;
    if (downgraded) {
      var c = CONDITIONS[pv.by[0]];
      why = c.subject.replace("약한", "약하면") + " " + c.reason + " 피하는 게 좋아요.";
    } else {
      why = (SUMMARY[food.name] && state === order[0] && v !== "cond") ? SUMMARY[food.name] : (state.caution || "");
      if (v === "no") why = (why ? why.replace(/\.?$/, ".") + " " : "") + "아이 손이 닿지 않는 곳에 두어 주세요.";
    }

    var html = '<h1 class="sr-only">' + esc(food.name) + "</h1>" +
      '<section class="stage ' + v + '"><span class="stage-food">' + esc(food.name) + " · " + esc(state.state) + "</span>" + stageArt(v) + "</section>" +
      '<div class="verdict-text"><p class="v-title ' + v + '">' + esc(title) + "</p>" +
      (why ? '<p class="v-sub">' + lines(why) + "</p>" : "") + "</div>";

    if (hits.length) {
      html += '<div class="notice"><b>수의사 선생님 안내가 먼저예요</b>' +
        esc(hits.map(function (x) { return CONDITIONS[x].subject; }).join(", ") + " " + josa(dogName(p), "이", "")) +
        "라면 다니는 병원의 식단 안내를 먼저 따라 주세요.</div>";
    }

    var rows = detailRows(food, state, p, pv);
    if (rows) html += '<div class="group">' + rows + "</div>";

    if (food.states.length > 1) {
      html += '<h2 class="section-title small">다른 상태</h2><div class="group">' +
        food.states.map(function (s, i) {
          if (s === state) return "";
          var spv = personalize(food, s, p);
          return '<a class="g-row link" href="#/food/' + food.id + "/" + i + '"><span class="bar ' + spv.verdict + '"></span><span class="g-name">' + esc(s.state) + "</span>" + badge(spv.verdict, labelFor(food, s, p)) + chev() + "</a>";
        }).join("") + "</div>";
    }

    if (!p) {
      html += '<a class="profile-cta" href="#/start/new"><img class="face" src="assets/celine-face.png" alt="" width="36" height="36">' +
        "<div><b>우리 아이 몸무게로 볼까요?</b><span>몸무게를 넣으면 아이에게 맞는 양만 보여드려요.</span></div>" +
        '<span class="go">넣기</span></a>';
    }

    html += v === "no"
      ? '<a class="btn btn-danger pill-btn" href="#/ate/' + food.id + '">이미 먹었어요</a>'
      : '<a class="btn btn-primary pill-btn" href="#/home">다른 음식 찾아보기</a>';

    var srcs = [];
    food.states.forEach(function (s) { s.sources.forEach(function (x) { if (srcs.indexOf(x) < 0) srcs.push(x); }); });
    html += '<p class="ev">근거 ' + srcs.map(function (s) {
        var key = s.replace(/\s*\(.*\)$/, "").trim();
        if (key === "확인 필요") return "국내 자료 확인 중";
        var url = SOURCES[key];
        return url ? '<a href="' + url + '" target="_blank" rel="noopener">' + esc(s) + "</a>" : esc(s);
      }).join(", ") + " · " + esc(DATA.reviewedAt.replace(/-/g, ".")) + " 검토<br>" +
      "자료가 엇갈리면 더 조심스러운 쪽으로 정했어요. 양은 넘지 않아야 할 하루 최대치예요.<br>" +
      '<a class="report" href="' + REPORT_URL + "?title=" + encodeURIComponent("정보 확인 요청: " + food.name) + '" target="_blank" rel="noopener">정보가 이상해요 ›</a></p>';

    render(html, { back: true, title: food.name });
  }

  /* ---------- 화면: 먹었을 때 대처 ---------- */
  function viewAte(id) {
    var food = id ? BY_ID[id] : null;
    render(
      '<section class="stage no">' + (food ? '<span class="stage-food">' + esc(food.name) + "</span>" : "") + stageArt("ate") + "</section>" +
      '<div class="verdict-text"><h1 class="v-title ink">많이 놀라셨죠</h1>' +
        '<p class="v-sub">지금 괜찮아 보여도 <b>바로 동물병원에 연락해 주세요.</b><br>증상이 늦게 나타나는 음식이 많아요.</p></div>' +
      '<a class="btn btn-danger pill-btn" href="' + VET_SEARCH_URL + '" target="_blank" rel="noopener">가까운 24시 동물병원 찾기</a>' +
      '<h2 class="section-title small">전화하기 전에 확인해 두기</h2>' +
      '<div class="group memo">' +
        ["무엇을 먹었는지 (포장지가 있으면 챙기기)", "얼마나 먹었는지", "언제 먹었는지", "아이 몸무게"].map(function (t, i) {
          return '<label class="g-row"><input type="checkbox" id="m' + i + '"> ' + esc(t) + "</label>";
        }).join("") + "</div>" +
      '<h2 class="section-title small">병원 안내 전에는 하지 말아 주세요</h2>' +
      '<div class="group">' +
        ["억지로 토하게 하기 (소금물, 손가락 넣기)", "우유나 다른 음식 먹이기", "사람 약 먹이기"].map(function (t) {
          return '<div class="g-row"><span class="bar no"></span><span class="g-name normal">' + esc(t) + "</span></div>";
        }).join("") + "</div>" +
      '<p class="ev">이 화면은 아이 상태를 판단하지 않아요.<br>아이 상태는 꼭 수의사 선생님이 확인해 주세요.</p>',
      { back: true, title: "먹었을 때" }
    );
  }

  function viewNotFound() {
    render('<div class="empty-state">' + celine("mark") + '<h1 class="t5 b">페이지를 찾지 못했어요</h1><p>주소가 바뀌었을 수 있어요.</p><a class="btn btn-primary" href="#/home">홈으로 가기</a></div>', { title: "없는 페이지" });
  }

  /* ---------- 라우팅 ---------- */
  function route() {
    var h = location.hash.replace(/^#/, "") || "/";
    var parts = h.split("?")[0].split("/").filter(Boolean);
    var query = "";
    try { query = decodeURIComponent((h.split("?")[1] || "").replace(/^q=/, "")); } catch (err) { query = ""; }
    var top = parts[0] || "";

    if (top === "ate") return viewAte(parts[1]);
    if (top === "start") return viewStart(parts[1]);
    // 첫 방문: 시작 화면. 저장된 정보가 있으면 '다시 오셨네요'로 확인.
    if (!top || (!confirmedThisVisit && !sessionBrowse() && (top === "home"))) return viewStart();
    if (top === "home") return viewHome();
    if (top === "search") return viewSearch(query);
    if (top === "food") return viewFood(parts[1], parts[2] != null ? parseInt(parts[2], 10) : null);
    return viewNotFound();
  }
  var browsing = false;
  function sessionBrowse() { return browsing; }

  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }

  /* ---------- 이벤트 ---------- */
  var toastTimer;
  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.remove(); }, 2200);
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act],[data-chip],[data-size],[data-cond]");
    if (!el) return;
    if (el.dataset.chip) {
      selectedChip = selectedChip === el.dataset.chip ? null : el.dataset.chip;
      document.querySelectorAll("[data-chip]").forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.chip === selectedChip)); });
      document.getElementById("preview").innerHTML = previewHTML(selectedChip);
      return;
    }
    if (el.dataset.size) {
      draft.size = el.dataset.size;
      document.querySelectorAll("[data-size]").forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.size === draft.size)); });
      validateStart();
      return;
    }
    if (el.dataset.cond) {
      var c = el.dataset.cond;
      draft.touchedCond = true;
      if (c === "none") draft.conditions = [];
      else {
        var i = draft.conditions.indexOf(c);
        if (i >= 0) draft.conditions.splice(i, 1); else draft.conditions.push(c);
      }
      document.querySelectorAll("[data-cond]").forEach(function (b) {
        var on = b.dataset.cond === "none" ? draft.conditions.length === 0 : draft.conditions.indexOf(b.dataset.cond) >= 0;
        b.setAttribute("aria-pressed", String(on));
      });
      return;
    }
    var act = el.dataset.act;
    if (act === "back") {
      if (history.length > 1) history.back(); else go("#/home");
    } else if (act === "profile") {
      go(!loadProfile() ? "#/start/new" : confirmedThisVisit ? "#/start/edit" : "#/start");
    } else if (act === "weight-unknown" || act === "weight-known") {
      draft.name = document.getElementById("f-name").value;
      if (act === "weight-unknown") { draft.weight = (document.getElementById("f-weight") || {}).value || ""; draft.unknown = true; }
      else draft.unknown = false;
      drawStartForm(location.hash.indexOf("edit") >= 0);
    } else if (act === "browse") {
      browsing = true; confirmedThisVisit = false; go("#/home");
    } else if (act === "confirm") {
      confirmedThisVisit = true; go("#/home");
    } else if (act === "edit") {
      confirmedThisVisit = true; go("#/start/edit");
    } else if (act === "new") {
      go("#/start/new");
    } else if (act === "forget") {
      clearProfile(); confirmedThisVisit = false; browsing = true; toast("이 기기에서 아이 정보를 지웠어요"); go("#/home");
    }
  });

  document.addEventListener("input", function (e) {
    if (e.target.id === "f-weight") validateStart();
  });

  document.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target.id === "search-form") {
      var q = document.getElementById("q").value.trim();
      if (!q) return;
      go("#/search?q=" + encodeURIComponent(q));
      return;
    }
    if (e.target.id === "start-form") {
      var name = document.getElementById("f-name").value.trim().slice(0, 10);
      var p = { name: name || "", conditions: draft.conditions.slice(), savedAt: new Date().toISOString() };
      if (draft.unknown) { if (!draft.size) return; p.size = draft.size; }
      else { var w = readWeight(); if (!w) return; p.weight = w; }
      saveProfile(p);
      confirmedThisVisit = true;
      browsing = false;
      toast(dogName(p) + " 정보를 저장했어요");
      go("#/home");
    }
  });

  window.addEventListener("hashchange", route);
  route();
})();

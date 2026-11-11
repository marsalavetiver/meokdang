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
    ok:    { label: "줘도 돼요",        lead: "건강한 아이에게는 괜찮다고 알려져 있어요." },
    cond:  { label: "조건 지키면 돼요", lead: "아래 조건을 지키면 괜찮다고 알려져 있어요." },
    warn:  { label: "안 주는 게 좋아요", lead: "조금은 괜찮을 수 있지만, 일부러 주는 건 권하지 않아요." },
    no:    { label: "절대 안 돼요",     lead: "조금만 먹어도 위험할 수 있어요. 아이 손이 닿지 않는 곳에 두어 주세요." },
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
  function badge(v, text) { return '<span class="badge ' + v + '">' + esc(text || VERDICT[v].label) + "</span>"; }
  function chev() { return '<svg class="chev" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
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

  function urgentLink(sub) {
    return '<a class="urgent-link" href="#/ate"><span class="u"><b>이미 먹은 게 있어요</b><span>' + esc(sub) + "</span></span>" + chev() + "</a>";
  }

  function header(opts) {
    opts = opts || {};
    var p = activeProfile();
    var left = opts.back
      ? '<button class="icon-btn" data-act="back" aria-label="뒤로">' + backIcon() + "</button>"
      : "";
    var logo = '<a class="logo" href="#/home" aria-label="먹어도 댕? 홈">' + pawSVG() + "<span>먹어도 댕?</span></a>";
    var chip = p
      ? '<button class="profile-chip" data-act="profile" aria-label="아이 정보 바꾸기: ' + esc(dogName(p)) + '"><span class="dot">' + pawSVG() + "</span>" + esc(dogName(p)) + (p.weight ? " · " + p.weight + "kg" : "") + "</button>"
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
      '<section class="start-hero">' +
        dogSVG("mark") +
        '<h1 class="st5 b">' + (editing ? "아이 정보를 바꿀게요" : "오늘 누구의 음식을<br>확인할까요?") + "</h1>" +
        '<p class="t6 muted">이름과 몸무게를 알려주시면 아이 몸에 맞춰 하루 최대량을 알려드려요. 정보는 이 기기에만 저장돼요.</p>' +
      "</section>" +
      '<form id="start-form" novalidate>' +
        '<div class="field"><label class="label" for="f-name">아이 이름</label>' +
          '<div class="input"><input id="f-name" maxlength="10" autocomplete="off" placeholder="예: 콩이" value="' + esc(d.name) + '"></div></div>' +
        '<div class="field"><span class="label">몸무게</span>' + weightField + "</div>" +
        '<div class="field"><span class="label">아픈 곳이 있나요?</span><span class="hint">여러 개 고를 수 있어요. 고르면 그 아이에게 맞춰 더 조심스럽게 알려드려요.</span>' +
          '<div class="chips" role="group" aria-label="아픈 곳">' + condChips + "</div></div>" +
        '<div class="actions">' +
          '<button class="btn btn-primary" type="submit" id="start-go">' + (editing ? "저장하기" : "확인하러 가기") + "</button>" +
          (editing
            ? '<button class="btn btn-ghost" type="button" data-act="forget">이 기기에서 정보 지우기</button>'
            : '<button class="btn btn-ghost" type="button" data-act="browse">입력 없이 둘러볼게요</button>') +
        "</div>" +
      "</form>" +
      urgentLink("입력 없이 바로 할 일을 알려드려요"),
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
      '<section class="start-hero">' +
        '<h1 class="st5 b">다시 오셨네요, 보호자님</h1>' +
        '<p class="t6 muted">오늘도 ' + esc(josa(dogName(p), "이", "")) + "의 음식을 확인할까요?</p>" +
      "</section>" +
      '<div class="card saved" style="margin-top:24px"><div class="avatar">' + dogSVG() + "</div>" +
        "<dl><dt>" + esc(dogName(p)) + "</dt><dd>" + esc(profileSummary(p)) + "</dd></dl></div>" +
      '<p class="t7 muted" style="margin:12px 4px 0">몸무게가 바뀌었다면 정보를 고쳐 주세요. 양이 달라져요.</p>' +
      '<div class="actions">' +
        '<button class="btn btn-primary" data-act="confirm">' + esc(josa(dogName(p), "이", "")) + " 맞아요</button>" +
        '<button class="btn btn-secondary" data-act="edit">정보 바꾸기</button>' +
        '<button class="btn btn-ghost" data-act="new">다른 아이예요</button>' +
      "</div>" +
      urgentLink("입력 없이 바로 할 일을 알려드려요"),
      { hidden: true, title: "시작" }
    );
  }

  /* ---------- 화면: 홈 ---------- */
  var selectedChip = null;

  function viewHome() {
    var p = activeProfile();
    var who = p ? esc(josa(dogName(p), "이에게", "에게")) : "우리 아이에게";
    var chips = DATA.popular.map(function (n) {
      var f = BY_NAME[n];
      return '<button class="chip" data-chip="' + f.id + '" aria-pressed="' + (selectedChip === f.id) + '"><span class="vdot ' + foodVerdict(f, p) + '" aria-hidden="true"></span>' + esc(n) + "</button>";
    }).join("");
    var season = DATA.season.items.map(function (n) {
      var f = BY_NAME[n];
      var v = foodVerdict(f, p);
      return '<a class="tile" href="#/food/' + f.id + '"><span class="name">' + esc(n) + "</span>" + badge(v, v === "warn" && p && personalize(f, bestState(f, p), p).by.length ? josa(dogName(p), "이는", "는") + " 피하기" : null) + "</a>";
    }).join("");

    render(
      '<section class="home-hero"><h1 class="st5 b">' + who + "<br>주고 싶은 음식이 있나요?</h1>" + dogSVG("dog") + "</section>" +
      '<form class="search" id="search-form" role="search">' +
        '<label class="input">' + searchIcon() + '<input id="q" type="search" enterkeyhint="search" autocomplete="off" placeholder="음식 이름을 써 주세요 (예: 황태)" aria-label="음식 검색"></label>' +
      "</form>" +
      '<section class="section"><h2 class="section-title">많이 물어본 음식</h2>' +
        '<div class="chips scroll" role="group" aria-label="많이 물어본 음식">' + chips + "</div>" +
        '<div class="preview" id="preview" aria-live="polite">' + previewHTML(selectedChip) + "</div>" +
      "</section>" +
      '<section class="section"><h2 class="section-title">' + esc(DATA.season.title) + "</h2>" +
        '<div class="season">' + season + "</div></section>" +
      urgentLink("바로 할 일을 알려드려요"),
      { title: "홈" }
    );
  }

  function previewHTML(id) {
    if (!id) return '<p class="t7 muted" style="margin:4px 2px 0">음식을 누르면 여기에서 바로 알려드려요.</p>';
    var f = BY_ID[id];
    var p = activeProfile();
    var v = foodVerdict(f, p);
    return '<a class="card preview-card" href="#/food/' + f.id + '">' +
      '<div class="row"><span class="name">' + esc(f.name) + "</span>" + badge(v) + "</div>" +
      "<p>" + esc(shortReason(f, p)) + "</p>" +
      '<span class="more">자세히 보기</span></a>';
  }

  /* ---------- 화면: 검색 결과 ---------- */
  function viewSearch(q) {
    var p = activeProfile();
    var list = search(q);
    var body;
    if (!list.length) {
      body = '<div class="empty-state">' + dogSVG("mark") +
        '<h2 class="t5 b" style="margin:12px 0 0">찾는 음식이 아직 없나요?</h2>' +
        "<p>알려주시면 빨리 챙겨둘게요.<br>급하다면 수의사 선생님께 먼저 물어봐 주세요.</p>" +
        '<a class="btn btn-secondary" href="' + REQUEST_URL + '?title=' + encodeURIComponent("음식 추가 요청: " + q) + '" target="_blank" rel="noopener">이 음식 알려주기</a>' +
        urgentLink("바로 할 일을 알려드려요") + "</div>";
    } else {
      body = '<p class="t7 muted" style="margin:8px 0 0">' + list.length + "개를 찾았어요</p>" +
        '<ul class="result-list">' + list.map(function (f) {
          var v = foodVerdict(f, p);
          return '<li><a href="#/food/' + f.id + '"><span class="txt"><span class="name">' + esc(f.name) + '</span><br><span class="sub">' + esc(f.states.map(function (s) { return s.state; }).join(" · ")) + "</span></span>" + badge(v) + chev() + "</a></li>";
        }).join("") + "</ul>";
    }
    render(
      '<div class="result-head"><form class="search" id="search-form" role="search" style="margin-top:0">' +
        '<label class="input">' + searchIcon() + '<input id="q" type="search" enterkeyhint="search" autocomplete="off" value="' + esc(q) + '" aria-label="음식 검색"></label></form></div>' +
      body,
      { back: true, title: "‘" + q + "’ 검색" }
    );
  }

  /* ---------- 화면: 판정 카드 ---------- */
  function amountBlock(state, p) {
    var a = state.amount;
    if (!a) return "";
    if (!a.s) return '<div class="amount"><div class="k">하루 최대</div><div class="v">' + esc(a.raw) + "</div></div>";
    var band = bandOf(p);
    var note = a.note ? '<div class="note">' + esc(a.note) + " 기준</div>" : "";
    if (band) {
      var basis = p.weight ? p.weight + "kg" : BANDS[band].label;
      return '<div class="amount"><div class="k">' + esc(dogName(p)) + "(" + esc(basis) + ") 몸무게에는</div>" +
        '<div class="v">하루 최대 ' + esc(a[band]) + "</div>" + note +
        '<div class="bands" aria-label="크기별 하루 최대량">' + ["s", "m", "l"].map(function (k) {
          return '<div class="' + (k === band ? "me" : "") + '"><div class="bn">' + BANDS[k].label + '</div><div class="bv st10 b">' + esc(a[k]) + "</div></div>";
        }).join("") + "</div></div>";
    }
    return '<div class="amount"><div class="k">크기별 하루 최대량</div>' +
      '<div class="bands">' + ["s", "m", "l"].map(function (k) {
        return '<div><div class="bn">' + BANDS[k].label + '</div><div class="bv">' + esc(a[k]) + '</div><div class="bw">' + BANDS[k].range + "</div></div>";
      }).join("") + "</div>" + note + "</div>";
  }

  function stateBlock(food, state, p, primary) {
    var pv = personalize(food, state, p);
    var v = pv.verdict;
    var downgraded = pv.verdict !== state.verdict;
    var label = downgraded ? josa(dogName(p), "이는", "는") + " 피하기" : VERDICT[v].label;
    var html = '<section class="verdict ' + v + '" aria-label="' + esc(state.state) + " 판정: " + esc(label) + '">' +
      '<div class="state">' + badge(v, label) + '<span class="state-name">' + esc(state.state) + "</span></div>";
    if (downgraded) {
      var c = CONDITIONS[pv.by[0]];
      html += '<p class="lead">' + esc(c.subject + " " + josa(dogName(p), "이에게는", "에게는")) + " 권하지 않아요.</p>" +
        '<p class="why">' + esc(c.reason) + " 이 음식은 피하는 게 좋다고 알려져 있어요. 건강한 아이 기준 판정은 '" + VERDICT[state.verdict].label + "'예요.</p>";
    } else {
      html += '<p class="lead">' + esc(VERDICT[v].lead) + "</p>";
      if (state.caution) html += '<p class="why">' + esc(state.caution) + "</p>";
    }
    if (!downgraded && pv.by.length && (v === "warn" || v === "no")) {
      html += '<p class="personal"><b>' + esc(CONDITIONS[pv.by[0]].subject + " " + dogName(p)) + "</b>에게는 특히 더 조심해 주세요.</p>";
    }
    if (v === "ok" || v === "cond") {
      html += amountBlock(state, p);
      html += '<dl class="how">' +
        (state.prep ? "<dt>이렇게 주세요</dt><dd>" + esc(state.prep) + "</dd>" : "") +
        "</dl>" +
        '<p class="first-time">처음 먹는 음식이라면 절반만 주고, 다음 날 응가 상태를 살펴봐 주세요. 이상하면 바로 멈춰 주세요.</p>';
    } else if (state.prep && v === "warn") {
      html += '<dl class="how"><dt>꼭 줘야 한다면</dt><dd>' + esc(state.prep) + "</dd></dl>";
    }
    if (v === "no") {
      html += '<a class="btn ' + (v === "no" ? "btn-danger" : "btn-secondary") + ' ate-btn" href="#/ate/' + food.id + '">이미 먹었어요</a>';
    }
    return html + "</section>";
  }

  function viewFood(id) {
    var food = BY_ID[id];
    if (!food) return viewNotFound();
    var p = activeProfile();
    var hits = (p && p.conditions || []).filter(function (c) { return food.flags.indexOf(c) >= 0; });
    var states = food.states.slice().sort(function (a, b) {
      return RANK[personalize(food, b, p).verdict] - RANK[personalize(food, a, p).verdict];
    });
    // 금지가 있는 음식은 위험을 먼저 보여준다(상태별로 다를 때는 줄 수 있는 상태 먼저).
    var overall = foodVerdict(food, p);
    if (overall === "no") states = food.states;

    var html = '<div class="food-head"><span class="cat">' + CATEGORY[food.category] + "</span>" +
      '<h1 class="t2 b">' + esc(food.name) + "</h1>" +
      (food.states.length > 1 ? '<p class="t7 muted" style="margin:4px 0 0">부위와 조리 상태에 따라 판정이 달라요. ' + food.states.length + "가지로 나눠 알려드려요.</p>" : "") +
      "</div>";

    if (hits.length) {
      html += '<div class="vet-first"><strong>수의사 선생님 안내가 먼저예요</strong>' +
        esc(hits.map(function (c) { return CONDITIONS[c].subject; }).join(", ") + " " + josa(dogName(p), "이", "")) +
        "라면, 아래 내용보다 다니는 병원의 식단 안내를 먼저 따라 주세요.</div>";
    }

    html += stateBlock(food, states[0], p, true);

    if (states.length > 1) {
      html += '<section class="other-states"><h2 class="section-title">다른 상태는 이래요</h2>' +
        states.slice(1).map(function (s) { return stateBlock(food, s, p, false); }).join("") + "</section>";
    }

    if (!p) {
      html += '<a class="profile-cta" href="#/start/new">' + pawSVG().replace("<svg", '<svg width="28" height="28"') +
        "<div><b>우리 아이 몸무게로 볼까요?</b><span>이름과 몸무게를 넣으면 아이에게 맞는 양만 보여드려요.</span></div>" +
        '<span class="go">넣기</span></a>';
    }

    var srcs = [];
    food.states.forEach(function (s) { s.sources.forEach(function (x) { if (srcs.indexOf(x) < 0) srcs.push(x); }); });
    html += '<section class="evidence"><b>이렇게 판단했어요</b>' +
      "<ul>" + srcs.map(function (s) {
        var key = s.replace(/\s*\(.*\)$/, "").trim();
        var url = SOURCES[key];
        if (key === "확인 필요") return "<li>국내 자료로 한 번 더 확인하고 있어요. 그래서 더 조심스럽게 판정했어요.</li>";
        return "<li>" + (url ? '<a href="' + url + '" target="_blank" rel="noopener">' + esc(s) + "</a>" : esc(s)) + "</li>";
      }).join("") + "</ul>" +
      '<p class="check-note">두 곳 이상의 자료에서 확인했고, 자료가 엇갈리면 더 조심스러운 쪽으로 정했어요. 양은 권하는 양이 아니라 넘지 않아야 할 하루 최대치예요.</p>' +
      '<div class="row"><span>마지막 검토 ' + esc(DATA.reviewedAt.replace(/-/g, ".")) + "</span>" +
      '<a class="report" href="' + REPORT_URL + "?title=" + encodeURIComponent("정보 확인 요청: " + food.name) + '" target="_blank" rel="noopener">정보가 이상해요 →</a></div>' +
      "</section>";

    render(html, { back: true, title: food.name });
  }

  /* ---------- 화면: 먹었을 때 대처 ---------- */
  function viewAte(id) {
    var food = id ? BY_ID[id] : null;
    var dangerous = food ? food.states.filter(function (s) { return s.verdict === "no" || s.verdict === "warn"; }) : [];
    var foodNote = "";
    if (food && dangerous.length) {
      foodNote = '<div class="card food-warn"><div class="state" style="display:flex;gap:8px;align-items:center">' + badge(foodVerdict(food, null)) +
        '<b class="st10">' + esc(food.name) + "</b></div>" +
        dangerous.map(function (s) { return '<p class="st11" style="margin:8px 0 0;color:#4e5968"><b style="color:#191f28">' + esc(s.state) + "</b> · " + esc(s.caution || "") + "</p>"; }).join("") +
        "</div>";
    }
    render(
      '<section class="emergency-head"><h1 class="t4 b">많이 놀라셨죠.</h1>' +
        '<p class="t6">지금 괜찮아 보여도 <b>바로 동물병원에 연락해 주세요.</b> 증상이 늦게 나타나는 음식이 많아요.</p></section>' +
      foodNote +
      '<ol class="steps">' +
        "<li><b>동물병원에 전화하기</b><p>다니던 병원이 닫았다면 24시 동물병원에 연락해 주세요.</p>" +
          '<a class="btn btn-danger" href="' + VET_SEARCH_URL + '" target="_blank" rel="noopener">가까운 24시 동물병원 찾기</a></li>' +
        "<li><b>전화하기 전에 확인해 두기</b><p>병원에서 꼭 물어보는 것들이에요.</p>" +
          '<div class="memo">' +
            ["무엇을 먹었는지 (포장지가 있으면 챙기기)", "얼마나 먹었는지", "언제 먹었는지", "아이 몸무게"].map(function (t, i) {
              return '<label><input type="checkbox" id="m' + i + '"> ' + esc(t) + "</label>";
            }).join("") +
          "</div></li>" +
        "<li><b>병원 안내 전에는 하지 말아 주세요</b>" +
          '<ul class="dont t6"><li>억지로 토하게 하기 (소금물, 손가락 넣기)</li><li>우유나 다른 음식 먹이기</li><li>사람 약 먹이기</li></ul></li>' +
      "</ol>" +
      '<p class="t7 muted">이 화면은 아이 상태를 판단하지 않아요. 아이 상태는 꼭 수의사 선생님이 확인해 주세요.</p>',
      { back: true, title: "먹었을 때" }
    );
  }

  function viewNotFound() {
    render('<div class="empty-state">' + dogSVG("mark") + '<h1 class="t5 b">페이지를 찾지 못했어요</h1><p>주소가 바뀌었을 수 있어요.</p><a class="btn btn-primary" href="#/home">홈으로 가기</a></div>', { title: "없는 페이지" });
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
    if (top === "food") return viewFood(parts[1]);
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

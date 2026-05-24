const sampleFileCandidates = [
  [
    "Rawデータサンプル/日別_表.csv",
    "Rawデータサンプル/IA用ダウンロードツール_日別_表.csv"
  ],
  [
    "Rawデータサンプル/CP × 日別_表.csv",
    "Rawデータサンプル/CP × 日別.csv",
    "Rawデータサンプル/IA用ダウンロードツール_CP × 日別_表.csv"
  ],
  [
    "Rawデータサンプル/Job × 日別_表.csv",
    "Rawデータサンプル/Job × 日別.csv",
    "Rawデータサンプル/IA用ダウンロードツール_Job × 日別_表.csv"
  ]
];

const DASHBOARD_API_BASE = "https://dashboard.e-stat.go.jp/api/1.0/Json";
const ESTAT_API_BASE = "https://api.e-stat.go.jp/rest/3.0/app/json";
const MARKET_DATA_BASIS = {
  actual2020: {
    key: "actual2020",
    label: "2020実績",
    badge: "実績値",
    year: 2020,
    source: "actual"
  },
  estimate2025: {
    key: "estimate2025",
    label: "2025推計",
    badge: "推計値",
    year: 2025,
    source: "projection"
  },
  estimate2026: {
    key: "estimate2026",
    label: "2026推計",
    badge: "推計値",
    year: 2026,
    source: "projection"
  }
};
const DEFAULT_MARKET_DATA_BASIS = "estimate2026";
const MARKET_DATA_BASIS_ORDER = ["estimate2026", "estimate2025", "actual2020"];
const MARKET_POPULATION_INDICATORS = {
  total: "0201010000000010000",
  male: "0201010100000010000",
  female: "0201010200000010000",
  age10_14: "0201010020000010030",
  age15_19: "0201010020000010040",
  age20_24: "0201010020000010050",
  age25_29: "0201010020000010060",
  age30_34: "0201010020000010070",
  age35_39: "0201010020000010080",
  age40_44: "0201010020000010090",
  age45_49: "0201010020000010100",
  age50_54: "0201010020000010110",
  age55_59: "0201010020000010120",
  age60_64: "0201010020000010130",
  age60Plus: "0201010040000010030",
  maleAge10_14: "0201010120000010030",
  maleAge15_19: "0201010120000010040",
  maleAge20_24: "0201010120000010050",
  maleAge25_29: "0201010120000010060",
  maleAge30_34: "0201010120000010070",
  maleAge35_39: "0201010120000010080",
  maleAge40_44: "0201010120000010090",
  maleAge45_49: "0201010120000010100",
  maleAge50_54: "0201010120000010110",
  maleAge55_59: "0201010120000010120",
  maleAge60_64: "0201010120000010130",
  maleAge60Plus: "0201010140000010030",
  femaleAge10_14: "0201010220000010030",
  femaleAge15_19: "0201010220000010040",
  femaleAge20_24: "0201010220000010050",
  femaleAge25_29: "0201010220000010060",
  femaleAge30_34: "0201010220000010070",
  femaleAge35_39: "0201010220000010080",
  femaleAge40_44: "0201010220000010090",
  femaleAge45_49: "0201010220000010100",
  femaleAge50_54: "0201010220000010110",
  femaleAge55_59: "0201010220000010120",
  femaleAge60_64: "0201010220000010130",
  femaleAge60Plus: "0201010240000010030"
};
const MARKET_PROJECTION_INDICATORS = {
  total: "0201130020000010000",
  male: "0201130120000010000",
  female: "0201130220000010000",
  age10_14: "0201130020000010030",
  age15_19: "0201130020000010040",
  age20_24: "0201130020000010050",
  age25_29: "0201130020000010060",
  age30_34: "0201130020000010070",
  age35_39: "0201130020000010080",
  age40_44: "0201130020000010090",
  age45_49: "0201130020000010100",
  age50_54: "0201130020000010110",
  age55_59: "0201130020000010120",
  age60_64: "0201130020000010130",
  age60Plus: ["0201130020000010130", "0201130020000010140", "0201130020000010150", "0201130020000010160", "0201130020000010170", "0201130020000010180", "0201130020000010200", "0201130020000010205"],
  maleAge10_14: "0201130120000010030",
  maleAge15_19: "0201130120000010040",
  maleAge20_24: "0201130120000010050",
  maleAge25_29: "0201130120000010060",
  maleAge30_34: "0201130120000010070",
  maleAge35_39: "0201130120000010080",
  maleAge40_44: "0201130120000010090",
  maleAge45_49: "0201130120000010100",
  maleAge50_54: "0201130120000010110",
  maleAge55_59: "0201130120000010120",
  maleAge60_64: "0201130120000010130",
  maleAge60Plus: ["0201130120000010130", "0201130120000010140", "0201130120000010150", "0201130120000010160", "0201130120000010170", "0201130120000010180", "0201130120000010200", "0201130120000010205"],
  femaleAge10_14: "0201130220000010030",
  femaleAge15_19: "0201130220000010040",
  femaleAge20_24: "0201130220000010050",
  femaleAge25_29: "0201130220000010060",
  femaleAge30_34: "0201130220000010070",
  femaleAge35_39: "0201130220000010080",
  femaleAge40_44: "0201130220000010090",
  femaleAge45_49: "0201130220000010100",
  femaleAge50_54: "0201130220000010110",
  femaleAge55_59: "0201130220000010120",
  femaleAge60_64: "0201130220000010130",
  femaleAge60Plus: ["0201130220000010130", "0201130220000010140", "0201130220000010150", "0201130220000010160", "0201130220000010170", "0201130220000010180", "0201130220000010200", "0201130220000010205"]
};
const MARKET_AGE_GROUPS = [
  { label: "10-19", keys: ["age10_14", "age15_19"], color: "#2f65d9" },
  { label: "20-29", keys: ["age20_24", "age25_29"], color: "#0c8a78" },
  { label: "30-39", keys: ["age30_34", "age35_39"], color: "#d8614a" },
  { label: "40-49", keys: ["age40_44", "age45_49"], color: "#b7791f" },
  { label: "50-59", keys: ["age50_54", "age55_59"], color: "#64748b" },
  { label: "60-64", keys: ["age60_64"], color: "#7c3aed" }
];
const TARGET_DETAIL_BAR_COLORS = {
  population: "#3b82d6",
  homemaker: "#d66f55",
  student: "#4f6fd6",
  senior: "#7657d6"
};
const ADDRESS_STATION_TYPES = [
  { type: "train_station", label: "駅", keyword: "駅" },
  { type: "subway_station", label: "地下鉄", keyword: "地下鉄" },
  { type: "transit_station", label: "交通拠点", keyword: "交通機関" },
  { type: "bus_station", label: "バス停", keyword: "バス停" }
];
const ADDRESS_LANDMARK_TYPES = [
  { type: "shopping_mall", label: "商業施設", keyword: "ショッピングモール" },
  { type: "supermarket", label: "スーパー", keyword: "スーパー" },
  { type: "department_store", label: "百貨店", keyword: "百貨店" },
  { type: "school", label: "学校", keyword: "学校" },
  { type: "university", label: "大学", keyword: "大学" },
  { type: "hospital", label: "病院", keyword: "病院" },
  { type: "city_hall", label: "公共施設", keyword: "市役所" },
  { type: "tourist_attraction", label: "集客施設", keyword: "観光施設" },
  { type: "park", label: "公園", keyword: "公園" }
];
const ADDRESS_BULK_SEARCH_LIMIT = 20;
const ADDRESS_BULK_MAPS_TIMEOUT_MS = 15000;
const ADDRESS_BULK_MAPS_STALL_MS = 22000;
const ADDRESS_BULK_GEOCODE_TIMEOUT_MS = 9000;
const ADDRESS_BULK_PLACES_TIMEOUT_MS = 14000;
const GOOGLE_MAPS_LOAD_TIMEOUT_MS = 12000;
const GOOGLE_MAPS_RENDER_STALL_MS = 16000;
const GOOGLE_MAPS_READY_POLL_MS = 120;
const ADDRESS_BULK_PROGRESS_TICK_MS = 1000;
const ADDRESS_BULK_PLACE_LIMIT = 3;
const MARKET_AGE_5_YEAR_GROUPS = [
  { label: "10-14", keys: ["age10_14"] },
  { label: "15-19", keys: ["age15_19"] },
  { label: "20-24", keys: ["age20_24"] },
  { label: "25-29", keys: ["age25_29"] },
  { label: "30-34", keys: ["age30_34"] },
  { label: "35-39", keys: ["age35_39"] },
  { label: "40-44", keys: ["age40_44"] },
  { label: "45-49", keys: ["age45_49"] },
  { label: "50-54", keys: ["age50_54"] },
  { label: "55-59", keys: ["age55_59"] },
  { label: "60-64", keys: ["age60_64"] }
];
const TARGET_SHIFT_TIME_BANDS = [
  { key: "early", label: "早朝(5-9)" },
  { key: "morning", label: "朝(9-12)" },
  { key: "day", label: "昼(12-17)" },
  { key: "evening", label: "夕(17-22)" },
  { key: "night", label: "深夜(22-5)" }
];
const TARGET_SHIFT_SEGMENTS = [
  {
    key: "student",
    label: "学生",
    sources: [
      { keys: ["age15_19"], factor: 0.55 },
      { keys: ["age20_24"], factor: 0.22 }
    ],
    rates: { early: 0.05, morning: 0.10, day: 0.10, evening: 0.50, night: 0.25 }
  },
  {
    key: "homemaker",
    label: "主婦/夫",
    sources: [
      { keys: ["age20_24", "age25_29", "age30_34", "age35_39", "age40_44", "age45_49", "age50_54", "age55_59"], factor: { all: 0.16, female: 0.30, male: 0.04 } }
    ],
    rates: { early: 0.20, morning: 0.55, day: 0.60, evening: 0.15, night: 0.02 }
  },
  {
    key: "senior",
    label: "シニア",
    sources: [
      { keys: ["age60_64"], factor: 0.55 }
    ],
    rates: { early: 0.35, morning: 0.30, day: 0.45, evening: 0.10, night: 0.02 }
  },
  {
    key: "freeter",
    label: "非正規",
    sources: [
      { keys: ["age20_24", "age25_29", "age30_34", "age35_39"], factor: 0.14 }
    ],
    rates: { early: 0.25, morning: 0.30, day: 0.40, evening: 0.50, night: 0.30 }
  },
  {
    key: "sidejob",
    label: "副業W",
    sources: [
      { keys: ["age20_24", "age25_29", "age30_34", "age35_39", "age40_44", "age45_49", "age50_54", "age55_59"], factor: 0.10 }
    ],
    rates: { early: 0.10, morning: 0.05, day: 0.03, evening: 0.20, night: 0.15 }
  }
];
const EMPLOYMENT_STATUS_SURVEY = {
  year: 2022,
  sourceName: "令和4年就業構造基本調査",
  tables: {
    educationStatus: "0004008412",
    householdIncome: "0004008427",
    sideJobEmployment: "0004008620",
    jobSeekingStatus: "0004008448"
  }
};
const CENSUS_LABOR_STATUS = {
  year: 2020,
  sourceName: "令和2年国勢調査",
  statsDataId: "0003450558"
};
const WAGE_STRUCTURE_SURVEY = {
  year: 2025,
  sourceName: "賃金構造基本統計調査",
  tables: {
    scheduledMonthly: "0004007160",
    shortTimeHourly: "0004007140"
  }
};
const WAGE_STRUCTURE_PREFECTURE_2025 = {
  "01000": { monthly: { all: 297100, male: 325200, female: 255800 }, hourly: { all: 1361, male: 1607, female: 1274 } },
  "02000": { monthly: { all: 263900, male: 290200, female: 229500 }, hourly: { all: 1213, male: 1359, female: 1169 } },
  "03000": { monthly: { all: 275000, male: 295100, female: 242000 }, hourly: { all: 1226, male: 1287, female: 1201 } },
  "04000": { monthly: { all: 313700, male: 348300, female: 257800 }, hourly: { all: 1375, male: 1548, female: 1300 } },
  "05000": { monthly: { all: 275800, male: 298600, female: 242200 }, hourly: { all: 1161, male: 1202, female: 1145 } },
  "06000": { monthly: { all: 272200, male: 302100, female: 233700 }, hourly: { all: 1203, male: 1303, female: 1168 } },
  "07000": { monthly: { all: 293600, male: 323600, female: 244500 }, hourly: { all: 1202, male: 1224, female: 1194 } },
  "08000": { monthly: { all: 330700, male: 361800, female: 271200 }, hourly: { all: 1718, male: 2264, female: 1465 } },
  "09000": { monthly: { all: 317700, male: 346200, female: 264600 }, hourly: { all: 1416, male: 1745, female: 1309 } },
  "10000": { monthly: { all: 308400, male: 333800, female: 260400 }, hourly: { all: 1417, male: 1659, female: 1319 } },
  "11000": { monthly: { all: 325400, male: 353700, female: 275200 }, hourly: { all: 1480, male: 1759, female: 1367 } },
  "12000": { monthly: { all: 339100, male: 369800, female: 286800 }, hourly: { all: 1488, male: 1650, female: 1428 } },
  "13000": { monthly: { all: 418300, male: 459100, female: 349900 }, hourly: { all: 1779, male: 1990, female: 1672 } },
  "14000": { monthly: { all: 368600, male: 406300, female: 305500 }, hourly: { all: 1819, male: 2452, female: 1567 } },
  "15000": { monthly: { all: 291800, male: 318800, female: 248700 }, hourly: { all: 1285, male: 1417, female: 1232 } },
  "16000": { monthly: { all: 304800, male: 334500, female: 255200 }, hourly: { all: 1420, male: 1610, female: 1340 } },
  "17000": { monthly: { all: 305600, male: 337600, female: 255900 }, hourly: { all: 1328, male: 1350, female: 1320 } },
  "18000": { monthly: { all: 301600, male: 336500, female: 250300 }, hourly: { all: 1311, male: 1407, female: 1273 } },
  "19000": { monthly: { all: 317300, male: 348000, female: 265200 }, hourly: { all: 1597, male: 2183, female: 1361 } },
  "20000": { monthly: { all: 308900, male: 338200, female: 259300 }, hourly: { all: 1310, male: 1422, female: 1265 } },
  "21000": { monthly: { all: 311800, male: 343000, female: 253800 }, hourly: { all: 1397, male: 1629, female: 1319 } },
  "22000": { monthly: { all: 314500, male: 347300, female: 258700 }, hourly: { all: 1420, male: 1740, female: 1309 } },
  "23000": { monthly: { all: 341600, male: 368800, female: 280300 }, hourly: { all: 1452, male: 1569, female: 1407 } },
  "24000": { monthly: { all: 321100, male: 354500, female: 260800 }, hourly: { all: 1427, male: 1622, female: 1362 } },
  "25000": { monthly: { all: 327000, male: 352700, female: 277800 }, hourly: { all: 1372, male: 1474, female: 1329 } },
  "26000": { monthly: { all: 337400, male: 369800, female: 288700 }, hourly: { all: 1580, male: 1782, female: 1489 } },
  "27000": { monthly: { all: 348900, male: 380300, female: 299100 }, hourly: { all: 1658, male: 1918, female: 1539 } },
  "28000": { monthly: { all: 334900, male: 366000, female: 279200 }, hourly: { all: 1448, male: 1555, female: 1413 } },
  "29000": { monthly: { all: 321800, male: 348000, female: 283300 }, hourly: { all: 1587, male: 2166, female: 1397 } },
  "30000": { monthly: { all: 301900, male: 331700, female: 253800 }, hourly: { all: 1292, male: 1430, female: 1239 } },
  "31000": { monthly: { all: 278700, male: 298100, female: 252000 }, hourly: { all: 1486, male: 2026, female: 1259 } },
  "32000": { monthly: { all: 282600, male: 305300, female: 249300 }, hourly: { all: 1343, male: 1336, female: 1345 } },
  "33000": { monthly: { all: 300600, male: 330700, female: 254400 }, hourly: { all: 1357, male: 1588, female: 1280 } },
  "34000": { monthly: { all: 320200, male: 351800, female: 264600 }, hourly: { all: 1333, male: 1378, female: 1317 } },
  "35000": { monthly: { all: 306700, male: 334400, female: 255200 }, hourly: { all: 1273, male: 1349, female: 1243 } },
  "36000": { monthly: { all: 305900, male: 338900, female: 265500 }, hourly: { all: 1356, male: 1524, female: 1297 } },
  "37000": { monthly: { all: 310100, male: 339200, female: 263100 }, hourly: { all: 1271, male: 1329, female: 1249 } },
  "38000": { monthly: { all: 290800, male: 320800, female: 242600 }, hourly: { all: 1299, male: 1495, female: 1210 } },
  "39000": { monthly: { all: 285800, male: 315300, female: 253600 }, hourly: { all: 1340, male: 1464, female: 1291 } },
  "40000": { monthly: { all: 314300, male: 347000, female: 264800 }, hourly: { all: 1424, male: 1690, female: 1320 } },
  "41000": { monthly: { all: 279700, male: 308200, female: 241300 }, hourly: { all: 1325, male: 1689, female: 1201 } },
  "42000": { monthly: { all: 284600, male: 313100, female: 248300 }, hourly: { all: 1365, male: 1370, female: 1363 } },
  "43000": { monthly: { all: 291000, male: 319300, female: 247800 }, hourly: { all: 1265, male: 1389, female: 1226 } },
  "44000": { monthly: { all: 295200, male: 325100, female: 254800 }, hourly: { all: 1234, male: 1353, female: 1200 } },
  "45000": { monthly: { all: 268300, male: 296800, female: 235700 }, hourly: { all: 1274, male: 1355, female: 1249 } },
  "46000": { monthly: { all: 289300, male: 314700, female: 252400 }, hourly: { all: 1272, male: 1329, female: 1251 } },
  "47000": { monthly: { all: 277400, male: 295600, female: 254600 }, hourly: { all: 1263, male: 1285, female: 1254 } }
};
const TARGET_STATS_VERSION = "20260522-wage-age-bars";
const PREFECTURE_MINIMUM_WAGES_2025 = {
  "01000": 1075,
  "02000": 1029,
  "03000": 1031,
  "04000": 1038,
  "05000": 1031,
  "06000": 1032,
  "07000": 1033,
  "08000": 1074,
  "09000": 1068,
  "10000": 1063,
  "11000": 1141,
  "12000": 1140,
  "13000": 1226,
  "14000": 1225,
  "15000": 1050,
  "16000": 1062,
  "17000": 1054,
  "18000": 1053,
  "19000": 1052,
  "20000": 1061,
  "21000": 1065,
  "22000": 1097,
  "23000": 1140,
  "24000": 1087,
  "25000": 1080,
  "26000": 1122,
  "27000": 1177,
  "28000": 1116,
  "29000": 1051,
  "30000": 1045,
  "31000": 1030,
  "32000": 1033,
  "33000": 1047,
  "34000": 1085,
  "35000": 1043,
  "36000": 1046,
  "37000": 1036,
  "38000": 1033,
  "39000": 1023,
  "40000": 1057,
  "41000": 1030,
  "42000": 1031,
  "43000": 1034,
  "44000": 1035,
  "45000": 1023,
  "46000": 1026,
  "47000": 1023
};
const MARKET_JOB_OPENING_RATIO_INDICATOR = "0301020001000010010";
const MARKET_REGION_CURRENT_TO_DATE = "999912";
let googleMapsLoadPromise = null;
const targetCityPopulationCache = new Map();
const targetCityRegionCache = new Map();
const marketStatsCache = new Map();
const targetAnalysisStatsCache = new Map();
const estatMetaCache = new Map();
const estatDataCache = new Map();
const PREFECTURE_NAMES = {
  "01": "北海道",
  "02": "青森県",
  "03": "岩手県",
  "04": "宮城県",
  "05": "秋田県",
  "06": "山形県",
  "07": "福島県",
  "08": "茨城県",
  "09": "栃木県",
  "10": "群馬県",
  "11": "埼玉県",
  "12": "千葉県",
  "13": "東京都",
  "14": "神奈川県",
  "15": "新潟県",
  "16": "富山県",
  "17": "石川県",
  "18": "福井県",
  "19": "山梨県",
  "20": "長野県",
  "21": "岐阜県",
  "22": "静岡県",
  "23": "愛知県",
  "24": "三重県",
  "25": "滋賀県",
  "26": "京都府",
  "27": "大阪府",
  "28": "兵庫県",
  "29": "奈良県",
  "30": "和歌山県",
  "31": "鳥取県",
  "32": "島根県",
  "33": "岡山県",
  "34": "広島県",
  "35": "山口県",
  "36": "徳島県",
  "37": "香川県",
  "38": "愛媛県",
  "39": "高知県",
  "40": "福岡県",
  "41": "佐賀県",
  "42": "長崎県",
  "43": "熊本県",
  "44": "大分県",
  "45": "宮崎県",
  "46": "鹿児島県",
  "47": "沖縄県"
};
const PREFECTURE_LIST = Object.entries(PREFECTURE_NAMES).map(([code, name]) => ({
  code: `${code}000`,
  shortCode: code,
  name
}));
const PREFECTURE_REGION_GROUPS = [
  { label: "北海道・東北", codes: ["01000", "02000", "03000", "04000", "05000", "06000", "07000"] },
  { label: "関東", codes: ["08000", "09000", "10000", "11000", "12000", "13000", "14000"] },
  { label: "信越・北陸", codes: ["15000", "16000", "17000", "18000", "19000", "20000"] },
  { label: "東海", codes: ["21000", "22000", "23000", "24000"] },
  { label: "近畿", codes: ["25000", "26000", "27000", "28000", "29000", "30000"] },
  { label: "中国", codes: ["31000", "32000", "33000", "34000", "35000"] },
  { label: "四国", codes: ["36000", "37000", "38000", "39000"] },
  { label: "九州・沖縄", codes: ["40000", "41000", "42000", "43000", "44000", "45000", "46000", "47000"] }
];
const TARGET_ALL_PREFECTURES_KEY = "__all_prefectures__";
const TARGET_PREFECTURE_CITY_KEY = "__prefecture__";
const TARGET_GEMINI_TIP_LIMIT = 12;
const TARGET_PRINT_TIP_LIMIT = 6;

function createAddressBulkState() {
  return {
    open: false,
    input: "",
    loading: false,
    error: "",
    results: []
  };
}

function createMarketState() {
  return {
    query: "",
    dataBasis: DEFAULT_MARKET_DATA_BASIS,
    selectedRegionCode: "",
    regionOptions: [],
    stats: null,
    targetStats: null,
    targetError: "",
    targetLoading: false,
    targetStatsRegionCode: "",
    loading: false,
    error: "",
    bulk: createAddressBulkState()
  };
}

const state = {
  raw: {
    daily: [],
    campaign: [],
    job: []
  },
  fileNames: [],
  activeTab: "monthly",
  filters: {
    startDate: "",
    endDate: "",
    campaign: "all",
    jobType: "all",
    employment: "all",
    salaryType: "all",
    area: "all",
    status: "all",
    keyword: ""
  },
  periods: {
    monthly: { startDate: "", endDate: "" },
    daily: { startDate: "", endDate: "" },
    campaign: { startDate: "", endDate: "" },
    job: { startDate: "", endDate: "" },
    salary: { startDate: "", endDate: "" }
  },
  profile: {
    clientName: "",
    budget: 0,
    targetCpa: 0
  },
  sorts: {
    job: {
      key: "applications",
      direction: "desc"
    },
    city: {
      key: "applications",
      direction: "desc"
    },
    company: {
      key: "cost",
      direction: "desc"
    }
  },
  cpPeriod: {
    startMonth: "",
    endMonth: ""
  },
  simulation: {
    budgets: ["", "", ""]
  },
  sidebarMarket: createMarketState(),
  jobMarket: {
    selectedJobKey: "",
    selectedPrefectureCode: "",
    dataBasis: DEFAULT_MARKET_DATA_BASIS,
    selectedRegionCode: "",
    regionOptions: [],
    accountRegions: [],
    accountSignature: "",
    stats: null,
    loading: false,
    error: ""
  },
  targetAnalysis: {
    selectedJobKey: "",
    selectedPrefectureCode: "",
    selectedCityKey: "",
    dataBasis: DEFAULT_MARKET_DATA_BASIS,
    selectedRegionCode: "",
    regionOptions: [],
    stats: null,
    comparisons: [],
    cityStats: [],
    cityStatsLoading: false,
    cityStatsSignature: "",
    requestId: 0,
    loading: false,
    error: "",
    targetGender: "female",
    targetAgeGroups: ["20-29", "30-39"],
    commuteKm: "10",
    controlsCollapsed: false,
    customStrategyTips: {},
    geminiStrategyTips: {
      signature: "",
      tips: [],
      loading: false,
      error: ""
    }
  },
  reportNotes: ""
};

const dom = {};
const STORAGE_KEY = "generic-recruit-dashboard";
const visibleTabs = ["monthly", "daily", "campaign", "job", "salary", "regionSearch", "market", "target"];
const JOB_MARKET_ACCOUNT_KEY = "__account__";
const SIMULATION_MONTH_COUNT = 3;
let floatingTableHeader = null;
let floatingHeaderSignature = "";
let floatingHeaderFrame = 0;
let targetPrefectureControlsSignature = "";
let targetCityControlsSignature = "";
let addressBulkSearchToken = 0;

document.addEventListener("DOMContentLoaded", () => {
  bindDom();
  loadState();
  bindEvents();
  hydrateInputs();
  restoreSidebarState();
  render();
});

function bindDom() {
  [
    "loadStatus",
    "sampleButton",
    "resetButton",
    "pdfButton",
    "targetAnalysisPdfButton",
    "simulationButton",
    "sidebarCloseButton",
    "sidebarOpenButton",
    "sidebarMarketOpenButton",
    "pdfButtonInline",
    "dropZone",
    "fileInput",
    "fileSummary",
    "clientDisplay",
    "clientNameInput",
    "budgetInput",
    "targetCpaInput",
    "startDate",
    "endDate",
    "period12Button",
    "period3Button",
    "cpStartMonth",
    "cpEndMonth",
    "jobTypeFilter",
    "employmentFilter",
    "areaFilter",
    "kpiCost",
    "kpiApplications",
    "kpiCpa",
    "kpiCtr",
    "kpiApplyRate",
    "kpiJobs",
    "costCompare",
    "applicationsCompare",
    "cpaCompare",
    "clicksCompare",
    "funnelCompare",
    "jobsCompare",
    "monthlyDetailChart",
    "monthlyRateChart",
    "dailyTrendChart",
    "weeklyRateChart",
    "monthlyTable",
    "monthlyCpaBars",
    "weeklyTable",
    "campaignTable",
    "campaignCpaBars",
    "bestJobCards",
    "jobTable",
    "jobTypeBars",
    "employmentBars",
    "jobSalaryBucketBars",
    "salaryTypeTable",
    "salaryBucketBars",
    "cityTable",
    "companyTable",
    "employmentTable",
    "sidebarMarketForm",
    "sidebarMarketAddressInput",
    "sidebarMarketSearchButton",
    "sidebarMarketClearButton",
    "sidebarMarketPdfButton",
    "sidebarMarketBulkToggleButton",
    "sidebarMarketBulkPanel",
    "sidebarMarketBulkInput",
    "sidebarMarketBulkSearchButton",
    "sidebarMarketBulkClearButton",
    "sidebarMarketBulkPdfButton",
    "sidebarMarketBulkStatus",
    "sidebarMarketBulkResult",
    "sidebarMarketRegionRow",
    "sidebarMarketRegionSelect",
    "sidebarMarketResult",
    "jobMarketJobSelect",
    "jobMarketRegionSelect",
    "jobMarketPrefectureButtons",
    "jobMarketStatusText",
    "jobMarketResult",
    "targetAnalysisControlPanel",
    "targetAnalysisToggleButton",
    "targetAnalysisControlBody",
    "targetAnalysisJobSelect",
    "targetAnalysisBasisSelect",
    "targetAnalysisGenderSelect",
    "targetAnalysisCommuteSelect",
    "targetAnalysisAgeGroups",
    "targetAnalysisPrefectureButtons",
    "targetAnalysisCitySelection",
    "targetAnalysisRegionRow",
    "targetAnalysisRegionSelect",
    "targetAnalysisStatusText",
    "targetAnalysisResult",
    "reportNotes",
    "reportPreview",
    "printReport",
    "simulationModal",
    "simulationClose",
    "simulationRunButton",
    "simulationSpreadsheetButton",
    "simulationMethodNote",
    "simulationResult",
    "simBudget1",
    "simBudget2",
    "simBudget3"
  ].forEach((id) => {
    dom[id] = document.getElementById(id);
  });
}

function bindEvents() {
  dom.fileInput.addEventListener("change", (event) => {
    readFiles([...event.target.files]);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dom.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dom.dropZone.classList.add("dragging");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dom.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dom.dropZone.classList.remove("dragging");
    });
  });

  dom.dropZone.addEventListener("drop", (event) => {
    readFiles([...event.dataTransfer.files]);
  });

  if (dom.sampleButton) dom.sampleButton.addEventListener("click", loadSampleFiles);
  dom.resetButton.addEventListener("click", resetDashboard);
  dom.pdfButton.addEventListener("click", printCurrentReport);
  if (dom.targetAnalysisPdfButton) dom.targetAnalysisPdfButton.addEventListener("click", printTargetAnalysisReport);
  if (dom.sidebarMarketPdfButton) dom.sidebarMarketPdfButton.addEventListener("click", printAddressMarketReport);
  if (dom.sidebarMarketBulkPdfButton) dom.sidebarMarketBulkPdfButton.addEventListener("click", printAddressBulkReport);
  dom.simulationButton.addEventListener("click", openSimulationModal);
  dom.pdfButtonInline.addEventListener("click", printCurrentReport);
  dom.simulationClose.addEventListener("click", closeSimulationModal);
  dom.simulationRunButton.addEventListener("click", () => {
    syncSimulationBudgets();
    renderSimulation();
    saveState();
  });
  dom.simulationSpreadsheetButton.addEventListener("click", downloadSimulationSpreadsheet);
  dom.simulationModal.addEventListener("click", (event) => {
    if (event.target === dom.simulationModal) closeSimulationModal();
  });
  [dom.simBudget1, dom.simBudget2, dom.simBudget3].forEach((input) => {
    input.addEventListener("input", () => {
      formatSimulationBudgetInput(input);
      syncSimulationBudgets();
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dom.simulationModal.classList.contains("hidden")) closeSimulationModal();
  });
  dom.sidebarCloseButton.addEventListener("click", () => setSidebarCollapsed(true));
  dom.sidebarOpenButton.addEventListener("click", () => setSidebarCollapsed(false));
  if (dom.sidebarMarketOpenButton) {
    dom.sidebarMarketOpenButton.addEventListener("click", openSidebarMarketPage);
  }
  window.addEventListener("scroll", scheduleFloatingTableHeaderUpdate, { passive: true });
  window.addEventListener("resize", scheduleFloatingTableHeaderUpdate);
  [dom.monthlyTable, dom.weeklyTable].forEach((container) => {
    if (container) container.addEventListener("scroll", scheduleFloatingTableHeaderUpdate, { passive: true });
  });
  [dom.jobTable, dom.cityTable, dom.companyTable].forEach((container) => {
    if (container) container.addEventListener("click", handleSortableTableClick);
  });
  if (dom.sidebarMarketForm) {
    dom.sidebarMarketForm.addEventListener("submit", (event) => {
      event.preventDefault();
      searchSidebarMarketRegion();
    });
  }
  if (dom.sidebarMarketAddressInput) {
    dom.sidebarMarketAddressInput.addEventListener("input", () => {
      state.sidebarMarket.query = dom.sidebarMarketAddressInput.value;
      saveState();
    });
  }
  if (dom.sidebarMarketBulkToggleButton) {
    dom.sidebarMarketBulkToggleButton.addEventListener("click", () => {
      const bulk = ensureAddressBulkState();
      bulk.open = !bulk.open;
      renderAddressBulkSearch();
      saveState();
      if (bulk.open) setTimeout(() => dom.sidebarMarketBulkInput?.focus(), 0);
    });
  }
  if (dom.sidebarMarketBulkInput) {
    dom.sidebarMarketBulkInput.addEventListener("input", () => {
      const bulk = ensureAddressBulkState();
      bulk.input = dom.sidebarMarketBulkInput.value;
      bulk.error = "";
      renderAddressBulkSearch();
      saveState();
    });
  }
  if (dom.sidebarMarketBulkSearchButton) {
    dom.sidebarMarketBulkSearchButton.addEventListener("click", searchAddressBulk);
  }
  if (dom.sidebarMarketBulkClearButton) {
    dom.sidebarMarketBulkClearButton.addEventListener("click", () => {
      state.sidebarMarket.bulk = createAddressBulkState();
      state.sidebarMarket.bulk.open = true;
      renderAddressBulkSearch();
      saveState();
      dom.sidebarMarketBulkInput?.focus();
    });
  }
  if (dom.sidebarMarketRegionSelect) {
    dom.sidebarMarketRegionSelect.addEventListener("change", () => {
      state.sidebarMarket.selectedRegionCode = dom.sidebarMarketRegionSelect.value;
      fetchSelectedSidebarMarketStats();
    });
  }
  if (dom.sidebarMarketClearButton) {
    dom.sidebarMarketClearButton.addEventListener("click", () => {
      const bulk = ensureAddressBulkState();
      state.sidebarMarket = createMarketState();
      state.sidebarMarket.bulk = bulk;
      hydrateSidebarMarketInputs();
      renderSidebarMarket();
      saveState();
      dom.sidebarMarketAddressInput?.focus();
    });
  }
  if (dom.jobMarketJobSelect) {
    dom.jobMarketJobSelect.addEventListener("change", () => {
      state.jobMarket.selectedJobKey = dom.jobMarketJobSelect.value;
      state.jobMarket.selectedRegionCode = "";
      state.jobMarket.regionOptions = [];
      state.jobMarket.accountRegions = [];
      state.jobMarket.accountSignature = "";
      state.jobMarket.stats = null;
      fetchJobMarketForSelectedJob();
    });
  }
  if (dom.jobMarketRegionSelect) {
    dom.jobMarketRegionSelect.addEventListener("change", () => {
      state.jobMarket.selectedRegionCode = dom.jobMarketRegionSelect.value;
      fetchSelectedJobMarketStats();
    });
  }
  if (dom.jobMarketPrefectureButtons) {
    dom.jobMarketPrefectureButtons.addEventListener("click", (event) => {
      const button = event.target?.closest("button[data-prefecture-code]");
      if (!button) return;
      state.jobMarket.selectedPrefectureCode = button.dataset.prefectureCode || "";
      state.jobMarket.stats = null;
      state.jobMarket.error = "";
      renderJobMarket(getAnalytics("job"));
      fetchJobMarketPrefectureStats();
    });
  }
  if (dom.targetAnalysisJobSelect) {
    dom.targetAnalysisJobSelect.addEventListener("change", () => {
      state.targetAnalysis.selectedJobKey = dom.targetAnalysisJobSelect.value;
      resetTargetAnalysisRegion();
      fetchTargetAnalysisForSelectedJob();
    });
  }
  if (dom.targetAnalysisToggleButton) {
    dom.targetAnalysisToggleButton.addEventListener("click", () => {
      state.targetAnalysis.controlsCollapsed = !state.targetAnalysis.controlsCollapsed;
      renderTargetControlCollapsedState();
      saveState();
    });
  }
  if (dom.targetAnalysisBasisSelect) {
    dom.targetAnalysisBasisSelect.addEventListener("change", () => {
      state.targetAnalysis.dataBasis = normalizeMarketDataBasis(dom.targetAnalysisBasisSelect.value);
      resetTargetAnalysisRegion();
      fetchTargetAnalysisForSelectedPrefecture();
    });
  }
  if (dom.targetAnalysisGenderSelect) {
    dom.targetAnalysisGenderSelect.addEventListener("change", () => {
      state.targetAnalysis.targetGender = dom.targetAnalysisGenderSelect.value;
      refreshTargetAnalysisForSelectionChange();
    });
  }
  if (dom.targetAnalysisCommuteSelect) {
    dom.targetAnalysisCommuteSelect.addEventListener("change", () => {
      state.targetAnalysis.commuteKm = dom.targetAnalysisCommuteSelect.value;
      render();
      saveState();
    });
  }
  if (dom.targetAnalysisAgeGroups) {
    dom.targetAnalysisAgeGroups.addEventListener("change", () => {
      state.targetAnalysis.targetAgeGroups = checkedTargetAgeGroups();
      refreshTargetAnalysisForSelectionChange();
    });
  }
  if (dom.targetAnalysisPrefectureButtons) {
    dom.targetAnalysisPrefectureButtons.addEventListener("pointerdown", (event) => {
      const select = event.target?.closest("select[data-prefecture-select]");
      if (!select || state.targetAnalysis.selectedPrefectureCode !== TARGET_ALL_PREFECTURES_KEY) return;
      renderTargetPrefectureSelectionState("");
    });
    dom.targetAnalysisPrefectureButtons.addEventListener("click", (event) => {
      const button = event.target?.closest("button[data-target-all-prefectures]");
      if (!button) return;
      state.targetAnalysis.selectedPrefectureCode = TARGET_ALL_PREFECTURES_KEY;
      state.targetAnalysis.selectedCityKey = "";
      resetTargetAnalysisRegion();
      renderTargetAnalysis(getAnalytics("job"));
      fetchTargetAnalysisForSelectedPrefecture();
    });
    dom.targetAnalysisPrefectureButtons.addEventListener("change", (event) => {
      const select = event.target?.closest("select[data-prefecture-select]");
      if (!select || !select.value) return;
      state.targetAnalysis.selectedPrefectureCode = select.value;
      state.targetAnalysis.selectedCityKey = "";
      renderTargetPrefectureSelectionState(select.value);
      resetTargetAnalysisRegion();
      renderTargetAnalysis(getAnalytics("job"));
      fetchTargetAnalysisForSelectedPrefecture();
    });
  }
  if (dom.targetAnalysisCitySelection) {
    dom.targetAnalysisCitySelection.addEventListener("click", (event) => {
      const button = event.target?.closest("button[data-target-city-key]");
      if (!button) return;
      state.targetAnalysis.selectedCityKey = button.dataset.targetCityKey === TARGET_PREFECTURE_CITY_KEY
        ? ""
        : (button.dataset.targetCityKey || "");
      resetTargetAnalysisRegion();
      renderTargetAnalysis(getAnalytics("job"));
      fetchTargetAnalysisForSelectedPrefecture();
    });
    dom.targetAnalysisCitySelection.addEventListener("change", (event) => {
      const select = event.target?.closest("select[data-target-city-select]");
      if (!select) return;
      state.targetAnalysis.selectedCityKey = select.value === TARGET_PREFECTURE_CITY_KEY ? "" : select.value;
      resetTargetAnalysisRegion();
      renderTargetAnalysis(getAnalytics("job"));
      fetchTargetAnalysisForSelectedPrefecture();
    });
  }
  if (dom.targetAnalysisRegionSelect) {
    dom.targetAnalysisRegionSelect.addEventListener("change", () => {
      state.targetAnalysis.selectedRegionCode = dom.targetAnalysisRegionSelect.value;
      fetchSelectedTargetAnalysisStats();
    });
  }
  if (dom.targetAnalysisResult) {
    dom.targetAnalysisResult.addEventListener("input", handleTargetStrategyTipInput);
    dom.targetAnalysisResult.addEventListener("click", handleTargetStrategyTipClick);
  }
  if (dom.cpStartMonth) {
    dom.cpStartMonth.addEventListener("input", () => {
      state.cpPeriod.startMonth = dom.cpStartMonth.value;
      render();
      saveState();
    });
  }
  if (dom.cpEndMonth) {
    dom.cpEndMonth.addEventListener("input", () => {
      state.cpPeriod.endMonth = dom.cpEndMonth.value;
      render();
      saveState();
    });
  }

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tab;
      render();
      saveState();
    });
  });

  [
    "startDate",
    "endDate"
  ].forEach((id) => {
    dom[id].addEventListener("input", () => {
      const period = periodForTab(state.activeTab);
      period.startDate = dom.startDate.value;
      period.endDate = dom.endDate.value;
      state.filters = {
        ...state.filters,
        startDate: period.startDate,
        endDate: period.endDate,
        campaign: "all",
        jobType: "all",
        employment: "all",
        salaryType: "all",
        area: "all",
        status: "all",
        keyword: ""
      };
      render();
      saveState();
    });
  });

  dom.period12Button.addEventListener("click", () => applyRecentMonthsPreset(12));
  dom.period3Button.addEventListener("click", () => applyRecentMonthsPreset(3));

  dom.clientNameInput.addEventListener("input", () => {
    state.profile.clientName = dom.clientNameInput.value.trim();
    render();
    saveState();
  });

  dom.budgetInput.addEventListener("input", () => {
    state.profile.budget = numberFromText(dom.budgetInput.value);
    render();
    saveState();
  });

  dom.targetCpaInput.addEventListener("input", () => {
    state.profile.targetCpa = numberFromText(dom.targetCpaInput.value);
    render();
    saveState();
  });

  dom.reportNotes.addEventListener("input", () => {
    state.reportNotes = dom.reportNotes.value;
    renderReportPreview(getAnalytics());
    saveState();
  });
}

function setSidebarCollapsed(collapsed) {
  document.getElementById("appShell").classList.toggle("sidebar-collapsed", collapsed);
  localStorage.setItem("generic-recruit-sidebar-collapsed", collapsed ? "1" : "0");
}

function openSidebarMarketPage() {
  state.activeTab = "regionSearch";
  render();
  saveState();
  if (window.innerWidth <= 1100) setSidebarCollapsed(true);
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => dom.sidebarMarketAddressInput?.focus(), 0);
}

function restoreSidebarState() {
  const collapsed = localStorage.getItem("generic-recruit-sidebar-collapsed") === "1";
  document.getElementById("appShell").classList.toggle("sidebar-collapsed", collapsed);
}

async function readFiles(files) {
  if (!files.length) return;
  const nextRaw = { daily: [], campaign: [], job: [] };
  const names = [];

  for (const file of files) {
    const text = await readText(file);
    const parsed = parseCsv(text);
    const kind = detectKind(parsed.headers);
    if (kind) {
      nextRaw[kind].push(...normalizeRows(kind, parsed.rows));
      names.push(file.name);
    }
  }

  state.raw = nextRaw;
  state.fileNames = names;
  applyInferredProfile({ force: true });
  resetFiltersFromData();
  resetTargetAnalysisRegion();
  hydrateInputs();
  render();
  saveState();
}

async function loadSampleFiles() {
  try {
    const nextRaw = { daily: [], campaign: [], job: [] };
    const names = [];
    const bundledSamples = Array.isArray(window.sampleCsvFiles) ? window.sampleCsvFiles : [];
    let sampleSources = await loadSampleCsvSources();
    if (!sampleSources.length && bundledSamples.length) sampleSources = bundledSamples;
    if (!sampleSources.length) {
      dom.fileSummary.textContent = "公開版にはサンプルデータを同梱していません。CSVをドラッグしてください。";
      return;
    }

    for (const sample of sampleSources) {
      const parsed = parseCsv(sample.text);
      const kind = detectKind(parsed.headers);
      if (kind) {
        nextRaw[kind].push(...normalizeRows(kind, parsed.rows));
        names.push(sample.name);
      }
    }
    state.raw = nextRaw;
    state.fileNames = names;
    applyInferredProfile({ force: true });
    resetFiltersFromData();
    resetTargetAnalysisRegion();
    hydrateInputs();
    render();
    saveState();
  } catch (error) {
    dom.fileSummary.textContent = "サンプルを読み込めませんでした";
    console.error(error);
  }
}

async function loadSampleCsvSources() {
  const sources = [];
  for (const candidates of sampleFileCandidates) {
    const source = await fetchFirstSampleCandidate(candidates);
    if (source) sources.push(source);
  }
  return sources;
}

async function fetchFirstSampleCandidate(candidates) {
  for (const path of candidates) {
    try {
      const response = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) continue;
      return {
        name: path.split("/").pop(),
        text: await response.text()
      };
    } catch {
      // Try the next known filename.
    }
  }
  return null;
}

function resetDashboard() {
  state.raw = { daily: [], campaign: [], job: [] };
  state.fileNames = [];
  state.filters = {
    startDate: "",
    endDate: "",
    campaign: "all",
    jobType: "all",
    employment: "all",
    salaryType: "all",
    area: "all",
    status: "all",
    keyword: ""
  };
  state.periods = createEmptyPeriods();
  state.profile = { clientName: "", budget: 0, targetCpa: 0 };
  state.simulation = { budgets: ["", "", ""] };
  state.sidebarMarket = createMarketState();
  state.jobMarket = {
    selectedJobKey: "",
    selectedPrefectureCode: "",
    dataBasis: DEFAULT_MARKET_DATA_BASIS,
    selectedRegionCode: "",
    regionOptions: [],
    accountRegions: [],
    accountSignature: "",
    stats: null,
    loading: false,
    error: ""
  };
  state.targetAnalysis = {
    selectedJobKey: "",
    selectedPrefectureCode: "",
    selectedCityKey: "",
    dataBasis: DEFAULT_MARKET_DATA_BASIS,
    selectedRegionCode: "",
    regionOptions: [],
    stats: null,
    comparisons: [],
    cityStats: [],
    cityStatsLoading: false,
    cityStatsSignature: "",
    requestId: 0,
    loading: false,
    error: "",
    targetGender: "female",
    targetAgeGroups: ["20-29", "30-39"],
    commuteKm: "10",
    controlsCollapsed: false,
    customStrategyTips: {},
    geminiStrategyTips: {
      signature: "",
      tips: [],
      loading: false,
      error: ""
    }
  };
  state.reportNotes = "";
  localStorage.removeItem(STORAGE_KEY);
  hydrateInputs();
  render();
}

async function readText(file) {
  const buffer = await file.arrayBuffer();
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    return new TextDecoder("shift-jis").decode(buffer);
  }
}

function parseCsv(text) {
  const clean = String(text ?? "").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < clean.length; index += 1) {
    const char = clean[index];
    const next = clean[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => cleanText(value))) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some((value) => cleanText(value))) rows.push(row);
  const headers = rows.shift() ?? [];
  return {
    headers,
    rows: rows.map((values) => {
      const item = {};
      headers.forEach((header, index) => {
        item[cleanText(header)] = values[index] ?? "";
      });
      return item;
    })
  };
}

function detectKind(headers) {
  const names = new Set(headers.map(cleanText));
  if (names.has("Job ID") || names.has("求人") || names.has("給与額")) return "job";
  if (names.has("Campaign ID") || names.has("CP設定金額") || names.has("advertiser_name")) return "campaign";
  if (names.has("日") && names.has("費用") && names.has("求人数")) return "daily";
  return "";
}

function normalizeRows(kind, rows) {
  return rows
    .map((row) => {
      const date = normalizeDate(row["日"]);
      const base = {
        kind,
        date,
        impressions: numberFromText(row["表示回数"]),
        clicks: numberFromText(row["クリック数"]),
        starts: numberFromText(row["応募開始数"]),
        applications: numberFromText(row["応募数"]),
        cost: numberFromText(row["費用"]),
        jobCount: numberFromText(row["求人数"])
      };

      if (kind === "daily") return base;

      if (kind === "campaign") {
        return {
          ...base,
          campaignId: cleanText(row["Campaign ID"]),
          campaign: cleanText(row["キャンペーン"]) || "未分類",
          employerId: cleanText(row["Employer ID"]),
          advertiser: cleanText(row["advertiser_name"]),
          salesOwner: cleanText(row["Sales担当者名"]),
          ocampType: cleanText(row["OCAMP Type"]),
          campaignBudget: numberFromText(row["CP設定金額"])
        };
      }

      const prefecture = cleanText(row["都道府県"]) || "未分類";
      const city = normalizeJobCity(prefecture, row["市区町村"]);
      return {
        ...base,
        referenceNo: cleanText(row["参照番号"]),
        jobId: cleanText(row["Job ID"]),
        campaignId: cleanText(row["Campaign ID"]),
        campaign: cleanText(row["キャンペーン"]) || "未分類",
        jobTitle: cleanText(row["求人"]) || "未分類",
        prefecture,
        city,
        company: cleanText(row["企業名"]) || "未分類",
        jobUrl: cleanText(row["求人URL"]),
        jobType: cleanText(row["職種中"]) || "未分類",
        employment: normalizeEmployment(row["雇用形態"]),
        salaryType: cleanText(row["給与タイプ"]) || "未分類",
        salaryAmount: numberFromText(row["給与額"]),
        status: cleanText(row["CPステータス（指標）"]) || "未分類"
      };
    })
    .filter((row) => row.date);
}

function normalizeEmployment(value) {
  const text = cleanText(value);
  const map = {
    commission: "業務委託",
    contract: "契約社員",
    parttime: "アルバイト・パート",
    fulltime: "正社員"
  };
  return map[text] ?? (text || "未分類");
}

function normalizeJobCity(prefecture, value) {
  const pref = cleanText(prefecture);
  const city = cleanText(value);
  if (pref === "東京都" && isTokyoWholeAreaName(city)) return "東京都";
  return city || "未分類";
}

function isTokyoWholeAreaName(value) {
  const text = cleanText(value);
  return !text || text === "未分類" || text === "東京" || text === "東京都";
}

function applyInferredProfile(options = {}) {
  const client = inferClientName();
  if ((options.force || !state.profile.clientName) && client) state.profile.clientName = client;
  const budget = inferBudget();
  if ((options.force || !state.profile.budget) && budget) state.profile.budget = budget;
}

function inferClientName() {
  const advertiser = mostCommonText(state.raw.campaign.map((row) => row.advertiser).filter(Boolean));
  if (advertiser) {
    const parts = advertiser.split(/\s+for\s+/i);
    return cleanText(parts.at(-1)).replace(/株式会社\s*as.*/i, "株式会社");
  }

  const companies = state.raw.job.map((row) => row.company).filter(Boolean);
  const common = longestCommonCompanyPrefix(companies);
  return common || mostCommonText(companies);
}

function longestCommonCompanyPrefix(values) {
  if (!values.length) return "";
  const normalized = values.map((value) => cleanText(value).split(/[＿_]/)[0]);
  return mostCommonText(normalized);
}

function inferBudget() {
  const latestByCampaign = new Map();
  state.raw.campaign.forEach((row) => {
    if (!row.campaignBudget) return;
    const key = row.campaignId || row.campaign;
    const current = latestByCampaign.get(key);
    if (!current || row.date >= current.date) latestByCampaign.set(key, row);
  });
  return [...latestByCampaign.values()].reduce((sum, row) => sum + row.campaignBudget, 0);
}

function resetFiltersFromData() {
  const dates = allRows().map((row) => row.date).filter(Boolean).sort();
  const startDate = dates.length ? monthStartFromDate(dates[0]) : "";
  const endDate = dates.length ? monthEndFromDate(dates.at(-1)) : "";
  state.filters.startDate = startDate;
  state.filters.endDate = endDate;
  state.periods = createEmptyPeriods({ startDate, endDate });
  state.filters.campaign = "all";
  state.filters.jobType = "all";
  state.filters.employment = "all";
  state.filters.salaryType = "all";
  state.filters.area = "all";
  state.filters.status = "all";
  state.filters.keyword = "";
  state.cpPeriod.startMonth = dates.length ? dates[0].slice(0, 7) : "";
  state.cpPeriod.endMonth = dates.length ? dates.at(-1).slice(0, 7) : "";
}

function hydrateInputs() {
  ensurePeriodState();
  syncFiltersFromActivePeriod();
  dom.clientNameInput.value = state.profile.clientName;
  dom.budgetInput.value = state.profile.budget || "";
  dom.targetCpaInput.value = state.profile.targetCpa || "";
  fillFilterOptions();
  const period = periodForTab(state.activeTab);
  dom.startDate.value = period.startDate;
  dom.endDate.value = period.endDate;
  dom.reportNotes.value = state.reportNotes;
  hydrateSidebarMarketInputs();
  hydrateSimulationInputs();
}

function hydrateSidebarMarketInputs() {
  const bulk = ensureAddressBulkState();
  if (dom.sidebarMarketAddressInput && document.activeElement !== dom.sidebarMarketAddressInput) {
    dom.sidebarMarketAddressInput.value = state.sidebarMarket.query || "";
  }
  if (dom.sidebarMarketBulkInput && document.activeElement !== dom.sidebarMarketBulkInput) {
    dom.sidebarMarketBulkInput.value = bulk.input || "";
  }
  hydrateMarketRegionSelect({
    select: dom.sidebarMarketRegionSelect,
    row: dom.sidebarMarketRegionRow,
    stateObject: state.sidebarMarket,
    alwaysHideRow: true
  });
  renderAddressBulkSearch();
}

function hydrateSimulationInputs() {
  const budgets = Array.isArray(state.simulation?.budgets) ? state.simulation.budgets : ["", "", ""];
  [dom.simBudget1, dom.simBudget2, dom.simBudget3].forEach((input, index) => {
    if (input) input.value = formatSimulationBudgetValue(budgets[index]);
  });
}

function syncSimulationBudgets() {
  state.simulation.budgets = [dom.simBudget1, dom.simBudget2, dom.simBudget3].map((input) => input.value ? numberFromText(input.value) : "");
}

function formatSimulationBudgetInput(input) {
  const raw = numberFromText(input.value);
  input.value = raw ? formatNumber(raw) : "";
}

function formatSimulationBudgetValue(value) {
  const number = numberFromText(value);
  return number ? formatNumber(number) : "";
}

function openSimulationModal() {
  ensureSimulationBudgets();
  hydrateSimulationInputs();
  dom.simulationModal.classList.remove("hidden");
  dom.simulationModal.setAttribute("aria-hidden", "false");
  renderSimulation();
  const firstEmpty = [dom.simBudget1, dom.simBudget2, dom.simBudget3].find((input) => !numberFromText(input.value));
  (firstEmpty || dom.simulationRunButton).focus();
}

function closeSimulationModal() {
  syncSimulationBudgets();
  saveState();
  dom.simulationModal.classList.add("hidden");
  dom.simulationModal.setAttribute("aria-hidden", "true");
}

function ensureSimulationBudgets() {
  const current = Array.isArray(state.simulation?.budgets) ? state.simulation.budgets.map(numberFromText) : [];
  if (current.some((value) => value > 0)) return;
  const base = roundSimulationBudget(state.profile.budget || inferSimulationBaseBudget() || 1000000);
  state.simulation.budgets = [
    base,
    roundSimulationBudget(base * 1.25),
    roundSimulationBudget(base * 1.5)
  ];
}

function fillFilterOptions() {
  normalizePeriodOnlyFilters();
  fillMonthFilters();
}

function normalizePeriodOnlyFilters() {
  state.filters.campaign = "all";
  state.filters.jobType = "all";
  state.filters.employment = "all";
  state.filters.salaryType = "all";
  state.filters.area = "all";
  state.filters.status = "all";
  state.filters.keyword = "";
}

function fillCpPeriodFilters() {
  const months = unique(allRows().map((row) => row.date?.slice(0, 7)).filter(Boolean));
  state.cpPeriod.startMonth = normalizeCpMonthValue(state.cpPeriod.startMonth, months, "start");
  state.cpPeriod.endMonth = normalizeCpMonthValue(state.cpPeriod.endMonth, months, "end");
  fillCpMonthSelect(dom.cpStartMonth, months, state.cpPeriod.startMonth);
  fillCpMonthSelect(dom.cpEndMonth, months, state.cpPeriod.endMonth);
}

function fillCpMonthSelect(select, months, selected) {
  if (!months.length) {
    select.innerHTML = `<option value="">月を選択</option>`;
    select.value = "";
    return;
  }

  select.innerHTML = months
    .map((month) => `<option value="${month}">${escapeHtml(formatMonthSelectLabel(month))}</option>`)
    .join("");
  select.value = selected;
}

function normalizeCpMonthValue(value, months, boundary) {
  if (!months.length) return "";
  const fallbackMonth = boundary === "end" ? months.at(-1) : months[0];
  const month = String(value || fallbackMonth).slice(0, 7);
  return months.includes(month) ? month : fallbackMonth;
}

function fillMonthFilters() {
  const months = availableMonths();
  normalizePeriods(months);
  const period = periodForTab(state.activeTab);
  syncFiltersFromActivePeriod();
  fillMonthSelect(dom.startDate, months, period.startDate, "start");
  fillMonthSelect(dom.endDate, months, period.endDate, "end");
  renderPeriodPresetButtons(months, period);
}

function availableMonths() {
  return unique(allRows().map((row) => row.date?.slice(0, 7)).filter(Boolean));
}

function fillMonthSelect(select, months, selected, boundary) {
  if (!months.length) {
    select.innerHTML = `<option value="">月を選択</option>`;
    select.value = "";
    return;
  }

  select.innerHTML = months
    .map((month) => {
      const value = boundary === "end" ? monthEndFromMonth(month) : `${month}-01`;
      return `<option value="${value}">${escapeHtml(formatMonthSelectLabel(month))}</option>`;
    })
    .join("");
  select.value = selected;
}

function normalizeMonthFilterValue(value, months, boundary) {
  if (!months.length) return "";
  const fallbackMonth = boundary === "end" ? months.at(-1) : months[0];
  const month = String(value || fallbackMonth).slice(0, 7);
  const safeMonth = months.includes(month) ? month : fallbackMonth;
  return boundary === "end" ? monthEndFromMonth(safeMonth) : `${safeMonth}-01`;
}

function applyRecentMonthsPreset(monthCount) {
  const months = availableMonths();
  if (!months.length) return;
  const period = periodForTab(state.activeTab);
  const selectedEndMonth = String(period.endDate || "").slice(0, 7);
  const endMonth = months.includes(selectedEndMonth) ? selectedEndMonth : months.at(-1);
  const endIndex = months.indexOf(endMonth);
  const startIndex = Math.max(0, endIndex - monthCount + 1);
  period.startDate = `${months[startIndex]}-01`;
  period.endDate = monthEndFromMonth(months[endIndex]);
  state.filters = {
    ...state.filters,
    startDate: period.startDate,
    endDate: period.endDate,
    campaign: "all",
    jobType: "all",
    employment: "all",
    salaryType: "all",
    area: "all",
    status: "all",
    keyword: ""
  };
  render();
  saveState();
}

function renderPeriodPresetButtons(months, period) {
  const selectedCount = selectedMonthCount(months, period);
  const activeTab = canonicalTab(state.activeTab);
  const presetWrap = dom.period12Button?.closest(".period-presets");
  if (presetWrap) presetWrap.hidden = !["monthly", "daily"].includes(activeTab);
  [
    { button: dom.period12Button, months: 12, visible: activeTab === "monthly" },
    { button: dom.period3Button, months: 3, visible: activeTab === "daily" }
  ].forEach(({ button, months: monthCount, visible }) => {
    if (!button) return;
    button.hidden = !visible;
    button.disabled = !months.length;
    button.classList.toggle("active", selectedCount === monthCount);
  });
}

function selectedMonthCount(months, period) {
  if (!months.length || !period.startDate || !period.endDate) return 0;
  const startMonth = String(period.startDate).slice(0, 7);
  const endMonth = String(period.endDate).slice(0, 7);
  const startIndex = months.indexOf(startMonth);
  const endIndex = months.indexOf(endMonth);
  if (startIndex < 0 || endIndex < startIndex) return 0;
  return endIndex - startIndex + 1;
}

function fillSelect(select, values, allLabel, selected) {
  select.innerHTML = [`<option value="all">${escapeHtml(allLabel)}</option>`]
    .concat(values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`))
    .join("");
  select.value = values.includes(selected) ? selected : "all";
}

function render() {
  fillFilterOptions();
  renderStatus();
  renderTabs();
  const activeAnalytics = getAnalytics(state.activeTab);
  const monthlyAnalytics = getAnalytics("monthly");
  const weeklyAnalytics = getAnalytics("daily");
  const campaignAnalytics = getAnalytics("campaign");
  const jobAnalytics = getAnalytics("job");
  const areaAnalytics = getAnalytics("salary");
  renderKpis(activeAnalytics);
  renderMonthly(monthlyAnalytics);
  renderDaily(weeklyAnalytics);
  renderCampaign(campaignAnalytics);
  renderJob(jobAnalytics);
  renderSalary(areaAnalytics);
  renderArea(areaAnalytics);
  renderSidebarMarket();
  renderJobMarket(jobAnalytics);
  renderTargetAnalysis(jobAnalytics);
  renderReportPreview(activeAnalytics);
  scheduleFloatingTableHeaderUpdate();
}

function renderStatus() {
  const loaded = state.fileNames.length > 0;
  dom.loadStatus.textContent = loaded ? "CSV読込済み" : "CSV未読込";
  dom.loadStatus.classList.toggle("ready", loaded);
  if (dom.clientDisplay) {
    dom.clientDisplay.textContent = state.profile.clientName || "顧客名未設定";
  }
  if (loaded) {
    const counts = [
      `データ収納日別 ${state.raw.daily.length}`,
      `CP×日別 ${state.raw.campaign.length}`,
      `Job×日別 ${state.raw.job.length}`
    ];
    dom.fileSummary.textContent = counts.join("\n");
  } else {
    dom.fileSummary.textContent = "データ収納日別\nCP×日別\nJob×日別";
  }
}

function renderTabs() {
  normalizeActiveTab();
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${state.activeTab}`);
  });
  const activeTab = canonicalTab(state.activeTab);
  document.querySelector(".filter-band")?.toggleAttribute("hidden", ["market", "regionSearch", "target"].includes(activeTab));
  document.querySelector(".kpi-grid")?.classList.add("hidden");
  scheduleFloatingTableHeaderUpdate();
}

function normalizeActiveTab() {
  if (state.activeTab === "area") {
    state.activeTab = "salary";
  }
  if (state.activeTab === "market") {
    state.activeTab = "target";
  }
  if (!visibleTabs.includes(state.activeTab)) {
    state.activeTab = "monthly";
  }
}

function canonicalTab(tab = state.activeTab) {
  if (tab === "area") return "salary";
  return visibleTabs.includes(tab) ? tab : "monthly";
}

function createEmptyPeriods(period = { startDate: "", endDate: "" }) {
  return visibleTabs.reduce((result, tab) => {
    result[tab] = {
      startDate: period.startDate || "",
      endDate: period.endDate || ""
    };
    return result;
  }, {});
}

function ensurePeriodState() {
  if (!state.periods || typeof state.periods !== "object") {
    state.periods = createEmptyPeriods(state.filters);
  }
  visibleTabs.forEach((tab) => {
    const period = state.periods[tab] || {};
    state.periods[tab] = {
      startDate: period.startDate || state.filters.startDate || "",
      endDate: period.endDate || state.filters.endDate || ""
    };
  });
}

function periodForTab(tab = state.activeTab) {
  ensurePeriodState();
  return state.periods[canonicalTab(tab)];
}

function syncFiltersFromActivePeriod() {
  const period = periodForTab(state.activeTab);
  state.filters.startDate = period.startDate;
  state.filters.endDate = period.endDate;
}

function normalizePeriods(months) {
  ensurePeriodState();
  visibleTabs.forEach((tab) => {
    const period = state.periods[tab];
    period.startDate = normalizeMonthFilterValue(period.startDate, months, "start");
    period.endDate = normalizeMonthFilterValue(period.endDate, months, "end");
  });
}

function getAnalytics(tab = state.activeTab) {
  const hasData = state.raw.daily.length + state.raw.campaign.length + state.raw.job.length > 0;
  const period = periodForTab(tab);
  const filtered = {
    daily: state.raw.daily.filter((row) => filterDaily(row, period)),
    campaign: state.raw.campaign.filter((row) => filterCampaign(row, period)),
    job: state.raw.job.filter((row) => filterJob(row, period))
  };

  const hasDimensionFilter = false;

  const summaryRows = hasDimensionFilter && filtered.job.length ? filtered.job : filtered.daily.length ? filtered.daily : filtered.job.length ? filtered.job : filtered.campaign;
  const summary = summarize(summaryRows, filtered.job);
  const previous = getPreviousSummary(summaryRows);
  const yoy = getYoYSummary(summaryRows);

  const monthlyRows = hasDimensionFilter && filtered.job.length ? filtered.job : filtered.daily.length ? filtered.daily : filtered.job;
  const dailyRows = monthlyRows;

  const monthly = aggregateBy(monthlyRows, (row) => row.date.slice(0, 7)).sort((a, b) => a.name.localeCompare(b.name));
  const weekly = aggregateBy(dailyRows, (row) => tenDayKey(row.date)).sort((a, b) => a.startDate.localeCompare(b.startDate));
  const daily = aggregateBy(dailyRows, (row) => row.date).sort((a, b) => a.name.localeCompare(b.name));
  const campaigns = aggregateBy(filtered.job.length ? filtered.job : filtered.campaign, (row) => row.campaign).sort((a, b) => b.cost - a.cost);
  const campaignMonthlyRows = hasDimensionFilter ? filtered.job : filtered.campaign.length ? filtered.campaign : filtered.job;
  const campaignMonthly = aggregateBy(
    campaignMonthlyRows,
    (row) => `${row.date.slice(0, 7)}\u001f${row.campaign || "未分類"}`,
    enrichCampaignMonthlyGroup
  ).sort((a, b) => a.month.localeCompare(b.month) || a.campaign.localeCompare(b.campaign, "ja"));
  const jobs = aggregateBy(filtered.job, (row) => row.jobTitle, enrichJobGroup).sort((a, b) => b.applications - a.applications || b.cost - a.cost);
  const jobTypes = aggregateBy(filtered.job, (row) => row.jobType).sort((a, b) => b.cost - a.cost);
  const employments = aggregateBy(filtered.job, (row) => row.employment).sort((a, b) => b.cost - a.cost);
  const salaryTypes = aggregateBy(filtered.job, (row) => row.salaryType, enrichSalaryGroup).sort((a, b) => b.cost - a.cost);
  const salaryBuckets = aggregateBy(filtered.job, salaryBucketLabel).filter((item) => item.name !== "未分類").sort(sortBySalaryBucket);
  const cities = aggregateBy(filtered.job, jobAreaAggregationName).sort((a, b) => b.applications - a.applications || b.cost - a.cost);
  const companies = aggregateBy(filtered.job, (row) => formatCompanyLocationName(row.company)).sort((a, b) => b.cost - a.cost);

  return {
    hasData,
    filtered,
    summary,
    previous,
    yoy,
    monthly,
    weekly,
    daily,
    campaigns,
    campaignMonthly,
    jobs,
    jobTypes,
    employments,
    salaryTypes,
    salaryBuckets,
    cities,
    companies,
    insights: createInsights({ summary, previous, yoy, monthly, campaigns, jobs, jobTypes, salaryTypes, cities }),
    period: periodLabel(summaryRows)
  };
}

function filterDaily(row, period = periodForTab()) {
  return filterDate(row, period);
}

function filterCampaign(row, period = periodForTab()) {
  if (!filterDate(row, period)) return false;
  return true;
}

function filterJob(row, period = periodForTab()) {
  if (!filterDate(row, period)) return false;
  return true;
}

function filterDate(row, period = periodForTab()) {
  if (period.startDate && row.date < period.startDate) return false;
  if (period.endDate && row.date > period.endDate) return false;
  return true;
}

function summarize(rows, jobRows = []) {
  const total = rows.reduce(
    (acc, row) => {
      acc.impressions += row.impressions;
      acc.clicks += row.clicks;
      acc.starts += row.starts;
      acc.applications += row.applications;
      acc.cost += row.cost;
      acc.jobCount += row.jobCount || 0;
      return acc;
    },
    emptyMetrics()
  );
  const uniqueJobs = unique((jobRows.length ? jobRows : rows).map((row) => row.jobId || row.jobTitle).filter(Boolean)).length;
  if (uniqueJobs) total.jobCount = uniqueJobs;
  return finalize(total);
}

function emptyMetrics() {
  return {
    impressions: 0,
    clicks: 0,
    starts: 0,
    applications: 0,
    cost: 0,
    jobCount: 0
  };
}

function finalize(item) {
  return {
    ...item,
    ctr: safeDivide(item.clicks, item.impressions),
    startRate: safeDivide(item.starts, item.clicks),
    completionRate: safeDivide(item.applications, item.starts),
    applyRate: safeDivide(item.applications, item.clicks),
    displayUnit: safeDivide(item.cost, item.impressions),
    cpc: safeDivide(item.cost, item.clicks),
    cpaStart: safeDivide(item.cost, item.starts),
    cpa: safeDivide(item.cost, item.applications),
    eCpm: safeDivide(item.cost * 1000, item.impressions),
    jobUnitCost: safeDivide(item.cost, item.jobCount)
  };
}

function aggregateBy(rows, keyFn, enrichFn) {
  const map = new Map();
  rows.forEach((row) => {
    const name = keyFn(row) || "未分類";
    const item = map.get(name) ?? { name, ...emptyMetrics(), rows: [] };
    item.impressions += row.impressions;
    item.clicks += row.clicks;
    item.starts += row.starts;
    item.applications += row.applications;
    item.cost += row.cost;
    item.jobCount += row.jobCount || 0;
    item.rows.push(row);
    if (name.includes(" - ")) {
      const [startDate, endDate] = name.split(" - ");
      item.startDate = startDate;
      item.endDate = endDate;
    }
    map.set(name, item);
  });
  return [...map.values()].map((item) => {
    const uniqueJobs = unique(item.rows.map((row) => row.jobId || row.jobTitle).filter(Boolean)).length;
    if (uniqueJobs) item.jobCount = uniqueJobs;
    const finalized = finalize(item);
    return enrichFn ? enrichFn(finalized) : finalized;
  });
}

function enrichJobGroup(item) {
  const sample = item.rows[0] ?? {};
  return {
    ...item,
    campaign: mostCommonText(item.rows.map((row) => row.campaign)),
    prefecture: mostCommonText(item.rows.map((row) => row.prefecture)),
    city: mostCommonText(item.rows.map((row) => row.city)),
    company: formatCompanyLocationName(mostCommonText(item.rows.map((row) => row.company))),
    jobType: mostCommonText(item.rows.map((row) => row.jobType)),
    employment: mostCommonText(item.rows.map((row) => row.employment)),
    salaryType: mostCommonText(item.rows.map((row) => row.salaryType)),
    salaryAmount: sample.salaryAmount || 0,
    jobUrl: mostCommonText(item.rows.map((row) => row.jobUrl).filter(Boolean)) || sample.jobUrl || "",
    deliveryMonths: formatDeliveryMonths(item.rows),
    bestPerformanceMonth: formatBestPerformanceMonth(item.rows),
    status: mostCommonText(item.rows.map((row) => row.status))
  };
}

function enrichCampaignMonthlyGroup(item) {
  const [month, campaign] = item.name.split("\u001f");
  return {
    ...item,
    month: month || "",
    campaign: campaign || "未分類",
    name: campaign || "未分類"
  };
}

function enrichSalaryGroup(item) {
  const salaries = item.rows.map((row) => row.salaryAmount).filter(Boolean).sort((a, b) => a - b);
  return {
    ...item,
    minSalary: salaries[0] || 0,
    medianSalary: percentile(salaries, 0.5),
    maxSalary: salaries.at(-1) || 0
  };
}

function salaryBucketLabel(row) {
  if (!row.salaryAmount) return "未分類";
  if (row.salaryType === "時給") {
    if (row.salaryAmount < 1000) return "時給 1,000円未満";
    if (row.salaryAmount < 1200) return "時給 1,000-1,199円";
    if (row.salaryAmount < 1400) return "時給 1,200-1,399円";
    return "時給 1,400円以上";
  }
  if (row.salaryAmount < 220000) return "月給 22万円未満";
  if (row.salaryAmount < 260000) return "月給 22-25.9万円";
  if (row.salaryAmount < 300000) return "月給 26-29.9万円";
  return "月給 30万円以上";
}

function sortBySalaryBucket(a, b) {
  return salaryBucketOrder(a.name) - salaryBucketOrder(b.name);
}

function salaryBucketOrder(name) {
  const order = [
    "時給 1,000円未満",
    "時給 1,000-1,199円",
    "時給 1,200-1,399円",
    "時給 1,400円以上",
    "月給 22万円未満",
    "月給 22-25.9万円",
    "月給 26-29.9万円",
    "月給 30万円以上"
  ];
  return order.indexOf(name) >= 0 ? order.indexOf(name) : 999;
}

function getPreviousSummary(rows) {
  const dates = rows.map((row) => row.date).filter(Boolean).sort();
  if (!dates.length) return null;
  const start = parseDate(dates[0]);
  const end = parseDate(dates.at(-1));
  const days = Math.max(1, Math.round((end - start) / 86400000) + 1);
  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setDate(prevStart.getDate() - days + 1);
  const prevRows = allRowsForSummary(rows).filter((row) => row.date >= toIsoDate(prevStart) && row.date <= toIsoDate(prevEnd));
  return prevRows.length ? summarize(prevRows) : null;
}

function getYoYSummary(rows) {
  const dates = rows.map((row) => row.date).filter(Boolean).sort();
  if (!dates.length) return null;
  const start = parseDate(dates[0]);
  const end = parseDate(dates.at(-1));
  start.setFullYear(start.getFullYear() - 1);
  end.setFullYear(end.getFullYear() - 1);
  const yoyRows = allRowsForSummary(rows).filter((row) => row.date >= toIsoDate(start) && row.date <= toIsoDate(end));
  return yoyRows.length ? summarize(yoyRows) : null;
}

function allRowsForSummary(currentRows) {
  if (currentRows.some((row) => row.kind === "job")) return state.raw.job;
  if (currentRows.some((row) => row.kind === "campaign")) return state.raw.campaign;
  return state.raw.daily;
}

function renderKpis(analytics) {
  const { summary, previous, yoy } = analytics;
  const budget = Number(state.profile.budget) || 0;
  const targetCpa = Number(state.profile.targetCpa) || 0;

  dom.kpiCost.textContent = formatCurrency(summary.cost);
  dom.kpiApplications.textContent = formatNumber(summary.applications);
  dom.kpiCpa.textContent = summary.cpa ? formatCurrency(summary.cpa) : "-";
  dom.kpiCtr.textContent = formatPercent(summary.ctr);
  dom.kpiApplyRate.textContent = formatPercent(summary.applyRate);
  dom.kpiJobs.textContent = formatNumber(summary.jobCount);

  dom.costCompare.textContent = budget ? `予算比 ${formatPercent(summary.cost / budget)}` : compareLabel(summary.cost, previous?.cost, "前期間");
  dom.applicationsCompare.textContent = compareLabel(summary.applications, previous?.applications, "前期間");
  dom.cpaCompare.textContent = targetCpa ? `目標比 ${formatPercent(safeDivide(summary.cpa, targetCpa))}` : compareLabel(summary.cpa, previous?.cpa, "前期間", true);
  dom.clicksCompare.textContent = `${formatNumber(summary.clicks)}クリック / ${compareLabel(summary.clicks, previous?.clicks, "前期間")}`;
  dom.funnelCompare.textContent = `開始率 ${formatPercent(summary.startRate)} / 完了率 ${formatPercent(summary.completionRate)}`;
  dom.jobsCompare.textContent = yoy ? `前年同期間 ${formatNumber(yoy.jobCount)}` : "前年同期間なし";

  setKpiTone(document.getElementById("costCard"), budget && summary.cost <= budget, budget && summary.cost > budget);
  setKpiTone(document.getElementById("applicationsCard"), previous && summary.applications >= previous.applications, previous && summary.applications < previous.applications);
  setKpiTone(document.getElementById("cpaCard"), targetCpa && summary.cpa <= targetCpa, targetCpa && summary.cpa > targetCpa);
}

function setKpiTone(card, good, warn) {
  card.classList.toggle("good", Boolean(good));
  card.classList.toggle("warn", Boolean(warn));
}

function renderMonthly(analytics) {
  const monthlyChartOptions = {
    xKey: "name",
    width: 980,
    height: 460,
    topPad: 22,
    bottomPad: 86,
    tightCostAxis: true,
    costScalePadding: 1.05
  };
  if (dom.monthlyDetailChart) dom.monthlyDetailChart.innerHTML = createTrendSvg(analytics.monthly, monthlyChartOptions);
  if (dom.monthlyRateChart) dom.monthlyRateChart.innerHTML = createRateTrendSvg(analytics.monthly, monthlyChartOptions);
  renderMonthlyDetailTable(dom.monthlyTable, analytics.monthly);
  if (dom.monthlyCpaBars) {
    renderBars(dom.monthlyCpaBars, analytics.monthly.filter((item) => item.applications > 0), "cpa", { lowerIsBetter: true, valueType: "currency" });
  }
}

function renderDaily(analytics) {
  const weeklyChartOptions = {
    xKey: "name",
    width: 980,
    height: 460,
    topPad: 22,
    bottomPad: 92,
    labelFormatter: formatTenDayChartLabel,
    tightCostAxis: true,
    costScalePadding: 1.05,
    barWidthRatio: 0.76,
    barMinWidth: 28,
    barMaxWidth: 76
  };
  if (dom.dailyTrendChart) dom.dailyTrendChart.innerHTML = createTrendSvg(analytics.weekly, weeklyChartOptions);
  if (dom.weeklyRateChart) {
    dom.weeklyRateChart.innerHTML = createRateTrendSvg(analytics.weekly, {
      ...weeklyChartOptions,
      includeCtr: true,
      applyRateColor: "#84cc16"
    });
  }
  renderWeeklyDetailTable(dom.weeklyTable, analytics.weekly);
}

function renderCampaign(analytics) {
  renderCampaignMonthlyTable(dom.campaignTable, filterCampaignMonthlyPeriod(analytics.campaignMonthly));
}

function filterCampaignMonthlyPeriod(rows) {
  return rows;
}

function renderJob(analytics) {
  renderBestJobs(dom.bestJobCards, analytics.jobs);
  renderSortableTable(dom.jobTable, analytics.jobs, jobDetailColumns(), state.sorts.job, "job-detail-table");
  renderBars(dom.jobTypeBars, analytics.jobTypes, "cost", { valueType: "costAndApps", limit: 5 });
  renderBars(dom.employmentBars, analytics.employments, "cost", { valueType: "costAndApps", limit: 5 });
  renderBars(dom.jobSalaryBucketBars, analytics.salaryBuckets, "cost", { valueType: "costAndApps", limit: 5 });
}

function renderBestJobs(container, jobs) {
  if (!container) return;
  const bestJobs = jobs
    .filter((job) => job.applications > 0)
    .sort((a, b) => a.cpa - b.cpa || b.applications - a.applications || b.cost - a.cost)
    .slice(0, 3);

  if (!bestJobs.length) {
    container.innerHTML = `<div class="empty-state">応募がある求人がありません</div>`;
    return;
  }

  container.innerHTML = bestJobs
    .map((job, index) => {
      const url = cleanText(job.jobUrl);
      const link = url
        ? `<a class="best-job-link" href="${escapeHtml(url)}" target="_blank" rel="noopener" title="${escapeHtml(url)}">${escapeHtml(url)}</a>`
        : `<span class="best-job-link muted">URLなし</span>`;
      const bestMonth = job.bestPerformanceMonth ? `<span class="best-job-month">${escapeHtml(job.bestPerformanceMonth)}</span>` : "";
      return `
        <article class="best-job-card">
          <div class="best-job-meta">
            <div class="best-job-rank">TOP ${index + 1}</div>
            ${bestMonth}
          </div>
          <div class="best-job-summary">
            <div class="best-job-spacer" aria-hidden="true"></div>
            <span class="best-job-metric-label">応募単価</span>
            <span class="best-job-metric-label">応募数</span>
            <span class="best-job-metric-label">費用</span>
            <div class="best-job-name" title="${escapeHtml(job.name)}">${escapeHtml(job.name)}</div>
            <strong class="best-job-metric-value">${formatCurrency(job.cpa)}</strong>
            <strong class="best-job-metric-value">${formatNumber(job.applications)}件</strong>
            <strong class="best-job-metric-value">${formatCurrency(job.cost)}</strong>
          </div>
          ${link}
        </article>
      `;
    })
    .join("");
}

function renderSalary(analytics) {
  if (dom.salaryTypeTable) {
    renderTable(dom.salaryTypeTable, analytics.salaryTypes, [
      ["給与タイプ", "name"],
      ["中央値", (item) => item.medianSalary ? formatCurrency(item.medianSalary) : "-"],
      ["費用", "cost", "currency"],
      ["応募", "applications", "number"],
      ["応募単価", "cpa", "currency"],
      ["応募率", "applyRate", "percent"],
      ["求人数", "jobCount", "number"]
    ]);
  }
  if (dom.salaryBucketBars) {
    renderBars(dom.salaryBucketBars, analytics.salaryBuckets.filter((item) => item.applications > 0), "cpa", { lowerIsBetter: true, valueType: "currency" });
  }
}

function renderArea(analytics) {
  renderSortableTable(dom.cityTable, analytics.cities, areaDetailColumns("市区町村"), state.sorts.city, "area-detail-table", "city");
  renderSortableTable(dom.companyTable, analytics.companies, areaDetailColumns("企業・拠点"), state.sorts.company, "area-detail-table", "company");
}

function hydrateMarketRegionSelect({ select, row, stateObject, alwaysHideRow = false }) {
  if (!select) return;
  const options = stateObject.regionOptions || [];
  select.innerHTML = options.length
    ? options.map((option) => `<option value="${escapeHtml(option.regionCode)}">${escapeHtml(marketRegionLabel(option))}</option>`).join("")
    : `<option value="">候補なし</option>`;
  select.value = options.some((option) => option.regionCode === stateObject.selectedRegionCode)
    ? stateObject.selectedRegionCode
    : (options[0]?.regionCode || "");
  if (!stateObject.selectedRegionCode && select.value) {
    stateObject.selectedRegionCode = select.value;
  }
  if (row) row.hidden = alwaysHideRow || !options.length;
}

function marketRegionLabel(region) {
  const parent = cleanText(region.parentName);
  const name = cleanText(region.name);
  const code = cleanText(region.regionCode);
  if (!parent) return `${name}（${code}）`;
  return `${parent} / ${name}（${code}）`;
}

function ensureAddressBulkState() {
  const current = state.sidebarMarket.bulk;
  const next = current && typeof current === "object" ? current : createAddressBulkState();
  const defaults = createAddressBulkState();
  Object.entries(defaults).forEach(([key, value]) => {
    if (!(key in next)) next[key] = value;
  });
  next.open = Boolean(next.open);
  next.input = String(next.input ?? "");
  next.loading = Boolean(next.loading);
  next.error = cleanText(next.error);
  next.results = Array.isArray(next.results)
    ? next.results.map(normalizeAddressBulkResult).filter((item) => item.address)
    : [];
  if (!next.loading) {
    next.results = next.results.map((item) => (
      item.status === "loading" || item.status === "pending"
        ? { ...item, status: "error", error: item.error || "検索が中断されました。もう一度一括検索してください。", progress: "" }
        : item
    ));
  }
  state.sidebarMarket.bulk = next;
  return state.sidebarMarket.bulk;
}

function normalizeAddressBulkResult(result) {
  const status = ["pending", "loading", "done", "error"].includes(result?.status) ? result.status : "pending";
  return {
    address: cleanText(result?.address),
    status,
    error: cleanText(result?.error),
    progress: cleanText(result?.progress),
    stations: Array.isArray(result?.stations) ? result.stations : [],
    landmarks: Array.isArray(result?.landmarks) ? result.landmarks : []
  };
}

function parseAddressBulkInput(input) {
  const entries = String(input ?? "")
    .split(/\r?\n/)
    .map((line) => cleanText(line).replace(/^[・•*\-\s]+/, "").trim())
    .filter(Boolean);
  return {
    entries: entries.slice(0, ADDRESS_BULK_SEARCH_LIMIT),
    omitted: Math.max(0, entries.length - ADDRESS_BULK_SEARCH_LIMIT)
  };
}

function renderAddressBulkSearch() {
  if (!dom.sidebarMarketBulkToggleButton && !dom.sidebarMarketBulkPanel && !dom.sidebarMarketBulkResult) return;
  const bulk = ensureAddressBulkState();
  if (dom.sidebarMarketBulkToggleButton) {
    dom.sidebarMarketBulkToggleButton.textContent = bulk.open ? "一括検索を閉じる" : "一括検索";
    dom.sidebarMarketBulkToggleButton.setAttribute("aria-expanded", bulk.open ? "true" : "false");
    dom.sidebarMarketBulkToggleButton.classList.toggle("active", bulk.open);
  }
  if (dom.sidebarMarketBulkPanel) {
    dom.sidebarMarketBulkPanel.hidden = !bulk.open;
  }
  if (dom.sidebarMarketBulkInput && document.activeElement !== dom.sidebarMarketBulkInput) {
    dom.sidebarMarketBulkInput.value = bulk.input || "";
  }
  if (dom.sidebarMarketBulkSearchButton) {
    dom.sidebarMarketBulkSearchButton.disabled = bulk.loading;
  }
  if (dom.sidebarMarketBulkClearButton) {
    dom.sidebarMarketBulkClearButton.disabled = bulk.loading && !bulk.results.length;
  }
  if (dom.sidebarMarketBulkPdfButton) {
    dom.sidebarMarketBulkPdfButton.disabled = bulk.loading || !bulk.results.some((item) => item.status === "done" || item.status === "error");
  }
  if (dom.sidebarMarketBulkStatus) {
    const completed = bulk.results.filter((item) => item.status === "done" || item.status === "error").length;
    dom.sidebarMarketBulkStatus.textContent = bulk.loading && bulk.results.length
      ? `${completed}/${bulk.results.length}件を検索中`
      : bulk.error
        ? bulk.error
        : bulk.results.length
          ? `${bulk.results.length}件の検索結果`
          : "住所を1行ずつ入力";
  }
  if (dom.sidebarMarketBulkResult) {
    dom.sidebarMarketBulkResult.innerHTML = renderAddressBulkResult(bulk);
  }
}

function renderAddressBulkResult(bulk) {
  if (!bulk.open) return "";
  if (!bulk.results.length) {
    return bulk.error
      ? `<div class="address-place-empty warn">${escapeHtml(bulk.error)}</div>`
      : `<div class="address-place-empty">一括検索すると、住所ごとに最寄駅・ランドマーク・周辺キーワードを表示します</div>`;
  }
  const errorHtml = bulk.error ? `<div class="address-place-empty warn">${escapeHtml(bulk.error)}</div>` : "";
  return `
    ${errorHtml}
    <div class="address-bulk-card-list">
      ${bulk.results.map((result, index) => renderAddressBulkCard(result, index)).join("")}
    </div>
  `;
}

function renderAddressBulkCard(result, index) {
  const number = `${index + 1}`;
  const stations = (result.stations || []).slice(0, ADDRESS_BULK_PLACE_LIMIT);
  const landmarks = (result.landmarks || []).slice(0, ADDRESS_BULK_PLACE_LIMIT);
  if (result.status === "pending" || result.status === "loading") {
    return `
      <article class="address-bulk-card is-loading">
        <div class="address-bulk-card-head">
          <span>${escapeHtml(number)}</span>
        <div>
          <h3>${escapeHtml(result.address)}</h3>
          <small>${result.status === "loading" ? (escapeHtml(result.progress || "周辺情報を検索しています")) : "検索待ち"}</small>
        </div>
      </div>
        ${addressNearbyLoading(result.status === "loading" ? (result.progress || "最寄駅と周辺施設を検索しています") : "順番に検索します")}
      </article>
    `;
  }
  if (result.status === "error") {
    return `
      <article class="address-bulk-card is-error">
        <div class="address-bulk-card-head">
          <span>${escapeHtml(number)}</span>
          <div>
            <h3>${escapeHtml(result.address)}</h3>
            <small>検索できませんでした</small>
          </div>
        </div>
        <div class="address-place-empty warn">${escapeHtml(result.error || "周辺情報を取得できませんでした")}</div>
      </article>
    `;
  }
  return `
    <article class="address-bulk-card">
      <div class="address-bulk-card-head">
        <span>${escapeHtml(number)}</span>
        <div>
          <h3>${escapeHtml(result.address)}</h3>
          <small>駅 ${formatNumber(stations.length)}件 / ランドマーク ${formatNumber(landmarks.length)}件</small>
        </div>
      </div>
      <div class="address-bulk-sections">
        <section>
          <h4>最寄駅情報</h4>
          <div class="address-place-list">
            ${renderAddressPlaceList(stations, "近くの駅が見つかりませんでした")}
          </div>
        </section>
        <section>
          <h4>近辺ランドマーク情報</h4>
          <div class="address-place-list">
            ${renderAddressPlaceList(landmarks, "近くのランドマークが見つかりませんでした")}
          </div>
        </section>
      </div>
      <section class="address-bulk-hints">
        <h4>求人原稿に使えそうな周辺キーワード</h4>
        ${renderAddressBulkRecruitHints(stations, landmarks)}
      </section>
    </article>
  `;
}

function renderAddressBulkRecruitHints(stations = [], landmarks = []) {
  const nearbyNames = uniqueTextValues([
    ...stations.slice(0, 3).map((item) => item.name),
    ...landmarks.slice(0, 5).map((item) => item.name)
  ]).slice(0, 8);
  const chips = uniqueTextValues([
    stations[0]?.name ? `${stations[0].name}周辺` : "",
    stations[0]?.name ? "駅チカ" : "",
    ...nearbyNames
  ]).slice(0, 10);
  const landmarkText = landmarks.slice(0, 2).map((item) => item.name).join("・");
  const notes = [
    stations[0]
      ? `${stations[0].name}からの距離感、出口、通勤ルートの目印を勤務地補足に入れると、応募前の不安を減らしやすいです。`
      : "駅情報が少ない住所では、町名・主要道路名・バス停名を勤務地補足に入れると探しやすくなります。",
    landmarkText
      ? `${landmarkText}など生活導線上の施設名は、求人検索語にも面接案内にも使いやすい候補です。`
      : "大型施設が少ない地域では、駐車場・自転車通勤・住宅地からの近さを先に見せると伝わりやすいです。",
    "求人タイトルや勤務地補足では、駅名・施設名・町名を組み合わせて、応募者が通勤イメージを持てる言葉にすると使いやすいです。"
  ];
  return `
    <div class="address-hint-grid">
      <div class="address-hint-keywords">
        <strong>入れる候補ワード</strong>
        <div class="address-keyword-chips">
          ${chips.length
            ? chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join("")
            : `<span>周辺キーワード未取得</span>`}
        </div>
      </div>
      <ul class="address-hint-list">
        ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </div>
  `;
}

async function searchAddressBulk() {
  const bulk = ensureAddressBulkState();
  bulk.input = dom.sidebarMarketBulkInput?.value ?? bulk.input;
  bulk.open = true;
  const { entries, omitted } = parseAddressBulkInput(bulk.input);
  if (!entries.length) {
    bulk.loading = false;
    bulk.error = "住所を1行ずつ入力してください";
    bulk.results = [];
    renderAddressBulkSearch();
    saveState();
    return;
  }

  const unavailable = addressBulkUnavailableReason();
  if (unavailable) {
    bulk.loading = false;
    bulk.error = unavailable;
    bulk.results = entries.map((address) => ({ address, status: "error", error: unavailable, stations: [], landmarks: [] }));
    renderAddressBulkSearch();
    saveState();
    return;
  }

  const token = Date.now();
  addressBulkSearchToken = token;
  bulk.loading = true;
  bulk.error = omitted ? `${ADDRESS_BULK_SEARCH_LIMIT}件まで検索します。残り${formatNumber(omitted)}件は省略しました。` : "";
  bulk.results = entries.map((address, index) => ({
    address,
    status: index === 0 ? "loading" : "pending",
    error: "",
    progress: index === 0 ? "Google Mapsを準備しています" : "",
    stations: [],
    landmarks: []
  }));
  renderAddressBulkSearch();

  let serviceHost = null;
  let progressHeartbeat = startAddressBulkProgressHeartbeat(bulk, token, "Google Mapsを準備しています");
  const mapsStallTimer = window.setTimeout(() => {
    if (addressBulkSearchToken !== token || !bulk.loading) return;
    addressBulkSearchToken = 0;
    bulk.loading = false;
    bulk.error = "Google Mapsの準備に時間がかかっています。ページを再読み込みしてから、もう一度一括検索してください。";
    bulk.results = bulk.results.map((item) => (
      item.status === "done" || item.status === "error"
        ? item
        : { ...item, status: "error", error: bulk.error, progress: "" }
    ));
    renderAddressBulkSearch();
    saveState();
  }, ADDRESS_BULK_MAPS_STALL_MS);
  try {
    await withAddressBulkTimeout(
      loadGoogleMaps(),
      ADDRESS_BULK_MAPS_TIMEOUT_MS,
      "Google Mapsの読み込みがタイムアウトしました"
    );
    if (addressBulkSearchToken !== token) return;
    bulk.results = bulk.results.map((item, itemIndex) => (
      itemIndex === 0 && item.status === "loading"
        ? { ...item, progress: "Places APIを準備しています" }
        : item
    ));
    renderAddressBulkSearch();
    window.clearInterval(progressHeartbeat);
    progressHeartbeat = startAddressBulkProgressHeartbeat(bulk, token, "Places APIを準備しています");
    await withAddressBulkTimeout(
      ensureGooglePlaces(),
      ADDRESS_BULK_MAPS_TIMEOUT_MS,
      "Places APIの読み込みがタイムアウトしました"
    );
    window.clearTimeout(mapsStallTimer);
    window.clearInterval(progressHeartbeat);
    if (addressBulkSearchToken !== token) return;
    if (!googlePlacesServiceReady()) {
      throw new Error("Places APIを読み込めませんでした");
    }
    serviceHost = document.createElement("div");
    serviceHost.className = "address-bulk-service-host";
    document.body.appendChild(serviceHost);

    for (let index = 0; index < entries.length; index += 1) {
      bulk.results = bulk.results.map((item, itemIndex) => (
        itemIndex === index ? { ...item, status: "loading", error: "", progress: "住所を地図上で確認しています" } : item
      ));
      renderAddressBulkSearch();

      try {
        const location = await withAddressBulkTimeout(
          geocodeMarketQuery(entries[index]),
          ADDRESS_BULK_GEOCODE_TIMEOUT_MS,
          "住所の地図検索がタイムアウトしました"
        );
        bulk.results[index] = { ...bulk.results[index], progress: "最寄駅とランドマークを検索しています" };
        renderAddressBulkSearch();
        const serviceMap = new google.maps.Map(serviceHost, {
          center: location,
          zoom: 15,
          disableDefaultUI: true
        });
        const service = new google.maps.places.PlacesService(serviceMap);
        const [stations, landmarks] = await withAddressBulkTimeout(
          Promise.all([
            nearbyPlacesByTypes(service, location, ADDRESS_STATION_TYPES, 2600, ADDRESS_BULK_PLACE_LIMIT, { mergeByName: true, delayMs: 0 }),
            nearbyPlacesByTypes(service, location, ADDRESS_LANDMARK_TYPES, 1800, ADDRESS_BULK_PLACE_LIMIT, { delayMs: 0 })
          ]),
          ADDRESS_BULK_PLACES_TIMEOUT_MS,
          "周辺施設検索がタイムアウトしました"
        );
        bulk.results[index] = {
          address: entries[index],
          status: "done",
          error: "",
          progress: "",
          stations,
          landmarks
        };
      } catch (error) {
        bulk.results[index] = {
          address: entries[index],
          status: "error",
          error: addressBulkErrorHelp(error),
          progress: "",
          stations: [],
          landmarks: []
        };
      }
      renderAddressBulkSearch();
      saveState();
      await wait(120);
    }
  } catch (error) {
    window.clearTimeout(mapsStallTimer);
    window.clearInterval(progressHeartbeat);
    bulk.error = addressBulkErrorHelp(error);
    bulk.results = bulk.results.map((item) => (
      item.status === "done" || item.status === "error"
        ? item
        : { ...item, status: "error", error: bulk.error, progress: "" }
    ));
  } finally {
    window.clearTimeout(mapsStallTimer);
    window.clearInterval(progressHeartbeat);
    if (serviceHost) serviceHost.remove();
    bulk.loading = false;
    renderAddressBulkSearch();
    saveState();
  }
}

function withAddressBulkTimeout(promise, timeoutMs, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(message)), timeoutMs);
    })
  ]);
}

function startAddressBulkProgressHeartbeat(bulk, token, label) {
  const startedAt = Date.now();
  return window.setInterval(() => {
    if (addressBulkSearchToken !== token || !bulk.loading) return;
    const elapsed = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    bulk.results = bulk.results.map((item, itemIndex) => (
      itemIndex === 0 && item.status === "loading"
        ? { ...item, progress: `${label}（${elapsed}秒経過）` }
        : item
    ));
    renderAddressBulkSearch();
  }, ADDRESS_BULK_PROGRESS_TICK_MS);
}

function addressBulkUnavailableReason() {
  if (!googleMapsApiKey()) {
    return "Google Maps APIキーを設定すると一括検索できます";
  }
  if (window.location.protocol === "file:") {
    return "ローカルURLで開くと一括検索できます。http://127.0.0.1:8765/index.html で開いてください。";
  }
  return "";
}

function addressBulkErrorHelp(error) {
  const message = cleanText(error?.message || error || "");
  if (message.includes("周辺施設") || message.includes("Places")) {
    return googlePlacesErrorHelp(error);
  }
  if (message.includes("地図") || message.includes("Google Maps") || message.includes("Geocoding") || message.includes("ZERO_RESULTS") || message.includes("REQUEST_DENIED")) {
    return googleMapsErrorHelp(error);
  }
  return message || "周辺情報を取得できませんでした";
}

function renderSidebarMarket() {
  if (!dom.sidebarMarketResult) return;
  hydrateSidebarMarketInputs();
  const { loading, error, stats } = state.sidebarMarket;
  if (loading) {
    dom.sidebarMarketResult.innerHTML = `<div class="market-empty-state">住所近辺の地域データを取得しています</div>`;
    return;
  }
  if (error) {
    dom.sidebarMarketResult.innerHTML = `<div class="market-empty-state warn">${escapeHtml(error)}</div>`;
    return;
  }
  if (!stats) {
    dom.sidebarMarketResult.innerHTML = `<div class="market-empty-state">住所を入れると地域データを表示します</div>`;
    return;
  }
  if (!marketStatsHasAgeGroups(stats) || !marketStatsMatchesBasis(stats, state.sidebarMarket.dataBasis)) {
    fetchSelectedSidebarMarketStats();
    return;
  }
  maybeFetchSidebarMarketTargetStats();
  dom.sidebarMarketResult.innerHTML = renderAddressMarketStats(
    stats,
    state.sidebarMarket.targetStats,
    state.sidebarMarket.targetError,
    state.sidebarMarket.targetLoading
  );
  if (state.activeTab === "regionSearch") {
    renderAddressMarketMapAndNearby({
      elementId: "sidebarMarketMap",
      query: state.sidebarMarket.query || marketRegionDisplayName(stats.region),
      label: marketRegionDisplayName(stats.region)
    });
  }
}

async function searchSidebarMarketRegion() {
  const query = cleanText(dom.sidebarMarketAddressInput?.value || state.sidebarMarket.query);
  state.sidebarMarket.query = query;
  if (!query) {
    state.sidebarMarket.error = "住所を入力してください";
    state.sidebarMarket.stats = null;
    state.sidebarMarket.targetStats = null;
    state.sidebarMarket.targetError = "";
    state.sidebarMarket.targetLoading = false;
    state.sidebarMarket.targetStatsRegionCode = "";
    renderSidebarMarket();
    saveState();
    return;
  }
  state.sidebarMarket.loading = true;
  state.sidebarMarket.error = "";
  state.sidebarMarket.stats = null;
  state.sidebarMarket.targetStats = null;
  state.sidebarMarket.targetError = "";
  state.sidebarMarket.targetLoading = false;
  state.sidebarMarket.targetStatsRegionCode = "";
  renderSidebarMarket();

  try {
    const options = await resolveMarketRegions(query);
    if (!options.length) throw new Error("地域候補が見つかりませんでした。市区町村名を含めて入力してください。");
    state.sidebarMarket.regionOptions = options.slice(0, 8);
    state.sidebarMarket.selectedRegionCode = state.sidebarMarket.regionOptions[0].regionCode;
    await fetchSidebarMarketDataForRegion(state.sidebarMarket.regionOptions[0]);
  } catch (error) {
    state.sidebarMarket.error = error.message || "地域データを取得できませんでした";
  } finally {
    state.sidebarMarket.loading = false;
    renderSidebarMarket();
    saveState();
  }
}

async function fetchSelectedSidebarMarketStats() {
  const selected = selectedSidebarMarketRegion();
  if (!selected) return;
  state.sidebarMarket.loading = true;
  state.sidebarMarket.error = "";
  state.sidebarMarket.stats = null;
  state.sidebarMarket.targetStats = null;
  state.sidebarMarket.targetError = "";
  state.sidebarMarket.targetLoading = false;
  state.sidebarMarket.targetStatsRegionCode = "";
  renderSidebarMarket();
  try {
    await fetchSidebarMarketDataForRegion(selected);
  } catch (error) {
    state.sidebarMarket.error = error.message || "地域データを取得できませんでした";
  } finally {
    state.sidebarMarket.loading = false;
    renderSidebarMarket();
    saveState();
  }
}

async function fetchSidebarMarketDataForRegion(region) {
  const basis = state.sidebarMarket.dataBasis;
  const stats = await fetchMarketStats(region, basis);
  state.sidebarMarket.stats = stats;
  try {
    state.sidebarMarket.targetStats = await fetchTargetAnalysisStats(region, basis);
    state.sidebarMarket.targetError = "";
  } catch (error) {
    state.sidebarMarket.targetStats = null;
    state.sidebarMarket.targetError = error.message || "属性別人口を取得できませんでした";
  }
  state.sidebarMarket.targetLoading = false;
  state.sidebarMarket.targetStatsRegionCode = region.regionCode;
}

function maybeFetchSidebarMarketTargetStats() {
  const selected = selectedSidebarMarketRegion();
  if (!selected || state.sidebarMarket.targetStats || state.sidebarMarket.targetLoading) return;
  if (state.sidebarMarket.targetStatsRegionCode === selected.regionCode) return;
  state.sidebarMarket.targetLoading = true;
  state.sidebarMarket.targetError = "";
  fetchSidebarMarketTargetStatsForRegion(selected);
}

async function fetchSidebarMarketTargetStatsForRegion(region) {
  try {
    state.sidebarMarket.targetStats = await fetchTargetAnalysisStats(region, state.sidebarMarket.dataBasis);
    state.sidebarMarket.targetError = "";
  } catch (error) {
    state.sidebarMarket.targetStats = null;
    state.sidebarMarket.targetError = error.message || "属性別人口を取得できませんでした";
  } finally {
    state.sidebarMarket.targetLoading = false;
    state.sidebarMarket.targetStatsRegionCode = region.regionCode;
    renderSidebarMarket();
    saveState();
  }
}

function renderAddressMarketStats(stats, targetStats, targetError = "", targetLoading = false) {
  const values = stats.population?.values || {};
  const total = Number(values.total) || 0;
  const male = Number(values.male) || 0;
  const female = Number(values.female) || 0;
  const genderTotal = male + female;
  const ageGroups = marketAgeGroups(values);
  const regionName = marketRegionDisplayName(stats.region);
  const populationScopeName = regionName.replace(/\s+/g, "");
  const populationTime = formatDashboardTime(stats.population?.times?.total);
  const jobTime = formatDashboardTime(stats.jobRatio?.time);
  const query = cleanText(state.sidebarMarket.query) || regionName;
  return `
    <section class="address-market-shell">
      <div class="address-market-title-row">
        <div>
          <h2>${escapeHtml(query)}</h2>
          <p>${escapeHtml(regionName)} の周辺採用インサイト</p>
        </div>
        <span>${escapeHtml(stats.dataBasis?.label || marketDataBasis(state.sidebarMarket.dataBasis).label)}</span>
      </div>

      <div class="address-market-top">
        <article class="panel address-map-panel">
          <div class="panel-heading">
            <h2>周辺マップ</h2>
            <span>住所中心・近隣施設</span>
          </div>
          <div class="market-google-map address-google-map" id="sidebarMarketMap"></div>
        </article>

        <div class="address-market-side">
          <div class="address-kpi-grid">
            ${addressInsightCard("人口総数", `${formatNumber(total)}人`, `${populationTime} / ${populationScopeName}`)}
            ${addressInsightCard("有効求人倍率", stats.jobRatio?.value ? `${formatMarketDecimal(stats.jobRatio.value)}倍` : "-", `${stats.region.prefName} / ${jobTime}`)}
            ${addressGenderCard(male, female, genderTotal)}
          </div>
          <article class="panel address-age-panel">
            <div class="panel-heading">
              <h2>年齢層グラフ</h2>
              <span>10歳刻み</span>
            </div>
            ${renderMarketAgeColumnChart(ageGroups, total)}
          </article>
        </div>
      </div>

      <div class="address-nearby-grid">
        <article class="panel address-nearby-panel">
          <div class="panel-heading">
            <h2>最寄駅情報</h2>
            <span>近い順</span>
          </div>
          <div class="address-place-list" id="sidebarMarketStationList">
            ${addressNearbyLoading("駅情報を検索しています")}
          </div>
        </article>

        <article class="panel address-nearby-panel">
          <div class="panel-heading">
            <h2>近辺ランドマーク情報</h2>
            <span>求人原稿の検索語候補</span>
          </div>
          <div class="address-place-list" id="sidebarMarketLandmarkList">
            ${addressNearbyLoading("周辺施設を検索しています")}
          </div>
        </article>
      </div>

      <article class="panel address-copy-panel">
        <div class="panel-heading">
          <h2>求人原稿に使えそうな周辺キーワード</h2>
          <span>駅名・施設名・生活導線</span>
        </div>
        <div id="sidebarMarketRecruitHints">
          ${renderAddressRecruitHints([], [], stats)}
        </div>
      </article>

      <article class="panel target-attribute-card address-attribute-panel">
        ${targetStats
          ? renderTargetAttributePopulation(targetStats, buildAddressAttributeModel(targetStats))
          : targetLoading
            ? renderAddressAttributeLoading()
          : renderAddressAttributeFallback(targetError)}
      </article>

      <p class="market-source-note">出典: 統計ダッシュボードAPI（${escapeHtml(stats.population?.sourceName || "統計")}、一般職業紹介状況）および Google Maps。周辺施設は地図APIの結果をもとに表示しています。</p>
    </section>
  `;
}

function addressInsightCard(label, value, meta) {
  return `
    <article class="address-insight-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(meta || "-")}</small>
    </article>
  `;
}

function addressGenderCard(male, female, total) {
  const maleWidth = total ? Math.round(safeDivide(male, total) * 100) : 50;
  const femaleWidth = Math.max(0, 100 - maleWidth);
  return `
    <article class="address-insight-card address-gender-card">
      <span>男性女性比率</span>
      <strong>男性 ${formatMarketShare(male, total)} / 女性 ${formatMarketShare(female, total)}</strong>
      <div class="market-split-bar" aria-label="男性女性比率">
        <span style="width:${maleWidth}%"></span>
        <span style="width:${femaleWidth}%"></span>
      </div>
    </article>
  `;
}

function buildAddressAttributeModel(stats) {
  const gender = "all";
  const latestAdultPopulation = targetLatestAdultPopulation(stats.population.values, gender);
  const laborStatusValues = estimateLatestLaborStatusValues(targetLaborStatusValues(stats, gender), latestAdultPopulation);
  const seekingValues = estimateLatestSeekingStatusValues(targetSeekingStatusValues(stats, gender), laborStatusValues);
  return {
    gender,
    laborStatusValues,
    seekingValues,
    basis: marketDataBasis(stats.dataBasis?.key || stats.population?.basis?.key),
    populationTime: formatDashboardTime(stats.population?.times?.total)
  };
}

function renderAddressAttributeFallback(error) {
  return `
    <div class="target-section-heading">
      <div>
        <h2>属性別人口</h2>
      </div>
    </div>
    <div class="market-empty-state warn">${escapeHtml(error || "属性別人口を取得できませんでした")}</div>
  `;
}

function renderAddressAttributeLoading() {
  return `
    <div class="target-section-heading">
      <div>
        <h2>属性別人口</h2>
      </div>
    </div>
    <div class="market-empty-state">属性別人口を取得しています</div>
  `;
}

function addressNearbyLoading(text) {
  return `<div class="address-place-empty">${escapeHtml(text)}</div>`;
}

function renderAddressRecruitHints(stations = [], landmarks = [], stats = null) {
  const regionName = stats?.region ? marketRegionDisplayName(stats.region) : "";
  const jobRatio = stats?.jobRatio?.value ? formatMarketDecimal(stats.jobRatio.value) : "";
  const nearbyNames = uniqueTextValues([
    ...stations.slice(0, 3).map((item) => item.name),
    ...landmarks.slice(0, 5).map((item) => item.name)
  ]).slice(0, 8);
  const chips = uniqueTextValues([
    regionName,
    stations[0]?.name ? `${stations[0].name}周辺` : "",
    stations[0]?.name ? "駅チカ" : "",
    ...nearbyNames
  ]).slice(0, 10);
  const landmarkText = landmarks.slice(0, 2).map((item) => item.name).join("・");
  const notes = [
    stations[0]
      ? `${stations[0].name}からの距離感、出口、通勤ルートの目印を勤務地補足に入れると、応募前の不安を減らしやすいです。`
      : "最寄駅が取りきれない場合は、町名・主要道路名・バス停名を勤務地補足に入れると探しやすくなります。",
    landmarkText
      ? `${landmarkText}など生活導線上の施設名は、求人検索語にも面接案内にも使いやすい候補です。`
      : "大型施設が少ない地域では、駐車場・自転車通勤・住宅地からの近さを先に見せると伝わりやすいです。",
    jobRatio
      ? `有効求人倍率は${jobRatio}倍です。競合しやすい地域ほど、給与・シフト自由度・通勤負担の軽さを上部で見せるのがよさそうです。`
      : "求人倍率が未取得の地域では、近隣施設と属性別人口を軸に、訴求の優先順位を決めると使いやすいです。"
  ];

  return `
    <div class="address-hint-grid">
      <div class="address-hint-keywords">
        <strong>入れる候補ワード</strong>
        <div class="address-keyword-chips">
          ${chips.length
            ? chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join("")
            : `<span>住所検索後に候補を表示</span>`}
        </div>
      </div>
      <ul class="address-hint-list">
        ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function uniqueTextValues(values) {
  const result = [];
  const seen = new Set();
  (values || []).forEach((value) => {
    const text = cleanText(value);
    if (!text || seen.has(text)) return;
    seen.add(text);
    result.push(text);
  });
  return result;
}

function renderAddressMarketMapAndNearby({ elementId, query, label }) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const safeQuery = cleanText(query);
  const stats = state.sidebarMarket.stats;
  const stationsElement = document.getElementById("sidebarMarketStationList");
  const landmarksElement = document.getElementById("sidebarMarketLandmarkList");
  const hintsElement = document.getElementById("sidebarMarketRecruitHints");

  const updateNearby = (stations = [], landmarks = [], errorText = "") => {
    if (stationsElement) {
      stationsElement.innerHTML = errorText
        ? `<div class="address-place-empty warn">${escapeHtml(errorText)}</div>`
        : renderAddressPlaceList(stations, "近くの駅が見つかりませんでした");
    }
    if (landmarksElement) {
      landmarksElement.innerHTML = errorText
        ? `<div class="address-place-empty warn">${escapeHtml(errorText)}</div>`
        : renderAddressPlaceList(landmarks, "近くのランドマークが見つかりませんでした");
    }
    if (hintsElement) {
      hintsElement.innerHTML = renderAddressRecruitHints(stations, landmarks, stats);
    }
  };

  if (!safeQuery) {
    container.innerHTML = marketMapPlaceholder("地図検索する住所がありません", "", false, "住所または市区町村を入力すると周辺情報を表示します。");
    updateNearby([], [], "住所を入力すると表示します");
    return;
  }
  if (!googleMapsApiKey()) {
    container.innerHTML = marketMapPlaceholder("Google Maps APIキー未設定", safeQuery, false, "config.js に Google Maps APIキーを設定してください。");
    updateNearby([], [], "Google Maps APIキーを設定すると表示できます");
    return;
  }
  if (window.location.protocol === "file:") {
    container.innerHTML = marketMapPlaceholder(
      "ローカルURLで開いてください",
      safeQuery,
      false,
      "Google Mapsのサイト制限に合わせるため、http://127.0.0.1:8765/index.html で開く必要があります。"
    );
    updateNearby([], [], "ローカルURLで開くと表示できます");
    return;
  }

  const mapRequestId = beginGoogleMapsRequest(container);
  container.innerHTML = marketMapPlaceholder("周辺マップを読み込んでいます", safeQuery, false, "Google Mapsを準備しています。");
  const stallTimer = startGoogleMapsStallTimer(
    container,
    mapRequestId,
    "地図の読み込みに時間がかかっています",
    safeQuery,
    false,
    () => updateNearby([], [], "Google Mapsの読み込み待ちです。APIキー・請求設定・ブラウザ拡張機能を確認してください")
  );
  loadGoogleMaps()
    .then(() => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return Promise.reject(new Error("地図リクエストが更新されました"));
      return geocodeMarketQuery(safeQuery);
    })
    .then(async (location) => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return;
      window.clearTimeout(stallTimer);
      container.innerHTML = "";
      const map = new google.maps.Map(container, {
        center: location,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });
      new google.maps.Marker({
        map,
        position: location,
        title: label || safeQuery
      });
      new google.maps.Circle({
        map,
        center: location,
        radius: 1500,
        strokeColor: "#2f65d9",
        strokeOpacity: 0.72,
        strokeWeight: 2,
        fillColor: "#2f65d9",
        fillOpacity: 0.08
      });

      try {
        await ensureGooglePlaces();
        if (!google.maps.places?.PlacesService) {
          throw new Error("Places APIを読み込めませんでした");
        }
        const service = new google.maps.places.PlacesService(map);
        const [stations, landmarks] = await Promise.all([
          nearbyPlacesByTypes(service, location, ADDRESS_STATION_TYPES, 2600, 5, { mergeByName: true }),
          nearbyPlacesByTypes(service, location, ADDRESS_LANDMARK_TYPES, 1800, 8)
        ]);
        addAddressPlaceMarkers(map, stations, "#2f65d9", "S");
        addAddressPlaceMarkers(map, landmarks, "#0c8a78", "L");
        fitAddressMapToPlaces(map, location, [...stations, ...landmarks]);
        updateNearby(stations, landmarks);
      } catch (error) {
        console.warn("Google Places display failed", error);
        updateNearby([], [], googlePlacesErrorHelp(error));
      }
    })
    .catch((error) => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return;
      window.clearTimeout(stallTimer);
      console.warn("Google Maps address display failed", error);
      container.innerHTML = marketMapPlaceholder("地図を表示できませんでした", safeQuery, false, googleMapsErrorHelp(error));
      updateNearby([], [], "地図を表示できないため、周辺情報を取得できませんでした");
    });
}

function googleMapsReady() {
  return typeof google !== "undefined" && Boolean(google.maps?.Map);
}

function googleMapsScriptPresent() {
  return Boolean(document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]'));
}

function googlePlacesServiceReady() {
  return typeof google !== "undefined" && Boolean(google.maps?.places?.PlacesService);
}

function ensureGooglePlaces() {
  if (googlePlacesServiceReady()) return Promise.resolve();
  if (typeof google !== "undefined" && google.maps?.importLibrary) {
    return google.maps.importLibrary("places").then(() => undefined);
  }
  return Promise.resolve();
}

async function nearbyPlacesByTypes(service, origin, specs, radius, limit, options = {}) {
  const places = [];
  const errors = [];
  for (const spec of specs) {
    let results = [];
    try {
      results = await nearbyPlacesByType(service, origin, spec, radius);
    } catch (error) {
      errors.push(error);
    }
    if (!results.length && spec.keyword) {
      try {
        results = await nearbyPlacesByText(service, origin, spec, radius);
      } catch (error) {
        errors.push(error);
      }
    }
    results.forEach((place) => {
      const item = normaliseAddressPlace(place, spec, origin);
      if (item) places.push(item);
    });
    const delayMs = Number.isFinite(Number(options.delayMs)) ? Number(options.delayMs) : 70;
    if (delayMs > 0) await wait(delayMs);
  }
  if (!places.length && errors.length >= specs.length) {
    throw errors[0];
  }
  const deduped = new Map();
  places.forEach((place) => {
    const key = options.mergeByName
      ? normalizedAddressPlaceName(place.name)
      : (place.placeId || `${place.name}-${place.vicinity}`);
    if (!key) return;
    const current = deduped.get(key);
    if (!current || place.distance < current.distance) {
      deduped.set(key, place);
    }
  });
  return [...deduped.values()]
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

function normalizedAddressPlaceName(name) {
  return cleanText(name)
    .normalize("NFKC")
    .replace(/[（(［[].*?[）)］\]]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function nearbyPlacesByType(service, origin, spec, radius) {
  return new Promise((resolve, reject) => {
    service.nearbySearch({
      location: origin,
      radius,
      keyword: spec.keyword || undefined,
      type: spec.type
    }, (results, status) => {
      const statusCode = google.maps.places.PlacesServiceStatus;
      if (status === statusCode.OK) {
        resolve(results || []);
      } else if (status === statusCode.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`周辺施設検索に失敗しました（${status || "UNKNOWN"}）`));
      }
    });
  });
}

function nearbyPlacesByText(service, origin, spec, radius) {
  return new Promise((resolve, reject) => {
    service.textSearch({
      location: origin,
      radius,
      query: spec.keyword || spec.label
    }, (results, status) => {
      const statusCode = google.maps.places.PlacesServiceStatus;
      if (status === statusCode.OK) {
        resolve(results || []);
      } else if (status === statusCode.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`周辺施設検索に失敗しました（${status || "UNKNOWN"}）`));
      }
    });
  });
}

function normaliseAddressPlace(place, spec, origin) {
  const rawLocation = place?.geometry?.location;
  if (!rawLocation) return null;
  const location = {
    lat: typeof rawLocation.lat === "function" ? rawLocation.lat() : Number(rawLocation.lat),
    lng: typeof rawLocation.lng === "function" ? rawLocation.lng() : Number(rawLocation.lng)
  };
  if (!Number.isFinite(location.lat) || !Number.isFinite(location.lng)) return null;
  return {
    placeId: cleanText(place.place_id),
    name: cleanText(place.name),
    label: spec.label,
    type: spec.type,
    vicinity: cleanText(place.vicinity || place.formatted_address),
    location,
    distance: distanceMeters(origin, location)
  };
}

function renderAddressPlaceList(items, emptyText) {
  if (!items?.length) {
    return `<div class="address-place-empty">${escapeHtml(emptyText)}</div>`;
  }
  return items.map((item) => `
    <article class="address-place-row">
      <div>
        <strong>${escapeHtml(item.name || "-")}</strong>
        <small>${escapeHtml(item.vicinity || "住所情報なし")}</small>
      </div>
      <span>${escapeHtml(item.label)}</span>
      <em>
        <b>${escapeHtml(formatDistance(item.distance))}</b>
        <small>${escapeHtml(formatWalkingMinutes(item.distance, { compact: true }))}</small>
      </em>
    </article>
  `).join("");
}

function addAddressPlaceMarkers(map, items, color, prefix) {
  (items || []).slice(0, 6).forEach((item, index) => {
    new google.maps.Marker({
      map,
      position: item.location,
      title: item.name,
      label: {
        text: `${prefix}${index + 1}`,
        color: "#ffffff",
        fontSize: "11px",
        fontWeight: "900"
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 0.94,
        strokeColor: "#ffffff",
        strokeWeight: 2,
        scale: 9
      }
    });
  });
}

function fitAddressMapToPlaces(map, origin, places) {
  const visiblePlaces = (places || []).filter((place) => place.location);
  if (!visiblePlaces.length) return;
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(origin);
  visiblePlaces.slice(0, 10).forEach((place) => bounds.extend(place.location));
  map.fitBounds(bounds, 52);
}

function distanceMeters(from, to) {
  const lat1 = Number(from?.lat);
  const lng1 = Number(from?.lng);
  const lat2 = Number(to?.lat);
  const lng2 = Number(to?.lng);
  if (![lat1, lng1, lat2, lng2].every(Number.isFinite)) return 0;
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function formatDistance(meters) {
  const value = Number(meters);
  if (!Number.isFinite(value) || value <= 0) return "距離未取得";
  if (value < 1000) return `${formatNumber(Math.round(value / 10) * 10)}m`;
  return `${formatDecimal(value / 1000, 1)}km`;
}

function formatWalkingMinutes(meters, options = {}) {
  const value = Number(meters);
  if (!Number.isFinite(value) || value <= 0) return options.compact ? "徒歩-分" : "徒歩-分";
  const distanceForDisplay = value < 1000 ? Math.round(value / 10) * 10 : value;
  return `${options.compact ? "徒歩" : "徒歩"}${Math.max(1, Math.ceil(distanceForDisplay / 80))}分`;
}

function googlePlacesErrorHelp(error) {
  const message = cleanText(error?.message || error || "");
  if (message.includes("REQUEST_DENIED")) {
    return "Places APIの有効化、APIキー制限、請求設定を確認すると表示できます";
  }
  if (message.includes("OVER_QUERY_LIMIT")) {
    return "周辺施設の検索上限に達しました。少し時間を置いて再検索してください";
  }
  return "Google Places APIを有効化すると表示できます";
}

function selectedSidebarMarketRegion() {
  return (state.sidebarMarket.regionOptions || []).find((option) => option.regionCode === state.sidebarMarket.selectedRegionCode) || null;
}

function renderJobMarket(analytics) {
  if (!dom.jobMarketResult) return;
  const prefectures = jobMarketPrefectureOptions(analytics.filtered.job);
  hydrateJobMarketPrefectureButtons(prefectures);
  const selectedPrefecture = selectedJobMarketPrefecture(prefectures);

  if (state.activeTab !== "market") {
    return;
  }

  if (!analytics.filtered.job.length) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state">CSVを読み込むと都道府県ごとに分析できます</div>`;
    setJobMarketStatus("");
    return;
  }

  if (!selectedPrefecture) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state">都道府県を選択してください</div>`;
    setJobMarketStatus("");
    return;
  }

  if (state.jobMarket.loading) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state">${escapeHtml(selectedPrefecture.name)}の地域データを取得しています</div>`;
    setJobMarketStatus("取得中");
    return;
  }

  if (state.jobMarket.error) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state warn">${escapeHtml(state.jobMarket.error)}</div>`;
    setJobMarketStatus("");
    return;
  }

  if (!state.jobMarket.stats) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state">${escapeHtml(selectedPrefecture.name)}の地域データを準備しています</div>`;
    fetchJobMarketPrefectureStats(analytics);
    return;
  }
  if (
    state.jobMarket.stats.region?.regionCode !== selectedPrefecture.code ||
    !marketStatsHasAgeGroups(state.jobMarket.stats) ||
    !marketStatsMatchesBasis(state.jobMarket.stats, state.jobMarket.dataBasis)
  ) {
    state.jobMarket.stats = null;
    fetchJobMarketPrefectureStats(analytics);
    return;
  }

  setJobMarketStatus(`${selectedPrefecture.name}を表示中`);
  dom.jobMarketResult.innerHTML = renderPrefectureMarketStats(selectedPrefecture, analytics, state.jobMarket.stats);
  renderMarketMap({
    elementId: "jobMarketPrefectureMap",
    query: selectedPrefecture.name,
    label: selectedPrefecture.name
  });
}

function hydrateJobMarketPrefectureButtons(prefectures) {
  if (!dom.jobMarketPrefectureButtons) return;
  const selected = selectedJobMarketPrefecture(prefectures);
  if (selected && state.jobMarket.selectedPrefectureCode !== selected.code) {
    state.jobMarket.selectedPrefectureCode = selected.code;
  }
  dom.jobMarketPrefectureButtons.innerHTML = prefectures.map((prefecture) => `
    <button
      class="prefecture-button ${prefecture.code === state.jobMarket.selectedPrefectureCode ? "active" : ""} ${prefecture.hasJobs ? "" : "is-empty"}"
      type="button"
      data-prefecture-code="${escapeHtml(prefecture.code)}"
    >
      <strong>${escapeHtml(prefecture.name)}</strong>
      <span>${prefecture.hasJobs ? `${formatNumber(prefecture.jobCount)}件 / ${formatNumber(prefecture.applications)}応募` : "求人なし"}</span>
    </button>
  `).join("");
}

function selectedJobMarketPrefecture(prefectures) {
  if (!prefectures.length) return null;
  const current = prefectures.find((prefecture) => prefecture.code === state.jobMarket.selectedPrefectureCode);
  if (current) return current;
  return prefectures
    .filter((prefecture) => prefecture.hasJobs)
    .sort((a, b) => b.applications - a.applications || b.cost - a.cost)[0] || prefectures[0];
}

function jobMarketPrefectureOptions(rows) {
  const grouped = aggregateBy(
    (rows || []).filter((row) => prefectureCodeForName(row.prefecture)),
    (row) => prefectureCodeForName(row.prefecture)
  );
  const metricsByCode = new Map(grouped.map((item) => [item.name, item]));
  return PREFECTURE_LIST.map((prefecture) => {
    const metrics = metricsByCode.get(prefecture.code);
    const { name: _metricName, ...metricValues } = metrics || finalize(emptyMetrics());
    return {
      ...prefecture,
      ...metricValues,
      rows: metrics?.rows || [],
      hasJobs: Boolean(metrics?.rows?.length)
    };
  });
}

function jobMarketRowsForPrefecture(rows, prefectureCode) {
  return (rows || []).filter((row) => prefectureCodeForName(row.prefecture) === prefectureCode);
}

function jobMarketPrefectureRegion(prefecture) {
  return {
    regionCode: prefecture.code,
    name: prefecture.name,
    hiragana: "",
    level: "3",
    fromDate: "",
    toDate: MARKET_REGION_CURRENT_TO_DATE,
    parentName: "",
    parentRegionCode: ""
  };
}

function prefectureCodeForName(value) {
  const name = normalizePrefectureName(value);
  const match = PREFECTURE_LIST.find((prefecture) => prefecture.name === name);
  return match?.code || "";
}

function normalizePrefectureName(value) {
  const text = cleanText(value).replace("未分類", "");
  if (!text) return "";
  const base = prefectureBaseName(text);
  return PREFECTURE_LIST.find((prefecture) => prefecture.name === text || prefectureBaseName(prefecture.name) === base)?.name || text;
}

function prefectureBaseName(value) {
  const text = cleanText(value);
  if (text === "北海道") return text;
  return text.replace(/[都府県]$/, "");
}

function renderJobMarketAccount(analytics) {
  const regions = jobMarketAccountRegionOptions(analytics.filtered.job);
  const signature = jobMarketAccountSignature(regions);

  if (!regions.length) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state">勤務地が入っている求人がありません</div>`;
    setJobMarketStatus("");
    return;
  }

  if (state.jobMarket.loading) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state">全求人の地域データを取得しています</div>`;
    setJobMarketStatus("取得中");
    return;
  }

  if (state.jobMarket.error) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state warn">${escapeHtml(state.jobMarket.error)}</div>`;
    setJobMarketStatus("");
    return;
  }

  if (!state.jobMarket.accountRegions?.length || state.jobMarket.accountSignature !== signature) {
    dom.jobMarketResult.innerHTML = `<div class="market-empty-state">アカウント全体の地域データを準備しています</div>`;
    fetchJobMarketAccountRegions(analytics);
    return;
  }

  setJobMarketStatus(`${state.jobMarket.accountRegions.length}エリアを表示中`);
  dom.jobMarketResult.innerHTML = renderJobMarketAccountStats(state.jobMarket.accountRegions, analytics);
  renderMarketMultiMap({
    elementId: "jobMarketAccountMap",
    items: state.jobMarket.accountRegions
      .filter((row) => row.stats)
      .map((row) => ({
        query: row.query,
        label: marketRegionDisplayName(row.stats.region),
        meta: `${formatNumber(row.applications)}件`
      }))
  });
}

function hydrateJobMarketControls(jobs) {
  if (!dom.jobMarketJobSelect) return;
  if (!jobs.length) {
    state.jobMarket.selectedJobKey = "";
    state.jobMarket.selectedRegionCode = "";
    state.jobMarket.regionOptions = [];
    state.jobMarket.accountRegions = [];
    state.jobMarket.accountSignature = "";
    state.jobMarket.stats = null;
  }
  if (!state.jobMarket.selectedJobKey && jobs.length) {
    state.jobMarket.selectedJobKey = JOB_MARKET_ACCOUNT_KEY;
  }
  const selectedJob = isJobMarketAccountMode() ? null : selectedJobMarketJob(jobs) || jobs[0];
  if (selectedJob && !state.jobMarket.selectedJobKey) {
    state.jobMarket.selectedJobKey = jobMarketKey(selectedJob);
  }
  const validKeys = new Set([JOB_MARKET_ACCOUNT_KEY, ...jobs.map((job) => jobMarketKey(job))]);
  if (jobs.length && !validKeys.has(state.jobMarket.selectedJobKey)) {
    state.jobMarket.selectedJobKey = JOB_MARKET_ACCOUNT_KEY;
    state.jobMarket.stats = null;
    state.jobMarket.regionOptions = [];
    state.jobMarket.accountRegions = [];
    state.jobMarket.accountSignature = "";
  }
  dom.jobMarketJobSelect.innerHTML = jobs.length
    ? [`<option value="${JOB_MARKET_ACCOUNT_KEY}">全求人（アカウント単位）</option>`]
      .concat(jobs.map((job) => `<option value="${escapeHtml(jobMarketKey(job))}">${escapeHtml(jobMarketSelectLabel(job))}</option>`))
      .join("")
    : `<option value="">CSV読込後に選択</option>`;
  dom.jobMarketJobSelect.value = validKeys.has(state.jobMarket.selectedJobKey)
    ? state.jobMarket.selectedJobKey
    : (jobs.length ? JOB_MARKET_ACCOUNT_KEY : "");
  if (jobs.length && state.jobMarket.selectedJobKey !== dom.jobMarketJobSelect.value) {
    state.jobMarket.selectedJobKey = dom.jobMarketJobSelect.value;
    state.jobMarket.stats = null;
    state.jobMarket.regionOptions = [];
    state.jobMarket.selectedRegionCode = "";
    state.jobMarket.accountRegions = [];
    state.jobMarket.accountSignature = "";
  }
  hydrateMarketRegionSelect({
    select: dom.jobMarketRegionSelect,
    row: dom.jobMarketRegionSelect?.closest("label"),
    stateObject: state.jobMarket
  });
  if (dom.jobMarketRegionSelect?.closest("label")) {
    dom.jobMarketRegionSelect.closest("label").hidden = isJobMarketAccountMode();
  }
}

function jobMarketOptions(jobs) {
  return (jobs || []).filter((job) => cleanText(job.city) && cleanText(job.city) !== "未分類");
}

function selectedJobMarketJob(jobs = jobMarketOptions(getAnalytics("job").jobs)) {
  if (isJobMarketAccountMode()) return null;
  return jobs.find((job) => jobMarketKey(job) === state.jobMarket.selectedJobKey) || jobs[0] || null;
}

function isJobMarketAccountMode() {
  return state.jobMarket.selectedJobKey === JOB_MARKET_ACCOUNT_KEY;
}

function jobMarketKey(job) {
  return [job.name, job.company, job.prefecture, job.city, job.campaign].map(cleanText).join("\u001f");
}

function jobMarketSelectLabel(job) {
  const city = jobRegionLabel(job.prefecture, job.city);
  return `${job.name}${city ? ` / ${city}` : ""}`;
}

function setJobMarketStatus(value) {
  if (dom.jobMarketStatusText) dom.jobMarketStatusText.textContent = value || "";
}

async function fetchJobMarketPrefectureStats(analytics = getAnalytics("job")) {
  const prefectures = jobMarketPrefectureOptions(analytics.filtered.job);
  const selected = selectedJobMarketPrefecture(prefectures);
  if (!selected) return;
  state.jobMarket.selectedPrefectureCode = selected.code;
  state.jobMarket.loading = true;
  state.jobMarket.error = "";
  state.jobMarket.stats = null;
  renderJobMarket(analytics);

  try {
    state.jobMarket.stats = await fetchMarketStats(jobMarketPrefectureRegion(selected), state.jobMarket.dataBasis);
  } catch (error) {
    state.jobMarket.error = error.message || "都道府県データを取得できませんでした";
  } finally {
    state.jobMarket.loading = false;
    renderJobMarket(getAnalytics("job"));
    saveState();
  }
}

async function fetchJobMarketForSelectedJob() {
  if (isJobMarketAccountMode()) {
    await fetchJobMarketAccountRegions();
    return;
  }
  const selectedJob = selectedJobMarketJob();
  if (!selectedJob) return;
  state.jobMarket.loading = true;
  state.jobMarket.error = "";
  state.jobMarket.stats = null;
  renderJobMarket(getAnalytics("job"));

  try {
    const query = jobMarketRegionQuery(selectedJob);
    const options = await resolveMarketRegions(query);
    if (!options.length) throw new Error("求人の市区町村に一致する地域候補が見つかりませんでした。");
    state.jobMarket.regionOptions = options.slice(0, 8);
    state.jobMarket.selectedRegionCode = state.jobMarket.regionOptions[0].regionCode;
    state.jobMarket.stats = await fetchMarketStats(state.jobMarket.regionOptions[0], state.jobMarket.dataBasis);
  } catch (error) {
    state.jobMarket.error = error.message || "地域データを取得できませんでした";
  } finally {
    state.jobMarket.loading = false;
    renderJobMarket(getAnalytics("job"));
    saveState();
  }
}

async function fetchJobMarketAccountRegions(analytics = getAnalytics("job")) {
  const regions = jobMarketAccountRegionOptions(analytics.filtered.job);
  const signature = jobMarketAccountSignature(regions);
  if (!regions.length) return;

  state.jobMarket.loading = true;
  state.jobMarket.error = "";
  state.jobMarket.stats = null;
  state.jobMarket.regionOptions = [];
  state.jobMarket.selectedRegionCode = "";
  renderJobMarket(analytics);

  try {
    const rows = [];
    for (const regionMetrics of regions) {
      try {
        const options = await resolveMarketRegions(regionMetrics.query);
        if (!options.length) throw new Error("地域候補なし");
        const region = options[0];
        rows.push({
          ...regionMetrics,
          region,
          stats: await fetchMarketStats(region, state.jobMarket.dataBasis),
          error: ""
        });
      } catch (error) {
        rows.push({
          ...regionMetrics,
          region: null,
          stats: null,
          error: error.message || "地域データを取得できませんでした"
        });
      }
    }
    state.jobMarket.accountRegions = rows;
    state.jobMarket.accountSignature = signature;
  } catch (error) {
    state.jobMarket.error = error.message || "全求人の地域データを取得できませんでした";
  } finally {
    state.jobMarket.loading = false;
    renderJobMarket(getAnalytics("job"));
    saveState();
  }
}

async function fetchSelectedJobMarketStats() {
  const selected = (state.jobMarket.regionOptions || []).find((option) => option.regionCode === state.jobMarket.selectedRegionCode);
  if (!selected) return;
  state.jobMarket.loading = true;
  state.jobMarket.error = "";
  state.jobMarket.stats = null;
  renderJobMarket(getAnalytics("job"));
  try {
    state.jobMarket.stats = await fetchMarketStats(selected, state.jobMarket.dataBasis);
  } catch (error) {
    state.jobMarket.error = error.message || "地域データを取得できませんでした";
  } finally {
    state.jobMarket.loading = false;
    renderJobMarket(getAnalytics("job"));
    saveState();
  }
}

function jobMarketRegionQuery(job) {
  return buildJobRegionQuery(job.prefecture, job.city) || job.name;
}

function jobMarketAccountRegionOptions(rows) {
  return aggregateBy(
    (rows || []).filter((row) => cleanText(row.city) && cleanText(row.city) !== "未分類"),
    (row) => {
      const pref = cleanText(row.prefecture).replace("未分類", "");
      return `${pref}\u001f${normalizeJobCity(pref, row.city)}`;
    },
    enrichJobMarketAccountRegion
  ).sort((a, b) => b.applications - a.applications || b.cost - a.cost || a.name.localeCompare(b.name, "ja"));
}

function enrichJobMarketAccountRegion(item) {
  const [prefecture, city] = item.name.split("\u001f");
  const pref = cleanText(prefecture);
  const cityName = cleanText(city);
  return {
    ...item,
    name: jobRegionLabel(pref, cityName),
    prefecture: pref,
    city: cityName,
    query: buildJobRegionQuery(pref, cityName)
  };
}

function buildJobRegionQuery(prefecture, city) {
  const pref = cleanText(prefecture).replace("未分類", "");
  const cityName = cleanText(city).replace("未分類", "");
  if (pref === "東京都" && isTokyoWholeAreaName(cityName)) return pref;
  if (pref && cityName && pref === cityName) return pref;
  return `${pref}${cityName}` || cityName || pref;
}

function jobRegionLabel(prefecture, city) {
  const pref = cleanText(prefecture).replace("未分類", "");
  const cityName = cleanText(city).replace("未分類", "");
  if (pref === "東京都" && isTokyoWholeAreaName(cityName)) return pref;
  if (pref && cityName && pref === cityName) return pref;
  return [pref, cityName].filter(Boolean).join(" ");
}

function jobAreaAggregationName(row) {
  const pref = cleanText(row.prefecture);
  const city = normalizeJobCity(pref, row.city);
  if (pref === "東京都" && city === "東京都") return "東京都";
  return city || pref || "未分類";
}

function jobMarketAccountSignature(regions) {
  return [
    state.jobMarket.dataBasis,
    ...regions.map((region) => [
      region.prefecture,
      region.city,
      Math.round(region.cost || 0),
      Math.round(region.applications || 0),
      Math.round(region.jobCount || 0)
    ].join(":"))
  ].join("|");
}

function renderTargetAnalysis(analytics) {
  if (!dom.targetAnalysisResult) return;
  if (state.activeTab !== "target") {
    return;
  }
  const prefectures = jobMarketPrefectureOptions(analytics.filtered.job);
  hydrateTargetAnalysisControls(prefectures);
  const selectedPrefecture = selectedTargetAnalysisScope(prefectures, analytics);

  if (!analytics.filtered.job.length) {
    dom.targetAnalysisResult.innerHTML = `<div class="market-empty-state">CSVを読み込むと都道府県・年齢・性別でターゲット分析できます</div>`;
    setTargetAnalysisStatus("");
    return;
  }

  if (!selectedPrefecture) {
    dom.targetAnalysisResult.innerHTML = `<div class="market-empty-state">都道府県を選択してください</div>`;
    setTargetAnalysisStatus("");
    return;
  }

  if (state.targetAnalysis.loading) {
    dom.targetAnalysisResult.innerHTML = `<div class="market-empty-state">ターゲット母集団を分析しています</div>`;
    setTargetAnalysisStatus("取得中");
    return;
  }

  if (state.targetAnalysis.error) {
    dom.targetAnalysisResult.innerHTML = `<div class="market-empty-state warn">${escapeHtml(state.targetAnalysis.error)}</div>`;
    setTargetAnalysisStatus("");
    return;
  }

  if (!state.targetAnalysis.stats) {
    dom.targetAnalysisResult.innerHTML = `<div class="market-empty-state">ターゲット分析を準備しています</div>`;
    fetchTargetAnalysisForSelectedPrefecture(analytics);
    return;
  }
  if (
    !targetStatsMatchesScope(selectedPrefecture, state.targetAnalysis.stats) ||
    !marketStatsMatchesBasis(state.targetAnalysis.stats, state.targetAnalysis.dataBasis)
  ) {
    resetTargetAnalysisRegion();
    fetchTargetAnalysisForSelectedPrefecture(analytics);
    return;
  }

  const context = buildTargetPrefectureContext(selectedPrefecture, analytics);
  const model = buildTargetAnalysisModel(context, state.targetAnalysis.stats);
  const strategySignature = targetStrategySignature(context, state.targetAnalysis.stats, model);
  model.strategySignature = strategySignature;
  model.strategyFallbackTips = model.strategyTips;
  model.strategyTips = targetStrategyTipsForSignature(strategySignature, model.strategyFallbackTips);
  model.strategyTipStatus = targetStrategyTipStatus(strategySignature);
  requestTargetCityPopulationStats(selectedPrefecture, analytics, context.cityRows || []);
  setTargetAnalysisStatus(`${selectedPrefecture.name} / ${marketDataBasis(state.targetAnalysis.dataBasis).label}`);
  dom.targetAnalysisResult.innerHTML = renderTargetAnalysisResult(context, state.targetAnalysis.stats, model);
  syncTargetStrategyTipTextareas(dom.targetAnalysisResult);
  maybeFetchTargetStrategyGemini(context, state.targetAnalysis.stats, model, strategySignature);
}

function hydrateTargetAnalysisControls(prefectures) {
  if (!analyticsHasTargetControls()) return;
  renderTargetControlCollapsedState();
  if (!prefectures.some((prefecture) => prefecture.hasJobs)) {
    state.targetAnalysis.selectedJobKey = "";
    state.targetAnalysis.selectedPrefectureCode = "";
    state.targetAnalysis.selectedCityKey = "";
    state.targetAnalysis.selectedRegionCode = "";
    state.targetAnalysis.regionOptions = [];
    state.targetAnalysis.stats = null;
    state.targetAnalysis.comparisons = [];
  }
  const selected = selectedTargetAnalysisScope(prefectures, getAnalytics("job"));
  const selectedPrefectureCode = selected?.prefectureCode || selected?.code || "";
  if (selected && state.targetAnalysis.selectedPrefectureCode !== selectedPrefectureCode) {
    state.targetAnalysis.selectedPrefectureCode = selectedPrefectureCode;
  }
  renderTargetPrefectureButtons(prefectures);
  renderTargetCitySelection(prefectures, getAnalytics("job"));
  if (dom.targetAnalysisBasisSelect) {
    dom.targetAnalysisBasisSelect.innerHTML = MARKET_DATA_BASIS_ORDER
      .map((key) => `<option value="${escapeHtml(key)}">${escapeHtml(MARKET_DATA_BASIS[key].label)}</option>`)
      .join("");
    dom.targetAnalysisBasisSelect.value = normalizeMarketDataBasis(state.targetAnalysis.dataBasis);
  }
  if (dom.targetAnalysisGenderSelect) dom.targetAnalysisGenderSelect.value = state.targetAnalysis.targetGender || "all";
  if (dom.targetAnalysisCommuteSelect) dom.targetAnalysisCommuteSelect.value = String(state.targetAnalysis.commuteKm || "10");
  hydrateTargetAgeChecks();
}

function refreshTargetAnalysisForSelectionChange() {
  state.targetAnalysis.cityStats = [];
  state.targetAnalysis.cityStatsLoading = false;
  state.targetAnalysis.cityStatsSignature = "";
  renderTargetAnalysis(getAnalytics("job"));
  saveState();
}

function renderTargetControlCollapsedState() {
  const collapsed = Boolean(state.targetAnalysis.controlsCollapsed);
  if (dom.targetAnalysisControlPanel) {
    dom.targetAnalysisControlPanel.classList.toggle("is-collapsed", collapsed);
  }
  if (dom.targetAnalysisControlBody) {
    dom.targetAnalysisControlBody.hidden = collapsed;
  }
  if (dom.targetAnalysisToggleButton) {
    dom.targetAnalysisToggleButton.textContent = collapsed ? "開く" : "閉じる";
    dom.targetAnalysisToggleButton.setAttribute("aria-expanded", String(!collapsed));
  }
}

function analyticsHasTargetControls() {
  return Boolean(dom.targetAnalysisPrefectureButtons || dom.targetAnalysisCitySelection || dom.targetAnalysisBasisSelect || dom.targetAnalysisGenderSelect);
}

function renderTargetPrefectureButtons(prefectures) {
  if (!dom.targetAnalysisPrefectureButtons) return;
  const available = prefectures.filter((prefecture) => prefecture.hasJobs);
  if (!available.length) {
    targetPrefectureControlsSignature = "";
    dom.targetAnalysisPrefectureButtons.innerHTML = `<div class="market-empty-state">CSVデータに都道府県がありません</div>`;
    return;
  }
  const byCode = new Map(available.map((prefecture) => [prefecture.code, prefecture]));
  const summary = summarize(available.flatMap((prefecture) => prefecture.rows || []), available.flatMap((prefecture) => prefecture.rows || []));
  const groups = PREFECTURE_REGION_GROUPS.map((group) => ({
    label: group.label,
    options: group.codes.map((code) => byCode.get(code)).filter(Boolean)
  })).filter((group) => group.options.length);
  const signature = [
    `${summary.jobCount}:${summary.applications}`,
    ...available.map((prefecture) => `${prefecture.code}:${prefecture.jobCount}:${prefecture.applications}`)
  ].join("|");
  if (targetPrefectureControlsSignature === signature && dom.targetAnalysisPrefectureButtons.children.length) {
    renderTargetPrefectureSelectionState(state.targetAnalysis.selectedPrefectureCode);
    return;
  }
  targetPrefectureControlsSignature = signature;
  dom.targetAnalysisPrefectureButtons.innerHTML = `
    <div class="target-prefecture-heading">
      <strong>都道府県選択</strong>
    </div>
    ${renderTargetAllPrefectureButton(summary)}
    ${groups.map(renderTargetPrefectureSelect).join("")}
  `;
  renderTargetPrefectureSelectionState(state.targetAnalysis.selectedPrefectureCode);
}

function renderTargetPrefectureSelectionState(selectedCode) {
  if (!dom.targetAnalysisPrefectureButtons) return;
  const allSelected = selectedCode === TARGET_ALL_PREFECTURES_KEY;
  dom.targetAnalysisPrefectureButtons
    .querySelectorAll("button[data-target-all-prefectures]")
    .forEach((button) => button.classList.toggle("active", allSelected));
  dom.targetAnalysisPrefectureButtons
    .querySelectorAll("label.prefecture-select-field")
    .forEach((field) => {
      const select = field.querySelector("select[data-prefecture-select]");
      if (select) {
        const hasSelectedOption = [...select.options].some((option) => option.value === selectedCode);
        select.value = hasSelectedOption ? selectedCode : "";
      }
      field.classList.toggle("active", Boolean(select?.value && select.value === selectedCode));
    });
}

function renderTargetAllPrefectureButton(summary) {
  return `
    <button
      class="prefecture-button prefecture-all-button ${state.targetAnalysis.selectedPrefectureCode === TARGET_ALL_PREFECTURES_KEY ? "active" : ""}"
      type="button"
      data-target-all-prefectures="true"
    >
      <strong>全体</strong>
      <span>全選択 / ${formatNumber(summary.jobCount)}件 / ${formatNumber(summary.applications)}応募</span>
    </button>
  `;
}

function renderTargetPrefectureSelect(group) {
  const selectedInGroup = group.options.some((option) => option.code === state.targetAnalysis.selectedPrefectureCode);
  return `
    <label class="prefecture-select-field ${selectedInGroup ? "active" : ""}">
      ${escapeHtml(group.label)}
      <select data-prefecture-select aria-label="${escapeHtml(group.label)}">
        <option value="">選択</option>
        ${group.options.map((option) => `
          <option value="${escapeHtml(option.code)}" ${option.code === state.targetAnalysis.selectedPrefectureCode ? "selected" : ""}>
            ${escapeHtml(option.name)}（${formatNumber(option.jobCount)}件 / ${formatNumber(option.applications)}応募）
          </option>
        `).join("")}
      </select>
    </label>
  `;
}

function renderTargetCitySelection(prefectures, analytics = getAnalytics("job")) {
  if (!dom.targetAnalysisCitySelection) return;
  if (state.targetAnalysis.selectedPrefectureCode === TARGET_ALL_PREFECTURES_KEY) {
    targetCityControlsSignature = "";
    state.targetAnalysis.selectedCityKey = "";
    dom.targetAnalysisCitySelection.innerHTML = `
      <section class="target-city-picker is-muted">
        <div class="target-city-heading">
          <strong>市区町村選択</strong>
          <span>全体選択中は都道府県横断で集計しています</span>
        </div>
      </section>
    `;
    return;
  }

  const prefecture = selectedTargetAnalysisPrefecture(prefectures);
  if (!prefecture?.hasJobs) {
    targetCityControlsSignature = "";
    state.targetAnalysis.selectedCityKey = "";
    dom.targetAnalysisCitySelection.innerHTML = "";
    return;
  }

  const cities = targetCityBreakdownRows(prefecture, analytics, Infinity);
  const selectedExists = cities.some((city) => city.cityKey === state.targetAnalysis.selectedCityKey);
  if (state.targetAnalysis.selectedCityKey && !selectedExists) state.targetAnalysis.selectedCityKey = "";
  const selectedCityKey = state.targetAnalysis.selectedCityKey || "";
  const signature = [
    prefecture.code,
    selectedCityKey,
    ...cities.map((city) => `${city.cityKey}:${city.jobCount}:${city.applications}`)
  ].join("|");

  if (targetCityControlsSignature === signature && dom.targetAnalysisCitySelection.children.length) {
    renderTargetCitySelectionState(selectedCityKey);
    return;
  }

  targetCityControlsSignature = signature;
  dom.targetAnalysisCitySelection.innerHTML = `
    <section class="target-city-picker">
      <div class="target-city-heading">
        <strong>市区町村選択</strong>
      </div>
      <div class="target-city-actions">
        <button
          class="target-city-button target-city-all-button ${selectedCityKey ? "" : "active"}"
          type="button"
          data-target-city-key="${TARGET_PREFECTURE_CITY_KEY}"
        >
          <strong>全体</strong>
          <span>都道府県単位</span>
        </button>
        ${cities.map((city) => renderTargetCityButton(city, selectedCityKey)).join("")}
      </div>
    </section>
  `;
  renderTargetCitySelectionState(selectedCityKey);
}

function renderTargetCityButton(city, selectedCityKey) {
  return `
    <button
      class="target-city-button ${city.cityKey === selectedCityKey ? "active" : ""}"
      type="button"
      data-target-city-key="${escapeHtml(city.cityKey)}"
    >
      <strong>${escapeHtml(city.name)}</strong>
      <span>${formatNumber(city.jobCount)}件 / ${formatNumber(city.applications)}応募</span>
    </button>
  `;
}

function renderTargetCitySelectionState(selectedCityKey) {
  if (!dom.targetAnalysisCitySelection) return;
  dom.targetAnalysisCitySelection
    .querySelectorAll("button[data-target-city-key]")
    .forEach((button) => {
      const key = button.dataset.targetCityKey === TARGET_PREFECTURE_CITY_KEY ? "" : button.dataset.targetCityKey;
      button.classList.toggle("active", key === selectedCityKey);
    });
  dom.targetAnalysisCitySelection
    .querySelectorAll("select[data-target-city-select]")
    .forEach((select) => {
      const value = selectedCityKey || TARGET_PREFECTURE_CITY_KEY;
      const hasOption = [...select.options].some((option) => option.value === value);
      select.value = hasOption ? value : TARGET_PREFECTURE_CITY_KEY;
      select.closest(".target-city-select-field")?.classList.toggle("active", Boolean(selectedCityKey));
    });
}

function selectedTargetAnalysisCity(prefecture, analytics = getAnalytics("job")) {
  if (!prefecture || !state.targetAnalysis.selectedCityKey) return null;
  return targetCityBreakdownRows(prefecture, analytics, Infinity)
    .find((city) => city.cityKey === state.targetAnalysis.selectedCityKey) || null;
}

function buildTargetCityScope(prefecture, city) {
  return {
    ...city,
    code: `city:${city.cityKey}`,
    scope: "city",
    prefectureCode: prefecture.code,
    prefectureName: prefecture.name,
    hasJobs: true
  };
}

function selectedTargetAnalysisPrefecture(prefectures) {
  if (!prefectures.length) return null;
  const current = prefectures.find((prefecture) => prefecture.code === state.targetAnalysis.selectedPrefectureCode);
  if (current?.hasJobs) return current;
  return prefectures
    .filter((prefecture) => prefecture.hasJobs)
    .sort((a, b) => b.applications - a.applications || b.cost - a.cost)[0] || prefectures[0];
}

function selectedTargetAnalysisScope(prefectures, analytics = getAnalytics("job")) {
  const available = prefectures.filter((prefecture) => prefecture.hasJobs);
  if (state.targetAnalysis.selectedPrefectureCode === TARGET_ALL_PREFECTURES_KEY) return buildAllPrefectureScope(available, analytics);
  const prefecture = selectedTargetAnalysisPrefecture(prefectures);
  if (!prefecture) return null;
  const city = selectedTargetAnalysisCity(prefecture, analytics);
  return city ? buildTargetCityScope(prefecture, city) : prefecture;
}

function buildAllPrefectureScope(prefectures, analytics = getAnalytics("job")) {
  return {
    code: TARGET_ALL_PREFECTURES_KEY,
    name: "全選択",
    hasJobs: true,
    prefectures: prefectures.filter((prefecture) => prefecture.hasJobs),
    rows: analytics.filtered.job || []
  };
}

function targetAnalysisScopeKey(scope) {
  if (!scope) return "";
  return scope.scope === "city" ? `city:${scope.cityKey}` : scope.code;
}

function currentTargetAnalysisScopeKey() {
  const analytics = getAnalytics("job");
  const scope = selectedTargetAnalysisScope(jobMarketPrefectureOptions(analytics.filtered.job), analytics);
  return targetAnalysisScopeKey(scope);
}

async function targetAnalysisRegionForScope(scope) {
  if (scope?.scope === "city") return resolveTargetCityRegion(scope);
  return jobMarketPrefectureRegion(scope);
}


function targetStatsMatchesScope(scope, stats) {
  if (!scope || !stats) return false;
  if (stats.version !== TARGET_STATS_VERSION) return false;
  if (scope.code === TARGET_ALL_PREFECTURES_KEY) return stats.region?.regionCode === TARGET_ALL_PREFECTURES_KEY;
  if (scope.scope === "city") {
    const cachedRegion = targetCityRegionCache.get(scope.cityKey);
    return Boolean(cachedRegion?.regionCode && stats.region?.regionCode === cachedRegion.regionCode);
  }
  return stats.region?.regionCode === scope.code;
}

function hydrateTargetAgeChecks() {
  const selected = new Set(normalizedTargetAgeGroups());
  dom.targetAnalysisAgeGroups?.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.checked = selected.has(input.value);
  });
}

function checkedTargetAgeGroups() {
  const values = [...(dom.targetAnalysisAgeGroups?.querySelectorAll("input[type='checkbox']:checked") || [])].map((input) => input.value);
  return values.length ? values : ["20-29", "30-39"];
}

function normalizedTargetAgeGroups() {
  const labels = new Set(MARKET_AGE_GROUPS.map((group) => group.label));
  const selected = (state.targetAnalysis.targetAgeGroups || [])
    .map(normalizeTargetAgeGroupLabel)
    .filter((label) => labels.has(label));
  return selected.length ? selected : ["20-29", "30-39"];
}

function normalizeTargetAgeGroupLabel(label) {
  const text = cleanText(label);
  if (text === "60代〜") return "60-64";
  return text;
}

function selectedTargetAnalysisJob(jobs = jobMarketOptions(getAnalytics("job").jobs)) {
  return jobs.find((job) => jobMarketKey(job) === state.targetAnalysis.selectedJobKey) || jobs[0] || null;
}

function setTargetAnalysisStatus(value) {
  if (dom.targetAnalysisStatusText) dom.targetAnalysisStatusText.textContent = value || "";
}

function resetTargetAnalysisRegion() {
  state.targetAnalysis.selectedRegionCode = "";
  state.targetAnalysis.regionOptions = [];
  state.targetAnalysis.stats = null;
  state.targetAnalysis.comparisons = [];
  targetCityControlsSignature = "";
  state.targetAnalysis.cityStats = [];
  state.targetAnalysis.cityStatsLoading = false;
  state.targetAnalysis.cityStatsSignature = "";
  state.targetAnalysis.error = "";
}

async function fetchTargetAnalysisForSelectedPrefecture(analytics = getAnalytics("job")) {
  const prefectures = jobMarketPrefectureOptions(analytics.filtered.job);
  const selected = selectedTargetAnalysisScope(prefectures, analytics);
  if (!selected) return;
  const requestId = (state.targetAnalysis.requestId || 0) + 1;
  const selectedScopeKey = targetAnalysisScopeKey(selected);
  const dataBasis = state.targetAnalysis.dataBasis;
  state.targetAnalysis.requestId = requestId;
  state.targetAnalysis.selectedPrefectureCode = selected.prefectureCode || selected.code;
  state.targetAnalysis.loading = true;
  state.targetAnalysis.error = "";
  state.targetAnalysis.stats = null;
  state.targetAnalysis.comparisons = [];
  renderTargetAnalysis(analytics);

  try {
    const stats = selected.code === TARGET_ALL_PREFECTURES_KEY
      ? await fetchAllTargetPrefectureStats(selected, dataBasis)
      : await fetchTargetAnalysisStats(await targetAnalysisRegionForScope(selected), dataBasis);
    if (!isCurrentTargetAnalysisRequest(requestId, selectedScopeKey, dataBasis)) return;
    state.targetAnalysis.stats = stats;
    state.targetAnalysis.comparisons = [];
  } catch (error) {
    if (!isCurrentTargetAnalysisRequest(requestId, selectedScopeKey, dataBasis)) return;
    state.targetAnalysis.error = error.message || "ターゲット分析を取得できませんでした";
  } finally {
    if (!isCurrentTargetAnalysisRequest(requestId, selectedScopeKey, dataBasis)) return;
    state.targetAnalysis.loading = false;
    renderTargetAnalysis(getAnalytics("job"));
    saveState();
  }
}

function isCurrentTargetAnalysisRequest(requestId, selectedScopeKey, dataBasis) {
  return state.targetAnalysis.requestId === requestId
    && currentTargetAnalysisScopeKey() === selectedScopeKey
    && state.targetAnalysis.dataBasis === dataBasis;
}

async function fetchAllTargetPrefectureStats(scope, dataBasis = state.targetAnalysis.dataBasis) {
  const statsRows = (await mapWithConcurrency(scope.prefectures || [], 4, async (prefecture) => {
    try {
      return await fetchTargetAnalysisStats(jobMarketPrefectureRegion(prefecture), dataBasis, { includeShiftSurvey: false });
    } catch {
      // 全選択では取得できた都道府県だけ合算します。
      return null;
    }
  })).filter(Boolean);
  if (!statsRows.length) throw new Error("都道府県データを取得できませんでした");
  const first = statsRows[0];
  const values = combineMarketPopulationValues(statsRows);
  const basis = marketDataBasis(dataBasis);
  const population = {
    basis,
    values,
    times: Object.fromEntries(Object.keys(values).map((key) => [key, `${basis.year}CY00`])),
    series: {},
    sourceName: first.population?.sourceName || "統計"
  };
  return {
    region: {
      regionCode: TARGET_ALL_PREFECTURES_KEY,
      name: "全選択",
      parentName: "",
      prefName: "全都道府県",
      prefCode: TARGET_ALL_PREFECTURES_KEY
    },
    population,
    dataBasis: basis,
    shiftSurvey: combineEmploymentStatusSurveys(statsRows.map((stats) => stats.shiftSurvey)),
    laborStatus: combineCensusLaborStatuses(statsRows.map((stats) => stats.laborStatus)),
    seekingStatus: combineEmploymentSeekingStatuses(statsRows.map((stats) => stats.seekingStatus)),
    wageBenchmarks: combineWageBenchmarks(statsRows.map((stats) => stats.wageBenchmarks)),
    version: TARGET_STATS_VERSION,
    jobRatio: {
      value: average(statsRows.map((stats) => stats.jobRatio?.value).filter((value) => Number.isFinite(value))),
      time: first.jobRatio?.time || ""
    },
    fetchedAt: new Date().toISOString()
  };
}

async function fetchTargetAnalysisForSelectedJob() {
  const selectedJob = selectedTargetAnalysisJob();
  if (!selectedJob) return;
  state.targetAnalysis.loading = true;
  state.targetAnalysis.error = "";
  state.targetAnalysis.stats = null;
  state.targetAnalysis.comparisons = [];
  renderTargetAnalysis(getAnalytics("job"));

  try {
    const query = jobMarketRegionQuery(selectedJob);
    const options = await resolveMarketRegions(query);
    if (!options.length) throw new Error("求人の市区町村に一致する地域候補が見つかりませんでした。");
    state.targetAnalysis.regionOptions = options.slice(0, 8);
    state.targetAnalysis.selectedRegionCode = state.targetAnalysis.regionOptions[0].regionCode;
    state.targetAnalysis.stats = await fetchTargetAnalysisStats(state.targetAnalysis.regionOptions[0], state.targetAnalysis.dataBasis);
    state.targetAnalysis.comparisons = [];
  } catch (error) {
    state.targetAnalysis.error = error.message || "ターゲット分析を取得できませんでした";
  } finally {
    state.targetAnalysis.loading = false;
    renderTargetAnalysis(getAnalytics("job"));
    saveState();
  }
}

async function fetchSelectedTargetAnalysisStats() {
  const selected = (state.targetAnalysis.regionOptions || []).find((option) => option.regionCode === state.targetAnalysis.selectedRegionCode);
  const selectedJob = selectedTargetAnalysisJob();
  if (!selected || !selectedJob) return;
  state.targetAnalysis.loading = true;
  state.targetAnalysis.error = "";
  state.targetAnalysis.stats = null;
  state.targetAnalysis.comparisons = [];
  renderTargetAnalysis(getAnalytics("job"));
  try {
    state.targetAnalysis.stats = await fetchTargetAnalysisStats(selected, state.targetAnalysis.dataBasis);
    state.targetAnalysis.comparisons = [];
  } catch (error) {
    state.targetAnalysis.error = error.message || "ターゲット分析を取得できませんでした";
  } finally {
    state.targetAnalysis.loading = false;
    renderTargetAnalysis(getAnalytics("job"));
    saveState();
  }
}

async function fetchTargetComparisonStats(job, primaryStats) {
  const candidates = targetComparisonCandidates(job);
  const comparisons = [{
    label: marketRegionDisplayName(primaryStats.region),
    query: jobMarketRegionQuery(job),
    stats: primaryStats,
    current: true
  }];
  for (const candidate of candidates) {
    try {
      const options = await resolveMarketRegions(candidate.query);
      const region = options.find((option) => option.regionCode !== primaryStats.region.regionCode) || options[0];
      if (!region || comparisons.some((item) => item.stats.region.regionCode === region.regionCode)) continue;
      comparisons.push({
        label: candidate.label,
        query: candidate.query,
        stats: await fetchMarketStats(region, state.targetAnalysis.dataBasis),
        current: false
      });
    } catch {
      // 比較候補は取れる範囲だけ表示します。
    }
    if (comparisons.length >= 4) break;
  }
  return comparisons;
}

async function fetchTargetPrefectureComparisonStats(selectedPrefecture, analytics, primaryStats, dataBasis = state.targetAnalysis.dataBasis) {
  const prefectures = jobMarketPrefectureOptions(analytics.filtered.job)
    .filter((prefecture) => prefecture.hasJobs)
    .sort((a, b) => b.applications - a.applications || b.cost - a.cost);
  const candidates = selectedPrefecture.code === TARGET_ALL_PREFECTURES_KEY
    ? prefectures.slice(0, 4)
    : uniqueBy([selectedPrefecture, ...prefectures], (prefecture) => prefecture.code).slice(0, 4);
  const rows = [];
  for (const prefecture of candidates) {
    try {
      const stats = prefecture.code === selectedPrefecture.code
        ? primaryStats
        : await fetchMarketStats(jobMarketPrefectureRegion(prefecture), dataBasis);
      rows.push({
        label: prefecture.name,
        stats,
        context: buildTargetPrefectureContext(prefecture, analytics),
        current: prefecture.code === selectedPrefecture.code
      });
    } catch {
      // 比較は取れる都道府県だけ表示します。
    }
  }
  return rows;
}

function uniqueBy(rows, keyFn) {
  const seen = new Set();
  return rows.filter((row) => {
    const key = keyFn(row);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function targetComparisonCandidates(job) {
  const pref = cleanText(job.prefecture).replace("未分類", "");
  return getAnalytics("job").cities
    .filter((city) => cleanText(city.name) && city.name !== "未分類" && city.name !== job.city)
    .sort((a, b) => b.applications - a.applications || b.cost - a.cost)
    .slice(0, 8)
    .map((city) => ({
      label: city.name,
      query: buildJobRegionQuery(pref, city.name)
    }));
}

function buildTargetPrefectureContext(prefecture, analytics) {
  const rows = targetRowsForScope(prefecture, analytics);
  const summary = summarize(rows, rows);
  const cityRows = targetCityBreakdownRows(prefecture, analytics);
  const jobTypeRows = aggregateBy(rows, (row) => row.jobType)
    .filter((item) => item.name && item.name !== "未分類")
    .sort((a, b) => b.applications - a.applications || b.cost - a.cost)
    .slice(0, 6);
  return {
    ...prefecture,
    scope: prefecture.scope || "prefecture",
    summary,
    rows,
    cityRows,
    jobTypeRows,
    cpa: summary.cpa,
    applyRate: summary.applyRate,
    campaign: prefecture.scope === "city" ? prefecture.name : `${prefecture.name}全体`,
    name: prefecture.name
  };
}

function targetCityBreakdownRows(scope, analytics, limit = 5) {
  const rows = targetRowsForScope(scope, analytics);
  const allScope = scope.code === TARGET_ALL_PREFECTURES_KEY;
  const cities = aggregateBy(
    rows.filter((row) => cleanText(row.city) && cleanText(row.city) !== "未分類"),
    (row) => {
      const pref = cleanText(row.prefecture).replace("未分類", "");
      const city = normalizeJobCity(pref, row.city);
      return `${pref}\u001f${city}`;
    },
    (item) => enrichTargetCityBreakdown(item, allScope)
  )
    .filter((item) => item.name && item.name !== "未分類")
    .sort((a, b) => b.applications - a.applications || b.cost - a.cost || a.name.localeCompare(b.name, "ja"));
  return Number.isFinite(limit) ? cities.slice(0, limit) : cities;
}

function targetRowsForScope(scope, analytics) {
  if (!scope) return [];
  if (scope.code === TARGET_ALL_PREFECTURES_KEY) return analytics.filtered.job || [];
  if (scope.scope === "city") {
    return (analytics.filtered.job || []).filter((row) => {
      const pref = cleanText(row.prefecture).replace("未分類", "");
      const city = normalizeJobCity(pref, row.city);
      return prefectureCodeForName(pref) === scope.prefectureCode && targetCityKey(pref, city) === scope.cityKey;
    });
  }
  return jobMarketRowsForPrefecture(analytics.filtered.job, scope.code);
}

function enrichTargetCityBreakdown(item, allScope) {
  const [prefecture, city] = item.name.split("\u001f");
  const pref = cleanText(prefecture);
  const cityName = normalizeJobCity(pref, city);
  const displayName = allScope ? jobRegionLabel(pref, cityName) : jobAreaAggregationName({ prefecture: pref, city: cityName });
  return {
    ...item,
    name: displayName || "未分類",
    prefecture: pref,
    city: cityName,
    cityKey: targetCityKey(pref, cityName),
    query: buildJobRegionQuery(pref, cityName)
  };
}

function targetCityKey(prefecture, city) {
  return `${cleanText(prefecture)}\u001f${normalizeJobCity(prefecture, city)}`;
}

function requestTargetCityPopulationStats(scope, analytics, cityRows) {
  if (!targetCityStatsNeedFetch(cityRows)) return;
  const scopeKey = targetAnalysisScopeKey(scope);
  const dataBasis = state.targetAnalysis.dataBasis;
  const targetAgeLabels = normalizedTargetAgeGroups();
  const gender = state.targetAnalysis.targetGender || "all";
  const signature = targetCityPopulationSignature(dataBasis, targetAgeLabels, gender);
  state.targetAnalysis.cityStats = [];
  state.targetAnalysis.cityStatsLoading = true;
  state.targetAnalysis.cityStatsSignature = signature;
  fetchTargetCityPopulationStats(scope, analytics, dataBasis, targetAgeLabels, gender, signature)
    .then((cityStats) => {
      if (!isCurrentTargetCityPopulationRequest(scopeKey, dataBasis, signature)) return;
      state.targetAnalysis.cityStats = cityStats;
      state.targetAnalysis.cityStatsLoading = false;
      renderTargetAnalysis(getAnalytics("job"));
      saveState();
    })
    .catch(() => {
      if (!isCurrentTargetCityPopulationRequest(scopeKey, dataBasis, signature)) return;
      state.targetAnalysis.cityStats = [];
      state.targetAnalysis.cityStatsLoading = false;
      renderTargetAnalysis(getAnalytics("job"));
    });
}

function targetCityStatsNeedFetch(cityRows) {
  if (!cityRows.length) return false;
  const signature = currentTargetCityPopulationSignature();
  if (state.targetAnalysis.cityStatsLoading && state.targetAnalysis.cityStatsSignature === signature) return false;
  if (state.targetAnalysis.cityStatsSignature !== signature) return true;
  const fetchedKeys = new Set((state.targetAnalysis.cityStats || []).map((item) => item.key));
  return cityRows.some((row) => !fetchedKeys.has(row.cityKey));
}

function currentTargetCityPopulationSignature() {
  return targetCityPopulationSignature(
    state.targetAnalysis.dataBasis,
    normalizedTargetAgeGroups(),
    state.targetAnalysis.targetGender || "all"
  );
}

function targetCityPopulationSignature(dataBasis, targetAgeLabels, gender) {
  return [dataBasis, gender, ...(targetAgeLabels || [])].join("|");
}

function isCurrentTargetCityPopulationRequest(scopeKey, dataBasis, signature) {
  return currentTargetAnalysisScopeKey() === scopeKey
    && state.targetAnalysis.dataBasis === dataBasis
    && state.targetAnalysis.cityStatsSignature === signature;
}

async function fetchTargetCityPopulationStats(scope, analytics, dataBasis = state.targetAnalysis.dataBasis, targetAgeLabels = normalizedTargetAgeGroups(), gender = state.targetAnalysis.targetGender || "all", signature = targetCityPopulationSignature(dataBasis, targetAgeLabels, gender), onResult = null) {
  const rows = targetCityBreakdownRows(scope, analytics);
  return mapWithConcurrency(rows, 5, async (row) => {
    const cacheKey = `${signature}|${row.cityKey}`;
    if (targetCityPopulationCache.has(cacheKey)) {
      const cached = targetCityPopulationCache.get(cacheKey);
      onResult?.(cached);
      return cached;
    }
    try {
      const region = await resolveTargetCityRegion(row);
      const targetPopulation = await fetchMarketTargetPopulation(region.regionCode, dataBasis, targetAgeLabels, gender);
      const result = {
        key: row.cityKey,
        name: row.name,
        region,
        targetPopulation,
        signature
      };
      targetCityPopulationCache.set(cacheKey, result);
      onResult?.(result);
      return result;
    } catch (error) {
      const result = {
        key: row.cityKey,
        name: row.name,
        error: error.message || "人口未取得",
        signature
      };
      onResult?.(result);
      return result;
    }
  });
}

async function fetchMarketTargetPopulation(regionCode, dataBasis, targetAgeLabels, gender) {
  const basis = marketDataBasis(dataBasis);
  const indicatorMap = basis.source === "projection" ? MARKET_PROJECTION_INDICATORS : MARKET_POPULATION_INDICATORS;
  const specs = targetAgeIndicatorKeys(targetAgeLabels, gender)
    .map((key) => indicatorMap[key])
    .filter(Boolean);
  const indicators = unique(specs.flat().filter(Boolean));
  if (!indicators.length) return 0;
  const records = await fetchMarketIndicatorRecords(regionCode, indicators, basis.source);
  if (basis.source === "projection") {
    return Math.round(specs.reduce((sum, spec) => sum + projectedValueForIndicatorSpec(records, spec, basis.year), 0));
  }
  return Math.round(specs.reduce((sum, spec) => sum + valueForIndicatorSpecAtTime(records, spec, `${basis.year}CY00`), 0));
}

function targetAgeIndicatorKeys(targetAgeLabels, gender) {
  const selected = new Set(targetAgeLabels || []);
  return MARKET_AGE_GROUPS
    .filter((group) => selected.has(group.label))
    .flatMap((group) => group.keys)
    .map((key) => targetAgeValueKey(key, gender));
}

async function fetchMarketIndicatorRecords(regionCode, indicators, source) {
  const chunks = [];
  const regionalRank = marketRegionalRankFromCode(regionCode);
  for (let index = 0; index < indicators.length; index += 5) {
    chunks.push(indicators.slice(index, index + 5));
  }
  return (await Promise.all(chunks.map((chunk) => fetchDashboardData({
    IndicatorCode: chunk.join(","),
    RegionCode: regionCode,
    Cycle: "3",
    RegionalRank: regionalRank,
    IsSeasonalAdjustment: "1",
    TimeFrom: source === "projection" ? "2025CY00" : "2000CY00"
  })))).flat();
}

async function resolveTargetCityRegion(row) {
  if (targetCityRegionCache.has(row.cityKey)) return targetCityRegionCache.get(row.cityKey);
  const prefCode = prefectureCodeForName(row.prefecture);
  if (!prefCode) throw new Error("都道府県を判定できませんでした");
  if (row.prefecture === "東京都" && isTokyoWholeAreaName(row.city)) {
    const region = jobMarketPrefectureRegion({ code: prefCode, name: row.prefecture });
    targetCityRegionCache.set(row.cityKey, region);
    return region;
  }
  if (row.prefecture && row.prefecture === row.city) {
    const region = jobMarketPrefectureRegion({ code: prefCode, name: row.prefecture });
    targetCityRegionCache.set(row.cityKey, region);
    return region;
  }
  const options = await resolveMarketRegions(row.query);
  if (!options.length) throw new Error("地域候補が見つかりませんでした");
  const cityName = normalizeMarketText(row.city);
  const samePrefecture = options.filter((option) => prefectureCodeFromRegion(option.regionCode) === prefCode);
  const region = samePrefecture.find((option) => normalizeMarketText(option.name) === cityName)
    || samePrefecture.find((option) => option.level === "4")
    || samePrefecture[0]
    || options[0];
  targetCityRegionCache.set(row.cityKey, region);
  return region;
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function buildTargetAnalysisModel(context, stats) {
  const targetAgeLabels = normalizedTargetAgeGroups();
  const gender = state.targetAnalysis.targetGender || "all";
  const areaScope = context?.scope === "prefecture" || context?.scope === "city";
  const commuteKm = areaScope ? 0 : Number(state.targetAnalysis.commuteKm) || 10;
  const commuteFactor = areaScope ? 1 : targetCommuteFactor(commuteKm);
  const groups = targetGenderAgeGroups(stats.population.values, gender);
  const selectedGroups = groups.filter((group) => targetAgeLabels.includes(group.label));
  const rawPopulation = selectedGroups.reduce((sum, group) => sum + group.value, 0);
  const targetPopulation = Math.round(rawPopulation * commuteFactor);
  const totalPopulation = stats.population.values.total || 0;
  const targetShare = safeDivide(rawPopulation, totalPopulation);
  const latestAdultPopulation = targetLatestAdultPopulation(stats.population.values, gender);
  const laborStatusValues = estimateLatestLaborStatusValues(targetLaborStatusValues(stats, gender), latestAdultPopulation);
  const seekingValues = estimateLatestSeekingStatusValues(targetSeekingStatusValues(stats, gender), laborStatusValues);
  const laborPopulation = Math.round(laborStatusValues.laborForce || targetLaborPopulation(stats.population.values, gender));
  const wageBenchmarks = targetWageBenchmarkModel(context, stats, gender);
  const salaryBenchmark = targetSalaryBenchmark(context);
  const commuteScenarios = areaScope ? targetReachScenarios(rawPopulation) : targetCommuteScenarios(rawPopulation, commuteKm);
  const expansionOptions = targetExpansionOptions(stats, targetAgeLabels, gender, commuteKm, targetPopulation);
  const difficulty = targetDifficultyScore({
    targetPopulation,
    targetShare,
    jobRatio: stats.jobRatio?.value || 0,
    cpa: context.cpa || 0,
    applyRate: context.applyRate || 0
  });
  return {
    scope: context.scope || "job",
    targetAgeLabels,
    gender,
    commuteKm,
    commuteFactor,
    groups,
    selectedGroups,
    rawPopulation,
    targetPopulation,
    targetShare,
    laborPopulation,
    laborStatusValues,
    seekingValues,
    wageBenchmarks,
    salaryBenchmark,
    commuteScenarios,
    expansionOptions,
    difficulty,
    appealSuggestions: targetAppealSuggestions(context, {
      targetAgeLabels,
      gender,
      difficulty,
      jobRatio: stats.jobRatio?.value || 0
    }),
    strategyTips: targetStrategyTips(context, {
      stats,
      targetAgeLabels,
      gender,
      laborStatusValues,
      seekingValues,
      wageBenchmarks,
      salaryBenchmark,
      targetPopulation,
      totalPopulation
    }),
    basis: marketDataBasis(stats.dataBasis?.key || stats.population.basis?.key),
    populationTime: formatDashboardTime(stats.population.times.total)
  };
}

function targetCommuteScenarios(rawPopulation, activeKm) {
  return [5, 10, 15].map((km) => ({
    km,
    population: Math.round(rawPopulation * targetCommuteFactor(km)),
    active: Number(activeKm) === km
  }));
}

function targetReachScenarios(rawPopulation) {
  return [
    { label: "控えめ配信", population: Math.round(rawPopulation * 0.35), active: false },
    { label: "標準配信", population: Math.round(rawPopulation * 0.65), active: true },
    { label: "最大配信", population: Math.round(rawPopulation), active: false }
  ];
}

function targetExpansionOptions(stats, selectedLabels, gender, commuteKm, currentPopulation) {
  const groupLabels = MARKET_AGE_GROUPS.map((group) => group.label);
  const indexes = selectedLabels
    .map((label) => groupLabels.indexOf(label))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b);
  if (!indexes.length) return [];

  const minIndex = indexes[0];
  const maxIndex = indexes.at(-1);
  const options = [];
  const addOption = (title, labels, nextGender, note) => {
    const safeLabels = unique(labels.filter((label) => groupLabels.includes(label)));
    if (!safeLabels.length) return;
    const population = targetPopulationFor(stats, safeLabels, nextGender, commuteKm);
    const lift = safeDivide(population, currentPopulation);
    if (population <= currentPopulation * 1.05) return;
    options.push({
      title,
      labels: safeLabels,
      gender: nextGender,
      population,
      lift,
      note
    });
  };

  addOption(
    "年齢を前後に広げる",
    groupLabels.slice(Math.max(0, minIndex - 1), Math.min(groupLabels.length, maxIndex + 2)),
    gender,
    "希望層に近い年代まで広げる案"
  );
  addOption(
    "上の年代まで広げる",
    groupLabels.slice(minIndex, Math.min(groupLabels.length, maxIndex + 2)),
    gender,
    "経験層も拾って母集団を増やす案"
  );
  if (gender !== "all") {
    addOption(
      "性別を限定しない",
      selectedLabels,
      "all",
      "訴求は維持しつつ配信母集団を広げる案"
    );
    addOption(
      "年齢・性別を広げる",
      groupLabels.slice(Math.max(0, minIndex - 1), Math.min(groupLabels.length, maxIndex + 2)),
      "all",
      "応募獲得を優先する場合の拡張案"
    );
  }

  return options
    .sort((a, b) => b.lift - a.lift || b.population - a.population)
    .slice(0, 3);
}

function targetPopulationFor(stats, labels, gender, commuteKm) {
  const rawPopulation = targetRawPopulationFor(stats, labels, gender);
  return Math.round(rawPopulation * (commuteKm ? targetCommuteFactor(commuteKm) : 1));
}

function targetRawPopulationFor(stats, labels, gender) {
  const selected = new Set(labels);
  return targetGenderAgeGroups(stats.population.values, gender)
    .filter((group) => selected.has(group.label))
    .reduce((sum, group) => sum + group.value, 0);
}

function targetLaborStatusValues(stats, gender) {
  return targetGenderScopedValues(stats?.laborStatus?.values, gender);
}

function targetSeekingStatusValues(stats, gender) {
  return targetGenderScopedValues(stats?.seekingStatus?.values, gender);
}

function targetLatestAdultPopulation(values, gender) {
  const total = [
    "age15_19",
    "age20_24",
    "age25_29",
    "age30_34",
    "age35_39",
    "age40_44",
    "age45_49",
    "age50_54",
    "age55_59",
    "age60Plus"
  ].reduce((sum, key) => sum + (Number(values[targetAgeValueKey(key, gender)]) || 0), 0);
  if (total) return total;
  const scopedTotalKey = gender === "male" || gender === "female" ? gender : "total";
  return Number(values[scopedTotalKey]) || Number(values.total) || 0;
}

function estimateLatestLaborStatusValues(values, latestAdultPopulation) {
  const total15Plus = Number(values.total15Plus) || 0;
  const scale = total15Plus && latestAdultPopulation ? latestAdultPopulation / total15Plus : 1;
  return scaleTargetValues(values, scale);
}

function estimateLatestSeekingStatusValues(values, laborValues) {
  const base = Number(values.total) || 0;
  const target = Number(laborValues.nonLaborForce) || 0;
  const scale = base && target ? target / base : 1;
  return scaleTargetValues(values, scale);
}

function scaleTargetValues(values, scale) {
  return Object.entries(values || {}).reduce((result, [key, value]) => {
    result[key] = Math.round((Number(value) || 0) * scale);
    return result;
  }, {});
}

function targetGenderScopedValues(values, gender) {
  if (!values) return {};
  if (gender === "male" || gender === "female") return values[gender] || values.all || {};
  return values.all || {};
}

function targetWageValueForGender(row, gender) {
  if (row?.source !== "wageStructureSurvey") return 0;
  if (gender === "male" || gender === "female") return Number(row.values?.[gender]) || Number(row.values?.all) || 0;
  return Number(row.values?.all) || 0;
}

function targetWageBenchmarkModel(context, stats, gender) {
  const wage = stats?.wageBenchmarks || {};
  const salary = targetSalaryBenchmark(context);
  const monthlyYear = wage.scheduledMonthly?.year || wage.year || WAGE_STRUCTURE_SURVEY.year;
  const hourlyYear = wage.shortTimeHourly?.year || wage.year || WAGE_STRUCTURE_SURVEY.year;
  return {
    minWage: Number(wage.minWage?.value) || 0,
    minWageYear: wage.minWage?.year || 2025,
    officialMonthlyAverage: targetWageValueForGender(wage.scheduledMonthly, gender),
    officialMonthlyAverageYear: monthlyYear,
    officialMonthlyAverageEstimated: Boolean(wage.scheduledMonthly?.estimated),
    officialHourlyAverage: targetWageValueForGender(wage.shortTimeHourly, gender),
    officialHourlyAverageYear: hourlyYear,
    officialHourlyAverageEstimated: Boolean(wage.shortTimeHourly?.estimated),
    companyAverageLabel: targetCompanySalaryAverageLabel(salary),
    medianWage: Number(wage.medianWage?.value) || 0,
    sourceName: wage.sourceName || WAGE_STRUCTURE_SURVEY.sourceName,
    year: wage.year || WAGE_STRUCTURE_SURVEY.year,
    error: wage.error || wage.scheduledMonthly?.error || wage.shortTimeHourly?.error || "",
    salary
  };
}

function targetSalaryBenchmark(context) {
  const hourly = (context.rows || [])
    .filter((row) => row.salaryType === "時給" && Number(row.salaryAmount) > 0)
    .map((row) => Number(row.salaryAmount))
    .sort((a, b) => a - b);
  const monthly = (context.rows || [])
    .filter((row) => row.salaryType === "月給" && Number(row.salaryAmount) > 0)
    .map((row) => Number(row.salaryAmount))
    .sort((a, b) => a - b);
  return {
    hourlyMedian: percentile(hourly, 0.5) || 0,
    hourlyAverage: average(hourly),
    hourlyCount: hourly.length,
    monthlyMedian: percentile(monthly, 0.5) || 0,
    monthlyAverage: average(monthly),
    monthlyCount: monthly.length,
    totalSalaryCount: hourly.length + monthly.length
  };
}

function targetCompanySalaryAverageLabel(salary) {
  const parts = [];
  if (salary.monthlyAverage) parts.push(`月給 ${formatCurrency(salary.monthlyAverage)}`);
  if (salary.hourlyAverage) parts.push(`時給 ${formatCurrency(salary.hourlyAverage)}`);
  return parts.join(" / ");
}

function targetStrategyTips(context, data) {
  const tips = [];
  const values = data.laborStatusValues || {};
  const seeking = data.seekingValues || {};
  const wages = data.wageBenchmarks || {};
  const salary = data.salaryBenchmark || {};
  const total = Number(values.total15Plus) || Number(data.totalPopulation) || 0;
  const youngPopulation = targetRawPopulationFor(data.stats, ["10-19", "20-29"], data.gender);
  const youngShare = safeDivide(youngPopulation, Number(data.totalPopulation) || 0);
  const studentPotential = (Number(values.student) || 0) + (Number(values.workWhileStudying) || 0);
  const homemakerPotential = (Number(values.homemaker) || 0) + (Number(values.workWithHousework) || 0);
  const unemployed = Number(values.unemployed) || 0;
  const activeSeekers = Number(seeking.jobSeekingActive) || 0;

  if (youngShare < 0.18 && studentPotential > Math.max(1000, data.targetPopulation * 0.15)) {
    tips.push({
      title: "若年層は絞りすぎ注意",
      text: `10-29歳人口は大きくない一方、通学系の母集団は${formatNumber(studentPotential)}人あります。学生向けには短時間・夕方以降・未経験歓迎を前面に出すと提案しやすいです。`
    });
  }
  if (homemakerPotential > Math.max(1000, total * 0.08)) {
    tips.push({
      title: "主婦/夫層の訴求余地",
      text: `家事系の母集団は${formatNumber(homemakerPotential)}人です。平日昼、扶養内、急な休み相談、ブランク歓迎を求人原稿の上位に置くと刺さりやすいです。`
    });
  }
  if (unemployed || activeSeekers) {
    tips.push({
      title: "顕在求職層への見せ方",
      text: `完全失業者${formatNumber(unemployed)}人${activeSeekers ? `、求職活動あり${formatNumber(activeSeekers)}人` : ""}が確認できます。面接の早さ、採用までの日数、即勤務可を明記すると動きやすい層です。`
    });
  }
  if (wages.minWage && salary.hourlyAverage) {
    const gap = salary.hourlyAverage - wages.minWage;
    const wageText = gap < 0
      ? `貴社の時給平均は${formatCurrency(salary.hourlyAverage)}で、最低賃金を${formatCurrency(Math.abs(gap))}下回っています。給与額や対象求人の給与タイプを確認してください。`
      : gap < 80
        ? `貴社の時給平均は${formatCurrency(salary.hourlyAverage)}で、最低賃金との差が${formatCurrency(gap)}です。応募獲得を急ぐ求人は時給上乗せや手当の見せ方を検討できます。`
        : `貴社の時給平均は${formatCurrency(salary.hourlyAverage)}で、最低賃金を${formatCurrency(gap)}上回っています。給与の強みをタイトル・冒頭文に出せます。`;
    tips.push({
      title: gap < 0 ? "時給の要確認" : gap < 80 ? "時給の見直し候補" : "給与訴求は維持候補",
      text: wageText
    });
  } else if (wages.minWage) {
    tips.push({
      title: "最低賃金との比較",
      text: `このエリアの最低賃金目安は${formatCurrency(wages.minWage)}です。CSVに時給が入っている求人は、この金額との差分を訴求材料として確認できます。`
    });
  }
  if ((context.jobTypeRows || []).length) {
    tips.push({
      title: "反応職種の横展開",
      text: `${context.jobTypeRows.slice(0, 2).map((row) => row.name).join("・")}に応募が寄っています。勝ち筋の職種から原稿表現や配信条件を横展開できます。`
    });
  }

  return tips.slice(0, 5);
}

function targetAppealSuggestions(marketContext, context) {
  const ages = new Set(context.targetAgeLabels || []);
  const suggestions = new Set();
  const topCities = (marketContext.cityRows || []).slice(0, 2).map((item) => item.name).filter(Boolean);
  const topJobTypes = (marketContext.jobTypeRows || []).slice(0, 2).map((item) => item.name).filter(Boolean);

  suggestions.add("仕事内容を写真なしでも伝わる粒度で具体化");
  suggestions.add("給与・手当・昇給条件を冒頭で明確化");
  suggestions.add("通勤手段、駐車場、駅からの距離を明記");
  if (topCities.length) suggestions.add(`${topCities.join("・")}の応募実績を優先配信エリアの根拠として提示`);
  if (topJobTypes.length) suggestions.add(`${topJobTypes.join("・")}で反応している訴求を横展開`);

  if (ages.has("10-19") || ages.has("20-29")) {
    suggestions.add("未経験歓迎・研修あり・初日からの流れを強調");
    suggestions.add("成長できる点やチームの雰囲気を具体化");
  }
  if (ages.has("30-39") || ages.has("40-49")) {
    suggestions.add("勤務時間、休み、残業の少なさなど生活との両立を訴求");
  }
  if (ages.has("50-59") || ages.has("60-64")) {
    suggestions.add("ブランク歓迎、経験不問、体力負担の実態を明記");
  }
  if (context.difficulty?.score >= 65) {
    suggestions.add("応募条件を緩和できる項目を整理し、必須条件と歓迎条件を分ける");
  }
  if ((marketContext.applyRate || 0) < 0.02) {
    suggestions.add("応募ボタン前の不安を減らすため、面接フローと必要書類を短く記載");
  }

  return [...suggestions].slice(0, 6);
}

function targetStrategySignature(context, stats, model) {
  const salary = model.salaryBenchmark || {};
  const wages = model.wageBenchmarks || {};
  const payload = {
    v: 2,
    scope: context.scope || "prefecture",
    scopeKey: targetAnalysisScopeKey(context),
    regionCode: stats.region?.regionCode || "",
    regionName: marketRegionDisplayName(stats.region),
    basis: model.basis?.key || state.targetAnalysis.dataBasis,
    targetAgeLabels: model.targetAgeLabels || [],
    gender: model.gender || "all",
    commuteKm: model.commuteKm || "",
    targetPopulation: model.targetPopulation || 0,
    laborPopulation: model.laborPopulation || 0,
    jobRatio: stats.jobRatio?.value || 0,
    cpa: context.cpa || 0,
    applyRate: context.applyRate || 0,
    salary: {
      hourlyAverage: salary.hourlyAverage || 0,
      hourlyMedian: salary.hourlyMedian || 0,
      monthlyAverage: salary.monthlyAverage || 0,
      monthlyMedian: salary.monthlyMedian || 0,
      minWage: wages.minWage || 0
    },
    cities: (context.cityRows || []).slice(0, 6).map((row) => ({
      name: row.name,
      applications: Math.round(row.applications || 0),
      cpa: Math.round(row.cpa || 0)
    })),
    jobTypes: (context.jobTypeRows || []).slice(0, 6).map((row) => ({
      name: row.name,
      applications: Math.round(row.applications || 0),
      cpa: Math.round(row.cpa || 0)
    }))
  };
  return `target-tips:${hashText(JSON.stringify(payload))}`;
}

function hashText(value) {
  const text = String(value ?? "");
  let hash = 5381;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) + hash) ^ text.charCodeAt(index);
  }
  return `${(hash >>> 0).toString(36)}-${text.length.toString(36)}`;
}

function targetStrategyTipsForSignature(signature, fallbackTips = []) {
  const custom = state.targetAnalysis.customStrategyTips?.[signature];
  if (Array.isArray(custom)) return normalizeTargetStrategyTips(custom, Infinity);
  const gemini = state.targetAnalysis.geminiStrategyTips || {};
  if (gemini.signature === signature && Array.isArray(gemini.tips) && gemini.tips.length) {
    return normalizeTargetStrategyTips(gemini.tips, Infinity);
  }
  return normalizeTargetStrategyTips(fallbackTips, Infinity);
}

function targetStrategyTipStatus(signature) {
  if (Array.isArray(state.targetAnalysis.customStrategyTips?.[signature])) {
    return { label: "編集済み", className: "is-edited" };
  }
  const gemini = state.targetAnalysis.geminiStrategyTips || {};
  if (gemini.signature === signature && gemini.loading) {
    return { label: "Gemini生成中", className: "is-loading" };
  }
  if (gemini.signature === signature && gemini.tips?.length) {
    return { label: "Gemini案", className: "is-gemini" };
  }
  if (gemini.signature === signature && gemini.error) {
    return { label: "ルール案", className: "is-fallback" };
  }
  return { label: geminiApiKey() ? "ルール案" : "ルール案", className: "is-fallback" };
}

function normalizeTargetStrategyTips(tips, limit = TARGET_GEMINI_TIP_LIMIT) {
  const normalized = (tips || [])
    .map((tip) => ({
      title: cleanText(tip?.title),
      text: cleanText(tip?.text)
    }))
    .filter((tip) => tip.title && tip.text);
  return Number.isFinite(limit) ? normalized.slice(0, limit) : normalized;
}

function geminiApiKey() {
  return cleanText(window.GEMINI_API_KEY || localStorage.getItem("gemini-api-key") || "");
}

function geminiModelName() {
  return cleanText(window.GEMINI_MODEL || localStorage.getItem("gemini-model") || "gemini-2.5-flash");
}

function maybeFetchTargetStrategyGemini(context, stats, model, signature, options = {}) {
  if (!signature || !geminiApiKey()) return;
  if (!options.force && Array.isArray(state.targetAnalysis.customStrategyTips?.[signature])) return;
  const current = state.targetAnalysis.geminiStrategyTips || {};
  if (!options.force && current.signature === signature && (current.loading || current.tips?.length)) return;

  state.targetAnalysis.geminiStrategyTips = {
    signature,
    tips: [],
    loading: true,
    error: ""
  };

  const payload = buildTargetGeminiStrategyPayload(context, stats, model);
  callTargetStrategyGemini(payload)
    .then((tips) => {
      const normalized = normalizeTargetStrategyTips(tips, TARGET_GEMINI_TIP_LIMIT);
      if (!normalized.length) throw new Error("Geminiから改善案を取得できませんでした");
      state.targetAnalysis.geminiStrategyTips = {
        signature,
        tips: normalized,
        loading: false,
        error: ""
      };
    })
    .catch((error) => {
      state.targetAnalysis.geminiStrategyTips = {
        signature,
        tips: [],
        loading: false,
        error: error.message || "Gemini案を取得できませんでした"
      };
    })
    .finally(() => {
      renderTargetAnalysis(getAnalytics("job"));
      saveState();
    });
}

function buildTargetGeminiStrategyPayload(context, stats, model) {
  const values = model.laborStatusValues || {};
  const seeking = model.seekingValues || {};
  const wages = model.wageBenchmarks || {};
  const salary = model.salaryBenchmark || {};
  return {
    area: marketRegionDisplayName(stats.region),
    target: {
      ages: (model.targetAgeLabels || []).map(targetAgeDisplayLabel),
      gender: targetGenderLabel(model.gender),
      population: model.targetPopulation,
      share: formatPercent(model.targetShare || 0),
      commuteKm: model.commuteKm || ""
    },
    market: {
      populationTime: model.populationTime,
      laborPopulation: model.laborPopulation,
      jobRatio: stats.jobRatio?.value || 0,
      jobRatioTime: formatDashboardTime(stats.jobRatio?.time)
    },
    laborStatus: {
      unemployed: Number(values.unemployed) || 0,
      homemaker: Number(values.homemaker) || 0,
      workWithHousework: Number(values.workWithHousework) || 0,
      student: Number(values.student) || 0,
      workWhileStudying: Number(values.workWhileStudying) || 0,
      activeJobSeekers: Number(seeking.jobSeekingActive) || 0
    },
    wages: {
      minWage: wages.minWage || 0,
      companyHourlyAverage: salary.hourlyAverage || 0,
      companyHourlyMedian: salary.hourlyMedian || 0,
      companyMonthlyAverage: salary.monthlyAverage || 0,
      companyMonthlyMedian: salary.monthlyMedian || 0,
      officialHourlyAverage: wages.officialHourlyAverage || 0,
      officialMonthlyAverage: wages.officialMonthlyAverage || 0
    },
    performance: {
      cpa: context.cpa || 0,
      applyRate: context.applyRate || 0,
      topCities: (context.cityRows || []).slice(0, 8).map((row) => ({
        name: row.name,
        applications: Math.round(row.applications || 0),
        cpa: Math.round(row.cpa || 0),
        cost: Math.round(row.cost || 0)
      })),
      topJobTypes: (context.jobTypeRows || []).slice(0, 8).map((row) => ({
        name: row.name,
        applications: Math.round(row.applications || 0),
        cpa: Math.round(row.cpa || 0),
        cost: Math.round(row.cost || 0)
      }))
    },
    currentRuleTips: normalizeTargetStrategyTips(model.strategyFallbackTips || [], Infinity)
  };
}

function targetGeminiPrompt(payload) {
  return [
    "あなたは求人広告運用と採用マーケット分析に強い営業提案アナリストです。",
    "与えられた事実だけを根拠に、求人改善の候補案をJSONだけで返してください。",
    `改善案は出せるだけ出してください。ただし最大${TARGET_GEMINI_TIP_LIMIT}件です。`,
    "各案は、titleが大枠の改善アイディア、textがその詳細説明です。",
    "titleは短く具体的にしてください。textは営業がそのまま提案で使える自然な日本語にしてください。",
    "数値根拠がある場合は必ず入れてください。根拠がない断定や、入力データにない地名・駅名・媒体名は書かないでください。",
    "重複した案、抽象的すぎる案、単なる一般論は避けてください。",
    "返却形式は必ず {\"tips\":[{\"title\":\"...\",\"text\":\"...\"}]} のJSONだけにしてください。",
    "",
    "分析データ:",
    JSON.stringify(payload)
  ].join("\n");
}

async function callTargetStrategyGemini(payload) {
  const apiKey = geminiApiKey();
  if (!apiKey) throw new Error("Gemini APIキーが未設定です");
  const model = encodeURIComponent(geminiModelName());
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: targetGeminiPrompt(payload) }]
        }
      ],
      generationConfig: {
        temperature: 0.35,
        responseMimeType: "application/json"
      }
    })
  });
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Gemini案を取得できませんでした（${response.status}${errorText ? `: ${errorText.slice(0, 120)}` : ""}）`);
  }
  const data = await response.json();
  return parseTargetGeminiTips(data);
}

function parseTargetGeminiTips(data) {
  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map((part) => part.text || "")
    .join("")
    .trim();
  if (!text) return [];
  const jsonText = text
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  const parsed = JSON.parse(jsonText);
  return Array.isArray(parsed) ? parsed : (parsed.tips || []);
}

function targetGenderAgeGroups(values, gender) {
  return MARKET_AGE_GROUPS.map((group) => ({
    ...group,
    value: group.keys.reduce((sum, key) => sum + (Number(values[targetAgeValueKey(key, gender)]) || 0), 0)
  }));
}

function targetLaborPopulation(values, gender) {
  return [
    "age15_19",
    "age20_24",
    "age25_29",
    "age30_34",
    "age35_39",
    "age40_44",
    "age45_49",
    "age50_54",
    "age55_59"
  ].reduce((sum, key) => sum + (Number(values[targetAgeValueKey(key, gender)]) || 0), 0);
}

function targetAgeValueKey(key, gender) {
  if (gender === "male" || gender === "female") return key.replace(/^age/, `${gender}Age`);
  return key;
}

function targetCommuteFactor(km) {
  if (km <= 5) return 0.35;
  if (km <= 10) return 0.65;
  return 0.9;
}

function targetDifficultyScore({ targetPopulation, targetShare, jobRatio, cpa, applyRate }) {
  const populationDifficulty = clampNumber(72 - Math.log10(Math.max(targetPopulation, 1)) * 12 + (targetShare < 0.08 ? 10 : 0), 8, 78);
  const ratioDifficulty = clampNumber((Number(jobRatio || 0) - 0.75) * 34, 0, 42);
  const cpaDifficulty = cpa ? clampNumber((cpa - 12000) / 650, 0, 34) : 14;
  const applyDifficulty = applyRate ? clampNumber((0.035 - applyRate) * 900, 0, 28) : 12;
  const score = Math.round(clampNumber(populationDifficulty + ratioDifficulty + cpaDifficulty + applyDifficulty, 12, 95));
  return {
    score,
    grade: targetDifficultyGrade(score),
    label: targetDifficultyLabel(score)
  };
}

function targetDifficultyGrade(score) {
  if (score <= 35) return "A";
  if (score <= 50) return "B";
  if (score <= 65) return "C";
  if (score <= 80) return "D";
  return "E";
}

function targetDifficultyLabel(score) {
  if (score <= 35) return "低い";
  if (score <= 50) return "やや低い";
  if (score <= 65) return "標準";
  if (score <= 80) return "高い";
  return "かなり高い";
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

async function resolveMarketRegions(query) {
  const terms = buildMarketSearchTerms(query);
  const optionMap = new Map();
  for (const term of terms) {
    const options = await fetchMarketRegionOptions(term);
    options.forEach((option) => {
      const score = scoreMarketRegionOption(option, query, term);
      const current = optionMap.get(option.regionCode);
      if (!current || score > current.score) optionMap.set(option.regionCode, { ...option, score });
    });
    if (optionMap.size >= 12) break;
  }
  return [...optionMap.values()]
    .filter((option) => !option.name.includes("(旧)") && (!option.toDate || option.toDate >= MARKET_REGION_CURRENT_TO_DATE))
    .sort((a, b) => b.score - a.score || a.regionCode.localeCompare(b.regionCode));
}

function buildMarketSearchTerms(query) {
  const text = normalizeMarketText(query);
  const matches = [...text.matchAll(/([^\s\d,、都道府県市区町村郡]+(?:市|区|町|村))/g)]
    .map((match) => match[1])
    .filter((value) => value.length >= 2 && value.length <= 12);
  const city = matches.find((value) => value.endsWith("市"));
  const ward = matches.find((value) => value.endsWith("区"));
  const combined = city && ward ? `${city}${ward}` : "";
  return unique([
    text.length <= 16 ? text : "",
    combined,
    ...matches.slice().reverse(),
    ...matches
  ].filter(Boolean));
}

function normalizeMarketText(value) {
  return cleanText(value)
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xFEE0))
    .replace(/[　\t]+/g, " ")
    .trim();
}

async function fetchMarketRegionOptions(term) {
  const json = await fetchDashboardApi("getRegionInfo", {
    Lang: "JP",
    SearchRegionWord: term
  });
  const result = json.GET_META_REGION_INF?.RESULT;
  if (result?.status !== "0") return [];
  const groups = asArray(json.GET_META_REGION_INF?.METADATA_INF?.CLASS_INF?.CLASS_OBJ);
  return groups.flatMap((group) => {
    const parentName = cleanText(group["@name"]);
    const parentRegionCode = cleanText(group["@parentRegionCode"]);
    return asArray(group.CLASS).map((region) => ({
      regionCode: cleanText(region["@regionCode"]),
      name: cleanText(region["@name"]),
      hiragana: cleanText(region["@hiragana"]),
      level: cleanText(region["@level"]),
      fromDate: cleanText(region["@fromDate"]),
      toDate: cleanText(region["@toDate"]),
      parentName,
      parentRegionCode
    }));
  }).filter((region) => region.regionCode && region.name);
}

function scoreMarketRegionOption(region, query, term) {
  const haystack = normalizeMarketText(query);
  const name = normalizeMarketText(region.name);
  const parent = normalizeMarketText(region.parentName);
  const full = `${parent}${name}`;
  let score = 0;
  if (haystack.includes(name)) score += 80 + name.length;
  if (parent && haystack.includes(parent)) score += 50 + parent.length;
  if (full && haystack.includes(full)) score += 80 + full.length;
  if (parent && !/[都道府県]$/.test(parent) && full && haystack.includes(full)) score += 60;
  if (name.endsWith("区") && haystack.includes(name)) score += 24;
  if (normalizeMarketText(term) === name) score += 24;
  if (region.toDate === MARKET_REGION_CURRENT_TO_DATE) score += 10;
  if (region.name.includes("(旧)")) score -= 120;
  return score;
}

async function fetchMarketStats(region, dataBasis = DEFAULT_MARKET_DATA_BASIS) {
  const basis = marketDataBasis(dataBasis);
  const cacheKey = `${cleanText(region.regionCode)}|${basis.key}`;
  if (marketStatsCache.has(cacheKey)) return marketStatsCache.get(cacheKey);
  const prefCode = prefectureCodeFromRegion(region.regionCode);
  const prefName = prefectureNameFromRegion(region);
  const pending = Promise.all([
    fetchMarketPopulationStats(region.regionCode, basis.key),
    fetchMarketJobRatio(prefCode)
  ]).then(([population, jobRatio]) => ({
    region: {
      ...region,
      prefCode,
      prefName
    },
    population,
    dataBasis: basis,
    jobRatio,
    fetchedAt: new Date().toISOString()
  }));
  marketStatsCache.set(cacheKey, pending);
  try {
    const stats = await pending;
    marketStatsCache.set(cacheKey, stats);
    return stats;
  } catch (error) {
    marketStatsCache.delete(cacheKey);
    throw error;
  }
}

async function fetchTargetAnalysisStats(region, dataBasis = DEFAULT_MARKET_DATA_BASIS, options = {}) {
  const basis = marketDataBasis(dataBasis);
  const includeShiftSurvey = options.includeShiftSurvey === true;
  const cacheKey = `${TARGET_STATS_VERSION}|${cleanText(region.regionCode)}|${basis.key}|shift:${includeShiftSurvey ? "1" : "0"}|labor:1|wage:1`;
  if (targetAnalysisStatsCache.has(cacheKey)) return targetAnalysisStatsCache.get(cacheKey);
  const prefCode = prefectureCodeFromRegion(region.regionCode);
  const prefName = prefectureNameFromRegion(region);
  const pending = Promise.all([
    fetchTargetAnalysisPopulationStats(region.regionCode, basis.key),
    fetchMarketJobRatio(prefCode),
    fetchCensusLaborStatusStats(region.regionCode).catch((error) => ({
      source: "fallback",
      error: error.message || "国勢調査の労働力状態を取得できませんでした"
    })),
    fetchEmploymentSeekingStatus(prefCode).catch((error) => ({
      source: "fallback",
      error: error.message || "就業希望・求職活動を取得できませんでした"
    })),
    fetchWageBenchmarks(prefCode).catch((error) => ({
      source: "fallback",
      error: error.message || "賃金目安を取得できませんでした"
    })),
    includeShiftSurvey
      ? fetchEmploymentStatusSurvey(region.regionCode).catch((error) => ({
        source: "fallback",
        error: error.message || "就業構造基本調査を取得できませんでした"
      }))
      : Promise.resolve({
        source: "fallback",
        error: "全体選択では高速化のため"
      })
  ]).then(([population, jobRatio, laborStatus, seekingStatus, wageBenchmarks, shiftSurvey]) => ({
    region: {
      ...region,
      prefCode,
      prefName
    },
    population,
    dataBasis: basis,
    jobRatio,
    laborStatus,
    seekingStatus,
    wageBenchmarks,
    shiftSurvey,
    version: TARGET_STATS_VERSION,
    fetchedAt: new Date().toISOString()
  }));
  targetAnalysisStatsCache.set(cacheKey, pending);
  try {
    const stats = await pending;
    targetAnalysisStatsCache.set(cacheKey, stats);
    return stats;
  } catch (error) {
    targetAnalysisStatsCache.delete(cacheKey);
    throw error;
  }
}

async function fetchTargetAnalysisPopulationStats(regionCode, dataBasis = DEFAULT_MARKET_DATA_BASIS) {
  const basis = marketDataBasis(dataBasis);
  const indicatorMap = basis.source === "projection" ? MARKET_PROJECTION_INDICATORS : MARKET_POPULATION_INDICATORS;
  const baseKeys = ["total", "male", "female"];
  const genderAgeKeys = MARKET_AGE_5_YEAR_GROUPS.flatMap((group) => [
    targetAgeValueKey(group.keys[0], "male"),
    targetAgeValueKey(group.keys[0], "female")
  ]);
  const seniorKeys = [
    targetAgeValueKey("age60Plus", "male"),
    targetAgeValueKey("age60Plus", "female")
  ];
  const sourceKeys = unique([...baseKeys, ...genderAgeKeys, ...seniorKeys]);
  const specs = Object.fromEntries(sourceKeys.map((key) => [key, indicatorMap[key]]).filter(([, spec]) => Boolean(spec)));
  const indicators = flatIndicatorCodes(specs);
  const records = await fetchMarketIndicatorRecords(regionCode, indicators, basis.source);
  const values = {};
  const time = `${basis.year}CY00`;
  Object.entries(specs).forEach(([key, spec]) => {
    values[key] = basis.source === "projection"
      ? projectedValueForIndicatorSpec(records, spec, basis.year)
      : valueForIndicatorSpecAtTime(records, spec, time);
  });
  MARKET_AGE_5_YEAR_GROUPS.forEach((group) => {
    const key = group.keys[0];
    values[key] = (Number(values[targetAgeValueKey(key, "male")]) || 0)
      + (Number(values[targetAgeValueKey(key, "female")]) || 0);
  });
  values.age60Plus = (Number(values[targetAgeValueKey("age60Plus", "male")]) || 0)
    + (Number(values[targetAgeValueKey("age60Plus", "female")]) || 0);
  return {
    basis,
    values,
    times: Object.fromEntries(Object.keys(values).map((key) => [key, time])),
    series: {},
    sourceName: basis.source === "projection" ? "日本の将来推計人口" : "国勢調査"
  };
}

async function fetchCensusLaborStatusStats(regionCode) {
  if (!estatAppId()) throw new Error("e-Stat APIキー未設定");
  const statsDataId = CENSUS_LABOR_STATUS.statsDataId;
  const meta = await fetchEstatMeta(statsDataId);
  const filters = {};
  setEstatFilterByDimensionNames(meta, filters, ["表章"], ["人口"], { required: true });
  setEstatFilterByDimensionNames(meta, filters, ["年齢"], ["総数", "15歳以上"], { required: true });
  filters[estatFilterParamForDimensionId("area")] = estatAreaCodeStrict(meta, regionCode);
  const values = await fetchEstatStatsData(statsDataId, filters);
  return {
    source: "censusLaborStatus",
    sourceName: CENSUS_LABOR_STATUS.sourceName,
    year: CENSUS_LABOR_STATUS.year,
    areaCode: cleanText(regionCode),
    values: parseCensusLaborStatusValues(values, meta)
  };
}

function parseCensusLaborStatusValues(values, meta) {
  const genderId = estatDimensionIdByNames(meta, ["男女", "性別"]);
  const statusId = estatDimensionIdByNames(meta, ["労働力状態"]);
  if (!genderId || !statusId) throw new Error("国勢調査の分類を判定できませんでした");
  const genderObj = estatClassObject(meta, genderId);
  const statusObj = estatClassObject(meta, statusId);
  const result = { all: {}, male: {}, female: {} };
  asArray(values).forEach((value) => {
    const gender = estatGenderKeyFromName(estatClassName(genderObj, cleanText(value[`@${genderId}`])));
    const statusName = estatClassName(statusObj, cleanText(value[`@${statusId}`]));
    const key = censusLaborStatusKey(statusName);
    if (!key) return;
    result[gender][key] = (result[gender][key] || 0) + estatValueNumber(value);
  });
  fillStatTotalsFromGenders(result);
  return result;
}

function censusLaborStatusKey(name) {
  const text = normalizeStatLabel(name);
  if (!text || text === "総数") return "total15Plus";
  if (text.includes("非労働力人口")) return "nonLaborForce";
  if (text.includes("完全失業者")) return "unemployed";
  if (text.includes("家事のほか仕事")) return "workWithHousework";
  if (text.includes("通学のかたわら仕事")) return "workWhileStudying";
  if (text.includes("主に仕事")) return "mainlyWorking";
  if (text.includes("休業者")) return "temporarilyAbsent";
  if (text.includes("就業者")) return "employed";
  if (text.includes("労働力人口")) return "laborForce";
  if (text.includes("家事")) return "homemaker";
  if (text.includes("通学")) return "student";
  if (text.includes("その他")) return "otherNonLabor";
  return "";
}

async function fetchEmploymentSeekingStatus(areaCode) {
  if (!estatAppId()) throw new Error("e-Stat APIキー未設定");
  const statsDataId = EMPLOYMENT_STATUS_SURVEY.tables.jobSeekingStatus;
  const meta = await fetchEstatMeta(statsDataId);
  const filters = {};
  setEstatFilterByDimensionNames(meta, filters, ["表章"], ["人口"], { required: true });
  setEstatFilterByDimensionNames(meta, filters, ["年齢"], ["総数", "年齢計"]);
  setEstatFilterByDimensionNames(meta, filters, ["配関", "配偶関係"], ["総数"]);
  filters[estatFilterParamForDimensionId("area")] = estatAreaCodeStrict(meta, areaCode);
  const values = await fetchEstatStatsData(statsDataId, filters);
  return {
    source: "employmentSeekingStatus",
    sourceName: EMPLOYMENT_STATUS_SURVEY.sourceName,
    year: EMPLOYMENT_STATUS_SURVEY.year,
    areaCode: cleanText(areaCode),
    values: parseEmploymentSeekingValues(values, meta)
  };
}

function parseEmploymentSeekingValues(values, meta) {
  const genderId = estatDimensionIdByNames(meta, ["男女", "性別"]);
  const statusId = estatDimensionIdByNames(meta, ["就希有無", "求活", "就業希望の有無", "求職活動", "就業希望"]);
  if (!genderId || !statusId) throw new Error("就業希望・求職活動の分類を判定できませんでした");
  const genderObj = estatClassObject(meta, genderId);
  const statusObj = estatClassObject(meta, statusId);
  const result = { all: {}, male: {}, female: {} };
  asArray(values).forEach((value) => {
    const gender = estatGenderKeyFromName(estatClassName(genderObj, cleanText(value[`@${genderId}`])));
    const statusName = estatClassName(statusObj, cleanText(value[`@${statusId}`]));
    const key = employmentSeekingStatusKey(statusName);
    if (!key) return;
    result[gender][key] = (result[gender][key] || 0) + estatValueNumber(value);
  });
  fillStatTotalsFromGenders(result);
  return result;
}

function employmentSeekingStatusKey(name) {
  const text = normalizeStatLabel(name);
  if (!text) return "";
  if (text === "総数") return "total";
  if (text === "求職者" || text.includes("求職活動あり")) return "jobSeekingActive";
  if (text === "就業希望者" || text === "就業希望あり") return "jobSeekingHope";
  return "";
}

async function fetchWageBenchmarks(prefCode) {
  const code = prefectureCodeFromRegion(prefCode);
  const minWage = PREFECTURE_MINIMUM_WAGES_2025[code] || 0;
  const latest = WAGE_STRUCTURE_PREFECTURE_2025[code];
  if (latest) {
    return {
      source: "wageBenchmark",
      sourceName: WAGE_STRUCTURE_SURVEY.sourceName,
      year: WAGE_STRUCTURE_SURVEY.year,
      prefCode: code,
      minWage: {
        value: minWage,
        year: 2025,
        sourceName: "地域別最低賃金"
      },
      scheduledMonthly: {
        source: "wageStructureSurvey",
        sourceName: WAGE_STRUCTURE_SURVEY.sourceName,
        year: WAGE_STRUCTURE_SURVEY.year,
        estimated: true,
        values: latest.monthly
      },
      shortTimeHourly: {
        source: "wageStructureSurvey",
        sourceName: WAGE_STRUCTURE_SURVEY.sourceName,
        year: WAGE_STRUCTURE_SURVEY.year,
        estimated: true,
        values: latest.hourly
      },
      medianWage: null
    };
  }
  const [scheduledMonthly, shortTimeHourly] = await Promise.all([
    fetchWageBenchmarkTableValue(WAGE_STRUCTURE_SURVEY.tables.scheduledMonthly, code, ["所定内給与額"], 1000)
      .catch((error) => ({ source: "fallback", error: error.message || "月給目安を取得できませんでした" })),
    fetchWageBenchmarkTableValue(WAGE_STRUCTURE_SURVEY.tables.shortTimeHourly, code, ["1時間当たり所定内給与額", "１時間当たり所定内給与額"], 1)
      .catch((error) => ({ source: "fallback", error: error.message || "時給目安を取得できませんでした" }))
  ]);
  return {
    source: "wageBenchmark",
    sourceName: WAGE_STRUCTURE_SURVEY.sourceName,
    year: Math.max(scheduledMonthly.year || 0, shortTimeHourly.year || 0) || WAGE_STRUCTURE_SURVEY.year,
    prefCode: code,
    minWage: {
      value: minWage,
      year: 2025,
      sourceName: "地域別最低賃金"
    },
    scheduledMonthly,
    shortTimeHourly,
    medianWage: null
  };
}

async function fetchWageBenchmarkTableValue(statsDataId, prefCode, tabNames, multiplier = 1) {
  if (!estatAppId()) throw new Error("e-Stat APIキー未設定");
  const meta = await fetchEstatMeta(statsDataId);
  const filters = {};
  setEstatFilterByDimensionNames(meta, filters, ["表章"], tabNames, { required: true });
  setEstatFilterByDimensionNames(meta, filters, ["年齢"], ["年齢計", "総数"], { requiredIfPresent: true });
  setEstatFilterByDimensionNames(meta, filters, ["労働者の種類"], ["常用労働者計", "短時間労働者計", "短時間労働者", "総数"], { requiredIfPresent: true });
  setEstatFilterByDimensionNames(meta, filters, ["産業"], ["産業計", "産業大分類計", "総数"], { requiredIfPresent: true });
  setEstatFilterByDimensionNames(meta, filters, ["学歴"], ["学歴計", "総数"], { requiredIfPresent: true });
  setEstatFilterByDimensionNames(meta, filters, ["勤続年数"], ["勤続年数計", "総数"], { requiredIfPresent: true });
  filters[estatFilterParamForDimensionId("area")] = estatAreaCodeStrict(meta, prefCode);
  const values = await fetchEstatStatsData(statsDataId, filters);
  const year = estatYearFromTime(latestEstatTime(values)) || WAGE_STRUCTURE_SURVEY.year;
  return {
    source: "wageStructureSurvey",
    sourceName: WAGE_STRUCTURE_SURVEY.sourceName,
    year,
    values: parseEstatValuesByGender(values, meta, multiplier)
  };
}

function parseEstatValuesByGender(values, meta, multiplier = 1) {
  const genderId = estatDimensionIdByNames(meta, ["男女", "性別"]);
  const rows = latestEstatValueRows(values);
  const result = { all: 0, male: 0, female: 0 };
  if (!genderId) {
    result.all = estatValueNumber(rows[0]) * multiplier;
    return result;
  }
  const genderObj = estatClassObject(meta, genderId);
  rows.forEach((value) => {
    const gender = estatGenderKeyFromName(estatClassName(genderObj, cleanText(value[`@${genderId}`])));
    result[gender] += estatValueNumber(value) * multiplier;
  });
  if (!result.all) result.all = average([result.male, result.female].filter(Boolean));
  return result;
}

function latestEstatValueRows(values) {
  const rows = asArray(values);
  const latestTime = latestEstatTime(rows);
  if (!latestTime) return rows;
  return rows.filter((row) => cleanText(row["@time"]) === latestTime);
}

function latestEstatTime(values) {
  const timedRows = asArray(values).filter((row) => cleanText(row?.["@time"]));
  if (!timedRows.length) return "";
  return timedRows
    .map((row) => cleanText(row["@time"]))
    .sort((a, b) => a.localeCompare(b))
    .at(-1) || "";
}

function estatYearFromTime(value) {
  const match = cleanText(value).match(/^(\d{4})/);
  return match ? Number(match[1]) : 0;
}

async function fetchEmploymentStatusSurvey(regionCode) {
  if (!estatAppId()) throw new Error("e-Stat APIキー未設定");
  const areaCode = targetEmploymentSurveyAreaCode(regionCode);
  const [education, household, sideJob] = await Promise.all([
    fetchEmploymentEducationStatus(areaCode),
    fetchEmploymentHouseholdStatus(areaCode),
    fetchEmploymentSideJobStatus(areaCode)
  ]);
  return {
    source: "employmentStatusSurvey",
    sourceName: EMPLOYMENT_STATUS_SURVEY.sourceName,
    year: EMPLOYMENT_STATUS_SURVEY.year,
    areaCode,
    values: mergeEmploymentStatusSurveyValues([education, household, sideJob])
  };
}

function targetEmploymentSurveyAreaCode(regionCode) {
  const code = cleanText(regionCode);
  if (!code || code === TARGET_ALL_PREFECTURES_KEY) return "00000";
  return code;
}

async function fetchEmploymentEducationStatus(areaCode) {
  const statsDataId = EMPLOYMENT_STATUS_SURVEY.tables.educationStatus;
  const meta = await fetchEstatMeta(statsDataId);
  const common = employmentSurveyCommonFilters(meta, areaCode);
  const student = await fetchEmploymentSurveyValueByGender(statsDataId, meta, {
    ...common,
    cdCat02: estatClassCode(meta, "cat02", ["総数"]),
    cdCat03: estatClassCode(meta, "cat03", ["在学者"]),
    cdCat04: estatClassCode(meta, "cat04", ["総数"])
  });
  const senior = await fetchEmploymentSurveyValueByGender(statsDataId, meta, {
    ...common,
    cdCat02: estatClassCode(meta, "cat02", ["60～64歳", "60〜64歳", "60-64歳"]),
    cdCat03: estatClassCode(meta, "cat03", ["総数"]),
    cdCat04: estatClassCode(meta, "cat04", ["総数"])
  });
  return {
    all: { student: student.all, senior: senior.all },
    male: { student: student.male, senior: senior.male },
    female: { student: student.female, senior: senior.female }
  };
}

async function fetchEmploymentHouseholdStatus(areaCode) {
  const statsDataId = EMPLOYMENT_STATUS_SURVEY.tables.householdIncome;
  const meta = await fetchEstatMeta(statsDataId);
  const common = employmentSurveyCommonFilters(meta, areaCode);
  const homemaker = await fetchEmploymentSurveyValueByGender(statsDataId, meta, {
    ...common,
    cdCat02: estatClassCode(meta, "cat02", ["世帯主の配偶者"]),
    cdCat03: estatClassCode(meta, "cat03", ["総数"]),
    cdCat04: estatClassCode(meta, "cat04", ["無業者"])
  });
  return {
    all: { homemaker: homemaker.all },
    male: { homemaker: homemaker.male },
    female: { homemaker: homemaker.female }
  };
}

async function fetchEmploymentSideJobStatus(areaCode) {
  const statsDataId = EMPLOYMENT_STATUS_SURVEY.tables.sideJobEmployment;
  const meta = await fetchEstatMeta(statsDataId);
  const common = employmentSurveyCommonFilters(meta, areaCode);
  const freeter = await fetchEmploymentSurveyValueByGender(statsDataId, meta, {
    ...common,
    cdCat02: estatClassCode(meta, "cat02", ["総数"]),
    cdCat03: estatClassCode(meta, "cat03", ["総数"]),
    cdCat04: estatClassCode(meta, "cat04", ["うち非正規の職員・従業員", "非正規の職員・従業員"])
  });
  const sidejob = await fetchEmploymentSurveyValueByGender(statsDataId, meta, {
    ...common,
    cdCat02: estatClassCode(meta, "cat02", ["副業あり"]),
    cdCat03: estatClassCode(meta, "cat03", ["総数"]),
    cdCat04: estatClassCode(meta, "cat04", ["総数"])
  });
  return {
    all: { freeter: freeter.all, sidejob: sidejob.all },
    male: { freeter: freeter.male, sidejob: sidejob.male },
    female: { freeter: freeter.female, sidejob: sidejob.female }
  };
}

function employmentSurveyCommonFilters(meta, areaCode) {
  return {
    cdTab: estatClassCode(meta, "tab", ["人口"]),
    cdArea: estatAreaCode(meta, areaCode)
  };
}

async function fetchEmploymentSurveyValueByGender(statsDataId, meta, filters) {
  const genderObj = estatClassObject(meta, "cat01");
  const values = await fetchEstatStatsData(statsDataId, filters);
  const result = { all: 0, male: 0, female: 0 };
  asArray(values).forEach((value) => {
    const genderCode = cleanText(value["@cat01"]);
    const genderName = estatClassName(genderObj, genderCode);
    const number = estatValueNumber(value);
    if (genderName === "男") result.male += number;
    else if (genderName === "女") result.female += number;
    else if (genderName === "総数") result.all += number;
  });
  if (!result.all) result.all = result.male + result.female;
  return result;
}

function mergeEmploymentStatusSurveyValues(rows) {
  return rows.reduce((merged, row) => {
    ["all", "male", "female"].forEach((gender) => {
      merged[gender] = {
        ...(merged[gender] || {}),
        ...(row[gender] || {})
      };
    });
    return merged;
  }, { all: {}, male: {}, female: {} });
}

function combineEmploymentStatusSurveys(surveys) {
  const usable = (surveys || []).filter((survey) => survey?.source === "employmentStatusSurvey");
  if (!usable.length) {
    const error = (surveys || []).find((survey) => survey?.error)?.error || "";
    return error ? { source: "fallback", error } : null;
  }
  const values = { all: {}, male: {}, female: {} };
  usable.forEach((survey) => {
    ["all", "male", "female"].forEach((gender) => {
      Object.entries(survey.values?.[gender] || {}).forEach(([key, value]) => {
        values[gender][key] = (values[gender][key] || 0) + (Number(value) || 0);
      });
    });
  });
  return {
    source: "employmentStatusSurvey",
    sourceName: EMPLOYMENT_STATUS_SURVEY.sourceName,
    year: EMPLOYMENT_STATUS_SURVEY.year,
    areaCode: TARGET_ALL_PREFECTURES_KEY,
    values
  };
}

function combineCensusLaborStatuses(rows) {
  return combineGenderValueSurveys(rows, {
    source: "censusLaborStatus",
    sourceName: CENSUS_LABOR_STATUS.sourceName,
    year: CENSUS_LABOR_STATUS.year
  });
}

function combineEmploymentSeekingStatuses(rows) {
  return combineGenderValueSurveys(rows, {
    source: "employmentSeekingStatus",
    sourceName: EMPLOYMENT_STATUS_SURVEY.sourceName,
    year: EMPLOYMENT_STATUS_SURVEY.year
  });
}

function combineGenderValueSurveys(rows, meta) {
  const usable = (rows || []).filter((row) => row?.source === meta.source);
  if (!usable.length) {
    const error = (rows || []).find((row) => row?.error)?.error || "";
    return error ? { source: "fallback", error } : null;
  }
  const values = { all: {}, male: {}, female: {} };
  usable.forEach((row) => {
    ["all", "male", "female"].forEach((gender) => {
      Object.entries(row.values?.[gender] || {}).forEach(([key, value]) => {
        values[gender][key] = (values[gender][key] || 0) + (Number(value) || 0);
      });
    });
  });
  return {
    ...meta,
    areaCode: TARGET_ALL_PREFECTURES_KEY,
    values
  };
}

function combineWageBenchmarks(rows) {
  const usable = (rows || []).filter((row) => row?.source === "wageBenchmark");
  if (!usable.length) {
    const error = (rows || []).find((row) => row?.error)?.error || "";
    return error ? { source: "fallback", error } : null;
  }
  return {
    source: "wageBenchmark",
    sourceName: WAGE_STRUCTURE_SURVEY.sourceName,
    year: Math.max(...usable.flatMap((row) => [row.scheduledMonthly?.year || 0, row.shortTimeHourly?.year || 0]), WAGE_STRUCTURE_SURVEY.year),
    prefCode: TARGET_ALL_PREFECTURES_KEY,
    minWage: {
      value: average(usable.map((row) => row.minWage?.value).filter(Boolean)),
      year: 2025,
      sourceName: "地域別最低賃金"
    },
    scheduledMonthly: combineWageValueRows(usable.map((row) => row.scheduledMonthly)),
    shortTimeHourly: combineWageValueRows(usable.map((row) => row.shortTimeHourly)),
    medianWage: null
  };
}

function combineWageValueRows(rows) {
  const usable = (rows || []).filter((row) => row?.source === "wageStructureSurvey");
  if (!usable.length) return { source: "fallback", error: "賃金データを取得できませんでした" };
  return {
    source: "wageStructureSurvey",
    sourceName: WAGE_STRUCTURE_SURVEY.sourceName,
    year: Math.max(...usable.map((row) => row.year || 0), WAGE_STRUCTURE_SURVEY.year),
    estimated: usable.some((row) => row.estimated),
    values: {
      all: average(usable.map((row) => row.values?.all).filter(Boolean)),
      male: average(usable.map((row) => row.values?.male).filter(Boolean)),
      female: average(usable.map((row) => row.values?.female).filter(Boolean))
    }
  };
}

async function fetchMarketPopulationStats(regionCode, dataBasis = DEFAULT_MARKET_DATA_BASIS) {
  const basis = marketDataBasis(dataBasis);
  if (basis.source === "projection") {
    return fetchMarketProjectionPopulationStats(regionCode, basis);
  }
  return fetchMarketActualPopulationStats(regionCode, basis);
}

async function fetchMarketActualPopulationStats(regionCode, basis) {
  const indicators = flatIndicatorCodes(MARKET_POPULATION_INDICATORS);
  const chunks = [];
  const regionalRank = marketRegionalRankFromCode(regionCode);
  for (let index = 0; index < indicators.length; index += 5) {
    chunks.push(indicators.slice(index, index + 5));
  }
  const records = (await Promise.all(chunks.map((chunk) => fetchDashboardData({
    IndicatorCode: chunk.join(","),
    RegionCode: regionCode,
    Cycle: "3",
    RegionalRank: regionalRank,
    IsSeasonalAdjustment: "1",
    TimeFrom: "2000CY00"
  })))).flat();
  const time = `${basis.year}CY00`;
  const values = Object.fromEntries(Object.entries(MARKET_POPULATION_INDICATORS).map(([key, spec]) => [key, valueForIndicatorSpecAtTime(records, spec, time)]));
  return {
    basis,
    values,
    times: Object.fromEntries(Object.keys(MARKET_POPULATION_INDICATORS).map((key) => [key, time])),
    series: Object.fromEntries(Object.entries(MARKET_POPULATION_INDICATORS).map(([key, spec]) => [key, recordsForIndicatorSpec(records, spec)])),
    sourceName: "国勢調査"
  };
}

async function fetchMarketProjectionPopulationStats(regionCode, basis) {
  const indicators = flatIndicatorCodes(MARKET_PROJECTION_INDICATORS);
  const chunks = [];
  const regionalRank = marketRegionalRankFromCode(regionCode);
  for (let index = 0; index < indicators.length; index += 5) {
    chunks.push(indicators.slice(index, index + 5));
  }
  const records = (await Promise.all(chunks.map((chunk) => fetchDashboardData({
    IndicatorCode: chunk.join(","),
    RegionCode: regionCode,
    Cycle: "3",
    RegionalRank: regionalRank,
    IsSeasonalAdjustment: "1",
    TimeFrom: "2025CY00"
  })))).flat();
  const values = Object.fromEntries(Object.entries(MARKET_PROJECTION_INDICATORS).map(([key, spec]) => [key, projectedValueForIndicatorSpec(records, spec, basis.year)]));
  return {
    basis,
    values,
    times: Object.fromEntries(Object.keys(MARKET_PROJECTION_INDICATORS).map((key) => [key, `${basis.year}CY00`])),
    series: Object.fromEntries(Object.entries(MARKET_PROJECTION_INDICATORS).map(([key, spec]) => [key, recordsForIndicatorSpec(records, spec)])),
    sourceName: "日本の将来推計人口"
  };
}

async function fetchMarketJobRatio(prefCode) {
  const records = await fetchDashboardData({
    IndicatorCode: MARKET_JOB_OPENING_RATIO_INDICATOR,
    RegionCode: prefCode,
    Cycle: "1",
    RegionalRank: "3",
    IsSeasonalAdjustment: "1",
    TimeFrom: "20240100"
  });
  return latestMarketValue(records, MARKET_JOB_OPENING_RATIO_INDICATOR) || null;
}

async function fetchDashboardData(params) {
  const records = await fetchDashboardApi("getData", {
    Lang: "JP",
    ...params
  });
  const result = records.GET_STATS?.RESULT;
  if (result?.status !== "0") throw new Error(result?.errorMsg || "統計データを取得できませんでした");
  return asArray(records.GET_STATS?.STATISTICAL_DATA?.DATA_INF?.DATA_OBJ)
    .flatMap((item) => asArray(item.VALUE))
    .map((value) => ({
      indicator: cleanText(value["@indicator"]),
      regionCode: cleanText(value["@regionCode"]),
      time: cleanText(value["@time"]),
      value: Number(value["$"]),
      provisional: cleanText(value["@isProvisional"]) === "1"
    }))
    .filter((item) => item.indicator && item.time && Number.isFinite(item.value));
}

async function fetchDashboardApi(path, params) {
  const url = new URL(`${DASHBOARD_API_BASE}/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== undefined && value !== null) url.searchParams.set(key, value);
  });
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("統計ダッシュボードAPIに接続できませんでした");
  return response.json();
}

function estatAppId() {
  return cleanText(window.ESTAT_APP_ID || localStorage.getItem("estat-app-id") || "");
}

async function fetchEstatMeta(statsDataId) {
  const cacheKey = cleanText(statsDataId);
  if (estatMetaCache.has(cacheKey)) return estatMetaCache.get(cacheKey);
  const pending = fetchEstatApi("getMetaInfo", { statsDataId })
    .then((json) => asArray(json.GET_META_INFO?.METADATA_INF?.CLASS_INF?.CLASS_OBJ));
  estatMetaCache.set(cacheKey, pending);
  try {
    const meta = await pending;
    estatMetaCache.set(cacheKey, meta);
    return meta;
  } catch (error) {
    estatMetaCache.delete(cacheKey);
    throw error;
  }
}

async function fetchEstatStatsData(statsDataId, filters = {}) {
  const params = {
    statsDataId,
    metaGetFlg: "N",
    cntGetFlg: "N",
    explanationGetFlg: "N",
    annotationGetFlg: "N",
    sectionHeaderFlg: "1",
    replaceSpChars: "0",
    limit: "100000",
    ...filters
  };
  const cacheKey = JSON.stringify(params);
  if (estatDataCache.has(cacheKey)) return estatDataCache.get(cacheKey);
  const pending = fetchEstatApi("getStatsData", params)
    .then((json) => asArray(json.GET_STATS_DATA?.STATISTICAL_DATA?.DATA_INF?.VALUE));
  estatDataCache.set(cacheKey, pending);
  try {
    const values = await pending;
    estatDataCache.set(cacheKey, values);
    return values;
  } catch (error) {
    estatDataCache.delete(cacheKey);
    throw error;
  }
}

async function fetchEstatApi(path, params) {
  const appId = estatAppId();
  if (!appId) throw new Error("e-Stat APIキー未設定");
  const url = new URL(`${ESTAT_API_BASE}/${path}`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("lang", "J");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("e-Stat APIに接続できませんでした");
  const json = await response.json();
  const result = json.GET_STATS_DATA?.RESULT || json.GET_META_INFO?.RESULT;
  const status = cleanText(result?.STATUS ?? result?.status);
  if (status && status !== "0") throw new Error(cleanText(result?.ERROR_MSG || result?.errorMsg) || "e-Stat APIの取得に失敗しました");
  return json;
}

function estatClassObject(meta, id) {
  return asArray(meta).find((item) => cleanText(item["@id"]) === id) || null;
}

function estatDimensionIdByNames(meta, names) {
  const wanted = asArray(names).map(normalizeStatLabel).filter(Boolean);
  const object = asArray(meta).find((item) => {
    const name = normalizeStatLabel(item?.["@name"]);
    return wanted.some((needle) => name.includes(needle) || needle.includes(name));
  });
  return cleanText(object?.["@id"]);
}

function estatFilterParamForDimensionId(id) {
  const text = cleanText(id);
  if (!text) return "";
  return `cd${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function estatClassList(metaOrObject, id = "") {
  const object = id ? estatClassObject(metaOrObject, id) : metaOrObject;
  return asArray(object?.CLASS);
}

function estatClassCode(meta, id, names) {
  const wanted = asArray(names).map(cleanText).filter(Boolean);
  const classes = estatClassList(meta, id);
  const exact = classes.find((item) => wanted.includes(cleanText(item["@name"])));
  if (exact) return cleanText(exact["@code"]);
  const partial = classes.find((item) => wanted.some((name) => cleanText(item["@name"]).includes(name)));
  if (partial) return cleanText(partial["@code"]);
  throw new Error(`e-Stat分類コードが見つかりません: ${id} ${wanted.join("/")}`);
}

function estatClassCodeOptional(meta, id, names) {
  try {
    return estatClassCode(meta, id, names);
  } catch {
    return "";
  }
}

function setEstatFilterByDimensionNames(meta, filters, dimensionNames, classNames, options = {}) {
  const id = estatDimensionIdByNames(meta, dimensionNames);
  if (!id) {
    if (options.required) throw new Error(`e-Stat分類が見つかりません: ${asArray(dimensionNames).join("/")}`);
    return "";
  }
  const code = estatClassCodeOptional(meta, id, classNames);
  if (!code) {
    if (options.required || options.requiredIfPresent) throw new Error(`e-Stat分類コードが見つかりません: ${asArray(classNames).join("/")}`);
    return id;
  }
  filters[estatFilterParamForDimensionId(id)] = code;
  return id;
}

function estatClassName(classObject, code) {
  return cleanText(estatClassList(classObject).find((item) => cleanText(item["@code"]) === cleanText(code))?.["@name"]);
}

function estatAreaCode(meta, preferredCode) {
  const code = cleanText(preferredCode);
  const areaObject = estatClassObject(meta, "area");
  const classes = estatClassList(areaObject);
  if (classes.some((item) => cleanText(item["@code"]) === code)) return code;
  if (classes.some((item) => cleanText(item["@code"]) === "00000")) return "00000";
  return code;
}

function estatAreaCodeStrict(meta, preferredCode) {
  const code = cleanText(preferredCode);
  const areaObject = estatClassObject(meta, "area");
  const classes = estatClassList(areaObject);
  if (classes.some((item) => cleanText(item["@code"]) === code)) return code;
  throw new Error("対象地域が統計表にありません");
}

function estatValueNumber(value) {
  const raw = cleanText(value?.["$"] ?? value);
  if (!raw || raw === "-" || raw === "***" || raw === "X") return 0;
  return Number(raw.replace(/,/g, "")) || 0;
}

function normalizeStatLabel(value) {
  return cleanText(value)
    .replace(/[　\s]/g, "")
    .replace(/[（）()]/g, "")
    .replace(/[～〜－―]/g, "-");
}

function estatGenderKeyFromName(name) {
  const text = normalizeStatLabel(name);
  if (text === "男") return "male";
  if (text === "女") return "female";
  return "all";
}

function fillStatTotalsFromGenders(result) {
  Object.keys({ ...result.male, ...result.female }).forEach((key) => {
    if (!result.all[key]) result.all[key] = (Number(result.male[key]) || 0) + (Number(result.female[key]) || 0);
  });
  return result;
}

function latestMarketValue(records, indicator) {
  return recordsForMarketIndicator(records, indicator).at(-1) || null;
}

function recordsForMarketIndicator(records, indicator) {
  return records
    .filter((record) => record.indicator === indicator)
    .sort((a, b) => a.time.localeCompare(b.time));
}

function flatIndicatorCodes(indicatorMap) {
  return unique(Object.values(indicatorMap).flat().filter(Boolean));
}

function valueForIndicatorSpecAtTime(records, spec, time) {
  return asArray(spec).reduce((sum, indicator) => {
    const record = recordsForMarketIndicator(records, indicator).find((item) => item.time === time) || latestMarketValue(records, indicator);
    return sum + (record?.value || 0);
  }, 0);
}

function projectedValueForIndicatorSpec(records, spec, year) {
  return Math.round(asArray(spec).reduce((sum, indicator) => sum + projectedValueForIndicator(recordsForMarketIndicator(records, indicator), year), 0));
}

function projectedValueForIndicator(rows, year) {
  if (!rows.length) return 0;
  const exact = rows.find((row) => row.time === `${year}CY00`);
  if (exact) return exact.value;
  const previous = rows.filter((row) => Number(row.time.slice(0, 4)) <= year).at(-1);
  const next = rows.find((row) => Number(row.time.slice(0, 4)) >= year && row.time !== previous?.time);
  if (!previous) return next?.value || 0;
  if (!next) return previous.value;
  const previousYear = Number(previous.time.slice(0, 4));
  const nextYear = Number(next.time.slice(0, 4));
  const ratio = safeDivide(year - previousYear, nextYear - previousYear);
  return previous.value + (next.value - previous.value) * ratio;
}

function recordsForIndicatorSpec(records, spec) {
  const indicators = asArray(spec);
  if (indicators.length === 1) return recordsForMarketIndicator(records, indicators[0]);
  const byTime = new Map();
  indicators.forEach((indicator) => {
    recordsForMarketIndicator(records, indicator).forEach((record) => {
      const current = byTime.get(record.time) || { ...record, indicator: indicators.join(","), value: 0 };
      current.value += record.value || 0;
      byTime.set(record.time, current);
    });
  });
  return [...byTime.values()].sort((a, b) => a.time.localeCompare(b.time));
}

function marketDataBasis(value) {
  return MARKET_DATA_BASIS[normalizeMarketDataBasis(value)] || MARKET_DATA_BASIS[DEFAULT_MARKET_DATA_BASIS];
}

function normalizeMarketDataBasis(value) {
  return MARKET_DATA_BASIS[value] ? value : DEFAULT_MARKET_DATA_BASIS;
}

function marketRegionalRankFromCode(regionCode) {
  return /^\d{2}000$/.test(cleanText(regionCode)) ? "3" : "4";
}

function prefectureCodeFromRegion(regionCode) {
  const code = cleanText(regionCode);
  return code.length >= 2 ? `${code.slice(0, 2)}000` : code;
}

function prefectureNameFromRegion(region) {
  const parent = cleanText(region.parentName);
  if (/[都道府県]$/.test(parent)) return parent;
  return PREFECTURE_NAMES[cleanText(region.regionCode).slice(0, 2)] || `${region.regionCode.slice(0, 2)}000`;
}

function renderPrefectureMarketStats(prefecture, analytics, stats) {
  const rows = jobMarketRowsForPrefecture(analytics.filtered.job, prefecture.code);
  const summary = summarize(rows, rows);
  const cityRows = aggregateBy(rows, jobAreaAggregationName)
    .filter((item) => item.name && item.name !== "未分類")
    .sort((a, b) => b.applications - a.applications || b.cost - a.cost)
    .slice(0, 8);
  const jobTypeRows = aggregateBy(rows, (row) => row.jobType)
    .filter((item) => item.name && item.name !== "未分類")
    .sort((a, b) => b.applications - a.applications || b.cost - a.cost)
    .slice(0, 8);
  return `
    <div class="market-summary-grid">
      ${marketSummaryCard("求人数", `${formatNumber(summary.jobCount)}件`, `${escapeHtml(prefecture.name)}のCSV集計`)}
      ${marketSummaryCard("応募数", `${formatNumber(summary.applications)}件`, `クリック ${formatNumber(summary.clicks)}件`)}
      ${marketSummaryCard("費用 / CPA", `${formatCurrency(summary.cost)} / ${summary.cpa ? formatCurrency(summary.cpa) : "-"}`, "求人広告の実績")}
      ${marketSummaryCard("応募率", formatPercent(summary.applyRate), `応募開始 ${formatNumber(summary.starts)}件`)}
    </div>
    ${renderMarketStats(stats, { mapId: "jobMarketPrefectureMap", ageChart: "bar" })}
    <div class="prefecture-breakdown-grid">
      ${renderPrefectureBreakdownPanel("市区町村別", "応募数順", cityRows)}
      ${renderPrefectureBreakdownPanel("職種別", "応募数順", jobTypeRows)}
    </div>
  `;
}

function renderPrefectureBreakdownPanel(title, subtitle, rows, options = {}) {
  const maxApplications = Math.max(...rows.map((row) => row.applications || 0), 1);
  const listClass = `prefecture-breakdown-list${options.scrollable ? " is-scrollable" : ""}`;
  return `
    <article class="panel prefecture-breakdown-panel">
      <div class="panel-heading">
        <h2>${escapeHtml(title)}</h2>
        <span>${escapeHtml(subtitle)}</span>
      </div>
      ${rows.length ? `
        <div class="${listClass}">
          ${options.headerRenderer ? options.headerRenderer() : ""}
          ${rows.map((row) => {
            const width = Math.max(4, safeDivide(row.applications || 0, maxApplications) * 100);
            const content = options.rowRenderer
              ? options.rowRenderer(row)
              : `
                <div>
                  <strong>${escapeHtml(row.name)}</strong>
                  <small>${formatNumber(row.jobCount)}件 / CPA ${row.cpa ? formatCurrency(row.cpa) : "-"}</small>
                </div>
                <em>${formatNumber(row.applications)}応募</em>
              `;
            return `
              <div class="prefecture-breakdown-row">
                ${content}
                <i><b style="width:${width}%"></b></i>
              </div>
            `;
          }).join("")}
        </div>
      ` : `<div class="empty-state">この都道府県のCSV実績がありません</div>`}
    </article>
  `;
}

function renderJobMarketAccountStats(rows, analytics) {
  const successfulRows = rows.filter((row) => row.stats && marketStatsHasAgeGroups(row.stats));
  const failedRows = rows.filter((row) => !row.stats);
  const values = combineMarketPopulationValues(successfulRows.map((row) => row.stats));
  const ageGroups = marketAgeGroups(values);
  const ageTotal = ageGroups.reduce((sum, group) => sum + group.value, 0);
  const targetPopulation = accountTargetPopulation(values);
  const summary = summarize(analytics.filtered.job, analytics.filtered.job);
  const basis = marketDataBasis(state.jobMarket.dataBasis);
  const avgRatio = average(successfulRows.map((row) => row.stats.jobRatio?.value).filter((value) => Number.isFinite(value)));
  return `
    <div class="market-summary-grid">
      ${marketSummaryCard("対象エリア", `${formatNumber(rows.length)}エリア`, failedRows.length ? `${failedRows.length}エリアは統計未取得` : "全エリア取得済み")}
      ${marketSummaryCard("対象求人数", `${formatNumber(summary.jobCount)}件`, "CSV内の勤務地ベース")}
      ${marketSummaryCard("総人口", successfulRows.length ? `${formatNumber(values.total)}人` : "-", `取得済み${formatNumber(successfulRows.length)}エリア合計`, basis)}
      ${marketSummaryCard("平均求人倍率", avgRatio ? `${formatMarketDecimal(avgRatio)}倍` : "-", "取得済み都道府県の平均")}
    </div>
    <div class="market-grid market-account-grid">
      <article class="panel market-visual-panel">
        <div class="panel-heading">
          <h2>年齢層</h2>
          <span>全求人エリア合計 / ${escapeHtml(basis.label)}</span>
        </div>
        ${renderMarketAgeBarChart(ageGroups, ageTotal)}
      </article>
      <article class="panel market-map-panel">
        <div class="panel-heading">
          <h2>勤務地マップ</h2>
          <span>全求人エリア</span>
        </div>
        <div class="market-google-map" id="jobMarketAccountMap"></div>
      </article>
      <article class="panel market-account-table-panel">
        <div class="panel-heading">
          <h2>エリア一覧</h2>
          <span>応募実績 × 地域母集団</span>
        </div>
        ${renderJobMarketAccountRegionTable(rows)}
      </article>
      <article class="panel market-note-panel">
        <div class="panel-heading">
          <h2>見方</h2>
          <span>アカウント単位</span>
        </div>
        <div class="market-note-list">
          <div><span>母集団</span><strong>勤務地市区町村の合計</strong></div>
          <div><span>20-39歳</span><strong>${successfulRows.length ? `${formatNumber(targetPopulation)}人` : "-"}</strong></div>
          <div><span>求人倍率</span><strong>都道府県単位</strong></div>
        </div>
      </article>
    </div>
    <p class="market-source-note">出典: 統計ダッシュボードAPI（${escapeHtml(successfulRows[0]?.stats?.population?.sourceName || "統計")}、一般職業紹介状況）。アカウント単位はCSV内の勤務地エリアを市区町村ごとに集計しています。</p>
  `;
}

function renderJobMarketAccountRegionTable(rows) {
  const maxApplications = Math.max(...rows.map((row) => row.applications || 0), 1);
  return `
    <div class="market-account-region-list">
      <div class="market-account-region-head">
        <span>エリア</span>
        <span>求人</span>
        <span>応募 / CPA</span>
        <span>人口・20-39歳</span>
        <span>求人倍率</span>
      </div>
      ${rows.map((row) => {
        const values = row.stats?.population?.values || {};
        const targetPopulation = accountTargetPopulation(values);
        const appWidth = Math.max(4, ((row.applications || 0) / maxApplications) * 100);
        return `
          <div class="market-account-region-row ${row.stats ? "" : "is-muted"}">
            <div>
              <strong>${escapeHtml(row.name)}</strong>
              <small>${row.stats ? escapeHtml(marketRegionDisplayName(row.stats.region)) : escapeHtml(row.error || "統計未取得")}</small>
            </div>
            <strong>${formatNumber(row.jobCount)}件</strong>
            <div>
              <strong>${formatNumber(row.applications)}件 / ${row.cpa ? formatCurrency(row.cpa) : "-"}</strong>
              <i><b style="width:${appWidth}%"></b></i>
            </div>
            <strong>${row.stats ? `${formatNumber(values.total)}人 / ${formatNumber(targetPopulation)}人` : "-"}</strong>
            <strong>${row.stats?.jobRatio?.value ? `${formatMarketDecimal(row.stats.jobRatio.value)}倍` : "-"}</strong>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function combineMarketPopulationValues(statsRows) {
  return statsRows.reduce((result, stats) => {
    Object.entries(stats.population?.values || {}).forEach(([key, value]) => {
      result[key] = (result[key] || 0) + (Number(value) || 0);
    });
    return result;
  }, {});
}

function accountTargetPopulation(values) {
  return ["age20_24", "age25_29", "age30_34", "age35_39"]
    .reduce((sum, key) => sum + (Number(values[key]) || 0), 0);
}

function renderJobMarketStats(job, stats) {
  const regionName = marketRegionDisplayName(stats.region);
  const regionMeta = jobRegionLabel(job.prefecture, job.city);
  return `
    <article class="panel market-linked-job-card">
      <div>
        <span>選択中の求人</span>
        <strong>${escapeHtml(job.name)}</strong>
      </div>
      <div>
        <span>求人地域</span>
        <strong>${escapeHtml(regionMeta || regionName)}</strong>
      </div>
      <div>
        <span>応募数 / 応募単価</span>
        <strong>${formatNumber(job.applications)}件 / ${job.cpa ? formatCurrency(job.cpa) : "-"}</strong>
      </div>
      <div>
        <span>参照する統計地域</span>
        <strong>${escapeHtml(regionName)}</strong>
      </div>
    </article>
    ${renderMarketStats(stats, { mapId: "jobMarketMap", ageChart: "bar" })}
  `;
}

function renderTargetAnalysisResult(context, stats, model) {
  const regionName = marketRegionDisplayName(stats.region);
  const genderLabel = targetGenderLabel(model.gender);
  const targetLabel = `${model.targetAgeLabels.map(targetAgeDisplayLabel).join(" / ")}・${genderLabel}`;
  return `
    <div class="target-hero-grid">
      <article class="target-main-card">
        <span>推定ターゲット人口 <i>${escapeHtml(model.basis.badge)}</i></span>
        <strong>${formatNumber(model.targetPopulation)}人</strong>
        <small>${escapeHtml(regionName)} / ${escapeHtml(targetLabel)}</small>
      </article>
      <article class="target-mini-card">
        <span>労働人口</span>
        <strong>${formatNumber(model.laborPopulation)}人</strong>
        <small>${model.laborStatusValues.laborForce ? `${CENSUS_LABOR_STATUS.year}実績` : "人口統計ベース"} / ${escapeHtml(genderLabel)}</small>
      </article>
      <article class="target-mini-card">
        <span>有効求人倍率</span>
        <strong>${stats.jobRatio?.value ? `${formatMarketDecimal(stats.jobRatio.value)}倍` : "-"}</strong>
        <small>${escapeHtml(stats.region.prefName)} / ${escapeHtml(formatDashboardTime(stats.jobRatio?.time))}</small>
      </article>
    </div>
    <div class="target-detail-grid">
      <article class="panel target-heatmap-card full-span">
        <div class="panel-heading">
          <h2>年齢×性別</h2>
          <span>5歳刻み・男女別</span>
        </div>
        ${renderTargetHeatmap(stats, model)}
      </article>
      <article class="panel target-attribute-card full-span">
        ${renderTargetAttributePopulation(stats, model)}
      </article>
      <article class="panel target-wage-card full-span">
        ${renderTargetWageBenchmarks(model)}
      </article>
      <article class="panel target-tips-card full-span">
        ${renderTargetStrategyTips(model)}
      </article>
      <article class="panel target-prefecture-performance-card full-span">
        <div class="panel-heading">
          <h2>実績_内訳</h2>
          <span>市区町村・職種</span>
        </div>
        <div class="prefecture-breakdown-grid">
          ${renderPrefectureBreakdownPanel(
            "市区町村別",
            "応募数／人口数／応募単価",
            targetCityRowsWithPopulation(context.cityRows || [], model),
            {
              scrollable: true,
              rowRenderer: renderTargetCityBreakdownRow
            }
          )}
          ${renderPrefectureBreakdownPanel("職種別", "応募数順", context.jobTypeRows || [])}
        </div>
      </article>
    </div>
  `;
}

function targetCityRowsWithPopulation(rows, model) {
  const statsByKey = new Map((state.targetAnalysis.cityStats || []).map((item) => [item.key, item]));
  const waitingForCurrentSignature = state.targetAnalysis.cityStatsLoading
    && state.targetAnalysis.cityStatsSignature === currentTargetCityPopulationSignature();
  return rows.map((row) => {
    const stats = statsByKey.get(row.cityKey);
    const targetPopulation = Number.isFinite(stats?.targetPopulation) ? stats.targetPopulation : null;
    return {
      ...row,
      targetPopulation,
      populationError: stats?.error || "",
      populationPending: !stats && waitingForCurrentSignature,
      populationSourceName: ""
    };
  });
}

function renderTargetCityBreakdownRow(row) {
  const populationText = Number.isFinite(row.targetPopulation)
    ? `${formatNumber(row.targetPopulation)}人`
    : (row.populationPending ? "取得中" : "未取得");
  const cpaText = row.cpa ? `${formatNumber(row.cpa)}円` : "-";
  return `
    <div class="prefecture-breakdown-line">
      <strong>${escapeHtml(row.name)}</strong>
      <span>${formatNumber(row.applications)}件／${escapeHtml(populationText)}／${escapeHtml(cpaText)}</span>
    </div>
  `;
}

function renderTargetHeatmap(stats, model) {
  const femaleGroups = targetGenderAge5YearGroups(stats.population.values, "female");
  const maleGroups = targetGenderAge5YearGroups(stats.population.values, "male");
  const rows = MARKET_AGE_5_YEAR_GROUPS.map((group, index) => ({
    key: group.keys[0],
    label: group.label,
    female: femaleGroups[index]?.value || 0,
    male: maleGroups[index]?.value || 0
  }));
  const max = Math.max(...rows.flatMap((row) => [row.female, row.male]), 1);
  const targetAges = new Set(model.targetAgeLabels);
  const genders = [
    { key: "female", label: "女性", className: "female" },
    { key: "male", label: "男性", className: "male" }
  ];
  return `
    <div class="target-gender-age-chart">
      <div class="target-gender-age-legend">
        ${genders.map((gender) => `<span><i class="${gender.className}"></i>${escapeHtml(gender.label)}</span>`).join("")}
      </div>
      <div class="target-gender-age-bars">
        ${rows.map((row) => `
          <div class="target-gender-age-group">
            <div class="target-gender-age-columns">
              ${genders.map((gender) => {
                const value = row[gender.key] || 0;
                const selected = targetAgeContainsKey(targetAges, row.key) && (model.gender === "all" || model.gender === gender.key);
                const height = Math.max(6, safeDivide(value, max) * 100);
                return `
                  <div class="target-gender-age-bar ${selected ? "selected" : ""}">
                    <span>${escapeHtml(formatCompactPopulation(value))}</span>
                    <i class="${gender.className}" style="height:${height}%"></i>
                  </div>
                `;
              }).join("")}
            </div>
            <strong>${escapeHtml(targetAgeDisplayLabel(row.label))}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function targetAgeContainsKey(targetAgeLabels, ageKey) {
  return MARKET_AGE_GROUPS.some((group) => targetAgeLabels.has(group.label) && group.keys.includes(ageKey));
}

function targetAttributeAgeDetails(stats, model) {
  return targetGenderAgeGroups(stats?.population?.values || {}, model?.gender || "all")
    .filter((group) => Number(group.value) > 0)
    .map((group) => ({
      label: targetAgeDisplayLabel(group.label),
      value: group.value,
      color: TARGET_DETAIL_BAR_COLORS.population
    }));
}

function targetPopulationByAgeKeys(values, gender, keys) {
  return keys.reduce((sum, key) => sum + (Number(values[targetAgeValueKey(key, gender)]) || 0), 0);
}

function targetSeniorPopulation(values, gender) {
  return targetPopulationByAgeKeys(values, gender, ["age60Plus"])
    || targetPopulationByAgeKeys(values, gender, ["age60_64"]);
}

function targetSegmentAgeDetails(stats, model, segmentKey, totalValue) {
  const values = stats?.population?.values || {};
  const gender = model?.gender || "all";
  const total = Number(totalValue) || 0;
  if (!total) return [];

  if (segmentKey === "senior") {
    const age60To64 = targetPopulationByAgeKeys(values, gender, ["age60_64"]);
    const age60Plus = targetSeniorPopulation(values, gender);
    const age65Plus = Math.max(0, age60Plus - age60To64);
    return [
      { label: "60-64歳", value: Math.round(age60To64), color: TARGET_DETAIL_BAR_COLORS.senior },
      { label: "65歳以上", value: Math.round(age65Plus), color: TARGET_DETAIL_BAR_COLORS.senior }
    ].filter((row) => row.value > 0);
  }

  const detailGroups = {
    homemaker: [
      { label: "20代", keys: ["age20_24", "age25_29"], factor: { all: 0.16, female: 0.30, male: 0.04 } },
      { label: "30代", keys: ["age30_34", "age35_39"], factor: { all: 0.16, female: 0.30, male: 0.04 } },
      { label: "40代", keys: ["age40_44", "age45_49"], factor: { all: 0.16, female: 0.30, male: 0.04 } },
      { label: "50代", keys: ["age50_54", "age55_59"], factor: { all: 0.16, female: 0.30, male: 0.04 } }
    ],
    student: [
      { label: "15-19歳", keys: ["age15_19"], factor: 0.55 },
      { label: "20-24歳", keys: ["age20_24"], factor: 0.22 }
    ]
  };
  const weightedRows = (detailGroups[segmentKey] || [])
    .map((group) => ({
      label: group.label,
      weight: targetPopulationByAgeKeys(values, gender, group.keys) * targetShiftSourceFactor(group.factor, gender),
      color: TARGET_DETAIL_BAR_COLORS[segmentKey] || TARGET_DETAIL_BAR_COLORS.population
    }))
    .filter((row) => row.weight > 0);
  const weightTotal = weightedRows.reduce((sum, row) => sum + row.weight, 0);
  if (!weightTotal) return [];
  return weightedRows.map((row) => ({
    label: row.label,
    value: Math.round(total * safeDivide(row.weight, weightTotal)),
    color: row.color
  }));
}

function renderTargetAttributePopulation(stats, model) {
  const values = model.laborStatusValues || {};
  const seeking = model.seekingValues || {};
  const homemakerValue = (Number(values.homemaker) || 0) + (Number(values.workWithHousework) || 0);
  const studentValue = (Number(values.student) || 0) + (Number(values.workWhileStudying) || 0);
  const seniorPopulation = targetSeniorPopulation(stats.population.values, model.gender);
  const basisLabel = model.basis?.label || "最新推計";
  const attributeAgeRows = targetAttributeAgeDetails(stats, model);
  const attributeRows = [
    { label: "労働力人口", value: values.laborForce, note: "15歳以上" },
    { label: "就業者", value: values.employed, note: "主に仕事などを含む" },
    { label: "完全失業者", value: values.unemployed, note: "顕在求職層" },
    { label: "家事", value: values.homemaker, note: "非労働力人口内" },
    { label: "通学", value: values.student, note: "非労働力人口内" },
    { label: "非労働力人口", value: values.nonLaborForce, note: "家事・通学・その他" }
  ];
  const opportunityRows = [
    { label: "完全失業者", value: values.unemployed, note: "すぐ動きやすい層" },
    { label: "家事のほか仕事", value: values.workWithHousework, note: "主婦/夫向け提案に活用" },
    { label: "通学のかたわら仕事", value: values.workWhileStudying, note: "学生向け提案に活用" },
    { label: "就業希望あり / 求職活動あり", value: seeking.jobSeekingActive, note: "都道府県単位の参考値" }
  ];
  const segmentRows = [
    { label: "主婦/夫_人口", value: homemakerValue, note: "家事 + 家事のほか仕事", color: TARGET_DETAIL_BAR_COLORS.homemaker, details: targetSegmentAgeDetails(stats, model, "homemaker", homemakerValue) },
    { label: "学生_人口", value: studentValue, note: "通学 + 通学のかたわら仕事", color: TARGET_DETAIL_BAR_COLORS.student, details: targetSegmentAgeDetails(stats, model, "student", studentValue) },
    { label: "シニア_人口", value: seniorPopulation, note: "60歳以上人口", color: TARGET_DETAIL_BAR_COLORS.senior, details: targetSegmentAgeDetails(stats, model, "senior", seniorPopulation) }
  ];
  return `
    <div class="target-section-heading">
      <div>
        <h2>属性別人口 <i>${escapeHtml(basisLabel)}</i></h2>
      </div>
    </div>
    <div class="target-attribute-grid">
      ${renderTargetMetricPanel("属性別人口", attributeRows, { detailsTitle: "年代別人口", details: attributeAgeRows })}
      ${renderTargetMetricPanel("採用余地", opportunityRows)}
      ${renderTargetSegmentPanels(segmentRows)}
    </div>
    <p class="target-source-note">※属性別人口は${CENSUS_LABOR_STATUS.sourceName}（${CENSUS_LABOR_STATUS.year}）と${EMPLOYMENT_STATUS_SURVEY.sourceName}（${EMPLOYMENT_STATUS_SURVEY.year}）の構成比を、${escapeHtml(basisLabel)}人口に按分した推定値です。</p>
  `;
}

function renderTargetMetricPanel(title, rows, options = {}) {
  const max = Math.max(...rows.map((row) => Number(row.value) || 0), 1);
  return `
    <section class="target-metric-panel">
      <h3>${escapeHtml(title)}</h3>
      <div class="target-metric-list">
        ${rows.map((row) => renderTargetMetricRow(row, max)).join("")}
      </div>
      ${options.details?.length ? `
        <div class="target-metric-detail-block">
          <strong>${escapeHtml(options.detailsTitle || "内訳")}</strong>
          ${renderTargetMetricDetails(options.details)}
        </div>
      ` : ""}
    </section>
  `;
}

function renderTargetSegmentPanels(rows) {
  const max = Math.max(...rows.map((row) => Number(row.value) || 0), 1);
  return `
    <div class="target-segment-card-stack">
      ${rows.map((row) => renderTargetSegmentCard(row, max)).join("")}
    </div>
  `;
}

function renderTargetSegmentCard(row, max) {
  const color = row.color || row.details?.find((detail) => detail.color)?.color || TARGET_DETAIL_BAR_COLORS.population;
  return `
    <section class="target-metric-panel target-segment-card" style="--segment-color:${escapeHtml(color)};">
      <h3>${escapeHtml(row.label)}</h3>
      <div class="target-metric-list">
        ${renderTargetMetricRow({ ...row, label: row.note || row.label, note: "", color }, max)}
      </div>
    </section>
  `;
}

function renderTargetMetricRow(row, max) {
  const value = Number(row.value) || 0;
  const width = value ? Math.max(5, safeDivide(value, max) * 100) : 0;
  const metricStyle = row.color ? ` style="--metric-color:${escapeHtml(row.color)};"` : "";
  return `
    <div class="target-metric-row">
      <div>
        <strong>${escapeHtml(row.label)}</strong>
        <span>${escapeHtml(row.note || "")}</span>
      </div>
      <em>${value ? `${formatNumber(value)}人` : "-"}</em>
      <i${metricStyle}><b style="width:${width}%"></b></i>
      ${row.details?.length ? renderTargetMetricDetails(row.details) : ""}
    </div>
  `;
}

function renderTargetMetricDetails(details) {
  const rows = (details || []).filter((detail) => Number(detail.value) > 0);
  const max = Math.max(...rows.map((detail) => Number(detail.value) || 0), 1);
  return `
    <div class="target-metric-detail-list">
      ${rows.map((detail) => {
        const value = Number(detail.value) || 0;
        const width = value ? Math.max(5, safeDivide(value, max) * 100) : 0;
        const color = detail.color || "#0f8f7a";
        return `
          <div class="target-metric-detail-row" style="--detail-color:${escapeHtml(color)};--detail-width:${formatDecimal(width, 1)}%;">
            <span>${escapeHtml(detail.label)}</span>
            <em>${formatNumber(value)}人</em>
            <i><b></b></i>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderTargetWageBenchmarks(model) {
  const wages = model.wageBenchmarks || {};
  const salary = model.salaryBenchmark || {};
  const cards = [
    {
      label: "最低賃金",
      value: wages.minWage ? formatCurrency(wages.minWage) : "-",
      note: ""
    },
    {
      label: "平均月給",
      value: wages.officialMonthlyAverage ? `${formatCurrency(wages.officialMonthlyAverage)} / 月` : "-",
      note: ""
    },
    {
      label: "平均時給",
      value: wages.officialHourlyAverage ? `${formatCurrency(wages.officialHourlyAverage)} / 時` : "-",
      note: ""
    },
    {
      label: "貴社平均",
      value: wages.companyAverageLabel || "-",
      note: wages.companyAverageLabel ? "※選択地域平均" : "給与額なし"
    }
  ];
  return `
    <div class="target-section-heading">
      <div>
        <h2>賃金相場</h2>
      </div>
    </div>
    <div class="target-wage-grid">
      ${cards.map((card) => `
        <div class="target-wage-item">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          ${card.note ? `<small>${escapeHtml(card.note)}</small>` : ""}
        </div>
      `).join("")}
    </div>
    <p class="target-source-note">※最低賃金は地域別最低賃金、平均月給・平均時給は令和7年賃金構造基本統計調査の都道府県別値を最新推定として表示。貴社平均は選択中の地域に該当するCSV給与額の平均です。</p>
  `;
}

function renderTargetStrategyTips(model) {
  const tips = normalizeTargetStrategyTips(model.strategyTips || [], Infinity);
  const status = model.strategyTipStatus || { label: "", className: "" };
  const signature = model.strategySignature || "";
  return `
    <div class="target-section-heading target-tips-heading">
      <div>
        <h2>改善案_候補</h2>
        ${status.label ? `<span class="target-tip-status ${escapeHtml(status.className)}">${escapeHtml(status.label)}</span>` : ""}
      </div>
      <button class="secondary-button target-tip-gemini-button" type="button" data-target-tips-regenerate="${escapeHtml(signature)}">Gemini再生成</button>
    </div>
    <div class="target-tips-list" data-target-strategy-signature="${escapeHtml(signature)}">
      ${tips.length ? tips.map((tip, index) => `
        <div class="target-tip-item" data-target-tip-item>
          <div class="target-tip-edit-head">
            <label class="target-tip-edit-label">
              <span class="visually-hidden">改善案タイトル</span>
              <input class="target-tip-title-input" type="text" value="${escapeHtml(tip.title)}" placeholder="改善案タイトル" data-target-tip-title />
            </label>
            <button class="target-tip-delete-button" type="button" data-target-tip-delete="${index}">削除</button>
          </div>
          <label class="target-tip-edit-label">
            <span class="visually-hidden">改善案詳細</span>
            <textarea class="target-tip-text-input" rows="3" placeholder="詳細説明" data-target-tip-text>${escapeHtml(tip.text)}</textarea>
          </label>
        </div>
      `).join("") : `<p class="target-source-note">CSVと統計データを読み込むと、提案用コメントが表示されます。</p>`}
    </div>
  `;
}

function handleTargetStrategyTipInput(event) {
  if (!event.target?.matches("[data-target-tip-title], [data-target-tip-text]")) return;
  const list = event.target.closest("[data-target-strategy-signature]");
  const signature = list?.dataset.targetStrategySignature || "";
  if (!signature) return;
  if (event.target.matches("[data-target-tip-text]")) {
    syncTargetStrategyTipTextarea(event.target);
  }
  state.targetAnalysis.customStrategyTips = {
    ...(state.targetAnalysis.customStrategyTips || {}),
    [signature]: collectTargetStrategyTipsFromList(list)
  };
  setTargetStrategyTipStatus(list, "編集済み", "is-edited");
  saveState();
}

function syncTargetStrategyTipTextareas(root = document) {
  root?.querySelectorAll?.("[data-target-tip-text]").forEach((textarea) => {
    syncTargetStrategyTipTextarea(textarea);
  });
}

function syncTargetStrategyTipTextarea(textarea) {
  if (!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function setTargetStrategyTipStatus(list, label, className) {
  const status = list?.closest(".target-tips-card")?.querySelector(".target-tip-status");
  if (!status) return;
  status.textContent = label;
  status.className = `target-tip-status ${className || ""}`.trim();
}

function handleTargetStrategyTipClick(event) {
  const deleteButton = event.target?.closest("[data-target-tip-delete]");
  if (deleteButton) {
    const list = deleteButton.closest("[data-target-strategy-signature]");
    const item = deleteButton.closest("[data-target-tip-item]");
    const signature = list?.dataset.targetStrategySignature || "";
    if (!list || !signature) return;
    state.targetAnalysis.customStrategyTips = {
      ...(state.targetAnalysis.customStrategyTips || {}),
      [signature]: collectTargetStrategyTipsFromList(list, item)
    };
    renderTargetAnalysis(getAnalytics("job"));
    saveState();
    return;
  }

  const regenerateButton = event.target?.closest("[data-target-tips-regenerate]");
  if (!regenerateButton) return;
  const signature = regenerateButton.dataset.targetTipsRegenerate || "";
  if (!signature) return;
  if (!geminiApiKey()) {
    window.alert("Gemini APIキーを config.js に設定すると、Gemini案を生成できます。");
    return;
  }
  if (Array.isArray(state.targetAnalysis.customStrategyTips?.[signature])) {
    const ok = window.confirm("編集済みの改善案を破棄して、Geminiで再生成しますか？");
    if (!ok) return;
    delete state.targetAnalysis.customStrategyTips[signature];
  }
  state.targetAnalysis.geminiStrategyTips = {
    signature: "",
    tips: [],
    loading: false,
    error: ""
  };
  renderTargetAnalysis(getAnalytics("job"));
  saveState();
}

function collectTargetStrategyTipsFromList(list, skipItem = null) {
  if (!list) return [];
  return [...list.querySelectorAll("[data-target-tip-item]")]
    .filter((item) => item !== skipItem)
    .map((item) => ({
      title: item.querySelector("[data-target-tip-title]")?.value || "",
      text: item.querySelector("[data-target-tip-text]")?.value || ""
    }))
    .filter((tip) => cleanText(tip.title) || cleanText(tip.text))
    .map((tip) => ({
      title: cleanText(tip.title) || "改善案",
      text: cleanText(tip.text)
    }))
    .filter((tip) => tip.text);
}

function renderTargetShiftPotential(stats, model) {
  const potential = targetShiftPotential(stats, model);
  return `
    <div class="target-shift-heading">
      <div>
        <h2>属性×シフト別労働人口 <i>${escapeHtml(potential.badge)}</i></h2>
      </div>
    </div>
    <div class="target-shift-matrix-wrap">
      <div class="target-shift-matrix">
        <div class="target-shift-corner"></div>
        ${TARGET_SHIFT_TIME_BANDS.map((band) => `<div class="target-shift-col-head">${escapeHtml(band.label)}</div>`).join("")}
        ${potential.rows.map((row) => `
          <div class="target-shift-row-head">${escapeHtml(row.label)}</div>
          ${row.cells.map((cell) => `
            <div class="target-shift-cell ${cell.strong ? "is-strong" : ""}" style="--shift-alpha:${cell.alpha}">
              <strong>${formatNumber(cell.value)}人</strong>
              <span>${formatPercent(cell.rate)}</span>
            </div>
          `).join("")}
        `).join("")}
      </div>
    </div>
    <p class="target-shift-note">※${escapeHtml(potential.note)}</p>
  `;
}

function targetShiftPotential(stats, model) {
  const rows = TARGET_SHIFT_SEGMENTS.map((segment) => {
    const sourceValue = targetShiftSegmentPopulation(stats.population.values, segment, model.gender);
    const base = Math.round(sourceValue * (model.commuteFactor || 1));
    const cells = TARGET_SHIFT_TIME_BANDS.map((band) => ({
      key: band.key,
      label: band.label,
      rate: segment.rates[band.key] || 0,
      value: Math.round(base * (segment.rates[band.key] || 0))
    }));
    return {
      key: segment.key,
      label: segment.label,
      base,
      cells
    };
  });
  const maxCell = Math.max(...rows.flatMap((row) => row.cells.map((cell) => cell.value)), 1);
  rows.forEach((row) => {
    row.cells.forEach((cell) => {
      const intensity = safeDivide(cell.value, maxCell);
      cell.alpha = formatDecimal(0.02 + Math.pow(intensity, 1.12) * 0.9, 2);
      cell.strong = intensity >= 0.56;
    });
  });
  const bandTotals = TARGET_SHIFT_TIME_BANDS.map((band) => ({
    ...band,
    value: rows.reduce((sum, row) => sum + (row.cells.find((cell) => cell.key === band.key)?.value || 0), 0)
  }));
  const strongBands = [...bandTotals].sort((a, b) => b.value - a.value).slice(0, 3);
  const weakBands = [...bandTotals].sort((a, b) => a.value - b.value).slice(0, 3);
  const segmentRank = [...rows].sort((a, b) => b.base - a.base);
  const total = rows.reduce((sum, row) => sum + row.base, 0);
  return {
    rows,
    total,
    badge: model.basis.label,
    note: `シフト別労働人口数は就業構造基本調査（2022）の属性別就業時間帯分布をもとにした業界一般値。`,
    strongBands,
    weakBands,
    strongest: strongBands[0] || { label: "-", value: 0 },
    weakest: weakBands[0] || { label: "-", value: 0 },
    primarySuggestion: `${segmentRank.slice(0, 2).map((row) => row.label).join("・")}を軸に、${strongBands[0]?.label || "昼"}の募集枠を厚めに設計`,
    secondarySuggestion: `${weakBands[0]?.label || "深夜"}は母集団が薄いため、時給上乗せ・短時間化・近隣エリア拡張を検討`
  };
}

function targetShiftSurveyValues(shiftSurvey, gender) {
  if (shiftSurvey?.source !== "employmentStatusSurvey") return null;
  const values = shiftSurvey.values?.[gender] || shiftSurvey.values?.all || null;
  if (!values) return null;
  return TARGET_SHIFT_SEGMENTS.reduce((result, segment) => {
    result[segment.key] = Number(values[segment.key]) || 0;
    return result;
  }, {});
}

function targetShiftSegmentPopulation(values, segment, gender) {
  return segment.sources.reduce((sum, source) => {
    const population = source.keys.reduce((ageSum, key) => ageSum + (Number(values[targetAgeValueKey(key, gender)]) || 0), 0);
    return sum + population * targetShiftSourceFactor(source.factor, gender);
  }, 0);
}

function targetShiftSourceFactor(factor, gender) {
  if (typeof factor === "number") return factor;
  return Number(factor?.[gender] ?? factor?.all ?? 0) || 0;
}

function targetGenderAge5YearGroups(values, gender) {
  return MARKET_AGE_5_YEAR_GROUPS.map((group) => ({
    ...group,
    value: group.keys.reduce((sum, key) => sum + (Number(values[targetAgeValueKey(key, gender)]) || 0), 0)
  }));
}

function formatCompactPopulation(value) {
  const number = Number(value) || 0;
  if (number >= 10000) return `${formatDecimal(number / 10000, 1)}万人`;
  return `${formatNumber(number)}人`;
}

function renderTargetComparison() {
  const baseRows = (state.targetAnalysis.comparisons || []).map((item) => {
    const model = buildTargetAnalysisModel(item.context || { name: item.label, cpa: 0, applyRate: 0 }, item.stats);
    return {
      ...item,
      model
    };
  });
  const maxPopulation = Math.max(...baseRows.map((row) => row.model.targetPopulation), 1);
  const rows = baseRows.map((row) => ({
    ...row,
    priority: targetAreaPriority(row, maxPopulation)
  })).sort((a, b) => b.priority.score - a.priority.score || b.model.targetPopulation - a.model.targetPopulation);
  if (!rows.length) return `<div class="empty-state">比較できる地域がありません</div>`;
  return `
    <div class="target-comparison-list">
      ${rows.map((row, index) => `
        <div class="target-comparison-row ${row.current ? "current" : ""}">
          <span>${index + 1}</span>
          <strong>${escapeHtml(row.context?.name || row.label || marketRegionDisplayName(row.stats.region))}</strong>
          <em>${formatNumber(row.model.targetPopulation)}人</em>
          <small>優先${escapeHtml(row.priority.grade)} / ${formatNumber(row.context?.summary?.applications || 0)}応募 / 難易度 ${escapeHtml(row.model.difficulty.grade)}</small>
        </div>
      `).join("")}
    </div>
  `;
}

function targetAreaPriority(row, maxPopulation) {
  const populationScore = safeDivide(row.model.targetPopulation, maxPopulation) * 52;
  const difficultyScore = (1 - safeDivide(row.model.difficulty.score, 100)) * 34;
  const currentScore = row.current ? 8 : 0;
  const score = Math.round(clampNumber(populationScore + difficultyScore + currentScore, 0, 100));
  return {
    score,
    grade: score >= 78 ? "A" : score >= 62 ? "B" : score >= 46 ? "C" : "D"
  };
}

function renderTargetExpansionProposal(model) {
  return `
    <section class="target-proposal-block">
      <h3>ターゲット拡張</h3>
      ${model.expansionOptions.length ? `
        <div class="target-expansion-list">
          ${model.expansionOptions.map((option) => `
            <div class="target-expansion-row">
              <strong>${escapeHtml(option.title)}</strong>
              <span>${escapeHtml(targetAgeListLabel(option.labels))}・${escapeHtml(targetGenderLabel(option.gender))}</span>
              <em>${formatDecimal(option.lift, 1)}倍に拡張</em>
              <small>${escapeHtml(option.note)}</small>
            </div>
          `).join("")}
        </div>
      ` : `<p class="target-proposal-empty">現状のターゲット幅でも母集団は確保できています。</p>`}
    </section>
  `;
}

function renderTargetCommuteSimulation(model) {
  const maxPopulation = Math.max(...model.commuteScenarios.map((item) => item.population), 1);
  const prefectureScope = model.scope === "prefecture";
  return `
    <section class="target-proposal-block">
      <h3>${prefectureScope ? "配信ボリューム目安" : "商圏シミュレーション"}</h3>
      <div class="target-commute-list">
        ${model.commuteScenarios.map((item) => `
          <div class="target-commute-row ${item.active ? "active" : ""}">
            <span>${prefectureScope ? escapeHtml(item.label) : `半径${formatNumber(item.km)}km`}</span>
            <strong>${formatNumber(item.population)}人</strong>
            <i><b style="width:${Math.max(4, safeDivide(item.population, maxPopulation) * 100)}%"></b></i>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTargetAppealProposal(model) {
  return `
    <section class="target-proposal-block">
      <h3>求人原稿の訴求案</h3>
      <ul class="target-appeal-list">
        ${model.appealSuggestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <p class="target-compliance-note">年齢・性別は応募資格の制限ではなく、訴求仮説として扱います。</p>
    </section>
  `;
}

function targetInsightText(context, model, stats) {
  const ageText = model.targetAgeLabels.map(targetAgeDisplayLabel).join("・");
  const genderText = targetGenderLabel(model.gender);
  const ratioText = stats.jobRatio?.value ? `有効求人倍率は${formatMarketDecimal(stats.jobRatio.value)}倍` : "有効求人倍率は未取得";
  const cpaText = context.cpa ? `既存応募単価は${formatCurrency(context.cpa)}` : "既存応募単価は未取得";
  const areaText = context.name ? `${context.name}の` : "";
  const topCityText = context.cityRows?.length ? `応募実績は${context.cityRows.slice(0, 2).map((row) => row.name).join("・")}に寄っています。` : "";
  if (model.difficulty.score >= 75) {
    return `${areaText}${ageText}の${genderText}は母集団が限られ、${ratioText}です。${cpaText}のため、給与・シフト・未経験歓迎など条件面の訴求を強める提案が向いています。${topCityText}`;
  }
  if (model.difficulty.score <= 45) {
    return `${areaText}${ageText}の${genderText}は比較的狙いやすい母集団です。${ratioText}なので、応募率が高い訴求を横展開する余地があります。${topCityText}`;
  }
  return `${areaText}${ageText}の${genderText}は一定の母集団がありますが、${ratioText}です。配信量を確保しながら、応募率やターゲット幅を調整するのが良さそうです。${topCityText}`;
}

function targetAgeDisplayLabel(label) {
  const text = cleanText(label);
  if (!text || text.includes("歳") || text.includes("代")) return text;
  return `${text}歳`;
}

function targetAgeListLabel(labels) {
  return (labels || []).map(targetAgeDisplayLabel).join(" / ");
}

function targetGenderLabel(gender) {
  if (gender === "male") return "男性";
  if (gender === "female") return "女性";
  return "男女計";
}

function renderMarketStats(stats, options = {}) {
  const values = stats.population.values;
  const total = values.total || 0;
  const jobRatio = stats.jobRatio?.value || 0;
  const basis = marketDataBasis(stats.dataBasis?.key || stats.population.basis?.key);
  const regionName = marketRegionDisplayName(stats.region);
  const populationTime = formatDashboardTime(stats.population.times.total);
  const jobTime = formatDashboardTime(stats.jobRatio?.time);
  const genderTotal = values.male + values.female;
  const ageGroups = marketAgeGroups(values);
  const ageTotal = ageGroups.reduce((sum, group) => sum + group.value, 0);

  const mapId = options.mapId || "jobMarketMap";
  return `
    <div class="market-summary-grid">
      ${marketSummaryCard("人口総数", `${formatNumber(total)}人`, `${regionName} / ${populationTime}`, basis)}
      ${marketSummaryCard("男性", `${formatNumber(values.male)}人`, formatMarketShare(values.male, genderTotal))}
      ${marketSummaryCard("女性", `${formatNumber(values.female)}人`, formatMarketShare(values.female, genderTotal))}
      ${marketSummaryCard("有効求人倍率", jobRatio ? `${formatMarketDecimal(jobRatio)}倍` : "-", `${stats.region.prefName} / ${jobTime}`)}
    </div>
    <div class="market-grid">
      <article class="panel market-visual-panel">
        <div class="panel-heading">
          <h2>年齢層</h2>
          <span>10歳以上 / ${populationTime}</span>
        </div>
        ${options.ageChart === "bar" ? renderMarketAgeBarChart(ageGroups, ageTotal) : renderMarketAgeColumnChart(ageGroups, ageTotal)}
      </article>
      <article class="panel market-visual-panel">
        <div class="panel-heading">
          <h2>性別</h2>
          <span>${populationTime}</span>
        </div>
        <div class="market-split-bar" aria-label="性別比率">
          <span style="width:${formatRawPercent(values.male, genderTotal)}%"></span>
          <span style="width:${formatRawPercent(values.female, genderTotal)}%"></span>
        </div>
        <div class="market-split-labels">
          <strong>男性 ${formatMarketShare(values.male, genderTotal)}</strong>
          <strong>女性 ${formatMarketShare(values.female, genderTotal)}</strong>
        </div>
      </article>
      <article class="panel market-map-panel">
        <div class="panel-heading">
          <h2>地図</h2>
          <span>Google Maps</span>
        </div>
        <div class="market-google-map" id="${escapeHtml(mapId)}"></div>
      </article>
      <article class="panel market-visual-panel market-trend-panel">
        <div class="panel-heading">
          <h2>人口推移</h2>
          <span>${escapeHtml(stats.population.sourceName || "統計")}</span>
        </div>
        ${renderMarketTrend(stats.population.series.total)}
      </article>
      <article class="panel market-note-panel">
        <div class="panel-heading">
          <h2>データ粒度</h2>
          <span>確認用</span>
        </div>
        <div class="market-note-list">
          <div><span>人口・性別・年齢層</span><strong>${escapeHtml(regionName)}単位</strong></div>
          <div><span>有効求人倍率</span><strong>${escapeHtml(stats.region.prefName)}単位</strong></div>
          <div><span>地域コード</span><strong>${escapeHtml(stats.region.regionCode)}</strong></div>
        </div>
      </article>
    </div>
    <p class="market-source-note">出典: 統計ダッシュボードAPI（${escapeHtml(stats.population.sourceName || "国勢調査")}、一般職業紹介状況）。推計値は公表されている将来推計人口をもとに補間しています。このサービスは、統計ダッシュボードのAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません。</p>
  `;
}

function marketRegionDisplayName(region) {
  const parent = cleanText(region.parentName);
  const name = cleanText(region.name);
  if (!parent || parent === name) return name;
  return `${parent} ${name}`;
}

function marketSummaryCard(label, value, meta, basis = null) {
  return `
    <article class="market-summary-card">
      <span>${escapeHtml(label)}${basis ? `<i>${escapeHtml(basis.badge)}</i>` : ""}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(meta || "-")}</small>
    </article>
  `;
}

function renderMarketAgeColumnChart(groups, total) {
  const maxPercent = Math.max(...groups.map((group) => formatRawPercent(group.value, total)), 1);
  return `
    <div class="market-age-column-chart" aria-label="年齢層構成">
      ${groups.map((group) => {
        const percent = formatRawPercent(group.value, total);
        const barHeight = total ? Math.max(4, (percent / maxPercent) * 100) : 0;
        return `
          <div class="market-age-column">
            <strong>${formatMarketShare(group.value, total)}</strong>
            <div class="market-age-bar-track">
              <span style="height:${barHeight}%;background:${group.color}"></span>
            </div>
            <span>${escapeHtml(group.label)}</span>
            <small>${formatNumber(group.value)}人</small>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderMarketAgeBarChart(groups, total) {
  const maxPercent = Math.max(...groups.map((group) => formatRawPercent(group.value, total)), 1);
  return `
    <div class="market-bar-list" aria-label="年齢層構成">
      ${groups.map((group) => {
        const percent = formatRawPercent(group.value, total);
        const width = total ? Math.max(4, (percent / maxPercent) * 100) : 0;
        return `
          <div class="market-bar-row">
            <div class="market-bar-meta">
              <strong>${escapeHtml(group.label)}</strong>
              <span>${formatMarketShare(group.value, total)} / ${formatNumber(group.value)}人</span>
            </div>
            <div class="market-bar-track">
              <span style="width:${width}%;background:${group.color}"></span>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function marketAgeGroups(values) {
  return MARKET_AGE_GROUPS.map((group) => ({
    ...group,
    value: group.keys.reduce((sum, key) => sum + (Number(values[key]) || 0), 0)
  }));
}

function marketStatsHasAgeGroups(stats) {
  const values = stats?.population?.values || {};
  return MARKET_AGE_GROUPS.flatMap((group) => group.keys)
    .every((key) => Number.isFinite(Number(values[key])));
}

function marketStatsMatchesBasis(stats, dataBasis) {
  return normalizeMarketDataBasis(stats?.dataBasis?.key || stats?.population?.basis?.key) === normalizeMarketDataBasis(dataBasis);
}

function renderMarketTrend(rows) {
  if (!rows?.length) return `<div class="empty-state">表示できるデータがありません</div>`;
  const max = Math.max(...rows.map((row) => row.value), 1);
  return `
    <div class="market-trend-list">
      ${rows.map((row) => `
        <div class="market-trend-row">
          <span>${escapeHtml(formatDashboardTime(row.time))}</span>
          <div><i style="width:${Math.max(4, (row.value / max) * 100)}%"></i></div>
          <strong>${formatNumber(row.value)}人</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function formatRawPercent(value, total) {
  return total ? Math.max(0, Math.min(100, (value / total) * 100)) : 0;
}

function formatMarketShare(value, total) {
  return total ? formatPercent(value / total) : "-";
}

function formatMarketDecimal(value) {
  return new Intl.NumberFormat("ja-JP", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value || 0);
}

function formatDecimal(value, digits = 1) {
  return new Intl.NumberFormat("ja-JP", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value || 0);
}

function formatDashboardTime(value) {
  const text = cleanText(value);
  if (!text) return "-";
  const year = text.slice(0, 4);
  if (text.includes("CY")) return `${year}年`;
  if (text.includes("FY")) return `${year}年度`;
  const month = Number(text.slice(4, 6));
  return month ? `${year}年${month}月` : `${year}年`;
}

function googleMapsApiKey() {
  return cleanText(window.GOOGLE_MAPS_API_KEY || localStorage.getItem("google-maps-api-key") || "");
}

function renderMarketMap({ elementId, query, label, compact = false, radiusKm = 0 }) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const safeQuery = cleanText(query);
  if (!safeQuery) {
    container.innerHTML = marketMapPlaceholder("地図検索する地域がありません", "", compact, "住所または勤務地を入力すると地図を表示します。");
    return;
  }
  if (!googleMapsApiKey()) {
    container.innerHTML = marketMapPlaceholder("Google Maps APIキー未設定", safeQuery, compact, "config.js に Google Maps APIキーを設定してください。");
    return;
  }
  if (window.location.protocol === "file:") {
    container.innerHTML = marketMapPlaceholder(
      "ローカルURLで開いてください",
      safeQuery,
      compact,
      "Google Mapsのサイト制限に合わせるため、http://127.0.0.1:8765/index.html で開く必要があります。"
    );
    return;
  }

  const mapRequestId = beginGoogleMapsRequest(container);
  container.innerHTML = marketMapPlaceholder("地図を読み込んでいます", safeQuery, compact, "Google Mapsを準備しています。");
  const stallTimer = startGoogleMapsStallTimer(
    container,
    mapRequestId,
    "地図の読み込みに時間がかかっています",
    safeQuery,
    compact
  );
  loadGoogleMaps()
    .then(() => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return Promise.reject(new Error("地図リクエストが更新されました"));
      return geocodeMarketQuery(safeQuery);
    })
    .then((location) => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return;
      window.clearTimeout(stallTimer);
      container.innerHTML = "";
      const map = new google.maps.Map(container, {
        center: location,
        zoom: compact ? 11 : 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: !compact
      });
      new google.maps.Marker({
        map,
        position: location,
        title: label || safeQuery
      });
      if (radiusKm > 0) {
        new google.maps.Circle({
          map,
          center: location,
          radius: radiusKm * 1000,
          strokeColor: "#2f65d9",
          strokeOpacity: 0.72,
          strokeWeight: 2,
          fillColor: "#2f65d9",
          fillOpacity: 0.12
        });
      }
    })
    .catch((error) => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return;
      window.clearTimeout(stallTimer);
      console.warn("Google Maps display failed", error);
      container.innerHTML = marketMapPlaceholder("地図を表示できませんでした", safeQuery, compact, googleMapsErrorHelp(error));
    });
}

function renderMarketMultiMap({ elementId, items, compact = false }) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const visibleItems = (items || []).filter((item) => cleanText(item.query));
  if (!visibleItems.length) {
    container.innerHTML = marketMapPlaceholder("表示できる勤務地がありません", "", compact, "地域候補を取得できると地図に表示します。");
    return;
  }
  if (!googleMapsApiKey()) {
    container.innerHTML = marketMapPlaceholder("Google Maps APIキー未設定", "", compact, "config.js に Google Maps APIキーを設定してください。");
    return;
  }
  if (window.location.protocol === "file:") {
    container.innerHTML = marketMapPlaceholder(
      "ローカルURLで開いてください",
      "",
      compact,
      "Google Mapsのサイト制限に合わせるため、http://127.0.0.1:8765/index.html で開く必要があります。"
    );
    return;
  }

  const mapRequestId = beginGoogleMapsRequest(container);
  container.innerHTML = marketMapPlaceholder("勤務地マップを読み込んでいます", `${visibleItems.length}エリア`, compact, "Google Mapsを準備しています。");
  const stallTimer = startGoogleMapsStallTimer(
    container,
    mapRequestId,
    "勤務地マップの読み込みに時間がかかっています",
    `${visibleItems.length}エリア`,
    compact
  );
  loadGoogleMaps()
    .then(() => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return Promise.reject(new Error("地図リクエストが更新されました"));
      return geocodeMarketItems(visibleItems);
    })
    .then((locations) => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return;
      window.clearTimeout(stallTimer);
      if (!locations.length) throw new Error("勤務地を地図上で見つけられませんでした");
      container.innerHTML = "";
      const map = new google.maps.Map(container, {
        center: locations[0].location,
        zoom: compact ? 9 : 10,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: !compact
      });
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((item, index) => {
        bounds.extend(item.location);
        new google.maps.Marker({
          map,
          position: item.location,
          label: String(index + 1),
          title: `${item.label || item.query}${item.meta ? ` / ${item.meta}` : ""}`
        });
      });
      if (locations.length > 1) {
        map.fitBounds(bounds, 48);
      } else {
        map.setZoom(compact ? 10 : 12);
      }
    })
    .catch((error) => {
      if (!googleMapsRequestCurrent(container, mapRequestId)) return;
      window.clearTimeout(stallTimer);
      console.warn("Google Maps multi display failed", error);
      container.innerHTML = marketMapPlaceholder("勤務地マップを表示できませんでした", `${visibleItems.length}エリア`, compact, googleMapsErrorHelp(error));
    });
}

function beginGoogleMapsRequest(container) {
  const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  container.dataset.googleMapsRequestId = requestId;
  return requestId;
}

function googleMapsRequestCurrent(container, requestId) {
  return container.dataset.googleMapsRequestId === requestId;
}

function startGoogleMapsStallTimer(container, requestId, title, query, compact, onStall = null) {
  return window.setTimeout(() => {
    if (!googleMapsRequestCurrent(container, requestId)) return;
    container.innerHTML = marketMapPlaceholder(
      title,
      query,
      compact,
      "Google Mapsの応答待ちです。Google Cloudの請求設定、APIキー制限、またはブラウザ拡張機能を確認してください。"
    );
    if (typeof onStall === "function") onStall();
  }, GOOGLE_MAPS_RENDER_STALL_MS);
}

function loadGoogleMaps() {
  if (googleMapsReady()) return Promise.resolve();
  if (googleMapsLoadPromise) return googleMapsLoadPromise;
  googleMapsLoadPromise = new Promise((resolve, reject) => {
    const callbackName = `initRecruitDashboardMap${Date.now()}`;
    let settled = false;
    let pollTimer = null;
    const finish = () => {
      if (settled) return;
      if (!googleMapsReady()) return;
      settled = true;
      window.clearTimeout(timeout);
      window.clearInterval(pollTimer);
      delete window[callbackName];
      resolve();
    };
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      window.clearInterval(pollTimer);
      delete window[callbackName];
      googleMapsLoadPromise = null;
      reject(new Error("Google Mapsの読み込みがタイムアウトしました"));
    }, GOOGLE_MAPS_LOAD_TIMEOUT_MS);
    window.gm_authFailure = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      window.clearInterval(pollTimer);
      delete window[callbackName];
      googleMapsLoadPromise = null;
      reject(new Error("Google Maps APIキーの認証に失敗しました"));
    };
    window[callbackName] = () => finish();
    pollTimer = window.setInterval(finish, GOOGLE_MAPS_READY_POLL_MS);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(googleMapsApiKey())}&callback=${callbackName}&language=ja&region=JP&libraries=places&auth_referrer_policy=origin&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = finish;
    script.onerror = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      window.clearInterval(pollTimer);
      delete window[callbackName];
      googleMapsLoadPromise = null;
      reject(new Error("Google Mapsを読み込めませんでした"));
    };
    document.head.appendChild(script);
  });
  return googleMapsLoadPromise;
}

async function geocodeMarketItems(items) {
  const locations = [];
  for (const item of items) {
    try {
      locations.push({
        ...item,
        location: await geocodeMarketQuery(item.query)
      });
      await wait(90);
    } catch {
      // 一部の地域だけ見つからない場合も、見つかった勤務地は地図に出します。
    }
  }
  return locations;
}

function geocodeMarketQuery(query) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: query, region: "JP" }, (results, status) => {
      const location = results?.[0]?.geometry?.location;
      if (status === "OK" && location) {
        resolve({ lat: location.lat(), lng: location.lng() });
      } else {
        reject(new Error(`地域を地図上で見つけられませんでした（${status || "UNKNOWN"}）`));
      }
    });
  });
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function googleMapsErrorHelp(error) {
  const message = cleanText(error?.message || error || "");
  if (window.location.protocol === "file:") {
    return "index.htmlを直接開くとGoogle Mapsのサイト制限に合いません。http://127.0.0.1:8765/index.html で開いてください。";
  }
  if (message.includes("認証")) {
    return `Google Cloud側で、このURLをキーのウェブサイト制限に追加してください: ${window.location.origin}/*`;
  }
  if (message.includes("タイムアウト") || message.includes("読み込めません")) {
    return "ネットワーク、広告ブロック、またはGoogle Cloud側のMaps JavaScript API有効化を確認してください。";
  }
  if (message.includes("REQUEST_DENIED")) {
    return "Geocoding APIが無効、またはAPIキーの制限で住所検索が拒否されています。";
  }
  if (message.includes("ZERO_RESULTS")) {
    return "住所が見つかりませんでした。市区町村名や都道府県名を含めて入力してください。";
  }
  return "Google Cloud側のAPI有効化、ウェブサイト制限、請求設定を確認してください。";
}

function marketMapPlaceholder(title, query, compact, helpText = "") {
  return `
    <div class="market-map-placeholder ${compact ? "compact" : ""}">
      <strong>${escapeHtml(title)}</strong>
      ${query ? `<span>${escapeHtml(query)}</span>` : ""}
      <small>${escapeHtml(helpText || "Google Mapsの設定を確認してください。")}</small>
    </div>
  `;
}

function renderSimulation() {
  syncSimulationBudgets();
  const budgets = state.simulation.budgets.map(numberFromText).filter((budget) => budget > 0);
  const model = buildSimulationModel();

  if (!model.groups.length) {
    dom.simulationMethodNote.innerHTML = "";
    dom.simulationResult.innerHTML = `<div class="empty-state">CSVを読み込むとシミュレーションできます</div>`;
    return;
  }

  if (!budgets.length) {
    dom.simulationMethodNote.innerHTML = simulationMethodText(model);
    dom.simulationResult.innerHTML = `<div class="empty-state">月予算を入力してください</div>`;
    return;
  }

  dom.simulationMethodNote.innerHTML = simulationMethodText(model);
  dom.simulationResult.innerHTML = renderSimulationScenarioGroups(budgets.map((budget) => simulateBudget(model, budget)));
}

function buildSimulationModel() {
  const recentRows = recentSimulationSourceRows();
  const rows = recentRows.filter((row) => row.cost > 0);
  const groups = aggregateBy(rows, (row) => tenDayKey(row.date))
    .map(monthlyizeSimulationGroup)
    .filter((group) => group.monthlyCost > 0);
  const budgetValues = groups.map((group) => group.monthlyCost).sort((a, b) => a - b);
  const cpaValues = groups
    .filter((group) => group.monthlyApplications > 0)
    .map((group) => safeDivide(group.monthlyCost, group.monthlyApplications))
    .filter(Boolean)
    .sort((a, b) => a - b);
  const ctrValues = groups.map((group) => safeDivide(group.monthlyClicks, group.monthlyImpressions)).filter(Boolean).sort((a, b) => a - b);
  const startRateValues = groups.map((group) => safeDivide(group.monthlyStarts, group.monthlyClicks)).filter(Boolean).sort((a, b) => a - b);
  const completionValues = groups.map((group) => safeDivide(group.monthlyApplications, group.monthlyStarts)).filter(Boolean).sort((a, b) => a - b);
  const applyRateValues = groups.map((group) => safeDivide(group.monthlyApplications, group.monthlyClicks)).filter(Boolean).sort((a, b) => a - b);
  const regressions = {
    impressions: fitPowerRegression(groups, "monthlyImpressions", 0.45, 1.08),
    clicks: fitPowerRegression(groups, "monthlyClicks", 0.42, 1),
    starts: fitPowerRegression(groups, "monthlyStarts", 0.35, 0.96),
    applications: fitPowerRegression(groups, "monthlyApplications", 0.32, 0.94)
  };

  return {
    groups,
    regressions,
    budgetMin: budgetValues[0] || 0,
    budgetMax: budgetValues.at(-1) || 0,
    budgetMedian: percentile(budgetValues, 0.5),
    budgetP75: percentile(budgetValues, 0.75),
    goodCpa: percentile(cpaValues, 0.35),
    bestCpa: percentile(cpaValues, 0.2),
    medianCpa: percentile(cpaValues, 0.5),
    medianCtr: percentile(ctrValues, 0.5) || 0.04,
    medianStartRate: percentile(startRateValues, 0.5) || 0.02,
    medianCompletionRate: percentile(completionValues, 0.5) || 0.5,
    medianApplyRate: percentile(applyRateValues, 0.5) || 0.01,
    periodLabel: simulationPeriodLabel(recentRows)
  };
}

function simulationSourceRows() {
  if (state.raw.daily.length) return state.raw.daily;
  if (state.raw.job.length) return state.raw.job;
  return state.raw.campaign;
}

function recentSimulationSourceRows() {
  const rows = simulationSourceRows().filter((row) => row.date);
  const months = unique(rows.map((row) => row.date.slice(0, 7)));
  const targetMonths = months.slice(-SIMULATION_MONTH_COUNT);
  return rows.filter((row) => targetMonths.includes(row.date.slice(0, 7)));
}

function simulationPeriodLabel(rows) {
  const months = unique(rows.map((row) => row.date?.slice(0, 7)).filter(Boolean));
  if (!months.length) return "-";
  if (months.length === 1) return formatMonthSelectLabel(months[0]);
  return `${formatMonthSelectLabel(months[0])}〜${formatMonthSelectLabel(months.at(-1))}`;
}

function monthlyizeSimulationGroup(group) {
  const dates = group.rows.map((row) => row.date).filter(Boolean).sort();
  const days = dateSpanDays(dates[0], dates.at(-1)) || dateSpanDays(group.startDate, group.endDate) || 10;
  const factor = 30 / days;
  return {
    ...group,
    days,
    monthlyCost: group.cost * factor,
    monthlyImpressions: group.impressions * factor,
    monthlyClicks: group.clicks * factor,
    monthlyStarts: group.starts * factor,
    monthlyApplications: group.applications * factor
  };
}

function fitPowerRegression(groups, yKey, minSlope, maxSlope) {
  const pairs = groups
    .map((group) => ({ x: group.monthlyCost, y: group[yKey] }))
    .filter((point) => point.x > 0 && point.y > 0);
  const ratios = pairs.map((point) => point.y / point.x).sort((a, b) => a - b);
  const fallbackRatio = percentile(ratios, 0.5);

  if (pairs.length < 3) {
    return {
      count: pairs.length,
      slope: 1,
      r2: 0,
      predict: (budget) => budget * (fallbackRatio || 0)
    };
  }

  const xs = pairs.map((point) => Math.log(point.x));
  const ys = pairs.map((point) => Math.log(point.y));
  const avgX = average(xs);
  const avgY = average(ys);
  const variance = xs.reduce((sum, value) => sum + (value - avgX) ** 2, 0);
  const covariance = xs.reduce((sum, value, index) => sum + (value - avgX) * (ys[index] - avgY), 0);
  const slope = clamp(covariance / (variance || 1), minSlope, maxSlope);
  const intercept = avgY - slope * avgX;
  const predictions = xs.map((value) => intercept + slope * value);
  const totalVariance = ys.reduce((sum, value) => sum + (value - avgY) ** 2, 0);
  const residual = ys.reduce((sum, value, index) => sum + (value - predictions[index]) ** 2, 0);
  const r2 = totalVariance ? clamp(1 - residual / totalVariance, 0, 1) : 0;

  return {
    count: pairs.length,
    slope,
    r2,
    predict: (budget) => {
      const predicted = Math.exp(intercept + slope * Math.log(Math.max(1, budget)));
      return Number.isFinite(predicted) ? predicted : budget * (fallbackRatio || 0);
    }
  };
}

function simulateBudget(model, budget) {
  const base = predictBaseSimulation(model, budget);
  const scenarios = [
    {
      key: "base",
      label: "現状維持",
      metrics: base
    },
    {
      key: "improved",
      label: "改善見込み",
      featured: true,
      metrics: improveSimulationScenario(model, base, budget, {
        lift: 0.12,
        cpaImprove: 0.16,
        cap: 1.25,
        targetCpa: model.goodCpa
      })
    },
    {
      key: "upside",
      label: "上振れ",
      metrics: improveSimulationScenario(model, base, budget, {
        lift: 0.22,
        cpaImprove: 0.27,
        cap: 1.45,
        targetCpa: model.bestCpa
      })
    }
  ];

  return {
    budget,
    confidence: simulationConfidence(model, budget),
    scenarios
  };
}

function predictBaseSimulation(model, budget) {
  const impressions = model.regressions.impressions.predict(budget);
  const clicks = model.regressions.clicks.predict(budget);
  const starts = model.regressions.starts.predict(budget);
  const directApplications = model.regressions.applications.predict(budget);
  const funnelApplications = weightedAverage([
    { value: starts * model.medianCompletionRate, weight: 0.32 },
    { value: clicks * model.medianApplyRate, weight: 0.26 },
    { value: directApplications, weight: model.regressions.applications.count >= 5 ? 0.42 : 0.24 }
  ]);
  return normalizeSimulationMetrics(model, {
    cost: budget,
    impressions,
    clicks,
    starts,
    applications: funnelApplications
  });
}

function improveSimulationScenario(model, base, budget, options) {
  const discount = simulationBudgetDiscount(model, budget);
  const baseApplications = Math.max(base.applications, 0.1);
  const baseCpa = safeDivide(budget, baseApplications);
  const improvedCpa = Math.max(options.targetCpa || 0, baseCpa * (1 - options.cpaImprove * discount));
  const efficiencyApplications = improvedCpa ? budget / improvedCpa : baseApplications;
  const liftedApplications = baseApplications * (1 + options.lift * discount);
  const applications = Math.min(
    Math.max(baseApplications, liftedApplications * 0.55 + efficiencyApplications * 0.45),
    baseApplications * options.cap
  );
  const appScale = safeDivide(applications, baseApplications) || 1;
  return normalizeSimulationMetrics(model, {
    cost: budget,
    impressions: base.impressions * (1 + (appScale - 1) * 0.18),
    clicks: base.clicks * (1 + (appScale - 1) * 0.3),
    starts: Math.max(base.starts * (1 + (appScale - 1) * 0.55), applications / Math.max(model.medianCompletionRate, 0.25)),
    applications
  });
}

function normalizeSimulationMetrics(model, metrics) {
  let applications = Math.max(0, metrics.applications || 0);
  let clicks = Math.max(metrics.clicks || 0, applications / Math.max(model.medianApplyRate, 0.004));
  let starts = Math.max(metrics.starts || 0, applications / Math.max(model.medianCompletionRate, 0.25));
  let impressions = Math.max(metrics.impressions || 0, clicks / Math.max(model.medianCtr, 0.004));

  starts = Math.min(starts, clicks);
  applications = Math.min(applications, starts);
  clicks = Math.min(clicks, impressions);

  return {
    cost: metrics.cost,
    impressions,
    clicks,
    starts,
    applications,
    ctr: safeDivide(clicks, impressions),
    startRate: safeDivide(starts, clicks),
    completionRate: safeDivide(applications, starts),
    applyRate: safeDivide(applications, clicks),
    cpc: safeDivide(metrics.cost, clicks),
    cpaStart: safeDivide(metrics.cost, starts),
    cpa: safeDivide(metrics.cost, applications)
  };
}

function renderSimulationScenarioGroups(items) {
  const groups = [
    { key: "base", label: "現状維持" },
    { key: "improved", label: "改善見込み", featured: true },
    { key: "upside", label: "上振れ" }
  ];
  return groups
    .map((group) => {
      const rows = items
        .map((item) => ({
          budget: item.budget,
          scenario: item.scenarios.find((scenario) => scenario.key === group.key)
        }))
        .filter((row) => row.scenario);
      return `
        <article class="simulation-scenario-card ${group.featured ? "featured-card" : ""}">
          <div class="simulation-scenario-head">
            <h3>${escapeHtml(group.label)}</h3>
            <span>${rows.map((row) => formatCurrency(row.budget)).join(" / ")}</span>
          </div>
          <div class="simulation-table-wrap">
            <table class="simulation-table">
              <thead>
                <tr>
                  <th>月予算</th>
                  <th>表示回数</th>
                  <th>表示単価</th>
                  <th>クリック数</th>
                  <th>クリック率</th>
                  <th>クリック単価</th>
                  <th>応募開始率</th>
                  <th>応募開始単価</th>
                  <th>応募完了率</th>
                  <th>応募数</th>
                  <th>応募率</th>
                  <th>応募単価</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((row) => renderSimulationScenarioRow(row.scenario, row.budget)).join("")}
              </tbody>
            </table>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSimulationScenarioRow(scenario, budget) {
  const metrics = scenario.metrics;
  return `
    <tr class="${scenario.featured ? "featured-row" : ""}">
      <td>
        <strong>${formatCurrency(budget)}</strong>
      </td>
      <td>${formatNumber(metrics.impressions)}</td>
      <td>${formatCurrencyDecimal(safeDivide(metrics.cost, metrics.impressions))}</td>
      <td>${formatNumber(metrics.clicks)}</td>
      <td>${formatPercent(metrics.ctr)}</td>
      <td class="highlight-cell">${formatCurrency(metrics.cpc)}</td>
      <td>${formatPercent(metrics.startRate)}</td>
      <td>${formatCurrency(metrics.cpaStart)}</td>
      <td>${formatPercent(metrics.completionRate)}</td>
      <td>${formatNumber(metrics.applications)}</td>
      <td>${formatPercent(metrics.applyRate)}</td>
      <td class="highlight-cell">${formatCurrency(metrics.cpa)}</td>
    </tr>
  `;
}

function downloadSimulationSpreadsheet() {
  syncSimulationBudgets();
  const budgets = state.simulation.budgets.map(numberFromText).filter((budget) => budget > 0);
  const model = buildSimulationModel();
  if (!model.groups.length || !budgets.length) {
    renderSimulation();
    return;
  }

  const items = budgets.map((budget) => simulateBudget(model, budget));
  const workbook = createSimulationWorkbookXml(items, model);
  const blob = new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `simulation_${toIsoDate(new Date())}.xls`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function createSimulationWorkbookXml(items, model) {
  const columns = [
    { label: "月予算", width: 120 },
    { label: "表示回数", width: 96 },
    { label: "表示単価", width: 92 },
    { label: "クリック数", width: 92 },
    { label: "クリック率", width: 82 },
    { label: "クリック単価", width: 92, highlight: true },
    { label: "応募開始率", width: 96 },
    { label: "応募開始単価", width: 108 },
    { label: "応募完了率", width: 96 },
    { label: "応募数", width: 78 },
    { label: "応募率", width: 78 },
    { label: "応募単価", width: 92, highlight: true }
  ];
  const groups = [
    { key: "base", label: "現状維持" },
    { key: "improved", label: "改善見込み", featured: true },
    { key: "upside", label: "上振れ" }
  ];
  const rows = [];

  groups.forEach((group, groupIndex) => {
    if (groupIndex) rows.push(spreadsheetRow([spreadsheetCell("", "Blank")]));
    rows.push(spreadsheetRow([
      spreadsheetCell(group.label, group.featured ? "ScenarioFeaturedTitle" : "ScenarioTitle", { mergeAcross: columns.length - 1 })
    ], 26));
    rows.push(spreadsheetRow(columns.map((column) => spreadsheetCell(column.label, "Header")), 28));
    items.forEach((item) => {
      const scenario = item.scenarios.find((entry) => entry.key === group.key);
      if (!scenario) return;
      rows.push(spreadsheetRow(simulationSpreadsheetCells(item.budget, scenario, columns, group.featured), 28));
    });
  });
  rows.push(...simulationMethodSpreadsheetRows(model, columns.length));

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="11" ss:Color="#07111F"/>
    </Style>
    <Style ss:ID="Blank"/>
    <Style ss:ID="ScenarioTitle">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="13" ss:Bold="1" ss:Color="#20242A"/>
      <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="ScenarioFeaturedTitle">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="13" ss:Bold="1" ss:Color="#1948B8"/>
      <Interior ss:Color="#F3F8FF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Header">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#205F9D" ss:Pattern="Solid"/>
      <Borders>${spreadsheetBorders("#C9D5E5")}</Borders>
    </Style>
    <Style ss:ID="Cell">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="11" ss:Color="#07111F"/>
      <Borders>${spreadsheetBorders("#C9D5E5")}</Borders>
    </Style>
    <Style ss:ID="BudgetCell">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="11" ss:Bold="1" ss:Color="#07111F"/>
      <Borders>${spreadsheetBorders("#C9D5E5")}</Borders>
    </Style>
    <Style ss:ID="FeaturedCell">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="11" ss:Bold="1" ss:Color="#07111F"/>
      <Interior ss:Color="#F7FAFF" ss:Pattern="Solid"/>
      <Borders>${spreadsheetBorders("#C9D5E5")}</Borders>
    </Style>
    <Style ss:ID="HighlightCell">
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="11" ss:Bold="1" ss:Color="#07111F"/>
      <Interior ss:Color="#FFF9E7" ss:Pattern="Solid"/>
      <Borders>${spreadsheetBorders("#C9D5E5")}</Borders>
    </Style>
    <Style ss:ID="MethodTitle">
      <Alignment ss:Vertical="Center"/>
      <Font ss:FontName="Yu Gothic" ss:Size="13" ss:Bold="1" ss:Color="#1948B8"/>
      <Interior ss:Color="#F3F8FF" ss:Pattern="Solid"/>
      <Borders>${spreadsheetBorders("#C9D5E5")}</Borders>
    </Style>
    <Style ss:ID="MethodLabel">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Yu Gothic" ss:Size="11" ss:Bold="1" ss:Color="#07111F"/>
      <Interior ss:Color="#F8FBFF" ss:Pattern="Solid"/>
      <Borders>${spreadsheetBorders("#C9D5E5")}</Borders>
    </Style>
    <Style ss:ID="MethodText">
      <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
      <Font ss:FontName="Yu Gothic" ss:Size="11" ss:Color="#334155"/>
      <Borders>${spreadsheetBorders("#C9D5E5")}</Borders>
    </Style>
  </Styles>
  <Worksheet ss:Name="シミュレーション">
    <Table>
      ${columns.map((column) => `<Column ss:Width="${column.width}"/>`).join("")}
      ${rows.join("")}
    </Table>
  </Worksheet>
</Workbook>`;
}

function simulationSpreadsheetCells(budget, scenario, columns, featured) {
  const metrics = scenario.metrics;
  const values = [
    formatCurrency(budget),
    formatNumber(metrics.impressions),
    formatCurrencyDecimal(safeDivide(metrics.cost, metrics.impressions)),
    formatNumber(metrics.clicks),
    formatPercent(metrics.ctr),
    formatCurrency(metrics.cpc),
    formatPercent(metrics.startRate),
    formatCurrency(metrics.cpaStart),
    formatPercent(metrics.completionRate),
    formatNumber(metrics.applications),
    formatPercent(metrics.applyRate),
    formatCurrency(metrics.cpa)
  ];
  return values.map((value, index) => {
    if (index === 0) return spreadsheetCell(value, featured ? "FeaturedCell" : "BudgetCell");
    return spreadsheetCell(value, columns[index].highlight ? "HighlightCell" : featured ? "FeaturedCell" : "Cell");
  });
}

function simulationMethodSpreadsheetRows(model, columnCount) {
  const appRegressionWeight = model.regressions.applications.count >= 5 ? 0.42 : 0.24;
  const totalWeight = 0.32 + 0.26 + appRegressionWeight;
  const startWeight = Math.round((0.32 / totalWeight) * 100);
  const clickWeight = Math.round((0.26 / totalWeight) * 100);
  const regressionWeight = Math.max(0, 100 - startWeight - clickWeight);
  const mergeAll = columnCount - 1;
  const mergeText = columnCount - 2;
  const rows = [
    spreadsheetRow([spreadsheetCell("", "Blank")]),
    spreadsheetRow([spreadsheetCell("シミュレーション根拠", "MethodTitle", { mergeAcross: mergeAll })], 28),
    spreadsheetRow([
      spreadsheetCell("集計対象期間", "MethodLabel"),
      spreadsheetCell(model.periodLabel || "-", "MethodText", { mergeAcross: mergeText })
    ], 24),
    spreadsheetRow([
      spreadsheetCell("分析点数", "MethodLabel"),
      spreadsheetCell(`${formatNumber(model.groups.length)}件`, "MethodText", { mergeAcross: mergeText })
    ], 24),
    spreadsheetRow([
      spreadsheetCell("月換算予算レンジ", "MethodLabel"),
      spreadsheetCell(`${formatCurrency(model.budgetMin)}〜${formatCurrency(model.budgetMax)}`, "MethodText", { mergeAcross: mergeText })
    ], 24),
    spreadsheetRow([
      spreadsheetCell("中央値CPA", "MethodLabel"),
      spreadsheetCell(model.medianCpa ? formatCurrency(model.medianCpa) : "-", "MethodText", { mergeAcross: mergeText })
    ], 24)
  ];
  [
    [
      "1. 予算と各指標の関係を推定",
      "直近3ヶ月の実績を上旬・中旬・下旬の10日単位で集計し、30日換算したうえで、月予算と表示回数・クリック数・応募開始数・応募数の関係を回帰分析で推定しています。"
    ],
    [
      "2. 応募数はファネルも加味",
      `応募数 = ${startWeight}% ×（応募開始数 × 応募完了率中央値） + ${clickWeight}% ×（クリック数 × 応募率中央値） + ${regressionWeight}% × 回帰応募数。`
    ],
    [
      "3. 予算増の伸びすぎを抑制",
      "予算を増やしても効果が完全に比例しない前提で、直近3ヶ月の上位予算帯を超えるほど改善幅を控えめにしています。"
    ],
    [
      "4. 3パターンの考え方",
      "現状維持は直近3ヶ月の傾向ベース。改善見込みはCPA最大16%改善・応募数最大25%。上振れはCPA最大27%改善・応募数最大45%を上限にしています。"
    ]
  ].forEach(([label, text]) => {
    rows.push(spreadsheetRow([
      spreadsheetCell(label, "MethodLabel"),
      spreadsheetCell(text, "MethodText", { mergeAcross: mergeText })
    ], 46));
  });
  return rows;
}

function spreadsheetRow(cells, height) {
  const heightAttr = height ? ` ss:Height="${height}"` : "";
  return `<Row${heightAttr}>${cells.join("")}</Row>`;
}

function spreadsheetCell(value, styleId, options = {}) {
  const merge = options.mergeAcross ? ` ss:MergeAcross="${options.mergeAcross}"` : "";
  return `<Cell ss:StyleID="${styleId}"${merge}><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`;
}

function spreadsheetBorders(color) {
  return `
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="${color}"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="${color}"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="${color}"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="${color}"/>
  `;
}

function simulationMethodText(model) {
  const appRegressionWeight = model.regressions.applications.count >= 5 ? 0.42 : 0.24;
  const totalWeight = 0.32 + 0.26 + appRegressionWeight;
  const startWeight = Math.round((0.32 / totalWeight) * 100);
  const clickWeight = Math.round((0.26 / totalWeight) * 100);
  const regressionWeight = Math.max(0, 100 - startWeight - clickWeight);
  return `
    <article class="simulation-method-card">
      <div class="simulation-method-head">
        <h3>シミュレーション根拠</h3>
        <span>直近3ヶ月を30日換算して推定</span>
      </div>
      <div class="simulation-method-pills">
        <span>対象期間 ${escapeHtml(model.periodLabel || "-")}</span>
        <span>分析点数 ${formatNumber(model.groups.length)}件</span>
        <span>月換算予算 ${formatCurrency(model.budgetMin)}〜${formatCurrency(model.budgetMax)}</span>
        <span>中央値CPA ${model.medianCpa ? formatCurrency(model.medianCpa) : "-"}</span>
      </div>
      <div class="simulation-formula-grid">
        <div>
          <strong>1. 予算と各指標の関係を推定</strong>
          <p>直近3ヶ月の実績を上旬・中旬・下旬の10日単位で集計し、30日換算したうえで、月予算と表示回数・クリック数・応募開始数・応募数の関係を回帰分析で推定しています。</p>
        </div>
        <div>
          <strong>2. 応募数はファネルも加味</strong>
          <p>応募数 = ${startWeight}% ×（応募開始数 × 応募完了率中央値） + ${clickWeight}% ×（クリック数 × 応募率中央値） + ${regressionWeight}% × 回帰応募数。</p>
        </div>
        <div>
          <strong>3. 予算増の伸びすぎを抑制</strong>
          <p>予算を増やしても効果が完全に比例しない前提で、直近3ヶ月の上位予算帯を超えるほど改善幅を控えめにしています。</p>
        </div>
        <div>
          <strong>4. 3パターンの考え方</strong>
          <p>現状維持は直近3ヶ月の傾向ベース。改善見込みはCPA最大16%改善・応募数最大25%。上振れはCPA最大27%改善・応募数最大45%を上限にしています。</p>
        </div>
      </div>
    </article>
  `;
}

function simulationConfidence(model, budget) {
  const avgR2 = average(Object.values(model.regressions).map((regression) => regression.r2));
  const outside = budget < model.budgetMin * 0.65 || budget > model.budgetMax * 1.5;
  if (outside || model.groups.length < 6) {
    return {
      label: "参考値",
      tone: "low",
      note: "直近3ヶ月の予算帯から離れているため、提案時は参考レンジとして扱ってください。"
    };
  }
  if (model.groups.length >= 12 && avgR2 >= 0.45 && budget >= model.budgetMin * 0.8 && budget <= model.budgetMax * 1.2) {
    return {
      label: "信頼度 高",
      tone: "high",
      note: "直近3ヶ月の実績範囲に近く、比較的安定して見られる予測です。"
    };
  }
  return {
    label: "信頼度 中",
    tone: "middle",
    note: "直近3ヶ月の実績を元にしていますが、求人内容や時期によって上下します。"
  };
}

function simulationBudgetDiscount(model, budget) {
  if (!model.budgetMax) return 0.8;
  if (budget <= model.budgetP75) return 1;
  if (budget <= model.budgetMax) return 0.88;
  return clamp(model.budgetMax / budget, 0.55, 0.82);
}

function inferSimulationBaseBudget() {
  const rows = recentSimulationSourceRows().filter((row) => row.cost > 0);
  const monthly = aggregateBy(rows, (row) => row.date.slice(0, 7)).map((item) => item.cost).filter(Boolean).sort((a, b) => a - b);
  return percentile(monthly, 0.5);
}

function roundSimulationBudget(value) {
  return Math.max(10000, Math.round((value || 0) / 10000) * 10000);
}

function renderReportPreview(analytics) {
  const filters = activeFilterLabels().join(" / ") || "全期間・全体";
  dom.reportPreview.innerHTML = [
    ["顧客名", state.profile.clientName || "未設定"],
    ["対象期間", analytics.period],
    ["絞り込み", filters],
    ["PDF構成", "表紙 / 月次 / 週次 / 求人 / エリア"],
    ["コメント", state.reportNotes ? "入力あり" : "未入力"]
  ]
    .map(([label, value]) => `<div class="preview-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
}

function renderTable(container, rows, columns, limit = 80) {
  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">表示できるデータがありません</div>`;
    return;
  }

  const head = columns.map(([label]) => `<th class="${numericColumn(label) ? "num" : ""}">${escapeHtml(label)}</th>`).join("");
  const body = rows
    .slice(0, limit)
    .map((row, rowIndex) => {
      const cells = columns
        .map(([, key, type]) => {
          const raw = typeof key === "function" ? key(row, rowIndex, rows) : row[key];
          const value = type ? formatByType(raw, type) : raw;
          const classes = numericValue(type) ? "num" : "";
          const display = String(value ?? "-");
          const inner = display.length > 34 ? `<div class="truncate" title="${escapeHtml(display)}">${escapeHtml(display)}</div>` : escapeHtml(display);
          return `<td class="${classes}">${inner}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");
  container.innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function areaDetailColumns(nameLabel) {
  return [
    { label: nameLabel, sortKey: "name", sortType: "text", value: (row) => row.name, className: "period-cell text-cell area-name-cell report-area-name-col" },
    { label: "表示回数", sortKey: "impressions", sortType: "number", value: (row) => formatNumber(row.impressions), sortValue: (row) => row.impressions, numeric: true, className: "report-area-impressions-col" },
    { label: "表示単価", sortKey: "displayUnit", sortType: "number", value: (row) => formatCurrencyDecimal(row.displayUnit), sortValue: (row) => row.displayUnit, numeric: true, className: "report-area-display-col" },
    { label: "クリック数", sortKey: "clicks", sortType: "number", value: (row) => formatNumber(row.clicks), sortValue: (row) => row.clicks, numeric: true, className: "report-area-click-col" },
    { label: "クリック率", sortKey: "ctr", sortType: "number", value: (row) => formatPercent(row.ctr), sortValue: (row) => row.ctr, numeric: true, className: "report-area-rate-col" },
    { label: "クリック単価", sortKey: "cpc", sortType: "number", value: (row) => formatCurrency(row.cpc), sortValue: (row) => row.cpc, numeric: true, className: "highlight-cell report-area-money-col" },
    { label: "応募開始率", sortKey: "startRate", sortType: "number", value: (row) => formatPercent(row.startRate), sortValue: (row) => row.startRate, numeric: true, className: "report-area-start-rate-col" },
    { label: "応募開始単価", sortKey: "cpaStart", sortType: "number", value: (row) => formatCurrency(row.cpaStart), sortValue: (row) => row.cpaStart, numeric: true, className: "report-area-long-money-col" },
    { label: "応募完了率", sortKey: "completionRate", sortType: "number", value: (row) => formatPercent(row.completionRate), sortValue: (row) => row.completionRate, numeric: true, className: "report-area-completion-col" },
    { label: "応募数", sortKey: "applications", sortType: "number", value: (row) => formatNumber(row.applications), sortValue: (row) => row.applications, numeric: true, className: "report-area-app-col" },
    { label: "応募率", sortKey: "applyRate", sortType: "number", value: (row) => formatPercent(row.applyRate), sortValue: (row) => row.applyRate, numeric: true, className: "report-area-apply-rate-col" },
    { label: "応募単価", sortKey: "cpa", sortType: "number", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), sortValue: (row) => row.cpa, numeric: true, className: "highlight-cell report-area-money-col" },
    { label: "合計費用", sortKey: "cost", sortType: "number", value: (row) => formatCurrency(row.cost), sortValue: (row) => row.cost, numeric: true, className: "highlight-cell report-area-total-col" }
  ];
}

function renderMonthlyDetailTable(container, rows) {
  const columns = [
    { label: "掲載年月", value: (row) => formatMonthForTable(row.name), className: "period-cell" },
    { label: "表示回数", value: (row) => formatNumber(row.impressions), numeric: true },
    { label: "表示単価", value: (row) => formatCurrencyDecimal(row.displayUnit), numeric: true },
    { label: "クリック数", value: (row) => formatNumber(row.clicks), numeric: true },
    { label: "クリック率", value: (row) => formatPercent(row.ctr), numeric: true },
    { label: "クリック単価", value: (row) => formatCurrency(row.cpc), numeric: true, className: "highlight-cell" },
    { label: "応募開始率", value: (row) => formatPercent(row.startRate), numeric: true },
    { label: "応募開始単価", value: (row) => formatCurrency(row.cpaStart), numeric: true },
    { label: "応募完了率", value: (row) => formatPercent(row.completionRate), numeric: true },
    { label: "応募数", value: (row) => formatNumber(row.applications), numeric: true },
    { label: "応募率", value: (row) => formatPercent(row.applyRate), numeric: true },
    { label: "応募単価", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), numeric: true, className: "highlight-cell" },
    { label: "合計費用", value: (row) => formatCurrency(row.cost), numeric: true, className: "highlight-cell" }
  ];
  renderDetailTable(container, rows, columns, "monthly-detail-table");
}

function renderWeeklyDetailTable(container, rows) {
  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">表示できるデータがありません</div>`;
    return;
  }

  const metricColumns = [
    { label: "表示回数", value: (row) => formatNumber(row.impressions), numeric: true },
    { label: "クリック数", value: (row) => formatNumber(row.clicks), numeric: true },
    { label: "クリック率", value: (row) => formatPercent(row.ctr), numeric: true },
    { label: "クリック単価", value: (row) => formatCurrency(row.cpc), numeric: true, className: "highlight-cell" },
    { label: "応募開始率", value: (row) => formatPercent(row.startRate), numeric: true },
    { label: "応募開始単価", value: (row) => formatCurrency(row.cpaStart), numeric: true },
    { label: "応募完了率", value: (row) => formatPercent(row.completionRate), numeric: true },
    { label: "応募数", value: (row) => formatNumber(row.applications), numeric: true },
    { label: "応募率", value: (row) => formatPercent(row.applyRate), numeric: true },
    { label: "応募単価", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), numeric: true, className: "highlight-cell" },
    { label: "合計費用", value: (row) => formatCurrency(row.cost), numeric: true, className: "highlight-cell" }
  ];
  const head = `<th colspan="2">週</th>${metricColumns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}`;
  const body = rows
    .map((row) => {
      const dateCells = `
        <td class="period-cell">${escapeHtml(formatShortDateForTable(row.startDate))}</td>
        <td class="period-cell">${escapeHtml(formatShortDateForTable(row.endDate))}</td>
      `;
      const metricCells = metricColumns
        .map((column) => {
          const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
          return `<td class="${className}">${escapeHtml(column.value(row))}</td>`;
        })
        .join("");
      return `<tr>${dateCells}${metricCells}</tr>`;
    })
    .join("");

  container.innerHTML = `<table class="metric-detail-table weekly-detail-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderCampaignMonthlyTable(container, rows) {
  const columns = [
    { label: "掲載年月", value: (row) => formatMonthForTable(row.month), className: "period-cell" },
    { label: "CP", value: (row) => row.campaign, className: "text-cell" },
    { label: "表示回数", value: (row) => formatNumber(row.impressions), numeric: true },
    { label: "クリック数", value: (row) => formatNumber(row.clicks), numeric: true },
    { label: "クリック率", value: (row) => formatPercent(row.ctr), numeric: true },
    { label: "クリック単価", value: (row) => formatCurrency(row.cpc), numeric: true, className: "highlight-cell" },
    { label: "応募開始率", value: (row) => formatPercent(row.startRate), numeric: true },
    { label: "応募開始単価", value: (row) => formatCurrency(row.cpaStart), numeric: true },
    { label: "応募完了率", value: (row) => formatPercent(row.completionRate), numeric: true },
    { label: "応募数", value: (row) => formatNumber(row.applications), numeric: true },
    { label: "応募率", value: (row) => formatPercent(row.applyRate), numeric: true },
    { label: "応募単価", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), numeric: true, className: "highlight-cell" },
    { label: "合計費用", value: (row) => formatCurrency(row.cost), numeric: true, className: "highlight-cell" }
  ];
  renderDetailTable(container, rows, columns, "campaign-detail-table");
}

function jobDetailColumns() {
  return [
    { label: "求人", sortKey: "name", sortType: "text", value: (row) => row.name, className: "text-cell" },
    { label: "職種", sortKey: "jobType", sortType: "text", value: (row) => row.jobType, className: "text-cell" },
    { label: "雇用形態", sortKey: "employment", sortType: "text", value: (row) => row.employment, className: "text-cell" },
    { label: "給与", sortKey: "salaryAmount", sortType: "number", value: (row) => salaryText(row), sortValue: (row) => row.salaryAmount || 0, className: "text-cell salary-cell" },
    { label: "表示回数", sortKey: "impressions", sortType: "number", value: (row) => formatNumber(row.impressions), sortValue: (row) => row.impressions, numeric: true },
    { label: "クリック数", sortKey: "clicks", sortType: "number", value: (row) => formatNumber(row.clicks), sortValue: (row) => row.clicks, numeric: true },
    { label: "クリック率", sortKey: "ctr", sortType: "number", value: (row) => formatPercent(row.ctr), sortValue: (row) => row.ctr, numeric: true },
    { label: "クリック単価", sortKey: "cpc", sortType: "number", value: (row) => formatCurrency(row.cpc), sortValue: (row) => row.cpc, numeric: true, className: "highlight-cell" },
    { label: "応募開始率", sortKey: "startRate", sortType: "number", value: (row) => formatPercent(row.startRate), sortValue: (row) => row.startRate, numeric: true },
    { label: "応募開始単価", sortKey: "cpaStart", sortType: "number", value: (row) => formatCurrency(row.cpaStart), sortValue: (row) => row.cpaStart, numeric: true },
    { label: "応募完了率", sortKey: "completionRate", sortType: "number", value: (row) => formatPercent(row.completionRate), sortValue: (row) => row.completionRate, numeric: true },
    { label: "応募数", sortKey: "applications", sortType: "number", value: (row) => formatNumber(row.applications), sortValue: (row) => row.applications, numeric: true },
    { label: "応募率", sortKey: "applyRate", sortType: "number", value: (row) => formatPercent(row.applyRate), sortValue: (row) => row.applyRate, numeric: true },
    { label: "応募単価", sortKey: "cpa", sortType: "number", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), sortValue: (row) => row.cpa, numeric: true, className: "highlight-cell" },
    { label: "合計費用", sortKey: "cost", sortType: "number", value: (row) => formatCurrency(row.cost), sortValue: (row) => row.cost, numeric: true, className: "highlight-cell" }
  ];
}

function renderDetailTable(container, rows, columns, tableClass) {
  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">表示できるデータがありません</div>`;
    return;
  }

  const head = columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
  const body = rows
    .map((row) => {
      const cells = columns
        .map((column) => {
          const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
          return `<td class="${className}">${escapeHtml(column.value(row))}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  container.innerHTML = `<table class="metric-detail-table ${tableClass}"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderSortableTable(container, rows, columns, sortState, tableClass, sortScope = "job") {
  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">表示できるデータがありません</div>`;
    return;
  }

  const sortedRows = sortTableRows(rows, columns, sortState);
  const head = columns
    .map((column) => {
      const active = sortState?.key === column.sortKey;
      const arrow = active ? (sortState.direction === "asc" ? "▲" : "▼") : "↕";
      const ariaSort = active ? (sortState.direction === "asc" ? "ascending" : "descending") : "none";
      const className = [column.numeric ? "num" : "", column.sortKey ? "sortable-heading" : ""].filter(Boolean).join(" ");
      if (!column.sortKey) return `<th class="${className}" aria-sort="${ariaSort}">${escapeHtml(column.label)}</th>`;
      return `
        <th class="${className}" aria-sort="${ariaSort}">
          <button class="sort-button" type="button" data-sort-scope="${escapeHtml(sortScope)}" data-sort-key="${escapeHtml(column.sortKey)}" data-sort-type="${escapeHtml(column.sortType || "text")}" aria-label="${escapeHtml(column.label)}を昇順・降順で並び替え" title="${escapeHtml(column.label)}を昇順・降順で並び替え">
            <span>${escapeHtml(column.label)}</span>
            <small>${arrow}</small>
          </button>
        </th>
      `;
    })
    .join("");
  const body = sortedRows
    .map((row) => {
      const cells = columns
        .map((column) => {
          const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
          return `<td class="${className}">${escapeHtml(column.value(row))}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  container.innerHTML = `<table class="metric-detail-table sortable-table ${tableClass}"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function sortTableRows(rows, columns, sortState) {
  const column = columns.find((item) => item.sortKey === sortState?.key);
  if (!column) return rows;
  const direction = sortState.direction === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const aValue = sortableColumnValue(a, column);
    const bValue = sortableColumnValue(b, column);
    if (column.sortType === "number") {
      return ((Number(aValue) || 0) - (Number(bValue) || 0)) * direction;
    }
    return String(aValue ?? "").localeCompare(String(bValue ?? ""), "ja") * direction;
  });
}

function sortableColumnValue(row, column) {
  if (column.sortValue) return column.sortValue(row);
  return row[column.sortKey] ?? column.value(row);
}

function handleSortableTableClick(event) {
  const button = event.target.closest("[data-sort-key]");
  if (!button) return;
  const key = button.dataset.sortKey;
  const sortType = button.dataset.sortType;
  const scope = button.dataset.sortScope || "job";
  const current = state.sorts[scope] || {};
  const nextDirection = current.key === key ? (current.direction === "asc" ? "desc" : "asc") : sortType === "number" ? "desc" : "asc";
  state.sorts[scope] = { key, direction: nextDirection };
  render();
  saveState();
}

function scheduleFloatingTableHeaderUpdate() {
  if (floatingHeaderFrame) return;
  floatingHeaderFrame = requestAnimationFrame(() => {
    floatingHeaderFrame = 0;
    updateFloatingTableHeader();
  });
}

function updateFloatingTableHeader() {
  const wrapper = document.querySelector(".tab-panel.active .detail-table-wrap");
  const table = wrapper?.querySelector(".metric-detail-table");
  const header = table?.querySelector("thead");
  if (!wrapper || !table || !header) {
    hideFloatingTableHeader();
    return;
  }

  const wrapperRect = wrapper.getBoundingClientRect();
  const tableRect = table.getBoundingClientRect();
  const headerHeight = header.getBoundingClientRect().height;
  const shouldFloat = wrapperRect.top < 0 && wrapperRect.bottom > headerHeight;
  if (!shouldFloat) {
    hideFloatingTableHeader();
    return;
  }

  const signature = `${wrapper.id}:${table.className}:${header.innerHTML}`;
  if (!floatingTableHeader) {
    floatingTableHeader = document.createElement("div");
    floatingTableHeader.className = "floating-table-header";
    floatingTableHeader.setAttribute("aria-hidden", "true");
    document.body.appendChild(floatingTableHeader);
  }

  if (floatingHeaderSignature !== signature) {
    floatingTableHeader.innerHTML = `<table class="${table.className}">${header.outerHTML}</table>`;
    floatingHeaderSignature = signature;
  }

  const floatingTable = floatingTableHeader.querySelector("table");
  floatingTable.style.width = `${tableRect.width}px`;
  floatingTable.style.minWidth = `${tableRect.width}px`;
  floatingTable.style.transform = `translateX(${-wrapper.scrollLeft}px)`;
  floatingTableHeader.style.display = "block";
  floatingTableHeader.style.left = `${wrapperRect.left}px`;
  floatingTableHeader.style.top = "0px";
  floatingTableHeader.style.width = `${wrapperRect.width}px`;
  floatingTableHeader.style.height = `${headerHeight}px`;
}

function hideFloatingTableHeader() {
  if (floatingTableHeader) floatingTableHeader.style.display = "none";
}

function numericColumn(label) {
  return /費用|応募|表示|クリック|率|単価|求人数|中央値|前月比/.test(label);
}

function numericValue(type) {
  return ["currency", "number", "percent"].includes(type);
}

function formatByType(value, type) {
  if (type === "currency") return value ? formatCurrency(value) : "-";
  if (type === "number") return formatNumber(value);
  if (type === "percent") return formatPercent(value);
  return value;
}

function renderBars(container, rows, metric, options = {}) {
  if (!rows.length) {
    container.innerHTML = `<div class="empty-state">表示できるデータがありません</div>`;
    return;
  }
  const sorted = [...rows].sort((a, b) => (options.lowerIsBetter ? a[metric] - b[metric] : b[metric] - a[metric])).slice(0, options.limit ?? 12);
  const max = Math.max(...sorted.map((item) => item[metric]), 1);
  const header = options.valueType === "costAndApps"
    ? `
      <div class="bar-row bar-row-header" aria-hidden="true">
        <div></div>
        <div></div>
        <div class="bar-value">
          <div class="bar-metric-grid bar-metric-head">
            <span>費用</span>
            <span>応募</span>
            <span>応募単価</span>
          </div>
        </div>
      </div>
    `
    : "";
  container.innerHTML = header + sorted
    .map((item) => {
      const width = Math.max(3, (item[metric] / max) * 100);
      const value = barValue(item, metric, options.valueType);
      return `
        <div class="bar-row" title="${escapeHtml(item.name)}">
          <div class="bar-label">${escapeHtml(item.name)}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
          <div class="bar-value">${value}</div>
        </div>
      `;
    })
    .join("");
}

function barValue(item, metric, valueType) {
  if (valueType === "currency") return item[metric] ? formatCurrency(item[metric]) : "-";
  if (valueType === "costAndApps") {
    return `
      <div class="bar-metric-grid bar-metric-values">
        <strong>${formatCurrency(item.cost)}</strong>
        <strong>${formatNumber(item.applications)}件</strong>
        <strong>${item.cpa ? formatCurrency(item.cpa) : "-"}</strong>
      </div>
    `;
  }
  return formatNumber(item[metric]);
}

function createTrendSvg(rows, options = {}) {
  if (!rows.length) return `<div class="empty-state">表示できるデータがありません</div>`;
  const visible = options.maxPoints && rows.length > options.maxPoints ? rows.slice(-options.maxPoints) : rows;
  const width = options.width ?? 1180;
  const height = options.height ?? 430;
  const pad = { top: options.topPad ?? 28, right: 72, bottom: options.bottomPad ?? 108, left: 72 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const maxCost = chartMax(
    Math.max(...visible.map((item) => item.cost), 1),
    options.tightCostAxis,
    options.costScalePadding
  );
  const lineScalePadding = options.lineScalePadding ?? 1;
  const maxAppsRaw = Math.max(...visible.map((item) => item.applications), 1);
  const maxCpaRaw = Math.max(...visible.map((item) => item.cpa || 0), 1);
  const maxApps = lineScalePadding > 1 ? chartMax(maxAppsRaw * lineScalePadding, true) : niceMax(maxAppsRaw);
  const maxCpa = lineScalePadding > 1 ? chartMax(maxCpaRaw * lineScalePadding, true) : niceMax(maxCpaRaw);
  const step = chartWidth / visible.length;
  const barWidth = Math.max(
    options.barMinWidth ?? 18,
    Math.min(options.barMaxWidth ?? 68, step * (options.barWidthRatio ?? 0.56))
  );
  const x = (index) => pad.left + step * index + step / 2;
  const yCost = (value) => pad.top + chartHeight - (value / maxCost) * chartHeight;
  const yApps = (value) => pad.top + chartHeight - (value / maxApps) * chartHeight;
  const yCpa = (value) => pad.top + chartHeight - (value / maxCpa) * chartHeight;
  const labelEvery = Math.max(1, Math.ceil(visible.length / 18));
  const appPoints = visible.map((item, index) => ({ x: x(index), y: yApps(item.applications) }));
  const cpaPoints = visible.map((item, index) => ({ x: x(index), y: yCpa(item.cpa || 0) }));

  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((rate) => {
      const y = pad.top + chartHeight * rate;
      return `
        <line class="grid-line" x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}"></line>
        <text class="axis-label" x="${pad.left - 10}" y="${y + 5}" text-anchor="end">${formatAxisCurrency(maxCost * (1 - rate))}</text>
        <text class="axis-label" x="${width - pad.right + 10}" y="${y + 5}" text-anchor="start">${formatAxisNumber(maxApps * (1 - rate))}</text>
      `;
    })
    .join("");

  const bars = visible
    .map((item, index) => {
      const top = yCost(item.cost);
      const barHeight = pad.top + chartHeight - top;
      return `<rect class="cost-bar" x="${x(index) - barWidth / 2}" y="${top}" width="${barWidth}" height="${barHeight}" rx="7"></rect>`;
    })
    .join("");

  const labels = visible
    .map((item, index) => {
      if (index % labelEvery !== 0 && index !== visible.length - 1) return "";
      const rawLabel = String(item[options.xKey ?? "name"]);
      const label = options.labelFormatter ? options.labelFormatter(rawLabel) : rawLabel;
      const labelY = height - (options.labelBottomOffset ?? 72);
      const labelX = x(index);
      const labelAngle = options.labelAngle ?? -38;
      const labelAnchor = options.labelAnchor ?? "end";
      const transform = labelAngle ? ` transform="rotate(${labelAngle} ${labelX} ${labelY})"` : "";
      return `<text class="chart-label" x="${labelX}" y="${labelY}" text-anchor="${labelAnchor}"${transform}>${escapeHtml(label)}</text>`;
    })
    .join("");

  const hover = visible
    .map((item, index) => {
      const guideX = x(index);
      const tooltipWidth = 178;
      const tooltipHeight = 92;
      const tooltipX = Math.min(width - pad.right - tooltipWidth - 8, Math.max(pad.left + 8, guideX + 16));
      const tooltipY = Math.max(pad.top + 8, Math.min(chartHeight - 40, yApps(item.applications) - 34));
      const tooltipTitle = options.labelFormatter ? options.labelFormatter(item.name) : item.name;
      return `
        <g class="chart-hover">
          <rect x="${guideX - step / 2}" y="${pad.top}" width="${step}" height="${chartHeight}" fill="transparent"></rect>
          <line class="chart-hover-guide" x1="${guideX}" y1="${pad.top}" x2="${guideX}" y2="${pad.top + chartHeight}"></line>
          <g class="chart-tooltip">
            <rect class="tooltip-box" x="${tooltipX}" y="${tooltipY}" width="${tooltipWidth}" height="${tooltipHeight}" rx="4"></rect>
            <text class="tooltip-title" x="${tooltipX + 14}" y="${tooltipY + 24}">${escapeHtml(tooltipTitle)}</text>
            <text class="tooltip-value" fill="#2074bf" x="${tooltipX + 14}" y="${tooltipY + 46}">費用：${formatCurrency(item.cost)}</text>
            <text class="tooltip-value" fill="#78cef5" x="${tooltipX + 14}" y="${tooltipY + 66}">応募数：${formatNumber(item.applications)}</text>
            <text class="tooltip-value" fill="#f79a2c" x="${tooltipX + 14}" y="${tooltipY + 86}">応募単価：${item.cpa ? formatCurrency(item.cpa) : "-"}</text>
          </g>
        </g>
      `;
    })
    .join("");

  return `
    <svg class="combo-chart-card" viewBox="0 0 ${width} ${height}" role="img" aria-label="月次推移グラフ">
      ${grid}
      <line class="axis-line" x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + chartHeight}"></line>
      <line class="axis-line" x1="${width - pad.right}" y1="${pad.top}" x2="${width - pad.right}" y2="${pad.top + chartHeight}"></line>
      <line class="axis-line" x1="${pad.left}" y1="${pad.top + chartHeight}" x2="${width - pad.right}" y2="${pad.top + chartHeight}"></line>
      ${bars}
      <path class="app-line" d="${smoothPath(appPoints)}"></path>
      <path class="cpa-line" d="${smoothPath(cpaPoints)}"></path>
      ${appPoints.map((point) => `<circle class="app-dot" cx="${point.x}" cy="${point.y}" r="5"></circle>`).join("")}
      ${cpaPoints.map((point) => `<circle class="cpa-dot" cx="${point.x}" cy="${point.y}" r="5"></circle>`).join("")}
      ${labels}
      ${legendSvg(width / 2 - 120, height - (options.legendBottomOffset ?? 18), [
        { type: "bar", color: "#2074bf", label: "費用" },
        { type: "line", color: "#78cef5", label: "応募数" },
        { type: "line", color: "#f79a2c", label: "応募単価" }
      ])}
      ${hover}
    </svg>
  `;
}

function createRateTrendSvg(rows, options = {}) {
  if (!rows.length) return `<div class="empty-state">表示できるデータがありません</div>`;
  const visible = options.maxPoints && rows.length > options.maxPoints ? rows.slice(-options.maxPoints) : rows;
  const includeCtr = Boolean(options.includeCtr);
  const width = options.width ?? 1180;
  const height = options.height ?? 430;
  const pad = { top: options.topPad ?? 28, right: 72, bottom: options.bottomPad ?? 108, left: 72 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const maxCost = chartMax(
    Math.max(...visible.map((item) => item.cost), 1),
    options.tightCostAxis,
    options.costScalePadding
  );
  const lineScalePadding = options.lineScalePadding ?? 1;
  const maxRateRaw = Math.max(
    ...visible.map((item) =>
      Math.max(item.startRate || 0, item.applyRate || 0, includeCtr ? item.ctr || 0 : 0)
    ),
    0.01
  );
  const maxRate = lineScalePadding > 1
    ? chartMax(maxRateRaw * lineScalePadding, true)
    : Math.max(0.01, Math.ceil(maxRateRaw * 1000) / 1000);
  const maxCpcRaw = Math.max(...visible.map((item) => item.cpc || 0), 1);
  const maxCpc = lineScalePadding > 1 ? chartMax(maxCpcRaw * lineScalePadding, true) : niceMax(maxCpcRaw);
  const step = chartWidth / visible.length;
  const barWidth = Math.max(
    options.barMinWidth ?? 18,
    Math.min(options.barMaxWidth ?? 68, step * (options.barWidthRatio ?? 0.56))
  );
  const x = (index) => pad.left + step * index + step / 2;
  const yCost = (value) => pad.top + chartHeight - (value / maxCost) * chartHeight;
  const yRate = (value) => pad.top + chartHeight - (value / maxRate) * chartHeight;
  const yCpc = (value) => pad.top + chartHeight - (value / maxCpc) * chartHeight;
  const labelEvery = Math.max(1, Math.ceil(visible.length / 18));
  const cpcPoints = visible.map((item, index) => ({ x: x(index), y: yCpc(item.cpc || 0) }));
  const ctrPoints = includeCtr ? visible.map((item, index) => ({ x: x(index), y: yRate(item.ctr || 0) })) : [];
  const startPoints = visible.map((item, index) => ({ x: x(index), y: yRate(item.startRate || 0) }));
  const applyPoints = visible.map((item, index) => ({ x: x(index), y: yRate(item.applyRate || 0) }));

  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((rate) => {
      const y = pad.top + chartHeight * rate;
      return `
        <line class="grid-line" x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}"></line>
        <text class="axis-label" x="${pad.left - 10}" y="${y + 5}" text-anchor="end">${formatAxisCurrency(maxCost * (1 - rate))}</text>
        <text class="axis-label" x="${width - pad.right + 10}" y="${y + 5}" text-anchor="start">${formatPercent(maxRate * (1 - rate))}</text>
      `;
    })
    .join("");

  const bars = visible
    .map((item, index) => {
      const top = yCost(item.cost);
      const barHeight = pad.top + chartHeight - top;
      return `<rect class="cost-bar" x="${x(index) - barWidth / 2}" y="${top}" width="${barWidth}" height="${barHeight}" rx="7"></rect>`;
    })
    .join("");

  const labels = visible
    .map((item, index) => {
      if (index % labelEvery !== 0 && index !== visible.length - 1) return "";
      const rawLabel = String(item[options.xKey ?? "name"]);
      const label = options.labelFormatter ? options.labelFormatter(rawLabel) : rawLabel;
      const labelY = height - (options.labelBottomOffset ?? 72);
      const labelX = x(index);
      const labelAngle = options.labelAngle ?? -38;
      const labelAnchor = options.labelAnchor ?? "end";
      const transform = labelAngle ? ` transform="rotate(${labelAngle} ${labelX} ${labelY})"` : "";
      return `<text class="chart-label" x="${labelX}" y="${labelY}" text-anchor="${labelAnchor}"${transform}>${escapeHtml(label)}</text>`;
    })
    .join("");

  const hover = visible
    .map((item, index) => {
      const guideX = x(index);
      const tooltipWidth = 196;
      const tooltipHeight = includeCtr ? 132 : 112;
      const tooltipX = Math.min(width - pad.right - tooltipWidth - 8, Math.max(pad.left + 8, guideX + 16));
      const tooltipY = Math.max(pad.top + 8, Math.min(chartHeight - 50, yRate(item.applyRate || 0) - 38));
      const tooltipTitle = options.labelFormatter ? options.labelFormatter(item.name) : item.name;
      const ctrTooltip = includeCtr
        ? `<text class="tooltip-value" fill="#c41445" x="${tooltipX + 14}" y="${tooltipY + 86}">クリック率：${formatPercent(item.ctr)}</text>`
        : "";
      const startY = includeCtr ? tooltipY + 106 : tooltipY + 86;
      const applyY = includeCtr ? tooltipY + 126 : tooltipY + 106;
      const applyColor = includeCtr ? "#84cc16" : "#ef4444";
      return `
        <g class="chart-hover">
          <rect x="${guideX - step / 2}" y="${pad.top}" width="${step}" height="${chartHeight}" fill="transparent"></rect>
          <line class="chart-hover-guide" x1="${guideX}" y1="${pad.top}" x2="${guideX}" y2="${pad.top + chartHeight}"></line>
          <g class="chart-tooltip">
            <rect class="tooltip-box" x="${tooltipX}" y="${tooltipY}" width="${tooltipWidth}" height="${tooltipHeight}" rx="4"></rect>
            <text class="tooltip-title" x="${tooltipX + 14}" y="${tooltipY + 24}">${escapeHtml(tooltipTitle)}</text>
            <text class="tooltip-value" fill="#2074bf" x="${tooltipX + 14}" y="${tooltipY + 46}">費用：${formatCurrency(item.cost)}</text>
            <text class="tooltip-value" fill="#41b9ef" x="${tooltipX + 14}" y="${tooltipY + 66}">クリック単価：${item.cpc ? formatCurrency(item.cpc) : "-"}</text>
            ${ctrTooltip}
            <text class="tooltip-value" fill="#f79a2c" x="${tooltipX + 14}" y="${startY}">応募開始率：${formatPercent(item.startRate)}</text>
            <text class="tooltip-value" fill="${applyColor}" x="${tooltipX + 14}" y="${applyY}">応募率：${formatPercent(item.applyRate)}</text>
          </g>
        </g>
      `;
    })
    .join("");

  const legendItems = [
    { type: "bar", color: "#2074bf", label: "費用" },
    { type: "line", color: "#41b9ef", label: "クリック単価" },
    ...(includeCtr ? [{ type: "line", color: "#c41445", label: "クリック率" }] : []),
    { type: "line", color: "#f79a2c", label: "応募開始率" },
    { type: "line", color: includeCtr ? "#84cc16" : "#ef4444", label: "応募率" }
  ];

  return `
    <svg class="combo-chart-card" viewBox="0 0 ${width} ${height}" role="img" aria-label="月次効率推移グラフ">
      ${grid}
      <line class="axis-line" x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + chartHeight}"></line>
      <line class="axis-line" x1="${width - pad.right}" y1="${pad.top}" x2="${width - pad.right}" y2="${pad.top + chartHeight}"></line>
      <line class="axis-line" x1="${pad.left}" y1="${pad.top + chartHeight}" x2="${width - pad.right}" y2="${pad.top + chartHeight}"></line>
      ${bars}
      <path class="cpc-line" d="${smoothPath(cpcPoints)}"></path>
      ${includeCtr ? `<path class="rate-line" d="${smoothPath(ctrPoints)}"></path>` : ""}
      <path class="start-line" d="${smoothPath(startPoints)}"></path>
      <path class="${includeCtr ? "apply-rate-line" : "rate-line"}" d="${smoothPath(applyPoints)}"></path>
      ${cpcPoints.map((point) => `<circle class="cpc-dot" cx="${point.x}" cy="${point.y}" r="5"></circle>`).join("")}
      ${includeCtr ? ctrPoints.map((point) => `<circle class="rate-dot" cx="${point.x}" cy="${point.y}" r="5"></circle>`).join("") : ""}
      ${startPoints.map((point) => `<circle class="start-dot" cx="${point.x}" cy="${point.y}" r="5"></circle>`).join("")}
      ${applyPoints.map((point) => `<circle class="${includeCtr ? "apply-rate-dot" : "rate-dot"}" cx="${point.x}" cy="${point.y}" r="5"></circle>`).join("")}
      ${labels}
      ${legendSvg(width / 2 - (includeCtr ? 285 : 190), height - (options.legendBottomOffset ?? 18), legendItems)}
      ${hover}
    </svg>
  `;
}

function legendSvg(startX, y, items) {
  let cursor = startX;
  return `<g>${items
    .map((item) => {
      const labelWidth = Math.max(62, item.label.length * 20);
      const marker =
        item.type === "bar"
          ? `<rect x="${cursor}" y="${y - 10}" width="13" height="13" fill="${item.color}"></rect>`
          : `<line x1="${cursor}" y1="${y - 3}" x2="${cursor + 18}" y2="${y - 3}" stroke="${item.color}" stroke-width="3"></line><circle cx="${cursor + 9}" cy="${y - 3}" r="3.4" fill="#fff" stroke="${item.color}" stroke-width="2"></circle>`;
      const textX = cursor + (item.type === "bar" ? 19 : 24);
      const fragment = `${marker}<text class="legend-label" x="${textX}" y="${y}" fill="${item.color}">${escapeHtml(item.label)}</text>`;
      cursor += labelWidth + (item.type === "bar" ? 34 : 42);
      return fragment;
    })
    .join("")}</g>`;
}

function smoothPath(points) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

function niceMax(value) {
  if (!value || value <= 0) return 1;
  const exponent = Math.floor(Math.log10(value));
  const base = 10 ** exponent;
  const scaled = value / base;
  const nice = scaled <= 1 ? 1 : scaled <= 2 ? 2 : scaled <= 5 ? 5 : 10;
  return nice * base;
}

function chartMax(value, tight = false, padding = 1.18) {
  if (!tight) return niceMax(value);
  if (!value || value <= 0) return 1;
  const padded = value * (padding || 1.18);
  const exponent = Math.floor(Math.log10(padded));
  const base = 10 ** exponent;
  const scaled = padded / base;
  const nice =
    scaled <= 1.2 ? 1.2 :
    scaled <= 1.5 ? 1.5 :
    scaled <= 2 ? 2 :
    scaled <= 2.5 ? 2.5 :
    scaled <= 3 ? 3 :
    scaled <= 4 ? 4 :
    scaled <= 5 ? 5 :
    scaled <= 7.5 ? 7.5 :
    10;
  return nice * base;
}

function formatAxisCurrency(value) {
  return `￥${formatShortCurrency(value)}`;
}

function formatAxisNumber(value) {
  return `${formatNumber(value)}件`;
}

function createInsights({ summary, previous, yoy, monthly, campaigns, jobs, jobTypes, salaryTypes, cities }) {
  const insights = [];
  const budget = Number(state.profile.budget) || 0;
  const targetCpa = Number(state.profile.targetCpa) || 0;
  const latestMonth = monthly.at(-1);
  const previousMonth = monthly.at(-2);
  const bestCampaign = campaigns.filter((item) => item.applications > 0).sort((a, b) => a.cpa - b.cpa)[0];
  const weakCampaign = campaigns.filter((item) => item.cost > 0 && item.applications === 0).sort((a, b) => b.cost - a.cost)[0];
  const bestJob = jobs.filter((item) => item.applications > 0).sort((a, b) => a.cpa - b.cpa)[0];
  const strongType = jobTypes.filter((item) => item.applications > 0).sort((a, b) => a.cpa - b.cpa)[0];
  const salaryLead = salaryTypes.filter((item) => item.applications > 0).sort((a, b) => a.cpa - b.cpa)[0];
  const cityLead = cities.filter((item) => item.applications > 0).sort((a, b) => b.applications - a.applications)[0];

  if (!summary.cost && !summary.applications) {
    return [{ tone: "", text: "CSVを読み込むと、総評と改善ポイントを自動で作成します。" }];
  }

  if (budget) {
    const rate = summary.cost / budget;
    insights.push({
      tone: rate <= 1 ? "good" : "warn",
      text: `費用は推定月予算比${formatPercent(rate)}です。予算管理上は${rate <= 1 ? "大きな超過はありません" : "配信量の調整候補があります"}。`
    });
  }

  if (targetCpa && summary.cpa) {
    const rate = summary.cpa / targetCpa;
    insights.push({
      tone: rate <= 1 ? "good" : "warn",
      text: `応募単価は目標CPA比${formatPercent(rate)}です。`
    });
  }

  if (previous) {
    insights.push({
      tone: summary.applications >= previous.applications ? "good" : "warn",
      text: `応募数は前期間比${formatPercent(delta(summary.applications, previous.applications))}です。`
    });
    if (summary.cpa && previous.cpa) {
      insights.push({
        tone: summary.cpa <= previous.cpa ? "good" : "warn",
        text: `応募単価は前期間比${formatPercent(delta(summary.cpa, previous.cpa))}です。`
      });
    }
  }

  if (yoy) {
    insights.push({
      tone: summary.applications >= yoy.applications ? "good" : "warn",
      text: `応募数は前年同期間比${formatPercent(delta(summary.applications, yoy.applications))}です。`
    });
  }

  if (latestMonth && previousMonth) {
    insights.push({
      tone: latestMonth.applications >= previousMonth.applications ? "good" : "warn",
      text: `直近月の応募数は前月比${formatPercent(delta(latestMonth.applications, previousMonth.applications))}です。`
    });
  }

  if (bestCampaign) {
    insights.push({
      tone: "good",
      text: `${bestCampaign.name}は応募単価${formatCurrency(bestCampaign.cpa)}で、効率の良いCPです。`
    });
  }

  if (weakCampaign) {
    insights.push({
      tone: "warn",
      text: `${weakCampaign.name}は費用${formatCurrency(weakCampaign.cost)}に対して応募が出ていないため、配信条件や求人訴求の確認候補です。`
    });
  }

  if (bestJob) {
    insights.push({
      tone: "good",
      text: `${bestJob.name}は求人別で効率が良く、類似求人への展開余地があります。`
    });
  }

  if (strongType) {
    insights.push({
      tone: "good",
      text: `職種では${strongType.name}が応募単価${formatCurrency(strongType.cpa)}で好調です。`
    });
  }

  if (salaryLead) {
    insights.push({
      tone: "",
      text: `給与タイプ別では${salaryLead.name}の応募効率が最も良好です。`
    });
  }

  if (cityLead) {
    insights.push({
      tone: "",
      text: `エリアでは${cityLead.name}の応募数が多く、配信継続の軸にできます。`
    });
  }

  return insights.slice(0, 8);
}

async function printCurrentReport() {
  renderPrintReport();
  await waitForPrintAssets();
  window.print();
}

async function printTargetAnalysisReport() {
  if (!dom.targetAnalysisResult || !dom.targetAnalysisResult.textContent.trim()) {
    window.alert("ターゲット分析の表示データがありません。CSVを読み込んでから出力してください。");
    return;
  }
  const emptyState = dom.targetAnalysisResult.querySelector(".market-empty-state");
  if (emptyState) {
    window.alert(emptyState.textContent.trim() || "ターゲット分析の表示データがありません。");
    return;
  }
  renderTargetAnalysisPrintReport();
  await waitForPrintAssets();
  window.print();
}

async function printAddressMarketReport() {
  if (!dom.sidebarMarketResult?.querySelector(".address-market-shell")) {
    window.alert("住所で地域検索の表示データがありません。住所を検索してから出力してください。");
    return;
  }
  renderAddressMarketPrintReport();
  await waitForPrintAssets();
  window.print();
}

async function printAddressBulkReport() {
  const bulk = ensureAddressBulkState();
  if (bulk.loading || bulk.results.some((item) => item.status === "loading" || item.status === "pending")) {
    window.alert("一括検索が完了してからPDF出力してください。");
    return;
  }
  const results = bulk.results.filter((item) => item.status === "done" || item.status === "error");
  if (!results.length) {
    window.alert("一括検索の表示データがありません。一括検索してから出力してください。");
    return;
  }
  renderAddressBulkPrintReport(results);
  await waitForPrintAssets();
  window.print();
}

function waitForPrintAssets() {
  const images = [...dom.printReport.querySelectorAll("img")];
  if (!images.length) return Promise.resolve();
  const waits = images.map((image) => {
    if (image.complete && image.naturalWidth) return Promise.resolve();
    if (typeof image.decode === "function") return image.decode().catch(() => {});
    return new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  });
  return Promise.all(waits);
}

function renderAddressMarketPrintReport() {
  const shell = dom.sidebarMarketResult.querySelector(".address-market-shell")?.cloneNode(true);
  if (!shell) return;
  shell.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
  prepareAddressPrintMap(shell.querySelector(".address-google-map"));
  const titleHtml = shell.querySelector(".address-market-title-row")?.outerHTML || "";
  const mapHtml = shell.querySelector(".address-map-panel")?.outerHTML || "";
  const sideHtml = shell.querySelector(".address-market-side")?.outerHTML || "";
  const nearbyHtml = shell.querySelector(".address-nearby-grid")?.outerHTML || "";
  const copyHtml = shell.querySelector(".address-copy-panel")?.outerHTML || "";
  const attributeHtml = shell.querySelector(".address-attribute-panel")?.outerHTML || "";
  const sourceHtml = shell.querySelector(".market-source-note")?.outerHTML || "";
  dom.printReport.innerHTML = `
    <section class="report-page address-report-page address-report-page-summary">
      ${reportPageHeader("地域分析詳細")}
      <div class="address-report-body address-report-summary-body">
        ${titleHtml}
        <div class="address-report-summary-grid">
          ${mapHtml}
          ${sideHtml}
        </div>
      </div>
    </section>
    <section class="report-page address-report-page address-report-page-nearby">
      ${reportPageHeader("地域分析詳細", "最寄駅・近辺ランドマーク")}
      <div class="address-report-body address-report-nearby-body">
        ${nearbyHtml}
        ${copyHtml}
        ${sourceHtml}
      </div>
    </section>
    <section class="report-page address-report-page address-report-page-attributes">
      ${reportPageHeader("地域分析詳細", "属性別人口")}
      <div class="address-report-body address-report-attribute-body">
        ${attributeHtml}
      </div>
    </section>
  `;
}

function renderAddressBulkPrintReport(results) {
  const clientName = state.profile.clientName || "顧客名未設定";
  const pages = chunkRows(results, 2);
  dom.printReport.innerHTML = pages.map((items, pageIndex) => `
    <section class="report-page address-bulk-report-page">
      ${reportPageHeader("住所一括検索", `${clientName} / ${formatNumber(results.length)}件${pages.length > 1 ? ` / ${pageIndex + 1}/${pages.length}` : ""}`)}
      <div class="address-bulk-report-body">
        ${items.map((result) => renderAddressBulkPrintCard(result, results.indexOf(result))).join("")}
      </div>
    </section>
  `).join("");
}

function renderAddressBulkPrintCard(result, index) {
  const number = `${index + 1}`;
  if (result.status === "error") {
    return `
      <article class="address-bulk-print-card is-error">
        <div class="address-bulk-print-head">
          <span>${escapeHtml(number)}</span>
          <div>
            <h3>${escapeHtml(result.address)}</h3>
            <small>検索できませんでした</small>
          </div>
        </div>
        <div class="address-place-empty warn">${escapeHtml(result.error || "周辺情報を取得できませんでした")}</div>
      </article>
    `;
  }
  const stations = (result.stations || []).slice(0, ADDRESS_BULK_PLACE_LIMIT);
  const landmarks = (result.landmarks || []).slice(0, ADDRESS_BULK_PLACE_LIMIT);
  return `
    <article class="address-bulk-print-card">
      <div class="address-bulk-print-head">
        <span>${escapeHtml(number)}</span>
        <div>
          <h3>${escapeHtml(result.address)}</h3>
          <small>駅 ${formatNumber(stations.length)}件 / ランドマーク ${formatNumber(landmarks.length)}件</small>
        </div>
      </div>
      <div class="address-bulk-print-places">
        <section>
          <h4>最寄駅情報</h4>
          <div class="address-place-list">
            ${renderAddressPlaceList(stations, "近くの駅が見つかりませんでした")}
          </div>
        </section>
        <section>
          <h4>近辺ランドマーク情報</h4>
          <div class="address-place-list">
            ${renderAddressPlaceList(landmarks, "近くのランドマークが見つかりませんでした")}
          </div>
        </section>
      </div>
      <section class="address-bulk-print-hints">
        <h4>求人原稿に使えそうな周辺キーワード</h4>
        ${renderAddressBulkRecruitHints(stations, landmarks)}
      </section>
    </article>
  `;
}

function prepareAddressPrintMap(printMap) {
  if (!printMap) return;
  printMap.classList.add("address-print-map");
  printMap.querySelectorAll("svg").forEach((element) => element.remove());
  printMap.querySelectorAll(".gmnoprint, .gm-style-cc, .gm-fullscreen-control").forEach((element) => element.remove());
  printMap.insertAdjacentHTML("beforeend", `<div class="address-print-radius-circle" aria-hidden="true"></div>`);
}

function renderTargetAnalysisPrintReport() {
  const clientName = state.profile.clientName || "顧客名未設定";
  const status = dom.targetAnalysisStatusText?.textContent.trim() || "";
  const liveStrategyTips = collectTargetStrategyTipsFromList(
    dom.targetAnalysisResult?.querySelector("[data-target-strategy-signature]")
  );
  const result = dom.targetAnalysisResult?.cloneNode(true);
  prepareTargetStrategyTipsForPrint(result, liveStrategyTips);
  const heroHtml = result?.querySelector(".target-hero-grid")?.outerHTML || "";
  const ageHtml = targetPrintAgeSplitHtml(result);
  const attributeHtml = result?.querySelector(".target-attribute-card")?.outerHTML || "";
  const wageHtml = result?.querySelector(".target-wage-card")?.outerHTML || "";
  const tipsHtml = result?.querySelector(".target-tips-card")?.outerHTML || "";
  const performanceHtml = result?.querySelector(".target-prefecture-performance-card")?.outerHTML || "";
  const attributeDensity = targetPrintDensityClass(
    result?.querySelectorAll(".target-attribute-card .target-metric-row, .target-attribute-card .target-metric-detail-row").length || 0,
    18,
    30
  );
  const actionDensity = targetPrintDensityClass(
    (result?.querySelectorAll(".target-tips-card .target-tip-item").length || 0)
      + (result?.querySelectorAll(".target-prefecture-performance-card .prefecture-breakdown-row").length || 0),
    12,
    19
  );
  const fallbackHtml = result?.innerHTML || "";
  dom.printReport.innerHTML = `
    <section class="report-page target-report-page target-report-page-summary">
      ${reportPageHeader("ターゲット分析(エリア)", `${clientName}${status ? ` / ${status}` : ""}`)}
      <div class="target-report-body target-report-summary-body">
        ${heroHtml || fallbackHtml}
        ${ageHtml}
      </div>
    </section>
    <section class="report-page target-report-page target-report-page-attributes ${attributeDensity}">
      ${reportPageHeader("ターゲット分析(エリア)", "属性別人口")}
      <div class="target-report-body target-report-detail-body target-report-attribute-body">
        ${attributeHtml}
      </div>
    </section>
    <section class="report-page target-report-page target-report-page-actions ${actionDensity}">
      ${reportPageHeader("ターゲット分析(エリア)", "賃金相場・改善案_候補・実績内訳")}
      <div class="target-report-body target-report-detail-body target-report-actions-body">
        ${wageHtml}
        ${tipsHtml}
        ${performanceHtml}
      </div>
    </section>
  `;
}

function prepareTargetStrategyTipsForPrint(result, liveStrategyTips = null) {
  const card = result?.querySelector(".target-tips-card");
  if (!card) return;
  card.querySelector(".target-tip-gemini-button")?.remove();
  card.querySelector(".target-tip-status")?.remove();
  const list = card.querySelector("[data-target-strategy-signature]");
  if (!list) return;
  const tips = normalizeTargetStrategyTips(
    Array.isArray(liveStrategyTips) ? liveStrategyTips : collectTargetStrategyTipsFromList(list),
    TARGET_PRINT_TIP_LIMIT
  );
  list.removeAttribute("data-target-strategy-signature");
  list.innerHTML = tips.length
    ? tips.map((tip) => `
      <div class="target-tip-item">
        <strong>${escapeHtml(tip.title)}</strong>
        <span>${escapeHtml(tip.text)}</span>
      </div>
    `).join("")
    : `<p class="target-source-note">表示する改善案がありません。</p>`;
}

function targetPrintDensityClass(count, roomyMax, denseMin) {
  if (count >= denseMin) return "is-dense";
  if (count <= roomyMax) return "is-roomy";
  return "is-balanced";
}

function targetPrintAgeSplitHtml(result) {
  const ageCard = result?.querySelector(".target-heatmap-card");
  if (!ageCard) return "";
  const femaleCard = targetPrintSingleGenderAgeCard(ageCard, "female", "女性");
  const maleCard = targetPrintSingleGenderAgeCard(ageCard, "male", "男性");
  return `
    <div class="target-age-split-grid">
      ${femaleCard}
      ${maleCard}
    </div>
  `;
}

function targetPrintSingleGenderAgeCard(sourceCard, genderClass, label) {
  const card = sourceCard.cloneNode(true);
  card.classList.add("target-age-split-card", `target-age-split-${genderClass}`);
  const headingTitle = card.querySelector(".panel-heading h2");
  if (headingTitle) headingTitle.textContent = `年齢分布（${label}）`;
  const headingMeta = card.querySelector(".panel-heading span");
  if (headingMeta) headingMeta.textContent = "5歳刻み";
  card.querySelector(".target-gender-age-legend")?.remove();
  card.querySelectorAll(".target-gender-age-bar").forEach((bar) => {
    if (!bar.querySelector(`i.${genderClass}`)) bar.remove();
  });
  return card.outerHTML;
}

function renderPrintReport() {
  const clientName = state.profile.clientName || "顧客名未設定";
  const monthlyAnalytics = getAnalytics("monthly");
  const weeklyAnalytics = getAnalytics("daily");
  const jobAnalytics = getAnalytics("job");
  const areaAnalytics = getAnalytics("salary");
  const monthlyRows = monthlyAnalytics.monthly;
  const weeklyRows = weeklyAnalytics.weekly;
  const monthlyPrintLayout = reportTimeSeriesPrintLayout(monthlyRows.length);
  const weeklyPrintLayout = reportTimeSeriesPrintLayout(weeklyRows.length);
  const monthlyTableStyle = reportTimeSeriesTableStyle(monthlyRows, "monthly", monthlyPrintLayout);
  const weeklyTableStyle = reportTimeSeriesTableStyle(weeklyRows, "weekly", weeklyPrintLayout);
  const monthlyChartOptions = {
    xKey: "name",
    width: 1180,
    height: monthlyPrintLayout.height,
    topPad: monthlyPrintLayout.topPad,
    bottomPad: monthlyPrintLayout.bottomPad,
    labelBottomOffset: monthlyPrintLayout.labelBottomOffset,
    labelAngle: 0,
    labelAnchor: "middle",
    labelFormatter: formatMonthChartLabel,
    legendBottomOffset: 22,
    lineScalePadding: 1.34,
    tightCostAxis: true,
    costScalePadding: 1.08,
    barWidthRatio: monthlyPrintLayout.barWidthRatio,
    barMinWidth: monthlyPrintLayout.barMinWidth,
    barMaxWidth: monthlyPrintLayout.barMaxWidth
  };
  const weeklyChartOptions = {
    xKey: "name",
    width: 1180,
    height: weeklyPrintLayout.height,
    topPad: weeklyPrintLayout.topPad,
    bottomPad: weeklyPrintLayout.bottomPad,
    labelBottomOffset: weeklyPrintLayout.labelBottomOffset,
    labelAngle: 0,
    labelAnchor: "middle",
    legendBottomOffset: 22,
    lineScalePadding: 1.38,
    labelFormatter: formatTenDayPdfChartLabel,
    tightCostAxis: true,
    costScalePadding: 1.08,
    barWidthRatio: weeklyPrintLayout.barWidthRatio,
    barMinWidth: weeklyPrintLayout.barMinWidth,
    barMaxWidth: weeklyPrintLayout.barMaxWidth
  };
  const jobMonthReports = reportJobMonthReports(jobAnalytics);
  const reportCityColumns = reportAreaColumns("市区町村");
  const reportCompanyCols = reportCompanyColumns();
  const areaMonthReports = reportAreaMonthReports(areaAnalytics, reportCityColumns, reportCompanyCols);

  dom.printReport.innerHTML = `
    <section class="report-page report-cover">
      <div class="report-cover-main">
        <p class="report-cover-client">${escapeHtml(clientName)} 御中</p>
        <h1 class="report-cover-title">Indeed PLUS運用レポート</h1>
      </div>
      <aside class="report-cover-side">
        <img class="report-cover-logo" src="./assets/Indeed-PLUS.webp" alt="Indeed PLUS" />
      </aside>
    </section>

    <section class="report-page report-monthly-page" style="${reportTimeSeriesPageStyle(monthlyPrintLayout)}${monthlyTableStyle}">
      ${reportPageHeader("月次")}
      ${reportDetailTable("月次詳細テーブル", monthlyRows, reportMonthlyColumns(), { className: "report-monthly-table", tableStyle: monthlyTableStyle, countTotal: monthlyAnalytics.monthly.length })}
      <div class="report-chart-grid" style="margin-top:${monthlyPrintLayout.gap}px">
        ${reportChart("月次推移グラフ", createTrendSvg(monthlyRows, monthlyChartOptions))}
        ${reportChart("月次推移グラフ（クリック単価／応募開始率／応募率）", createRateTrendSvg(monthlyRows, monthlyChartOptions))}
      </div>
    </section>

    <section class="report-page report-weekly-page" style="${reportTimeSeriesPageStyle(weeklyPrintLayout)}${weeklyTableStyle}">
      ${reportPageHeader("週次")}
      ${reportWeeklyDetailTable("週次詳細テーブル", weeklyRows, { className: "report-weekly-table", tableStyle: weeklyTableStyle, countTotal: weeklyAnalytics.weekly.length })}
      <div class="report-chart-grid" style="margin-top:${weeklyPrintLayout.gap}px">
        ${reportChart("10日単位 推移グラフ", createTrendSvg(weeklyRows, weeklyChartOptions))}
        ${reportChart("10日単位 推移グラフ（クリック単価／クリック率／応募開始率／応募率）", createRateTrendSvg(weeklyRows, { ...weeklyChartOptions, includeCtr: true, applyRateColor: "#84cc16" }))}
      </div>
    </section>

    ${jobMonthReports.length ? jobMonthReports.map(reportJobMonthPage).join("") : reportEmptyJobPage()}

    ${areaMonthReports.length ? areaMonthReports.map(reportAreaMonthPage).join("") : reportEmptyAreaPage()}
  `;
}

function reportPageHeader(title, subtitle) {
  const subtitleHtml = subtitle ? `<span>${escapeHtml(subtitle)}</span>` : "";
  return `
    <div class="report-section-head">
      <h2 class="report-section-title">${escapeHtml(title)}</h2>
      ${subtitleHtml}
    </div>
  `;
}

function reportChart(title, svg) {
  return `
    <article class="report-chart-card">
      <h3>${escapeHtml(title)}</h3>
      <div class="print-chart">${svg}</div>
    </article>
  `;
}

function reportTimeSeriesPageStyle(layout) {
  return [
    `--report-table-font:${layout.tableFont}px`,
    `--report-table-header-font:${layout.tableHeaderFont}px`,
    `--report-table-cell-pad-y:${layout.tableCellPadY}px`,
    `--report-table-cell-pad-x:${layout.tableCellPadX}px`,
    `--report-table-line-height:${layout.tableLineHeight}`,
    `--report-chart-grid-gap:${layout.chartGridGap}px`,
    `--report-chart-card-padding:${layout.chartCardPadding}px`,
    `--report-chart-title-font:${layout.chartTitleFont}px`,
    `--report-chart-axis-font:${layout.chartAxisFont}px`,
    `--report-chart-label-font:${layout.chartLabelFont}px`,
    `--report-chart-legend-font:${layout.chartLegendFont}px`
  ].join(";") + ";";
}

function reportTimeSeriesTableStyle(rows, type, layout) {
  const maxMoneyLength = Math.max(0, ...rows.flatMap((row) => [
    visualTextLength(formatCurrency(row.cost)),
    visualTextLength(row.cpa ? formatCurrency(row.cpa) : "-"),
    visualTextLength(formatCurrency(row.cpaStart)),
    visualTextLength(formatCurrency(row.cpc))
  ]));
  const maxCountLength = Math.max(0, ...rows.flatMap((row) => [
    visualTextLength(formatNumber(row.impressions)),
    visualTextLength(formatNumber(row.clicks)),
    visualTextLength(formatNumber(row.applications))
  ]));
  const moneyBoost = Math.max(0, maxMoneyLength - 7.5) * 0.28;
  const countBoost = Math.max(0, maxCountLength - 5.5) * 0.18;

  const widths = type === "weekly"
    ? {
        weekDate: 5.65,
        count: 6.55 + countBoost,
        click: 6.25 + countBoost * 0.65,
        rate: 7.25,
        money: 7.8 + moneyBoost * 0.45,
        longMoney: 8.85 + moneyBoost,
        app: 5.55,
        total: 7.75 + moneyBoost * 0.85
      }
    : {
        period: 6.85,
        count: 6.85 + countBoost,
        display: 6.75,
        click: 6.55 + countBoost * 0.65,
        rate: 7.2,
        money: 7.8 + moneyBoost * 0.45,
        longMoney: 8.85 + moneyBoost,
        app: 5.65,
        total: 7.75 + moneyBoost * 0.85
      };

  const multipliers = type === "weekly" ? { weekDate: 2, rate: 4, money: 2 } : { rate: 4, money: 2 };
  normalizeReportWidths(
    widths,
    type === "weekly"
      ? { longMoney: 4.4, money: 3.2, total: 2.8, rate: 1.7, weekDate: 0.8, count: 0.6, click: 0.6 }
      : { longMoney: 4.4, money: 3.2, total: 2.8, rate: 1.7, period: 0.6, count: 0.6, click: 0.6, display: 0.45 },
    type === "weekly"
      ? { rate: 2.8, weekDate: 1.8, count: 1.4, click: 1.4, app: 1.2, money: 0.8 }
      : { rate: 2.8, period: 1.6, display: 1.4, count: 1.3, click: 1.3, app: 1.2, money: 0.8 },
    multipliers
  );

  const compactHeader = rows.length <= 4 || maxMoneyLength >= 9;
  const headerFont = compactHeader ? Math.min(layout.tableHeaderFont, 10.35) : layout.tableHeaderFont;
  const cellPadX = compactHeader ? Math.min(layout.tableCellPadX, 2.8) : layout.tableCellPadX;

  return [
    type === "weekly" ? `--ts-week-date-width:${roundCssNumber(widths.weekDate)}%` : `--ts-period-width:${roundCssNumber(widths.period)}%`,
    type === "monthly" ? `--ts-display-width:${roundCssNumber(widths.display)}%` : "",
    `--ts-count-width:${roundCssNumber(widths.count)}%`,
    `--ts-click-width:${roundCssNumber(widths.click)}%`,
    `--ts-rate-width:${roundCssNumber(widths.rate)}%`,
    `--ts-money-width:${roundCssNumber(widths.money)}%`,
    `--ts-long-money-width:${roundCssNumber(widths.longMoney)}%`,
    `--ts-app-width:${roundCssNumber(widths.app)}%`,
    `--ts-total-width:${roundCssNumber(widths.total)}%`,
    `--report-table-header-font:${roundCssNumber(headerFont)}px`,
    `--report-table-cell-pad-x:${roundCssNumber(cellPadX)}px`,
    `--report-table-header-letter-spacing:${compactHeader ? "-0.54px" : "-0.3px"}`
  ].filter(Boolean).join(";") + ";";
}

function normalizeReportWidths(widths, growWeights, shrinkWeights, multipliers = {}) {
  const totalWidth = () => Object.entries(widths).reduce((sum, [key, width]) => sum + width * (multipliers[key] || 1), 0);
  let delta = 100 - totalWidth();
  if (Math.abs(delta) < 0.01) return widths;

  const weights = delta > 0 ? growWeights : shrinkWeights;
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0) || 1;
  Object.entries(weights).forEach(([key, weight]) => {
    if (!(key in widths)) return;
    const multiplier = multipliers[key] || 1;
    widths[key] += (delta * weight / totalWeight) / multiplier;
  });

  delta = 100 - totalWidth();
  if (Math.abs(delta) >= 0.01) {
    const key = Object.keys(widths).includes("longMoney") ? "longMoney" : Object.keys(widths)[0];
    widths[key] += delta / (multipliers[key] || 1);
  }
  return widths;
}

function roundCssNumber(value) {
  return Number(value).toFixed(3).replace(/0+$/, "").replace(/[.]$/, "");
}

function reportTimeSeriesPrintLayout(rowCount) {
  const count = Math.max(0, rowCount);

  if (count <= 8) {
    return {
      gap: 22,
      height: 860,
      topPad: 46,
      bottomPad: 98,
      labelBottomOffset: 58,
      barWidthRatio: 0.68,
      barMinWidth: 42,
      barMaxWidth: 88,
      tableFont: 10.8,
      tableHeaderFont: 12.2,
      tableCellPadY: 6,
      tableCellPadX: 5,
      tableLineHeight: 1.24,
      chartGridGap: 5,
      chartCardPadding: 4,
      chartTitleFont: 10.5,
      chartAxisFont: 21,
      chartLabelFont: 21,
      chartLegendFont: 22
    };
  }

  if (count <= 10) {
    return {
      gap: 18,
      height: 820,
      topPad: 44,
      bottomPad: 96,
      labelBottomOffset: 56,
      barWidthRatio: 0.6,
      barMinWidth: 34,
      barMaxWidth: 82,
      tableFont: 10.2,
      tableHeaderFont: 11.8,
      tableCellPadY: 5,
      tableCellPadX: 4.5,
      tableLineHeight: 1.22,
      chartGridGap: 5,
      chartCardPadding: 4,
      chartTitleFont: 10.3,
      chartAxisFont: 20,
      chartLabelFont: 20,
      chartLegendFont: 21
    };
  }

  if (count <= 12) {
    return {
      gap: 14,
      height: 720,
      topPad: 40,
      bottomPad: 86,
      labelBottomOffset: 50,
      barWidthRatio: 0.54,
      barMinWidth: 28,
      barMaxWidth: 74,
      tableFont: 9.2,
      tableHeaderFont: 10.8,
      tableCellPadY: 3.8,
      tableCellPadX: 3.5,
      tableLineHeight: 1.18,
      chartGridGap: 5,
      chartCardPadding: 3.5,
      chartTitleFont: 9.8,
      chartAxisFont: 18,
      chartLabelFont: 18,
      chartLegendFont: 19
    };
  }

  if (count <= 16) {
    return {
      gap: 16,
      height: 660,
      topPad: 40,
      bottomPad: 86,
      labelBottomOffset: 50,
      barWidthRatio: 0.54,
      barMinWidth: 24,
      barMaxWidth: 70,
      tableFont: 8.8,
      tableHeaderFont: 10.4,
      tableCellPadY: 4,
      tableCellPadX: 3.5,
      tableLineHeight: 1.18,
      chartGridGap: 5,
      chartCardPadding: 3.5,
      chartTitleFont: 9.8,
      chartAxisFont: 18,
      chartLabelFont: 18,
      chartLegendFont: 19
    };
  }

  if (count <= 24) {
    return {
      gap: 12,
      height: 560,
      topPad: 34,
      bottomPad: 76,
      labelBottomOffset: 44,
      barWidthRatio: 0.48,
      barMinWidth: 18,
      barMaxWidth: 58,
      tableFont: 7.2,
      tableHeaderFont: 8.6,
      tableCellPadY: 2.8,
      tableCellPadX: 2.8,
      tableLineHeight: 1.14,
      chartGridGap: 4,
      chartCardPadding: 3,
      chartTitleFont: 9,
      chartAxisFont: 16,
      chartLabelFont: 16,
      chartLegendFont: 17
    };
  }

  const overflowRows = count - 24;
  const tableFont = Math.max(4.8, 6.2 - overflowRows * 0.08);
  const tableHeaderFont = Math.max(5.8, 7.4 - overflowRows * 0.08);
  const chartHeight = Math.max(300, 440 - overflowRows * 7);
  const chartText = Math.max(11, 14 - overflowRows * 0.16);

  return {
    gap: 8,
    height: chartHeight,
    topPad: 28,
    bottomPad: Math.max(56, 68 - overflowRows * 0.7),
    labelBottomOffset: Math.max(34, 40 - overflowRows * 0.35),
    barWidthRatio: 0.42,
    barMinWidth: 12,
    barMaxWidth: 48,
    tableFont,
    tableHeaderFont,
    tableCellPadY: Math.max(1.1, 2 - overflowRows * 0.04),
    tableCellPadX: Math.max(1.4, 2.2 - overflowRows * 0.03),
    tableLineHeight: 1.08,
    chartGridGap: 4,
    chartCardPadding: 2.5,
    chartTitleFont: Math.max(7, 8.2 - overflowRows * 0.06),
    chartAxisFont: chartText,
    chartLabelFont: chartText,
    chartLegendFont: Math.max(12, 15 - overflowRows * 0.14)
  };
}

function reportMonthlyColumns() {
  return [
    { label: "掲載年月", value: (row) => formatMonthForTable(row.name), className: "period-cell ts-period-col" },
    { label: "表示回数", value: (row) => formatNumber(row.impressions), numeric: true, className: "ts-count-col" },
    { label: "表示単価", value: (row) => formatCurrencyDecimal(row.displayUnit), numeric: true, className: "ts-display-col" },
    { label: "クリック数", value: (row) => formatNumber(row.clicks), numeric: true, className: "ts-click-col" },
    { label: "クリック率", value: (row) => formatPercent(row.ctr), numeric: true, className: "ts-rate-col" },
    { label: "クリック単価", value: (row) => formatCurrency(row.cpc), numeric: true, className: "highlight-cell ts-money-col" },
    { label: "応募開始率", value: (row) => formatPercent(row.startRate), numeric: true, className: "ts-rate-col" },
    { label: "応募開始単価", value: (row) => formatCurrency(row.cpaStart), numeric: true, className: "ts-long-money-col" },
    { label: "応募完了率", value: (row) => formatPercent(row.completionRate), numeric: true, className: "ts-rate-col" },
    { label: "応募数", value: (row) => formatNumber(row.applications), numeric: true, className: "ts-app-col" },
    { label: "応募率", value: (row) => formatPercent(row.applyRate), numeric: true, className: "ts-rate-col" },
    { label: "応募単価", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), numeric: true, className: "highlight-cell ts-money-col" },
    { label: "合計費用", value: (row) => formatCurrency(row.cost), numeric: true, className: "highlight-cell ts-total-col" }
  ];
}

function reportWeeklyColumns() {
  return [
    { label: "週", value: (row) => `${formatShortDateForTable(row.startDate)}〜${formatShortDateForTable(row.endDate)}`, className: "period-cell ts-week-period-col" },
    { label: "表示回数", value: (row) => formatNumber(row.impressions), numeric: true, className: "ts-count-col" },
    { label: "クリック数", value: (row) => formatNumber(row.clicks), numeric: true, className: "ts-click-col" },
    { label: "クリック率", value: (row) => formatPercent(row.ctr), numeric: true, className: "ts-rate-col" },
    { label: "クリック単価", value: (row) => formatCurrency(row.cpc), numeric: true, className: "highlight-cell ts-money-col" },
    { label: "応募開始率", value: (row) => formatPercent(row.startRate), numeric: true, className: "ts-rate-col" },
    { label: "応募開始単価", value: (row) => formatCurrency(row.cpaStart), numeric: true, className: "ts-long-money-col" },
    { label: "応募完了率", value: (row) => formatPercent(row.completionRate), numeric: true, className: "ts-rate-col" },
    { label: "応募数", value: (row) => formatNumber(row.applications), numeric: true, className: "ts-app-col" },
    { label: "応募率", value: (row) => formatPercent(row.applyRate), numeric: true, className: "ts-rate-col" },
    { label: "応募単価", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), numeric: true, className: "highlight-cell ts-money-col" },
    { label: "合計費用", value: (row) => formatCurrency(row.cost), numeric: true, className: "highlight-cell ts-total-col" }
  ];
}

function reportWeeklyMetricColumns() {
  return reportWeeklyColumns().slice(1);
}

function reportCampaignColumns() {
  return [
    { label: "掲載年月", value: (row) => formatMonthForTable(row.month), className: "period-cell" },
    { label: "CP", value: (row) => row.campaign, className: "text-cell wide-text-cell" },
    { label: "表示回数", value: (row) => formatNumber(row.impressions), numeric: true },
    { label: "クリック数", value: (row) => formatNumber(row.clicks), numeric: true },
    { label: "クリック率", value: (row) => formatPercent(row.ctr), numeric: true },
    { label: "クリック単価", value: (row) => formatCurrency(row.cpc), numeric: true, className: "highlight-cell" },
    { label: "応募開始率", value: (row) => formatPercent(row.startRate), numeric: true },
    { label: "応募開始単価", value: (row) => formatCurrency(row.cpaStart), numeric: true },
    { label: "応募完了率", value: (row) => formatPercent(row.completionRate), numeric: true },
    { label: "応募数", value: (row) => formatNumber(row.applications), numeric: true },
    { label: "応募率", value: (row) => formatPercent(row.applyRate), numeric: true },
    { label: "応募単価", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), numeric: true, className: "highlight-cell" },
    { label: "合計費用", value: (row) => formatCurrency(row.cost), numeric: true, className: "highlight-cell" }
  ];
}

function reportJobColumns() {
  return [
    { label: "求人", value: (row) => row.name, className: "text-cell wide-text-cell report-job-name-col" },
    { label: "職種", value: (row) => row.jobType, className: "text-cell report-job-type-col" },
    { label: "表示回数", value: (row) => formatNumber(row.impressions), numeric: true, className: "report-job-count-col" },
    { label: "クリック数", value: (row) => formatNumber(row.clicks), numeric: true, className: "report-job-click-col" },
    { label: "クリック率", value: (row) => formatPercent(row.ctr), numeric: true, className: "report-job-rate-col" },
    { label: "クリック単価", value: (row) => formatCurrency(row.cpc), numeric: true, className: "highlight-cell report-job-money-col" },
    { label: "応募開始率", value: (row) => formatPercent(row.startRate), numeric: true, className: "report-job-rate-col" },
    { label: "応募開始単価", value: (row) => formatCurrency(row.cpaStart), numeric: true, className: "report-job-long-money-col" },
    { label: "応募完了率", value: (row) => formatPercent(row.completionRate), numeric: true, className: "report-job-rate-col" },
    { label: "応募数", value: (row) => formatNumber(row.applications), numeric: true, className: "report-job-app-col" },
    { label: "応募率", value: (row) => formatPercent(row.applyRate), numeric: true, className: "report-job-rate-col" },
    { label: "応募単価", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), numeric: true, className: "highlight-cell report-job-money-col" },
    { label: "合計費用", value: (row) => formatCurrency(row.cost), numeric: true, className: "highlight-cell report-job-total-col" }
  ];
}

function reportAreaColumns(nameLabel) {
  return areaDetailColumns(nameLabel);
}

function reportCompanyColumns() {
  return reportAreaColumns("拠点");
}

function reportAreaMonthReports(analytics, cityColumns, companyColumns) {
  const rows = analytics.filtered.job.filter((row) => row.date);
  const months = unique(rows.map((row) => row.date.slice(0, 7))).slice(-2);
  return [...months].reverse().map((month) => {
    const monthRows = rows.filter((row) => row.date.startsWith(month));
    const cities = sortTableRows(
      aggregateBy(monthRows, (row) => row.city || row.prefecture),
      cityColumns,
      state.sorts.city
    );
    const companies = sortTableRows(
      aggregateBy(monthRows, (row) => formatCompanyLocationName(row.company)),
      companyColumns,
      state.sorts.company
    );
    return {
      month,
      title: formatMonthSelectLabel(month),
      cities,
      companies,
      cityColumns,
      companyColumns
    };
  });
}

function reportAreaMonthPage(report) {
  return reportAreaPages(
    report.cities,
    report.companies,
    report.cityColumns,
    report.companyColumns,
    `エリア別（${report.title}）`
  );
}

function reportEmptyAreaPage() {
  return `
    <section class="report-page report-area-page">
      ${reportPageHeader("エリア別")}
      <p class="report-empty">表示できるエリアデータがありません。</p>
    </section>
  `;
}

function reportAreaPages(cities, companies, cityColumns, companyColumns, pageTitle = "エリア別（市区町村・拠点）") {
  const combinedRowsLimit = 16;
  const singleTableRowsPerPage = 24;
  const totalRows = cities.length + companies.length;

  if (totalRows <= combinedRowsLimit) {
    return `
      <section class="report-page report-area-page">
        ${reportPageHeader(pageTitle)}
        <div class="report-area-stack">
          ${reportDetailTable("市区町村別", cities, cityColumns, { className: "report-area-table", hideCount: true })}
          ${reportDetailTable("拠点別", companies, companyColumns, { className: "report-company-table", hideCount: true })}
        </div>
      </section>
    `;
  }

  return [
    ...reportAreaTablePages(`${pageTitle}：市区町村`, "市区町村別", cities, cityColumns, "report-area-table", singleTableRowsPerPage),
    ...reportAreaTablePages(`${pageTitle}：拠点`, "拠点別", companies, companyColumns, "report-company-table", singleTableRowsPerPage)
  ].join("");
}

function reportAreaTablePages(pageTitle, tableTitle, rows, columns, className, rowsPerPage) {
  if (!rows.length) {
    return [`
      <section class="report-page report-area-page">
        ${reportPageHeader(pageTitle)}
        ${reportDetailTable(tableTitle, rows, columns, { className, hideCount: true })}
      </section>
    `];
  }

  const chunks = chunkRows(rows, rowsPerPage);
  return chunks.map((chunk, index) => {
    const suffix = chunks.length > 1 ? ` ${index + 1}/${chunks.length}` : "";
    return `
      <section class="report-page report-area-page">
        ${reportPageHeader(`${pageTitle}${suffix}`)}
        ${reportDetailTable(tableTitle, chunk, columns, { className, hideCount: true })}
      </section>
    `;
  });
}

function chunkRows(rows, size) {
  const chunks = [];
  for (let index = 0; index < rows.length; index += size) {
    chunks.push(rows.slice(index, index + size));
  }
  return chunks;
}

function reportBestJobs(jobs) {
  const bestJobs = jobs
    .filter((job) => job.applications > 0)
    .sort((a, b) => a.cpa - b.cpa || b.applications - a.applications || b.cost - a.cost)
    .slice(0, 3);
  if (!bestJobs.length) return `<div class="report-empty">応募がある求人がありません。</div>`;
  return `
    <div class="report-best-job-grid">
      ${bestJobs.map((job, index) => {
        const url = cleanText(job.jobUrl);
        return `
          <article class="report-best-job-card">
            <div class="report-best-job-head">
              <strong>TOP ${index + 1}</strong>
              <span>${escapeHtml(job.bestPerformanceMonth || job.deliveryMonths || "配信月未取得")}</span>
            </div>
            <div class="report-best-job-name">${escapeHtml(job.name)}</div>
            <div class="report-best-job-metrics">
              <div><span>応募単価</span><strong>${job.cpa ? formatCurrency(job.cpa) : "-"}</strong></div>
              <div><span>応募数</span><strong>${formatNumber(job.applications)}件</strong></div>
              <div><span>費用</span><strong>${formatCurrency(job.cost)}</strong></div>
            </div>
            <div class="report-best-job-url">${escapeHtml(url || "URLなし")}</div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function reportJobMonthReports(analytics) {
  const rows = analytics.filtered.job.filter((row) => row.date);
  const months = unique(rows.map((row) => row.date.slice(0, 7))).slice(-2);
  return [...months].reverse().map((month) => {
    const monthRows = rows.filter((row) => row.date.startsWith(month));
    const jobs = sortTableRows(
      aggregateBy(monthRows, (row) => row.jobTitle, enrichJobGroup),
      jobDetailColumns(),
      state.sorts.job
    );
    return {
      month,
      title: formatMonthSelectLabel(month),
      jobs,
      jobTypes: aggregateBy(monthRows, (row) => row.jobType).sort((a, b) => b.cost - a.cost),
      employments: aggregateBy(monthRows, (row) => row.employment).sort((a, b) => b.cost - a.cost),
      salaryBuckets: aggregateBy(monthRows, salaryBucketLabel).filter((item) => item.name !== "未分類").sort(sortBySalaryBucket)
    };
  });
}

function reportJobMonthPage(report) {
  const visibleJobs = report.jobs.slice(0, 8);
  const layout = reportJobTableLayout(visibleJobs);
  return `
    <section class="report-page report-job-month-page">
      ${reportPageHeader(`求人別（${report.title}）`)}
      ${reportDetailTable("求人別詳細テーブル", report.jobs, reportJobColumns(), {
        className: "report-job-table report-job-month-table",
        tableStyle: reportJobTableStyle(layout),
        limit: 8,
        countTotal: report.jobs.length,
        hideTitle: true
      })}
      <div class="report-breakdown-grid report-job-month-breakdowns">
        ${reportBreakdownBarCard("職種別", report.jobTypes, { limit: 5 })}
        ${reportBreakdownBarCard("雇用形態別", report.employments, { limit: 5 })}
        ${reportBreakdownBarCard("給与帯別", report.salaryBuckets, { limit: 5 })}
      </div>
    </section>
  `;
}

function reportJobTableLayout(rows) {
  const maxJobLength = Math.max(0, ...rows.map((row) => visualTextLength(row.name)));
  const maxTypeLength = Math.max(0, ...rows.map((row) => visualTextLength(row.jobType)));
  const layout = {
    countWidth: 5.1,
    clickWidth: 5.05,
    rateWidth: 5.38,
    moneyWidth: 6.25,
    longMoneyWidth: 7.1,
    appWidth: 4.05,
    totalWidth: 6.55,
    tableFont: 8.8,
    textFont: 9.05,
    headerFont: 10.2,
    letterSpacing: -0.35,
    cellPadX: 2.5
  };
  const fixedNumericWidth = layout.countWidth
    + layout.clickWidth
    + layout.rateWidth * 4
    + layout.moneyWidth * 2
    + layout.longMoneyWidth
    + layout.appWidth
    + layout.totalWidth;
  const maxTextWidth = 100 - fixedNumericWidth;
  let nameWidth = clamp(18.5 + maxJobLength * 0.34, 19.5, 31.5);
  let typeWidth = clamp(6.9 + maxTypeLength * 0.36, 7.4, 12.3);

  if (nameWidth + typeWidth > maxTextWidth) {
    const shrink = maxTextWidth / (nameWidth + typeWidth);
    nameWidth *= shrink;
    typeWidth *= shrink;
  }

  const spareWidth = Math.max(0, maxTextWidth - nameWidth - typeWidth);
  layout.totalWidth += spareWidth * 0.24;
  layout.longMoneyWidth += spareWidth * 0.17;
  layout.moneyWidth += spareWidth * 0.095;
  layout.rateWidth += spareWidth * 0.0325;
  layout.countWidth += spareWidth * 0.04;
  layout.clickWidth += spareWidth * 0.04;
  layout.appWidth += spareWidth * 0.03;
  nameWidth += spareWidth * 0.08;
  typeWidth += spareWidth * 0.08;

  if (maxJobLength >= 34 || maxTypeLength >= 14) {
    layout.tableFont = 8.05;
    layout.textFont = 8.45;
    layout.headerFont = 9.05;
    layout.letterSpacing = -0.52;
    layout.cellPadX = 1.9;
  } else if (maxJobLength >= 24 || maxTypeLength >= 10) {
    layout.tableFont = 8.45;
    layout.textFont = 8.85;
    layout.headerFont = 9.55;
    layout.letterSpacing = -0.44;
    layout.cellPadX = 2.15;
  }

  return {
    ...layout,
    nameWidth,
    typeWidth
  };
}

function reportJobTableStyle(layout) {
  return [
    `--report-job-name-width:${layout.nameWidth}%`,
    `--report-job-type-width:${layout.typeWidth}%`,
    `--report-job-count-width:${layout.countWidth}%`,
    `--report-job-click-width:${layout.clickWidth}%`,
    `--report-job-rate-width:${layout.rateWidth}%`,
    `--report-job-money-width:${layout.moneyWidth}%`,
    `--report-job-long-money-width:${layout.longMoneyWidth}%`,
    `--report-job-app-width:${layout.appWidth}%`,
    `--report-job-total-width:${layout.totalWidth}%`,
    `--report-job-table-font:${layout.tableFont}px`,
    `--report-job-text-font:${layout.textFont}px`,
    `--report-job-header-font:${layout.headerFont}px`,
    `--report-job-header-letter-spacing:${layout.letterSpacing}px`,
    `--report-job-cell-pad-x:${layout.cellPadX}px`
  ].join(";");
}

function reportEmptyJobPage() {
  return `
    <section class="report-page report-job-month-page">
      ${reportPageHeader("求人")}
      <p class="report-empty">表示できる求人データがありません。</p>
    </section>
  `;
}

function reportBreakdownTable(title, rows, options = {}) {
  return reportDetailTable(title, rows, [
    { label: title.replace("別", ""), value: (row) => row.name, className: "text-cell" },
    { label: "費用", value: (row) => formatCurrency(row.cost), numeric: true },
    { label: "応募", value: (row) => formatNumber(row.applications), numeric: true },
    { label: "応募単価", value: (row) => (row.cpa ? formatCurrency(row.cpa) : "-"), numeric: true }
  ], { className: `report-breakdown-table ${options.className || ""}`.trim(), limit: options.limit ?? 8 });
}

function reportBreakdownBarCard(title, rows, options = {}) {
  const limit = options.limit ?? 5;
  const visibleRows = [...rows].sort((a, b) => b.cost - a.cost).slice(0, limit);
  if (!visibleRows.length) {
    return `
      <article class="report-breakdown-card">
        <h3>${escapeHtml(title)}</h3>
        <p class="report-empty compact">表示できるデータがありません。</p>
      </article>
    `;
  }
  const max = Math.max(...visibleRows.map((row) => row.cost), 1);
  const body = visibleRows
    .map((row) => {
      const width = Math.max(4, (row.cost / max) * 100);
      return `
        <div class="report-breakdown-bar-row">
          <div class="report-breakdown-label" title="${escapeHtml(row.name)}">${escapeHtml(row.name)}</div>
          <div class="report-breakdown-track"><div class="report-breakdown-fill" style="width:${width}%"></div></div>
          <div class="report-breakdown-metrics">
            <strong>${formatCurrency(row.cost)}</strong>
            <strong>${formatNumber(row.applications)}件</strong>
            <strong>${row.cpa ? formatCurrency(row.cpa) : "-"}</strong>
          </div>
        </div>
      `;
    })
    .join("");
  return `
    <article class="report-breakdown-card">
      <h3>${escapeHtml(title)}</h3>
      <div class="report-breakdown-bar-list">
        <div class="report-breakdown-bar-row report-breakdown-bar-head" aria-hidden="true">
          <div></div>
          <div></div>
          <div class="report-breakdown-metrics">
            <span>費用</span>
            <span>応募</span>
            <span>応募単価</span>
          </div>
        </div>
        ${body}
      </div>
    </article>
  `;
}

function reportDetailTable(title, rows, columns, options = {}) {
  if (!rows.length) return `<section class="report-table-section"><h3>${escapeHtml(title)}</h3><p class="report-empty">表示できるデータがありません。</p></section>`;
  const limit = options.limit ?? rows.length;
  const visibleRows = rows.slice(0, limit);
  const totalCount = options.countTotal ?? rows.length;
  const extraCount = Math.max(0, totalCount - visibleRows.length);
  const head = columns
    .map((column) => {
      const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
      return `<th class="${className}">${escapeHtml(column.label)}</th>`;
    })
    .join("");
  const body = visibleRows
    .map((row, index) => {
      const cells = columns
        .map((column) => {
          const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
          const value = column.value(row, index, rows);
          return `<td class="${className}">${escapeHtml(value ?? "-")}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");
  const countLabel = options.hideCount
    ? ""
    : extraCount
      ? `<span>${formatNumber(visibleRows.length)} / ${formatNumber(totalCount)}件表示</span>`
      : `<span>${formatNumber(totalCount)}件</span>`;
  const titleRow = options.hideTitle
    ? ""
    : `
      <div class="report-table-title">
        <h3>${escapeHtml(title)}</h3>
        ${countLabel}
      </div>
    `;
  return `
    <section class="report-table-section">
      ${titleRow}
      <table class="report-table ${escapeHtml(options.className || "")}"${options.tableStyle ? ` style="${escapeHtml(options.tableStyle)}"` : ""}>
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </section>
  `;
}

function reportWeeklyDetailTable(title, rows, options = {}) {
  if (!rows.length) return `<section class="report-table-section"><h3>${escapeHtml(title)}</h3><p class="report-empty">表示できるデータがありません。</p></section>`;
  const limit = options.limit ?? rows.length;
  const visibleRows = rows.slice(0, limit);
  const totalCount = options.countTotal ?? rows.length;
  const extraCount = Math.max(0, totalCount - visibleRows.length);
  const metricColumns = reportWeeklyMetricColumns();
  const head = `
    <th class="period-cell ts-week-period-col" colspan="2">週</th>
    ${metricColumns
      .map((column) => {
        const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
        return `<th class="${className}">${escapeHtml(column.label)}</th>`;
      })
      .join("")}
  `;
  const body = visibleRows
    .map((row, index) => {
      const dateCells = `
        <td class="period-cell ts-week-date-col">${escapeHtml(formatShortDateForTable(row.startDate))}</td>
        <td class="period-cell ts-week-date-col">${escapeHtml(formatShortDateForTable(row.endDate))}</td>
      `;
      const metricCells = metricColumns
        .map((column) => {
          const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
          const value = column.value(row, index, rows);
          return `<td class="${className}">${escapeHtml(value ?? "-")}</td>`;
        })
        .join("");
      return `<tr>${dateCells}${metricCells}</tr>`;
    })
    .join("");
  const countLabel = extraCount ? `<span>${formatNumber(visibleRows.length)} / ${formatNumber(totalCount)}件表示</span>` : `<span>${formatNumber(totalCount)}件</span>`;
  return `
    <section class="report-table-section">
      <div class="report-table-title">
        <h3>${escapeHtml(title)}</h3>
        ${countLabel}
      </div>
      <table class="report-table ${escapeHtml(options.className || "")}"${options.tableStyle ? ` style="${escapeHtml(options.tableStyle)}"` : ""}>
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </section>
  `;
}

function compareLabel(current, previous, label, lowerIsBetter = false) {
  if (!previous) return `${label}なし`;
  const value = delta(current, previous);
  const sign = value >= 0 ? "+" : "";
  return `${label} ${sign}${formatPercent(value)}`;
}

function delta(current, previous) {
  if (!previous) return 0;
  return (current - previous) / Math.abs(previous);
}

function deltaCell(current, previous, lowerIsBetter = false) {
  if (!previous) return "-";
  const value = delta(current, previous);
  const sign = value >= 0 ? "+" : "";
  return `${sign}${formatPercent(value)}`;
}

function salaryText(item) {
  if (!item.salaryAmount) return item.salaryType || "-";
  return `${item.salaryType}\n${formatCurrency(item.salaryAmount)}`;
}

function formatDeliveryMonths(rows) {
  const months = unique(rows.map((row) => row.date?.slice(0, 7)).filter(Boolean));
  if (!months.length) return "";
  if (months.length === 1) return `${formatMonthSelectLabel(months[0])}配信`;
  return `${formatMonthSelectLabel(months[0])}〜${formatMonthSelectLabel(months.at(-1))}配信`;
}

function formatBestPerformanceMonth(rows) {
  const monthly = aggregateBy(rows.filter((row) => row.date), (row) => row.date.slice(0, 7))
    .filter((item) => item.applications > 0)
    .sort((a, b) => a.cpa - b.cpa || b.applications - a.applications || b.cost - a.cost)[0];
  return monthly ? formatMonthSelectLabel(monthly.name) : "";
}

function tenDayKey(dateText) {
  const date = parseDate(dateText);
  const day = date.getDate();
  const startDay = day <= 10 ? 1 : day <= 20 ? 11 : 21;
  const start = new Date(date);
  start.setDate(startDay);
  const end = new Date(start);
  if (startDay === 21) {
    end.setMonth(start.getMonth() + 1, 0);
  } else {
    end.setDate(startDay + 9);
  }
  return `${toIsoDate(start)} - ${toIsoDate(end)}`;
}

function formatMonthForTable(value) {
  const [year, month] = String(value).split("-");
  if (!year || !month) return value || "-";
  return `${year.slice(-2)}年${month}月`;
}

function formatShortDateForTable(value) {
  const [year, month, day] = String(value).split("-");
  if (!year || !month || !day) return value || "-";
  return `${year.slice(-2)}-${month}-${day}`;
}

function formatMonthChartLabel(value) {
  const [year, month] = String(value).split("-");
  if (!year || !month) return value || "-";
  return `${year.slice(-2)}年${Number(month)}月`;
}

function formatTenDayChartLabel(value) {
  const [startDate] = String(value).split(" - ");
  const [year, month, day] = startDate.split("-");
  if (!year || !month || !day) return value || "-";
  const dayNumber = Number(day);
  const period = dayNumber <= 10 ? "上旬" : dayNumber <= 20 ? "中旬" : "下旬";
  const monthLabel = `${Number(month)}月${period}`;
  return dayNumber <= 10 ? `${year.slice(-2)}年${monthLabel}` : monthLabel;
}

function formatTenDayPdfChartLabel(value) {
  const [startDate] = String(value).split(" - ");
  const [year, month, day] = startDate.split("-");
  if (!year || !month || !day) return value || "-";
  const dayNumber = Number(day);
  const period = dayNumber <= 10 ? "上旬" : dayNumber <= 20 ? "中旬" : "下旬";
  return `${Number(month)}月${period}`;
}

function periodLabel(rows) {
  const dates = rows.map((row) => row.date).filter(Boolean).sort();
  if (!dates.length) return "-";
  return `${dates[0]} - ${dates.at(-1)}`;
}

function activeFilterLabels(options = { includeDate: true }) {
  const labels = [];
  const period = periodForTab(state.activeTab);
  if (options.includeDate !== false && (period.startDate || period.endDate)) {
    labels.push(`${formatMonthFromDate(period.startDate) || "開始なし"} - ${formatMonthFromDate(period.endDate) || "終了なし"}`);
  }
  [
    ["職種", "jobType"],
    ["雇用形態", "employment"],
    ["エリア", "area"]
  ].forEach(([label, key]) => {
    if (state.filters[key] !== "all") labels.push(`${label}: ${state.filters[key]}`);
  });
  return labels;
}

function allRows() {
  return [...state.raw.daily, ...state.raw.campaign, ...state.raw.job];
}

function visualTextLength(value) {
  return [...String(value ?? "")].reduce((sum, char) => {
    if (/[A-Za-z0-9]/.test(char)) return sum + 0.56;
    if (/[\s/()（）・.,:;:：_-]/.test(char)) return sum + 0.36;
    return sum + 1;
  }, 0);
}

function mostCommonText(values) {
  const counts = new Map();
  values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}

function percentile(values, p) {
  if (!values.length) return 0;
  const index = (values.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return values[lower];
  return values[lower] + (values[upper] - values[lower]) * (index - lower);
}

function average(values) {
  const numbers = values.filter((value) => Number.isFinite(value));
  return numbers.length ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length : 0;
}

function weightedAverage(items) {
  const valid = items.filter((item) => Number.isFinite(item.value) && item.value >= 0 && item.weight > 0);
  const weight = valid.reduce((sum, item) => sum + item.weight, 0);
  return weight ? valid.reduce((sum, item) => sum + item.value * item.weight, 0) / weight : 0;
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateSpanDays(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  return Math.max(1, Math.round((parseDate(endDate) - parseDate(startDate)) / 86400000) + 1);
}

function monthStartFromDate(value) {
  const [year, month] = String(value).split("-");
  return year && month ? `${year}-${month}-01` : "";
}

function monthEndFromDate(value) {
  const month = String(value).slice(0, 7);
  return monthEndFromMonth(month);
}

function monthEndFromMonth(monthText) {
  const [year, month] = String(monthText).split("-").map(Number);
  if (!year || !month) return "";
  return toIsoDate(new Date(year, month, 0));
}

function formatMonthSelectLabel(monthText) {
  const [year, month] = String(monthText).split("-");
  if (!year || !month) return monthText || "-";
  return `${year.slice(-2)}年${Number(month)}月`;
}

function formatMonthFromDate(value) {
  const month = String(value || "").slice(0, 7);
  return month ? formatMonthSelectLabel(month) : "";
}

function normalizeDate(value) {
  const text = cleanText(value);
  const match = text.match(/(\d{4})[年/.-]?(\d{1,2})[月/.-]?(\d{1,2})/);
  if (!match) return "";
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function cleanText(value) {
  return String(value ?? "").replace(/\uFEFF/g, "").trim();
}

function formatCompanyLocationName(value) {
  const original = cleanText(value);
  if (!original || original === "未分類") return original || "未分類";

  const normalized = original
    .replace(/㈱/g, "株式会社")
    .replace(/[（(]\s*株\s*[）)]/g, "株式会社")
    .replace(/[　\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  const legalPattern = "(?:株式会社|有限会社|合同会社|合名会社|合資会社|医療法人|学校法人|社会福祉法人|一般社団法人|公益社団法人|宗教法人|特定非営利活動法人)";
  const middleLegal = normalized.match(new RegExp(`^(.+?)${legalPattern}\\s*(.+)$`));
  if (middleLegal?.[2]) return cleanLocationName(middleLegal[2]);

  const leadingLegal = normalized.match(new RegExp(`^${legalPattern}\\s*(.+)$`));
  if (leadingLegal?.[1]) return extractLocationName(leadingLegal[1]);

  const withoutLegal = normalized.replace(new RegExp(legalPattern, "g"), "").trim();
  return extractLocationName(withoutLegal || original);
}

function extractLocationName(value) {
  const text = cleanLocationName(value);
  if (!text || text === "未分類") return text || "未分類";
  const parts = text.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return cleanLocationName(parts.at(-1));
  if (/本社$/.test(text)) return "本社";
  if (looksLikeLocationName(text)) return text;
  return "本社";
}

function cleanLocationName(value) {
  return cleanText(value)
    .replace(/\s*[-–—＿_／/｜|]\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function looksLikeLocationName(value) {
  return /(?:本社|支社|支店|営業所|事業所|センター|店|店舗|工場|倉庫|営業部|オフィス|院|校|園)$/.test(value);
}

function numberFromText(value) {
  const text = cleanText(value)
    .replace(/[￥¥,\s　%]/g, "")
    .replace(/^[(](.*)[)]$/, "-$1");
  if (!text || text === "-") return 0;
  const number = Number(text);
  return Number.isFinite(number) ? number : 0;
}

function safeDivide(value, denominator) {
  return denominator > 0 ? value / denominator : 0;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), "ja"));
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function formatCurrency(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(Math.round(value || 0));
}

function formatCurrencyDecimal(value) {
  return `￥${new Intl.NumberFormat("ja-JP", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value || 0)}`;
}

function formatShortCurrency(value) {
  if (value >= 100000000) return `${Math.round(value / 100000000)}億`;
  if (value >= 10000) return `${Math.round(value / 10000)}万`;
  if (value >= 1000) return `${Math.round(value / 1000)}千`;
  return String(Math.round(value || 0));
}

function formatNumber(value) {
  return new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 0 }).format(Math.round(value || 0));
}

function formatPercent(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "percent",
    maximumFractionDigits: 1
  }).format(value || 0);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeXml(value) {
  return escapeHtml(value);
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function saveState() {
  const payload = {
    profile: state.profile,
    filters: state.filters,
    periods: state.periods,
    sorts: state.sorts,
    cpPeriod: state.cpPeriod,
    simulation: state.simulation,
    sidebarMarket: {
      query: state.sidebarMarket.query,
      dataBasis: state.sidebarMarket.dataBasis,
      selectedRegionCode: state.sidebarMarket.selectedRegionCode,
      regionOptions: state.sidebarMarket.regionOptions,
      stats: state.sidebarMarket.stats,
      targetStats: state.sidebarMarket.targetStats,
      targetError: state.sidebarMarket.targetError,
      targetStatsRegionCode: state.sidebarMarket.targetStatsRegionCode,
      bulk: {
        ...ensureAddressBulkState(),
        loading: false
      }
    },
    jobMarket: {
      selectedJobKey: state.jobMarket.selectedJobKey,
      selectedPrefectureCode: state.jobMarket.selectedPrefectureCode,
      dataBasis: state.jobMarket.dataBasis,
      selectedRegionCode: state.jobMarket.selectedRegionCode,
      regionOptions: state.jobMarket.regionOptions,
      accountRegions: state.jobMarket.accountRegions,
      accountSignature: state.jobMarket.accountSignature,
      stats: state.jobMarket.stats
    },
    targetAnalysis: {
      selectedJobKey: state.targetAnalysis.selectedJobKey,
      selectedPrefectureCode: state.targetAnalysis.selectedPrefectureCode,
      selectedCityKey: state.targetAnalysis.selectedCityKey,
      dataBasis: state.targetAnalysis.dataBasis,
      selectedRegionCode: state.targetAnalysis.selectedRegionCode,
      regionOptions: state.targetAnalysis.regionOptions,
      stats: state.targetAnalysis.stats,
      comparisons: state.targetAnalysis.comparisons,
      targetGender: state.targetAnalysis.targetGender,
      targetAgeGroups: state.targetAnalysis.targetAgeGroups,
      commuteKm: state.targetAnalysis.commuteKm,
      controlsCollapsed: state.targetAnalysis.controlsCollapsed,
      customStrategyTips: state.targetAnalysis.customStrategyTips,
      geminiStrategyTips: {
        ...(state.targetAnalysis.geminiStrategyTips || {}),
        loading: false
      }
    },
    reportNotes: state.reportNotes,
    activeTab: state.activeTab
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Dashboard state save failed", error);
  }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    state.profile = { ...state.profile, ...saved.profile };
    state.filters = { ...state.filters, ...saved.filters };
    state.periods = { ...state.periods, ...saved.periods };
    state.sorts = { ...state.sorts, ...saved.sorts };
    state.cpPeriod = { ...state.cpPeriod, ...saved.cpPeriod };
    state.simulation = { ...state.simulation, ...saved.simulation };
    state.sidebarMarket = { ...state.sidebarMarket, ...(saved.sidebarMarket || saved.market), loading: false, error: "" };
    state.sidebarMarket.bulk = { ...createAddressBulkState(), ...(state.sidebarMarket.bulk || {}), loading: false };
    state.jobMarket = { ...state.jobMarket, ...saved.jobMarket, loading: false, error: "" };
    state.targetAnalysis = { ...state.targetAnalysis, ...saved.targetAnalysis, loading: false, error: "" };
    state.targetAnalysis.customStrategyTips = saved.targetAnalysis?.customStrategyTips || {};
    state.targetAnalysis.geminiStrategyTips = {
      signature: "",
      tips: [],
      loading: false,
      error: "",
      ...(saved.targetAnalysis?.geminiStrategyTips || {}),
      loading: false
    };
    state.reportNotes = saved.reportNotes ?? "";
    state.activeTab = saved.activeTab === "market" ? "target" : (saved.activeTab ?? "monthly");
    ensurePeriodState();
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

window.dashboardApp = {
  getAnalytics,
  renderPrintReport,
  renderAddressMarketPrintReport
};

import React, { createContext, useState } from "react";
import {
  Shorts,
  Tshirt,
  Umbrella,
  Sunglasses,
  LongShirt,
  Jeans,
  Blouse,
  Jacket,
  TrenchCoat,
  Coat,
  Gloves,
  SleevelessShirt,
} from "../Image/Image";

export const WeatherContext = createContext();
export const WeatherOutfitContext = createContext();

//기온에 따라 입는 옷을 추천.
export const getOutfitRecommendations = (temp, weatherCode) => {
  const unbrellaRequired = weatherCode >= 200 && weatherCode <= 531;

  const hot = temp >= 27;
  const warm = temp >= 20;
  const cool = temp >= 9;
  const samiCool = temp >= 5;
  const cold = temp <= 4;

  const hotClothes = [
    { item: Tshirt, title: "티셔츠", tip: "물을 많이 마시세요." },
    { item: Shorts, title: "반팔 셔츠", tip: "해충에 조심하세요." },
    {
      item: SleevelessShirt,
      title: "긴팔",
      tip: "자외선 차단제를 바르세요.",
    },
    {
      item: Sunglasses,
      title: "야외 활동",
      tip: "UV차단 안경을 착용하세요.",
    },
  ];
  const warmClothes = [
    { item: Blouse, title: "블라우스", tip: "가볍게 입으세요." },
    { item: LongShirt, title: "긴팔 셔츠", tip: "편안한 신발을 신으세요." },
    {
      item: Jeans,
      title: "데님 팬츠",
      tip: "데님 팬츠를 입어 편안한 분위기를 보여주세요.",
    },
  ];
  const coolClothes = [
    { item: Jacket, title: "자켓", tip: "조금 두꺼운 옷을 입으세요." },
    { item: Jeans, title: "데님 팬츠", tip: "추위를 막아줄 모자를 쓰세요." },
    {
      item: TrenchCoat,
      title: "트랜치 코트",
      tip: "일교차가 크니 코트를 준비하세요.",
    },
  ];
  const coldClothes = [
    {
      item: Coat,
      title: "코트",
      tip: "두꺼운 목도리와 귀마개를 쓰세요.",
    },
    {
      item: Gloves,
      title: "장갑",
      tip: "손가락이 춥지 않도록 적당한 장갑을 착용하세요.",
    },
  ];

  if (hot) {
    if (unbrellaRequired) {
      hotClothes.unshift({
        item: Umbrella,
        title: "우산",
        tip: "우산을 챙겨 나가세요.",
      });
      return hotClothes;
    } else {
      return hotClothes;
    }
  } else if (warm) {
    if (unbrellaRequired) {
      warmClothes.unshift({
        item: Umbrella,
        title: "우산",
        tip: "우산을 챙겨 나가세요.",
      });
      return warmClothes;
    } else {
      return warmClothes;
    }
  } else if (cool) {
    if (unbrellaRequired) {
      coolClothes.unshift({
        item: Umbrella,
        title: "우산",
        tip: "우산을 챙겨 나가세요.",
      });
      return coolClothes;
    } else {
      return coolClothes;
    }
  } else if (samiCool) {
    if (unbrellaRequired) {
      coldClothes.unshift({
        item: Umbrella,
        title: "우산",
        tip: "우산을 챙겨 나가세요.",
      });
      return coldClothes;
    } else {
      return coldClothes;
    }
  } else if (cold) {
    if (unbrellaRequired) {
      coldClothes.unshift({
        item: Umbrella,
        title: "우산",
        tip: "우산을 챙겨 나가세요.",
      });
      return coldClothes;
    } else {
      return coldClothes;
    }
  }
};

export const weatherDescKo = [
  { 201: "가벼운 비를 동반한 천둥구름" },
  { 200: "비를 동반한 천둥구름" },
  { 202: "폭우를 동반한 천둥구름" },
  { 210: "약한 천둥구름" },
  { 211: "천둥구름" },
  { 212: "강한 천둥구름" },
  { 221: "불규칙적 천둥구름" },
  { 230: "약한 연무를 동반한 천둥구름" },
  { 231: "연무를 동반한 천둥구름" },
  { 232: "강한 안개비를 동반한 천둥구름" },
  { 300: "가벼운 안개비" },
  { 301: "안개비" },
  { 302: "강한 안개비" },
  { 310: "가벼운 적은비" },
  { 311: "적은비" },
  { 312: "강한 적은비" },
  { 313: "소나기와 안개비" },
  { 314: "강한 소나기와 안개비" },
  { 321: "소나기" },
  { 500: "악한 비" },
  { 501: "중간 비" },
  { 502: "강한 비" },
  { 503: "매우 강한 비" },
  { 504: "극심한 비" },
  { 511: "우박" },
  { 520: "약한 소나기 비" },
  { 521: "소나기 비" },
  { 522: "강한 소나기 비" },
  { 531: "불규칙적 소나기 비" },
  { 600: "가벼운 눈" },
  { 601: "눈" },
  { 602: "강한 눈" },
  { 611: "진눈깨비" },
  { 612: "소나기 진눈깨비" },
  { 615: "약한 비와 눈" },
  { 616: "비와 눈" },
  { 620: "약한 소나기 눈" },
  { 621: "소나기 눈" },
  { 622: "강한 소나기 눈" },
  { 701: "박무" },
  { 711: "연기" },
  { 721: "연무" },
  { 731: "모래 먼지" },
  { 741: "안개" },
  { 751: "모래" },
  { 761: "먼지" },
  { 762: "화산재" },
  { 771: "돌풍" },
  { 781: "토네이도" },
  { 800: "구름 한 점 없는 맑은 하늘" },
  { 801: "약간의 구름이 낀 하늘" },
  { 802: "드문드문 구름이 낀 하늘" },
  { 803: "구름이 거의 없는 하늘" },
  { 804: "구름으로 뒤덮인 흐린 하늘" },
  { 900: "토네이도" },
  { 901: "태풍" },
  { 902: "허리케인" },
  { 903: "한랭" },
  { 904: "고온" },
  { 905: "바람부는" },
  { 906: "우박" },
  { 951: "바람이 거의 없는" },
  { 952: "약한 바람" },
  { 953: "부드러운 바람" },
  { 954: "중간 세기 바람" },
  { 955: "신선한 바람" },
  { 956: "센 바람" },
  { 957: "돌풍에 가까운 센 바람" },
  { 958: "돌풍" },
  { 959: "심각한 돌풍" },
  { 960: "폭풍" },
  { 961: "강한 폭풍" },
  { 962: "허리케인" },
];

export const localLocation = () => {};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [outfit, setOutfit] = useState([]);
  return (
    <WeatherContext.Provider value={[weatherData, setWeatherData]}>
      <WeatherOutfitContext.Provider value={[outfit, setOutfit]}>
        {children}
      </WeatherOutfitContext.Provider>
    </WeatherContext.Provider>
  );
};

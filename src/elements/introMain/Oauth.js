const KAKAO_CALLBACK_URL = "http://localhost:3000/oauth/kakao/callback";
const KAKAO_KEY = "4689e9fb2dad975cc84333a495fc2238";

// export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_KEY_NAVER}&state=teamnote&redirect_uri=${process.env.REACT_APP_URI_NAVER}`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${KAKAO_CALLBACK_URL}&response_type=code`;

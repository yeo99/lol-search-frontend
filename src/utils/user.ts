import {jwtDecode} from 'jwt-decode';

export const getUser = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);  // 디코딩된 토큰
    return decoded;  // 토큰에서 사용자 ID 추출 (토큰의 구조에 따라 다를 수 있음)
  } catch (error) {
    console.error('토큰 디코딩 실패', error);
    return null;
  }
};
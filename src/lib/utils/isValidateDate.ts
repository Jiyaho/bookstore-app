// 유효한 날짜인지 확인하는 함수
function isValidDate(dateString: string): boolean {
  // 정규 표현식으로 YYYYMMDD 형식 체크
  const regex = /^(20\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
  const match = dateString.match(regex);

  if (!match) return false;

  // 매칭된 값을 연도, 월, 일로 분리
  const year = parseInt(match[1]);
  const month = parseInt(match[2]) - 1; // JavaScript Date 객체는 0부터 11까지의 월을 사용
  const day = parseInt(match[3]);

  // Date 객체로 실제 날짜 검증 (날짜가 유효하지 않으면 Invalid Date 반환)
  const date = new Date(year, month, day);

  // Date 객체가 유효한지 체크 (Invalid Date이면 NaN이 반환됨)
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

export default isValidDate;

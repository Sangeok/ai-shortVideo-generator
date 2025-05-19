export const downloadSRT = (srtContent: string) => {
  if (!srtContent) {
    alert("먼저 자막을 생성해주세요.");
    return;
  }

  // Blob 객체 생성
  const blob = new Blob([srtContent], { type: "text/plain;charset=utf-8" });

  // 다운로드 URL 생성
  const url = URL.createObjectURL(blob);

  // 다운로드 링크 생성
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "captions.srt"; // 파일명 설정

  // 링크를 DOM에 추가하고 클릭 이벤트 발생시켜 다운로드
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 링크 제거 및 URL 해제
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
};

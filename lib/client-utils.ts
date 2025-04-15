export const saveTtsAudioToPublic = async (blobUrl: string) => {
  try {
    // 1. Blob URL에서 오디오 데이터 가져오기
    const audioResponse = await fetch(blobUrl);
    const audioBlob = await audioResponse.blob();

    // 2. FormData 객체 생성
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.mp3");

    // 3. 서버 API로 전송
    const response = await fetch("/api/save-audio", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("오디오 저장 실패");
    }

    // 4. 저장된 파일 경로 받기
    const { filePath } = await response.json();
    console.log("오디오 파일 저장됨:", filePath);

    // 5. 저장된 경로 반환 (이는 ttsUrl로 사용될 수 있습니다)
    return filePath; // 예: 'audio/my-audio-12345.mp3'
  } catch (error) {
    console.error("오디오 저장 오류:", error);
    throw error;
  }
};

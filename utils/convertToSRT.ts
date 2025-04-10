export const convertToSRT = (result: any) => {
  if (
    !result.results ||
    !result.results.channels ||
    !result.results.channels[0]?.alternatives?.[0]
  ) {
    return "";
  }

  const paragraphs = result.results.channels[0].alternatives[0].paragraphs;

  if (
    !paragraphs ||
    !paragraphs.paragraphs ||
    paragraphs.paragraphs.length === 0
  ) {
    // 문장 정보가 없는 경우, 단어 정보를 사용하여 SRT 생성
    return convertFromWords(result.results.channels[0].alternatives[0].words);
  }

  let srtContent = "";
  let subtitleIndex = 1;

  // 문장 단위로 자막 생성
  paragraphs.paragraphs.forEach((paragraph: any) => {
    paragraph.sentences.forEach((sentence: any) => {
      const startTime = formatSRTTime(sentence.start);
      const endTime = formatSRTTime(sentence.end);

      srtContent += `${subtitleIndex}\n${startTime} --> ${endTime}\n${sentence.text}\n\n`;
      subtitleIndex++;
    });
  });

  return srtContent.trim();
};

// 단어 정보를 사용하여 SRT 포맷으로 변환하는 보조 함수
const convertFromWords = (words: any) => {
  if (!words || words.length === 0) {
    return "";
  }

  let srtContent = "";
  let subtitleIndex = 1;
  let currentSegment = "";
  let startTime = parseFloat(words[0].start);
  let endTime = 0;
  let wordCount = 0;

  // 약 3-4초 또는 7-10단어마다 새 자막 생성
  words.forEach((word: any, index: number) => {
    currentSegment += (word.punctuated_word || word.word) + " ";
    endTime = parseFloat(word.end);
    wordCount++;

    // 4초 또는 10단어마다 또는 문장 끝에 새 자막 생성
    const isPunctuated =
      word.punctuated_word &&
      (word.punctuated_word.endsWith(".") ||
        word.punctuated_word.endsWith("?") ||
        word.punctuated_word.endsWith("!"));

    if (
      wordCount >= 10 ||
      endTime - startTime > 4 ||
      isPunctuated ||
      index === words.length - 1
    ) {
      const formattedStartTime = formatSRTTime(startTime);
      const formattedEndTime = formatSRTTime(endTime);

      srtContent += `${subtitleIndex}\n${formattedStartTime} --> ${formattedEndTime}\n${currentSegment.trim()}\n\n`;

      subtitleIndex++;
      currentSegment = "";
      wordCount = 0;
      startTime = endTime;
    }
  });

  return srtContent.trim();
};

// 초를 SRT 시간 형식으로 변환하는 함수 (HH:MM:SS,mmm)
const formatSRTTime = (seconds: number) => {
  const totalMs = Math.floor(seconds * 1000);
  const ms = totalMs % 1000;
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  // 시:분:초,밀리초 형식으로 포맷팅 (SRT 표준)
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
};

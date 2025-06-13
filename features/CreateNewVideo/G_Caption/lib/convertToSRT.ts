// 타입 정의
type Word = {
  word: string;
  start: number;
  end: number;
  confidence: number;
  punctuated_word: string;
};

type Sentence = {
  text: string;
  start: number;
  end: number;
};

type Paragraph = {
  sentences: Sentence[];
  num_words: number;
  start: number;
  end: number;
};

type TranscriptionResult = {
  results?: {
    channels?: Array<{
      alternatives?: Array<{
        words: Word[];
        paragraphs?: {
          paragraphs: Paragraph[];
        };
      }>;
    }>;
  };
};

export const convertToSRT = (result: TranscriptionResult, language: string) => {
  if (
    !result.results ||
    !result.results.channels ||
    !result.results.channels[0]?.alternatives?.[0]
  ) {
    return "";
  }

  const words = result.results.channels[0].alternatives[0].words;
  const paragraphs = result.results.channels[0].alternatives[0].paragraphs;

  if (
    !paragraphs ||
    !paragraphs.paragraphs ||
    paragraphs.paragraphs.length === 0
  ) {
    // 문장 정보가 없는 경우, 단어 정보를 사용하여 SRT 생성
    return convertFromWords(words);
  }

  // 문장 정보가 있는 경우, 문장을 더 작은 단위로 분할하여 처리
  return convertWithSentences(words, paragraphs.paragraphs);
};

// 문장 정보를 활용하여 더 자연스럽게 자막을 분할하는 함수
const convertWithSentences = (words: Word[], paragraphs: Paragraph[]) => {
  let srtContent = "";
  let subtitleIndex = 1;

  // 문장별로 처리
  paragraphs.forEach((paragraph) => {
    paragraph.sentences.forEach((sentence) => {
      // 이 문장에 포함된 단어들 찾기
      const sentenceWords = words.filter(
        (word) => word.start >= sentence.start && word.end <= sentence.end
      );

      // 문장이 너무 길면 분할하기
      if (sentenceWords.length > 7 || sentence.end - sentence.start > 3) {
        // 문장 분할 처리
        let currentSegment = "";
        let segmentWords: Word[] = [];
        let startTime = sentenceWords[0]?.start || sentence.start;
        let endTime = startTime;
        let wordCount = 0;

        sentenceWords.forEach((word, index) => {
          currentSegment += (word.punctuated_word || word.word) + " ";
          segmentWords.push(word);
          endTime = word.end;
          wordCount++;

          // 분할 기준: 7단어 또는 3초 또는 문장 부호
          const isPunctuated =
            word.punctuated_word &&
            (word.punctuated_word.endsWith(",") ||
              word.punctuated_word.endsWith(";") ||
              word.punctuated_word.endsWith(":") ||
              word.punctuated_word.endsWith("-"));

          // 문장의 마지막 단어이거나 분할 조건 충족 시 새 자막 생성
          if (
            wordCount >= 7 ||
            endTime - startTime > 3 ||
            isPunctuated ||
            index === sentenceWords.length - 1
          ) {
            const formattedStartTime = formatSRTTime(startTime);
            const formattedEndTime = formatSRTTime(endTime);

            srtContent += `${subtitleIndex}\n${formattedStartTime} --> ${formattedEndTime}\n${currentSegment.trim()}\n\n`;

            subtitleIndex++;
            currentSegment = "";
            segmentWords = [];
            wordCount = 0;
            startTime = endTime;
          }
        });
      } else {
        // 문장이 충분히 짧으면 그대로 사용
        const formattedStartTime = formatSRTTime(sentence.start);
        const formattedEndTime = formatSRTTime(sentence.end);

        srtContent += `${subtitleIndex}\n${formattedStartTime} --> ${formattedEndTime}\n${sentence.text}\n\n`;
        subtitleIndex++;
      }
    });
  });

  return srtContent.trim();
};

// 단어 정보를 사용하여 SRT 포맷으로 변환하는 보조 함수
const convertFromWords = (words: Word[]) => {
  if (!words || words.length === 0) {
    return "";
  }

  let srtContent = "";
  let subtitleIndex = 1;
  let currentSegment = "";
  let startTime = words[0].start;
  let endTime = 0;
  let wordCount = 0;

  // 자막 길이 조정: 약 3초 또는 7단어마다 새 자막 생성
  words.forEach((word, index) => {
    currentSegment += (word.punctuated_word || word.word) + " ";
    endTime = word.end;
    wordCount++;

    // 문장 분할 기준 조정: 3초 또는 7단어마다 또는 문장 부호에서 자막 분할
    const isPunctuated =
      word.punctuated_word &&
      (word.punctuated_word.endsWith(".") ||
        word.punctuated_word.endsWith("?") ||
        word.punctuated_word.endsWith("!") ||
        word.punctuated_word.endsWith(",") ||
        word.punctuated_word.endsWith(";") ||
        word.punctuated_word.endsWith(":") ||
        word.punctuated_word.endsWith("-"));

    // 특정 접속사에서 분할하지 않도록 방지
    const nextWord =
      index < words.length - 1 ? words[index + 1].word.toLowerCase() : "";
    const isConnectionWord = [
      "and",
      "or",
      "but",
      "so",
      "because",
      "if",
      "when",
      "while",
      "although",
    ].includes(nextWord);

    if (
      // 다음 단어가 접속사가 아니고, 단어 수 또는 시간 조건을 만족할 때만 분할
      ((wordCount >= 7 || endTime - startTime > 3) && !isConnectionWord) ||
      // 문장 부호나 마지막 단어는 항상 분할
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

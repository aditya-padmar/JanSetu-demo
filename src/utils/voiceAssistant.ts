import { Language } from '../data/guidedServicesData';

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function speakText(
  text: string,
  language: Language,
  onStart?: () => void,
  onEnd?: () => void
): void {
  if (!isSpeechSynthesisSupported()) {
    onStart?.();
    setTimeout(() => {
      onEnd?.();
    }, 2500);
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const targetLang = language === 'kn' ? 'kn-IN' : 'en-IN';
  utterance.lang = targetLang;
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice =
    voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
    voices.find((v) =>
      language === 'kn'
        ? v.lang.toLowerCase().startsWith('kn')
        : v.lang.toLowerCase().startsWith('en')
    );

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    onStart?.();
  };
  utterance.onend = () => {
    onEnd?.();
  };
  utterance.onerror = () => {
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}

interface VoiceDictationOptions {
  language: Language;
  fallbackText: { en: string; kn: string };
  onStart: () => void;
  onResult: (transcript: string, isSimulatedDemoFallback: boolean) => void;
  onEnd: () => void;
}

export function startVoiceDictation({
  language,
  fallbackText,
  onStart,
  onResult,
  onEnd,
}: VoiceDictationOptions): () => void {
  const SpeechRecognitionImpl =
    typeof window !== 'undefined'
      ? (window as unknown as Record<string, unknown>).SpeechRecognition ||
        (window as unknown as Record<string, unknown>).webkitSpeechRecognition
      : null;

  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
  let recognitionInstance: {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    start: () => void;
    stop: () => void;
    onresult: ((event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
    onerror: (() => void) | null;
    onend: (() => void) | null;
  } | null = null;
  let resolved = false;

  const triggerSimulatedFallback = () => {
    if (resolved) return;
    resolved = true;
    fallbackTimer = setTimeout(() => {
      onResult(fallbackText[language], true);
      onEnd();
    }, 1200);
  };

  onStart();

  if (typeof SpeechRecognitionImpl === 'function') {
    try {
      recognitionInstance = new (SpeechRecognitionImpl as new () => NonNullable<typeof recognitionInstance>)();
      recognitionInstance.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onresult = (event) => {
        if (resolved) return;
        resolved = true;
        const transcript = event.results?.[0]?.[0]?.transcript || fallbackText[language];
        onResult(transcript, false);
        onEnd();
      };

      recognitionInstance.onerror = () => {
        triggerSimulatedFallback();
      };

      recognitionInstance.onend = () => {
        if (!resolved) {
          triggerSimulatedFallback();
        }
      };

      recognitionInstance.start();
    } catch {
      triggerSimulatedFallback();
    }
  } else {
    triggerSimulatedFallback();
  }

  return () => {
    resolved = true;
    if (fallbackTimer) clearTimeout(fallbackTimer);
    if (recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch {
        // Ignore stop errors
      }
    }
    onEnd();
  };
}

export function useVoiceAssistant() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const speak = (text, lang = "en-US") => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang;
    window.speechSynthesis.speak(msg);
  };

  const startListening = (onCommand) => {
    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      onCommand(text);
    };
  };

  return { speak, startListening };
}
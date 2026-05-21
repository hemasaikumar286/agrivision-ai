export function createVoiceAI({ onCommand, speak }) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;

  const start = () => {
    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }
    recognition.start();
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();
    onCommand(text);
  };

  const handleCommand = (text, setPage, setLanguage) => {
    // 🌾 Navigation
    if (text.includes("weather")) setPage("weather");
    else if (text.includes("soil")) setPage("soil");
    else if (text.includes("plant")) setPage("plant");
    else if (text.includes("chat")) setPage("chat");
    else if (text.includes("camera")) setPage("camera");

    // 🌍 Language
    else if (text.includes("hindi")) setLanguage("hindi");
    else if (text.includes("english")) setLanguage("english");
    else if (text.includes("telugu")) setLanguage("telugu");
    else if (text.includes("tamil")) setLanguage("tamil");

    // 🔊 Feedback
    speak("Command executed successfully");
  };

  return { start, handleCommand };
}
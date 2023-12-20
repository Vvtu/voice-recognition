export const handleTextToSpeech = (text: string, voice: SpeechSynthesisVoice) =>
  new Promise((resolve) => {
    const utterThis = new SpeechSynthesisUtterance();

    const synth = window.speechSynthesis;
    if (utterThis && synth) {
      if (voice) {
        utterThis.voice = voice;
      }

      utterThis.volume = 1.0; // 0 to 1
      utterThis.rate = 1.0; // 0.1 to 10
      // utterThis.pitch = 2; //0 to 2
      utterThis.lang = voice.lang;

      const appcodeIsSpeakingTimeOut = setTimeout(() => {
        resolve(true); // in case of utterThis.onend failed
      }, 4000);

      utterThis.onend = () => {
        console.log('[36m onend = '); //TODO - delete vvtu
        clearTimeout(appcodeIsSpeakingTimeOut);
        resolve(true);
      };

      utterThis.text = text;
      synth.speak(utterThis);
    }
  });

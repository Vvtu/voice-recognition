export function handleTextToSpeach(text: string, voice: SpeechSynthesisVoice) {
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

    // this.setState({ appcodeIsSpeaking: true });
    // utterThis.onend = (event) => {
    //   this.setState({ appcodeIsSpeaking: false });
    //   if (this.appcodeIsSpeakingTimeOut) {
    //     clearTimeout(this.appcodeIsSpeakingTimeOut);
    //     this.appcodeIsSpeakingTimeOut = null;
    //   }
    // };
    // this.appcodeIsSpeakingTimeOut = setTimeout(
    //   () => {
    //     this.setState({ appcodeIsSpeaking: false });
    //     this.appcodeIsSpeakingTimeOut = null;
    //   },
    //   6000, // in case of utterThis.onend failed
    // );

    utterThis.text = text;
    synth.speak(utterThis);
  }
}

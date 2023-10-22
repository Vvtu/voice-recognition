export const getVoicesArray = (lang: string): Promise<SpeechSynthesisVoice[]> =>
  new Promise((resolve) => {
    window.speechSynthesis.getVoices();
    setTimeout(() => {
      const voicesArray = window.speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang.toLowerCase() === lang.toLocaleLowerCase())
        .sort((a, b) => (a.lang > b.lang ? 1 : -1));
      resolve(voicesArray);
    }, 150);
  });

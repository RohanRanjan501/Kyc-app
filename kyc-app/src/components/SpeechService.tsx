import React from 'react';  
import * as speechSdk from 'microsoft-cognitiveservices-speech-sdk';  
  
// Define props type if you plan to use this as a component  
interface SpeechServiceProps {  
  text: string;  
}  

export const apiKey="3iiQ7K6Vqx8BZpLotbutKHxGF4FyP1qPZJkqIQt3kSiBpf5vEi2SJQQJ99BFACGhslBXJ3w3AAAYACOGelWp" ;
export const region ="centralindia"
  
// Speech synthesis function  
export const speakText = (text: string): void => {  
  const speechConfig = speechSdk.SpeechConfig.fromSubscription(  
    apiKey, region 
  );  
  
  const audioConfig = speechSdk.AudioConfig.fromDefaultSpeakerOutput();  
  const synthesizer = new speechSdk.SpeechSynthesizer(speechConfig, audioConfig);  
  
  synthesizer.speakTextAsync(  
    text,  
    (result) => {  
      if (result.reason === speechSdk.ResultReason.SynthesizingAudioCompleted) {  
        console.log('Speech synthesized successfully.');  
      } else {  
        console.error('Speech synthesis failed. Error:', result.errorDetails);  
      }  
      synthesizer.close();  
    },  
    (error) => {  
      console.error('Error:', error);  
      synthesizer.close();  
    }  
  );  
};  
  
// Optional: If you want to use this as a component  
export const SpeechService: React.FC<SpeechServiceProps> = ({ text }) => {  
  React.useEffect(() => {  
    speakText(text);  
  }, [text]);  
  
  return null;  
};  

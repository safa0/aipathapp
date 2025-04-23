
import { useState } from "react";

export function useMessageTranslation(text: string, targetLang: string) {
  const [translated, setTranslated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Map our language codes to the ones used by LibreTranslate API
  const getLibreTranslateCode = (code: string) => {
    const mapping: Record<string, string> = {
      'en': 'en',
      'sv': 'sv',
      'es': 'es',
      'zh': 'zh',
      'ar': 'ar'
    };
    return mapping[code] || 'en';
  };

  const doTranslate = async () => {
    setIsLoading(true);
    
    try {
      // Using LibreTranslate API (no API key required for the public instance)
      const libreTranslateUrl = "https://libretranslate.de/translate";
      
      const response = await fetch(libreTranslateUrl, {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: "auto",
          target: getLibreTranslateCode(targetLang),
          format: "text"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        // Fallback to our dummy translations if the API fails
        useDummyTranslation();
        return;
      }
      
      const data = await response.json();
      if (data && data.translatedText) {
        setTranslated(data.translatedText);
      } else {
        // Fallback if response format is unexpected
        useDummyTranslation();
      }
    } catch (error) {
      console.error("Translation error:", error);
      // Fallback to our dummy translations if the API fails
      useDummyTranslation();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fallback function using our original dummy translations
  const useDummyTranslation = () => {
    if (targetLang === "sv") setTranslated("Detta är en översättning till svenska.");
    else if (targetLang === "es") setTranslated("Esta es una traducción al español.");
    else if (targetLang === "zh") setTranslated("这是中文翻译。");
    else if (targetLang === "ar") setTranslated("هذا ترجمة إلى العربية.");
    else setTranslated("This is a translation to English.");
  };

  return { translated, isLoading, doTranslate };
}

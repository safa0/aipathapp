
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English" },
  { code: "sv", name: "Swedish" },
  { code: "es", name: "Spanish" },
];

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const LanguageSelector = ({
  currentLanguage,
  onLanguageChange
}: LanguageSelectorProps) => (
  <div className="mt-2 flex flex-wrap gap-2">
    {languages.map(lang => (
      <Button
        key={lang.code}
        variant="outline"
        size="sm"
        onClick={() => onLanguageChange(lang.code)}
        className={`text-xs ${currentLanguage === lang.code ? "bg-brand-teal/20" : ""}`}
      >
        {lang.name}
      </Button>
    ))}
  </div>
);


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" },
  { code: "nd", name: "Ndebele" },
  { code: "sn", name: "Shona" },
];

export const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    // In a real app, this would trigger language change in i18n system
    console.log(`Language changed to ${languageCode}`);
  };

  const getLanguageName = (code: string) => {
    return languages.find((lang) => lang.code === code)?.name || "English";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          {getLanguageName(language)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={language === lang.code ? "font-bold" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Switch language
  };

  return (
    <div>
      <FormControl
        sx={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
        }}
      >
        <Select
          size="small"
          defaultValue={i18n.language}
          onChange={(e: SelectChangeEvent) => {
            changeLanguage(e.target.value);
          }}
          id="language-switcher"
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"hi"}>हिंदी</MenuItem>
          <MenuItem value={"es"}>Español</MenuItem>
          <MenuItem value={"fr"}>Français</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguageSwitcher;

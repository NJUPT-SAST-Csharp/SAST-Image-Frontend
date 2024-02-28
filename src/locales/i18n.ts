import { createI18n } from "vue-i18n";
import { CN } from "./cn";
import { EN } from "./en";

const messages = {
  cn: {
    ...CN,
  },
  en: {
    ...EN,
  },
};
export const i18n = createI18n({
  locale: "en", // 设置语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages,
});

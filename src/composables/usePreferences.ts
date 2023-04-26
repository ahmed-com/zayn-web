// TODO : migrate this composable to a pinia store
import { LocalStorage } from '../enums/localStorage.enum';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify/lib/framework.mjs';
import themesObj from '../themes';
import currenciesObj from '../data/supported-currencies.json';
import languagesObj from '../data/supported-languages.json';
import { ref, watchEffect } from 'vue';
import { find, propEq } from 'ramda';
import { Language } from '../types/Language.type';

export const usePreferences = () => {
	const { global } = useTheme();
	const { locale } = useI18n();

	const initialThemePref: string =
		localStorage.getItem(LocalStorage.Theme) || global.name.value;
	const initialCurrencyPref: string =
		localStorage.getItem(LocalStorage.Currency) ||
		import.meta.env.VITE_DEFAULT_CURRENCY;
	const initialLangPref: string =
		localStorage.getItem(LocalStorage.Lang) || locale.value;

	const themes: string[] = Object.keys(themesObj);
	const currencies: string[] = Object.keys(currenciesObj);
	const languages: Language[] = languagesObj;

	const currentTheme = ref<string>(initialThemePref);
	const currentCurrency = ref<string>(initialCurrencyPref);
	const currentLang = ref<Language>(
		<Language>find(propEq('value', initialLangPref))(languages)
	);

	watchEffect(() =>
		localStorage.setItem(LocalStorage.Currency, currentCurrency.value)
	);
	watchEffect(() => {
		global.name.value = currentTheme.value;
		localStorage.setItem(LocalStorage.Theme, currentTheme.value);
	});
	watchEffect(() => {
		locale.value = currentLang.value.value;
		localStorage.setItem(LocalStorage.Lang, currentLang.value.value);
	});

	return {
		themes,
		currencies,
		languages,
		currentTheme,
		currentLang,
		currentCurrency,
	};
};

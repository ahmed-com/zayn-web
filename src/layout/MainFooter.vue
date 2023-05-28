<script lang="ts">
export default {
	name: 'MainFooter',
};
</script>

<template>
	<v-footer padless>
		<v-container>
			<v-row class="justify-center" align="start">
				<v-col cols="12" md="2">
					<h1 class="text-h2">{{ t('footer.brand') }}</h1>
					<v-card-text class="mt-10"> {{ t('footer.aboutText') }} </v-card-text>
				</v-col>
				<v-spacer></v-spacer>
				<v-col cols="12" md="2">
					<v-card-title>{{ t('footer.titles.makeMoneyWithUs') }}</v-card-title>
					<v-card-text>
						<router-link :to="{ name: 'SellerLogin', do: 'signUp' }"
							class="text-grey">{{ t('footer.links.becomeAnAgent') }}</router-link>
					</v-card-text>
					<v-card-text>
						<router-link :to="{ name: 'SellerLogin', do: 'signUp' }"
							class="text-grey">{{ t('footer.links.becomeAMerchant') }}</router-link>
					</v-card-text>
				</v-col>
				<v-col cols="12" md="2">
					<v-card-title>{{ t('footer.titles.aboutUs') }}</v-card-title>
					<v-card-text>
						<router-link :to="{ name: 'PrivacyPolicy' }"
							class="text-grey">{{ t('footer.links.aboutUs') }}</router-link>
					</v-card-text>
					<v-card-text>
						<router-link :to="{ name: 'TermsOfUse' }"
							class="text-grey">{{ t('footer.links.legalInformation') }}</router-link>
					</v-card-text>
					<v-card-text>
						<router-link :to="{ name: 'ContactUs' }"
							class="text-grey">{{ t('footer.links.contactUs') }}</router-link>
					</v-card-text>
				</v-col>
				<v-col cols="6" md="2" align-self="center">
					<v-select :items="languages" :label="t('footer.language')" v-model="currentLang" item-title="native_name"
						item-value="value" outlined return-object single-line></v-select>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row class="text-center">
				<v-col cols="12">
					<v-card-text>
						{{ new Date().getFullYear() }} —
						<strong>{{ t('footer.brand') }}</strong>
					</v-card-text>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script setup lang="ts">
import { usePreferences } from '../composables/usePreferences';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { languages, currentLang, currentTheme, themes } = usePreferences()
</script>
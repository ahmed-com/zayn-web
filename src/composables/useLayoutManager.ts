// TODO : migrate this composable to a pinia store
import { computed, CSSProperties, ref, useSlots } from 'vue';
import { useDisplay } from 'vuetify';
import { useLayout } from 'vuetify';

let initialized: boolean = false;

function initLayout() {
	const { mdAndUp } = useDisplay();

	isDesktop.value = mdAndUp.value;
	leftDrawer.value = mdAndUp.value;
	rightDrawer.value = mdAndUp.value;
	footerOrder.value = mdAndUp.value ? -1 : 0;

	initialized = true;
}

function calculateLayout(
	_: { leftDrawerSlotName: string; rightDrawerSlotName: string },
	layoutNames?: {
		headerName?: string;
		leftDrawerName?: string;
		rightDrawerName?: string;
		footerName?: string;
	}
) {
	if (!initialized) initLayout();

	if (layoutNames?.headerName) calculateHeaderSize(layoutNames.headerName);
	if (layoutNames?.leftDrawerName)
		calculateLeftDrawerSize(layoutNames.leftDrawerName);
	if (layoutNames?.rightDrawerName)
		calculateRightDrawerSize(layoutNames.rightDrawerName);
	if (layoutNames?.footerName) calculateFooterSize(layoutNames.footerName);
}

const leftDrawer = ref<boolean>(false);
const rightDrawer = ref<boolean>(false);
const headerSize = ref<number>(0);
const leftDrawerSize = ref<number>(256);
const rightDrawerSize = ref<number>(256);
const footerSize = ref<number>(0);
const footerOrder = ref<-1 | 0>(0);
const isDesktop = ref<boolean>(false);
const contentStyle = ref();
const hasLeftDrawer = ref<boolean>(true);
const hasRightDrawer = ref<boolean>(true);

const desktopDrawerStyle = computed<CSSProperties>(() => ({
	top: `${headerSize.value}px`,
	left: '0px',
	position: 'sticky',
	'align-self': 'flex-start',
	'margin-top': '0px',
	'margin-bottom': '0px',
	height: `calc(100vh - ${headerSize.value}px)`,
	transform: 'none',
}));

const minContentHeight = computed<string>(
	() => `calc(100vh - ${headerSize.value}px)`
);

const calculateHeaderSize = (key: string) =>
	(headerSize.value = useLayout().getLayoutItem(key)?.size || 0);
const calculateLeftDrawerSize = (key: string) =>
	(leftDrawerSize.value = useLayout().getLayoutItem(key)?.size || 0);
const calculateRightDrawerSize = (key: string) =>
	(rightDrawerSize.value = useLayout().getLayoutItem(key)?.size || 0);
const calculateFooterSize = (key: string) =>
	(footerSize.value = useLayout().getLayoutItem(key)?.size || 0);

const setRightDrawerSize = (n: number) => rightDrawerSize.value = n;

export default () => ({
	calculateLayout,
	setRightDrawerSize,
	leftDrawer,
	rightDrawer,
	isDesktop,
	headerSize,
	leftDrawerSize,
	rightDrawerSize,
	footerSize,
	desktopDrawerStyle,
	contentStyle,
	footerOrder,
	minContentHeight,
	hasLeftDrawer,
	hasRightDrawer,
	setLeftDrawer: (x: boolean) => (hasLeftDrawer.value = x),
	setRightDrawer: (x: boolean) => (hasRightDrawer.value = x),
	calculateHeaderSize,
	calculateLeftDrawerSize,
	calculateRightDrawerSize,
	calculateFooterSize,
	toggleLeftDrawer: () => (leftDrawer.value = !leftDrawer.value),
	toggleRightDrawer: () => (rightDrawer.value = !rightDrawer.value),
});

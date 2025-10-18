import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';
import { useState } from 'react';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [mainStyles, setMainStyles] = useState<ArticleStateType>(defaultArticleState);

	function handleChangeMainStyleState(obj: ArticleStateType): void {
		setMainStyles(obj);
	}

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': mainStyles.fontFamilyOption.value,
					'--font-size': mainStyles.fontSizeOption.value,
					'--font-color': mainStyles.fontColor.value,
					'--container-width': mainStyles.contentWidth.value,
					'--bg-color': mainStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleChangeMainStyleState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

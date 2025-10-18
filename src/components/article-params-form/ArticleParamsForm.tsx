import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	onApply?: (styles: ArticleStateType) => void;
}


export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isMenuOpen, setMenuOpened] = useState(false);
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);
	isMenuOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';

	const handleFontFamilyChange = (selectedOption: OptionType) => {
		setArticleState(prev => ({
			...prev,
			fontFamilyOption: selectedOption
		}));
	};

	const handleFontSizeChange = (selectedOption: OptionType) => {
		setArticleState(prev => ({
			...prev,
			fontSizeOption: selectedOption
		}));
	};

	const handleFontColorChange = (selectedOption: OptionType) => {
		setArticleState(prev => ({
			...prev,
			fontColor: selectedOption
		}));
	};

	const handleBackgroundColorChange = (selectedOption: OptionType) => {
		setArticleState(prev => ({
			...prev,
			backgroundColor: selectedOption
		}));
	};

	const handleContentWidthChange = (selectedOption: OptionType) => {
		setArticleState(prev => ({
			...prev,
			contentWidth: selectedOption
		}));
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	const applySettings = () => {
		if (onApply) {
			onApply(articleState);
		}
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={() => { setMenuOpened(isOpen => !isOpen) }} />
			<aside className={isMenuOpen ?  clsx(styles.container, styles.container_open) : styles.container}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text
						children={'Задайте параметры'}
						as={'p'}
						size={31}
						weight={800}
						uppercase={true}
					></Text>
					<fieldset className={styles.fieldSet}>
						<Select
							selected={articleState.fontFamilyOption}
							options={fontFamilyOptions}
							title={'Шрифт'}
							onChange={handleFontFamilyChange}
							onClose={() => { }}
						></Select>
						<RadioGroup
							name={'Font'}
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
							title={'Размер шрифта'}
							onChange={handleFontSizeChange}
						></RadioGroup>
						<Select
							selected={articleState.fontColor}
							options={fontColors}
							title={'Цвет шрифта'}
							onChange={handleFontColorChange}
							onClose={() => { }}
						></Select>
					</fieldset>
					<fieldset className={clsx(styles.fieldSet, styles.contentFieldSet)}>
						<Select
							selected={articleState.backgroundColor}
							options={backgroundColors}
							title={'Цвет фона'}
							onChange={handleBackgroundColorChange}
							onClose={() => { }}
						></Select>
						<Select
							selected={articleState.contentWidth}
							options={contentWidthArr}
							title={'ширина контента'}
							onChange={handleContentWidthChange}
							onClose={() => { }}
						></Select>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' onClick={applySettings} />
					</div>
				</form>
			</aside>
		</>
	);
};

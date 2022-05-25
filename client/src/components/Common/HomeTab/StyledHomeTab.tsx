import styled from '@emotion/styled';
import mediaQueryHelper from '@/styles/mediaHelper'
import ColorSet from '@/styles/colorSet';

const StyledHomeTab = {
	PostMenu: styled.ul`
			display: flex;
			padding: 5rem 1rem 1rem 1rem;

			${mediaQueryHelper('medium')} {
				padding-top: 6rem;
			}

			${mediaQueryHelper('large')} {
				padding-top: 7rem;
			}

			& > li {
				list-style: none;
				display: flex;
				align-items: center;
				padding: 0 8px;
				color: ${ColorSet['--grey700']};
				& > a {
					padding: 12px 10px;
					font-size: 15px;
					line-height: 20px;
					color: currentColor;
					border-radius: 8px;
					border: 0;
					cursor: pointer;
					background-color: transparent;
					text-decoration: none;
					text-align: left;
					&:hover {
						background-color: ${ColorSet['--greyOpacity100']}
					}
				}
			}
		`,
}

export default StyledHomeTab;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import ReflectedText from './components/ReflectedText';
import TextInput from './components/TextInput';
import '../scss/index.scss';

/**
 * Props用のInterface
 * コンポーネントのProps（属性）の型として使う
 */
interface MainProps {
	// デフォルトのテキストコンテンツ（初期表示+入力フォームのplaceholderとして使う）
	defaultContents: string;
}

/**
 * State用のInterface
 * コンポーネントのState（状態）の型として使う
 */
interface MainState {
	contents: string;
}

/**
 * メインクラスMain
 */
export class Main extends React.Component<MainProps, MainState> {
	/**
	 * コンストラクタ
	 * <Main defaultContents:string=デフォルト表示させるテキスト（入力フォームのplaceholderにも適用される />
	 * @param props
	 */
	constructor(props: MainProps) {
		super(props);

		this.state = {
			contents: this.props.defaultContents
		};
	}

	/**
	 * Inputフォームが変更された時のリスナー
	 * @param event
	 */
	onInputChange = (event: any) => {
		let textContents: string = event.target.value;
		console.log(textContents);
		// 空の時はデフォルト値を表示させる
		if (textContents == '') {
			textContents = this.props.defaultContents;
		}
		// Stateを更新するとそのStateのプロパティを結び付けられたコンポーネント（今回はReflectedText）が更新される
		this.setState({contents: textContents});
	};

	/**
	 * DOMレンダリング
	 * @returns {any}
	 */
	public render() {
		return(
			<div className="app-container">
				{ /* 入力テキストを反映させるテキストエリア */ }
				<ReflectedText contents={this.state.contents} />
				{ /* テキスト入力フォーム */ }
				<TextInput labelText={'Input Your Text'} defaultContents={this.props.defaultContents} onChange={this.onInputChange} />
			</div>
		);
	}
}

// viewportUnitsBuggyfillはiOSのSafariでも表示領域=100vhにしてくれるライブラリ
// 今回はフルスクリーンのアプリケーションなので使用している
viewportUnitsBuggyfill.init();
window.addEventListener('resize', viewportUnitsBuggyfill.refresh, true);

// ビューにレンダリング
ReactDOM.render(<Main defaultContents='(´･_･`)' />, document.querySelector('#app'));
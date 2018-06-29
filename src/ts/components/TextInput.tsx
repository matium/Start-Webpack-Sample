import * as React from 'react';

interface TextInputProps {
	labelText: string;
	defaultContents: string;
	onChange: Function;
}

/**
 * テキスト入力フォームのコンポーネント
 */
export default class TextInput extends React.Component<TextInputProps, any> {

	/**
	 * コンストラクタ
	 * <TextInput defaultContents:string=placeholderに入る文字列 onChange:function=入力値変更時のコールバック関数 />
	 * @param props
	 */
	constructor(props: any) {
		super(props);
	}

	/**
	 * DOMレンダリング
	 * @returns {any}
	 */
	public render() {
		return (
			<div className="TextInput">
				<div className="input-label">{this.props.labelText}</div>
				<input
					type="text"
					placeholder={this.props.defaultContents}
					onChange={ e => this.props.onChange(e) }
				/>
			</div>
		);
	}
}
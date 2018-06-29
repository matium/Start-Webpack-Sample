import * as React from 'react';

interface ReflectedTextProps {
	contents: string;
}

/**
 * 入力されたテキストを反映表示させるテキストエリア
 */
export default class ReflectedText extends React.Component<ReflectedTextProps, any> {
	/**
	 * コンストラクタ
	 * <ReflectedText contents:string=反映させるテキスト />
	 * @param props
	 */
	constructor(props: ReflectedTextProps) {
		super(props);
	}

	/**
	 * DOMレンダリング
	 * @returns {any}
	 */
	public render() {
		return(
			<div className="ReflectedText">{this.props.contents}</div>
		);
	}

}
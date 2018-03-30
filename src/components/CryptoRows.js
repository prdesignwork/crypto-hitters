import React, { Component } from 'react';
import rightArrow from '../image/right-arrow.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CryptoRows extends Component {
	constructor(props) {
		super(props);

		this.handleArrowHover = this.handleArrowHover.bind(this);
		this.handleChosenCrypto = this.handleChosenCrypto.bind(this);
	}

	handleArrowHover(event) {
		const tickerSymbol = event.target.id;
		const tickerLogo = document.getElementById(`crypto-rows__${tickerSymbol}-image`);
		const tickerRow = document.getElementById(`crypto-rows__${tickerSymbol}-row`);

		if (event.type === 'mouseenter') {
			tickerLogo.setAttribute(
				'src',
				`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/128/color/${tickerSymbol.toLowerCase()}.png`
			);
			tickerRow.classList.add('crypto-rows__row--light-up');
		} else {
			tickerLogo.setAttribute(
				'src',
				`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/128/black/${tickerSymbol.toLowerCase()}.png`
			);
			tickerRow.classList.remove('crypto-rows__row--light-up');
		}
	}

	handleChosenCrypto(event) {
		this.props.handleChosenCryptoName(event.target.name);
		this.props.handleChosenCryptoSymbol(event.target.id);
	}

	render() {
		const searchTerm = this.props.searchTerm;
		var tickers;

		if (searchTerm !== '') {
			const filteredTickers = this.props.tickers.filter(
				ticker => `${ticker.name} ${ticker.symbol}`.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0
			);
			tickers = filteredTickers;
		} else {
			tickers = this.props.tickers;
		}
		return tickers.map(ticker => (
			<tr key={ticker.name} className="crypto-rows__row" id={`crypto-rows__${ticker.symbol}-row`}>
				<td className="crypto-table__table-row-data">
					{ticker.rank}
					<img
						className="crypto-rows__ticker-image"
						id={`crypto-rows__${ticker.symbol}-image`}
						src={`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/128/black/${ticker.symbol.toLowerCase()}.png`}
						alt={ticker.symbol}
					/>
				</td>
				<td className="crypto-table__table-row-data">{ticker.name}</td>
				<td className="crypto-table__table-row-data hide-on-ipad">{ticker.symbol}</td>
				<td className="crypto-table__table-row-data">${ticker.price_usd.substring(0, 7)}</td>
				<td className="crypto-table__table-row-data hide-on-tablet">
					${Number(ticker.market_cap_usd).toLocaleString()}
				</td>
				<td className={ticker.percent_change_24h < 0 ? 'red-text' : 'green-text'}>
					{ticker.percent_change_24h}%
				</td>
				<td>
					<Link to="/news">
						<img
							className="crypto-rows__right-arrow"
							src={rightArrow}
							alt="right arrow"
							name={ticker.name}
							id={ticker.symbol}
							onMouseEnter={this.handleArrowHover}
							onMouseLeave={this.handleArrowHover}
							onClick={this.handleChosenCrypto}
						/>
					</Link>
				</td>
			</tr>
		));
	}
}

CryptoRows.propTypes = {
	tickers: PropTypes.arrayOf(PropTypes.object),
	searchTerm: PropTypes.string,
	handleChosenCryptoName: PropTypes.func,
	handleChosenCryptoSymbol: PropTypes.func
};

export default CryptoRows;
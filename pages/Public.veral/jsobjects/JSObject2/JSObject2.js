export default {
	valOptions: [],
	setValOptions () {
		let opts = [];
		for (let i = 8; i >= 0; i--) {
			if (i % 2 === 1) {
				opts.push({ label: `${(i/2).toPrecision(2)}`, value: `${(i/2).toPrecision(2)}`});			
			} else {
				opts.push({ label: `${(i/2)}`, value: `${(i/2)}`})
			}
		}
		this.valOptions = opts;
	}
}
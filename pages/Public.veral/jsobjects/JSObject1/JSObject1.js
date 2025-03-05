export default {
	verifica: {},
	showTimings: true,
	switchShowTimings() {
		this.showTimings = !this.showTimings;
	},
	async setVerifica() {
		const data = await SelectVerifica.run();
		this.verifica = data[0];
		SelectVeral.run();
	},
	voto(row) {
		let voto = 0;
		let tot = 0;
		for (let i = 1; i <= 6; i++) {
			const lbl_peso = `val${i}_peso`;
			if (this.verifica[lbl_peso]) {
				tot += this.verifica[lbl_peso];
			}
		}
		for (let i = 1; i <= 6; i++) {
			const lbl_peso = `val${i}_peso`;
			const lbl = `val${i}`;
			if (this.verifica[lbl_peso]) {
				voto += (row[lbl]/4) * (this.verifica[lbl_peso]/tot);
			}
		}
		voto = Math.ceil(voto * 1000) / 100;
		const penalita = this.penalita(row);
		return `${voto.toPrecision(3)} - ${penalita} = ${(voto - penalita).toPrecision(3)}`
	},
	penalita(row) {
		let penalita = 0;
		if (row.dis === 'om') {
			return 0;
		}
		if (row['minuti'] > this.verifica['limite_1']) {
			penalita += this.verifica.penalita_1;
		} else
		if (row['minuti'] > this.verifica['limite_2']) {
			penalita += this.verifica.penalita_2;
		}
		if (row.dis == 'dsa' && penalita > 0) {
			penalita -= 1;
		}
		return penalita;
	}
}
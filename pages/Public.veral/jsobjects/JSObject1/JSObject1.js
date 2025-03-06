export default {
	verifica: null,
	currentValutazione: "",
	vals: [],
	showTimings: true,
	setCurrentValutazione() {
		this.currentValutazione = data_table.selectedRow.valutazione;
	},
	switchShowTimings() {
		this.showTimings = !this.showTimings;
	},
	async setVerifica() {
		const data = await SelectVerifica.run();
		this.verifica = data[0];
		this.vals = [];
		
		let obj = {};
		for (let i = 1; i <= 6; i++) {
			obj[`val${i}`] = this.verifica[`val${i}`];
		}
		this.vals.push(obj);
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
	},
	setTesto () {
    const vals = {
        0: 'Errato',
        1: 'Errato',
        2: 'Molte Imprecisioni',
        3: 'Impreciso',
        4: 'Buono',
    };

		const x1 = Number(Math.floor(data_table.selectedRow.val1));
		const x2 = Number(Math.floor(data_table.selectedRow.val2));
		const x3 = Number(Math.floor(data_table.selectedRow.val3));
		const x4 = Number(Math.floor(data_table.selectedRow.val4));
		const x5 = Number(Math.floor(data_table.selectedRow.val5));
		const x6 = Number(Math.floor(data_table.selectedRow.val6));
		
		const n2 = (x) => Number(Math.floor(x));

		const condizioni = x1;
		const intervalli = x2;
		const tot_media = (x3 + x6)/2;
		const conta_se = (x4 + x5)/2;

		this.currentValutazione = 
			`1) Scrittura precisa degli intervalli: ${vals[n2(intervalli)]}. ` +
			`2) Scrittura corretta delle condizioni: ${vals[n2(condizioni)]}. ` +
			`3) Utilizzo CONTA.SE: ${vals[n2(conta_se)]}. ` +
			`4) Totali e media: ${tot_media < 2 ?  'Non sufficiente' : 'Sufficiente'}.`;
	}
}
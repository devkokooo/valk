export default class MessengerRNA {
  readonly VALID_NUCLEOTIDES = new Set(["A", "G", "C", "U"]);
  strand: string;

  constructor(strand: string) {
    const ntOK = this.#hasValidNucleotides(strand);
    if(!ntOK) throw Error("[mRNA] Invalid nucleotides");

    const stacOK = this.#hasValidStartCodon(strand);
    if(!stacOK) throw Error("[mRNA] Invalid start codon");

    const stocOK = this.#hasValidStopCodon(strand);
    if(!stocOK) throw Error("[mRNA] Invalid stop codon");

    this.strand = strand;
  }

  #hasValidNucleotides(strand: string): boolean {
    for(const nt of strand) {
      if(!this.VALID_NUCLEOTIDES.has(nt)) return false;
    }

    return true;
  }

  #hasValidStartCodon(strand: string): boolean {
    // AUG is the standard start codon in mRNA for protein synthesis
    // Methionine in eukaryotes
    // Formylmethionine in prokaryotes
    return strand.length >= 3 && strand.startsWith("AUG");
  }

  #hasValidStopCodon(strand: string): boolean {
    // Stop codons are either UAA, UAG or UGA
    return strand.length >= 3 && (
      strand.endsWith("UAA") ||
      strand.endsWith("UAG") ||
      strand.endsWith("UGA")
    );
  }
}

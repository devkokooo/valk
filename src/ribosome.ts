import AminoAcid from "./amino-acids";
import RNACodonTable from "./codon-table";
import type MessengerRNA from "./mRNA";

export type Protein = AminoAcid[];

export default class Ribosome {
  translateToAminoAcids(mRNA: MessengerRNA): Protein[] {
    const strand = mRNA.strand;
    const codons = strand.match(/.{3}/g) || []; // Split into codon triplets

    const proteins: Protein[] = [];
    let protein: AminoAcid[] | null = null;

    for(const codon of codons) {
      const aminoAcid = RNACodonTable[codon as keyof typeof RNACodonTable];

      // Start new protein only at AUG when no protein is active
      if(aminoAcid === AminoAcid.Methionine && !protein) {
        protein = [aminoAcid];
      }
      // Continue existing protein
      else if(protein) {
        if(aminoAcid === AminoAcid.Stop) {
          proteins.push(protein);
          protein = null;
        }
        else protein.push(aminoAcid ?? "Unknown");
      }
      // Everything before first AUG or after stop is ignored
    }
    return proteins;
  }
}

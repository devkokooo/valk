import { describe, expect, it } from "bun:test";
import MessengerRNA from "./mRNA";
import Ribosome from "./ribosome";
import AminoAcid from "./amino-acids";

describe("Ribosome", () => {
  it("should translate mRNA to protein chain", () => {
    const mRNA = new MessengerRNA("AUGAUCGUACGACUAGCUAGCUAGCUAGCUAUGAGCUGA");
    const ribosome = new Ribosome();

    const res = ribosome.translateToAminoAcids(mRNA);
    const expected = [[
      AminoAcid.Methionine, AminoAcid.Isoleucine, AminoAcid.Valine,
      AminoAcid.Arginine, AminoAcid.Leucine, AminoAcid.Alanine,
      AminoAcid.Serine,
    ], [
      AminoAcid.Methionine, AminoAcid.Serine,
    ]];

    expect(res).toEqual(expected);
  });
});

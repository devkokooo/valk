import { describe, expect, it } from "bun:test";
import MessengerRNA from "./mRNA";

describe("Messenger RNA", () => {
  it("should only contain valid nucleotides (A,G,C,U)", () => {
    const validStrand = "AUGAUCGUACGACUAGCUAGCUAGCUAGCUAUGAGCUGA";
    const invalidStrand = "ABCDEFG";

    expect(() => new MessengerRNA(validStrand)).not.toThrow();
    expect(() => new MessengerRNA(invalidStrand)).toThrow();
  });

  it("should have AUG (Met) as start codon", () => {
    const validStrand = "AUGAUCGUACGACUAGCUAGCUAGCUAGCUAUGAGCUGA";
    const invalidStrand = "GUACGCAGUUGC";

    expect(() => new MessengerRNA(validStrand)).not.toThrow();
    expect(() => new MessengerRNA(invalidStrand)).toThrow();
  });

  it("should contain valid stop codons (UAA,UAG,UGA)", () => {
    const validStrand = "AUGAUCGUACGACUAGCUAGCUAGCUAGCUAUGAGCUAA";
    const validStrand2 = "AUGAUCGUACGACUAGCUAGCUAGCUAGCUAUGAGCUAG";
    const validStrand3 = "AUGAUCGUACGACUAGCUAGCUAGCUAGCUAUGAGCUGA";
    const invalidStrand = "AUGGUACGCAGUUGC";

    expect(() => new MessengerRNA(validStrand)).not.toThrow();
    expect(() => new MessengerRNA(validStrand2)).not.toThrow();
    expect(() => new MessengerRNA(validStrand3)).not.toThrow();
    expect(() => new MessengerRNA(invalidStrand)).toThrow();
  });
});

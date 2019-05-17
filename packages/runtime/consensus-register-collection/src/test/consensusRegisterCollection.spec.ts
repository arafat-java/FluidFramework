import * as assert from "assert";
import { ConsensusRegisterCollectionExtension } from "../extension";
import { IConsensusRegisterCollection, IConsensusRegisterCollectionExtension } from "../interfaces";

describe("Routerlicious", () => {
    describe("Api", () => {
        // tslint:disable:mocha-no-side-effect-code
        generate("ConsensusQueue", new ConsensusRegisterCollectionExtension());
        function generate(
            name: string,
            extension: IConsensusRegisterCollectionExtension) {

            describe(name, () => {
                let testCollection: IConsensusRegisterCollection;

                beforeEach(async () => {
                    testCollection = extension.create(null, "consensus-register-collection");
                });

                it("Can create a collection", () => {
                    assert.ok(testCollection);
                });
            });
        }
    });
});

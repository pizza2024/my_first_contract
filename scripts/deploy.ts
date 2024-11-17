import { beginCell, Cell, contractAddress, StateInit, storeStateInit, toNano } from "@ton/core"
import {hex} from '../build/main.compiled.json'
import qs from "qs"
import qrcode from "qrcode-terminal";
import dotenv from 'dotenv'
dotenv.config()
async function deployScript() {
    const codeCell = Cell.fromBoc(Buffer.from(hex, 'hex'))[0]
    const dataCell = new Cell()

    const stateInit: StateInit = {
        code: codeCell,
        data: dataCell,
    }

    const stateInitBuilder = beginCell();
    storeStateInit(stateInit)(stateInitBuilder);
    const stateInitCell = stateInitBuilder.endCell()
    const address = contractAddress(0, {
        code: codeCell,
        data: dataCell
    })
    console.log('address is:', address)
    let link =
        `https://tonhub.com/transfer/` +
        address.toString({
            testOnly: true,
        }) + "?" +
        qs.stringify({
        text: "Deploy contract",
        amount: toNano(1).toString(10),
        init: stateInitCell.toBoc({ idx: false }).toString("base64"),
        });

    qrcode.generate(link, { small: true }, (code) => {
        console.log(code);
    });
}

deployScript()
import 'dotenv/config';

import { Account, Contract, Provider } from "starknet"
// import { RpcProvider } from "starknet";



import contract_abi from "../ABi/smartland_contract_RealEstateContract.contract_class.json"
const abi = contract_abi.abi


export const CONTRACT_ABI = abi


export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
export const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS
export const PRIVATE_KEY = ""

// const provider = new Provider({ sequencer: { baseUrl:"http://127.0.0.1:5050"} });
// const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY)
// const contract = new Contract(abi, CONTRACT_ADDRESS, provider)
// contract.connect(account)

// export { contract, account, provider }
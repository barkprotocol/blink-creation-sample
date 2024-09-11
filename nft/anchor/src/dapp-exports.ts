// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import DappIDL from '../target/idl/dapp.json';
import type { Dapp } from '../target/types/dapp';

// Re-export the generated IDL and type
export { Dapp, DappIDL };

// The programId is imported from the program IDL.
export const DAPP_PROGRAM_ID = new PublicKey(DappIDL.address);

// This is a helper function to get the Dapp Anchor program.
export function getDappProgram(provider: AnchorProvider) {
  return new Program(DappIDL as Dapp, provider);
}

// This is a helper function to get the program ID for the Dapp program depending on the cluster.
export function getDappProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return DAPP_PROGRAM_ID;
  }
}

use anchor_lang::prelude::*;

declare_id!("6NqCefne6H68qJXRjSpPTLVeQdfQCPFG6xfYEAE4RXHW");

#[program]
pub mod dapp {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

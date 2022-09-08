import { ethers } from 'ethers';
import { sbt_address, provider } from './constants';
import sbt_abi from '../abi/sbt_abi.json';

export const configureSBT = async () => {
    await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    return new ethers.Contract(sbt_address, sbt_abi.abi, provider.getSigner());
}
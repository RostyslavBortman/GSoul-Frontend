import { ethers } from 'ethers';
import { sbt_address, provider } from './constants';
import sbt_abi from '../abi/sbt_abi.json';

export const sbt = new ethers.Contract(sbt_address, sbt_abi.abi, provider);
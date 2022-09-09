import { ethers } from 'ethers';
import { storage_address, provider } from './constants';
import storage_abi from '../abi/storage_abi.json';
export const storage = new ethers.Contract(storage_address, storage_abi.abi, provider);
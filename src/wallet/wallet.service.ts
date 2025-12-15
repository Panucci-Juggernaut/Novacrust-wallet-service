import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Wallet } from './interfaces/wallet.interface';
import { Transaction } from './interfaces/transaction.interface';

@Injectable()
export class WalletService {
  private wallets = new Map<string, Wallet>();
  private transactions: Transaction[] = [];

  createWallet(currency: 'USD'): Wallet {
    const wallet: Wallet = {
      id: uuid(),
      currency,
      balance: 0,
    };

    this.wallets.set(wallet.id, wallet);
    return wallet;
  }

  fundWallet(walletId: string, amount: number): Wallet {
    const wallet = this.wallets.get(walletId);
    if (!wallet) throw new NotFoundException('Wallet not found');

    wallet.balance += amount;

    this.transactions.push({
      id: uuid(),
      type: 'FUND',
      amount,
      toWalletId: walletId,
      createdAt: new Date(),
    });

    return wallet;
  }

  transfer(fromId: string, toId: string, amount: number) {
    if (fromId === toId) {
      throw new BadRequestException('Cannot transfer to same wallet');
    }

    const sender = this.wallets.get(fromId);
    const receiver = this.wallets.get(toId);

    if (!sender || !receiver) {
      throw new NotFoundException('Wallet not found');
    }

    if (sender.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    // atomic update (single-threaded in-memory)
    sender.balance -= amount;
    receiver.balance += amount;

    this.transactions.push({
      id: uuid(),
      type: 'TRANSFER',
      amount,
      fromWalletId: fromId,
      toWalletId: toId,
      createdAt: new Date(),
    });

    return { sender, receiver };
  }

  getWalletDetails(walletId: string) {
    const wallet = this.wallets.get(walletId);
    if (!wallet) throw new NotFoundException('Wallet not found');

    const history = this.transactions.filter(
      tx =>
        tx.fromWalletId === walletId ||
        tx.toWalletId === walletId,
    );

    return { wallet, transactions: history };
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() dto: CreateWalletDto) {
    return this.walletService.createWallet(dto.currency);
  }

  @Post(':id/fund')
  fund(@Param('id') id: string, @Body() dto: FundWalletDto) {
    return this.walletService.fundWallet(id, dto.amount);
  }

  @Post('transfer')
  transfer(@Body() dto: TransferDto) {
    return this.walletService.transfer(
      dto.fromWalletId,
      dto.toWalletId,
      dto.amount,
    );
  }

  @Get(':id')
  getDetails(@Param('id') id: string) {
    return this.walletService.getWalletDetails(id);
  }
}

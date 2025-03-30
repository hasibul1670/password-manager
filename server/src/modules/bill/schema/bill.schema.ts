import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  BillToDto,
  CreateBillDto,
  itemizedInfoDto,
  partialPaymentDataDto,
} from '../dto/create-bill.dto';

@Schema()
export class Bill extends Document implements CreateBillDto {
  @Prop()
  billId: string;
  @Prop()
  paymentStatus: string;
  @Prop()
  paymentMethod: string;
  @Prop()
  paymentNote: string;
  @Prop()
  originalAmount: number;
  @Prop()
  discount: number;
  @Prop()
  paidAmount: number;
  @Prop()
  dueAmount: number;
  @Prop()
  netTotalAfterDiscount: number;
  @Prop()
  dueBillDate: string;
  @Prop()
  createdBy: string;
  @Prop()
  itemizedInfo: itemizedInfoDto[];
  @Prop()
  partialPaymentData: partialPaymentDataDto[];

  @Prop()
  billTo: BillToDto;
}

export const BillSchema = SchemaFactory.createForClass(Bill);

// export const BillModel = model<CreateBillDto>('Bill', BillSchema);

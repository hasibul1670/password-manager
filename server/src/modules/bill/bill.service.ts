import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ApiError } from 'src/helpers/utills/ApiError';
import { generateId } from 'src/helpers/utills/generateId';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './schema/bill.schema';

@Injectable()
export class BillService {
  constructor(@Inject('BILL_MODEL') private BillModel: Model<Bill>) {}
  async create(createBillDto: CreateBillDto) {
    try {
      const lastDoc = await this.BillModel.countDocuments();
      const generateID = await generateId(lastDoc, 'Bill');
      const billPayload = {
        ...createBillDto,
        billId: generateID,
      };
      const res = await this.BillModel.create(billPayload);
      return res;
    } catch (error) {
      throw ApiError(400, 'Error Occured !!', error.message);
    }
  }

  async findAll({
    page,
    limit,
    search,
  }: {
    page: any;
    limit: number;
    search?: string;
  }) {
    if (!limit && !page) {
      (limit = 10), (page = 1);
    }
    const skip = (page - 1) * limit;
    const query = search
      ? {
          $or: [
            { billId: new RegExp(search, 'i') },
            { 'billTo.contactNumber': new RegExp(search, 'i') },
            { 'billTo.email': new RegExp(search, 'i') },
          ],
        }
      : {};
    const totalCount = await this.BillModel.countDocuments();
    const data = await this.BillModel.find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      data,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: number) {
    return await this.BillModel.findOne({ billId: id });
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const { partialPaymentData, ...restOfBody } = updateBillDto;
    let updateQuery;
    if (partialPaymentData) {
      updateQuery = {
        $push: { partialPaymentData: partialPaymentData },
        $set: { ...restOfBody },
      };
    } else {
      updateQuery = {
        $set: restOfBody,
      };
    }
    const res = await this.BillModel.findOneAndUpdate(
      { billId: id },
      updateQuery,
      {
        new: true,
      },
    );
    return res;
  }

  async remove(id: number) {
    return await this.BillModel.findOneAndDelete({ billId: id });
  }
}

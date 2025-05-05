import { BidStatus } from "@/db/schemas/enums";

export type GetBid = {
  bid: {
    bidId: string;
    lawyerId: string;
    caseId: string;
    proposal: string;
    bidAmount: string | null;
    bidType: string | null;
    status: BidStatus;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean | null;
    deletedAt: Date | null;
  };
  case: {
    caseId: string;
    title: string;
  };
};

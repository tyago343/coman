export class CreateReviewDto {
  readonly rating: number;
  readonly comment: string;
  readonly bookId: string;
  readonly userId: string;
}

export class CreateTaskDto {
  public title: string;
  public details: string;
  public category: number;
  public price: number;
  public deadline: Date;
  public address: string;
  public tags: string;
  public city: string;
}
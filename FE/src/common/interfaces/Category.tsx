export interface ICategory {
  published: unknown;
  name_category: string | any;
  image_category?: FileList | string[] | any;
  _id?: string | any;
  slug?: string;
  products?: string[];
  createdAt?: string | number;
  updatedAt?: string | number;
}
